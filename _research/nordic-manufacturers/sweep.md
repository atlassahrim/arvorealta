# The remaining targets — who publishes something scoreable

Swept 13 October 2026, against the 13 winner rows in `target-tender.md`.

**There are twelve companies, not thirteen.** `Alles Miljø AS` appears twice
in that list's one-win row, which is a dedup miss in the source. Two are done
— EnviroPac (DR-001, sent) and Namdal Ressurs (DR-002, ready) — so **ten
remain**, not eleven.

## The rule this sweep exists to enforce

**The free tier needs an input.** It scores a published document, so a company
that publishes nothing scoreable cannot receive one, and a company that does
not sell wheeled refuse containers is not bidding this framework whatever it
won in the same CPV. Checking that is minutes. Not checking it is the
difference between ten approaches and ten attempts.

## Method

`_tools/review/issuu.py` for flipbooks, and a bounded crawler for the rest:
fetch the root with a browser user-agent, follow up to fourteen same-host
links whose path matches a product or download word, collect every `.pdf` and
every `issuu.com` URL. Dates come from `pdfinfo`, never from the URL.

**A browser user-agent is not optional and it is not politeness.** Three of
the sites in this project answered 403 to a bare `curl` and 200 with a UA
string — Issuu, namdalressurs.no, and the first pass at this sweep. A 403 here
means the client, not the site.

## The result

| Company | Wins | Sells wheeled containers | Publishes | Verdict |
|---|---|---|---|---|
| **Strømbergs AS** | 3 | yes | **8 PDFs, current, downloadable** | **Build DR-003** |
| PWS Nordic AB | 1 | yes, manufacturer | nothing of its own | See below |
| Alles Miljø AS | 1 | solutions for waste and recycling | no PDF in 12 pages | Second pass |
| Containergruppen Norge AS | 1 | containers, but skips and plant | 1 PDF, an ISO certificate | Second pass |
| Lehtovuori Oy | 1 | **no** — street litter bins, bike shelters, benches | no PDF in 14 pages | **Out** |
| Stena Recycling AS | 1 | **no** — waste operator | — | **Out** |
| Franzefoss Gjenvinning AS | 1 | **no** — waste operator | 1 PDF, a household sorting guide | **Out** |
| Terje Paulsen Transport AS | 1 | **no** — haulier | domain not found | **Out**, unverified |
| Sunnmøre Transport AS | 1 | **no** — haulier | domain not found | **Out**, unverified |
| Notodden Renovasjon & Gjenvinning AS | 1 | **no** — operator | domain not found | **Out**, unverified |

**Six of the ten are not container suppliers at all.** CPV 44613700 is awarded
to whoever wins the contract, and for a municipality that is often the
haulier or the operator rather than the manufacturer. The winner list was
never a list of bidders for a supply framework, and treating it as one would
have cost six approaches.

**The last three are an inference, not a check.** Three guessed domains did
not resolve and no further search was run. The names and the business type
make it near-certain, but if the list ever needs to be exhaustive, that is
the gap, and it is one search each.

## Strømbergs AS — build DR-003

`strombergs.no`. Three wins since 2023, third behind EnviroPac and Namdal.
**Eight PDFs served directly from their own site**, all dated from `pdfinfo`:

| File | Pages | Created |
|---|---|---|
| `pws avfallsbeholdere_web.pdf` | 24 | 29 August 2025 |
| `pws avfallsbeholdere 370.pdf` | 3 | 23 June 2025 |
| `beholderskap_web.pdf` | 12 | 4 September 2025 |
| `nordic pro_web.pdf` | 4 | 5 September 2025 |
| `retron_2025_no.pdf` | 4 | 20 October 2025 |
| `finncont-ikon-no_281025_web.pdf` | 12 | 28 October 2025 |
| `finncont-module_202606_web.pdf` | 12 | 16 June 2026 |
| `eco framing.pdf` | 2 | 15 June 2026 |

**This is the best input of the three companies so far, and by a distance.**
Namdal's material was two Issuu flipbooks of somebody else's brand, one of
them undownloadable. EnviroPac's was one eight-page sheet. Strømbergs serve
current, attachable PDFs from their own domain, and the 24-page PWS catalogue
is the natural attachment under krav 2.

**It covers every size the framework buys and the one it prefers.**
80 · 140 · 240 · **370** · 660 · 770 · **1000** · 1100 litres. The 370 has a
three-page `TEKNISKT DATABLAD` of its own, and krav 13 reads *«Det er ønskelig
at det leveres 370 l beholder»*. The 1000 is the size neither Craemer nor
Schäfer's EN 840 ranges had, which was DR-002's finding 02.

### What it answers that the other two did not

- **Krav 6, RAL-GZ 951/1 by name.** *«Certifikat enligt EN840 och RAL
  GZ 951/1.»* EnviroPac's current sheets dropped it, Schäfer gestures at RAL
  membership, Craemer shows the mark. PWS writes the number.
- **Krav 57, the Blue Angel, stated.** *«PWS har oppnådd det internasjonalt
  anerkjente miljømerket Blue Angel som følge av dokumentert bruk av
  resirkulert plast.»* This is the exact claim Craemer holds and does not put
  in the Norwegian edition, which was DR-002's finding 01.
- EN 840 appears 63 times.

### What still fails, on a first read

- **Krav 57 is still not answered, and it fails the same way SULO's did.**
  *«Produsert i opptil 100 % resirkulert materiale.»* **Opptil is not a
  minimum.** Krav 57 asks a *forpliktende minimumsandel* per part with a
  third-party certificate. Three companies, three unrelated documents, and
  the same requirement defeats all three in the same words.
- **Krav 3 and 4 want `NS-EN 840 del 1-6`.** All 63 citations are bare
  `EN 840` or `EN840` with no part number anywhere.
- **Krav 5, NS-EN 1501-5: zero occurrences.**
- **Krav 60, REACH and SVHC: zero.**
- **Krav 28, spare parts: zero.**
- **Krav 58, guarantee: zero.**
- **Krav 41 wants RAL 7016.** `RAL` appears 37 times and **not one is a
  colour code** — every hit is `RAL GZ 951/1`, the quality mark.

**So DR-003's count will be higher than DR-002's, and that is the pitch.**
*You are the best-documented bidder on this framework and krav 57 still
cannot be answered from your catalogue.* That is a harder, better argument
than finding a company with nothing, and it goes to a reader who can tell
the difference.

**Do not score it from this note.** These are grep counts on an extracted
text layer, not a reading. The pre-flight in `_tools/review/README.md` still
applies in full, and the first thing it asks is whether the whole published
set was checked — eight PDFs is a set, and only two have been opened.

## PWS Nordic AB — do not approach separately

PWS manufactures the containers Strømbergs sells. **`pwsnordic.com` and
`pwsab.se` publish no PDF at all across fourteen crawled pages each**, so
there is nothing of their own to score; the documents reviewed under DR-003
would be PWS's documents published by their Norwegian channel.

That is worth knowing and it is also a trap. Strømbergs and PWS Nordic are
both on the winner list, so they may both bid, and **the email promises to
support one company in this competition.** One review of the PWS material
cannot be sent to both. Strømbergs is the one to approach: three wins against
one, a Norwegian entity bidding a Norwegian framework, and they are the party
who actually publishes the document.

## Alles Miljø and Containergruppen — a second pass, cheap

Both sell into waste handling and neither surfaced a product document in a
fourteen-page crawl, which usually means a JavaScript catalogue rather than
an absence. Containergruppen describe themselves as a *totalleverandør av
containere og utstyr* covering construction, agriculture and industry, so
their containers may be skips rather than the EN 840 wheeled kind the
framework buys.

**Fifteen minutes on a real browser settles both**, which is the same check
the Namdal pre-flight asked for and the same one that turned out to be the
whole story there.

## Order to work in

1. **Strømbergs** — DR-003, and it is ready to build.
2. **Alles Miljø and Containergruppen** — browser check first, build only if
   a real product document exists.
3. Everything else on the list is out.

**The realistic count is three or four approaches on this tender, not
thirteen.** That is not a shortfall. It is what the list was always worth,
and knowing it now is worth more than ten emails that could not be answered.
