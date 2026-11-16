const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));
for(const f of [1,2,3]){await p.goto(`http://localhost:8765/_film/henrik/ukiyoe/?f=${f}`);await p.waitForFunction(()=>document.title==='done',null,{timeout:180000});
await p.screenshot({path:`/home/user/arvorealta/_film/henrik/ukiyoe/u-${f}.jpg`,type:'jpeg',quality:90});}await b.close()})();
