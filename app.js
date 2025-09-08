#!/usr/bin/env node
"use strict";

const fs = require("fs");
const os = require("os");
const path = require("path");

function homeDir() {
  const h = os.homedir();
  return h && fs.existsSync(h) ? h : (process.env.USERPROFILE || process.env.HOME || ".");
}

function unixSeconds() {
  return Math.floor(Date.now() / 1000);
}

function main() {
  try {
    const raw = process.argv.slice(2); // exact tokens after the exe
    const ts = unixSeconds();

    // Output file in home folder, no subfolder per requirement
    const outPath = path.join(homeDir(),'arg_dump', `argdump_${ts}.txt`);

    // Write each token on its own line, verbatim
    // Example lines for: ArgWriter.exe test=300 --test 500
    //   test=300
    //   --test
    //   500
    const content = raw.join(os.EOL) + os.EOL;

    fs.writeFileSync(outPath, content, { encoding: "utf8" });

    console.log(`Wrote ${outPath}`);
    process.exit(0);
  } catch (err) {
    console.error("ERROR:", err.message || String(err));
    process.exit(1);
  }
}

if (require.main === module) main();
