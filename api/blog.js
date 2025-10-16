export default async function handler(req, res) {
  const { slug } = req.query;

  // Blog posts metadata
  const blogPosts = {
    'biznesis-cifruli-transformacia': {
      title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
      description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
      image: 'https://www.vifadigital.ge/statia-1.jpg'
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    return res.status(404).json({ error: 'Not Found' });
  }

  try {
    // Fetch the base index.html from dist
    const response = await fetch('https://www.vifadigital.ge/index.html');
    let html = await response.text();

    // Inject dynamic meta tags
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

    // Replace the default meta tags
    html = html.replace(
      /<meta property="og:type" content="website" \/>/,
      metaTags
    );

    html = html.replace(
      /<title>.*?<\/title>/,
      `<title>${escapeHTML(post.title)} - Vifa Digital</title>`
    );

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.send(html);
  } catch (error) {
    console.error('Error fetching index.html:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
