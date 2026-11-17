import puppeteer from 'puppeteer';
import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const browser=await puppeteer.launch({headless:true,pipe:true,protocolTimeout:30000});
const out='preview-verification/v8';const report=[];
try {
 const page=await browser.newPage();
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
 page.on('pageerror',e=>console.log(e.message));
 for(const [width,height] of [[1440,900],[1024,900],[390,844]]) {
  await page.setViewport({width,height,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  const sections=await page.evaluate(()=>[...document.querySelectorAll('main>section')].map(e=>({id:e.id,y:e.offsetTop,height:e.offsetHeight,background:getComputedStyle(e).backgroundColor})));
  await page.screenshot({path:`${out}/${width}-full.png`,fullPage:true});
  for(const s of sections.filter(s=>s.id!=='hero'))await sharp(`${out}/${width}-full.png`).extract({left:0,top:s.y,width,height:s.height}).toFile(`${out}/${width}-${s.id}.png`);
  const metrics=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth,how:[...document.querySelectorAll('.it-start-card')].map(e=>e.getBoundingClientRect().toJSON()),cards:[...document.querySelectorAll('.it-card')].map(e=>({card:e.getBoundingClientRect().toJSON(),text:e.querySelector('.it-card-top').getBoundingClientRect().toJSON(),device:e.querySelector('.it-device-stage').getBoundingClientRect().toJSON()}))}));
  report.push({width,sections,metrics});console.log(JSON.stringify({width,sections}));
  await page.click('.it-faq-question');await new Promise(r=>setTimeout(r,50));
  const expanded=await page.$eval('#questions',e=>({y:e.offsetTop,height:e.offsetHeight}));
  await page.screenshot({path:`${out}/${width}-faq-open-full.png`,fullPage:true});
  await sharp(`${out}/${width}-faq-open-full.png`).extract({left:0,top:expanded.y,width,height:expanded.height}).toFile(`${out}/${width}-faq-open.png`);
 }
}finally{await writeFile(`${out}/inspection.json`,JSON.stringify(report,null,2));await browser.close();}
