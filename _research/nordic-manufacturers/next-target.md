# The next tender, and why the first one got nothing

Searched 21 October 2026, TED expert search API, same pipeline as
`target-tender.md`.

## First, the result of round one

**Four emails, three companies, fifteen days, zero replies.** Not one
decline, not one out-of-office follow-up, nothing. The question deadline
passed on 19 October and the bid closes on the 27th, so the Valdres approach
is finished.

**Fifteen days and four sends is now a signal.** It was not at three days,
and that was said at the time; it is now.

### Two causes, and the cheap one has never been checked

**1. Deliverability.** A new domain, a cold sender, an attachment, four
corporate Norwegian inboxes. **Zero replies of any kind is the signature of
non-delivery, not of rejection** — four genuine reads would normally produce
at least one polite no. Nothing in this project has ever confirmed a single
one of these mails arrived.

**Check before writing another.** Does `arvorealta.com` publish SPF, DKIM and
DMARC? Send one to a Gmail address and read `Show original`. If those records
are missing, every mail so far went to spam and the copy was never the
variable.

**2. The timing was backwards, and we had it the wrong way round on purpose.**
Every email leaned on *reply before 19 October, when written questions
close*. That is a reason for **us** to write. For the reader it is the
opposite: a supplier thirteen to twenty-one days from a bid deadline is
heads-down on the bid and has no capacity to evaluate a stranger, agree a
price and onboard a vendor. **Proximity to the deadline was sold as urgency
and is more likely to have been the obstacle.**

## The tender, as asked

**`719334-2026` — Waste containers — Sarpsborg kommune, Norway**

| | |
|---|---|
| Buyer | Sarpsborg kommune |
| CPV | **34928480**, 44613600, 44618100, 44618330 |
| Procedure | Open |
| Deadline | **16 November 2026, 11:00** |
| Region | NO083 |
| TED | `ted.europa.eu/en/notice/-/detail/719334-2026` |

**It is the closest possible match to everything already built.** Same
primary CPV family as Valdres, same country, same language, same evaluator
vocabulary. `krav.py`, the annex system, both review editions, the Norwegian
corpus check and the whole toolkit transfer without modification.

### What is not known yet, and cannot be got from here

**The award weights and the kravspesifikasjon are not in TED.** The API
rejects the award-criterion fields for this notice and the TED detail page,
Doffin and the XML endpoint all return empty through this container's proxy.
Doffin is a single-page app that renders nothing without a browser.

**So the documents have to come from Mercell, the way the Valdres ones did.**
What is needed before anything can be built:

1. The **konkurransegrunnlag** — for section 4.1, the award weights, and both
   deadlines.
2. **Bilag/kravspesifikasjon** as `.xlsx` if it exists — `krav.py` reads it.
3. The **question deadline**, which is not in the notice.

Without those there is no denominator and no scope split, and inventing
either is the error that is flagged three times in `CLAUDE.md`.

### The honest problem with this target

**Twenty-six days is better than thirteen and it is the same shape.** By the
time documents arrive, a review is built and a mail goes out, it is roughly
three weeks to the deadline — which is where the last round already failed.
If the timing theory above is right, this tender is in the wrong window too.

It is still worth doing, because it is nearly free: the pipeline exists and
the vocabulary is already attested. But it should not be the only thing.

## The play that fixes the timing problem

**Approach the losers of tenders that have already been decided.**

Thirty award notices in this exact CPV family were published across Norway,
Sweden, Finland and Denmark since June:

| Buyer | Notice |
|---|---|
| Midtre Namdal Avfallsselskap IKS | `418499-2026` framework for waste containers |
| Attvin AS | `488553-2026` waste bins · `422809-2026` containers |
| Melleruds kommun | `482047-2026` behållare för insamling |
| Norrtälje Vatten & Avfall AB | `720175-2026` avfallskärl ramavtal |
| Åre kommun | `719714-2026` avfallskärl |
| Rosk'n Roll Oy Ab | `545701-2026` jäteastiat |
| Södra Smålands Avfall & Miljö | `457660-2026` kärl för förpackningsutsortering |
| Pirkanmaan Jätehuolto Oy | `722417-2026` |

Thirty, not eight; that is the shortlist.

**Why this is structurally better than another open tender.**

- **No deadline.** A company that lost six weeks ago has months before the
  next bid and the capacity to actually buy something. The reader is not
  heads-down.
- **The trigger is real and it already happened.** They lost. Nothing in a
  cold email has to manufacture urgency, which is the thing the current copy
  has been straining to do since the first draft.
- **Norwegian award notices name the winner**, and often the number of
  bidders. The losers are identifiable from the public record, which is
  exactly how the original thirteen-name list was built — except that list
  was of *winners*, which is the wrong half.
- **The document review still works unchanged.** Score their published sheet
  against the kravspesifikasjon of the tender they just lost. That is a
  stronger artefact than scoring against a live one: the result is known, the
  scoring is history, and nothing in it is a claim about a procurement in
  progress — which removes the one category of risk `CLAUDE.md` flags hardest.

**That last point is worth stating plainly.** Every review so far has had to
be careful never to predict a score on a live competition. On a decided
tender that constraint disappears, and the sentence *here is what an
evaluator could not find in your document, in the bid you did not win* is
available and true.

## Recommendation

1. **Check SPF, DKIM and DMARC today.** It is twenty minutes and it may
   explain all four silences. Nothing else should be sent until it is known.
2. **Pull the Sarpsborg documents from Mercell**, because the pipeline is
   free and the target is a direct match.
3. **Build the losers list from the thirty award notices**, and make that the
   main line rather than the side bet. It is the one change that addresses
   why round one produced nothing.
