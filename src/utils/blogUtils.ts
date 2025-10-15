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
    slug: 'ra-aris-vifa-digital',
    title: 'რა არის VIFA DIGITAL?',
    description: 'ციფრული ტრანსფორმაცია ერთი სივრციდან - სრულფასოვანი ეკოსისტემა ონლაინ ზრდისა და ოპერაციული ეფექტურობისთვის',
    content: `
      <p class="lead">თანამედროვე ბიზნესისთვის წარმატება აღარ არის შესაძლებელი ციფრული ინტეგრაციის გარეშე. სწორედ ამ გამოწვევაზე პასუხობს VIFA DIGITAL, რომელიც კომპანიებს სთავაზობს სრულფასოვან ეკოსისტემას ონლაინ ზრდისა და ოპერაციული ეფექტურობისთვის.</p>

      <p>ჩვენი ხედვაა, რომ ბიზნესს აღარ დასჭირდეს მრავალ მიმართულებასთან მუშაობა. ჩვენ ვართ ის პარტნიორი, რომელიც აერთიანებს კრეატიულობას, მარკეტინგულ სტრატეგიასა და ტექნოლოგიურ ინოვაციებს.</p>

      <h2>სტრატეგიული ციფრული ზრდა</h2>

      <p>VIFA DIGITAL-ის ძირითადი ფილოსოფია არის სტრატეგიული ციფრული ზრდა. ჩვენ ვქმნით არა უბრალოდ ვებგვერდებს, არამედ ბრენდის სრულყოფილ ციფრულ საფუძველს.</p>

      <p>ჩვენ ვხედავთ ბიზნესის ციფრულ ტრანსფორმაციას როგორც კომპლექსურ პროცესს, რომელიც მოიცავს:</p>

      <ul>
        <li>თანამედროვე ვებსაიტების შქმნას ოპტიმიზებული UX/UI დიზაინით</li>
        <li>ონლაინ მაღაზიების დანერგვას სრული ფუნქციონალით</li>
        <li>ბრენდის ციფრული იმიჯის ფორმირებას</li>
      </ul>

      <h2>ციფრული მარკეტინგი</h2>

      <p>ძლიერი ციფრული საფუძველის შექმნის შემდეგ, ჩვენ ვიწყებთ შედეგზე ორიენტირებული ციფრული მარკეტინგის განხორციელებას. ჩვენი მიდგომა ფოკუსირებულია მონაცემებზე დაფუძნებულ სტრატეგიაზე, რომელიც უზრუნველყოფს თქვენი პროდუქტის თუ სერვისის ეფექტურ მიწოდებას სწორ აუდიტორიასთან.</p>

      <h3>ჩვენი სერვისები:</h3>
      <ul>
        <li><strong>Facebook & Instagram მარკეტინგი</strong> - მიზნობრივი აუდიტორიის ზუსტი სეგმენტაცია</li>
        <li><strong>Google Ads კამპანიები</strong> - საძიებო სისტემებში ლიდერობა</li>
        <li><strong>მონაცემთა ანალიზი</strong> - KPI-ებზე დაფუძნებული ოპტიმიზაცია</li>
      </ul>

      <p>ეს მიდგომა პირდაპირ აისახება გაყიდვების ზრდასა და ბრენდის ცნობადობის ამაღლებაზე.</p>

      <h2>ხელოვნური ინტელექტი და ავტომატიზაცია</h2>

      <p>VIFA DIGITAL აქტიურად იყენებს ხელოვნური ინტელექტის (AI) ტექნოლოგიებს ბიზნეს პროცესების ოპტიმიზაციისთვის. ჩვენი AI გადაწყვეტილებები მოიცავს:</p>

      <ul>
        <li>ბიზნესზე მორგებული ჩატბოტების დანერგვას</li>
        <li>მომხმარებელთა კითხვებზე ავტომატური რეაგირების სისტემებს</li>
        <li>ოპერაციული პროცესების ავტომატიზაციას</li>
      </ul>

      <h2>კომპლექსური მიდგომა</h2>

      <p>VIFA DIGITAL წარმოადგენს ერთ ფანჯარას, სადაც თქვენი ბიზნესი იღებს სრულყოფილ ციფრულ ეკოსისტემას. ჩვენი სერვისი მოიცავს:</p>

      <div class="highlight-box">
        <h4>ციფრული ინფრასტრუქტურა</h4>
        <p>პროფესიონალური ვებსაიტი და ონლაინ მაღაზია, რომელიც ოპტიმიზებულია კონვერსიისთვის</p>

        <h4>მარკეტინგული სტრატეგია</h4>
        <p>მიზნობრივი რეკლამები და შინაარსი, რომელიც აძლიერებს ბრენდის პოზიციას</p>

        <h4>ტექნოლოგიური ინოვაციები</h4>
        <p>AI-ზე დაფუძნებული ავტომატიზაცია, რომელიც ზრდის ეფექტურობას</p>
      </div>

      <h2>ჩვენი მისია</h2>

      <p>VIFA DIGITAL-ის მისიაა, თქვენი ბრენდი გახდეს კონკურენტუნარიანი, ეფექტური და ზრდაზე ორიენტირებული ციფრულ გარემოში. ჩვენ გვჯერა, რომ წარმატებული ციფრული ტრანსფორმაცია მოითხოვს კომპლექსურ მიდგომას და ღრმა ექსპერტიზას.</p>

      <p>დაიწყეთ თქვენი ციფრული ტრანსფორმაცია VIFA DIGITAL-თან ერთად და განცადეთ ბიზნესის ზრდის ახალი შესაძლებლობები.</p>
    `,
    publishedAt: '2024-10-15T12:00:00Z',
    thumbnail: '/vifa.jpg',
    author: {
      name: 'Vifa Digital Team',
      avatar: '/images/team/vifa-team.jpg',
    },
    tags: ['ციფრული ტრანსფორმაცია', 'ვებ განვითარება', 'ციფრული მარკეტინგი', 'AI', 'ავტომატიზაცია'],
    readingTime: 3,
    seo: {
      title: 'რა არის VIFA DIGITAL? - ციფრული ტრანსფორმაცია ერთი სივრციდან',
      description: 'გაიცანით VifaDigital - სრულფასოვანი ეკოსისტემა ბიზნესის ციფრული ზრდისთვის. ვებ განვითარება, ციფრული მარკეტინგი და AI გადაწყვეტილებები ერთ ადგილას.',
      ogImage: '/images/blog/vifa-digital-intro.jpg',
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

