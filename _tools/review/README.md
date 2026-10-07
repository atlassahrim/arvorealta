# Building a document review

What the free tier delivers, and the five things that went wrong building the
first one. Each tool here exists because a step was done by hand once and cost
something.

## The pre-flight, before a single page is designed

**Both expensive errors on DR-001 were source verification, not craft.** The
review was built on a superseded datasheet and then dated from its URL. Both
would have been caught in five minutes here, and both were caught late — the
second one only because the owner sent the source file back and asked whether
it was the one reviewed.

- [ ] **Find the supplier's whole published set.** Each product page links its
      own current sheet, which is the sure route; probing the upload folders
      for a size list is the fast one. *The first build scored a two-page sheet
      and opened on the finding that only one size of six was documented. There
      was a current eight-page sheet for every size, under a different product
      name, at a different path.*
- [ ] **`pdfinfo` every source file.** The folder year is when they uploaded
      it, not when it was made, and on DR-001 the two were five and seven
      years apart. The sheet says **File dated** for that reason.
- [ ] **`sha256sum` the file being scored** and put it in the research note, so
      *is this the one you reviewed* is answerable in one command.
- [ ] **Read the competition document for the award weights and both
      deadlines**, from its own section rather than from memory. Written
      questions usually close about a week before the bid.
- [ ] **`krav.py` the requirement spreadsheet**, then split the numbered rows
      into the ones a product datasheet is the natural home for and the ones
      no datasheet answers. State that split on the sheet; do not assume it.

## Building

- [ ] `pdftoppm -r 200 -png source.pdf page`, then `crop.py boxes.json out/`.
      Keep `boxes.json` beside the research note — a crop is a quotation and a
      quotation has to be re-cuttable.
- [ ] Copy the two editions together. **A change to one belongs in the other
      in the same commit.** They are the same document, not a translation
      appended to it.
- [ ] `measure.py` after every content change. The budget is 246 mm and both
      sheets came in 91 mm and 18 mm over on the first pass while reading, in
      a screenshot, as though they fitted.
- [ ] `vocab.py` the foreign edition against a corpus of the buyer's own
      files. Replace invented compounds with the buyer's wording; what is left
      is the short list worth having a native speaker read.
- [ ] `export.py` both editions and check the A4 assertion.

## Before it goes

- [ ] **Re-check every live claim the same morning.** `curl -I` anything the
      document says is still on their site. The masthead carries the date
      because of exactly this.
- [ ] **No score anywhere.** The count is what is in the document, which is
      checkable. How an evaluator will judge it is not ours to say, and the
      standfirst says so.
- [ ] **The email contextualises, it never summarises.** What the document is,
      what is on each page, what it costs. The count crosses because it is a
      question rather than an answer; the deadline crosses because it decides
      whether the file is opened today. The findings stay in the PDF.
- [ ] One attachment, one language.

## The tools

| | |
|---|---|
| `krav.py` | numbered requirements out of a Bilag 2 `.xlsx` |
| `crop.py` | evidence figures out of a rendered PDF, from a box list |
| `measure.py` | every annex against the 246 mm budget, in px and mm |
| `vocab.py` | a foreign edition's words against the buyer's own files |
| `export.py` | A4 PDF, with the page size asserted |

`measure.py` and `export.py` need `python3 -m http.server 8777` running from
the repo root. Run `krav.py` with `python3 -I`: the spreadsheet came from a
stranger and `-I` stops Python importing anything from beside it.

## Starting a review

    cp -r annex/_review-template    annex/_<supplier>-review
    cp -r annex/_review-template-nb annex/_<supplier>-review-nb

Then swap every `[[...]]`. There are 45 of them and the template measures at
**zero overflow as it stands**, so anything the budget rejects afterwards came
from what was just typed rather than from the layout.

The placeholders carry their own line budget, which is measured rather than
guessed: a finding's quote runs two lines at 80 characters and its note two at
90; a third line of either puts the sheet over. The four plates are grey
placeholders at the aspect ratios the real crops ran, so the rows measure
correctly before any evidence exists.

**The scope split is `_research/valdres-663737/krav-scope.md`** — 34 of the 60
requirements are a datasheet's to answer, with each one's category and DR-001's
result beside it. It is the same for every supplier bidding this tender, so
read it rather than re-deriving it. Re-deriving risks a different denominator,
and a different denominator makes two reviews incomparable.

## What is still done by hand

**The approach note.** Contact, deadlines, award weights and both email drafts
are written per supplier. The deadlines and weights are the same for one
tender, so the second one is mostly a copy of `_research/enviropac/approach.md`
with a new name and inbox.

**There is no log.** `DR-001` implies a series that nothing tracks. One file
saying who was approached, when, with which reference and what came back is
worth having before the third.
