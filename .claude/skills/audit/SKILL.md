---
name: audit
description: "Step 03 of the copy pipeline. Audit a finished draft against the ten-rung ladder, descending from 09 and stopping at the first real break, then rewrite one section in the draft's own voice. Use when asked to audit, review, diagnose or fix a piece of copy, or when a draft feels flat and nobody can say why. Distinguishes a structural break from a preference and fixes the break, not the sentences beneath it."
---

# Audit — step 03

Read `.claude/copy/copywriting-ladder.md` in full before starting, **Part II
especially**. Confirm you have read it.

**Invocation:** `/audit <market-slug> <draft-file>`

**Run this in a fresh conversation.** If you wrote the draft in this same chat,
say so and recommend starting a new one. Reviewing your own work minutes after
producing it is the weakest available review, because you will defend the choices
instead of testing them.

---

## Inputs

- The draft.
- `_research/<market-slug>/profile.md`, if available. **Without it you can still
  audit rungs 05 to 00, but you cannot verify 09 through 06. Say which you are
  doing.**

---

## How it runs

Descend from 09. At each rung, decide: pass, or break.

**Stop at the first break. Do not continue to the bottom.** Repairs made below a
break do not hold, and a list of line-level fixes under a broken mechanism is
worse than useless, because it gives the user something to do that will not work.

State it plainly: which rung, what broke, what it takes to fix. Then rewrite one
section to show the fix rather than describe it. **Diagnosis without a rewrite is
criticism, not help.**

**If the piece passes all ten, say that — and name the weakest rung anyway.**

---

## The bar for calling a break

A break is a rung where the piece fails **structurally**, not one where you would
have made a different choice. Two tests before you call it:

1. **Can you name the specific line or absence that fails, and quote it?**
2. **Would fixing it change whether the reader acts, or only how the piece reads
   to another writer?**

If the answer to the second is "how it reads", **that is a note, not a break.**
Collect those and give them at the end, after the break.

This bar is what stops the audit from becoming precious. Most drafts have a dozen
lines you would have written differently. None of them is the reason the page is
not converting.

---

## Protect the voice

If the draft is challenger, profane, fragmented or unconventional, **the rewrite
is too. Never sand challenger copy down to corporate-safe.** That is the single
most common failure of this kind of review.

Before suggesting any change to voice, ask whether it is the voice the offer earns
or the writer drifting. If it is earned, strengthen the spine. Cut only the lines
that slip out of it.

**Substitute, do not append.** Replace the line. Do not leave the old one above
the new one.

Do not apologise for being direct. The draft was submitted for a real read.

---

## The checklist

Work Part II of the ladder in order. The short form:

- **09 Sophistication and awareness** — awareness nameable in one word; opening
  enters the conversation already running; not making a claim to a market that
  stopped believing claims.
- **08 Big idea and mechanism** — big idea changes what the reader believes about
  their own life when stated without the product; a **problem** mechanism exists,
  not just a solution one; non-obvious and blame-removing; solution mechanism
  causal rather than a list of deliverables.
- **07 Positioning** — *do nothing* engaged explicitly; a named axis with a
  credible player at the far end; the category the reader is pricing against.
- **06 Offer and risk** — which risk is binding; whether the reversal addresses
  that one or money by reflex; what the reader must supply, named precisely;
  whether price reads as the right category.
- **05 The gradient** — low position texture or category; high position as
  concrete as the low one; bridge visible; direction deliberate.
- **04 Shape and sequence** — no claim arriving before the belief it depends on;
  shape matching awareness; nothing movable without damage; nothing disputable in
  the first hundred words.
- **03 The silent argument** — three objections in the reader's actual words; at
  least one on **belief in self**; raised where the copy causes them, not parked
  in an FAQ.
- **02 Proof and specificity** — highest level present; nothing there merely
  because it is impressive; no rounded numbers or vague quantities; everything
  checkable and true.
- **01 Voice and register** — the register the reader and offer earn; voice
  matching what the copy claims about the world; no lines slipping out; no throat
  clearing; survives being forwarded to a colleague.
- **00 The line** — verbs doing rather than describing; one idea per sentence;
  length variation; exactly one action named with a verb; urgency real; worst
  paragraph cut.

---

## Two things to catch that the checklist does not

**Completeness as a failure mode.** Copy grows because everything in it is
defensible on its own. The FAQ answering eleven questions, the bullet list
covering every feature, the hero repeating facts stated below it. Each addition is
arguable and the sum is weaker than any part. **When a piece feels flat and
nothing in it is wrong, this is usually why.**

**Check the gradient's direction before calling it broken.** Some copy pulls
toward a high position already forfeited — regret framing, vindication framing.
Identical mechanic, flipped vector, and the call to action becomes agreement
rather than purchase. Do not break a working piece by trying to make it
optimistic.

**Honor the form.** A short spoken-word bit is not a sales letter. Apply the
gradient lens; do not impose long-form structure on short-form work.

---

## Output

`_research/<market-slug>/audit-v<n>.md`, containing four parts and nothing else:

1. **The break** — rung, what failed, quoted evidence.
2. **The fix** — what it takes, in two or three lines.
3. **The rewrite** — one section, in the draft's own voice and language.
4. **Notes** — everything that is a preference rather than a break, kept short.

No summary of the piece. No praise paragraph. No restating what the draft was
trying to do.
