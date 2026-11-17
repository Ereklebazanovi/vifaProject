# Task: pilot v3, make the `/preview/it` page come alive

You are joining a design pilot that is already in progress. Read this whole file before touching code.

## Context

- Site: vifadigital.ge, a Georgian digital agency (websites, AI chatbots, and two own products: Invento WMS and LineUp). React 18 + Vite 7 + TypeScript, Tailwind CSS v4, react-router-dom v7, lucide-react, framer-motion 11, react-helmet-async.
- The live site is dark and text-heavy. The owner wants to move to a light design inspired by apple.com/store, starting with one preview page before touching anything else.
- The pilot lives on git branch `preview/apple-it` (uncommitted work), route `/preview/it`, file `src/pages/preview/ITHubPreview.tsx`. It renders outside the site `Layout`, so it has its own small nav bar.
- History so far:
  - v1 (white cards with stock photos) was rejected as "boxes thrown together".
  - The owner then pointed at what they actually like: Apple Store's colored "The latest" cards (see `GEMINI_REF_apple-cards.png` in the repo root). v2 implemented that: pastel cards with a deeper color band at the bottom and a device (browser window, phone, laptop) that shows our real UI, cropped by the card edge.
  - Font: Google Sans (`@fontsource-variable/google-sans`, family `"Google Sans Variable"`), chosen after comparing 13 Georgian fonts. Keep it.
  - Owner's verdict on v2: "it starts to look like something, but it is static and dead", the copy sounds like a market seller listing goods, and it must not end up as an Apple copy-paste.
- Earlier prompts, for background only: `GEMINI_APPLE_PILOT.md` (v1 spec, its design tokens still apply), `GEMINI_APPLE_PILOT_V2.md` (v2 spec).

## The idea of v3

Apple's cards show static product photos. Ours will show **our software working**. Every device on the page plays a short, real scene when it scrolls into view, and the card text describes exactly that moment. That gives the page life and makes it ours rather than an Apple copy. All four changes below are approved by the owner.

## Hard rules

1. Stay on branch `preview/apple-it`. Do not commit, push or deploy. Do not run `npm run build` (it launches a Puppeteer prerender).
2. Read `src/pages/preview/ITHubPreview.tsx` first and build on it. Keep what works (layout, card shapes, colors, row scrolling, nav, font). Do not rewrite it from scratch.
3. Allowed changes: `src/pages/preview/ITHubPreview.tsx` and new files in `src/pages/preview/`. Importing from `src/components/lineup/` is fine; editing it is not. No new npm dependencies (framer-motion is already installed and may be used).
4. Motion is allowed only (a) inside the device screens, as product UI doing its job, and (b) as the small device lift and entrance described below. No glows, gradients, pulsing badges, confetti, emoji, particles, typewriter headlines, counters or looping background motion.
5. Georgian copy: plain, calm, specific. Never use the em dash or en dash characters. Never apply `text-transform: uppercase` to Georgian text. Use only the facts given in this file (prices, timelines); do not invent numbers or claims.
6. `prefers-reduced-motion: reduce`: no scenes, no lift, no entrance. Show each device directly in its final state.

## Change 1: live scenes in the devices

Shared behaviour:
- A scene starts when its card is at least 60% visible (IntersectionObserver with the viewport as root, so cards hidden inside the horizontal row start only when scrolled into view). It plays once, about 3 to 5 seconds, and then stays in its final state.
- On pointer devices, hovering a card whose scene has finished replays it from the start.
- Implement each scene as a small state machine (steps with timeouts, or framer-motion sequences). Clear every timer and observer on unmount. No layout shift: reserve the space the scene's elements end up using.
- Notifications use a light style unless stated otherwise: white, radius 12px, 1px `#d2d2d7` border, shadow `0 4px 16px rgba(0,0,0,0.12)`, 13px text, enter with a 300ms slide and fade.

Scenes:

1. **Website (blue card, browser window).** After 0.6s a notification slides into the top right corner of the browser content area: first line "ახალი მოთხოვნა საიტიდან" (600), second line "ბანკეტი 15 კაცზე, შაბათს. რა ღირს?", small "ახლა" on the right.
2. **AI chatbot (lavender card, phone).** The phone status bar shows the time **02:14** (night is the point of the scene). The chat starts empty. Sequence: customer bubble "ხვალ 20:00-ზე ოთხ კაცზე მაგიდა გაქვთ?" appears, then a bot typing indicator (three dots, 1.2s), then the bot bubble "დიახ, თავისუფალია. ვისი სახელით დავჯავშნო?", then customer "ნინოს სახელით.", typing again, then the bot bubble "დაჯავშნილია: ხვალ, 20:00, ოთხი სტუმარი." Bubbles enter with a short fade and 8px rise. If four bubbles do not fit the visible part of the phone, let older bubbles scroll up like a real chat.
3. **Invento WMS (green card, laptop).** After 0.6s a notification slides in over the top right of the laptop screen: "ახალი შეკვეთა #1043" (600), then "აბრეშუმის ბალიშისპირი × 1", then "მარაგი: 21 → 20 ცალი", where the number changes from 21 to 20 about 0.8s after the notification appears (a simple crossfade of the digit, not a counter).
4. **LineUp (peach card, phone).** Use `PushBanner` from `src/components/lineup/AppKit.tsx` (it is the real app's notification style and is meant to be dark) with the real app texts from `src/components/lineup/content.ts`: title `app.ka.pushPaidTitle`, body `app.ka.pushPaidBody(monthIndex())`. It slides in after 0.8s and stays.

## Change 2: copy (from "list of goods" to "what it does for you")

All four products do the same thing for the owner: they work while the owner is busy or asleep. The copy says that through concrete moments, not adjectives.

- h1, two-tone: "IT." then gray part "პასუხობს, ითვლის და შეკვეთებს იღებს თქვენს ნაცვლად."
- Row headline, two-tone: "სერვისები." then gray part "ნახეთ, როგორ მუშაობს." (it invites people to watch the screens).
- Cards: eyebrow (what kind), title (name), body (the moment the scene shows), and a facts line.

| card | eyebrow | title | body | facts line |
|---|---|---|---|---|
| website | სავიზიტო, კორპორატიული, ონლაინ მაღაზია | საიტი | კლიენტი გპოულობთ Google-ში და პირდაპირ საიტიდან გწერთ. | 500₾-დან · 1-2 კვირაში |
| chatbot | Messenger · Instagram · WhatsApp | AI ჩატბოტი | ღამის 2 საათზე მოწერილ კლიენტსაც პასუხობს და მაგიდას უჯავშნის. | 500₾-დან · 7-14 დღეში |
| Invento | საწყობის პროგრამა | Invento WMS | გაყიდეთ ერთი და საწყობში ერთით ნაკლები ჩანს. თავისით. | 79₾/თვე-დან · 7 დღე უფასოდ |
| LineUp | სპორტული აკადემიის აპი | LineUp | მშობელი აპში ხედავს დასწრებას და გადახდის სტატუსს. | (none, no price is published) |

- Facts line: 14px, weight 500, `#1d1d1f` at 72% opacity, 10px below the body. Keep the text block short enough that it never overlaps the device at 340px card width; push the device down if needed, never shrink the text.

## Change 3: details that are ours, not Apple's

1. **One color per product, as a system.** Move the card colors into `src/pages/preview/productColors.ts` and export them, so later pages can reuse them: website blue `#b3cfea` / `#1e71a5`, chatbot lavender `#c4b7ec` / `#7869bb`, Invento green `#9aceaa` / `#397a59`, LineUp peach `#f8cdb0` / `#e8743b` (light / band).
2. **A real person instead of a generic contact block.** Replace the "კითხვა გაქვთ?" section with one wide white card (radius 24px, padding 32px):
   - h2, two-tone: "კითხვა გაქვთ?" then gray part "მოგვწერეთ, გიპასუხებთ პირადად."
   - Left: a 64px round photo from `public/preview/contact.jpg` (or `.png`/`.webp`) if that file exists; otherwise a 64px circle in `#f5f5f7` with the first letter of the name in 24px weight 600.
   - Next to it: the name from a constant `CONTACT_NAME = "ერეკლე"` (17px, 600) and one line "WhatsApp-ზე პირადად გიპასუხებთ." (15px, `#6e6e73`).
   - Right (below on mobile): the existing WhatsApp pill button "მოგვწერეთ" and the link "საკონტაქტო ფორმა ›" to `/contact`.
   - Do not state any response time. In your report, remind the owner to confirm the name and add a photo.

## Change 4: small motion on the devices

- Entrance: when a card first becomes visible, its device moves from 28px lower to its final position over 700ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`. Transform only, no opacity fade (the card must never look empty). Once per page load.
- Hover (pointer devices): the device rises 6px over 300ms; the card keeps its existing 1.01 scale. The arrow button does not move.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/it`.
2. Take screenshots at 1440 and 390 width twice: right after load, and 6 seconds later after scrolling the row so that every card has been visible. The second set must show all four scenes in their final state.
3. Check with `prefers-reduced-motion: reduce` emulated: devices show their final state immediately, nothing moves.
4. No horizontal page scroll at 390, no text overlapping devices, no clipped text, no console errors, no React warnings about state updates on unmounted components.
5. `npx tsc -p tsconfig.app.json --noEmit` passes. (ESLint does not run in this environment because of a known Node 24 incompatibility; skip it.)
6. Report: files changed, screenshots, anything you could not follow and why, and the reminder about `CONTACT_NAME` and the photo. Do not commit.
