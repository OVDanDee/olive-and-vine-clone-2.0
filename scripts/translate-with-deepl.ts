/**
 * Translate messages/en.json → messages/ko.json using DeepL API.
 *
 * Strategy:
 *   1. Walk the nested en.json tree, collecting (flat_key, string) pairs.
 *      Skip keys whose name indicates metadata (image paths, slugs, CSS, etc.)
 *      so they pass through untranslated.
 *   2. Batch-request DeepL with 50 strings per call (DeepL accepts up to 50
 *      texts per POST). Applies the uploaded glossary if DEEPL_GLOSSARY_ID set.
 *   3. Reassemble into the same tree shape → messages/ko.json.
 *
 * Usage:
 *   DEEPL_API_KEY=... npx tsx scripts/translate-with-deepl.ts
 *   DEEPL_API_KEY=... DEEPL_GLOSSARY_ID=... npx tsx scripts/translate-with-deepl.ts
 *   DEEPL_API_KEY=... DRY_RUN=1 npx tsx scripts/translate-with-deepl.ts
 *
 * Output:
 *   messages/ko.json            - fresh DeepL translation (will overwrite)
 *   messages/ko.deepl.meta.json - per-key source/target/char count (for audit)
 */
import * as fs from "fs";

const API_KEY = process.env.DEEPL_API_KEY;
if (!API_KEY) {
  console.error("✗ DEEPL_API_KEY not set.");
  process.exit(1);
}

const GLOSSARY_ID = process.env.DEEPL_GLOSSARY_ID || "";
const DRY_RUN = process.env.DRY_RUN === "1";
const BASE = API_KEY.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";

// Keys that should pass through untranslated (metadata, paths, identifiers)
const SKIP_KEYS = new Set([
  "image", "imagePath", "imagePathHover", "imageHover",
  "imageObjectPosition", "imageObjectPositionHover",
  "slug", "href", "url", "src", "alt",
  "videoId", "accent", "color", "icon", "iconName",
  "current", "suffix", "value",
]);

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

/** Walk tree, collect strings to translate. Returns (path, string) tuples. */
function collectStrings(node: Json, path: string[] = [], out: Array<[string, string]> = []): Array<[string, string]> {
  if (typeof node === "string") {
    // Skip pure URLs / paths / short codes that DeepL would mangle
    const leafName = path[path.length - 1];
    if (SKIP_KEYS.has(leafName)) return out;
    if (/^(\/|https?:\/\/|#)/.test(node)) return out;
    // Skip very short strings that are likely codes (e.g., "en", "ko", single letters)
    if (node.trim().length < 2) return out;
    out.push([path.join("."), node]);
    return out;
  }
  if (Array.isArray(node)) {
    node.forEach((item, i) => collectStrings(item, [...path, String(i)], out));
    return out;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) collectStrings(v as Json, [...path, k], out);
  }
  return out;
}

/** Set a nested path in the tree. */
function setByPath(tree: Json, pathStr: string, value: string): void {
  const parts = pathStr.split(".");
  let cur: Json = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = (cur as { [k: string]: Json })[parts[i]];
  }
  (cur as { [k: string]: Json })[parts[parts.length - 1]] = value;
}

type DeepLResponse = {
  translations: Array<{ detected_source_language: string; text: string }>;
};

async function translateBatch(texts: string[]): Promise<string[]> {
  const body = new URLSearchParams();
  body.append("source_lang", "EN");
  body.append("target_lang", "KO");
  // Note: DeepL's `formality` parameter is only supported for a subset of target
  // languages (DE/FR/IT/ES/NL/PL/PT/JA). Korean does NOT support it, so we
  // deliberately omit it rather than receive a 400.
  body.append("preserve_formatting", "1");
  // No tag_handling: some source strings contain characters like "<10%" that
  // DeepL's XML parser rejects. Default tag handling treats input as plain text.
  if (GLOSSARY_ID) body.append("glossary_id", GLOSSARY_ID);
  for (const t of texts) body.append("text", t);

  const res = await fetch(`${BASE}/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  if (!res.ok) throw new Error(`DeepL ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as DeepLResponse;
  return data.translations.map((t) => t.text);
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

async function main(): Promise<void> {
  const en = JSON.parse(fs.readFileSync("messages/en.json", "utf8")) as Json;
  const entries = collectStrings(en);
  const totalChars = entries.reduce((n, [, s]) => n + s.length, 0);

  console.log(`📄 ${entries.length} strings, ${totalChars.toLocaleString()} characters`);
  console.log(`🔑 Glossary: ${GLOSSARY_ID || "(none — terms may drift)"}`);
  console.log(`🌐 Endpoint: ${BASE}`);

  if (DRY_RUN) {
    console.log("\n(DRY_RUN=1 → not calling DeepL. First 5 entries:)");
    entries.slice(0, 5).forEach(([p, s]) => console.log(`  ${p}: ${s.slice(0, 80)}${s.length > 80 ? "…" : ""}`));
    return;
  }

  // Deep clone en.json as the scaffold for ko.json (metadata/paths pass through)
  const ko = JSON.parse(JSON.stringify(en)) as Json;

  const BATCH = 50; // DeepL hard limit
  const meta: Array<{ key: string; en: string; ko: string; chars: number }> = [];
  let done = 0;

  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH);
    const texts = batch.map(([, s]) => s);
    const translated = await translateBatch(texts);
    batch.forEach(([path, src], j) => {
      const tgt = translated[j];
      setByPath(ko, path, tgt);
      meta.push({ key: path, en: src, ko: tgt, chars: src.length });
    });
    done += batch.length;
    process.stdout.write(`\r  translated ${done}/${entries.length}`);
    await sleep(200); // gentle rate limit
  }
  process.stdout.write("\n");

  fs.writeFileSync("messages/ko.json", JSON.stringify(ko, null, 2) + "\n", "utf8");
  fs.writeFileSync("messages/ko.deepl.meta.json", JSON.stringify(meta, null, 2) + "\n", "utf8");

  console.log(`✓ messages/ko.json            (${entries.length} translations)`);
  console.log(`✓ messages/ko.deepl.meta.json (audit trail)`);
}

void main().catch((err) => {
  console.error(err);
  process.exit(1);
});
