# The losers, by name — and the one company to write to next

Pulled 27 October 2026, TED expert search API.

## The thing that was not known before today

**A TED results notice names every tendering party, not only the winner.**
The field is `organisation-name-tenderer`, and it is returned beside
`winner-name` on a `can-standard` notice. That is the entire "approach the
losers" play, and it was assumed to be impossible from public data in
`next-target.md`. It is one API call.

The field list is not documented; the way to get it is to send a deliberately
bad `fields` value, because the 400 response enumerates all **1,830** valid
ones. `received-submissions-count` does not exist; `tender-rank`,
`winner-name` and `organisation-name-tenderer` do.

```
classification-cpv IN (34928480 44613600 44613700 44613800 44618100 44618330)
AND notice-type=can-standard
AND buyer-country IN (NOR SWE FIN DNK)
AND publication-date>=20260101
```

68 notices. Of those, 25 name more than one bidder.

## The wheeled-bin market, decided tenders only

The container tenders that matter resolve to two small fields of runners who
meet each other every time.

| Notice | Date | Buyer | Bidders | Won |
|---|---|---|---|---|
| `302959-2026` | 4 May | Sauda kommune, NO | EnviroPac · Strømbergs · **Total Holding** | EnviroPac |
| `488553-2026` | 15 Jul | Attvin AS, NO | EnviroPac · Strømbergs · **Total Holding** | Strømbergs |
| `457660-2026` | 3 Jul | Södra Smålands Avfall & Miljö, SE | **Craemer Nordic** · PWS Nordic · **San Sac** | PWS Nordic |
| `482047-2026` | 13 Jul | Melleruds kommun, SE | **Craemer Nordic** · PWS Nordic | PWS Nordic |
| `638740-2026` | 16 Sep | Inköpssamverkan Motala, SE | PWS Nordic · **San Sac** | PWS Nordic |
| `719714-2026` | 19 Oct | Åre kommun, SE | **Craemer Nordic** · PWS Nordic · **San Sac** | PWS Nordic |
| `720175-2026` | 19 Oct | Norrtälje Vatten & Avfall, SE | PWS Nordic · **San Sac** | PWS Nordic |
| `255119-2026` | 15 Apr | Trelleborgs kommun, SE | six, incl. PWS Nordic | Balticum Frinab |

**PWS Nordic AB won every Swedish wheeled-bin framework in this set.** San Sac
lost four of them. Craemer Nordic lost three. In Norway, Total Holding lost
both it entered.

**This is only what TED publishes.** It is the tenderers and the award, not
the scores and not the reasons. Nothing here says *why* anyone lost, and a
mail that claims to know would be inventing proof.

## The recommendation: San Sac AB

`sansac.se`. Jönköping. Four losses to one competitor inside eight months, and
**two of them were published on 19 October — eight days ago.**

### Why this one and not the others

- **The trigger is the strongest available and it is fresh.** Two decisions in
  one day, both lost to the same company. Nothing in the email has to
  manufacture urgency, which is what every draft since the first has strained
  to do.
- **The competition is a company whose documentation is already read.** PWS
  Nordic is the manufacturer behind the Strømbergs catalogue scored for
  DR-003, so the winning document's own gaps are already mapped — including
  that `opptil 100 %` is a ceiling where a PCR requirement asks a floor.
- **They publish, and the relevant document is stale.** 17 PDFs across an
  18-page crawl. The one a bin framework needs is
  `sansac_sulo_citybac_katalog_sve.pdf`, 36 pages, **created 28 April 2021**
  by `pdfinfo`, sha256 `7aa1deba…fbda4`. The Molok material beside it is dated
  2024 and 2025, so the site is maintained and this file is the exception.
- **It is the SULO Citybac** — the same manufacturer and product family
  scored in DR-001 for EnviroPac. The analysis transfers almost whole.

### The cost, stated plainly

**It is Swedish, and nothing in this project is attested in Swedish yet.** The
edition rule holds — one language all the way through — so the review is a
Swedish document and the approach mail is English, exactly as for Norway. The
corpus check that made the Norwegian edition defensible is a script and a
regex against the buyer's own files, so it transfers; what does not transfer
is the ten sentences of connective prose. Budget one native read.

### Pre-flight, which is not optional

`_tools/review/README.md` applies in full, and its first question is the one
that has now been got wrong twice. **Check San Sac's whole published set
before scoring one file of it.** Seventeen PDFs is a set and one has been
opened. A newer Citybac sheet served at a different path, under a different
product name, is exactly what EnviroPac turned out to have.

### Which tender to score against

`720175-2026`, Norrtälje Vatten & Avfall — a framework, two bidders, decided
19 October. Swedish competition documents are public under
*offentlighetsprincipen*, so the förfrågningsunderlag and the
kravspecifikation can be requested from the buyer or pulled from the
procurement system the notice points at. A decided tender also removes the
one risk `CLAUDE.md` flags hardest: **there is no claim about a live
procurement left to make.**

## Second: Craemer Nordic AB

Three losses to PWS, same fields. Craemer's own documentation was already read
for DR-002 — the *«kun ren, høykvalitets PE»* line that asserts the opposite
of what a PCR requirement asks is theirs. Lower priority only because the
trigger is one loss weaker and the newest is the same 19 October notice.

## Third, and not yet: Total Holding AS

Org. 936527442, `totalholding.no`, *engroshandel med maskiner og utstyr
ellers*. The one Norwegian bidder in this market never written to, and the
cheapest by language.

**But it publishes nothing scoreable** — zero PDFs across an 18-page crawl,
the same signature Alles Miljø and Containergruppen showed in `sweep.md`,
which usually means a JavaScript catalogue rather than an absence. Fifteen
minutes in a real browser settles it. Do not write to them before that: the
free tier needs an input.

## What is now cheap that was not

The query above re-runs in seconds against any CPV family and any country.
**The losers list is no longer research, it is a lookup.** That changes the
shape of the whole approach: pick a market, pull the decided notices, and the
names of everyone who bid and lost come back with them.
