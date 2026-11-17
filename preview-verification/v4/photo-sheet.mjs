import sharp from "sharp";
const tiles = await Promise.all(Array.from({ length: 14 }, async (_, i) => {
  const number = String(i + 1).padStart(2, "0");
  const photo = await sharp(`public/gallery/food/${number}.webp`).resize(240, 210, { fit: "cover" }).toBuffer();
  const label = Buffer.from(`<svg width="240" height="30"><rect width="240" height="30" fill="white"/><text x="12" y="22" font-family="sans-serif" font-size="18">${number}.webp</text></svg>`);
  return [
    { input: photo, left: (i % 4) * 250, top: Math.floor(i / 4) * 250 },
    { input: label, left: (i % 4) * 250, top: Math.floor(i / 4) * 250 + 210 },
  ];
}));
await sharp({ create: { width: 1000, height: 1000, channels: 3, background: "#f5f5f7" } })
  .composite(tiles.flat()).png().toFile("preview-verification/v4/food-contact-sheet.png");
