import { CalendarDays, PanelsTopLeft, PenLine } from "lucide-react";
import { MarketingIndustryTiles } from "../components/ui/MarketingIndustryTiles";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";
import { MarketingWork } from "../components/ui/MarketingWork";
import { useShorts } from "../hooks/useShorts";
import { packages, SocialMediaPackages } from "./SocialMediaPackages";

const copy = {
  ka: {
    seoTitle: "სოციალური მედიის მართვა (SMM) და კონტენტის შექმნა",
    seoDescription: "სოციალური მედიის მართვა, პოსტების გეგმა, ფოტოები და რილსები. შეადარეთ Core, Growth და Scale. გვერდების მართვა 1000 ₾-დან თვეში.",
    description: "ვგეგმავთ, ვამზადებთ და ვაქვეყნებთ პოსტებსა და რილსებს.",
    price: "1000 ₾-დან თვეში",
    sectionTitle: "რას მოიცავს გვერდების მართვა",
    cards: [
      { icon: CalendarDays, title: "კონტენტის გეგმა", body: "ვადგენთ თემებს და ვწყვეტთ, რა როდის გამოქვეყნდება." },
      { icon: PenLine, title: "კონტენტის შექმნა", body: "ვწერთ ტექსტებს, ვაფორმებთ პოსტებს, ვიღებთ ფოტოებსა და რილსებს." },
      { icon: PanelsTopLeft, title: "გვერდების მართვა", body: "პოსტებს შეთანხმებულ დროს ვაქვეყნებთ და შედეგებს ვამოწმებთ." },
    ],
    faq: [
      { question: "რა ღირს სოციალური მედიის მართვა?",
        answer: "Core თვეში 1000 ₾ ღირს, Growth 1500 ₾, Scale კი 2000 ₾. უფასო კონსულტაციაზე დაგეხმარებით, მიზნებისა და სამუშაოს მოცულობის მიხედვით შეარჩიოთ პაკეტი." },
      { question: "რამდენ პოსტს აქვეყნებთ თვეში?",
        answer: "Core პაკეტში თვეში სულ მცირე 10 პოსტს ვამზადებთ და ვაქვეყნებთ. Growth და Scale პაკეტებში მეტ მასალას ვამზადებთ, გვერდებს ყოველდღე ვმართავთ და შედეგებს ყოველ კვირას ვამოწმებთ." },
      { question: "პაკეტებში ფოტო და ვიდეო გადაღებაც შედის?",
        answer: "დიახ, პაკეტებში შედის ფოტო და ვიდეო მასალა. Scale პაკეტში დამატებით შედის სტუდიური და დრონით გადაღება." },
    ],
  },
  en: {
    seoTitle: "Social Media Management (SMM) and Content Creation",
    seoDescription: "Social media management, posts, photos and reels. Compare Core, Growth and Scale, starting at 1000 GEL per month.",
    description: "We plan, create and publish posts and reels.",
    price: "From 1000 ₾ per month",
    sectionTitle: "What social media management includes",
    cards: [
      { icon: CalendarDays, title: "Content planning", body: "We pick the topics and decide what goes out when." },
      { icon: PenLine, title: "Content creation", body: "We write the copy, design the posts and shoot photos and reels." },
      { icon: PanelsTopLeft, title: "Page management", body: "We publish on schedule and check the results." },
    ],
    faq: [
      { question: "How much does social media management cost?",
        answer: "Monthly prices are 1000 ₾ for Core, 1500 ₾ for Growth and 2000 ₾ for Scale. In a free consultation, we can help you choose a package based on your goals and the work you need." },
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
      cardArtifacts={["calendar", "post", "comment"]}
      offers={packages.map(({ name, price }) => ({ name, price, unitText: "month" }))}>
      {(language, whatsappHref) => <>
        <SocialMediaPackages language={language} whatsappHref={whatsappHref} />
        <MarketingWork language={language} shorts={shorts} />
        <MarketingIndustryTiles language={language} />
      </>}
    </MarketingServicePage>
  );
}
