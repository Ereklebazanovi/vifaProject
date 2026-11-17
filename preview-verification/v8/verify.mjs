import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import puppeteer from 'puppeteer';
const out='preview-verification/v8';const pause=ms=>new Promise(r=>setTimeout(r,ms));
const report={result:'RUNNING',layouts:[],motion:[],accordion:[],reduced:[],links:[],errors:[],warnings:[],notices:[]};
const web=await readFile('src/offeredServices/WebDev.tsx','utf8');
const chatbot=await readFile('src/pages/AIChatbot.tsx','utf8');
const normalize=s=>s.replace(/[\u2013\u2014]/g,',');
const allWeb=[...web.matchAll(/question:\s*("(?:[^"\\]|\\.)*"),\s*answer:\s*("(?:[^"\\]|\\.)*")/g)].map(m=>({question:JSON.parse(m[1]),answer:JSON.parse(m[2])}));
const bot=k=>JSON.parse(chatbot.match(new RegExp('"faq.q1.'+k+'":\\s*("(?:[^"\\\\]|\\\\.)*")'))[1]);
const expectedFaqs=[allWeb[0],allWeb[1],{question:bot('question'),answer:bot('answer')+' '+bot('details')},allWeb[4],allWeb[5]].map(({question,answer})=>({question:normalize(question),answer:normalize(answer)}));
const spec=await readFile('CODEX_PILOT_V8.md','utf8');
const expectedCards=spec.slice(spec.indexOf('## 1.'),spec.indexOf('## 2.')).split('\n').filter(line=>/^\| (საიტი|AI ჩატბოტი|Invento WMS|LineUp) \|/.test(line)).map(line=>line.split('|').slice(1,-1).map(s=>s.trim()));
assert.equal(expectedCards.length,4);assert.equal(expectedFaqs.length,5);
const browser=await puppeteer.launch({headless:true,pipe:true,protocolTimeout:30000});
async function setup(page) {
 await page.setRequestInterception(true);
 page.on('request',r=>{const u=new URL(r.url());if(['127.0.0.1','localhost'].includes(u.hostname)||['data:','blob:'].includes(u.protocol))r.continue();else r.respond({status:204,body:''});});
 page.on('pageerror',e=>report.errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')report.errors.push(m.text());if(m.type()==='warn'){if(m.text().startsWith('You have Reduced Motion enabled'))report.notices.push(m.text());else report.warnings.push(m.text());}});
 await page.evaluateOnNewDocument(()=>{
  window.__v8={outbound:[],shifts:[]};
  document.addEventListener('click',e=>{const a=e.target.closest?.('a[href^="https://wa.me/"]');if(a){e.preventDefault();window.__v8.outbound.push({href:a.href,target:a.target});}},true);
  new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__v8.shifts.push({time:e.startTime,value:e.value});}).observe({type:'layout-shift',buffered:true});
 });
}
const scroll=(p,sel,block='center')=>p.$eval(sel,(e,block)=>e.scrollIntoView({block,behavior:'instant'}),block);
async function verify(width,height) {
 const context=await browser.createBrowserContext();const page=await context.newPage();await setup(page);
 await page.setViewport({width,height,deviceScaleFactor:1});
 await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
 const copy=await page.evaluate(()=>({
  cards:[...document.querySelectorAll('.it-card')].map(e=>[e.querySelector('.it-card-title').textContent,e.querySelector('.it-card-eyebrow').textContent,e.querySelector('.it-card-body').textContent,e.querySelector('.it-card-facts').textContent]),
  faqs:[...document.querySelectorAll('.it-faq-item')].map(e=>({question:e.querySelector('button>span').textContent,answer:e.querySelector('.it-faq-answer p').textContent})),
  schema:JSON.parse([...document.querySelectorAll('script[type="application/ld+json"]')].find(e=>JSON.parse(e.textContent)['@type']==='FAQPage').textContent),
  robots:document.querySelector('meta[name="robots"]').content,
 }));
 assert.deepEqual(copy.cards,expectedCards);assert.deepEqual(copy.faqs,expectedFaqs);assert.equal(copy.schema['@context'],'https://schema.org');assert.equal(copy.schema.mainEntity.length,5);
 assert.deepEqual(copy.schema.mainEntity.map(e=>({question:e.name,answer:e.acceptedAnswer.text})),expectedFaqs);assert.ok(copy.schema.mainEntity.every(e=>e['@type']==='Question'&&e.acceptedAnswer['@type']==='Answer'));assert.equal(copy.robots,'noindex,nofollow');
 report.sourceMatch={questions:5,answers:'verbatim, chatbot answer plus details',jsonLd:'valid JSON, same five answers',cards:4};
 assert.ok(await page.$$eval('.it-faq-question',es=>es.every(e=>e.getAttribute('aria-expanded')==='false')));
 const layout=await page.evaluate(()=>{
  const scrollers=[];for(const e of document.querySelectorAll('body *'))if(e.clientWidth>0&&e.scrollWidth>e.clientWidth+1){const before=e.scrollLeft;e.scrollLeft=2;if(e.scrollLeft>0)scrollers.push({tag:e.tagName,class:String(e.className)});e.scrollLeft=before;}
  return {width:innerWidth,page:document.documentElement.scrollWidth,scrollers,sections:[...document.querySelectorAll('main>section')].map(e=>({id:e.id,bg:getComputedStyle(e).backgroundColor})),contactCard:getComputedStyle(document.querySelector('.it-contact-card')).backgroundColor,
    howColumns:getComputedStyle(document.querySelector('.it-start-steps')).gridTemplateColumns,
    howCards:[...document.querySelectorAll('.it-start-card')].map(e=>({height:e.offsetHeight,bg:getComputedStyle(e).backgroundColor,padding:getComputedStyle(e).padding,border:getComputedStyle(e).borderWidth,shadow:getComputedStyle(e).boxShadow,artifact:e.querySelector('.it-start-artifact-space').offsetHeight})),
    cardOverlap:[...document.querySelectorAll('.it-card')].map(e=>({product:e.dataset.product,textBottom:e.querySelector('.it-card-top').getBoundingClientRect().bottom,deviceTop:e.querySelector('.it-device-stage').getBoundingClientRect().top})),
    faqHeight:document.querySelector('#questions').offsetHeight,closedAnswers:[...document.querySelectorAll('.it-faq-answer')].map(e=>e.offsetHeight)};
 });
 assert.equal(layout.page,width);assert.deepEqual(layout.scrollers,[]);assert.deepEqual(layout.sections.map(e=>e.id),['hero','services','getting-started','questions','contact']);
 assert.deepEqual(layout.sections.map(e=>e.bg),['rgb(255, 255, 255)','rgb(245, 245, 247)','rgb(255, 255, 255)','rgb(245, 245, 247)','rgb(255, 255, 255)']);assert.equal(layout.contactCard,'rgb(245, 245, 247)');assert.ok(layout.closedAnswers.every(h=>h===0));
 assert.equal(layout.howColumns.split(' ').length,width>=900?3:1);for(const c of layout.howCards){assert.equal(c.bg,'rgb(245, 245, 247)');assert.equal(c.padding,'24px');assert.equal(c.border,'0px');assert.equal(c.shadow,'none');assert.equal(c.artifact,180);}assert.ok(layout.cardOverlap.every(e=>e.textBottom<=e.deviceTop+1));report.layouts.push(layout);
 // Observe real scene steps while crossing the section's 50% threshold.
 await page.evaluate(()=>{const list=document.querySelector('.it-start-steps');window.__v8.motion=[];window.__v8.shifts=[];window.__v8.observer=new MutationObserver(()=>{const step=+list.dataset.sceneStep;if(window.__v8.motion.at(-1)?.step!==step)window.__v8.motion.push({step,time:performance.now()});});window.__v8.observer.observe(list,{attributes:true,attributeFilter:['data-scene-step']});});
 await scroll(page,'.it-start-card');await page.waitForFunction(()=>document.querySelector('.it-start-steps').dataset.sceneStep==='3');await pause(650);
 const motion=await page.evaluate(()=>({events:window.__v8.motion,cycle:+document.querySelector('.it-start-steps').dataset.loopCycle,opacity:[...document.querySelectorAll('.it-start-artifact')].map(e=>+getComputedStyle(e).opacity),cls:window.__v8.shifts.reduce((n,e)=>n+e.value,0)}));
 report.motion.push({width,...motion});console.log(JSON.stringify({width,motion}));
 assert.deepEqual(motion.events.map(e=>e.step),[1,2,3]);for(let i=1;i<3;i++)assert.ok(Math.abs(motion.events[i].time-motion.events[i-1].time-300)<90);assert.equal(motion.cycle,1);assert.ok(motion.opacity.every(o=>o===1));assert.equal(motion.cls,0);
 await pause(2800);assert.equal(await page.$eval('.it-start-steps',e=>+e.dataset.loopCycle),1);
 await scroll(page,'#contact');await pause(150);await scroll(page,'.it-start-card');await pause(750);assert.equal(await page.$eval('.it-start-steps',e=>+e.dataset.loopCycle),1);Object.assign(report.motion.at(-1),{repeats:false,reentryReplay:false});
 await scroll(page,'.it-start-consultation');await page.click('.it-start-consultation a');const link=await page.evaluate(()=>window.__v8.outbound.at(-1));assert.equal(new URL(link.href).pathname,'/995557624243');assert.equal(new URL(link.href).searchParams.get('text'),'გამარჯობა, მინდა უფასო კონსულტაცია.');assert.equal(link.target,'_blank');report.links.push({width,...link});
 await page.focus('.it-start-consultation a');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.className),'it-faq-question');
 await pause(700);const before=await page.evaluate(()=>({hero:document.querySelector('#hero').offsetTop,services:document.querySelector('#services').offsetTop,start:document.querySelector('#getting-started').offsetTop,faq:document.querySelector('#questions').offsetTop,contact:document.querySelector('#contact').offsetTop}));
 await page.keyboard.press('Enter');await pause(90);
 const during=await page.evaluate(()=>({animations:document.getAnimations().filter(a=>a.playState==='running').map(a=>({property:a.transitionProperty,classname:a.effect.target.className})),expanded:document.activeElement.getAttribute('aria-expanded'),answer:document.querySelector('.it-faq-answer').getBoundingClientRect().height}));
 console.log(JSON.stringify({width,accordion:during}));
 assert.equal(during.expanded,'true');assert.ok(during.answer>0);assert.ok(during.animations.some(a=>a.property==='grid-template-rows'&&a.classname==='it-faq-answer'));assert.ok(during.animations.every(a=>['grid-template-rows','transform'].includes(a.property)));
 await pause(300);const opened=await page.evaluate(()=>{const button=document.querySelector('.it-faq-question'),answer=document.getElementById(button.getAttribute('aria-controls'));return {labelled:answer.getAttribute('aria-labelledby')===button.id,hidden:answer.getAttribute('aria-hidden'),answerHeight:answer.offsetHeight,contentHeight:answer.firstElementChild.scrollHeight,icon:getComputedStyle(button.querySelector('svg')).transform,hero:document.querySelector('#hero').offsetTop,services:document.querySelector('#services').offsetTop,start:document.querySelector('#getting-started').offsetTop,faq:document.querySelector('#questions').offsetTop,contact:document.querySelector('#contact').offsetTop};});
 assert.ok(opened.labelled);assert.equal(opened.hidden,'false');assert.ok(Math.abs(opened.answerHeight-opened.contentHeight)<=1);for(const id of ['hero','services','start','faq'])assert.equal(opened[id],before[id]);assert.ok(Math.abs(opened.contact-before.contact-opened.answerHeight)<=1);
 await page.keyboard.press('Space');await pause(350);assert.equal(await page.$eval('.it-faq-question',e=>e.getAttribute('aria-expanded')),'false');assert.equal(await page.$eval('.it-faq-answer',e=>e.offsetHeight),0);
 await page.keyboard.press('Tab');await page.keyboard.press('Enter');await pause(350);assert.equal(await page.$$eval('.it-faq-question',es=>es[1].getAttribute('aria-expanded')),'true');
 for(let i=0;i<5;i++){await page.$$eval('.it-faq-question',(es,i)=>{if(es[i].getAttribute('aria-expanded')==='false')es[i].click();},i);await pause(350);assert.equal(await page.$$eval('.it-faq-answer',(es,i)=>es[i].getAttribute('aria-hidden'),i),'false');}
 report.accordion.push({width,keyboard:'Tab, Enter and Space passed',defaultClosed:true,controlledRegions:true,during,flowOffset:opened.contact-before.contact,unrelatedSectionsMoved:false});
 await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await page.reload({waitUntil:'networkidle0'});
 const reduced=await page.evaluate(()=>({step:+document.querySelector('.it-start-steps').dataset.sceneStep,visible:[...document.querySelectorAll('.it-start-artifact')].map(e=>+getComputedStyle(e).opacity),running:document.getAnimations().filter(a=>a.playState==='running').length,auto:document.querySelector('#hero').dataset.autoplay}));
 assert.equal(reduced.step,3);assert.ok(reduced.visible.every(o=>o===1));assert.equal(reduced.running,0);assert.equal(reduced.auto,'false');
 await page.$eval('.it-faq-question',e=>e.click());const instant=await page.$eval('.it-faq-answer',e=>({height:e.offsetHeight,transition:getComputedStyle(e).transitionDuration}));assert.ok(instant.height>0);assert.equal(instant.transition,'0s');report.reduced.push({width,...reduced,accordion:instant});
 await context.close();console.log(`V8 ${width}: copy, motion, layout, accordion and reduced motion passed`);
}
try {for(const [w,h]of [[1440,900],[1024,900],[390,844]])await verify(w,h);assert.deepEqual(report.errors,[]);assert.deepEqual(report.warnings,[]);report.result='PASS';console.log('V8 verification PASS');}
catch(e){report.result='FAIL';report.failure=e.stack;console.error(e);process.exitCode=1;}
finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}
