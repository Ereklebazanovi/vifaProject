# Task: pilot v7, the industry hero and the locked visual language

Read `REDESIGN_PLAN.md` first (Georgian, single source of truth; read especially the "ვიზუალური ღუზა" paragraph in §0 and the new §2.A). Then read the current code in `src/pages/preview/` (v6). Build on it; reuse components; do not rewrite from scratch.

Same hard rules as before: branch `preview/apple-it`; no commit, push, deploy or `npm run build`; change only `src/pages/preview/` and `public/preview/`; Georgian copy exactly as given; no em or en dashes; no `uppercase` on Georgian; no glows, gradients, pulsing badges, emoji, counters, typewriter text; reduced motion shows final states; verification files in `preview-verification/`.

## Why v7

The owner's verdict on v6: tidy, logical, but the colors are mostly gone and the overall feeling is disappointing. Our honest diagnosis:

1. **Pendulum.** Each round fixed the previous complaint by pulling the opposite lever (pastel, then loud vivid, then colorless white), losing what was good. The one moment the owner said "it starts to look like something" was v4: whole cards in pastel color with dark text and big devices.
2. **v6's white cards with hairline borders, `01` indices and colored dots read as a generic SaaS / AI template.** Remove that styling.
3. **The hero leans toward the warehouse product**: the headline says "საწყობამდე", Invento's laptop is the biggest device, and a separate section repeats the warehouse flow. This page replaces the old navbar dropdowns (web development + industries, AI chatbot, products), so every direction needs equal weight.
4. **Too many tiny screenshots** (hero collage, the mirror inside the website card, laptops): unreadable UI at small scale is noise.

**Locked visual language from now on: v4's color + v6's order + v5's motion.** Whole pastel cards and stages, dark text, few and big devices cropped by the edges, grids instead of carousels, motion only with transform/opacity and soft fades.

## Page structure (four sections, then the footer)

| # | section | background |
|---|---|---|
| 1 | Hero: "რა ბიზნესი გაქვთ?" with the industry stage | `#ffffff` |
| 2 | All directions: 2 x 2 grid of pastel cards | `#f5f5f7` |
| 3 | How we start (v6, unchanged) | `#ffffff` |
| 4 | Contact (unchanged) | `#f5f5f7` |

Remove from the page: `FamilyShot`, the separate `CommerceFlow` section and the `?flow` parameter, and the separate industries section (it becomes the hero). Reuse their code where noted below.

## 1. Hero: the industry stage

Merge `IndustrySwitcher` into the hero. The industry switcher's logic (radio group, keyboard navigation, auto-advance that stops on interaction, crossfade without layout jump, WhatsApp links) stays.

**Layout.** Desktop (≥ 1024px): two columns inside a 1200px container, left column 40% (text and controls), right column 60% (stage). Below 1024px: stacked in this order: h1, subline, chips, stage, details.

**Left column:**
- h1, two-tone, from the constant `HERO_TITLE`: dark "IT." then gray "რა ბიზნესი გაქვთ?" (44px desktop / 30px mobile, as in the plan's type scale).
- Subline, 19px `#6e6e73`: "აირჩიეთ და ნახეთ, რას ავაწყობდით თქვენთვის: საიტს, ჩატბოტს თუ პროგრამას."
- Chips (wrap on every screen size, never scroll sideways): რესტორანი · სასტუმრო · მაღაზია · სალონი · იურიდიული · აკადემია · სხვა. Keep the v6 chip style and the 2px progress line.
- Details of the selected industry (reserve the height of the tallest variant): title 22px weight 600, "რას ვაკეთებთ:" 14px `#6e6e73`, three items, then the WhatsApp pill "მოგვწერეთ" and the detail link.
- Keep the small "კითხვა გაქვს?" block out of the hero (the details' WhatsApp button replaces it).

**Stage (right column):** radius 32px, height 560px desktop / 420px mobile, `overflow: hidden`. Its background is the selected industry's tint and changes with a 600ms `background-color` transition. **At most two devices per industry, large, cropped by the stage's edges.** Devices and their scene fade out (350ms) before an industry switch and fade in (600ms enter easing) after it, while the tint transitions.

| chip | tint | devices on the stage | scene (once per showing; loops with the shared fade rules only after the visitor has stopped auto-advance) | three items | detail link | WhatsApp message |
|---|---|---|---|---|---|---|
| რესტორანი | `#c4b7ec` | browser (left, large) showing `/gallery/food/12.webp` as the site's hero image; chatbot phone (right, in front) | browser notification "ახალი ჯავშანი" / "ხვალ 20:00 · 4 სტუმარი"; the existing reservation chat | first 3 `industryData.web.food.features` titles | "რესტორნებისთვის დეტალურად ›" → `/industry/web/food` | v6 message |
| სასტუმრო | `#b3cfea` | browser with `/hotelphoto.webp`; chatbot phone | notification "პირდაპირი ჯავშანი" / "3 ღამე · 2 სტუმარი"; chat: customer "შაბათიდან 3 ღამით ორადგილიანი ოთახი გაქვთ?", bot "დიახ, თავისუფალია. საუზმით გნებავთ?", customer "კი, საუზმით.", bot "დაჯავშნილია: შაბათიდან, 3 ღამე, 2 სტუმარი." | `tourism` features | "სასტუმროებისთვის დეტალურად ›" → `/industry/web/tourism` | v6 message |
| მაღაზია | `#9aceaa` | browser with the v5 checkout (left); Invento laptop (right, in front) | the v5 commerce flow: "გადახდილია ✓", the order card travels into the laptop, stock 21 → 20, then the courier sticker notification | `retail` features | "მაღაზიებისთვის დეტალურად ›" → `/industry/web/retail` | v6 message |
| სალონი | `#f5c2d8` | browser with `/saloni.webp`; chatbot phone | notification "ახალი ჩაწერა" / "ხვალ 12:00"; chat: customer "ხვალ 12:00-ზე მანიკურზე ჩაწერა შეიძლება?", bot "დიახ, 12:00 თავისუფალია. ვისი სახელით ჩაგწეროთ?", customer "მარიამის.", bot "ჩაწერილია: ხვალ, 12:00, მანიკური." | `beauty` features | "სალონებისთვის დეტალურად ›" → `/industry/web/beauty` | v6 message |
| იურიდიული | `#d9dee8` | one browser, large and centered, with `/practice-hero.webp` | notification "ახალი მოთხოვნა საიტიდან" / "კონსულტაცია, ახლა" | `legal-finance` features | "იურიდიული კომპანიებისთვის დეტალურად ›" → `/industry/web/legal-finance` | v6 message |
| აკადემია | `#f8cdb0` | the LineUp phone, large and centered | the existing LineUp push notification | "გადახდების აღრიცხვა", "დასწრება და შეფასებები", "შეტყობინებები მშობლებს" | "LineUp დეტალურად ›" → `/lineup` | "გამარჯობა, დავინტერესდი LineUp-ით, სპორტული აკადემიის აპლიკაციით." |
| სხვა | `#e8e8ed` | browser with `public/preview/vifa-desktop.png`; chatbot phone | chat: customer "საიტი რამდენ ხანში მზადდება?", bot "სავიზიტო საიტი 1-2 კვირაში. გნებავთ უფასო კონსულტაცია?" | "საიტი ან ონლაინ მაღაზია", "AI ჩატბოტი Messenger-ში, Instagram-ში და WhatsApp-ში", "Invento WMS საწყობისთვის" | "ყველა მიმართულება ↓" → scrolls to section 2 | "გამარჯობა, დავინტერესდი თქვენი სერვისებით." |

- In the browser, an industry photo fills the content area under a simple 44px site header bar (white, with two short `#e5e5ea` placeholder bars, no fake brand name).
- Auto-advance interval: 9 seconds (long enough for each scene plus a short hold). After the visitor touches the chips, auto-advance stops for the visit and the selected industry's scene loops with the shared fade-on-restart rules.
- Mobile: the same devices, scaled; for the shop the browser sits at the top and the laptop overlaps it at the bottom.

## 2. All directions (2 x 2 grid, v4 language)

- h2, two-tone: "ყველა მიმართულება." then gray "აირჩიეთ ის, რაც გჭირდებათ." Give the section `id="services"` (the "სხვა" link scrolls here).
- Grid: 2 x 2 at ≥ 900px, single column below, 20px gap, inside the 980px column. No horizontal scrolling.
- Card: the **whole card in the product's soft color** (`#b3cfea`, `#c4b7ec`, `#9aceaa`, `#f8cdb0` from `productColors.ts`), radius 28px, no border, no shadow, height about 560px desktop / 500px mobile, `overflow: hidden`, whole card is the link.
- Text in `#1d1d1f`: eyebrow (the existing eyebrow text) 12px weight 600 at 70% opacity; title 28px / 24px weight 600; body 17px / 16px; facts line 14px weight 500 at 70% opacity. **Remove the `01` indices, the colored dots and the white frame.**
- The device is large and cropped by the card's bottom and right edges, as in v4 (the device sits directly on the card color, no inner panel).
- Arrow: 36px circle `rgba(255,255,255,0.9)`, lucide `ArrowUpRight` 18px `#1d1d1f`, 20px from the bottom right corner.
- Scenes: **play once** when the card is 60% visible, replay on hover (`loop: false`). The hero carries the looping motion; one loop per screen is enough.
- Hover: card scale 1.015 and device rise 8px, 450ms enter easing, as in v5.
- Website card visual: the browser with the desktop screenshot plus the phone sliding in (v6 scene). **Re-capture both screenshots without any mirror**: before capturing, hide every device on the page (`.it-hero-stage *, .it-services [class*="obj"] { visibility: hidden }` or equivalent), so the screenshot shows the hero text, chips and an empty tinted stage. Capture at 1440 x 900 and 390 x 844 and overwrite `public/preview/vifa-desktop.png` and `vifa-mobile.png`.

## 3 and 4. Unchanged

"How we start" and the contact section stay as in v6 (backgrounds per the table above).

## Clean up

Delete code, CSS and files that are no longer used after this change (for example `FamilyShot`, the standalone flow section wrapper, v6 hairline card styles, unused parts of `hubV6.css` and `hubSections.css`). Keep `TypeSpecimen.tsx`.

## Verification

1. `npm run dev`, open `/preview/it` at 1440, 1024 and 390.
2. Let the hero auto-advance through all seven industries and screenshot each one at 1440 and 390 (`preview-verification/v7/`). Each stage shows at most two devices, no mirror, and the tint changes smoothly.
3. Click a chip: auto-advance stops, the scene loops with a fade restart, no jumps or layout shift.
4. All four service cards visible without sideways scrolling at 390; scenes play once and replay on hover.
5. Every WhatsApp link opens with its message; every detail link opens an existing page; "ყველა მიმართულება ↓" scrolls to the grid.
6. Reduced motion: final states, no auto-advance.
7. No horizontal page scroll, no console errors or React warnings. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint).
8. Report: files changed and deleted, screenshots, anything you could not follow and why. Do not commit.
