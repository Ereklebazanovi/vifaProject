import puppeteer from 'puppeteer';
import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const browser=await puppeteer.launch({headless:true,pipe:true,protocolTimeout:30000});
const out='preview-verification/v9',report=[];
try {
 const page=await browser.newPage();await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 page.on('pageerror',e=>console.log(e.message));
 for(const [width,height]of [[1440,900],[1024,900],[390,844]]) {
  await page.setViewport({width,height,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  if(width!==1024){const style=await page.addStyleTag({content:'.it-service-grid .it-device-stage {visibility:hidden!important}'});await page.screenshot({path:`public/preview/vifa-${width===1440?'desktop':'mobile'}.png`,captureBeyondViewport:false});await style.evaluate(e=>e.remove());}
 }
 // Recapture after both public assets are replaced, including the mobile inset.
 for(const [width,height]of [[1440,900],[1024,900],[390,844]]) {
  await page.setViewport({width,height,deviceScaleFactor:1});await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  await page.screenshot({path:`${out}/${width}-first-screen.png`,captureBeyondViewport:false});
  await page.screenshot({path:`${out}/${width}-full.png`,fullPage:true});
  const layout=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth,
   sections:[...document.querySelectorAll('main>section')].map(e=>({id:e.id,y:e.offsetTop,height:e.offsetHeight,background:getComputedStyle(e).backgroundColor})),
   grid:document.querySelector('#services').getBoundingClientRect().toJSON(),intro:document.querySelector('.it-directions-intro').getBoundingClientRect().toJSON(),
   tiles:[...document.querySelectorAll('.it-industry-tile')].map(e=>e.getBoundingClientRect().toJSON()),
   cards:[...document.querySelectorAll('.it-card')].map(e=>e.getBoundingClientRect().toJSON())}));
  for(const s of layout.sections)await sharp(`${out}/${width}-full.png`).extract({left:0,top:s.y,width,height:s.height}).toFile(`${out}/${width}-${s.id}.png`);
  report.push(layout);console.log(JSON.stringify(layout));
 }
} finally{await writeFile(`${out}/inspection.json`,JSON.stringify(report,null,2));await browser.close();}
