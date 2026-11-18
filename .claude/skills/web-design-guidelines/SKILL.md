---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the rules in `rules.md`, next to this file
2. Read the specified files (or ask the user for files or a pattern)
3. Check against every rule in `rules.md`
4. Output findings in the terse `file:line` format it describes

## Pinned, not fetched

Vercel's original fetches the rules from GitHub on every run. Here they are
pinned at `vercel-labs/web-interface-guidelines` commit `434b7f9` (MIT), so a
change upstream cannot change what this skill tells a session to do. To
update, read the new `command.md` and replace `rules.md` with it.

Several rules assume React or Next.js (`onKeyDown`, `priority` on images).
On this site, which is plain HTML, read them for what they protect.
CLAUDE.md outranks this file wherever they disagree.
