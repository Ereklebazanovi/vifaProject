import { useParams } from "react-router-dom";
import type { Crumb } from "../../components/Breadcrumbs";
import SEO from "../../components/SEO";
import { EditorialPage } from "../../components/ui/EditorialPage";
import { getIndustryShowcases } from "../../components/ui/industryShowcases";
import { useLanguage } from "../../contexts/LanguageContext";
import { industryData, type BilingualPricingTier } from "../../data/industryData";
import { itBreadcrumbs } from "../../data/itServices";
import { marketingHubHref, marketingServices, socialMediaMonthlyPrices } from "../../data/marketingServices";
import { MarketingIndustryContent } from "./MarketingIndustryContent";
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

function IndustryLanding({ serviceRoute }: { serviceRoute?: "web" | "marketing" }) {
  const { service: serviceParam, slug } = useParams<{ service: string; slug: string }>();
  const service = serviceRoute ?? serviceParam;
  const { currentLanguage, toggleLanguage } = useLanguage();
  const ka = currentLanguage === "ka";

  if (!slug || (service !== "web" && service !== "marketing")) return <NotFound />;

  const slide = getIndustryShowcases(currentLanguage).find((item) => item.slug === slug);
  const config = industryData[service]?.[slug];
  if (!slide || !config) return <NotFound />;

  const base = "https://vifadigital.ge";
  const pageUrl = base + "/industry/" + service + "/" + slug;
  const breadcrumbs: Crumb[] = service === "web" ? [
    ...itBreadcrumbs("web", currentLanguage),
    { name: webIndustryCopy[slide.slug].title?.[currentLanguage] ?? slide.title, url: pageUrl },
  ] : [
    { name: ka ? "მთავარი" : "Home", url: base + "/" },
    { name: ka ? "ციფრული მარკეტინგი" : "Digital Marketing", url: base + marketingHubHref },
    { name: ka ? config.nameKa : config.nameEn, url: pageUrl },
  ];

  // Retain the published breadcrumb schema label while using the shorter label in the UI.
  const visibleBreadcrumbs = service === "marketing"
    ? breadcrumbs.map((crumb, index) => index === 1 ? { ...crumb, name: ka ? "მარკეტინგი" : "Marketing" } : crumb)
    : breadcrumbs;
  const Content = service === "web" ? WebIndustryContent : MarketingIndustryContent;

  return <>
    <SEO
      title={ka ? config.seoTitleKa : config.seoTitleEn}
      description={ka ? config.seoDescriptionKa : config.seoDescriptionEn}
      url={pageUrl}
      breadcrumbs={breadcrumbs}
      serviceSchema={{
        name: ka ? config.seoTitleKa : config.seoTitleEn,
        description: ka ? config.seoDescriptionKa : config.seoDescriptionEn,
        serviceType: service === "web" ? "Web Development" : "Digital Marketing",
        offers: service === "marketing"
          ? [{ name: marketingServices.socialMedia[currentLanguage].title, minPrice: socialMediaMonthlyPrices.Core, unitText: "month" }]
          : buildOffers(config.packages),
      }}
      faq={ka ? config.faqKa : config.faqEn}
    />
    <Content slide={slide} config={config} language={currentLanguage}
      breadcrumbs={visibleBreadcrumbs} onLanguageToggle={toggleLanguage} />
  </>;
}

export function WebIndustryLanding() {
  return <IndustryLanding serviceRoute="web" />;
}

export function MarketingIndustryLanding() {
  return <IndustryLanding serviceRoute="marketing" />;
}

export default IndustryLanding;
