import { execFileSync } from "node:child_process";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";
for (const width of [1440, 390]) for (const variant of ["light", "color"]) {
  const frames = [];
  const tileWidth = width === 1440 ? 360 : 260;
  const tileHeight = Math.round(tileWidth * (width === 1440 ? 900 / 1440 : 844 / 390));
  for (const [index, time] of [1.1, 1.4, 1.7, 2.0].entries()) {
    const png = execFileSync(ffmpegPath, ["-hide_banner", "-loglevel", "error", "-ss", String(time), "-i", `preview-verification/v5/recordings/${width}-${variant}-flow.webm`, "-frames:v", "1", "-f", "image2pipe", "-vcodec", "png", "pipe:1"], { maxBuffer: 16 * 1024 * 1024 });
    if (index === 1) await sharp(png).toFile(`preview-verification/v5/${width}-${variant}-order-in-transit.png`);
    frames.push({ input: await sharp(png).resize(tileWidth, tileHeight).toBuffer(), left: index * tileWidth, top: 24 });
    frames.push({ input: Buffer.from(`<svg width="${tileWidth}" height="24"><rect width="100%" height="100%" fill="white"/><text x="10" y="17" font-family="sans-serif" font-size="13">${time.toFixed(1)}s</text></svg>`), left: index * tileWidth, top: 0 });
  }
  await sharp({ create: { width: tileWidth * 4, height: tileHeight + 24, channels: 3, background: "white" } }).composite(frames).png().toFile(`preview-verification/v5/${width}-${variant}-order-journey.png`);
}
