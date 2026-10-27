#!/usr/bin/env python3
"""Cut the /brand/ tiles from the source frames.

The sources are 46 frames at 1215 x 2160, three per project, one on each of
the presentation's three grounds — dark water, warm light, pale paper, in
that order, so a frame's ground is (n mod 3): 1 dark, 2 warm, 0 pale. They
are social frames and this is not a social page, so each is cut to 4:5 about
a centre at 47% of the height, which is where every mark and its wordmark
sit. Measured on all twelve: nothing is clipped at that centre.

    python3 _tools/portfolio/marks.py <source-dir>

The grid takes one frame per project and the columns hold one ground each:
water, light, paper, left to right. That is a system rather than a mood, and
it is the reason the picks below are not simply the best frame of each set.

Every name was read at full resolution before it went on the page. The crest
was misread as "Benediks" from a contact sheet and is "Ilha dos Remedios";
40.jpg is "Advogadas Associadas", feminine, not "Advogados". A client's name
spelled wrong on a portfolio is the one error the client is certain to see.
"""
import subprocess, sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "marks"
WIDTHS = (880, 440)          # tiles render at about 410 CSS px; this is 1x and 2x
CENTRE = 0.47
VER = 1                      # bump when the bytes change — the name is the cache key

# slug, source frame
GRID = [
    ("remedios",   37), ("demillion", 5),  ("soledad",   9),
    ("venner",     10), ("archy",     17), ("boaventura", 15),
    ("dantas",     40), ("amazonia",  47), ("turvatikas", 21),
    ("autotrack",  28), ("arvorealta", 23), ("machado",   45),
]
# the three-grounds fold takes an unnamed mark on purpose: the fold is about
# how a mark is presented, and an unnamed one cannot be mistaken for a claim
# about a client
GROUNDS = [("ground-water", 31), ("ground-light", 32), ("ground-paper", 33)]


def cut(src: Path) -> Image.Image:
    im = Image.open(src).convert("RGB")
    w, h = im.size
    nh = round(w * 1.25)
    top = max(0, min(round(CENTRE * h - nh / 2), h - nh))
    return im.crop((0, top, w, top + nh))


def write(im: Image.Image, slug: str):
    OUT.mkdir(parents=True, exist_ok=True)
    tmp = OUT / f".{slug}.src.png"
    im.save(tmp)
    for i, w in enumerate(WIDTHS):
        subprocess.run(["convert", str(tmp), "-resize", f"{w}x", "-strip",
                        "-quality", "80", str(OUT / f"{slug}-{VER}-{w}.webp")], check=True)
        if i == 0:   # one jpg fallback, at the widest, for the <img src>
            subprocess.run(["convert", str(tmp), "-resize", f"{w}x", "-strip",
                            "-quality", "82", str(OUT / f"{slug}-{VER}-{w}.jpg")], check=True)
    tmp.unlink()
    print(f"  {slug:14s} <- {src_of[slug]}.jpg")


if __name__ == "__main__":
    src_dir = Path(sys.argv[1])
    src_of = {s: n for s, n in GRID + GROUNDS}
    for slug, n in GRID + GROUNDS:
        write(cut(src_dir / f"{n}.jpg"), slug)
    print(f"\n{len(GRID) + len(GROUNDS)} tiles -> {OUT}")
