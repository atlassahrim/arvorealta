// A brand book's favicon as transparent PNGs, for browsers that take no SVG
// favicon (Chrome on iPad and iPhone). One colour, no ground: the symbol in the
// brand's dark, which is what a light browser shows.
//
//   node _tools/book/kit/favicon_png.js <favicon.svg> <out-prefix>
//
// Writes <out-prefix>-32.png and -192.png (the dark symbol, for light browsers)
// and <out-prefix>-light-32.png and -light-192.png (white, for dark ones) from
// the SVG written by favicon.py, rendered under each colour scheme in turn.
// The page swaps to the light pair in dark mode with a line of script, because
// Chrome on iOS reads neither SVG favicons nor media queries on icon links.
const {chromium} = require('playwright');
const fs = require('fs'), path = require('path');
const [src, prefix] = process.argv.slice(2);
if (!src || !prefix) { console.error('usage: favicon_png.js <favicon.svg> <out-prefix>'); process.exit(1); }
const svg = fs.readFileSync(src, 'utf8');
(async () => {
  const b = await chromium.launch();
  for (const [scheme, tag] of [['light', ''], ['dark', '-light']]) for (const s of [32, 192]) {
    const p = await b.newPage({viewport: {width: s, height: s}, colorScheme: scheme});
    await p.setContent(`<html><body style="margin:0;background:transparent"><img style="display:block;width:${s}px;height:${s}px" src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"></body></html>`);
    await p.waitForTimeout(150);
    const out = `${prefix}${tag}-${s}.png`;
    await p.screenshot({path: out, omitBackground: true});
    console.log('wrote', out);
  }
  await b.close();
})();
