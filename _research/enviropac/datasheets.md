# EnviroPac's published container datasheets

Checked 6 October 2026, by probing `enviropac.no/app/uploads/` directly and by
scraping the product pages. Every URL below returned HTTP 200 on the day.

## Three families are live at once

| Family | Path | Sizes found | Pages |
|---|---|---|---|
| SULO MGB, 2020 | `/app/uploads/2020/04/Sulo-MGB<n>-NO.pdf` | 60, 120, 140, 240, 360 | 2 |
| SULO Citybac, 2022 | `/app/uploads/2022/08/SULO-Datasheet-Citybac-<n>-L-LA-NO.pdf` | 80, 120, 140 | 8 |
| SULO Citybac, 2025 | `/app/uploads/2025/02/SULO-Datasheet-Citybac-<n>-L-{LA-,}NO.pdf` | 180, 240, 360, 660, 770, 1000 | 8 |

The 360 L file drops the `LA-` segment: `SULO-Datasheet-Citybac-360-L-NO.pdf`.

**The 2020 MGB sheets are still served.** That is the first finding on the
review: two live documents for the same product, five years apart, and the
older one is the weaker of the two.

## Against the Valdres framework

The notice buys 80, 140, 240 and 370-or-360 on two wheels and 660 and 1000 on
four. **All six have a current Citybac datasheet**, so the earlier working
assumption — that only one size was documented — was wrong, and the review was
rebuilt on the current 240 L sheet rather than the 2020 MGB one.

## What the 2025 sheets say, and what they stopped saying

Checked across all six 2025 files and both 2022 ones:

- `inntil 100 % PCR resirkulert plast`, with an average split of 70 % locally
  collected packaging and 30 % end-of-life containers and pallets. An
  "up to" and an average, where krav 57 asks a committed minimum by weight,
  separately per part, third-party certified
- `EN 840 Norm` appears **only** as the label on the maximum filling weight
  row of the dimension table. Never a part, never a certificate
- Wheels ø200 / ø250 / ø300 on two-wheel, ø160 / ø200 swivel on four-wheel,
  two of the four braked. This resolves the `200/250*` contradiction that the
  2020 sheet carried
- Standard colour is antrasitt RAL 7021; the tender asks RAL 7016
- **`EN 1501-5` and `RAL-GZ 951/1` appear in the 2020 sheet and in none of the
  six current ones.** Both are A-krav (5 and 6). This is the sharpest single
  observation available and it is a regression, not an omission
- No REACH or SVHC anywhere. No temperature range. No `gjennomfarget`, no UV

## Re-scored count, current 240 L sheet, 34 product requirements

- **Answered, 9** — krav 1, 2, 7, 11, 13, 14, 15, 17, 18
- **Partial, 7** — krav 3, 4, 22, 27, 41, 46, 57
- **Absent, 18** — krav 5, 6, 8, 9, 10, 12, 16, 19–21, 23–26, 28, 47, 58, 60

The 26 requirements left out are the ones no product datasheet answers:
delivery plan, unloading, option pricing, labelling approval, complaints.

## How to redo this

`pdftoppm -r 200` the source, cut the crops with Pillow, and keep the script.
The probe that found the files is a loop over the size list against the three
upload folders; the product pages are the slower but surer route, since each
one links its own current sheet.
