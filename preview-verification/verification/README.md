# Pilot v3 verification

Historical v3 results. Current hub verification is in [v4](../v4/README.md).

The preview retains the existing navigation, Google Sans, horizontal shelf, card palette, shapes, and cropped devices. Its four software scenes start at 60% card visibility, finish once, and replay on pointer hover. Devices enter by 28px and lift by 6px. Reduced motion renders final states immediately.

## Source changes

- [ITHubPreview.tsx](../../src/pages/preview/ITHubPreview.tsx): device scenes, approved Georgian copy and facts, device motion, responsive spacing, and the personal contact card.
- [useProductScene.ts](../../src/pages/preview/useProductScene.ts): scene timing, viewport observation, pointer replay, reduced-motion preference handling, and cleanup.
- [productColors.ts](../../src/pages/preview/productColors.ts): exported product palette.
- [verifyPreview.mjs](../verifyPreview.mjs): local Puppeteer verification using the existing dependency.
- This directory contains the screenshots and [machine-readable results](report.json).

## Screenshots

Screenshots use 1440 × 1000 and 390 × 1000 viewports. Each final screenshot is taken six seconds after bringing its card into view. The row is deliberately scrolled through all four products; all scene states remain final afterward.

| Width | Immediately after load | Final website | Final chatbot | Final Invento | Final LineUp |
| --- | --- | --- | --- | --- | --- |
| 1440 | [Initial](1440-initial.png) | [Website](1440-final-web.png) | [Chatbot](1440-final-chatbot.png) | [Invento](1440-final-invento.png) | [LineUp](1440-final-lineup.png) |
| 390 | [Initial](390-initial.png) | [Website](390-final-web.png) | [Chatbot](390-final-chatbot.png) | [Invento](390-final-invento.png) | [LineUp](390-final-lineup.png) |

| Width | Reduced website | Reduced chatbot | Reduced Invento | Reduced LineUp | Contact |
| --- | --- | --- | --- | --- | --- |
| 1440 | [Website](1440-reduced-web.png) | [Chatbot](1440-reduced-chatbot.png) | [Invento](1440-reduced-invento.png) | [LineUp](1440-reduced-lineup.png) | [Contact](1440-contact.png) |
| 390 | [Website](390-reduced-web.png) | [Chatbot](390-reduced-chatbot.png) | [Invento](390-reduced-invento.png) | [LineUp](390-reduced-lineup.png) | [Contact](390-contact.png) |

## Checks

- `npx tsc -p tsconfig.app.json --noEmit` passes.
- HTTP 200 from `http://localhost:5173/preview/it` with `npm run dev`.
- Hidden cards wait. At mobile width, 55% visibility does not start a scene and 65% does.
- All four scenes finish, remain final, and replay on pointer hover after completion.
- Device lift reaches exactly 6px. The latest chat message remains visible as older messages scroll upward.
- No horizontal page overflow at 390px. Copy and device areas do not overlap, facts retain 14px/500 styling, and notifications fit inside their cards.
- Reduced motion: all four final states immediately, zero scene timers, zero running CSS animations, no entrance transform, and a stationary, fully visible LineUp push banner.
- Navigating away during a replay leaves zero scene timers and zero card observers. No state-update-after-unmount warnings.
- No preview browser errors or unexpected warnings. The cleanup test navigates to the existing home page, which emits a pre-existing React `fetchPriority` warning in `NewHomeVifa.tsx`. That file is outside the allowed scope. Framer Motion also emits its standard development notice when reduced motion is enabled. Both are preserved separately in `report.json`.

The browser connector was unavailable and native Chrome access timed out. Screenshots and browser assertions were completed with the repository's existing Puppeteer dependency in headless Chromium. Chromium required execution outside the restricted process sandbox; no dependencies or browser security settings were changed.

ESLint was skipped as requested. The build, commit, push, and deploy were not run. Work stays on `preview/apple-it`.

## Contact reminder

Please confirm `CONTACT_NAME = "ერეკლე"` and add a real photo at `public/preview/contact.jpg`, `.png`, or `.webp`. No photo currently exists, so the card uses the first-letter fallback.

To repeat browser QA, run the dev server and then `node preview-verification/verifyPreview.mjs` from the repository root.
