---
name: midjourney-prompt
description: "Turn a short 400-character brief into three full Midjourney prompts (faithful, pushed, lateral), written for midjourney.com on V8.2. Six kinds: background, mood, person, architecture, interface and painting. Use whenever the user wants a Midjourney or image-generation prompt, hands over a filled or half-filled brief, shares reference images and asks how to prompt from them, asks for a picture 'in the style of' a painter, wants backgrounds, hero images, mood images, portraits, interiors or app art direction generated, or asks for the blank brief to fill in. Also use when a prompt they wrote is not giving the result they want."
---

# Midjourney prompt: short brief in, full prompt out

The user writes a short brief in plain phrases. You turn it into three prompts
that follow what works on Midjourney: sentences in a fixed order, concrete
nouns, camera or painter vocabulary, moods shown rather than named, and
parameters set by the stage of the work.

Read `references/kinds.md` for the module of the brief's KIND before writing.
Read `references/tool-state.md` when the user asks about a parameter, a
reference slot or a version, or when a fact about the tool matters to the
answer. It is dated, and Midjourney changes often.

## Three ways in

1. **The user asks for the brief.** Give the blank brief and the field table
   below. Nothing else.
2. **The user gives a filled brief**, whole or partial. Expand it (see *The
   expansion*). A missing line is filled from the others; ask only if SUBJECT
   is missing, because nothing else can stand in for it.
3. **The user gives reference images or a loose idea.** Read what the
   references share (subject, light, framing, palette, what is never shown),
   write the brief yourself, show it, then expand it. Name the theme in a
   sentence first, because the user needs to see which part of the
   references is being kept and which part, often the photographic look, is
   being replaced.

## The brief

```
KIND:
SUBJECT:
USE:
FEEL:
PLACE:
LIGHT:
LOOK:
FRAME:
REF:
NOT:
STAGE:
```

The labels take 70 characters, which leaves 330 for the user's words. The
whole filled brief is 400 characters at most, so that writing it stays
quicker than writing the prompt.

| Field | What goes in it |
|---|---|
| KIND | `background`, `mood`, `person`, `architecture`, `interface` or `painting` |
| SUBJECT | the one thing, with a count |
| USE | where the image goes, and where text will sit on it |
| FEEL | two or three words |
| PLACE | setting, season, weather |
| LIGHT | source and direction |
| LOOK | medium or process, and colours |
| FRAME | ratio, angle, empty space |
| REF | what will be attached: `style: …`, `same face: …`, `layout: …` |
| NOT | what must not appear |
| STAGE | `explore`, `direct` or `final` |

## The expansion

Nine sentences in a fixed order, then an ATTACH line if REF is filled, then
the parameters.

```
[1 SUBJECT: concrete noun phrase with a count, and its state].
[2 CONDITION: what it is doing or what is happening to it].
[3 SETTING: place, season, time of day, atmosphere].
[4 COMPOSITION: framing, viewpoint, where the subject sits, where the empty space is and why].
[5 LIGHT: source, direction, quality, colour temperature, what it does to the subject].
[6 MATERIAL: surfaces, texture, grain, wear].
[7 PALETTE: three named colours, with their balance in words].
[8 MEDIUM: camera and process, or painter and technique].
[9 MOOD: the FEEL words, shown through one visible detail].
ATTACH: [what goes in which reference slot of the Imagine bar]
--ar W:H --s N --c N --exp N [--raw] [--sw N] [--iw N] [--p] [--seed N] [--hd]
```

### Rules, and why each one is there

1. **70 to 130 words of description.** Shorter leaves the model to guess;
   longer dilutes the end of the prompt, where medium and mood live.
2. **Sentences, not keyword lists.** V7 and V8 parse language; tag soup
   blurs it. No quality tags (`8k`, `masterpiece`, `ultra detailed`): they
   describe nothing visible.
3. **SUBJECT becomes sentences 1 and 2, with a count.** "Three cards", not
   "cards"; the model honours numbers and ignores vague plurals. If the
   subject is vague, pick one specific thing.
4. **USE decides the empty space in sentence 4.** Where the text will sit is
   where the image must stay calm. This is the line a designer most often
   leaves out and most needs.
5. **LIGHT always gets a source, a direction and an effect.** "Low sun behind
   them, a warm rim in their hair" gives the model something to draw;
   "golden light" does not.
6. **LOOK splits into sentences 6, 7 and 8.** Name exactly three colours and
   state their balance in words ("mostly green, a little gold"). V8 has no
   `::` weights, so words are the only way to set the balance.
7. **FEEL is shown.** Keep the words, then add one visible detail that proves
   them: "a mug of tea going cold on the bench".
8. **NOT is rewritten as something in the scene first.** "Boats" becomes
   "only open water". Midjourney draws what is named, so naming the
   unwanted thing can bring it in. Only what cannot be rewritten goes to
   `--no`, three terms at most, and say that `--no` is unconfirmed on V8.
9. **REF becomes the ATTACH line.** `style` goes to the Style reference slot
   with `--sw` 100–300. `same face`, `same object` or `same place` goes to
   the Edit slot, up to four images; then describe the new scene, not the
   face. `layout` goes to the Image prompt slot with `--iw` around 0.5.
10. **No living artist's name.** Use a process, a period or a movement. It
    gives more control and keeps the look the user's own. Painters long dead
    and in the public domain (Cézanne, Renoir, Vermeer, Hokusai) can be
    named, and the painting module says how.
11. **Text in quotation marks, four words at most.** V8 renders short strings
    well and long ones badly.
12. **The prompt is in English** even when the user writes in another
    language. Midjourney reads English best. Explain around it in the user's
    language.

### Parameters by stage

| STAGE | Draft mode | `--c` | `--s` | `--exp` | Also |
|---|---|---|---|---|---|
| explore | on | 30–60 | 250–500 | 0–15 | no seed; `--sref random` to hunt for a look |
| direct | off | 5–15 | 100–250 | 5–15 | lock a style reference; `--raw` for photography |
| final | off | 0 | as chosen | as chosen | the winner's `--seed`, `--hd`, upscale last |

If STAGE is empty, use `direct`. The KIND module may move these ranges.

### Three versions, every time

- **A, faithful:** the brief as written.
- **B, pushed:** one axis taken further: harder light, a longer lens, a
  stronger palette or a closer crop. Chaos up 10.
- **C, lateral:** the same subject and feel in a different medium or
  process. Chaos up 30.

A is what was asked for, B tests how far it goes, and C tests whether it was
the right brief. That is the creative process, built into the output. Write A
in full. Write B and C as the sentence or sentences that change and their
parameters, unless the user asks for all three in full.

## Output

For each brief:

1. The brief, if you wrote or completed it.
2. **Version A** in one code block, ready to paste: the prompt, the ATTACH
   line if any, the parameters.
3. **B** and **C**, each in a line or two.
4. One line on how NOT was handled ("'boats' absorbed by 'only open water'").
5. Anything from `references/tool-state.md` that this prompt depends on and
   that is unconfirmed (`--no`, `--weird`, `--tile` on V8).

Before showing the result, run the check:

```sh
python3 .claude/skills/midjourney-prompt/scripts/check.py --brief brief.txt --prompt prompt.txt --kind <kind>
```

It counts the brief and the description, and flags quality tags, `::`
weights, camera words in a painting, long quoted text and anything written
after the parameters. Fix what it flags; do not report a count you did not
measure.

## House rule from this repository

`CLAUDE.md` allows generated images for abstract grounds, where nothing is
claimed, and not for anything that would read as a client's delivered work.

- **Backgrounds and moods** can be published.
- **People and buildings** are fiction. Never present them as a real client,
  a real member of staff or a real project.
- **Interfaces** are art direction, not a shipped product.

**References that belong to someone else** — another photographer's picture
or another painter's canvas — steer the theme. When the result is to be
published, describe that theme in words rather than attaching the image.
Midjourney copies an attached image's composition closely, and a described
theme makes the image the user's own.
