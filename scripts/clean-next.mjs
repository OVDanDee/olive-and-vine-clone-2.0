#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const soft = process.argv.includes("--soft");
const nextDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", ".next");

if (!fs.existsSync(nextDir)) {
  process.exit(0);
}

function sleep(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

let removed = false;
let lastError = null;

for (let attempt = 1; attempt <= 8; attempt++) {
  try {
    fs.rmSync(nextDir, {
      recursive: true,
      force: true,
      maxRetries: 10,
      retryDelay: 300,
    });
    removed = true;
    break;
  } catch (err) {
    lastError = err;
    if (attempt < 8) sleep(400);
  }
}

if (removed) {
  console.log("Removed .next cache");
  process.exit(0);
}

const hint =
  "Stop `npm run dev` first (Ctrl+C), then run: npm run clean";

if (soft) {
  console.warn(
    `[clean] Could not remove .next (${lastError?.code ?? "unknown"}). ${hint}`
  );
  process.exit(0);
}

console.error(`[clean] Failed to remove .next: ${lastError?.message}\n  ${hint}`);
process.exit(1);
