//IndudsryLanding.tsx
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import foodPhotos from "../../data/galleries/food.json";
import { useLanguage } from "../../contexts/LanguageContext";
import Breadcrumbs, { type Crumb } from "../../components/Breadcrumbs";
import SEO from "../../components/SEO";
import FAQSection from "../../components/FAQSection";
import { getIndustryShowcases } from "../../components/ui/industryShowcases";
import { WebIndustryContent } from "./WebIndustryContent";
import {
  industryData,
  type BilingualPricingTier,
  type IndustryConfig,
} from "../../data/industryData";

/** A priced package -> Offer input (GEL). Parses "₾ 700 - 1000" / "₾ 1500 +" / "€799". */
type OfferInput = { name: string; price?: number; minPrice?: number; maxPrice?: number };
function tierToOffer(tier: BilingualPricingTier): OfferInput {
  const nums = (tier.price.match(/\d[\d,]*/g) || []).map((n) => Number(n.replace(/,/g, "")));
  if (nums.length >= 2) return { name: tier.nameEn, minPrice: nums[0], maxPrice: nums[1] };
  if (nums.length === 1) return { name: tier.nameEn, price: nums[0] };
  return { name: tier.nameEn };
}
/** Only GEL-priced offers carry numbers; EUR defaults (€) are skipped to avoid mixing currencies. */
function buildOffers(packages: BilingualPricingTier[]): OfferInput[] {
  return packages
    .filter((t) => t.price.includes("₾"))
    .map(tierToOffer)
    .filter((o) => o.price != null || o.minPrice != null);
}

// ─── Custom Icons ─────────────────────────────────────────────────────────────

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// ─── Animation variants ───────────────────────────────────────────────────────

const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const validServices = new Set(["web", "marketing"]);
const validSlugs = new Set(["tourism", "beauty", "legal-finance", "retail", "food"]);

// ─── Sub-components ───────────────────────────────────────────────────────────

// ─── Marketing Service Section ────────────────────────────────────────────────

function MarketingServiceSection({ data, ka, heroBgImage, breadcrumbs }: { data: BilingualPricingTier; ka: boolean; heroBgImage?: string; breadcrumbs: Crumb[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  const whatsappMessage = ka
    ? `გამარჯობა, მაინტერესებს მარკეტინგული მომსახურების პირობების შესახებ.`
    : `Hello, I would like to learn more about your marketing services.`;

  const features = ka ? data.featuresKa : data.featuresEn;

  return (
    <section id="pricing" className="relative bg-[#060608] flex items-center min-h-screen py-14 !mt-16 overflow-hidden">
      {/* Background image — blurred & dimmed */}
      {heroBgImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{ backgroundImage: `url(${heroBgImage})` }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#060608] via-[#060608]/70 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-[#060608] via-[#060608]/30 to-transparent" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-5xl px-5 lg:px-8">
        <motion.div
          ref={ref}
          variants={sectionReveal}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-10 md:grid-cols-[5fr_6fr] md:gap-16 lg:gap-20"
        >
          {/* ── Left: price, desc, CTA ── */}
          <div className="flex flex-col gap-5">
            <Breadcrumbs items={breadcrumbs} className="-mb-1" />
            <div className="flex items-center gap-3">
              <div className="h-px w-6 bg-indigo-500" />
              <span className="text-[11px] md:text-[13px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                {ka ? data.nameKa : data.nameEn}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-black tracking-tight text-white">
                {data.price}
              </span>
              <span className="text-sm md:text-base font-medium text-gray-500">
                {ka ? data.periodKa : data.periodEn}
              </span>
            </div>

            <p className="font-georgian-body text-[14px] md:text-[16px] leading-relaxed text-gray-400">
              {ka ? data.descKa : data.descEn}
            </p>

            <a
              href={`https://wa.me/995577175132?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-600 px-6 py-3.5 text-[14px] md:text-[15px] font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98] md:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span>{ka ? data.ctaKa : data.ctaEn}</span>
            </a>
          </div>

          {/* ── Right: feature list ── */}
          <div className="border-t border-white/8 md:border-t-0 md:border-l md:pl-12 lg:pl-16">
            <ul className="divide-y divide-white/6 pt-8 md:pt-0">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3.5 py-3.5 first:pt-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                  <span className="font-georgian-body text-[14px] md:text-[16px] leading-relaxed text-gray-300">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Photo strip (our own shoots) ──────────────────────────────────────────────

interface GalleryPhoto {
  src: string;
  srcSm: string;
  w: number;
  h: number;
  altKa: string;
  altEn: string;
  isVideo?: boolean;
}

const foodReel: GalleryPhoto = {
  src: "/gallery/food/reel.mp4",
  srcSm: "/gallery/food/reel-poster.webp",
  w: 720,
  h: 1280,
  altKa: "კერძების და სუშის მომზადების ვიდეო",
  altEn: "Food and sushi preparation video",
  isVideo: true,
};

function AutoLoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    const ensurePlay = () => {
      v.muted = true;
      if (v.paused) v.play().catch(() => {});
    };
    ensurePlay();
    v.addEventListener("loadedmetadata", ensurePlay);
    v.addEventListener("loadeddata", ensurePlay);
    v.addEventListener("canplay", ensurePlay);
    v.addEventListener("pause", ensurePlay);
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) ensurePlay();
    });
    io.observe(v);
    return () => {
      v.removeEventListener("loadedmetadata", ensurePlay);
      v.removeEventListener("loadeddata", ensurePlay);
      v.removeEventListener("canplay", ensurePlay);
      v.removeEventListener("pause", ensurePlay);
      io.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
    />
  );
}

// Made by scripts/gallery.mjs from photos/<name>/ (see that script). Keyed by "service/slug".
const GALLERIES: Record<string, GalleryPhoto[]> = { "marketing/food": [foodReel, ...foodPhotos] };

/** One compact row that scrolls sideways; a photo opens full screen. Link here with #photos. */
function PhotoStrip({ photos, ka }: { photos: GalleryPhoto[]; ka: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const row = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);

  // vifadigital.ge/...#photos lands here. Layout scrolls every new page to the top after
  // its children mount, so wait for that first.
  useEffect(() => {
    if (window.location.hash !== "#photos") return;
    const t = setTimeout(() => section.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 350);
    return () => clearTimeout(t);
  }, []);

  const scroll = (dir: 1 | -1) => row.current?.scrollBy({ left: dir * row.current.clientWidth * 0.8, behavior: "smooth" });
  // The row lines up with the page's content column, then runs to the screen edge.
  const edge = "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))";
  const arrow = "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10";

  return (
    <section ref={section} id="photos" className="relative scroll-mt-20 bg-[#060608] py-14 md:py-20">
      <div className="mx-auto mb-6 flex w-[min(100%,80rem)] items-end justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
            <span className="h-px w-8 bg-indigo-500" />
            {ka ? "ფოტოგადაღება" : "Food Photography"}
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white md:text-[1.75rem]">
            {ka ? "ფოტო-გალერეა" : "Our Shoots"}
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} className={arrow} aria-label={ka ? "წინა ფოტოები" : "Previous photos"}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scroll(1)} className={arrow} aria-label={ka ? "შემდეგი ფოტოები" : "Next photos"}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={row}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ paddingLeft: edge, paddingRight: edge, scrollPaddingLeft: edge }}
      >
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative h-55 shrink-0 snap-start overflow-hidden rounded-xl bg-white/5 md:h-75"
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
            aria-label={`${ka ? p.altKa : p.altEn}. ${ka ? "გადიდება" : "Open"}`}
          >
            {p.isVideo ? (
              <AutoLoopVideo
                src={p.src}
                poster={p.srcSm}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <img
                src={p.srcSm}
                alt={ka ? p.altKa : p.altEn}
                width={p.w}
                height={p.h}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
          </button>
        ))}
      </div>

      {open !== null && <PhotoViewer photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} ka={ka} />}
    </section>
  );
}

/**
 * Full-screen view. The photos sit in one row that the browser itself scrolls, one photo per
 * snap, so a swipe is native and smooth; arrows and ← → move the same row. While the page is
 * pinch-zoomed the row stops scrolling, so looking closer never jumps to another photo.
 */
function PhotoViewer({ photos, index, onIndex, onClose, ka }: { photos: GalleryPhoto[]; index: number; onIndex: (i: number) => void; onClose: () => void; ka: boolean }) {
  const p = photos[index];
  const n = photos.length;
  const track = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);

  // Open on the photo that was tapped, with no animation (only on open, not on every index change).
  const openedAt = useRef(index);
  useLayoutEffect(() => {
    const el = track.current;
    if (el) el.scrollLeft = openedAt.current * el.clientWidth;
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    if (el && i >= 0 && i < n) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // The counter and the caption follow the row.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const i = Math.min(n - 1, Math.max(0, Math.round(el.scrollLeft / el.clientWidth)));
    if (i !== index) onIndex(i);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // The browser's own pinch zoom: freeze the row while zoomed in.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const check = () => setZoomed(vv.scale > 1.01);
    vv.addEventListener("resize", check);
    return () => vv.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = before;
    };
  }, []);

  const side = "absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:flex";

  return (
    <div role="dialog" aria-modal="true" aria-label={ka ? "ფოტოები" : "Photos"} className="fixed inset-0 z-200 bg-black">
      <div
        ref={track}
        onScroll={onScroll}
        className="flex h-full snap-x snap-mandatory overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ overflowX: zoomed ? "hidden" : "auto" }}
      >
        {photos.map((ph, i) => (
          // A tap beside the photo closes; a tap on it doesn't.
          <div key={ph.src} className="flex h-full w-full shrink-0 snap-center snap-always items-center justify-center" onClick={onClose}>
            {ph.isVideo ? (
              <video
                src={ph.src}
                poster={ph.srcSm}
                autoPlay
                loop
                muted
                playsInline
                controls
                style={{ maxWidth: "92vw", maxHeight: "84vh" }}
                className="h-auto w-auto rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <img
                src={ph.src}
                alt={ka ? ph.altKa : ph.altEn}
                width={ph.w}
                height={ph.h}
                loading={Math.abs(i - index) <= 1 ? "eager" : "lazy"}
                decoding="async"
                // Inline: the site's global `* { max-width: 100% }` beats Tailwind's max-w classes.
                style={{ maxWidth: "92vw", maxHeight: "84vh" }}
                className="h-auto w-auto rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </div>
        ))}
      </div>
      <p className="absolute left-5 top-5 text-sm font-medium tabular-nums text-white/70">
        {index + 1} / {n}
      </p>
      <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label={ka ? "დახურვა" : "Close"}>
        <X className="h-5 w-5" />
      </button>
      {index > 0 && (
        <button type="button" onClick={() => goTo(index - 1)} className={`${side} left-4`} aria-label={ka ? "წინა" : "Previous"}>
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      {index < n - 1 && (
        <button type="button" onClick={() => goTo(index + 1)} className={`${side} right-4`} aria-label={ka ? "შემდეგი" : "Next"}>
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
      <p className="font-georgian-body pointer-events-none absolute bottom-5 left-1/2 w-[min(90vw,40rem)] -translate-x-1/2 text-center text-sm text-white/70">
        {ka ? p.altKa : p.altEn}
      </p>
    </div>
  );
}

// ─── Organic SEO Content (intro + H2 sections + approach + features) ──────────

function IndustryContent({ config, ka }: { config: IndustryConfig; ka: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0 });

  // Merge the deep SEO sections with the existing approach block into one prose list.
  const sections = [
    ...config.contentSections,
    {
      headingKa: config.approach.headingKa,
      headingEn: config.approach.headingEn,
      bodyKa: config.approach.descKa,
      bodyEn: config.approach.descEn,
    },
  ];

  return (
    <section className="relative bg-[#060608]">
      <motion.div
        ref={ref}
        className="mx-auto !max-w-7xl px-5 sm:px-6 lg:px-8"
        variants={sectionReveal}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Eyebrow + lead — left-aligned reading column (matches WebDev/Marketing) */}
        <span className="mb-5 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
          <span className="h-px w-8 bg-indigo-500" />
          {ka ? "სერვისის შესახებ" : "About the Service"}
        </span>
        <p className="font-georgian-body max-w-3xl text-lg leading-[1.85] text-gray-200 md:text-xl">
          {ka ? config.introKa : config.introEn}
        </p>

        {/* Deep H2 content blocks */}
        <div className="mt-16 max-w-3xl space-y-12">
          {sections.map((sec) => (
            <div key={sec.headingEn}>
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-white md:text-[1.75rem] md:leading-snug">
                {ka ? sec.headingKa : sec.headingEn}
              </h2>
              <p className="font-georgian-body text-[15px] leading-[1.9] text-gray-400 md:text-base">
                {ka ? sec.bodyKa : sec.bodyEn}
              </p>
            </div>
          ))}
        </div>

        {/* Features grid — full container width */}
        {config.features.length > 0 && (
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.titleEn}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
                    <Icon className="h-5 w-5 text-indigo-400" />
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">
                    {ka ? feat.titleKa : feat.titleEn}
                  </h3>
                  <p className="font-georgian-body text-sm leading-[1.8] text-gray-400">
                    {ka ? feat.descKa : feat.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </section>
  );
}

// ─── Internal-link cluster (parent service + sibling industries) ──────────────

function RelatedLinks({ service, slug, ka }: { service: string; slug: string; ka: boolean }) {
  const parentUrl = service === "web" ? "/services/web" : "/services/marketing";
  const parentLabel =
    service === "web"
      ? ka ? "ვებ დეველოპმენტი" : "Web Development"
      : ka ? "ციფრული მარკეტინგი" : "Digital Marketing";

  const siblings = Object.entries(industryData[service] || {})
    .filter(([s]) => s !== slug)
    .map(([s, cfg]) => ({
      url: `/industry/${service}/${s}`,
      name: ka ? cfg.nameKa : cfg.nameEn,
    }));

  return (
    <section className="relative bg-[#060608] border-t border-white/8 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <h2 className="mb-8 text-xl font-bold tracking-tight text-white md:text-2xl">
          {ka ? "დაკავშირებული სერვისები" : "Related services"}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to={parentUrl}
            className="group flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5 transition-colors hover:border-indigo-500/60"
          >
            <span className="text-[15px] font-semibold text-white">
              {parentLabel}
            </span>
            <ArrowRight className="h-4 w-4 text-indigo-400 transition-transform group-hover:translate-x-1" />
          </Link>
          {siblings.map((s) => (
            <Link
              key={s.url}
              to={s.url}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/25"
            >
              <span className="text-[15px] font-medium text-gray-200">{s.name}</span>
              <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#060608] px-5 text-center text-white">
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
        404
      </span>
      <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight">
        Page Not Found
      </h1>
      <a
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-[1.02]"
      >
        Go Home
      </a>
    </main>
  );
}

function IndustryLanding({ webRoute = false }: { webRoute?: boolean }) {
  const { service: serviceParam, slug } = useParams<{ service: string; slug: string }>();
  const service = webRoute ? "web" : serviceParam;
  const { currentLanguage, toggleLanguage } = useLanguage();
  const ka = currentLanguage === "ka";

  if (!service || !slug || !validServices.has(service) || !validSlugs.has(slug)) {
    return <NotFound />;
  }

  const config: IndustryConfig | undefined = industryData[service]?.[slug];

  if (!config) {
    return <NotFound />;
  }

  const base = "https://vifadigital.ge";
  const serviceCrumb: Crumb =
    service === "web"
      ? { name: ka ? "ვებ დეველოპმენტი" : "Web Development", url: `${base}/services/web` }
      : { name: ka ? "ციფრული მარკეტინგი" : "Digital Marketing", url: `${base}/services/marketing` };

  // Absolute URLs (matches WebDev.tsx convention) — Breadcrumbs converts to paths for routing.
  const breadcrumbItems: Crumb[] = [
    { name: ka ? "მთავარი" : "Home", url: `${base}/` },
    serviceCrumb,
    { name: ka ? config.nameKa : config.nameEn, url: `${base}/industry/${service}/${slug}` },
  ];

  const faqItems = ka ? config.faqKa : config.faqEn;

  const seo = (
    <SEO
      title={ka ? config.seoTitleKa : config.seoTitleEn}
      description={ka ? config.seoDescriptionKa : config.seoDescriptionEn}
      url={`${base}/industry/${service}/${slug}`}
      breadcrumbs={breadcrumbItems}
      serviceSchema={{
        name: ka ? config.seoTitleKa : config.seoTitleEn,
        description: ka ? config.seoDescriptionKa : config.seoDescriptionEn,
        serviceType: service === "web" ? "Web Development" : "Digital Marketing",
        offers: buildOffers(config.packages),
      }}
      faq={faqItems}
    />
  );

  if (service === "web") {
    const slide = getIndustryShowcases(currentLanguage).find((item) => item.slug === slug);
    if (!slide) return <NotFound />;
    return <>
      {seo}
      <WebIndustryContent slide={slide} config={config} language={currentLanguage}
        breadcrumbs={breadcrumbItems} onLanguageToggle={toggleLanguage} />
    </>;
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-indigo-500/30">
      {seo}
      <MarketingServiceSection data={config.packages[0]} ka={ka} heroBgImage={config.heroBgImage} breadcrumbs={breadcrumbItems} />

      {GALLERIES[`${service}/${slug}`] && <PhotoStrip photos={GALLERIES[`${service}/${slug}`]} ka={ka} />}

      <IndustryContent config={config} ka={ka} />

      <section className="relative bg-[#060608] py-16 md:py-24">
        <FAQSection
          items={faqItems}
          title={ka ? "ხშირად დასმული კითხვები" : "Frequently Asked Questions"}
          eyebrow={ka ? "კითხვა-პასუხი" : "FAQ"}
        />
      </section>

      <RelatedLinks service={service} slug={slug} ka={ka} />
    </main>
  );
}

export function WebIndustryLanding() {
  return <IndustryLanding webRoute />;
}

export default IndustryLanding;
