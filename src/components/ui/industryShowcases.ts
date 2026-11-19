// Industries as a carousel of large mosaic slides (layout modelled on the apple.com/store
// banner carousel): a color block with the text, a tile with the website feature this industry
// gets, and a large photo. Natural photos that fit a Georgian audience, all free to use:
// Pexels (free Pexels License): restaurant 12841621, shop 8387119, salon 6774348 (pexels.com/photo/<id>).
// Unsplash (free Unsplash License): hotel = old Tbilisi carved balconies, Sára Sedlmajerová
// (images.unsplash.com/photo-1784985363028-30d10462bc31); legal = hands signing a contract,
// Jakub Żerdzicki (photo-1763729805496-b5dbf7f00c79).
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
    slug: "retail", photo: "shop", alt: "ტანსაცმლის მაღაზია, პასტელის ფერის ტანსაცმელი საკიდზე", focus: "50% 62%",
    title: "მაღაზიები", line: "ონლაინ მაღაზია ქართული ბანკების გადახდის სისტემებით.",
    block: "#e9edf4",
    widget: { heading: "ცისფერი პერანგი", rows: [["ზომა", "M"], ["ფასი", "79.00 ₾"]], action: "კალათაში დამატება" },
  },
  {
    slug: "tourism", photo: "hotel", alt: "ძველი თბილისის სახლი ჩუქურთმიანი ხის აივნებით", focus: "48% 45%",
    title: "სასტუმროები", line: "ოთახის დაჯავშნა პირდაპირ თქვენი საიტიდან.",
    block: "#e3edf6",
    widget: { heading: "ოთახის დაჯავშნა", rows: [["შესვლა", "12 დეკ"], ["გასვლა", "15 დეკ"], ["სტუმარი", "2"]], action: "თავისუფალი ოთახები" },
  },
  {
    slug: "food", photo: "restaurant", alt: "რესტორნის ინტერიერი ფირუზისფერი კედლით და ხის მაგიდებით",
    title: "რესტორნები და კაფეები", line: "ციფრული მენიუ და მაგიდის ონლაინ დაჯავშნა.",
    block: "#dcefef", focus: "40% 55%",
    widget: { heading: "მაგიდის დაჯავშნა", rows: [["თარიღი", "ხვალ"], ["დრო", "20:00"], ["სტუმარი", "4"]], action: "დაჯავშნა" },
  },
  {
    slug: "beauty", photo: "salon", alt: "პასტელის ფერის მანიკური იასამნისფერ ფონზე", focus: "50% 38%",
    title: "სალონები", line: "კლიენტები თავად ირჩევენ დროს და ონლაინ ეწერებიან.",
    block: "#ece6f5",
    widget: { heading: "ჩაწერა: მანიკური", slotsLabel: "თავისუფალი დრო ხვალ", action: "ჩაწერა" },
  },
  {
    slug: "legal-finance", photo: "legal", alt: "ხელშეკრულებაზე ხელმოწერა, ახლო ხედი", focus: "40% 45%",
    title: "იურიდიული კომპანიები", line: "კლიენტის პორტალი დოკუმენტების გასაცვლელად.",
    block: "#eceae6",
    widget: { heading: "კლიენტის პორტალი", rows: [["დოკუმენტი", "ხელშეკრულება.pdf"], ["სტატუსი", "გაზიარებულია"]], action: "გახსნა" },
  },
];

const english: Record<IndustryShowcase["slug"], Pick<IndustryShowcase, "title" | "line" | "alt" | "widget">> = {
  retail: {
    title: "Shops", line: "An online store with payments through Georgian banks.", alt: "Pastel clothes hanging on a shop rack",
    widget: { heading: "Blue shirt", rows: [["Size", "M"], ["Price", "79.00 ₾"]], action: "Add to cart" },
  },
  tourism: {
    title: "Hotels", line: "Let guests book a room directly on your website.", alt: "Carved wooden balconies in Old Tbilisi",
    widget: { heading: "Book a room", rows: [["Check in", "12 Dec"], ["Check out", "15 Dec"], ["Guests", "2"]], action: "Available rooms" },
  },
  food: {
    title: "Restaurants and cafés", line: "A digital menu and online reservations.", alt: "Restaurant interior with a teal wall and wooden tables",
    widget: { heading: "Book a table", rows: [["Date", "Tomorrow"], ["Time", "20:00"], ["Guests", "4"]], action: "Reserve" },
  },
  beauty: {
    title: "Salons", line: "Clients choose a time and book online.", alt: "Pastel manicure on a lilac background",
    widget: { heading: "Book a manicure", slotsLabel: "Available tomorrow", action: "Book a slot" },
  },
  "legal-finance": {
    title: "Law firms", line: "A client portal for sharing documents.", alt: "Close-up of someone signing a contract",
    widget: { heading: "Client portal", rows: [["Document", "Agreement.pdf"], ["Status", "Shared"]], action: "Open" },
  },
};

export type WebIndustrySlug = IndustryShowcase["slug"];

export function getIndustryShowcases(language: "ka" | "en") {
  return language === "en" ? slides.map((slide) => ({ ...slide, ...english[slide.slug] })) : slides;
}
