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

- **22 November, afternoon. The owner's re-exports, checked.** Right now:
  symbol algodão, wordmark raiz, the four lockups outlined (no live text), the
  monogram in raiz, algodão and black, the icons (now the gold render on raiz),
  the primary PNGs and the grounds renamed. Still wrong: every `_palha` file is
  `#DFB67C` (palha is `#D3B67C`), and `lockup_raiz` carries no fill, so it is
  black. Not renamed yet: `icon_32x32`, `icon_180x180`, `icon_512` and
  `Master/primary_raiz_4800w.png`. The icon at 32 px is the gold render, which
  the book's own size rule says loses its detail below 120 px; flagged.
- **22 November. Signatory is an example**, at the owner's word: `Nome
  Sobrenome`, `Coordenação`, `telefone / e-mail / endereço` (a list, one line
  each; a string printed one letter per line on the card). The hand-out files
  are built: three .dotx and .pdf, the card, folder and envelope as PDF/X-1a,
  the print spec. `press.py` needs svglib, pikepdf and fonttools installed.

- **22 November. Palha is `#DFB67C`**, at the owner's word, the value his
  re-exported files carry (it was `#D3B67C`). CMYK 20 30 60 0 (FOGRA39, ΔE
  0.6). Raiz on palha 7.9:1; palha/algodão 1.6, eucalipto/palha 1.7. The four
  palha files are live; the page's palha symbol is the Drive file
  (`symbol-palha-2`).
- **22 November. Uploaded, at the owner's word**: the palette again to
  `02 Colour` (`1pEKlu3pgifrz3qlSInHJOR-7PlzQKg1l`; the earlier upload, with
  the old palha, is in the bin), and to `05 Documents` the three .dotx and
  .pdf, the card front and back, folder and envelope (PDF/X-1a) and
  `mulheresreais_print_spec.txt`. 35 buttons live, 9 waiting.

- **22 November. The line is now `Ela é a origem.`**, at the owner's word,
  replacing `A história é dela.` (the rule `A história é de quem contou`
  stays). `Em uma frase` reads `Mulheres Reais dá eco à conversa que já
  acontece entre mulheres, e deixa cada história abrir seu caminho.`

- **22 November. Raiz 70 · Algodão 20 · accents 10**, at the owner's word,
  reversing the earlier Algodão 70. The mark lives on dark (the gold needs
  shadow, which the imagery rules already say); algodão is the paper of the
  documents and the text on raiz; documents and long text stay on algodão.
  Palette order in `client.json` and the .ase is now raiz first. The palette
  went up again (`1gkjAAhB73dEQTl4wAo-gR-njbHmODhBw`); the previous upload is
  in the bin.
- **22 November. Icons: one colour, three sizes**, at the owner's word: the
  icon is a square with its own ground, so raiz alone (32 tab, 180 home
  screen, 512 profile). The eucalipto and palha icon buttons came from Eliria
  and are gone. Still suggested: the 32 px icon as the flat symbol, since the
  gold render blurs there.

- **22 November, evening. Checked:** `lockup_raiz` is raiz now (live);
  the 32 px icon is the flat palha symbol on raiz (`icon-raiz-3-32`, the
  favicon); the master PNG is `primary_gold_4800w`. Three icon names still
  carry spaces: `mulheresreais_mark_ icon_raiz_32x32.png`,
  `mulheresreais_mark_icon_ raiz_ 180x180.png`, `mulheresreais_mark_icon_ raiz_ 512.png`.
- **22 November. Email signature**: `clients/mre/signature.html`, uploaded
  to `06 Applications` (`1jeWvC3yZ0_Mf12p3JiEPpjtZyd743fpw`). Tables and
  inline styles; one image, the drawn name, hosted at
  `/brand/book-mre/img/mulheresreais-signature-wordmark-raiz-1-520.png`, with
  `MULHERES REAIS` as alt text; the brand faces first, system faces behind.
  The image lives on arvorealta.com, so a reader of the email's source sees
  the book's folder; move it to the client's own site when there is one.
- **22 November. The layout follows the text**, at the owner's word: `.line`
  is `max-width:18ch; text-wrap:balance` and carries no `<br>` (`Ela é a
  origem.` sits on one line), the invitation title is one string and its lede
  flows after it. The same CSS and flow went into the template client (Eliria
  renders as before; her breaks are in her copy). `check.py` now flags a hand
  break in a short line or document title. The invitation was rebuilt and
  re-uploaded; the old pair is in the bin.

- **22 November. Icon names fixed in Drive** by this session, at the owner's
  word: `mulheresreais_mark_icon_raiz_{32x32,180x180,512x512}.png`.
- **22 November. Email signature redesigned, no images**, at the owner's
  word (the first version hosted a wordmark PNG; deleted). Name in Cormorant
  Garamond with Georgia behind it, role in Alegreya Sans, and a raiz band
  with MULHERES REAIS in palha spaced capitals and the line in algodão
  italic; phone and e-mail on their own lines, e-mail in barro. 320 px wide,
  fits a phone. The type rule now names the signature as the one place the
  name is typed. Drive `1Zg3-0SeA76OGIgSXIO-CgNPntEtIKaBX`; the earlier file
  is in the bin.
- **22 November. Social images, all five formats**, made by this session from
  the grounds, the gold render and the wordmark, centred on the arches' axis:
  link (leitura), square (passos), portrait and story (with the line), and a
  flat raiz LinkedIn banner with the palha lockup. `social/t.html` and
  `social/r.js` are the template and runner (their assets were in the
  scratchpad: the grounds cut to 2601 wide, `primary_gold_2400w`, the
  wordmark and the palha lockup). In `06 Applications`, one button each; the
  table says where to keep the important part in each format. 42 buttons
  live, none waiting.

- **22 November, night. Four grounds**, the owner's new files in
  `04 Imagery/Grounds`: passos (three women in a wheat field), beleza,
  cozinha, colheita, all paintings, same arch motif at the same axis
  (x 1300.5-1300.75). Leitura is gone, and passos and colheita are new
  files. The cover cross-fades the four (32 s); the imagery section shows the
  four, two by two below 820 px. Their names are the owner's.
- **22 November. Social images rebuilt on the new grounds**: link passos,
  square beleza, portrait cozinha, story colheita; the LinkedIn banner is
  unchanged. Old files in the bin.
- **22 November. Email signature after the owner's reference** (a Casa
  Bosques card): MULHERES REAIS in bold sans capitals with a short 2 px rule,
  then three lines in the computer's own monospace (name and role, phone,
  e-mail), all in raiz. Monospace is outside the brand's three families; it
  is the reference's look, at the owner's word, and the type rule says so.

- **22 November, late.** The colour preview reads the line, `Ela é a
  origem.` (it still said `a confirmar`). The type specimens follow the
  brand: `A conversa que já acontece`, `Roda de histórias`, `de quem contou`
  (italic), `contada em primeira pessoa`, `Roda nº 07 · 12 dez 2026`.
- **22 November. New 180 and 512 icons from the owner**: the gold render in a
  smoky night scene with sparks. Flagged: the ground is a cool blue-black
  (`rgb(2,9,15)` to `rgb(21,31,40)`), not raiz, while the file names say
  raiz; and the cool smoke sits outside the earth palette. On the page and
  live at the owner's word (`icon-raiz-4-*`).

- **22 November. 180 and 512 icons replaced by the owner**: the gold mark
  over a painting ground, no flat raiz square. New Drive files
  (`17I70PNxDQa0EyuX4xN68ic8qSBGGQhjJ`, `1jn-rYPTnbtG34aEYZqMMDghL3ThKm-mS`);
  the old two are in the bin. On the page as `icon-raiz-5-*`. The 32 px
  flat palha symbol on raiz is unchanged. The card's text was rewritten
  to match, approved by the owner. Drive names keep `raiz`, at his word.

- **22 November. Favicon**: the symbol, raiz on a light browser and
  white on a dark one, no ground (`img/mulheresreais-favicon-2.svg`, by
  `kit/favicon.py`); no PNG fallback, at the owner's word.

## Waiting for

Nothing on the page. Open: the lawyer (LGPD, electoral identification) and the client's permission to keep the book live. The mark section's anatomy and size note, and the imagery rules (jewellery), are still Eliria's text. `check.py mre`
has the full list.
