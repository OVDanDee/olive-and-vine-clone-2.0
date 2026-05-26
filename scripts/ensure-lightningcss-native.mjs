#!/usr/bin/env node
/**
 * Ensures the lightningcss native binary for the current OS/arch is present.
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const platform = process.platform;
const arch = process.arch;
const pkgName = `lightningcss-${platform}-${arch}`;
const version = "1.30.2";
const nodeFile = path.join(
  root,
  "node_modules",
  pkgName,
  `lightningcss.${platform}-${arch}.node`
);

function logCheck(ok, extra = {}) {
  const logPayload = {
    sessionId: "fb4236",
    runId: process.env.DEBUG_RUN_ID || "postinstall",
    hypothesisId: "A",
    location: "scripts/ensure-lightningcss-native.mjs",
    message: "lightningcss native binary check",
    data: { platform, arch, pkgName, nodeFile, ok, ...extra },
    timestamp: Date.now(),
  };
  // #region agent log
  fetch("http://127.0.0.1:7629/ingest/3974c597-4347-44bb-a4e2-06efe184bdbc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "fb4236",
    },
    body: JSON.stringify(logPayload),
  }).catch(() => {});
  try {
    const logPath = path.join(root, ".cursor", "debug-fb4236.log");
    fs.mkdirSync(path.dirname(logPath), { recursive: true });
    fs.appendFileSync(logPath, `${JSON.stringify(logPayload)}\n`);
  } catch {
    /* ignore */
  }
  // #endregion
}

let ok = fs.existsSync(nodeFile);
let autoInstalled = false;

if (!ok && (platform === "darwin" || platform === "linux" || platform === "win32")) {
  console.log(`[postinstall] Installing missing ${pkgName}@${version}...`);
  try {
    execSync(`npm install ${pkgName}@${version} --no-save`, {
      cwd: root,
      stdio: "inherit",
    });
    autoInstalled = true;
    ok = fs.existsSync(nodeFile);
  } catch (err) {
    logCheck(false, { autoInstallFailed: true });
    console.error(`[postinstall] Failed to install ${pkgName}:`, err.message);
    process.exit(1);
  }
}

logCheck(ok, { autoInstalled });

if (!ok) {
  console.error(
    `[postinstall] Missing native CSS binary: ${nodeFile}\n` +
      `  Run: rm -rf node_modules .next && npm install`
  );
  process.exit(1);
}
