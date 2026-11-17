# V8 verification

Result: **PASS**. Implemented locally on `preview/apple-it` at `/preview/it`.

## Changes in this iteration

- `src/pages/preview/ITHubPreview.tsx`: replaced all four service descriptions with the supplied positioning, added LineUp's facts line, inserted the questions section and FAQPage JSON-LD, and changed the contact card to `#f5f5f7`.
- `src/pages/preview/HowWeStart.tsx`: rebuilt the three steps with the exact eyebrows, titles and descriptions, HTML chat/offer/browser artifacts, and the free-consultation WhatsApp link. The whole section's 50% visibility starts one sequence, with steps at 0, 300 and 600ms. It never loops or replays on hover or scroll re-entry.
- `src/pages/preview/HubQuestions.tsx` (new): five closed-by-default accordion items with real buttons, controlled answer regions, `aria-expanded`, rotating Plus icons, and 300ms grid-row transitions.
- `src/pages/preview/hubFaqData.ts` (new): the five verbatim source answers and their shared JSON-LD data. The chatbot answer combines `faq.q1.answer` and `faq.q1.details` with a space.
- `src/pages/preview/hubSections.css`: new process cards and artifact styling, FAQ accordion styles, white contact section/footer, and removal of the obsolete monospace indices and hairline process columns.

No files were deleted in V8. The hero, product device scenes, public preview images and contact content were retained. No files outside the permitted preview source directory and verification directory were changed for this iteration.

## Screenshots

| Section | 1440 | 390 |
|---|---|---|
| Services | [Screenshot](1440-services.png) | [Screenshot](390-services.png) |
| How we start | [Screenshot](1440-getting-started.png) | [Screenshot](390-getting-started.png) |
| Questions, closed | [Screenshot](1440-questions.png) | [Screenshot](390-questions.png) |
| Questions, open | [Screenshot](1440-faq-open.png) | [Screenshot](390-faq-open.png) |
| Contact | [Screenshot](1440-contact.png) | [Screenshot](390-contact.png) |

Full pages: [1440](1440-full.png), [1024](1024-full.png), [390](390-full.png). The same section captures are also available at 1024. Captures use reduced motion to show complete artifacts; the separate functional checks exercised normal motion.

## Validation

[Detailed report](report.json), [layout measurements](inspection.json).

- All four card text sets match the V8 table exactly.
- All five FAQ questions and answers match the original Georgian source strings from `WebDev.tsx` and `AIChatbot.tsx`. The test reads those source files independently. The supplied answers contain no em or en dashes requiring substitution.
- FAQPage JSON-LD parses as JSON, contains five Question/Answer entries, and matches the visible FAQ text. The preview remains `noindex,nofollow`.
- At 1440, 1024 and 390: correct section order and backgrounds; three process cards in a row on desktop and stacked on mobile; 180px artifact areas; no card text/device overlap; no page or nested horizontal scrolling.
- The artifacts appeared in order, approximately 300ms apart, once only. Scroll re-entry did not replay them. The measured reveal windows had zero layout shift.
- Tab reaches the FAQ buttons in order. Enter and Space toggle answers and ARIA state. Controlled region IDs and labels match. During opening, only the answer grid rows and the Plus transform animate. Earlier sections retain their positions; the contact section moves by precisely the answer's natural height.
- Reduced motion immediately shows all three artifacts, disables hero auto-advance, and opens answers without transitions at every tested width.
- Free-consultation anchor activation, phone number, target and exact decoded message passed. The external WhatsApp handoff was intercepted, so no external app was opened and no message was sent.
- No console errors or React warnings. Framer Motion's informational reduced-motion notices are retained separately in the report.
- `npx tsc -p tsconfig.app.json --noEmit`: PASS.
- `git diff --check`: PASS.

Reproduction, with `npm run dev -- --host 127.0.0.1` running:

```text
node preview-verification/v8/verify.mjs
node preview-verification/v8/capture.mjs
npx tsc -p tsconfig.app.json --noEmit
git diff --check
```

All requested implementation requirements were followed. ESLint and the production build were skipped as instructed. No dependencies, commits, pushes or deployments were made. The owned development server was stopped after verification.
