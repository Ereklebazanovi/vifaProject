import { CalendarDays, PanelsTopLeft, PenLine } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";
import { MarketingWork } from "../components/ui/MarketingWork";
import { useShorts } from "../hooks/useShorts";
import { packages, SocialMediaPackages } from "./SocialMediaPackages";

const copy = {
  ka: {
    seoTitle: "სოციალური მედიის მართვა (SMM) და კონტენტის შექმნა",
    seoDescription: "სოციალური მედიის მართვა, კონტენტის გეგმა, პოსტები, ფოტოები და რილსები. შეადარეთ Core, Growth და Scale პაკეტები. ფასები 1000 ₾-დან.",
    description: "ვგეგმავთ კონტენტს, ვამზადებთ პოსტებსა და რილსებს და ვმართავთ თქვენი ბიზნესის სოციალურ გვერდებს.",
    price: "პაკეტები 1000 ₾-დან",
    sectionTitle: "რას მოიცავს გვერდების მართვა",
    cards: [
      { icon: CalendarDays, title: "კონტენტის გეგმა", body: "ვათანხმებთ მიზანს, აუდიტორიას და თემებს. თითოეული პოსტისთვის წინასწარ ვარჩევთ ფორმატს." },
      { icon: PenLine, title: "კონტენტის შექმნა", body: "ვწერთ პოსტების ტექსტებს და ვამზადებთ ვიზუალს, ფოტოებსა და რილსებს თქვენი ბრენდისთვის." },
      { icon: PanelsTopLeft, title: "გვერდების მართვა", body: "ვაქვეყნებთ კონტენტს გეგმის მიხედვით. Growth და Scale პაკეტებში ყოველკვირეულად ვაანალიზებთ შედეგებს." },
    ],
    process: [
      { title: "ვარჩევთ პაკეტს", body: "მოგვიყევით თქვენს ბიზნესზე და ერთად შევარჩევთ პაკეტს." },
      { title: "ვგეგმავთ პოსტებს", body: "ვათანხმებთ პოსტების ფორმატსა და განრიგს." },
      { title: "ვმართავთ გვერდებს", body: "ვაქვეყნებთ პოსტებს და შედეგებს პაკეტის მიხედვით ვაანალიზებთ." },
    ],
    faq: [
      { question: "რა ღირს სოციალური მედიის მართვა?",
        answer: "Core პაკეტის საორიენტაციო ფასია 1000 ₾, Growth-ის 1500 ₾ და Scale-ის 2000 ₾. ზუსტი ფასი ბიზნესის მიზნებსა და კონტენტის მოცულობაზეა დამოკიდებული. საწყის კონსულტაციაზე უფასოდ დაგეხმარებით პაკეტის შერჩევაში." },
      { question: "რამდენ პოსტს აქვეყნებთ თვეში?",
        answer: "Core პაკეტში თვეში მინიმუმ 10 პოსტს ვამზადებთ და ვაქვეყნებთ. Growth და Scale მოიცავს მეტ კონტენტს, ყოველდღიურ მართვასა და შედეგების ყოველკვირეულ ანალიზს." },
      { question: "პაკეტებში ფოტო და ვიდეო გადაღებაც შედის?",
        answer: "პაკეტები მოიცავს ფოტო და ვიდეო კონტენტს. Scale პაკეტში დამატებით შედის სტუდიური და დრონით გადაღება." },
    ],
  },
  en: {
    seoTitle: "Social Media Management (SMM) and Content Creation",
    seoDescription: "Social media management, content planning, posts, photos and reels. Compare Core, Growth and Scale packages starting at 1000 GEL.",
    description: "We plan content, create posts and reels, and manage your business's social media pages.",
    price: "Packages from 1000 ₾",
    sectionTitle: "What social media management includes",
    cards: [
      { icon: CalendarDays, title: "Content planning", body: "We agree on goals, audiences and topics, then choose a format for each post." },
      { icon: PenLine, title: "Content creation", body: "We write the copy and prepare graphics, photos and reels for your brand." },
      { icon: PanelsTopLeft, title: "Page management", body: "We publish on schedule. Growth and Scale include a weekly review of performance." },
    ],
    process: [
      { title: "Choose a package", body: "Tell us about your business and we’ll help you choose a package." },
      { title: "Plan the posts", body: "We agree on when to publish and which formats to use." },
      { title: "Manage the pages", body: "We publish the posts and review results according to your package." },
    ],
    faq: [
      { question: "How much does social media management cost?",
        answer: "Estimated package prices are 1000 ₾ for Core, 1500 ₾ for Growth and 2000 ₾ for Scale. The exact price depends on your goals and the amount of content. We can help you choose a package in a free initial consultation." },
      { question: "How many posts do you publish each month?",
        answer: "Core includes at least 10 posts created and published each month. Growth and Scale include more content, daily management and weekly performance analysis." },
      { question: "Do packages include photos and videos?",
        answer: "Packages include photo and video content. Scale also includes studio and drone shoots." },
    ],
  },
};

export default function SocialMedia() {
  const shorts = useShorts();
  return (
    <MarketingServicePage service="socialMedia" serviceType="Social Media Management" copy={copy}
      offers={packages.map(({ name, price }) => ({ name, price }))}>
      {(language, whatsappHref) => <>
        <SocialMediaPackages language={language} whatsappHref={whatsappHref} />
        <MarketingWork language={language} shorts={shorts} />
      </>}
    </MarketingServicePage>
  );
}
