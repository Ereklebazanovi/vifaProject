import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const report = [];
try {
  const page = await browser.newPage();
  page.on("pageerror", (error) => console.log(error.message));
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  for (const [width, height] of [[1440, 900], [1024, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.waitForSelector(".it-industry-panel");
    await page.evaluate(() => document.fonts.ready);
    for (const id of ["services", "industries", "getting-started"]) {
      await page.$eval(`#${id}`, (el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
      if (id === "industries") await page.waitForFunction(() => Array.from(document.querySelectorAll(".it-industry-photo")).every((el) => el.naturalWidth > 0));
      await page.screenshot({ path: `preview-verification/v6/${width}-${id}-inspection.png`, captureBeyondViewport: false });
    }
    const layout = await page.evaluate(() => {
      const scrollers = [];
      for (const el of document.querySelectorAll("body *")) {
        if (el.scrollWidth > el.clientWidth + 1 && el.clientWidth > 0) {
          const before = el.scrollLeft;
          el.scrollLeft = 2;
          if (el.scrollLeft > 0) scrollers.push({ tag: el.tagName, class: el.className, width: el.clientWidth, scrollWidth: el.scrollWidth, overflow: getComputedStyle(el).overflowX });
          el.scrollLeft = before;
        }
      }
      return { viewport: innerWidth, page: document.documentElement.scrollWidth, scrollers,
        cards: Array.from(document.querySelectorAll(".it-card")).map((el) => ({ rect: el.getBoundingClientRect().toJSON(), panel: el.querySelector(".it-device-stage").getBoundingClientRect().toJSON() })),
        chips: Array.from(document.querySelectorAll(".it-industry-choice")).map((el) => el.getBoundingClientRect().toJSON()),
        panel: document.querySelector(".it-industry-panel").getBoundingClientRect().toJSON(),
      };
    });
    report.push({ width, layout });
    console.log(JSON.stringify({ width, page: layout.page, scrollers: layout.scrollers, cards: layout.cards.map((el) => [el.rect.width,el.rect.height]), chipRows: [...new Set(layout.chips.map((el) => el.top))].length }));
  }
} finally { await writeFile("preview-verification/v6/inspection.json", JSON.stringify(report, null, 2)); await browser.close(); }
