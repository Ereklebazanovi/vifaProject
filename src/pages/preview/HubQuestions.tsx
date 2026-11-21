import { FaqSection } from "../../components/ui/FaqSection";
import type { ItLanguage } from "../../data/itServices";
import { hubFaqs } from "./hubFaqData";

export function HubQuestions({ language }: { language: ItLanguage }) {
  return <FaqSection key={language} title={language === "ka" ? "ხშირი კითხვები" : "Frequently asked questions"} items={hubFaqs[language]} />;
}
