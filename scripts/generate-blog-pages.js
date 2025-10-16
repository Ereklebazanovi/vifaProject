import fs from 'fs';
import path from 'path';

const blogPosts = {
  'biznesis-cifruli-transformacia': {
    title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
    description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
    image: 'https://www.vifadigital.ge/statia-1.jpg'
  }
};

const distDir = path.join(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');

// Read the base index.html
const baseHTML = fs.readFileSync(indexPath, 'utf-8');

// Generate HTML files for each blog post
Object.entries(blogPosts).forEach(([slug, post]) => {
  // Create blog directory
  const blogDir = path.join(distDir, 'blog', slug);
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Generate meta tags
  const metaTags = `
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${escapeHTML(post.title)}" />
    <meta property="og:description" content="${escapeHTML(post.description)}" />
    <meta property="og:image" content="${post.image}" />
    <meta property="og:image:secure_url" content="${post.image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://www.vifadigital.ge/blog/${slug}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHTML(post.title)}" />
    <meta name="twitter:description" content="${escapeHTML(post.description)}" />
    <meta name="twitter:image" content="${post.image}" />
  `;

  // Replace meta tags
  let html = baseHTML.replace(
    /<meta property="og:type" content="website" \/>/,
    metaTags
  );

  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHTML(post.title)} - Vifa Digital</title>`
  );

  // Write the file
  const filePath = path.join(blogDir, 'index.html');
  fs.writeFileSync(filePath, html, 'utf-8');
  console.log(`Generated: ${filePath}`);
});

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

console.log('Blog pages generated successfully!');
