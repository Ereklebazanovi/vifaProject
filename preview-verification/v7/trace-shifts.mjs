import puppeteer from 'puppeteer';
import { writeFile } from 'node:fs/promises';
const browser=await puppeteer.launch({headless:true,pipe:true});
try {
 const page=await browser.newPage();await page.setViewport({width:1024,height:900});
 await page.evaluateOnNewDocument(()=>{
   window.__trace={events:[],shifts:[]};
   new PerformanceObserver(list=>{for(const e of list.getEntries())window.__trace.shifts.push({time:e.startTime,value:e.value,input:e.hadRecentInput,sources:e.sources.map(s=>({node:s.node?.outerHTML.slice(0,250),previous:s.previousRect.toJSON(),current:s.currentRect.toJSON()}))});}).observe({type:'layout-shift',buffered:true});
 });
 await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(()=>window.__trace.events.push({name:'fontsReady',time:performance.now()}));
 await page.click('label:has(input[value="retail"]) .it-industry-choice-label');
 await page.evaluate(()=>window.__trace.events.push({name:'clickedRetail',time:performance.now()}));
 await new Promise(r=>setTimeout(r,8500));
 const trace=await page.evaluate(()=>window.__trace);await writeFile('preview-verification/v7/shift-trace.json',JSON.stringify(trace,null,2));console.log(JSON.stringify(trace));
}finally{await browser.close();}
