// node render.js <outdir> [fps]
const {chromium}=require('playwright');
(async()=>{const out=process.argv[2],fps=+process.argv[3]||30;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
 await p.goto('http://localhost:8765/_film/brand/?render');await p.evaluate(()=>document.fonts.ready);
 await p.waitForLoadState('networkidle');await p.evaluate(()=>window.ready);const END=await p.evaluate(()=>window.END);
 const n=Math.round(END*fps);
 for(let i=0;i<n;i++){await p.evaluate(t=>window.seek(t),i/fps);
  await p.screenshot({path:`${out}/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});}
 await b.close();console.log(n,'frames')})();
