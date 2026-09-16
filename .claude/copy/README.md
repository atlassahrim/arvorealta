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

**Provenance note.** `stepzero-research.md`, `steptwo-plan.md`, the buyer-side
rerun prompt, `copywriting-ladder.md` and `gradient-copy` were folded in from
their originals. **`stepone-profile.md` and `stepthree-audit.md` were never
supplied.** `/profile` was reconstructed from a completed `profile.md` v2 output
plus the rules the other files state; `/audit` is built on Part II of the
ladder, which is the audit in full. Check `/profile` against your original
before trusting it.
