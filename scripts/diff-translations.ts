/**
 * Diff report: messages/ko.legacy.json (hand-written)  vs  messages/ko.json (DeepL).
 *
 * Produces `docs/translation-diff-report.md` with:
 *   - Count of changed keys
 *   - Side-by-side diff for each changed key
 *   - Identical keys listed in a collapsed section
 *
 * Run AFTER translate-with-deepl.ts:
 *   npx tsx scripts/diff-translations.ts
 */
import * as fs from "fs";

type Json = string | number | boolean | null | Json[] | { [k: string]: Json };

function flatten(node: Json, path: string[] = [], out: Map<string, string> = new Map()): Map<string, string> {
  if (typeof node === "string") {
    out.set(path.join("."), node);
  } else if (Array.isArray(node)) {
    node.forEach((item, i) => flatten(item, [...path, String(i)], out));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) flatten(v as Json, [...path, k], out);
  }
  return out;
}

function main(): void {
  if (!fs.existsSync("messages/ko.legacy.json") || !fs.existsSync("messages/ko.json")) {
    console.error("✗ Need both messages/ko.legacy.json and messages/ko.json to diff.");
    process.exit(1);
  }
  const legacy = flatten(JSON.parse(fs.readFileSync("messages/ko.legacy.json", "utf8")));
  const fresh = flatten(JSON.parse(fs.readFileSync("messages/ko.json", "utf8")));
  const en = flatten(JSON.parse(fs.readFileSync("messages/en.json", "utf8")));

  const allKeys = new Set([...legacy.keys(), ...fresh.keys()]);
  const changed: Array<{ key: string; en: string; legacy: string; fresh: string }> = [];
  const onlyLegacy: string[] = [];
  const onlyFresh: string[] = [];
  const identical: string[] = [];

  for (const k of allKeys) {
    const a = legacy.get(k);
    const b = fresh.get(k);
    if (a === undefined) { onlyFresh.push(k); continue; }
    if (b === undefined) { onlyLegacy.push(k); continue; }
    if (a === b) identical.push(k);
    else changed.push({ key: k, en: en.get(k) ?? "(n/a)", legacy: a, fresh: b });
  }

  let md = "# Translation Diff Report — Legacy vs DeepL\n\n";
  md += `Generated: ${new Date().toISOString()}\n\n`;
  md += `## Summary\n\n`;
  md += `| Category | Count |\n|---|---:|\n`;
  md += `| Total keys compared | ${allKeys.size} |\n`;
  md += `| **Changed** (legacy ≠ DeepL) | ${changed.length} |\n`;
  md += `| Identical | ${identical.length} |\n`;
  md += `| Only in legacy | ${onlyLegacy.length} |\n`;
  md += `| Only in DeepL (new) | ${onlyFresh.length} |\n\n`;

  md += `## Changed translations (${changed.length})\n\n`;
  md += `Each row: **key** / EN source / legacy KO / DeepL KO.\nReview DeepL output and accept/reject.\n\n`;
  for (const c of changed) {
    md += `### \`${c.key}\`\n\n`;
    md += `- **EN**: ${c.en}\n`;
    md += `- **Legacy**: ${c.legacy}\n`;
    md += `- **DeepL**:  ${c.fresh}\n\n`;
  }

  if (onlyLegacy.length) {
    md += `## Orphan keys in legacy (${onlyLegacy.length})\n\n`;
    md += `These existed in hand-written Korean but are missing from the DeepL output — likely dropped during extraction or renamed.\n\n`;
    for (const k of onlyLegacy) md += `- \`${k}\`: ${legacy.get(k)?.slice(0, 100)}\n`;
    md += "\n";
  }
  if (onlyFresh.length) {
    md += `## New keys in DeepL (${onlyFresh.length})\n\n`;
    for (const k of onlyFresh) md += `- \`${k}\`: ${fresh.get(k)?.slice(0, 100)}\n`;
    md += "\n";
  }

  md += `<details>\n<summary>Identical (${identical.length})</summary>\n\n`;
  for (const k of identical.slice(0, 500)) md += `- \`${k}\`\n`;
  if (identical.length > 500) md += `…and ${identical.length - 500} more.\n`;
  md += `</details>\n`;

  fs.mkdirSync("docs", { recursive: true });
  fs.writeFileSync("docs/translation-diff-report.md", md, "utf8");
  console.log(`✓ docs/translation-diff-report.md  (${changed.length} changed, ${identical.length} identical)`);
}

main();
