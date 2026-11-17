import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
const browser=await puppeteer.launch({headless:true,pipe:true,protocolTimeout:30000});
const out='preview-verification/v7';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const slugs=['food','tourism','retail','beauty','legal-finance','academy','other'];
const tints=['rgb(196, 183, 236)','rgb(179, 207, 234)','rgb(154, 206, 170)','rgb(245, 194, 216)','rgb(217, 222, 232)','rgb(248, 205, 176)','rgb(232, 232, 237)'];
const finalSteps=[6,6,6,6,1,1,3];
const messages=[
'გამარჯობა, რესტორანი მაქვს და მაინტერესებს საიტი.',
'გამარჯობა, სასტუმრო მაქვს და მაინტერესებს საიტი.',
'გამარჯობა, მაღაზია მაქვს და მაინტერესებს ონლაინ მაღაზია.',
'გამარჯობა, სალონი მაქვს და მაინტერესებს საიტი.',
'გამარჯობა, იურიდიული კომპანია მაქვს და მაინტერესებს საიტი.',
'გამარჯობა, დავინტერესდი LineUp-ით, სპორტული აკადემიის აპლიკაციით.',
'გამარჯობა, დავინტერესდი თქვენი სერვისებით.'
];
const report={auto:[],layouts:[],interactions:[],cards:[],links:[],routes:[],reduced:[],errors:[],warnings:[],notices:[]};
async function configure(page) {
  await page.emulateTimezone("Asia/Tbilisi");
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["localhost", "127.0.0.1"].includes(url.hostname) || ["data:", "blob:"].includes(url.protocol)) request.continue();
    else request.respond({ status: 204, body: "" });
  });
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push(message.text());
    if (message.type() === "warn") {
      if (message.text().startsWith("You have Reduced Motion enabled")) report.notices.push(message.text());
      else report.warnings.push(message.text());
    }
  });
  await page.evaluateOnNewDocument(() => {
    window.__v7 = { timers: new Set(), intervals: new Set(), observers: new Set(), outbound: [], shifts: [] };
    const timeout = window.setTimeout.bind(window), clearTimeout = window.clearTimeout.bind(window);
    const interval = window.setInterval.bind(window), clearInterval = window.clearInterval.bind(window);
    window.setTimeout = (callback, delay, ...args) => {
      const own = /useProductScene|IndustrySwitcher/.test(new Error().stack);
      const id = timeout(() => { window.__v7.timers.delete(id); callback(...args); }, delay);
      if (own) window.__v7.timers.add(id);
      return id;
    };
    window.clearTimeout = (id) => { window.__v7.timers.delete(id); clearTimeout(id); };
    window.setInterval = (callback, delay, ...args) => {
      const id = interval(callback, delay, ...args);
      if (/IndustrySwitcher/.test(new Error().stack)) window.__v7.intervals.add(id);
      return id;
    };
    window.clearInterval = (id) => { window.__v7.intervals.delete(id); clearInterval(id); };
    for (const [name, selector] of [["IntersectionObserver", ".it-card,.it-industry-scene,.it-hero-stage"], ["ResizeObserver", ".it-light-chat-messages,.it-chat-thread,.it-commerce-scene,.it-checkout-pay"]]) {
      const Original = window[name];
      window[name] = class extends Original {
        observe(target, ...args) { if (target.matches(selector)) window.__v7.observers.add(this); return super.observe(target, ...args); }
        disconnect() { window.__v7.observers.delete(this); return super.disconnect(); }
      };
    }
    new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__v7.shifts.push({ time: performance.now(), value: entry.value }); }).observe({ type: "layout-shift", buffered: true });
    // Observe activation of the real anchor while preventing an external handoff.
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest?.('a[href^="https://wa.me/"]');
      if (anchor) { event.preventDefault(); window.__v7.outbound.push({ href: anchor.href, target: anchor.target }); }
    }, true);
  });
}

const scroll=(page,selector,block='start')=>page.$eval(selector,(e,block)=>e.scrollIntoView({block,behavior:'instant'}),block);
async function ready(page,slug) {
  await page.waitForFunction(slug=>document.querySelector('.it-hero-stage').dataset.displayed===slug && document.querySelector('.it-industry-scene-fade').dataset.fadingOut==='false',{},slug);
  await pause(650);
}
async function choose(page,slug) {
  await scroll(page,'.it-industry-controls','center');
  await page.click(`label:has(input[value="${slug}"]) .it-industry-choice-label`);
  await ready(page,slug);
}
async function layout(page,width) {
  const data=await page.evaluate(()=>{
    const scrollers=[];
    for(const e of document.querySelectorAll('body *')) if(e.clientWidth>0&&e.scrollWidth>e.clientWidth+1) {
      const before=e.scrollLeft;e.scrollLeft=2;
      if(e.scrollLeft>0)scrollers.push({tag:e.tagName,class:String(e.className)});
      e.scrollLeft=before;
    }
    return {width:innerWidth,page:document.documentElement.scrollWidth,scrollers,
      sections:[...document.querySelectorAll('main>section')].map(e=>e.id),
      grid:getComputedStyle(document.querySelector('.it-service-grid')).gridTemplateColumns,
      cards:[...document.querySelectorAll('.it-card')].map(e=>({w:e.offsetWidth,h:e.offsetHeight,bg:getComputedStyle(e).backgroundColor,border:getComputedStyle(e).borderWidth,shadow:getComputedStyle(e).boxShadow})),
      heroHeight:document.querySelector('#hero').offsetHeight,
      detailHeight:document.querySelector('.it-industry-details-stack').offsetHeight,
      stageHeight:document.querySelector('.it-hero-stage').offsetHeight,
      transitions:getComputedStyle(document.querySelector('.it-hero-stage')).transitionProperty};
  });
  assert.equal(data.page,width);assert.equal(data.scrollers.length,0,JSON.stringify(data.scrollers));
  assert.deepEqual(data.sections,['hero','services','getting-started','contact']);
  assert.equal(data.stageHeight,width>=1024?560:420);
  for(const c of data.cards){assert.equal(c.h,width>=900?560:500);assert.equal(c.border,'0px');assert.equal(c.shadow,'none');}
  assert.equal(data.grid.split(' ').length,width>=900?2:1);
  report.layouts.push(data);return data;
}
async function auto(width,height) {
  const context=await browser.createBrowserContext();const page=await context.newPage();await configure(page);
  await page.setViewport({width,height,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
  const initialShifts=await page.evaluate(async()=>{await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const before=window.__v7.shifts;window.__v7.shifts=[];return before;});
  (report.initialLoads??=[]).push({width,shifts:initialShifts});
  if(width===390)await page.evaluate(()=>scrollTo({top:100,behavior:'instant'}));
  await layout(page,width);
  for(let i=0;i<slugs.length;i++) {
    await ready(page,slugs[i]);
    await page.waitForFunction(step=>{const e=document.querySelector('.it-industry-scene');return +e.dataset.sceneStep===step&&e.dataset.exiting==='false'}, {timeout:9000},finalSteps[i]);
    await pause(650);
    const frame=await page.evaluate(()=>({slug:document.querySelector('.it-hero-stage').dataset.displayed,devices:document.querySelectorAll('.it-hero-stage .it-obj-browser,.it-hero-stage .it-obj-phone,.it-hero-stage .it-obj-laptop').length,tint:getComputedStyle(document.querySelector('.it-hero-stage')).backgroundColor,cycle:+document.querySelector('.it-industry-scene').dataset.loopCycle,heroHeight:document.querySelector('#hero').offsetHeight,detailHeight:document.querySelector('.it-industry-details-stack').offsetHeight,shifts:window.__v7.shifts}));
    assert.equal(frame.devices,[2,2,2,2,1,1,2][i]);assert.equal(frame.tint,tints[i]);assert.equal(frame.cycle,1);
    assert.equal(frame.heroHeight,report.layouts.find(e=>e.width===width).heroHeight);assert.equal(frame.shifts.reduce((n,e)=>n+e.value,0),0);
    await page.screenshot({path:`${out}/${width}-auto-${slugs[i]}.png`,captureBeyondViewport:false});
    report.auto.push({width,...frame});console.log(`Auto ${width}: ${slugs[i]} passed`);
  }
  await context.close();
}
async function functional() {
  const context=await browser.createBrowserContext();const page=await context.newPage();await configure(page);
  await page.setViewport({width:1024,height:900,deviceScaleFactor:1});
  await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);await layout(page,1024);
  await choose(page,'retail');await scroll(page,'.it-hero-stage','center');
  await page.waitForFunction(()=>document.querySelector('.it-industry-scene').dataset.sceneStep==='6');
  await pause(650);await page.screenshot({path:`${out}/1024-retail.png`,captureBeyondViewport:false});
  const start=await page.$eval('.it-industry-scene',e=>+e.dataset.loopCycle);
  await page.waitForFunction(c=>+document.querySelector('.it-industry-scene').dataset.loopCycle>c,{timeout:10000},start);
  assert.equal(await page.$eval('#hero',e=>e.dataset.autoplay),'false');
  // One complete replay: every scene node stays mounted, reset occurs after the exit.
  const audit=await page.evaluate(async()=>{
    const root=document.querySelector('.it-industry-scene');const nodes=[...root.querySelectorAll('*')];let previous=+root.dataset.sceneStep;
    const beforeAuditShifts=window.__v7.shifts;window.__v7.shifts=[];
    const samples=[];const until=performance.now()+8500;
    while(performance.now()<until){const step=+root.dataset.sceneStep;
      if(step<previous)samples.push({type:'reset',opacity:[...root.querySelectorAll('.it-scene-element:not(.it-checkout-pay > span:first-child)')].map(e=>+getComputedStyle(e).opacity)});
      previous=step;await new Promise(r=>setTimeout(r,30));
    }
    return {sameNodes:nodes.every(n=>n.isConnected),samples,cycle:+root.dataset.loopCycle,slug:document.querySelector('.it-hero-stage').dataset.displayed,beforeAuditShifts,cls:window.__v7.shifts.reduce((n,e)=>n+e.value,0)};
  });
  report.interactions.push({manualLoop:audit});
  assert.ok(audit.sameNodes);assert.ok(audit.samples.length>0);assert.ok(audit.samples.every(s=>s.opacity.every(o=>o<0.02)));assert.equal(audit.slug,'retail');assert.equal(audit.cls,0);
  console.log('Manual loop passed');
  for(let i=0;i<slugs.length;i++) {
    await choose(page,slugs[i]);
    const info=await page.$eval('.it-industry-details[data-active="true"]',e=>({features:[...e.querySelectorAll('li')].map(e=>e.textContent),wa:e.querySelector('.it-pill-button').href,target:e.querySelector('.it-pill-button').target,detail:e.querySelector('.it-more-link').getAttribute('href')}));
    assert.equal(new URL(info.wa).searchParams.get('text'),messages[i]);assert.equal(info.target,'_blank');
    await page.click('.it-industry-details[data-active="true"] .it-pill-button');
    const activation=await page.evaluate(()=>window.__v7.outbound.at(-1));assert.equal(activation.href,info.wa);
    if(i<5) {const expected=await page.evaluate(async slug=>(await import('/src/data/industryData.ts')).industryData.web[slug].features.slice(0,3).map(e=>e.titleKa),slugs[i]);assert.deepEqual(info.features,expected);}
    report.links.push({slug:slugs[i],...info,activation});
  }
  await page.click('.it-industry-details[data-active="true"] .it-more-link');await pause(800);
  assert.ok(await page.$eval('#services',e=>Math.abs(e.getBoundingClientRect().top)<3));
  await scroll(page,'#contact','center');await page.click('#contact .it-pill-button');
  const contact=await page.evaluate(()=>window.__v7.outbound.at(-1));assert.equal(new URL(contact.href).searchParams.get('text'),'გამარჯობა, IT სერვისებით დავინტერესდი.');assert.equal(contact.target,'_blank');report.links.push({slug:'contact',activation:contact});
  await choose(page,'food');await page.focus('input[value="food"]');
  await page.keyboard.press('End');await ready(page,'other');await page.keyboard.press('Home');await ready(page,'food');await page.keyboard.press('ArrowLeft');await ready(page,'other');await page.keyboard.press('ArrowRight');await ready(page,'food');
  await page.reload({waitUntil:'networkidle0'});assert.equal(await page.$eval('#hero',e=>e.dataset.autoplay),'false');
  report.interactions.push({keyboard:'End/Home/arrow wrap passed',sessionOptOut:true,otherScroll:true});
  console.log('All messages, keyboard and session opt-out passed');
  // Hover is available on desktop; cards never repeat on their own or on scroll re-entry.
  for(const product of ['web','chatbot','invento','lineup']) {
    const selector=`.it-card[data-product="${product}"]`;
    await page.mouse.move(0,0);await scroll(page,selector,'center');
    await page.waitForFunction(sel=>+document.querySelector(sel).dataset.sceneStep==={web:1,chatbot:6,invento:2,lineup:1}[document.querySelector(sel).dataset.product],{timeout:7000},selector);
    await pause(650);const first=await page.$eval(selector,e=>+e.dataset.loopCycle);
    await pause(3400);assert.equal(await page.$eval(selector,e=>+e.dataset.loopCycle),first);
    await scroll(page,'#contact','center');await pause(150);await scroll(page,selector,'center');await pause(850);
    assert.equal(await page.$eval(selector,e=>+e.dataset.loopCycle),first);
    await page.hover(selector);await page.waitForFunction((sel,c)=>+document.querySelector(sel).dataset.loopCycle>c,{timeout:2000},selector,first);
    await page.waitForFunction(sel=>+document.querySelector(sel).dataset.sceneStep==={web:1,chatbot:6,invento:2,lineup:1}[document.querySelector(sel).dataset.product],{timeout:7000},selector);
    await pause(650);await page.screenshot({path:`${out}/1024-service-${product}.png`,captureBeyondViewport:false});
    report.cards.push({product,first,afterHover:await page.$eval(selector,e=>+e.dataset.loopCycle),autoRepeat:false,reentryRepeat:false});
    console.log(`Service ${product} passed`);
  }
  await page.setViewport({width:390,height:844,deviceScaleFactor:1});await layout(page,390);
  for(const product of ['web','chatbot','invento','lineup']) {await scroll(page,`.it-card[data-product="${product}"]`,'center');await pause(700);await page.screenshot({path:`${out}/390-service-${product}.png`,captureBeyondViewport:false});}
  // Reduced motion must finish every scene, disable auto and remove all scene timers.
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  for(const width of [1440,1024,390]) {
    await page.setViewport({width,height:width===390?844:900});await page.reload({waitUntil:'networkidle0'});
    await page.evaluate(()=>document.fonts.ready);
    for(let i=0;i<slugs.length;i++){await choose(page,slugs[i]);assert.equal(await page.$eval('.it-industry-scene',e=>+e.dataset.sceneStep),finalSteps[i]);}
    await choose(page,'food');await page.evaluate(()=>scrollTo(0,0));await pause(100);
    const state=await page.evaluate(()=>({autoplay:document.querySelector('#hero').dataset.autoplay,timers:window.__v7.timers.size,intervals:window.__v7.intervals.size,running:document.getAnimations().filter(a=>a.playState==='running').length,cards:[...document.querySelectorAll('.it-card')].map(e=>[e.dataset.product,+e.dataset.sceneStep])}));
    assert.equal(state.autoplay,'false');assert.equal(state.timers,0);assert.equal(state.intervals,0);assert.equal(state.running,0);
    assert.deepEqual(state.cards,[['web',1],['chatbot',6],['invento',2],['lineup',1]]);
    await page.screenshot({path:`${out}/${width}-reduced.png`,captureBeyondViewport:false});report.reduced.push({width,...state});
    console.log(`Reduced ${width} passed`);
  }
  await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));
  await page.click('.it-nav-link[href="/contact"]');await pause(500);const cleanup=await page.evaluate(()=>({timers:window.__v7.timers.size,intervals:window.__v7.intervals.size,observers:window.__v7.observers.size}));
  assert.deepEqual(cleanup,{timers:0,intervals:0,observers:0});report.interactions.push({cleanup});console.log('Unmount cleanup passed');
  const routes=[...new Set(report.links.filter(e=>e.detail&&e.detail!=='#services').map(e=>e.detail).concat(['/services/web','/services/ai-chatbot','/inventowms','/contact']))];
  const routePage=await context.newPage();await configure(routePage);
  for(const route of routes){console.log(`Checking route ${route}`);const res=await routePage.goto(`http://127.0.0.1:5173${route}`,{waitUntil:'domcontentloaded',timeout:15000});await routePage.waitForSelector('h1',{timeout:10000});const title=await routePage.$eval('h1',e=>e.textContent);assert.equal(res.status(),200);assert.ok(!/404|not found/i.test(title));report.routes.push({route,status:res.status(),title});await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));}
  await context.close();
}
try {
  if(process.argv.includes('--auto-only')) {
    Object.assign(report,JSON.parse(await readFile(`${out}/report.json`,'utf8')));delete report.failure;report.auto=[];report.layouts=[];report.initialLoads=[];
    await Promise.all([auto(1440,900),auto(390,844)]);
  } else if(process.argv.includes('--cleanup')) {
    Object.assign(report,JSON.parse(await readFile(`${out}/functional-checks.json`,'utf8')));delete report.failure;
    const context=await browser.createBrowserContext();const page=await context.newPage();await configure(page);
    await page.setViewport({width:390,height:844});await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
    await page.goto('http://127.0.0.1:5173/preview/it',{waitUntil:'networkidle0'});await page.evaluate(()=>document.fonts.ready);
    await page.click('.it-nav-link[href="/contact"]');await pause(500);
    const cleanup=await page.evaluate(()=>({timers:window.__v7.timers.size,intervals:window.__v7.intervals.size,observers:window.__v7.observers.size}));
    assert.deepEqual(cleanup,{timers:0,intervals:0,observers:0});report.interactions.push({cleanup});await context.close();
  } else {
    if(process.argv.includes('--functional')) {const previous=JSON.parse(await readFile(`${out}/report.json`,'utf8'));report.auto=previous.auto;report.layouts=previous.layouts.filter(e=>[1440,390].includes(e.width)).slice(0,2);}
    else await Promise.all([auto(1440,900),auto(390,844)]);
    await functional();
  }
  assert.deepEqual(report.errors,[]);assert.deepEqual(report.warnings,[]);
  report.result='PASS';console.log('V7 verification PASS');
} catch(error) {report.result='FAIL';report.failure=error.stack;console.error(error);process.exitCode=1;}
finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}

