/**
 * Web copies of a photo gallery.
 *   node scripts/gallery.mjs food
 * Reads the originals in photos/<name>/ (git-ignored; the repo is public and originals are
 * heavy), in file-name order (01.jpg, 02.jpg ...), and writes for each one:
 *   public/gallery/<name>/NN.webp     up to 1800px wide, for the full-screen view
 *   public/gallery/<name>/NN-sm.webp  up to 760px wide, for the grid
 * plus src/data/galleries/<name>.json with sizes (so the page doesn't jump while images load).
 * Alt texts already written in that JSON are kept, matched by the original file name.
 */
import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const name = process.argv[2];
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error("Usage: node scripts/gallery.mjs <name>   (photos are read from photos/<name>/)");
  process.exit(1);
}

const srcDir = join(root, "photos", name);
const outDir = join(root, "public", "gallery", name);
const jsonPath = join(root, "src", "data", "galleries", `${name}.json`);
if (!existsSync(srcDir)) {
  console.error(`No folder ${srcDir}`);
  process.exit(1);
}

const files = readdirSync(srcDir)
  .filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(extname(f)))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (!files.length) {
  console.error(`No photos in ${srcDir} (jpg, png, webp, avif, tiff)`);
  process.exit(1);
}

// Keep the alt texts written earlier.
const previous = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, "utf8")) : [];
const altOf = new Map(previous.map((p) => [p.file, { altKa: p.altKa || "", altEn: p.altEn || "" }]));

mkdirSync(outDir, { recursive: true });
mkdirSync(dirname(jsonPath), { recursive: true });
for (const f of readdirSync(outDir)) if (/^\d+(-sm)?\.webp$/.test(f)) rmSync(join(outDir, f));

const list = [];
let bytes = 0;
for (const [i, file] of files.entries()) {
  const nn = String(i + 1).padStart(2, "0");
  const input = join(srcDir, file);
  // rotate() applies the camera's orientation, so phone photos stand the right way up.
  const large = await sharp(input).rotate().resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(outDir, `${nn}.webp`));
  const small = await sharp(input).rotate().resize({ width: 760, withoutEnlargement: true }).webp({ quality: 72 }).toFile(join(outDir, `${nn}-sm.webp`));
  bytes += large.size + small.size;
  list.push({
    file,
    src: `/gallery/${name}/${nn}.webp`,
    srcSm: `/gallery/${name}/${nn}-sm.webp`,
    w: large.width,
    h: large.height,
    ...(altOf.get(file) || { altKa: "", altEn: "" }),
  });
  const kb = (n) => `${Math.round(n / 1024)}KB`;
  console.log(`${nn}  ${file}  ${large.width}x${large.height}  ${kb(statSync(input).size)} -> ${kb(large.size)} + ${kb(small.size)}`);
}

writeFileSync(jsonPath, JSON.stringify(list, null, 2) + "\n");
console.log(`\n${list.length} photos, ${Math.round(bytes / 1024)}KB in public/gallery/${name}/, list in src/data/galleries/${name}.json`);
const missing = list.filter((p) => !p.altKa).length;
if (missing) console.log(`${missing} without alt text yet.`);
