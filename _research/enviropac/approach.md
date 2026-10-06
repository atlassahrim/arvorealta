# The EnviroPac approach — contact, timing and the email

Everything here was checked on 6 October 2026.

## Who to write to

**Erlend Værdal · Salgssjef offentlig marked**
`erlend.vaerdal@enviropac.no` · +47 924 23 497

That title is *sales manager, public sector*. He is the person at EnviroPac
whose job is public tenders, which is this tender. There is no better match
on their staff page and no need to guess.

**Second choice, or a CC:** Adrian Fjell, Regionsansvarlig
Oslo/Akershus/Buskerud/Innlandet, `adrian.fjell@enviropac.no`, +47 970 79 565.
Valdres is in Innlandet, so he owns the geography. Send to Erlend first; he
is the role, Adrian is the region.

**Do not write to `info@`, `kundeservice@` or `post@`.** A general inbox
routes a cold approach to nobody.

**Do not write to the buyer.** Hans Solbrekken Ruud at `post@vkr.no` and
Reidar Seim at `r.seim@d-consult.no` run the procurement, and the competition
document says all communication goes through the consultant and is logged. We
have no business in that channel and appearing in it would be a mistake.

## The timing, and why it is good

From the competition document:

| | |
|---|---|
| Written questions close | **19 October 2026** |
| Bid deadline | **27 October 2026, 12.00** |
| Delivery starts | mid-March 2027 |

Today is 6 October. **Thirteen days to the question deadline, twenty-one to
the bid.** That is the window where a supplier already knows their
documentation matters and still has time to do something about it. A month
earlier it is noise; a week later it is too late to be worth anything.

The question deadline is the part to put in the email. If EnviroPac want the
buyer to confirm what evidence satisfies krav 57, they have until 19 October
to ask, and that is a concrete favour rather than a pitch.

## The award criteria, confirmed

Read from the competition document, section 4.1, not from memory:

- **35 %** weighted tender sum, Bilag 3
- **35 %** quality
- **30 %** climate and environment, which is where krav 57 is scored

The review's own `klima 30 av 100` is correct.

## Which language to send

**Send the English email with the Norwegian PDF attached.** That is the
recommendation and it is not the obvious answer, so here is the reasoning.

The email is pure connective prose. It has no quotations to lean on, and it
is the first thing a stranger reads. Norwegian that is slightly off register
in a cold email reads as machine translation, which in 2026 reads as spam.
English from a sender named Atlas Sahrim reads as a foreign professional
writing in the language foreign professionals write in, which is what is
actually happening. Norwegian B2B reads English without friction.

The **document** is the opposite case. It quotes the tender, so it has to be
Norwegian, and it is — with 83 of its 107 substantive terms taken from the
buyer's own files.

The Norwegian email is below as well, in case it gets checked by a native
speaker first or the preference is to send in Norwegian anyway.

---

## Email, English — recommended

**Subject:** Citybac datasheet against Bilag 2, Valdres, deadline 27 October

> Hei Erlend,
>
> I scored your published Citybac 240 L datasheet against the requirement
> specification for the Valdres container framework. Two A4 pages attached.
>
> Page one is the map. Of the thirty-four requirements a product datasheet is
> the natural home for, nine can be answered from the sheet as it stands.
> Page two is the four an evaluator meets first, each with the requirement
> quoted beside the part of your sheet it refers to.
>
> It costs nothing and I am not asking for anything back. Worth a look before
> 19 October, when written questions to the buyer close.
>
> I build document standards for manufacturers who bid. If it is useful,
> reply and I will tell you what the next step costs. If not, no reply needed.
>
> Atlas Sahrim
> arvorealta.com

**Attach:** `DR-001-NO.pdf` — the Norwegian edition. One file, two pages.
Do not attach both languages; two versions of one document invites a choice
nobody wants to make.

---

## Email, Norwegian — needs a native check before it goes

**Emne:** Citybac-databladet mot Bilag 2, Valdres, frist 27. oktober

> Hei Erlend,
>
> Jeg har vurdert det publiserte databladet for Citybac 240 L mot
> kravspesifikasjonen til rammeavtalen for beholdere hos Valdres Kommunale
> Renovasjon. To A4-sider ligger vedlagt.
>
> Side én er kartet. Av de trettifire kravene et produktdatablad er det
> naturlige stedet for, kan ni besvares med databladet slik det står. Side to
> er de fire en evaluator ser først, hver med kravet sitert ved siden av den
> delen av databladet det gjelder.
>
> Det koster ingenting, og jeg ber ikke om noe tilbake. Verdt et blikk før
> 19. oktober, når fristen for skriftlige spørsmål til oppdragsgiver går ut.
>
> Jeg lager dokumentstandarder for produsenter som leverer tilbud. Er den
> nyttig, svar så sier jeg hva neste steg koster. Er den ikke det, trenger du
> ikke svare.
>
> Atlas Sahrim
> arvorealta.com

---

## What the email deliberately does not do

- **It does not carry the findings.** The first draft put NS-EN 1501-5,
  RAL-GZ 951/1 and the PCR wording in the body, which made the email a
  summary of the document rather than a reason to open it. The owner cut it.
  A summary that good leaves the attachment nothing to deliver, and a reader
  who has already had the answer has no reason to look at the evidence. The
  email now says what the document is, what is on each page and what it
  costs. **The count is the one number that crosses**, because nine of
  thirty-four is a question rather than an answer and it cannot be acted on
  without opening the file
- **It does not say EnviroPac are bidding.** Nothing confirms that they are.
  Every sentence works whether they bid or not
- **It does not predict a score.** The review says the buyer scores and the
  email keeps that line. Telling a supplier how an evaluator will judge them
  on a live procurement is the one claim this project does not make
- **It does not ask for a meeting.** The ask is a reply, and the fallback is
  silence, which is a real option stated out loud
- **It does not attach both languages.** One file, one decision

## What to re-check if this sits for more than a few days

1. **Both PDFs still live.** Verified HTTP 200 today, 6 October — the 2020
   MGB sheet at 1.82 MB and the 2025 Citybac sheet at 543 KB. Finding 01 and
   the email's third sentence both rest on it. One `curl -I` settles it
2. **The question deadline.** After 19 October that paragraph is wrong and
   has to come out
3. **The date in the masthead.** Both sheets read `6 October 2026` /
   `6. oktober 2026`, which anchors the claim about their site. Change it if
   the document is rebuilt
