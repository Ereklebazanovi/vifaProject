// npm run dev, then: node preview-verification/v4/verify.mjs
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, pipe: true });
const report = { viewports: [], routes: [], errors: [], warnings: [], notices: [], otherRouteMessages: [] };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const products = ["web", "chatbot", "invento", "lineup"];
const finals = { web: 1, chatbot: 6, invento: 2, lineup: 1 };
const sections = ["hero", "services", "connected", "industries", "contact"];
const save = async (page, name, options = {}) => page.screenshot({ path: `preview-verification/v4/${name}.png`, ...options });
const state = (page, selector, attribute) => page.$$eval(selector, (els, attribute) => els.map((el) => el.getAttribute(attribute)), attribute);

async function configure(page) {
  await page.emulateTimezone("Asia/Tbilisi");
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["localhost", "127.0.0.1"].includes(url.hostname) || ["data:", "blob:"].includes(url.protocol)) request.continue();
    else request.respond({ status: 204, body: "" });
  });
  const log = (type, text) => {
    const path = new URL(page.url()).pathname;
    if (path !== "/preview/it") {
      report.otherRouteMessages.push({ path, type, text });
    } else if (type === "warn" && text === "You have Reduced Motion enabled on your device. Animations may not appear as expected.") {
      report.notices.push(text);
    } else if (type === "warn") report.warnings.push(text);
    else report.errors.push(text);
  };
  page.on("pageerror", (error) => log("error", error.message));
  page.on("console", (message) => {
    if (["error", "warn"].includes(message.type())) log(message.type(), message.text());
  });
  await page.evaluateOnNewDocument(() => {
    window.__previewQA = { timers: new Set(), observers: new Set(), heroStart: null, heroCues: {} };
    const originalTimeout = window.setTimeout.bind(window);
    const originalClear = window.clearTimeout.bind(window);
    window.setTimeout = (callback, delay, ...args) => {
      const sceneTimer = new Error().stack.includes("useProductScene");
      const id = originalTimeout(() => {
        window.__previewQA.timers.delete(id);
        callback(...args);
      }, delay);
      if (sceneTimer) window.__previewQA.timers.add(id);
      return id;
    };
    window.clearTimeout = (id) => {
      window.__previewQA.timers.delete(id);
      originalClear(id);
    };
    const OriginalObserver = window.IntersectionObserver;
    window.IntersectionObserver = class extends OriginalObserver {
      constructor(callback, options) {
        super((entries, observer) => {
          if (entries.some((entry) => entry.target.classList.contains("it-family-stage") && entry.intersectionRatio >= 0.5)) {
            window.__previewQA.heroStart ??= performance.now();
          }
          callback(entries, observer);
        }, options);
      }
      observe(target) {
        if (target.matches(".it-card,.it-family-stage,#connected")) window.__previewQA.observers.add(this);
        return super.observe(target);
      }
      disconnect() {
        window.__previewQA.observers.delete(this);
        return super.disconnect();
      }
    };
    new MutationObserver((records) => {
      for (const { target } of records) {
        if (target.dataset.heroProduct && Number(target.dataset.sceneStep) > 0) {
          window.__previewQA.heroCues[target.dataset.heroProduct] ??= performance.now() - window.__previewQA.heroStart;
        }
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ["data-scene-step"] });
  });
}

const scrollSection = (page, id) => page.$eval(`#${id}`, (el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
const scrollCard = (page, selector) => page.$eval(selector, (el) => el.scrollIntoView({ block: "nearest", inline: "start", behavior: "instant" }));
const waitHero = (page) => page.waitForFunction(() => Array.from(document.querySelectorAll("[data-hero-product]")).every((el) =>
  Number(el.dataset.sceneStep) === ({ web: 1, invento: 2, chatbot: 6, lineup: 1 })[el.dataset.heroProduct]));

try {
  const page = await browser.newPage();
  await configure(page);
  const links = new Set();
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector(".it-family-stage");
    await save(page, `${width}-initial`);
    const initialCards = await state(page, ".it-card", "data-scene-step");
    assert.deepEqual(initialCards, ["0", "0", "0", "0"], "Below-fold product cards wait");
    await waitHero(page);
    await pause(700);
    await save(page, `${width}-hero-final`);
    const cues = await page.evaluate(() => window.__previewQA.heroCues);
    for (const [product, delay] of Object.entries({ web: 400, invento: 1600, chatbot: 2800, lineup: 4400 })) {
      assert.ok(Math.abs(cues[product] - delay) < 350, `${product}: the hero cue is staggered correctly`);
    }

    await scrollSection(page, "services");
    const initialBrowserWidth = await page.$eval("#services .it-responsive-browser", (el) => el.getBoundingClientRect().width);
    await save(page, `${width}-services-initial`);
    for (const product of products) {
      await scrollCard(page, `.it-card[data-product="${product}"]`);
      await pause(5200);
      await save(page, `${width}-product-${product}`);
      const step = await page.$eval(`.it-card[data-product="${product}"]`, (el) => Number(el.dataset.sceneStep));
      assert.equal(step, finals[product]);
    }
    const finalBrowserWidth = await page.$eval("#services .it-responsive-browser", (el) => el.getBoundingClientRect().width);
    assert.ok(Math.abs(finalBrowserWidth / initialBrowserWidth - 0.38) < 0.015, "Browser narrows to 38% of its original width");
    const mobileOpacity = await page.$eval("#services .it-browser-mobile-img", (el) => getComputedStyle(el).opacity);
    assert.equal(mobileOpacity, "1");

    await scrollSection(page, "connected");
    await save(page, `${width}-connection-initial`);
    await page.waitForFunction(() => document.querySelector("#connected").dataset.flowStep === "5");
    await pause(350);
    await save(page, `${width}-connection-final`);
    const flow = await page.evaluate(() => ({
      button: document.querySelector(".it-checkout-pay").textContent,
      notifications: document.querySelectorAll("#connected .it-scene-notification").length,
      activeSteps: document.querySelectorAll('.it-flow-steps [data-active="true"]').length,
      connector: { width: document.querySelector(".it-flow-connector").clientWidth, height: document.querySelector(".it-flow-connector").clientHeight },
    }));
    assert.equal(flow.button, "გადახდილია ✓");
    assert.equal(flow.notifications, 2);
    assert.equal(flow.activeSteps, 3);
    assert.deepEqual(flow.connector, width === 390 ? { width: 1, height: 64 } : { width: 80, height: 1 });

    await scrollSection(page, "industries");
    const industryLinks = await page.$$eval(".it-industry-card", (cards) => cards.map((card) => card.getAttribute("href")));
    for (let index = 0; index < industryLinks.length; index++) {
      await scrollCard(page, `.it-industry-card:nth-child(${index + 1})`);
      await page.waitForFunction((index) => document.querySelectorAll(".it-industry-photo")[index].complete && document.querySelectorAll(".it-industry-photo")[index].naturalWidth > 0, {}, index);
      await save(page, `${width}-industry-${index + 1}`);
    }
    await scrollSection(page, "contact");
    await save(page, `${width}-contact`);

    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      sections: ["hero", "services", "connected", "industries", "contact"].map((id) => {
        const el = document.getElementById(id);
        const style = getComputedStyle(el);
        return { id, background: style.backgroundColor, padding: style.paddingTop };
      }),
      cards: Array.from(document.querySelectorAll(".it-card")).map((card) => ({
        product: card.dataset.product,
        gap: card.querySelector(".it-device-stage").getBoundingClientRect().top - card.querySelector(".it-card-top").getBoundingClientRect().bottom,
        clipped: Array.from(card.querySelectorAll(".it-card-top p,.it-card-top h3")).some((el) => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1),
      })),
      industryDimensions: Array.from(document.querySelectorAll(".it-industry-card")).map((el) => ({ width: el.clientWidth, height: el.clientHeight })),
      industryType: Array.from(document.querySelectorAll(".it-industry-title")).map((el) => ({ size: getComputedStyle(el).fontSize, clipped: el.scrollWidth > el.clientWidth + 1 })),
      images: Array.from(document.querySelectorAll(".it-preview img")).filter((el) => el.complete && el.naturalWidth === 0).map((el) => el.src),
      visibleHero: Array.from(document.querySelectorAll(".it-family-device")).filter((el) => getComputedStyle(el).display !== "none").map((el) => el.dataset.heroProduct),
    }));
    assert.ok(layout.scrollWidth <= width, "No horizontal page scroll");
    assert.deepEqual(layout.sections.map((section) => section.background), ["rgb(255, 255, 255)", "rgb(245, 245, 247)", "rgb(29, 29, 31)", "rgb(255, 255, 255)", "rgb(245, 245, 247)"]);
    assert.ok(layout.sections.every((section) => section.padding === (width === 390 ? "64px" : "96px")));
    assert.ok(layout.cards.every((card) => card.gap >= 20 && !card.clipped));
    assert.deepEqual(layout.images, []);
    assert.equal(layout.visibleHero.length, width === 390 ? 2 : 4);
    assert.ok(layout.industryDimensions.every((card) => width === 390 ? card.width === 300 && card.height === 383 : card.width === 313 && card.height === 400));
    assert.ok(layout.industryType.every((title) => title.size === (width === 390 ? "24px" : "28px") && !title.clipped));
    (await page.$$eval(".it-card,.it-industry-card", (cards) => cards.map((card) => card.getAttribute("href")))).forEach((link) => links.add(link));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await save(page, `${width}-all-final`, { fullPage: true });

    await scrollCard(page, '.it-card[data-product="chatbot"]');
    await page.mouse.move(0, 0);
    await page.hover('.it-card[data-product="chatbot"]');
    await page.waitForFunction(() => document.querySelector('.it-card[data-product="chatbot"]').dataset.sceneStep === "0");
    assert.ok(await page.evaluate(() => window.__previewQA.timers.size > 0));
    await page.evaluate(() => {
      history.pushState({}, "", "/preview/type");
      dispatchEvent(new PopStateEvent("popstate"));
    });
    await page.waitForFunction(() => !document.querySelector(".it-preview"));
    const cleanup = await page.evaluate(() => ({ timers: window.__previewQA.timers.size, observers: window.__previewQA.observers.size }));
    assert.deepEqual(cleanup, { timers: 0, observers: 0 });

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-family-stage");
    assert.deepEqual(await state(page, ".it-card", "data-scene-step"), ["1", "6", "2", "1"]);
    assert.equal(await page.$eval("#connected", (el) => el.dataset.flowStep), "5");
    await waitHero(page);
    for (const id of sections) {
      await scrollSection(page, id);
      await save(page, `${width}-reduced-${id}`);
    }
    const reduced = await page.evaluate(() => ({
      timers: window.__previewQA.timers.size,
      animations: document.getAnimations().filter((animation) => animation.playState === "running").length,
      entrances: Array.from(document.querySelectorAll(".it-device-entrance")).map((el) => getComputedStyle(el).transform),
      stock: Array.from(document.querySelectorAll('.it-stock-digit > span:last-child')).map((el) => getComputedStyle(el).opacity),
      pushes: Array.from(document.querySelectorAll('.it-lineup-push > div')).map((el) => ({ opacity: getComputedStyle(el).opacity, transform: getComputedStyle(el).transform })),
    }));
    assert.equal(reduced.timers, 0);
    assert.equal(reduced.animations, 0);
    assert.ok(reduced.entrances.every((value) => value === "none"));
    assert.ok(reduced.stock.every((value) => value === "1"));
    assert.ok(reduced.pushes.every((value) => value.opacity === "1" && value.transform === "none"));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await save(page, `${width}-reduced-all`, { fullPage: true });
    report.viewports.push({ width, height, cues, browser: { initialBrowserWidth, finalBrowserWidth }, flow, layout, cleanup, reduced });
    console.log(`Verified ${width}px: sections, scenes, responsiveness, industry photos, reduced motion, cleanup`);
  }

  const routePage = await browser.newPage();
  await configure(routePage);
  for (const link of links) {
    const response = await routePage.goto(`http://localhost:5173${link}`, { waitUntil: "domcontentloaded" });
    await routePage.waitForSelector("h1");
    const h1 = await routePage.$eval("h1", (el) => el.textContent);
    assert.equal(response.status(), 200);
    assert.ok(!/404|ვერ მოიძებნა/.test(h1), `${link}: an existing route renders`);
    report.routes.push({ path: link, status: response.status(), h1 });
  }
  await routePage.close();
  assert.deepEqual(report.errors, [], "No preview browser errors");
  assert.deepEqual(report.warnings, [], "No preview React or unexpected warnings");
  console.log(`Verified ${report.routes.length} card links; no preview errors or unexpected warnings`);
} finally {
  await writeFile("preview-verification/v4/report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
