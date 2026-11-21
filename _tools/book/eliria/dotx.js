// Eliria's letter and certificate as Word templates, from the book's drawings.
// A4, 20 mm top and sides, 23 mm foot; labels hang in a 58 mm column, reading
// text in the 112 mm column to its right. Tenor Sans for titles, Open Sans for
// everything else, all embedded. Line spacing is a multiple, never exact.
//   node dotx.js [outdir] && python3 -I ../../annex/docx_fix.py out/*.docx && python3 -I todotx.py out/*.docx
const fs = require('fs'), path = require('path');
const { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, AlignmentType, Header, Footer, LineRuleType, TableLayoutType, VerticalAlign } = require('docx');
const D = __dirname, OUTDIR = process.argv[2] || path.join(__dirname, 'out'), F = n => fs.readFileSync(path.join(D, 'fonts', n));
const mm = v => Math.round(v * 56.6929);             // twips
const pt = v => Math.round(v * 2);                   // half points
const INK = '252F37', SOFT = '666D73', RULE = 'C9CCCF';
const TEN = 'Tenor Sans', OS = 'Open Sans', OSL = 'Open Sans Light', OSS = 'Open Sans SemiBold', OSC = 'Open Sans Condensed';
const SINGLE = { [TEN]: 1.25, [OS]: 1.362, [OSL]: 1.362, [OSS]: 1.362, [OSC]: 1.362 };
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NOB = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };

const run = (text, o = {}) => new TextRun({ text, font: o.font || OS, size: pt(o.size || 10), color: o.color || INK,
  allCaps: o.caps, characterSpacing: o.track, break: o.br });
const lab = (text, o = {}) => run(text, { font: OSS, size: 8, color: o.color || SOFT, caps: true, track: 16, ...o });
// leading in pt -> a multiple of the face's single line (240 = 1.0)
const P = (runs, o = {}) => {
  const font = o.font || OS, size = o.size || 10, lead = o.lead || size * 1.5;
  return new Paragraph({ children: runs, alignment: o.align,
    spacing: { line: Math.max(204, Math.round(240 * lead / (size * SINGLE[font]))), lineRule: LineRuleType.AUTO,
      before: o.before ? Math.round(o.before * 20) : 0, after: o.after ? Math.round(o.after * 20) : 0 },
    border: o.top ? { top: { style: BorderStyle.SINGLE, size: o.top, color: INK, space: 4 } } : undefined,
    run: { font, size: pt(size) } });
};
const cell = (children, w, o = {}) => new TableCell({ children, width: { size: w, type: WidthType.DXA }, borders: o.borders || NOB,
  margins: { top: 0, bottom: o.pb || 0, left: 0, right: o.pr || 0 }, verticalAlign: o.v || VerticalAlign.TOP });
const table = (rows, widths, o = {}) => new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b), type: WidthType.DXA },
  layout: TableLayoutType.FIXED, borders: o.borders || NOB, margins: { top: 0, bottom: 0, left: 0, right: 0 } });
const W = mm(170), L = mm(58), R = mm(112);
const twoCol = (left, right, o = {}) => table([new TableRow({ children: [cell(left, L), cell(right, R)] })], [L, R]);

const SYMBOL = fs.readFileSync(path.join(D, 'symbol-ardosia.png'));
const symbol = w => new ImageRun({ type: 'png', data: SYMBOL, transformation: { width: Math.round(w * 3.7795), height: Math.round(w * 3.7795 * 1045 / 2400) },
  altText: { title: 'Eliria', description: 'O símbolo da Eliria', name: 'simbolo' } });

const header = (w, right) => new Header({ children: [
  table([new TableRow({ children: [cell([P([symbol(w)], { lead: 12 })], W / 2), cell(right ? right : [P([run('')])], W / 2)] })], [W / 2, W / 2])] });
const footer = (left) => new Footer({ children: [
  table([new TableRow({ children: [cell([P([lab(left, { size: 7 })], { size: 7, lead: 10 })], W / 2), cell([P([lab('1 de 1', { size: 7 })], { size: 7, lead: 10, align: AlignmentType.RIGHT })], W / 2)] })], [W / 2, W / 2])] });

const fonts = [
  { name: TEN, data: F('TenorSans-Regular.ttf'), characterSet: '00' },
  { name: OS, data: F('OpenSans-Regular.ttf'), characterSet: '00' },
  { name: OSL, data: F('OpenSans-Light.ttf'), characterSet: '00' },
  { name: OSS, data: F('OpenSans-SemiBold.ttf'), characterSet: '00' },
  { name: OSC, data: F('OpenSans-Condensed.ttf'), characterSet: '00' },
];
const page = { size: { width: mm(210), height: mm(297) }, margin: { top: mm(20), right: mm(20), bottom: mm(23), left: mm(20), header: mm(20), footer: mm(14) } };
const doc = (title, header_, footer_, children) => new Document({
  creator: 'Eliria', title, description: 'Modelo Eliria. Os textos são exemplos.', fonts,
  styles: { default: { document: { run: { font: OS, size: pt(10), color: INK, language: { value: 'pt-BR' } } } } },
  sections: [{ properties: { page, titlePage: false }, headers: { default: header_ }, footers: { default: footer_ }, children }] });

// ── letter ──
const letter = doc('Carta Eliria', header(15, [P([lab('Eliria')], { size: 8, lead: 15, align: AlignmentType.RIGHT }), P([lab('Coleção oficial')], { size: 8, lead: 15, align: AlignmentType.RIGHT })]),
  footer('Carta · EL-C-001'), [
    P([run('Nome Sobrenome')], { before: 66 }), P([run('Empresa Ltda.')]), P([run('Rua Exemplo, 12')]), P([run('01000-000 São Paulo')]),
    twoCol([
      P([lab('Data')], { size: 8, lead: 15, before: 75 }), P([run('20 nov 2026')]),
      P([lab('Referência')], { size: 8, lead: 15, before: 15 }), P([run('EL-C-001')]),
    ], [
      P([run('A coleção oficial de 2026', { font: OSL, size: 15 })], { font: OSL, size: 15, lead: 20, before: 75 }),
      P([run('Obrigado por receber a Eliria. Esta carta confirma a ocasião e a peça escolhida, para que os dois lados tenham por escrito.')], { before: 6 }),
      P([run('Cada peça é gravada com o ano e as iniciais de quem a recebe, e entregue no estojo, com o certificado.')], { before: 15 }),
      P([run('Com estima,')], { before: 45 }),
      P([run('Lia Noleto', { font: OSS })], { font: OSS, before: 30 }), P([lab('Eliria')], { size: 8, lead: 15 }),
    ]),
  ]);

// ── certificate ──
const fW = Math.floor(R / 3);
const field = (k, v) => cell([P([lab(k)], { size: 8, lead: 15 }), P([run(v, { font: OSC, size: 22 })], { font: OSC, size: 22, lead: 30 })], fW, { borders: { top: { style: BorderStyle.SINGLE, size: 6, color: INK }, bottom: NONE, left: NONE, right: NONE } });
const trow = (cells, head) => new TableRow({ children: cells.map((t, i) => cell([P([head ? lab(t) : run(t)], head ? { size: 8, lead: 15 } : {})], [mm(56), mm(33.6), R - mm(56) - mm(33.6)][i],
  { borders: { top: head ? { style: BorderStyle.SINGLE, size: 6, color: INK } : NONE, bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE }, left: NONE, right: NONE } })) });
const cert = doc('Certificado Eliria', header(22), footer('Certificado · EL-K-007'), [
  twoCol([P([lab('Certificado')], { size: 8, lead: 15, before: 128 })], [
    P([run('Coleção oficial 2026', { font: TEN, size: 22, caps: true, track: 18 })], { font: TEN, size: 22, lead: 30, before: 122 }),
    P([run('Esta peça foi gravada e entregue pela Eliria, e é única. O número e o ano abaixo são os mesmos gravados no metal.')], { before: 8 }),
    P([run('')], { lead: 15, after: 15 }),
    table([new TableRow({ children: [field('Peça', 'Nº 007'), field('Ano', '2026'), field('Iniciais', 'N S')].map(c => c) })], [fW, fW, R - 2 * fW],
      { borders: { ...NOB, top: { style: BorderStyle.SINGLE, size: 6, color: INK } } }),
    P([run('')], { lead: 15, after: 10 }),
    table([trow(['Item', 'Material', 'Ano'], true), trow(['Peça', 'A confirmar', '2026']), trow(['Estojo', 'A confirmar', '2026'])], [mm(56), mm(33.6), R - mm(56) - mm(33.6)]),
    P([run('Lia Noleto', { font: OSS })], { font: OSS, before: 60 }), P([lab('Eliria')], { size: 8, lead: 15 }),
  ]),
]);

(async () => {
  for (const [d, n] of [[letter, 'eliria_template_letter_a4'], [cert, 'eliria_template_certificate_a4']]) {
    fs.writeFileSync(path.join(OUTDIR, n + '.docx'), await Packer.toBuffer(d)); console.log('wrote', n);
  }
})();
