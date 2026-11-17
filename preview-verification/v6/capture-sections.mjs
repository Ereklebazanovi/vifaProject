import puppeteer from "puppeteer";
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const sections = ["hero", "services", "connected", "industries", "getting-started", "contact"];
const report = [];
try {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-industry-panel");
    await page.evaluate(() => document.fonts.ready);
    for (const id of sections) await page.$eval(`#${id}`, (el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
    await page.waitForFunction(() => Array.from(document.querySelectorAll(".it-industry-photo")).every((el) => el.naturalWidth > 0));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const bounds = await page.evaluate((ids) => ids.map((id) => {
      const rect = document.getElementById(id).getBoundingClientRect();
      return { id, x: Math.round(rect.left + scrollX), y: Math.round(rect.top + scrollY), width: Math.round(rect.width), height: Math.round(rect.height) };
    }), sections);
    const screenshot = await page.screenshot({ fullPage: true, path: `preview-verification/v6/${width}-overview.png` });
    for (const box of bounds) await sharp(screenshot).extract({ left: box.x, top: box.y, width: box.width, height: box.height }).png().toFile(`preview-verification/v6/${width}-section-${box.id}.png`);
    report.push({ width, bounds });
  }
} finally { await writeFile("preview-verification/v6/section-bounds.json", JSON.stringify(report, null, 2)); await browser.close(); }
