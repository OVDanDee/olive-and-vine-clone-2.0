#!/usr/bin/env node

/**
 * Codemod: Apply DeepL-translated messages to source code
 *
 * Walks all .tsx/.ts files in app/[locale]/ and app/components/, finds inline
 * translation objects like `{ en: value, ko: value }`, and replaces the `ko`
 * values with DeepL-translated equivalents from messages/ko.json.
 *
 * Run: npx ts-node scripts/apply-deepl-to-source.ts
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");

interface TranslationEntry {
  en: string | string[] | Record<string, any>;
  ko: string | string[] | Record<string, any>;
}

interface FlatMessage {
  path: string[];
  enValue: string;
  koValue: string;
}

/**
 * Flatten a nested JSON object into a list of { path, enValue, koValue } entries
 */
function flattenMessages(obj: any, path_arr: string[] = []): FlatMessage[] {
  const result: FlatMessage[] = [];

  if (typeof obj !== "object" || obj === null) {
    return result;
  }

  for (const key in obj) {
    const val = obj[key];
    const currentPath = [...path_arr, key];

    if (typeof val === "string") {
      result.push({
        path: currentPath,
        enValue: val,
        koValue: val,
      });
    } else if (Array.isArray(val)) {
      val.forEach((item: any, idx: number) => {
        if (typeof item === "string") {
          result.push({
            path: [...currentPath, idx.toString()],
            enValue: item,
            koValue: item,
          });
        }
      });
    } else if (typeof val === "object") {
      result.push(...flattenMessages(val, currentPath));
    }
  }

  return result;
}

/**
 * Load en.json and ko.json, flatten them, and return a lookup map
 */
function loadTranslationMaps(): {
  enMessages: Record<string, any>;
  koMessages: Record<string, any>;
  enToKoMap: Map<string, string>;
} {
  const enPath = path.join(REPO_ROOT, "messages", "en.json");
  const koPath = path.join(REPO_ROOT, "messages", "ko.json");

  const enMessages = JSON.parse(fs.readFileSync(enPath, "utf-8"));
  const koMessages = JSON.parse(fs.readFileSync(koPath, "utf-8"));

  // Build a map from en string value to ko string value
  const enToKoMap = new Map<string, string>();

  function mapEntries(en: any, ko: any) {
    if (typeof en === "string" && typeof ko === "string") {
      enToKoMap.set(en, ko);
    } else if (Array.isArray(en) && Array.isArray(ko)) {
      en.forEach((e: any, i: number) => {
        if (typeof e === "string" && typeof ko[i] === "string") {
          enToKoMap.set(e, ko[i]);
        }
      });
    } else if (typeof en === "object" && typeof ko === "object") {
      for (const key in en) {
        mapEntries(en[key], ko[key]);
      }
    }
  }

  mapEntries(enMessages, koMessages);

  return { enMessages, koMessages, enToKoMap };
}

/**
 * Find and replace inline translation objects in source code
 */
function processSourceFile(
  filePath: string,
  enToKoMap: Map<string, string>,
  reportLines: string[]
): { modified: boolean; newContent: string } {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  // Simple pattern: match `{ en: ..., ko: ... }` using a more permissive regex
  const translationObjectRegex =
    /{\s*(en|ko)\s*:\s*([^,}]+),\s*(en|ko)\s*:\s*([^}]+)\s*}/g;

  let match;
  const matches: Array<{
    fullMatch: string;
    firstKey: string;
    firstValue: string;
    secondKey: string;
    secondValue: string;
    startIdx: number;
  }> = [];

  // Extract all matches first to avoid string manipulation during iteration
  while ((match = translationObjectRegex.exec(content)) !== null) {
    matches.push({
      fullMatch: match[0],
      firstKey: match[1],
      firstValue: match[2],
      secondKey: match[3],
      secondValue: match[4],
      startIdx: match.index,
    });
  }

  // Process matches in reverse order to preserve indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];

    // Extract the actual en and ko values
    let enVal = "";
    let koVal = "";

    if (m.firstKey === "en") {
      enVal = m.firstValue;
      koVal = m.secondValue;
    } else {
      koVal = m.firstValue;
      enVal = m.secondValue;
    }

    // Trim quotes and whitespace
    enVal = enVal.trim().replace(/^["']|["']$/g, "");
    koVal = koVal.trim().replace(/^["']|["']$/g, "");

    // Look up en value in the translation map
    const translatedKo = enToKoMap.get(enVal);

    if (translatedKo && translatedKo !== koVal) {
      // Replace the old ko value with the new one
      const newMatch = m.fullMatch.replace(
        /ko\s*:\s*["']([^"']*)["']/,
        `ko: "${translatedKo}"`
      );

      content = content.substring(0, m.startIdx) + newMatch + content.substring(m.startIdx + m.fullMatch.length);
      modified = true;
      reportLines.push(
        `  - ${path.relative(REPO_ROOT, filePath)}: "${enVal}" → ko: "${translatedKo}"`
      );
    } else if (!translatedKo) {
      // Log unmapped strings
      reportLines.push(
        `  - ${path.relative(REPO_ROOT, filePath)}: UNMAPPED: "${enVal}" (current ko: "${koVal}")`
      );
    }
  }

  return { modified, newContent: content };
}

/**
 * Walk directory tree and process all .ts/.tsx files
 */
function walkDirectory(dir: string, callback: (filePath: string) => void) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith(".") && file !== "node_modules") {
        walkDirectory(filePath, callback);
      }
    } else if (file.endsWith(".ts") || file.endsWith(".tsx")) {
      callback(filePath);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log("[apply-deepl-to-source] Loading translation mappings...");
  const { enToKoMap } = loadTranslationMaps();
  console.log(`[apply-deepl-to-source] Loaded ${enToKoMap.size} translation entries`);

  const reportLines: string[] = [
    "# DeepL Translation Application Report",
    "",
    "## Modified Files",
    "",
  ];

  const appLocaleDir = path.join(REPO_ROOT, "app", "[locale]");
  const appComponentsDir = path.join(REPO_ROOT, "app", "components");

  const filesToProcess: string[] = [];

  // Collect files from both directories
  if (fs.existsSync(appLocaleDir)) {
    walkDirectory(appLocaleDir, (f: string) => filesToProcess.push(f));
  }
  if (fs.existsSync(appComponentsDir)) {
    walkDirectory(appComponentsDir, (f: string) => filesToProcess.push(f));
  }

  console.log(`[apply-deepl-to-source] Processing ${filesToProcess.length} files...`);

  let filesModified = 0;

  for (const filePath of filesToProcess) {
    const fileReportStart = reportLines.length;
    const { modified, newContent } = processSourceFile(filePath, enToKoMap, reportLines);

    if (modified) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      filesModified++;
      console.log(`  ✓ ${path.relative(REPO_ROOT, filePath)}`);
    }
  }

  // Write report
  reportLines.push("");
  reportLines.push(`## Summary`);
  reportLines.push(`- Files processed: ${filesToProcess.length}`);
  reportLines.push(`- Files modified: ${filesModified}`);
  reportLines.push(`- Translation entries mapped: ${enToKoMap.size}`);

  const reportPath = path.join(REPO_ROOT, "docs", "deepl-apply-report.md");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, reportLines.join("\n"), "utf-8");

  console.log(
    `[apply-deepl-to-source] ✓ Applied translations to ${filesModified} files`
  );
  console.log(`[apply-deepl-to-source] Report written to ${reportPath}`);
}

try {
  main();
} catch (err) {
  console.error("[apply-deepl-to-source] Error:", err);
  process.exit(1);
}
