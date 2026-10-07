# Namdal Ressurs AS — pre-flight, 7 October 2026

**DR-002 is blocked at step one of the pre-flight and should not be built yet.**
Not because the target is wrong — it is the right target — but because the
thing a review scores may not exist, and guessing that is the error that cost
a full rebuild on DR-001.

## The target is right

Namdal Ressurs AS, Verftsgata 12, 7800 Namsos. Supplier to the Norwegian waste
industry since 1991, certified to NS-EN ISO 9001 and 14001.

**4 wins in CPV 44613700 since 2023** — second only to EnviroPac's 5, and
ahead of Strømbergs' 3. From `_research/nordic-manufacturers/target-tender.md`.

## What is verified

- **Their product catalogues are Issuu flipbooks, not files.** Seventeen of
  them, all under `issuu.com/siljemerethebrondbo/`, linked from
  `namdalressurs.no/om-oss/produktarkiv/vareproduktkataloger/`. Fetched and
  read directly. **No PDF link appears anywhere on that page.**
- **They distribute at least three brands of wheeled container** — SSI
  Schäfer, Craemer and Helesi — rather than one manufacturer's family. EnviroPac
  sells SULO and nothing else, which is why a single datasheet scored cleanly
  there.
- **Their product pages return 404.** The URLs search engines have indexed
  (`/produkt/ssi-schafer-240l-hjulbeholder/`, `/produkt/helesi-240-l-hjulbeholder/`)
  serve a real 404 of 53,934 bytes, not a bot block. The site has been
  restructured since it was indexed.
- **Automated access is refused.** `403` on the site root and on
  `/wp-json/wp/v2/types`. The catalogue page is the one thing that renders.

## Why this stops the build

Krav 2 is an **A-krav** — failing it can get a bid rejected:

> «Det vedlegges produktblad / brosyrer over beholderne. Dokumentasjon på dette
> vedlegges.»

The requirement is to **attach** a product sheet. **An Issuu link cannot be
attached to a Mercell submission.** If their published documentation really is
flipbooks only, that is a sharper finding than anything in DR-001 — but it is
*one* finding, not four, and the `9 of 34` shape does not apply. It would be a
different document.

And if they bid with a manufacturer's datasheet instead — Schäfer's or
Craemer's own — then **that** is the document to score, and which one depends
on which brand they would offer. Neither we nor the review can decide that.

## The two-minute check that unblocks it

On a real browser, which is not blocked:

1. `namdalressurs.no` → **Produkter** → find a 240 L hjulbeholder.
2. Does the page offer a **downloadable PDF** — datablad, produktblad, brosjyre?
   Or only an Issuu reader?
3. If a PDF exists, save it and send it.
4. Note which brand the page leads with — Schäfer, Craemer or Helesi.

## The three shapes DR-002 could take

| What is found | The review |
|---|---|
| A real PDF datasheet | **DR-001's shape exactly.** Score it against the 34, template as built, half a day |
| Only Issuu | **A different, shorter document.** One finding: krav 2 is an A-krav and a flipbook cannot be attached. Stronger, but it has to be written rather than filled in |
| A manufacturer's sheet they would attach | Score that one, and say in the review whose document it is — which is itself the point, since it is not theirs |

## Worth knowing before planning thirteen approaches

**The free tier needs an input.** It scores a published document, so a company
that publishes nothing scoreable cannot receive one. Namdal is the second
name on the list and already the harder case. Check each company has something
attachable **before** promising a review of it — that check is minutes, and it
is the difference between thirteen approaches and thirteen attempts.
