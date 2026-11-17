# V7 verification

Local preview: `/preview/it`, branch `preview/apple-it`.

The page now has four sections: the industry hero, the pastel services grid, How we start, and contact. The hero uses the V6 radio controls and session opt-out with seven industries and a 9-second interval. Each showing plays once until a visitor interacts; interaction enables the shared fade restart. Service cards play once at 60% visibility and replay on desktop hover.

## Source changes in this iteration

- `src/pages/preview/ITHubPreview.tsx`: four-section composition, whole pastel cards, bottom arrows, no indices, dots or inner panels; service scenes use `loop: false`.
- `src/pages/preview/IndustrySwitcher.tsx`: merged hero, seven wrapping radio chips, reserved details height, exact messages and links, 350ms exit and 600ms entry, tint transition, session opt-out.
- `src/pages/preview/IndustryStage.tsx` (new): one or two large devices for each industry and the corresponding scene timeline.
- `src/pages/preview/CommerceScene.tsx` (new): checkout, measured traveling order, stock update and courier notification reused from V5, without the standalone section or query parameter.
- `src/pages/preview/ProductDevices.tsx`: configurable photo notifications and chat messages, retaining the existing devices and LineUp push component.
- `src/pages/preview/useProductScene.ts`: play-once scenes retain their final state after scroll re-entry; switching loop mode does not reset a visible scene.
- `src/pages/preview/hubSections.css`: responsive hero and stage geometry, shared motion and seven-industry styles; obsolete family and standalone-flow styles removed.
- `src/pages/preview/productColors.ts`: retained the four pastel product colors, removed the obsolete vivid palette comment.
- `public/preview/vifa-desktop.png` and `vifa-mobile.png`: recaptured at 1440 × 900 and 390 × 844 with all devices hidden, leaving an empty tinted hero stage.

Deleted: `HubSections.tsx`, `IndustryCard.tsx`, `hubV6.css`. The useful flow code and How we start styles were retained in the files above. `TypeSpecimen.tsx` remains. How we start and contact content and presentation remain unchanged.

## Screenshots

| Industry | 1440 | 390 |
|---|---|---|
| Restaurant | [Screenshot](1440-auto-food.png) | [Screenshot](390-auto-food.png) |
| Hotel | [Screenshot](1440-auto-tourism.png) | [Screenshot](390-auto-tourism.png) |
| Shop | [Screenshot](1440-auto-retail.png) | [Screenshot](390-auto-retail.png) |
| Salon | [Screenshot](1440-auto-beauty.png) | [Screenshot](390-auto-beauty.png) |
| Legal | [Screenshot](1440-auto-legal-finance.png) | [Screenshot](390-auto-legal-finance.png) |
| Academy | [Screenshot](1440-auto-academy.png) | [Screenshot](390-auto-academy.png) |
| Other | [Screenshot](1440-auto-other.png) | [Screenshot](390-auto-other.png) |

Full-page captures: [1440](1440-full.png), [1024](1024-full.png), [390](390-full.png).

Services: [1440 grid](1440-section-services.png), [390 column](390-section-services.png).

Reduced motion: [1440](1440-reduced.png), [1024](1024-reduced.png), [390](390-reduced.png).

## Checks and reproduction

Result: **PASS**. Four service scenes, eight WhatsApp anchors, ten existing routes and all three reduced-motion viewports passed. TypeScript and `git diff --check` passed. No preview console errors or React warnings were observed.

`verify.mjs` writes the detailed [report](report.json). It checks all seven real auto-advances at both widths, tint and device count, stable hero height, manual loop resets while outgoing elements are invisible, DOM preservation, radio keyboard wrapping, session persistence, exact feature data, WhatsApp messages and anchor activation, existing detail routes, the services scroll target, single-play cards and hover replay, page and nested horizontal scrolling, reduced-motion final states, console output, and observer/timer cleanup on navigation.

`inspect.mjs` produces the three-width layout measurements, device-free public assets and full-page/section captures. `trace-shifts.mjs` records sources of browser layout-shift entries for a 1024px industry switch. Auto-advance checks measure after fonts have painted, and loop checks measure after the first showing settles; the report retains earlier load entries separately. The observed auto-advance and loop windows had zero layout shift. Initial loading recorded approximately 0.011 CLS at 1440 and 0.0215 at 390, outside those motion windows.

Commands, with the local Vite server running:

```text
node preview-verification/v7/verify.mjs
node preview-verification/v7/inspect.mjs
npx tsc -p tsconfig.app.json --noEmit
git diff --check
```

`verify.mjs --functional` reuses the completed 14 auto-advance results and reruns the interaction checks. `--auto-only` refreshes auto captures while retaining the completed functional checks. `--cleanup` checks unmount cleanup from the saved functional checkpoint in a fresh foreground tab. The original combined check stalled when returning to a background tab; the fresh foreground contact navigation verified all preview timers and observers were removed. This required no product change.

ESLint and the production build were skipped as requested. No dependencies, commits, pushes, publication or deployment were made.

The owned Vite server was stopped after verification. All implementation requirements were followed; external WhatsApp handoff is the verification limit described below.

WhatsApp activation was intercepted after reading the real anchor, so its target, phone and decoded prefill were verified without opening the external app or sending a message. Route checks use the existing local pages; no service or industry page was edited.
