# Task: Georgian typography test page for the light redesign

Follow-up to `GEMINI_APPLE_PILOT.md` (the `/preview/it` page). The owner liked the colors and spacing of that pilot but not the typography: in Georgian the 48px / weight 600 headlines look heavy and dense, and the gray second half of the two-tone headlines looks muddy. Before redesigning anything else, we pick the type by eye on one test page.

Build ONE page, `/preview/type`, that shows our real headlines and card text in several font and weight combinations and has a live tuner, so the owner can pick a combination and copy its values.

## Hard rules

1. Stay on the existing branch `preview/apple-it`. Do not commit, do not push, do not deploy, do not run `npm run build`.
2. Allowed changes, nothing else:
   - New file `src/pages/preview/TypeSpecimen.tsx` (small sibling components in `src/pages/preview/` are fine).
   - `src/App.tsx`: one `lazy` import and one route `/preview/type`, placed next to the existing `/preview/it` route and wrapped the same way (its own `<Suspense>` with the `#f5f5f7` fallback).
3. Do not change `ITHubPreview.tsx` or anything else.
4. `<Helmet>` with `<title>Type | VIFA (preview)</title>` and `<meta name="robots" content="noindex,nofollow" />`.
5. Same color palette as the pilot, nothing else: page `#f5f5f7`, surface `#ffffff`, text `#1d1d1f`, text-2 `#6e6e73`, hairline `#d2d2d7`, link `#0066cc`, button `#0071e3`.
6. No gradients, glows, emoji or animations. Never use the em dash or en dash characters. Never apply `text-transform: uppercase` to Georgian.

## Fonts to compare

| key | font | how to load |
|---|---|---|
| A | FiraGO | import `@fontsource/firago` weights 300, 400, 500, 600, 700 in this file |
| B | Noto Sans Georgian | already loaded globally in `src/main.tsx` (400, 500, 600, 700); also import `@fontsource/noto-sans-georgian/300.css` in this file |

Set `-webkit-font-smoothing: antialiased` and `text-rendering: optimizeLegibility` on the page root.

## Sample content (use exactly this text in every specimen)

- h1, two-tone: dark part "IT." then gray part "საიტები, ჩატბოტები და პროგრამები ბიზნესისთვის."
- h2, two-tone: dark part "სერვისები." then gray part "აირჩიე, რა გჭირდება."
- A white card (radius 18px, shadow `2px 4px 12px rgba(0,0,0,0.08)`, padding 28px, width 360px) containing: eyebrow "AI ჩატბოტი" (12px, text-2), title "ჩატბოტი თქვენი ბიზნესისთვის", body "პასუხობს კლიენტებს Messenger-ში, Instagram-ში, WhatsApp-სა და საიტზე, 24/7.", link "მეტი ›" in link blue.
- One body paragraph, 17px: "საიტს ვამზადებთ 1-დან 4 კვირამდე, პროექტის მოცულობის მიხედვით. კონსულტაცია უფასოა."

## Section 1: six presets

Each preset is a white panel with its code in the top left (12px, text-2, e.g. "A2"), and inside it two renderings side by side on desktop (stacked under 1024px):

- Left: desktop sizes (h1, h2, card, paragraph).
- Right: a 390px-wide frame with a 1px hairline border and 16px side padding showing the same content at mobile sizes, so line breaks on phones are visible.

Presets (h1 / h2 weights are written as "dark part / gray part"):

| code | font | h1 desktop / mobile | h1 weights | h2 desktop / mobile | h2 weights | card title | line-height h1 / h2 | letter-spacing |
|---|---|---|---|---|---|---|---|---|
| A1 | FiraGO | 48 / 32 | 600 / 600 | 28 / 24 | 600 / 600 | 28px 600 | 1.15 / 1.2 | -0.005em (this is the current pilot) |
| A2 | FiraGO | 44 / 30 | 600 / 400 | 28 / 22 | 600 / 400 | 26px 600 | 1.2 / 1.25 | 0 |
| A3 | FiraGO | 40 / 28 | 500 / 300 | 26 / 22 | 500 / 300 | 24px 500 | 1.25 / 1.3 | 0.005em |
| B1 | Noto Sans Georgian | 48 / 32 | 600 / 600 | 28 / 24 | 600 / 600 | 28px 600 | 1.15 / 1.2 | -0.005em |
| B2 | Noto Sans Georgian | 44 / 30 | 600 / 400 | 28 / 22 | 600 / 400 | 26px 600 | 1.2 / 1.25 | 0 |
| B3 | Noto Sans Georgian | 40 / 28 | 500 / 300 | 26 / 22 | 500 / 300 | 24px 500 | 1.25 / 1.3 | 0.005em |

Card body and paragraph are 17px / 400 / line-height 1.5 in every preset, in the preset's font.

Each preset panel has a small button "ტიუნერში გახსნა" that loads that preset into Section 2 and scrolls to it.

## Section 2: tuner

A sticky control bar on the left (desktop) or at the top (mobile, collapsible), and a live preview on the right showing the same sample content at desktop size plus the 390px mobile frame.

Controls:

| control | type | range / options |
|---|---|---|
| font | segmented | FiraGO, Noto Sans Georgian |
| h1 size desktop | slider | 32 to 56px, step 1 |
| h1 size mobile | slider | 24 to 40px, step 1 |
| h1 dark weight | segmented | 300, 400, 500, 600, 700 |
| h1 gray weight | segmented | 300, 400, 500, 600, 700 |
| h1 gray color | segmented | `#6e6e73`, `#86868b` |
| h2 size desktop | slider | 20 to 36px |
| h2 size mobile | slider | 18 to 30px |
| h2 dark weight / gray weight | segmented | 300 to 700 |
| card title size | slider | 20 to 32px |
| card title weight | segmented | 400, 500, 600, 700 |
| body size | slider | 15 to 19px |
| line-height (headlines) | slider | 1.05 to 1.45, step 0.01 |
| letter-spacing (headlines) | slider | -0.02 to 0.02em, step 0.001 |

Every slider shows its current value as a number next to it. Controls are real labelled inputs (`<input type="range">`, radio groups), keyboard accessible.

Under the controls, a read-only text box with the current settings in one line, for example:
`FiraGO · h1 44/30 600/400 #6e6e73 · h2 28/22 600/400 · card 26/600 · body 17 · lh 1.2 · ls 0`
and a button "კოპირება" that copies that line to the clipboard (show "დაკოპირდა" for 2 seconds after). Save the tuner state in `localStorage` (wrapped in try/catch) so a reload keeps it.

## Layout

- Page background `#f5f5f7`, content max width 1200px, 22px side padding on mobile.
- Top of page: a short intro in 17px text-2: "აირჩიე ვარიანტი, რომელიც ყველაზე სუფთად იკითხება. ტიუნერში შეგიძლია დახვეწო და მნიშვნელობები დააკოპირო."
- No navigation bar is needed.
- The page must not scroll horizontally at 390px.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/type`.
2. Check 1440 and 390 widths: no horizontal scroll, presets readable, tuner usable on the phone.
3. Check that FiraGO and Noto Sans Georgian really render differently (if both look identical, a font failed to load: fix the import).
4. `npx tsc -p tsconfig.app.json --noEmit` passes.
5. Take screenshots at 1440 and 390 and show them.
6. Report the files you created or changed. Do not commit or push.
