# arvorealta.com

Atlas Sahrim's site and document system. Static HTML, no build step, no
framework, no dependencies. Hosted on GitHub Pages; **every push to `main`
deploys in about ten seconds.**

## Live

| URL | File |
|---|---|
| arvorealta.com | `index.html` — the offer page |
| arvorealta.com/video/ | `video/index.html` — video portfolio |
| arvorealta.com/deck/`<slug>`/ | decks (see below) |

**`index.html` and `video/index.html` are live and in use.** Do not restructure
them without being asked. Copy changes are fine; layout surgery is not.

## Files

```
index.html              offer page
video/index.html        video portfolio
deck/<slug>/index.html  one deck per folder
assets/
  themes/<name>.css     tokens only — colour, type, measure
  system.css            structure only — no colour, no typefaces
  deck.css              slide geometry + print rules
  site.js               live clocks, scroll reveal
CNAME                   custom domain
```

Pages load a **theme first, then `system.css`.** Order matters: the theme
defines the custom properties the system reads.

## The design system

Three typefaces, loaded from Google Fonts in each page `<head>`:
**Cinzel** for labels, **Playfair Display** for display type and numerals,
**Shippori Mincho** for body.

Palette: ink `#17352C`, ground `#D9D7D4`, secondary `#5A6B63`, accent red
`#C7392F` — the red is used **once per page at most**, to mark the point of
failure. Never decoration.

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

- Margins 140 px; live area 1640 × 800
- Grid 12 columns × 100 px, 40 px gutters (12×100 + 11×40 = 1640)
- Baseline 40 px — 20 per slide, snap everything
- Display **Playfair Display 96/100**, tracking −0.012em
- Body **Shippori Mincho 24/40**
- Label **Cinzel ALL CAPS 17/40**, tracking +0.16em
- Running header: page number left, name right, baseline 100 px from top
- Section labels read `01 · THE PROBLEM` with a hairline rule to the right margin
- Statement slides reverse out: full-bleed ink, display type only
- Rules 1 px, ink at 18% opacity

## Rules that matter

**Hand-break headlines** with `<br>`. Never let display type wrap on its own —
every line ending is a decision.

**Three type sizes per artefact.** If a fourth seems necessary, the layout is
wrong. Playfair at an intermediate size is a rare exception, not a level.

**Snap to the baseline**, including captions and table rows.

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

Verified output: 5 pages, 1440 × 810 pt — that is exactly 1920 × 1080 px,
since 1 px = 0.75 pt — with both grounds intact. Backgrounds need no flag;
`print-color-adjust: exact` carries them. If Chrome rejects
`--no-pdf-header-footer`, drop it and add `--headless=old`.

Points, not pixels, is what the page is really measured in. If you ever need
the GUI, macOS can do it: Print → **Print Using System Dialog** → Paper Size →
Manage Custom Sizes → **20 in × 11.25 in**, margins 0. Same page — 1920 ÷ 96
and 1080 ÷ 96.

iPadOS has no custom paper sizes and no Chrome CLI, so it cannot produce a
correct export at all. Generate the PDF elsewhere, or present the deck
full-screen from the browser — it is already responsive at any width.

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/pages.yml`) builds and
deploys. Nothing to run locally.
