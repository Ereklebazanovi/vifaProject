# Task: pilot v5, make `/preview/it` solid, smooth and colorful

Read `REDESIGN_PLAN.md` first (Georgian; single source of truth), then the current code in `src/pages/preview/` (`ITHubPreview.tsx`, `HubSections.tsx`, `ProductDevices.tsx`, `useProductScene.ts`, `hubSections.css`, `productColors.ts`). Build on it; do not rewrite from scratch.

The page is live as a hidden preview (`vifadigital.ge/preview/it`). The owner reviewed it and asked for the changes below. Their words, summarized: "we are going well, but it can be more. The top of the page feels like real work; the lower part feels thrown together, with no depth and no life. The cards should feel more solid and smooth. Polish this page to the end, then moving the whole site to this style becomes easy."

## Hard rules

1. Branch `preview/apple-it`. Do not commit, push or deploy (the owner or Claude will do that after review). Do not run `npm run build`.
2. Allowed changes: files in `src/pages/preview/` and images in `public/preview/`. Do not edit `src/components/`, `src/App.tsx`, `REDESIGN_PLAN.md` or anything else. No new dependencies.
3. Georgian copy exactly as given. No em dash or en dash characters. No `text-transform: uppercase` on Georgian. No invented numbers or claims.
4. No glows, gradients, pulsing badges, emoji, counters, typewriter text, looping background motion.
5. `prefers-reduced-motion: reduce`: final states, no motion.
6. Keep verification files in `preview-verification/` at the repo root, never in `src/`.

## 1. Motion quality: smooth everywhere (this fixes "it just jumps")

The owner says the website card's animation "jumps around, it is not smooth". Cause: v4 animates `width` and `left` of the browser and swaps images, and the loop resets scenes by unmounting elements. Apply these rules to every scene on the page:

- Animate **only `transform` and `opacity`**. Never animate width, height, left, top, margin or padding.
- Scene elements (notifications, chat bubbles, chips, the order card) are **always mounted**; their visibility is controlled by opacity and transform. No mount/unmount during a scene, so nothing reflows.
- Easing: enter `cubic-bezier(0.22, 1, 0.36, 1)` over 600ms; exit `cubic-bezier(0.4, 0, 1, 1)` over 350ms. Notification and bubble enter: from `translateY(12px) scale(0.98)` and opacity 0.
- **Loop restart:** when a loop ends (the hold after the final state), first fade every scene element out together (350ms exit), wait 250ms, then reset the step and play again. Never snap back to the start. Implement this in `useProductScene` (for example an `exiting` flag that components read, set before the reset).
- Hover on product cards: the card scales to 1.015 over 450ms with the enter easing, the device rises 8px over the same time; leaving reverses with the same timing. No other hover changes.
- Check with the browser's performance panel or by eye at 1440 and 390: no jumps, no layout shift.

## 2. New product colors: vivid, solid cards with white text

The owner showed an Apple card in solid red (`#ef3e39`) with white bold text and a dark round arrow, and said: this is the color I want for the website card, and the colors should be better overall. Replace the pastel cards with **solid vivid colors**, no bottom band:

| card | color | why |
|---|---|---|
| საიტი | `#ef3e39` | the owner's choice |
| AI ჩატბოტი | `#7d4cf0` | violet, similar contrast |
| Invento WMS | `#1f55d7` | Invento's own brand blue (taken from its UI) |
| LineUp | `#dd5b0b` | LineUp's brand orange, darkened so white text reads |

- Update `productColors.ts` to `{ bg, text: "#ffffff" }` per product; keep the old pastel values in a commented block so they can be restored.
- Card text in white: eyebrow 12px weight 600 at 85% opacity; title 32px desktop / 26px mobile, weight 700, line-height 1.1; body 17px / 16px, weight 500, 92% opacity; facts line 14px weight 500, 80% opacity.
- Radius 28px. No shadow at rest.
- Arrow: 36px circle `rgba(29,29,31,0.8)` (the reference uses `#333336`), lucide `ArrowUpRight` 18px white, 20px from the right and bottom edges.
- The section headline above the row stays two-tone dark text on the `#f5f5f7` background.

## 3. Website card: a new, smooth scene

Replace the narrowing-browser scene. New scene (transform and opacity only):
- The browser window shows the desktop screenshot and does not move or resize.
- After 0.6s a phone (reuse the existing phone frame, scaled down) slides up from below the card's bottom edge into the lower right, in front of the browser, showing the mobile screenshot. Enter 700ms with the enter easing. It stays during the hold, then exits with the shared loop fade.
- Body text stays: "სწრაფი, ტელეფონზე მორგებული და Google-ისთვის მომზადებული. როგორც ეს საიტი."

**Fix the mirror effect:** the current `public/preview/vifa-desktop.png` contains the hero browser, which contains the screenshot again. Re-capture both screenshots with Puppeteer after hiding the hero's browser device (inject `.it-family-web { visibility: hidden }` before the capture), at 1440 x 900 and 390 x 844, after the hero scenes have finished. Overwrite the two files.

## 4. "From website to warehouse": rebuild the section (the owner disliked it twice)

The owner rejected the charcoal version and then the navy version. Drop the dark full-width band entirely. The section background becomes `#f5f5f7`, and the content becomes one large **stage card**, like the hero's family shot, so it feels solid and consistent with the top of the page.

- h2 above the stage, two-tone dark: "საიტიდან საწყობამდე." then gray "ხელით არაფერი გადაგაქვთ."
- Stage: up to 1200px wide, radius 32px, height 560px desktop / 520px mobile, `overflow: hidden`. **Two variants, switchable by URL** so the owner can compare: default `?flow=light` (stage background `#ffffff`) and `?flow=color` (stage background Invento blue `#1f55d7`, with the h2 inside the stage in white and gray part at 75% white). Read the parameter with `useSearchParams`; default is light.
- Inside the stage: the browser with the checkout (left, large, cropped by the stage's bottom edge) and the laptop with Invento (right, large, cropped by the right and bottom edges). They may overlap slightly; the laptop is in front.
- Replace the line and dot with a meaningful motion: after "გადახდილია ✓" appears in the browser, a small order card (white, radius 14px, shadow `0 12px 32px rgba(0,0,0,0.16)`, text "შეკვეთა #1043" and "აბრეშუმის ბალიშისპირი × 1") **travels** from the browser's button to the laptop screen (transform translate, 900ms enter easing), then fades into the laptop as the Invento notification appears with stock 21 → 20, then the courier sticker notification.
- The three steps sit inside the stage at the top on desktop (three small pills in a row, `rgba(0,0,0,0.04)` on light / `rgba(255,255,255,0.14)` on color, 14px), below the stage on mobile. The active pill gets full contrast; all three end active. Same texts as v4.
- The whole sequence loops with the shared loop rules.

## 5. "What business do you have": depth and life

The owner says this part feels thrown together, flat and lifeless compared with the top. Rebuild it:

- Section background `#ffffff`. h2 stays: "რა ბიზნესი გაქვთ?" then gray "ნახეთ, რას ვაკეთებთ თქვენი დარგისთვის."
- **Desktop layout: a bento grid**, not a row. Four columns, 20px gap, rows of 300px. The restaurants card spans 2 columns and 2 rows (our own real photo, the hero of the section); the other four cards fill the remaining 2 x 2 cells. **Mobile:** the existing horizontal row, restaurants first.
- Each card: the photo fills the whole card (`object-fit: cover`), radius 28px. The text sits on a **white label** at the bottom left inside the card (radius 18px, padding 16px 18px, shadow `0 8px 24px rgba(0,0,0,0.12)`): title 20px weight 600 (28px on the big card), the one line under it 15px `#6e6e73`. The label floating over the photo gives depth without any gradient.
- **A live UI chip on every photo**, top right (top left on the big card), styled like the notifications (white, radius 14px, 13px text, small shadow). It enters when the card is 50% visible and loops with the shared loop rules (hold about 4s):

| card | chip line 1 | chip line 2 |
|---|---|---|
| რესტორნები და კვება | ახალი ჯავშანი | ხვალ 20:00 · 4 სტუმარი |
| სასტუმროები და ტურიზმი | პირდაპირი ჯავშანი | 3 ღამე · 2 სტუმარი |
| ონლაინ მაღაზია და ვაჭრობა | გადახდილია ✓ | 69.00 ₾ |
| სილამაზე და ესთეტიკა | ახალი ჩაწერა | ხვალ 12:00 |
| იურიდიული და საფინანსო | ახალი მოთხოვნა | საიტიდან, ახლა |

- Hover (pointer devices): the photo scales from 1 to 1.04 over 900ms with the enter easing (inside the card's `overflow: hidden`), the label rises 4px. No card scale.
- Keep titles, lines, photos and links from v4.

## 6. Unchanged

Nav bar, hero text and family shot (apart from the new motion rules and the website device's new scene), the chatbot, Invento and LineUp scenes (apart from the motion rules), the contact section, the footer.

## Verification

1. `npm run dev`, open `http://localhost:5173/preview/it` and `http://localhost:5173/preview/it?flow=color`.
2. Record each scene for two full loops and confirm: no jumps, no layout shift, the loop restarts with a fade and never snaps.
3. Screenshots at 1440 and 390 of every section after its scene finished, for both flow variants, in `preview-verification/v5/`.
4. White text contrast: report the contrast ratio of each card color against white.
5. Reduced motion: final states, nothing moves.
6. No horizontal page scroll at 390, no console errors or React warnings.
7. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint).
8. Report: files changed, contrast ratios, screenshots, anything you could not follow and why. Do not commit.
