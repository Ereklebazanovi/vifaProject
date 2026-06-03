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
- **Routes prerendered** (`ROUTES` array): `/`, `/services/web`, `/services/marketing`,
  `/services/ai-chatbot`, `/inventowms`, `/about`, `/contact` (7 routes).
- Intentionally NOT prerendered: `/industry/:service/:slug` (paid ad-landings, not for
  organic), `/services/ai-chatbot/request` (form), admin routes.
- Blocks analytics/firebase network during render (avoids hangs on long-lived connections).
- Waits `domcontentloaded` + 5s + `#root` has children, then snapshots `page.content()`.
- Warns if a route renders an almost-empty `#root` (<500 chars) — sanity guard.
- **Chromium resolution (environment-aware):**
  - Local: uses bundled `puppeteer` Chromium.
  - Vercel: set env `PRERENDER_CHROMIUM=sparticuz` → uses `@sparticuz/chromium`
    (devDependency) executablePath. Also set `PUPPETEER_SKIP_DOWNLOAD=true` so install
    stays light. **Both Vercel env vars are required together.**
- **Verified working live on Vercel** (build log showed `7/7 routes OK`, sparticuz Chromium).

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

## 2. COMPLETED STEPS (the 6-step roadmap)

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
  (auto Home > Current if omitted). Org node includes geo (Tbilisi), address, priceRange,
  areaServed, sameAs, knowsAbout, hasOfferCatalog.
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
4. **Compress 7 in-use large images** (still heavy): `saloni.jpg` (10MB), `restorani.jpg`
   (8.6MB), `statia-2.jpg`→now removed, `eccomerce.jpg` (3.2MB), `practice-hero.webp`
   (1.8MB), `hotelphoto.jpg` (1.2MB). Target: WebP/AVIF, ≤1920px, <250KB each.
   (These are referenced in `src/data/industryData.ts` as `heroBgImage`.)
5. Verify FAQ language toggle on service pages live; run Rich Results Test on
   `vifadigital.ge/services/web` (expect FAQ + Service + Breadcrumb + Organization).

### Code work pending
- **Blog rebuild** (planned): proper CMS-style blog with `react-quill` editor + Firebase
  storage. When rebuilt, add blog post slugs to `scripts/prerender.js` `ROUTES` (or make
  prerender read slugs dynamically) so posts ship as static HTML with `Article` schema.

---

## 5. RECOMMENDATIONS FOR VERY STRONG SEO (future work)

Technical / structural:
- **Per-page OG images (1200×630):** currently all pages use the logo `viffa.png` as
  `og:image`. Design real branded social cards per service → much better CTR on shares.
- **hreflang is weak:** EN is a client-only `?lang=en` state, not a distinct URL. Either
  build real `/en/...` prerendered routes, or drop the `en`/`x-default` hreflang to avoid
  sending Google a false signal. (Currently `SEO.tsx` emits `?lang=en` alternates.)
- **Visible breadcrumbs UI:** breadcrumb is in schema only; add a visible breadcrumb trail
  component on service/sub pages (UX + reinforces the BreadcrumbList).
- **Offer/PriceSpecification schema:** add `Offer` with real prices to the `Service` nodes
  (packages have concrete prices) → eligible for price-rich results.
- **Product/SoftwareApplication schema** for Invento WMS (it's a SaaS product with plans).
- **AggregateRating/Review schema** — only once real reviews exist (never fake it).
- **Make `/industry/:service/:slug` indexable** if those become real content pages — they're
  currently ad-landings excluded from prerender/sitemap. Strong industry-keyword landing
  pages (e.g. "რესტორნის საიტის დამზადება") would be powerful.
- **Georgian font subsetting + preload LCP image** (`hero-desktop.webp`) to cut LCP further.
- **Auto-generate sitemap** from a single routes source of truth (currently hand-maintained
  `public/sitemap.xml`) and automate `lastmod`.
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
| `scripts/prerender.js` | Puppeteer SSG prerender (the core of STEP 2) |
| `src/components/SEO.tsx` | react-helmet meta + `@graph` JSON-LD; props: `faq`, `serviceSchema`, `breadcrumbs` |
| `src/components/FAQSection.tsx` | Reusable visible FAQ accordion (feeds same data to schema) |
| `index.html` | Minimal SPA shell — DO NOT add SEO meta here |
| `vercel.json` | Path redirects + SPA rewrite + cache/security headers (NO host redirects) |
| `public/sitemap.xml`, `public/robots.txt` | 7 real routes, single sitemap |
| `src/App.tsx` | Routes (lazy-loaded) + providers; aliases kept for 308 |
| `src/offeredServices/WebDev.tsx` | `/services/web` — bilingual FAQ, serviceSchema |
| `src/offeredServices/Marketing.tsx` | `/services/marketing` — bilingual FAQ, serviceSchema |
| `src/pages/AIChatbot.tsx` | `/services/ai-chatbot` — existing FAQ → `faqForSchema` |
| `src/offeredServices/InventoLandingPage.tsx` | `/inventowms` — bilingual FAQ, serviceSchema |
| `src/config/siteConfig.ts` | phone, email, social, location |

**Verification commands:**
```bash
npm run build            # tsc + vite + prerender (must end "7/7 routes OK")
# then inspect a prerendered page's JSON-LD:
node -e "const h=require('fs').readFileSync('dist/services/web/index.html','utf8');const m=h.match(/application\/ld\+json[^>]*>(.*?)<\/script>/s);console.log(JSON.parse(m[1])['@graph'].map(n=>n['@type']))"
```

---

_Last updated: 2026-06-04. Status: STEP 1–6 complete + verified locally; STEP 2 verified
live on Vercel. Pending = user manual tasks (§4) + blog rebuild + §5 enhancements._
