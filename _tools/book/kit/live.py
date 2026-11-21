"""Point one download button at its Drive file, or at a new one after a re-upload.

    python3 -I _tools/book/kit/live.py <code> "<b>DOTX</b>Carta" <drive-id> "38 KB"

The second argument is the button's own text, type then label, matched once on
the page whether the button is waiting or already live. A waiting button turns
live; a live one takes the new id. A new upload is a new file with a new link,
so its button always needs this.
"""
import os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
if len(sys.argv) != 5: sys.exit(__doc__)
code, match, fid, size = sys.argv[1:]
path = os.path.join(ROOT, 'brand', 'book-' + code, 'index.html')
html = open(path, encoding='utf-8').read()
pat = re.compile(r'<(?:a class="dl" href="[^"]*"[^>]*|span class="dl off"[^>]*)>(<b>[^<]*</b>[^<]*)<i>[^<]*</i></(?:a|span)>')
hits = [m for m in pat.finditer(html) if match in m.group(1)]
if len(hits) != 1:
    sys.exit(f'{len(hits)} buttons match {match!r}: ' + ', '.join(m.group(1) for m in hits[:8]))
m = hits[0]
new = f'<a class="dl" href="https://drive.google.com/file/d/{fid}/view" target="_blank" rel="noopener">{m.group(1)}<i>{size}</i></a>'
open(path, 'w', encoding='utf-8').write(html[:m.start()] + new + html[m.end():])
print('live:', re.sub('<[^>]+>', ' ', m.group(1)).strip(), '->', fid)
