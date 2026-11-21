"""Eliria's printed pieces as press-ready PDF/X-1a:2003 files, all in CMYK.

    python3 -I press.py <outdir>

Card (85 x 45 mm, front and back), folder face (230 x 310 mm) and DL envelope
front (110 x 220 mm). Every file carries:
- 3 mm of bleed on every side, the ground running out to it
- crop marks in the slug, 3 mm off the trim, in registration
- MediaBox, BleedBox and TrimBox set, so the RIP knows the cut
- a FOGRA39 output intent with its ICC profile embedded
- fonts embedded, no RGB, no transparency
Colours are the brand's CMYK values, chosen against FOGRA39 by colour
difference to the screen values; see CLAUDE.md.
"""
import sys, os, re, io, datetime
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import CMYKColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from svglib.svglib import svg2rlg
import pikepdf

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'out')
os.makedirs(OUT, exist_ok=True)
ICC = os.path.join(HERE, 'FOGRA39L.icc')

def cmyk(c, m, y, k): return CMYKColor(c / 100, m / 100, y / 100, k / 100)
ARDOSIA = cmyk(66, 36, 20, 90)
AREIA = cmyk(19, 19, 27, 0)
REG = cmyk(100, 100, 100, 100)          # registration, for the marks only

for name, f in (('OS', 'OpenSans-Regular.ttf'), ('OS-Medium', 'OpenSans-Medium.ttf'), ('OS-SemiBold', 'OpenSans-SemiBold.ttf')):
    pdfmetrics.registerFont(TTFont(name, os.path.join(HERE, 'fonts', f)))

BLEED, SLUG = 3, 9                       # mm
SVG = os.path.join(OUT, '.symbol-sized.svg')
open(SVG, 'w').write(open(os.path.join(HERE, 'symbol.svg')).read().replace('width="100%" height="100%"', 'width="2862" height="1245"'))
SYM_W, SYM_H = 2862, 1245

def symbol(c, cx, cy, width, colour, rotate=0):
    """The Eliria symbol, centred at (cx, cy) mm, `width` mm wide, one flat CMYK colour.
    The SVG's own paths are drawn straight onto the canvas, so nothing but the
    CMYK fill reaches the file."""
    from reportlab.graphics.shapes import Group, Path
    from reportlab.pdfgen.canvas import FILL_EVEN_ODD
    d = svg2rlg(SVG)
    s = width * mm / SYM_W
    c.saveState()
    c.translate(cx * mm, cy * mm); c.rotate(rotate); c.scale(s, s); c.translate(-SYM_W / 2, -SYM_H / 2)
    c.setFillColor(colour)
    def draw(node):
        if isinstance(node, Group):
            c.saveState(); c.transform(*node.transform)
            for n in node.contents: draw(n)
            c.restoreState()
        elif isinstance(node, Path):
            p = c.beginPath(); pts = node.points; i = 0
            for op in node.operators:
                if op == 0: p.moveTo(pts[i], pts[i + 1]); i += 2
                elif op == 1: p.lineTo(pts[i], pts[i + 1]); i += 2
                elif op == 2: p.curveTo(*pts[i:i + 6]); i += 6
                elif op == 3: p.close()
            c.drawPath(p, stroke=0, fill=1, fillMode=FILL_EVEN_ODD)
        else:
            raise ValueError('unexpected shape in the symbol: %r' % type(node))
    draw(d)
    c.restoreState()

def page(c, tw, th):
    """Set the page to trim + bleed + slug, the boxes, and draw the crop marks.
    Returns the origin of the trim, in mm, for the artwork."""
    o = SLUG + BLEED
    W, H = tw + 2 * o, th + 2 * o
    c.setPageSize((W * mm, H * mm))
    c.setTrimBox((o * mm, o * mm, (o + tw) * mm, (o + th) * mm))
    c.setBleedBox(((o - BLEED) * mm, (o - BLEED) * mm, (o + tw + BLEED) * mm, (o + th + BLEED) * mm))
    return o, W, H

def marks(c, tw, th, o):
    c.setStrokeColor(REG); c.setLineWidth(0.25)
    off, ln = BLEED, 6                   # marks start 3 mm off the trim, 6 mm long
    for x in (o, o + tw):
        for y0, y1 in ((o - off - ln, o - off), (o + th + off, o + th + off + ln)):
            c.line(x * mm, y0 * mm, x * mm, y1 * mm)
    for y in (o, o + th):
        for x0, x1 in ((o - off - ln, o - off), (o + tw + off, o + tw + off + ln)):
            c.line(x0 * mm, y * mm, x1 * mm, y * mm)

def ground(c, tw, th, o, colour):
    c.setFillColor(colour)
    c.rect((o - BLEED) * mm, (o - BLEED) * mm, (tw + 2 * BLEED) * mm, (th + 2 * BLEED) * mm, stroke=0, fill=1)

def slugline(c, o, text):
    c.setFillColor(REG); c.setFont('OS', 5)
    c.drawString(o * mm, 3 * mm, text)

def text_top(c, x, top, size_mm, font, s, th, o, lead_mm=None):
    """Place text as the book does: `top` is the CSS line-box top in mm from the
    trim's top edge, line-height 1 unless a leading is given (Open Sans metrics)."""
    lines = s.split('\n')
    lh = lead_mm or size_mm
    half = (lh - 1.362 * size_mm) / 2
    base = top + half + 1.069 * size_mm
    c.setFont(font, size_mm * 72 / 25.4)
    for i, line in enumerate(lines):
        c.drawString((o + x) * mm, (o + th - base - i * lh) * mm, line)

def build(name, tw, th, art, label):
    path = os.path.join(OUT, name)
    c = canvas.Canvas(path, pdfVersion=(1, 4), initialFontName='OS', initialFontSize=5)
    c.setTitle(name[:-4]); c.setAuthor('Eliria'); c.setCreator('Arvorealta')
    o, W, H = page(c, tw, th)
    art(c, o)
    marks(c, tw, th, o)
    slugline(c, o, f'{label}  ·  corte {tw} × {th} mm  ·  sangria {BLEED} mm  ·  FOGRA39')
    c.showPage(); c.save()
    pdfx(path)
    print('wrote', path)

def pdfx(path):
    """Add the FOGRA39 output intent and the PDF/X-1a keys."""
    pdf = pikepdf.open(path, allow_overwriting_input=True)
    # drop font resources the page never uses (the drawing library names Helvetica and Times)
    for pg in pdf.pages:
        content = b"".join(pikepdf.unparse_content_stream(pikepdf.parse_content_stream(pg)).splitlines(True))
        fonts = pg.Resources.get('/Font')
        if fonts is not None:
            for k in list(fonts.keys()):
                if (k.encode() + b" ") not in content:
                    del fonts[k]
        # forms drawn by svglib carry their own resources
        xo = pg.Resources.get('/XObject')
        for k in (list(xo.keys()) if xo is not None else []):
            x = xo[k]
            if '/Resources' in x and '/Font' in x.Resources:
                del x.Resources['/Font']
    icc = pikepdf.Stream(pdf, open(ICC, 'rb').read()); icc['/N'] = 4
    pdf.Root.OutputIntents = pikepdf.Array([pikepdf.Dictionary(
        Type=pikepdf.Name.OutputIntent, S=pikepdf.Name.GTS_PDFX,
        OutputConditionIdentifier=pikepdf.String('FOGRA39'),
        OutputCondition=pikepdf.String('Coated FOGRA39 (ISO 12647-2:2004)'),
        RegistryName=pikepdf.String('http://www.color.org'),
        Info=pikepdf.String('Coated FOGRA39 (ISO 12647-2:2004)'),
        DestOutputProfile=icc)])
    with pdf.open_metadata(set_pikepdf_as_editor=False) as meta:
        meta['pdfxid:GTS_PDFXVersion'] = 'PDF/X-1a:2003'
    info = pdf.docinfo
    info['/GTS_PDFXVersion'] = pikepdf.String('PDF/X-1a:2003')
    info['/Trapped'] = pikepdf.Name('/False')
    pdf.save(path, fix_metadata_version=False)

# ── the card, 85 x 45 mm ──
CW, CH = 85, 45
def card_front(c, o):
    ground(c, CW, CH, o, AREIA)
    symbol(c, o + CW / 2, o + CH / 2, 20, ARDOSIA)          # 20 mm wide, centred, printed in ardósia
def card_back(c, o):
    ground(c, CW, CH, o, AREIA)
    c.setFillColor(ARDOSIA)
    text_top(c, 6, 6.4, 4.2, 'OS-SemiBold', 'Lia Noleto', CH, o)
    text_top(c, 6, 12.6, 2.646, 'OS-Medium', 'Função', CH, o)
    text_top(c, 6, 28.4, 2.469, 'OS', 'telefone\ne-mail\nendereço', CH, o, lead_mm=3.528)

# ── the folder face, 230 x 310 mm ──
FW, FH = 230, 310
def folder(c, o):
    ground(c, FW, FH, o, ARDOSIA)
    symbol(c, o + FW / 2, o + FH / 2, 32, AREIA)

# ── the DL envelope front, 110 x 220 mm standing ──
EW, EH = 110, 220
def envelope(c, o):
    ground(c, EW, EH, o, ARDOSIA)
    symbol(c, o + EW / 2, o + EH / 2, 40, AREIA, rotate=-90)  # turned so its point is up

build('eliria_card_front_85x45mm.pdf', CW, CH, card_front, 'Eliria · cartão, frente')
build('eliria_card_back_85x45mm.pdf', CW, CH, card_back, 'Eliria · cartão, verso')
build('eliria_folder_230x310mm.pdf', FW, FH, folder, 'Eliria · pasta, capa')
build('eliria_envelope_110x220mm.pdf', EW, EH, envelope, 'Eliria · envelope DL, frente')
