const {chromium}=require('playwright');(async()=>{const out=process.argv[2],fps=25,from=+process.argv[3]||0,to=+process.argv[4]||1e9;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/_film/henrik/ukiyoe/?f=50');await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
const n=Math.min(to,Math.round(await p.evaluate(()=>window.END)*fps));for(let i=from;i<n;i++){await p.evaluate(t=>window.seek(t),i/fps);await p.screenshot({path:`${out}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:90});}
await b.close();console.log('done',from,n)})();
