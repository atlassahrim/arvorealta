# arvorealta.com

Atlas Sahrim's site and document system. Static HTML, hosted on GitHub Pages.
Push to `main` and it is live in about ten seconds.

`CLAUDE.md` is the full spec — contrast figures, the deck and annex geometry,
the rules behind every value. This file is the map.

## Where things are

```
index.html              the offer page          → arvorealta.com
video/index.html        video portfolio         → arvorealta.com/video/
home/index.html         redirect to the root    → arvorealta.com/home
lab/index.html          sandbox, noindex        → arvorealta.com/lab/
reference/index.html    the first offer page    → arvorealta.com/reference/
deck/<slug>/index.html  a deck, 1920 × 1080     → arvorealta.com/deck/<slug>/
annex/<slug>/index.html an A4 annex             → arvorealta.com/annex/<slug>/
assets/themes/*.css     colour + type values    ← change these
assets/system.css       layout + structure      ← rarely touched
assets/deck.css         slide geometry + print
assets/annex.css        A4 geometry + print
assets/site.js          clocks, scroll reveal
_tw.src.css             the offer page's Tailwind source
_build-css.sh           compiles it — run this, never the CLI by hand
```

Anything with a leading underscore, at any depth, is deleted from the checkout
before deploy. That is the only real lock on private material; `noindex` is a
label, not a lock. See CLAUDE.md.

## The one build step

The offer page is the only page with a compiled stylesheet. After editing
`index.html` or `_tw.src.css`:

```sh
sh _build-css.sh
```

It compiles, names the output after its own content hash
(`assets/tw-<hash>.css`), repoints the page and deletes the previous file.
Never hand-edit the compiled CSS, never rename it, and never call the Tailwind
CLI directly — the hash in the name is what stops a ten-minute Pages cache
serving a stylesheet that has never heard of the classes the new HTML asks for.

Every other page is plain HTML and CSS with nothing to run.

## I want to change…

**A colour or a typeface** → `assets/themes/arvorealta.css` for the editorial
system, `assets/themes/technical.css` for decks and annexes. They are nothing
but values. Every page that loads them follows.

**Words on the offer page** → `index.html`, in the `STR` object near the top.
Three languages live side by side there, so a sentence changed in one wants
changing in all three. Then run the build step.

**A video** → `video/index.html`. Copy a `.reel` block, swap the Vimeo ID,
title, heading and role line. Set `autoplay=0` past the second one.

**Spacing, grid, type scale** → `assets/system.css`. This affects every page
that loads it, decks and annexes included. Change it deliberately.

## Adding a deck or an annex

Copy `deck/_template/` (editorial) or `deck/_technical/` (technical) to
`deck/<slug>/`, or `annex/_template/` to `annex/<slug>/`, and replace the
content. Live on push. Keep the leading underscore on anything that should
not be.

## Exporting a PDF

Use the command, not the print dialog. Chrome's dialog has no 1920 × 1080
paper size and silently gives you Letter:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$HOME/Desktop/deck.pdf" \
  "https://arvorealta.com/deck/<slug>/"
```

Annexes are A4, a size the dialog does have, so either route works for those.
`.github/workflows/deck-pdf.yml` exports every deck and annex on push and
checks the page size, so a wrong one cannot ship quietly.

## Adding a client

Copy `assets/themes/arvorealta.css` to `assets/themes/<client>.css`, change the
values, load their fonts in the page head, and link their theme instead of
Arvorealta's — always before `system.css`. Structure is untouched.

## Before changing DNS

`awe@arvorealta.com` is the Google Workspace mailbox (the site writes to
`atlas@arvorealta.com`, which must resolve to it). Keep the MX records exactly
as they are. Nameservers are still Wix — **cancelling Wix takes down DNS and
email.** Move DNS to Cloudflare first if you want to leave.
