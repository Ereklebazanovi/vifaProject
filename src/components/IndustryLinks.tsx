import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShoppingCart, Scale, Map, Sparkles, Utensils } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { industryData } from "../data/industryData";

// Icons + display order for the niche cards (matches the navbar industry dropdown).
const ICON: Record<string, ComponentType<{ className?: string }>> = {
  retail: ShoppingCart,
  tourism: Map,
  beauty: Sparkles,
  food: Utensils,
  "legal-finance": Scale,
};
const ORDER = ["retail", "tourism", "beauty", "food", "legal-finance"];

interface Props {
  service: "web" | "marketing";
  /** Extra outer spacing to fit the host page rhythm (e.g. "mb-32"). */
  className?: string;
}

/**
 * Cornerstone → cluster internal links: surfaces the 5 industry landing pages from a
 * service page (/services/web, /services/marketing). Completes the topical-cluster
 * hub-and-spoke (industry pages already link back up via RelatedLinks).
 */
const IndustryLinks: React.FC<Props> = ({ service, className = "" }) => {
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";
  const niches = industryData[service] || {};

  const subtitle =
    service === "web"
      ? ka
        ? "მორგებული ვებ-გადაწყვეტა თქვენი სფეროსთვის"
        : "Tailored web solutions for your field"
      : ka
        ? "მორგებული მარკეტინგული სტრატეგია თქვენი სფეროსთვის"
        : "Tailored marketing strategy for your field";

  return (
    <section className={`relative z-10 ${className}`}>
      <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
        <span className="h-px w-8 bg-indigo-500" />
        {ka ? "ინდუსტრიები" : "Industries"}
      </span>
      <h2 className="mb-3 text-2xl md:text-3xl font-bold tracking-tight text-white">
        {ka ? "ინდუსტრიები, რომლებსაც ვემსახურებით" : "Industries We Serve"}
      </h2>
      <p className="mb-10 max-w-xl text-gray-400">{subtitle}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ORDER.map((slug) => {
          const cfg = niches[slug];
          if (!cfg) return null;
          const Icon = ICON[slug];
          return (
            <Link
              key={slug}
              to={`/industry/${service}/${slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-indigo-500/40"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                {Icon && <Icon className="h-5 w-5 text-indigo-400" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-base font-semibold text-white group-hover:text-indigo-200">
                  {ka ? cfg.nameKa : cfg.nameEn}
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-gray-400 line-clamp-2">
                  {ka ? cfg.heroSublineKa : cfg.heroSublineEn}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default IndustryLinks;
