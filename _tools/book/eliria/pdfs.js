// Print Eliria's pieces to PDF at true size, from the book's own drawings.
// Card, folder and envelope carry 3 mm of bleed on every side.
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

  // card, 85 x 45 mm, front and back as two files
  const [front, back] = await grab('card');
  const cardCss = 'html,body{background:#D8CCBD!important}#print .bleed{width:91mm;height:51mm;background:#D8CCBD;position:relative;overflow:hidden}#print .bleed .pg{position:absolute;left:3mm;top:3mm;width:85mm!important}';
  await print(p, 'eliria_card_front_85x45mm.pdf', 91, 51, `<div class=bleed>${front}</div>`, cardCss);
  await print(p, 'eliria_card_back_85x45mm.pdf', 91, 51, `<div class=bleed>${back}</div>`, cardCss);

  // folder face, 230 x 310 mm: ardósia, the symbol in areia, 32 mm, centred
  await print(p, 'eliria_folder_230x310mm.pdf', 236, 316,
    `<div class=f><img src="${SAND_SYM}" alt=""></div>`,
    `html,body{background:${ARD}!important}#print .f{width:236mm;height:316mm;background:${ARD};display:grid;place-items:center}#print .f img{width:32mm;display:block}`);

  // DL envelope front, 110 x 220 mm standing: the symbol in areia, 40 mm, point up
  await print(p, 'eliria_envelope_110x220mm.pdf', 116, 226,
    `<div class=e><img src="${SAND_SYM}" alt=""></div>`,
    `html,body{background:${ARD}!important}#print .e{width:116mm;height:226mm;background:${ARD};position:relative}#print .e img{position:absolute;left:50%;top:50%;width:40mm;transform:translate(-50%,-50%) rotate(90deg)}`);
  await b.close();
})();
