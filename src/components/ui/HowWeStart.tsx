import { Link } from "react-router-dom";
import { SectionHeading } from "./SectionHeading";

const consultationUrl = "https://wa.me/995557624243?text=" + encodeURIComponent("გამარჯობა, მინდა უფასო კონსულტაცია.");
const steps = [
  { title: "მოგვწერეთ", body: "WhatsApp-ზე ან საკონტაქტო ფორმით მოგვიყევით, რა გჭირდებათ." },
  { title: "მიიღეთ შეთავაზება", body: "შეთავაზებაში დავწერთ, რა შედის პროექტში, რა ეღირება და რამდენი დრო დაგვჭირდება." },
  { title: "ჩაიბარეთ პროექტი", body: "თქვენი თანხმობის შემდეგ სამუშაოს ვიწყებთ. დასრულებულ პროექტს შეთანხმებულ ვადაში მიიღებთ." },
];

const englishSteps = [
  { title: "Tell us what you need", body: "Message us on WhatsApp or use the contact form to tell us about your project." },
  { title: "Get a proposal", body: "The proposal lists what's included, what it costs and how long the work will take." },
  { title: "Receive your project", body: "We start after your approval and deliver the finished project within the agreed timeframe." },
];

interface ProcessExample {
  inquiry: string;
  project: string;
  price: string;
  timeline: string;
  readyChat?: { label: string; question: string; answer: string };
}

export function HowWeStart({
  language = "ka", whatsappHref = consultationUrl, processSteps, example, showActions = true, showExamples = true,
}: {
  language?: "ka" | "en";
  whatsappHref?: string;
  processSteps?: ReadonlyArray<{ title: string; body?: string }>;
  example?: ProcessExample;
  showActions?: boolean;
  showExamples?: boolean;
}) {
  const en = language === "en";
  return <section id="getting-started" className="it-section it-getting-started it-col">
    <SectionHeading>{en ? "How we work" : "როგორ ვმუშაობთ"}</SectionHeading>
    <ol className="it-start-steps" role="list">
      {(processSteps ?? (en ? englishSteps : steps)).map((step, index) => <li key={step.title} className="it-start-card">
        <div>
          <h3>{step.title}</h3>
          {step.body && <p className="it-start-description">{step.body}</p>}
        </div>
        {showExamples && <div className="it-start-artifact-space" aria-hidden="true">
          <div className="it-start-artifact">
            {index === 0 && <div className="it-start-chat">
              <p className="it-start-chat-customer">{example?.inquiry ?? (en ? "Hello, I'm interested in a website." : "გამარჯობა, საიტი მაინტერესებს.")}</p>
              <p className="it-start-chat-reply">{en ? "Hello! Tell us what you need." : "გამარჯობა! მოგვიყევით, რა გჭირდებათ."}</p>
            </div>}
            {index === 1 && <div className="it-start-offer">
              <strong>{en ? "Example proposal" : "შეთავაზების მაგალითი"}</strong>
              <div><span>{en ? "Project" : "პროექტი"}</span><span>{example?.project ?? (en ? "Corporate website" : "კორპორატიული საიტი")}</span></div>
              <div><span>{en ? "Price" : "ფასი"}</span><span>{example?.price ?? "900 ₾"}</span></div>
              <div><span>{en ? "Timeline" : "ვადა"}</span><span>{example?.timeline ?? (en ? "2-3 weeks" : "2-3 კვირა")}</span></div>
            </div>}
            {index === 2 && (example?.readyChat ? <div className="it-start-chat">
              <strong className="it-start-chat-ready">{example.readyChat.label}</strong>
              <p className="it-start-chat-customer">{example.readyChat.question}</p>
              <p className="it-start-chat-reply">{example.readyChat.answer}</p>
            </div> : <div className="it-start-browser">
              <div className="it-browser-bar">
                <div className="it-browser-dots"><span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" /></div>
                <div className="it-browser-pill">vifadigital.ge</div>
              </div>
              <div className="it-start-browser-body"><span>{en ? "Website is live ✓" : "საიტი გაშვებულია ✓"}</span></div>
            </div>)}
          </div>
        </div>}
      </li>)}
    </ol>
    {showActions && <div className="it-start-consultation">
      <a className="it-pill-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">
        {en ? "Free consultation" : "უფასო კონსულტაცია"}
      </a>
      <Link className="it-more-link" to="/contact">{en ? "Contact form ›" : "საკონტაქტო ფორმა ›"}</Link>
    </div>}
  </section>;
}
