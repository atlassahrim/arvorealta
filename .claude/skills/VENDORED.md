# Vendored skills

Seven of the skills in this folder are not ours. They come from one upstream
bundle and are committed whole so a session on this repo has them without a
network fetch.

| | |
|---|---|
| Source | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| Plugin | `ui-ux-pro-max` 2.13.0 |
| Commit | `477bcb28c9812b385cb51a4605ddf30d7b2266e2`, 3 October 2026 |
| Licence | MIT |
| Installed | 4 October 2026 |
| Size | 11 MB, most of it the font and icon catalogues |

Vendored: `banner-design`, `brand`, `design`, `design-system`, `slides`,
`ui-styling`, `ui-ux-pro-max`.

Ours, and unrelated to the bundle: `audit`, `eu-tender-documents`, `plan`,
`profile`, `research`, `taste-skill`.

## To update

Clone the repo at a new tag and copy `.claude/skills/*` over the seven names
above. Do not copy the repo's own `src/` or root `scripts/` — those are its
maintenance tooling, not skills, and the root `scripts/refresh-*.py` reach out
to Google Fonts and Phosphor to rebuild catalogues. Nothing under the seven
installed skills makes a network request.

## What was checked before installing

Every script under the seven skills was scanned for outbound requests, for
reads of environment variables, credentials, `~/.ssh` or `~/.netrc`, and for
destructive file operations. There are none. The `subprocess` calls are the
bundle's own tests, its token validators, and `ui-styling/scripts/shadcn_add.py`,
which shells out to `npx shadcn add` — **that one installs npm packages, so
read what it is adding before running it in a repo that has no build step.**

# ECC, a plugin rather than a copy

**Everything Claude Code (ECC)** by Affaan Mustafa is installed as a Claude
Code plugin at project scope, at the owner's word on 26 November 2026 ("full
install, hooks included"). Unlike the bundle above, it is **not committed**:
`.claude/settings.json` declares where it lives, and Claude Code fetches it
when a session starts. Only its rule packs are copied in, because a plugin
cannot carry rules.

| | |
|---|---|
| Source | https://github.com/affaan-m/ECC (formerly `everything-claude-code`) |
| Plugin | `ecc@ecc` 2.2.3 |
| Pinned to | tag `v2.2.3`, commit `c05b2d6614f62f6db0047669aa4eefb223d478f9`, 1 October 2026 |
| Licence | MIT |
| Installed | 26 November 2026, `claude plugin marketplace add 'affaan-m/ECC#v2.2.3' --scope project`, then `claude plugin install ecc@ecc --scope project` |
| Contents | 387 skills and command shims, 68 agents, hooks on 7 events, one MCP definition (`chrome-devtools`) |
| Always-on cost | about 44,834 tokens in every session, from `claude plugin details ecc@ecc` |
| Copied in | `.claude/rules/ecc/common/` and `.claude/rules/ecc/web/`, 84 KB, byte-identical to the tag |

## To update

1. Change `ref` in `.claude/settings.json` to the new tag. Pin a tag, never
   `main`: the hooks run code on every tool call.
2. Copy `rules/common` and `rules/web` from that tag over
   `.claude/rules/ecc/`.
3. Repeat the check below on the new tag, and update this table.

## What was checked before installing

The check ran on `scripts/hooks/` and `scripts/lib/` at the pinned tag, in
the copy Claude Code installed (`~/.claude/plugins/cache/ecc/ecc/2.2.3/`).

- **Network.** One outbound request in the hooks, in
  `plan-canvas-pending.js`, and it goes to a loopback port the plugin opens
  itself. The other `fetch` calls are browser code for its local canvas
  pages. There is no telemetry upload. The cost tracker writes to local
  files.
- **Credentials.** No hook reads `~/.ssh`, `.netrc`, cloud keys or API
  tokens. The two places that mention `GITHUB_TOKEN` delete it from a child
  process's environment. GateGuard lists credential filenames so it can stop
  edits to them.
- **Deletes.** Every `rmSync` or `unlinkSync` in the hooks removes the
  plugin's own state, temp or quarantine files.
- **Blocking.** The hooks that can stop a tool call are GateGuard, which
  refuses the first Edit or Write of each file until questions about it are
  answered; the dev-server blocker; config protection on linter files; and
  the secret check in the pre-commit hook. Commit-message format is a
  warning, never a block.
