"""Press PDFs: no RGB operator, fonts embedded, the FOGRA39 intent, PDF/X-1a keys.

    python3 -I _tools/book/kit/pdfcheck.py <file.pdf>...
"""
import sys, pikepdf, re
for f in sys.argv[1:]:
    pdf = pikepdf.open(f); ops = set(); fonts = set()
    def walk(obj):
        for operands, op in pikepdf.parse_content_stream(obj):
            ops.add(str(op))
        res = obj.get('/Resources') if hasattr(obj, 'get') else None
    for pg in pdf.pages:
        walk(pg)
        for k, x in (pg.Resources.get('/XObject') or {}).items():
            walk(x)
        fonts |= {str(v.get('/BaseFont')) for v in (pg.Resources.get('/Font') or {}).values()}
    rgb = ops & {'rg', 'RG', 'g', 'G', 'cs', 'CS', 'sc', 'scn', 'SC', 'SCN'}
    oi = pdf.Root.get('/OutputIntents')
    print(f.split('/')[-1], '| colour ops', sorted(ops & {'k', 'K', 'rg', 'RG', 'g', 'G', 'sc', 'scn'}), '| non-CMYK', sorted(rgb) or 'none',
          '| fonts', sorted(fonts), '| intent', str(oi[0].OutputConditionIdentifier) if oi else None, '| X', str(pdf.docinfo.get('/GTS_PDFXVersion')), '| trapped', str(pdf.docinfo.get('/Trapped')))
