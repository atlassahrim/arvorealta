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

## Three video skills (17 November 2026)

Installed for making instructional videos. Each was read in full, or scanned
where it carries code, before it was committed.

| skill | source | commit | licence |
|---|---|---|---|
| `ffmpeg-skill` | https://github.com/kajisho5/ffmpeg-skill, 3.10.1 | `f1c97cbffeac71b8fdfca2f790ceb00db3bcce65`, 15 Nov 2026 | MIT |
| `design-to-motion` | https://github.com/elayadesign/ai-design-skills, the last version before it moved out | `5e57840` (the parent of `ded7efc`) | MIT |
| `voicestudio` | https://github.com/debpalash/VoiceStudio, `skills/voicestudio/` | `73d6139597b1da411299b25c82953ee367e44273`, 17 Nov 2026 | AGPL-3.0 |

**`ffmpeg-skill`** is the repo's root `SKILL.md` with `scripts/`,
`references/`, `templates/` and `LICENSE`, 2.9 MB. The MCP server, the npm
installer, the tests, the demos and the evals are not copied. The scripts use
only the Python standard library. They launch nothing but `ffmpeg`, `ffprobe`,
their own scripts and a local `whisper` if one is installed. They contain no
network code and no `shell=True`. Needs FFmpeg 6.1+ and Python 3.10+, and this
container has 6.1.1 and 3.13. Smoke-tested with `probe.py` on
`assets/video/ground-paper-2-720.mp4`.

**`design-to-motion`** is one markdown file, with no scripts. Its own
author's repo, `elayadesign/Design-to-motion`, is not public, so this is the
last public version, taken from the history of `ai-design-skills`. Its one
network step is the Figma REST API, using the user's own token from the
environment. It records with Playwright and ffmpeg, and both are here.

**`voicestudio`** is one markdown file. It drives a VoiceStudio backend at
`localhost:3900`, which is a separate, large local app and **is not
installed**. Until it runs somewhere this skill can reach, the skill has
nothing to call. ElevenLabs is already connected to these sessions and is
the working voice route. The skill text is AGPL, so its `LICENSE` travels
with it.
