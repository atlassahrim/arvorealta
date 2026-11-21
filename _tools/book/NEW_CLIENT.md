# Starting a new client brand book

Paste the prompt below into a new session, with the four fields at the top
filled in. Everything else it needs is in the repository: the rules in
CLAUDE.md (*Client brand books*), the page to copy (`brand/book-eli/`), and
the tools to copy (`_tools/book/eliria/`).

---

```
New client brand book.

Client:          <Client name, as the client writes it>
Short code:      <three lowercase letters, e.g. eli>   → arvorealta.com/brand/book-<code>/
Language:        <pt-BR | en | nb | fi …>
Drive folder:    <name of the client's folder in Drive, e.g. "Acme BRAND">

Before anything else, read CLAUDE.md, the section "Client brand books": its
six decisions govern this project. Eliria is the worked example; build this
book the same way.

1. Drive. Ask me before you change anything in Drive. Then make sure the
   client's folder has this structure, and create only what is missing:

     <Client> BRAND/
     ├─ 00 Start here/      <code>_readme.txt: what goes in each folder, and the naming rule
     ├─ 01 Mark/
     │  ├─ Master/          the design masters (Affinity, Illustrator)
     │  ├─ Screen/          symbol, wordmark, lockup as SVG per colour; icon PNG 32/180/512
     │  └─ Print/           the mark as CMYK PDF
     ├─ 02 Colour/          <code>_colour_palette.ase
     ├─ 03 Type/            one zip per family, with its licence
     ├─ 04 Imagery/
     │  ├─ Grounds/         the primary grounds, as supplied
     │  └─ Photography/
     ├─ 05 Documents/       letter, invitation, certificate (.dotx + .pdf),
     │                      card front/back, folder, envelope (press PDFs) + print spec
     ├─ 06 Applications/    social images, email signature
     └─ 99 Archive/         old material: never used for colour, design or logos

   File names: client_piece_version_colour_size.ext, lower case, no
   accents, no spaces, no version or date in a live file's name.

2. The page. Copy brand/book-eli/ to brand/book-<code>/ and turn it into
   this client's book: same head, CSS, script and twelve sections, written
   in <Language>. Change only the brand tokens --b-*, the content, the
   favicon (the client's icon) and the fonts. Keep noindex, nofollow and
   link it from nowhere. Every download button starts dashed, reading the
   language's "not yet", until its file exists in Drive.

3. The tools. Copy _tools/book/eliria/ to _tools/book/<code>/ and point
   dotx.js, pdfs.js, press.py and ase.py at this client: name, colours,
   fonts, symbol file, page URL.

4. Then work through what I have supplied in Drive, in this order, and stop
   to ask whenever something is missing or ambiguous:
   - Mark: symbol, wordmark, lockup, icon. Read every name at full
     resolution. Measure the lockup's alignment before you set the cover.
   - Colour: the client's values. Check every pair for contrast and state
     the figures. CMYK: use the client's if supplied; otherwise choose
     FOGRA39 values by colour difference, with _tools/book/eliria/FOGRA39L.icc.
   - Type: the supplied faces. A face without a licence is never served:
     propose the closest free substitute and show the comparison first.
   - Imagery: the primary grounds only, unless I say otherwise.
   - Message and culture: only lines I supply or approve.
   - Documents: draw them in the book, then build the .dotx and .pdf for
     each A4 piece and the press PDFs (CMYK, 3 mm bleed, crop marks,
     FOGRA39 output intent) for card, folder and envelope, with the print
     spec in the client's language.

5. Rules that do not bend without my word:
   - Only files the client supplied. Nothing from 99 Archive.
   - Anything the studio proposes is labelled as a suggestion on the page.
   - The page names the brand and nothing else: no people, prices, market
     or plans. The repository is public.
   - A new picture gets a new filename. A new Drive upload gets a new link,
     so its button needs the new id.
   - Copy on the page is shown to me before it goes live.
   - Verify at 1440 and 390: no page errors, no sideways scroll.
   - Record every decision in CLAUDE.md, under "Client brand books", in the
     same commit.

Start with step 1 and show me what exists and what is missing before
creating anything.
```

---

## What to have ready before starting

- **The mark**: symbol, wordmark and lockup as SVG in each brand colour,
  and the icon as PNG at 32, 180 and 512.
- **The palette**: hex values, and CMYK if the client has them.
- **The fonts**, with their licences.
- **The grounds**: the primary background photographs.
- **The words**: the brand's one line, the culture line, and the name that
  signs the documents.

The book can start with any of these missing. Their buttons stay dashed
until the files arrive.
