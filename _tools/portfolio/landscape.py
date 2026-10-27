#!/usr/bin/env python3
"""Cut the landscape set for the mosaic sandbox.

54 source frames at 1920 x 1080: seventeen projects, three to a project, on
the presentation's three grounds — dark water, warm light, pale paper, in
that order — plus three `base` frames that carry no mark and are dropped.

These are 16:9, which the portrait set was not, and that is the whole reason
this layout is possible: a landscape frame fills a landscape screen, so a
mosaic and a full-bleed lightbox both work without cropping anything.

    python3 _tools/portfolio/landscape.py <source-dir>

webp only, and deliberately. The repo's photography carries a jpg fallback
beside every webp, but that is three files per image and this set is 51 of
them; the fallback would roughly double a 9 MB directory to buy support for
browsers older than Safari 14 (2020). Every name was read at full resolution
before it shipped — see the portrait script for why that is a rule.
"""
import subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "assets" / "land"
VER = 1
FULL, THUMB = 1400, 480
GROUNDS = ("w", "l", "p")          # water, light, paper — the source's own order

# slug, name, what the lockup itself states, first frame of the triple
PROJECTS = [
    ("remedios",   "Ilha dos Remédios",             "Crest and seal",        31),
    ("demillion",  "Demillion",                     "Landscapes",            28),
    ("venner",     "Venner",                        "Advice",                25),
    ("lobo",       "Leonardo Lobo",                 "Negócios imobiliários", 37),
    ("boaventura", "Boaventura Noleto Sousa Souto", "Advogados",             22),
    ("figueiredo", "Figueiredo & Velloso",          "Advogados associados",  13),
    ("dantas",     "Dantas & Martins",              "Advogadas associadas",  40),
    ("wright",     "Wright Minussi",                "Advogados",             19),
    ("machado",    "Machado Gobbo",                 "Advogados",             52),
    ("offrire",    "Offrire",                       "Hospitais",             43),
    ("soledad",    "Soledad Molina",                "Monogram and wordmark", 34),
    ("archy",      "Archy",                         "Mark and wordmark",      4),
    ("noleto",     "Noleto",                        "Mark and wordmark",     16),
    ("turvatikas", "Turvatikas",                    "Safety ladder",          7),
    ("amazonia",   "Amazônia Store",                "Store",                 46),
    ("autotrack",  "Autotrack",                     "Mark and wordmark",     49),
    ("arvorealta", "Arvorealta",                    "Our own",               10),
]


def write(src: Path, slug: str, g: str):
    for w in (FULL, THUMB):
        subprocess.run(["convert", str(src), "-resize", f"{w}x", "-strip",
                        "-quality", "80", str(OUT / f"{slug}-{g}-{VER}-{w}.webp")], check=True)


if __name__ == "__main__":
    src = Path(sys.argv[1])
    OUT.mkdir(parents=True, exist_ok=True)
    n = 0
    for slug, name, role, first in PROJECTS:
        for i, g in enumerate(GROUNDS):
            write(src / f"{first + i}.jpg", slug, g)
            n += 1
        print(f"  {slug:12s} {first}-{first+2}  {name}")
    print(f"\n{n} frames ({len(PROJECTS)} projects x 3 grounds) -> {OUT}")
