# Bilag 2 — which requirements a product datasheet can answer

Valdres Kommunale Renovasjon IKS, containers framework, Doffin **663737-2026**.
Sixty numbered requirements, extracted with `_tools/review/krav.py` from
`Bilag_2_Kravspesifikasjon_Beholdere_VKR.xlsx`.

**This split is the same for every supplier bidding this tender.** Re-deriving
it per review is repeated work that can land on a different answer, which is
the one thing that would make two reviews incomparable. Read it here instead.

## The denominator

| | |
|---|---|
| In scope — a product datasheet is the natural home | **34** |
| Out of scope — delivery, labelling approval, options, complaints | 26 |
| Total | 60 |

**In scope:** krav 1–28, 41, 46, 47, 57, 58, 60.

**A is an absolute requirement** and failing one can get a bid rejected; **B**
is desirable and does not; **N/A** asks for information that still feeds the
award criteria. Of the 34 in scope, 24 are A and 10 are B.

## Award weights, from the competition document section 4.1

35 % price · 35 % quality · **30 % climate and environment**, which is where
krav 57 is scored. That makes 57 the highest-value single requirement on the
sheet and the one worth leading a findings page with.

## Out of scope, and why

| Krav | Why no datasheet answers it |
|---|---|
| 29–32 | lead times, delivery plan, delivery security |
| 33–35 | assembly state, packing, surface condition on arrival |
| 36–37 | spare-part and small-order lead times |
| 38–40 | delivery address, working days, unloading |
| 42–45 | lid colour samples, stickers, LOOP sorting marks, approval |
| 48–49 | no other marking, buyer approval before order |
| 50–56 | priced options — gravity lock, lid-in-lid, RFID, hooks |
| 59 | complaints procedure |

**Krav 42 is the borderline call and it is counted out.** It asks for lid
colour matching the body *and colour samples attached*, so the datasheet can
show the colour but not satisfy the requirement; 41 asks only for the colour
and is counted in. **Moving 42 in changes the denominator from 34 to 35 and
every count already published.** DR-001 went out on 34. Do not move it without
deciding that the comparison across suppliers is worth breaking.

## In scope — the 34, with DR-001's result

EnviroPac, SULO Citybac 240 L, file dated 2022. `A` answered · `P` partial ·
`—` absent.

| Krav | Cat | | What it asks for |
|---|---|---|---|
| 1 | A | A | Make and brand |
| 2 | A | A | Product sheet or brochure attached |
| 3 | A | P | NS-EN 840 **del 1-6**, suitability, with documentation |
| 4 | A | P | NS-EN 840 **del 1-6**, material quality, with documentation |
| 5 | A | — | NS-EN 1501-5, emptying by comb lift |
| 6 | B | — | RAL-GZ 951/1 certification on as many sizes as possible |
| 7 | A | A | Dimensions, tare weight, guaranteed load |
| 8 | A | — | Through-coloured UV-stabilised polyethylene |
| 9 | B | — | −40 °C to +40 °C without loss of strength |
| 10 | A | — | Suitability for Nordic climate, snow and cold |
| 11 | A | A | Two-wheel 80, 140, 240 and 370-or-360 L |
| 12 | A | — | 140 L with double bottom, effective volume about 80 L |
| 13 | B | A | 370 L preferred, 360 L accepted |
| 14 | A | A | Four-wheel 660 and 1000 L |
| 15 | A | A | Stability; tare and maximum certified load |
| 16 | B | — | Grip clearance beyond the EN 840 minimum |
| 17 | A | A | Four swivel wheels, at least 2 braked on the long side |
| 18 | A | A | Rubber wheels, min ø250 two-wheel / ø200 four-wheel |
| 19 | B | — | Same wheels and axles across 140, 240 and 360 L |
| 20 | A | — | Axles and wheels identifiable by container volume |
| 21 | B | — | Axles and wheels demountable for reuse |
| 22 | A | P | Lids shed precipitation, none enters on opening |
| 23 | A | — | Tight, hinged lids |
| 24 | B | — | Lids changed easily without damage |
| 25 | B | — | Same lid plugs across all two-wheel containers |
| 26 | A | — | Lid fixing robust against emptying loads |
| 27 | B | P | Noise damping in the lid, rubber spacers |
| 28 | A | — | Spare parts: lids, plugs, wheel sets, axles |
| 41 | A | P | Body colour dark grey **RAL 7016** or equivalent |
| 46 | B | P | Year of production and five-digit number embossed |
| 47 | A | — | Maker's embossing accepted but not dominant |
| 57 | A | P | **Committed minimum PCR by weight, per part, certified** |
| 58 | B | — | Factory guarantee, scope and duration |
| 60 | A | — | No REACH SVHC above 0.1 % w/w; no heavy metals in pigments |

**9 answered · 7 partial · 18 absent, of 34.**

## Using this for the next supplier

1. `krav.py` the spreadsheet again only if the buyer has reissued it. Otherwise
   the 34 stand.
2. Score the supplier's current datasheet against this column, not against
   DR-001's answers.
3. The four findings follow from whichever gaps are worst, and **57 outranks
   everything else by weight**, whatever the narrative order.
