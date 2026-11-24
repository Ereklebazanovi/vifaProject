export const marketingHubHref = "/services/marketing";
export const marketingChannels = [
  { name: "Instagram", href: "https://www.instagram.com/vifaproduction/" },
  { name: "Facebook", href: "https://www.facebook.com/vifageo" },
  { name: "YouTube", href: "https://www.youtube.com/@vifaprodaction3750" },
  { name: "TikTok", href: "https://www.tiktok.com/@vifadigital" },
] as const;

export const marketingServiceOrder = ["socialMedia", "advertising", "production", "branding"] as const;
export type MarketingService = typeof marketingServiceOrder[number];
export type MarketingLanguage = "ka" | "en";

export const socialMediaMonthlyPrices = { Core: 1000, Growth: 1500, Scale: 2000 } as const;
export const consultationPrice = { ka: "ფასი კონსულტაციაზე", en: "Pricing on consultation" } as const;

export const marketingServices = {
  socialMedia: {
    href: "/services/social-media",
    ka: { title: "სოციალური მედიის მართვა", body: "ვგეგმავთ პოსტებს, ვქმნით მასალას და ვმართავთ თქვენს გვერდებს.", facts: `${socialMediaMonthlyPrices.Core} ₾-დან თვეში` },
    en: { title: "Social media management", body: "Content planning, posts and page management.", facts: `From ${socialMediaMonthlyPrices.Core} ₾ per month` },
  },
  advertising: {
    href: "/services/advertising",
    ka: { title: "სარეკლამო კამპანიების მენეჯმენტი", body: "Facebook-ზე, Instagram-ზე და Google-ში.", facts: consultationPrice.ka },
    en: { title: "Ad campaign management", body: "On Facebook, Instagram and Google.", facts: consultationPrice.en },
  },
  production: {
    href: "/services/production",
    ka: { title: "ფოტოები და ვიდეოები", body: "ფოტოსესიები, რილსები, სარეკლამო ვიდეოები და დრონით გადაღება.", facts: consultationPrice.ka },
    en: { title: "Photos and videos", body: "Photo shoots, reels, commercial videos and drone footage.", facts: consultationPrice.en },
  },
  branding: {
    href: "/services/branding",
    ka: { title: "ბრენდინგი და დიზაინი", body: "ლოგო, ვიზუალური სტილი და ბრენდის საუბრის მანერა.", facts: consultationPrice.ka },
    en: { title: "Branding and design", body: "Logo, visual identity and brand voice.", facts: consultationPrice.en },
  },
} as const;

export function marketingBreadcrumbs(language: MarketingLanguage, service?: MarketingService) {
  const crumbs = [
    { name: language === "ka" ? "მთავარი" : "Home", url: "https://vifadigital.ge/" },
    { name: language === "ka" ? "მარკეტინგი" : "Marketing", url: `https://vifadigital.ge${marketingHubHref}` },
  ];
  if (service) crumbs.push({
    name: marketingServices[service][language].title,
    url: `https://vifadigital.ge${marketingServices[service].href}`,
  });
  return crumbs;
}

const whatsappBase = "https://wa.me/995577175132?text=";
export function marketingWhatsappLink(message: string) {
  return whatsappBase + encodeURIComponent(message);
}

export const marketingWhatsappHref =
  marketingWhatsappLink("გამარჯობა, დავინტერესდი ციფრული მარკეტინგის სერვისით. მსურს უფასო კონსულტაცია.");

export function marketingServiceWhatsapp(service: MarketingService, language: MarketingLanguage) {
  const { title } = marketingServices[service][language];
  const message = language === "ka"
    ? `გამარჯობა, მსურს უფასო კონსულტაცია ამ სერვისზე: ${title}.`
    : `Hello, I'd like a free consultation about ${title.toLowerCase()}.`;
  return marketingWhatsappLink(message);
}
