# Task: pilot v2, colored cards (rework `/preview/it`)

Follow-up to `GEMINI_APPLE_PILOT.md`. The owner did not like v1: white cards with stock photos read as "boxes thrown together". The owner then showed exactly what they like: the colored "The latest" cards on apple.com/store. Reference screenshot: `GEMINI_REF_apple-cards.png` in the repo root. Open it and study it before writing code. It is a reference for composition and color only; never copy its images, text or product names into the page.

## What makes those cards work (reproduce this, with our content)

1. **Every card has its own pastel color.** Pink, light blue, lavender, green. Colored cards next to each other give the row rhythm; white cards did not.
2. **Two-tone background.** The card is a light pastel, and a deeper shade of the same hue fills a horizontal band at the bottom. The band's height differs per card (from about 15% to 55% of the card), chosen so its top edge passes behind the middle or lower half of the object.
3. **One big object stands across the two colors.** A real-looking product (phone, watch, laptop) sits over the color split and is so big that the card's bottom and/or right edge crops it. That crop is what makes it feel physical and premium.
4. **Short text at the top left.** Small eyebrow, big title, two or three short lines. Nothing else.
5. **A small round arrow** in the bottom right corner.
6. **Section headline:** two-tone, the first words in a deep accent color (matching the first card), the rest in gray, both the same weight.

We have no product photography, but we have real products on screens. Our "objects" are device frames that show our real UI: a phone, a laptop and a browser window. This means the style does not depend on photos.

## Hard rules

All hard rules from `GEMINI_APPLE_PILOT.md` still apply (branch `preview/apple-it`, no commit, no push, no build, no em or en dashes, no `uppercase` on Georgian, no gradients or glows, no entrance animations, nothing from Apple used on the page). In addition:

- Change only `src/pages/preview/ITHubPreview.tsx`. New sibling files in `src/pages/preview/` are fine. The one exception: install the font package below (`npm install @fontsource-variable/google-sans`), which changes `package.json` and `package-lock.json`. No other dependencies. Do not edit `TypeSpecimen.tsx`, `App.tsx`, or anything in `src/components/` (importing from it is fine).
- Do not add `GEMINI_REF_apple-cards.png` to `public/` or reference it from code.

## Page structure for v2 (less, but done well)

Keep: the local nav bar, the header (h1 + "კითხვა გაქვს?" block), the contact section and the footer from v1.

Remove: the quick links tile row and the industries row with stock photos. (They come back later once this card style is approved.)

Main change: the services row becomes four colored cards.

## Colors

Page and text colors stay as in v1 (`#f5f5f7`, `#1d1d1f`, `#6e6e73`, `#0066cc`, `#0071e3`). Card colors, measured from the reference (top = light part, band = deeper bottom band):

| card | top | band |
|---|---|---|
| საიტი (blue) | `#b3cfea` | `#1e71a5` |
| AI ჩატბოტი (lavender) | `#c4b7ec` | `#7869bb` |
| Invento WMS (green) | `#9aceaa` | `#397a59` |
| LineUp (peach) | `#f8cdb0` | `#e8743b` |

Card text is `#1d1d1f` on all of them (it sits on the light part).

## Typography (Google Sans, replaces FiraGO)

The font was chosen by comparing 13 Georgian fonts on our own text: **Google Sans** (OFL license, free for the web, covers Georgian and Latin, variable 400 to 700). Install `@fontsource-variable/google-sans`, add `import "@fontsource-variable/google-sans";` at the top of `ITHubPreview.tsx`, remove the FiraGO imports from that file, and set `font-family: "Google Sans Variable", system-ui, sans-serif` on the page root. Check in the browser that both Georgian and Latin text really render in Google Sans (not a fallback font). The same font is used for headlines and body text, like Apple uses one family.

| role | desktop | mobile | weight | line-height |
|---|---|---|---|---|
| h1 dark part / gray part | 44px | 30px | 600 / 400 | 1.2 |
| row headline h2 (both parts) | 32px | 24px | 600 / 600 | 1.2 |
| card eyebrow | 12px | 12px | 600 | 1.33 |
| card title | 28px | 24px | 600 | 1.2 |
| card body | 17px | 16px | 400 | 1.47 |

Row headline: "სერვისები." in `#1e71a5` (the band color of the first card) + "აირჩიე, რა გჭირდება." in `#6e6e73`.

## Card spec

- Size 400 x 500 px on desktop; on mobile width `min(85vw, 340px)` with the same 4:5 ratio. Radius 24px. `overflow: hidden`. No shadow.
- Background: the top color, plus an absolutely positioned band in the band color, full width, anchored to the bottom, height as given per card below.
- Text block: top left, padding 32px top and 28px sides (24px on mobile). Eyebrow, title (8px below), body (12px below). Max 3 short lines of body.
- The object: absolutely positioned, layered above the band and below the text, sized and placed as given per card below. It must be cropped by the card edge as specified.
- Arrow: 36px circle, background `rgba(255,255,255,0.9)`, lucide `ChevronRight` 18px in `#1d1d1f`, 20px from the right and bottom edges, above the object, `aria-hidden` (the whole card is the link).
- Hover (pointer devices only): `transform: scale(1.01)`, 300ms `cubic-bezier(0,0,0.5,1)`. Nothing else.
- Row mechanics (scroller, alignment to the 980px column, arrow paddles, gaps) stay as in v1.

## The four cards

**1. საიტი** (blue), link `/services/web`
- Eyebrow "საიტი". Title "საიტის დამზადება". Body "სავიზიტო საიტი, კორპორატიული საიტი ან ონლაინ მაღაზია."
- Object: a browser window. White, radius 12px, a 32px top bar in `#f5f5f7` with three 9px circles in `#d2d2d7` and a small rounded address pill in white. Content area: if `public/preview/site.png` (or `.webp`/`.jpg`) exists, show it with `object-fit: cover; object-position: top`; otherwise show `/restorani.webp` with `object-fit: cover`.
- Placement: left 32px, top 46% of the card, width about 130% of the card, so the right and bottom edges crop it. Band height 24%.

**2. AI ჩატბოტი** (lavender), link `/services/ai-chatbot`
- Eyebrow "AI ჩატბოტი". Title "ჩატბოტი თქვენი ბიზნესისთვის". Body "პასუხობს კლიენტებს Messenger-ში, Instagram-ში და WhatsApp-ში, 24/7."
- Object: a phone. Use `PhoneFrame` from `src/components/lineup/AppKit.tsx` (it is 300 x 640; scale it the way v1's `ScaledPhone` does). Its screen background is dark, so fill the screen with a white layer that covers it, then draw a light chat inside: a header row with a 32px circle avatar in `#c4b7ec` and the name "რესტორანი", then the four bubbles from v1 (customer on the right in `#0071e3` with white text, bot on the left in `#e9e9eb` with `#1d1d1f` text, 15px, radius 18px). Static, no typing animation.
- Placement: horizontally centered, top of the phone at 44% of the card, bottom cropped by the card edge. Band height 30%.

**3. Invento WMS** (green), link `/inventowms`
- Eyebrow "საწყობის პროგრამა". Title "Invento WMS". Body "მარაგები, შეკვეთები და ფინანსები ერთ სისტემაში."
- Object: a laptop built in CSS. Screen: `#1d1d1f` bezel 8px, radius 14px on the top corners, showing `/invento-demo-inventory.webp` (`object-fit: cover; object-position: top left`). Base: a bar in `#d2d2d7`, 12px tall, radius 0 0 10px 10px, 6% wider than the screen on each side, with a small 18% wide notch in `#c7c7cc` at its top center.
- Placement: left 36px, top 42% of the card, laptop width about 150% of the card, so the right edge crops it. Band height 52% (the band's top edge passes behind the screen, like the laptop in the reference).

**4. LineUp** (peach), link `/lineup`
- Eyebrow "სპორტული აკადემიის აპი". Title "LineUp". Body "გადახდები, დასწრება და მშობლებთან კავშირი ერთ აპში."
- Object: reuse v1's `StaticLineupPhone`.
- Placement: horizontally centered, top at 44%, bottom cropped. Band height 28%.

## Mobile

- Same cards, scaled. Object positions use percentages so they keep the composition at 340px width.
- Make sure the text block never overlaps the object at 340px: if it does, push the object down, never shrink the text.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/it`.
2. Put a screenshot of the services row next to `GEMINI_REF_apple-cards.png` and compare: colored cards, two-tone background, objects cropped by the edges, text top left, arrow bottom right. Fix whatever differs in composition.
3. Check 1440 and 390 widths: no horizontal page scroll, no text over objects, no clipped text.
4. `npx tsc -p tsconfig.app.json --noEmit` passes.
5. Show screenshots of the services row at 1440 and 390.
6. Report the files you changed. Do not commit or push.
