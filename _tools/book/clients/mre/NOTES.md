# Mulheres Reais — `mre`

Page: `brand/book-mre/index.html`, Portuguese (pt-BR). Drive: `Mulheres
Reais BRAND`. Config: `client.json` here. Started from Eliria on
21 November. The rules every book follows are in
`.claude/skills/brand-book/reference.md`.

## Decisions

- **21 November.** Code `mre`, language pt-BR, folder `Mulheres Reais BRAND`.
- **21 November.** The Drive tree was created at the owner's word. Before
  that the folder held only `99 Archive`, which had been created that day.
  It holds old logos, backgrounds, talk slides and intro videos, and none of
  it is used. The owner uploads the current logo files to `01 Mark`.
- **21 November. On `main` and live at `/brand/book-mre/`, at the owner's
  word**, `noindex, nofollow`, linked from nowhere, so he can open the Drive
  section and name his exports. Its pictures are not in yet, so most
  images on the page are empty. The other sections still carry Eliria's
  structure and swatches until the colour, type and words steps.
- **21 November. Colours were named by role (`dark`, `light`, `accent`)
  for one turn**, while no palette existed. Superseded the same day by the
  palette below; file names now carry the palette words.
- **21 November. The palette, approved by the owner.** He supplied four
  colours (`#3F310A`, `#A4734B`, `#739587`, `#D0B077`). Three of them sat
  at one lightness (Barro and Eucalipto measured 1.24:1, 1.15:1 for the
  commonest colour blindness) and there was no light ground. The studio
  respaced them as a ladder and added a paper; the owner approved:
  - **Algodão** `#F2ECDE`, 70, the paper · `algodao` · CMYK 6 6 14 0
  - **Raiz** `#332415`, 20, text and mark · `raiz` · CMYK 40 68 100 90
  - **Barro** `#935234`, accent, the one accent that is small text · `barro` · CMYK 2 60 76 52
  - **Eucalipto** `#779989`, accent, a ground · `eucalipto` · CMYK 62 30 52 0
  - **Palha** `#D3B67C`, accent, a ground; the symbol on raiz · `palha` · CMYK 24 26 60 0
  CMYK from `kit/cmyk.py` (none supplied), all ΔE ≤ 1.05. Contrast: raiz
  on algodão 12.7, on white 15.0, on palha 7.7, on eucalipto 4.8; barro on
  algodão 5.1, on white 6.0, on raiz 2.5 (never). Never text on each
  other: barro/eucalipto 1.9, eucalipto/palha 1.6, palha/algodão 1.7.
  Names were the owner's choice from proposals; `Sálvia` was replaced by
  `Eucalipto` because it was unclear. `Folha` was avoided (Eliria's),
  `Erva` too (slang).
- **21 November. File colours**: symbol, wordmark and lockup in
  `raiz`, `algodao`, `palha`, `black`; icon and grounds on `raiz`,
  `eucalipto`, `palha`. `--b-amber` is palha, because barro on raiz fails.
  Documents: `doc_soft` `#70665B` (5.6:1 on white), `doc_rule` `#D6D3D0`.
- **21 November. The namer writes the client field as one word**
  (`Mulheres Reais` → `mulheresreais`, the folder's slug), not with a
  hyphen; that line differs from the template's script.
- **21 November. Eliria's leftovers removed from the public page**:
  `Lia Noleto` is `Nome Sobrenome`, the line `Vincular ocasiões e joias
  exclusivas.` is `A linha da marca, a confirmar.`, and Carla Sans (Eliria's
  logo face) is `Fonte do logo`, to be confirmed with the logo files.

- **22 November. Palette uploaded** to `02 Colour` as
  `mulheresreais_colour_palette.ase` (Drive id `1MRr7l9JbEGoSsDchdTchozefLH9_rtqf`).
- **22 November. The owner's logo files, checked.** The mark is three women
  riding one galloping horse. The primary is a gold metal render (PNG, sRGB,
  transparent), so its colour word is `gold`, as in Eliria's rule; the page
  says `primary_gold`. The logo face is **Cormorant Unicase** (OFL, Google
  Fonts), read from the lockup files. Faults found, reported to the owner:
  - `symbol_algodao` is drawn in `#D8CCBD` (Eliria's Areia), not `#F2ECDE`.
  - every `_palha` file, and the icon's symbol, is `#D7AE6E`, not `#D3B67C`.
  - `wordmark_raiz` and `lockup_raiz` are drawn in Barro `#935234`.
  - the four lockups carry the name as live text in Cormorant Unicase, so
    any device without the face draws it in another font. Convert to curves.
  - names: primary `_dark_` (screen) and `_raiz_` (master) for a gold
    render; icons `icon_32x32`, `icon_180x180`, `icon_512` with no colour.
  The page's web copies of `symbol-algodao-1`, `symbol-palha-1` and
  `wordmark-raiz-1` are recoloured to the palette (geometry untouched); their
  download buttons stay waiting until the Drive files are fixed. Live:
  primary PNG 600/1200/2400, wordmark algodão and black, symbol raiz and
  black, the palette.
- **22 November. "Como é feita" is hidden** (`display:none`): its numbered
  parts described Eliria's fan. It returns with copy written for this mark.

- **22 November. Type, approved by the owner**: Cormorant Garamond for
  titles (Medium) and field figures (SemiBold, lining), Alegreya Sans for
  everything read (Light, Regular, Medium, Bold; Italic). Both OFL. Chosen
  because Cormorant Garamond shares the logo's family (Cormorant Unicase) and
  its contrast matches the monogram's hairlines. Kit roles: semibold maps to
  Alegreya Sans Bold (no 600), condensed to Cormorant Garamond SemiBold (no
  condensed width). TTFs from @expo-google-fonts, woff2 from @fontsource
  (latin, latin-ext). Tenor Sans and Open Sans, the template's, are gone.
  Alegreya Sans runs small: a point larger in documents.
- **22 November. The monogram** is in Drive as `symbol_alt.svg`, black only;
  suggested name `monogram`. Its hairlines vanish at 32 px. Not on the page
  yet.
- **22 November. Cover and grounds, at the owner's word**: the three files in
  `04 Imagery/Grounds` (`Untitled line .jpg`, `line2`, `line3`, all
  2654 × 1493) share one gold arch motif, measured centred at x 1300.5. The
  cover cross-fades them (24 s, off under reduced motion) under a soft ink
  wash, each cut to 2601 px wide so the arches' axis is the picture's centre;
  the gold mark and the name sit on that axis (the render is moved 1.7 per
  cent right, because its opaque pixels centre at 48.3 per cent of its file).
  Eliria's off-centre lockup offsets are gone. The same three, cut 4:5 on the
  axis, are the imagery section's grounds, named by this session `passos`,
  `leitura` and `colheita` (the owner can rename). Their rights are the
  owner's to confirm: two look like film stills and one like a painting.
- **22 November.** The cover's Eliria sentence (`liga ocasiões e joias
  exclusivas`) is gone; edition 0.1, dated 22 November.

- **22 November. The words, approved by the owner.** He supplied the
  project's concept in the conversation; it is not stored in this public
  repository, and the book carries only its public posture and voice, never
  the electoral strategy. Decisions: the name stays **Mulheres Reais**; the
  line is **A história é dela.**; the mark's reading (the three, the crown,
  the outstretched arm, the horse, the proportion) goes in as `Sugestão`; the
  documents are letter, invitation and **Termo de uso da história** in place
  of Eliria's certificate. Eliria's text in sections 01, 02, 03, 07, 08, 09,
  10 and 11 is replaced. The monogram has its own card (black file live).
- **22 November. Flagged to the owner, not settled:** the Termo needs a
  lawyer (LGPD treats political opinion as sensitive data), and printed
  campaign material needs the identification electoral law asks for in the
  official period.
- **22 November. Kit:** `dotx.js` reads `fonts.title.caps` (false here;
  Eliria unchanged), `documents.certificate.after` and
  `documents.certificate.file` (`terms`); `pdfs.js` reads `file` too. The
  Word build needs `signatory`, still empty.

## Waiting for

Signatory (name, role, contact); the logo fixes listed above. The mark section's anatomy and size note, and the imagery rules (jewellery), are still Eliria's text. `check.py mre`
has the full list.
