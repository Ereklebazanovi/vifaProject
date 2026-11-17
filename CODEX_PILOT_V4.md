# Task: pilot v4, turn `/preview/it` into the full IT hub (stage 0 of the redesign)

Read `REDESIGN_PLAN.md` first (it is in Georgian; it is the single source of truth for the redesign). This task implements its stage 0: the hub template, §2.A, on the preview page. Then read `src/pages/preview/ITHubPreview.tsx`, `useProductScene.ts` and `productColors.ts`, which you (or a previous agent) wrote in v3, and build on them.

## Why v4

v3 made the devices come alive, and the owner likes the colors, font and scenes. But the page still feels dead because it is thin: a gray headline on a gray page, one row of cards, a contact block. No visual on the first screen, one background everywhere, no rhythm. Also, the copy was off: this page is a **router** (it sends visitors to the right page), not a sales page. Its headline must describe what unites all our IT work, not sell one product.

Another principle from the owner: **the site itself is the portfolio.** We do not show client projects yet. The quality of this page, and our own products (Invento, LineUp), are the proof.

## Hard rules (unchanged from v3)

1. Branch `preview/apple-it`. Do not commit, push or deploy. Do not run `npm run build`.
2. Build on the existing files; do not rewrite them from scratch. Allowed changes: files in `src/pages/preview/` (new ones too) and new images in `public/preview/`. Importing from `src/components/` is fine; editing it is not. No new dependencies.
3. Motion only: (a) product UI inside device screens, (b) device entrance and hover lift, (c) the connector in section 3 as described. No glows, gradients, pulsing badges, emoji, counters, typewriter text, looping background motion.
4. Georgian copy exactly as given here. No em dash or en dash characters. No `text-transform: uppercase` on Georgian. No invented numbers or claims.
5. `prefers-reduced-motion: reduce`: everything shows its final state, nothing moves.
6. Housekeeping: move `src/pages/preview/verifyPreview.mjs` and `src/pages/preview/verification/` out of `src/` into `preview-verification/` at the repo root, and keep any new verification files there.

## Page structure

Five full-width sections with alternating backgrounds, then the footer. Text stays in the 980px column; section 1's stage may be up to 1200px wide.

| # | section | background |
|---|---|---|
| 1 | Hero with "family shot" | `#ffffff` |
| 2 | What do you need (the existing four product cards) | `#f5f5f7` |
| 3 | From website to warehouse | `#1d1d1f` (the only dark section) |
| 4 | What business do you have (industry cards) | `#ffffff` |
| 5 | Contact person (the existing v3 card) | `#f5f5f7` |

Vertical padding per section: 96px desktop, 64px mobile.

### 1. Hero

- h1, two-tone, from a constant `HERO_TITLE` (the owner may swap it for "საიტი, ჩატბოტი და საწყობი, ერთმანეთთან დაკავშირებული."): dark part "IT." then gray part "საიტიდან საწყობამდე, ერთი გუნდი."
- Under it, 19px `#6e6e73`: "საიტები, AI ჩატბოტები და ჩვენი საკუთარი პროგრამები ბიზნესისთვის."
- Right column (below on mobile): keep the existing "კითხვა გაქვს?" block.
- **Family shot** below the text: a stage, radius 32px, background `#f5f5f7`, `overflow: hidden`, height 520px desktop / 380px mobile, width up to 1200px. Inside, the four devices overlap like a product family photo, all cropped by the stage's bottom edge:
  - center: the laptop with Invento (largest, about 60% of the stage width);
  - left, behind the laptop and a bit higher: the browser window;
  - right, in front of the laptop: the chatbot phone;
  - right of that, behind it, smaller and a bit higher: the LineUp phone.
  - Mobile: only the laptop and the chatbot phone.
- Devices rest on the stage with one soft shadow each (`0 20px 40px rgba(0,0,0,0.12)`), no other effects.
- Scenes play once, staggered, when the stage is visible: browser notification at 0.4s, Invento order at 1.6s, chatbot conversation from 2.8s, LineUp push at 4.4s. Reuse the v3 scene code with a start delay. In the hero the browser shows this site (see section 2, card 1) with the notification "ახალი მოთხოვნა საიტიდან" / "მაინტერესებს საიტის ფასი." / "ახლა".

### 2. What do you need

- h2, two-tone: "რა გჭირდებათ?" then gray "ნახეთ, როგორ მუშაობს."
- Keep the four v3 product cards, scenes and links. Change only the **website card**:
  - Body: "სწრაფი, ტელეფონზე მორგებული და Google-ისთვის მომზადებული. როგორც ეს საიტი." Facts line stays "500₾-დან · 1-2 კვირაში".
  - Visual: this site instead of the restaurant photo. Once sections 1 and 2 are built, capture screenshots of `/preview/it` with Puppeteer (it is installed) at 1440 x 900 and 390 x 844 (top of the page, after the hero scenes finished) and save them as `public/preview/vifa-desktop.png` and `public/preview/vifa-mobile.png`. Show the desktop one in the browser window (address pill text "vifadigital.ge").
  - Scene (replaces the v3 notification): after 0.6s the browser window smoothly narrows to phone width (about 38% of its width, 900ms, same easing as the device entrance) while its content crossfades to the mobile screenshot. It stays narrow. This shows responsiveness without words.
- The other three cards (chatbot, Invento, LineUp) stay exactly as in v3.

### 3. From website to warehouse (dark)

This is our real advantage: one team builds the online shop and the warehouse system and connects them. All three steps below are stated on our website page FAQ (`src/offeredServices/WebDev.tsx`), so they are true.

- h2, two-tone on dark: "საიტიდან საწყობამდე." in `#f5f5f7`, then "ხელით არაფერი გადაგაქვთ." in `#86868b`.
- Visual: on desktop the browser window (left) and the laptop (right) side by side with a 1px `#424245` connector line between them; on mobile stacked with a vertical connector.
  - Browser content, built in HTML (light, like a real small shop checkout): a 72px rounded square in `#f5c2d8` as the product image, "აბრეშუმის ბალიშისპირი", "69.00 ₾", and a pill button "გადახდა" that becomes "გადახდილია ✓".
  - Laptop: the Invento screenshot, as in v3.
- Three numbered steps under the visual (row on desktop, column on mobile), 15px:
  1. "კლიენტი საიტზე იხდის ბანკით."
  2. "მარაგი Invento-ში თავისით მცირდება."
  3. "საკურიერო სტიკერი დასაბეჭდად მზადაა."
- Scene, once when the section is 50% visible: step 1 active and the button switches to "გადახდილია ✓" (0.6s); a small 6px `#f5f5f7` dot travels along the connector (900ms); step 2 active and the Invento notification from v3 appears with stock 21 → 20; step 3 active and a second notification appears under it: "საკურიერო სტიკერი მზადაა" / "შეკვეთა #1043 · ბეჭდვა". The active step is `#f5f5f7`, inactive steps `#6e6e73`; after the sequence all three stay `#f5f5f7`.

### 4. What business do you have

- h2, two-tone: "რა ბიზნესი გაქვთ?" then gray "ნახეთ, რას ვაკეთებთ თქვენი დარგისთვის."
- A horizontal row (same scroller as section 2) of five cards, 313 x 400 desktop, `min(78vw, 300px)` wide on mobile with the same ratio. Card: white text area on top on `#f5f5f7` (these cards sit on a white section), then the photo filling the rest, radius 24px, the same hover scale as product cards. Whole card links to the industry page.

| title | one line | photo | link |
|---|---|---|---|
| რესტორნები და კვება | საიტი ციფრული მენიუთი და ჯავშნით. | the best-looking of `public/gallery/food/01.webp` to `15.webp` (our own real photos; say in your report which you chose) | `/industry/web/food` |
| სასტუმროები და ტურიზმი | საიტი პირდაპირი ჯავშნებისთვის. | `/hotelphoto.webp` | `/industry/web/tourism` |
| ონლაინ მაღაზია და ვაჭრობა | ონლაინ მაღაზია ბანკით გადახდით. | `/eccomerce.webp` | `/industry/web/retail` |
| სილამაზე და ესთეტიკა | საიტი ონლაინ ჩაწერით. | `/saloni.webp` | `/industry/web/beauty` |
| იურიდიული და საფინანსო | იურიდიული და ბუღალტრული კომპანიის საიტი. | `/practice-hero.webp` | `/industry/web/legal-finance` |

### 5. Contact

Keep the v3 contact person card unchanged, on the `#f5f5f7` section.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/it`.
2. Screenshots at 1440 and 390: right after load, and after all scenes have finished (scroll through every section and the horizontal rows, wait for each scene). Save them in `preview-verification/v4/`.
3. Emulate `prefers-reduced-motion: reduce`: every section shows its final state at once.
4. No horizontal page scroll at 390, no text over devices, no clipped text, no console errors or React warnings.
5. All card links open existing routes.
6. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint, it does not run in this environment).
7. Report: files changed, which food photo you picked, screenshots, and anything you could not follow and why. Do not commit.
