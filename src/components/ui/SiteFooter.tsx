import { Link } from "react-router-dom";

export function SiteFooter({ language = "ka" }: { language?: "ka" | "en" }) {
  const en = language === "en";
  return (
    <footer className="it-footer it-col">
      <div className="it-footer-line">
        <span>© 2026 VIFA Digital</span>
        <nav className="it-footer-links" aria-label={en ? "Legal information" : "იურიდიული ინფორმაცია"}>
          <Link to="/privacy">{en ? "Privacy policy" : "კონფიდენციალურობის პოლიტიკა"}</Link>
          <Link to="/terms">{en ? "Terms of service" : "მომსახურების პირობები"}</Link>
        </nav>
      </div>
    </footer>
  );
}
