# IT hub pilot v5

Local preview: `/preview/it` or `/preview/it?flow=light` for the white flow stage, `/preview/it?flow=color` for Invento blue. Branch: `preview/apple-it`. No build, commit, push, or deployment.

## Files changed

- [ITHubPreview.tsx](../../src/pages/preview/ITHubPreview.tsx): vivid white-on-color product cards, typography, dark ArrowUpRight controls, hover treatment, and the industry card integration. Existing copy, links, navigation, hero heading, contact, and footer remain.
- [productColors.ts](../../src/pages/preview/productColors.ts): the four requested solid colors and white text tokens. Previous pastel values remain in a comment.
- [useProductScene.ts](../../src/pages/preview/useProductScene.ts): shared 350ms exit plus 250ms quiet gap before restart, visibility pause/resume, reduced motion, cleanup, and a cycle identifier for verification. Batched IntersectionObserver events use the latest entry.
- [ProductDevices.tsx](../../src/pages/preview/ProductDevices.tsx): always-mounted notifications, chat messages and typing indicators, stock digits, and LineUp push. Chat advances using a transformed thread. The website browser stays fixed while a phone enters in front.
- [HubSections.tsx](../../src/pages/preview/HubSections.tsx): synchronized hero scene timing and both flow-stage variants, with a measured order-card journey from checkout to Invento.
- [IndustryCard.tsx](../../src/pages/preview/IndustryCard.tsx): always-mounted, visibility-triggered chips with a four-second hold.
- [hubSections.css](../../src/pages/preview/hubSections.css): transform/opacity scene transitions, flow stages, desktop bento grid, floating labels, photo hover, and reduced-motion overrides.
- Overwrote [vifa-desktop.png](../../public/preview/vifa-desktop.png) at 1440 × 900 and [vifa-mobile.png](../../public/preview/vifa-mobile.png) at 390 × 844. Both were captured after the hero finished, with `.it-family-web { visibility: hidden }` injected into the capture page, eliminating the recursive browser image.
- Verification scripts, screenshots, reports, and recordings are contained in this directory. No verification files are in `src/`.

## Contrast against white

Ratios use relative sRGB luminance and are rounded to two decimal places. The body column also accounts for the requested 92% white opacity.

| Product | Background | Solid white | Body at 92% white |
| --- | --- | --- | --- |
| Website | `#ef3e39` | 3.88:1 | 3.48:1 |
| AI chatbot | `#7d4cf0` | 5.04:1 | 4.52:1 |
| Invento WMS | `#1f55d7` | 6.29:1 | 5.58:1 |
| LineUp | `#dd5b0b` | 3.77:1 | 3.42:1 |

Red and orange fall below a 4.5:1 normal-text contrast target. The specified colors and text opacities were retained exactly; this is a review point for the owner.

## Screenshots

| Width | Flow variant | Hero | Flow stage | Industry section | Contact | All final states with reduced motion |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 | Light | [Hero](1440-light-hero-final.png) | [Flow](1440-light-flow-final.png) | [Bento](1440-light-industries-final.png) | [Contact](1440-light-contact.png) | [Full page](1440-light-reduced-full.png) |
| 1440 | Color | [Hero](1440-color-hero-final.png) | [Flow](1440-color-flow-final.png) | [Bento](1440-color-industries-final.png) | [Contact](1440-color-contact.png) | [Full page](1440-color-reduced-full.png) |
| 390 | Light | [Hero](390-light-hero-final.png) | [Flow](390-light-flow-final.png) | [Food](390-light-industry-1-final.png) | [Contact](390-light-contact.png) | [Full page](390-light-reduced-full.png) |
| 390 | Color | [Hero](390-color-hero-final.png) | [Flow](390-color-flow-final.png) | [Food](390-color-industry-1-final.png) | [Contact](390-color-contact.png) | [Full page](390-color-reduced-full.png) |

The horizontal product row is captured card by card after each scene finishes:

| Width / variant | Website | Chatbot | Invento | LineUp |
| --- | --- | --- | --- | --- |
| 1440 light | [Website](1440-light-product-web-final.png) | [Chatbot](1440-light-product-chatbot-final.png) | [Invento](1440-light-product-invento-final.png) | [LineUp](1440-light-product-lineup-final.png) |
| 1440 color | [Website](1440-color-product-web-final.png) | [Chatbot](1440-color-product-chatbot-final.png) | [Invento](1440-color-product-invento-final.png) | [LineUp](1440-color-product-lineup-final.png) |
| 390 light | [Website](390-light-product-web-final.png) | [Chatbot](390-light-product-chatbot-final.png) | [Invento](390-light-product-invento-final.png) | [LineUp](390-light-product-lineup-final.png) |
| 390 color | [Website](390-color-product-web-final.png) | [Chatbot](390-color-product-chatbot-final.png) | [Invento](390-color-product-invento-final.png) | [LineUp](390-color-product-lineup-final.png) |

Mobile industry cards: light [food](390-light-industry-1-final.png), [tourism](390-light-industry-2-final.png), [retail](390-light-industry-3-final.png), [beauty](390-light-industry-4-final.png), [legal/finance](390-light-industry-5-final.png); color [food](390-color-industry-1-final.png), [tourism](390-color-industry-2-final.png), [retail](390-color-industry-3-final.png), [beauty](390-color-industry-4-final.png), [legal/finance](390-color-industry-5-final.png). The original v4 photos are retained, including `public/gallery/food/12.webp`.

## Two-loop recordings and checks

The [recordings](recordings/) contain two complete loops for every distinct scene at desktop and mobile widths. Common hero, product, and industry scenes are recorded once per width. The light and color flow stages are each recorded at both widths. Each recorded scene also has `exit-mid` and `exit-clear` PNGs for inspecting its fade.

Order transfer filmstrips: [desktop light](1440-light-order-journey.png), [desktop color](1440-color-order-journey.png), [mobile light](390-light-order-journey.png), [mobile color](390-color-order-journey.png).

- [Desktop hero](recordings/1440-light-hero.webm), [website](recordings/1440-light-product-web.webm), [chatbot](recordings/1440-light-product-chatbot.webm), [Invento](recordings/1440-light-product-invento.webm), [LineUp](recordings/1440-light-product-lineup.webm), [bento chips](recordings/1440-light-industries.webm).
- [Desktop light flow](recordings/1440-light-flow.webm), [desktop color flow](recordings/1440-color-flow.webm), [mobile light flow](recordings/390-light-flow.webm), [mobile color flow](recordings/390-color-flow.webm).
- [Mobile hero](recordings/390-light-hero.webm), [website](recordings/390-light-product-web.webm), [chatbot](recordings/390-light-product-chatbot.webm), [Invento](recordings/390-light-product-invento.webm), [LineUp](recordings/390-light-product-lineup.webm).
- Mobile chips: [food](recordings/390-light-industry-1.webm), [tourism](recordings/390-light-industry-2.webm), [retail](recordings/390-light-industry-3.webm), [beauty](recordings/390-light-industry-4.webm), [legal/finance](recordings/390-light-industry-5.webm).

[report.json](report.json) records loop events, exit/reset gaps, sampled animation properties, node identity checks, layout shifts, dimensions, contrast, reduced-motion states, and console output. Scene elements retain their DOM identities through both loops, transitions animate only transform/opacity, and the UI is fully faded before reset. Layout and image checks cover both widths and both flow variants.

Reduced motion renders final states with zero scene timers and zero running animations. All scene and measurement observers disconnect on unmount. The focused [lifecycle check](lifecycle-report.json) also covers switching to reduced motion during playback, visibility recovery, product and industry hover transforms, and cleanup while loops are active.

TypeScript passes with `npx tsc -p tsconfig.app.json --noEmit`. ESLint was skipped as requested. No preview console errors or React warnings; Framer Motion's standard reduced-motion development notice is listed separately.

No requested visual feature was omitted. The original contact initial fallback is unchanged; the owner still needs to confirm the name and add a photo.

To repeat: run `npm run dev`, then `node preview-verification/v5/verify.mjs` and `node preview-verification/v5/verify-lifecycle.mjs`. `capture-assets.mjs` refreshes the mirror-free site images. Verification uses the existing Puppeteer and ffmpeg dependencies; Chromium runs outside the restricted process sandbox without changing browser security settings.
