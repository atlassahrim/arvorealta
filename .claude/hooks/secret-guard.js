#!/usr/bin/env node
// Secret guard: a PreToolUse hook on Bash. Before a `git commit` runs, it
// reads the lines being added in every staged file and blocks the commit
// (exit 2) if one looks like a key or token. This repository is public, so
// a committed key is a published key.
//
// The key patterns and the placeholder rule are adapted from ECC v2.2.3,
// scripts/hooks/pre-bash-commit-quality.js (MIT, Affaan Mustafa). ECC's
// version only read .js, .ts, .py, .go and .rs files; this one reads every
// staged text file, because this site is HTML, Markdown, JSON and CSS.
//
// A line that really must hold such a string can carry `secret-guard: allow`.
// No dependencies. Node 18 or newer.

"use strict";
const { spawnSync } = require("child_process");

const PATTERNS = [
  { name: "Anthropic API key", re: /sk-ant-[A-Za-z0-9_-]{20,}/ },
  { name: "OpenAI API key", re: /sk-(?:proj-)?[A-Za-z0-9]{20,}/ },
  { name: "GitHub token", re: /gh[pousr]_[A-Za-z0-9]{36}/ },
  { name: "GitHub fine-grained token", re: /github_pat_[A-Za-z0-9_]{22,}/ },
  { name: "AWS access key", re: /AKIA[A-Z0-9]{16}/ },
  { name: "Google API key", re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: "Slack token", re: /xox[abprs]-[A-Za-z0-9-]{10,}/ },
  { name: "Private key", re: /-----BEGIN (?:[A-Z]+ )?PRIVATE KEY-----/ },
  { name: "API key", re: /api[_-]?key["']?\s*[=:]\s*['"]([^'"]+)['"]/i, value: 1 },
  { name: "API key", re: /api[_-]?key\s*[=:]\s*(?!['"])((?=[A-Za-z0-9_-]*\d)[A-Za-z0-9_-]{12,})/i, value: 1 },
];

// An obvious stand-in is not a secret: empty, an env reference, ${...},
// <PLACEHOLDER>, or a word like YOUR_API_KEY.
function isPlaceholder(v) {
  v = (v || "").trim();
  return (
    v.length === 0 ||
    /^process\.env\.[A-Za-z0-9_]+$/.test(v) ||
    /^\$\{[^}]*\}$/.test(v) ||
    /^<[^<>]*>$/.test(v) ||
    /^(REPLACE_ME|CHANGE_?ME|YOUR[_-]?(?:API[_-]?)?(?:KEY|TOKEN|SECRET)(?:[_-]?HERE)?|API[_-]?KEY|SECRET|TOKEN|KEY|TODO|TBD|FIXME|XXX+)$/i.test(v)
  );
}

// Scan a unified diff (git diff -U0). Returns [{file, line, name, hint}].
function scanDiff(diff) {
  const found = [];
  let file = null;
  let line = 0;
  for (const raw of diff.split("\n")) {
    if (raw.startsWith("+++ ")) {
      file = raw.startsWith("+++ b/") ? raw.slice(6) : null;
      continue;
    }
    const hunk = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)/);
    if (hunk) { line = Number(hunk[1]); continue; }
    if (!file || !raw.startsWith("+")) continue;
    const text = raw.slice(1);
    if (!text.includes("secret-guard: allow")) {
      for (const p of PATTERNS) {
        const m = text.match(p.re);
        if (m && !(p.value && isPlaceholder(m[p.value]))) {
          found.push({ file, line, name: p.name, hint: m[0].slice(0, 6) + "…" });
        }
      }
    }
    line++;
  }
  return found;
}

function main(input) {
  let data = {};
  try { data = JSON.parse(input); } catch { return 0; }
  const command = (data.tool_input && data.tool_input.command) || "";
  if (!/\bgit\b(?:\s+-C\s+\S+)?\s+commit\b/.test(command)) return 0;

  const cwd = data.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const r = spawnSync("git", ["diff", "--cached", "-U0", "--no-color", "--no-ext-diff"], {
    cwd, encoding: "utf8", maxBuffer: 256 * 1024 * 1024,
  });
  if (r.status !== 0) return 0; // not a repository, or nothing to read

  const found = scanDiff(r.stdout);
  if (found.length === 0) return 0;
  const lines = found.map((f) => `  ${f.file}:${f.line}  ${f.name} (${f.hint})`);
  process.stderr.write(
    "[secret-guard] Commit blocked: these staged lines look like keys or tokens.\n" +
    lines.join("\n") + "\n" +
    "This repository is public. Remove the value (an environment variable or a\n" +
    "network secret belongs there instead), or mark a line that is truly safe\n" +
    "with `secret-guard: allow`.\n"
  );
  return 2;
}

if (require.main === module) {
  let input = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (c) => { input += c; });
  process.stdin.on("end", () => process.exit(main(input)));
}

module.exports = { scanDiff, isPlaceholder, main };
