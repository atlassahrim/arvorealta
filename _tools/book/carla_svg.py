"""Set short Carla Sans lines as SVG outlines for the Eliria book.

Carla Sans carries no licence in its files, so the font itself is never
served: each line the page needs is drawn here as paths. Capitals only,
because the face is caps-only (its lower case maps to the capitals and
drops the accents). Ligatures are off unless asked for; the font's own
'liga' joins CA, LA, RA, GA and some ninety other pairs.
Usage: carla_svg.py <fontdir> <outdir>
"""
import json, pathlib, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

fontdir, outdir = map(pathlib.Path, sys.argv[1:3])
FILES = {"light": "CarlaSans-Light.otf", "regular": "CarlaSans.otf", "semibold": "CarlaSans-Semibold.otf"}

def kern_table(t):
    pairs = {}
    if "GPOS" not in t:
        return pairs
    for lk in t["GPOS"].table.LookupList.Lookup:
        for st in lk.SubTable:
            st = getattr(st, "ExtSubTable", st)
            if getattr(st, "Format", None) == 1 and hasattr(st, "PairSet"):
                for g1, ps in zip(st.Coverage.glyphs, st.PairSet):
                    for r in ps.PairValueRecord:
                        v = r.Value1
                        if v is not None and getattr(v, "XAdvance", 0):
                            pairs[(g1, r.SecondGlyph)] = v.XAdvance
            elif getattr(st, "Format", None) == 2:
                c1 = st.ClassDef1.classDefs; c2 = st.ClassDef2.classDefs
                for g1 in st.Coverage.glyphs:
                    rec = st.Class1Record[c1.get(g1, 0)]
                    for g2, k2 in c2.items():
                        v = rec.Class2Record[k2].Value1
                        if v is not None and getattr(v, "XAdvance", 0):
                            pairs.setdefault((g1, g2), v.XAdvance)
    return pairs

def ligatures(t):
    out = {}
    for lk in t["GSUB"].table.LookupList.Lookup:
        for st in lk.SubTable:
            st = getattr(st, "ExtSubTable", st)
            if hasattr(st, "ligatures"):
                for first, ls in st.ligatures.items():
                    for l in ls:
                        out[tuple([first] + l.Component)] = l.LigGlyph
    return out

def draw(text, weight="regular", fill="#0E1834", liga=False, track=0.0):
    t = TTFont(fontdir / FILES[weight]); gs = t.getGlyphSet(); cm = t.getBestCmap()
    hm = t["hmtx"]; kern = kern_table(t)
    glyphs = [cm[ord(c)] for c in text]
    if liga:
        L = ligatures(t); i = 0; out = []
        while i < len(glyphs):
            for n in (3, 2):
                key = tuple(glyphs[i:i + n])
                if len(key) == n and key in L:
                    out.append(L[key]); i += n; break
            else:
                out.append(glyphs[i]); i += 1
        glyphs = out
    upm = t["head"].unitsPerEm; trk = track * upm
    pen = SVGPathPen(gs); x = 0
    for i, g in enumerate(glyphs):
        gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
        x += hm[g][0] + (kern.get((g, glyphs[i + 1]), 0) if i + 1 < len(glyphs) else 0)
        if i + 1 < len(glyphs) and text[i] != " ":
            x += trk
    bp = BoundsPen(gs)
    for g in glyphs:
        gs[g].draw(bp)
    cap = t["OS/2"].sCapHeight or 720
    top = -max(cap, 960) if any(ch in text for ch in "ÁÀÂÃÉÊÍÓÔÕÚÇ") else -cap
    bot = 210 if any(c in text for c in "Ç,") else 20
    top -= 20
    h = bot - top
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 {top} {x:.0f} {h}" '
           f'width="{x:.0f}" height="{h}"><path fill="{fill}" d="{pen.getCommands()}"/></svg>')
    return svg, x / upm, h / upm, -top / upm

LINES = {
    # slug: text, weight, fill, liga, tracking
    "entrega": ("A ENTREGA", "light", "#0E1834", False, 0.02),
    "da-colecao": ("DA COLEÇÃO 2026", "light", "#0E1834", False, 0.02),
    "colecao": ("COLEÇÃO OFICIAL 2026", "regular", "#0E1834", False, 0.04),
    "nome": ("NOME SOBRENOME", "regular", "#0E1834", False, 0.04),
    "carla-on": ("CARLA", "regular", "#0E1834", True, 0.02),
    "carla-off": ("CARLA", "regular", "#0E1834", False, 0.02),
    "edicao": ("EDIÇÃO 2026", "semibold", "#0E1834", False, 0.12),
    "unica": ("CADA UMA, ÚNICA.", "light", "#EFDBC0", False, 0.04),
}
meta = {}
outdir.mkdir(parents=True, exist_ok=True)
for slug, (text, w, fill, liga, tr) in LINES.items():
    svg, wem, hem, asc = draw(text, w, fill, liga, tr)
    (outdir / f"carla-{slug}-1.svg").write_text(svg)
    meta[slug] = {"text": text, "w_em": round(wem, 4), "h_em": round(hem, 4), "asc_em": round(asc, 4)}
print(json.dumps(meta, indent=1, ensure_ascii=False))
