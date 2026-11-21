"""Start a client brand book from the template client (Eliria by default).

    python3 -I _tools/book/kit/new.py <code> --name "Acme" [--lang en] [--drive "Acme BRAND"] [--from eli]

Writes, and refuses to overwrite:
- brand/book-<code>/index.html   the template page, with the client's name, its
                                 language tag, every download button set to
                                 "not yet", and every picture renamed to the
                                 client's file stem (the pictures themselves are
                                 not copied: check.py lists them as missing)
- brand/book-<code>/fonts/       the template's web fonts, until the client's arrive
- _tools/book/clients/<code>/    client.json, with what must be supplied set to
                                 null and what was copied from the template
                                 listed under "_draft"; the template's font files
                                 and symbol until the client's arrive

Then run check.py <code>: its output is the list of what is missing.
"""
import argparse, json, os, re, shutil, sys, unicodedata

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
CLIENTS = os.path.join(ROOT, '_tools', 'book', 'clients')

a = argparse.ArgumentParser()
a.add_argument('code'); a.add_argument('--name', required=True)
a.add_argument('--lang'); a.add_argument('--drive'); a.add_argument('--from', dest='src', default='eli')
a = a.parse_args()
if not re.fullmatch(r'[a-z]{3}', a.code): sys.exit('the code is three lower-case letters')

T = json.load(open(os.path.join(CLIENTS, a.src, 'client.json'), encoding='utf-8'))
page_dir, cdir = os.path.join(ROOT, 'brand', 'book-' + a.code), os.path.join(CLIENTS, a.code)
for d in (page_dir, cdir):
    if os.path.exists(d): sys.exit('already exists: ' + os.path.relpath(d, ROOT))

slug = unicodedata.normalize('NFKD', a.name).encode('ascii', 'ignore').decode().lower()
slug = re.sub(r'[^a-z0-9]+', '', slug)
lang = a.lang or T['lang']
same_lang = lang == T['lang']

# ── client.json ──
C = json.loads(json.dumps(T))
C.update(code=a.code, name=a.name, slug=slug, lang=lang, drive_folder=a.drive or a.name + ' BRAND', template=a.src)
C['line'] = None
C['palette'] = []
C['dark'] = C['light'] = None
C['symbol'] = {'svg': 'symbol.svg', 'png': 'symbol.png', 'alt': None}
C['signatory'] = {'name': None, 'role': None, 'contact': None, 'contact_final': False}
C['logo_font'] = None
if not same_lang:
    C['words'] = {k: None for k in T['words']}
draft = ['tokens', 'fonts', 'documents', 'press', 'doc_soft', 'doc_rule'] + (['words'] if same_lang else [])
C['_draft'] = draft
# the template's name inside copied texts becomes the client's; the rest is flagged as draft
txt = json.dumps({k: C[k] for k in ('documents', 'press')}, ensure_ascii=False).replace(T['name'], a.name)
C.update(json.loads(txt))
os.makedirs(cdir)
shutil.copytree(os.path.join(CLIENTS, a.src, 'fonts'), os.path.join(cdir, 'fonts'))
for k in ('svg', 'png'):
    shutil.copy(os.path.join(CLIENTS, a.src, T['symbol'][k]), os.path.join(cdir, 'symbol.' + k))
json.dump(C, open(os.path.join(cdir, 'client.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)

# ── the page ──
src_dir = os.path.join(ROOT, 'brand', 'book-' + a.src)
html = open(os.path.join(src_dir, 'index.html'), encoding='utf-8').read()
w = T['words'] if same_lang else {'not_yet': 'Not yet', 'not_yet_title': 'Not available yet'}
# every live button back to "not yet": the client's files get their own Drive ids
html, n = re.subn(r'<a class="dl" href="https://drive\.google\.com/[^"]*"[^>]*>(<b>[^<]*</b>[^<]*)<i>[^<]*</i></a>',
                  lambda m: f'<span class="dl off" aria-disabled="true" title="{w["not_yet_title"]}">{m.group(1)}<i>{w["not_yet"]}</i></span>', html)
if not same_lang:
    html = html.replace(T['words']['not_yet_title'], w['not_yet_title']).replace(f'<i>{T["words"]["not_yet"]}</i>', f'<i>{w["not_yet"]}</i>')
html = html.replace(f'img/{T["slug"]}-', f'img/{slug}-')
html = re.sub(r'<html lang="[^"]*"', f'<html lang="{lang}"', html, count=1)
html = html.replace(T['name'], a.name).replace(T['name'].upper(), a.name.upper())
html = html.replace(f'{T["slug"]}_', f'{slug}_')     # Drive file names in the tree
os.makedirs(page_dir)
shutil.copytree(os.path.join(src_dir, 'fonts'), os.path.join(page_dir, 'fonts'))
os.makedirs(os.path.join(page_dir, 'img'))
open(os.path.join(page_dir, 'index.html'), 'w', encoding='utf-8').write(html)

print(f'wrote brand/book-{a.code}/ ({n} download buttons set to not yet) and _tools/book/clients/{a.code}/')
print(f'next: python3 -I _tools/book/kit/check.py {a.code}')
