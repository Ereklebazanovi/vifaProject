# IT hub pilot v6

Implemented locally at `/preview/it` on `preview/apple-it`. No build, commit, push, or deployment. V5's pending work was preserved.

## V6 files changed

- [ITHubPreview.tsx](../../src/pages/preview/ITHubPreview.tsx): removed the carousel and paddles; services now use a two-column grid from 900px and a single vertical column below it. White cards have hairlines, digit-only monospace indices, deep-color markers, soft device panels, and top-right arrows. Existing text, scenes, and service links remain.
- [productColors.ts](../../src/pages/preview/productColors.ts): restored the requested `{ soft, deep }` palette. V5's vivid values remain in a comment.
- [hubSections.css](../../src/pages/preview/hubSections.css): removed the old industry bento styles, set the flow section to white and its default stage to `#f5f5f7`. The blue `?flow=color` comparison remains.
- [IndustryCard.tsx](../../src/pages/preview/IndustryCard.tsx): reused its photo and live chip as `IndustryPhoto` inside the switcher.
- [IndustrySwitcher.tsx](../../src/pages/preview/IndustrySwitcher.tsx): native radio controls, keyboard navigation, runtime industry features, exact WhatsApp messages and detail links, crossfades, and seven-second auto-advance. Interaction disables auto-advance for the browser session, including page reloads.
- [HowWeStart.tsx](../../src/pages/preview/HowWeStart.tsx): the three supplied steps, without animation.
- [hubV6.css](../../src/pages/preview/hubV6.css): grid, switcher, reserved-height panel, progress line, monospace indices, and start-section styling. Decorative cropped stages use non-scrolling clipping.

No V6 changes were needed in `src/components/`, `src/App.tsx`, the redesign plan, industry data, dependencies, or public images. The existing V5 hero, device scenes, contact card, footer, and screenshot assets were retained.

## Complete section screenshots

These full-section images hold scenes in their final states with reduced motion, so all four services can be reviewed together. Normal-motion captures are linked below.

| Section | 1440px | 390px |
| --- | --- | --- |
| Hero | [Hero](1440-section-hero.png) | [Hero](390-section-hero.png) |
| Services | [All four services](1440-section-services.png) | [Vertical stack](390-section-services.png) |
| Website to warehouse | [Flow](1440-section-connected.png) | [Flow](390-section-connected.png) |
| Industry switcher | [Switcher](1440-section-industries.png) | [Switcher and both actions](390-section-industries.png) |
| How we start | [Three columns](1440-section-getting-started.png) | [Three steps](390-section-getting-started.png) |
| Contact | [Contact](1440-section-contact.png) | [Contact](390-section-contact.png) |
| Whole page | [Desktop overview](1440-overview.png) | [Mobile overview](390-overview.png) |

## Normal-motion and industry states

| Industry | 1440px | 390px |
| --- | --- | --- |
| Food | [Food](1440-industry-food.png) | [Food](390-industry-food.png) |
| Tourism | [Tourism](1440-industry-tourism.png) | [Tourism](390-industry-tourism.png) |
| Retail | [Retail](1440-industry-retail.png) | [Retail](390-industry-retail.png) |
| Beauty | [Beauty](1440-industry-beauty.png) | [Beauty](390-industry-beauty.png) |
| Legal/finance | [Legal/finance](1440-industry-legal-finance.png) | [Legal/finance](390-industry-legal-finance.png) |

Service scenes: desktop [website](1440-service-web.png), [chatbot](1440-service-chatbot.png), [Invento](1440-service-invento.png), [LineUp](1440-service-lineup.png); mobile [website](390-service-web.png), [chatbot](390-service-chatbot.png), [Invento](390-service-invento.png), [LineUp](390-service-lineup.png).

Other normal captures: [desktop hero](1440-hero.png), [mobile hero](390-hero.png), [desktop flow](1440-flow.png), [mobile flow](390-flow.png), [desktop how we start](1440-getting-started.png), [mobile how we start](390-getting-started.png). The retained blue comparison is shown at [1440px](1440-flow-color-reduced.png) and [390px](390-flow-color-reduced.png).

## Verification

`npx tsc -p tsconfig.app.json --noEmit` passes. ESLint was skipped as requested. Detailed results are in [report.json](report.json).

- Checked `/preview/it` at 1440, 1024, and 390px. Page width equals viewport width at all three sizes. Every element with excess horizontal content was tested for actual sideways scrolling; none could scroll sideways. Carousel DOM and paddles are absent.
- Services are 2 × 2 at desktop widths, with 480 × 560px cards in the 980px column, and a vertical stack of 346 × 520px cards at 390px. Device panels are 300px or 260px high, with 20px radii. All five industry controls wrap into exactly two rows at 390px.
- Auto-advance moved from food to tourism on the seven-second interval at each viewport width. The active chip's progress line is 2px and animates with `scaleX`.
- Clicked all five radio controls at all three widths. First three feature titles match `industryData.web[slug].features` at runtime. Panel height remains fixed across selections: 422px on desktop and approximately 610.8px on mobile.
- Verified arrow navigation, wraparound, Home/End, and focus movement. Manual interaction stops auto-advance; selection stayed unchanged for longer than seven seconds, the interval was cleared, and opt-out survived a reload.
- Activated all five WhatsApp anchors at each width and verified their phone number, exact decoded prefill, and `_blank` target. External handoff was intercepted for verification; WhatsApp was not launched and no message was sent.
- Opened all five industry detail routes locally and verified HTTP 200 with their real headings.
- Reduced motion shows final service and flow states, with no auto-advance, no scene timers, no intervals, and zero running animations. Scene and switcher observers clean up on unmount.
- No browser console errors or React warnings. Framer Motion's standard reduced-motion development notice is recorded separately.
- Reviewed desktop and mobile screenshots for text fit, card/device separation, the complete actions, photo cropping, and the alternating section backgrounds.

No requested feature was omitted. The contact name/photo confirmation remains the owner's existing follow-up.

Run `npm run dev`, then `node preview-verification/v6/verify.mjs` to repeat verification. `capture-sections.mjs` creates complete section images. Browser checks use the existing Puppeteer dependency in Chromium outside the restricted process sandbox; no browser security settings were changed.
