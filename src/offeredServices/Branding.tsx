import { Compass, Fingerprint, LayoutTemplate, Palette } from "lucide-react";
import { MarketingServicePage } from "../components/ui/MarketingServicePage";

const copy = {
  ka: {
    seoTitle: "ბრენდინგი, ლოგოს დიზაინი და ვიზუალური იდენტობა",
    seoDescription: "ბრენდის პოზიციონირება, ლოგოს დიზაინი, ვიზუალური იდენტობა და გრაფიკული დიზაინი. სამუშაოს მოცულობასა და ფასს კონსულტაციაზე ვათანხმებთ.",
    description: "ლოგო და სტილი, რომლითაც თქვენს ბრენდს ერთი შეხედვით იცნობენ.",
    price: "ფასი კონსულტაციაზე",
    sectionTitle: "რას ვქმნით ბრენდისთვის",
    sectionLine: "შეგიძლიათ დაგვიკვეთოთ მხოლოდ ლოგო, ცალკე გრაფიკული მასალა ან სრული ვიზუალური იდენტობა.",
    cards: [
      { icon: Fingerprint, title: "ლოგოს დიზაინი", body: "ვქმნით ლოგოს, რომელსაც სხვადასხვა ფორმატში ადვილად ამოიცნობენ." },
      { icon: Palette, title: "ვიზუალური იდენტობა", body: "ლოგოს, ფერებსა და შრიფტს ერთ სტილში ვაერთიანებთ." },
      { icon: LayoutTemplate, title: "გრაფიკული დიზაინი", body: "პოსტებსა და რეკლამას თქვენი ბრენდის სტილში ვაფორმებთ." },
      { icon: Compass, title: "ბრენდის პოზიციონირება", body: "ერთად ვაყალიბებთ, რით გამოირჩევა ბრენდი, რას ამბობს და როგორ ესაუბრება კლიენტებს." },
    ],
    process: [
      { title: "ვარკვევთ, რა გჭირდებათ", body: "ჯერ ვარკვევთ, რა მასალა გჭირდებათ და სად გამოიყენებთ მას." },
      { title: "ვირჩევთ ვიზუალურ სტილს", body: "ბრენდისთვის ვარჩევთ ლოგოს, ფერებსა და შრიფტს." },
      { title: "ვქმნით გრაფიკულ მასალას", body: "შეთანხმებულ სტილს ვიყენებთ პოსტებსა და რეკლამაში." },
    ],
    faq: [
      { question: "მხოლოდ ლოგოს დიზაინის შეკვეთა შეიძლება?",
        answer: "დიახ. შეგვიძლია დავამზადოთ მხოლოდ ლოგო ან მასთან ერთად შევქმნათ ბრენდის სრული ვიზუალური სტილი." },
      { question: "არსებული ბრენდის განახლებაზეც მუშაობთ?",
        answer: "დიახ. შეგვიძლია განვაახლოთ როგორც ბრენდის ვიზუალური სტილი, ისე მისი პოზიციონირება." },
      { question: "რა ღირს ბრენდინგი?",
        answer: "ფასს კონსულტაციაზე ვადგენთ. მნიშვნელობა აქვს, გჭირდებათ ცალკე დიზაინი, სრული ვიზუალური იდენტობა თუ პოზიციონირებაც." },
    ],
  },
  en: {
    seoTitle: "Branding, Logo Design and Visual Identity",
    seoDescription: "Brand positioning, logo design, visual identity and graphic design. We agree on the scope and price during a consultation.",
    description: "We design logos and visual identities, and define what your brand says and how it speaks to its audience.",
    price: "Pricing on consultation",
    sectionTitle: "What we create for your brand",
    sectionLine: "You can order a logo, graphics or a complete visual identity for your brand.",
    cards: [
      { icon: Fingerprint, title: "Logo design", body: "We design a mark that makes the brand recognizable across formats." },
      { icon: Palette, title: "Visual identity", body: "We choose colors and type that work with the logo and give your brand a consistent look." },
      { icon: LayoutTemplate, title: "Graphic design", body: "We create graphics for posts and ads that fit your brand's style." },
      { icon: Compass, title: "Brand positioning", body: "We define the core message and choose a tone that fits your audience." },
    ],
    process: [
      { title: "Clarify the scope", body: "We agree on what you need and how you’ll use the design." },
      { title: "Choose a visual style", body: "We choose a logo, colors and type for your brand." },
      { title: "Create the graphics", body: "We apply the agreed style to posts and ads." },
    ],
    faq: [
      { question: "Can I order just a logo?",
        answer: "Yes. We can design only a logo or develop a complete visual identity, depending on what your brand needs." },
      { question: "Do you update existing brands?",
        answer: "Yes. We can work on a full rebrand, including positioning and visual identity, where needed." },
      { question: "How much does branding cost?",
        answer: "We agree on the price in a consultation once we know whether you need an individual design, a full identity or positioning as well." },
    ],
  },
};

export default function Branding() {
  return <MarketingServicePage service="branding" serviceType="Branding and Design" copy={copy}
    cardArtifacts={["logo", "identity", "poster", "voice"]} />;
}
