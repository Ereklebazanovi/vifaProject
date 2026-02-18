// Blog posts meta data
const blogPosts = {
  'biznesis-cifruli-transformacia': {
    title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სტრატეგიები და AI ტექნოლოგიები',
    description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
    image: 'https://www.inventogeo.com/statia-1.jpg'
  }
};

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const path = url.pathname;

  // Check if this is a blog post request
  const blogMatch = path.match(/^\/blog\/([a-z0-9-]+)$/);

  if (blogMatch) {
    const slug = blogMatch[1];
    const post = blogPosts[slug];

    if (post) {
      // Fetch the built HTML file
      const response = await context.env.ASSETS.fetch(new Request(new URL('/index.html', context.request.url)));
      let html = await response.text();

      // Generate meta tags for this blog post
      const metaTags = `
      <meta property="og:type" content="article" />
      <meta property="og:title" content="${escapeHTML(post.title)}" />
      <meta property="og:description" content="${escapeHTML(post.description)}" />
      <meta property="og:image" content="${post.image}" />
      <meta property="og:image:secure_url" content="${post.image}" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content="https://www.inventogeo.com/blog/${slug}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${escapeHTML(post.title)}" />
      <meta name="twitter:description" content="${escapeHTML(post.description)}" />
      <meta name="twitter:image" content="${post.image}" />
      `;

      // Replace the default og:type with our custom meta tags
      html = html.replace(
        /<meta property="og:type" content="website" \/>/,
        metaTags
      );

      // Update title
      html = html.replace(
        /<title>.*?<\/title>/,
        `<title>${escapeHTML(post.title)} - Invento Technologies</title>`
      );

      return new Response(html, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=3600'
        }
      });
    }
  }

  // For non-blog routes or if blog post not found, serve the index.html
  return context.env.ASSETS.fetch(context.request);
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
