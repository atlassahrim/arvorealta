---
name: arv-brand-book
description: Start, continue or rebuild a client brand book at arvorealta.com/brand/book-<code>/ and every file it hands out (Word templates, press PDFs, palette), from one config file per client. Use when the owner types /arv-brand-book <Client>, or asks to start, continue, check or rebuild a client's brand book.
---

# Brand book pipeline

The owner types `/arv-brand-book <Client>` and nothing else. You ask for the rest.
Read `reference.md` (next to this file) once per session: it holds the rules.
Reply in the owner's language.

**Where things are:** the page `brand/book-<code>/index.html` · the config
`_tools/book/clients/<code>/client.json` · its record `clients/<code>/NOTES.md` ·
the scripts `_tools/book/kit/`. Eliria (`eli`) is the template client.

## 1. Find or start the client

- `ls _tools/book/clients/`. If the client has a folder, read its `NOTES.md` and go to 3.
- Otherwise ask, in **one** AskUserQuestion: the three-letter code (suggest one),
  the language, the Drive folder name (suggest `<Client> BRAND`). Then:
  `python3 -I _tools/book/kit/new.py <code> --name "<Client>" --lang <lang> --drive "<folder>"`
- Drive: find the folder, compare it with the tree in `reference.md`, show what
  exists and what is missing. Create folders **only after the owner says yes**.

## 2. Read before you ask

List the Drive folder in full and read every supplied file. A question whose
answer is in Drive is a wasted question.

## 3. The missing list drives the work

`python3 -I _tools/book/kit/check.py <code>` prints everything still missing.
Fill what Drive answers. Ask the owner for the rest in **one grouped message**,
in this order, and fill each before the next:

1. **Mark**: symbol, wordmark, lockup, icon → `brand/book-<code>/img/`, plus
   `clients/<code>/symbol.svg` and a 2400 px `symbol.png` in the dark colour.
2. **Colour**: hex values → `palette`, `dark`, `light`, `tokens`. State every
   contrast figure. CMYK: the client's, else `kit/cmyk.py`.
3. **Type**: faces and licences → `clients/<code>/fonts/`, `fonts`, and the
   page's woff2 and `@font-face`.
4. **Imagery**: the primary grounds → `img/`, webp, new names.
5. **Words**: line, signatory, `words`, document texts, the page's prose,
   in the client's language. Show them as a before → after table. When
   approved, drop the key from `_draft`.

Rerun `check.py` after each step. It is done when nothing prints under MISSING.

## 4. Build and hand out

- `sh _tools/book/kit/build.sh <code>` → `clients/<code>/out/`.
- Upload each file to its Drive folder (ask first). Then turn on its button with
  `python3 -I _tools/book/kit/live.py <code> "<b>DOTX</b>Carta" <drive-id> "<size>"`.

## 5. Close

- Check the page at 1440 and 390 on `python3 -m http.server 8766`: no page
  errors, no sideways scroll.
- Write every decision into `clients/<code>/NOTES.md`, never CLAUDE.md.
- Commit, then push the branch and `main`.
