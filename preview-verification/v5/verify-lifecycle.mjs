import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const report = {};
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluateOnNewDocument(() => {
    window.__lifecycle = { timers: new Set(), io: new Set(), ro: new Set() };
    const set = window.setTimeout.bind(window), clear = window.clearTimeout.bind(window);
    window.setTimeout = (callback, delay, ...args) => {
      const own = new Error().stack.includes("useProductScene");
      const id = set(() => { window.__lifecycle.timers.delete(id); callback(...args); }, delay);
      if (own) window.__lifecycle.timers.add(id);
      return id;
    };
    window.clearTimeout = (id) => { window.__lifecycle.timers.delete(id); clear(id); };
    for (const [name, key, selector] of [["IntersectionObserver", "io", ".it-family-stage,.it-card,.it-flow-stage,.it-industry-card"], ["ResizeObserver", "ro", ".it-chat-thread,.it-light-chat-messages,.it-flow-stage,.it-checkout-pay"]]) {
      const Original = window[name];
      window[name] = class extends Original {
        observe(target, ...args) { if (target.matches(selector)) window.__lifecycle[key].add(this); return super.observe(target, ...args); }
        disconnect() { window.__lifecycle[key].delete(this); return super.disconnect(); }
      };
    }
  });
  await page.goto("http://localhost:5173/preview/it?flow=color", { waitUntil: "networkidle0" });
  await page.$eval('[data-product="lineup"]', (el) => el.scrollIntoView({ block: "center", inline: "center", behavior: "instant" }));
  await page.waitForFunction(() => document.querySelector('[data-product="lineup"]').dataset.sceneStep === "1");
  await pause(180);
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.waitForFunction(() => window.__lifecycle.timers.size === 0 &&
    Array.from(document.querySelectorAll(".it-card")).map((el) => el.dataset.sceneStep).join(",") === "1,6,2,1", { timeout: 3000 });
  report.runtimeReduced = await page.evaluate(() => ({
    products: Array.from(document.querySelectorAll(".it-card")).map((el) => el.dataset.sceneStep),
    timers: window.__lifecycle.timers.size,
    running: document.getAnimations().filter((animation) => animation.playState === "running").length,
    push: getComputedStyle(document.querySelector('[data-product="lineup"] .it-lineup-push > div')).transitionDuration,
  }));
  assert.deepEqual(report.runtimeReduced, { products: ["1", "6", "2", "1"], timers: 0, running: 0, push: "0s" });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  const before = await page.$eval('[data-product="lineup"]', (el) => Number(el.dataset.loopCycle));
  // Element screenshot can briefly produce 1px viewport visibility batches in Chromium.
  await (await page.$('[data-product="lineup"]')).screenshot({ path: "preview-verification/v5/visibility-regression.png" });
  await page.waitForFunction((before) => Number(document.querySelector('[data-product="lineup"]').dataset.loopCycle) >= before + 2, { timeout: 15000 }, before);
  report.visibilityRecovered = true;
  await page.hover('[data-product="lineup"]');
  await pause(500);
  report.productHover = await page.$eval('[data-product="lineup"]', (el) => ({ card: getComputedStyle(el).transform, device: getComputedStyle(el.querySelector(".it-device-lift")).transform }));
  assert.equal(report.productHover.device, "matrix(1, 0, 0, 1, 0, -8)");
  assert.ok(report.productHover.card.startsWith("matrix(1.015,"));
  await page.$eval(".it-industry-card", (el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.hover(".it-industry-card");
  await pause(1000);
  report.industryHover = await page.$eval(".it-industry-card", (el) => ({ card: getComputedStyle(el).transform, photo: getComputedStyle(el.querySelector("img")).transform, label: getComputedStyle(el.querySelector(".it-industry-copy")).transform }));
  assert.deepEqual(report.industryHover, { card: "none", photo: "matrix(1.04, 0, 0, 1.04, 0, 0)", label: "matrix(1, 0, 0, 1, 0, -4)" });
  assert.ok(await page.evaluate(() => window.__lifecycle.timers.size > 0));
  await page.evaluate(() => { history.pushState({}, "", "/preview/type"); dispatchEvent(new PopStateEvent("popstate")); });
  await page.waitForFunction(() => !document.querySelector(".it-preview"));
  report.activeCleanup = await page.evaluate(() => ({ timers: window.__lifecycle.timers.size, io: window.__lifecycle.io.size, ro: window.__lifecycle.ro.size }));
  assert.deepEqual(report.activeCleanup, { timers: 0, io: 0, ro: 0 });
  console.log("Verified runtime reduced motion, visibility recovery, both hover treatments, and cleanup during active loops");
} finally {
  await writeFile("preview-verification/v5/lifecycle-report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
