# Vendored skills

Six of the skills in this folder are not ours. Five come from one upstream
bundle and one from a second source, and all are committed so a session on
this repo has them without a network fetch.

| | |
|---|---|
| Source | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| Plugin | `ui-ux-pro-max` 2.13.0 |
| Commit | `477bcb28c9812b385cb51a4605ddf30d7b2266e2`, 3 October 2026 |
| Licence | MIT |
| Installed | 4 October 2026 |
| Size | 11 MB, most of it the font and icon catalogues |

Vendored: `banner-design`, `brand`, `design-system`, `slides`,
`ui-ux-pro-max`. **`design` and `ui-styling` came with the bundle and were
removed on 17 November, at the owner's word**: `design` because its image
generation needs a paid key from Gemini, MuAPI or Atlas Cloud, and
`ui-styling` because it needs Node and shadcn on a site with no build step.
`design-system` still lists `ui-styling` under *Skill Dependencies*. That is
a note about Tailwind config, no script calls it, and the file is left
untouched on purpose.

Ours, and unrelated to the bundle: `audit`, `eu-tender-documents`, `plan`,
`profile`, `research`, `taste-skill`.

## To update

Clone the repo at a new tag and copy `.claude/skills/*` over the five names
above. Do not bring `design` or `ui-styling` back with them. Do not copy the repo's own `src/` or root `scripts/` — those are its
maintenance tooling, not skills, and the root `scripts/refresh-*.py` reach out
to Google Fonts and Phosphor to rebuild catalogues. Nothing under the seven
installed skills makes a network request.

## What was checked before installing

Every script under the seven skills was scanned for outbound requests, for
reads of environment variables, credentials, `~/.ssh` or `~/.netrc`, and for
destructive file operations. There are none. The `subprocess` calls are the
bundle's own tests, its token validators, and `ui-styling/scripts/shadcn_add.py`,
which shells out to `npx shadcn add`. That skill is removed, so the warning
is history.

## Three video skills (17 November 2026), one kept

Installed for making instructional videos. Each was read in full, or scanned
where it carries code, before it was committed. **The same day the owner
kept `ffmpeg-skill` and removed the other two**, so the rows for
`design-to-motion` and `voicestudio` below are history: where they came
from, if either is wanted back.

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

**`design-to-motion`** (removed) was one markdown file, with no scripts. Its own
author's repo, `elayadesign/Design-to-motion`, is not public, so this is the
last public version, taken from the history of `ai-design-skills`. Its one
network step is the Figma REST API, using the user's own token from the
environment. It records with Playwright and ffmpeg, and both are here.

**`voicestudio`** (removed) was one markdown file. It drives a VoiceStudio backend at
`localhost:3900`, which is a separate, large local app and **is not
installed**. Until it runs somewhere this skill can reach, the skill has
nothing to call. ElevenLabs is already connected to these sessions and is
the working voice route. The skill text is AGPL, so its `LICENSE` travels
with it.

## Not installed: free-claude-code (17 November 2026)

Checked at the owner's request and **not installed**. None of the three
candidates is a usable skill for a cloud session:

- `Alishahryar1/free-claude-code` (AGPL-3.0, 71k stars) is not a skill. It is
  a local proxy server that sends Claude Code's requests to other model
  providers. It installs with `curl … | sh`, has to run on a computer, and
  cannot change the model that serves a cloud session. On a free tier it
  would also send this repo's prompts and files to third-party providers.
- `reason-machines/claude-code-skills` → `free-claude-code-proxy` is a
  generated how-to for that same proxy, with the same limits.
- `reason-machines/claude-code-skills` → `free-claude-code-ai-desktop-app`
  is **unsafe**. It downloads a Windows `.exe` from an organisation named
  `anthropic-claude-code-ai`, which does not exist on GitHub, and runs it as
  Administrator. That is the shape of a malware lure that borrows a
  trusted name.
- `prince3626ezechiel-lang/…/free-claude-code` is one person's French notes
  for the proxy, with paths on their own server.

## Design skills, 18 November 2026

Checked at the owner's request. All three installed are markdown only and
make no network request.

| skill | source | commit | licence |
|---|---|---|---|
| `emil-design-eng` | https://github.com/emilkowalski/skills | `64eb3deb9a5fbfa041faf783e0bc3fd635872e9c`, 15 Nov 2026 | MIT |
| `choreograph` | the same repo; `emil-design-eng` points to it for staggered entrances | same | MIT |
| `web-design-guidelines` | https://github.com/vercel-labs/agent-skills, rules from https://github.com/vercel-labs/web-interface-guidelines | rules at `434b7f91364665f2f733b310ec54809bf8f37937` | MIT (the rules repo) |

**`web-design-guidelines` is pinned, not fetched.** Vercel's original
fetches its rules from GitHub at every run, so whoever controls that file
controls what the skill tells a session to do. Here the rules are
`rules.md` beside the skill, read once before install, and the skill
text is rewritten to read them locally. Emil's other eighteen skills were
not installed: most are for React, Swift or Expo apps, which this site
does not have.

**Already installed:** `ui-ux-pro-max`, from October. Upstream has moved
since (last push 16 Nov), and updating it is a separate step.

**Not installed: `extract-design-system`** (`arvindrk`, MIT). The skill
runs `npx extract-design-system` unpinned, so it executes whatever npm
serves that day. The published 0.1.11 does not match its own source: npm
depends on `dembrandt ^0.7` and the repo on `^0.13`. It also runs
`npx playwright install`, which this container's own notes forbid.

**Not installed: "brand kit".** No single skill goes by that name. The
best-known nearby one, `fatihaydost/brand-identity-skill` (MIT, 407 stars),
downloads Python packages with `uv` on first use. The owner has not yet
said which one is meant. `brand` from the vendored bundle is already here.
