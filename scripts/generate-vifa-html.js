import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const srcFile = join(distDir, 'index.html');
const destFile = join(distDir, 'index-vifa.html');

console.log('[vifa-html] Starting...');
console.log('[vifa-html] dist dir:', distDir);
console.log('[vifa-html] src exists:', existsSync(srcFile));

if (!existsSync(srcFile)) {
  console.error('[vifa-html] ERROR: dist/index.html not found!');
  process.exit(1);
}

let html = readFileSync(srcFile, 'utf-8');

// Vifa Digital - marketing-specific metadata
const vifaTitle       = 'VIFA Digital - ციფრული მარკეტინგი საქართველოში';
const vifaDescription = 'ციფრული მარკეტინგის სერვისები: ვიდეო გადაღება, ფოტოგრაფია, სოციალური მედია მართვა, კონტენტის შექმნა. სრული მარკეტინგ პაკეტი თქვენი ბიზნესისთვის.';
const vifaImage       = 'https://www.vifadigital.ge/viffa.png';
const vifaUrl         = 'https://www.vifadigital.ge/';
const vifaKeywords    = 'ციფრული მარკეტინგი, სოციალური მედია მართვა, ვიდეო გადაღება, ფოტოგრაფია, კონტენტის შექმნა, ბრენდინგი, VIFA Digital, vifadigital';

// Replace <title>
html = html.replace(/<title>[^<]*<\/title>/, `<title>${vifaTitle}</title>`);

// Replace meta tags
html = html.replace(/(<meta name="description"\s+content=")[^"]*(")/,    `$1${vifaDescription}$2`);
html = html.replace(/(<meta name="keywords"\s+content=")[^"]*(")/,       `$1${vifaKeywords}$2`);
html = html.replace(/(<meta name="author"\s+content=")[^"]*(")/,         `$1VIFA Digital$2`);

// Open Graph
html = html.replace(/(<meta\s+property="og:site_name"\s+content=")[^"]*(")/,        `$1VIFA Digital$2`);
html = html.replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/,            `$1${vifaTitle}$2`);
html = html.replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/,      `$1${vifaDescription}$2`);
html = html.replace(/(<meta\s+property="og:image"\s+content=")[^"]*(")/,            `$1${vifaImage}$2`);
html = html.replace(/(<meta\s+property="og:image:secure_url"\s+content=")[^"]*(")/,`$1${vifaImage}$2`);
html = html.replace(/(<meta\s+property="og:url"\s+content=")[^"]*(")/,              `$1${vifaUrl}$2`);

// Twitter
html = html.replace(/(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,       `$1${vifaTitle}$2`);
html = html.replace(/(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,  `$1${vifaDescription}$2`);
html = html.replace(/(<meta\s+name="twitter:image"\s+content=")[^"]*(")/,        `$1${vifaImage}$2`);

// Canonical
html = html.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/,  `$1${vifaUrl}$2`);

// Favicons
html = html.replace(/(<link\s+rel="icon"\s+type="image\/png"\s+href=")[^"]*(")/,   `$1/viffa.png$2`);
html = html.replace(/(<link\s+rel="apple-touch-icon"\s+href=")[^"]*(")/,           `$1/viffa.png$2`);
html = html.replace(/(<link\s+rel="manifest"\s+href=")[^"]*(")/,                   `$1/site-vifa.webmanifest$2`);

// JSON-LD
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "VIFA Digital",
  "url": "https://www.vifadigital.ge",
  "logo": vifaImage,
  "description": "ციფრული მარკეტინგის სერვისები საქართველოში",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Georgian", "English"]
  },
  "sameAs": [
    "https://www.facebook.com/vifadigital",
    "https://www.instagram.com/vifadigital"
  ],
  "areaServed": "Georgia",
  "serviceType": ["Digital Marketing", "Social Media Management", "Video Production", "Photography", "Content Creation"]
};

html = html.replace(
  /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n    ${JSON.stringify(jsonLd, null, 4)}\n    </script>`
);

writeFileSync(destFile, html, 'utf-8');
console.log('[vifa-html] SUCCESS: dist/index-vifa.html created');
console.log('[vifa-html] File size:', readFileSync(destFile).length, 'bytes');
