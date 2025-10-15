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

// Mock blog posts data - in a real app, this would come from a CMS or API
export const mockBlogPosts: BlogPostMetadata[] = [
  {
    slug: 'ai-automation-digital-marketing',
    title: 'AI და ავტომატიზაცია ციფრულ მარკეტინგში',
    description: 'როგორ იცვლება ციფრული მარკეტინგი ხელოვნური ინტელექტის და ავტომატიზაციის წყალობით. პრაქტიკული რჩევები ბიზნესისთვის.',
    publishedAt: '2024-10-14T10:00:00Z',
    thumbnail: '/images/blog/ai-marketing.jpg',
    author: {
      name: 'გიორგი ვეფხვაძე',
      avatar: '/images/team/giorgi.jpg',
    },
    tags: ['AI', 'ავტომატიზაცია', 'ციფრული მარკეტინგი'],
    readingTime: 4,
    seo: {
      title: 'AI და ავტომატიზაცია ციფრულ მარკეტინგში - Vifa Digital',
      description: 'როგორ იცვლება ციფრული მარკეტინგი ხელოვნური ინტელექტის და ავტომატიზაციის წყალობით. პრაქტიკული რჩევები ბიზნესისთვის.',
      ogImage: '/images/blog/ai-marketing.jpg',
    },
  },
  {
    slug: 'seo-guide-georgian-businesses',
    title: 'SEO სახელმძღვანელო ქართული ბიზნესებისთვის',
    description: 'სრული გიდი SEO ოპტიმიზაციისთვის ქართული ვებსაიტებისთვის. ისწავლეთ როგორ გახდეთ #1 Google-ში.',
    publishedAt: '2024-09-15T14:30:00Z',
    thumbnail: '/images/blog/seo-guide.jpg',
    author: {
      name: 'დავით კვარაცხელია',
      avatar: '/images/team/davit.jpg',
    },
    tags: ['SEO', 'ოპტიმიზაცია', 'Google'],
    readingTime: 8,
    seo: {
      title: 'SEO სახელმძღვანელო ქართული ბიზნესებისთვის - Vifa Digital',
      description: 'სრული გიდი SEO ოპტიმიზაციისთვის ქართული ვებსაიტებისთვის. ისწავლეთ როგორ გახდეთ #1 Google-ში.',
      ogImage: '/images/blog/seo-guide.jpg',
    },
  },
  {
    slug: 'social-media-content-strategy',
    title: 'სოციალური მედიის კონტენტ სტრატეგია',
    description: 'როგორ შევქმნათ ეფექტური კონტენტ სტრატეგია Instagram და Facebook-ისთვის რომელიც გაზრდის ჩართულობას.',
    publishedAt: '2024-09-01T09:15:00Z',
    thumbnail: '/images/blog/social-media-strategy.jpg',
    author: {
      name: 'ანა გელაშვილი',
      avatar: '/images/team/ana.jpg',
    },
    tags: ['სოციალური მედია', 'კონტენტი', 'სტრატეგია'],
    readingTime: 6,
    seo: {
      title: 'სოციალური მედიის კონტენტ სტრატეგია - Vifa Digital',
      description: 'როგორ შევქმნათ ეფექტური კონტენტ სტრატეგია Instagram და Facebook-ისთვის რომელიც გაზრდის ჩართულობას.',
      ogImage: '/images/blog/social-media-strategy.jpg',
    },
  },
];

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  // In a real app, this would fetch from your CMS or API
  // For now, return mock data sorted by date
  return mockBlogPosts.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // In a real app, this would fetch the full content from your CMS or file system
  const metadata = mockBlogPosts.find(post => post.slug === slug);

  if (!metadata) {
    return null;
  }

  // For mock purposes, generate some content based on the post
  const mockContent = generateMockContent(metadata);

  return {
    ...metadata,
    content: mockContent,
  };
}

// Generate mock content for demo purposes
function generateMockContent(metadata: BlogPostMetadata): string {
  // Real content for the AI article
  if (metadata.slug === 'ai-automation-digital-marketing') {
    return `
      <p>ციფრული მარკეტინგი მუდმივად იცვლის თავის ფორმას, თანდაყოლილი ტექნოლოგიური პროგრესით. ბოლო წლებში განსაკუთრებით დიდი ყურადღება მიიპყრო ხელოვნური ინტელექტის (AI) და ავტომატიზაციის გამოყენებამ. ეს ტექნოლოგიები არა მხოლოდ ამარტივებს ყოველდღიურ სამუშაო პროცესებს, არამედ ახდენს ძირეულ ცვლილებებს იმ გზაში, რომელსაც ბრენდები იყენებენ მომხმარებელთან კომუნიკაციისთვის.</p>

      <p>AI დღეს შეიძლება გამოიყენოს კონტენტის ავტომატური გენერაციისთვის, პერსონალიზებული რეკომენდაციების შესაქმნელად და მომხმარებელთა მხარდაჭერის ოპტიმიზაციისთვის. ელ-ფოსტის კამპანიები, სოციალურ ქსელებში რეკლამები და ბლოგპოსტები შეიძლება ავტომატურად დაიგეგმოს და პერსონალიზებულად მიეწოდოს მომხმარებელს. ეს საშუალებას აძლევს მარკეტოლოგებს უფრო შემოქმედებითი და სტრატეგიული ამოცანების შესრულებაზე კონცენტრირდნენ, ნაცვლად იმისა, რომ დრო დახარჯონ რუტინულ დავალებებზე.</p>

      <p>ავტომატიზაციის გამოყენება ზრდის ეფექტურობას და უზრუნველყოფს მომხმარებელთან სტაბილურ კომუნიკაციას. მაგალითად, abandoned cart-ის შეტყობინებები ან მომხმარებლის დაბადების დღის კამპანიები ავტომატურად იწერება და იგზავნება, რაც ზრდის ჩართულობას და კონვერსიას. სოციალური ქსელების ავტომატური დაგეგმვა უზრუნველყოფს მუდმივ აქტივობას, ხოლო AI-ის დახმარებით რეკლამები ოპტიმიზირდება, რათა უფრო მაღალი შედეგები მიიღონ.</p>

      <p>მონაცემთა ანალიზი AI-ის ერთ-ერთი მთავარი უპირატესობაა. მომხმარებლის ქცევის გაანალიზებით, კომპანიებს შეუძლიათ შესთავაზონ კონკრეტული პროდუქტები ან კონტენტი, რაც ზრდის მომხმარებლის ინტერესს და ნდობას. პერსონალიზებული შეთავაზებები არა მხოლოდ აძლიერებს მომხმარებლის გამოცდილებას, არამედ ზრდის გაყიდვების შანსს.</p>

      <p>ბიზნესი, რომელიც ინვესტირებს AI და ავტომატიზაციაში, ხედავს რეალურ შედეგებს: სამუშაო პროცესები სწრაფდება, კონტენტი უფრო მიზნობრივი ხდება და მომხმარებელთა ჩართულობა მატულობს. მიუხედავად ამისა, მნიშვნელოვანია ყურადღება მიექცეს მონაცემთა ხარისხსა და მომხმარებელთან ადამიანური კონტაქტის შენარჩუნებას. ავტომატიზაცია არ უნდა ჩაანაცვლოს მთლიანად პირადი კომუნიკაცია, რადგან მომხმარებლებს სჭირდებათ ემოციური ურთიერთქმედება.</p>

      <p>AI და ავტომატიზაცია ციფრულ მარკეტინგში აღარ არის მომავალი, ისინი უკვე აყალიბებენ ყოველდღიურ პრაქტიკას. მცირე ბიზნესსაც შეუძლია გამოიყენოს ხელმისაწვდომი ინსტრუმენტები კონტენტის შექმნისთვის, მომხმარებელთა სეგმენტაციისთვის და ავტომატური კომუნიკაციისთვის. სწორად გამოყენების შემთხვევაში, ეს ტექნოლოგიები ზრდის პროდუქტიულობას, აუმჯობესებს მომხმარებლის გამოცდილებას და ანიჭებს კომპანიას კონკურენტულ უპირატესობას.</p>
    `;
  }

  // Default mock content for other articles
  return `
    <p>ეს არის ${metadata.title} სტატიის შინაარსი. აქ მოცემული იქნება დეტალური ინფორმაცია და პრაქტიკული რჩევები.</p>

    <p><em>სტატიის სრული ტექსტი იქნება ჩასმული ამ ადგილას...</em></p>
  `;
}