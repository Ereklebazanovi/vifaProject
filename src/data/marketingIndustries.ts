import type { WebIndustrySlug } from "../components/ui/industryShowcases";
import { foodPhoto } from "./marketingMedia";
import type { MarketingLanguage } from "./marketingServices";

type Localized = Record<MarketingLanguage, string>;

const restaurantPhoto = foodPhoto(1);

export const marketingIndustryOrder = ["food", "tourism", "retail", "beauty", "legal-finance"] as const;

export const marketingIndustries: Record<WebIndustrySlug, {
  label: Localized;
  originalPhoto: string;
  photo?: { alt: Localized; focus?: string };
}> = {
  food: {
    label: { ka: "რესტორნები და კაფეები", en: "Restaurants and cafés" },
    originalPhoto: restaurantPhoto.src,
    photo: { alt: { ka: restaurantPhoto.altKa, en: restaurantPhoto.altEn } },
  },
  tourism: {
    label: { ka: "სასტუმროები და ტურიზმი", en: "Hotels and tourism" },
    originalPhoto: "/preview/industries/hotel-1200.webp",
  },
  retail: {
    label: { ka: "მაღაზიები", en: "Shops" },
    originalPhoto: "/eccomerce.webp",
    photo: { alt: { ka: "ლეპტოპი, ტელეფონი და ბარათები ვარდისფერ ფონზე", en: "Laptop, phone and cards on a pink background" } },
  },
  beauty: {
    label: { ka: "სალონები", en: "Beauty salons" },
    originalPhoto: "/saloni.webp",
  },
  "legal-finance": {
    label: { ka: "იურიდიული და საფინანსო", en: "Law and finance" },
    originalPhoto: "/preview/industries/legal-1200.webp",
  },
};
