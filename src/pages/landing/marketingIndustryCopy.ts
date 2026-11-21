import type { MarketingArtifactKind } from "../../components/ui/MarketingArtifacts";
import type { WebIndustrySlug } from "../../components/ui/industryShowcases";
import type { MarketingLanguage, MarketingService } from "../../data/marketingServices";

type Bilingual = Record<MarketingLanguage, string>;

interface IndustryCopy {
  tone: MarketingService;
  title: Bilingual;
  line: Bilingual;
  whatsappSubject: Bilingual;
  services: Array<{ key: MarketingService; body: Bilingual; artifact?: MarketingArtifactKind }>;
  packageBody: Bilingual;
  packageFeatures: Bilingual[];
}

export const marketingIndustryCopy: Record<WebIndustrySlug, IndustryCopy> = {
  food: {
    tone: "production",
    title: { ka: "მარკეტინგი რესტორნებისთვის", en: "Marketing for restaurants" },
    line: { ka: "მენიუს დიზაინი, კერძების გადაღება და რეკლამა თქვენს უბანში.", en: "Menu design, food photography and local ads." },
    whatsappSubject: { ka: "რესტორნის მარკეტინგი", en: "restaurant marketing" },
    services: [
      { key: "production", body: { ka: "კერძების ფოტოები და მომზადების პროცესის რილსები.", en: "Food photography and reels from the kitchen." } },
      { key: "branding", artifact: "poster", body: { ka: "ბეჭდური და ციფრული მენიუ, აქციების დიზაინი.", en: "Print and digital menus and promotional graphics." } },
      { key: "advertising", body: { ka: "რეკლამა თქვენს მახლობლად მყოფი სტუმრებისთვის.", en: "Ads for potential guests in your area." } },
    ],
    packageBody: { ka: "შეგვიძლია დავამატოთ მენიუს დიზაინი, გადაღება და რეკლამა.", en: "From menu design to kitchen videos." },
    packageFeatures: [
      { ka: "მენიუ და სარეკლამო ბანერები", en: "Menus and ad graphics" },
      { ka: "კერძების ფოტოები და რილსები", en: "Food photography and reels" },
      { ka: "ლოკალური რეკლამა", en: "Local ads" },
    ],
  },
  tourism: {
    tone: "socialMedia",
    title: { ka: "მარკეტინგი სასტუმროებისთვის", en: "Marketing for hotels and tourism" },
    line: { ka: "აჩვენეთ თქვენი სივრცე და მიიღეთ პირდაპირი ჯავშნები.", en: "Show guests your property and attract direct bookings." },
    whatsappSubject: { ka: "სასტუმროსა და ტურისტული ობიექტის მარკეტინგი", en: "hotel and tourism marketing" },
    services: [
      { key: "production", body: { ka: "ოთახების, შენობისა და სასტუმროს ხედების გადაღება.", en: "Photography of rooms, the building and hotel views." } },
      { key: "socialMedia", body: { ka: "სოციალური გვერდების მართვა, რილსები და სეზონური აქციები.", en: "Social media management, reels and seasonal promotions." } },
      { key: "advertising", body: { ka: "კამპანიები ადგილობრივი და უცხოელი სტუმრებისთვის.", en: "Campaigns for local and international visitors." } },
    ],
    packageBody: { ka: "პაკეტს პირდაპირი ჯავშნების მიზანსა და გადაღების მოცულობას მოვარგებთ.", en: "Strategy, production and ads for direct bookings." },
    packageFeatures: [
      { ka: "სტრატეგია და სოციალური ქსელების მართვა", en: "Strategy and social media management" },
      { ka: "ფოტო, საიმიჯო ვიდეო და დრონით გადაღება", en: "Photography, promotional video and drone footage" },
      { ka: "რეკლამა და სეზონური აქციები", en: "Ads and seasonal promotions" },
    ],
  },
  retail: {
    tone: "advertising",
    title: { ka: "მარკეტინგი მაღაზიებისთვის", en: "Marketing for online and retail shops" },
    line: { ka: "კატალოგის ფოტოები, ვიდეომიმოხილვები და რეკლამა გაყიდვებისთვის.", en: "Product photos, videos and advertising focused on sales." },
    whatsappSubject: { ka: "ონლაინ და საცალო მაღაზიის მარკეტინგი", en: "online and retail shop marketing" },
    services: [
      { key: "socialMedia", body: { ka: "გვერდების მართვა და პროდუქტის პრეზენტაციები.", en: "Social channels and interactive product presentations." } },
      { key: "advertising", body: { ka: "აქციები და რეკლამა იმ ადამიანებისთვის, რომლებიც პროდუქტს ეძებენ.", en: "Sales campaigns for shoppers ready to buy." } },
      { key: "production", body: { ka: "კატალოგის ფოტოები და პროდუქტის ვიდეომიმოხილვები.", en: "Catalogue photos and product review videos." } },
    ],
    packageBody: { ka: "პაკეტს პროდუქტის მასალისა და რეკლამის საჭიროებებს მოვარგებთ.", en: "From catalogue photography to sales campaigns." },
    packageFeatures: [
      { ka: "სოციალური გვერდების მართვა", en: "Social media management" },
      { ka: "კატალოგის ფოტოები და ვიდეომიმოხილვები", en: "Catalogue photography and review videos" },
      { ka: "აქციები და სარეკლამო ტექსტები", en: "Promotions and ad copy" },
    ],
  },
  beauty: {
    tone: "production",
    title: { ka: "მარკეტინგი სილამაზის სალონებისთვის", en: "Marketing for salons and aesthetic clinics" },
    line: { ka: "წარმოაჩინეთ თქვენი მომსახურება და მიიღეთ მეტი ჩაწერა.", en: "Showcase your services and attract more appointments." },
    whatsappSubject: { ka: "სილამაზის სალონის მარკეტინგი", en: "salon marketing" },
    services: [
      { key: "socialMedia", body: { ka: "სოციალური გვერდების მართვა და ტექსტების შექმნა.", en: "Social media management and copywriting." } },
      { key: "advertising", body: { ka: "რეკლამა Meta-სა და Google-ზე მეტი ჩაწერისთვის.", en: "Appointment-focused ads on Meta and Google." } },
      { key: "production", body: { ka: "ფოტოსესია, რილსების გადაღება და მონტაჟი.", en: "Photo shoots, reel filming and editing." } },
    ],
    packageBody: { ka: "გვერდების მართვას საჭიროების მიხედვით დავუმატებთ რეკლამას და გადაღებას.", en: "Social media management and ads for appointments." },
    packageFeatures: [
      { ka: "გვერდების მართვა და ტექსტები", en: "Social media management and copy" },
      { ka: "ფოტოები და რილსები", en: "Photography and reels" },
      { ka: "ჩაწერებზე მორგებული რეკლამა", en: "Appointment-focused ads" },
    ],
  },
  "legal-finance": {
    tone: "branding",
    title: { ka: "მარკეტინგი იურიდიული კომპანიებისთვის", en: "Marketing for legal and finance firms" },
    line: { ka: "კორპორატიული ბრენდინგი და სოციალური მედიის მართვა B2B აუდიტორიისთვის.", en: "Corporate branding and content for business audiences." },
    whatsappSubject: { ka: "იურიდიული და საფინანსო კომპანიის მარკეტინგი", en: "legal and finance marketing" },
    services: [
      { key: "branding", body: { ka: "ბრენდბუქი, სავიზიტო ბარათები და ბროშურები.", en: "Brand book, business cards and brochures." } },
      { key: "socialMedia", body: { ka: "სოციალური მედიის კონტენტი საქმიანი აუდიტორიისთვის.", en: "Social media content for business audiences." } },
      { key: "production", body: { ka: "გუნდის ფოტოსესია და საიმიჯო ვიდეო.", en: "Team photography and a corporate film." } },
      { key: "advertising", body: { ka: "რეკლამა კონსულტაციის მაძიებელი აუდიტორიისთვის.", en: "Ads for people looking to book a consultation." } },
    ],
    packageBody: { ka: "გვერდების მართვას შეგვიძლია დავუმატოთ ბრენდინგი ან გადაღება.", en: "A consistent corporate identity and B2B content." },
    packageFeatures: [
      { ka: "ბრენდბუქი და ბეჭდური მასალები", en: "Brand book and print materials" },
      { ka: "გუნდის ფოტოსესია და საიმიჯო ვიდეო", en: "Team photography and a corporate film" },
      { ka: "სოციალური მედიის მართვა", en: "Social media management" },
    ],
  },
};
