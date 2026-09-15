# Annual refresh procedure

This skill decays. Procurement law moves, delegated acts land late, and national
certificates get renamed. **Run this once a year.** It takes a session.

**Last full refresh: 2026-09-14** (initial build).
**Next due: 2027-09.**

---

## How to run it

1. **Read the changelog at the bottom first.** It tells you what was uncertain
   last time, which is where the year's real changes usually are.
2. **Work the open questions list.** These are known-unresolved and each one has
   a stated reason.
3. **Re-verify every dated instrument** in `SKILL.md`. A date that has passed is
   not automatically correct — proposals slip and transitions extend.
4. **Search in national languages, not English.** This was the finding that made
   `_research/voice.md` worth having: English-language search returns UK bid
   consultancies and EU institutional pages. Use Swedish, Norwegian, Danish,
   Finnish and Estonian against the national sources below.
5. **Update `SKILL.md`, bump the verification date, and append to the changelog**
   — what changed, what did not, and what you could not settle.
6. **Never round a number and never resolve a contradiction by picking a side.**
   Record both and say they disagree.

---

## Canonical sources, by layer

**EU / EEA baseline**
- TED and the ESPD/eForms developer documentation — the structure of the form itself
- e-Certis — national certificate mapping
- European Parliament Legislative Train — status of the Public Procurement Act
  proposal (the single most important thing to re-check each year)
- Single Market / ESPR and Digital Product Passport pages — delegated act adoption

**Product obligations**
- Construction Products Regulation (EU) 2024/3110 — scope of GWP-in-DoP priority
  categories, which was still expanding at the last check
- Battery Regulation (EU) 2023/1542 — battery passport
- EN 15804 / EPD programme operators (EPD International, EPD Norge, RTS Finland)

**National**
- Sweden — Upphandlingsmyndigheten; Konkurrensverket; LOU chapter 19
- Norway — anskaffelser.no; Lovdata FOR-2016-08-12-974; Doffin; KOFA
- Denmark — Konkurrence- og Forbrugerstyrelsen; Erhvervsstyrelsen (serviceattest);
  udbud.dk; Klagenævnet for Udbud
- Estonia — Rahandusministeerium procurement pages; riigihanked.riik.ee; VAKO
- Finland — hankinnat.fi; HILMA; markkinaoikeus; tilaajavastuu guidance

**Trade press worth one pass each, in national languages**
- Anbud365 (NO) — the best supplier-voice source located
- Upphandling24, Inköpsrådet (SE)
- Udbudsmedia (DK)

---

## Open questions carried forward

Each of these was unresolved at the last refresh. Named specifically so the next
pass does not have to rediscover the problem.

0. **CPR obligation start, per product family.** The live question, and the one
   most likely to change. Track whether the Commission has adopted an
   **implementing act making a harmonised standard mandatory** under CPR
   2024/3110 for any family — that act starts a one-year clock (Article 95(9))
   after which GWP and the other environmental declarations become obligations
   for that family. Watch precast concrete, structural metallic products and
   ancillaries, and cement and hydraulic binders first: standardisation requests
   for those were adopted by 2026-09-15. A standardisation request is not an
   implementing act. **The moment the first one lands, a real dated obligation
   exists for a definable set of manufacturers, and that is commercially
   significant for Arvorealta.**

1. **ESPR timing contradiction.** `_research/trigger.md` dates ESPR full
   application at 19 July 2026 with a central DPP registry live. Sources
   retrieved 2026-09-14 state no delegated act had been adopted as of August
   2026, each carrying at least eighteen months' transition. Framework
   application and product obligation are probably different events — unconfirmed.
   **Resolve this before any ESPR date goes to a client.**
2. **Norway: HMS-egenerklæring and the skatteattest threshold.** Much published
   guidance, including pages ranking highly in search, describes the **repealed**
   2001 and 2006 regulations. The NOK 200,000 threshold and the
   services-only HMS declaration both come from that old text. Verify against
   FOR-2016-08-12-974 itself, not against secondary guidance.
3. **Public Procurement Act progress.** A proposal as of 9 September 2026.
   Track: has it passed Parliament and Council; did the 30/50 per cent quality
   floor survive; what is the application date; and **when and how does it reach
   Norway and Iceland through the EEA agreement**, which is a separate and later
   question.
4. **Whether the 30 per cent quality floor changes supplier behaviour.**
   `_research/notes.md` records a Springer/Stake finding that switching Swedish
   awards from lowest price to most-economically-advantageous did **not** raise
   SME participation or success rates. That is a direct challenge to this
   offer's premise and it is still unresolved. Look for post-2024 Norwegian
   evidence — Norway has had a 30 per cent environmental weighting since January
   2024 and is the natural experiment.
5. **Dansk Industri April 2024 analysis** "Virksomheder savner fokus på kvalitet
   i offentlige udbud" returned HTTP 403 to automated fetch and has never been
   read. Needs a manual visit.
6. **Swedish förvaltningsrätt and Konkurrensverket supervision decisions** were
   never reached in either research pass. The Swedish complaint archive is the
   one major supplier-voice seam still unopened.

---

## Changelog

### 2026-09-14 — initial build

Built from a research pass in Finnish, Swedish, Norwegian and Danish. Established
the four-tier ranking, the national layer for five countries, and four dated
instruments.

Two corrections to `_research/trigger.md` recorded rather than silently applied:

- The September 2026 Public Procurement Act is a **proposed single Regulation
  replacing all three 2014 directives**, not an amendment to them, and it is a
  proposal that has passed neither Parliament nor Council. A Regulation applies
  directly without national transposition, which removes member-state discretion
  — a materially different thing from what "an Act" implies.
- **CPR (EU) 2024/3110 was not in `trigger.md` at all** and it is arguably the
  most concrete of the lot for a manufacturer: since 8 January 2026, GWP must be
  declared in the Declaration of Performance for priority categories. That moves
  the carbon figure from a voluntary EPD into mandatory CE marking. For a
  manufacturer of construction products this is a live obligation today, not a
  2029 one.

Not established: any evidence that buyers write coming standards into award
criteria ahead of the legal date. `trigger.md` flags this as plausible and
unevidenced; this pass did not change that.

### 2026-09-15 — CPR correction at source

The 2026-09-14 entry recorded CPR (EU) 2024/3110 as putting GWP into the
Declaration of Performance for priority categories from 8 January 2026, and
described it as a live obligation for a construction-products manufacturer today.
**That was wrong.** It rested on secondary sources — consultancy and EPD-vendor
explainers — which compressed "the Regulation applies" into "the obligation
starts". Checked against the Regulation:

- **Article 95(9):** obligations on economic operators apply to a product family
  only from **one year after adoption of an implementing act making a harmonised
  standard mandatory**.
- **Article 92:** penalties, including for environmental performance
  declarations, from **8 January 2027** — enforcement machinery, not obligation
  start.
- Three standardisation requests adopted as of 2026-09-15 (precast concrete;
  structural metallic products and ancillaries; cement and hydraulic binders —
  two still under the 2011 Regulation), four more in preparation. None is an
  implementing act. **No family has started its clock.** First working plan runs
  2026–2029.

**Consequence.** The segmentation argument built on this the previous day — that
construction-products manufacturers face a live obligation and are therefore the
urgent segment — does not hold and was withdrawn. `_research/profile.md` was
right: do-nothing is rational for most of this market. Norway's 30 per cent
weighting, in force 1 January 2024, remains the only live dated instrument
reaching a general Nordic manufacturer.

**Method note for future refreshes.** Two of the three errors found so far came
from secondary sources restating a regulation. The Norwegian HMS-egenerklæring
problem is the same shape — well-ranked guidance describing repealed rules.
**Go to the legal text for anything that will be said to a client.** Vendor and
consultancy explainers are a search index, not a source.
