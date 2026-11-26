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

Vendored: `arv-banner-design`, `arv-brand`, `arv-design`,
`arv-design-system`, `arv-slides`, `arv-ui-styling`, `arv-ui-ux-pro-max`.
Upstream they are the same names without `arv-`.

Ours, and unrelated to the bundle: `arv-audit`, `arv-brand-book`,
`arv-eu-tender-documents`, `arv-plan`, `arv-profile`, `arv-research`,
`arv-taste-skill`.

**Every folder here carries `arv-` since 26 November 2026, at the owner's
word**, so none can be confused with the ECC plugin's skills. The prefix is
on the folder and on each `SKILL.md`'s `name:`.

## To update

Clone the repo at a new tag and copy each upstream `.claude/skills/<name>`
over `arv-<name>` here, for the seven names above. **Then run
`python3 -I _tools/skills/arv_prefix.py .`** from the repo root: the upstream
files arrive unprefixed, and it puts the prefix back on each `name:`, on the
`../<name>/` paths and on the names the skills use to call each other. Do
not copy the repo's own `src/` or root `scripts/` — those are its
maintenance tooling, not skills, and the root `scripts/refresh-*.py` reach out
to Google Fonts and Phosphor to rebuild catalogues. Nothing under the seven
installed skills makes a network request.

## What was checked before installing

Every script under the seven skills was scanned for outbound requests, for
reads of environment variables, credentials, `~/.ssh` or `~/.netrc`, and for
destructive file operations. There are none. The `subprocess` calls are the
bundle's own tests, its token validators, and `arv-ui-styling/scripts/shadcn_add.py`,
which shells out to `npx shadcn add` — **that one installs npm packages, so
read what it is adding before running it in a repo that has no build step.**

# Four skills from ECC

**Everything Claude Code (ECC)** by Affaan Mustafa was installed as a
project plugin on 26 November 2026, at the owner's word, and trimmed the
same day, also at his word, to the four skills below. Nothing of the plugin
is left: `.claude/settings.json` no longer declares it, and its rule packs
are deleted.

| | |
|---|---|
| Source | https://github.com/affaan-m/ECC (formerly `everything-claude-code`) |
| Copied from | tag `v2.2.3`, commit `c05b2d6614f62f6db0047669aa4eefb223d478f9`, 1 October 2026 |
| Licence | MIT |
| Copied | 26 November 2026 |
| Skills | `arv-seo`, `arv-accessibility`, `arv-benchmark`, `arv-security-scan`: one `SKILL.md` each, from upstream `skills/<name>/` |
| Always-on cost | about 340 tokens, the four descriptions in the skill list |

**What changed from upstream:**

- Each `name:` takes `arv-`.
- `arv-benchmark` keeps its baselines in `_benchmarks/`, not
  `.ecc/benchmarks/`, so the underscore keeps them off the site. It calls
  itself `/arv-benchmark`. Two lines pointing at `/canary-watch` and
  `/browser-qa`, which are not installed, are removed.
- `arv-security-scan` pins its scanner to `ecc-agentshield@1.6.0` on all 13
  calls; 1.6.0 was published by 10 September 2026. **It still downloads that
  package from npm each time it runs.** The pin only means it is the same code
  every time.

## The secret guard is ours, not ECC's

`.claude/hooks/secret-guard.js`, run by `.claude/settings.json` before every
Bash command. It acts only on `git commit`: it reads the added lines of every
staged file and blocks the commit if one looks like a key or a token. Its
patterns and its placeholder rule are adapted from ECC's
`scripts/hooks/pre-bash-commit-quality.js`, which only read `.js`, `.ts`,
`.py`, `.go` and `.rs` files, so it never saw this repo's HTML, Markdown,
JSON or CSS. Tested on 10 cases in a throwaway repo, and live in a session
with a dry-run commit. Run across all 354 tracked text files, it flags
nothing.

## To update

Copy upstream `skills/<name>/SKILL.md` from a new tag over
`arv-<name>/SKILL.md` for the four names above, run
`python3 -I _tools/skills/arv_prefix.py .` to put the prefix back on each
`name:`, and make the edits listed above again. Before moving the scanner
pin, check that the new `ecc-agentshield` version is at least two weeks old.

## History: the full plugin, for one day

It was `ecc@ecc` 2.2.3, declared in `.claude/settings.json` and pinned to
the same tag. It held 387 skills and command shims, 68 agents and hooks on
7 events, and cost about 44,834 tokens in every session, plus about 4,600
for its `common` rules in `.claude/rules/ecc/`. The check run on its hook
code before installing found no outbound request except to loopback, no
credential reads, and deletes only of its own state files. That entry, and
the install, are in git at commit `94f565f`.
