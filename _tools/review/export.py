#!/usr/bin/env python3
"""Export an annex to A4 PDF and assert the page size.

CI does this too (`deck-pdf.yml`), but CI runs on push and a review is checked
before it is committed. Chrome rounds A4 by about a tenth of a millimetre,
which no printer shows; anything further off is a real fault.

    python3 -m http.server 8777
    python3 _tools/review/export.py /annex/_enviropac-review/ out/DR-001-EN.pdf
"""
import sys, re, os
from playwright.sync_api import sync_playwright

A4 = (595.28, 841.89)
TOL = 2.0

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    url, out = sys.argv[1], sys.argv[2]
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch(executable_path="/opt/pw-browsers/chromium")
        pg = b.new_page()
        pg.goto("http://127.0.0.1:8777" + url, wait_until="networkidle")
        pg.wait_for_timeout(900)
        pg.pdf(path=out, format="A4", print_background=True,
               margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
        b.close()
    data = open(out, "rb").read()
    boxes = re.findall(rb"/MediaBox\s*\[([^\]]*)\]", data)
    bad = 0
    for i, box in enumerate(boxes, 1):
        _, _, w, h = [float(x) for x in box.decode().split()]
        off = max(abs(w - A4[0]), abs(h - A4[1]))
        print("page %d  %.2f x %.2f pt  %s" % (i, w, h, "A4" if off < TOL else "NOT A4"))
        if off >= TOL: bad += 1
    print("%s  %d bytes  %d pages" % (out, len(data), len(boxes)))
    sys.exit(1 if bad or not boxes else 0)

if __name__ == "__main__":
    main()
