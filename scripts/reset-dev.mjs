#!/usr/bin/env node
/**
 * Stops dev server on port 3000, clears .next, verifies lightningcss, then starts dev.
 */
import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = process.env.PORT || "3000";

function run(cmd, opts = {}) {
  execSync(cmd, { cwd: root, stdio: "inherit", ...opts });
}

// Stop processes listening on port 3000 (macOS/Linux)
try {
  const pids = execSync(`lsof -ti:${port}`, { encoding: "utf8" }).trim();
  if (pids) {
    console.log(`Stopping process(es) on port ${port}: ${pids.replace(/\n/g, ", ")}`);
    run(`kill -9 ${pids.split("\n").join(" ")}`);
  }
} catch {
  /* nothing on port */
}

// Clear Turbopack/Next cache
const nextDir = path.join(root, ".next");
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
  console.log("Removed .next");
}

run("node scripts/ensure-lightningcss-native.mjs");

console.log("\nStarting dev server...\n");
const child = spawn("npm", ["run", "dev"], { cwd: root, stdio: "inherit", shell: true });
child.on("exit", (code) => process.exit(code ?? 0));
