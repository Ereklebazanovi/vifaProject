import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Blog posts data - sync with src/utils/blogUtils.ts
const blogPosts = {
  'biznesis-cifruli-transformacia': {
    title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
    description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
    image: '/statia-1.jpg'
  }
};

// Serve static files
app.use(express.static('dist'));

// Dynamic meta tag generation for blog posts
app.get('/blog/:slug', (req, res) => {
  const { slug } = req.params;
  const post = blogPosts[slug];

  // Read the base index.html
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  if (post) {
    // Replace meta tags with blog-specific content
    const metaTags = `
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${post.title}" />
    <meta property="og:description" content="${post.description}" />
    <meta property="og:image" content="https://www.vifadigital.ge${post.image}" />
    <meta property="og:image:secure_url" content="https://www.vifadigital.ge${post.image}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="https://www.vifadigital.ge/blog/${slug}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${post.title}" />
    <meta name="twitter:description" content="${post.description}" />
    <meta name="twitter:image" content="https://www.vifadigital.ge${post.image}" />
    `;

    // Remove default og:image and replace with blog-specific ones
    html = html.replace(
      /<meta property="og:type" content="website" \/>/,
      metaTags
    );

    // Update title
    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${post.title} - Vifa Digital</title>`
    );
  }

  res.send(html);
});

// Serve all other routes with index.html for client-side routing
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
