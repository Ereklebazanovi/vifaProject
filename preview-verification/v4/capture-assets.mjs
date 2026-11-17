import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, pipe: true });
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  const page = await browser.newPage();
  await page.setCacheEnabled(false);
  await page.emulateTimezone("Asia/Tbilisi");
  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (["localhost", "127.0.0.1"].includes(url.hostname) || ["data:", "blob:"].includes(url.protocol)) request.continue();
    else request.respond({ status: 204, body: "" });
  });
  page.on("pageerror", (error) => console.error(error.message));
  // A second capture replaces the bootstrap v3 images with the completed v4 hub.
  for (let pass = 1; pass <= 2; pass++) {
    for (const [width, height, name] of [[1440, 900, "desktop"], [390, 844, "mobile"]]) {
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.goto("http://localhost:5173/preview/it", { waitUntil: "networkidle0" });
      await page.waitForSelector(".it-family-stage");
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => Array.from(document.querySelectorAll("[data-hero-product]")).every((el) =>
        Number(el.dataset.sceneStep) === ({ web: 1, invento: 2, chatbot: 6, lineup: 1 })[el.dataset.heroProduct]), { timeout: 15000 });
      await pause(700);
      await page.screenshot({ path: `public/preview/vifa-${name}.png` });
      console.log(`Captured ${name}, pass ${pass}, ${width}x${height}`);
      await pause(600);
    }
  }
} finally {
  await browser.close();
}
