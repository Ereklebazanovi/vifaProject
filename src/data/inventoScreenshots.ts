import type { ScreenshotViewport } from "../components/ui/ScreenshotDetail";

const desktop = [1440, 900] as const;
const phone = [1170, 2532] as const;

export const inventoScreenshots = {
  inventory: "/invento-demo-inventory.webp",
  orders: "/invento-demo-orders.webp",
  analytics: "/invento-demo-analytics.webp",
  showroom: "/invento-demo-showroom.webp",
} as const;

// Crop at component boundaries in the original shots so type, numeric values
// and row labels stay together. The order and document views omit customer details.
export const inventoDetails = {
  inventory: { src: "/step2-stock.png", viewport: { size: phone, crop: [44, 1290, 1086, 642] } },
  orders: { src: inventoScreenshots.orders, viewport: { size: desktop, crop: [803, 484, 385, 234] } },
  documents: { src: "/step4-invoice.png", viewport: { size: phone, crop: [32, 575, 1106, 1264] } },
  reports: { src: inventoScreenshots.analytics, viewport: { size: desktop, crop: [279, 234, 567, 213] } },
} satisfies Record<string, { src: string; viewport: ScreenshotViewport }>;

export const inventoOrderOverview: ScreenshotViewport = { size: desktop, crop: [803, 484, 606, 324] };
