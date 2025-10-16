import { marked } from 'marked';
import matter from 'gray-matter';
import type { BlogPost, BlogPostMetadata } from '../types/blog';

// Calculate reading time based on word count (average 200 words per minute)
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Parse markdown content with frontmatter
export function parseMarkdownPost(markdownContent: string, slug: string): BlogPost {
  const { data: frontmatter, content } = matter(markdownContent);

  // Parse markdown to HTML
  const htmlContent = marked(content) as string;

  const readingTime = calculateReadingTime(content);

  return {
    slug,
    title: frontmatter.title || 'Untitled',
    description: frontmatter.description || '',
    content: htmlContent,
    publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    updatedAt: frontmatter.updatedAt,
    thumbnail: frontmatter.thumbnail,
    author: {
      name: frontmatter.author?.name || 'Vifa Digital',
      avatar: frontmatter.author?.avatar,
    },
    tags: frontmatter.tags || [],
    readingTime,
    seo: frontmatter.seo || {
      title: frontmatter.title,
      description: frontmatter.description,
      ogImage: frontmatter.thumbnail,
    },
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ka-GE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate excerpt from content
export function generateExcerpt(content: string, maxLength: number = 150): string {
  // Remove HTML tags and get plain text
  const plainText = content.replace(/<[^>]*>/g, '');

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return plainText.substring(0, maxLength).trim() + '...';
}

// Blog posts data - will be populated with real content
export const blogPosts: BlogPost[] = [
  {
    slug: 'biznesis-cifruli-transformacia',
    title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროს გამოწვევა',
    description: 'დღევანდელ სწრაფად ცვალებად ბიზნეს-სივრცეში, ციფრული ტრანსფორმაცია აღარ არის მხოლოდ ტექნოლოგიური სიახლე – ეს აუცილებელი სტრატეგიაა.',
    content: `
      <p class="lead">დღევანდელ, სწრაფად ცვალებად ბიზნეს გარემოში, ციფრული ტრანსფორმაცია აღარ წარმოადგენს მხოლოდ ტექნოლოგიურ ინოვაციას – ეს აუცილებელი სტრატეგიული ნაბიჯია. მომხმარებლები უმეტესად ონლაინ სივრცეში ეძებენ ინფორმაციას, აკეთებენ შედარებებს და იღებენ გადაწყვეტილებებს, ამიტომ კომპანიები რომლებიც არ არიან ციფრულ სივრცეში, უპირატესობას მარტივად კარგავენ კონკურენციის პირობებში.</p>

      <h2>რას გულისხმობს ციფრული ტრანსფორმაცია?</h2>

      <p>ციფრული ტრანსფორმაცია არის პროცესი, რომელიც მოიცავს ციფრული ტექნოლოგიების გამოყენებას ბიზნესის ყველა ასპექტში, როგორც პროდუქტის ან სერვისის მიწოდებაში, ასევე მომხმარებელთან კომუნიკაციასა და შიდა ოპერაციებში. ეს პროცესი მოიცავს როგორც ტექნოლოგიურ სიახლეებს, ისე ორგანიზაციული კულტურისა და სამუშაო პროცესების გარდაქმნას, რათა მომხმარებლამდე მივიდეს მაქსიმალური შედეგი და ღირებულება.</p>

      <h2>რატომ არის აუცილებელი?</h2>

      <h3>მომხმარებელთან ეფექტური კომუნიკაცია</h3>

      <p>ციფრული პლატფორმები და AI ტექნოლოგიები საშუალებას აძლევს კომპანიებს სწრაფად და პერსონალიზებულად დაუკავშირდნენ მომხმარებელს. მაგალითად, AI ჩატბოტები 24/7 პასუხობენ კითხვებს და აფართოებენ მხარდაჭერის შესაძლებლობებს, რაც ზრდის მომხმარებელტა ნდობასა და ინტერესს.</p>

      <h3>ოპერაციული ეფექტურობა</h3>

      <p>მონაცემთა ანალიზი, ავტომატიზაცია და თანამედროვე ინსტრუმენტები აუმჯობესებს სამუშაო პროცესებს, ამცირებს ხარჯებს და ზრდის ეფექტურობას. კომპანიები უკეთ აღიქვამენ ხარვეზებს და მარტივად რეაგირებენ მასზე.</p>

      <h3>ინოვაცია და კონკურენტუნარიანობა</h3>

      <p>ციფრული ტრანსფორმაცია საშუალებას აძლევს კომპანიებს შექმნან ახალი პროდუქტები და სერვისები, რაც ზრდის კონკურენტულ უპირატესობას და მომხმარებლის ჩართულობას.</p>

      <h2>AI და თანამედროვე ტექნოლოგიები</h2>

      <p>ხელოვნური ინტელექტი უკვე მნიშვნელოვან როლს თამაშობს ციფრულ ტრანსფორმაციაში. AI ჩატბოტები, ავტომატური სისტემები და მონაცემთა ანალიზის ინსტრუმენტები ბიზნესს ეხმარება მომხმარებლის საჭიროებების სწრაფად გაგებაში, პერსონალიზებულ მომსახურებაში და პროცესების გამარტივებაში. თანამედროვე ტექნოლოგიები კომპანიებს აძლევს საშუალებას უფრო ეფექტურად მოემსახურონ მომხმარებელს და სწრაფად უპასუხონ ბაზრის ცვლილებებს.</p>

      <h2>დასკვნა</h2>

      <p>ციფრული ტრანსფორმაცია აღარ არის მხოლოდ შესაძლებლობა – ეს არის სტანდარტი, რომელიც განსაზღვრავს თანამედროვე ბიზნესის წარმატებას. კომპანიები, რომლებიც ადაპტირდებიან ციფრულ სამყაროსთან, ზრდიან მომხმარებელთა ნდობას, ოპერაციულ ეფექტურობას და ინოვაციურ შესაძლებლობებს. AI და თანამედროვე პლატფორმები შექმნიან პირობებს, სადაც ეფექტური კომუნიკაცია, სწრაფი გადაწყვეტილებები და ინოვაცია ერთმანეთს ავსებს, უზრუნველყოფენ კომპანიის მდგრად განვითარებას და კონკურენტუნარიანობას.</p>
    `,
    publishedAt: '2025-01-16T10:00:00Z',
    thumbnail: '/statia-1.jpg',
    author: {
      name: 'Vifa Digital Team',
      avatar: '/images/team/vifa-team.jpg',
    },
    tags: ['ციფრული ტრანსფორმაცია', 'ბიზნეს სტრატეგია', 'AI', 'მოდერნიზაცია', 'ტექნოლოგია'],
    readingTime: 4,
    seo: {
      title: 'ბიზნესის ციფრული ტრანსფორმაცია – თანამედროვე სამყაროში აუცილებლობა',
      description: 'ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა. შეიტყვეთ როგორ შეცვალოთ თქვენი ბიზნეს AI ტექნოლოგიებისა და ციფრული სტრატეგიების საშუალებით.',
      ogImage: '/statia-1.jpg',
    },
  }
];

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  // Return blog posts sorted by date (newest first)
  return blogPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    thumbnail: post.thumbnail,
    author: post.author,
    tags: post.tags,
    readingTime: post.readingTime,
    seo: post.seo,
  })).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Find the blog post by slug
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return null;
  }

  // Return the full blog post
  return post;
}

