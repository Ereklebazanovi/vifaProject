# Task: pilot v6, calmer colors, an IT feel, mobile first, services not products

Read `REDESIGN_PLAN.md` first, then the current code in `src/pages/preview/`. Build on it; do not rewrite from scratch. Same hard rules as v5 (branch `preview/apple-it`, no commit/push/deploy/build, only `src/pages/preview/` and `public/preview/`, Georgian copy exactly as given, no em/en dashes, no uppercase Georgian, no glows/gradients/pulsing badges/emoji/counters, reduced motion respected, verification files in `preview-verification/`).

## The owner's feedback on v5

1. The services row became **loud and garish**: the solid violet/blue/orange cards hurt the eyes. The pastel colors of v4 were better. **Keep v5's smooth animations.** They ask: how do we give it more of an **IT feel**?
2. "What business do you have" has **oversized labels**: only text is visible.
3. **Mobile is the main channel.** On mobile it is not obvious that the rows scroll sideways.
4. **We sell services, not products.** Do not fall into Apple's trap: Apple's carousels are for browsing many products. We have four services and five industries, and visitors should see all of them at once and understand what they get and how to start.

## Principles for v6

- **No horizontal carousels on this page**, on any screen size. Four services and five industries fit on screen: grids on desktop, vertical stacks on mobile. Remove the shelf paddles and horizontal scrollers from the services and industries sections. Nothing on the page is hidden behind a sideways swipe.
- **IT feel through restraint and precision, not color.** Neutral base (white, `#f5f5f7`, text `#1d1d1f`), one accent (`#0071e3` for links and buttons), product colors only as soft panels and small markers. Crisp 1px hairlines (`#e5e5ea`) instead of soft shadows on cards. Small monospace indices (`01`, `02`...) in `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`, used **only for digits**, never for Georgian text. Consistent radii: cards 28px, inner panels 20px, chips 14px.
- **Section backgrounds alternate**: hero white, services `#f5f5f7`, flow white, industries `#f5f5f7`, "how we start" white, contact `#f5f5f7`.

## 1. Services: "რა გჭირდებათ? ნახეთ, როგორ მუშაობს."

- Layout: desktop (≥ 900px) a **2 x 2 grid** in the 980px column, 20px gap; below 900px a single column, full width, 16px gap.
- Card: white, radius 28px, 1px `#e5e5ea` border, no shadow, padding 28px (24px mobile), whole card is the link. Height about 560px desktop; on mobile let content define it (about 520px).
- Text block (dark text):
  - eyebrow row: a 10px circle in the product's deep color, then the index in monospace 12px `#6e6e73` (`01` to `04`), then the existing eyebrow text 12px weight 600 `#6e6e73`;
  - title 28px desktop / 24px mobile, weight 600, `#1d1d1f`;
  - body 17px / 16px, weight 400, `#1d1d1f`;
  - facts line 14px weight 500 `#6e6e73`.
- **Device panel** under the text: inset inside the card (margin 0 -16px -16px on desktop so it nearly touches the card edge, or simply full width at the bottom with 12px inset), radius 20px, background = the product's soft color, height 300px desktop / 260px mobile, `overflow: hidden`. The device sits in the panel and is cropped by the panel's bottom edge, as in v4.
- Colors (back to the v4 palette the owner preferred; update `productColors.ts` to `{ soft, deep }` and keep the v5 vivid values in a comment):

| card | soft (panel) | deep (dot) |
|---|---|---|
| 01 საიტი | `#b3cfea` | `#1e71a5` |
| 02 AI ჩატბოტი | `#c4b7ec` | `#7869bb` |
| 03 Invento WMS | `#9aceaa` | `#397a59` |
| 04 LineUp | `#f8cdb0` | `#e8743b` |

- Arrow: 32px circle `#f5f5f7` with lucide `ArrowUpRight` 16px `#1d1d1f`, top right of the card (aligned with the eyebrow row), not over the device.
- Hover (pointer devices): border becomes `#d2d2d7`, the device rises 8px (450ms, enter easing). No card scale.
- All texts, scenes and links stay as in v5. Scenes keep v5's smooth motion and fade on loop restart.

## 2. From website to warehouse

Keep v5's stage, with two changes: the section background becomes white, and in the default light variant the stage background becomes `#f5f5f7` (like the hero stage). Keep `?flow=color` as it is for comparison.

## 3. Industries: an industry switcher instead of photo cards

Replace the bento grid with a compact switcher that shows, for the chosen industry, what we build for it and how to start. This sells our service, which the photo cards did not.

- h2 stays: "რა ბიზნესი გაქვთ?" then gray "ნახეთ, რას ვაკეთებთ თქვენი დარგისთვის."
- **Chips** (a real radio group, keyboard accessible): რესტორანი · სასტუმრო · მაღაზია · სალონი · იურიდიული. Pill shape, 15px, height 40px; inactive white with 1px `#d2d2d7` border; active `#1d1d1f` background with white text. On mobile the chips **wrap onto two lines**; they never scroll sideways.
- **Panel** below the chips (white card, radius 28px, 1px `#e5e5ea` border, on the `#f5f5f7` section): desktop two columns (photo left 50%, content right), mobile stacked (photo on top, 16:10).
  - Photo: the industry's photo from v5, radius 20px, with that industry's live UI chip from v5 (smaller: 13px, top left), looping with the shared smooth rules.
  - Content: title (the industry name from v5), 24px weight 600; then "რას ვაკეთებთ:" 14px `#6e6e73`; then the first three feature titles of that industry, read at runtime from `industryData.web[slug].features[0..2].titleKa` (`src/data/industryData.ts`), as a list with a 6px dot in `#1d1d1f`, 17px; then two actions: a pill button "მოგვწერეთ" (`#0071e3`, white) that opens WhatsApp with the industry message below, and a link "{industry} დეტალურად ›" to the industry page.
  - WhatsApp messages (`https://wa.me/995557624243?text=` + encoded):

| chip | industry page | WhatsApp message |
|---|---|---|
| რესტორანი | `/industry/web/food` | გამარჯობა, რესტორანი მაქვს და მაინტერესებს საიტი. |
| სასტუმრო | `/industry/web/tourism` | გამარჯობა, სასტუმრო მაქვს და მაინტერესებს საიტი. |
| მაღაზია | `/industry/web/retail` | გამარჯობა, მაღაზია მაქვს და მაინტერესებს ონლაინ მაღაზია. |
| სალონი | `/industry/web/beauty` | გამარჯობა, სალონი მაქვს და მაინტერესებს საიტი. |
| იურიდიული | `/industry/web/legal-finance` | გამარჯობა, იურიდიული კომპანია მაქვს და მაინტერესებს საიტი. |

  - Link texts: "რესტორნებისთვის დეტალურად ›", "სასტუმროებისთვის დეტალურად ›", "მაღაზიებისთვის დეტალურად ›", "სალონებისთვის დეტალურად ›", "იურიდიული კომპანიებისთვის დეტალურად ›".
- Switching: the panel content crossfades (opacity 300ms out, 450ms in, photo and text together, no layout jump: reserve the panel height for the tallest content).
- **Auto-advance** for life: while the section is on screen and the visitor has not touched the chips, the selection moves to the next industry every 7 seconds, with a thin 2px progress line under the active chip (transform scaleX, linear). Any click, tap or keyboard use on the chips stops auto-advance for the rest of the visit. Reduced motion: no auto-advance.

## 4. New: "how we start" (services need a clear first step)

A short section between industries and contact, white background, in the 980px column:

- h2, two-tone: "როგორ ვიწყებთ." then gray "სამი ნაბიჯი, ზედმეტი ლოდინის გარეშე."
- Three columns on desktop, stacked on mobile, separated by 1px `#e5e5ea` hairlines (vertical on desktop, horizontal on mobile). Each: monospace index 13px `#6e6e73`, title 20px weight 600, one line 16px `#6e6e73`:
  - `01` "უფასო კონსულტაცია" / "გვიყვებით, რა გჭირდებათ. კონსულტაცია უფასოა."
  - `02` "ზუსტი შეთავაზება" / "ფასი და ვადა, თქვენს საჭიროებაზე მორგებული."
  - `03` "აწყობა და გაშვება" / "სავიზიტო საიტი 1-2 კვირაში, ჩატბოტი 7-14 დღეში."
- No animation in this section.

## 5. Unchanged

Nav bar, hero (text and family shot), contact section, footer.

## Verification

1. `npm run dev`, open `/preview/it` at 1440, 1024 and 390 widths.
2. **No horizontal scrolling anywhere** at 390: check that `document.documentElement.scrollWidth === innerWidth` and that no element on the page scrolls sideways (except nothing). All four services and all five industry chips are visible without swiping.
3. Industry switcher: click every chip, keyboard-navigate it (arrow keys), confirm auto-advance stops after interaction, confirm each WhatsApp link opens with its message and each detail link opens an existing page.
4. Screenshots of every section at 1440 and 390 in `preview-verification/v6/`.
5. No console errors or React warnings; reduced motion shows final states.
6. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint).
7. Report: files changed, screenshots, anything you could not follow and why. Do not commit.
