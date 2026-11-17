import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, pipe: true });
const out = "preview-verification/v6";
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sections = ["hero", "services", "connected", "industries", "getting-started", "contact"];
const slugs = ["food", "tourism", "retail", "beauty", "legal-finance"];
const messages = [
  "გამარჯობა, რესტორანი მაქვს და მაინტერესებს საიტი.",
  "გამარჯობა, სასტუმრო მაქვს და მაინტერესებს საიტი.",
  "გამარჯობა, მაღაზია მაქვს და მაინტერესებს ონლაინ მაღაზია.",
  "გამარჯობა, სალონი მაქვს და მაინტერესებს საიტი.",
  "გამარჯობა, იურიდიული კომპანია მაქვს და მაინტერესებს საიტი.",
];
const report = { layouts: [], interactions: [], routes: [], reduced: [], errors: [], warnings: [], notices: [] };

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
    window.__v6 = { timers: new Set(), intervals: new Set(), observers: new Set(), outbound: [], shifts: [] };
    const timeout = window.setTimeout.bind(window), clearTimeout = window.clearTimeout.bind(window);
    const interval = window.setInterval.bind(window), clearInterval = window.clearInterval.bind(window);
    window.setTimeout = (callback, delay, ...args) => {
      const own = /useProductScene|IndustrySwitcher/.test(new Error().stack);
      const id = timeout(() => { window.__v6.timers.delete(id); callback(...args); }, delay);
      if (own) window.__v6.timers.add(id);
      return id;
    };
    window.clearTimeout = (id) => { window.__v6.timers.delete(id); clearTimeout(id); };
    window.setInterval = (callback, delay, ...args) => {
      const id = interval(callback, delay, ...args);
      if (/IndustrySwitcher/.test(new Error().stack)) window.__v6.intervals.add(id);
      return id;
    };
    window.clearInterval = (id) => { window.__v6.intervals.delete(id); clearInterval(id); };
    for (const [name, selector] of [["IntersectionObserver", ".it-family-stage,.it-card,.it-flow-stage,.it-industry-panel,#industries"], ["ResizeObserver", ".it-light-chat-messages,.it-chat-thread,.it-flow-stage,.it-checkout-pay"]]) {
      const Original = window[name];
      window[name] = class extends Original {
        observe(target, ...args) { if (target.matches(selector)) window.__v6.observers.add(this); return super.observe(target, ...args); }
        disconnect() { window.__v6.observers.delete(this); return super.disconnect(); }
      };
    }
    new PerformanceObserver((list) => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__v6.shifts.push({ time: performance.now(), value: entry.value }); }).observe({ type: "layout-shift", buffered: true });
    // Observe activation of the real anchor while preventing an external handoff.
    document.addEventListener("click", (event) => {
      const anchor = event.target.closest?.('a[href^="https://wa.me/"]');
      if (anchor) { event.preventDefault(); window.__v6.outbound.push({ href: anchor.href, target: anchor.target }); }
    }, true);
  });
}

const scroll = (page, selector, block = "start") => page.$eval(selector, (el, block) => el.scrollIntoView({ block, behavior: "instant" }), block);
const screenshot = (page, name) => page.screenshot({ path: `${out}/${name}.png`, captureBeyondViewport: false });
async function selected(page, slug) {
  await page.waitForFunction((slug) => document.querySelector(".it-industry-panel").dataset.displayed === slug && document.querySelector(".it-industry-panel").dataset.fadingOut === "false", {}, slug);
  await pause(550);
}
async function choose(page, slug) {
  await page.click(`label:has(input[value="${slug}"]) .it-industry-choice-label`);
  await selected(page, slug);
}
async function noSideways(page) {
  return page.evaluate(() => {
    const scrollable = [];
    for (const el of document.querySelectorAll("body *")) if (el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 1) {
      const before = el.scrollLeft; el.scrollLeft = 2;
      if (el.scrollLeft > 0) scrollable.push({ tag: el.tagName, class: String(el.className), width: el.clientWidth, scrollWidth: el.scrollWidth });
      el.scrollLeft = before;
    }
    return { width: innerWidth, page: document.documentElement.scrollWidth, scrollable };
  });
}

try {
  for (const [width, height] of [[1440, 900], [1024, 900], [390, 844]]) {
    const context = await browser.createBrowserContext();
    const page = await context.newPage();
    await configure(page);
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-industry-panel");
    await page.evaluate(() => document.fonts.ready);
    const expectedFeatures = await page.evaluate(async () => {
      const { industryData } = await import("/src/data/industryData.ts");
      return Object.fromEntries(["food", "tourism", "retail", "beauty", "legal-finance"].map((slug) => [slug, industryData.web[slug].features.slice(0, 3).map((feature) => feature.titleKa)]));
    });

    await scroll(page, "#industries");
    await page.waitForFunction(() => document.querySelector("#industries").dataset.autoplay === "true");
    const beforeAuto = await page.$eval("#industries", (el) => ({ slug: el.dataset.selected, height: el.querySelector(".it-industry-panel").getBoundingClientRect().height, time: performance.now() }));
    await pause(700);
    const progress = await page.$eval('.it-industry-progress[data-running="true"]', (el) => ({ height: getComputedStyle(el).height, transform: getComputedStyle(el).transform }));
    assert.equal(progress.height, "2px");
    assert.notEqual(progress.transform, "matrix(0, 0, 0, 1, 0, 0)");
    const nextSlug = slugs[(slugs.indexOf(beforeAuto.slug) + 1) % slugs.length];
    await page.waitForFunction((slug) => document.querySelector("#industries").dataset.selected === slug, { timeout: 8500 }, nextSlug);
    await selected(page, nextSlug);
    const afterAuto = await page.$eval("#industries", (el) => ({ slug: el.dataset.selected, height: el.querySelector(".it-industry-panel").getBoundingClientRect().height, time: performance.now() }));
    assert.equal(afterAuto.height, beforeAuto.height);

    const interactions = [];
    let reservedHeight;
    for (let index = 0; index < slugs.length; index++) {
      const slug = slugs[index];
      await choose(page, slug);
      const current = await page.$eval(`.it-industry-variant[data-industry="${slug}"]`, (el) => ({
        title: el.querySelector("h3").textContent,
        features: Array.from(el.querySelectorAll("li")).map((li) => li.textContent),
        whatsapp: el.querySelector("a.it-pill-button").href,
        target: el.querySelector("a.it-pill-button").target,
        detail: el.querySelector("a.it-more-link").getAttribute("href"),
        panelHeight: el.parentElement.getBoundingClientRect().height,
        displayed: el.parentElement.dataset.displayed,
      }));
      assert.deepEqual(current.features, expectedFeatures[slug]);
      assert.equal(new URL(current.whatsapp).hostname, "wa.me");
      assert.equal(new URL(current.whatsapp).pathname, "/995557624243");
      assert.equal(new URL(current.whatsapp).searchParams.get("text"), messages[index]);
      assert.equal(current.target, "_blank");
      assert.equal(current.detail, `/industry/web/${slug}`);
      reservedHeight ??= current.panelHeight;
      assert.equal(current.panelHeight, reservedHeight);
      await page.click(`.it-industry-variant[data-industry="${slug}"] a.it-pill-button`);
      const outbound = await page.evaluate(() => window.__v6.outbound.at(-1));
      assert.deepEqual(outbound, { href: current.whatsapp, target: "_blank" });
      interactions.push(current);
      const horizontal = await noSideways(page);
      assert.equal(horizontal.page, width);
      assert.deepEqual(horizontal.scrollable, []);
      if (width !== 1024) { await scroll(page, "#industries"); await screenshot(page, `${width}-industry-${slug}`); }
    }

    await page.focus('input[value="legal-finance"]');
    await page.keyboard.press("ArrowLeft"); await selected(page, "beauty");
    assert.equal(await page.$eval("input:focus", (el) => el.value), "beauty");
    await page.keyboard.press("ArrowRight"); await selected(page, "legal-finance");
    await page.keyboard.press("ArrowRight"); await selected(page, "food");
    await page.keyboard.press("ArrowUp"); await selected(page, "legal-finance");
    await page.keyboard.press("Home"); await selected(page, "food");
    await page.keyboard.press("End"); await selected(page, "legal-finance");
    const stoppedSelection = await page.$eval("#industries", (el) => el.dataset.selected);
    await pause(7600);
    assert.equal(await page.$eval("#industries", (el) => el.dataset.selected), stoppedSelection);
    assert.equal(await page.$eval("#industries", (el) => el.dataset.autoplay), "false");
    assert.equal(await page.evaluate(() => window.__v6.intervals.size), 0);
    report.interactions.push({ width, beforeAuto, afterAuto, progress, industries: interactions, keyboard: "arrows, wrap, Home, End", stoppedAfterInteraction: true });

    const layout = await page.evaluate(() => ({
      width: innerWidth,
      grid: getComputedStyle(document.querySelector(".it-service-grid")).gridTemplateColumns,
      cards: Array.from(document.querySelectorAll(".it-card")).map((el) => ({
        width: el.getBoundingClientRect().width, height: el.getBoundingClientRect().height,
        background: getComputedStyle(el).backgroundColor, border: getComputedStyle(el).borderColor,
        title: getComputedStyle(el.querySelector("h3")).fontSize,
        panel: { height: el.querySelector(".it-device-stage").clientHeight, radius: getComputedStyle(el.querySelector(".it-device-stage")).borderRadius, color: getComputedStyle(el.querySelector(".it-device-stage")).backgroundColor },
      })),
      chipRows: [...new Set(Array.from(document.querySelectorAll(".it-industry-choice")).map((el) => el.getBoundingClientRect().top))].length,
      indices: Array.from(document.querySelectorAll(".it-mono")).map((el) => ({ text: el.textContent, font: getComputedStyle(el).fontFamily })),
      backgrounds: ["hero", "services", "connected", "industries", "getting-started", "contact"].map((id) => getComputedStyle(document.getElementById(id)).backgroundColor),
      obsoleteControls: document.querySelectorAll(".it-shelf-arrow,.it-shelf-scroller,.it-industry-card").length,
    }));
    assert.equal(layout.obsoleteControls, 0);
    assert.deepEqual(layout.backgrounds, ["rgb(255, 255, 255)", "rgb(245, 245, 247)", "rgb(255, 255, 255)", "rgb(245, 245, 247)", "rgb(255, 255, 255)", "rgb(245, 245, 247)"]);
    assert.ok(layout.cards.every((card) => card.background === "rgb(255, 255, 255)" && card.panel.radius === "20px" && card.panel.height === (width >= 900 ? 300 : 260) && card.title === (width >= 900 ? "28px" : "24px")));
    assert.equal(layout.grid.split(" ").length, width >= 900 ? 2 : 1);
    assert.equal(layout.chipRows, width === 390 ? 2 : 1);
    assert.ok(layout.indices.length === 7 && layout.indices.every((index) => /^0[1-4]$/.test(index.text) && index.font.startsWith("ui-monospace")));
    report.layouts.push({ ...layout, horizontal: await noSideways(page) });

    // Session-wide opt-out survives a reload of this page.
    await page.reload({ waitUntil: "networkidle0" });
    await page.waitForSelector(".it-industry-panel");
    await scroll(page, "#industries");
    await pause(150);
    assert.equal(await page.$eval("#industries", (el) => el.dataset.autoplay), "false");
    await choose(page, "food");

    if (width !== 1024) {
      await scroll(page, "#hero");
      await page.waitForFunction(() => document.querySelector(".it-family-stage").dataset.sceneStep === "9" && document.querySelector(".it-family-stage").dataset.exiting === "false");
      await pause(750); await screenshot(page, `${width}-hero`);
      for (const [product, last] of [["web", "1"], ["chatbot", "6"], ["invento", "2"], ["lineup", "1"]]) {
        const selector = `.it-card[data-product="${product}"]`;
        await scroll(page, selector, "center");
        await page.waitForFunction((selector, last) => document.querySelector(selector).dataset.sceneStep === last && document.querySelector(selector).dataset.exiting === "false", {}, selector, last);
        await pause(750); await screenshot(page, `${width}-service-${product}`);
      }
      await scroll(page, "#connected");
      await page.waitForFunction(() => document.querySelector(".it-flow-stage").dataset.flowStep === "6" && document.querySelector(".it-flow-stage").dataset.exiting === "false");
      await pause(750); await screenshot(page, `${width}-flow`);
      for (const id of ["industries", "getting-started", "contact"]) { await scroll(page, `#${id}`); await screenshot(page, `${width}-${id}`); }
    }

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.waitForFunction(() => window.__v6.timers.size === 0 && window.__v6.intervals.size === 0);
    await choose(page, "retail");
    const reduced = await page.evaluate(() => ({
      products: Array.from(document.querySelectorAll(".it-card")).map((el) => el.dataset.sceneStep),
      flow: document.querySelector(".it-flow-stage").dataset.flowStep,
      auto: document.querySelector("#industries").dataset.autoplay,
      timers: window.__v6.timers.size, intervals: window.__v6.intervals.size,
      animations: document.getAnimations().filter((animation) => animation.playState === "running").length,
    }));
    assert.deepEqual(reduced, { products: ["1", "6", "2", "1"], flow: "6", auto: "false", timers: 0, intervals: 0, animations: 0 });
    if (width !== 1024) {
      await choose(page, "food");
      for (const id of sections) { await scroll(page, `#${id}`); await screenshot(page, `${width}-reduced-${id}`); }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: `${out}/${width}-reduced-full.png`, fullPage: true });
    }
    report.reduced.push({ width, ...reduced });
    await page.goto("http://localhost:5173/preview/it?flow=color", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-flow-stage"); await scroll(page, "#connected");
    assert.equal(await page.$eval(".it-flow-stage", (el) => getComputedStyle(el).backgroundColor), "rgb(31, 85, 215)");
    if (width !== 1024) await screenshot(page, `${width}-flow-color-reduced`);
    await page.evaluate(() => { history.pushState({}, "", "/preview/type"); dispatchEvent(new PopStateEvent("popstate")); });
    await page.waitForFunction(() => !document.querySelector(".it-preview"));
    assert.deepEqual(await page.evaluate(() => ({ timers: window.__v6.timers.size, intervals: window.__v6.intervals.size, observers: window.__v6.observers.size })), { timers: 0, intervals: 0, observers: 0 });

    if (width === 1440) {
      const routePage = await context.newPage(); await configure(routePage);
      for (const slug of slugs) {
        const response = await routePage.goto(`http://localhost:5173/industry/web/${slug}`, { waitUntil: "domcontentloaded" });
        await routePage.waitForSelector("h1");
        const heading = await routePage.$eval("h1", (el) => el.textContent);
        assert.equal(response.status(), 200); assert.ok(!/404|ვერ მოიძებნა/.test(heading));
        report.routes.push({ path: `/industry/web/${slug}`, status: response.status(), heading });
      }
      await routePage.close();
    }
    console.log(`Verified ${width}px: no sideways scroll, all chips, data, links, auto-stop, keyboard, stable height, reduced motion`);
    await context.close();
  }
  assert.deepEqual(report.errors, []); assert.deepEqual(report.warnings, []);
} catch (error) { report.failure = error.stack; throw error; }
finally { await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2)); await browser.close(); }
