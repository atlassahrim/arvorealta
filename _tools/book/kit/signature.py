"""A client's email signature, from client.json, on the one model every book uses:
the brand name in bold capitals with a short rule beside it, then three plain
lines in the computer's own monospace. Text only: nothing for a mail program
to block. Output: clients/<code>/out/<slug>_email_signature.html

    python3 -I _tools/book/kit/signature.py <code> [out_dir]

Reads `name`, the ink (`dark` palette word), `fonts.regular` and `signature`:
    "signature": {"lines": [
        {"text": "Nome Sobrenome, Coordenação"},
        {"text": "+55 11 0000-0000", "href": "tel:+5511000000000"},
        {"text": "nome@exemplo.com.br", "href": "mailto:nome@exemplo.com.br"}]}
Without `signature`, the lines come from `signatory` (name and role, then contact).
"""
import html, json, os, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
if len(sys.argv) < 2: sys.exit(__doc__)
code = sys.argv[1]
cdir = os.path.join(ROOT, '_tools', 'book', 'clients', code)
out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(cdir, 'out')
C = json.load(open(os.path.join(cdir, 'client.json'), encoding='utf-8'))

ink = {p['word']: p['hex'] for p in C['palette']}[C['dark']]
sans = C['fonts']['regular']['name'].split(' Light')[0]
lines = (C.get('signature') or {}).get('lines')
if not lines:
    s = C['signatory']
    lines = [{'text': ', '.join(x for x in (s.get('name'), s.get('role')) if x)}] + [{'text': t} for t in s.get('contact', [])]
NOTES = {
    'pt': 'Assinatura de e-mail, só texto, sem imagens. Abra este arquivo no navegador, selecione a assinatura, copie e cole nas configurações de assinatura do Gmail, do Outlook ou do Apple Mail. Depois troque o nome e o contato de exemplo pelos seus.',
    'en': 'Email signature, text only, no images. Open this file in a browser, select the signature, copy it, and paste it into the signature settings of Gmail, Outlook or Apple Mail. Then replace the example name and contact with your own.'}
NOTE = NOTES.get(C['lang'].split('-')[0], NOTES['en'])
brand = '&nbsp;&nbsp;'.join(html.escape(w) for w in C['name'].upper().split())

def line(l):
    t = html.escape(l['text'])
    return f'<a href="{html.escape(l["href"])}" style="color:{ink};text-decoration:none">{t}</a>' if l.get('href') else t

page = f'''<!doctype html>
<html lang="{C['lang']}">
<head>
<meta charset="utf-8">
<title>{html.escape(C['name'])} · e-mail</title>
<meta name="robots" content="noindex, nofollow">
</head>
<body style="margin:0;padding:32px;background:#FFFFFF">
<!--
  {NOTE}
-->
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt">
  <tr>
    <td style="padding:0 0 12px 0">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse">
        <tr>
          <td style="padding:0;font-family:'{sans}','Helvetica Neue',Helvetica,Arial,sans-serif;font-size:17px;line-height:20px;font-weight:bold;letter-spacing:1.5px;color:{ink};white-space:nowrap">{brand}</td>
          <td style="padding:0 0 0 22px;vertical-align:middle">
            <div style="width:28px;height:0;border-top:2px solid {ink};font-size:0;line-height:0">&nbsp;</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding:0;font-family:ui-monospace,'SF Mono',Menlo,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;line-height:21px;color:{ink}">
      {'<br>'.join(line(l) for l in lines)}
    </td>
  </tr>
</table>
</body>
</html>
'''
os.makedirs(out, exist_ok=True)
path = os.path.join(out, C['slug'] + '_email_signature.html')
open(path, 'w', encoding='utf-8').write(page)
print('wrote', path)
