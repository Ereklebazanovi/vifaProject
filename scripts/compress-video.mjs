/**
 * Video compression script for web.mp4
 * Uses ffmpeg-static (bundled ffmpeg binary) to compress the background video
 * Run: node scripts/compress-video.mjs
 */

import { execFile } from "child_process";
import { promisify } from "util";
import { existsSync, renameSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const execFileAsync = promisify(execFile);
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

async function getFfmpegPath() {
  try {
    const ffmpegStatic = await import("ffmpeg-static");
    return ffmpegStatic.default;
  } catch {
    throw new Error(
      'ffmpeg-static not found. Run: npm install --save-dev ffmpeg-static'
    );
  }
}

async function compressVideo() {
  const inputPath = join(rootDir, "public", "web.mp4");
  const outputPath = join(rootDir, "public", "web.compressed.mp4");
  const backupPath = join(rootDir, "public", "web.original.mp4");

  if (!existsSync(inputPath)) {
    console.error("❌ web.mp4 not found in public/");
    process.exit(1);
  }

  if (existsSync(backupPath)) {
    console.log("✅ Already compressed (web.original.mp4 backup exists). Skipping.");
    return;
  }

  console.log("🎬 Getting ffmpeg path...");
  const ffmpegPath = await getFfmpegPath();
  console.log(`✅ ffmpeg found: ${ffmpegPath}`);

  console.log("🗜️  Compressing web.mp4...");
  console.log("   Settings: H.264, CRF 28, 1280x720 max, no audio, yuv420p");
  console.log("   This may take a minute...\n");

  const args = [
    "-i", inputPath,
    "-c:v", "libx264",
    "-crf", "28",              // Quality: 18=lossless, 23=default, 28=good web, 32=smaller
    "-preset", "slow",         // Slower preset = better compression ratio
    "-vf", "scale='min(1280,iw)':'min(720,ih)':force_original_aspect_ratio=decrease", // Max 720p
    "-an",                     // Remove audio (background video doesn't need it)
    "-pix_fmt", "yuv420p",     // Best browser compatibility
    "-movflags", "+faststart", // Move metadata to front for faster web playback
    "-tune", "film",           // Tune for film/video content
    "-y",                      // Overwrite output
    outputPath,
  ];

  try {
    await execFileAsync(ffmpegPath, args, { maxBuffer: 100 * 1024 * 1024 });

    // Backup original and replace with compressed
    renameSync(inputPath, backupPath);
    renameSync(outputPath, inputPath);

    console.log("✅ Compression complete!");
    console.log(`   Original backed up to: public/web.original.mp4`);
    console.log(`   Compressed file: public/web.mp4`);

    // Show file sizes
    const { statSync } = await import("fs");
    const origSize = (statSync(backupPath).size / 1024 / 1024).toFixed(1);
    const newSize = (statSync(inputPath).size / 1024 / 1024).toFixed(1);
    const savings = (((statSync(backupPath).size - statSync(inputPath).size) / statSync(backupPath).size) * 100).toFixed(0);

    console.log(`\n📊 Results:`);
    console.log(`   Before: ${origSize} MB`);
    console.log(`   After:  ${newSize} MB`);
    console.log(`   Saved:  ${savings}%`);
  } catch (err) {
    console.error("❌ Compression failed:", err.message);
    // Cleanup failed output if it exists
    if (existsSync(outputPath)) {
      const { unlinkSync } = await import("fs");
      unlinkSync(outputPath);
    }
    process.exit(1);
  }
}

compressVideo();
