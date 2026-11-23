"""A brand book's favicon: the logo's symbol, dark on a light browser and light on
a dark one, as one square SVG that switches with prefers-color-scheme.

    python3 -I _tools/book/kit/favicon.py <symbol.svg> <dark hex> <light hex> <out.svg>

The symbol is centred in a square with a little air, so a wide mark is not cut.
Colours are forced with !important because Affinity writes fills inline.
The light colour is white (#FFFFFF) and there is no ground. Then run
favicon_png.js on the result for the transparent PNGs Chrome on iPad needs.
Never link the brand's icon PNGs as rel="icon": they carry a ground.
"""
import re, sys

if len(sys.argv) != 5: sys.exit(__doc__)
src, dark, light, out = sys.argv[1:]
s = open(src, encoding='utf-8').read()
m = re.search(r'<svg\b([^>]*)>(.*)</svg>', s, re.S)
attrs, inner = m.group(1), m.group(2)
vb = [float(v) for v in re.search(r'viewBox="([^"]+)"', attrs).group(1).replace(',', ' ').split()]
w, h = vb[2], vb[3]
side = max(w, h) * 1.08
x, y = (side - w) / 2, (side - h) / 2
# rect is left alone: Affinity writes the artboard as an unfilled rect
shapes = 'path,polygon,circle,ellipse,g'
style = (f'{shapes}{{fill:{dark}!important}}'
         f'@media (prefers-color-scheme:dark){{{shapes}{{fill:{light}!important}}}}')
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" viewBox="0 0 {side:.1f} {side:.1f}">'
       f'<style>{style}</style>'
       f'<svg x="{x:.1f}" y="{y:.1f}" width="{w:g}" height="{h:g}" viewBox="{" ".join(f"{v:g}" for v in vb)}" style="fill-rule:evenodd;clip-rule:evenodd">'
       f'{inner.strip()}</svg></svg>\n')
open(out, 'w', encoding='utf-8').write(svg)
print('wrote', out, f'{side:.0f} square')
