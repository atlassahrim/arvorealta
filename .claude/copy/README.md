# The copy pipeline

Four skills, one shared reference. Run them in order, one folder per market.

| Command | Reads | Writes |
|---|---|---|
| `/research market: X offer: Y geo: Z` | the web | `_research/<market>/voice.md`, `notes.md`, `trigger.md`, `competitor.md` |
| `/profile <market>` | those four | `_research/<market>/profile.md` + gap report |
| `/plan <market> price: N action: "..."` | `profile.md` | `_research/<market>/draft-v1.md` |
| `/audit <market> <draft>` | the draft + `profile.md` | one rewritten section |

`copywriting-ladder.md` in this folder is the shared framework. All four skills
read it. It is not duplicated inside them.

`gradient-copy` is a separate, account-level skill and stays that way. `/plan`
calls it for the writing itself.

**The pipeline stops rather than guesses.** `/plan` runs a five-check gate and
refuses to draft on a broken profile. That refusal is the most valuable thing
here — one round of drafting on a bad profile costs more than going back.

**Provenance.** All six originals were folded in: `stepzero-research.md`,
`stepone-profile.md`, `steptwo-plan.md`, `stepthree-audit.md`, the buyer-side
rerun prompt, and `copywriting-ladder.md`. `gradient-copy` stays account-level.

**One deliberate deviation from the originals.** `stepzero-research.md` says one
file per source, never merged. The pipeline writes four stacked files instead —
one per category — because that override was given explicitly in use. Sourcing is
preserved at section level inside each file, which is what section 10 actually
depends on.

**The tag set is five, not four.** `[VERIFIED]`, `[INFERRED]`, `[CLIENT]`,
`[MISSING]`, and `[ENTAILED]`. The last is permitted only in section 6 of the
profile and only under the deposition test. `/plan` is told whether section 6 is
sourced or entailed, and writes entailed material as the flattest thing on the
page. Breaking that link is how a gradient with no ceiling gets dressed up into an
invented one.
