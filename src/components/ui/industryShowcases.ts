// Industries as a carousel of large mosaic slides (layout modelled on the apple.com/store
// banner carousel): a color block with the text, a tile with the website feature this industry
// gets, and a large photo. Photos chosen by the owner and the marketing
// partner (2026-11-20), free Pexels License (pexels.com/photo/<id>): restaurant 37737840, salon 13138476
// (barbershop), legal 29304264 (office), hotel 28999491 (lobby, cropped to drop a street building and
// glass lettering); shop = the site's own public/eccomerce.webp (laptop, phone and cards on pink).
// The 700px files are landscape crops around the subject for phones; the 1200px files are the
// full images and `focus` places them on desktop.

type Widget = { heading: string; action: string } & (
  { rows: [string, string][] } | { slotsLabel: string }
);

export interface IndustryShowcase {
  slug: "retail" | "tourism" | "food" | "beauty" | "legal-finance";
  photo: string;
  alt: string;
  title: string;
  line: string;
  block: string; // shared background behind the text and widget
  focus?: string; // object-position, to crop away an edge of the photo
  widget: Widget;
}

const slides: IndustryShowcase[] = [
  {
    slug: "retail", photo: "shop", alt: "ლეპტოპი, ტელეფონი და საბანკო ბარათები ვარდისფერ ფონზე", focus: "50% 50%",
    title: "მაღაზიები", line: "ონლაინ მაღაზია ქართული ბანკების გადახდის სისტემებით.",
    block: "#e9edf4",
    widget: { heading: "უსადენო ყურსასმენი", rows: [["ფერი", "შავი"], ["ფასი", "129.00 ₾"]], action: "კალათაში დამატება" },
  },
  {
    slug: "tourism", photo: "hotel", alt: "სასტუმროს ნათელი ლობი რბილი სავარძლებით და ხის ჭერით", focus: "45% 60%",
    title: "სასტუმროები", line: "ოთახის დაჯავშნა პირდაპირ თქვენი საიტიდან.",
    block: "#e3edf6",
    widget: { heading: "ოთახის დაჯავშნა", rows: [["შესვლა", "12 დეკ"], ["გასვლა", "15 დეკ"], ["სტუმარი", "2"]], action: "თავისუფალი ოთახები" },
  },
  {
    slug: "food", photo: "restaurant", alt: "თანამედროვე რესტორანი ხის მაგიდებით და დღის სინათლით",
    title: "რესტორნები და კაფეები", line: "ციფრული მენიუ და მაგიდის ონლაინ დაჯავშნა.",
    block: "#dcefef", focus: "45% 60%",
    widget: { heading: "მაგიდის დაჯავშნა", rows: [["თარიღი", "ხვალ"], ["დრო", "20:00"], ["სტუმარი", "4"]], action: "დაჯავშნა" },
  },
  {
    slug: "beauty", photo: "salon", alt: "ბარბერშოპის ტყავის სავარძლები", focus: "40% 55%",
    title: "სალონები", line: "კლიენტები თავად ირჩევენ დროს და ონლაინ ეწერებიან.",
    block: "#ece6f5",
    widget: { heading: "ჩაწერა: თმის შეჭრა", slotsLabel: "თავისუფალი დრო ხვალ", action: "ჩაწერა" },
  },
  {
    slug: "legal-finance", photo: "legal", alt: "ოფისი ხის სამუშაო მაგიდით და წიგნების თაროთი", focus: "60% 50%",
    title: "იურიდიული კომპანიები", line: "კლიენტის პორტალი დოკუმენტების გასაცვლელად.",
    block: "#eceae6",
    widget: { heading: "კლიენტის პორტალი", rows: [["დოკუმენტი", "ხელშეკრულება.pdf"], ["სტატუსი", "გაზიარებულია"]], action: "გახსნა" },
  },
];

const english: Record<IndustryShowcase["slug"], Pick<IndustryShowcase, "title" | "line" | "alt" | "widget">> = {
  retail: {
    title: "Shops", line: "An online store with payments through Georgian banks.", alt: "A laptop, a phone and bank cards on pink",
    widget: { heading: "Wireless headphones", rows: [["Color", "Black"], ["Price", "129.00 ₾"]], action: "Add to cart" },
  },
  tourism: {
    title: "Hotels", line: "Let guests book a room directly on your website.", alt: "A bright hotel lobby with soft armchairs and a wooden ceiling",
    widget: { heading: "Book a room", rows: [["Check in", "12 Dec"], ["Check out", "15 Dec"], ["Guests", "2"]], action: "Available rooms" },
  },
  food: {
    title: "Restaurants and cafés", line: "A digital menu and online reservations.", alt: "A modern restaurant with wooden tables and daylight",
    widget: { heading: "Book a table", rows: [["Date", "Tomorrow"], ["Time", "20:00"], ["Guests", "4"]], action: "Reserve" },
  },
  beauty: {
    title: "Salons", line: "Clients choose a time and book online.", alt: "Leather barber chairs",
    widget: { heading: "Book a haircut", slotsLabel: "Available tomorrow", action: "Book a slot" },
  },
  "legal-finance": {
    title: "Law firms", line: "A client portal for sharing documents.", alt: "An office with a wooden desk and a bookshelf",
    widget: { heading: "Client portal", rows: [["Document", "Agreement.pdf"], ["Status", "Shared"]], action: "Open" },
  },
};

export type WebIndustrySlug = IndustryShowcase["slug"];

export function getIndustryShowcases(language: "ka" | "en") {
  return language === "en" ? slides.map((slide) => ({ ...slide, ...english[slide.slug] })) : slides;
}
