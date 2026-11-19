/* Word editions of the portrait tender documents.

     NODE_PATH=$(npm root -g) node _tools/annex/docx.js
     python3 -I _tools/annex/docx_fix.py annex/_word/*.docx

   Writes annex/_word/:
     reference-annex.docx           the full annex (annex/_template)
     reference-annex-sample.docx    the redacted sample (annex/sample)
     document-review-ENG.docx       the review (annex/_review-template)
     document-review-NOR.docx       the review (annex/_review-template-nb)
     vedlegg-5-vkr.docx             the VKR annex (annex/_vkr-beholdere)

   Same type, sizes and order as the pages, built from Word's own parts:
   styles, sections with their own header and foot, tables, ruled write-in
   lines. Inter and IBM Plex Mono are embedded, because a Word file only
   looks right where its faces are installed or embedded. The strings are
   the pages' own; a change to a page belongs here in the same commit.
   The redacted sample removes the text, it does not cover it: a redaction
   is a run of solid block glyphs that stand for nothing, never a box drawn
   over the real text. */

const fs = require('fs'), path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  BorderStyle, AlignmentType, TabStopType, Header, Footer, PageNumber, ImageRun,
  ShadingType, VerticalAlign, HeightRule, TableLayoutType, LineRuleType,
} = require('docx');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'annex', '_word');
const F = n => fs.readFileSync(path.join(__dirname, 'fonts', n));
const IMG = p => fs.readFileSync(path.join(ROOT, p));

const mm = x => Math.round(x * 56.6929);           // twips
const pt = x => Math.round(x * 2);                  // half-points
const W = mm(170);
const INK = '121212', SOFT = '5C5C5A', RULE = 'D6D6D6', PANEL = 'F1F1EE', RED = 'C7392F';
const SANS = 'Inter', MED = 'Inter Medium', LIGHT = 'Inter Light', MONO = 'IBM Plex Mono', MONOM = 'IBM Plex Mono Medium';
const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NOB = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const HAIR = { style: BorderStyle.SINGLE, size: 4, color: RULE };
const HAIRINK = { style: BorderStyle.SINGLE, size: 4, color: INK };
const HEAVY = { style: BorderStyle.SINGLE, size: 14, color: INK };

/* ---------- type ---------- */
const run = (text, o = {}) => new TextRun({ text, font: o.font || SANS, size: pt(o.size || 9.5), color: o.color || INK, ...o.x });
const lab = (text, o = {}) => new TextRun({ text, font: MONOM, size: pt(7.5), color: o.color || SOFT, allCaps: true, characterSpacing: 18, ...o.x });
const lines = (arr, o) => arr.flatMap((t, i) => [i ? new TextRun({ break: 1 }) : null, ...(typeof t === 'string' ? [run(t, o)] : [].concat(t))].filter(Boolean));
const P = (children, o = {}) => new Paragraph({
  children: typeof children === 'string' ? [run(children, o)] : children,
  spacing: { before: o.before || 0, after: o.after || 0, line: o.line || mm(4.9), lineRule: LineRuleType.EXACT },
  alignment: o.align, keepNext: o.keepNext, keepLines: true, border: o.border, tabStops: o.tabs,
});
const small = (t, o = {}) => P(typeof t === 'string' ? [run(t, { size: 9, color: o.soft ? SOFT : INK })] : t, { line: mm(4.4), ...o });
const label = (t, o = {}) => P([lab(t, o)], { line: mm(4), after: o.after ?? mm(1.5), before: o.before, keepNext: true });
const gap = h => P([run('')], { line: mm(h) });
const red = t => run(t, { color: RED });
// a redaction: solid block glyphs, nothing underneath. Not spaces: a renderer
// drops trailing spaces at the end of a line, shading and all.
const redact = (n, o = {}) => new TextRun({ text: '\u2588'.repeat(Math.max(1, Math.round(n * 0.42))), color: INK, font: o.font || SANS, size: pt(o.size || 9.5), shading: { type: ShadingType.CLEAR, color: 'auto', fill: INK } });

const title = (arr, size = 40, before = 9) => P(lines(arr, { font: MED, size, x: { characterSpacing: Math.round(-size * 0.8) } }),
  { before: mm(before), line: mm(size * 0.3625), keepNext: true });

/* ---------- tables ---------- */
const cell = (children, w, o = {}) => new TableCell({
  children: Array.isArray(children) ? children : [children], width: { size: w, type: WidthType.DXA },
  borders: { top: o.top || NONE, bottom: o.bottom || NONE, left: NONE, right: NONE },
  margins: { top: o.mt ?? 0, bottom: o.mb ?? 0, left: o.ml ?? 0, right: o.mr ?? 0 },
  verticalAlign: o.va || VerticalAlign.TOP, shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
  columnSpan: o.span,
});
const table = (rows, widths, o = {}) => new Table({
  rows, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths,
  borders: NOB, layout: TableLayoutType.FIXED, ...o,
});
const row = (cells, o = {}) => new TableRow({ children: cells, cantSplit: true,
  height: o.h ? { value: o.h, rule: o.exact ? HeightRule.EXACT : HeightRule.ATLEAST } : undefined, tableHeader: o.head });
// side by side blocks with a gutter
const cols = (blocks, ratios, gutter = 10) => {
  const g = mm(gutter), tot = ratios.reduce((a, b) => a + b, 0), free = W - g * (blocks.length - 1);
  const ws = ratios.map(r => Math.floor(free * r / tot)); ws[ws.length - 1] += free - ws.reduce((a, b) => a + b, 0);
  const widths = [], cells = [];
  blocks.forEach((b, i) => { widths.push(ws[i]); cells.push(cell(b, ws[i])); if (i < blocks.length - 1) { widths.push(g); cells.push(cell(P(''), g)); } });
  return table([row(cells)], widths);
};
// data table: a rule under the head, a heavy rule over the total, nothing per row
const data = (head, rows, widths, o = {}) => {
  const r = o.right || [], tot = o.total;
  const tr = (vals, kind) => row(vals.map((v, i) => cell(
    P(kind === 'head' ? [lab(v)] : (typeof v === 'string' ? [run(v, { font: kind === 'total' ? MED : SANS, color: o.soft && i > 0 && kind !== 'total' ? SOFT : INK })] : v),
      { align: r.includes(i) ? AlignmentType.RIGHT : AlignmentType.LEFT, line: kind === 'head' ? mm(4.9) : mm(4.9) }),
    widths[i], { bottom: kind === 'head' ? HAIR : NONE, top: kind === 'total' ? HAIRINK : NONE,
      mt: kind === 'head' ? 0 : mm(kind === 'first' || kind === 'total' ? 2 : 1), mb: kind === 'head' ? mm(2) : mm(1) })), { head: kind === 'head' });
  const out = [];
  if (head) out.push(tr(head, 'head'));
  rows.forEach((v, i) => out.push(tr(v, i === 0 && head ? 'first' : 'body')));
  if (tot) out.push(tr(tot, 'total'));
  return table(out, widths);
};
// write-in table: header labels, then ruled rows to fill
const fill = (head, rows, widths, h = 6.4) => table([
  row(head.map((t, i) => cell(P([lab(t)], { line: mm(4) }), widths[i], { bottom: HAIR, mb: mm(1.5), mr: mm(2) })), { head: true }),
  ...rows.map(r => row(r.map((t, i) => cell(P(t ? [run(t, { font: i === 0 && /^\d+$/.test(t) ? MONO : SANS, size: i === 0 && /^\d+$/.test(t) ? 8.5 : 9.5, color: i === 0 && /^\d+$/.test(t) ? SOFT : INK })] : [run('')]),
    widths[i], { bottom: HAIR, va: VerticalAlign.CENTER, mr: mm(2) })), { h: mm(h) })),
], widths);
// signature or field lines: air above for the pen, the rule, the label under it
const fields = (labels, ratios, o = {}) => {
  const g = mm(5), tot = (ratios || labels.map(() => 1)).reduce((a, b) => a + b, 0), free = W - (o.inset || 0) - g * (labels.length - 1);
  const ws = (ratios || labels.map(() => 1)).map(r => Math.floor(free * r / tot)); ws[ws.length - 1] += free - ws.reduce((a, b) => a + b, 0);
  const widths = [], cells = [];
  labels.forEach((t, i) => {
    widths.push(ws[i]);
    const filled = o.filled ? [P([redact(o.filled[i] || 18)], { line: mm(4.5), after: mm(1) })] : [gap(o.air || 9)];
    cells.push(cell([...filled, P([lab(t)], { line: mm(4), border: { top: { ...HAIRINK, space: 3 } } })], ws[i]));
    if (i < labels.length - 1) { widths.push(g); cells.push(cell(P(''), g)); }
  });
  return table([row(cells)], widths);
};
// a heavy rule a block hangs from
const heavy = (before = 6) => P([run('')], { before: mm(before), line: mm(1), border: { bottom: { ...HEAVY, space: 1 } } });

/* ---------- sheets ---------- */
const head = (left, ref) => new Header({ children: [P([lab(left, { color: INK }), new TextRun({ text: '\t' }), run(ref, { font: MONO, size: 10 })],
  { line: mm(4.5), tabs: [{ type: TabStopType.RIGHT, position: W }], border: { bottom: { ...HEAVY, space: 6 } } })] });
const foot = (left, right, word = 'Sheet', of = 'of', two = false) => new Footer({ children: [P([
  lab(left), new TextRun({ text: two ? '  ·  ' : '\t' }),
  ...[`${word} `, PageNumber.CURRENT, ` ${of} `, PageNumber.TOTAL_PAGES].map(c => new TextRun({ children: [c], font: MONOM, size: pt(7.5), color: SOFT, allCaps: true, characterSpacing: 18 })),
  new TextRun({ text: '\t' }), lab(right)],
  { line: mm(4), tabs: two ? [{ type: TabStopType.RIGHT, position: W }] : [{ type: TabStopType.CENTER, position: Math.round(W / 2) }, { type: TabStopType.RIGHT, position: W }] })] });
const sheet = (h, f, children) => ({
  properties: { page: { size: { width: mm(210), height: mm(297) }, margin: { top: mm(28), bottom: mm(24), left: mm(20), right: mm(20), header: mm(14), footer: mm(11) } } },
  headers: { default: h }, footers: { default: f }, children,
});
const doc = (lang, sections, ttl) => new Document({
  creator: '', lastModifiedBy: '', title: ttl, description: '',
  fonts: [
    { name: SANS, data: F('inter-400.ttf'), characterSet: '00' },
    { name: MED, data: F('inter-500.ttf'), characterSet: '00' },
    { name: LIGHT, data: F('inter-300.ttf'), characterSet: '00' },
    { name: MONO, data: F('mono-400.ttf'), characterSet: '00' },
    { name: MONOM, data: F('mono-500.ttf'), characterSet: '00' },
  ],
  styles: { default: { document: { run: { font: SANS, size: pt(9.5), color: INK, language: { value: lang } }, paragraph: { spacing: { line: mm(4.9), lineRule: LineRuleType.EXACT } } } } },
  sections,
});
const img = (file, wmm, hmm, type = 'jpg') => new ImageRun({ type, data: IMG(file), transformation: { width: Math.round(wmm * 3.7795), height: Math.round(hmm * 3.7795) } });
const withheld = (what, wmm, hmm) => table([row([cell(P([lab(what)], { align: AlignmentType.CENTER, line: mm(4) }), mm(wmm), { fill: PANEL, va: VerticalAlign.CENTER })], { h: mm(hmm), exact: true })], [mm(wmm)]);

/* ================= the reference annex, full and redacted ================= */
function annex(sample) {
  const R = (t, n) => sample ? redact(n || Math.round(t.length * 1.1)) : run(t);
  const Rv = (t, n, o) => sample ? redact(n, o) : run(t, o);
  const footR = sample ? 'Redacted sample' : 'Framework NRV-2023-0148';
  const f = foot('1322/2026', footR);

  const s1 = [
    title(['Steel planter units.', 'Four year framework,', sample ? [redact(40, { size: 28, font: MED }), run('.', { font: MED, size: 40 })] : 'City of Norrvik.']),
    gap(5),
    cols([
      [P([run('Planter and planter-bench units in structural steel, bolted rather than welded on site, so a damaged panel is replaced as a single part without removing the frame or disturbing the planting.', { size: 13 })], { line: mm(6.4) })],
      [sample ? withheld('Drawing withheld', 98, 54) : P([img('_tools/annex/img/drawing.jpg', 98, 54)], { line: mm(54) })],
    ], [72 - 8, 98], 8),
    gap(6),
    cols([
      [data(['Specification', 'Standard'], [['Structural steel S355J2', 'EN 10025-2'], ['CE marked fabrication, EXC2', 'EN 1090-1'], ['Welding quality', 'EN ISO 3834-2'], ['Hot dip galvanised', 'EN ISO 1461'], ['Powder coat finish', 'RAL 7024']], [mm(56), mm(36)])],
      [label('Case'), small(`A four year framework for street and park planters across ${sample ? 'a' : 'the'} city centre and three district parks, ordered in batches against a fixed catalogue. The award weighted whole life cost, corrosion protection and delivery reliability, which is certified on sheet 2.`),
       gap(4),
       table([['Framework', 'NRV-2023-0148', 13], ['TED', '2023/S 000-000000', 17], ['CPV', '34928400', 0]].map(([k, v, n]) => row([
         cell(P([lab(k)], { line: mm(4.4) }), mm(24)), cell(P([n && sample ? redact(n, { font: MONO, size: 8.5 }) : run(v, { font: MONO, size: 8.5 })], { line: mm(4.4) }), mm(44))])), [mm(24), mm(44)])],
    ], [92, 68], 10),
    gap(5),
    sample ? withheld('Photograph withheld', 170, 30) : P([img('_tools/annex/img/photo.jpg', 170, 30)], { line: mm(30) }),
    cols([
      [small([run('1  ', { font: MONOM, size: 7.5 }), run('Unit geometry. Plate edges and bolted fixings.', { size: 9, color: SOFT })])],
      [small([run('2  ', { font: MONOM, size: 7.5 }), run(`Installed unit, ${sample ? '' : 'Norrvik, '}2024.`, { size: 9, color: SOFT })])],
    ], [1, 1], 10),
    heavy(5),
    cols([
      [label('Value delivered, 2023-2025', { before: mm(2) }), P([run('EUR ', { font: MONOM, size: 9, color: SOFT }), sample ? redact(20, { size: 20 }) : run('612,400', { font: LIGHT, size: 32 })], { line: mm(11) })],
      [gap(2), table([['Recipient', 'City of Norrvik', true], ['Framework', '2023-2027'], ['Certificate', 'Sheet 2']].map(([k, v, star]) => row([
        cell(P([lab(k), ...(star ? [red('*')] : [])], { line: mm(5.8) }), mm(30)),
        cell(P([star && sample ? redact(18, { size: 11 }) : run(v, { size: 11 })], { line: mm(5.8), align: AlignmentType.RIGHT }), mm(50))])), [mm(30), mm(50)])],
    ], [1, 1], 10),
    P([red('* '), run('Public or private, per Dir. 2014/24/EU, Annex XII Part II(a).' + (sample ? '' : ' Framework ceiling EUR 1,480,000.'), { size: 9, color: SOFT })], { before: mm(3), line: mm(4.4) }),
  ];

  const sigR = sample
    ? [fields(['Signed for the recipient', 'Name and position'], [1, 1], { inset: mm(14), filled: [34, 22] }), gap(3), fields(['Date', 'Contact for verification'], [1, 2], { inset: mm(14), filled: [14, 46] })]
    : [fields(['Signed for the recipient', 'Name and position'], [1, 1], { inset: mm(14) }), gap(1), fields(['Date', 'Contact for verification'], [1, 2], { inset: mm(14), air: 7 })];
  const s2 = [
    title(['Certificate of', 'satisfactory delivery.']),
    gap(9),
    table([row([['Framework', 'NRV-2023-0148', 14], ['Period', '2023-2025', 0], ['Recipient', 'City of Norrvik', 14], ['Supplier', '', -1]].map(([k, v, n], i) => cell([
      label(k), n === -1 ? (sample ? P([redact(14, { size: 12.5 })], { line: mm(6) }) : P([run('')], { line: mm(6), border: { bottom: { ...HAIRINK, space: 1 } } }))
        : P([n && sample ? redact(n, { size: 12.5 }) : run(v, { size: 12.5 })], { line: mm(6) })], i < 3 ? mm(42.5) : mm(42.5), { mr: i < 3 ? mm(5) : 0 })))],
      [mm(42.5), mm(42.5), mm(42.5), mm(42.5)]),
    P([run('Annex XII Part II(a) asks for a list of principal deliveries over the past three years, with values, dates and recipients, and evidence that they were delivered. Put this form in front of the recipient at handover: a signature obtained on the day is worth more than a request sent two years later.', { size: 11 })], { before: mm(9), line: mm(5.6) }),
    P([lab('Variant'), run('   For works rather than supplies, change the heading to satisfactory execution and the period to five years.', { size: 9, color: SOFT })], { before: mm(2.5), line: mm(4.4) }),
    gap(8),
    cols([
      [data(['Batch', 'Year', 'Units', 'EUR'], [['01', '2023', '96', sample ? [redact(9)] : '172,800'], ['02', '2024', '128', sample ? [redact(9)] : '230,400'], ['03', '2025', '116', sample ? [redact(9)] : '209,200']],
        [mm(18), mm(20), mm(18), mm(24)], { right: [2, 3], total: ['Total', '', '340', sample ? [redact(9)] : '612,400'] })],
      [data(['Particulars', ''], [['Units delivered', '340'], ['Material', 'S355J2'], ['Galvanising', 'EN ISO 1461'], ['Coating', 'RAL 7024'], ['Delivery windows', '18 of 18']], [mm(40), mm(40)], { right: [1] })],
    ], [1, 1], 10),
    gap(8),
    table([row([cell([
      label(sample ? 'Declaration, completed by the recipient' : 'Declaration, to be completed by the recipient', { color: INK }),
      P('We confirm that the deliveries listed above were made by the supplier named below, in the quantities and on the dates stated, and that they were accepted without outstanding defect.', { before: mm(1) }),
      ...sigR,
    ], W, { fill: PANEL, mt: mm(6), mb: mm(6), ml: mm(7), mr: mm(7) })])], [W]),
    heavy(10),
    label('Supplier, completed by the supplier', { before: mm(3) }),
    sample ? fields(['Company name', 'Address', 'Business ID', 'Contact'], null, { filled: [16, 16, 10, 10] }) : fields(['Company name', 'Address', 'Business ID', 'Contact'], null, { air: 7 }),
  ];
  return doc('en-GB', [
    sheet(head('Annex 04  ·  Reference project', '1322/2026'), f, s1),
    sheet(head('Certificate  ·  Annex 04, sheet 2', '1322/2026'), f, s2),
  ], sample ? 'Reference project annex, redacted sample' : 'Reference project annex 1322/2026');
}

/* ================= the document review, two editions ================= */
function review(L) {
  const f1 = foot('DR-0NN', L.foot1, L.sheet, L.of, true), f2 = foot('DR-0NN', L.foot2, L.sheet, L.of, true);
  const count = cols(L.counts.map(([k, note]) => [label(k), P([run('00', { font: LIGHT, size: 72, x: { characterSpacing: -60 } })], { line: mm(26) }), small(note, { soft: true })]), [1, 1, 1], 8);
  const s1 = [
    title(L.title),
    P([run(L.lede, { size: 13 })], { before: mm(9), line: mm(6.4) }),
    P([run('')], { before: mm(12), line: mm(1), border: { bottom: { ...HAIR, space: 1 } } }),
    gap(3), count,
    gap(12),
    cols([
      [label(L.method), small(L.m1), small([run(L.b[0], { font: MED, size: 9 }), run(L.m2[0], { size: 9 }), run(L.b[1], { font: MED, size: 9 }), run(L.m2[1], { size: 9 }), run(L.b[2], { font: MED, size: 9 }), run(L.m2[2], { size: 9 })], { before: mm(2.4) })],
      [data([L.doc, ''], L.docRows, [mm(30), mm(38)], { right: [1] })],
    ], [92, 68], 10),
    heavy(14),
    small(L.note, { soft: true, before: mm(2.5) }),
  ];
  const fig = n => P([new ImageRun({ type: 'png', data: IMG(`annex/_review-template/fig-0${n}.png`), transformation: (() => { const s = { 1: [1341, 320], 2: [747, 173], 3: [673, 295], 4: [480, 226] }[n]; const w = 62 * 3.7795, h = Math.min(38 * 3.7795, w * s[1] / s[0]); return { width: Math.round(h * s[0] / s[1] > w ? w : h * s[0] / s[1]), height: Math.round(Math.min(h, w * s[1] / s[0])) }; })() })], { line: mm(38), align: AlignmentType.CENTER });
  const find = n => table([row([
    cell(P([run(String(n).padStart(2, '0'), { font: LIGHT, size: 22 })], { line: mm(9) }), mm(16)),
    cell(P(''), mm(6)),
    cell(fig(n), mm(62), { fill: PANEL }),
    cell(P(''), mm(6)),
    cell([P([run(L.claim, { font: MED, size: 12.5 })], { line: mm(6) }), P([lab(`Krav [[n]]  ·  ${L.weight}`)], { line: mm(4), before: mm(1) }),
      P([run(L.quote, { font: MONO, size: 8.5 })], { before: mm(2.5), line: mm(4.4) }), small(L.does, { before: mm(2) })], mm(80)),
  ], {})], [mm(16), mm(6), mm(62), mm(6), mm(80)], { borders: { ...NOB, top: HAIR } });
  const s2 = [title(L.title2), gap(8), ...[1, 2, 3, 4].flatMap(n => [find(n), gap(n < 4 ? 5 : 0)]), heavy(12), P(L.closing, { before: mm(2.5) })];
  return doc(L.lang, [sheet(head(L.top1, 'DR-0NN'), f1, s1), sheet(head(L.top2, 'DR-0NN'), f2, s2)], L.docTitle);
}
const EN = {
  lang: 'en-GB', sheet: 'Sheet', of: 'of', docTitle: 'Document review DR-0NN',
  top1: 'Document review  ·  [[REVIEW DATE]]', top2: 'Findings  ·  Review, sheet 2',
  foot1: 'Bilag 2 / Doffin [[notice]]', foot2: 'Arvorealta.com · Tier zero, free review',
  title: ['Product datasheet', '[[PRODUCT]], read as', 'a tender attachment.'],
  lede: 'The current published datasheet was read against the requirement specification in Bilag 2, requirement by requirement. Nothing here is a score. The buyer scores.',
  counts: [['Answered', 'Krav [[list]]. [[What they cover, one phrase.]]'], ['Partial', 'Krav [[list]]. [[Why each is only partial.]]'], ['Absent', 'Krav [[list]]. [[The one thing worth saying.]]']],
  method: 'Method', m1: 'Bilag 2 sets sixty numbered requirements. Twenty-six ask for a delivery plan, an option price or a complaints procedure, which no product datasheet answers. Thirty-four remain.',
  b: ['Answered', 'Partial', 'Absent'], m2: [' means the document states the thing the buyer asks for. ', ' means close but off the point. ', ' means there is nothing to point at.'],
  doc: 'Document', docRows: [['Product', '[[PRODUCT]]'], ['File dated', '[[YYYY]]'], ['Pages', '[[N]]'], ['In scope', '34 of 60']],
  note: 'Scored as one document. [[What the rest of the published set is, and whether the absences hold across it. Only sayable because the family was checked.]]',
  title2: ['Four things an', 'evaluator meets first.'], claim: '[[Claim, max 38 characters.]]', weight: '[[Weight of 100]]',
  quote: '«[[The requirement, verbatim. Max 80 characters.]]»', does: '[[What the document does about it. Max 90 characters.]]',
  closing: '[[One closing line. Something true that is not a finding.]]',
};
const NB = {
  lang: 'nb-NO', sheet: 'Ark', of: 'av', docTitle: 'Dokumentgjennomgang DR-0NN',
  top1: 'Dokumentgjennomgang  ·  [[DATO]]', top2: 'Funn  ·  Gjennomgang, ark 2',
  foot1: 'Bilag 2 / Doffin [[kunngjøring]]', foot2: 'Arvorealta.com · Trinn null, gratis gjennomgang',
  title: ['Produktdatablad', '[[PRODUKT]], lest som', 'vedlegg til tilbudet.'],
  lede: 'Det gjeldende publiserte databladet er lest mot kravspesifikasjonen i Bilag 2, krav for krav. Ingenting her er en poengsetting. Det er oppdragsgiver som gir poeng.',
  counts: [['Besvart', 'Krav [[liste]]. [[Hva de dekker, én frase.]]'], ['Delvis', 'Krav [[liste]]. [[Hvorfor hver er delvis.]]'], ['Mangler', 'Krav [[liste]]. [[Det ene som er verdt å si.]]']],
  method: 'Metode', m1: 'Bilag 2 stiller seksti nummererte krav. Tjueseks gjelder leveranseplan, opsjonspris eller reklamasjonsprosedyre, som intet produktdatablad besvarer. Trettifire gjenstår.',
  b: ['Besvart', 'Delvis', 'Mangler'], m2: [' betyr at dokumentet oppgir det oppdragsgiver spør om. ', ' betyr nær, men ikke på poenget. ', ' betyr at det ikke finnes noe å peke på.'],
  doc: 'Dokument', docRows: [['Produkt', '[[PRODUKT]]'], ['Filen datert', '[[ÅÅÅÅ fra pdfinfo]]'], ['Sider', '[[N]]'], ['Vurdert', '34 av 60']],
  note: 'Vurdert som ett dokument. [[Hva resten av det publiserte settet er, og om manglene gjelder hele serien.]]',
  title2: ['Fire ting en', 'evaluator ser først.'], claim: '[[Påstand, maks 38 tegn.]]', weight: '[[vekt av 100]]',
  quote: '«[[Kravet, ordrett. Maks 80 tegn.]]»', does: '[[Hva dokumentet gjør med det. Maks 90 tegn.]]',
  closing: '[[Én avsluttende linje. Noe sant som ikke er et funn.]]',
};

/* ================= the VKR annex, five sheets ================= */
function vkr() {
  const f = foot('Vedlegg 5', 'Rammeavtale avfallsbeholdere VKR', 'Ark', 'av');
  const sub = (n, t) => P([run(n + '   ', { font: MONOM, size: 7.5, color: SOFT }), run(t, { font: MED, size: 11 })], { before: mm(8), after: mm(2.5), line: mm(5), keepNext: true });
  const sec = arr => title(arr, 30, 7);
  const E = '';
  const W4 = [mm(12), mm(94), mm(18), mm(46)];
  const s1 = [
    title(['Utfyllende', 'opplysninger', 'om leveransen.']),
    gap(8),
    cols([
      [P([run('Mal for vedlegg 5 i konkurransen om rammeavtale for avfallsbeholdere, Valdres Kommunale Renovasjon IKS. Dokumentet er bygd etter tildelingskriteriene i konkurransegrunnlaget punkt 4.1. Hver seksjon svarer til ett delkriterium og bærer vekten sin i marg.', { size: 13 })], { line: mm(6.4) })],
      [P([run('')], { line: mm(1), border: { bottom: { ...HAIR, space: 1 } } }), P([run('65', { font: LIGHT, size: 72, x: { characterSpacing: -60 } }), run(' %', { font: LIGHT, size: 28 })], { before: mm(2), line: mm(24) }),
       small('av vekten ligger i vedlegg 5. Det betyr at 65 prosent av vekten hviler på et dokument oppdragsgiver ikke gir noen form for.', { before: mm(1) })],
    ], [1.35, 1], 10),
    gap(5),
    cols([
      [label('Hvorfor dokumentet finnes'), small([run('Bilag 2 og bilag 3 er utlevert som ferdige skjema. Vedlegg 5 er ikke det. Det er listet som eget dokument i tilbyders egen vedleggsoversikt i bilag 3 punkt 4, og det er etterspurt under både kriterium 2 og kriterium 3 som ', { size: 9 }), run('utfyllende beskrivelse av leveransen utover det som går fram av kravspesifikasjon', { size: 9, x: { italics: true } }), run('.', { size: 9 })])],
      [label('Slik er malen bygd'), small('Evalueringen gir 0 til 10 poeng per delkriterium etter beste faglige skjønn, jf. punkt 4.2. Beste tilbyder innen hvert delkriterium får 10, og de øvrige vurderes skjønnsmessig mot den. Poeng settes altså delkriterium for delkriterium. Dokumentet følger derfor samme rekkefølge som punkt 4.1, med vekten trykt på hver seksjon, slik at den som vurderer finner hvert scorede punkt uten å lete.'),
       small('Gule felt i originalskjemaene fylles ut der. Her fylles bare det som ikke har noen rubrikk.', { soft: true, before: mm(2.4) })],
    ], [1, 1], 10),
    gap(5),
    data(['Seksjon', 'Innhold og vekt, delkriterium punkt 4.1', 'Vekt'], [['1', '2.1 Kvalitet og funksjonalitet', '30 %'], ['2', '2.2 Leveringstid og leveringsplan', '5 %'], ['3', '3.1 Levetid og reparerbarhet', '10 %'], ['4', '3.2 Forpliktende minimumsandel PCR', '10 %'], ['5', '3.3 Øvrige klima- og miljøtiltak', '10 %'], ['—', '1.1 Vektet tilbudssum, føres i bilag 3 prisskjema 2.7', '35 %']],
      [mm(25), mm(125), mm(20)], { right: [2], total: ['Sum', '', '100 %'] }),
    heavy(5),
    small('Malen er en struktur, ikke et ferdig svar. Den sier hvor opplysningene hører hjemme og hvilket delkriterium de scores mot. Innholdet er tilbyders eget.', { soft: true, before: mm(3) }),
  ];
  const s2 = [sec(['Kvalitet og funksjonalitet.']),
    sub('1.1', 'Oppfyllelse av B-krav'),
    fill(['Krav', 'Gjelder', 'Oppfylt', 'Dokumentasjon'], [['6', 'Sertifisering RAL-GZ951/1 eller tilsvarende'], ['9', 'Motstandsdyktighet varme, frost, kjemikalier, sol, luft'], ['13', '370 l beholder levert'], ['16', 'Gripeavstand utover EN 840'], ['19', 'Samme hjul og akslinger for 140, 240 og 360 l'], ['21', 'Demonterbare akslinger og hjul for gjenbruk'], ['24', 'Lokkbytte uten skade på fester'], ['25', 'Felles lokkplugger for alle tohjuls beholdere'], ['27', 'Støydemping i lokk'], ['36', 'Reservedeler innen 8 uker'], ['37', '20 til 30 stk tohjuls innen 4 uker'], ['46', 'Produksjonsår og femsifret nummer preget'], ['56', 'Lokk med hjørnemerke, frivillig opsjon'], ['58', 'Fabrikkgaranti, omfang og varighet']].map(r => [...r, E, E]), W4),
    sub('1.2', 'Robusthet, slik vareprøven vil vise den'), fields(['Egenvekt, 140 l', 'Sertifisert vektbelastning', 'Veggtykkelse, kropp', 'Hjuldiameter, tohjuls']),
    sub('1.3', 'Ergonomi'), fields(['Gripeavstand, målt', 'Trillemotstand', 'Lokk, åpningskraft', 'Tid, bytte av lokk']),
    sub('1.4', 'Merverdier utover minstekravene'), fill(['Merverdi', 'Går utover krav nr.', 'Konkret effekt for VKR', 'Dokumentasjon'], [[E, E, E, E], [E, E, E, E]], [mm(42.5), mm(42.5), mm(42.5), mm(42.5)], 8),
  ];
  const s3 = [sec(['Leveringstid', 'og leveringsplan.']),
    sub('2.1', 'Hovedleveransen'), fields(['Leveringstid, uker fra bestilling', 'Antall delleveranser', 'Volum per delleveranse', 'Siste leveranse']),
    sub('2.2', 'Leveringssikkerhet'), fill(['Forhold', 'Kapasitet eller ordning', 'Dokumentasjon'], ['Produksjonskapasitet, enheter per uke', 'Lagerhold ved kontraktsoppstart', 'Transportløsning til Fagernes', 'Tiltak ved forsinkelse'].map(t => [t, E, E]), [mm(72), mm(52), mm(46)], 8),
    sub('2.3', 'Avrop ved suppleringsleveranser'), fields(['Bestillingskanal', 'Bekreftelse, frist', 'Leveringstid, normal', 'Kontaktpunkt']),
  ];
  const s4 = [sec(['Levetid og reparerbarhet.']),
    sub('3.1', 'Garanti'), fill(['Komponent', 'Garantitid', 'Omfang', 'Unntak'], ['Beholderkropp', 'Lokk', 'Hjul og akslinger', 'Gravitasjonslås, opsjon'].map(t => [t, E, E, E]), [mm(46), mm(30), mm(47), mm(47)], 8),
    sub('3.2', 'Reservedeler og slitedeler'), fill(['Del', 'Leveringstid', 'Garantert tilgang, år', 'Skiftes uten verktøy'], ['Lokk med plugger', 'Hjulsett', 'Hjulaksling', 'Lokkplugger'].map(t => [t, E, E, E]), [mm(46), mm(30), mm(47), mm(47)], 8),
    sub('3.3', 'Reklamasjon'), fill(['Aksepteres som reklamasjon', 'Aksepteres ikke'], [[E, E], [E, E], [E, E]], [mm(85), mm(85)], 8),
  ];
  const s5 = [sec(['PCR-andel.', 'Øvrige klima- og miljøtiltak.']),
    sub('4.1', 'Forpliktende minimumsandel PCR'), fill(['Komponent', 'Minimum PCR, vekt-%', 'Dokumentasjon'], ['Beholderkropp', 'Lokk', 'Hjul'].map(t => [t, E, E]), [mm(46), mm(40), mm(84)], 8),
    fields(['Total andel PCR, forpliktende minimum', 'Verifisert av', 'Sertifikatnummer', 'Gyldig til']),
    sub('5.1', 'Øvrige tiltak'), fill(['Tiltak', 'Verdi', 'Forpliktende', 'Verifikasjon'], ['Klimafotavtrykk per beholder', 'EPD eller tilsvarende', 'Andel fornybar energi i produksjonen', 'Transportløsning til Fagernes', 'Retur og gjenvinning av utrangerte beholdere', 'PCR-andel i emballasje'].map(t => [t, E, E, E]), [mm(84), mm(28), mm(29), mm(29)], 8),
    sub('5.2', 'REACH og stoffinnhold'), fields(['SVHC over 0,1 vekt-%', 'Fargestoff, tungmetallfritt', 'Erklæring datert', 'Utstedt av']),
    heavy(12), label('Tilbyder', { before: mm(3) }), fields(['Firmanavn', 'Organisasjonsnummer', 'Kontaktperson', 'Dato'], null, { air: 7 }),
  ];
  return doc('nb-NO', [
    sheet(head('Utfyllende opplysninger om leveransen', 'Vedlegg 5'), f, s1),
    sheet(head('Seksjon 1  ·  Delkriterium 2.1', 'Vekt 30 %'), f, s2),
    sheet(head('Seksjon 2  ·  Delkriterium 2.2', 'Vekt 5 %'), f, s3),
    sheet(head('Seksjon 3  ·  Delkriterium 3.1', 'Vekt 10 %'), f, s4),
    sheet(head('Seksjon 4 og 5  ·  Delkriterium 3.2 og 3.3', 'Vekt 10 % og 10 %'), f, s5),
  ], 'Utfyllende opplysninger om leveransen, VKR beholdere');
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const [name, d] of [['reference-annex.docx', annex(false)], ['reference-annex-sample.docx', annex(true)],
    ['document-review-ENG.docx', review(EN)], ['document-review-NOR.docx', review(NB)], ['vedlegg-5-vkr.docx', vkr()]]) {
    fs.writeFileSync(path.join(OUT, name), await Packer.toBuffer(d));
    console.log(name);
  }
})();
