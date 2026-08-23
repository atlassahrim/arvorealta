# arvorealta.com

Atlas Sahrim's site and document system. Static HTML, no build step, no
framework, no dependencies. Hosted on GitHub Pages; **every push to `main`
deploys in about ten seconds.**

## Live

| URL | File |
|---|---|
| arvorealta.com | `index.html` — the offer page |
| arvorealta.com/video/ | `video/index.html` — video portfolio |
| arvorealta.com/deck/`<slug>`/ | decks — 1920 × 1080, for presenting |
| arvorealta.com/annex/`<slug>`/ | annexes — A4, for submitting |

**`index.html` and `video/index.html` are live and in use.** Do not restructure
them without being asked. Copy changes are fine; layout surgery is not.

## Not published

`templates/`, every `_`-prefixed folder under `deck/` and `annex/`, and
`assets/_og/` are working files. They live in the repo, sessions edit them
normally, and `deck-pdf.yml` prints them from the working tree — but
`pages.yml` deletes them from the checkout before the artifact is built, so
they never reach the internet. Pages on a public repo has no access control;
`noindex` only asks search engines nicely. Not deploying is the only real lock.

The rule is the leading underscore. `deck/_template` stays private,
`deck/acme` publishes. Preview a private one with `python3 -m http.server`
from the repo root, or take the PDF from the Actions run.

## The pricing ladder

Three tiers on `index.html`, and the mechanic between them is the design.
**€600** one document · **€2,400** the full document standard · **€8,000**
identity system.

Every tier credits in full into the one above. €600 comes off the €2,400,
€2,400 comes off the €8,000, and €600 credits into €8,000 directly if the
middle rung is skipped. Credits never expire.

**€8,000 is chosen, not rounded.** High enough that €2,400 reads as reasonable
rather than suspiciously cheap, close enough that the step does not look like
it is missing a rung, and under the €10,000 mark where most of these companies
need a second approval signature. The credit is what holds that: a client who
walks the whole ladder spends €8,000 in total, not €11,000, and so never
crosses the threshold. Break the credit and the price logic goes with it.

Do not simplify the mechanic and do not round the numbers. If a price looks
wrong, say so and give the reasoning. Changing one is not a copy edit.

€2,400 includes one revision round. Past that it is a new agreement at a new
budget, never an extension. What €8,000 excludes is settled in the scope
document agreed before the work starts, not listed on the page.

## Files

```
index.html              offer page
video/index.html        video portfolio
templates/index.html    index of every template
deck/<slug>/index.html  one deck per folder
annex/<slug>/index.html one A4 annex per folder
assets/
  themes/arvorealta.css tokens for the editorial system
  themes/technical.css  tokens for the technical system
  system.css            structure only — no colour, no typefaces
  deck.css              editorial deck — slide geometry + print
  deck-technical.css    technical deck — slide geometry + print
  annex.css             A4 document geometry + print rules
  site.js               live clocks, scroll reveal
CNAME                   custom domain
```

Pages load a **theme first, then `system.css`.** Order matters: the theme
defines the custom properties the system reads.

## Two systems, kept apart

There are two visual identities and they are meant to stay separate.

| | Editorial | Technical |
|---|---|---|
| Theme | `themes/arvorealta.css` | `themes/technical.css` |
| Type | Cinzel · Playfair · Shippori Mincho | IBM Plex Sans · IBM Plex Mono |
| Ground | warm greige, ink green, taupe | white, near-black |
| Job | presenting concepts | products, manufacturing clients, tenders |
| Deck | `deck.css` → `deck/_template/` | `deck-technical.css` → `deck/_technical/` |
| Document | — | `annex.css` → `annex/_template/` |

They share exactly one value — the accent red `#C7392F`. That is what keeps
them the same firm's work while letting each do a job the other cannot.

**The two deck stylesheets duplicate the canvas maths on purpose.** Sharing a
base would mean every editorial tweak risked the technical deck and the
reverse. The geometry is identical so a slide can be moved between them;
nothing else is. Their root classes differ — `.deck` and `.deck-t` — so the
two can never be loaded onto one page by accident.

Rules below marked **editorial** apply to `deck.css` only. The technical
system's rules live in the annex spec and in `deck-technical.css`.

## The editorial system

Three typefaces, loaded from Google Fonts in each page `<head>`:
**Cinzel** for labels, **Playfair Display** for display type and numerals,
**Shippori Mincho** for body.

Palette: ink `#17352C`, ground `#D9D7D4`, secondary `#5A6B63`, accent red
`#C7392F` — the red is used **once per page at most**, to mark the point of
failure. Never decoration.

The red cannot carry small text on paper. It measures 3.61:1 there, under the
4.5:1 a reader needs, so on a light ground it is available as a graphic mark
and not as a word. The offer page currently spends it nowhere, which the rule
allows; eight red dashes in the comparison did not.

Muted brick `#8E4A45` is the **mark**. The red says something failed; the mark
says here is the thing. Its contrast writes its own rules, and all three are
hard:

- **Never on ink.** 2.03:1, far below the 3:1 a graphic mark needs. The mark
  belongs to the light grounds — 4.55:1 on paper, 5.05 on paper-2, 5.63 on
  the paper-3 cards
- **As a fill it carries only `--on-mark`**, the warm beige `#F7F3EC`, at
  5.90:1. Paper-3 on the mark is 4.55, which passes but sits far closer to
  the floor, so the beige is not interchangeable with the other light values
- **It is `#8E4A45` and not `#A85751` for one reason.** The lighter brick was
  the first choice and it measures 3.53:1 on paper, under what small text
  needs. Darkening the value four steps clears 4.5 while reading as the same
  colour at eyebrow size. Do not lighten it back
- **Never in the same block as the accent red.** They sit 1.26 apart in
  luminance and share a hue family. Read together they look like a printing
  inconsistency rather than two decisions

One use on the offer page: the eyebrows on the light grounds — `.eyebrow`,
`.tag` and `.step`. The recommended tier used to take the mark as its ground
and now takes the price gradient instead.

The **price gradient** is sampled off the Turvatikas ground: amber `#954D13`
running through `#743813` to chocolate `#5A200A`, at 45deg so the light end
sits at the low corner as it does in the original. Two uses. It fills the
prices on the two light tiers, and it grounds the recommended tier. It cannot
do both on the same card — a gradient numeral on a gradient ground is the same
colour at the same point — so that tier's price stays `--on-mark`, which
measures 5.67:1 against the amber stop at its worst and 11.54 at the
chocolate end. As price fill on the light grounds the stops run 4.37 to 11.01,
and prices are display size, where the floor is 3:1. That rule is guarded by
`@supports`, so a browser without `background-clip:text` shows ink rather than
an invisible price.

Third ground: warm taupe `#BEAE9E`, carrying **ink** type at 6.16:1. A third
ground cannot be a mid-tone — every clay and umber between paper and ink
fails both text colours at once (4.4:1 and below). Two rules follow from the
contrast, and both are hard:

- **Never the accent red on taupe** — 2.40:1. The red mark lives on paper or ink.
- **Never taupe as a panel beside paper** — 1.50:1 apart, so they read as a
  printing error rather than a choice. Taupe is a whole-slide ground.

Its job is evidence — image and case slides — so a deck reads
**paper** (argument) → **taupe** (evidence) → **ink** (statement).

Web type scale lives in `system.css` and is fluid (`clamp`). Body line-height
is 1.75; display is 1.04. That contrast is the system's signature — keep it.

### Deck spec (1920 × 1080)

- Margins are set so the **headline** and the footer sit the same distance
  from their edges — 155 px of ink to ink. Balance to the section label
  instead and you are weighing a tick mark against a line of type, which is
  what made the top look heavy. Content area starts at 100, the label rides
  above the headline as a kicker, the headline itself starts at 140, and the
  footer holds 140 clear of the bottom edge
- Grid 12 columns × 100 px, 40 px gutters (12×100 + 11×40 = 1640)
- Baseline 40 px — 20 per slide. **Display is exempt** and always was: 96/100
  is not a multiple of 40. Label and body snap; display keeps the 1.04
  leading, which is the part that reads as ours
- Display **Playfair Display 96/100**, tracking −0.012em
- Body **Shippori Mincho 24/40**
- Label **Cinzel ALL CAPS 17/40**, tracking +0.16em
- Running footer, baseline 100 px from the bottom: project and page as one
  cluster left (`Deck Template · 3 of 7`), site right. There is no header —
  identification sits at the foot so a page pulled out of the deck still says
  what it is. Contact details are not running chrome; they close the deck
- Section labels read `01 · THE PROBLEM` with a hairline rule to the right margin
- Statement slides reverse out: full-bleed ink, display type only, no chrome
- Interior slides hang from the top left: section label, then the headline at
  full display size. The air collects at the foot
- Rules 1 px, ink at 18% opacity

### Technical deck spec (1920 × 1080)

`deck-technical.css` with `themes/technical.css`. Same canvas, margins, grid
and baseline as the editorial deck, so a slide can move between them. What
differs:

- **Four type roles, not three.** Display 96/100 weight 600 · **Value 56/80**
  · Body 24/40 · Label mono 17/40. A technical sheet states figures as
  fields, and a figure set at body size is not a figure. That extra level is
  the reason this system exists
- Labels are **IBM Plex Mono**, tracking +0.06em. Mono is already wide, so it
  needs far less tracking than a serif small cap to read as a label
- **Two rule weights only:** 3 px in ink closes a slide, 1 px at 20% divides
  columns and field rows
- The accent carries the reference number, section labels and the statement
  bar — it is wayfinding here, not a single mark
- Grounds are white and near-black. There is no third ground; the taupe
  belongs to the editorial system

### Annex spec (A4)

A deck is for presenting; an annex is for submitting, and the two obey
different masters. The deck scales a 1920 × 1080 canvas with a `--px` unit.
`annex.css` does not scale at all — it is set in the units print is measured
in, millimetres for the page and points for the type.

**Annexes use a second theme.** `themes/technical.css`: white stock,
near-black ink, **IBM Plex Sans** for anything read as a sentence and
**IBM Plex Mono** for every label and figure. The deck theme persuades; this
one is built to be scored by an engineer, and IBM Plex was drawn for
technical documentation. The two themes share exactly one value — the accent
red `#C7392F` — which is what keeps them the same firm's work.

Two differences from the deck's rules, both deliberate:

- **The accent is a system colour here, not a single mark.** It carries the
  reference number, the section labels and the statement bar. On a deck the
  red appears once; on a technical sheet it is the wayfinding.
- **Two rule weights, and only two.** 0.6 mm in ink closes the page — above
  the masthead, below the last block. 0.25 mm at 20% separates rows inside a
  block. Nothing else draws a line.

Facts are stated as **fields, not sentences**: a mono label with the value
under it, so an evaluator scanning for a sum or a date finds it without
reading. Narrative prose stays sentence case — the reference sets its
overview in full capitals, and past about forty characters that stops being
readable, so it is the one thing from the reference not copied.

- Page 210 × 297 mm. Margins 20 mm sides, 24 mm head, 27 mm foot. The
  strictest published tender rule found is 15 mm, so every edge clears it
- Content 170 × 246 mm — 41 baselines of 6 mm
- Grid 12 columns × 10.5 mm, 4 mm gutters (12×10.5 + 11×4 = 170)
- **Every size a reader reads is 11 pt or above.** Published tender rules put
  the floor for proposal body text at 9–11 pt depending on the procedure;
  11 pt clears all of them. The section label carries the same 11 pt as the
  body and takes its hierarchy from face and tracking instead of from size.
  Only the running foot sits at 9 pt — it is page furniture, not submitted text
- Scale 30 / 22 / 15 / 11: reference number, title, heading and value, then
  body and label together at the floor
- Narrative sits in seven columns — 97 mm, about 55 characters. The full
  170 mm measure runs past 85 characters and stops being readable
- **Page budget is the design constraint.** A tender that caps pages discards
  the overflow unread, so air costs content. Measure every block against the
  246 mm before adding to a sheet

## Rules that matter

**Hand-break headlines** with `<br>`. Never let display type wrap on its own —
every line ending is a decision.

**Three type sizes.** Display 96, body 24, label 17 — that is the whole scale.
An intermediate Playfair was tried and retired: giving the headline a wider
column solved what the extra size was covering for. If a fourth seems
necessary, widen the column before you add a level.

**Snap to the baseline**, including captions and table rows. Display excepted, above.

**No inline colour or font values.** Everything reads from tokens, so a theme
swap is total.

## Adding a client theme

1. Copy `assets/themes/arvorealta.css` to `assets/themes/<client>.css`
2. Change **values only** — never add rules to a theme file
3. Load that client's fonts in the page `<head>`
4. Link the client theme instead of `arvorealta.css`, still before `system.css`

Nothing else changes. That is the point: the same structure, delivered in
someone else's brand.

## PDF export

Decks print to PDF from the same source that serves them. In `deck.css`:
`@page { size: 1920px 1080px; margin: 0 }`, each slide `break-after: page`,
and `print-color-adjust: exact` so reversed slides keep their ground.

**Export with the command, not the print dialog.** Chrome's dialog has no
1920 × 1080 paper size and its Paper size dropdown overrides `@page`, so
printing by hand silently gives you Letter. Run this instead:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/deck.pdf" \
  "https://arvorealta.com/deck/<slug>/"
```

Verified output: 1440 × 810 pt per page — that is exactly 1920 × 1080 px,
since 1 px = 0.75 pt — with both grounds intact. Backgrounds need no flag;
`print-color-adjust: exact` carries them. If Chrome rejects
`--no-pdf-header-footer`, drop it and add `--headless=old`.

Points, not pixels, is what the page is really measured in. If you ever need
the GUI, macOS can do it: Print → **Print Using System Dialog** → Paper Size →
Manage Custom Sizes → **20 in × 11.25 in**, margins 0. Same page — 1920 ÷ 96
and 1080 ÷ 96.

iPadOS has no custom paper sizes and no Chrome CLI, so it cannot produce a
correct deck export at all. Generate the PDF elsewhere, or present the deck
full-screen from the browser — it is already responsive at any width.

**Annexes are the easy case.** A4 is a standard paper size, so an annex
*can* be exported from the print dialog — Destination "Save as PDF", Paper
size A4, Margins None, scale 100%. The same command works too, and is still
what CI runs:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/annex.pdf" \
  "https://arvorealta.com/annex/<slug>/"
```

Verified output: 594.96 × 841.92 pt against a 595.28 × 841.89 pt A4 — Chrome
rounds by about a tenth of a millimetre, which no printer will show. The
export is tagged, carries a document language and keeps the `alt` text, so
it already meets the EN 301 549 floor for a non-web document. It is **not**
PDF/A; if a notice demands that profile, post-process with Ghostscript.

`.github/workflows/deck-pdf.yml` exports every deck and annex on push and
attaches them to the run, asserting 1440 × 810 pt for decks and A4 for
annexes so a wrong page size cannot ship quietly.

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/pages.yml`) builds and
deploys. Nothing to run locally.
