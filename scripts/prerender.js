// Static prerendering for the VIFA Digital SPA (self-contained, puppeteer-only).
//
// Spins up a tiny static server over dist/ with SPA fallback, renders each
// organic-SEO route in headless Chromium, and writes the fully rendered DOM
// (body content + react-helmet-async meta) to static HTML so Googlebot and
// social crawlers get real content without executing JS.
//
// Local build  -> uses the Chromium bundled with `puppeteer`.
// Vercel build -> set PRERENDER_CHROMIUM=sparticuz to use @sparticuz/chromium
//                 (and PUPPETEER_SKIP_DOWNLOAD=true so install stays light).

import { createServer } from 'http';
import { readFileSync, existsSync, mkdirSync, writeFileSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const PORT = 4178;

// Canonical organic pages. The chatbot request form and admin routes are still
// intentionally excluded from indexing.
const ROUTES = [
  '/',
  '/services/web',
  '/services/marketing',
  '/services/ai-chatbot',
  '/inventowms',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

// Industry landing pages — now real indexable money-SEO pages (session 3).
// Keep these arrays in sync with validServices/validSlugs in IndustryLanding.tsx.
const INDUSTRY_SERVICES = ['web', 'marketing'];
const INDUSTRY_SLUGS = ['tourism', 'beauty', 'legal-finance', 'retail', 'food'];
for (const s of INDUSTRY_SERVICES)
  for (const slug of INDUSTRY_SLUGS)
    ROUTES.push(`/industry/${s}/${slug}`);

// Blog posts live in Firestore. At build time we fetch the published slugs via the
// Firestore REST API and prerender each /blog/<slug> so crawlers get static HTML.
const FIREBASE_PROJECT = 'vifa-project';
const FIRESTORE_REST = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT}/databases/(default)/documents/posts?pageSize=300`;

// Network noise to block during prerender (keeps render fast + avoids hangs on
// long-lived firebase / analytics connections).
const BLOCKED = [
  'google-analytics.com', 'googletagmanager.com', 'doubleclick.net',
  'connect.facebook.net', 'facebook.com/tr',
  'firebaseio.com', 'identitytoolkit', 'fonts.googleapis.com/css',
];
// Firestore is blocked for normal routes but ALLOWED while rendering /blog* pages,
// so the Firestore SDK can fetch real post content to bake into the static HTML.
const FIRESTORE_HOST = 'firestore.googleapis.com';

// Fetch published blog slugs from Firestore REST (no SDK/auth; needs public read rules).
// Returns [{ slug, publishedAt }]. Fails soft: on any error the blog is just skipped.
async function fetchPublishedBlogPosts() {
  try {
    const res = await fetch(FIRESTORE_REST);
    if (!res.ok) {
      console.warn(`[prerender] blog: Firestore REST ${res.status} — skipping blog routes`);
      return [];
    }
    const data = await res.json();
    const docs = data.documents || [];
    return docs
      .map((d) => ({
        slug: d.fields?.slug?.stringValue || '',
        status: d.fields?.status?.stringValue || '',
        publishedAt: d.fields?.publishedAt?.stringValue || '',
      }))
      .filter((p) => p.slug && p.status === 'published');
  } catch (e) {
    console.warn('[prerender] blog: Firestore fetch failed — skipping blog routes:', e.message);
    return [];
  }
}

// Splice blog <url> entries into dist/sitemap.xml (copied from public/ by vite build).
function injectBlogSitemap(posts) {
  const sitemapPath = join(distDir, 'sitemap.xml');
  if (!existsSync(sitemapPath)) return;
  let xml = readFileSync(sitemapPath, 'utf-8');
  if (xml.includes('/blog</loc>') || xml.includes('/blog<')) return; // already injected
  const today = new Date().toISOString().slice(0, 10);
  const entry = (loc, lastmod, priority) =>
    `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
  let block = '\n  <!-- Blog (auto-injected by prerender) -->\n';
  block += entry('https://vifadigital.ge/blog', today, '0.8');
  for (const p of posts) {
    block += entry(`https://vifadigital.ge/blog/${p.slug}`, (p.publishedAt || today).slice(0, 10), '0.7');
  }
  xml = xml.replace('</urlset>', `${block}</urlset>`);
  writeFileSync(sitemapPath, xml, 'utf-8');
  console.log(`[prerender] sitemap: injected /blog + ${posts.length} post URL(s)`);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.mp4': 'video/mp4', '.pdf': 'application/pdf',
  '.webmanifest': 'application/manifest+json', '.xml': 'application/xml',
  '.txt': 'text/plain',
};

function startStaticServer() {
  const indexHtml = readFileSync(join(distDir, 'index.html'));
  const server = createServer((req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      let filePath = join(distDir, urlPath);

      if (existsSync(filePath) && statSync(filePath).isFile()) {
        const type = MIME[extname(filePath).toLowerCase()] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': type });
        res.end(readFileSync(filePath));
        return;
      }
      // SPA fallback -> serve the app shell, let the router render the route.
      res.writeHead(200, { 'Content-Type': MIME['.html'] });
      res.end(indexHtml);
    } catch (e) {
      res.writeHead(500);
      res.end('prerender static server error: ' + e.message);
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function resolveBrowser(puppeteer) {
  if (process.env.PRERENDER_CHROMIUM === 'sparticuz') {
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({
      args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
}

async function run() {
  if (!existsSync(join(distDir, 'index.html'))) {
    console.error('[prerender] ERROR: dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const puppeteer = (await import('puppeteer')).default;
  const server = await startStaticServer();
  console.log(`[prerender] static server on http://localhost:${PORT}`);

  // Discover published blog posts from Firestore and add them to the render list.
  const blogPosts = await fetchPublishedBlogPosts();
  if (blogPosts.length) {
    ROUTES.push('/blog');
    for (const p of blogPosts) ROUTES.push(`/blog/${p.slug}`);
    console.log(`[prerender] blog: ${blogPosts.length} published post(s) → prerendering /blog + posts`);
  } else {
    ROUTES.push('/blog'); // still bake the (possibly empty) index
  }

  const browser = await resolveBrowser(puppeteer);
  let failures = 0;

  for (const route of ROUTES) {
    const isBlog = route === '/blog' || route.startsWith('/blog/');
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 900 });
    await page.setRequestInterception(true);
    page.on('request', (r) => {
      const url = r.url();
      // Firestore is allowed only for blog routes (so post content can load + bake).
      if (!isBlog && url.includes(FIRESTORE_HOST)) return r.abort().catch(() => {});
      if (BLOCKED.some((b) => url.includes(b))) r.abort().catch(() => {});
      else r.continue().catch(() => {});
    });

    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });
      // Let React render + react-helmet flush + framer-motion settle.
      await page.evaluate(() => new Promise((r) => setTimeout(r, 5000)));
      // Sanity: wait for the app to have mounted something into #root.
      await page.waitForFunction(
        () => document.querySelector('#root') && document.querySelector('#root').children.length > 0,
        { timeout: 15000 }
      ).catch(() => {});

      // Blog routes load content async from Firestore — the initial paint is a
      // loading state. Wait until that's gone and real content is in the DOM.
      if (isBlog) {
        await page.waitForFunction(
          () => {
            const root = document.querySelector('#root');
            if (!root) return false;
            const txt = root.innerText || '';
            if (txt.includes('იტვირთება') || txt.includes('Loading')) return false;
            return txt.length > 200;
          },
          { timeout: 20000 }
        ).catch(() => {});
      }

      // Strip analytics/pixel scripts that GA/FB useEffects injected into <head>.
      // If left baked into static HTML they fire once on load AND again when React
      // re-injects them on hydration → double GA pageviews / double FB pixel events.
      // Removing them here means the live runtime injects exactly one clean copy.
      await page.evaluate(() => {
        document.querySelectorAll('script').forEach((s) => {
          const src = s.getAttribute('src') || '';
          const txt = s.textContent || '';
          if (
            /googletagmanager\.com|google-analytics\.com|connect\.facebook\.net/.test(src) ||
            /gtag\(|dataLayer|fbq|connect\.facebook\.net/.test(txt)
          ) {
            s.remove();
          }
        });
      });

      let html = await page.content();

      const outFile = route === '/'
        ? join(distDir, 'index.html')
        : join(distDir, route, 'index.html');
      mkdirSync(dirname(outFile), { recursive: true });
      if (!html.toLowerCase().startsWith('<!doctype')) html = '<!DOCTYPE html>\n' + html;
      writeFileSync(outFile, html, 'utf-8');

      const rootLen = await page.evaluate(() => document.querySelector('#root')?.innerHTML.length || 0);
      console.log(`[prerender] ✓ ${route.padEnd(48)} html=${(html.length / 1024).toFixed(0)}kB rootContent=${(rootLen / 1024).toFixed(0)}kB`);
      if (rootLen < 500) {
        console.warn(`[prerender]   ⚠ WARNING: ${route} rendered almost-empty #root (${rootLen} chars)`);
        failures++;
      }
    } catch (e) {
      console.error(`[prerender] ✗ ${route} FAILED: ${e.message}`);
      failures++;
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();

  // Add /blog + post URLs to the deployed sitemap.
  injectBlogSitemap(blogPosts);

  console.log(`[prerender] done. ${ROUTES.length - failures}/${ROUTES.length} routes OK.`);
  if (failures > 0) process.exitCode = 1;
}

run().catch((err) => {
  console.error('[prerender] FATAL:', err);
  process.exit(1);
});
