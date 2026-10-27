# Strømbergs AS — the published set, and what DR-003 scored

Checked 13 October 2026. Everything here came from `strombergs.no` with a
browser user-agent, and every date is from `pdfinfo`, never from a URL.

## The pre-flight caught the DR-001 error again

**A fourteen-page crawl found 8 PDFs. A sixty-page crawl found 21.** The
shallow pass missed every per-size datasheet, which is the whole family the
framework buys. Scoring on the first eight would have produced a review built
on an incomplete set for the third time. **Crawl until the count stops
rising.**

## The 21 documents

| File | Pages | Created |
|---|---|---|
| `2-side-system-2000` | 3 | May 23 2024 |
| `2-side-system-2800` | 3 | May 23 2024 |
| `2-side-system-3600` | 3 | May 23 2024 |
| `2ss-produktkatalog-no` | 24 | Oct 30 2024 |
| `avfallsbeholdere-1000-ergo-pws-2-` | 2 | Jun 1 2026 |
| `avfallsbeholdere-120-pws` | 3 | Aug 29 2025 |
| `avfallsbeholdere-240-pws` | 3 | Aug 29 2025 |
| `avfallsbeholdere-660-pws` | 3 | Aug 29 2025 |
| `avfallsbeholdere-770-pws` | 3 | Aug 29 2025 |
| `beholderskap-web` | 12 | Sep 4 2025 |
| `bioskap-vcocon` | 2 | Sep 3 2025 |
| `eco-framing` | 2 | Jun 15 2026 |
| `finncont-ikon-no-281025-web` | 12 | Oct 28 2025 |
| `finncont-module-202606-web` | 12 | Jun 16 2026 |
| `komprimator-pro-220325` | 8 | Mar 24 2025 |
| `nordic-pro-web` | 4 | Sep 5 2025 |
| `pws-avfallsbeholdere-140` | 3 | Jun 23 2025 |
| `pws-avfallsbeholdere-370` | 3 | Jun 23 2025 |
| `pws-avfallsbeholdere-80-042026` | 3 | Apr 28 2026 |
| `pws-avfallsbeholdere-web` | 24 | Aug 29 2025 |
| `retron-2025-no` | 4 | Oct 20 2025 |

## The PWS wheeled-container family

**Eight sizes, each with its own three-page `TEKNISK DATABLAD`:** 80, 120,
140, 240, 370, 660, 770, 1000 litres. That covers every size the framework
buys — 80, 140, 240, 370-or-360, 660, 1000 — with the 370 krav 13 prefers and
the 1000 krav 14 names.

**This is the strongest input of the three suppliers reviewed.** EnviroPac
published one eight-page sheet. Namdal published two Issuu flipbooks of other
manufacturers' brands, one of which cannot be downloaded. Strømbergs serve
current, attachable PDFs from their own domain, per size.

## What was scored

| | |
|---|---|
| Primary | `avfallsbeholdere 240 pws.pdf`, 3 pages, created 29 August 2025 |
| sha256 | `f2883774c90b527d30bbcbb8e7e0846031d5eff7c41301de8634dfea59a70e1b` |
| Context | `pws avfallsbeholdere_web.pdf`, 24 pages, created 29 August 2025 |
| sha256 | `e1821604ea5ad1b4ac6f7b09ea8474769540b4d2b5b2de41abc1a510a5746693` |

The 240 L is scored because it is the highest-volume size and because DR-001
scored the 240 L Citybac, which keeps the two comparable. **The catalogue is
scored with it**, because an evaluator has both and because finding 01 is
about the difference between them.

## The count

**12 answered · 12 partial · 10 absent, of 34.** The highest of the three.

Answered: 1, 2, 6, 7, 9, 10, 11, 13, 14, 18, 22, 27.
Partial: 3, 4, 8, 15, 16, 17, 23, 25, 41, 46, 57, 60.
Absent: 5, 12, 19, 20, 21, 24, 26, 28, 47, 58.

## What this document does that neither of the others did

- **Krav 2 answered outright.** A real per-size technical datasheet, served as
  a PDF from their own domain. Namdal could not attach anything.
- **Krav 18 answered on both.** `2 gummihjul Ø 250 mm` on the two-wheel
  sheets, Ø 200 on the four-wheel. Namdal's GMT range was 200 mm where the
  krav sets 250 for two-wheel.
- **Krav 60, the SVHC half.** *«Produktene inneholder ingen stoffer på
  SVHC-listen fra European Chemicals Agency (ECHA).»* On all eight sheets.
  Neither of the other two mentioned REACH anywhere. **It is partial, not
  answered**, because krav 60 also asks that pigments be free of lead,
  cadmium, mercury and hexavalent chromium, and that is not stated.
- **Krav 9 and 10.** The catalogue gives *«temperaturer fra -40 °C til
  +80 °C»* against the krav's −40 to +40, and a section on frozen waste.
- **Krav 6.** `RAL GZ 951/1` written out on every datasheet.
- **Krav 7 and 15.** `Egenvekt ca. 13 kg`, `Totalvekt maks. 144 kg`, with
  `(EN-840 standarden sier 110 kg)` beside it — they state the standard and
  then beat it.

## The four findings

**01 · Krav 57, A, climate 30 of 100 — the ceiling is in the catalogue.**

> «Alle PWS-beholdere kan produseres med **opptil** 100 % resirkulert plast.»

Three things wrong with it against a krav that asks a *forpliktende
minimumsandel* per part with a third-party certificate. **Opptil is a
ceiling.** *Kan produseres med* is a condition, not a commitment. And it is
**in the catalogue, not in any of the eight datasheets** — the datasheet is
what gets attached per size.

**This is the third company and the same word.** SULO wrote *inntil 100
prosent PCR*. PWS writes *opptil 100 %*. Craemer's German brochure writes
*bis zu 90 Prozent*. Three unrelated manufacturers, one requirement, and the
identical failure: a ceiling offered where a floor was asked for.

**Not said on the sheet:** that the Blue Angel does not count. PWS claim it
— *«PWS har oppnådd det internasjonalt anerkjente miljømerket Blue Angel* som
følge av dokumentert bruk av resirkulert plast»* — and the asterisk was
checked by rendering the page: it only explains that Blue Angel is Germany's
ecolabel and the equivalent of Svanen. It qualifies nothing. Whether that
certificate satisfies krav 57 is the buyer's call, not ours.

**02 · Krav 5 and 3, both A — EN 840 everywhere, never to a part.**

`Sertifisering: EN 840, RAL GZ 951/1` on every datasheet. Krav 3 and 4 ask
for **NS-EN 840 del 1-6** and no part is ever named. **NS-EN 1501-5 does not
appear in any of the 21 documents**, and krav 5 is an A-krav about the comb
lift their trucks use.

**03 · Krav 28, A — ten options, no spare parts.**

The datasheet's `TILVALG` box lists ten. Krav 28 asks that lids, lid plugs,
complete wheel sets and axles be offered as spares. **Lid plugs, wheels and
the axle are all given as technical data on the same page** and none is
offered as a part.

**04 · Krav 41, A — three colours, no code.**

`Standardfarger` is three swatches. Krav 41 names RAL 7016 or equivalent, and
a swatch cannot be compared with a code. `RAL` appears on the sheet twice and
both are `RAL GZ 951/1`, the quality mark.

## What the sheet deliberately does not say

**It does not compare Strømbergs to anyone.** The count is the highest of the
three reviewed so far and the closing line does not say so, because the
document goes to Strømbergs and naming the comparison would tell them their
competitors are getting the same approach. That would contradict the email's
promise to support one company.

## Re-check before sending

1. Both PDFs still live at `strombergs.no/media/multicase/documents/`.
2. Question deadline 19 October, bid 27 October 2026 12.00.
3. The masthead reads `13. oktober 2026`.
