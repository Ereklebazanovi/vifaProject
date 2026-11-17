import assert from "node:assert/strict";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
import ffmpegPath from "ffmpeg-static";

const out = "preview-verification/v5";
await mkdir(`${out}/recordings`, { recursive: true });
const browser = await puppeteer.launch({ headless: true, pipe: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const report = { scenes: [], layouts: [], reduced: [], errors: [], warnings: [], notices: [], contrast: {} };
if (process.argv.includes("--resume")) {
  const previous = JSON.parse(await readFile(`${out}/report.json`, "utf8"));
  report.scenes = previous.scenes;
  report.notices = previous.notices;
}
const colors = { web: "#ef3e39", chatbot: "#7d4cf0", invento: "#1f55d7", lineup: "#dd5b0b" };
const luma = (rgb) => rgb.map((v) => v / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
for (const [product, hex] of Object.entries(colors)) {
  const rgb = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));
  report.contrast[product] = { color: hex, white: +(1.05 / (luma(rgb) + 0.05)).toFixed(2), body92: +((luma(rgb.map((v) => v + (255 - v) * 0.92)) + 0.05) / (luma(rgb) + 0.05)).toFixed(2) };
}

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
    const text = message.text();
    if (message.type() === "error") report.errors.push(text);
    if (message.type() === "warn") {
      if (text.startsWith("You have Reduced Motion enabled")) report.notices.push(text);
      else report.warnings.push(text);
    }
  });
  await page.evaluateOnNewDocument(() => {
    window.__qa = { timers: new Set(), io: new Set(), ro: new Set(), shifts: [] };
    const set = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
    window.setTimeout = (callback, delay, ...args) => {
      const own = new Error().stack.includes("useProductScene");
      const id = set(() => { window.__qa.timers.delete(id); callback(...args); }, delay);
      if (own) window.__qa.timers.add(id);
      return id;
    };
    window.clearTimeout = (id) => { window.__qa.timers.delete(id); clear(id); };
    for (const [name, key, selector] of [
      ["IntersectionObserver", "io", ".it-family-stage,.it-card,.it-flow-stage,.it-industry-card"],
      ["ResizeObserver", "ro", ".it-chat-thread,.it-light-chat-messages,.it-flow-stage,.it-checkout-pay"],
    ]) {
      const Original = window[name];
      window[name] = class extends Original {
        observe(target, ...args) { if (target.matches(selector)) window.__qa[key].add(this); return super.observe(target, ...args); }
        disconnect() { window.__qa[key].delete(this); return super.disconnect(); }
      };
    }
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__qa.shifts.push({ time: performance.now(), value: entry.value });
    }).observe({ type: "layout-shift", buffered: true });
  });
}

const scroll = (page, selector) => page.$eval(selector, (el) => el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" }));
async function settled(page, selector, last) {
  await page.waitForFunction((selector, last) => {
    const el = document.querySelector(selector);
    return Number(el.dataset.sceneStep ?? el.dataset.flowStep) === last && el.dataset.exiting === "false";
  }, { timeout: 30000 }, selector, last);
  await pause(750);
}
async function shot(page, selector, name) {
  if (selector.startsWith("#")) {
    await page.$eval(selector, (el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.screenshot({ path: `${out}/${name}.png`, captureBeyondViewport: false });
  } else {
    const clip = await page.$eval(selector, (el) => {
      const rect = el.getBoundingClientRect();
      const left = Math.max(0, rect.left), top = Math.max(0, rect.top);
      return { x: left + scrollX, y: top + scrollY, width: Math.min(innerWidth, rect.right) - left, height: Math.min(innerHeight, rect.bottom) - top };
    });
    await page.screenshot({ path: `${out}/${name}.png`, clip, captureBeyondViewport: false });
  }
}

async function record(page, selector, last, name, screenshotSelector = selector) {
  if (report.scenes.some((scene) => scene.name === name)) {
    await scroll(page, selector);
    console.log(`Retained verified two-loop recording: ${name}`);
    return;
  }
  // Put the target off screen first. Re-entry includes the fade before a paused scene restarts.
  if (selector !== ".it-family-stage") { await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" })); await pause(120); }
  else { await scroll(page, "#contact"); await pause(120); }
  const baseline = await page.$eval(selector, (el) => Number(el.dataset.loopCycle));
  const recorder = await page.screencast({ path: `${out}/recordings/${name}.webm`, ffmpegPath, fps: 30, quality: 28 });
  await scroll(page, selector);
  await page.waitForFunction((selector, baseline) => Number(document.querySelector(selector).dataset.loopCycle) > baseline, {}, selector, baseline);
  await page.$eval(selector, (root) => {
    const audit = { start: performance.now(), events: [], childMutations: 0, forbidden: [], badExit: [], sampleCount: 0 };
    const original = Array.from(root.querySelectorAll("*"));
    const observer = new MutationObserver((records) => {
      audit.childMutations += records.filter((record) => record.type === "childList").length;
      for (const record of records) if (record.target === root && record.type === "attributes") {
        audit.events.push({ time: performance.now() - audit.start, attribute: record.attributeName, value: root.getAttribute(record.attributeName) });
      }
    });
    observer.observe(root, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-exiting", "data-loop-cycle", "data-scene-step", "data-flow-step"] });
    const interval = setInterval(() => {
      audit.sampleCount++;
      for (const animation of root.getAnimations({ subtree: true })) {
        for (const frame of animation.effect.getKeyframes()) for (const property of Object.keys(frame)) {
          if (!["offset", "computedOffset", "easing", "composite", "transform", "opacity"].includes(property)) audit.forbidden.push(property);
        }
      }
      const exit = audit.events.findLast((event) => event.attribute === "data-exiting");
      if (exit?.value === "true" && performance.now() - audit.start - exit.time >= 390) {
        const visible = Array.from(root.querySelectorAll(".it-scene-element,.it-flow-order,.it-lineup-push > div"))
          .filter((el) => Number(getComputedStyle(el).opacity) > 0.01);
        if (visible.length) audit.badExit.push(visible.map((el) => el.className));
      }
    }, 80);
    window.__audit = { audit, stop: () => {
      observer.disconnect(); clearInterval(interval);
      audit.nodesStable = original.length === root.querySelectorAll("*").length && original.every((el, i) => el === root.querySelectorAll("*")[i]);
      audit.layoutShifts = window.__qa.shifts.filter((shift) => shift.time >= audit.start);
      return audit;
    } };
  });
  await settled(page, selector, last);
  await shot(page, screenshotSelector, `${name}-final`);
  await page.waitForFunction((selector) => document.querySelector(selector).dataset.exiting === "true", {}, selector);
  await pause(170);
  await shot(page, selector, `${name}-exit-mid`);
  await pause(240);
  await shot(page, selector, `${name}-exit-clear`);
  await page.waitForFunction((selector, baseline) => Number(document.querySelector(selector).dataset.loopCycle) >= baseline + 3, { timeout: 40000 }, selector, baseline);
  const audit = await page.evaluate(() => window.__audit.stop());
  await recorder.stop();
  const gaps = [];
  for (let i = 0; i < audit.events.length; i++) {
    const event = audit.events[i];
    if (event.attribute === "data-exiting" && event.value === "true") {
      const reset = audit.events.slice(i + 1).find((next) => next.attribute === "data-exiting" && next.value === "false");
      if (reset) gaps.push(reset.time - event.time);
    }
  }
  assert.equal(audit.childMutations, 0, `${name}: no scene elements mount or unmount`);
  assert.equal(audit.nodesStable, true, `${name}: node identities stay stable`);
  assert.deepEqual([...new Set(audit.forbidden)], [], `${name}: transform and opacity only`);
  assert.deepEqual(audit.badExit, [], `${name}: everything fades before reset`);
  assert.deepEqual(audit.layoutShifts, [], `${name}: no layout shift`);
  assert.ok(gaps.length >= 2 && gaps.every((gap) => gap >= 580 && gap < 1100), `${name}: exit plus gap precedes reset`);
  report.scenes.push({ name, gaps, ...audit });
  console.log(`Recorded and verified two loops: ${name}`);
}

async function checkLayout(page, width, variant) {
  const result = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth,
    stage: { width: document.querySelector(".it-flow-stage").clientWidth, height: document.querySelector(".it-flow-stage").clientHeight, background: getComputedStyle(document.querySelector(".it-flow-stage")).backgroundColor },
    grid: getComputedStyle(document.querySelector("#industries .it-shelf-scroller")).display,
    cards: Array.from(document.querySelectorAll(".it-card")).map((card) => ({
      color: getComputedStyle(card).backgroundColor, radius: getComputedStyle(card).borderRadius,
      gap: card.querySelector(".it-device-stage").getBoundingClientRect().top - card.querySelector(".it-card-top").getBoundingClientRect().bottom,
      title: { size: getComputedStyle(card.querySelector("h3")).fontSize, weight: getComputedStyle(card.querySelector("h3")).fontWeight },
      clipped: Array.from(card.querySelectorAll(".it-card-top p,.it-card-top h3")).some((el) => el.scrollWidth > el.clientWidth + 1 || (getComputedStyle(el).overflowY !== "visible" && el.scrollHeight > el.clientHeight + 1)),
    })),
    industry: Array.from(document.querySelectorAll(".it-industry-card")).map((card) => ({ width: card.clientWidth, height: card.clientHeight, loaded: card.querySelector("img").naturalWidth > 0 })),
    bands: document.querySelectorAll(".it-card-band").length,
  }));
  assert.ok(result.page <= width);
  assert.equal(result.stage.height, width === 1440 ? 560 : 520);
  assert.equal(result.stage.background, variant === "color" ? "rgb(31, 85, 215)" : "rgb(255, 255, 255)");
  assert.equal(result.grid, width === 1440 ? "grid" : "flex");
  assert.equal(result.bands, 0);
  assert.ok(result.cards.every((card) => card.radius === "28px" && card.gap >= 20 && !card.clipped && card.title.size === (width === 1440 ? "32px" : "26px") && card.title.weight === "700"));
  assert.ok(result.industry.every((card) => card.loaded));
  if (width === 1440) assert.deepEqual(result.industry[0], { width: 480, height: 620, loaded: true });
  report.layouts.push({ width, variant, ...result });
}

try {
  const page = await browser.newPage();
  await configure(page);
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    for (const variant of ["light", "color"]) {
      const prefix = `${width}-${variant}`;
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
      await page.goto(`http://localhost:5173/preview/it?flow=${variant}`, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      if (variant === "light") await record(page, ".it-family-stage", 9, `${prefix}-hero`, "#hero");
      else { await settled(page, ".it-family-stage", 9); await shot(page, "#hero", `${prefix}-hero-final`); }
      for (const [product, last] of [["web", 1], ["chatbot", 6], ["invento", 2], ["lineup", 1]]) {
        const selector = `.it-card[data-product="${product}"]`;
        if (variant === "light") await record(page, selector, last, `${prefix}-product-${product}`);
        else { await scroll(page, selector); await settled(page, selector, last); await shot(page, selector, `${prefix}-product-${product}-final`); }
      }
      await record(page, ".it-flow-stage", 6, `${prefix}-flow`, "#connected");
      if (width === 1440) {
        if (variant === "light") await record(page, ".it-industry-card", 1, `${prefix}-industries`, "#industries");
        else { await scroll(page, "#industries .it-shelf-scroller"); await settled(page, ".it-industry-card", 1); await shot(page, "#industries", `${prefix}-industries-final`); }
        await page.waitForFunction(() => Array.from(document.querySelectorAll(".it-industry-photo")).every((img) => img.complete && img.naturalWidth > 0));
        await shot(page, "#industries", `${prefix}-industries-loaded`);
      } else for (let i = 1; i <= 5; i++) {
        const selector = `.it-industry-card:nth-child(${i})`;
        if (variant === "light") await record(page, selector, 1, `${prefix}-industry-${i}`);
        else { await scroll(page, selector); await settled(page, selector, 1); await shot(page, selector, `${prefix}-industry-${i}-final`); }
      }
      await scroll(page, "#contact");
      await shot(page, "#contact", `${prefix}-contact`);
      await checkLayout(page, width, variant);

      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      await page.goto(`http://localhost:5173/preview/it?flow=${variant}`, { waitUntil: "networkidle0" });
      await page.waitForSelector(".it-flow-stage");
      for (const id of ["hero", "services", "connected", "industries", "contact"]) {
        await scroll(page, `#${id}`);
        if (id === "industries") for (let i = 1; i <= 5; i++) { await scroll(page, `.it-industry-card:nth-child(${i})`); await page.waitForFunction((i) => document.querySelectorAll(".it-industry-photo")[i - 1].naturalWidth > 0, {}, i); }
        await shot(page, `#${id}`, `${prefix}-reduced-${id}`);
      }
      const reduced = await page.evaluate(() => ({
        hero: document.querySelector(".it-family-stage").dataset.sceneStep,
        products: Array.from(document.querySelectorAll(".it-card")).map((el) => el.dataset.sceneStep),
        flow: document.querySelector(".it-flow-stage").dataset.flowStep,
        chips: Array.from(document.querySelectorAll(".it-industry-card")).map((el) => el.dataset.sceneStep),
        timers: window.__qa.timers.size,
        animations: document.getAnimations().filter((animation) => animation.playState === "running").length,
      }));
      assert.deepEqual(reduced, { hero: "9", products: ["1", "6", "2", "1"], flow: "6", chips: ["1", "1", "1", "1", "1"], timers: 0, animations: 0 });
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.screenshot({ path: `${out}/${prefix}-reduced-full.png`, fullPage: true });
      report.reduced.push({ width, variant, ...reduced });
      // Unmount every scene controller and its measurement observers.
      await page.evaluate(() => { history.pushState({}, "", "/preview/type"); dispatchEvent(new PopStateEvent("popstate")); });
      await page.waitForFunction(() => !document.querySelector(".it-preview"));
      const cleanup = await page.evaluate(() => ({ timers: window.__qa.timers.size, io: window.__qa.io.size, ro: window.__qa.ro.size }));
      assert.deepEqual(cleanup, { timers: 0, io: 0, ro: 0 });
      console.log(`Verified ${prefix}: layout, images, reduced motion, and complete cleanup`);
    }
  }
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.warnings, []);
} catch (error) {
  report.failure = error.stack;
  throw error;
} finally {
  await writeFile(`${out}/report.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
