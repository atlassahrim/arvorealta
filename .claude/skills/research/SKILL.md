---
name: research
description: "Step 00 of the copy pipeline. Gather source material for a reader profile — seller side, buyer side, and dated triggers — and report honestly what could not be found. Use when starting copy for a new market, when asked to research a market before writing, or when an existing profile has empty sections that need a second evidence pass. Writes voice, notes, trigger and competitor files plus five questions for a real buyer. Does NOT write the profile — that is /profile."
---

# Research — step 00

Read `.claude/copy/copywriting-ladder.md` in full before starting. Confirm you
have read it.

**Invocation:** `/research market: X offer: Y geo: Z`
**Optional:** `rerun` — see *Second pass* below.

Write to `_research/<market-slug>/`. One folder per market, so markets never mix.

You are gathering source material. **You are not filling the profile.** That is
`/profile`, and it reads what you produce here.

---

## The blind spot, stated plainly

Almost everything you can reach was written by someone selling.

You can map the market well and the reader poorly. Profile sections 4 and 7 —
sophistication and the alternative set — are built from seller language, and
seller language is exactly what search returns. Sections 5, 6, 8 and 10 — the low
position, the high position, the real objections, the verbatim table — exist in
conversations that were never published.

**The failure mode is not returning too little.** It is returning a
complete-looking, fluent, entirely seller-side picture that does not announce its
own weakness. Copy drafted from that will sound like the competitors, because it
was assembled from their words.

When buyer-side material is thin, say it is thin. Do not compensate with volume
on the seller side.

---

## What you gather

### A. Seller side — expect good coverage

- Who sells to this market. Names, positioning, how they describe the problem.
- What claims repeat across sellers. **Claims seen three or more times are dead
  on arrival for a new entrant.** This is the sophistication reading.
- Whether anyone has explained a **mechanism**, or the market is still trading in
  claims.
- Adjacent categories competing for the same budget.
- Pricing where public; where not, the signals that imply a band.
- What *do nothing* looks like here, and what it costs.

### B. Buyer side — expect thin coverage, mine hard anyway

- Reviews, especially the middling ones. Five-star and one-star are both
  performances. Three-star is where people explain.
- Forums, trade association discussions, industry comment threads.
- Comments under posts by the sellers above. Often the most candid material.
- Conference talks and Q&A by buyers rather than vendors.
- **Complaint, appeal and regulator archives.** The one public place a supplier is
  required to state on the record why they believe they lost. Usually the
  highest-value seam in any regulated market, and usually the last one tried.

### C. Triggers — public signal only

- Regulatory or standards changes, with dates.
- Procurement or budget cycles.
- Market events that make the problem live: consolidation, a public failure, a new
  entrant, a price shock.

---

## Rules

**Search in the market's own language first.** English-language search returns
consultancies and institutional pages. A reader does not write in English about
losing a tender in Vantaa. Fall back to English only where a source is genuinely
cross-border. If queries in the local language return nothing, that is a finding
worth reporting — but it has to be attempted before it can be reported.

**Quote verbatim, in the original language, with a literal translation beside
it.** The moment *vi lägger tusen timmar på anbud* becomes "significant resource
investment in tendering", its only value is gone. Keep the swearing, the
shorthand, the run-on sentences. **Never paraphrase a supplier into business
register. Ever.**

**Many short exact lines beat one long extract.** A sentence, not a paragraph, and
at most one per source. Breadth across thirty sources beats depth in three, and
breadth is what section 10 needs.

**Tag everything.** `[VERIFIED]` with the URL and retrieval date, or `[INFERRED]`
with what it rests on. An untagged claim will be treated as fact by the next step.
Where a source is the wrong population for this market, tag it
`[VERIFIED, non-target]` and say what population it is.

**Never round a number.** Seventeen months stays seventeen months.

**Snapshot, do not point.** Paste the relevant text in with the retrieval date.
Pages change.

**Record contradictions, do not resolve them.** Two sources disagreeing is usually
the finding.

**Images.** You cannot see them. Name the URL worth a screenshot rather than
describing what you cannot see.

---

## Second pass — `rerun`

When invoked with `rerun`, a first pass already exists. Read the existing files
first; repeating searches already recorded is wasted effort. Then:

- Go at the **complaint and appeal archives** and the **national-language trade
  press** before anything else.
- **Hunt the high position specifically.** It is never phrased as an outcome. It
  shows up as relief, or as a complaint about the years before — *we finally
  stopped rebuilding the same annex every time*. Look in case studies written by
  buyers about suppliers, in award announcements where the supplier is quoted, and
  in complaint decisions where a supplier describes what changed after a loss.
- **Do not return more seller-side material.** The market is already mapped.
  Another vendor blog dilutes what does not.

Append to the existing files, keeping their structure. Do not rewrite them.

---

## Output

Four files in `_research/<market-slug>/`, and never more:

- `voice.md` — buyer-side language, plus the written record of searches that
  returned nothing
- `notes.md` — sophistication reading, market structure, contradictions
- `trigger.md` — dated public signal
- `competitor.md` — sellers and adjacent categories

**Each file holds one section per source.** What it is, the URL, the date
retrieved, the extracted text, then your tagged observations kept apart from the
source material. Never blend two sources into one section — the verbatim table in
`/profile` needs to know which line came from where, and that requirement is
satisfied by section-level sourcing, not by file-level sourcing.

## Close with the handoff

Two sections, both required.

**What I could not find.** Name the profile sections still empty and why. Say
which languages you searched in and roughly how many queries per language.
Specific: *"KOFA searched in Norwegian, forty-one decisions reviewed, none
involved a manufacturer contesting quality scoring"* is useful. *"Limited
information available"* is not.

**Five questions to ask a real buyer.** Drawn from the gaps, aimed at sections 5,
6, 8 and 10. Open questions about specific past events, never hypotheticals.
*Tell me about the last time this went wrong* outperforms *what are your biggest
challenges* every time.

This list is the real deliverable when the buyer side comes back thin. Five
conversations beat any amount of searching for the half of the profile you cannot
reach. Where the user cannot reach a buyer, the same five go to the user — they
sell to this market and have heard these answers even if nobody wrote them down.
`/profile` records what comes back as `[CLIENT]`: weaker than a source, stronger
than a guess.
