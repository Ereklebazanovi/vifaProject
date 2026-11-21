export const webProjects = {
  lifeStore: {
    name: "lifestore.ge",
    href: "https://lifestore.ge/",
    image: "/preview/web-projects/lifestore.webp",
    category: { ka: "ეკომეგობრული სახლის ნივთები", en: "Eco-friendly home goods" },
  },
  all4kids: {
    name: "all4kids.ge", href: "https://www.all4kids.ge/", image: "/preview/web-projects/all4kids.webp",
    category: { ka: "საბავშვო პროდუქტებისა და სერვისების ქართული მარკეტპლეისი", en: "Georgian marketplace for children’s products and services" },
  },
  darchiaPartners: {
    name: "Darchia & Partners", href: "https://www.darchiapartners.ge/", image: "/preview/web-projects/darchia-partners.webp",
    category: { ka: "საადვოკატო ბიურო", en: "Law firm" },
  },
  geoMarti: {
    name: "Geo Marti", href: "https://www.geomarti.ge/ka", image: "/preview/web-projects/geomarti.webp",
    category: { ka: "საყოფაცხოვრებო და ციფრული ტექნიკის ონლაინ მაღაზია", en: "Online store for home and digital appliances" },
  },
  adressRealty: {
    name: "Adress Realty", href: "https://adressrealty.com/ka", image: "/preview/web-projects/adressrealty.webp",
    category: { ka: "პრემიუმ უძრავი ქონების სააგენტო", en: "Premium real estate agency" },
  },
  geoTechnic: {
    name: "Geo Technic Group", href: "https://www.geodanadgarebi.ge/ka", image: "/preview/web-projects/geodanadgarebi.webp",
    category: { ka: "სამრეწველო დანადგარების კატალოგი", en: "Industrial machinery catalog" },
  },
  legard: {
    name: "Legard", href: "https://www.legard.ge/", image: "/preview/web-projects/legard.webp",
    category: { ka: "სამშენებლო მასალები და ტექნიკა", en: "Construction materials and equipment" },
  },
} as const;

export const webPortfolio = [
  webProjects.all4kids,
  webProjects.darchiaPartners,
  webProjects.geoMarti,
  webProjects.adressRealty,
  webProjects.geoTechnic,
  webProjects.legard,
] as const;

export const webPortfolioIndustryFields = {
  ka: ["უძრავი ქონება", "მშენებლობა", "სამრეწველო ტექნიკა", "ელექტრონიკა", "საბავშვო პროდუქტები"],
  en: ["Real estate", "Construction", "Industrial machinery", "Electronics", "Children’s products"],
} as const;
