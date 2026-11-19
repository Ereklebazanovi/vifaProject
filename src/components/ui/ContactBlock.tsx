import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

interface ContactBlockProps {
  whatsappHref: string;
  language?: "ka" | "en";
  title?: string;
  secondary?: string;
  photo?: string;
  children?: ReactNode;
}

export function ContactBlock({ whatsappHref, language = "ka", title, secondary, photo, children }: ContactBlockProps) {
  const en = language === "en";
  return (
    <section id="contact" className="it-section it-col it-contact-section">
      <div className="it-contact-card">
        <SectionHeading secondary={secondary ?? (en ? "Tell us what you need." : "მოგვიყევით, რა გჭირდებათ.")}>
          {title ?? (en ? "Have a question?" : "კითხვა გაქვთ?")}
        </SectionHeading>
        <div className="it-contact-row">
          <div className="it-contact-person">
            {photo ? (
              <img className="it-contact-avatar" src={photo} alt="" width={64} height={64} />
            ) : (
              <span className="it-contact-avatar" aria-hidden="true"><UsersRound size={24} strokeWidth={1.7} /></span>
            )}
            <p className="it-contact-note">{en ? "Our team will reply personally." : "ჩვენი გუნდი პირადად გიპასუხებთ."}</p>
          </div>
          <div className="it-contact-actions">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="it-pill-button">
              {en ? "Message us on WhatsApp" : "მოგვწერეთ WhatsApp-ზე"}
            </a>
            {children ?? <Link to="/contact" className="it-more-link">{en ? "Contact form ›" : "საკონტაქტო ფორმა ›"}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
