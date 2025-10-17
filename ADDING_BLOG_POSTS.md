# ბლოგის სტატიების დამატების გიდი

## 📋 მიმოხილვა

ბლოგის ახალი სტატიის დამატებისას აუცილებელია რამდენიმე ფაილის განახლება:
1. **`src/utils/blogUtils.ts`** - სტატიის მონაცემი
2. **ფოტო** - `/public/` დირექტორიაში
3. **`scripts/generate-blog-pages.js`** - build script update (თუ საჭიროა)

---

## ✅ ნაბიჯ-ნაბიჯ ინსტრუქცია

### ნაბიჯი 1: ფოტო დამატება

1. **ფოტო მომზადება:**
   - სურათი უნდა იყოს: `1200x630px` (Facebook OG standard)
   - ფორმატი: `.jpg` ან `.png`
   - ზომა: < 500KB (დაზეთოთ/შეკუმშოთ)

2. **ფოტო `/public/` დირექტორიაში ატვირთვა:**
   ```
   /public/statia-2.jpg
   /public/statia-3.jpg
   და ა.შ.
   ```

---

### ნაბიჯი 2: `blogUtils.ts`-ში სტატიის მონაცემი დამატება

**ფაილი:** `src/utils/blogUtils.ts`

**სწორი ფორმატი:**

```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: 'statia-2-url-slug',  // ✅ უნიკალური, ლათინურ ასოებში, ტირეები
    title: 'სტატიის სახელი – დამატებითი ინფორმაცია',
    description: 'მოკლე აღწერა (150 სიმბოლომდე). ეს ჩანს Facebook feed-ში.',
    content: `
      <p class="lead">პირველი პარაგრაფი - მოკლე და მიმზიდველი.</p>

      <h2>დიდი სათაური</h2>
      <p>ტექსტი აქ.</p>

      <h3>პატარა სათაური</h3>
      <ul>
        <li>პუნქტი 1</li>
        <li>პუნქტი 2</li>
      </ul>
    `,
    publishedAt: '2025-10-17T12:00:00Z',  // ✅ ISO ფორმატი
    thumbnail: '/statia-2.jpg',  // ✅ სტატიის მთავარი ფოტო
    author: {
      name: 'Vifa Digital Team',
      avatar: '/images/team/vifa-team.jpg',
    },
    tags: ['ტეგი1', 'ტეგი2', 'ტეგი3'],  // ✅ რელევანტური ტეგები
    readingTime: 4,  // ✅ დაახლოებითი წაკითხვის დრო (წუთებში)
    seo: {
      title: 'სტატიის სახელი - Vifa Digital',  // Facebook-ზე გამოჩნდება
      description: 'SEO აღწერა (160 სიმბოლომდე)',  // Google Search-ში გამოჩნდება
      ogImage: '/statia-2.jpg',  // ✅ ᲐᲣᲪᲘᲚᲔᲑᲔᲚᲘ - Facebook-ზე გამოჩნდება
    },
  },
  // ... დანარჩენი სტატიები
];
```

---

### ნაბიჯი 3: `generate-blog-pages.js`-ში უახლეს სტატიის დამატება

**ფაილი:** `scripts/generate-blog-pages.js`

**სტატიის მონაცემი `blogPosts` object-ში დამატება:**

```javascript
const blogPosts = {
  'biznesis-cifruli-transformacia': {
    title: 'ბიზნესის ციფრული ტრანსფორმაცია...',
    description: 'აღწერა...',
    image: 'https://www.vifadigital.ge/statia-1.jpg'
  },
  'statia-2-url-slug': {  // ✅ slug უნდა match გავხადო blogUtils.ts-ს slug-თან
    title: 'სტატიის სახელი – დამატებითი ინფორმაცია',
    description: 'მოკლე აღწერა...',
    image: 'https://www.vifadigital.ge/statia-2.jpg'  // ✅ www აუცილებელი!
  }
};
```

---

### ნაბიჯი 4: Build & Deploy

```bash
# 1. ლოკალური build
npm run build

# 2. გამოცდა - ფოტო სწორი ხელმისაწვდომი უნდა იყოს
cat dist/blog/statia-2-url-slug/index.html | grep og:image

# 3. git commit
git add -A
git commit -m "Add new blog post: სტატიის სახელი"

# 4. git push - Vercel ავტომატურად deploy-ს კეთებს
git push
```

---

## 🔍 შემოწმების Checklist

დამატების შემდეგ უნდა შეამოწმო:

### ✅ ლოკალური ტესტი:
```bash
npm run build
grep -n "statia-2-url-slug" dist/blog/statia-2-url-slug/index.html
```

უნდა ხედო:
- `og:type: article` ✅
- `og:title: სტატიის სახელი` ✅
- `og:image: https://www.vifadigital.ge/statia-2.jpg` ✅
- `og:url: https://www.vifadigital.ge/blog/statia-2-url-slug` ✅

### ✅ Facebook Debugger:
1. Deploy დალოდო (3-5 წამი)
2. https://developers.facebook.com/tools/debug/sharing/ ზე გადა
3. ლინკი: `https://www.vifadigital.ge/blog/statia-2-url-slug`
4. **"Scrape Again"** დააწკაპე
5. შეამოწმე:
   - ✅ og:image სწორი ფოტო
   - ✅ og:title სწორი სახელი
   - ✅ og:description სწორი აღწერა
   - ✅ No 307 redirects
   - ✅ Response Code: 206+ (არა 404)

### ✅ ლাივ საიტი:
```
https://www.vifadigital.ge/blog/statia-2-url-slug
```
უნდა გახსნას ნორმალურად (არა 404)

---

## ⚠️ ᲡᲐᲔᲠᲗᲝ ᲨᲔᲪᲓᲝᲛᲔᲑᲘ

### ❌ სხეულიდან დაშვებული რამ:

| შეცდომა | გამოსავალი |
|---------|----------|
| `slug: 'statia 2'` (ფართობი) | `slug: 'statia-2'` (ტირე) |
| `image: '/statia-2.jpg'` (უ-www) | `image: 'https://www.vifadigital.ge/statia-2.jpg'` |
| `publishedAt: '2025-10-17'` (არა ISO) | `publishedAt: '2025-10-17T12:00:00Z'` |
| `ogImage: '/statia-2.jpg'` (სხვადსხვა slug) | `ogImage` უნდა match გავხადო `slug`-თან |
| ფოტო დაკნ `/public/statia-2.jpg` | ლოკალური build გვერდის შეამოწმო |
| Build error (დაიკრემო `npm run build`) | კიდევ ხელახლა დააკეთო `npm run build` |

---

## 📋 მნიშვნელოვანი მნიშვნელობები

### slug (URL-ის ნაწილი):
- **უნიკალური** - არ შეიძლება ორი სტატია იყოს ერთი slug-თან
- **ლათინური** - გამოიყენე ლათინური ასოები
- **ტირე** - ფართობის ნაცვლად
- **მინიმუმ 3 სიმბოლო**

### title (სტატიის სახელი):
- **უნიკალური**
- **სალიმიტო 60-70 სიმბოლო** (Facebook-ზე ისე აჩვენებს)
- **მნიშვნელოვანი სიტყვები დასაწყისში**

### description:
- **150 სიმბოლომდე**
- **აუცილებელი** - Facebook feed-ში ჩანს
- **პრივილეგირებული, კლარი, დამაკავებელი**

### thumbnail & ogImage:
- **ორივე იგივე უნდა იყოს** (`/statia-2.jpg`)
- **აბსოლიტური URL აუცილებელი**: `https://www.vifadigital.ge/statia-2.jpg`

---

## 🚀 სწრაფი დამატება (Copy-Paste Template)

```typescript
// blogUtils.ts-ში დამატე:
{
  slug: 'NEW-SLUG-HERE',
  title: 'თქვენი სხეულის სახელი',
  description: 'მოკლე აღწერა (150 სიმბოლომდე)',
  content: `
    <p class="lead">პირველი პარაგრაფი</p>
    <h2>სათაური</h2>
    <p>კონტენტი...</p>
  `,
  publishedAt: '2025-10-17T12:00:00Z',
  thumbnail: '/statia-N.jpg',
  author: {
    name: 'Vifa Digital Team',
    avatar: '/images/team/vifa-team.jpg',
  },
  tags: ['ტეგი1', 'ტეგი2'],
  readingTime: 4,
  seo: {
    title: 'სახელი - Vifa Digital',
    description: 'SEO აღწერა',
    ogImage: '/statia-N.jpg',
  },
}

// generate-blog-pages.js-ში დამატე:
'NEW-SLUG-HERE': {
  title: 'თქვენი სხეულის სახელი',
  description: 'მოკლე აღწერა',
  image: 'https://www.vifadigital.ge/statia-N.jpg'
}
```

---

## 📞 თუ რაიმე საერთო თუ ეჭვი გეყო:

1. **Vercel Logs**: https://vercel.com (check build errors)
2. **Facebook Debugger**: https://developers.facebook.com/tools/debug/sharing/
3. **Local Test**: `npm run build` შემდეგ `grep` check
4. **Git History**: `git log` - უკანასკნელი commit-ი देখоთ

---

## ✨ ზედმეტი ხელებით

### HTML Content Formatting:
```html
<!-- ✅ კარგი -->
<h2>დიდი სათაური</h2>
<p>პარაგრაფი</p>
<ul>
  <li>მნიშვნელოვანი პუნქტი</li>
</ul>

<!-- ❌ ცუდი -->
<h2>დიდი სათაური</h2><p>პარაგრაფი</p>
```

### SEO Description (160 სიმბოლომდე):
```
❌ ხელმოკიდებული, "ეხ რამე პოსტი" - ცუდი
✅ "ციფრული ტრანსფორმაცია აღარ არის არჩევანი, არამედ აუცილებლობა" - კარგი
```

---

**ბედი კარგი!** 🎉 ახალი სტატიების დამატება ხელიდან უნდა ამოსულიყო!
