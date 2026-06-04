# SEO_HANDOFF.md — VIFA Digital SEO Overhaul

> Handoff document for the next Claude session. Read this fully before touching SEO,
> rendering, routing, domains, or structured data. It captures the architecture,
> everything completed, what was removed, and what remains.

**Primary domain:** `https://vifadigital.ge` (non-www, this is the canonical host)
**Stack:** Vite 7 + React 18.3 + React Router 7 (`BrowserRouter`) + TypeScript + Tailwind v4
**Hosting:** Vercel
**Goal:** Dominate Georgian-market search for: `საიტის დამზადება`, `ვებსაიტის დამზადება`,
`AI ჩატბოტი`, `WMS სისტემა`, plus every service/sub-service on vifadigital.ge.

---

## 1. CURRENT ARCHITECTURE

### Rendering: CSR → build-time SSG prerendering
The app is still a client-side React SPA, BUT at build time we now **prerender every
organic route to static HTML** using a self-contained Puppeteer script. This means
Googlebot and (critically) non-JS social crawlers receive full body content + correct
per-route meta without executing JavaScript.

- **Why not Next.js / vite-react-ssg?** Next.js = full rewrite (rejected). `vite-react-ssg`
  is beta and peer-locks to React Router v6 (project is on v7) — incompatible. We chose a
  **standalone Puppeteer prerender** instead: zero router refactor, real browser (no SSR
  crashes), captures react-helmet-async output as rendered.

### Build pipeline
`package.json` → `"build": "tsc -b && vite build && node scripts/prerender.js"`

1. `tsc -b` — typecheck
2. `vite build` — produces `dist/` (SPA shell `dist/index.html` + hashed `assets/`)
3. `scripts/prerender.js` — boots headless Chromium, serves `dist/` over a tiny static
   server (port 4178) with SPA fallback, renders each route, writes static HTML:
   - `/` → overwrites `dist/index.html` (full Georgian homepage)
   - every other route → `dist/<route>/index.html`

### `scripts/prerender.js` — key facts
- **Routes prerendered** (`ROUTES` array): 7 canonical (`/`, `/services/web`,
  `/services/marketing`, `/services/ai-chatbot`, `/inventowms`, `/about`, `/contact`) +
  10 industry pages (`/industry/{web,marketing}/{tourism,beauty,legal-finance,retail,food}`)
  = **17 routes** (industry pages added session 3, see §2) + `/blog` and every published
  `/blog/<slug>` fetched from Firestore at build (session 4). Total varies with post count.
- Intentionally NOT prerendered: `/services/ai-chatbot/request` (form), `/vifa-studio` (hidden
  editor), draft posts, admin routes.
- Blocks analytics/firebase network during render (avoids hangs on long-lived connections).
- **Analytics script stripping (2026-06-04):** after render, before snapshot, removes any
  GA/FB `<script>` nodes injected by React useEffects. Without this, baked HTML + runtime
  re-injection = double GA pageviews / double FB pixel events. The `preconnect` hint for
  GTM is preserved (harmless, speeds up runtime load).
- Waits `domcontentloaded` + 5s + `#root` has children, then snapshots `page.content()`.
- Warns if a route renders an almost-empty `#root` (<500 chars) — sanity guard.
- **Chromium resolution (environment-aware):**
  - Local: uses bundled `puppeteer` Chromium.
  - Vercel: set env `PRERENDER_CHROMIUM=sparticuz` → uses `@sparticuz/chromium`
    (devDependency) executablePath. Also set `PUPPETEER_SKIP_DOWNLOAD=true` so install
    stays light. **Both Vercel env vars are required together.**
- **Verified working live on Vercel** (build log showed all routes OK, sparticuz Chromium).

### `index.html` (SPA shell) — deliberately minimal
Contains ONLY: charset, viewport, theme-color, favicon/apple-touch/manifest,
facebook-domain-verification, and a fallback `<title>VIFA Digital</title>`.
**No SEO meta is hardcoded here** — all title/description/canonical/OG/Twitter/JSON-LD/
hreflang are injected per-route by `src/components/SEO.tsx` (react-helmet-async) and baked
in by the prerender. Hardcoding meta here previously caused **duplicate + conflicting
canonicals** (every page canonicalized to the homepage). Do not re-add meta here.

### `vercel.json` (current)
- `redirects`: path-level only — `/services/web-development → /services/web` and
  `/services/digital-advertising → /services/marketing` (308 permanent). These are the
  canonical-dedupe redirects (client-side React Router renders them directly; the 301 only
  fires on direct/crawler hits).
- `trailingSlash: false`
- `rewrites`: `/:path* → /index.html` (SPA fallback; only fires when no static file exists,
  so prerendered `dist/<route>/index.html` is served directly by Vercel's filesystem first).
- `headers`: immutable 1y cache for `/assets/*` and static media; `must-revalidate` for
  `*.html`; security headers (HSTS, X-Frame-Options SAMEORIGIN, X-Content-Type-Options,
  Referrer-Policy).
- **Host canonicalization (www/inventogeo) is NOT in vercel.json — it lives in the Vercel
  Dashboard** (see §5). Mixing the two caused an infinite redirect loop earlier.

---

## 2. COMPLETED STEPS (the 6-step roadmap + session 2 work)

### STEP 1 — Domain consolidation
- Single canonical host enforced everywhere: `https://vifadigital.ge` (non-www).
- All domain→domain redirects moved to **Vercel Dashboard** as **308 permanent**:
  `www.vifadigital.ge`, `inventogeo.com`, `www.inventogeo.com` → `vifadigital.ge`.
- `inventogeo.com` is kept attached to the project (not deleted) so the 308 lives and
  Google transfers ranking/link-equity to vifadigital.ge.
- Fixed www/non-www inconsistency across `SEO.tsx`, sitemap, and generated HTML.
- `robots.txt`: removed the inventogeo sitemap; single `Sitemap: https://vifadigital.ge/sitemap.xml`.

### STEP 2 — Prerendering (the headline change)
- Implemented `scripts/prerender.js` (see §1). Result: every organic route ships static
  HTML with full body text + clean per-route meta. **Verified live.**
- Removed the old dual-HTML hack (`index-vifa.html`, `generate-vifa-html.js`).

### STEP 3 — Asset diet (Core Web Vitals)
- Deleted ~85MB of unused assets: `videoHero.mp4` (37MB), `web.original.mp4` (14MB),
  `web.mp4`, plus unused large images (`herophoto1.webp` 9MB, `marketphoto.png` 8.9MB,
  `herophoto12323.jpg`, `dimarco*.jpg`, etc.).
- Removed dead code: `OptimizedVideo.tsx`, `SimpleVideo.tsx`, `utils/preload.ts`,
  `utils/performanceOptimizations.ts`.
- Removed dead Cloudflare cruft: `functions/[[path]].js`, `_headers` (Vercel ignored it —
  caching/security headers moved into `vercel.json`).
- Trimmed fonts: 15 → 12 `@fontsource` weights (dropped weight 300).
- Removed unused deps: `next`, `@types/next`, `express` (−125 npm packages) + dead `start` script.
- Removed phantom `<link rel="preload" href="/fonts/main.woff2">` (404) from `SEO.tsx`.

### STEP 4 — Route & sitemap hygiene
- Fixed homepage `SEO url="https://inventogeo.com"` → `https://vifadigital.ge/`.
- Canonical dedupe: `/services/web` & `/services/marketing` are canonical; aliases
  `web-development` / `digital-advertising` 308-redirect to them (vercel.json) and their
  `SEO url` props now match the canonical.
- Regenerated `public/sitemap.xml` from the real 7 routes (removed phantom
  `/start-project`, `/privacy`, `/terms` that don't exist; removed blog).
- **Route-level code splitting:** `App.tsx` now lazy-loads all non-home routes via
  `React.lazy` + `Suspense`. Main entry chunk dropped **311KB → 71KB**. Prerender still
  captures full content (Puppeteer waits for lazy chunks).

### STEP 5 — Structured data (`src/components/SEO.tsx`)
- Replaced the flat single-`Organization` blob with a connected **`@graph`**:
  `Organization`+`ProfessionalService` (`#organization`) ↔ `WebSite` (`#website`) ↔
  `WebPage` ↔ `BreadcrumbList` ↔ `Service` ↔ `FAQPage`.
- New `SEO` props: `serviceSchema` (per service page), `faq` (FAQPage), `breadcrumbs`
  (auto Home > Current if omitted), `softwareApplication` (SaaS product pages).
- Org node includes geo (Tbilisi), address, priceRange, areaServed, sameAs, knowsAbout,
  hasOfferCatalog.
- **Removed ~20 zombie meta tags** (`revisit-after`, `distribution`, `rating`,
  `classification`, `directory:submission`, `coverage`, `HandheldFriendly`, itemProp×3,
  duplicate viewport/theme-color/Content-Type, contact/reply-to, etc.).
- Service schema added to all 4 service pages with Georgian keyword-rich names.

### STEP 6 — FAQ sections + FAQPage schema (keyword landing)
- New reusable component `src/components/FAQSection.tsx`: accessible accordion, card-based
  design with number badges, rotating chevron, indigo accent on open, grid-rows height
  animation (doesn't clip long answers). The SAME items feed both the visible UI and the
  `<SEO faq={...}>` schema (Google requires FAQ schema to match visible content).
- **Bilingual FAQ** (`{ ka: [...], en: [...] }`, selected by `currentLanguage`) on:
  `WebDev.tsx`, `Marketing.tsx`, `InventoLandingPage.tsx`. Content built from REAL
  pricing/features on each page (e.g. WebDev: 500₾ / 700-1000₾ / 1400₾; WMS: 79₾ / 750₾ /
  1999₾; AI: 300₾ setup + 0.20-0.40₾/1k tokens).
- **AI Chatbot page** (`AIChatbot.tsx`) already had its own visible FAQ (`faq.q1..q5`
  translations, bilingual). We did NOT add a duplicate FAQSection there — instead we build
  `faqForSchema` from those existing translations (`question` + `answer` + `details`) and
  pass it to `<SEO faq={faqForSchema}>`. So its existing FAQ is now SEO-optimized.

### SESSION 2 — Schema fixes + analytics dedup + breadcrumbs (2026-06-04)

#### 2a — Canonical/hreflang bug fix
- **Bug:** `finalCanonicalUrl` in `SEO.tsx` was `isKa ? base : base?lang=en` — canonical
  changed based on client-side language toggle. Fixed: canonical is ALWAYS the clean
  query-stripped URL, independent of language state.
- Dropped all `ka`/`en`/`x-default` hreflang `<link>` tags. EN is a client-only
  `?lang=en` state, not a distinct prerendered route — these were false signals to Google.
  Re-add hreflang only when real prerendered `/en/...` routes exist.

#### 2b — Offer/AggregateOffer schema
- Added `offers` prop to `serviceSchema` (and `softwareApplication`) in `SEO.tsx`.
  Each service `Service` node now emits an `AggregateOffer` with `lowPrice`/`highPrice`
  + per-package `Offer` items using real visible prices (GEL):
  - **Web:** 300–1400₾ (Landing 500 / CMS 700–1000 / AI 300 / eCommerce 1400)
  - **Marketing:** 1000–2000₾ (Standard/Pro/Premium)
  - **AI Chatbot:** 300₾ (setup)
  - **WMS:** 79–1999₾ (Monthly/Annual/eCommerce Bundle — as `SoftwareApplication`)

#### 2c — Invento WMS → SoftwareApplication
- Added `softwareApplication` prop to `SEO.tsx` emitting a `SoftwareApplication` @graph
  node (`applicationCategory: BusinessApplication`, `operatingSystem: Web`).
- `/inventowms` now uses `softwareApplication` instead of `serviceSchema` — a licensed
  SaaS product is more accurately a SoftwareApplication than a Service.
- Shared `OfferInput` type + `buildOffers()` helper reused by both node types.

#### 2d — Analytics double-fire fix (`scripts/prerender.js`)
- GA (`GoogleAnalytics.tsx`) and FB Pixel (`FacebookPixel.tsx`) inject `<script>` tags via
  `useEffect`. The prerender baked those into static HTML. On load: fire once from baked
  HTML, then React re-injects → **double GA pageviews + double FB pixel events**.
- Fix: prerender strips any gtag/dataLayer/fbq/connect.facebook.net `<script>` nodes from
  the DOM **after render, before snapshot**. Runtime injects exactly one clean copy.
  Preconnect hints and JSON-LD are preserved.
- Verified: 0 analytics `<script>` tags in baked HTML across all 7 routes.

#### 2e — fbq guard in `facebookPixel.ts`
- Added `typeof window.fbq === 'function'` guard on the `init`/`PageView` calls in
  `loadPixelScript()` — the one spot that was unguarded. Prevents console errors when
  fbq is blocked by ad-blockers or during prerender.

#### 2f — Visible breadcrumbs (`src/components/Breadcrumbs.tsx`)
- New reusable `Breadcrumbs` component: desktop (sm+) shows full trail with `›` chevrons;
  mobile (<sm) collapses to `‹ Parent` back-link (3 Georgian labels don't fit one line).
- Wired into all 4 service pages (WebDev, Marketing, AIChatbot, InventoWMS) with short
  labels matching the BreadcrumbList schema exactly (Google requirement):
  - `مثالی › ვებ დეველოპმენტი`
  - `მThavari › ციფრული მარკეტინგი`
  - `მThavari › AI ჩატბოტი`
  - `მThavari › საწყობის პროგრამა`
- **Verified:** schema labels === visible labels in baked HTML on all 4 pages.
- Also wired into `IndustryLanding.tsx` for 3-level trail:
  `მThavari › <Service> › <Industry>` — web service uses Web Dev crumb, marketing uses
  Marketing crumb. Visible-only (industry pages are noindex ad-landings, no schema needed).

#### 2g — Navbar cleanup
- Removed "მThavari" link (VIFA logo serves as home nav). Renumbered 01–05.
- Added `04/ AI ჩატბოტი → /services/ai-chatbot` and
  `05/ საწყობის პროგრამა → /inventowms` to desktop + mobile nav.
- Pushed all breakpoints `lg:` → `xl:` (1280px) to prevent horizontal overflow from wide
  Georgian labels with `tracking-widest` at 1024px.

### SESSION 3 — Industry landing pages → indexable money-SEO pages (2026-06-04)

The headline §5 high-impact item. The 10 `/industry/:service/:slug` pages were paid
ad-landings with **no `<SEO>` at all** (no per-page meta, excluded from prerender/sitemap).
Converted all 10 (web + marketing × tourism/beauty/legal-finance/retail/food) into real
indexable organic pages. URL scheme kept unchanged (ad campaigns rely on it).

#### 3a — `industryData.ts`: content fields on `IndustryConfig`
- New required fields per niche: `seoTitleKa/En`, `seoDescriptionKa/En`, `introKa/En`,
  `contentSections: ContentSection[]` (2 deep H2 blocks each), `faqKa/En: FAQItem[]` (3–4 Q&A).
- New `ContentSection` interface exported. `FAQItem` imported from `FAQSection`.
- Content authored from the REAL packages/prices already in the file (50/50 split, GEL
  prices, WMS integration, etc.) so FAQ schema === visible content.
- Keyword targets: web/food=`რესტორნის საიტის დამზადება`, web/beauty=`სალონის ვებსაიტი`,
  web/tourism=`სასტუმროს საიტის დამზადება`, web/legal-finance=`იურიდიული კომპანიის საიტი`,
  web/retail=`ონლაინ მაღაზიის დამზადება`; marketing niches mirror with `მარკეტინგი`/`რეკლამა`.

#### 3b — `IndustryLanding.tsx`: SEO + content render
- Added `<SEO>` with per-niche `title`/`description`, `serviceSchema` (name/description +
  `offers` built from `config.packages`), 3-level `breadcrumbs`, and `faq`. No `noindex`
  existed; `SEO.tsx` emits `index, follow` by default → adding `<SEO>` makes them indexable.
- `breadcrumbItems` switched to **absolute URLs** (`https://vifadigital.ge/...`) to match
  `WebDev.tsx` convention; visible `Breadcrumbs` still renders via `toPath()`.
- Offers helper `buildOffers()` parses GEL price strings (`"₾ 700 - 1000"` → min/max,
  `"₾ 1500 +"` → price); EUR (`€`) defaults skipped to avoid currency mixing.
- New `IndustryContent` component renders intro (lead) + `contentSections` (H2) + the
  previously-unused `approach` + `features` grid (both web and marketing variants now get it).
- New `RelatedLinks` component: internal-link cluster → parent service + 4 sibling industries.
- Reuses `FAQSection` (visible accordion) with the same `faq` items passed to schema.

#### 3c — prerender + sitemap
- `scripts/prerender.js`: `INDUSTRY_SERVICES × INDUSTRY_SLUGS` loop pushes the 10 routes →
  **17 total** (`17/17 routes OK`). Arrays must stay in sync with `validServices`/`validSlugs`.
- `public/sitemap.xml`: 10 industry URLs added (`changefreq monthly`, `priority 0.8`).

### SESSION 4 — Blog rebuilt: Firestore CMS + hidden editor + build-time prerender (2026-06-04)

The §4 "blog rebuild" + §5 content-engine item. Blog content lives in **Firestore** (`posts`
collection), authored via a **hidden, unlinked editor** (`/vifa-studio`, react-quill-new,
no auth) — and is wired into the SAME Puppeteer prerender so posts ship as static HTML.

#### 4a — Data + service
- `src/types/blog.ts` (`BlogPost`), `src/service/blogService.ts` (Firestore CRUD, mirrors
  `leadService.ts`). `getPublishedPosts` sorts client-side (single-field `where`) to avoid a
  composite index. `slugify()` keeps Georgian letters.

#### 4b — Pages (`src/pages/blog/`)
- `BlogIndex.tsx` (`/blog`): published-post grid, SEO + breadcrumb, links into service pages.
- `BlogPost.tsx` (`/blog/:slug`): fetch by slug, render `contentHtml` via **DOMPurify**
  (XSS-safe — writes are open), `<SEO type="article" articleMeta image>` → Article schema
  (reused existing support in `SEO.tsx`). `.blog-prose` styles (in `index.css`) + `.font-georgian-body`.
  Unknown slug → 404. CTA → /services/web + /contact.
- `BlogEditor.tsx` (`/vifa-studio`): react-quill-new editor, create/edit/delete, optional
  passphrase const + optional "Rebuild site" button (`VITE_VERCEL_DEPLOY_HOOK`). Standalone
  route (outside Layout — no navbar/footer). Routes lazy-loaded in `App.tsx`.

#### 4c — Prerender integration (the SEO core) — `scripts/prerender.js`
- Build-time `fetchPublishedBlogPosts()` hits the Firestore **REST** API, adds `/blog` +
  each `/blog/<slug>` to `ROUTES`. Firestore host is **un-blocked only for blog routes** so the
  SDK can load real content; blog routes get an extra wait (loading-state gone + content > 200ch)
  before snapshot. `injectBlogSitemap()` splices `/blog` + post URLs into `dist/sitemap.xml`.
- **Fails soft:** if Firestore read is denied/unreachable, blog routes are skipped (build still
  green). Currently returns **403 until Firestore rules allow public read on `posts`** (§4 task).

#### 4d — Bundle isolation (`vite.config.ts`)
- quill + its exclusive deps (parchment, quill-delta, eventemitter3, lodash-es, …) → **`editor`
  chunk** (only the lazy /vifa-studio route loads it); dompurify → **`sanitize`** chunk (blog
  posts only). Verified homepage references neither → no site-wide CWV regression from the editor.
- Footer: added a `/blog` quick link (crawlable entry point).

#### 4e — Tradeoff + security (by design, user-approved)
- A new post is live immediately (client-rendered) but gets **static SEO HTML only after the
  next deploy** (rebuild). "Rebuild site" button or Vercel Redeploy triggers it.
- No auth + open Firestore writes (same mode as `leads`): editor at an obscure path. **Firestore
  rules must allow public read on `posts` (site + prerender) and write (editor).**

---

## 3. CLEANUPS / REMOVALS

- **Blog fully deleted** (was hardcoded/unprofessional, to be rebuilt — see §4):
  `BlogPage.tsx`, `BlogPostPage.tsx`, `utils/blogUtils.ts`, `types/blog.ts`, `src/blogs/*.md`,
  `scripts/generate-blog-pages.js`, blog images (`statia-1/2/3.jpg`), `/blog` + `/blog/:slug`
  routes in `App.tsx`, the navbar "ბლოგი/BLOG" item, and blog entries from prerender.
- Duplicate/conflicting canonicals fixed (root cause: meta hardcoded in `index.html` +
  helmet both emitting → stripped `index.html` to a minimal shell).
- Zombie meta tags removed (STEP 5).
- `inventogeo.com` URLs purged from live code (homepage SEO, AIChatbot SEO, InventoWMS SEO,
  blog generator). Domain itself kept only as a 308 source.

---

## 4. NEXT STEPS / PENDING

### User manual tasks (outside code)
1. **Vercel Dashboard → Domains:** confirm `vifadigital.ge` = Production (serves content),
   and `www.vifadigital.ge` + `inventogeo.com` + `www.inventogeo.com` = **308 Permanent
   Redirect → vifadigital.ge**. (Earlier they were 307 / reversed — must be 308 to vifadigital.)
2. **Vercel env vars:** `PRERENDER_CHROMIUM=sparticuz` and `PUPPETEER_SKIP_DOWNLOAD=true`
   (Production + Preview). Required for the prerender build to succeed on Vercel.
3. **Google Search Console:** add `vifadigital.ge`, submit `sitemap.xml`, and do
   "Change of Address" from the inventogeo property → vifadigital.ge.
4. **Run Rich Results Test** on the 4 service pages live:
   - `vifadigital.ge/services/web` — expect BreadcrumbList + Service + Organization
   - `vifadigital.ge/services/marketing` — same
   - `vifadigital.ge/services/ai-chatbot` — same + FAQPage
   - `vifadigital.ge/inventowms` — SoftwareApplication + Organization
   - **Note:** FAQ rich results no longer shown in SERP (Google deprecated Aug 2023 for
     non-health/gov), Service price rich results not visual either — both still valuable
     as entity signals. Only Organization/Logo is currently a visual rich result.

### Blog — user manual tasks (REQUIRED for the blog to work — session 4)
1. **Firestore security rules** — the blog is dead until `posts` is readable. In Firebase
   console → Firestore → Rules, allow public **read** on `posts` (needed by the live site AND
   the build-time prerender REST fetch — currently returns 403) and, since there's no auth,
   **write** on `posts` (for the `/vifa-studio` editor). Example:
   `match /posts/{id} { allow read: if true; allow write: if true; }`
   (Same open mode as the existing `leads` collection. Tighten later if desired.)
2. **(Optional) Vercel Deploy Hook** — create one in Vercel → set env `VITE_VERCEL_DEPLOY_HOOK`
   so the editor's "Rebuild site" button can trigger a static rebuild after publishing.
3. After publishing posts: **redeploy** (button or Vercel) so posts get prerendered, then
   submit the updated `sitemap.xml` in GSC and Request-Index the new `/blog/<slug>` URLs.

### Code work pending
- Blog image upload to Firebase Storage (v1 uses image URLs). Per-post OG images.

---

## 5. RECOMMENDATIONS FOR VERY STRONG SEO (future work, prioritized)

### 🔴 High impact

- ~~**Make `/industry/:service/:slug` indexable**~~ **DONE (2026-06-04, session 3).** All 10
  industry pages (2 services × 5 niches) are now real indexable content pages with keyword-rich
  meta, 500+ words of Georgian content (H1/H2), `Service`+`BreadcrumbList`+`FAQPage` schema,
  visible FAQ, and an internal-link cluster. See SESSION 3 below.

- **Per-page OG images (1200×630):** currently all pages use the logo `viffa.png` as
  `og:image`. Design real branded social cards per service → much better CTR on shares.

### 🟡 Medium impact

- **AggregateRating/Review schema** — only once real reviews exist (never fake it).
  When ready: add `aggregateRating` to the `Organization` + `Service` nodes.

- **Georgian font subsetting + preload LCP image** to cut LCP further.

- **Auto-generate sitemap** from a single routes source of truth (currently hand-maintained
  `public/sitemap.xml`) and automate `lastmod`.

### 🟢 Low impact / housekeeping

- ~~**hreflang:**~~ **DONE.** Re-add only when real `/en/...` prerendered routes exist.
- ~~**Offer/PriceSpecification schema:**~~ **DONE (2026-06-04).**
- ~~**SoftwareApplication schema for WMS:**~~ **DONE (2026-06-04).**
- ~~**Visible breadcrumbs UI:**~~ **DONE (2026-06-04).**
- **Reintroduce three.js/canvas backgrounds only via `ClientOnly`/lazy** if needed — they
  are currently NOT in the routed tree (good; keep them out of the critical path).

Content / authority (the real ranking lever):
- Dedicated, deep landing pages per target keyword with 500+ words, H1/H2 structure,
  internal links, and the FAQ blocks already in place.
- Topical clusters once the blog is rebuilt (cornerstone + supporting articles, internal
  linking back to service pages).
- Build backlinks / Google Business Profile / local citations (LocalBusiness signals).

---

## 6. KEY FILES MAP

| File | Role |
|---|---|
| `scripts/prerender.js` | Puppeteer SSG prerender — strips analytics scripts before snapshot |
| `src/components/SEO.tsx` | react-helmet meta + `@graph` JSON-LD; props: `faq`, `serviceSchema`, `softwareApplication`, `breadcrumbs`, `offers` |
| `src/components/FAQSection.tsx` | Reusable visible FAQ accordion (feeds same data to schema) |
| `src/components/Breadcrumbs.tsx` | Visible breadcrumb trail — desktop full, mobile back-link; used on all 4 service pages + industry landings |
| `index.html` | Minimal SPA shell — DO NOT add SEO meta here |
| `vercel.json` | Path redirects + SPA rewrite + cache/security headers (NO host redirects) |
| `public/sitemap.xml`, `public/robots.txt` | 7 real routes, single sitemap |
| `src/App.tsx` | Routes (lazy-loaded) + providers; aliases kept for 308 |
| `src/layout/SimpleNavbar.tsx` | Nav — xl: breakpoint (1280px) for desktop, AI Chatbot + WMS links added |
| `src/offeredServices/WebDev.tsx` | `/services/web` — bilingual FAQ, serviceSchema + offers, breadcrumbs |
| `src/offeredServices/Marketing.tsx` | `/services/marketing` — bilingual FAQ, serviceSchema + offers, breadcrumbs |
| `src/pages/AIChatbot.tsx` | `/services/ai-chatbot` — existing FAQ → `faqForSchema`, serviceSchema + offers, breadcrumbs |
| `src/offeredServices/InventoLandingPage.tsx` | `/inventowms` — bilingual FAQ, softwareApplication + offers, breadcrumbs |
| `src/pages/landing/IndustryLanding.tsx` | `/industry/:service/:slug` — indexable money-SEO pages: `<SEO>` (serviceSchema+offers+faq+3-level breadcrumbs), `IndustryContent`, `RelatedLinks` |
| `src/data/industryData.ts` | 10 niches × `IndustryConfig` — incl. SEO content fields (`seoTitle/Description`, `intro`, `contentSections`, `faq`) per niche |
| `src/pages/blog/BlogIndex.tsx` | `/blog` — published-post grid (Firestore), SEO + breadcrumb |
| `src/pages/blog/BlogPost.tsx` | `/blog/:slug` — DOMPurify-sanitized HTML + Article schema |
| `src/pages/blog/BlogEditor.tsx` | `/vifa-studio` — hidden react-quill-new editor, Firestore CRUD |
| `src/service/blogService.ts`, `src/types/blog.ts` | Firestore `posts` CRUD + `BlogPost` type |
| `src/config/siteConfig.ts` | phone, email, social, location |
| `src/utils/facebookPixel.ts` | FB Pixel manager — all fbq calls guarded with typeof check |

**Verification commands:**
```bash
npm run build            # tsc + vite + prerender (ends "N/N routes OK"; N = 17 + 1 /blog + posts)

# Inspect JSON-LD @graph types on a prerendered page:
node -e "const h=require('fs').readFileSync('dist/services/web/index.html','utf8');const m=h.match(/application\/ld\+json[^>]*>(.*?)<\/script>/s);console.log(JSON.parse(m[1])['@graph'].map(n=>n['@type']))"

# Verify no analytics scripts baked in (should all be 0):
node -e "const fs=require('fs');['','services/web','inventowms'].forEach(r=>{const h=fs.readFileSync('dist/'+(r?r+'/':'')+'index.html','utf8');console.log(r||'/',  'gtag:', (h.match(/gtag\(/g)||[]).length, 'fbq:', (h.match(/fbq=function/g)||[]).length)})"

# Verify breadcrumb schema === visible on all 4 service pages:
node -e "const fs=require('fs');for(const r of ['services/web','services/marketing','services/ai-chatbot','inventowms']){const h=fs.readFileSync('dist/'+r+'/index.html','utf8');const g=JSON.parse(h.match(/application\/ld\+json[^>]*>(.*?)<\/script>/s)[1])['@graph'];const bc=g.find(n=>n['@type']==='BreadcrumbList');console.log(r,bc.itemListElement.map(x=>x.name))}"
```

---

_Last updated: 2026-06-04. Status: STEP 1–6 + Sessions 2, 3, 4 complete. Session 3 = 10
industry money-SEO pages. Session 4 = Firestore blog + hidden /vifa-studio editor + build-time
prerender. Pending = user manual tasks (§4: **Firestore rules for `posts`** [blog is 403 until
done], GSC sitemap re-submit + index new industry/blog URLs) + remaining §5 items (per-page OG
images, blog Storage image upload)._
