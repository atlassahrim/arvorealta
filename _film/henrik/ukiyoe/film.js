const {chromium}=require('playwright');(async()=>{const out=process.argv[2],fps=25,dur=+process.argv[3]||8.6;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/_film/henrik/ukiyoe/?f=10');await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
const n=Math.round(dur*fps);for(let i=0;i<n;i++){await p.evaluate(t=>window.seek(t),i/fps);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:90});}
await b.close();console.log(n)})();
