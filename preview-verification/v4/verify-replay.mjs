import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const report = [];
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  const page = await browser.newPage();
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-responsive-browser");
    const originalWidth = await page.$eval(".it-responsive-browser", (el) => parseFloat(getComputedStyle(el).width));
    await page.$eval("#services", (el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await pause(3700);
    await page.hover('.it-card[data-product="web"]');
    await page.waitForFunction(() => document.querySelector('.it-card[data-product="web"]').dataset.sceneStep === "0");
    const reset = await page.$eval(".it-responsive-browser", (el) => ({ width: parseFloat(getComputedStyle(el).width), desktop: getComputedStyle(el.querySelector(".it-browser-desktop-img")).opacity }));
    assert.ok(Math.abs(reset.width - originalWidth) < 1);
    assert.equal(reset.desktop, "1");
    await page.waitForFunction(() => document.querySelector('.it-card[data-product="web"]').dataset.sceneStep === "1");
    await pause(1000);
    const final = await page.$eval(".it-responsive-browser", (el) => ({ width: parseFloat(getComputedStyle(el).width), mobile: getComputedStyle(el.querySelector(".it-browser-mobile-img")).opacity }));
    assert.ok(Math.abs(final.width / originalWidth - 0.38) < 0.01);
    assert.equal(final.mobile, "1");
    await page.mouse.move(0, 0);
    await pause(350);
    await page.screenshot({ path: `preview-verification/v4/${width}-website-replay-final.png` });
    report.push({ width, originalWidth, reset, final });
    console.log(`Verified ${width}px website replay: full-width reset, then 38% width`);
  }
} finally {
  await writeFile("preview-verification/v4/replay-report.json", JSON.stringify(report, null, 2));
  await browser.close();
}
