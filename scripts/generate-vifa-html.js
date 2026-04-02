import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

// Read the built index.html
let html = readFileSync(join(distDir, 'index.html'), 'utf-8');

// Vifa Digital - marketing-specific metadata
const vifaTitle = 'VIFA Digital - ციფრული მარკეტინგი საქართველოში';
const vifaDescription = 'ციფრული მარკეტინგის სერვისები: ვიდეო გადაღება, ფოტოგრაფია, სოციალური მედია მართვა, კონტენტის შექმნა. სრული მარკეტინგ პაკეტი თქვენი ბიზნესისთვის.';
const vifaImage = 'https://www.vifadigital.ge/viffa.png';
const vifaUrl = 'https://www.vifadigital.ge/';
const vifaSiteName = 'VIFA Digital';
const vifaKeywords = 'ციფრული მარკეტინგი, სოციალური მედია მართვა, ვიდეო გადაღება, ფოტოგრაფია, კონტენტის შექმნა, ბრენდინგი, VIFA Digital, vifadigital';
const vifaLang = 'ka';

// Replace <html lang=...>
html = html.replace(/<html lang="[^"]*"/, `<html lang="${vifaLang}"`);

// Replace <title>
html = html.replace(/<title>[^<]*<\/title>/, `<title>${vifaTitle}</title>`);

// Replace meta description
html = html.replace(/(<meta name="description" content=")[^"]*(")/,  `$1${vifaDescription}$2`);
html = html.replace(/(<meta name="keywords" content=")[^"]*(")/,     `$1${vifaKeywords}$2`);
html = html.replace(/(<meta name="author" content=")[^"]*(")/,       `$1VIFA Digital$2`);

// Replace Open Graph
html = html.replace(/(<meta property="og:site_name" content=")[^"]*(")/,        `$1${vifaSiteName}$2`);
html = html.replace(/(<meta property="og:title" content=")[^"]*(")/,            `$1${vifaTitle}$2`);
html = html.replace(/(<meta property="og:description" content=")[^"]*(")/,      `$1${vifaDescription}$2`);
html = html.replace(/(<meta property="og:image" content=")[^"]*(")/,            `$1${vifaImage}$2`);
html = html.replace(/(<meta property="og:image:secure_url" content=")[^"]*(")/,`$1${vifaImage}$2`);
html = html.replace(/(<meta property="og:url" content=")[^"]*(")/,              `$1${vifaUrl}$2`);

// Replace Twitter
html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/,       `$1${vifaTitle}$2`);
html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${vifaDescription}$2`);
html = html.replace(/(<meta name="twitter:image" content=")[^"]*(")/,        `$1${vifaImage}$2`);

// Replace canonical
html = html.replace(/(<link rel="canonical" href=")[^"]*(")/,  `$1${vifaUrl}$2`);

// Replace favicons
html = html.replace(/(<link rel="icon" type="image\/png" href=")[^"]*(")/,   `$1/viffa.png$2`);
html = html.replace(/(<link rel="apple-touch-icon" href=")[^"]*(")/,         `$1/viffa.png$2`);
html = html.replace(/(<link rel="manifest" href=")[^"]*(")/,                 `$1/site-vifa.webmanifest$2`);

// Replace JSON-LD structured data
const vifaJsonLd = {
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
  `<script type="application/ld+json">\n    ${JSON.stringify(vifaJsonLd, null, 6)}\n    </script>`
);

// Write the Vifa-specific HTML
writeFileSync(join(distDir, 'index-vifa.html'), html, 'utf-8');
console.log('Generated dist/index-vifa.html for vifadigital.ge');
