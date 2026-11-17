# IT hub pilot v4

Implemented the five-section hub template from `CODEX_PILOT_V4.md` and `REDESIGN_PLAN.md` at `/preview/it`. Branch: `preview/apple-it`. No commit, push, build, or deployment.

## Changes

- [ITHubPreview.tsx](../../src/pages/preview/ITHubPreview.tsx): the five full-width sections, `HERO_TITLE`, exact Georgian copy, existing product shelf, new industry shelf, and unchanged v3 contact card.
- [ProductDevices.tsx](../../src/pages/preview/ProductDevices.tsx): the existing v3 device components moved into a reusable preview module. The website browser now shows this site and narrows to its mobile screenshot; the hero browser shows the specified enquiry. Invento supports the additional courier notification in the connected sequence.
- [HubSections.tsx](../../src/pages/preview/HubSections.tsx): overlapping device family shot and the website, payment, inventory, and courier sequence.
- [hubSections.css](../../src/pages/preview/hubSections.css): alternating full-width backgrounds, 96px/64px section padding, responsive family composition, connector, and industry cards.
- [useProductScene.ts](../../src/pages/preview/useProductScene.ts): extended the v3 controller with shared observation targets, start delays, custom timing, visibility thresholds, and optional hover replay. Existing product cards retain their v3 timing and behavior.
- [productColors.ts](../../src/pages/preview/productColors.ts) remains unchanged.
- Added [vifa-desktop.png](../../public/preview/vifa-desktop.png), captured at 1440 × 900, and [vifa-mobile.png](../../public/preview/vifa-mobile.png), captured at 390 × 844, from the top of the completed preview after the hero scenes finish.
- Moved the v3 runner to `preview-verification/verifyPreview.mjs` and its results to `preview-verification/verification/`. New verification tools and output live here, outside `src/`.

## Food photo

Selected [`public/gallery/food/12.webp`](../../public/gallery/food/12.webp), the warm close-up with sauce being poured over the food. It has a clear subject, strong contrast, and works well in the card crop. The available gallery contains `01.webp` through `14.webp`; `15.webp` is absent. [Selection contact sheet](food-contact-sheet.png).

## Screenshots

| Width | Immediately after load | Hero after its scenes | Full page after all scenes and rows | Reduced-motion full page |
| --- | --- | --- | --- | --- |
| 1440 | [Initial](1440-initial.png) | [Hero](1440-hero-final.png) | [All final](1440-all-final.png) | [Reduced](1440-reduced-all.png) |
| 390 | [Initial](390-initial.png) | [Hero](390-hero-final.png) | [All final](390-all-final.png) | [Reduced](390-reduced-all.png) |

| Width | Website responsive scene | Chatbot | Invento | LineUp | Connected sequence | Contact |
| --- | --- | --- | --- | --- | --- | --- |
| 1440 | [Website](1440-product-web.png) | [Chatbot](1440-product-chatbot.png) | [Invento](1440-product-invento.png) | [LineUp](1440-product-lineup.png) | [Sequence](1440-connection-final.png) | [Contact](1440-contact.png) |
| 390 | [Website](390-product-web.png) | [Chatbot](390-product-chatbot.png) | [Invento](390-product-invento.png) | [LineUp](390-product-lineup.png) | [Sequence](390-connection-final.png) | [Contact](390-contact.png) |

Industry cards: [desktop start](1440-industry-1.png), [desktop end](1440-industry-5.png), [mobile food](390-industry-1.png), [mobile tourism](390-industry-2.png), [mobile retail](390-industry-3.png), [mobile beauty](390-industry-4.png), [mobile legal/finance](390-industry-5.png).

The normal viewport screenshots use 1440 × 900 and 390 × 844. Full-page captures preserve those widths and include every section; the horizontal shelves are captured separately as each card is brought into view.

## Verification

- `npx tsc -p tsconfig.app.json --noEmit` passes. ESLint was skipped as requested.
- The dev preview returns HTTP 200.
- The hero's first actions occur at approximately 0.4s, 1.6s, 2.8s, and 4.4s after stage visibility. Mobile shows only Invento and the chatbot phone.
- Below-fold product scenes wait for visibility. All four finish, and completed product scenes replay on pointer hover.
- The website browser narrows to 38% of its starting width and crossfades to the mobile screenshot.
- A [focused replay check](replay-report.json) confirms that hover resets it immediately to full desktop width before repeating the narrowing scene at both viewport sizes. [Desktop replay](1440-website-replay-final.png), [mobile replay](390-website-replay-final.png).
- The dark sequence ends with paid status, stock 20, both Invento notifications, and all three steps active. The connector is horizontal on desktop and vertical on mobile.
- Section colors and 96px/64px padding match the brief. Product text clears device areas. Industry cards retain their specified dimensions and 28px/24px title sizes. All images load and there is no horizontal page overflow at 390px.
- Reduced motion renders final hero, product, and connected-sequence states immediately. Zero scene timers, zero running CSS animations, no device entrance transforms, stock 20, and stationary LineUp push banners.
- Unmounting during a replay leaves zero scene timers and zero scene observers.
- All nine card links render existing routes with HTTP 200 and their real page headings.
- No preview console errors, React warnings, or unexpected browser warnings. Framer Motion's standard development notice about reduced motion is retained separately in [report.json](report.json).

The supplied scope is complete. Browser QA used the installed Puppeteer dependency in headless Chromium. No new dependencies were added. Chromium required execution outside the restricted process sandbox, as in v3; browser security settings were not changed.

The contact remains the unchanged v3 initial fallback. The owner still needs to confirm `CONTACT_NAME = "ერეკლე"` and add `public/preview/contact.jpg`, `.png`, or `.webp`.

Run `npm run dev`, then `node preview-verification/v4/verify.mjs` to repeat the checks. `node preview-verification/v4/verify-replay.mjs` checks the website replay. `node preview-verification/v4/capture-assets.mjs` refreshes the two site screenshots after the hero finishes.
