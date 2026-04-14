/**
 * Apply DeepL translations to util files via AST codemod.
 *
 * Mirrors the extraction logic from extract-translations.ts:
 * - Loads ko.json (DeepL output with same structure as en.json).
 * - For each util file, walks exported const declarations.
 * - Recursively traverses object/array initializers, tracking the dotted key path.
 * - When an {en, ko} pair is found, looks up the DeepL value at that path in ko.json.
 * - Replaces the source ko initializer with the JSON-stringified DeepL value.
 * - Applies edits bottom-up to preserve offsets.
 * - Emits a report: docs/deepl-apply-ast-report.md
 *
 * Usage:
 *   DRY_RUN=1 node --experimental-strip-types --no-warnings scripts/apply-deepl-ast.ts
 *   node --experimental-strip-types --no-warnings scripts/apply-deepl-ast.ts
 */
import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

type Lang = "en" | "ko";

// ─── Namespace mapping (same as extract-translations.ts) ──────────────────
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
  let propCount = 0;
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) return null;
    propCount++;
    const name = propName(p);
    if (name === "en") en = p.initializer;
    else if (name === "ko") ko = p.initializer;
    else return null; // Not a pure {en, ko} pair
  }
  if (en && ko && propCount === 2) return { en, ko };
  return null;
}

/**
 * Get value from an AST expression for path tracking.
 * Returns the extracted value if it's a literal (string/number/bool/null/array/object),
 * or undefined for calls/identifiers/etc.
 */
function toValue(node: ts.Expression, lang: Lang): unknown {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isPrefixUnaryExpression(node) && node.operator === ts.SyntaxKind.MinusToken) {
    const inner = toValue(node.operand, lang);
    return typeof inner === "number" ? -inner : undefined;
  }

  if (ts.isArrayLiteralExpression(node)) {
    return node.elements.map((el) => toValue(el, lang));
  }

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

  return undefined;
}

function getByPath(obj: unknown, dottedKey: string): unknown {
  // Parse "foo.bar[0].baz[1]" into tokens: ["foo", "bar", 0, "baz", 1]
  const tokens: Array<string | number> = [];
  for (const seg of dottedKey.split(".")) {
    if (!seg) continue;
    // Extract a leading identifier then zero or more [idx] suffixes
    const m = seg.match(/^([^[]+)((?:\[\d+\])*)$/);
    if (!m) {
      tokens.push(seg);
      continue;
    }
    tokens.push(m[1]);
    const idxRe = /\[(\d+)\]/g;
    let im: RegExpExecArray | null;
    while ((im = idxRe.exec(m[2])) !== null) {
      tokens.push(Number(im[1]));
    }
  }
  let cur: unknown = obj;
  for (const tok of tokens) {
    if (cur === null || cur === undefined) return undefined;
    if (typeof tok === "number") {
      if (!Array.isArray(cur)) return undefined;
      cur = cur[tok];
    } else {
      if (typeof cur !== "object" || Array.isArray(cur)) return undefined;
      cur = (cur as Record<string, unknown>)[tok];
    }
  }
  return cur;
}

// ─── Edit tracking ──────────────────────────────────────────────────────────
interface Edit {
  start: number;
  end: number;
  replacement: string;
}

// ─── Codemod walker ─────────────────────────────────────────────────────────

/**
 * Walk the initializer of an exported const, collecting edits for ko: values
 * that can be replaced with DeepL translations.
 */
function walkInitializer(
  node: ts.Expression,
  sf: ts.SourceFile,
  pathPrefix: string,
  koJson: Record<string, unknown>,
  edits: Edit[],
  skips: Array<{ path: string; reason: string }>
): void {
  // Object literal with {en, ko} pair?
  if (ts.isObjectLiteralExpression(node)) {
    const pair = isEnKoPair(node);
    if (pair) {
      // This is a leaf {en, ko} pair. Look up the DeepL ko value at pathPrefix in the root ko.json.
      const deeplValue = getByPath(koJson, pathPrefix);
      if (deeplValue === undefined) {
        skips.push({ path: pathPrefix, reason: "Key not found in ko.json" });
        return;
      }

      // Find the ko property assignment and replace its initializer.
      for (const p of node.properties) {
        if (ts.isPropertyAssignment(p)) {
          const pn = propName(p);
          if (pn === "ko") {
            const koInit = p.initializer;
            // Check if replacement is valid (both should be strings or both arrays of same length)
            const canReplace = validateReplacement(koInit, deeplValue, sf);
            if (canReplace) {
              const replacement = JSON.stringify(deeplValue);
              edits.push({
                start: koInit.getStart(sf),
                end: koInit.getEnd(),
                replacement,
              });
            } else {
              skips.push({ path: pathPrefix, reason: "Shape mismatch (source vs DeepL)" });
            }
            return;
          }
        }
      }
      return;
    }

    // Not an {en, ko} pair — recurse into properties.
    for (const p of node.properties) {
      if (ts.isPropertyAssignment(p)) {
        const key = propName(p);
        if (key) {
          const newPath = pathPrefix ? `${pathPrefix}.${key}` : key;
          walkInitializer(p.initializer, sf, newPath, koJson, edits, skips);
        }
      }
    }
  } else if (ts.isArrayLiteralExpression(node)) {
    // Array of objects — recurse with numeric indices
    for (let i = 0; i < node.elements.length; i++) {
      const el = node.elements[i];
      if (el) {
        const newPath = `${pathPrefix}[${i}]`;
        walkInitializer(el, sf, newPath, koJson, edits, skips);
      }
    }
  }
}

/**
 * Check if we can replace the source initializer with the DeepL value.
 * - Both strings: OK
 * - Both arrays of strings with same length: OK
 * - Otherwise: SKIP
 */
function validateReplacement(sourceNode: ts.Expression, deeplValue: unknown, sf: ts.SourceFile): boolean {
  // If source is string literal and DeepL is string: OK
  if ((ts.isStringLiteral(sourceNode) || ts.isNoSubstitutionTemplateLiteral(sourceNode)) && typeof deeplValue === "string") {
    return true;
  }

  // If source is array and DeepL is array of strings
  if (ts.isArrayLiteralExpression(sourceNode) && Array.isArray(deeplValue)) {
    const sourceElements = sourceNode.elements.filter((el) => !!el);
    if (sourceElements.length !== deeplValue.length) return false;
    // Check all elements are string-like and DeepL is all strings
    const allSourceStrings = sourceElements.every((el) => {
      return ts.isStringLiteral(el) || ts.isNoSubstitutionTemplateLiteral(el);
    });
    const allDeeplStrings = deeplValue.every((v) => typeof v === "string");
    return allSourceStrings && allDeeplStrings;
  }

  return false;
}

// ─── File collection ────────────────────────────────────────────────────────
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

// ─── Main ───────────────────────────────────────────────────────────────────
interface FileReport {
  file: string;
  replacedCount: number;
  skippedCount: number;
  charsChanged: number;
  skips: Array<{ path: string; reason: string }>;
}

function main(): void {
  const dryRun = process.env.DRY_RUN === "1";
  const koJson = JSON.parse(fs.readFileSync("messages/ko.json", "utf8")) as Record<string, unknown>;

  const files = collectFiles();
  console.log(`[${dryRun ? "DRY RUN" : "APPLY"}] Processing ${files.length} files...`);

  const reports: FileReport[] = [];
  let totalReplaced = 0;
  let totalSkipped = 0;

  for (const file of files) {
    try {
      const src = fs.readFileSync(file, "utf8");
      const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
      const ns = nsFor(file);

      const fileEdits: Edit[] = [];
      const fileSkips: Array<{ path: string; reason: string }> = [];

      // Walk exported const declarations
      for (const stmt of sf.statements) {
        if (!ts.isVariableStatement(stmt)) continue;
        const isExported = stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
        if (!isExported) continue;

        for (const decl of stmt.declarationList.declarations) {
          if (!decl.initializer) continue;

          // Determine if this is a multi-export file
          const multiExport =
            stmt.declarationList.declarations.length > 1 ||
            sf.statements.filter(
              (s): s is ts.VariableStatement =>
                ts.isVariableStatement(s) && !!s.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
            ).length > 1;

          const varName = ts.isIdentifier(decl.name) ? decl.name.text : null;
          const pathPrefix = multiExport && varName ? `${ns}.${varName}` : ns;

          // Walk the initializer, passing the full koJson for path lookups
          walkInitializer(decl.initializer, sf, pathPrefix, koJson, fileEdits, fileSkips);
        }
      }

      // Apply edits bottom-up
      let editedSrc = src;
      let charsChanged = 0;
      if (fileEdits.length > 0) {
        // Sort by start offset descending (bottom-up)
        fileEdits.sort((a, b) => b.start - a.start);
        for (const edit of fileEdits) {
          const before = editedSrc.substring(0, edit.start);
          const after = editedSrc.substring(edit.end);
          editedSrc = before + edit.replacement + after;
          charsChanged += edit.replacement.length - (edit.end - edit.start);
        }

        if (!dryRun) {
          fs.writeFileSync(file, editedSrc, "utf8");
        }
      }

      const replaced = fileEdits.length;
      const skipped = fileSkips.length;
      totalReplaced += replaced;
      totalSkipped += skipped;

      reports.push({
        file,
        replacedCount: replaced,
        skippedCount: skipped,
        charsChanged,
        skips: fileSkips,
      });

      if (replaced > 0 || skipped > 0) {
        console.log(
          `  ${file}: ${replaced} replaced, ${skipped} skipped, ${charsChanged > 0 ? "+" : ""}${charsChanged} chars`
        );
      }
    } catch (err) {
      console.error(`✗ ${file}: ${(err as Error).message}`);
    }
  }

  // Write report
  const reportPath = "docs/deepl-apply-ast-report.md";
  fs.mkdirSync("docs", { recursive: true });

  let reportMd = `# DeepL AST Apply Report\n\n`;
  reportMd += `**Date:** ${new Date().toISOString()}\n`;
  reportMd += `**Mode:** ${dryRun ? "DRY RUN" : "APPLY"}\n\n`;
  reportMd += `## Summary\n\n`;
  reportMd += `- **Files processed:** ${files.length}\n`;
  reportMd += `- **Total replaced:** ${totalReplaced}\n`;
  reportMd += `- **Total skipped:** ${totalSkipped}\n\n`;

  reportMd += `## Per-File Results\n\n`;
  for (const r of reports) {
    if (r.replacedCount > 0 || r.skippedCount > 0) {
      reportMd += `### ${r.file}\n\n`;
      reportMd += `- Replaced: ${r.replacedCount}\n`;
      reportMd += `- Skipped: ${r.skippedCount}\n`;
      if (r.charsChanged !== 0) {
        reportMd += `- Chars changed: ${r.charsChanged > 0 ? "+" : ""}${r.charsChanged}\n`;
      }
      if (r.skips.length > 0) {
        reportMd += `- Skipped keys:\n`;
        for (const skip of r.skips) {
          reportMd += `  - \`${skip.path}\`: ${skip.reason}\n`;
        }
      }
      reportMd += "\n";
    }
  }

  fs.writeFileSync(reportPath, reportMd, "utf8");
  console.log(`\n✓ Report written to ${reportPath}`);
  console.log(`\nSummary: ${totalReplaced} replaced, ${totalSkipped} skipped`);
}

main();
