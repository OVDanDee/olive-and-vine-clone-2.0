/**
 * Translation extraction script.
 *
 * Walks every `app/utils/page*Utils.ts`, `app/utils/insights/*.ts`, and
 * `app/utils/insightCardsConfig.ts` using the TypeScript compiler AST.
 * For each exported const with an object literal, it recursively:
 *
 *   - Detects { en: <string|string[]>, ko: <string|string[]> } pairs and
 *     replaces the whole object/array node with the language-appropriate value.
 *   - Preserves non-translation metadata (slug, image, current, numeric values,
 *     booleans, etc.) by passing them through as-is.
 *
 * Output:
 *   messages/en.json         - authoritative English source (DeepL input)
 *   messages/ko.legacy.json  - existing hand-written Korean (baseline for diff)
 *
 * Namespace convention:
 *   app/utils/pageAboutUtils.ts               → "about"
 *   app/utils/pageValuesUtils.ts              → "ourValues"
 *   app/utils/pageUtils.ts                    → "common"
 *   app/utils/pageAccountingServiceUtils.ts   → "services.accounting"
 *   app/utils/pageAssuranceServiceUtils.ts    → "services.assurance"
 *   app/utils/pageConsultingServiceUtils.ts   → "services.consulting"
 *   app/utils/pageCorporateServiceUtils.ts    → "services.corporate"
 *   app/utils/pageHrServiceUtils.ts           → "services.hr"
 *   app/utils/pageTaxServiceUtils.ts          → "services.tax"
 *   app/utils/pageServicesUtils.ts            → "servicesIndex"
 *   app/utils/pageContactUtils.ts             → "contact"
 *   app/utils/pageLeadershipUtils.ts          → "leadership"
 *   app/utils/pageSubscribeUtils.ts           → "subscribe"
 *   app/utils/insightCardsConfig.ts           → "insightCards"
 *   app/utils/insightTranslations.ts          → "insightsCommon"
 *   app/utils/leadershipProfileTranslations.ts→ "leadershipProfile"
 *   app/utils/insights/<slug>.ts              → "insights.<slug>"
 *
 * Run:
 *   npx tsx scripts/extract-translations.ts
 */
import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

type Lang = "en" | "ko";

// ─── Namespace mapping ──────────────────────────────────────────────────────
const NS_MAP: Record<string, string> = {
  "app/utils/pageUtils.ts": "common",
  "app/utils/pageAboutUtils.ts": "about",
  "app/utils/pageValuesUtils.ts": "ourValues",
  "app/utils/pageAccountingServiceUtils.ts": "services.accounting",
  "app/utils/pageAssuranceServiceUtils.ts": "services.assurance",
  "app/utils/pageConsultingServiceUtils.ts": "services.consulting",
  "app/utils/pageCorporateServiceUtils.ts": "services.corporate",
  "app/utils/pageHrServiceUtils.ts": "services.hr",
  "app/utils/pageTaxServiceUtils.ts": "services.tax",
  "app/utils/pageServicesUtils.ts": "servicesIndex",
  "app/utils/pageContactUtils.ts": "contact",
  "app/utils/pageLeadershipUtils.ts": "leadership",
  "app/utils/pageSubscribeUtils.ts": "subscribe",
  "app/utils/insightCardsConfig.ts": "insightCards",
  "app/utils/insightTranslations.ts": "insightsCommon",
  "app/utils/leadershipProfileTranslations.ts": "leadershipProfile",
  "app/utils/dynamicPageConfig.ts": "dynamicPages",
};

function nsFor(file: string): string {
  if (NS_MAP[file]) return NS_MAP[file];
  const mIns = file.match(/app\/utils\/insights\/(.+)\.ts$/);
  if (mIns) return `insights.${mIns[1]}`;
  const mLead = file.match(/app\/utils\/leadership\/(.+)\.ts$/);
  if (mLead) return `leadershipProfile.${mLead[1]}`;
  throw new Error(`No namespace mapping for ${file}`);
}

// ─── AST helpers ────────────────────────────────────────────────────────────
function propName(p: ts.PropertyAssignment): string | null {
  const n = p.name;
  if (ts.isIdentifier(n)) return n.text;
  if (ts.isStringLiteral(n)) return n.text;
  if (ts.isNumericLiteral(n)) return n.text;
  return null;
}

function isEnKoPair(obj: ts.ObjectLiteralExpression): { en: ts.Expression; ko: ts.Expression } | null {
  let en: ts.Expression | undefined;
  let ko: ts.Expression | undefined;
  const extraTranslationKey = false;
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) return null;
    const name = propName(p);
    if (name === "en") en = p.initializer;
    else if (name === "ko") ko = p.initializer;
    else return null; // Not a pure {en, ko} pair → treat as regular object
  }
  if (en && ko && !extraTranslationKey) return { en, ko };
  return null;
}

/**
 * Convert an AST expression into a plain JS value, resolving translation
 * pairs ({en,ko}) to the requested language. Returns undefined for values
 * that don't map cleanly (e.g. function calls, JSX, etc.).
 */
function toValue(node: ts.Expression, lang: Lang): unknown {
  // String / number / boolean / null literals
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  // Template literals without substitutions (already handled above)
  // Prefix unary (negative numbers)
  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
    const inner = toValue(node.operand, lang);
    return typeof inner === "number" ? -inner : undefined;
  }

  // Array literal
  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((el) => toValue(el, lang));
  }

  // Object literal — check for {en, ko} pair first
  if (ts.isObjectLiteralExpression(node)) {
    const pair = isEnKoPair(node);
    if (pair) return toValue(pair[lang], lang);
    const out: Record<string, unknown> = {};
    for (const p of node.properties) {
      if (!ts.isPropertyAssignment(p)) continue;
      const key = propName(p);
      if (!key) continue;
      const v = toValue(p.initializer, lang);
      if (v !== undefined) out[key] = v;
    }
    return out;
  }

  // Identifier / call / JSX / anything else we can't serialize safely → drop.
  return undefined;
}

// ─── Main ───────────────────────────────────────────────────────────────────
function collectFiles(): string[] {
  const files: string[] = [];
  for (const f of Object.keys(NS_MAP)) files.push(f);
  for (const dir of ["app/utils/insights", "app/utils/leadership"]) {
    if (fs.existsSync(dir)) {
      for (const f of fs.readdirSync(dir)) {
        if (f.endsWith(".ts")) files.push(path.join(dir, f));
      }
    }
  }
  return files.filter((f) => fs.existsSync(f));
}

function setByPath(target: Record<string, unknown>, dottedKey: string, value: unknown): void {
  const parts = dottedKey.split(".");
  let cur: Record<string, unknown> = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (typeof cur[k] !== "object" || cur[k] === null) cur[k] = {};
    cur = cur[k] as Record<string, unknown>;
  }
  const leaf = parts[parts.length - 1];
  // Merge if the leaf is an object + new value is an object
  const existing = cur[leaf];
  if (
    existing &&
    typeof existing === "object" &&
    !Array.isArray(existing) &&
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    cur[leaf] = { ...(existing as Record<string, unknown>), ...(value as Record<string, unknown>) };
  } else {
    cur[leaf] = value;
  }
}

function extractFromFile(file: string, lang: Lang): Record<string, unknown> {
  const src = fs.readFileSync(file, "utf8");
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const ns = nsFor(file);
  const result: Record<string, unknown> = {};

  // Find all exported const declarations
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const isExported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    if (!isExported) continue;

    for (const decl of stmt.declarationList.declarations) {
      if (!decl.initializer) continue;
      const value = toValue(decl.initializer, lang);
      if (value === undefined) continue;

      // For single-export files, flatten to namespace root.
      // For multi-export files, append the variable name under namespace.
      const multiExport = stmt.declarationList.declarations.length > 1 ||
        sf.statements.filter((s): s is ts.VariableStatement => ts.isVariableStatement(s) && !!s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)).length > 1;
      const key = multiExport && ts.isIdentifier(decl.name) ? `${ns}.${decl.name.text}` : ns;
      setByPath(result, key, value);
    }
  }
  return result;
}

function deepMerge(a: Record<string, unknown>, b: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const existing = out[k];
    if (
      existing &&
      typeof existing === "object" &&
      !Array.isArray(existing) &&
      v &&
      typeof v === "object" &&
      !Array.isArray(v)
    ) {
      out[k] = deepMerge(existing as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function countLeaves(obj: unknown): number {
  if (obj === null || obj === undefined) return 0;
  if (typeof obj === "string") return 1;
  if (typeof obj === "number" || typeof obj === "boolean") return 0; // metadata, not translations
  if (Array.isArray(obj)) return obj.reduce<number>((n, x) => n + countLeaves(x), 0);
  if (typeof obj === "object") {
    return Object.values(obj as Record<string, unknown>).reduce<number>((n, x) => n + countLeaves(x), 0);
  }
  return 0;
}

function main(): void {
  const files = collectFiles();
  console.log(`Processing ${files.length} files...`);

  const en: Record<string, unknown> = {};
  const ko: Record<string, unknown> = {};

  for (const f of files) {
    try {
      const enPart = extractFromFile(f, "en");
      const koPart = extractFromFile(f, "ko");
      Object.assign(en, deepMerge(en, enPart));
      Object.assign(ko, deepMerge(ko, koPart));
    } catch (err) {
      console.error(`✗ ${f}: ${(err as Error).message}`);
    }
  }

  fs.mkdirSync("messages", { recursive: true });
  fs.writeFileSync("messages/en.json", JSON.stringify(en, null, 2) + "\n", "utf8");
  fs.writeFileSync("messages/ko.legacy.json", JSON.stringify(ko, null, 2) + "\n", "utf8");

  console.log(`✓ messages/en.json         (string leaves: ${countLeaves(en)})`);
  console.log(`✓ messages/ko.legacy.json  (string leaves: ${countLeaves(ko)})`);
}

main();
