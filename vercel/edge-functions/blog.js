export default async function handler(request) {
  const url = new URL(request.url);
  const slug = url.pathname.split('/blog/')[1];

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
    return new Response('Not Found', { status: 404 });
  }

  // Fetch the base index.html
  const baseResponse = await fetch(new URL('/index.html', request.url));
  let html = await baseResponse.text();

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

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=3600'
    }
  });
}

function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
