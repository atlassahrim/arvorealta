# arvorealta.com

Static site and document system. No build step, no dependencies. Push to
`main` and it's live in about ten seconds.

## Where things are

```
index.html              the offer page          → arvorealta.com
video/index.html        video portfolio         → arvorealta.com/video/
deck/<slug>/index.html  a deck                  → arvorealta.com/deck/<slug>/
assets/themes/*.css     colour + type values    ← change these
assets/system.css       layout + structure      ← rarely touched
assets/deck.css         slide geometry + print
assets/site.js          clocks, scroll reveal
CLAUDE.md               full spec for AI sessions
```

## I want to change…

**A colour or a typeface** → `assets/themes/arvorealta.css`. It is nothing but
values. Every page follows.

**Words on the offer page** → `index.html`. Search for the sentence.

**The price** → `index.html`, three places: the fold, the two offer cards, and
the comparison column. Search `€`.

**A video** → `video/index.html`. Copy a `.reel` block, swap the Vimeo ID,
title, heading and role line. Set `autoplay=0` past the second one.

**Spacing, grid, type scale** → `assets/system.css`. This affects everything;
change it deliberately.

## Adding a deck

Copy `deck/_template/` to `deck/<slug>/`, replace the slides. It's live at
`arvorealta.com/deck/<slug>/` on push.

To export: Chrome → Print → Save as PDF, margins **None**, background graphics
**on**, scale **100%**. One slide per page.

## Adding a client

Copy `assets/themes/arvorealta.css` to `assets/themes/<client>.css`, change the
values, load their fonts in the page head, and link their theme instead of
Arvorealta's — always before `system.css`. Structure is untouched.

## Before changing DNS

`awe@arvorealta.com` is Google Workspace. Keep the MX records exactly as they
are. Nameservers are still Wix — **cancelling Wix takes down DNS and email.**
Move DNS to Cloudflare first if you want to leave.
