# Task: one light, Apple Store-style preview page ("IT" hub)

This is a design pilot. Build ONE new page so the owner can see what a light, Apple Store-inspired design looks like on this site. Nothing else on the site changes, nothing goes live.

## Context

- Site: vifadigital.ge, a Georgian digital agency. React 18 + Vite 7 + TypeScript, Tailwind CSS v4 (`@import "tailwindcss"` in `src/index.css`), react-router-dom v7, lucide-react, react-helmet-async.
- The whole site is dark today. The owner wants to move to a light design inspired by the visual language of apple.com/store (light gray page, white rounded cards, horizontal card rows, big clean type, very few colors).
- Navigation idea behind it: today the navbar has dropdowns (Web Dev and Marketing each open 6 items, Products opens 2). The target is a navbar of a few plain words with no dropdowns. Each word opens a hub page of cards, and each card links to an existing detail page. This pilot is the "IT" hub.

## Hard rules

1. First create and switch to a new git branch `preview/apple-it`. Do not commit (leave changes uncommitted for review). Never touch `main` or `master`. Do not push. Do not deploy.
2. Do not run `npm run build` (it launches a Puppeteer prerender). Type-check instead, see "Verification".
3. Allowed changes, and nothing else:
   - New files under `src/pages/preview/` (main file `ITHubPreview.tsx`; small sibling component files are fine).
   - `src/App.tsx`: one `lazy` import and one route `/preview/it`. Put the route OUTSIDE `<Route path="/" element={<Layout />}>`, next to the `/studio` route, so the dark site navbar, footer and floating WhatsApp button do not render. Wrap its element in its own `<Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" />}>` so there is no dark flash while it loads.
4. Do not edit `SimpleNavbar.tsx`, `ImprovedFooter.tsx`, `Layout.tsx`, `src/index.css`, `tailwind.config.js`, any existing page, `scripts/prerender.js`, `public/sitemap.xml` or `vercel.json`. Note: `html`, `body` and `#root` are dark in `index.css`, so the preview's root element must set its own background and `min-h-screen`.
5. Do not link to the preview from anywhere. In the page add `<Helmet>` (from `react-helmet-async`) with `<title>IT | VIFA (preview)</title>` and `<meta name="robots" content="noindex,nofollow" />`.
6. Inspired by Apple, never a copy: no Apple logo, no SF Pro font files, no Apple images, no Apple text, no Apple product names. Only our content and our images from `public/`.
7. No generic AI-template look: no gradients, no glows, no gradient text, no dot or grid backgrounds, no blur except the nav bar, no emoji, no pulsing badges, no animated counters, no scroll-triggered entrance animations, no taglines or hype words. The only motion is card hover and smooth scrolling of card rows.
8. Georgian copy is plain and factual. Never use the em dash or en dash characters; use a colon, comma or period instead. Never apply `text-transform: uppercase` to Georgian text (browsers turn it into Mtavruli capitals).
9. Light only. No dark mode for this page.

## Design system (use exactly these values)

### Colors (the only colors allowed; images are the only other source of color)

| token | value | use |
|---|---|---|
| page | `#f5f5f7` | page background |
| surface | `#ffffff` | cards, nav bar |
| text | `#1d1d1f` | headlines, body |
| text-2 | `#6e6e73` | secondary text, eyebrows, second half of two-tone headlines |
| hairline | `#d2d2d7` | dividers, thin borders |
| link | `#0066cc` | text links |
| button | `#0071e3`, hover `#0077ed` | the single filled button on the page |

Define them once at the top of the file (CSS variables on the page root or a TS constant). No indigo, no slate, no colored icons.

### Font

FiraGO, already installed as `@fontsource/firago`. Import weights 400, 500, 600 and 700 at the top of the preview file (same pattern as `src/offeredServices/LineupLandingPage.tsx`) and set `font-family: "FiraGO", system-ui, sans-serif` on the page root. Turn on `-webkit-font-smoothing: antialiased`.

Georgian is not Latin. Compared with Apple's settings: use more line-height (Georgian letters have tall ascenders and descenders), little or no negative letter-spacing, and slightly smaller headline sizes because Georgian words are long.

### Type scale

| role | desktop | mobile | weight | line-height | letter-spacing |
|---|---|---|---|---|---|
| page headline (h1) | 48px | 32px | 600 | 1.15 | -0.005em |
| row headline (h2) | 28px | 24px | 600 | 1.2 | 0 |
| card eyebrow | 12px | 12px | 600 | 1.33 | 0, color text-2 |
| card title | 28px | 24px | 600 | 1.2 | 0 |
| card body | 17px | 17px | 400 | 1.47 | 0 |
| link ("მეტი ›") | 17px | 17px | 400 | 1.47 | 0, color link, underline on hover |
| nav, small text | 13px | 13px | 400 | 1.4 | 0 |

**Two-tone headlines** are the signature of the Apple Store page: a single heading where the first short sentence is in `text` and the rest is in `text-2`, same size and weight. Example: `<h1><span style="color:text">IT.</span> <span style="color:text-2">საიტები, ჩატბოტები და პროგრამები ბიზნესისთვის.</span></h1>`. Every h1 and h2 on the page uses this pattern.

### Cards

- Background white, radius 18px, `overflow: hidden`, shadow `2px 4px 12px rgba(0,0,0,0.08)`.
- Hover (only under `@media (hover: hover)`): shadow `2px 4px 16px rgba(0,0,0,0.16)` and `transform: scale(1.01)`, transition `all 300ms cubic-bezier(0,0,0.5,1)`. No other hover effects.
- Inside a card: text at the top (padding 28px desktop, 24px mobile: eyebrow, title, one line of body), visual below filling the rest of the card. The whole card is one `<Link>`.
- Photos: `object-fit: cover`, full width of the card.
- App screenshots: do not stretch them edge to edge. Place them inside the visual area with a 24px inset from the left and top, 10px rounded corners and a 1px `hairline` border, cropped by the card's right and bottom edge, so they read as a real app window peeking in.
- Sizes: large cards 400 x 500 px on desktop. Industry cards 313 x 400 px. On mobile, width `min(85vw, 340px)` and heights about 440px and 360px.
- Gap between cards: 20px desktop, 16px mobile.

### Card rows (horizontal shelves)

- A row is a horizontal scroller: `overflow-x: auto`, hidden scrollbar, `scroll-snap-type: x mandatory`, cards `scroll-snap-align: start`, `scroll-behavior: smooth`.
- Content column max width is 980px. The first card's left edge lines up with the headline above it, and the row bleeds off the right edge of the viewport. Do this with `padding-inline: max(22px, calc((100vw - 980px) / 2))` on the scroller and the same value as `scroll-padding-inline`. Row headlines use the same left offset.
- Leave 8px of vertical padding inside the scroller so card shadows and the hover scale are not clipped.
- Desktop only: two round arrow buttons, 36px, background `rgba(210,210,215,0.64)`, lucide `ChevronLeft` / `ChevronRight` in `rgba(0,0,0,0.56)`, vertically centered over the left and right edges of the row. Shown when the row is hovered, hidden when that direction cannot scroll further. `aria-label` "წინა" and "შემდეგი". A click scrolls by about the visible width.
- The page itself must never scroll horizontally at any width.

### Nav bar (local to this preview file, not the site navbar)

- Height 48px, `position: sticky; top: 0`, background `rgba(255,255,255,0.8)` with `backdrop-filter: saturate(180%) blur(20px)`, 1px `hairline` bottom border.
- Inside the 980px column. Left: the text "VIFA", 17px, weight 600. Center: IT · მარკეტინგი · ჩვენ შესახებ · ბლოგი, 13px, `text` at 80% opacity, 100% on hover; IT is the current page, full opacity. Right: "კონტაქტი", 13px.
- Links: IT `/preview/it`, მარკეტინგი `/services/marketing`, ჩვენ შესახებ `/about`, ბლოგი `/blog`, კონტაქტი `/contact`.
- Under 768px show only "VIFA" and "კონტაქტი" (no hamburger for the preview).

### Spacing

- Space between sections: 64px desktop, 48px mobile. Headline to row: 24px. Page top padding under the nav: 64px desktop, 40px mobile.

## Page content (top to bottom)

WhatsApp link used on this page:
`https://wa.me/995557624243?text=` + `encodeURIComponent("გამარჯობა, IT სერვისებით დავინტერესდი.")`, opened with `target="_blank" rel="noopener noreferrer"`.

### 1. Header

- Left, h1 two-tone: "IT." + "საიტები, ჩატბოტები და პროგრამები ბიზნესისთვის."
- Right on desktop, below the headline on mobile, a small block in 14px:
  - "კითხვა გაქვს?" (weight 600)
  - link "მოგვწერეთ WhatsApp-ში ›" (WhatsApp link above)
  - link "საკონტაქტო ფორმა ›" to `/contact`

### 2. Quick links row

A row of small tiles under the header, like the row of product tiles at the top of the Apple Store page. Each tile is a `<Link>`: a 64 x 64 px image with 12px radius (`object-fit: cover`) above a centered 14px weight 600 label. Horizontally scrollable on mobile, centered or left-aligned in the column on desktop.

| label | link | image |
|---|---|---|
| საიტი | `/services/web` | same image as the website card below |
| AI ჩატბოტი | `/services/ai-chatbot` | a white tile with a small static chat-bubble drawing in `button` blue (simple inline SVG, not an icon in a colored circle) |
| Invento WMS | `/inventowms` | `/invento-demo-inventory.webp`, cropped to its top-left corner |
| LineUp | `/lineup` | `/lineup-rba-emblem.png` on white |
| დარგები | `#industries` (scrolls to section 4) | `/hotelphoto.webp` |

### 3. Row: services

h2 two-tone: "სერვისები." + "აირჩიე, რა გჭირდება." Large cards (400 x 500):

1. **Website**, link `/services/web`. Eyebrow "საიტი". Title "საიტის დამზადება". Body "სავიზიტო საიტი, კორპორატიული საიტი ან ონლაინ მაღაზია." Visual: if `public/preview/` contains screenshots of client websites, use one as an app screenshot (inset style). Otherwise use `/vebisphoto.webp` with `object-position: right center` and say in your report that this photo is dark and a light client-site screenshot should replace it.
2. **AI chatbot**, link `/services/ai-chatbot`. Eyebrow "AI ჩატბოტი". Title "ჩატბოტი თქვენი ბიზნესისთვის". Body "პასუხობს კლიენტებს Messenger-ში, Instagram-ში, WhatsApp-სა და საიტზე, 24/7." Visual: a static chat built in HTML (no typing animation) on a `page` gray area. Customer messages on the right in `button` blue with white text, bot replies on the left in white with `text` color, 17px, bubbles with 18px radius:
   - customer: "ხვალ 20:00-ზე ოთხ კაცზე მაგიდა გაქვთ?"
   - bot: "დიახ, თავისუფალია. ვისი სახელით დავჯავშნო?"
   - customer: "ნინოს სახელით."
   - bot: "დაჯავშნილია: ხვალ, 20:00, ოთხი სტუმარი."
3. **Invento WMS**, link `/inventowms`. Eyebrow "საწყობის პროგრამა". Title "Invento WMS". Body "მარაგები, შეკვეთები და ფინანსები ერთ სისტემაში." Visual: `/invento-demo-inventory.webp` as an app screenshot (inset style).
4. **LineUp**, link `/lineup`. Eyebrow "სპორტული აკადემიის აპი". Title "LineUp". Body "გადახდები, დასწრება და მშობლებთან კავშირი ერთ აპში." Visual: look at `src/components/lineup/AppKit.tsx` (`PhoneFrame`, `Screen`, headers, `BottomNav`) and `content.ts`. If a static, non-animated phone screen can be composed from them without side effects, render one scaled down. Otherwise show `/lineup-rba-emblem.png` at about 120px, centered on a `page` gray area.

### 4. Row: industries (`id="industries"`)

h2 two-tone: "დარგის მიხედვით." + "ნახეთ, რას ვაკეთებთ თქვენი სფეროსთვის." Industry cards (313 x 400), eyebrow "საიტი", title is the industry name, no body line, photo below:

| title | link | image |
|---|---|---|
| ონლაინ მაღაზია და ვაჭრობა | `/industry/web/retail` | `/eccomerce.webp` |
| იურიდიული და საფინანსო | `/industry/web/legal-finance` | `/practice-hero.webp` |
| სასტუმროები და ტურიზმი | `/industry/web/tourism` | `/hotelphoto.webp` |
| სილამაზე და ესთეტიკა | `/industry/web/beauty` | `/saloni.webp` |
| რესტორნები და კვება | `/industry/web/food` | `/restorani.webp` |

### 5. Contact

h2 two-tone: "კითხვა გაქვთ?" + "მოგვწერეთ და გიპასუხებთ." Two white cards side by side on desktop, stacked on mobile, radius 18px, padding 28px:

- "WhatsApp" / "ყველაზე სწრაფი გზა." / the page's one filled button: pill (`border-radius: 980px`), `button` blue, white text, 17px, padding 10px 20px, label "მოგვწერეთ" (WhatsApp link).
- "საკონტაქტო ფორმა" / "დაგვიტოვეთ ნომერი და დაგიკავშირდებით." / link "ფორმის გახსნა ›" to `/contact`.

### 6. Footer

A 1px `hairline` line, then one 12px `text-2` line inside the column: "© 2026 VIFA Digital".

## Accessibility

- Georgian `alt` text on every image. Images below the first screen get `loading="lazy"`.
- `:focus-visible` outline 2px `#0071e3` with 2px offset on links and buttons.
- Under `prefers-reduced-motion: reduce`: no hover scale, no smooth scrolling.
- Arrow controls are real `<button>` elements.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/it`.
2. Check widths 1440, 1024 and 390: no horizontal page scroll; rows scroll; the first card lines up with the headline above; arrows show and hide correctly; Georgian headlines wrap cleanly with no clipped letters; hover shadows are not cut off.
3. Click every card and link: each must open an existing page (no 404).
4. `npx tsc -p tsconfig.app.json --noEmit` and `npx eslint src/pages/preview src/App.tsx`. Fix problems only in files you created or changed.
5. Use the browser to take full-page screenshots at 1440 and 390 width and show them.
6. Report: the branch name, the files you created or changed, and anything you could not follow and why. Do not commit or push.
