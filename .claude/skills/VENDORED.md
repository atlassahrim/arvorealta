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
