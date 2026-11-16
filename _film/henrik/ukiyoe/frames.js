// The Same Water: three ukiyo-e styleframes, coloured from the owner's fish reference.
import { W, H, FR, mk, buildTextures, TX, inkify, carve, fillPath, bokashi, kasumi, wob, smooth, dense, sealCanvas, rgba, mix } from './print.js';
import { mulberry, clamp, lerp, TAU } from './lib.js';
const F = +(new URLSearchParams(location.search).get('f') || 1);
// pigment set sampled by eye from the fish reference
const PAL_ = {}; const P = { paper:'#ece2ca', ind:'#0f2b55', indD:'#0a1f3f', blue:'#1d4c85', mid:'#3c7ec3', pale:'#9cc7e6', paleL:'#c9dfec',
  gold:'#bd9059', goldL:'#dcb984', goldD:'#7a5a2e', orange:'#d9591e', orangeL:'#f0a060', sumi:'#14192a', sumiL:'#3a4152' };
Object.assign(PAL_, P); await document.fonts.load('400 40px "EB Garamond"'); await document.fonts.load('italic 400 40px "EB Garamond"');
buildTextures();
const c = document.getElementById('c'), out = c.getContext('2d');
// blocks: each colour group its own canvas, printed slightly out of register
const B = { blue: mk(), pale: mk(), gold: mk(), red: mk(), key: mk() };
const X = Object.fromEntries(Object.entries(B).map(([k, v]) => [k, v.getContext('2d')]));
const REG = { pale: [-1.6, 1.4], blue: [2.2, -1.3], gold: [-1.8, 1.9], red: [1.5, 2.2], key: [0, 0] };
let R = mulberry(17 + F * 7);
// straight key line (the engine's line() smooths corners into curves)
function line(x, pts, w = 2.6, col = P.sumi) { x.strokeStyle = col; x.lineWidth = w; x.lineCap = 'round'; x.lineJoin = 'round'; x.beginPath(); pts.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke(); }
// a printed colour sits on bare paper: clear the other blocks under it
function knock(keys, draw) { for (const k of keys) { const x = X[k]; x.save(); x.globalCompositeOperation = 'destination-out'; x.fillStyle = '#000'; x.beginPath(); draw(x); x.fill(); x.restore(); } }

// —— a woodblock fish: flat blue back, paper belly, gold head and fins, orange eye, carved key line ——
function fish(cx, cy, len, ang, dir = 1, bend = .2) {
  const hw = len * .14;
  const w = u => hw * Math.pow(Math.sin(Math.PI * Math.pow(clamp(u * 1.06), .8)), .85) * (u > .84 ? lerp(1, .32, (u - .84) / .16) : 1);
  const pt = (u, v) => { v = v > 0 ? v * .82 : v; const lx = (u - .5) * len * dir, ly = v + bend * len * Math.pow(u - .3, 2) * .3;
    const ca = Math.cos(ang), sa = Math.sin(ang); return [cx + lx * ca - ly * sa, cy + lx * sa + ly * ca]; };
  const edge = (fn, u0 = 0, u1 = 1, n = 40) => { const a = []; for (let i = 0; i <= n; i++) { const u = lerp(u0, u1, i / n); a.push(pt(u, fn(u))); } return a; };
  const body = [...edge(u => -w(u)), ...edge(u => w(u)).reverse()];
  const back = [...edge(u => -w(u), .2, 1), ...edge(u => -w(u) * .02, .2, 1).reverse()];
  // fins and tail (gold block, key-lined rays)
  const fin = (u0, u1, side, reach) => { const p = [pt(u0, side * w(u0) * .9)]; for (let k = 0; k <= 8; k++) { const t = k / 8, u = lerp(u0, u1, t) + (u1 - u0) * .7; p.push(pt(u, side * (w(lerp(u0, u1, t)) + reach * Math.sin(Math.PI * (t * .8 + .15))))); } p.push(pt(u1, side * w(u1) * .9)); return p; };
  const fins = [fin(.4, .56, -1, hw * 1.2), fin(.52, .64, 1, hw * .85), fin(.27, .36, 1, hw * .8)];
  const tail = [pt(.92, -hw * .12), pt(1.13, -hw * 1.2), pt(1.07, 0), pt(1.13, hw * 1.2), pt(.92, hw * .12)];
  knock(['blue', 'pale'], x => { for (const f of [...fins, tail, body]) smooth(x, f, true); });
  for (const f of [...fins, tail]) { X.gold.fillStyle = P.gold; X.gold.beginPath(); smooth(X.gold, f, true); X.gold.fill(); }
  for (const f of [...fins, tail]) { const n = f.length; for (let k = 1; k < n - 1; k++) line(X.key, [f[0], f[k]], 1.2, P.goldD); }
  for (let k = -6; k <= 6; k++) line(X.key, [pt(.93, k * hw * .015), pt(1.1 + .03 * Math.cos(k / 2), k * hw * .17)], 1.2, P.goldD);
  // belly is paper: knock the other blocks out under the body
  for (const k of ['pale', 'blue', 'gold']) { X[k].save(); X[k].globalCompositeOperation = 'destination-out'; X[k].beginPath(); smooth(X[k], body, true); X[k].fill(); X[k].restore(); }
  // back: prussian blue with a mid-blue band and carved scale rows
  X.blue.fillStyle = P.blue; X.blue.beginPath(); smooth(X.blue, back, true); X.blue.fill();
  const band = [...edge(u => -w(u) * .45, .22, .95), ...edge(u => -w(u) * .12, .22, .95).reverse()];
  X.pale.fillStyle = P.mid; X.pale.beginPath(); smooth(X.pale, band, true); X.pale.fill();
  for (let r = 0; r < 4; r++) for (let i = 0; i < 26; i++) { const u = lerp(.26, .9, i / 26) + (r % 2) * .012, v = -w(u) * (.85 - r * .2); const [a, b] = pt(u, v); X.key.strokeStyle = rgba(P.indD, .7); X.key.lineWidth = 1.3; X.key.beginPath(); X.key.arc(a, b, len * .011, 0, Math.PI); X.key.stroke(); }
  // belly: a few pale-blue printed dots, like the reference's lace
  X.pale.fillStyle = rgba(P.pale, .9); for (let i = 0; i < 40; i++) { const u = lerp(.26, .9, R()), [a, b] = pt(u, w(u) * lerp(.35, .85, R())); X.pale.beginPath(); X.pale.arc(a, b, len * .004, 0, TAU); X.pale.fill(); }
  // head: gold plate, carved gill arcs
  const head = [...edge(u => -w(u), 0, .23), ...edge(u => w(u), 0, .23).reverse()];
  X.gold.fillStyle = P.goldL; X.gold.beginPath(); smooth(X.gold, head, true); X.gold.fill();
  for (let k = 0; k < 4; k++) { const uc = .23 - k * .018, arc = []; for (let i = 0; i <= 16; i++) { const t = lerp(-1, 1, i / 16); arc.push(pt(uc - .035 * (1 - t * t), t * w(uc) * .96)); } carve(X.key, arc, k ? 1.6 : 3, { col: P.goldD, seed: k + cx }); }
  line(X.key, [pt(0, w(0) * .1), pt(.07, w(.07) * .45)], 1.8, P.goldD);
  // eye: the one rare red
  const [ex, ey] = pt(.08, -w(.08) * .12), er = len * .036;
  X.blue.fillStyle = P.indD; X.blue.beginPath(); X.blue.arc(ex, ey, er * 1.35, 0, TAU); X.blue.fill();
  knock(['blue', 'gold'], x => x.arc(ex, ey, er, 0, TAU)); X.red.fillStyle = P.orange; X.red.beginPath(); X.red.arc(ex, ey, er, 0, TAU); X.red.fill();
  X.key.fillStyle = P.sumi; X.key.beginPath(); X.key.arc(ex, ey, er * .42, 0, TAU); X.key.fill();
  X.key.strokeStyle = P.sumi; X.key.lineWidth = 1.6; X.key.beginPath(); X.key.arc(ex, ey, er * 1.35, 0, TAU); X.key.stroke();
  // carved outline + lateral line
  carve(X.key, wob(body, 1.2, cx), 3, { closed: true, col: P.sumi, seed: cx * .1 });
  carve(X.key, edge(u => -w(u) * .02, .24, .9), 1.6, { col: rgba(P.sumi, .8), seed: cy });
}

// —— banded water, the way prints draw it: flat bands with bokashi between, foam left as paper ——
function sea(y0, y1, { rows = 7 } = {}) {
  X.blue.fillStyle = P.blue; X.blue.fillRect(FR.x0, y0, FR.x1 - FR.x0, y1 - y0);
  bokashi(X.blue, FR.x0, y0, FR.x1, y1, P.indD, 0, .85, { rough: 30, seed: 4 });
  for (let r = 0; r < rows; r++) { const yy = lerp(y0 + 30, y1 - 20, r / rows); const amp = lerp(6, 16, r / rows), wl = lerp(70, 160, r / rows);
    const pts = []; for (let px = FR.x0; px <= FR.x1; px += 12) pts.push([px, yy + Math.sin(px / wl + r * 1.7) * amp]);
    carve(X.pale, pts, lerp(4, 9, r / rows), { col: P.mid, seed: r + 3, taper: [0, 0] });
    carve(X.key, pts.map(([a, b]) => [a, b - amp * .6]), 1.6, { col: rgba(P.paleL, .8), seed: r + 9, taper: [0, 0] }); }
}
function frameBorder(x) { x.strokeStyle = P.sumi; x.lineWidth = 3.4; x.strokeRect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0); x.lineWidth = 1.2; x.strokeRect(FR.x0 - 9, FR.y0 - 9, FR.x1 - FR.x0 + 18, FR.y1 - FR.y0 + 18); }
// vertical title slip, Latin capitals turned on their side
function slip(x, cx, y0, title, series) {
  x.font = 'italic 400 22px "EB Garamond"'; const w = 78, sh = series ? x.measureText(series).width + 60 : 0, th = title.length * 30 + 50, h = sh + th, x0 = cx - w / 2;
  x.fillStyle = '#f3e9cf'; x.fillRect(x0, y0, w, h); if (series) { x.fillStyle = mix(P.pale, P.paper, .3); x.fillRect(x0, y0, w, sh); }
  x.strokeStyle = P.sumi; x.lineWidth = 3; x.strokeRect(x0, y0, w, h); x.lineWidth = 1.2; x.strokeRect(x0 + 5, y0 + 5, w - 10, h - 10);
  x.fillStyle = P.sumi; x.textAlign = 'center'; x.textBaseline = 'middle';
  const vt = (s, cy, size, ital) => { x.save(); x.translate(cx, cy); x.rotate(Math.PI / 2); x.font = `${ital ? 'italic ' : ''}400 ${size}px "EB Garamond"`; x.letterSpacing = '4px'; x.fillText(s, 0, 0); x.restore(); };
  if (series) { vt(series, y0 + sh / 2, 22, true); x.lineWidth = 1.5; x.beginPath(); x.moveTo(x0 + 5, y0 + sh); x.lineTo(x0 + w - 5, y0 + sh); x.stroke(); }
  vt(title, y0 + sh + th / 2, 40);
  return y0 + h;
}
function seal(x, txt, cx, cy, size) { // a Latin seal, cut white out of red
  const s = mk(size + 12, size + 12), sx = s.getContext('2d'); sx.fillStyle = P.orange; sx.fillRect(6, 6, size, size);
  sx.globalCompositeOperation = 'destination-out'; sx.font = `400 ${size * .5}px "EB Garamond"`; sx.textAlign = 'center'; sx.textBaseline = 'middle'; sx.fillText(txt, 6 + size / 2, 6 + size * .54);
  const r = mulberry(9); for (let i = 0; i < size * 2; i++) { sx.globalAlpha = .1 + r() * .4; sx.beginPath(); sx.arc(6 + r() * size, 6 + r() * size, .4 + r() * 1.4, 0, TAU); sx.fill(); }
  x.save(); x.globalAlpha = .95; x.drawImage(s, cx - s.width / 2, cy - s.height / 2); x.restore(); }
function sky(y1, warm) { // bokashi sky: indigo at the top, wiped down to paper or dawn
  bokashi(X.blue, FR.x0, FR.y0, FR.x1, y1 * .7, P.ind, 1, 0, { rough: 26, seed: 2 });
  if (warm) bokashi(X.red, FR.x0, y1 * .45, FR.x1, y1, P.orangeL, 0, .55, { rough: 22, seed: 6 }); }
function roofs(x0, y, n, s, col) { // a row of flat-roofed fishermen's houses
  for (let i = 0; i < n; i++) { const xx = x0 + i * s * 1.15 + (R() - .5) * 10, hh = s * lerp(.55, .8, R());
    X.pale.fillStyle = col; X.pale.fillRect(xx, y - hh, s, hh);
    X.gold.fillStyle = P.gold; X.gold.beginPath(); X.gold.moveTo(xx - 6, y - hh); X.gold.lineTo(xx + s / 2, y - hh - s * .32); X.gold.lineTo(xx + s + 6, y - hh); X.gold.fill();
    line(X.key, [[xx - 6, y - hh], [xx + s / 2, y - hh - s * .32], [xx + s + 6, y - hh]], 2.4, P.sumi);
    line(X.key, [[xx, y - hh], [xx, y], [xx + s, y], [xx + s, y - hh]], 1.6, P.sumi);
    X.key.fillStyle = rgba(P.sumi, .85); X.key.fillRect(xx + s * .35, y - hh * .55, s * .22, hh * .3); } }
// —— a figure in the print's grammar: flat colour areas, carved outline, patterned cloth ——
// (x, y) = between the feet; s = height; dir 1 faces right. o: { suit, walk, cup, open, cap, jacket, trousers }
function limb(pts, w0, w1) { // a tapered limb as a closed polygon along a polyline
  const n = pts.length, L = [], Rr = [];
  for (let i = 0; i < n; i++) { const a = pts[Math.max(0, i - 1)], b = pts[Math.min(n - 1, i + 1)]; let dx = b[0] - a[0], dy = b[1] - a[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
    const w = lerp(w0, w1, i / (n - 1)) / 2; L.push([pts[i][0] - dy * w, pts[i][1] + dx * w]); Rr.push([pts[i][0] + dy * w, pts[i][1] - dx * w]); }
  return [...L, ...Rr.reverse()]; }
const poly = (x, p) => { p.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.closePath(); };
function shape(block, p, col) { const x = X[block]; x.fillStyle = col; x.beginPath(); poly(x, p); x.fill(); }
function outline(p, w = 2.2) { carve(X.key, [...p, p[0]], w, { col: P.sumi, taper: [0, 0], jit: .15, per: 2, seed: p[0][0] }); }
// —— people in a loose pen-sketch hand (the owner's reference): one wobbly line, tiny head, no face,
// a long coat as one shape, thin legs; flat printed colour under it, slightly off the line ——
function wobbly(pts, amp, seed, closed = false) { // densify and shake a path like a hand
  const p = dense(closed ? [...pts, pts[0], pts[1]] : pts, 7); return p.map(([a, b], i) => [a + (vn(i * .23 + seed) - .5) * 2 * amp, b + (vn(i * .19 + seed * 3.7 + 40) - .5) * 2 * amp]); }
const vn = t => { const i = Math.floor(t), f = t - i, u = f * f * (3 - 2 * f), h = n => { n = Math.sin(n * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n); }; return h(i) + (h(i + 1) - h(i)) * u; };
function pen(pts, { w = 2.2, amp = 1.6, seed = 1, closed = false, passes = 2, gap = .12 } = {}) {
  const x = X.key; x.strokeStyle = P.sumi; x.lineCap = 'round'; x.lineJoin = 'round';
  for (let k = 0; k < passes; k++) { const p = wobbly(pts, amp * (1 + k * .6), seed + k * 17, closed), n = p.length;
    const skip0 = Math.floor(R() * n), skipL = R() < gap * 3 ? Math.floor(n * gap) : 0; // the pen lifts once, sometimes
    x.lineWidth = w * (k ? .6 : 1);
    for (let i = 1; i < n; i++) { if (i > skip0 && i < skip0 + skipL) continue; x.lineWidth = (k ? .6 : 1) * w * (.75 + .5 * vn(i * .3 + seed)); x.beginPath(); x.moveTo(p[i - 1][0], p[i - 1][1]); x.lineTo(p[i][0], p[i][1]); x.stroke(); } } }

// —— line-first figure: the owner's sketch sheet. The line defines everything; colour is a slip of wash and one accent ——
function stroke(pts, { w = 2.2, amp = 2, seed = 1, closed = false, passes = 3, lifts = 2 } = {}) {
  const x = X.key; x.strokeStyle = P.sumi; x.lineCap = 'round'; x.lineJoin = 'round';
  const base = dense(closed ? [...pts, pts[0], pts[1]] : pts, 9), n = base.length;
  for (let k = 0; k < passes; k++) {
    const a = amp * (1 + k * .7), ww = w * [1, .62, .45, .4][k] || .4;
    const p = base.map(([u, v], i) => [u + (vn(i * .17 + seed + k * 9) - .5) * 2 * a, v + (vn(i * .21 + seed * 2.3 + k * 13 + 50) - .5) * 2 * a]);
    // the pen lifts: split into segments that overlap a little, and the later passes only re-trace part of the path
    const from = k ? Math.floor(R() * n * .4) : 0, to = k ? Math.floor(n * (.6 + R() * .4)) : n;
    const cuts = [from]; for (let c = 0; c < lifts; c++) cuts.push(Math.floor(lerp(from, to, (c + 1) / (lifts + 1)) + (R() - .5) * 6)); cuts.push(to);
    for (let c = 0; c < cuts.length - 1; c++) { const s0 = Math.max(0, cuts[c] - 2), s1 = Math.min(n - 1, cuts[c + 1] + 2); if (s1 <= s0) continue;
      for (let i = s0 + 1; i <= s1; i++) { x.lineWidth = ww * (.6 + .7 * vn(i * .4 + seed + k)); x.beginPath(); x.moveTo(p[i - 1][0], p[i - 1][1]); x.lineTo(p[i][0], p[i][1]); x.stroke(); } } } }
function hatch(region, x0, y0, x1, y1, { gap = 9, ang = .9, w = 1.2, seed = 1 } = {}) { // diagonal shading inside a shape
  const x = X.key; x.save(); x.beginPath(); poly(x, region); x.clip(); x.beginPath(); x.rect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0)); x.clip(); x.strokeStyle = P.sumi; x.lineCap = 'round';
  const len = Math.hypot(x1 - x0, y1 - y0) * 1.5, dx = Math.cos(ang), dy = Math.sin(ang);
  for (let t = -len; t < len; t += gap * (.8 + R() * .5)) { const cx = (x0 + x1) / 2 + t * dy, cy = (y0 + y1) / 2 - t * dx;
    const pts = [[cx - dx * len, cy - dy * len], [cx + dx * len, cy + dy * len]]; x.lineWidth = w * (.6 + R() * .7);
    const p = wobbly(pts, 1.2, seed + t); x.beginPath(); p.forEach(([a, b], i) => i ? x.lineTo(a, b) : x.moveTo(a, b)); x.stroke(); }
  x.restore(); }
function henrikLine(x, y, s, o = {}) {
  const d = o.dir || 1, q = (u, v) => [x + u * s * d, y + v * s], Q = a => a.map(([u, v]) => q(u, v)), sd = x * .13 + y * .07;
  const L = (pts, k = 1, opt = {}) => stroke(Q(pts), { w: s * .0042, amp: s * .0028, seed: sd + k * 7.7, ...opt });
  const fine = (pts, k = 1) => stroke(Q(pts), { w: s * .0028, amp: s * .002, seed: sd + k * 5.3, passes: 2, lifts: 1 });
  const wash = (pts, col, a = .8, off = [s * .008, s * .006]) => { const p = Q(pts).map(([u, v]) => [u + off[0], v + off[1]]); X.gold.globalAlpha = a; X.gold.fillStyle = col; X.gold.beginPath(); smooth(X.gold, p, true); X.gold.fill(); X.gold.globalAlpha = 1; };
  const coatC = mix(P.goldL, P.paper, .25);
  // colour 1 of 3: a loose slip of camel wash on the coat, off the line, not filling it
  const coat = [[-.03, -.872], [.04, -.872], [.085, -.855], [.113, -.82], [.122, -.74], [.112, -.64], [.116, -.52], [.13, -.4], [.12, -.36], [.04, -.352], [-.05, -.355], [-.112, -.365], [-.118, -.45], [-.104, -.58], [-.112, -.72], [-.1, -.82], [-.07, -.855]];
  wash(coat.map(([u, v]) => [u * .92, v * .99]), coatC, .9);
  // colour 2 of 3: the orange tie and cup
  X.red.fillStyle = P.orange; X.red.beginPath(); poly(X.red, Q([[-.006, -.862], [.009, -.862], [.012, -.73], [.002, -.712], [-.008, -.73]])); X.red.fill();
  // colour 3 of 3 is the ink itself
  // back arm, hand in pocket: contour, then the inner seam
  L([[-.11, -.83], [-.138, -.72], [-.142, -.62], [-.12, -.54], [-.085, -.52]], 1); L([[-.1, -.75], [-.11, -.64], [-.09, -.56], [-.072, -.545]], 2); fine([[-.135, -.67], [-.118, -.66]], 3);
  // coat: outline in several passes, lapels, front edge, pockets, buttons, folds
  L(coat, 4, { closed: true, passes: 4, lifts: 3 });
  L([[-.03, -.872], [-.062, -.79], [-.03, -.765], [-.014, -.62], [-.008, -.355]], 5); L([[.04, -.872], [.066, -.79], [.036, -.765], [.014, -.63]], 6);
  fine([[-.03, -.872], [.0, -.83], [.04, -.872]], 7); // collar back
  fine([[-.1, -.515], [-.045, -.51]], 8); fine([[.04, -.51], [.105, -.515]], 9);
  [[.032, -.66], [.032, -.585], [.032, -.51]].forEach(([u, v], i) => { const p = []; for (let a = 0; a < TAU; a += .9) p.push([u + Math.cos(a) * .006, v + Math.sin(a) * .006]); fine(p, 20 + i); });
  fine([[-.09, -.47], [-.1, -.37]], 10); fine([[-.05, -.45], [-.06, -.36]], 11); fine([[.075, -.47], [.09, -.37]], 12); fine([[.11, -.55], [.118, -.45]], 13); fine([[.095, -.8], [.11, -.7], [.1, -.62]], 14); // folds
  // shadow side of the coat, hatched
  const cr = Q(coat); hatch(cr, ...q(.07, -.8), ...q(.15, -.37), { gap: s * .011, ang: 1.05, w: s * .0022, seed: sd });
  // legs: two lines a leg, crossing at the ankles; trousers break over the shoe
  L([[-.07, -.355], [-.066, -.2], [-.062, -.03]], 15); L([[-.025, -.355], [-.03, -.2], [-.034, -.03]], 16);
  L([[.02, -.355], [.03, -.2], [.042, -.03]], 17); L([[.068, -.36], [.074, -.2], [.074, -.03]], 18);
  fine([[-.066, -.035], [-.048, -.025], [-.032, -.035]], 19); fine([[.042, -.035], [.058, -.025], [.075, -.035]], 25);
  hatch(Q([[.02, -.355], [.068, -.36], [.074, -.03], [.042, -.03]]), ...q(.05, -.36), ...q(.08, -.03), { gap: s * .01, ang: 1.1, w: s * .002, seed: sd + 3 });
  // shoes: a dark loop each
  for (const [u, len] of [[-.07, .07], [.035, .075]]) { const sh = Q([[u - .005, -.03], [u + len * .7, -.02], [u + len, -.004], [u + len, .004], [u - .01, .005]]); X.key.fillStyle = P.sumi; X.key.beginPath(); poly(X.key, sh); X.key.fill(); stroke(sh, { w: s * .003, amp: s * .002, seed: sd + u * 99, closed: true, passes: 2 }); }
  // front arm bent up, cup in hand
  L([[.11, -.84], [.148, -.75], [.17, -.695], [.19, -.73], [.198, -.79]], 26); L([[.125, -.8], [.15, -.715], [.165, -.74], [.18, -.8]], 27);
  fine([[.145, -.74], [.162, -.725]], 28); fine([[.15, -.76], [.168, -.745]], 29); // elbow creases
  const hp = []; for (let a = 0; a < TAU; a += .8) hp.push([.19 + Math.cos(a) * .018, -.8 + Math.sin(a) * .02]); L(hp, 30, { closed: true, passes: 2 });
  const cp = Q([[.178, -.858], [.224, -.858], [.219, -.8], [.183, -.8]]); X.red.fillStyle = P.orangeL; X.red.beginPath(); poly(X.red, cp.map(([a, b]) => [a + 3, b + 2])); X.red.fill(); stroke(cp, { w: s * .0035, amp: s * .002, seed: sd + 31, closed: true, passes: 2 });
  for (let k = 0; k < 2; k++) { const st = []; for (let i = 0; i < 7; i++) st.push([.195 + k * .016 + .011 * Math.sin(i * 1.2 + k * 2), -.875 - i * .02]); fine(st, 40 + k); }
  // head: an overshooting loop, a nose, the ear, the hat with a hatched crown
  const hd = []; for (let a = -.4; a < TAU - .4; a += .4) hd.push([.003 + Math.cos(a) * .045, -.922 + Math.sin(a) * .057]); L(hd, 32, { closed: true, passes: 3 });
  fine([[.04, -.93], [.054, -.913], [.04, -.905]], 33); fine([[-.03, -.93], [-.036, -.915], [-.028, -.9]], 34); fine([[-.02, -.872], [-.015, -.86]], 35); fine([[.025, -.872], [.02, -.86]], 36); // nose, ear, neck
  const brim = Q([[-.095, -.958], [.1, -.962], [.098, -.95], [-.092, -.947]]), crown = Q([[-.052, -.958], [-.046, -1.03], [.05, -1.03], [.056, -.96]]);
  stroke(brim, { w: s * .0045, amp: s * .002, seed: sd + 37, closed: true, passes: 3 }); stroke(crown, { w: s * .0045, amp: s * .0025, seed: sd + 38, closed: true, passes: 3 });
  hatch(crown, ...q(-.06, -1.03), ...q(.06, -.958), { gap: s * .007, ang: .95, w: s * .0024, seed: sd + 5 }); fine([[-.05, -.975], [.055, -.977]], 39);
}


// —— angular sketch figure (the owner's second reference): straight strokes only, no curves or circles.
// Colour by zone: one for the head, one for the body, one for the legs ——
function sline(a, b, { w = 2.4, jit = 1.5, over = 6, seed = 1, passes = 2 } = {}) { // a quick straight pen stroke that overshoots its ends
  const x = X.key; x.strokeStyle = P.sumi; x.lineCap = 'butt';
  for (let k = 0; k < passes; k++) { const r = mulberry(Math.floor(seed * 1000) + k * 31), J = () => (r() - .5) * 2 * jit * (1 + k);
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, o0 = over * (r() * .8 + .2) * (k ? .5 : 1), o1 = over * (r() * .8 + .2);
    const p0 = [a[0] - ux * o0 + J(), a[1] - uy * o0 + J()], p1 = [b[0] + ux * o1 + J(), b[1] + uy * o1 + J()];
    // pressure: heavy at the start, thinning out, drawn as a tapered quad
    const w0 = w * (k ? .55 : 1) * (.8 + r() * .5), w1 = w0 * .35, nx = -uy, ny = ux;
    x.fillStyle = P.sumi; x.beginPath(); x.moveTo(p0[0] + nx * w0 / 2, p0[1] + ny * w0 / 2); x.lineTo(p1[0] + nx * w1 / 2, p1[1] + ny * w1 / 2); x.lineTo(p1[0] - nx * w1 / 2, p1[1] - ny * w1 / 2); x.lineTo(p0[0] - nx * w0 / 2, p0[1] - ny * w0 / 2); x.closePath(); x.fill(); } }
function spoly(pts, opt = {}, closed = false) { for (let i = 0; i < pts.length - (closed ? 0 : 1); i++) sline(pts[i], pts[(i + 1) % pts.length], { ...opt, seed: (opt.seed || 1) + i * 1.37 }); }
function shatch(region, { gap = 6, ang = 1.2, w = 1.6, seed = 1, x0, x1, y0, y1 } = {}) { // straight, quick, dense hatching
  const x = X.key; x.save(); x.beginPath(); poly(x, region); x.clip();
  const xs = region.map(p => p[0]), ys = region.map(p => p[1]), a0 = x0 ?? Math.min(...xs), a1 = x1 ?? Math.max(...xs), b0 = y0 ?? Math.min(...ys), b1 = y1 ?? Math.max(...ys);
  x.beginPath(); x.rect(a0, b0, a1 - a0, b1 - b0); x.clip(); const r = mulberry(Math.floor(seed * 777));
  const dx = Math.cos(ang), dy = Math.sin(ang), L = Math.hypot(a1 - a0, b1 - b0);
  for (let t = -L; t < L; t += gap * (.7 + r() * .6)) { const cx = (a0 + a1) / 2 - t * dy, cy = (b0 + b1) / 2 + t * dx; sline([cx - dx * L, cy - dy * L], [cx + dx * L, cy + dy * L], { w, jit: 1, over: 0, seed: t + seed, passes: 1 }); }
  x.restore(); }
function flat(block, pts, col, off = [3, 2]) { knock(['blue', 'pale', 'red', 'gold'].filter(k => k !== block), xx => poly(xx, pts)); X[block].fillStyle = col; X[block].beginPath(); poly(X[block], pts.map(([a, b]) => [a + off[0], b + off[1]])); X[block].fill(); }
function henrikSharp(x, y, s, o = {}) {
  const d = o.dir || 1, lean = o.lean ?? .045, q = (u, v) => [x + (u * .82 - lean * v) * s * d, y + v * s], Q = a => a.map(([u, v]) => q(u, v)), sd = x * .11 + y * .05;
  const W = s * .0048, opt = k => ({ w: W, jit: s * .0018, over: s * .008, seed: sd + k * 3.1 });
  const C = { head: P.orange, body: mix(P.goldL, P.paper, .2), legs: P.ind }; // three zones, three colours
  // zones of flat colour, a little off the line
  const head = Q([[.004, -.985], [.032, -.95], [.006, -.912], [-.022, -.948]]);
  const hat = Q([[-.045, -.976], [.07, -.99], [.042, -1.025], [-.002, -1.03], [-.015, -.98]]);
  // the coat widens from the shoulder to the hem: the shoulder is never wider than the waist
  const coat = Q([[-.044, -.882], [.046, -.886], [.058, -.72], [.074, -.53], [-.068, -.526], [-.056, -.72]]);
  // legs: two inverted triangles, wide at the hem, a point at the ground; no shoes
  const legL = Q([[-.06, -.526], [-.004, -.528], [-.028, .0]]), legR = Q([[.006, -.528], [.066, -.53], [.036, .004]]);
  // arms: triangles too, wide at the shoulder and narrowing to the hand
  const armB = Q([[-.046, -.88], [-.026, -.86], [-.088, -.6]]);
  const armU = Q([[.044, -.884], [.064, -.86], [.112, -.735]]), armF = Q([[.112, -.735], [.095, -.75], [.142, -.84]]);
  flat('red', [...head, ...hat], C.head); flat('gold', coat, C.body); flat('blue', [...legL, ...legR], C.legs);
  flat('gold', armB, mix(C.body, P.goldD, .25)); flat('gold', armU, C.body); flat('gold', armF, C.body);
  // head: a kite, the hat a dark wedge over a slanted brim
  spoly(head, opt(1), true);
  X.key.save(); X.key.fillStyle = P.sumi; X.key.beginPath(); poly(X.key, Q([[-.008, -.98], [.05, -.99], [.038, -1.025], [.0, -1.03]])); X.key.fill(); X.key.restore();
  sline(...Q([[-.055, -.974], [.08, -.993]]), { ...opt(2), w: W * 1.3 });
  sline(...Q([[.002, -.912], [-.004, -.884]]), opt(3)); // neck
  // the coat, each edge its own stroke; front edge and lapel as straight cuts; the tie one heavy stroke
  sline(...Q([[-.044, -.882], [.046, -.886]]), opt(4)); spoly(Q([[.046, -.886], [.058, -.72], [.074, -.53]]), opt(5)); spoly(Q([[-.044, -.882], [-.056, -.72], [-.068, -.526]]), opt(6));
  sline(...Q([[-.068, -.526], [.074, -.53]]), opt(7));
  spoly(Q([[-.014, -.884], [.009, -.8], [.004, -.528]]), { ...opt(8), w: W * .8 }); sline(...Q([[.022, -.885], [.009, -.8]]), { ...opt(9), w: W * .7 });
  sline(...Q([[-.003, -.878], [.003, -.82]]), { ...opt(10), w: W * 1.6 });
  shatch(coat, { gap: s * .008, ang: 1.25, w: s * .0022, seed: sd + 1, x0: q(.03, -.7)[0], x1: q(.1, -.7)[0] });
  // arms as triangles
  spoly(armB, opt(11), true); spoly(armU, opt(12), true); spoly(armF, opt(13), true);
  const cup = Q([[.13, -.865], [.162, -.867], [.156, -.826], [.134, -.826]]); flat('red', cup, P.orangeL); spoly(cup, { ...opt(14), w: W * .7 }, true);
  const tt = o.t || 0; spoly(Q([0, 1, 2, 3].map(i => [.148 + (i % 2 ? .005 : -.004) + .006 * Math.sin(tt * 2.6 + i * 1.3), -.88 - i * .025 - .01 * ((tt * .8) % 1)])), { ...opt(15), w: W * .5, over: 2, seed: sd + 15 + Math.floor(tt * 6) * .01 }); // steam, as zigzag, rising
  // legs as triangles, the far one hatched dark
  spoly(legL, opt(16), true); spoly(legR, opt(17), true);
  shatch(legR, { gap: s * .006, ang: 1.35, w: s * .002, seed: sd + 2 });
}


// Sami and the evaluator, on Henrik's build: straight strokes, triangles for limbs, colour by zone
function sharpKit(x, y, s, o) {
  const d = o.dir || 1, lean = o.lean ?? .045, q = (u, v) => [x + (u * .82 - lean * v) * s * d, y + v * s], Q = a => a.map(([u, v]) => q(u, v)), sd = x * .11 + y * .05 + (o.seed || 0);
  const W = s * .0048, opt = k => ({ w: W, jit: s * .0018, over: s * .008, seed: sd + k * 3.1 });
  return { q, Q, sd, W, opt, ink: p => { X.key.fillStyle = P.sumi; X.key.beginPath(); poly(X.key, p); X.key.fill(); } };
}
function samiSharp(x, y, s, o = {}) { // the welder: beanie, short open jacket, crest, helmet under the arm, mid-stride
  const { q, Q, sd, W, opt, ink } = sharpKit(x, y, s, { lean: .06, ...o });
  const C = { head: P.gold, body: P.mid, legs: P.goldD }; const z = o.zip || 0, hw = lerp(.015, .001, z), pull = lerp(-.6, -.85, z);
  const head = Q([[.004, -.975], [.032, -.94], [.006, -.902], [-.022, -.938]]);
  const cap = Q([[-.03, -.955], [.04, -.962], [.03, -.995], [-.012, -1.0]]);
  const jacket = Q([[-.046, -.872], [.048, -.876], [.062, -.72], [.078, -.6], [-.07, -.596], [-.058, -.72]]);
  const shirt = Q([[-hw + .002, -.872], [hw + .002, -.874], [hw, -.6], [-hw, -.598]]);
  const sp = o.stride ?? 1, legL = Q([[-.064, -.596], [-.006, -.598], [-.03 - .04 * sp, .0]]), legR = Q([[.004, -.598], [.072, -.6], [.03 + .04 * sp, .004]]); // mid-stride: the triangles splay
  const armB = Q([[-.048, -.87], [-.028, -.85], [-.09, -.62]]);
  const armF = o.zip !== undefined ? Q([[.046, -.874], [.07, -.84], [.004, pull]]) : Q([[.046, -.874], [.066, -.85], [.1, -.66]]);
  const helmet = Q([[.07, -.7], [.13, -.705], [.138, -.62], [.11, -.6], [.075, -.61]]);
  flat('gold', [...head], C.head); flat('blue', jacket, C.body); flat('gold', [...legL, ...legR], C.legs); flat('blue', armB, mix(C.body, P.blue, .4)); flat('blue', armF, C.body);
  knock(['blue', 'gold'], xx => poly(xx, shirt)); // the open jacket shows paper
  ink(cap); sline(...Q([[-.035, -.955], [.045, -.963]]), { ...opt(1), w: W * 1.2 });
  spoly(head, opt(2), true); sline(...Q([[.003, -.902], [-.002, -.876]]), opt(3));
  spoly(Q([[-.046, -.872], [-.058, -.72], [-.07, -.596]]), opt(4)); spoly(Q([[.048, -.876], [.062, -.72], [.078, -.6]]), opt(5)); sline(...Q([[-.07, -.596], [.078, -.6]]), opt(6)); sline(...Q([[-.046, -.872], [.048, -.876]]), opt(7));
  sline(...Q([[-hw + .002, -.872], [-hw, -.598]]), { ...opt(8), w: W * .8 }); sline(...Q([[hw + .002, -.874], [hw, -.6]]), { ...opt(9), w: W * .8 });
  sline(...Q([[-.07, -.66], [-.012, -.66]]), { ...opt(10), w: W * .6 }); sline(...Q([[.014, -.662], [.074, -.662]]), { ...opt(11), w: W * .6 }); // reflective band
  if (z < .55) { const crest = Q([[.002, -.8], [.012, -.785], [.002, -.77], [-.008, -.785]]); flat('gold', crest, P.goldL, [0, 0]); spoly(crest, { ...opt(12), w: W * .6, over: 1 }, true); } // the crest, worn: a diamond, hidden as the zip passes it
  shatch(jacket, { gap: s * .008, ang: 1.25, w: s * .0022, seed: sd + 1, x0: q(.035, -.75)[0], x1: q(.1, -.75)[0] });
  spoly(armB, opt(13), true); spoly(armF, opt(14), true);
  if (o.helmet !== false) { ink(helmet); sline(...Q([[.085, -.68], [.125, -.682]]), { ...opt(15), w: W * .5 }); // the welding helmet, its visor slit left as paper
  X.key.save(); X.key.globalCompositeOperation = 'destination-out'; X.key.beginPath(); poly(X.key, Q([[.088, -.675], [.124, -.677], [.122, -.66], [.09, -.658]])); X.key.fill(); X.key.restore(); }
  spoly(legL, opt(16), true); spoly(legR, opt(17), true);
  shatch(legR, { gap: s * .006, ang: 1.3, w: s * .002, seed: sd + 2 });
}
function evaluatorSharp(x, y, s, o = {}) { // the reader in another city: hair up, an A-line coat to the knee, a folder held to the chest
  const { q, Q, sd, W, opt, ink } = sharpKit(x, y, s, { lean: .025, ...o });
  const C = { head: P.goldL, body: P.pale, legs: P.ind };
  const head = Q([[.004, -.97], [.03, -.935], [.006, -.9], [-.02, -.934]]);
  const hair = Q([[-.024, -.93], [-.02, -.968], [.004, -.98], [.028, -.958], [.012, -.95], [-.006, -.925]]), bun = Q([[-.022, -.975], [-.004, -1.0], [.012, -.985], [-.004, -.97]]);
  const coat = Q([[-.04, -.87], [.042, -.873], [.056, -.72], [.088, -.47], [-.08, -.466], [-.054, -.72]]); // A-line, to the knee
  const legL = Q([[-.036, -.466], [-.008, -.467], [-.022, .0]]), legR = Q([[.006, -.467], [.036, -.468], [.022, .004]]); // thinner, under a longer coat
  const armB = Q([[-.042, -.868], [-.024, -.85], [-.074, -.6]]);
  const armU = Q([[.04, -.872], [.06, -.85], [.07, -.72]]), armF = Q([[.07, -.72], [.054, -.73], [.004, -.76]]); // folded across, holding the folder
  const folder = Q([[-.004, -.83], [.07, -.832], [.072, -.7], [-.002, -.698]]);
  flat('gold', head, C.head); flat('blue', coat, C.body); flat('blue', [...legL, ...legR], C.legs); flat('blue', armB, mix(C.body, P.mid, .35));
  ink(hair); ink(bun);
  spoly(head, opt(1), true); sline(...Q([[.003, -.9], [-.002, -.874]]), opt(2));
  spoly(Q([[-.04, -.87], [-.054, -.72], [-.08, -.466]]), opt(3)); spoly(Q([[.042, -.873], [.056, -.72], [.088, -.47]]), opt(4)); sline(...Q([[-.08, -.466], [.088, -.47]]), opt(5)); sline(...Q([[-.04, -.87], [.042, -.873]]), opt(6));
  spoly(Q([[-.016, -.871], [.004, -.79], [.0, -.467]]), { ...opt(7), w: W * .8 }); sline(...Q([[.02, -.872], [.004, -.79]]), { ...opt(8), w: W * .7 });
  shatch(coat, { gap: s * .009, ang: 1.25, w: s * .002, seed: sd + 1, x0: q(.04, -.7)[0], x1: q(.11, -.7)[0] });
  spoly(armB, opt(9), true);
  knock(['blue', 'gold'], xx => poly(xx, folder)); spoly(folder, { ...opt(10), w: W * .8 }, true);
  for (let k = 0; k < 4; k++) sline(...Q([[.012, -.81 + k * .028], [.06 - (k === 3 ? .02 : 0), -.811 + k * .028]]), { ...opt(11 + k), w: W * .4, over: 1 }); // lines of a submission
  flat('blue', armU, C.body); flat('blue', armF, C.body); spoly(armU, opt(16), true); spoly(armF, opt(17), true);
  spoly(legL, opt(18), true); spoly(legR, opt(19), true); shatch(legR, { gap: s * .006, ang: 1.3, w: s * .002, seed: sd + 2 });
}


// a person built from three iso boxes (legs, body, head), all on one block so no seam opens between the faces
function isoPerson(Pj, a0, b0, z0, c, scale = 1) {
  const u = scale, Q = (a, b, z) => Pj(a0 + a * u, b0 + b * u, z0 + z * u), all = [];
  const faces = (a, b, z, w, d, h, col) => [
    [[Q(a, b + d, z), Q(a + w, b + d, z), Q(a + w, b + d, z + h), Q(a, b + d, z + h)], col],
    [[Q(a + w, b, z), Q(a + w, b + d, z), Q(a + w, b + d, z + h), Q(a + w, b, z + h)], mix(col, P.sumi, .35)],
    [[Q(a, b, z + h), Q(a + w, b, z + h), Q(a + w, b + d, z + h), Q(a, b + d, z + h)], mix(col, P.paper, .35)]];
  all.push(...faces(-.15, -.12, 0, .3, .24, .85, c.legs), ...faces(-.2, -.15, .85, .4, .3, .65, c.body), ...faces(-.11, -.11, 1.52, .22, .22, .26, c.head));
  knock(['blue', 'pale', 'red', 'key'], xx => all.forEach(([p]) => poly(xx, p)));
  const x = X.gold; x.lineJoin = 'round';
  for (const [p, col] of all) { x.fillStyle = col; x.strokeStyle = col; x.lineWidth = 1.2; x.beginPath(); poly(x, p); x.fill(); x.stroke(); } // a hairline of its own colour closes the seams
  // a soft shadow on the ground, so the figure stands on it
  const sh = [Q(-.2, .12, 0), Q(.2, .12, 0), Q(.75, .5, 0), Q(.35, .5, 0)]; X.blue.save(); X.blue.globalAlpha = .35; X.blue.fillStyle = P.indD; X.blue.beginPath(); poly(X.blue, sh); X.blue.fill(); X.blue.restore();
}

// the works as an isometric woodblock model, drawn at any camera: k pixels per unit, (ox, oy) the screen origin
function drawModel(k, ox, oy, drift = 0) { // the works as an isometric woodblock model: the establishing map
  const C30 = Math.cos(Math.PI / 6), S30 = .5;
  const P = (x, y, z = 0) => [ox + (x - y) * C30 * k, oy + (x + y) * S30 * k - z * k];
  const PP = a => a.map(p => P(...p));
  const face = (pts, block, col, { hatchIt = false, lineW = 2.2, seed = 1 } = {}) => { const p = PP(pts); knock(['key'], xx => poly(xx, p)); flat(block, p, col, [0, 0]); if (hatchIt) shatch(p, { gap: 7, ang: 1.15, w: 1.1, seed }); spoly(p, { w: lineW, jit: .8, over: 3, seed }, true); return p; };
  const box = (x, y, z, w, d, h, c, sd = 1) => { // top, the face toward the viewer on y, the face toward the viewer on x
    face([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], 'pale', c.left, { seed: sd });
    face([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], 'blue', c.right, { hatchIt: true, seed: sd + 1 });
    face([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], 'gold', c.top, { seed: sd + 2 }); };
  const house = (x, y, w, d, h, rh, c, sd) => { // a box with a gable roof running along x
    face([[x, y + d, 0], [x + w, y + d, 0], [x + w, y + d, h], [x, y + d, h]], 'pale', c.left, { seed: sd });
    face([[x + w, y, 0], [x + w, y + d, 0], [x + w, y + d, h], [x + w, y + d / 2, h + rh], [x + w, y, h]], 'blue', c.right, { hatchIt: true, seed: sd + 1 });
    face([[x, y, h], [x + w, y, h], [x + w, y + d / 2, h + rh], [x, y + d / 2, h + rh]], 'gold', mix(c.roof, PAL_.goldD, .25), { seed: sd + 2 });
    face([[x, y + d, h], [x + w, y + d, h], [x + w, y + d / 2, h + rh], [x, y + d / 2, h + rh]], 'gold', c.roof, { seed: sd + 3 }); };
  
  const wall = { left: mix(PAL_.pale, PAL_.paper, .3), right: mix(PAL_.pale, PAL_.blue, .3), top: PAL_.paper, roof: PAL_.gold };
  // the sea, in front of the quay, banded
  const sea = PP([[-90, 12, -.8], [130, 12, -.8], [130, 90, -.8], [-90, 90, -.8]]); flat('blue', sea, PAL_.blue, [0, 0]);
  for (let i = 0; i < 70; i++) { const y = 12.6 + i * .55; const a = P(-90, y, -.8), b = P(130, y, -.8); sline(a, b, { w: 1.4, jit: 1.2, over: 0, seed: i + 300 }); X.pale.strokeStyle = rgba(PAL_.mid, .7); X.pale.lineWidth = 5; X.pale.beginPath(); X.pale.moveTo(a[0], a[1] + 4); X.pale.lineTo(b[0], b[1] + 4); X.pale.stroke(); }
  bokashi(X.blue, FR.x0, FR.y0, FR.x1, 380, PAL_.sumiL, .55, 0, { rough: 26, seed: 33 });
  // the land plate and its quay wall
  face([[-90, 12, -.8], [130, 12, -.8], [130, 12, 0], [-90, 12, 0]], 'pale', mix(PAL_.goldD, PAL_.paper, .3), { seed: 11 });
  face([[-90, -110, 0], [130, -110, 0], [130, 12, 0], [-90, 12, 0]], 'gold', mix(PAL_.goldD, PAL_.paper, .55), { seed: 13 });
  for (let i = -40; i < 12; i += 2) sline(P(-90, i, 0), P(130, i, 0), { w: .6, jit: .6, over: 0, seed: 400 + i, passes: 1 }); // the yard's paving lines
  // fishermen's houses along the back
  for (let i = 0; i < 4; i++) house(.5 + i * 2.3, .6, 1.8, 2.4, 1.6, .9, wall, 20 + i * 5);
  // the hall, the chimney, the crest on the gable end and the door
  face([[21.2, .6, 0], [22.2, .6, 0], [22.2, .6, 9], [21.2, .6, 9]], 'pale', wall.left, { seed: 50 });
  box(21.2, -.4, 0, 1, 1, 9, { left: wall.left, right: wall.right, top: PAL_.goldD }, 51);
  house(10, 2, 12, 6, 5, 2.2, wall, 60);
  for (let i = 0; i < 9; i++) { const x0 = 11 + i * 1.2; face([[x0, 8, 2.6], [x0 + .6, 8, 2.6], [x0 + .6, 8, 3.6], [x0, 8, 3.6]], 'key', PAL_.sumi, { seed: 70 + i, lineW: 1 }); }
  face([[22, 3.5, 0], [22, 6.5, 0], [22, 6.5, 3.2], [22, 3.5, 3.2]], 'red', PAL_.orangeL, { seed: 80 }); // the door, open, warm inside
  const cy = 5, cz = 5.9, r = 1.05; face([[22, cy - r, cz], [22, cy, cz + r], [22, cy + r, cz], [22, cy, cz - r]], 'blue', PAL_.ind, { seed: 81 });
  face([[22, cy - r * .55, cz], [22, cy, cz + r * .55], [22, cy + r * .55, cz], [22, cy, cz - r * .55]], 'gold', PAL_.goldL, { seed: 82 });
  // the yard: a stack of steel and a ladder against the hall
  for (let j = 0; j < 3; j++) box(17, 9.2 + j * .05, j * .35, 3.6, .9, .35, { left: PAL_.mid, right: PAL_.blue, top: PAL_.paleL }, 90 + j * 3);
  const L1 = [[13.2, 9.4, 0], [13.2, 8.05, 4.2]], L2 = [[14.2, 9.4, 0], [14.2, 8.05, 4.2]];
  for (const Lr of [L1, L2]) sline(P(...Lr[0]), P(...Lr[1]), { w: 3, seed: Lr[0][0] });
  for (let i = 1; i < 8; i++) { const t = i / 8; sline(P(13.2, lerp(9.4, 8.05, t), lerp(0, 4.2, t)), P(14.2, lerp(9.4, 8.05, t), lerp(0, 4.2, t)), { w: 2.4, over: 1, seed: 100 + i }); }
  // the jetty, out over the water, on piles
  for (const [x, y] of [[3.2, 14], [4.6, 14], [3.2, 17], [4.6, 17], [3.2, 19.5], [4.6, 19.5]]) box(x, y, -.8, .25, .25, .65, { left: PAL_.goldD, right: PAL_.goldD, top: PAL_.goldD }, x * 10 + y);
  box(3, 12, -.15, 2, 8, .15, { left: PAL_.goldD, right: mix(PAL_.goldD, PAL_.sumi, .2), top: mix(PAL_.goldD, PAL_.paper, .35) }, 120);
  // the people, at true scale: about 1.8 units tall
  isoPerson(P, 4, 19.2, 0, { head: PAL_.orange, body: mix(PAL_.goldL, PAL_.paper, .2), legs: PAL_.ind }); // Henrik, at the end of the jetty
  isoPerson(P, 15.6, 10.4, 0, { head: PAL_.gold, body: PAL_.mid, legs: PAL_.goldD }); // Sami, in the yard
  mist(520 + drift, 300, 760, 40); mist(1380 - drift * .7, 230, 620, 34); mist(700 + drift * .5, 980, 900, 44);
  return { P };
}
if (F === 31) { // small people for the isometric map: four options, true size with a 4x zoom
  Object.values(X).forEach(clipFrame);
  const CAST = [{ head: P.orange, body: mix(P.goldL, P.paper, .2), legs: P.ind }, { head: P.gold, body: P.mid, legs: P.goldD }, { head: P.goldL, body: P.pale, legs: P.ind }];
  const C30 = .866;
  const fill = (block, p, col) => { knock(['blue', 'pale', 'gold', 'red', 'key'].filter(b => b !== block), xx => poly(xx, p)); X[block].fillStyle = col; X[block].beginPath(); poly(X[block], p); X[block].fill(); };
  const parts = (x, y, h) => { const q = (u, v) => [x + u * h, y + v * h]; // a kite head, a body widening to the hem, two triangle legs
    return { head: [q(0, -1), q(.05, -.94), q(0, -.88), q(-.05, -.94)], body: [q(-.06, -.86), q(.06, -.86), q(.1, -.5), q(-.1, -.5)], legL: [q(-.08, -.5), q(-.01, -.5), q(-.04, 0)], legR: [q(.01, -.5), q(.08, -.5), q(.04, 0)] }; };
  // A: ink silhouette, the head alone in colour (an architect's scale figure)
  const A = (x, y, h, c) => { const p = parts(x, y, h); for (const k of ['body', 'legL', 'legR']) fill('key', p[k], P.sumi); fill('red', p.head, c.head); };
  // B: colour by zone, no outline: a token
  const Bf = (x, y, h, c) => { const p = parts(x, y, h); fill('gold', p.head, c.head); fill('blue', p.body, c.body); fill('pale', [...p.legL], c.legs); fill('pale', p.legR, mix(c.legs, P.sumi, .3)); };
  // C: the token with a long morning shadow along the iso grid, so it reads from far away
  const Cf = (x, y, h, c) => { const sh = [[x - h * .08, y], [x + h * .08, y], [x + h * .08 + h * 1.4 * C30, y + h * 1.4 * .5], [x - h * .08 + h * 1.4 * C30, y + h * 1.4 * .5]]; X.blue.save(); X.blue.globalAlpha = .55; X.blue.fillStyle = P.indD; X.blue.beginPath(); poly(X.blue, sh); X.blue.fill(); X.blue.restore(); Bf(x, y, h, c); };
  // D: isometric blocks: legs, body and head as small boxes, three faces each
  const Df = (x, y, h, c) => { const u = h / 1.8, Pj = (a, b, z) => [x + (a - b) * C30 * u, y + (a + b) * .5 * u - z * u]; return isoPerson(Pj, 0, 0, 0, c);
    const box = (a, b, z, w, d, hh, col) => { const L = [Pj(a, b + d, z), Pj(a + w, b + d, z), Pj(a + w, b + d, z + hh), Pj(a, b + d, z + hh)], Rr = [Pj(a + w, b, z), Pj(a + w, b + d, z), Pj(a + w, b + d, z + hh), Pj(a + w, b, z + hh)], T = [Pj(a, b, z + hh), Pj(a + w, b, z + hh), Pj(a + w, b + d, z + hh), Pj(a, b + d, z + hh)];
      fill('pale', L, col); fill('blue', Rr, mix(col, P.sumi, .35)); fill('gold', T, mix(col, P.paper, .35)); };
    box(-.15, -.12, 0, .3, .24, .85, c.legs); box(-.2, -.15, .85, .4, .3, .65, c.body); box(-.11, -.11, 1.52, .22, .22, .26, c.head); };
  const opts = [['A', 'Ink silhouette', A], ['B', 'Colour token', Bf], ['C', 'Token and shadow', Cf], ['D', 'Iso blocks', Df]];
  const k = 30, small = 1.85 * k; // the map's scale: 1.85 units at 30 px
  opts.forEach(([id, name, fn], i) => { const cx = 260 + i * 400;
    const g = [[cx - 170, 980], [cx + 170, 980], [cx + 170, 1000], [cx - 170, 1000]]; // a strip of the yard
    const big = [[cx - 170, 520], [cx + 170, 520], [cx + 170, 540], [cx - 170, 540]];
    for (const strip of [g, big]) { X.gold.fillStyle = mix(P.goldD, P.paper, .55); X.gold.beginPath(); poly(X.gold, strip); X.gold.fill(); }
    CAST.forEach((c, j) => { fn(cx - 110 + j * 110, 520, small * 4 * .55, c); fn(cx - 60 + j * 60, 980, small, c); });
  });
  compose(x => { x.fillStyle = P.sumi; x.textAlign = 'center';
    opts.forEach(([id, name], i) => { const cx = 260 + i * 400; x.font = '400 34px "EB Garamond"'; x.fillText(id + '  ·  ' + name, cx, 600); x.font = 'italic 400 22px "EB Garamond"'; x.fillText('true map size', cx, 1028); });
    x.font = 'italic 400 24px "EB Garamond"'; x.fillText('Each option shows Henrik, Sami and the evaluator, enlarged above and at true map size below.', 960, 110); });
}

// —— the cast: three people built from garment pieces, drawn in the sketch sheet's hand ——
// local units: u right, v up (feet at 0, crown at -1); dir 1 faces right
function person(x, y, s, who, o = {}) {
  const d = o.dir || 1, q = (u, v) => [x + u * s * d, y + v * s], Q = a => a.map(([u, v]) => q(u, v)), seed = x * .31 + y * .17 + who.length;
  const W = { w: s * .0045, amp: s * .0045 }, Wd = { w: s * .0032, amp: s * .003, passes: 1 };
  const part = (pts, col, block = 'blue', { line = true, closed = true, off = [2.5, 2] } = {}) => { const p = Q(pts);
    if (col) { knock(['blue', 'pale', 'red', 'gold', 'key'].filter(k => k !== block || true), xx => poly(xx, p)); shape(block, p.map(([a, b]) => [a + off[0], b + off[1]]), col); }
    if (line) pen(p, { ...W, closed, seed: seed + pts[0][0] * 50 + pts[0][1] * 30 }); return p; };
  const det = (pts, k = 0) => pen(Q(pts), { ...Wd, seed: seed + 7 + k + pts[0][0] * 40 });
  const skin = '#e9cfa3';
  const hand = (u, v, r = .018) => { const p = []; for (let a = 0; a < TAU; a += .9) p.push([u + Math.cos(a) * r, v + Math.sin(a) * r * 1.2]); part(p, skin, 'gold'); };
  const shoe = (u, v, len = .07, boot = false) => part([[u - .02, v - (boot ? .05 : .02)], [u + len * .6, v - .018], [u + len, v - .004], [u + len, v + .006], [u - .025, v + .006]], P.sumi, 'key', { line: false });
  const leg = (top, knee, ank, w0, w1, col) => { const L = [], Rr = []; const pts = [top, knee, ank];
    pts.forEach((p, i) => { const w = lerp(w0, w1, i / 2) / 2; L.push([p[0] - w, p[1]]); Rr.push([p[0] + w, p[1]]); }); return part([...L, ...Rr.reverse()], col); };
  const head = (u, v, hair, style) => { const p = []; for (let a = 0; a < TAU; a += .45) p.push([u + Math.cos(a) * .046, v + Math.sin(a) * .058]);
    part(p, skin, 'gold'); if (style === 'bun') { part([[u - .05, v - .005], [u - .045, v - .05], [u, v - .065], [u + .045, v - .05], [u + .05, v - .005], [u + .054, v + .03], [u + .035, v - .025], [u - .035, v - .025], [u - .056, v + .03]], hair, 'key', { off: [0, 0] }); const b = []; for (let a = 0; a < TAU; a += .8) b.push([u - .01 + Math.cos(a) * .025, v - .075 + Math.sin(a) * .022]); part(b, hair, 'key', { off: [0, 0] }); }
    else if (style === 'beanie') { part([[u - .052, v - .005], [u - .05, v - .05], [u, v - .075], [u + .05, v - .05], [u + .052, v - .005]], P.ind, 'blue'); det([[u - .052, v - .015], [u + .052, v - .015]]); }
    else part([[u - .048, v - .01], [u - .044, v - .045], [u, v - .06], [u + .044, v - .045], [u + .048, v - .01], [u + .03, v - .03], [u - .03, v - .03]], hair, 'key', { off: [0, 0] });
    det([[u + .045 * .6, v + .005], [u + .052, v + .012], [u + .045 * .6, v + .02]], 3); }; // the nose, the sketch's only face mark

  if (who === 'henrik') { // the owner: long camel overcoat, hat, orange tie, coffee
    const coat = mix(P.goldL, P.paper, .3);
    part([[-.11, -.84], [-.14, -.68], [-.13, -.56], [-.085, -.52], [-.07, -.55], [-.1, -.6], [-.095, -.72]], mix(coat, P.goldD, .2)); // back sleeve, hand in pocket
    leg([-.045, -.37], [-.05, -.2], [-.055, -.02], .052, .04, P.indD); leg([.045, -.37], [.052, -.2], [.06, -.02], .052, .04, P.indD);
    det([[-.05, -.36], [-.053, -.04]]); det([[.05, -.36], [.057, -.04]], 1);
    shoe(-.075, 0, .07); shoe(.04, 0, .075);
    part([[-.035, -.875], [.035, -.875], [.11, -.845], [.12, -.7], [.115, -.55], [.135, -.36], [-.125, -.36], [-.115, -.55], [-.118, -.7], [-.11, -.845]], coat);
    part([[-.03, -.872], [.03, -.872], [.008, -.7]], P.paper, 'gold', { line: false }); // shirt
    part([[-.006, -.865], [.008, -.865], [.012, -.72], [.002, -.7], [-.008, -.72]], P.orange, 'red', { line: false });
    det([[-.035, -.875], [-.06, -.8], [-.03, -.77], [-.012, -.6], [-.005, -.36]]); det([[.035, -.875], [.062, -.8], [.035, -.77], [.012, -.62]], 2); // lapels and front edge
    det([[-.095, -.52], [-.04, -.515]], 3); det([[.04, -.515], [.1, -.52]], 4); // pocket flaps
    [[.03, -.66], [.03, -.58], [.03, -.5]].forEach(([u, v]) => { const [a, b] = q(u, v); X.key.fillStyle = P.sumi; X.key.beginPath(); X.key.arc(a, b, s * .005, 0, TAU); X.key.fill(); });
    det([[-.08, -.45], [-.09, -.37]], 5); det([[.07, -.47], [.085, -.37]], 6); det([[-.02, -.44], [-.03, -.37]], 7); // hem folds
    part([[.11, -.845], [.15, -.74], [.17, -.69], [.2, -.75], [.18, -.8], [.15, -.7], [.13, -.76], [.125, -.83]], mix(coat, P.paper, .15)); // front sleeve, bent
    det([[.145, -.735], [.16, -.72]], 8); det([[.175, -.79], [.19, -.775]], 9);
    hand(.195, -.775); const cp = [[.18, -.83], [.225, -.83], [.22, -.775], [.185, -.775]]; part(cp, P.orangeL, 'red');
    for (let k = 0; k < 2; k++) { const st = []; for (let i = 0; i < 6; i++) st.push([.195 + k * .015 + .01 * Math.sin(i * 1.3 + k * 2), -.85 - i * .022]); det(st, 10 + k); }
    head(.0, -.925, P.sumiL);
    part([[-.09, -.965], [.09, -.97], [.095, -.958], [-.092, -.954]], P.sumi, 'key', { off: [0, 0] }); part([[-.05, -.967], [-.045, -1.03], [.047, -1.03], [.052, -.968]], P.sumi, 'key', { off: [0, 0] });
    shape('red', Q([[-.047, -.985], [.05, -.985], [.05, -.972], [-.048, -.972]]), P.goldD);
  }
  if (who === 'sami') { // the welder: short work jacket open on the crest, cargo trousers, boots, helmet under the arm
    const jacket = P.blue, trou = mix(P.goldD, P.sumi, .15), walk = o.walk ? .07 : .02;
    part([[-.11, -.83], [-.145, -.66], [-.15, -.52], [-.12, -.5], [-.11, -.64], [-.095, -.74]], mix(jacket, P.sumi, .25)); hand(-.135, -.49, .02);
    leg([-.05, -.5], [-.06 - walk * .5, -.26], [-.07 - walk, -.03], .07, .055, trou); leg([.05, -.5], [.06 + walk * .5, -.26], [.07 + walk, -.03], .07, .055, trou);
    det([[-.085, -.36], [-.04 - walk * .3, -.36], [-.04 - walk * .3, -.29], [-.085, -.29]]); det([[-.08 - walk * .5, -.26], [-.04 - walk * .5, -.26]], 1); det([[.04 + walk * .5, -.26], [.085 + walk * .5, -.26]], 2); // cargo pocket, knee seams
    shoe(-.1 - walk, 0, .085, true); shoe(.045 + walk, 0, .09, true);
    part([[-.04, -.86], [.04, -.86], [.04, -.52], [-.04, -.52]], P.paper, 'gold'); // the T-shirt
    const [cx2, cy2] = q(.0, -.72); X.blue.fillStyle = P.ind; X.blue.beginPath(); X.blue.arc(cx2, cy2, s * .022, 0, TAU); X.blue.fill(); X.blue.save(); X.blue.globalCompositeOperation = 'destination-out'; X.blue.lineWidth = s * .007; X.blue.beginPath(); X.blue.arc(cx2, cy2, s * .015, 0, TAU); X.blue.stroke(); X.blue.restore(); X.gold.strokeStyle = P.goldL; X.gold.lineWidth = s * .006; X.gold.beginPath(); X.gold.arc(cx2, cy2, s * .015, 0, TAU); X.gold.stroke(); // the crest, worn
    part([[-.04, -.865], [-.115, -.835], [-.125, -.68], [-.12, -.5], [-.035, -.5], [-.03, -.7]], jacket); part([[.04, -.865], [.115, -.835], [.125, -.68], [.12, -.5], [.035, -.5], [.03, -.7]], jacket);
    part([[-.12, -.62], [-.035, -.62], [-.035, -.6], [-.12, -.6]], P.paleL, 'pale', { line: false }); part([[.035, -.62], [.12, -.62], [.12, -.6], [.035, -.6]], P.paleL, 'pale', { line: false }); // reflective band
    det([[-.04, -.865], [-.07, -.82], [-.045, -.8]]); det([[.04, -.865], [.07, -.82], [.045, -.8]], 1); det([[.06, -.78], [.105, -.78], [.105, -.73], [.06, -.73]], 2); det([[-.12, -.53], [-.035, -.53]], 3); det([[.035, -.53], [.12, -.53]], 4);
    // front arm holding a welding helmet at the hip
    part([[.115, -.835], [.15, -.7], [.16, -.6], [.13, -.58], [.125, -.68], [.1, -.76]], mix(jacket, P.blue, .1)); hand(.15, -.57, .02);
    part([[.12, -.62], [.23, -.62], [.24, -.5], [.2, -.46], [.13, -.47], [.115, -.52]], P.ind, 'blue'); part([[.15, -.59], [.215, -.59], [.215, -.55], [.15, -.55]], P.sumi, 'key', { off: [0, 0] });
    head(.0, -.915, P.sumi, 'beanie');
  }
  if (who === 'evaluator') { // the reader in another city: blazer, scarf, a folder held to the chest
    const blz = P.mid;
    part([[-.1, -.83], [-.13, -.68], [-.13, -.55], [-.105, -.54], [-.1, -.66], [-.085, -.74]], mix(blz, P.sumi, .25)); hand(-.118, -.53, .017);
    leg([-.035, -.48], [-.04, -.24], [-.045, -.03], .045, .032, P.indD); leg([.035, -.48], [.04, -.24], [.045, -.03], .045, .032, P.indD);
    shoe(-.065, 0, .06); shoe(.03, 0, .065);
    part([[-.035, -.865], [.035, -.865], [.1, -.835], [.11, -.68], [.1, -.48], [-.1, -.48], [-.11, -.68], [-.1, -.835]], blz);
    det([[-.035, -.865], [-.055, -.78], [-.02, -.72], [.0, -.48]]); det([[.035, -.865], [.055, -.78], [.02, -.72]], 1); det([[-.08, -.56], [-.035, -.56]], 2); det([[.035, -.56], [.08, -.56]], 3);
    part([[-.04, -.87], [.04, -.87], [.03, -.82], [.012, -.66], [-.01, -.66], [-.03, -.82]], P.paleL, 'pale'); // scarf
    part([[.02, -.78], [.13, -.77], [.13, -.6], [.02, -.61]], P.paper, 'gold'); det([[.04, -.75], [.11, -.745]], 4); det([[.04, -.72], [.11, -.715]], 5); det([[.04, -.69], [.09, -.686]], 6); // the folder
    part([[.1, -.835], [.13, -.72], [.1, -.66], [.07, -.68], [.09, -.72], [.08, -.78]], mix(blz, P.paleL, .15)); hand(.075, -.67, .017);
    head(.0, -.915, P.sumi, 'bun');
  }
}
function sketchFigure(x, y, s, o = {}) {
  const d = o.dir || 1, j = () => (R() - .5) * .03, q = (u, v) => [x + (u + j() * .5) * s * d, y + v * s], seed = x * .37 + y * .11;
  const walk = o.walk ? .11 : .025, coatLen = o.short ? -.5 : -.38;
  // legs: two thin tapering legs, the back one a touch shorter
  const legs = [[-walk, .0], [walk, .0]].map(([fx], i) => { const hx = i ? .03 : -.03;
    return { out: [q(hx - .028, coatLen + .02), q(fx * .6 + hx * .5 - .022, -.2), q(fx - .012, -.02)], inn: [q(hx + .022, coatLen + .02), q(fx * .6 + hx * .5 + .016, -.2), q(fx + .012, -.02)], foot: q(fx + .02 * d, -.006) }; });
  const legP = legs.map(l => [...l.out, ...l.inn.slice().reverse()]);
  knock(['blue', 'pale', 'red', 'key'], xx => legP.forEach(p => poly(xx, p)));
  legP.forEach(p => shape('blue', p.map(([a, b]) => [a + 2, b + 2]), o.trousers || P.indD));
  // the coat: one rounded shape, shoulders hunched, widest at the hip
  const coat = [q(-.035, -.86), q(.035, -.86), q(.1 + j(), -.82), q(.13 + j(), -.7), q(.125 + j(), -.56), q(.11, coatLen), q(-.1, coatLen), q(-.125 + j(), -.56), q(-.13 + j(), -.7), q(-.1 + j(), -.82)];
  knock(['blue', 'pale', 'red', 'gold', 'key'], xx => { xx.moveTo(...coat[0]); smooth(xx, coat, true); });
  X.blue.fillStyle = o.coat || P.ind; X.blue.beginPath(); smooth(X.blue, coat.map(([a, b]) => [a + 3, b + 2.5]), true); X.blue.fill(); // colour sits off the line
  if (o.hatch) { X.key.save(); X.key.beginPath(); smooth(X.key, coat, true); X.key.clip(); X.key.strokeStyle = rgba(P.sumi, .75); X.key.lineWidth = 1.1;
    for (let k = -14; k < 14; k++) { const [a, b] = q(k * .022, -.86); X.key.beginPath(); X.key.moveTo(a, b); X.key.lineTo(a + s * .14 * d, b + s * .48); X.key.stroke(); } X.key.restore(); }
  pen(coat, { closed: true, seed, w: s * .0055, amp: s * .007, passes: 3, gap: .2 });
  // an arm folded into the coat, or held out with a cup
  if (o.cup) { const sh = q(.1, -.78), el = q(.16, -.62), hd = q(.2, -.7); pen([sh, el, hd], { seed: seed + 3, w: s * .008, amp: s * .003 });
    const cp = [[hd[0], hd[1] - s * .05], [hd[0] + s * .04 * d, hd[1] - s * .05], [hd[0] + s * .036 * d, hd[1] + s * .005], [hd[0] + s * .004 * d, hd[1] + s * .005]];
    knock(['blue', 'gold'], xx => poly(xx, cp)); shape('red', cp, P.orangeL); pen(cp, { closed: true, seed: seed + 5, w: s * .006, amp: s * .002, passes: 1 });
    for (let k = 0; k < 2; k++) { const st = []; for (let i = 0; i < 6; i++) st.push([hd[0] + s * (.02 + .012 * Math.sin(i * 1.3 + k * 2)) * d, hd[1] - s * (.07 + i * .02)]); pen(st, { seed: seed + 9 + k, w: s * .004, amp: s * .002, passes: 1 }); } }
  else pen([q(.09, -.79), q(.1, -.64), q(.085, -.5)], { seed: seed + 3, w: s * .005, amp: s * .005, passes: 2 });
  if (o.bag) { const b0 = q(-.2, -.5), bag = [b0, [b0[0] + s * .1 * d, b0[1]], [b0[0] + s * .11 * d, b0[1] + s * .1], [b0[0] - s * .01 * d, b0[1] + s * .1]]; knock(['blue', 'pale'], xx => poly(xx, bag)); shape('gold', bag, P.goldD); pen(bag, { closed: true, seed: seed + 11, w: s * .007, amp: s * .003 }); pen([q(-.12, -.66), [b0[0] + s * .05 * d, b0[1] - s * .02]], { seed: seed + 12, w: s * .006, amp: s * .003, passes: 1 }); }
  // the one colour accent: a tie or a crest at the collar
  if (o.tie) shape('red', [q(-.01, -.85), q(.012, -.85), q(.008, -.72), q(-.004, -.72)], P.orange);
  if (o.crest) { const [cx2, cy2] = q(-.02, -.7); X.gold.strokeStyle = P.goldL; X.gold.lineWidth = s * .01; X.gold.beginPath(); X.gold.arc(cx2, cy2, s * .02, 0, TAU); X.gold.stroke(); }
  pen([q(-.03, -.86), q(.0, -.8), q(.035, -.86)], { seed: seed + 4, w: s * .006, amp: s * .002, passes: 1 }); // collar
  legs.forEach((l, i) => { pen(l.out, { seed: seed + 20 + i, w: s * .005, amp: s * .005, passes: 2 }); pen(l.inn, { seed: seed + 24 + i, w: s * .005, amp: s * .005, passes: 2 });
    const f = l.foot; X.key.fillStyle = P.sumi; X.key.beginPath(); X.key.ellipse(f[0], f[1], s * .03, s * .012, 0, 0, TAU); X.key.fill(); });
  // head: a small loop, no face; a hat sometimes
  const hc = q(.005, -.915), hr = s * .045, head = []; for (let a = 0; a < TAU; a += .5) head.push([hc[0] + Math.cos(a) * hr * .85, hc[1] + Math.sin(a) * hr * 1.15]);
  knock(['blue', 'pale', 'key'], xx => poly(xx, head)); shape('gold', head.map(([a, b]) => [a + 2, b + 1.5]), '#e9cfa3');
  if (o.dark) shape('key', head.filter((_, i) => i < 3 || i > 9), P.sumi);
  pen(head, { closed: true, seed: seed + 30, w: s * .005, amp: s * .004, passes: 2 });
  if (o.hat) { pen([q(-.075, -.95), q(.08, -.95)], { seed: seed + 31, w: s * .009, amp: s * .002, passes: 1 }); const crown = [q(-.04, -.95), q(-.035, -1.0), q(.04, -1.0), q(.045, -.95)]; shape('key', crown, P.sumi); }
}
function figure(x, y, s, o = {}) {
  const d = o.dir || 1, q = (u, v) => [x + u * s * d, y + v * s];
  const coat = o.jacket || P.ind, trou = o.trousers || P.indD, skin = '#e9cfa3';
  const stride = o.walk ? .17 : .035, ph = o.phase || 0;
  // legs: back leg first, then front; trousers with a crease line
  const legs = [[-stride, .02 * ph], [stride, -.02 * ph]].map(([fx]) => [q(fx * .35, -.47), q(fx * .7 + .01, -.24), q(fx, -.035)]);
  const legP = legs.map(l => limb(l, s * .085, s * .06));
  knock(['blue', 'pale', 'red'], xx => legP.forEach(p => poly(xx, p)));
  legP.forEach((p, i) => { shape('blue', p, i ? trou : mix(trou, P.sumi, .3)); outline(p, 2); });
  legs.forEach(l => line(X.key, [[lerp(l[0][0], l[1][0], .2), lerp(l[0][1], l[1][1], .2)], l[1], l[2]], 1, rgba(P.paleL, .5)));
  // shoes
  legs.forEach(l => { const [fx, fy] = l[2]; const p = [[fx - s * .03 * d, fy - s * .012], [fx + s * .07 * d, fy - s * .008], [fx + s * .075 * d, fy + s * .03], [fx - s * .035 * d, fy + s * .03]]; shape('key', p, P.sumi); });
  // back arm
  const shL = q(-.05, -.77), shR = q(.06, -.77);
  const backArm = limb([shL, q(-.09 - stride * .4, -.6), q(-.08 - stride * .6, -.46)], s * .07, s * .05);
  knock(['blue', 'pale', 'red'], xx => poly(xx, backArm)); shape('blue', backArm, mix(coat, P.sumi, .3)); outline(backArm, 2);
  shape('gold', [q(-.08 - stride * .6, -.46), q(-.05 - stride * .6, -.44), q(-.07 - stride * .6, -.41), q(-.1 - stride * .6, -.43)], skin);
  // torso: jacket with hem, lapels and the shirt V
  const torso = [q(-.075, -.805), q(.07, -.805), q(.118, -.77), q(.11, -.62), q(.095, -.42), q(-.095, -.42), q(-.105, -.62), q(-.118, -.77)];
  knock(['blue', 'pale', 'red', 'gold'], xx => poly(xx, torso)); shape('blue', torso, coat);
  // cloth pattern, the figure's version of the fish's scales: fine pinstripe or a printed dot
  X.pale.save(); X.pale.beginPath(); poly(X.pale, torso); legP.forEach(p => poly(X.pale, p)); X.pale.clip();
  if (o.suit) { X.pale.strokeStyle = rgba(P.pale, .45); X.pale.lineWidth = 1; for (let k = -20; k < 20; k++) { const px = x + k * s * .022; X.pale.beginPath(); X.pale.moveTo(px, y - s); X.pale.lineTo(px + s * .02, y); X.pale.stroke(); } }
  else { X.pale.fillStyle = rgba(P.pale, .5); for (let i = 0; i < 160; i++) { const [px, py] = q(lerp(-.12, .12, R()), lerp(-.8, -.42, R())); X.pale.beginPath(); X.pale.arc(px, py, s * .004, 0, TAU); X.pale.fill(); } }
  X.pale.restore();
  if (o.suit) {
    const v = [q(-.035, -.79), q(.04, -.79), q(.005, -.62)]; knock(['blue', 'pale'], xx => poly(xx, v)); // shirt is paper
    shape('red', [q(-.004, -.775), q(.012, -.775), q(.016, -.66), q(.004, -.635), q(-.008, -.66)], P.orange); // tie
    line(X.key, [q(-.035, -.79), q(-.06, -.7), q(.005, -.6)], 1.8); line(X.key, [q(.04, -.79), q(.07, -.7), q(.005, -.6)], 1.8); // lapels
    line(X.key, [q(.005, -.6), q(.0, -.42)], 1.4); X.key.fillStyle = P.sumi; [[-.012, -.56], [-.012, -.5]].forEach(([u, v]) => { const [a, b] = q(u, v); X.key.beginPath(); X.key.arc(a, b, s * .006, 0, TAU); X.key.fill(); });
    line(X.key, [q(.04, -.55), q(.09, -.55)], 1.4); // pocket
  } else {
    line(X.key, [q(.0, -.79), q(.0, -.42)], 1.6); // zip
    if (o.open) { const v = [q(-.03, -.79), q(.03, -.79), q(.04, -.42), q(-.04, -.42)]; knock(['blue', 'pale'], xx => poly(xx, v)); const [cx2, cy2] = q(.0, -.66);
      X.blue.fillStyle = P.ind; X.blue.beginPath(); X.blue.arc(cx2, cy2, s * .03, 0, TAU); X.blue.fill(); X.gold.strokeStyle = P.goldL; X.gold.lineWidth = 2; X.gold.beginPath(); X.gold.arc(cx2, cy2, s * .022, 0, TAU); X.gold.stroke(); // the crest, worn
      line(X.key, [q(-.03, -.79), q(-.04, -.42)], 1.6); line(X.key, [q(.03, -.79), q(.04, -.42)], 1.6); }
    line(X.key, [q(-.1, -.47), q(.1, -.47)], 1.4); // hem band
  }
  outline(torso, 2.4);
  // neck and head: profile with ear, eye, brow, hair
  shape('gold', [q(-.025, -.83), q(.03, -.83), q(.028, -.785), q(-.02, -.785)], skin);
  const hc = q(.012, -.89), hr = s * .068;
  const head = []; for (let a = 0; a < TAU; a += .25) { const r = hr * (1 + .08 * Math.cos(a * 2)); head.push([hc[0] + Math.cos(a) * r * .9 * d + (Math.cos(a) > .6 ? s * .008 * d : 0), hc[1] + Math.sin(a) * r * 1.08]); }
  knock(['blue', 'pale'], xx => poly(xx, head)); shape('gold', head, skin);
  const nose = [q(.07, -.895), q(.088, -.872), q(.068, -.868)]; shape('gold', nose, skin); line(X.key, nose, 1.5);
  const hair = []; for (let a = Math.PI * .95; a < TAU * 1.02; a += .2) hair.push([hc[0] + Math.cos(a) * hr * .98 * d, hc[1] + Math.sin(a) * hr * 1.12]);
  hair.push(q(-.03, -.86), q(-.05, -.865)); shape('key', hair, o.grey ? P.sumiL : P.sumi);
  if (o.cap) shape('blue', [q(-.065, -.92), q(.06, -.95), q(.1, -.93), q(.06, -.915), q(-.06, -.9)], P.ind);
  outline(head, 2); line(X.key, [q(.04, -.895), q(.06, -.893)], 1.8); line(X.key, [q(.038, -.912), q(.064, -.914)], 1.4); // eye, brow
  const ear = q(-.005, -.88); X.key.strokeStyle = P.goldD; X.key.lineWidth = 1.6; X.key.beginPath(); X.key.ellipse(ear[0], ear[1], s * .01, s * .016, 0, 0, TAU); X.key.stroke();
  line(X.key, [q(.04, -.852), q(.06, -.85)], 1.3); // mouth
  // front arm, last, over the torso
  const cup = o.cup;
  const fa = cup ? [shR, q(.12, -.62), q(.15, -.7)] : [shR, q(.09 + stride * .4, -.6), q(.09 + stride * .7, -.46)];
  const frontArm = limb(fa, s * .07, s * .05); knock(['blue', 'pale', 'red', 'gold'], xx => poly(xx, frontArm)); shape('blue', frontArm, mix(coat, P.blue, .15)); outline(frontArm, 2);
  const [hx, hy] = fa[2]; shape('gold', [[hx - s * .02, hy - s * .015], [hx + s * .025 * d, hy - s * .02], [hx + s * .03 * d, hy + s * .02], [hx - s * .015, hy + s * .02]], skin);
  if (cup) { const cp = [[hx + s * .01 * d, hy - s * .06], [hx + s * .055 * d, hy - s * .06], [hx + s * .05 * d, hy + s * .005], [hx + s * .015 * d, hy + s * .005]]; knock(['blue', 'gold'], xx => poly(xx, cp)); shape('red', cp, P.orangeL); outline(cp, 1.6);
    for (let k = 0; k < 2; k++) { const st = []; for (let i = 0; i < 8; i++) st.push([hx + s * (.03 + .012 * Math.sin(i + k * 2)) * d, hy - s * (.07 + i * .018)]); carve(X.key, st, 1.4, { col: rgba(P.paleL, .8), seed: k }); } }
}

function mist(cx, cy, w, h) { knock(['blue', 'pale', 'red', 'key', 'gold'], x => { x.moveTo(cx - w / 2 + h / 2, cy - h / 2); x.lineTo(cx + w / 2 - h / 2, cy - h / 2); x.arc(cx + w / 2 - h / 2, cy, h / 2, -Math.PI / 2, Math.PI / 2); x.lineTo(cx - w / 2 + h / 2, cy + h / 2); x.arc(cx - w / 2 + h / 2, cy, h / 2, Math.PI / 2, Math.PI * 1.5); }); }
function compose(stampSeal) {
  out.drawImage(TX.paper, 0, 0);
  inkify(B.pale, { speck: .3, grain: .1, baren: .3 }); inkify(B.blue, { speck: .3, grain: .16, baren: .38, gx: 30 });
  inkify(B.gold, { speck: .3, grain: .08, baren: .3 }); inkify(B.red, { speck: .3, baren: .25 }); inkify(B.key, { speck: .12 });
  for (const k of ['pale', 'blue', 'gold', 'red', 'key']) { out.save(); out.globalCompositeOperation = 'multiply'; out.drawImage(B[k], REG[k][0], REG[k][1]); out.restore(); }
  out.drawImage(TX.fiber, 0, 0); stampSeal && stampSeal(out); frameBorder(out);
}
const clipFrame = x => { x.save(); x.beginPath(); x.rect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0); x.clip(); };

if (F === 1) { // the same water: a harbour town at first light, the school scattered under the surface
  Object.values(X).forEach(clipFrame);
  sky(560, true);
  knock(['blue'], x => x.arc(1450, 300, 46, 0, TAU)); X.red.fillStyle = P.orange; X.red.beginPath(); X.red.arc(1450, 300, 46, 0, TAU); X.red.fill();
  // far hills, pale and keyless
  X.pale.fillStyle = P.paleL; X.pale.beginPath(); X.pale.moveTo(FR.x0, 470); for (let px = FR.x0; px <= FR.x1; px += 20) X.pale.lineTo(px, 430 - 60 * Math.sin(px / 380) - 25 * Math.sin(px / 97)); X.pale.lineTo(FR.x1, 520); X.pale.lineTo(FR.x0, 520); X.pale.fill();
  mist(700, 455, 1100, 46); mist(1500, 500, 700, 36);
  // the town and the works: a long hall with a chimney
  roofs(120, 560, 7, 64, mix(P.pale, P.paper, .4)); roofs(1180, 560, 6, 58, mix(P.pale, P.paper, .4));
  X.pale.fillStyle = mix(P.pale, P.blue, .35); X.pale.fillRect(640, 470, 470, 90); X.pale.fillRect(1030, 330, 34, 140);
  X.gold.fillStyle = P.gold; X.gold.fillRect(630, 452, 490, 20);
  line(X.key, [[630, 452], [1120, 452], [1120, 472], [630, 472], [630, 452]], 2.2, P.sumi); line(X.key, [[640, 472], [640, 560], [1110, 560], [1110, 472]], 1.8, P.sumi); line(X.key, [[1030, 452], [1030, 330], [1064, 330], [1064, 452]], 1.8, P.sumi);
  mist(1080, 300, 260, 28); // smoke as a mist band
  for (let i = 0; i < 9; i++) { X.key.fillStyle = rgba(P.sumi, .8); X.key.fillRect(670 + i * 48, 500, 22, 30); }
  // quay
  X.gold.fillStyle = P.goldD; X.gold.fillRect(FR.x0, 560, FR.x1 - FR.x0, 18); line(X.key, [[FR.x0, 560], [FR.x1, 560]], 2.6, P.sumi); line(X.key, [[FR.x0, 578], [FR.x1, 578]], 1.6, P.sumi);
 // Henrik, with his coffee
  sea(578, FR.y1);
  fish(820, 900, 380, -.15, 1); fish(980, 700, 420, .08, -1); fish(1520, 800, 400, -.35, 1); fish(560, 1000, 300, .25, -1); fish(1300, 960, 380, .05, 1);
  // a jetty in the foreground, so Henrik stands nearer than the town
  const jet = [[FR.x0, 790], [560, 760], [600, 800], [FR.x0, 840]]; knock(['blue', 'pale'], xx => poly(xx, jet)); shape('gold', jet, P.goldD); outline(jet, 2.6);
  for (let k = 0; k < 9; k++) line(X.key, [[FR.x0 + k * 62, 790 - k * 3.4], [FR.x0 + k * 62 + 8, 840 - k * 4.4]], 1.4, rgba(P.sumi, .7));
  for (const px of [120, 330, 540]) { const pile = [[px, 820], [px + 22, 818], [px + 22, 980], [px, 980]]; knock(['blue', 'pale'], xx => poly(xx, pile)); shape('gold', pile, P.goldD); outline(pile, 2); }
  person(330, 800, 440, 'henrik');
  compose(x => { const e = slip(x, 1800, 70, 'THE SAME WATER', 'Monday, 05:40'); seal(x, 'A', 1800, e + 46, 52); });
}
if (F === 2) { // the turn: underwater, a single gold stroke, the school turning to it
  Object.values(X).forEach(clipFrame);
  X.blue.fillStyle = P.blue; X.blue.fillRect(0, 0, W, H);
  bokashi(X.blue, 0, FR.y0, W, FR.y1, P.indD, .1, .95, { rough: 30, seed: 8 });
  // light bands from the surface, left as paper-tinted pale
  for (let k = 0; k < 6; k++) { X.pale.fillStyle = rgba(P.pale, .22); X.pale.beginPath(); const x0 = 200 + k * 260; X.pale.moveTo(x0, FR.y0); X.pale.lineTo(x0 + 90, FR.y0); X.pale.lineTo(x0 - 140, FR.y1); X.pale.lineTo(x0 - 260, FR.y1); X.pale.fill(); }
  // eddies as carved spirals, the fish reference's swirls
  for (const [sx, sy, r0] of [[300, 300, 120], [260, 860, 140], [880, 980, 90]]) { const p = []; for (let a = 0; a < 14; a += .15) { const r = r0 * (1 - a / 15); p.push([sx + Math.cos(a) * r, sy + Math.sin(a) * r * .7]); } carve(X.pale, p, 5, { col: P.mid, seed: sx }); }
  // the gold stroke: carved, thick, the first line of a mark
  const stroke = [[1520, 110], [1660, 330], [1700, 560], [1640, 800], [1460, 1000]];
  knock(['blue', 'pale'], x => { const t = mk(), tx = t.getContext('2d'); carve(tx, stroke, 46, { col: '#000', taper: [.12, .3], jit: .3, seed: 5 }); x.rect(0,0,0,0); X.blue.save(); X.blue.globalCompositeOperation='destination-out'; X.blue.drawImage(t,0,0); X.blue.restore(); });
  carve(X.gold, stroke, 46, { col: P.gold, taper: [.12, .3], jit: .3, seed: 5 }); carve(X.gold, stroke.map(([a, b]) => [a - 8, b - 4]), 16, { col: P.goldL, taper: [.2, .4], seed: 6 });
  carve(X.key, stroke.map(([a, b]) => [a + 22, b + 4]), 3, { col: P.goldD, seed: 7 });
  fish(1120, 330, 430, -.05, -1, .1); fish(1060, 580, 480, 0, -1, .08); fish(1120, 830, 430, .06, -1, .1);
  fish(560, 300, 360, -.5, -1, .4); fish(500, 650, 380, .3, -1, .4); fish(420, 930, 330, -.95, 1, .5);
  compose(x => { slip(x, 110, 70, 'THE TURN', 'one line'); });
}
if (F === 3) { // Monday: the works under rain, its mark on the gable, the crew going in
  Object.values(X).forEach(clipFrame);
  bokashi(X.blue, FR.x0, FR.y0, FR.x1, 520, P.sumiL, .95, 0, { rough: 28, seed: 12 });
  // the hall
  X.pale.fillStyle = mix(P.pale, P.paper, .25); X.pale.fillRect(360, 420, 1200, 470);
  knock(['blue'], x => { x.moveTo(330, 420); x.lineTo(960, 230); x.lineTo(1590, 420); x.rect(360, 420, 1200, 470); }); X.gold.fillStyle = P.gold; X.gold.beginPath(); X.gold.moveTo(330, 420); X.gold.lineTo(960, 230); X.gold.lineTo(1590, 420); X.gold.fill();
  line(X.key, [[330, 420], [960, 230], [1590, 420], [330, 420]], 3, P.sumi); line(X.key, [[360, 420], [360, 890], [1560, 890], [1560, 420]], 2.4, P.sumi);
  for (let i = 0; i < 14; i++) line(X.key, [[400 + i * 84, 430], [400 + i * 84, 880]], 1.2, rgba(P.sumi, .5));
  // big doors, open: warm light inside
  knock(['pale'], x => x.rect(820, 600, 280, 290)); X.red.fillStyle = P.orangeL; X.red.fillRect(820, 600, 280, 290); line(X.key, [[820, 890], [820, 600], [1100, 600], [1100, 890]], 2.6, P.sumi);
  // the mark on the gable: an invented crest, gold disc and three carved waves
  X.blue.fillStyle = P.ind; X.blue.beginPath(); X.blue.arc(960, 345, 74, 0, TAU); X.blue.fill();
  X.gold.save(); X.gold.globalCompositeOperation = 'destination-out'; X.gold.beginPath(); X.gold.arc(960, 345, 74, 0, TAU); X.gold.fill(); X.gold.restore();
  X.gold.strokeStyle = P.goldL; X.gold.lineWidth = 7; X.gold.beginPath(); X.gold.arc(960, 345, 62, 0, TAU); X.gold.stroke();
  for (let k = 0; k < 3; k++) { const p = []; for (let px = -44; px <= 44; px += 4) p.push([960 + px, 318 + k * 26 + Math.sin(px / 9) * 6]); carve(X.gold, p, 6, { col: P.goldL, taper: [.1, .1], seed: k }); }
  carve(X.key, (() => { const p = []; for (let a = 0; a <= TAU; a += .2) p.push([960 + Math.cos(a) * 75, 345 + Math.sin(a) * 75]); return p; })(), 3, { closed: true, col: P.sumi });
  // yard and puddles
  X.gold.fillStyle = mix(P.goldD, P.paper, .55); X.gold.fillRect(FR.x0, 890, FR.x1 - FR.x0, FR.y1 - 890); line(X.key, [[FR.x0, 890], [FR.x1, 890]], 2.4, P.sumi);
  for (const [px, py, pw] of [[520, 960, 260], [1300, 990, 320], [980, 940, 140]]) { X.pale.fillStyle = P.pale; X.pale.beginPath(); X.pale.ellipse(px, py, pw / 2, 14, 0, 0, TAU); X.pale.fill(); }
  // the crew walking in, small and flat
  person(720, 1020, 330, 'sami', { walk: true }); person(1010, 905, 190, 'henrik', { dir: -1 }); // Sami, jacket open on the crest; Henrik in the doorway
  mist(560, 520, 700, 40); mist(1500, 560, 560, 34);
  // rain: two sets of fine straight lines at slightly different angles
  const rain = (n, ang, col, wd) => { X.key.strokeStyle = col; X.key.lineWidth = wd; for (let i = 0; i < n; i++) { const x0 = FR.x0 + R() * (FR.x1 - FR.x0 + 400) - 200, y0 = FR.y0 + R() * (FR.y1 - FR.y0), L = 60 + R() * 120; X.key.beginPath(); X.key.moveTo(x0, y0); X.key.lineTo(x0 + Math.sin(ang) * L, y0 + Math.cos(ang) * L); X.key.stroke(); } };
  rain(900, .18, rgba(P.sumi, .55), 1.1); rain(600, .26, rgba(P.sumiL, .45), .9);
  compose(x => { const e = slip(x, 1800, 70, 'EVERYONE CAN SEE IT', 'the next Monday'); seal(x, 'A', 1800, e + 46, 52); });
}
if (F === 4) { // the cast, on one sheet, like a page of the sketchbook
  Object.values(X).forEach(clipFrame);
  bokashi(X.pale, FR.x0, FR.y0, FR.x1, 320, P.paleL, .6, 0, { rough: 24, seed: 21 });
  henrikSharp(470, 1000, 900); samiSharp(950, 1000, 860); evaluatorSharp(1400, 1000, 840);
  compose(x => { x.fillStyle = P.sumi; x.font = 'italic 400 30px "EB Garamond"'; x.textAlign = 'center';
    const e = slip(x, 1800, 70, 'THE CAST', 'The Same Water'); seal(x, 'A', 1800, e + 46, 52); });
}
if (F === 5) { // one character, finished: Henrik in line
  Object.values(X).forEach(clipFrame);
  henrikSharp(900, 1000, 900);
  compose(x => { x.fillStyle = P.sumi; x.font = 'italic 400 30px "EB Garamond"'; x.textAlign = 'center'; const e = slip(x, 1800, 70, 'HENRIK', 'The Same Water'); seal(x, 'A', 1800, e + 46, 52); });
}
if (F === 10) { // the opening, animated: harbour on line one, Sami zipping over the crest on line two
  Object.values(X).forEach(clipFrame);
  const snap = () => Object.fromEntries(Object.entries(B).map(([k, v]) => { const cc = mk(); cc.getContext('2d').drawImage(v, 0, 0); return [k, cc]; }));
  const clear = () => Object.values(X).forEach(x => x.clearRect(0, 0, W, H));
  // scene A, static: sky, sun, hills, town, works, quay, sea, mist
  sky(560, true);
  knock(['blue'], x => x.arc(1450, 300, 46, 0, TAU)); X.red.fillStyle = P.orange; X.red.beginPath(); X.red.arc(1450, 300, 46, 0, TAU); X.red.fill();
  X.pale.fillStyle = P.paleL; X.pale.beginPath(); X.pale.moveTo(FR.x0, 470); for (let px = FR.x0; px <= FR.x1; px += 20) X.pale.lineTo(px, 430 - 60 * Math.sin(px / 380) - 25 * Math.sin(px / 97)); X.pale.lineTo(FR.x1, 520); X.pale.lineTo(FR.x0, 520); X.pale.fill();
  roofs(120, 560, 7, 64, mix(P.pale, P.paper, .4)); roofs(1180, 560, 6, 58, mix(P.pale, P.paper, .4));
  X.pale.fillStyle = mix(P.pale, P.blue, .35); X.pale.fillRect(640, 470, 470, 90); X.pale.fillRect(1030, 330, 34, 140); X.gold.fillStyle = P.gold; X.gold.fillRect(630, 452, 490, 20);
  line(X.key, [[630, 452], [1120, 452], [1120, 472], [630, 472], [630, 452]], 2.2, P.sumi); line(X.key, [[640, 472], [640, 560], [1110, 560], [1110, 472]], 1.8, P.sumi); line(X.key, [[1030, 452], [1030, 330], [1064, 330], [1064, 452]], 1.8, P.sumi);
  for (let i = 0; i < 9; i++) { X.key.fillStyle = rgba(P.sumi, .8); X.key.fillRect(670 + i * 48, 500, 22, 30); }
  X.gold.fillStyle = P.goldD; X.gold.fillRect(FR.x0, 560, FR.x1 - FR.x0, 18); line(X.key, [[FR.x0, 560], [FR.x1, 560]], 2.6, P.sumi); line(X.key, [[FR.x0, 578], [FR.x1, 578]], 1.6, P.sumi);
  sea(578, FR.y1);
  const SA = snap(); clear();
  // scene B, static: the hall wall in the rain, the yard
  bokashi(X.blue, FR.x0, FR.y0, FR.x1, 300, P.sumiL, .9, 0, { rough: 28, seed: 31 });
  X.pale.fillStyle = mix(P.pale, P.paper, .25); X.pale.fillRect(FR.x0, 160, FR.x1 - FR.x0, 760);
  for (let i = 0; i < 22; i++) line(X.key, [[FR.x0 + 40 + i * 86, 170], [FR.x0 + 40 + i * 86, 910]], 1.3, rgba(P.sumi, .45));
  line(X.key, [[FR.x0, 160], [FR.x1, 160]], 2.6); X.gold.fillStyle = mix(P.goldD, P.paper, .55); X.gold.fillRect(FR.x0, 920, FR.x1 - FR.x0, FR.y1 - 920); line(X.key, [[FR.x0, 920], [FR.x1, 920]], 2.4);
  const SB = snap(); clear();
  const restore = S => { clear(); for (const k in S) B[k].getContext('2d').drawImage(S[k], 0, 0); };
  const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
  const tmp = mk(), tx = tmp.getContext('2d');
  window.seek = t => {
    R = mulberry(77);
    if (t < 3.1) { // A: every morning, the same water
      restore(SA);
      const sw = (x0, v, w = 1700) => FR.x0 - 300 + ((x0 + v * t - FR.x0 + 300) % w + w) % w;
      fish(sw(900, -38), 720, 400, .06, 1); fish(sw(300, 30), 860, 380, -.05, -1); fish(sw(1300, -24), 960, 360, .1, 1); fish(sw(700, 46), 1000, 330, .0, -1);
      const jet = [[FR.x0, 790], [560, 760], [600, 800], [FR.x0, 840]]; knock(['blue', 'pale'], xx => poly(xx, jet)); shape('gold', jet, P.goldD); outline(jet, 2.6);
      for (const px of [120, 330, 540]) { const pile = [[px, 820], [px + 22, 818], [px + 22, 980], [px, 980]]; knock(['blue', 'pale'], xx => poly(xx, pile)); shape('gold', pile, P.goldD); outline(pile, 2); }
      henrikSharp(330, 800, 520, { t });
      mist(700 + t * 14, 455, 1100, 46); mist(1500 - t * 10, 500, 700, 36);
      compose(x => { const e = slip(x, 1800, 70, 'THE SAME WATER', 'Monday, 05:40'); seal(x, 'A', 1800, e + 46, 52); });
      const k = 1 + .025 * (t / 3.1); tx.drawImage(c, 0, 0); out.save(); out.translate(W / 2, H / 2); out.scale(k, k); out.drawImage(tmp, -W / 2, -H / 2); out.restore();
    } else { // B: my people do perfect work, and they hide the name it is done under
      const u = t - 3.1; restore(SB);
      const walkIn = ease(u / 1.4), zip = ease((u - 2.3) / 1.8);
      samiSharp(lerp(560, 860, walkIn), 1460, 1320, { stride: lerp(1, .15, walkIn), zip, helmet: false, seed: 1, lean: .03 });
      const rr = mulberry(Math.floor(t * 12)); X.key.strokeStyle = rgba(P.sumi, .5); X.key.lineWidth = 1.1;
      for (let i = 0; i < 520; i++) { const x0 = FR.x0 + rr() * (FR.x1 - FR.x0 + 300) - 150, y0 = FR.y0 + rr() * (FR.y1 - FR.y0), L = 60 + rr() * 110; X.key.beginPath(); X.key.moveTo(x0, y0); X.key.lineTo(x0 + Math.sin(.2) * L, y0 + Math.cos(.2) * L); X.key.stroke(); }
      compose(x => { slip(x, 110, 70, 'MY PEOPLE', 'the yard, 06:10'); });
    }
    return true;
  };
}
if (F === 20) { // The Same Water: the full film, one shot per phrase
  Object.values(X).forEach(clipFrame);
  const snap = () => Object.fromEntries(Object.entries(B).map(([k, v]) => { const cc = mk(); cc.getContext('2d').drawImage(v, 0, 0); return [k, cc]; }));
  const clear = () => Object.values(X).forEach(x => x.clearRect(0, 0, W, H));
  const restore = S => { clear(); for (const k in S) B[k].getContext('2d').drawImage(S[k], 0, 0); };
  const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t);
  const rect = (x0, y0, w, h) => [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h]];
  const rain = (t, n = 420, a = .45, x0 = FR.x0, y0 = FR.y0, x1 = FR.x1, y1 = FR.y1) => { const rr = mulberry(Math.floor(t * 12) + 5); X.key.strokeStyle = rgba(P.sumi, a); X.key.lineWidth = 1.1;
    for (let i = 0; i < n; i++) { const px = x0 + rr() * (x1 - x0 + 200) - 100, py = y0 + rr() * (y1 - y0), L = 50 + rr() * 100; X.key.beginPath(); X.key.moveTo(px, py); X.key.lineTo(px + .2 * L, py + L); X.key.stroke(); } };
  // a document: paper, ruled lines; grey when nobody can read whose it is, navy with the crest once they can
  function doc(x0, y0, w, h, { crest = false, grey = true, rot = 0 } = {}) {
    const cx = x0 + w / 2, cy = y0 + h / 2, ca = Math.cos(rot), sa = Math.sin(rot), T = ([u, v]) => [cx + (u - cx) * ca - (v - cy) * sa, cy + (u - cx) * sa + (v - cy) * ca];
    const p = rect(x0, y0, w, h).map(T); knock(['blue', 'pale', 'gold', 'red'], xx => poly(xx, p)); spoly(p, { w: 2.4, jit: 1, over: 4, seed: x0 * .1 + y0 }, true);
    const col = grey ? P.greyL || '#9a9a94' : P.ind;
    for (let i = 0; i < 9; i++) { const yy = y0 + h * (.3 + i * .07), xe = x0 + w * (i % 3 === 2 ? .62 : .86); X.pale.strokeStyle = col; X.pale.lineWidth = h * .012; X.pale.beginPath(); X.pale.moveTo(...T([x0 + w * .12, yy])); X.pale.lineTo(...T([xe, yy])); X.pale.stroke(); }
    if (crest) { const d = [[cx, y0 + h * .08], [cx + w * .07, y0 + h * .15], [cx, y0 + h * .22], [cx - w * .07, y0 + h * .15]].map(T); flat('gold', d, P.gold, [0, 0]); spoly(d, { w: 2.4, jit: .6, over: 2, seed: 9 }, true);
      X.blue.strokeStyle = P.ind; X.blue.lineWidth = h * .02; X.blue.beginPath(); X.blue.moveTo(...T([x0 + w * .3, y0 + h * .26])); X.blue.lineTo(...T([x0 + w * .7, y0 + h * .26])); X.blue.stroke(); }
    else { X.pale.fillStyle = col; X.pale.beginPath(); poly(X.pale, rect(x0 + w * .12, y0 + h * .1, w * .5, h * .08).map(T)); X.pale.fill(); } }

  // ── static sets ──
  // A: the harbour
  sky(560, true); knock(['blue'], x => x.arc(1450, 300, 46, 0, TAU)); X.red.fillStyle = P.orange; X.red.beginPath(); X.red.arc(1450, 300, 46, 0, TAU); X.red.fill();
  X.pale.fillStyle = P.paleL; X.pale.beginPath(); X.pale.moveTo(FR.x0, 470); for (let px = FR.x0; px <= FR.x1; px += 20) X.pale.lineTo(px, 430 - 60 * Math.sin(px / 380) - 25 * Math.sin(px / 97)); X.pale.lineTo(FR.x1, 520); X.pale.lineTo(FR.x0, 520); X.pale.fill();
  roofs(120, 560, 7, 64, mix(P.pale, P.paper, .4)); roofs(1180, 560, 6, 58, mix(P.pale, P.paper, .4));
  X.pale.fillStyle = mix(P.pale, P.blue, .35); X.pale.fillRect(640, 470, 470, 90); X.pale.fillRect(1030, 330, 34, 140); X.gold.fillStyle = P.gold; X.gold.fillRect(630, 452, 490, 20);
  line(X.key, [[630, 452], [1120, 452], [1120, 472], [630, 472], [630, 452]], 2.2); line(X.key, [[640, 472], [640, 560], [1110, 560], [1110, 472]], 1.8); line(X.key, [[1030, 452], [1030, 330], [1064, 330], [1064, 452]], 1.8);
  for (let i = 0; i < 9; i++) { X.key.fillStyle = rgba(P.sumi, .8); X.key.fillRect(670 + i * 48, 500, 22, 30); }
  X.gold.fillStyle = P.goldD; X.gold.fillRect(FR.x0, 560, FR.x1 - FR.x0, 18); line(X.key, [[FR.x0, 560], [FR.x1, 560]], 2.6); line(X.key, [[FR.x0, 578], [FR.x1, 578]], 1.6);
  sea(578, FR.y1); const SA = snap(); clear();
  // Y: the yard, a ladder against the hall wall
  bokashi(X.blue, FR.x0, FR.y0, FR.x1, 260, P.sumiL, .85, 0, { rough: 28, seed: 31 });
  X.pale.fillStyle = mix(P.pale, P.paper, .25); X.pale.fillRect(FR.x0, 150, FR.x1 - FR.x0, 770);
  for (let i = 0; i < 22; i++) line(X.key, [[FR.x0 + 40 + i * 86, 160], [FR.x0 + 40 + i * 86, 912]], 1.2, rgba(P.sumi, .4));
  line(X.key, [[FR.x0, 150], [FR.x1, 150]], 2.6); X.gold.fillStyle = mix(P.goldD, P.paper, .55); X.gold.fillRect(FR.x0, 920, FR.x1 - FR.x0, FR.y1 - 920); line(X.key, [[FR.x0, 920], [FR.x1, 920]], 2.4);
  const lad = (x0, x1) => { const r1 = [[x0, 922], [x0 + 70, 330]], r2 = [[x0 + 74, 922], [x0 + 144, 330]];
    knock(['pale'], xx => { poly(xx, [r1[0], [r1[0][0] + 14, 922], [r1[1][0] + 12, 330], r1[1]]); poly(xx, [r2[0], [r2[0][0] + 14, 922], [r2[1][0] + 12, 330], r2[1]]); });
    for (const r of [r1, r2]) { shape('blue', [r[0], [r[0][0] + 14, r[0][1]], [r[1][0] + 12, r[1][1]], r[1]], P.mid); sline(r[0], r[1], { w: 2.6, seed: r[0][0] }); sline([r[0][0] + 14, r[0][1]], [r[1][0] + 12, r[1][1]], { w: 2, seed: r[0][0] + 1 }); }
    for (let k = 1; k < 9; k++) { const t = k / 9, a = [lerp(x0 + 10, x0 + 78, t), lerp(922, 330, t)], b = [a[0] + 78, a[1]]; sline(a, b, { w: 3, seed: k + x0 }); } };
  lad(1340); const SY = snap(); clear();
  // O: an office in another city: window in rain, a desk with the pile
  X.pale.fillStyle = mix(P.paleL, P.paper, .4); X.pale.fillRect(FR.x0, FR.y0, FR.x1 - FR.x0, 880 - FR.y0);
  const win = rect(1080, 150, 620, 470); knock(['pale'], xx => poly(xx, win)); bokashi(X.blue, 1080, 150, 1700, 620, P.sumiL, .7, .2, { rough: 10, seed: 41 }); spoly(win, { w: 3, seed: 3 }, true);
  sline([1390, 150], [1390, 620], { w: 2.4, seed: 4 }); sline([1080, 385], [1700, 385], { w: 2.4, seed: 5 });
  for (let i = 0; i < 6; i++) { const bx = 1100 + i * 100, bh = 120 + (i * 53) % 140; X.blue.fillStyle = rgba(P.ind, .5); X.blue.fillRect(bx, 620 - bh, 70, bh); }
  X.gold.fillStyle = mix(P.goldD, P.paper, .5); X.gold.fillRect(FR.x0, 880, FR.x1 - FR.x0, FR.y1 - 880); sline([FR.x0, 880], [FR.x1, 880], { w: 2.4, seed: 6 });
  const desk = [[560, 690], [1240, 690], [1270, 712], [530, 712]]; flat('gold', desk, P.goldD, [0, 0]); spoly(desk, { w: 2.6, seed: 7 }, true);
  for (const [a, b] of [[[560, 712], [575, 960]], [[1240, 712], [1225, 960]]]) sline(a, b, { w: 3, seed: a[0] });
  for (let k = 0; k < 7; k++) { const p = rect(900 + (k % 2) * 6, 670 - k * 9, 260, 20); knock(['pale', 'gold'], xx => poly(xx, p)); spoly(p, { w: 1.6, seed: k + 20 }, true); }
  const SO = snap(); clear();
  // D: the desk, close: a pile, the one sheet on top
  X.gold.fillStyle = mix(P.goldD, P.paper, .3); X.gold.fillRect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0);
  for (let i = 0; i < 26; i++) line(X.key, [[FR.x0, FR.y0 + 40 + i * 38], [FR.x1, FR.y0 + 30 + i * 38]], 1, rgba(P.goldD, .55));
  for (let k = 0; k < 6; k++) { const p = rect(170 + k * 7, 240 + k * 6, 360, 470); knock(['gold'], xx => poly(xx, p)); spoly(p, { w: 1.6, seed: k + 40 }, true); }
  const SD = snap(); clear();
  // H: the assayer's bench, a bar of metal
  X.blue.fillStyle = P.indD; X.blue.fillRect(FR.x0, FR.y0, FR.x1 - FR.x0, FR.y1 - FR.y0); bokashi(X.pale, FR.x0, 300, FR.x1, FR.y1, P.mid, 0, .5, { rough: 24, seed: 51 });
  const bench = [[FR.x0, 760], [FR.x1, 760], [FR.x1, FR.y1], [FR.x0, FR.y1]]; flat('gold', bench, P.goldD, [0, 0]); sline([FR.x0, 760], [FR.x1, 760], { w: 3, seed: 52 });
  const bar = [[620, 640], [1300, 640], [1360, 760], [560, 760]]; flat('gold', bar, P.goldL, [0, 0]); spoly(bar, { w: 3, seed: 53 }, true);
  sline([640, 660], [1290, 660], { w: 1.4, seed: 54 }); shatch(bar, { gap: 9, ang: 1.25, w: 1.4, seed: 55, x0: 1180, x1: 1370 });
  const SH = snap(); clear();
  // G: the works by day, the crest on the gable
  sky(520, false); X.pale.fillStyle = mix(P.pale, P.paper, .25); X.pale.fillRect(360, 420, 1200, 470);
  knock(['blue'], x => { x.moveTo(330, 420); x.lineTo(960, 230); x.lineTo(1590, 420); x.rect(360, 420, 1200, 470); }); X.gold.fillStyle = P.gold; X.gold.beginPath(); X.gold.moveTo(330, 420); X.gold.lineTo(960, 230); X.gold.lineTo(1590, 420); X.gold.fill();
  spoly([[330, 420], [960, 230], [1590, 420]], { w: 3, seed: 61 }, true); spoly([[360, 420], [360, 890], [1560, 890], [1560, 420]], { w: 2.6, seed: 62 });
  for (let i = 0; i < 14; i++) line(X.key, [[400 + i * 84, 430], [400 + i * 84, 880]], 1.2, rgba(P.sumi, .45));
  const door = rect(820, 600, 280, 290); knock(['pale'], xx => poly(xx, door)); X.red.fillStyle = P.orangeL; X.red.beginPath(); poly(X.red, door); X.red.fill(); spoly(door, { w: 2.6, seed: 63 });
  const crestG = [[960, 280], [1030, 345], [960, 410], [890, 345]]; flat('blue', crestG, P.ind, [0, 0]); const crestI = [[960, 305], [1005, 345], [960, 385], [915, 345]]; knock(['blue'], xx => poly(xx, crestI)); flat('gold', crestI, P.goldL, [0, 0]);
  spoly(crestG, { w: 3, seed: 64 }, true); spoly(crestI, { w: 2, seed: 65 }, true);
  X.gold.fillStyle = mix(P.goldD, P.paper, .55); X.gold.fillRect(FR.x0, 890, FR.x1 - FR.x0, FR.y1 - 890); sline([FR.x0, 890], [FR.x1, 890], { w: 2.4, seed: 66 });
  const SG = snap(); clear();
  // W: under the water
  X.blue.fillStyle = P.blue; X.blue.fillRect(0, 0, W, H); bokashi(X.blue, 0, FR.y0, W, FR.y1, P.indD, .1, .95, { rough: 30, seed: 8 });
  for (let k = 0; k < 6; k++) { X.pale.fillStyle = rgba(P.pale, .2); X.pale.beginPath(); const x0 = 200 + k * 260; X.pale.moveTo(x0, FR.y0); X.pale.lineTo(x0 + 90, FR.y0); X.pale.lineTo(x0 - 140, FR.y1); X.pale.lineTo(x0 - 260, FR.y1); X.pale.fill(); }
  const SW = snap(); clear();
  const SC = snap();
  const markImg = new Image(); markImg.src = '../../../assets/img/arvo-mark-1-1200.webp'; await markImg.decode();

  const stroke9 = [[1520, 110], [1660, 330], [1700, 560], [1640, 800], [1460, 1000]];
  const CUTS = [0, 2.98, 4.95, 6.96, 10.72, 12.77, 14.69, 17.41, 20.67, 21.97, 24.33, 25.98];
  window.END = 30.5;
  const tmp = mk(), tx = tmp.getContext('2d');
  const SHOTS = [
    (u, t) => { restore(SA); // 1 every morning, I look at the same water
      const sw = (x0, v, w = 1700) => FR.x0 - 300 + ((x0 + v * t - FR.x0 + 300) % w + w) % w;
      fish(sw(900, -38), 720, 360, .06, 1); fish(sw(300, 30), 860, 340, -.05, -1); fish(sw(1300, -24), 960, 320, .1, 1); fish(sw(700, 46), 1000, 300, .0, -1);
      const jet = [[FR.x0, 790], [560, 760], [600, 800], [FR.x0, 840]]; knock(['blue', 'pale'], xx => poly(xx, jet)); shape('gold', jet, P.goldD); outline(jet, 2.6);
      for (const px of [120, 330, 540]) { const pile = [[px, 820], [px + 22, 818], [px + 22, 980], [px, 980]]; knock(['blue', 'pale'], xx => poly(xx, pile)); shape('gold', pile, P.goldD); outline(pile, 2); }
      henrikSharp(330, 800, 400, { t }); mist(700 + t * 14, 455, 1100, 46); mist(1500 - t * 10, 500, 700, 36);
      return x => { const e = slip(x, 1800, 70, 'THE SAME WATER', 'Monday, 05:40'); }; },
    (u, t) => { restore(SY); // 2 my people do perfect work: Sami at the ladder, sparks
      samiSharp(1080, 1000, 600, { stride: .2, seed: 2, lean: .02 });
      const rr = mulberry(Math.floor(t * 18)); for (let i = 0; i < 16; i++) { const a = -Math.PI * (.15 + rr() * .7), L = 20 + rr() * 70, x0 = 1400, y0 = 610; sline([x0, y0], [x0 + Math.cos(a) * L * (rr() < .5 ? -1 : 1), y0 + Math.sin(a) * L], { w: 2.2, over: 0, seed: i + t }); }
      const fl = [[1392, 598], [1410, 604], [1404, 620], [1388, 614]]; flat('red', fl, P.orangeL, [0, 0]); rain(t, 240, .35); },
    (u, t) => { restore(SY); // 3 then they zip their jackets over the name
      samiSharp(1080, 1000, 600, { stride: .2, zip: ease((u - .5) / 1.1), helmet: false, seed: 2, lean: .02 }); rain(t, 240, .35); },
    (u, t) => { restore(SO); // 4 somewhere, a stranger opens my tender
      evaluatorSharp(720, 960, 520, { dir: 1, seed: 3 }); doc(900, 560 - ease((u - .8) / 1) * 30, 240, 110, { rot: -.05 }); rain(t, 160, .4, 1080, 150, 1700, 620); },
    (u, t) => { restore(SD); // 5 four seconds. that's all I get
      const slide = ease((u - 2.4) / .9); doc(200 + 40 - slide * 900, 260, 360, 470, { rot: -.03 - slide * .3 });
      for (let k = 0; k < 4; k++) if (u > .45 + k * .42) { const x0 = 1100 + k * 70; sline([x0, 380], [x0 + 12, 600], { w: 7, seed: k * 3 }); }
      if (u > 2.05) sline([1060, 560], [1360, 420], { w: 7, seed: 13 }); },
    (u, t) => { restore(SH); // 6 a hallmark used to settle that
      const hit = 1.0, dn = ease(u / hit), py = lerp(120, 560, dn);
      const punch = [[930, py - 380], [990, py - 380], [985, py], [935, py]]; X.key.fillStyle = P.sumi; X.key.beginPath(); poly(X.key, punch); X.key.fill();
      if (u > hit) { const m = [[940, 680], [980, 680], [980, 720], [940, 720]]; flat('red', m, P.orange, [0, 0]); spoly(m, { w: 2, seed: 71 }, true); }
      if (u > hit && u < hit + .4) { const k = (u - hit) / .4; for (let i = 0; i < 10; i++) { const a = -Math.PI + i * Math.PI / 9; sline([960 + Math.cos(a) * 60, 700 + Math.sin(a) * 60], [960 + Math.cos(a) * (60 + 120 * k), 700 + Math.sin(a) * (60 + 120 * k)], { w: 3, over: 0, seed: i + 70 }); } } },
    (u, t) => { restore(SH); // 7 you saw the mark, you trusted the metal
      const m = [[940, 680], [980, 680], [980, 720], [940, 720]]; flat('red', m, P.orange, [0, 0]); spoly(m, { w: 2, seed: 71 }, true);
      const sx = lerp(500, 1400, ease(u / 2)); knock(['gold'], xx => poly(xx, [[sx, 640], [sx + 40, 640], [sx - 20, 760], [sx - 60, 760]])); },
    (u, t) => { restore(SG); mist(560 + u * 20, 520, 700, 40); mist(1480 - u * 16, 600, 520, 32); }, // 8 a crest told you whose house you were in
    (u, t) => { restore(SW); // 9 so we drew ours properly
      const g = ease(u / 1.1), pts = stroke9.slice(0, 2 + Math.floor(g * 3)); const last = pts.length - 1;
      if (g < 1) { const a = stroke9[last - 1] || stroke9[0], b = stroke9[last], f = (g * 3) % 1 || 1; pts[last] = [lerp(a[0], b[0], f), lerp(a[1], b[1], f)]; }
      const tk = mk(), tkx = tk.getContext('2d'); carve(tkx, pts, 46, { col: '#000', taper: [.12, .3], jit: .3, seed: 5 }); X.blue.save(); X.blue.globalCompositeOperation = 'destination-out'; X.blue.drawImage(tk, 0, 0); X.blue.restore();
      carve(X.gold, pts, 46, { col: P.gold, taper: [.12, .3], jit: .3, seed: 5 }); carve(X.gold, pts.map(([a, b]) => [a - 8, b - 4]), 16, { col: P.goldL, taper: [.2, .4], seed: 6 });
      const tn = ease(u / 1.2); fish(1100, 330, 400, lerp(.5, -.05, tn), -1, .1); fish(1040, 580, 440, lerp(-.6, 0, tn), -1, .08); fish(1100, 830, 400, lerp(.7, .06, tn), -1, .1); fish(500, 450, 340, lerp(2.4, .2, tn), -1, .4); },
    (u, t) => { restore(SY); samiSharp(900, 1000, 600, { stride: .2, seed: 2, lean: .02 }); henrikSharp(560, 1000, 640, { t, dir: 1 }); }, // 10 same work. same people
    (u, t) => { restore(SD); doc(240, 260, 360, 470, { crest: true, grey: false, rot: -.03 }); }, // 11 now the mark tells the story
    (u, t) => { restore(SC); return x => { // 12 competence everyone can see
      x.save(); x.globalAlpha = ease(u / .6); x.drawImage(markImg, 960 - 260, 300, 520, 520 * markImg.height / markImg.width);
      x.fillStyle = P.sumi; x.textAlign = 'center'; x.font = '400 64px "EB Garamond"'; x.fillText('Competence everyone can see.', 960, 640);
      x.font = 'italic 400 28px "EB Garamond"'; x.fillText('arvorealta.com', 960, 720); x.restore(); seal(x, 'A', 960, 820, 52); }; },
  ];
  window.seek = t => {
    R = mulberry(77); let i = 0; while (i + 1 < CUTS.length && t >= CUTS[i + 1]) i++;
    const u = t - CUTS[i], dur = (CUTS[i + 1] || window.END) - CUTS[i];
    const extra = SHOTS[i](u, t); compose(extra);
    const k = 1 + .03 * (u / dur); tx.clearRect(0, 0, W, H); tx.drawImage(c, 0, 0); out.save(); out.translate(W / 2, H / 2); out.scale(k, k); out.drawImage(tmp, -W / 2, -H / 2); out.restore();
    return i;
  };
}
if (F === 30) {
  Object.values(X).forEach(clipFrame);
  drawModel(30, 960 - 2 * 30 * .866, 330);
  compose(x => { const e = slip(x, 1800, 70, 'THE WORKS', 'from above'); seal(x, 'A', 1800, e + 46, 52); });
}
if (F === 40) { // the opening: the camera glides across the model and settles on Henrik
  Object.values(X).forEach(clipFrame);
  const clear = () => Object.values(X).forEach(x => x.clearRect(0, 0, W, H));
  const e3 = t => t < 0 ? 0 : t > 1 ? 1 : t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const C30 = Math.cos(Math.PI / 6);
  // camera keys: [time, zoom (px per unit), world x, world y, world z at the centre of the screen]
  const KEYS = [[0, 20, 24, 2, 3], [2.2, 30, 15, 8, 2], [5.0, 92, 4.2, 19, 1.1]];
  window.END = 5.0;
  window.seek = t => {
    let i = 0; while (i + 2 < KEYS.length && t >= KEYS[i + 1][0]) i++;
    const [t0, ...A] = KEYS[i], [t1, ...Bk] = KEYS[i + 1], f = e3((t - t0) / (t1 - t0));
    const k = A[0] * Math.pow(Bk[0] / A[0], f), wx = lerp(A[1], Bk[1], f), wy = lerp(A[2], Bk[2], f), wz = lerp(A[3], Bk[3], f);
    const ox = 960 - (wx - wy) * C30 * k, oy = 540 - (wx + wy) * .5 * k + wz * k;
    clear(); drawModel(k, ox, oy, t * 18); compose();
    if (t < .6) { out.save(); out.globalAlpha = 1 - t / .6; out.drawImage(TX.paper, 0, 0); out.restore(); } // the print arrives out of the paper
    return k;
  };
}
document.title = 'done';
