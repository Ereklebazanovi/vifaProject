import { useParams } from "react-router-dom";
import type { Crumb } from "../../components/Breadcrumbs";
import SEO from "../../components/SEO";
import { EditorialPage } from "../../components/ui/EditorialPage";
import { getIndustryShowcases } from "../../components/ui/industryShowcases";
import { useLanguage } from "../../contexts/LanguageContext";
import { industryData, type BilingualPricingTier } from "../../data/industryData";
import { itBreadcrumbs } from "../../data/itServices";
import { WebIndustryContent } from "./WebIndustryContent";
import { webIndustryCopy } from "./webIndustryCopy";

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

function NotFound() {
  return (
    <EditorialPage>
      <div className="ed-state">
        <span className="ed-accent text-xs font-semibold">404</span>
        <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight">Page Not Found</h1>
        <a href="/" className="it-pill-button">Go Home</a>
      </div>
    </EditorialPage>
  );
}

function IndustryLanding({ serviceRoute }: { serviceRoute?: "web" }) {
  const { service: serviceParam, slug } = useParams<{ service: string; slug: string }>();
  const service = serviceRoute ?? serviceParam;
  const { currentLanguage, toggleLanguage } = useLanguage();
  const ka = currentLanguage === "ka";

  // Only websites have industry pages; the marketing ones were removed on 2026-11-25 and
  // /industry/marketing/* redirects to the marketing hub in vercel.json.
  if (!slug || service !== "web") return <NotFound />;

  const slide = getIndustryShowcases(currentLanguage).find((item) => item.slug === slug);
  const config = industryData[service]?.[slug];
  if (!slide || !config) return <NotFound />;

  const base = "https://vifadigital.ge";
  const pageUrl = base + "/industry/" + service + "/" + slug;
  const breadcrumbs: Crumb[] = [
    ...itBreadcrumbs("web", currentLanguage),
    { name: webIndustryCopy[slide.slug].title?.[currentLanguage] ?? slide.title, url: pageUrl },
  ];

  return <>
    <SEO
      title={ka ? config.seoTitleKa : config.seoTitleEn}
      description={ka ? config.seoDescriptionKa : config.seoDescriptionEn}
      url={pageUrl}
      breadcrumbs={breadcrumbs}
      serviceSchema={{
        name: ka ? config.seoTitleKa : config.seoTitleEn,
        description: ka ? config.seoDescriptionKa : config.seoDescriptionEn,
        serviceType: "Web Development",
        offers: buildOffers(config.packages),
      }}
      faq={ka ? config.faqKa : config.faqEn}
    />
    <WebIndustryContent slide={slide} config={config} language={currentLanguage}
      breadcrumbs={breadcrumbs} onLanguageToggle={toggleLanguage} />
  </>;
}

export function WebIndustryLanding() {
  return <IndustryLanding serviceRoute="web" />;
}

export default IndustryLanding;
