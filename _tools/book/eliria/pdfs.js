// Print Eliria's pieces to PDF at true size, from the book's own drawings.
// The three A4 documents; the press pieces come from press.py.
const {chromium} = require('playwright');
const OUT = (process.argv[2] || __dirname + '/out') + '/';  // needs the site served on :8766
const BOOK = 'http://localhost:8766/brand/book-eli/';
const ARD = '#252F37', SAND_SYM = 'img/eliria-symbol-sand-2.svg', ARD_SYM = 'img/eliria-symbol-ardosia-1.svg';
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

  // invitation, A4, no bleed: it prints on an office printer
  const [inv] = await grab('cover');
  await print(p, 'eliria_template_invitation_a4.pdf', 210, 297, inv, '#print .pg{width:210mm!important}');

  // letter and certificate, A4, the same way: each also ships as a .dotx
  const [letter] = await grab('letter');
  await print(p, 'eliria_template_letter_a4.pdf', 210, 297, letter, '#print .pg{width:210mm!important}');
  const [cert] = await grab('page');
  await print(p, 'eliria_template_certificate_a4.pdf', 210, 297, cert, '#print .pg{width:210mm!important}');

  // card, folder and envelope are press files now: see press.py (CMYK, PDF/X-1a, FOGRA39)
  await b.close();
})();
