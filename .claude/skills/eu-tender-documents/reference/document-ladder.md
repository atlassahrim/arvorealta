# The ladder in detail — contents and failure modes

Same order as `SKILL.md`. For each document: what it typically contains, and how
it typically fails. Failure modes marked `[EVIDENCED]` are drawn from a named
complaint or survey in `_research/voice.md`; the rest are `[GENERAL]` domain
knowledge and should be treated as weaker.

---

## Tier 0 — Gate

**1. ESPD / hankepass.** Structured electronic self-declaration: identity,
exclusion grounds (criminal convictions, tax and social security, insolvency and
professional misconduct, national grounds), selection criteria, reliance on other
entities, consortium members.
*Fails when:* an entity relied upon is declared in the bid but its commitment
lapses before award `[EVIDENCED]` — KOFA 2025/1900, where the supporting company
had been struck off the register on 25 October 2025.

**2. Tender and price form.** The buyer's locked template.
*Fails when:* the bidder attaches its own format or adds terms. `[EVIDENCED]` A
Finnish law-firm summary in `_research/voice.md` names "own attachments added
with information differing from the competition conditions" as a routine
exclusion cause.

**3. Signature, authority, registration.** Power of attorney, registration
extract, beneficial ownership where demanded.
*Fails when:* the signatory cannot demonstrably bind the company. `[GENERAL]`

**4. Exclusion-grounds evidence.** Tax, social security, criminal record,
insolvency. See `country-layers.md` — Denmark consolidates it into one
serviceattest, Finland runs it through tilaajavastuulaki with a three-month
freshness rule, Estonia pulls much of it from state registers.
*Fails when:* the evidence is stale. Finland's three-month rule is the tightest.
`[GENERAL]`

**5. Technical compliance statement.** Clause-by-clause response to the
specification. For CE-marked products the Declaration of Performance or
Declaration of Conformity sits here.
*Fails when:* a *skall/skal/må/pitää* requirement is answered with a near-miss or
a future commitment. `[GENERAL]`

---

## Tier 1 — Qualification

**7. References.** Three or so comparable deliveries, with client name, contact
person, scope, value, date.
*Fails when:*
- the reference is real but the buyer judges it not similar enough `[EVIDENCED]`
  — KOFA 2023/1152, where experience belonging to an individual employee from a
  previous employer was contested;
- the requirement is drawn so tightly only the incumbent clears it `[EVIDENCED]`
  — PlugIt Finland Oy, MAO:320/2026: *"Suomessa ei ole kuin yksi yhtiö, joka on
  Helsingin kaupungin omistama, joka voi täyttää hankintayksikön edellyttämät
  vaatimukset"*;
- prior public-sector delivery is required at all, which suppliers name as an
  irrelevant barrier `[EVIDENCED]` — Almega free-text, and curbed in the EU
  reform draft.

**This is the highest-value document in the set and the least well made.** It is
where the most complaints cluster across all four archives.

**8–9. Financial standing and insurance.** Accounts, turnover, ratios, certificates.
*Fails when:* a young or restructured entity cannot show the required years. `[GENERAL]`

**10. Capacity and organisation.** Staffing plan, named roles, delivery capacity.
*Fails when:* stated in general terms. `[EVIDENCED]` KOFA 2025/1900 — a promise to
use "as many as needed" was argued to be "en generell og uforpliktende
formulering" giving the buyer no basis to assess capacity.

**12–14. Management systems.** ISO 9001, 14001, 45001, or documented equivalents.
*Fails when:* "or equivalent" is asserted rather than demonstrated. `[EVIDENCED]`
KOFA 2025/1900 again — a digital QA administration tool argued to be not
equivalent to ISO 9001:2015.
*Counter-signal worth holding:* a Swedish small business called complicated
quality management systems *"orimliga krav"* `[EVIDENCED]`. The same document is
a qualification asset to the buyer and an unreasonable burden to the supplier.

---

## Tier 2 — Award

**15. Quality response / method statement.** The scored narrative: approach,
delivery method, risk handling, organisation.
*Fails when:* the buyer cannot locate the answer to the criterion it is scoring.
`[EVIDENCED]` Mesta AS, KOFA 2023/472, argued the buyer made "en konkret
vurdering av hvordan den enkelte leverandør scorer på dokumentasjonskravene"
rather than assessing the award criterion itself — and separately that it was
marked down for "forhold som ikke eksplisitt er etterspurt i
dokumentasjonskravene", matters never asked for.

**This is the document Arvorealta's standard exists for.** It is the only item in
the whole ladder where design and structure change a score rather than satisfy a
checkbox.

**16. Environmental documentation.** EPD to EN 15804, carbon footprint, recycled
content, GWP. **The CPR does not yet make GWP mandatory for anyone** — the
obligation phases in per product family under Article 95(9), one year after an
implementing act makes the relevant harmonised standard mandatory, and no family
has started that clock. See the correction note in `SKILL.md`. Today the EPD is
demanded by *buyers as an award criterion*, not by product law.
*Fails when:* no product-specific EPD exists, so the buyer substitutes
conservative default data — the **default-data penalty**, recorded in
`_research/notes.md` as one of only three explained mechanisms in this market.

**17. Delivery and implementation plan.**
*Fails when:* a schedule detail the supplier treated as administrative turns out
to be scored. `[EVIDENCED]` and this is the sharpest single case in the research:
P. Olesen og Sønner A/S lost a Danish contract on **five days' difference in when
QA documentation would be handed over**, while being cheapest and fastest. Their
words: *"Det savner mening, at så få dage har haft så stor en betydning."* They
had inferred the rule from previous mini-tenders and the buyer had changed its
internal practice without announcing it.

**18. CVs and key personnel.**
*Fails when:* experience requirements are drawn so narrowly that nobody qualifies.
`[EVIDENCED]` EverFull Oy, MAO:373/2026 — requirements that "had in practice meant
that the expert could not have done anything else during the last three years".

**19. Service, maintenance, lifecycle cost.** For equipment often a heavier
scoring block than the product. `[GENERAL]`

**20. Social and labour conditions.** Wage and working conditions, collective
agreements, apprentices, supply-chain due diligence. Norway strictest. `[GENERAL]`

---

## Tier 3 — Conditional

**22. Security and defence.** Facility and personnel clearance, national security
authority approval, NATO codification, export control.
*Relevant note:* `_research/notes.md` records **restricted-procedure gating** as a
named mechanism — where there is no open procedure, documents decide who is
invited and the solution is never evaluated. `[EVIDENCED]` from the supplier side
by Zeppelin Danmark A/S against the Danish defence procurement agency, arguing the
buyer concluded the market was empty and negotiated directly with one supplier
eight months later.

**25. Product passports.** Battery passport 18 February 2027 is the only fixed
date. ESPR categories follow their delegated acts — see the unresolved
contradiction in `SKILL.md` and `refresh.md`.

**26. Prequalification systems.** Achilles communities run EUR 210–940 per
community per year with annual renewal and information updates
(`_research/competitor.md`). Not a tender document, but a gate in utilities and
energy, and a line item the reader already recognises.

---

## What this ladder is missing

`_research/voice.md` is explicit that no industrial manufacturer in this
geography has been heard describing their own submission end to end. This ladder
is assembled from law, portals, complaint rulings and supplier surveys. **It
describes what is demanded. It does not describe what it is like to assemble.**
That gap is the same one the profile's section 6 has, and the five planned
conversations are what close it.
