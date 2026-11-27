import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "./SectionHeading";
import "./contactBlock.css";

interface ContactBlockProps {
  whatsappHref: string;
  language?: "ka" | "en";
  title?: string;
  secondary?: string;
  photo?: string;
  children?: ReactNode;
}

// The closing block on every page: a centred two-tone heading ("Have a question? The consultation is free."),
// one plain line, then WhatsApp first and the quieter options (contact form, callback, phone) beside it.
// Styles live in contactBlock.css, not light.css.
export function ContactBlock({ whatsappHref, language = "ka", title, secondary, photo, children }: ContactBlockProps) {
  const en = language === "en";
  return (
    <section id="contact" className="it-section it-col it-contact-section">
      <div className="contact-block">
        {photo && <img className="contact-block-photo" src={photo} alt="" width={64} height={64} />}
        <SectionHeading secondary={secondary ?? (en ? "The consultation is free." : "კონსულტაცია უფასოა.")}>
          {title ?? (en ? "Have a question?" : "კითხვა გაქვთ?")}
        </SectionHeading>
        <p className="contact-block-note">
          {en ? "Tell us what you need. Our team will reply personally." : "მოგვიყევით, რა გჭირდებათ. ჩვენი გუნდი პირადად გიპასუხებთ."}
        </p>
        <div className="contact-block-actions">
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="it-pill-button">
            {en ? "Message us on WhatsApp" : "მოგვწერეთ WhatsApp-ზე"}
          </a>
          {children ?? <Link to="/contact" className="it-more-link">{en ? "Contact form ›" : "საკონტაქტო ფორმა ›"}</Link>}
        </div>
      </div>
    </section>
  );
}
