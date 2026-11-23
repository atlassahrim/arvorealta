// Before running, copy beside t.html: ground-{ardosia,pedra,areia}.jpg from Drive
// (05 Imagery), and eliria-mark-1-1200.webp and eliria-wordmark-{sand-2,ardosia-1}.svg
// from brand/book-eli/img/. They are not kept in the repository.
const {chromium}=require('playwright');
const D=__dirname, OUT='/home/user/arvorealta/_tools/book/clients/eli/out/';
const J=[['link','1200x630','g=ardosia&mw=460px'],
 ['linkedin-banner','1128x191','mw=190px'],
 ['square','1080x1080','g=pedra&mw=560px'],
 ['portrait','1080x1350','g=areia&mw=580px&wm=eliria-wordmark-ardosia-1.svg&line=1&ls=34px&lg=64px&lc=%23252F37&lw=640px'],
 ['story','1080x1920','g=ardosia&mw=640px&line=1&ls=40px&lg=72px&lw=700px&dy=-40px']];
(async()=>{const b=await chromium.launch();
for(const [n,sz,qs] of J){const [w,h]=sz.split('x').map(Number);const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file://'+D+'/t.html?w='+w+'&h='+h+'&'+qs);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:OUT+`eliria_social_${n}_${sz}.png`});console.log(n,sz);}
await b.close()})();
