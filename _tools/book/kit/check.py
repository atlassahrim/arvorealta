"""What a client's brand book still lacks, as one list. Run it before asking the
owner anything and after every change; when it prints nothing under MISSING,
the book is complete.

    python3 -I _tools/book/kit/check.py <code>

It reads _tools/book/clients/<code>/client.json and brand/book-<code>/index.html:
- values still null in client.json, and keys still copied from the template (_draft)
- pictures the page names that are not in brand/book-<code>/img/
- the template client's name, signatory, colour names, hexes and file words left on the page
- download buttons: live, waiting, and any Drive id used twice
- the head: noindex, nofollow; the language tag; the --b-* tokens against client.json
Exit status 1 while anything is missing.
"""
import json, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
if len(sys.argv) < 2: sys.exit('usage: check.py <code>')
code = sys.argv[1]
cdir = os.path.join(ROOT, '_tools', 'book', 'clients', code)
C = json.load(open(os.path.join(cdir, 'client.json'), encoding='utf-8'))
page_dir = os.path.join(ROOT, 'brand', 'book-' + code)
html = open(os.path.join(page_dir, 'index.html'), encoding='utf-8').read()
missing, ok = [], []

# ── client.json ──
def nulls(x, p=''):
    if x is None: yield p
    elif isinstance(x, dict):
        for k, v in x.items():
            if not k.startswith('_'): yield from nulls(v, f'{p}.{k}' if p else k)
    elif isinstance(x, list):
        if not x: yield p + ' (empty)'
        for i, v in enumerate(x): yield from nulls(v, f'{p}[{i}]')
for p in nulls(C): missing.append(f'client.json: {p} is not set')
for k in C.get('_draft', []):
    missing.append(f'client.json: {k} is still the template\'s ({C["template"]}): write it for {C["name"]}, show it, then drop it from _draft')
for k in ('dark', 'light'):
    if C.get(k) and C[k] not in {p['word'] for p in C['palette']}: missing.append(f'client.json: {k} "{C[k]}" is not a palette word')
for role, f in (C.get('fonts') or {}).items():
    if f and f.get('file') and not os.path.exists(os.path.join(cdir, 'fonts', f['file'])):
        missing.append(f'fonts: {role} file {f["file"]} is not in clients/{code}/fonts/')
for k in ('svg', 'png'):
    if not os.path.exists(os.path.join(cdir, C['symbol'][k])): missing.append(f'symbol: clients/{code}/{C["symbol"][k]} is missing')

# ── the head ──
if '<meta name="robots" content="noindex, nofollow">' not in html: missing.append('head: robots is not "noindex, nofollow"')
m = re.search(r'<html lang="([^"]*)"', html)
if not m or m.group(1) != C['lang']: missing.append(f'head: <html lang> is {m and m.group(1)}, client.json says {C["lang"]}')
for k, v in (C.get('tokens') or {}).items():
    found = re.search(re.escape(k) + r':([^;}]+)', html)
    if not found: missing.append(f'tokens: {k} is not on the page')
    elif found.group(1).strip().lower() != v.lower(): missing.append(f'tokens: {k} is {found.group(1)} on the page, {v} in client.json')

# ── pictures ──
refs = sorted(set(re.findall(r'(?:src|href|srcset)="(img/[^"\s]+)', html) + re.findall(r'(img/[\w.-]+\.(?:webp|png|svg|jpg))', html)))
gone = [r for r in refs if not os.path.exists(os.path.join(page_dir, r))]
for r in gone: missing.append(f'picture: brand/book-{code}/{r}')
ok.append(f'pictures: {len(refs) - len(gone)} of {len(refs)} present')

# ── the template's leftovers ──
if C['template'] != code:
    T = json.load(open(os.path.join(ROOT, '_tools', 'book', 'clients', C['template'], 'client.json'), encoding='utf-8'))
    text = re.sub(r'<[^>]+>', ' ', html)
    probes = {T['name']: text, T['signatory']['name']: text, T['line']: text}
    for p in T['palette']:
        probes[p['name']] = text
        probes[p['hex']] = html
        probes[f'-{p["word"]}-'] = html
    mine = {p['hex'].lower() for p in C['palette']}
    for s, where in probes.items():
        if not s or (s.startswith('#') and s.lower() in mine): continue
        n = len(re.findall(re.escape(s), where, re.I))
        if n: missing.append(f'leftover from {T["name"]}: "{s}" ×{n}')

# ── download buttons ──
live = re.findall(r'<a class="dl" href="https://drive\.google\.com/file/d/([\w-]+)/view"[^>]*><b>([^<]*)</b>([^<]*)<i>', html)
wait = re.findall(r'<span class="dl off"[^>]*><b>([^<]*)</b>([^<]*)<i>([^<]*)</i>', html)
ids = [i for i, _, _ in live]
for i in sorted({i for i in ids if ids.count(i) > 1}): missing.append(f'button: Drive id {i} is used twice')
for t, lab, _ in wait: missing.append(f'button waiting: {t} {lab.strip()}')
nyw = (C.get('words') or {}).get('not_yet')
if nyw:
    for t, lab, word in wait:
        if word != nyw: missing.append(f'button: {t} {lab.strip()} reads "{word}", client.json says "{nyw}"')
ok.append(f'buttons: {len(live)} live, {len(wait)} waiting')

print(f'{C["name"]} (brand/book-{code}/)')
for s in ok: print('  ok   ', s)
if missing:
    print('MISSING')
    for s in missing: print('  -', s)
sys.exit(1 if missing else 0)
