import fs from 'fs';
import path from 'path';

// Import blog posts data from src/utils/blogUtils.ts
// Since we can't directly import TS, we'll hardcode the posts
// In a production setup, you'd use a build-time data source
const blogPosts = {
  'biznesis-cifruli-transformacia': {
    title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
    description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
    image: 'https://www.inventogeo.com/statia-1.jpg'
  },
  'ai-biznesshi-strategiuli-innovaciebi': {
    title: 'ხელოვნური ინტელექტი ბიზნესში: თანამედროვე სტრატეგიული ინოვაციები',
    description: 'AI აღარ არის მხოლოდ ფუტურისტული კონცეფცია, არამედ პრაქტიკული ინსტრუმენტი, რომელიც ფუნდამენტურად ცვლის კომპანიების ოპერაციულ მოდელებს.',
    image: 'https://www.inventogeo.com/statia-2.jpg'
  },
  'ratom-stsirdeba-bizness-vebsaiti-2025': {
    title: 'რატომ სჭირდება ბიზნესს ვებსაიტი 2025 წელს?',
    description: 'პროფესიონალური ვებსაიტი არა მხოლოდ ხილვადობას უზრუნველყოფს, არამედ ზრდის შესაძლებლობებს და ეფექტურობას. 2025 წელს ეს აუცილებელია.',
    image: 'https://www.inventogeo.com/statia-3.jpg'
  }
};

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error(`Error: ${indexPath} not found. Run 'vite build' first.`);
  process.exit(1);
}

// Read the base index.html
const baseHTML = fs.readFileSync(indexPath, 'utf-8');

// Generate HTML files for each blog post
Object.entries(blogPosts).forEach(([slug, post]) => {
  // Create blog directory
  const blogDir = path.join(distDir, 'blog', slug);
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Generate meta tags with proper www URL consistency
  const metaTags = `<meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHTML(post.title)}" />
    <meta property="og:description" content="${escapeHTML(post.description)}" />
    <meta property="og:image" content="${post.image}" />
    <meta property="og:image:secure_url" content="${post.image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://www.inventogeo.com/blog/${slug}" />
    <meta property="og:site_name" content="Invento Technologies" />
    <meta property="og:locale" content="ka_GE" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(post.title)}" />
    <meta name="twitter:description" content="${escapeHTML(post.description)}" />
    <meta name="twitter:image" content="${post.image}" />`;

  // Aggressively remove ALL OG and Twitter meta tags using regex
  let html = baseHTML;

  // Remove all og: property meta tags
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '');

  // Remove all twitter: name meta tags
  html = html.replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '');

  // Insert new meta tags after the author meta tag
  html = html.replace(
    /(<meta\s+name="author"\s+content="Invento Technologies"\s*\/?>)/i,
    `$1\n    ${metaTags}`
  );

  // Update page title with blog post title
  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeHTML(post.title)} - Invento Technologies</title>`
  );

  // Write the file
  const filePath = path.join(blogDir, 'index.html');
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`✓ Generated: ${filePath}`);
});

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

console.log('✓ Blog pages generated successfully!');
