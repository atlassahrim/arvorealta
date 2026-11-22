# Eliria — `eli`

The first client book, and the template `new.py` copies. Page:
`brand/book-eli/index.html`, Portuguese. Drive: `Eliria BRAND`. Config:
`client.json` here. The rules every book follows are in
`.claude/skills/brand-book/reference.md`. This file is only what is
Eliria's. The day-by-day record before 21 November is in git.

**Where it lives**: `/brand/book-eli/`. `/eliria/` is a stub forwarding
to it, hash included; delete the stub only when nothing says the old
link is still held. The one thing taken from Eliria's project PDF is
section 01's three rules and its culture line.

## As it stands on 21 November

- **Name**: Eliria alone; Thalla is dropped. Line: `Vincular ocasiões e
  joias exclusivas.`
- **Palette, 70 / 20 / 10**: Ardósia `#252F37`, Areia `#D8CCBD`, Camel
  `#8E7657`. **Folha madura `#273121`** is outside the proportion: it
  replaces the ardósia on special occasions and never shares a surface
  with it. Areia on either dark measures 8.6:1. Camel on either measures
  3.2:1, so it is for large type only. Camel on areia measures 2.7:1, so
  it is never used there, and rules on areia are drawn in ardósia. The
  file words are `ardosia`, `sand`, `camel` and `folha`. The CMYK values
  are under the press files below, and `02 Colour` holds
  `eliria_colour_palette.ase` with both sets, RGB and CMYK FOGRA39, built
  by `kit/ase.py`.
- **Type: three faces, one job each, since 21 November.**
  - **Carla Sans is the logo only.** It lives inside the supplied
    wordmark and lockup files and is never typed or served, because its
    files carry no licence. Never touch the logo files' lettering.
  - **Tenor Sans sets every title** (OFL, self-hosted in
    `brand/book-eli/fonts/tenor-sans-latin{,-ext}.woff2`), in capitals
    with about .06em of tracking through the `.ts` class, `.04em` inside
    the document drawings. One weight: no bold, no italic. It replaced
    Carla Sans in every title, chosen as the closest free match. The
    Carla SVG outlines and `_tools/book/carla_svg.py` are deleted.
  - **Open Sans** is self-hosted (OFL). Every field of live text is Open
    Sans, the card back and the email signature included.
- **Mark**: symbol, wordmark and lockup as SVG in ardósia, sand, camel
  and black, plus the grass icon.
  - **The lockup's word sits right of the symbol's centre on purpose.**
    It runs from where the blades meet to the inner curve of the bracket,
    8 per cent of the symbol's width off centre. Never recentre it.
  - **The cover repeats that alignment** under the gold mark: `.lk .wmk`
    at 21.77 per cent in, 72.93 per cent wide and 15.2 per cent below.
    **The cover is centred on the name, not on the block**: `.lk` moves
    8.235 per cent of its own width left, so the name's centre is the
    cover's centre and the mark sits a little left with it. Measured at
    0.0 px off centre at 1440, 820 and 390.
  - **The cover ground is the ardósia photograph**, cut from the Drive
    original to `img/eliria-cover-ardosia-1-{900,1670}.webp`, centred,
    with the board's right edge cut off.
  - **Version tiles carry no padding**, and each picture is centred in
    its tile. The icon fills its tile with `object-fit: cover`.
- **Documents**, all drawn to scale. Paper and card are settled: change
  them only when asked.
  - **Letter, invitation and certificate**: A4, the symbol in ardósia at
    15 mm on the letter and 22 mm on the other two.
  - **Card**: 85 × 45 mm. The symbol is printed in ardósia on the front,
    20 mm wide. The back is Open Sans.
  - **Folder**: 230 × 310 mm. **Envelope**: DL, 110 × 220 mm, standing.
    Both are ardósia with the symbol in areia, at 32 mm and 40 mm, and
    nothing else printed.
  - **The signatory is `Lia Noleto`.** Recipients read `Nome Sobrenome`.
  - **The files are in Drive, `Eliria BRAND/05 Documents`, since
    21 November**, and each document's button in the book opens its own
    file. **Each A4 document (letter, invitation, certificate) comes as a
    Word template and a PDF**, since 21 November at the owner's word: the
    `.dotx` with Tenor Sans and Open Sans embedded, matched to the
    drawing within a point, and the PDF printed from the drawing itself.
    The card, folder and envelope are press PDFs, below.
    `sh _tools/book/kit/build.sh eli` rebuilds them all. **Rebuild and re-upload when a document
    changes in the book**; a new upload is a new file with a new link, so
    its button needs the new id.
  - **`03 Type` holds `eliria_type_tenor-sans.zip`**: the TTF and its
    OFL licence.
  - **The card, the folder and the envelope are press files, since
    21 November**: PDF/X-1a:2003, CMYK only, fonts embedded, 3 mm bleed,
    crop marks in the slug, TrimBox and BleedBox set, and a FOGRA39
    output intent. `kit/press.py` builds them with
    reportlab and pikepdf; `kit/pdfcheck.py` confirms no RGB operator and the
    intent. The symbol's SVG paths are drawn straight onto the canvas,
    because svglib's renderer leaks an RGB default and a Times reference.
    `eliria_print_spec.txt`, built from `kit/spec/pt-BR.txt`, goes to the printer with them, in Portuguese:
    the folder and envelope files are the printed face only, and the die
    is the printer's. The card back's contact lines are still examples.
  - **The CMYK values are FOGRA39**, chosen by colour difference to the
    screen value with a profile built by ArgyllCMS from Fogra's own
    FOGRA39L data (`kit/FOGRA39L.icc`): Ardósia C66 M36 Y20 K90 (ΔE 0),
    Areia C19 M19 Y27 K0 (no black, so a light ground stays clean),
    Folha madura C58 M28 Y82 K91. **Camel keeps the client's C41 M47 Y59
    K15**, which came with the brand; the FOGRA39 match would have been
    C20 M34 Y56 K45. On uncoated stock the printer converts to its own
    profile.
  - **All four press files and the spec are in `05 Documents`**, and the
    book's buttons open them. The card uploads were first refused by the
    session's safety check and went up once the owner allowed them. The
    earlier screen versions and the first spec sheet went to the bin at
    the owner's word. With the A4 PDFs and the invitation template added
    the same day, `05 Documents` holds eleven files, one of each. The
    book's only waiting buttons are the social images and the email
    signature.
- **Imagery**: the three primary grounds only (pedra, ardósia, areia),
  at 4:5.
- **No `Versões` table.** The cover keeps its edition number.

- **22 November. Icon: one ground, three sizes**, at the owner's word, the
  same decision as Mulheres Reais: the icon is a square with its own ground,
  so grama alone (32 tab, 180 home screen, 512 profile). The areia and camel
  icon buttons are off the page; their files stay in Drive.
- **22 November. Email signature**, on the Mulheres Reais model at the owner's
  word: ELIRIA in bold Open Sans capitals with a short rule, then three lines
  in the computer's monospace, in ardósia. Built by `kit/signature.py` from
  `signature` in client.json; in `06 Applications`
  (`18K0_ahXcEkM6Uuw-uAQ-nt2MrkMmik8f`). Contact lines are examples.

- **22 November. Favicon**: the symbol, ardósia on a light browser and
  white on a dark one, no ground (`img/eliria-favicon-2.svg`, by
  `kit/favicon.py`); no PNG fallback, the 180 px grass icon is the
  home-screen icon only.
- **22 November. Social images**, on the Mulheres Reais model: the gold mark
  and the sand wordmark in the cover's own geometry (name centred, mark
  8.235 per cent left), on the three primary grounds from Drive: link
  ardósia, square pedra, portrait areia (ardósia wordmark and the line in
  Tenor Sans capitals), story ardósia with the line; LinkedIn banner flat
  ardósia. All five in `06 Applications`; the story is a JPG at q88
  (644 KB, `19funqgzP6VCsJxHV4BKRasNBrQu9KbRE`), because the PNG was over
  the upload limit. The runner is `social/` here.

## Open

- The card back's contact lines are examples (`contact_final: false`).
- The CMYK values were chosen before `kit/cmyk.py` existed, at 1 per cent
  steps; `cmyk.py` proposes values within a few points of them. Keep the
  recorded ones.
