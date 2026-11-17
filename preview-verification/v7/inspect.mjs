import puppeteer from 'puppeteer';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
const browser = await puppeteer.launch({headless:true,pipe:true});
const report=[];
try {
  const page=await browser.newPage();
  page.on('pageerror',e=>console.log(e.message));
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const [width,height] of [[1440,900],[1024,900],[390,844]]) {
    await page.setViewport({width,height,deviceScaleFactor:1});
    await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});
    await page.evaluate(()=>document.fonts.ready);
    const hide=await page.addStyleTag({content:'.it-hero-stage *, .it-services [class*="obj"] { visibility: hidden !important; }'});
    if(width!==1024) await page.screenshot({path:`public/preview/vifa-${width===1440?'desktop':'mobile'}.png`,captureBeyondViewport:false});
    await hide.dispose(); // Removing the element restores every device.
    await page.evaluate(()=>document.querySelectorAll('style').forEach(s=>{if(s.textContent.includes('visibility: hidden !important'))s.remove()}));
    await page.reload({waitUntil:'networkidle0'});
    await page.evaluate(()=>document.fonts.ready);
    const metrics=await page.evaluate(()=>({width:innerWidth,page:document.documentElement.scrollWidth,hero:document.querySelector('#hero').getBoundingClientRect().toJSON(),stage:document.querySelector('.it-hero-stage').getBoundingClientRect().toJSON(),details:document.querySelector('.it-industry-details-stack').getBoundingClientRect().toJSON(),cards:[...document.querySelectorAll('.it-card')].map(e=>({rect:e.getBoundingClientRect().toJSON(),background:getComputedStyle(e).backgroundColor}))}));
    report.push(metrics);
    await page.screenshot({path:`preview-verification/v7/${width}-initial.png`,captureBeyondViewport:false});
    await page.screenshot({path:`preview-verification/v7/${width}-full.png`,fullPage:true});
    const sections=await page.evaluate(()=>[...document.querySelectorAll('main>section')].map(e=>({id:e.id,y:e.offsetTop,height:e.offsetHeight})));
    for(const s of sections) await sharp(`preview-verification/v7/${width}-full.png`).extract({left:0,top:s.y,width,height:s.height}).toFile(`preview-verification/v7/${width}-section-${s.id}.png`);
    console.log(JSON.stringify(metrics));
  }
} finally { await writeFile('preview-verification/v7/inspection.json',JSON.stringify(report,null,2));await browser.close(); }
