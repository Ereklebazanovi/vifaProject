// Local QA only: node preview-verification/verifyPreview.mjs
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const output = new URL("./verification/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ headless: true, pipe: true });
const report = { viewports: [], errors: [], warnings: [], existingHomeWarnings: [], notices: [] };
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const products = ["web", "chatbot", "invento", "lineup"];
const finalSteps = [1, 6, 2, 1];

try {
  const page = await browser.newPage();
  await page.emulateTimezone("Asia/Tbilisi");
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    // QA stays local, including analytics mounted by the surrounding app.
    if (["localhost", "127.0.0.1"].includes(url.hostname) ||
        ["data:", "blob:"].includes(url.protocol)) request.continue();
    else request.respond({ status: 204, body: "" });
  });
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.on("console", (message) => {
    const text = message.text();
    if (message.type() === "error" && new URL(page.url()).pathname === "/" &&
        text.includes("fetchPriority") && text.includes("NewHomeVifa")) {
      report.existingHomeWarnings.push(text);
      return;
    }
    if (message.type() === "warn" && text ===
        "You have Reduced Motion enabled on your device. Animations may not appear as expected.") {
      report.notices.push(text);
      return;
    }
    if (message.type() === "error") report.errors.push(text);
    if (message.type() === "warn") report.warnings.push(text);
  });
  await page.evaluateOnNewDocument(() => {
    window.__previewQA = { timers: new Set(), observers: new Set() };
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
      observe(target) {
        if (target.classList.contains("it-card")) window.__previewQA.observers.add(this);
        return super.observe(target);
      }
      disconnect() {
        window.__previewQA.observers.delete(this);
        return super.disconnect();
      }
    };
  });

  const screenshot = (name) => page.screenshot({ path: fileURLToPath(new URL(`${name}.png`, output)) });
  const states = () => page.$$eval(".it-card", (cards) => cards.map((card) => Number(card.dataset.sceneStep)));
  const measure = () => page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll(".it-card"));
    return {
      pageWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      cards: cards.map((card) => {
        const text = card.querySelector(".it-card-top").getBoundingClientRect();
        const device = card.querySelector(".it-device-stage").getBoundingClientRect();
        const facts = card.querySelector(".it-card-facts");
        return {
          product: card.dataset.product,
          width: card.getBoundingClientRect().width,
          textBottom: text.bottom,
          deviceTop: device.top,
          clippedText: Array.from(card.querySelectorAll(".it-card-top p, .it-card-top h3"))
            .some((el) => el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1),
          facts: facts ? { size: getComputedStyle(facts).fontSize, weight: getComputedStyle(facts).fontWeight } : null,
        };
      }),
    };
  });

  for (const width of [1440, 390]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.evaluate(() => document.fonts.ready);
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForSelector(".it-card");
    const initial = await states();
    await screenshot(`${width}-initial`);
    await pause(6000);
    const afterInitial = await states();
    assert.equal(afterInitial[3], 0, "The hidden LineUp scene must wait for its card");
    if (width === 390) assert.deepEqual(afterInitial.slice(1), [0, 0, 0]);
    if (width === 390) {
      const reveal = (fraction) => page.$eval('[data-product="lineup"]', (card, fraction) => {
        const row = card.parentElement;
        row.style.scrollSnapType = "none";
        row.scrollTo({ left: card.offsetLeft - row.clientWidth + card.clientWidth * fraction, behavior: "instant" });
      }, fraction);
      await reveal(0.55);
      await pause(1100);
      assert.equal((await states())[3], 0, "55% visibility does not start the scene");
      await reveal(0.65);
      await pause(1100);
      assert.equal((await states())[3], 1, "65% visibility starts the scene");
      await page.$eval(".it-shelf-scroller", (row) => row.style.removeProperty("scroll-snap-type"));
    }
    const layout = await measure();
    assert.ok(layout.scrollWidth <= width, "No horizontal page overflow");
    for (const card of layout.cards) {
      assert.ok(card.deviceTop >= card.textBottom + 15, `${card.product}: text clears the device`);
      assert.equal(card.clippedText, false, `${card.product}: no clipped copy`);
      if (card.facts) assert.deepEqual(card.facts, { size: "14px", weight: "500" });
    }
    for (const product of products) {
      await page.$eval(`[data-product="${product}"]`, (card) => {
        card.scrollIntoView({ block: "nearest", inline: "start", behavior: "instant" });
      });
      await pause(6000);
      await screenshot(`${width}-final-${product}`);
      const index = products.indexOf(product);
      assert.equal((await states())[index], finalSteps[index], `${product}: final state`);
      const notificationFits = await page.$eval(`[data-product="${product}"]`, (card) => {
        const notification = card.querySelector(".it-scene-notification");
        if (!notification) return true;
        const bounds = card.getBoundingClientRect();
        const content = notification.getBoundingClientRect();
        return content.left >= bounds.left && content.right <= bounds.right &&
          content.bottom <= bounds.bottom && notification.scrollWidth <= notification.clientWidth + 1;
      });
      assert.ok(notificationFits, `${product}: the notification fits inside its card`);
    }
    assert.deepEqual(await states(), finalSteps);
    const chat = await page.$eval(".it-light-chat-messages", (el) => ({
      scrolled: el.scrollTop,
      bottom: el.scrollHeight - el.clientHeight - el.scrollTop,
    }));
    assert.ok(chat.bottom <= 1, "The newest chat message remains visible");

    // Replay only once the scene has finished, then unmount while timers are active.
    await page.$eval('[data-product="chatbot"]', (card) => card.scrollIntoView({ block: "nearest", inline: "start", behavior: "instant" }));
    await page.mouse.move(0, 0);
    await page.hover('[data-product="chatbot"]');
    await page.waitForFunction(() => document.querySelector('[data-product="chatbot"]').dataset.sceneStep === "0");
    await pause(350);
    const lift = await page.$eval('[data-product="chatbot"] .it-device-lift', (el) => getComputedStyle(el).transform);
    assert.equal(lift, "matrix(1, 0, 0, 1, 0, -6)");
    await pause(5000);
    assert.equal((await states())[1], 6, "Hover replay completes");
    await page.mouse.move(0, 0);
    await page.hover('[data-product="chatbot"]');
    const activeTimers = await page.evaluate(() => window.__previewQA.timers.size);
    assert.ok(activeTimers > 0);
    await page.click(".it-nav-brand");
    await page.waitForFunction(() => !document.querySelector(".it-preview"));
    const cleanup = await page.evaluate(() => ({ timers: window.__previewQA.timers.size, observers: window.__previewQA.observers.size }));
    assert.deepEqual(cleanup, { timers: 0, observers: 0 });

    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-card");
    assert.deepEqual(await states(), finalSteps, "Reduced motion renders all final states, including hidden cards");
    for (const product of products) {
      await page.$eval(`[data-product="${product}"]`, (card) => card.scrollIntoView({ block: "nearest", inline: "start", behavior: "instant" }));
      await screenshot(`${width}-reduced-${product}`);
    }
    const reduced = await page.evaluate(() => ({
      activeAnimations: document.getAnimations().filter((animation) => animation.playState === "running").length,
      timers: window.__previewQA.timers.size,
      entrance: getComputedStyle(document.querySelector(".it-device-entrance")).transform,
      push: {
        opacity: getComputedStyle(document.querySelector(".it-lineup-push > div")).opacity,
        transform: getComputedStyle(document.querySelector(".it-lineup-push > div")).transform,
      },
    }));
    assert.equal(reduced.activeAnimations, 0);
    assert.equal(reduced.timers, 0);
    assert.equal(reduced.entrance, "none");
    assert.deepEqual(reduced.push, { opacity: "1", transform: "none" });
    await page.$eval(".it-contact-card", (el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
    await screenshot(`${width}-contact`);
    report.viewports.push({ width, initial, afterInitial, final: finalSteps, layout, chat, lift, cleanup, reduced });
    console.log(`Verified ${width}px: final scenes, copy layout, replay, cleanup, reduced motion`);
  }
  assert.deepEqual(report.errors, [], "No browser errors");
  assert.deepEqual(report.warnings, [], "No React/browser warnings");
} finally {
  await writeFile(new URL("report.json", output), JSON.stringify(report, null, 2));
  await browser.close();
}
