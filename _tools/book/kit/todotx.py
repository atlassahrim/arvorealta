"""docx -> dotx: the main part's content type becomes the template one.

    python3 -I _tools/book/kit/todotx.py <file.docx>...
"""
import sys, zipfile
for src in sys.argv[1:]:
    dst = src[:-5] + '.dotx'
    with zipfile.ZipFile(src) as zin, zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as zout:
        for it in zin.infolist():
            d = zin.read(it.filename)
            if it.filename == '[Content_Types].xml':
                a = b'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml'
                assert a in d; d = d.replace(a, b'application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml')
            zout.writestr(it, d)
    print('wrote', dst)
