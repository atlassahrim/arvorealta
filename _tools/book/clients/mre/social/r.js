const {chromium}=require('playwright');const path=require('path');
const D=__dirname, OUT='/home/user/arvorealta/_tools/book/clients/mre/out/';
const J=[['link','1200x630','g=leitura&mw=500px&dy=0'],['linkedin-banner','1128x191','flat=1&mw=440px'],['square','1080x1080','g=passos&mw=620px'],['portrait','1080x1350','g=colheita&mw=640px&line=1&ls=58px&lg=40px'],['story','1080x1920','g=leitura&mw=700px&line=1&ls=62px&lg=46px&dy=-40px']];
(async()=>{const b=await chromium.launch();
for(const [n,sz,qs] of J){const [w,h]=sz.split('x').map(Number);const p=await b.newPage({viewport:{width:w,height:h}});
await p.goto('file://'+D+'/t.html?w='+w+'&h='+h+'&'+qs);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:OUT+`mulheresreais_social_${n}_${sz}.png`});console.log(n,sz);}
await b.close()})();
