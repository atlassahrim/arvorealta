---
name: plan
description: "Step 02 of the copy pipeline. Gate a reader profile on five checks, then plan and draft the copy. Use when asked to write a sales page, landing page, launch email, product page or script from a completed profile. Runs the gate first and refuses to draft on a broken profile. Writes the plan, then the draft, using the gradient-copy skill for the writing itself."
---

# Plan and draft — step 02

Read `.claude/copy/copywriting-ladder.md` in full before starting. Confirm you
have read it.

**Invocation:** `/plan <market-slug> price: N action: "..." format: "..."`

Read `_research/<market-slug>/profile.md`. If it is not there, stop and say so. **Do
not reconstruct it from conversation.**

---

## The gate — run it first, always

Read the handoff block. Check these five.

1. **Awareness and sophistication** — both named, both `[VERIFIED]`, `[CLIENT]`,
   or defensibly `[INFERRED]`.
2. **Problem mechanism** — present, and causal rather than a description of
   deliverables.
3. **Alternative to position against** — named, and one of the five, not a vague
   competitor.
4. **Binding risk** — named as one of money, time, political, effort. Not "all of
   them."
5. **Language capture** — at least three sourced lines in section 10, **of which
   at least one is from the target population.** Twenty lines from an adjacent
   population pass the count and fail the purpose. If every line carries a
   population label that is not the reader, the check fails.

**If any fail, stop.** Name which, say what would fix it, and do not draft. One
round of drafting on a broken profile costs more than going back, because the user
will edit the draft instead of fixing the profile.

**Section 10 empty is an automatic stop.** Without the reader's own words you will
produce competent copy that sounds like everyone else, and neither of you will be
able to say why it is flat.

Do not soften the gate because the user seems ready to move.

---

## Challenge once, then commit

The brief holds two kinds of input and they are not treated alike.

**Givens** — what is sold, what it costs to deliver, the price, what the user is
actually able to do. Facts no research can see. Never override them, never improve
them, never quietly adjust them while writing.

**Proposals** — the one action, the alternative positioned against, which risk the
offer reverses, how the price is framed, the register. The profile holds evidence
about each. Test each against it.

Where a proposal **contradicts** the profile, say so once. One line, name the
rung, give one alternative. Then stop and wait. Do not carry the objection into
the plan, do not restate it in the draft, and never substitute your own version
silently. **A correction made inside the copy is not a correction. It is a swap
the user did not agree to.**

Where a proposal is merely **not optimal**, keep it and note it in one line under
the plan. Only contradiction earns the interruption.

Once the user has answered, the matter is closed. Build what they chose, at full
strength, without hedging it or leaving a seam where the disagreement was.

---

## Two standing rules

**Any mechanism you propose is labelled `UNVERIFIED`.** You may generate a
candidate problem mechanism the profile did not contain. Mark it, and say plainly
it must be confirmed true before it goes near a reader. A mechanism that is merely
plausible is invention, and invention is what destroys credibility with exactly
the reader this profile describes.

**Never invent proof, urgency, or a rounded number.** If a figure is not in the
sources, it does not appear. If there is no real reason to act now, say nothing
about timing.

---

## The plan

Write it before the draft, and show it. It is short.

- **Shape** — problem first, mechanism first, or story first. Chosen from the
  awareness stage, not from preference. State why.
- **Big idea** — one sentence, stated without naming the product.
- **The gradient** — low position and high position, both concrete, both traceable
  to the profile. **If the high position is entailed rather than sourced, say so
  here and write it as the flattest material on the page.** An entailed ceiling
  that gets dressed up becomes an invented one.
- **Sequence** — the order beliefs get installed, and what each section owes the
  next.
- **Objection placement** — which of the three gets raised where, in the reader's
  words.
- **Proof** — the highest level available: demonstration, verifiable specifics,
  mechanism, third party, assertion. If you are in the bottom two, say so.
- **Register** — from the handoff block.
- **The one action.**

If the plan reveals the offer itself is weak, say it. No copy fixes a weak offer,
and the plan is the last cheap place to find out.

---

## The draft

Then write it. **Apply the `gradient-copy` skill for the writing itself** — voice,
rhythm, structure, sentence craft. This file governs what goes in. That skill
governs how it sounds.

**Reach for section 10 first.** The reader's own phrasing outperforms anything you
compose in its place.

Before delivering, run the bottom of the ladder yourself: verbs doing work rather
than describing; one idea per sentence; sentence length varying; no throat
clearing; one action named with a verb; worst paragraph cut; read aloud, and where
you stumble the reader stumbles.

---

## Output

`_research/<market-slug>/draft-v1.md`. The plan above, the draft below, and a
director's note of no more than five lines after it covering the shape, the
register and the gradient you built.

Do not bury the copy in commentary. The user did not ask for an essay about the
copy.
