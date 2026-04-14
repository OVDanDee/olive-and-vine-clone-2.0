/**
 * Upload i18n/glossary.json to DeepL as an EN→KO glossary.
 *
 * DeepL enforces glossary term pairs verbatim during translation, which is
 * critical for accounting/HK-specific terminology (e.g. "Profits Tax" must
 * always be "이윤세", never DeepL's default "수익세"/"이익세" drift).
 *
 * Usage:
 *   DEEPL_API_KEY=... npx tsx scripts/deepl-glossary.ts upload
 *   DEEPL_API_KEY=... npx tsx scripts/deepl-glossary.ts list
 *   DEEPL_API_KEY=... npx tsx scripts/deepl-glossary.ts delete <id>
 *
 * After upload, copy the returned glossary_id into .env.local as:
 *   DEEPL_GLOSSARY_ID=<id>
 * and the translate script will automatically apply it.
 */
import * as fs from "fs";

const API_KEY = process.env.DEEPL_API_KEY;
if (!API_KEY) {
  console.error("✗ DEEPL_API_KEY not set. Add it to .env.local or export it.");
  process.exit(1);
}

// DeepL Free plan uses api-free.deepl.com; Pro uses api.deepl.com.
// Free keys end with ":fx"; detect automatically.
const BASE = API_KEY.endsWith(":fx") ? "https://api-free.deepl.com" : "https://api.deepl.com";

type GlossaryFile = {
  _meta?: unknown;
  _review_pending?: boolean;
  terms: Record<string, string | null>;
};

async function upload(): Promise<void> {
  const raw = JSON.parse(fs.readFileSync("i18n/glossary.json", "utf8")) as GlossaryFile;

  if (raw._review_pending) {
    console.warn(
      "⚠  i18n/glossary.json has `_review_pending: true` — confirm terms have been\n" +
        "   reviewed by Rebecca/Miyoung before uploading. Set to false to proceed."
    );
    if (process.env.FORCE !== "1") {
      console.error("   Re-run with FORCE=1 to override.");
      process.exit(1);
    }
  }

  const pairs = Object.entries(raw.terms).filter(([, v]) => v !== null) as [string, string][];
  // DeepL glossary format: TSV "source<TAB>target\n"
  const tsv = pairs.map(([en, ko]) => `${en}\t${ko}`).join("\n");

  const body = new URLSearchParams({
    name: `olive-vine-accounting-${new Date().toISOString().slice(0, 10)}`,
    source_lang: "EN",
    target_lang: "KO",
    entries: tsv,
    entries_format: "tsv",
  });

  const res = await fetch(`${BASE}/v2/glossaries`, {
    method: "POST",
    headers: {
      Authorization: `DeepL-Auth-Key ${API_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!res.ok) {
    console.error(`✗ DeepL API error ${res.status}: ${await res.text()}`);
    process.exit(1);
  }

  const data = (await res.json()) as { glossary_id: string; entry_count: number; name: string };
  console.log(`✓ Uploaded glossary "${data.name}"`);
  console.log(`  glossary_id: ${data.glossary_id}`);
  console.log(`  entries:     ${data.entry_count}`);
  console.log(`\nAdd this to .env.local:\n  DEEPL_GLOSSARY_ID=${data.glossary_id}`);
}

async function list(): Promise<void> {
  const res = await fetch(`${BASE}/v2/glossaries`, {
    headers: { Authorization: `DeepL-Auth-Key ${API_KEY}` },
  });
  const data = (await res.json()) as { glossaries: Array<{ glossary_id: string; name: string; source_lang: string; target_lang: string; entry_count: number; creation_time: string }> };
  if (!data.glossaries || data.glossaries.length === 0) {
    console.log("(no glossaries)");
    return;
  }
  for (const g of data.glossaries) {
    console.log(`${g.glossary_id}  ${g.source_lang}→${g.target_lang}  ${g.entry_count.toString().padStart(4)} entries  ${g.name}`);
  }
}

async function del(id: string): Promise<void> {
  const res = await fetch(`${BASE}/v2/glossaries/${id}`, {
    method: "DELETE",
    headers: { Authorization: `DeepL-Auth-Key ${API_KEY}` },
  });
  if (res.status === 204) console.log(`✓ deleted ${id}`);
  else console.error(`✗ ${res.status}: ${await res.text()}`);
}

const [cmd, arg] = process.argv.slice(2);
const action =
  cmd === "upload" ? upload() :
  cmd === "list" ? list() :
  cmd === "delete" && arg ? del(arg) :
  (console.error("Usage: deepl-glossary.ts {upload|list|delete <id>}"), process.exit(1));
void action;
