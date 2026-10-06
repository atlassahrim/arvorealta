#!/usr/bin/env python3
"""Cut evidence figures out of somebody else's PDF, repeatably.

A crop is a quotation and a quotation has to be re-cuttable when the source
changes. Render first, then cut from a box list rather than by hand:

    pdftoppm -r 200 -png their-sheet.pdf page
    python3 _tools/review/crop.py boxes.json out/

boxes.json is a list of jobs. A plain job cuts one box; a job with `pair`
composites two crops side by side scaled to one height, which is how finding
01 says *these are two documents* without a caption.

    [
      {"name": "fig-01", "pair": [
         {"src": "old-1.png", "box": [110, 510, 1439, 1020]},
         {"src": "new-1.png", "box": [80, 150, 1000, 760]}], "height": 320},
      {"name": "fig-02", "src": "new-3.png", "box": [111, 1255, 858, 1410]}
    ]

Afterwards it writes a contact sheet so the set can be eyeballed in one look.
Crops in a 5-column annex plate run about 68.5 mm wide; a ratio under about
1.6 makes a plate taller than its own row, so check the printed ratios.
"""
import sys, json, os
from PIL import Image

def cut(spec):
    im = Image.open(spec["src"])
    return im.crop(tuple(spec["box"]))

def main():
    if len(sys.argv) < 3:
        print(__doc__); sys.exit(2)
    jobs = json.load(open(sys.argv[1]))
    out = sys.argv[2]
    os.makedirs(out, exist_ok=True)
    made = []
    for j in jobs:
        if "pair" in j:
            h = j.get("height", 320)
            parts = []
            for s in j["pair"]:
                c = cut(s)
                parts.append(c.resize((int(c.width * h / c.height), h)))
            gap = j.get("gap", 26)
            w = sum(p.width for p in parts) + gap * (len(parts) - 1)
            img = Image.new("RGB", (w, h), "white")
            x = 0
            for p in parts:
                img.paste(p, (x, 0)); x += p.width + gap
        else:
            img = cut(j)
        path = os.path.join(out, j["name"] + ".png")
        img.save(path); made.append(path)
        print("%-12s %4d x %4d  ratio %.2f" % (j["name"], img.width, img.height,
                                               img.width / img.height))
    ims = [Image.open(p) for p in made]
    W = 900
    rs = [i.resize((W, int(i.height * W / i.width))) for i in ims]
    sheet = Image.new("RGB", (W, sum(r.height + 16 for r in rs)), "#888")
    y = 0
    for r in rs:
        sheet.paste(r, (0, y)); y += r.height + 16
    sheet.save(os.path.join(out, "contact.png"))
    print("contact sheet: %s" % os.path.join(out, "contact.png"))

if __name__ == "__main__":
    main()
