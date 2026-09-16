---
name: profile
description: "Step 01 of the copy pipeline. Build a tagged reader profile from research files — identity, trigger, awareness, sophistication, low and high position, alternative set, objections, decision mechanics, verbatim language capture, disqualification, and the handoff block. Use after /research, or when asked to build or rebuild a reader profile for a market. Tags every field VERIFIED, INFERRED, CLIENT, ENTAILED or MISSING and never invents the verbatim table."
---

# Profile — step 01

Read `.claude/copy/copywriting-ladder.md` in full before starting. Confirm you
have read it.

**Invocation:** `/profile <market-slug>` · optionally `entry: outbound|inbound|ad|referral|list`

Read **all four** files in `_research/<market-slug>/` — `voice.md`, `notes.md`,
`trigger.md`, `competitor.md` — plus any URLs the user names and any screenshots
they paste, before asking anything. Most of what you would ask is already in them.

Write `_research/<market-slug>/profile.md`.

If the research files are not there, stop and say so. Do not reconstruct them from
conversation.

**You are not writing copy in this step and you are not planning one.** If asked
to draft, say drafting is `/plan` and finish the profile first.

**If the market has several possible readers, ask which entry point you are
profiling before starting.** Awareness stage differs by entry point and one
profile cannot cover two.

---

## The three rules

**1. Tag every field.**

- `[VERIFIED]` — stated in a source. Cite which one.
- `[INFERRED]` — your reading of the evidence. Say what it rests on.
- `[MISSING]` — not in the sources. Leave it empty and list it at the end.
- `[CLIENT]` — stated by the offer owner in conversation, not found in any source.
  Cite the date. Weaker than `[VERIFIED]`, stronger than `[INFERRED]`, and **never
  laundered into either.**
- `[ENTAILED]` — not stated by anyone, but strictly produced by the offer if it
  works. **Only permitted in section 6**, and only under the rule printed there.

**A profile with no `[MISSING]` tags is a profile you invented.** Say so rather
than producing one.

**2. Never generate section 10.** The verbatim table takes only exact wording from
sources, with the filename in the source column. If you cannot source a line, it
does not go in the table. Paraphrase belongs in other sections, never in that one.

**3. Do not professionalize the language.** *We're getting killed on technical
scoring* stays as written. The moment you translate it into business register it
becomes what every competitor already sounds like, and its value is gone.

---

## When to stop and ask

Sections **5, 6, 8 and 9** live in conversations nobody publishes, in every
market, and desk research reaches them in none.

If they come back `[MISSING]` after a full read of the sources, **stop and ask the
user up to five questions before finalising.** They have customer contact the
sources do not.

Ask about specific past events, never hypotheticals. *Tell me about the last
customer who said no and what they said* outperforms *what objections do you get*.

Tag the answers `[CLIENT]` with the date. **If the user declines to answer, record
that and leave the fields `[MISSING]`** — a declined question is a finding, and a
profile that reports one is worth more than a profile that fills the gap itself.

---

## The template

Open with date, stage covered, entry point, sources read. Where the reader is
chosen from a wider field, name **the fork not taken** and what it rests on — a
market that splits and is not split produces copy for nobody.

1. **Identity** — invented name, age, role, company type and size. Where they are
   physically when they read this. What their week is shaped by. Who they answer
   to. What competence looks like in their world.
2. **The trigger** — what changed, with dates. How long it has been live. What
   happens if they do nothing for another cycle. Whether there is an external
   deadline and whose it is.
3. **Awareness stage** — the stage, the evidence for that reading, what they call
   this problem in their own words, whether they searched and what they typed,
   which providers they can name.
4. **Sophistication** — what this market has heard repeatedly, what they have
   personally tried, what failed and what they concluded, which claims are dead on
   arrival, which mechanism if any has been explained to them.
5. **The low position** — texture, not category. Three concrete details minimum.
   What they have stopped counting because counting hurts. What they cannot
   explain internally.
6. **The high position** — what is factually different after. What they get to say
   out loud, and to whom. What they stop doing. How they would know it worked.
7. **The alternative set** — do nothing, do it internally, adjacent category,
   direct competitor, delay until next cycle. **And which is actually winning.**
8. **Objections, in their words** — mechanism, self, cost, and the one they will
   never say out loud.
9. **Decision mechanics** — who decides, who can veto without deciding, the
   approval path, budget cycle or timing constraint, what they must show someone
   else to proceed.
10. **Language capture** — verbatim, sourced by filename. Where the drafter does
    not read the source language, three columns: their words, a literal
    translation, source. **Carry the population on every row** where the source is
    not the target reader — twenty lines from an adjacent population pass a count
    and fail a page.
11. **Disqualified** — who this is not for, the signal that tells you early, what
    they would want instead.

---

## Section 6, and the one place invention is allowed

**If the sources hold no high position, do not invent one and do not leave the
section blank.**

Nobody writes down what it is like after a problem stops. Losing generates a
record; winning quietly generates nothing.

Fill the fields `[ENTAILED]` instead: **what the offer strictly produces if it
works, stated flat and unadorned. The test is whether it would still be true in a
deposition.**

*A thing that did not exist now exists, and their own people maintain it* is
entailed. *Confidence*, *peace of mind* and *growth* are not.

**Entailed content is a floor for the drafter to stand on, never the emotional
payoff, and the handoff must tell `/plan` which it is.** Ladder rung 05 names the
failure this prevents — vivid low position, abstract high position, a gradient
with a floor and no ceiling, and a reader who feels accused rather than pulled.

---

## The handoff block

Last, and `/plan` gates on it. Every line tagged.

- **Awareness stage** and what it rests on.
- **Sophistication stage** — which of the five, and whether the market is
  sophisticated on the claim but not on the mechanism. That gap is usually where
  the opening lives.
- **Opening must.**
- **Opening must not** — the dead claims, any deadline that cannot honestly be
  claimed, any word the evidence shows the reader reacts against.
- **Problem mechanism this reader has never had explained** — causal, not a
  description of deliverables. If you generated it rather than found it, mark it a
  **candidate, not a finding**, and say it must be confirmed true before it goes
  near a reader.
- **Alternative to position against** — one of the five.
- **Binding risk** — one of money, time, political, effort. Not "all of them." If
  the evidence contests it, name the source that contests it.
- **Register the reader earns** — challenger or authority is a real fork, not a
  spectrum. Challenger implies the reader has been foolish; authority implies the
  system was opaque and you can see it. Only one survives being forwarded to a
  colleague. Choose deliberately and say why.
- **Is section 6 sourced or `[ENTAILED]`.** State it plainly. `/plan` writes
  entailed material as the flattest thing on the page.

---

## Output

`profile.md` as a single file, ready to commit. **No preamble, no commentary above
it.** The gap report goes after the file, not inside it.

The report covers: what you could not verify; which sources were thin; which
fields are `[CLIENT]` or `[ENTAILED]` rather than sourced; the most consequential
inference in the profile — the one that, if wrong, invalidates the rest; and
**what one additional document or conversation would most improve it.**
