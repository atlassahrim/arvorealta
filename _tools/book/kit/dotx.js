// A client's letter, invitation and certificate as Word documents, from the
// book's drawings. Every word, colour, face and the symbol come from
// clients/<code>/client.json; the geometry is the book's and is shared.
// A4, 20 mm top and sides, 23 mm foot; labels hang in a 58 mm column, reading
// text in the 112 mm column to its right. Line spacing is a multiple, never exact.
//   NODE_PATH=$(npm root -g) node kit/dotx.js <code> [outdir]     (build.sh runs it)
const fs = require('fs'), path = require('path');
const { Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, AlignmentType, Header, Footer, LineRuleType, TableLayoutType, VerticalAlign } = require('docx');

const CODE = process.argv[2];
if (!CODE) { console.error('usage: node dotx.js <code> [outdir]'); process.exit(2); }
const C_DIR = path.join(__dirname, '..', 'clients', CODE);
const C = JSON.parse(fs.readFileSync(path.join(C_DIR, 'client.json'), 'utf8'));
const OUTDIR = process.argv[3] || path.join(C_DIR, 'out');
fs.mkdirSync(OUTDIR, { recursive: true });
const F = n => fs.readFileSync(path.join(C_DIR, 'fonts', n));

const mm = v => Math.round(v * 56.6929);             // twips
const pt = v => Math.round(v * 2);                   // half points
const hex = h => h.replace('#', '').toUpperCase();
const byWord = w => C.palette.find(p => p.word === w);
const INK = hex(byWord(C.dark).hex), SOFT = hex(C.doc_soft), RULE = hex(C.doc_rule);

// a face's single line, as a multiple of its size: hhea ascent - descent + gap,
// read off the font, unless client.json states one
function single(file) {
  const b = F(file), n = b.readUInt16BE(4); let upm, a, d, g;
  for (let i = 0; i < n; i++) {
    const o = 12 + 16 * i, tag = b.toString('latin1', o, o + 4), off = b.readUInt32BE(o + 8);
    if (tag === 'head') upm = b.readUInt16BE(off + 18);
    if (tag === 'hhea') { a = b.readInt16BE(off + 4); d = b.readInt16BE(off + 6); g = b.readInt16BE(off + 8); }
  }
  return Math.round((a - d + g) / upm * 1000) / 1000;
}
const FT = C.fonts;
const TEN = FT.title.name, OS = FT.regular.name, OSL = FT.light.name, OSM = FT.medium.name, OSS = FT.semibold.name, OSC = FT.condensed.name;
const SINGLE = Object.fromEntries(Object.values(FT).map(f => [f.name, f.single || single(f.file)]));
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
const LAB = { size: 8, lead: 15 };
const cell = (children, w, o = {}) => new TableCell({ children, width: { size: w, type: WidthType.DXA }, borders: o.borders || NOB,
  margins: { top: 0, bottom: o.pb || 0, left: 0, right: o.pr || 0 }, verticalAlign: o.v || VerticalAlign.TOP });
const table = (rows, widths, o = {}) => new Table({ rows, columnWidths: widths, width: { size: widths.reduce((a, b) => a + b), type: WidthType.DXA },
  layout: TableLayoutType.FIXED, borders: o.borders || NOB, margins: { top: 0, bottom: 0, left: 0, right: 0 } });
const W = mm(170), L = mm(58), R = mm(112);
const INV_BEFORE = 249, INV_GAP = 187.5;   // pt: label at 115 mm and fields at 242 mm, as in the drawing
const twoCol = (left, right) => table([new TableRow({ children: [cell(left, L), cell(right, R)] })], [L, R]);
const TOPRULE = { top: { style: BorderStyle.SINGLE, size: 6, color: INK }, bottom: NONE, left: NONE, right: NONE };

const SYMBOL = F('../' + C.symbol.png);
const RATIO = SYMBOL.readUInt32BE(20) / SYMBOL.readUInt32BE(16);   // PNG height / width
const symbol = w => new ImageRun({ type: 'png', data: SYMBOL, transformation: { width: Math.round(w * 3.7795), height: Math.round(w * 3.7795 * RATIO) },
  altText: { title: C.name, description: C.symbol.alt, name: 'symbol' } });

const header = (w, right) => new Header({ children: [
  table([new TableRow({ children: [cell([P([symbol(w)], { lead: 12 })], W / 2), cell(right ? right : [P([run('')])], W / 2)] })], [W / 2, W / 2])] });
const footer = (left) => new Footer({ children: [
  table([new TableRow({ children: [cell([P([lab(left, { size: 7 })], { size: 7, lead: 10 })], W / 2),
    cell([P([lab(`1 ${C.words.page_of} 1`, { size: 7 })], { size: 7, lead: 10, align: AlignmentType.RIGHT })], W / 2)] })], [W / 2, W / 2])] });

const fonts = Object.values(FT).map(f => ({ name: f.name, data: F(f.file), characterSet: '00' }));
const page = { size: { width: mm(210), height: mm(297) }, margin: { top: mm(20), right: mm(20), bottom: mm(23), left: mm(20), header: mm(20), footer: mm(14) } };
const doc = (title, header_, footer_, children) => new Document({
  creator: C.name, title, description: C.documents.description, fonts,
  styles: { default: { document: { run: { font: OS, size: pt(10), color: INK, language: { value: C.lang } } } } },
  sections: [{ properties: { page, titlePage: false }, headers: { default: header_ }, footers: { default: footer_ }, children }] });
const sign = (s, before) => [P([run(C.signatory.name, { font: OSS })], { font: OSS, before }), P([lab(s.sign_label)], LAB)];

// ── letter ──
const l = C.documents.letter;
const letter = doc(l.title, header(15, l.header.map(t => P([lab(t)], { ...LAB, align: AlignmentType.RIGHT }))), footer(l.foot), [
  ...l.address.map((t, i) => P([run(t)], i ? {} : { before: 66 })),
  twoCol(
    l.fields.flatMap(([k, v], i) => [P([lab(k)], { ...LAB, before: i ? 15 : 75 }), P([run(v)])]),
    [P([run(l.heading, { font: OSL, size: 15 })], { font: OSL, size: 15, lead: 20, before: 75 }),
     ...l.body.map((t, i) => P([run(t)], { before: i ? 15 : 6 })),
     P([run(l.closing)], { before: 45 }),
     ...sign(l, 30)]),
]);

// ── invitation ──
const v = C.documents.invitation, vW = Math.floor(W / 4);
const vfield = (k, x) => cell([P([lab(k)], LAB), P([run(x, { font: OSM })], { font: OSM })], vW, { borders: TOPRULE });
const invite = doc(v.title, header(22), footer(v.foot), [
  P([lab(v.label)], { ...LAB, before: INV_BEFORE }),
  ...v.heading.map(t => P([run(t, { font: TEN, size: 40, caps: true, track: 24 })], { font: TEN, size: 40, lead: 45 })),
  table([new TableRow({ children: [cell([P([run(v.sub, { font: OSL, size: 15 })], { font: OSL, size: 15, lead: 20, before: 18 })], R), cell([P([run('')])], W - R)] })], [R, W - R]),
  P([run('')], { lead: 15, before: INV_GAP }),
  table([new TableRow({ children: v.fields.map(([k, x]) => vfield(k, x)) })], [vW, vW, vW, W - 3 * vW]),
]);

// ── certificate ──
const c = C.documents.certificate, fW = Math.floor(R / 3), TW = [mm(56), mm(33.6), R - mm(56) - mm(33.6)];
const field = (k, x) => cell([P([lab(k)], LAB), P([run(x, { font: OSC, size: 22 })], { font: OSC, size: 22, lead: 30 })], fW, { borders: TOPRULE });
const trow = (cells, head) => new TableRow({ children: cells.map((t, i) => cell([P([head ? lab(t) : run(t)], head ? LAB : {})], TW[i],
  { borders: { top: head ? TOPRULE.top : NONE, bottom: { style: BorderStyle.SINGLE, size: 2, color: RULE }, left: NONE, right: NONE } })) });
const cert = doc(c.title, header(22), footer(c.foot), [
  twoCol([P([lab(c.label)], { ...LAB, before: 128 })], [
    P([run(c.heading, { font: TEN, size: 22, caps: true, track: 18 })], { font: TEN, size: 22, lead: 30, before: 122 }),
    P([run(c.body)], { before: 8 }),
    P([run('')], { lead: 15, after: 15 }),
    table([new TableRow({ children: c.fields.map(([k, x]) => field(k, x)) })], [fW, fW, R - 2 * fW], { borders: { ...NOB, top: TOPRULE.top } }),
    P([run('')], { lead: 15, after: 10 }),
    table(c.table.map((r, i) => trow(r, i === 0)), TW),
    ...sign(c, 60),
  ]),
]);

(async () => {
  for (const [d, n] of [[letter, 'letter'], [invite, 'invitation'], [cert, 'certificate']]) {
    const name = `${C.slug}_template_${n}_a4.docx`;
    fs.writeFileSync(path.join(OUTDIR, name), await Packer.toBuffer(d)); console.log('wrote', name);
  }
})();
