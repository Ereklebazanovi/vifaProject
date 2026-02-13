# ბლოგის სახელმძღვანელო - Vifa Digital Website

## როგორ დავამატოთ ახალი ბლოგ სტატია

### 1. ღრმად შევცვალოთ blogUtils.ts ფაილი

ბლოგის მთავარი კონფიგურაცია არის `src/utils/blogUtils.ts` ფაილში. აქ უნდა დაამატოთ ახალი სტატიების მეტადატა `mockBlogPosts` მასივში.

```typescript
// src/utils/blogUtils.ts ფაილში
export const mockBlogPosts: BlogPostMetadata[] = [
  {
    slug: 'axali-statia-slug', // URL-ისთვის
    title: 'ახალი სტატიის სათაური',
    description: 'სტატიის მოკლე აღწერა',
    publishedAt: '2024-10-15T10:00:00Z', // ISO ფორმატი
    thumbnail: '/images/blog/axali-statia.jpg', // სურათის მისამართი
    author: {
      name: 'ავტორის სახელი',
      avatar: '/images/team/avtori.jpg', // ოფციონალურია
    },
    tags: ['ტეგი1', 'ტეგი2', 'ტეგი3'], // მაქსიმუმ 3 ტეგი
    readingTime: 5, // წუთებში
    seo: {
      title: 'SEO სათაური - Vifa Digital',
      description: 'SEO აღწერა',
      ogImage: '/images/blog/axali-statia.jpg',
    },
  },
  // სხვა სტატიები...
];
```

### 2. Markdown ფაილის შექმნა (ოფციონალური)

თუ გინდათ რეალური markdown კონტენტი, შექმენით ფაილი `src/blogs/` ფოლდერში:

**ფაილის სახელი:** `axali-statia-slug.md`

```markdown
---
title: "ახალი სტატიის სათაური"
description: "სტატიის მოკლე აღწერა"
publishedAt: "2024-10-15T10:00:00Z"
thumbnail: "/images/blog/axali-statia.jpg"
author:
  name: "ავტორის სახელი"
  avatar: "/images/team/avtori.jpg"
tags: ["ტეგი1", "ტეგი2", "ტეგი3"]
seo:
  title: "SEO სათაური - Vifa Digital"
  description: "SEO აღწერა"
  ogImage: "/images/blog/axali-statia.jpg"
---

## მთავარი სათაური

სტატიის შინაარსი მარკდაუნის ფორმატით...

### ქვე სათაური

პარაგრაფი ტექსტით...

- პირველი პუნქტი
- მეორე პუნქტი

> ციტატა ან მნიშვნელოვანი ტექსტი

**Bold ტექსტი** და *italic ტექსტი*
```

### 3. სურათების დამატება

სტატიის სურათები უნდა განთავსდეს `public/images/blog/` ფოლდერში:

```
public/
  images/
    blog/
      axali-statia.jpg        # მთავარი thumbnail
      axali-statia-1.jpg      # სტატიის შიგნით გამოსაყენებელი სურათები
      axali-statia-2.jpg
```

**სურათის მოთხოვნები:**
- **Thumbnail:** 1200x630px (Open Graph ფორმატი)
- **ფაილის ზომა:** მაქსიმუმ 500KB
- **ფორმატი:** JPG ან WebP

### 4. blogUtils.ts-ში კონტენტის განახლება

თუ გინდათ markdown ფაილიდან კითხვა, განაახლეთ `getBlogPostBySlug` ფუნქცია:

```typescript
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // მცდელობა markdown ფაილის წაკითხვისა
    const markdownFile = await import(`../blogs/${slug}.md?raw`);
    return parseMarkdownPost(markdownFile.default, slug);
  } catch {
    // თუ markdown ფაილი არ არსებობს, გამოიყენე mock კონტენტი
    const metadata = mockBlogPosts.find(post => post.slug === slug);
    if (!metadata) return null;

    return {
      ...metadata,
      content: generateMockContent(metadata),
    };
  }
}
```

### 5. SEO ოპტიმიზაცია

თითოეული სტატია უნდა ჰქონდეს:

**Title Tags:**
- უნიკალური სათაური
- 50-60 სიმბოლო
- მთავარი კავშირებითი სიტყვა

**Meta Description:**
- 150-160 სიმბოლო
- მთავარი კავშირებითი სიტყვა
- Call to action

**Open Graph:**
- og:title, og:description, og:image
- og:type = "article"

### 6. სტატიის კატეგორიები და ტეგები

**გამოყენებადი ტეგები:**
- ციფრული მარკეტინგი
- ვებ განვითარება
- SEO
- სოციალური მედია
- Google Ads
- Facebook რეკლამა
- ბრენდინგი
- ტექნოლოგია
- ბიზნესი

### 7. ტესტირება

სტატიის დამატების შემდეგ:

1. **ლოკალურად ტესტირება:**
   ```bash
   npm run dev
   ```

2. **გადაამოწმეთ:**
   - ბლოგის მთავარი გვერდი: `/blog`
   - კონკრეტული სტატია: `/blog/axali-statia-slug`
   - მობილური ვერსია
   - SEO meta tags

3. **Performance ტესტი:**
   - Google PageSpeed Insights
   - Lighthouse audit

### 8. Production-ზე ატვირთვა

```bash
npm run build
npm run preview  # წინასწარი ნახვა
```

## მნიშვნელოვანი შენიშვნები

### კონტენტის ხარისხი
- უნიკალური, ღირებული კონტენტი
- ქართული ენის სწორი გამოყენება
- ტექნიკური ინფორმაციის სიზუსტე
- პრაქტიკული რჩევების ჩართვა

### ფორმატირება
- სათაურების იერარქია (H1 > H2 > H3)
- პარაგრაფების ლოგიკური განაწილება
- სიებისა და ციტატების გამოყენება
- კოდის ბლოკები ტექნიკური სტატიებისთვის

### შიდა ლინკები
- სხვა სტატიებზე ლინკები
- სერვისების გვერდებზე ლინკები
- "დაიწყე პროექტი" CTA ღილაკები

## მაგალითი - სრული პროცესი

1. **blogUtils.ts-ში მეტადატის დამატება:**
```typescript
{
  slug: 'social-media-marketing-tips',
  title: 'სოციალური მედიის მარკეტინგის 10 ეფექტური რჩევა',
  description: 'გაიგეთ როგორ გაზარდოთ ჩართულობა Instagram-სა და Facebook-ზე',
  publishedAt: '2024-10-15T10:00:00Z',
  thumbnail: '/images/blog/social-media-tips.jpg',
  author: { name: 'ანა გელაშვილი' },
  tags: ['სოციალური მედია', 'მარკეტინგი', 'Instagram'],
  readingTime: 7
}
```

2. **სურათის განთავსება:**
- `public/images/blog/social-media-tips.jpg`

3. **ტესტირება:**
- `/blog` - უნდა ჩანდეს ახალი სტატია
- `/blog/social-media-marketing-tips` - კონკრეტული გვერდი

4. **SEO ვალიდაცია:**
- Google Search Console
- Meta tags checker

ეს სისტემა მარტივია და მოქნილი - შეგიძლიათ ღერძივ მარტივად დაამატოთ ახალი სტატიები კონტენტის ცვლილების გარეშე!