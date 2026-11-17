import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.emulateTimezone("Asia/Tbilisi");
  for (const [width, height, name] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
    await page.addStyleTag({ content: ".it-family-web { visibility: hidden !important; }" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => document.querySelector(".it-family-stage")?.dataset.sceneStep === "9" && document.querySelector(".it-family-stage")?.dataset.exiting === "false");
    await pause(700);
    await page.screenshot({ path: `public/preview/vifa-${name}.png` });
    console.log(`Captured mirror-free ${name}: ${width}x${height}`);
    await pause(600);
  }
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    for (const variant of ["light", "color"]) {
      await page.goto(`http://localhost:5173/preview/it?flow=${variant}`, { waitUntil: "networkidle0" });
      await page.waitForSelector(".it-flow-stage");
      await page.screenshot({ path: `preview-verification/v5/${width}-${variant}-preliminary.png`, fullPage: true });
    }
  }
} finally { await browser.close(); }
