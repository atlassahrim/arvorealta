# arvorealta.com

Atlas Sahrim's site and document system. Static HTML, no build step, no
framework, no dependencies. Hosted on GitHub Pages; **every push to `main`
deploys in about ten seconds.**

## What this file is

Every rule below is a decision that was made once, with the reasoning and
usually the measurement kept beside it. That is what makes them useful: a
session can see *why* before it changes anything, and the cost of a bad
change is paid once rather than every time.

**None of them outrank the owner.** Atlas can change anything here, including
the prices, the credit mechanic, the two systems, the light-only decision,
the underscore rule and this paragraph. A rule written as **never** means
*never on your own initiative* — it is a standing instruction to the session,
not a limit on the person the site belongs to.

So when a change would cross something written here:

1. **Say which rule, and say the reasoning in a sentence or two.** Not to
   argue, but because the reasoning is usually the part nobody remembers, and
   it is the only thing that lets the owner decide rather than guess. Where
   there is a figure, give the figure.
2. **If the owner says do it anyway, do it in full.** Once is enough; do not
   re-raise it on the next turn or build a hedged half-version. A reaffirmed
   instruction is a decision, not an objection to work around.
3. **Then change this file in the same commit**, so the rule now reads the
   way the site actually works, with the old reasoning kept as history where
   it still explains something. A rule the code no longer follows is worse
   than no rule, because the next session will trust it.

Three things stay worth a second sentence even after approval, because the
damage is not undoable by editing a file: **publishing something that was
behind the underscore**, since a public path stays public and a client's
unredacted material cannot be recalled; **a redaction that covers rather than
removes**, since the text is still in the PDF; and **a factual claim about a
live procurement**, since the page is read by the people running it. Flag
those, then proceed on a clear answer like anything else.

**A sandbox is exempt from all of it.** `lab/` is deleted because it won and
its whole contents are the offer page now, but the exemption is the standing
rule rather than a fact about that folder: a sandbox exists to try what the
rules forbid, nothing in it needs permission, and nothing in it is evidence
that the live page should change — that is still a decision, made here, in
front of the figures. Promoting one is that decision, and the owner makes it.

## Live

| URL | File |
|---|---|
| arvorealta.com | `index.html` — the offer page |
| arvorealta.com/video/ | `video/index.html` — video portfolio |
| arvorealta.com/deck/`<slug>`/ | decks — 1920 × 1080, for presenting |
| arvorealta.com/annex/`<slug>`/ | annexes — A4, for submitting |

**`index.html` and `video/index.html` are live and in use.** Do not restructure
them without being asked. Copy changes are fine; layout surgery is not.

## Not published

`templates/`, `.claude/`, and **every `_`-prefixed file or folder at any
depth** are working files. They live in the repo, sessions edit them normally,
and `deck-pdf.yml` prints them from the working tree — but `pages.yml` deletes
them from the checkout before the artifact is built, so they never reach the
internet. Pages on a public repo has no access control; `noindex` only asks
search engines nicely. Not deploying is the only real lock.

The rule is the leading underscore, and depth does not matter. `deck/_template`
stays private, `_research/` stays private, and a new `_scratch/` at the repo
root would stay private too. `deck/acme` publishes. Preview a private one with
`python3 -m http.server` from the repo root, or take the PDF from the Actions
run.

**The step sweeps with `find`, not a list of paths.** It used to name
`deck/_*` and `annex/_*` one at a time, which meant the rule held only where
someone had remembered to write it down, and an underscore folder anywhere
else published in full. `.git` and `.github` are pruned from the sweep, and
the step prints any underscore path still standing afterwards so a miss fails
loudly instead of quietly shipping. **If you add a private area, give it a
leading underscore and nothing else is needed.**

## Published but unlisted

The underscore is the lock and `noindex` is the label, and they answer two
different questions. A page behind the underscore cannot be reached at all. A
page carrying `noindex` can be reached by anyone with the link and is asking
search engines to leave it out of the index, which they generally honour and
are not obliged to.

**Use the underscore for anything whose content would be a problem in the
open**, which is research, client material, unredacted annexes and working
drafts. **Use `noindex` for a page that has to be opened on a real device at a
real URL and should not compete with the site**, which today is `reference/`
alone. It is a near-copy of the offer page, so without `noindex` it would be
a second `index.html` bidding against the first for the same terms. It is not
linked from anywhere. A rebuilt sandbox takes the same label for the same
reason.

`reference/` is the first offer page, kept for the owner.

**`lab/` is deleted, and it is deleted because it won.** Everything it was
testing — the skip link, the page's own focus ring, `cursor: pointer` on
buttons, the 24px targets, EB Garamond, the measured bar, the restored
ladder and the intake form — is the offer page now. A sandbox that has been
promoted is not a sandbox any more, it is a second copy of the live page
that will drift, and the one before this was deleted for exactly that. **A
sandbox is deleted when it falls behind or when it wins, and rebuilt from
the live page when there is something new to try.**

When it is rebuilt, two rules come with it. It carries `noindex, nofollow`,
or it is a second `index.html` bidding against the first for the same terms.
And **it needs its own compiled stylesheet, built by its own script**:
`_build-css.sh` runs `rm -f assets/tw-*.css` before it writes, so a lab
stylesheet kept beside the live one would be deleted by the next build of
the offer page and the sandbox would silently lose every rule it is testing.
`lab/_build.sh` is in git history at `dffcb11` and is the thing to copy.

`mal/` was a Norwegian-only landing page for one tender in the retired
editorial identity; its two files moved to `assets/vedlegg-5/` and the offer
page links to them directly, so the page had become a click on the way to
files the reader already had in front of them. It is deleted and stays so.

**Anything moving out from behind the underscore takes `noindex` in the same
change**, and the move is a decision to make deliberately rather than a
convenience, because once a path is public a link to it is public forever. A
sandbox that has done its job is deleted, not left up.

## The pricing ladder

Three tiers on `index.html` and a free step that is not one.
**Free** one page scored · **€600** one document · **€2,400** the full
document standard · **€8,000** identity system.

**The free step is the mouth of the funnel and it is not a rung.** It is not
bought, nothing credits into it, and it carries the page's only action —
which is why it lives in the hero, the nav and the close, with one line and
the same action under the ladder row rather than inside it. The ladder fold
itself shows the three things that have a price. It stood as four rungs for
a while, with Free as the first; the owner asked for the earlier three-tier
fold back and that is the shape now.

The credit only works walking up — you cannot buy the €2,400 first — and the
page keeps one CTA label for one intent.

Every tier credits in full into the one above. €600 comes off the €2,400,
€2,400 comes off the €8,000, and €600 credits into €8,000 directly if the
middle rung is skipped. Credits never expire.

**The ladder fold's headline is `Then make it a system.`** It is the bridge
from the open tender above it to the top rung, and it states the ladder's own
mechanic rather than a claim: one document, then the document standard, then
the identity system, which are the tiers' own names. The credit line sits
under it as the lede.

**That lede no longer carries the €8,000-against-€11,000 figure**, which it
did until the owner replaced it. The mechanic survives in each card's credit
line, and the reasoning below is unchanged, but the single sentence that made
the whole ladder legible at a glance is off the page. If the credit ever
stops landing with readers, that figure is the first thing to put back.

**€8,000 is chosen, not rounded.** High enough that €2,400 reads as reasonable
rather than suspiciously cheap, close enough that the step does not look like
it is missing a rung, and under the €10,000 mark where most of these companies
need a second approval signature. The credit is what holds that: a client who
walks the whole ladder spends €8,000 in total, not €11,000, and so never
crosses the threshold. Break the credit and the price logic goes with it.

Do not simplify the mechanic and do not round the numbers. If a price looks
wrong, say so and give the reasoning. Changing one is not a copy edit.

€2,400 includes one revision round. Past that it is a new agreement at a new
budget, never an extension. What €8,000 excludes is settled in the scope
document agreed before the work starts, not listed on the page.

## Files

```
index.html              offer page
video/index.html        video portfolio
reference/index.html    the first offer page, kept for reference — noindex
_tw.src.css             the offer page's Tailwind source, compiled by
                        _build-css.sh into assets/tw-<hash>.css
templates/index.html    index of every template
deck/<slug>/index.html  one deck per folder
annex/<slug>/index.html one A4 annex per folder
assets/
  img/                  photography, as webp + jpg at the widths the source
                        actually holds — the name carries a version:
                        after-1-<width>.<ext>
  vedlegg-5/            the open tender's example PDF and fillable Word file
  fonts/                Geist, Geist Mono and EB Garamond, self-hosted woff2
  vendor/runtime.js     React, react-dom, Motion and htm, bundled once
  tw-<hash>.css         the offer page's compiled Tailwind, built by _build-css.sh
  themes/arvorealta.css tokens for the editorial system
  themes/technical.css  tokens for the technical system
  system.css            structure only — no colour, no typefaces
  deck.css              editorial deck — slide geometry + print
  deck-technical.css    technical deck — slide geometry + print
  annex.css             A4 document geometry + print rules
  site.js               live clocks, scroll reveal
CNAME                   custom domain
```

Pages load a **theme first, then `system.css`.** Order matters: the theme
defines the custom properties the system reads.

## Two systems, kept apart

There are two visual identities and they are meant to stay separate.

| | Editorial | Technical |
|---|---|---|
| Theme | `themes/arvorealta.css` | `themes/technical.css` |
| Type | Cinzel · Playfair · Shippori Mincho | IBM Plex Sans · IBM Plex Mono |
| Ground | warm greige, ink green, taupe | white, near-black |
| Job | presenting concepts | products, manufacturing clients, tenders |
| Deck | `deck.css` → `deck/_template/` | `deck-technical.css` → `deck/_technical/` |
| Document | — | `annex.css` → `annex/_template/` |

They share exactly one value — the accent red `#C7392F`. That is what keeps
them the same firm's work while letting each do a job the other cannot.

**The two deck stylesheets duplicate the canvas maths on purpose.** Sharing a
base would mean every editorial tweak risked the technical deck and the
reverse. The geometry is identical so a slide can be moved between them;
nothing else is. Their root classes differ — `.deck` and `.deck-t` — so the
two can never be loaded onto one page by accident.

Rules below marked **editorial** apply to `deck.css` only. The technical
system's rules live in the annex spec and in `deck-technical.css`.

## The editorial system

Three typefaces, loaded from Google Fonts in each page `<head>`:
**Cinzel** for labels, **Playfair Display** for display type and numerals,
**Shippori Mincho** for body.

Palette: ink `#17352C`, ground `#D9D7D4`, secondary `#5A6B63`, accent red
`#C7392F` — the red is used **once per page at most**, to mark the point of
failure. Never decoration.

The red cannot carry small text on paper. It measures 3.61:1 there, under the
4.5:1 a reader needs, so on a light ground it is available as a graphic mark
and not as a word. The offer page currently spends it nowhere, which the rule
allows; eight red dashes in the comparison did not.

**The red belongs to the light grounds, and they are the whole list.** Measured
against every ground in this theme: paper 3.61, paper-2 4.01, paper-3 4.47,
taupe 2.40, ink 2.56. The three papers clear the 3:1 a graphic mark needs and
not one of them clears the 4.5:1 a word needs, which is the rule above stated
across all three rather than only on paper. **Taupe and ink clear neither**, so
the red does not appear on them at all, as a mark or as anything else.

This file said for a while that the red mark lives on paper or ink. The taupe
figure was measured and the ink one was not, and the ink half was wrong. A
statement slide reverses out to full-bleed ink, so there is no point of failure
to mark there in red. Use `--paper-3` or a light value at low opacity instead.

Muted brick `#8E4A45` is the **mark**. The red says something failed; the mark
says here is the thing. Its contrast writes its own rules, and all three are
hard:

- **Never on ink.** 2.03:1, far below the 3:1 a graphic mark needs. The mark
  belongs to the light grounds — 4.55:1 on paper, 5.05 on paper-2, 5.63 on
  the paper-3 cards
- **As a fill it carries only `--on-mark`**, the warm beige `#F7F3EC`, at
  5.90:1. Paper-3 on the mark is 4.55, which passes but sits far closer to
  the floor, so the beige is not interchangeable with the other light values
- **It is `#8E4A45` and not `#A85751` for one reason.** The lighter brick was
  the first choice and it measures 3.53:1 on paper, under what small text
  needs. Darkening the value four steps clears 4.5 while reading as the same
  colour at eyebrow size. Do not lighten it back
- **Never in the same block as the accent red.** They sit 1.26 apart in
  luminance and share a hue family. Read together they look like a printing
  inconsistency rather than two decisions

One use on the offer page: the eyebrows on the light grounds — `.eyebrow`,
`.tag`, `.step` and the label on `.heroqual`. The recommended tier used to
take the mark as its ground and now takes the price gradient instead.

**`.heroqual` is a label over the line it names**, which is the annex field
move brought across: a small mark eyebrow that is found, and under it a
sentence in ink that is read. It carries the hero's audience gate, which was
set in the notes' size and grey while doing a different job. Caps and a
contour were the obvious fix and the wrong one — the line runs to 58
characters, past where tracked capitals stop reading, and a single box
repeats the `.vocab` strip's own language a fold above the strip.

**`--ink-soft` measures 3.93:1 on paper, under the 4.5:1 small text needs.**
It carries the standfirst, every hero note, the figure captions and the
second line of the document caption, so this is the one contrast on the page
that does not clear. Darkening the token to about `#4C5B54` fixes all of them
at once and changes nothing structural. It has not been done because it
shifts the whole page's temperature, which is a decision rather than a fix.

On the ink ground the same value measures 2.35:1 and is unusable. Anything
crossing into `.inv` takes `rgba(233,231,228,.75)` at 6.73:1, and an eyebrow
there takes `.6` at 4.91:1. **The mark never crosses** — 2.03:1.

The **price gradient** is sampled off the Turvatikas ground: amber `#954D13`
running through `#743813` to chocolate `#5A200A`, at 45deg so the light end
sits at the low corner as it does in the original. Three uses. It fills the
prices on the two light tiers, it grounds the recommended tier, and it fills
the nav action, which the mark used to fill. The hero and the close carried
gradient buttons for a day and now carry text links again, so the nav is the
only action wearing it. It cannot
do both on the same card — a gradient numeral on a gradient ground is the same
colour at the same point — so that tier's price stays `--on-mark`, which
measures 5.67:1 against the amber stop at its worst and 11.54 at the
chocolate end. As price fill on the light grounds the stops run 4.37 to 11.01,
and prices are display size, where the floor is 3:1. That rule is guarded by
`@supports`, so a browser without `background-clip:text` shows ink rather than
an invisible price.

Third ground: warm taupe `#BEAE9E`, carrying **ink** type at 6.16:1. A third
ground cannot be a mid-tone — every clay and umber between paper and ink
fails both text colours at once (4.4:1 and below). Two rules follow from the
contrast, and both are hard:

- **Never the accent red on taupe** — 2.40:1. The red mark lives on the light
  grounds, and neither taupe nor ink is one of them. See the measured set above.
- **Never taupe as a panel beside paper** — 1.50:1 apart, so they read as a
  printing error rather than a choice. Taupe is a whole-slide ground.

Its job is evidence — image and case slides — so a deck reads
**paper** (argument) → **taupe** (evidence) → **ink** (statement).

**A photograph is a fourth ground, and it is the only one that has to be
measured per image.** The other three are single values with fixed contrast
figures written above. A photograph is thousands of values, and the figure
that governs is not its average but its worst pixel under the type.

Measure before you design on one, and measure **the strip each object sits
in**, not the frame. A frame average hides the only thing that matters, which
is what is directly behind a glyph.

**The current photograph is dark and the band carries its own ink ground**, so
the type is bone and the wash token `--hero-photo` runs at 1. There is no wash
and no vignette. Measured on `after-1`, bone over the picture across the left
half of the frame, which is the column the hero's objects occupy:

| | median | brightest 2% |
|---|---|---|
| whole type column | 8.76:1 | 1.44:1 |
| under the eyebrow | **3.28:1** | 1.45:1 |
| under the headline | 7.25:1 | 1.95:1 |
| under the standfirst | 9.49:1 | 3.75:1 |

**Only one object fails, and it is the eyebrow.** The picture is a dark room
with bokeh highlights, and the eyebrow is the one line sitting in the band
where those highlights run. Everything below it is comfortably clear: the
headline needs 3:1 at display size and has 7.25, the standfirst needs 4.5 and
has 9.49. The 1.44:1 figures are the highlights themselves, which are small,
scattered and mostly not under type.

**So the fix for a dark photograph is vertical, not a wash.** Move the object
out of the bright band, or drop it. Washing the whole picture to rescue one
11px line costs the picture and fixes nothing the other three objects needed.

That is the opposite of what the previous photograph required, and it is why
the ladder of wash values that used to live here is gone with it. `gateway-3`
was light, held near-white and near-black inside any box that could be drawn
on it, and nothing cleared anywhere at any setting. A picture like that has to
be lifted over a light ground; a picture like this one has to be left alone and
designed around.

**The stylesheet's name is its own content hash, and `_build-css.sh` is the
only thing that should write it.** A changed value served stale costs ten
minutes. A changed **class name** served stale costs the page: the new HTML
asks for a rule the cached stylesheet has never heard of, so the rule does
not exist at all and the element renders with nothing. That is how a hero
with a corrected `min-height` arrived on the owner's screen with no
`min-height` whatever, looking worse than the bug it fixed. Twice in one
session a fix was reported as still broken when the fix was live and the
stylesheet beside it was not.

Run `sh _build-css.sh` after any change to `index.html` or `_tw.src.css`. It
compiles, hashes the output, names the file after the hash, repoints the page
and deletes the previous one. Never hand-edit the compiled CSS and never
rename it by hand.

**Every file the page links to carries a version in its name, not only the
photographs.** GitHub Pages serves `max-age=600` with an ETag, so a file whose
name has not changed is held for ten minutes and, on a phone that has the page
open, often longer. That is long enough for the owner to look, see the old
thing, and reasonably conclude the deploy failed. It has now cost three round
trips: once on the hero image, once on the stylesheet carrying the wash. The
stylesheet is `assets/tw-<hash>.css` for exactly that reason. `index.html` itself
cannot be versioned, since it is the entry point, and its ten minutes are the
one wait that has to be lived with.

**A new photograph gets a new filename.** Overwriting `foo-1920.webp` with
different bytes leaves every browser that has seen the page serving the old
picture from cache, and the deploy log will tell you it succeeded while the
owner, on their own phone, sees the old one and reasonably concludes the work
did not land. That happened once and cost a round trip. The version sits in
the name — `after-1-<width>.<ext>` — so the URL changes when the content does
and no cache can hold the wrong file. Delete the old set in the same commit.

**Re-measure when the image changes, and delete the old table with the old
file.** A different photograph is a different set of figures, and a table left
behind describes a picture nobody can see. `gateway-3` was the third hero
photograph and the one the wash ladder was built on; it was light, it failed
every contrast at every setting, and the whole apparatus of washes and
vignettes existed to make it usable. It is deleted and so is its table.

**With no wash, the picture decides where type can go, not the layout, and
which lever you have depends on which way the ratios fall.** The band is the
whole viewport now, so at 1440 × 900 the container is 1.600:1 and `after-1` is
1.783:1. The picture is the wider of the two, so `object-fit: cover` scales it
by height and crops horizontally: the **vertical** half of `object-position`
does nothing at all and the horizontal half is the only lever. That is the
reverse of what this file said while the band was 1440 × 736, and the reverse
is worth checking before reaching for the property.

**Measured, the lever does not save the eyebrow.** Swept across the full
range, bone over the ground under each object:

| `object-position` X | eyebrow | headline | standfirst |
|---|---|---|---|
| 0% | 3.16 | 8.74 | 9.56 |
| 45% | 3.34 | 7.30 | 9.16 |
| 62% | 3.49 | 7.25 | 9.49 |
| 100% | 3.16 | 7.85 | 10.00 |

The headline and the standfirst clear comfortably everywhere. **The eyebrow
clears nowhere**, because it sits in the band where the picture's highlights
run and that band moves with the crop. 3.49:1 passes the 3:1 a graphic mark
needs and fails the 4.5:1 a word needs. It takes full bone rather than
`bone/75` for the quarter-stop that buys, and beyond that there are two
honest fixes and no third: drop the line, or move it out of the band. The
audience gate it carries is already stated in the strip one fold down, which
is where this file says that kind of line belongs.

Three rules follow, and they are the same shape as the taupe rules above:

- **Only ink crosses onto a washed photograph.** At 0.35 `--ink-soft`
  measures 2.58:1 there and the mark 2.35:1, and both fall further as the
  picture strengthens. Ink is the only value that holds at any setting of the
  token, so the standfirst and every eyebrow take full ink over the image
- **The band runs full bleed and fades out, it is never a panel.** A
  photograph inset beside paper is the taupe mistake with more detail in it.
  A radial vignette carries bone at the edges out to the page's own ground at
  the last stop, so the band has no seam and the frame ends where the light
  runs out rather than where the markup does
- **The picture spends the page's accent.** The hero image already carries one
  brick line. Under the once-per-page rule the CSS does not spend it again
  above the fold

**Measure the image, not the layout.** The figures above belong to this
photograph. A different one is a different set, and the only honest way to
get them is to sample the file.

Web type scale lives in `system.css` and is fluid (`clamp`). Body line-height
is 1.75; display is 1.04. That contrast is the system's signature — keep it.

### Deck spec (1920 × 1080)

- Margins are set so the **headline** and the footer sit the same distance
  from their edges — 155 px of ink to ink. Balance to the section label
  instead and you are weighing a tick mark against a line of type, which is
  what made the top look heavy. Content area starts at 100, the label rides
  above the headline as a kicker, the headline itself starts at 140, and the
  footer holds 140 clear of the bottom edge
- Grid 12 columns × 100 px, 40 px gutters (12×100 + 11×40 = 1640)
- Baseline 40 px — 20 per slide. **Display is exempt** and always was: 96/100
  is not a multiple of 40. Label and body snap; display keeps the 1.04
  leading, which is the part that reads as ours
- Display **Playfair Display 96/100**, tracking −0.012em
- Body **Shippori Mincho 24/40**
- Label **Cinzel ALL CAPS 17/40**, tracking +0.16em
- Running footer, baseline 100 px from the bottom: project and page as one
  cluster left (`Deck Template · 3 of 7`), site right. There is no header —
  identification sits at the foot so a page pulled out of the deck still says
  what it is. Contact details are not running chrome; they close the deck
- Section labels read `01 · THE PROBLEM` with a hairline rule to the right margin
- Statement slides reverse out: full-bleed ink, display type only, no chrome
- Interior slides hang from the top left: section label, then the headline at
  full display size. The air collects at the foot
- Rules 1 px, ink at 18% opacity

### Technical deck spec (1920 × 1080)

`deck-technical.css` with `themes/technical.css`. Same canvas, margins, grid
and baseline as the editorial deck, so a slide can move between them. What
differs:

- **Four type roles, not three.** Display 96/100 weight 600 · **Value 56/80**
  · Body 24/40 · Label mono 17/40. A technical sheet states figures as
  fields, and a figure set at body size is not a figure. That extra level is
  the reason this system exists
- Labels are **IBM Plex Mono**, tracking +0.06em. Mono is already wide, so it
  needs far less tracking than a serif small cap to read as a label
- **Two rule weights only:** 3 px in ink closes a slide, 1 px at 20% divides
  columns and field rows
- The accent carries the reference number, section labels and the statement
  bar — it is wayfinding here, not a single mark
- Grounds are white and near-black. There is no third ground; the taupe
  belongs to the editorial system

### Annex spec (A4)

A deck is for presenting; an annex is for submitting, and the two obey
different masters. The deck scales a 1920 × 1080 canvas with a `--px` unit.
`annex.css` does not scale at all — it is set in the units print is measured
in, millimetres for the page and points for the type.

**Annexes use a second theme.** `themes/technical.css`: white stock,
near-black ink, **IBM Plex Sans** for anything read as a sentence and
**IBM Plex Mono** for every label and figure. The deck theme persuades; this
one is built to be scored by an engineer, and IBM Plex was drawn for
technical documentation. The two themes share exactly one value — the accent
red `#C7392F` — which is what keeps them the same firm's work.

Two differences from the deck's rules, both deliberate:

- **The accent is a system colour here, not a single mark.** It carries the
  reference number, the section labels and the statement bar. On a deck the
  red appears once; on a technical sheet it is the wayfinding.
- **Two rule weights, and only two.** 0.6 mm in ink closes the page — above
  the masthead, below the last block. 0.25 mm at 20% separates rows inside a
  block. Nothing else draws a line.

Facts are stated as **fields, not sentences**: a mono label with the value
under it, so an evaluator scanning for a sum or a date finds it without
reading. Narrative prose stays sentence case — the reference sets its
overview in full capitals, and past about forty characters that stops being
readable, so it is the one thing from the reference not copied.

- Page 210 × 297 mm. Margins 20 mm sides, 24 mm head, 27 mm foot. The
  strictest published tender rule found is 15 mm, so every edge clears it
- Content 170 × 246 mm — 41 baselines of 6 mm
- Grid 12 columns × 10.5 mm, 4 mm gutters (12×10.5 + 11×4 = 170)
- **Nothing a reader reads sits under 9 pt, and the floor is a compliance
  decision, not a taste one.** Published tender rules put the floor for
  proposal body text at 9–11 pt depending on the procedure. 11 pt clears all
  of them; 10 pt clears most. The template runs body at 10 pt and the sheet 2
  standfirst at 9 pt, which buys the page budget back. **Check the procedure
  before submitting an annex built from this template**, and take body back to
  11 pt if it names a higher floor. Field values and table figures carry the
  weight instead — they are what an evaluator scans, and they sit at 15 and
  11 pt. Labels are not read, they are found, and at 8 pt they are furniture
  rather than submitted text
- **There is one label size on the sheet and no exceptions to it.** Every set
  of capitals that names something — section eyebrow, field label, table row
  label, signature line, running foot — is 8 pt mono. Capitals at more than
  one size read as a mistake before they read as a hierarchy. The statement
  block is the only capitals on the page that are not a label; it is display
  type carrying a sentence, and it keeps its own size
- Scale 30 / 22 / 15 / 11 / 10 / 9 / 8: reference number, title, heading,
  statement and field value, table figure, body, standfirst, every label.
  Sheet 1's title spent a while at 18 pt, because two long lines were sitting
  level with the reference number and competing with it. Tighter leading and
  two baselines of air under the masthead fixed that at the cause, so the
  title is back at 22
- **The proportions are the design, not the sizes.** A label sits well under
  the body because a label is found rather than read; a field value sits well
  over it because the whole point of setting a fact as a field is that the
  figure is bigger than its name. Both sat at 11 pt for a while, which is
  exactly why neither worked
- **Space is measured in baselines.** 6 mm sets a block off from the one
  above, 12 mm opens a new section, and a block with neither belongs to the
  thing above it. A label is one object with what it labels, so nothing at
  all sits between them. Arbitrary 4 mm gaps are what drift a page off the
  grid, and there are none left. **An annex loads `system.css` before
  `annex.css`, so a loose rule in the shared sheet lands on these pages.**
  One did: `.field{margin-bottom:clamp(1.75rem,3.5vw,2.5rem)}`, left behind
  by a web form no page has any more, put 10.58 mm under every field block
  on every sheet — a viewport-relative value inside a document measured in
  millimetres, 4.58 mm off the baseline. It is gone, and the one baseline
  it was accidentally providing is stated in `annex.css` instead. Before
  adding a rule to `system.css`, check what it does to an A4 sheet
- A title that runs to two lines takes `.title-2`, which tightens the leading
  to 9 mm so the pair reads as one object and still lands on the grid at 18.
  It is for two lines and only two, and it is what lets a two-line title hold
  the full 22 pt without crowding the reference number
- **A signature row is three baselines and all of its air is above the rule**,
  because that is where the pen goes. 12 mm to write in, the rule, then the
  label immediately under it. Space below the rule is space nobody can use,
  and it pushes the label away from the line it names
- **`annex/sample/` is the published one, and it is redacted.** It is the
  same two sheets with the client, the contract values, the notice references
  and both images removed, marked `Redacted sample` in the running foot the
  way a real document carries its status. **The mark removes the content, it
  does not cover it** — a black rectangle drawn over live text in a PDF is
  not a redaction, because the text is still in the file and still
  selectable. The `.redact` elements are empty and there is nothing
  underneath them; the export is checked by decompressing every stream and
  searching for what should be gone. Redaction widths are set in `em`, so one
  class covers about the same number of characters at 22 pt as at 10 pt
- **Redact by judgement, not by rule.** The standards, the material grade,
  the unit counts and the CPV code stay — they are public, they identify
  nobody, and they are what an evaluator actually scores. What goes is the
  authority, the money, the notice numbers and the signatures. A sheet
  blacked out everywhere proves nothing
- **The sheets carry no maker's mark.** No Arvorealta in the running foot, no
  credit line, nothing that tells an evaluator who set the document. What
  goes out under a client's name is theirs. The foot identifies the document
  and nothing else — reference number, sheet, and the framework reference an
  evaluator matches against their own file
- Narrative sits in seven columns — 97 mm, about 55 characters. The full
  170 mm measure runs past 85 characters and stops being readable
- **On screen a sheet scales, it never reflows.** A published annex is a
  210 mm page on a phone, so below a viewport that fits one the whole sheet
  is zoomed down to fit, the way a document viewer behaves — the reader sees
  the shape and pinches in to read. Screen only; print never sees it
- **Page budget is the design constraint.** A tender that caps pages discards
  the overflow unread, so air costs content. Measure every block against the
  246 mm before adding to a sheet

**The close is the hero again, on ink.** Same eyebrow, headline, standfirst,
qualifier, call to action and both notes, word for word. Every class the hero
owns therefore needs an `.inv` counterpart, and the ones that were missing
are the reason `.sub` sat at 2.35:1 there for a while.

**`.doc` is the one photograph on the page and it is of a document** — the
redacted sample, at full measure, because a document is judged at the size it
is read at. Its caption runs two lines: what the thing is, in ink, then its
status in `--ink-soft`, quieter because it qualifies the first line rather
than adding to it. Regenerate the image from `annex/sample/` if the sheets
change.

## Rules that matter

**Hand-break headlines** with `<br>`. Never let display type wrap on its own —
every line ending is a decision.

**A break class needs a counterpart, or the rule only holds at one end.** A
single conditional break hides at the widths it does not serve and leaves
those widths wrapping on their own, which is the thing the rule above
forbids. `.brs` is the wide break and `.brp` is the narrow one, each hidden
where the other shows, so the line endings are chosen at both ends and by
nobody's algorithm in between. **Check which way round the page has them.**
`system.css` shows `.brs` below 33rem and the offer page shows it above
46rem, so the same class name means the opposite thing in two places. That
inversion has already cost one session an afternoon.

**Every label carries the same weight.** The label face is set at 600
wherever it appears at eyebrow size — eyebrows, section tags, card steps, the
vocabulary chips, the comparison headings, the nav, the footer headings and
the form's own labels. A label found at one weight and read at another is two
systems. The wordmark is the exception: it is the mark itself, not a label,
and it keeps 400.

**Three type sizes.** Display 96, body 24, label 17 — that is the whole scale.
An intermediate Playfair was tried and retired: giving the headline a wider
column solved what the extra size was covering for. If a fourth seems
necessary, widen the column before you add a level.

**On the web those three are the anchors of a fluid scale, not fixed pixels.**
`system.css` sets display as `clamp(2.6rem, 1.1rem + 6.4vw, 6.5rem)`, which
is a curve through 96 rather than a value at it. A **scoped** clamp on one
headline is therefore a re-drawing of the curve and not a fourth size,
**provided it still lands on 96 at the desktop width the page is designed
for.** The hero takes one: at nine words its first line measured 1175px
against a 696px column at tablet width and broke four ways, taking 433px of a
900px screen on its own. Widening the column was tried first, as the rule
above requires, and the column was already full. The re-drawn clamp lands on
96px at 1440. **Scope it to the block that needs it and leave the page's
scale alone.**

**The hero closes above the fold.** Eyebrow, headline, standfirst, action, and
the action is the last thing in it. Anything else that is true — the audience
gate, the terms of the free step, the vocabulary — belongs in the strip
directly under the band, where it loses nothing. Six objects in a hero is a
list, and a list is read after the decision rather than before it. Measure
this rather than judging it: the band ran 1284px at 1440 × 900 and put the
action 400px below the fold while looking, in a screenshot, entirely fine.

**A full-bleed band zeroes `--gap`.** Every section carries the page's own
section padding, 128px a side at 1280. A band whose air comes from an image's
edges and from the block inside it does not want another 256px, and that
padding is exactly what pushed the hero's action off the screen.

**A repeated label is a system when it is numbered and a tic when it is not.**
The nine section tags read `01` through `09` in order, so a reader can follow
them and they are one device used nine times. An unnumbered eyebrow above a
headline is an independent decision each time, and those multiply until every
fold opens the same way. The offer page runs three. **Keep the numbered spine
unbroken and keep the unnumbered ones under about one per three folds.**

**The site is light only, and that is a decision.** It emulates print at every
output it has — A4 annexes, 1920 × 1080 decks, a paper ground on screen. A
dark mode would be a second identity for a firm whose whole argument is what
a document looks like when it is printed and scored. Do not add one as a
courtesy.

The offer page carried one for a while, as a toggle in the nav, and it is
gone. Two things killed it. The page is three greens — paper ground, ink
statement fold, ink-2 dark ground — so in dark mode the statement fold, whose
entire job is to be the one inverted moment on the page, had nothing left to
invert against and the page flattened to three shades of the same colour. And
it cost a `dark:` variant on every colour utility, a pre-paint script, a
listener and a stored preference, for a second identity the file above says
not to have. `prefers-color-scheme: dark` now changes nothing, which is
checked: the body stays `#D9D7D4` under either setting.

**Snap to the baseline**, including captions and table rows. Display excepted, above.

**No inline colour or font values.** Everything reads from tokens, so a theme
swap is total.

## The offer page's folds

Six, in order: the photographic hero, a two-item strip, the open tender, the
award's weights on ink, the pricing ladder, and the close.

**This page was the sandbox until it was promoted.** Everything below was
measured in `lab/` first and then moved here whole. The figures are that
sandbox's figures and they still hold, because the page is the same file.

### Type, and the one failure the serif solved sideways

The page sets **EB Garamond** for display type — headlines and prices only —
with **Geist** for body and UI and **Geist Mono** for every label and figure.
Self-hosted at `assets/fonts/ebgaramond*.woff2`, OFL, 44 KB latin and 114 KB
latin-ext, so the no-third-party-request rule still holds.

It is not a decorative reach. The page set everything in one sans at four
sizes for a while, which is why it read as a software landing page rather
than as a firm whose product is documents. `ui-ux-pro-max` returns EB
Garamond for "law firms, legal services, contracts, formal documents,
government", which is this reader exactly.

**It also fixed the hero's one contrast failure, by accident.** The serif
sets larger than the sans it replaced, which moved the hero's whole stack 9px
up — an eyebrow at 260 became one at 251. **Measured there the eyebrow reads
5.36:1 against 3.49 before**, because the strip under it at that height is
darker. The headline reads 8.04 and the standfirst 10.20. The photograph
section above says the eyebrow clears nowhere and that the only two honest
fixes are to drop the line or move it out of the band; this was the second
one, reached by changing the type rather than by moving the object, and
**nine pixels was the whole difference.** It is one photograph at one width.
Re-measure before trusting it anywhere else.

### The controls

**A skip link, first in the document.** Measured before it existed: the first
Tab landed on the wordmark and it took eight stops to reach the hero's own
action. It is invisible until focused, which is the whole pattern.

**A focus ring the page owns**, 3px of ink at a 2px offset, inverting to bone
inside `.on-ink` — the hero, the header while it is over the photograph, and
the award fold. Before it, every control fell back to the browser's `1px
auto`, which on the hero drew in a colour nobody chose.

**Write it as longhand, not the `outline` shorthand.** As a shorthand the
width and the style landed and the colour did not: Chrome reported the ring
as `currentColor`, so on the hero it drew bone at 75% rather than the ink
asked for. Both were measured before settling on the longhand.

**`cursor: pointer` on buttons.** Tailwind's preflight sets `cursor: default`
on `button`, so the three language controls were the only clickable things on
the page that did not look clickable. Measured: they reported `default` while
every `<a>` reported `pointer`.

**Targets that clear 24px.** Measured before the fix: the three nav links at
21px tall, the wordmark at 20px and the footer address at 17px, against the
24px WCAG 2.2 asks for. They are padded with negative margins so nothing
moves.

### The award fold

**One horizontal bar at full measure, and it is a measured one.** Three
segments, 30 climate and environment, 35 quality, 35 price, with 2px of the
page's own ink ground between them. It is a part-to-whole bar and **not a
progress meter**: there is no track behind it to fill against, the three
segments are the whole and they sum to 100.

It was a hundred-cell waffle for a day. A waffle can be counted, which a bar
cannot, and that was its whole advantage — but a hundred cells is a texture,
and a texture reads as decoration before it reads as a score. The bar came
back with four things the first bar did not have.

**One, the 65 is drawn rather than inferred.** A dimension line spans the
first two segments — end ticks, a hairline broken for the figure, `65` at
display size with `/ 100` in mono beside it. A dimension line, not a bracket:
a bracket groups, a dimension line states a measurement, which is the
language a firm whose product is technical documents already speaks. It is a
figure and not a phrase, so it needs no translating and all three languages
carry the same mark. The first attempt set it as a 10px bordered box with an
11px label and read on screen as a stray rule.

**Two, the figures sit inside the segments**, so there is no legend to hop
to. Measured on ink the three fills read **9.85:1, 6.12:1 and 3.88:1**, all
clear of the 3:1 a graphic mark needs, and ink type on those same fills reads
the same three figures. The numerals are display size, where the floor is 3:1
rather than 4.5:1. **The names stay outside on the ink ground** at 8.19:1 and
5.50:1, because words are small text and small text does not go on the
geometry.

**Three, the fills separate properly.** The first bar had to sit the two
non-price fills almost on top of each other so the 65 would read as one mass,
which left them nearly indistinguishable. The dimension line does the
grouping now, so the three descend in clear steps and still group. That was
the waffle's one real gain and it is kept without its cost.

**Four, the motion is a single sweep, and it is a curtain rather than three
fills.** Three segments each growing from their own left edge animate as
three events; one block of the page's own ink ground sliding right off the
whole bar is one event at one constant speed, and the segment geometry is
never distorted while it runs. It also sidesteps the trap this file records
twice — an element that starts outside its own box is never seen by the
observer watching it — because the curtain starts covering the bar and is
therefore always in view. Each name fades in as the sweep passes its segment,
and the dimension line draws last. The wrapper clips, since the curtain
travels a full bar width to the right and an unclipped one would take the
page with it.

**The corner is 16px and it is the open-tender card's.** The bar went pill,
then square, then here. The pill was a dashboard control. The square was the
only hard corner on a page whose every other surface — the open-tender card,
the dialog, the price cards — is a 16px card, which made it read as
unfinished rather than as precise. **One radius across the page is a system;
three are three decisions.** The radius lives on the bar's wrapper rather
than on the segments, so the bar is one rounded surface with 2px of ink cut
through it, not three rounded tiles.

**The sourcing note sits under the bar, on the same left edge as the headline
and the first segment.** It spent a version opposite the headline as a
spread, which was a fix for a different problem — the fold then ran 745px
with a 100px band of chart in the middle and an empty right half above it —
and the spread made the note read as a standfirst. It is not one. It says
where the three figures come from, so it belongs under the three figures,
where a caption goes. Measured at 1440: note and headline both at x=96.

**The dimension line, the bar and the names are three rows of one grid**, so
the 65 boundary lands in the same place in all three to the pixel, and the
track widths come from the data. Every track is `minmax(0, Nfr)` and not
`Nfr`: **an `fr` track takes its min-content width as a floor**, so at 375
the longest name pushed its own column 13px wider than the segment above it
and the three rows stopped lining up. The names take the segment's own
padding from `sm` up so each sits under the figure it names; on a phone they
run near flush instead, because 28px of matching inset left 59px of measure
and broke "Climate and environment" over three lines.

**Accessibility.** The bar is `aria-hidden` and a sentence carries the same
content, because a chart is not reading matter. Identity is never colour
alone: every segment holds its own figure and sits over its own name. The
isolation dims the other two by mouse and by keyboard focus alike.

**The hover dim can be a plain class on the segment, and on the name it
cannot.** Nothing in the bar itself is animated by Motion, so a class holds
there. The names are, and **Motion writes `opacity` inline while it animates,
which beats any Tailwind opacity class on the same node** — the first version
of that row was measured doing nothing at all, three names at opacity 1 with
a segment hovered. The outer div owns the dim and the interaction, the inner
motion div owns the arrival, and the two multiply. The waffle learned the
same lesson at a hundred cells.

The waffle's other trap is the general case and worth keeping: **an element
that hides itself cannot be the thing you observe.** Given its own
`whileInView` each cell waited to be seen, and the grid was taller than a
phone, so landing mid-section left the bottom rows permanently at zero. Same
shape as the first bar's fill, and the reason the curtain is built the way it
is.

`ui-ux-pro-max`'s chart data offers three forms for a part-to-whole of five
categories or fewer and ruled two out for this page: a **pie**, whose own
"when NOT to use" lists an accessibility-first context and a reader who needs
precise values, and a **radar**, which compares entities across attributes.
The **waffle** was the third and it lost on the fold. The nearest thing in
the 21st.dev catalogue is a Partition Bar, which is what this is, and taking
it would have meant `npx shadcn add` and a build step on a page that vendors
everything.

### The ladder fold

**Three tiers as cards, the middle one wider and lifted.** Each carries its
deliverables as a list under the price, which is the thing a reader comparing
three tiers actually scans for. The fold stood as four hairline-separated
rungs for a while, each tier compressed to a sentence, and **one deliverable
went missing in that compression** — "The index. Every project, by client and
year, ready at the next bid." It is back.

**The objection to cards is about equal columns**, which say "pick one of
these four" and are the opposite of a ladder. These are not equal: the middle
runs `1.25fr` against `1fr`, lifts 16px out of the row and carries the only
solid border. Measured at 1440: 369 / 462 / 369, equal heights at 621, the
middle starting 16px higher. The shape carries the argument before a word is
read, which is what the rule was protecting.

**All three cards take the open-tender card exactly** — `rounded-2xl`, a
hairline at `ink/15`, `paper-3`. So the recommended rung is argued by the
wider column, the lift and the solid ink border rather than by being the only
card with a ground.

**Three tiers, not four.** The free step was never in this ladder. A line
under the row carries it with the page's one action beside it, so a reader
who came straight to the price fold still has somewhere to go. The comparison
that closes the fold is the 15,000 kr a Swedish bid consultancy publishes for
one draft of one bid.

**It is a grid and it never scrolls sideways.** One column on a phone, three
from `lg`. It was a snap scroller for a day and that was the wrong call: a
carousel asks a reader to discover there is more and then work for it, and a
price list is the one place where every option has to be visible at once —
the credit mechanic only makes sense when €600, €2,400 and €8,000 can be seen
together. **Horizontal scrolling is not a layout for anything the reader has
to compare.**

**If a snap scroller ever comes back, `scroll-padding` has to match its
padding.** The row carried `px-5 sm:px-8` and a negative margin to bleed to
the screen edge. Without `scroll-pl-5 sm:scroll-pl-8` beside it, `snap-start`
aligned the first card to the padding edge, the browser scrolled the gutter
away on load, and the row opened 32px to the left of the headline above it.
Every width was mechanically fine and it still looked broken. The scroller is
gone, the trap is not.

**Every figure and every deliverable comes off `reference/index.html`**, which
is where the original ladder copy lives. Do not round a price and do not
invent a deliverable. If a tier's scope changes, change it there and here
together.

**Prices are set in the sans and the serif, never the mono.** Geist Mono
gives the comma a full advance, so `€2,400` draws as `€2 , 400`. The page's
other large figures carry no separators and stay mono.

A fold showing the free template's own five scored blocks stood here for a
day. It was accurate and nobody could tell what it was for from its heading,
which is the signal that a fold is explaining rather than selling. The offer
took its place.

### The call to action, and the intake

**The call to action opens a form, and it delivers to Basin.** The reader is
asked for an email address and the page itself, which is the thing a
prewritten mail could never guarantee: a mail that arrives with nothing
attached is a round trip before the work can start. The site is static on
GitHub Pages and has no server of its own, so `INTAKE` in `index.html` posts
to a Basin form endpoint instead.

**The prewritten mail is still there, in the dialog's footer**, as the path
that always works. The reasoning for it holds and is worth keeping: an empty
compose window asks the reader to write the thing we are asking them for,
which is where most of them stop. Subject and body are filled in the reader's
own language. `encodeURIComponent`, not `escape`: the body carries newlines,
and two of the three languages carry non-ASCII.

**The endpoint is not a secret and is not treated as one.** A form action
lives in the page's own HTML, so anybody reading source has it, and hiding it
at local scope the way an API key is hidden would be theatre. What stands in
for secrecy is Basin's own spam protection, switched on at their end. This
file said otherwise for a turn and that was wrong.

**Basin's free tier is 50 submissions a month, one form, 100MB of storage and
30 day retention, and storage is the binding limit rather than the count.**
100MB against the dialog's own 10MB cap is ten worst cases, where a one page
PDF is well under one. Virus scanning is Pro only, so on the free tier files
arrive from strangers unscanned — which matters, because what arrives is
tender documents from people nobody has met. Anything worth keeping comes off
Basin inside thirty days. **The form is now on a public, indexed page rather
than an unlisted sandbox, so the 50 is exposed to whatever finds it. If the
quota starts emptying without real submissions behind it, that is the cause.**

**`Accept: application/json` is not optional.** Without it Basin answers a
form post with a 302 to its own thank-you page; through `fetch` that redirect
is followed silently and `ok` reads true off Basin's HTML, so the dialog
could not tell a delivered file from a rejected one. **The `Content-Type` is
deliberately not set**: `FormData` writes its own with the multipart
boundary, and naming it by hand drops the boundary and the upload arrives
empty.

Verified against the live endpoint, not assumed. A real multipart POST
returns `200` with `{"success":true}` and `access-control-allow-origin: *`,
so the browser call is not blocked. The browser path itself is verified by
intercepting the request and replaying that response, because **the sandbox
Chromium does not trust this environment's proxy CA** and cannot reach
`usebasin.com` at all — `ERR_CERT_AUTHORITY_INVALID`, the same shape of
sandbox limit as the missing H.264.

The `INTAKE` null branch is kept on purpose. If the endpoint is ever unset
the dialog says nothing was sent rather than faking a success, which is
better than silently swallowing a file.

**The cap is 10 MB and it is checked before any request**, along with the
extension: `pdf, doc, docx, odt, rtf, png, jpg, jpeg, webp`. A reader who
finds out from a server that their file was too large has already waited for
the upload.

**A native `<dialog>`, not a div.** `showModal()` gives the focus trap, the
inert background, Escape to close, `::backdrop` and focus returning to the
control that opened it, and all five are things a hand-rolled modal gets
wrong. One dialog is mounted at the root and the opener travels down as
context: four copies would be four copies of the reader's half-filled form,
and whichever one they opened second would be empty.

**Focus is moved by hand, and that is the video bug again.** Written as
lowercase `autofocus` in the template, React did not put the attribute on the
element at all — measured — so `showModal` fell back to the first focusable
thing in the dialog, which is the close button. It is set on the node through
a ref now, exactly as `muted` had to be. **Check the live property, never the
JSX.**

**The file input is hidden and a real button clicks it.** A file input styled
`sr-only` is still focusable, so the focus ring lands on something nobody can
see; a button that forwards the click puts the ring where the reader is
looking.

### The rest of the page

**The page has no section numbering and five eyebrows, one per fold, and they
are a spine rather than a tic.** Read down the page they go
`Industrial manufacturer bids` · `Open now` · `How it is scored` ·
`What it costs` · `Where to start`, which is a reader's own route through the
argument and matches the three nav links. That is more than the one-per-three
the taste skill allows, and it is the owner's call: an eyebrow that names
where you are is wayfinding, and an eyebrow that decorates a headline is the
thing the rule is actually against. **If a sixth fold arrives, it joins the
spine or it gets none.**

**A proof fold was tried and removed.** The pattern this page is built on
puts proof second and this page has none — no logos, no case studies, no
quotes — so the sandbox carried three published documents under the hero,
headed "Read the work before you trust it." The reasoning still stands and is
worth keeping: with no tender client to name, the work itself was the only
honest proof available, and **a logo wall would have been faster and would
have been a lie.** What it could not answer is whether proof belongs above
the offer at all on a page whose first step is free. If it comes back it
joins the spine or it gets no eyebrow.

Tracked capitals name a section and nothing else — a label that names a value
beside it is mono at 12px in sentence case, because it is found rather than
read and it should not look like a section opening. On the ink fold the
eyebrow takes `bone/75` at 6.76:1; the mark is 2.03:1 there and barred.

**The hero carries a video over the photograph, and the photograph is the
floor.** `assets/video/hero-1-720.mp4`, 1280 × 720, ten seconds, 3.1 MB,
versioned in its name like everything else. It is mounted over the `<picture>`
rather than in place of it, starts at `opacity: 0`, and fades in on
`canplaythrough` — not `canplay`, which fires with a few frames buffered and
leaves a ten second loop stalling two seconds in. Three paths fall back to the
photograph and all three are tested: `prefers-reduced-motion`, where the
element is never mounted at all because a `<video autoplay>` cannot be stopped
from CSS; `onError`, which drops it; and a blocked autoplay, whose rejected
promise is swallowed.

**React does not write `muted`, `autoplay` or `playsinline` for you, and a
video missing any of them does not autoplay anywhere.** Written as plain
lowercase attributes, all three were simply absent from the element —
measured, not assumed. They are camelCase props now AND set on the node
through a ref, with `play()` called there, because React writes `muted` as a
property and skips it often enough to matter. Check the live properties,
never the JSX, when a hero video will not start.

**The sandbox Chromium has no H.264**, so playback cannot be verified here at
all: `canPlayType('video/mp4; codecs="avc1.42E01E"')` returns empty and the
hero falls back to the photograph every time. That proved the failure path and
proves nothing about the video. **Check a real browser after deploying.**

**No backticks in a comment inside a markup template.** An HTML comment
written inside `html\`...\`` is still inside a JavaScript template literal, so
one backtick closes the string and the whole module stops parsing. It
happened twice in the award fold, the second time in the sentence warning
about the first.

## Three languages on the offer page

English, Norwegian Bokmål and Finnish, in one object in `index.html`, with a
three-letter control in the nav. The page is small enough that shipping all
three costs less than a round trip would, so a reader who switches gets the
new language in the same frame.

The first language is the browser's, so a Norwegian or Finnish reader
arriving cold gets their own and everyone else gets English. A choice, once
made, is remembered and outranks the browser from then on. `html lang`
follows, because a screen reader gets its pronunciation from it.

**A foreign string is quoted, never left loose in a sentence.** The first
version kept the tender's title and the annex names in Norwegian inside
English and Finnish prose, on the reasoning that a bidder has to match them
against the documents in front of them. The reasoning is right and the
execution was wrong: `Bilag 2 and Bilag 3 are handed out as finished forms`
reads as a half-finished translation, and it was reported as a bug twice.

The rule now: **every sentence is in one language.** Where a foreign string
has to appear, it is pulled out of the prose and set as a quotation, in mono,
with its own `lang` attribute and a label in the reader's language that says
what it is. The tender's heading is translated, and the official Norwegian
title sits under it after `Named in the competition documents as`. The prose
counts the annexes rather than naming them. The buyer's registered name is
not translated in any language, which is normal for a company name; only the
country moves.

A quotation from another document reads as deliberate. The same words loose
inside an English sentence read as an unfinished job.

**The Nordic text is not a native speaker's.** The procurement vocabulary in
it is the part worth having checked before the page is used in an approach.

## Skills, and which one wins

`.claude/skills/` holds six of ours and seven vendored from one upstream
bundle. `.claude/skills/VENDORED.md` carries the source, the commit, the
licence and what was checked before installing.

Ours: `audit`, `eu-tender-documents`, `plan`, `profile`, `research`,
`taste-skill`.

Vendored from `ui-ux-pro-max-skill`: `banner-design`, `brand`, `design`,
`design-system`, `slides`, `ui-styling`, `ui-ux-pro-max`.

**This file outranks every one of them, and `taste-skill` outranks the
vendored seven.** They are reference material, not a mandate, and several of
them will suggest things this site has decided against:

- `ui-styling` is built on shadcn/ui and Radix. **This page has no build step
  and no runtime dependency it does not vendor itself.** Its script
  `shadcn_add.py` shells out to `npx shadcn add`; read what it is installing
  before running it here, and prefer not to
- Several of them treat **dark mode** as a default to implement. The site is
  light only and the reasoning is above
- They carry their own palettes, type scales and token architectures. The
  editorial and technical systems above are the brief; a vendored palette is
  something to read, never to apply

Use them for what they are good at, which is breadth — font pairings, chart
forms, platform sizes, stack-specific patterns — and resolve every conflict in
favour of this file.

## How to report back

**Every reply ends with a plain-language synthesis.** A few short sentences,
as if explaining to a five-year-old, saying what was done and what it means.
It goes last, under its own heading, after the detail rather than instead of
it. The detail is still the work; this is the part that can be read in ten
seconds on a phone.

## Adding a client theme

1. Copy `assets/themes/arvorealta.css` to `assets/themes/<client>.css`
2. Change **values only** — never add rules to a theme file
3. Load that client's fonts in the page `<head>`
4. Link the client theme instead of `arvorealta.css`, still before `system.css`

Nothing else changes. That is the point: the same structure, delivered in
someone else's brand.

## PDF export

Decks print to PDF from the same source that serves them. In `deck.css`:
`@page { size: 1920px 1080px; margin: 0 }`, each slide `break-after: page`,
and `print-color-adjust: exact` so reversed slides keep their ground.

**Export with the command, not the print dialog.** Chrome's dialog has no
1920 × 1080 paper size and its Paper size dropdown overrides `@page`, so
printing by hand silently gives you Letter. Run this instead:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/deck.pdf" \
  "https://arvorealta.com/deck/<slug>/"
```

Verified output: 1440 × 810 pt per page — that is exactly 1920 × 1080 px,
since 1 px = 0.75 pt — with both grounds intact. Backgrounds need no flag;
`print-color-adjust: exact` carries them. If Chrome rejects
`--no-pdf-header-footer`, drop it and add `--headless=old`.

Points, not pixels, is what the page is really measured in. If you ever need
the GUI, macOS can do it: Print → **Print Using System Dialog** → Paper Size →
Manage Custom Sizes → **20 in × 11.25 in**, margins 0. Same page — 1920 ÷ 96
and 1080 ÷ 96.

iPadOS has no custom paper sizes and no Chrome CLI, so it cannot produce a
correct deck export at all. Generate the PDF elsewhere, or present the deck
full-screen from the browser — it is already responsive at any width.

**Annexes are the easy case.** A4 is a standard paper size, so an annex
*can* be exported from the print dialog — Destination "Save as PDF", Paper
size A4, Margins None, scale 100%. The same command works too, and is still
what CI runs:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/annex.pdf" \
  "https://arvorealta.com/annex/<slug>/"
```

Verified output: 594.96 × 841.92 pt against a 595.28 × 841.89 pt A4 — Chrome
rounds by about a tenth of a millimetre, which no printer will show. The
export is tagged, carries a document language and keeps the `alt` text, so
it already meets the EN 301 549 floor for a non-web document. It is **not**
PDF/A; if a notice demands that profile, post-process with Ghostscript.

`.github/workflows/deck-pdf.yml` exports every deck and annex on push and
attaches them to the run, asserting 1440 × 810 pt for decks and A4 for
annexes so a wrong page size cannot ship quietly.

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/pages.yml`) builds and
deploys. Nothing to run locally.
