#!/usr/bin/env python3
"""Measure every annex against the 246 mm page budget.

The rule in CLAUDE.md is measure, do not estimate. `.sheet-body` renders at
930 px at a desktop width, so `scrollHeight - clientHeight` is the overflow in
pixels and 3.78 px is one baseline. Both sheets of the first review came in
91 mm and 18 mm over on the first pass and read, in a screenshot, as though
they fitted.

    python3 -m http.server 8777     # from the repo root
    python3 _tools/review/measure.py [path ...]

With no paths it sweeps every annex. `--lines` adds a per-element line count
for the sheet named, which is what tells you whether a quote ran to three
lines when the layout budgeted two.
"""
import sys, glob, os
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8777"
PX_PER_BASELINE = 3.78

def annexes():
    out = []
    for d in sorted(glob.glob("annex/*/")):
        if os.path.isfile(d + "index.html"):
            out.append("/" + d)
    return out

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    lines = "--lines" in sys.argv
    urls = args or annexes()
    bad = 0
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        pg = b.new_page(viewport={"width": 1200, "height": 1400})
        for u in urls:
            if not u.startswith("/"):
                u = "/" + u
            try:
                pg.goto(BASE + u, wait_until="networkidle")
                pg.wait_for_timeout(600)
            except Exception as e:
                print("%-34s UNREACHABLE  %s" % (u, e)); bad += 1; continue
            over = pg.evaluate(
                "() => [...document.querySelectorAll('.sheet-body')]"
                ".map(x => x.scrollHeight - x.clientHeight)")
            foot = pg.evaluate(
                "() => [...document.querySelectorAll('.sheet-foot .num')]"
                ".map(x => getComputedStyle(x, '::before').content)")
            mm = [round(o * 246 / 930, 1) for o in over]
            ok = all(o == 0 for o in over)
            if not ok: bad += 1
            print("%-34s %s  over=%s px  %s mm  foot=%s"
                  % (u, "OK " if ok else "OVER", over, mm, foot[:1]))
            if lines:
                rows = pg.evaluate("""() => {
                  const px6 = document.querySelector('.sheet').getBoundingClientRect().height / 297 * 6;
                  return [...document.querySelectorAll('.sheet-body > *')].map(e =>
                    (e.className || e.tagName) + ' ' +
                    Math.round(e.getBoundingClientRect().height / px6) + 'L');
                }""")
                for r in rows: print("      ", r)
        b.close()
    print("\n%d of %d sheets clear the budget." % (len(urls) - bad, len(urls)))
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
