// The Same Water: three ukiyo-e styleframes, coloured from the owner's fish reference.
import { W, H, FR, mk, buildTextures, TX, inkify, carve, fillPath, bokashi, kasumi, wob, smooth, dense, sealCanvas, rgba, mix } from './print.js';
import { mulberry, clamp, lerp, TAU } from './lib.js';
const F = +(new URLSearchParams(location.search).get('f') || 1);
// pigment set sampled by eye from the fish reference
const P = { paper:'#ece2ca', ind:'#0f2b55', indD:'#0a1f3f', blue:'#1d4c85', mid:'#3c7ec3', pale:'#9cc7e6', paleL:'#c9dfec',
  gold:'#bd9059', goldL:'#dcb984', goldD:'#7a5a2e', orange:'#d9591e', orangeL:'#f0a060', sumi:'#14192a', sumiL:'#3a4152' };
await document.fonts.load('400 40px "EB Garamond"'); await document.fonts.load('italic 400 40px "EB Garamond"');
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

function mist(cx, cy, w, h) { knock(['blue', 'pale', 'red'], x => { x.moveTo(cx - w / 2 + h / 2, cy - h / 2); x.lineTo(cx + w / 2 - h / 2, cy - h / 2); x.arc(cx + w / 2 - h / 2, cy, h / 2, -Math.PI / 2, Math.PI / 2); x.lineTo(cx - w / 2 + h / 2, cy + h / 2); x.arc(cx - w / 2 + h / 2, cy, h / 2, Math.PI / 2, Math.PI * 1.5); }); }
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
  sketchFigure(330, 800, 360, { cup: true, tie: true, coat: mix(P.goldL, P.paper, .35), hat: true });
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
  sketchFigure(540, 1015, 250, { walk: true, coat: P.blue, short: true, bag: true }); sketchFigure(740, 1000, 235, { walk: true, coat: P.ind, crest: true, hatch: true });
  sketchFigure(1250, 1010, 245, { walk: true, dir: -1, coat: P.mid, short: true, dark: true }); sketchFigure(1430, 1022, 255, { walk: true, dir: -1, coat: P.ind, crest: true });
  sketchFigure(1010, 905, 160, { tie: true, coat: mix(P.goldL, P.paper, .35), hat: true }); // Henrik at the door
  mist(560, 520, 700, 40); mist(1500, 560, 560, 34);
  // rain: two sets of fine straight lines at slightly different angles
  const rain = (n, ang, col, wd) => { X.key.strokeStyle = col; X.key.lineWidth = wd; for (let i = 0; i < n; i++) { const x0 = FR.x0 + R() * (FR.x1 - FR.x0 + 400) - 200, y0 = FR.y0 + R() * (FR.y1 - FR.y0), L = 60 + R() * 120; X.key.beginPath(); X.key.moveTo(x0, y0); X.key.lineTo(x0 + Math.sin(ang) * L, y0 + Math.cos(ang) * L); X.key.stroke(); } };
  rain(900, .18, rgba(P.sumi, .55), 1.1); rain(600, .26, rgba(P.sumiL, .45), .9);
  compose(x => { const e = slip(x, 1800, 70, 'EVERYONE CAN SEE IT', 'the next Monday'); seal(x, 'A', 1800, e + 46, 52); });
}
document.title = 'done';
