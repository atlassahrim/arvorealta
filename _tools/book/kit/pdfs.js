// Print a client's three A4 documents to PDF at true size, from the book's own
// drawings. The press pieces come from press.py.
//   NODE_PATH=$(npm root -g) node kit/pdfs.js <code> [outdir]    needs the site served on :8766 (build.sh does it)
const fs = require('fs'), path = require('path');
const {chromium} = require('playwright');
const CODE = process.argv[2];
if (!CODE) { console.error('usage: node pdfs.js <code> [outdir]'); process.exit(2); }
const C_DIR = path.join(__dirname, '..', 'clients', CODE);
const C = JSON.parse(fs.readFileSync(path.join(C_DIR, 'client.json'), 'utf8'));
const OUT = (process.argv[3] || path.join(C_DIR, 'out')) + '/';
fs.mkdirSync(OUT, {recursive: true});
const BOOK = `http://localhost:${process.env.PORT || 8766}/brand/book-${CODE}/`;
const BASE = `html,body{margin:0!important;padding:0!important;background:none!important;scroll-snap-type:none!important}
  body>*:not(#print){display:none!important}
  #print .pg{box-shadow:none!important;margin:0!important}
  #print .ov,#print .win{display:none!important}
  *{-webkit-print-color-adjust:exact;print-color-adjust:exact}`;

async function print(p, name, w, h, html, css = '') {
  await p.evaluate(({html, css, BASE, w, h}) => {
    document.querySelectorAll('#print,#printcss').forEach(e => e.remove());
    const st = document.createElement('style'); st.id = 'printcss';
    st.textContent = BASE + `@page{size:${w}mm ${h}mm;margin:0}` + css; document.head.appendChild(st);
    const d = document.createElement('div'); d.id = 'print'; d.innerHTML = html; document.body.appendChild(d);
  }, {html, css, BASE, w, h});
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.pdf({path: OUT + name, width: w + 'mm', height: h + 'mm', printBackground: true, preferCSSPageSize: true});
  console.log('wrote', name);
}

(async () => {
  const b = await chromium.launch(); const p = await b.newPage({viewport: {width: 1440, height: 900}});
  await p.goto(BOOK, {waitUntil: 'networkidle'}); await p.evaluate(() => document.fonts.ready);
  const grab = async k => { await p.evaluate(() => document.querySelectorAll('#print,#printcss').forEach(e => e.remove())); await p.click(`#pgPick button[data-p=${k}]`); await p.waitForTimeout(200);
    return p.evaluate(() => [...document.querySelectorAll('#desk .pg')].map(e => e.outerHTML)); };

  // A4, no bleed: they print on an office printer, and each also ships as a .dotx.
  // The keys are the book's own page picker: cover = invitation, page = certificate.
  for (const [key, n] of [['cover', 'invitation'], ['letter', 'letter'], ['page', 'certificate']]) {
    const [pg] = await grab(key);
    await print(p, `${C.slug}_template_${n}_a4.pdf`, 210, 297, pg, '#print .pg{width:210mm!important}');
  }
  await b.close();
})();
