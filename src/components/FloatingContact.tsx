import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";

// Routes that already have their own persistent contact UI (or shouldn't show one).
const HIDDEN_PREFIXES = ["/inventowms", "/vifa-studio"];

const WHATSAPP_URL =
  "https://wa.me/995557624243?text=%E1%83%92%E1%83%90%E1%83%9B%E1%83%90%E1%83%A0%E1%83%AF%E1%83%9D%E1%83%91%E1%83%90,%20%E1%83%93%E1%83%90%E1%83%95%E1%83%98%E1%83%9C%E1%83%A2%E1%83%94%E1%83%A0%E1%83%94%E1%83%A1%E1%83%93%E1%83%98%20%E1%83%97%E1%83%A5%E1%83%95%E1%83%94%E1%83%9C%E1%83%98%20%E1%83%A1%E1%83%94%E1%83%A0%E1%83%95%E1%83%98%E1%83%A1%E1%83%94%E1%83%91%E1%83%98%E1%83%97.";

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
      href={WHATSAPP_URL}
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
