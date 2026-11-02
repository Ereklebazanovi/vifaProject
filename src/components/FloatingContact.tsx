import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

// Routes that already have their own persistent contact UI (or shouldn't show one).
const HIDDEN_PREFIXES = ["/inventowms", "/vifa-studio"];

const WHATSAPP_NUMBER = "995557624243";

// Pre-filled message follows the page the visitor is on, so the chat opens
// with their actual interest (less to type) and the incoming message itself
// shows which page the lead came from.
const MESSAGE_BY_PREFIX: [string, string][] = [
  ["/services/ai-chatbot", "გამარჯობა, დავინტერესდი AI ჩატბოტის სერვისით."],
  ["/services/web", "გამარჯობა, დავინტერესდი საიტის დამზადებით."],
  ["/industry/web", "გამარჯობა, დავინტერესდი საიტის დამზადებით."],
  ["/services/marketing", "გამარჯობა, დავინტერესდი ციფრული მარკეტინგის სერვისით."],
  ["/services/digital-advertising", "გამარჯობა, დავინტერესდი ციფრული მარკეტინგის სერვისით."],
  ["/industry/marketing", "გამარჯობა, დავინტერესდი ციფრული მარკეტინგის სერვისით."],
  ["/services/production", "გამარჯობა, დავინტერესდი ფოტო/ვიდეო გადაღების სერვისით."],
  ["/blog", "გამარჯობა, ბლოგიდან გწერთ. მაინტერესებს თქვენი სერვისები."],
  ["/lineup", "გამარჯობა, დავინტერესდი LineUp-ით — სპორტული აკადემიის აპლიკაციით."],
];
const DEFAULT_MESSAGE = "გამარჯობა, დავინტერესდი თქვენი სერვისებით.";

const whatsappUrlFor = (pathname: string) => {
  const match = MESSAGE_BY_PREFIX.find(([prefix]) => pathname.startsWith(prefix));
  const text = match ? match[1] : DEFAULT_MESSAGE;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

/**
 * Restrained, site-wide floating WhatsApp button. Appears only after a little
 * scroll (keeps the hero clean), fades in, and stays out of routes that already
 * have their own persistent contact bar. No pulsing / no text bubble by design.
 */
const FloatingContact: React.FC = () => {
  const location = useLocation();
  const { currentLanguage } = useLanguage();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p));
  if (hidden) return null;

  const label = currentLanguage === "ka" ? "მოგვწერეთ WhatsApp-ში" : "Message us on WhatsApp";

  return (
    <a
      href={whatsappUrlFor(location.pathname)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-all duration-300 hover:bg-[#20bd5a] ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <FaWhatsapp className="text-[26px]" />
    </a>
  );
};

export default FloatingContact;
