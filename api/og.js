export default async function handler(req, res) {
  const { slug } = req.query;

  // Blog posts data
  const blogPosts = {
    'biznesis-cifruli-transformacia': {
      title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
      description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
      image: 'https://www.vifadigital.ge/statia-1.jpg'
    }
  };

  const post = blogPosts[slug];

  if (!post) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Return OG image redirect
  res.setHeader('Location', post.image);
  res.status(302).end();
}
