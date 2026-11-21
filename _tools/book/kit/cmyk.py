"""Choose FOGRA39 CMYK values for screen colours, by colour difference (CIEDE2000)
through kit/FOGRA39L.icc, the profile built with ArgyllCMS from Fogra's own
FOGRA39L data. Use it only for a colour the client has given no CMYK for.

    python3 -I _tools/book/kit/cmyk.py "#252F37:k90" "#D8CCBD:k0"

A ":kN" suffix caps black at N per cent: ":k0" keeps it out, so a light ground
prints clean; ":k90" keeps a dark colour from becoming black alone. Every value is
searched in steps of 2, with total ink at most 300 per cent. Prints the best
match and its ΔE; a ΔE under 2 reads as the same colour.
"""
import os, sys
import numpy as np
from PIL import Image, ImageCms

ICC = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'FOGRA39L.icc')
LAB = ImageCms.createProfile('LAB', 6500)
TO_LAB = ImageCms.buildTransform(ImageCms.getOpenProfile(ICC), LAB, 'CMYK', 'LAB', renderingIntent=1)  # relative colorimetric

def srgb_to_lab(h):
    c = np.array([int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)])
    c = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    xyz = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]]) @ c / [0.95047, 1, 1.08883]
    f = np.where(xyz > 216 / 24389, np.cbrt(xyz), (24389 / 27 * xyz + 16) / 116)
    return np.array([116 * f[1] - 16, 500 * (f[0] - f[1]), 200 * (f[1] - f[2])])

def de2000(a, b):
    L1, a1, b1 = a; L2, a2, b2 = b.T
    C1, C2 = np.hypot(a1, b1), np.hypot(a2, b2); Cm = (C1 + C2) / 2
    G = 0.5 * (1 - np.sqrt(Cm ** 7 / (Cm ** 7 + 25 ** 7)))
    a1p, a2p = a1 * (1 + G), a2 * (1 + G)
    C1p, C2p = np.hypot(a1p, b1), np.hypot(a2p, b2)
    h1, h2 = np.degrees(np.arctan2(b1, a1p)) % 360, np.degrees(np.arctan2(b2, a2p)) % 360
    dL, dC = L2 - L1, C2p - C1p
    dh = np.where(np.abs(h2 - h1) <= 180, h2 - h1, np.where(h2 > h1, h2 - h1 - 360, h2 - h1 + 360))
    dH = 2 * np.sqrt(C1p * C2p) * np.sin(np.radians(dh / 2))
    Lm, Cpm = (L1 + L2) / 2, (C1p + C2p) / 2
    hm = np.where(np.abs(h1 - h2) <= 180, (h1 + h2) / 2, np.where(h1 + h2 < 360, (h1 + h2 + 360) / 2, (h1 + h2 - 360) / 2))
    T = 1 - .17 * np.cos(np.radians(hm - 30)) + .24 * np.cos(np.radians(2 * hm)) + .32 * np.cos(np.radians(3 * hm + 6)) - .2 * np.cos(np.radians(4 * hm - 63))
    SL = 1 + .015 * (Lm - 50) ** 2 / np.sqrt(20 + (Lm - 50) ** 2); SC = 1 + .045 * Cpm; SH = 1 + .015 * Cpm * T
    RT = -2 * np.sqrt(Cpm ** 7 / (Cpm ** 7 + 25 ** 7)) * np.sin(np.radians(60 * np.exp(-((hm - 275) / 25) ** 2)))
    return np.sqrt((dL / SL) ** 2 + (dC / SC) ** 2 + (dH / SH) ** 2 + RT * (dC / SC) * (dH / SH))

steps = np.arange(0, 101, 2)
grid = np.stack(np.meshgrid(steps, steps, steps, steps, indexing='ij'), -1).reshape(-1, 4)
grid = grid[grid.sum(1) <= 300]
W = 2048; pad = -len(grid) % W                      # one long row trips Pillow: lay it out as a block
px = np.vstack([np.round(grid * 2.55), np.zeros((pad, 4))]).astype(np.uint8)
img = Image.frombytes('CMYK', (W, len(px) // W), px.tobytes())
raw = np.asarray(ImageCms.applyTransform(img, TO_LAB)).reshape(-1, 3)[:len(grid)]
lab = np.stack([raw[:, 0].astype(float) * 100 / 255, raw[:, 1].view(np.int8), raw[:, 2].view(np.int8)], 1).astype(float)  # a*, b* are signed bytes

for arg in sys.argv[1:]:
    h, _, opt = arg.partition(':')
    kmax = int(opt[1:]) if opt.startswith('k') else 100
    ok = grid[:, 3] <= kmax
    d = de2000(srgb_to_lab(h), lab[ok])
    i = d.argmin(); c = grid[ok][i]
    print(f'{h}  C{c[0]} M{c[1]} Y{c[2]} K{c[3]}  ΔE {d[i]:.2f}' + (f'  (black at most {kmax})' if kmax < 100 else ''))
