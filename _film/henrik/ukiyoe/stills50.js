const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/_film/henrik/ukiyoe/?f=50');await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
const ts=[13.5,16.2,17.2,17.6];
for(const [i,t] of ts.entries()){await p.evaluate(t=>window.seek(t),t);await p.screenshot({path:`/tmp/claude-0/-home-user-arvorealta/7de0f7b7-cfec-55d9-b1a6-ea0cd1459a63/scratchpad/i${i}.jpg`,type:'jpeg',quality:70});}
await b.close()})();
