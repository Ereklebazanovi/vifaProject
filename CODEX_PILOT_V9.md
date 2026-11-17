# Task: pilot v9, open with the four directions

Read `REDESIGN_PLAN.md` (§0 "ვიზუალური ღუზა", §2.A), then the current code in `src/pages/preview/` (v8). Build on it. Same hard rules as before: branch `preview/apple-it`; no commit, push, deploy or `npm run build`; change only `src/pages/preview/` and `public/preview/`; Georgian copy exactly as given; no em or en dashes; no `uppercase` on Georgian; no glows, gradients, pulsing badges, emoji, counters; reduced motion shows final states; verification files in `preview-verification/`.

## Why

The owner rejected the industry-switcher hero as a concept: in the first seconds the page looks like it is about one niche (a restaurant or a hotel), and it is not obvious that the chips are clickable, so six of seven options stay hidden. This page is a router to the four IT directions; it should open with them, the way the Apple Store page opens with its products. The industry stage is good work and moves later to the industry pages (keep its files, just stop rendering it here).

The owner likes the "ყველა მიმართულება" grid. v8's copy, "როგორ ვიწყებთ", the FAQ and the contact stay.

## New structure

| # | section | background |
|---|---|---|
| 1 | Intro + the four directions grid (one section) | `#ffffff` |
| 2 | For your industry: compact links | `#f5f5f7` |
| 3 | How we start (v8, unchanged) | `#ffffff` |
| 4 | Questions (v8, unchanged) | `#f5f5f7` |
| 5 | Contact (v8, unchanged) | `#ffffff` |

Stop rendering the industry hero (`IndustrySwitcher` / `IndustryStage` in the hero). **Keep** `IndustryStage.tsx`, `CommerceScene.tsx` and `IndustrySwitcher.tsx` in the folder, unused, with a one-line comment at the top of each: "Parked for the industry page template (REDESIGN_PLAN §2.D)."

## 1. Intro and grid

- Intro, compact, in the 980px column (desktop: text left, contact block right; mobile: stacked):
  - h1, two-tone, from `HERO_TITLE`: dark "IT." then gray "ოთხი მიმართულება, ერთი გუნდი." (44px / 30px).
  - Right (below on mobile): "კითხვა გაქვთ?" (15px, 600) and the WhatsApp pill "უფასო კონსულტაცია" with the message "გამარჯობა, მინდა უფასო კონსულტაცია.".
  - Top padding 64px desktop / 40px mobile; 32px between the intro and the grid. On a 1440 x 900 screen the first row of cards must start above the fold.
- The grid directly under the intro: the existing four pastel cards, 2 x 2 at ≥ 900px, one column below, same copy, devices and arrows as v8. Remove the old separate h2 "ყველა მიმართულება. აირჩიეთ ის, რაც გჭირდებათ." (the h1 now introduces the grid). Keep `id="services"` on the grid.
- **Motion: one card at a time, in turn.** When the grid becomes visible, card 1 plays its scene; when it finishes (after its hold), card 2 plays, then 3, then 4, then card 1 again, and so on while the grid is on screen. Only one card moves at any moment. Cards that are not playing show their final state. Hover on a card plays that card immediately and the round continues from it. Use the existing `useProductScene` fade-on-restart rules; implement the round-robin in a small coordinator in the grid (pass `active` / `onDone` to each card). Pause when the grid leaves the screen. Reduced motion: all final states, nothing plays.
- Re-capture `public/preview/vifa-desktop.png` and `vifa-mobile.png` (devices hidden before capture, as in v7) because the top of the page changed.

## 2. For your industry: compact links

Not a switcher: five plain links that go straight to the industry pages, clearly clickable.

- h2, two-tone: "თქვენი დარგისთვის." then gray "ნახეთ, რას ვაკეთებთ თქვენნაირი ბიზნესისთვის."
- Five link tiles: desktop one row of 5 (equal width), tablet 3 per row, mobile 2 per row (the fifth tile spans both columns or sits alone, no horizontal scroll). Tile: white, radius 20px, `overflow: hidden`, whole tile is a `<Link>`; photo on top (aspect ratio 4:3, `object-fit: cover`), under it the name 16px weight 600 and a lucide `ArrowRight` 16px on the right of the name row, padding 14px 16px. Hover: photo scale 1.04 over 600ms, the arrow moves 3px right. Visible focus ring.

| name | photo | link |
|---|---|---|
| რესტორნები | `/gallery/food/12.webp` | `/industry/web/food` |
| სასტუმროები | `/hotelphoto.webp` | `/industry/web/tourism` |
| მაღაზიები | `/eccomerce.webp` | `/industry/web/retail` |
| სალონები | `/saloni.webp` | `/industry/web/beauty` |
| იურიდიული კომპანიები | `/practice-hero.webp` | `/industry/web/legal-finance` |

- No animation in this section apart from the hover.

## 3 to 5. Unchanged

"როგორ ვიწყებთ", "ხშირი კითხვები" and the contact section stay exactly as in v8 (only backgrounds per the table above).

## Verification

1. `npm run dev`, `/preview/it` at 1440, 1024 and 390.
2. At 1440 x 900 the first row of the grid is visible without scrolling. Screenshots of the first screen and every section at 1440 and 390 in `preview-verification/v9/`.
3. The round-robin: record about 30 seconds and confirm that only one card moves at a time, the order is 1, 2, 3, 4, 1, hover jumps to the hovered card, and the loop pauses off screen.
4. All five industry tiles link to existing pages; no horizontal scroll at 390.
5. No console errors or React warnings; reduced motion shows final states. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint).
6. Report: files changed, screenshots, anything you could not follow and why. Do not commit.
