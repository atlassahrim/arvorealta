const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/_film/henrik/ukiyoe/?f=40');await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
for(const [i,t] of [0.8,2.2,3.6,4.96].entries()){await p.evaluate(t=>window.seek(t),t);await p.screenshot({path:`/tmp/claude-0/-home-user-arvorealta/7de0f7b7-cfec-55d9-b1a6-ea0cd1459a63/scratchpad/o${i}.jpg`,type:'jpeg',quality:70});}
await b.close()})();
