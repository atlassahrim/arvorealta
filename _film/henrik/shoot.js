const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
for(const f of [1,2,3]){await p.goto(`http://localhost:8765/_film/henrik/frames.html?f=${f}`);await p.waitForFunction(()=>document.title==='done',null,{timeout:120000});
await p.screenshot({path:`/home/user/arvorealta/_film/henrik/frame-${f}.png`});}await b.close()})();
