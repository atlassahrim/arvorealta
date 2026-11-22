# Brand books: the rules

These rules were decided once, on Eliria's book, and hold for every client.
The owner can change any of them. When he does, change it here in the same
commit. A client's own decisions go in `_tools/book/clients/<code>/NOTES.md`.

## The page

1. **Where it lives.** `/brand/book-<three letters>/`, `noindex, nofollow`,
   linked from nowhere. The owner sends the link. Ours is `/brand/book-arv/`.
   **A client's book goes live only with the client's permission.**
2. **It is designed exactly like ours.** It has `book-arv`'s head, CSS,
   script and twelve sections, written in the client's language. Only the
   brand tokens `--b-*`, the content and the favicon change. The edition's own
   chrome (paper ground, forest type) stays ours. `new.py` copies the template
   client's page, so the structure comes along whole.
3. **The published page is the source.** Edit `brand/book-<code>/index.html`
   directly. A later change to the template's CSS or script reaches a client
   book only if it is copied across.
4. **The page names the brand and nothing else.** The repository is public:
   no people, prices, market or plans from the client's project documents.
5. **What the studio proposed is labelled `Sugestão`** (or the language's
   word). What the client supplied is not.
6. **Copy is shown to the owner before it goes live.** Show it as a
   before → after table.
7. **A new picture gets a new filename** (`<slug>-<piece>-<colour>-<version>-<width>.<ext>`),
   because a browser caches the old one under the old name.
8. **The favicon is the logo's symbol**, dark on a light browser and light on
   a dark one: `kit/favicon.py <symbol.svg> <dark> <light> <out.svg>` writes
   one SVG that switches with `prefers-color-scheme`. The page also links the
   32 px icon PNG as a fallback and the 180 px icon as `apple-touch-icon`.
9. **Verify at 1440 and 390**: no page errors, no sideways scroll.
10. **The layout follows the length of the client's text.** The line sets in
    `max-width:18ch` with `text-wrap:balance`, so a short line stays on one
    line and a long one breaks evenly. Never carry a hand break from the
    template's text: Eliria's two-line line and invitation title were her
    copy, not the layout. A document title is one string unless it is long;
    the lede under it flows after it. `check.py` flags a hand break in any
    line or document title of 24 characters or fewer.

## Drive

- **Only files the client supplied, from the client's folder.** Never use
  `99 Archive` or a project document for colour, design or logos.
- **Drive is read-only. Ask before creating, uploading or moving anything.**
- Each file has its own download button under its picture, pointing at its
  own Drive item. A file not supplied yet keeps a dashed "not yet" button.
- **A new upload is a new file with a new link**, so its button needs the new
  id (`live.py`). The session's Drive tool cannot add a version to an existing
  file.
- The tree, created only where missing:

```
<Client> BRAND/
├─ 00 Start here/      <slug>_readme.txt: what each folder holds, and the naming rule
├─ 01 Mark/            Master/ (design files) · Screen/ (SVG per colour, icon PNG) · Print/
├─ 02 Colour/          <slug>_colour_palette.ase
├─ 03 Type/            one zip per family, with its licence
├─ 04 Imagery/         Grounds/ · Photography/
├─ 05 Documents/       the three A4 documents (.dotx and .pdf), the press PDFs, the print spec
├─ 06 Applications/    social images, email signature
└─ 99 Archive/         old material
```

- File names: `<slug>_<piece>_<variant>_<colour>_<size>.ext`, lower case, no
  accents, no spaces, **no version or date in a live file's name**, so a link
  survives a new version.

## Colour

- **State every contrast figure** for each pair the brand will use. Body
  text needs 4.5:1. Large type and marks need 3:1. A pair under 3:1 is never
  used, and the page says so.
- Palette in a proportion (70 / 20 / 10 by default). A colour outside it
  takes `"share": "outside"`.
- **CMYK: the client's values if supplied** (`"cmyk_from": "client"`).
  Otherwise use `kit/cmyk.py`, which chooses FOGRA39 values by CIEDE2000
  through `kit/FOGRA39L.icc`: `:k0` for a light ground, `:k90` for a dark
  colour.

## Type

- **A face without a licence is never typed or served.** If it lives inside
  the logo files, it stays there. Never touch the logo's lettering.
- Propose the closest free face (OFL) and show the comparison before
  replacing anything. Self-host it as woff2 in `brand/book-<code>/fonts/`.
- The kit needs six roles in `client.json`: `title`, `regular`, `light`,
  `medium`, `semibold`, `condensed`. A family without a weight maps the
  nearest one.

## The files the book hands out

- **The email signature** is text only, never an image: the brand name in
  bold capitals in the client's sans with a 28 px rule beside it, then three
  lines (name and role, phone, e-mail) in the computer's monospace, all in
  the dark colour. `signature.py` writes it; the owner chose this model on
  Mulheres Reais.
- **The icon is one ground in three sizes** (32, 180, 512): it is a square
  that carries its own ground, so more colours add nothing.

- **A4 letter, invitation and certificate**: a `.dotx` and a `.pdf` each.
  - The `.pdf` is printed from the book's own drawing.
  - The `.dotx` is built to match the drawing within a point, with its faces
    embedded.
  - **Line spacing is a multiple, never exact**, so the client can edit and
    Google Docs opens it right.
- **Card 85 × 45 mm, folder 230 × 310 mm, DL envelope 110 × 220 mm**: press
  files, PDF/X-1a:2003.
  - CMYK only, fonts embedded, no transparency.
  - 3 mm bleed, crop marks in the slug, TrimBox and BleedBox set.
  - FOGRA39 output intent with its profile.
  - The folder and envelope files are the printed face only; the die is the
    printer's.
- **The print spec** goes with them, in the client's language, from
  `kit/spec/<lang>.txt`. For a new language, translate `pt-BR.txt` once and
  keep its placeholders.
- **The palette** as `.ase`: RGB and CMYK groups, the same names in both.
- **Rebuild and re-upload when a document changes in the book.**

## The kit

| script | does |
|---|---|
| `new.py <code> --name --lang --drive` | starts the page and `client.json` from the template client |
| `check.py <code>` | lists everything missing; exit 1 until complete |
| `cmyk.py "#hex:k0"` | FOGRA39 values for a colour with no CMYK |
| `build.sh <code>` | all hand-out files into `clients/<code>/out/` |
| `live.py <code> "<b>TYPE</b>Label" <id> <size>` | points one button at its Drive file |
| `signature.py <code>` | the email signature: brand name in bold capitals with a short rule, three monospace lines, text only (`signature` in client.json) |

`build.sh` runs `dotx.js`, `_tools/annex/docx_fix.py`, `todotx.py`, `pdfs.js`
(against the site on port 8766), `press.py`, `ase.py` and `pdfcheck.py`.

**Traps already paid for:**

- docx-js needs `characterSet: '00'` on embedded fonts, and `docx_fix.py`
  for Word's schema.
- svglib's renderer leaks RGB and a Times reference, so `press.py` draws the
  symbol's paths itself.
- `pdfs.js` grabs drawings through the page picker's keys: `cover` is the
  invitation, `letter` is the letter, `page` is the certificate. Keep those
  keys on the page.
