const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>m.type()==='error'&&console.log('CON',m.text()));
await p.goto('http://localhost:8765/_film/henrik/ukiyoe/?f=20');await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
const ts=[1.5,3.9,6.2,8.5,12.3,13.9,15.8,18.5,21.5,23,25,28];
for(const [i,t] of ts.entries()){await p.evaluate(t=>window.seek(t),t);await p.screenshot({path:`/tmp/claude-0/-home-user-arvorealta/7de0f7b7-cfec-55d9-b1a6-ea0cd1459a63/scratchpad/s${i}.jpg`,type:'jpeg',quality:70});}
await b.close()})();
