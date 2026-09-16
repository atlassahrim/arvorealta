---
name: profile
description: "Step 01 of the copy pipeline. Build a tagged reader profile from research files — identity, trigger, awareness, sophistication, low and high position, alternative set, objections, decision mechanics, verbatim language capture, disqualification, and the handoff block. Use after /research, or when asked to build or rebuild a reader profile for a market. Tags every field VERIFIED, INFERRED, CLIENT or MISSING and never invents the verbatim table."
---

# Profile — step 01

Read `.claude/copy/copywriting-ladder.md` in full before starting. Confirm you
have read it.

**Invocation:** `/profile <market-slug>` · optionally `entry: outbound|inbound`

Read **all four** files in `_research/<market-slug>/` — `voice.md`, `notes.md`,
`trigger.md`, `competitor.md` — before asking the user anything. Write
`_research/<market-slug>/profile.md`.

If the research files are not there, stop and say so. Do not reconstruct them
from conversation.

---

## The two rules that make this file worth having

**Tag every field.** `[VERIFIED]` with the source, `[INFERRED]` with what it rests
on, `[CLIENT]` where the user supplied it from their own selling experience, or
`[MISSING]`. An untagged field will be read as fact by `/plan`.

**`[MISSING]` is an answer.** Write it. A profile with four honest gaps is worth
more than one with four confident inventions, because `/plan` gates on exactly
those fields and a fabricated one passes the gate and fails the page.

**Never generate section 10.** Verbatim only, lifted from `voice.md`, with the
source and the population on every row. If there is nothing to lift, the rows stay
empty and the gap report says so.

---

## The sections

Open with the date, the stage covered, the entry point, and the sources read.
Then, where the reader is chosen from a wider field, name **the fork not taken**
and what it rests on — a market that splits and is not split produces copy for
nobody.

1. **Identity** — invented name, age, role, company type and size. Where they
   physically are when they read this. What their week is shaped by. Who they
   answer to. What competence looks like in their world.
2. **The trigger** — what changed, with dates. How long it has been live. What
   happens if they do nothing for another cycle. Whether there is an external
   deadline and whose it is.
3. **Awareness stage** — the stage in one word, the evidence for that reading,
   what they call this problem in their own words, whether they have searched and
   what they typed, which providers they can name.
4. **Sophistication** — what this market has heard repeatedly, what the reader has
   personally tried, what failed and what they concluded, which claims are dead on
   arrival, which mechanism if any has been explained to them.
5. **The low position** — texture, not category. Three concrete details minimum.
   What they have stopped counting because counting hurts. What they cannot
   explain internally.
6. **The high position** — what is factually different after. What they get to say
   out loud, and to whom. What they stop doing. How they would know it worked.
7. **The alternative set** — do nothing, do it internally, adjacent category,
   direct competitor, delay until next cycle. **And which is actually winning right
   now.**
8. **Objections, in their words** — mechanism, self, cost, and the one they will
   never say out loud. The polite version and the real one.
9. **Decision mechanics** — who decides, who can veto without deciding, the
   approval path, budget cycle or timing constraint, what they have to show
   someone else to proceed.
10. **Language capture** — verbatim, sourced, **population label on every row.**
    Three columns where the drafter does not read the source language: their
    words, a literal translation, source and population.
11. **Disqualified** — who this is not for, the signal that tells you early, what
    they would want instead.

---

## Section 6 is where this fails

`[MISSING]` in section 6 is common and it is not a defect in your work. Research
finds the low position easily because losing generates a record, and finds the
high position almost never because winning quietly generates nothing anyone
writes down.

**Do not fill it from inference.** Ladder rung 05 names the exact failure — vivid
low position, abstract high position, a gradient with a floor and no ceiling, and
a reader who feels accused rather than pulled. Inference here produces growth,
confidence and peace of mind, which describes nobody.

If the section is empty, say the emptiness is the finding, and let `/plan` decide
what to do about it.

---

## The handoff block

Last, and `/plan` gates on it. Every line tagged.

- **Awareness stage** and what it rests on.
- **Sophistication stage** — which of the five, and whether the market is
  sophisticated on the claim but not on the mechanism. That gap is usually where
  the opening lives.
- **Opening must** — what the first hundred words have to do.
- **Opening must not** — the dead claims, any deadline that cannot be honestly
  claimed, and any word the evidence shows the reader reacts against.
- **Problem mechanism this reader has never had explained** — causal, not a
  description of deliverables. If you generated it rather than found it, mark it a
  **candidate, not a finding**, and say it must be confirmed true before it goes
  near a reader.
- **Alternative to position against** — one of the five.
- **Binding risk** — one of money, time, political, effort. Not "all of them." If
  the evidence contests it, say which source contests it.
- **Register the reader earns** — challenger or authority is a real fork, not a
  spectrum. Challenger implies the reader has been foolish; authority implies the
  system was opaque and you can see it. Only one survives being forwarded to a
  colleague. Choose deliberately and say why.

---

## Output

`profile.md` as a file, then the **gap report** below it: which sections are
`[MISSING]`, which inferences are load-bearing and unverified, and which single
conversation would close the most. Name the most consequential inference in the
profile explicitly — the one that, if wrong, invalidates the rest.
