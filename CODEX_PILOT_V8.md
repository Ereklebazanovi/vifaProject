# Task: pilot v8, honest copy and a substantial lower half

Read `REDESIGN_PLAN.md` (Georgian; §0 "ვიზუალური ღუზა", §2.A), then the current code in `src/pages/preview/` (v7). Build on it. Same hard rules as before: branch `preview/apple-it`; no commit, push, deploy or `npm run build`; change only `src/pages/preview/` and `public/preview/`; Georgian copy exactly as given; no em or en dashes (if a reused text contains one, replace it with a comma); no `uppercase` on Georgian; no glows, gradients, pulsing badges, emoji, counters; reduced motion shows final states; verification files in `preview-verification/`.

## The owner's feedback on v7

v7 is a clear step forward: colors are back, the industry hero works, mobile hero looks good. Three problems:

1. **Card copy undersells the products.** Each card describes one narrow moment ("გაყიდეთ ერთი და საწყობში ერთით ნაკლები ჩანს" for Invento, "მშობელი აპში ხედავს დასწრებას..." for LineUp, a 2 a.m. restaurant booking for the chatbot). A hub card must say what the thing is and who it is for. Each product's own page already has that positioning; reuse it.
2. **Too minimal?** Visually the minimalism is fine. The lower half is thin in content: after the service grid there is only a text strip and the contact card. A service buyer still asks: how does working with you go, what does it cost, how long, what if I want to change things myself. Answer that with real content, not decoration.
3. **"როგორ ვიწყებთ" is weak** in copy ("სამი ნაბიჯი, ზედმეტი ლოდინის გარეშე" is filler) and in design (plain text columns with `01` monospace indices, a style the plan has dropped).

## 1. Service card copy (replace eyebrow, body and facts; titles stay)

| card | eyebrow | body | facts line |
|---|---|---|---|
| საიტი | სავიზიტო, კორპორატიული, ონლაინ მაღაზია | ვებსაიტი ან ონლაინ მაღაზია ქართული ბანკების გადახდით. ტელეფონზე მორგებული და Google-ისთვის მომზადებული. | 500₾-დან · 1-2 კვირაში |
| AI ჩატბოტი | Messenger · Instagram · WhatsApp | ქართულად და 24/7 პასუხობს კლიენტებს ფასებზე, მიწოდებაზე და ჯავშნებზე. შეკვეთას ნომრით და მისამართით გიტოვებთ. | 500₾-დან · 7-14 დღეში |
| Invento WMS | საწყობის პროგრამა | საქონლის აღრიცხვა, შეკვეთები და ფინანსები ერთ სისტემაში. მაღაზიებისა და ონლაინ ბიზნესისთვის. | 79₾/თვე-დან · 7 დღე უფასოდ |
| LineUp | სპორტული აკადემიის აპი | სპორტული აკადემიის მართვა ერთ აპში: გადახდები, დასწრება და მშობლებთან კავშირი. | ცოცხალი დემო საიტზე |

Sources (so the copy stays consistent with the product pages): Invento's subtitle in `src/offeredServices/InventoLandingPage.tsx`, LineUp's `heroTitle` in `src/components/lineup/content.ts`, the chatbot's `hero.lead` in `src/pages/AIChatbot.tsx`, the website FAQ in `src/offeredServices/WebDev.tsx`. The scenes stay as they are.

## 2. "როგორ ვიწყებთ": rebuild with real artifacts

- h2, two-tone: "როგორ ვიწყებთ." then gray "პირველი მესიჯიდან გაშვებამდე."
- Three cards in a row on desktop, stacked on mobile, 20px gap. Card: `#f5f5f7` (the section is white), radius 28px, no border, no shadow, padding 24px. **Remove the `01` monospace indices and the hairline columns.**
- Each card: a small real-UI artifact at the top (about 180px tall area), then a small eyebrow, the step title (22px, 600) and one line (16px, `#6e6e73`):

| eyebrow | title | line | artifact (built in HTML, white surfaces, 14px radius, the same notification style as the rest of the page) |
|---|---|---|---|
| პირველი ნაბიჯი | მოგვწერეთ | WhatsApp-ში ან ფორმით. პირველი კონსულტაცია უფასოა. | a short chat: customer bubble "გამარჯობა, საიტი მაინტერესებს." (blue, right), reply bubble "გამარჯობა! მოგვიყევით, რა გჭირდებათ." (gray, left) |
| მეორე ნაბიჯი | მიიღეთ შეთავაზება | ზუსტი ფასი და ვადა, თქვენს ბიზნესზე მორგებული. | an offer card: header "შეთავაზება", two rows "სავიზიტო საიტი" / "500₾" and "ვადა" / "1-2 კვირა", a small pill "დადასტურება" in `#0071e3` |
| მესამე ნაბიჯი | ვაწყობთ და ვუშვებთ | სავიზიტო საიტი 1-2 კვირაში, ჩატბოტი 7-14 დღეში. | a mini browser window (empty address pill, no fake domain) with a status chip "საიტი გაშვებულია ✓" |

- Motion: when the section is 50% visible, the three artifacts appear one after another (enter easing, 300ms apart). **Play once, no loop** (the hero carries the looping motion).
- Under the cards, centered: the WhatsApp pill "უფასო კონსულტაცია" (`#0071e3`, white text) with the message "გამარჯობა, მინდა უფასო კონსულტაცია." (`https://wa.me/995557624243?text=` + encoded).

## 3. New: questions (FAQ) before the contact

Answers the service buyer's real questions and later gives the `/it` page indexable text. Reuse existing answers; do not write new claims.

- Section background `#f5f5f7`, 980px column. h2, two-tone: "ხშირი კითხვები." then gray "მოკლე პასუხები."
- An accordion of five items, all closed by default, 1px `#e5e5ea` separators, question 17px weight 500, answer 16px `#6e6e73`, a lucide `Plus` icon that rotates 45° when open (300ms). Opening animates `grid-template-rows` 0fr → 1fr (allowed exception: it is the standard accordion technique; no other layout animation). Real `<button aria-expanded>` elements.
- Questions and answers, copied **verbatim** from the existing pages:
  1. "რა ღირს საიტის დამზადება?" from the website FAQ (`WebDev.tsx`).
  2. "რამდენ ხანში მზადდება ვებსაიტი?" from the website FAQ.
  3. "რამდენ დროს მოითხოვს ჩატბოტის გაშვება?" from the chatbot FAQ (`AIChatbot.tsx`, `faq.q1.answer` + `faq.q1.details`).
  4. "აკეთებთ ონლაინ მაღაზიას ქართული ბანკებით გადახდით?" from the website FAQ.
  5. "შევძლებ ვებსაიტის კონტენტის დამოუკიდებლად მართვას?" from the website FAQ.
- Add `FAQPage` JSON-LD for these five in the page's `<Helmet>` (it is harmless while the page is noindex, and ready for when it becomes `/it`).

## 4. Section order and backgrounds

| # | section | background |
|---|---|---|
| 1 | Hero (industry stage), unchanged | `#ffffff` |
| 2 | All directions (new copy) | `#f5f5f7` |
| 3 | How we start (rebuilt) | `#ffffff` |
| 4 | Questions (new) | `#f5f5f7` |
| 5 | Contact, unchanged content; its card becomes `#f5f5f7` on a white section | `#ffffff` |

## Verification

1. `npm run dev`, `/preview/it` at 1440, 1024 and 390.
2. Screenshots of sections 2 to 5 at 1440 and 390 in `preview-verification/v8/`.
3. The artifacts in "how we start" appear once, in order; reduced motion shows them immediately.
4. Accordion: keyboard (Tab, Enter, Space) works, `aria-expanded` updates, only the answer area animates, no layout jump elsewhere.
5. The FAQ texts match the source pages exactly (except replaced dashes); JSON-LD validates as JSON.
6. No horizontal page scroll, no console errors or React warnings. `npx tsc -p tsconfig.app.json --noEmit` passes (skip ESLint).
7. Report: files changed, screenshots, anything you could not follow and why. Do not commit.
