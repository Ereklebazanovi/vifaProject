import { itHref, itServiceOrder, itServices } from "../../data/itServices";
import { marketingIndustries, marketingIndustryOrder } from "../../data/marketingIndustries";
import { marketingChannels, marketingHubHref, marketingServiceOrder, marketingServices } from "../../data/marketingServices";
import { PageLink } from "./PageLink";

export function SiteFooter({ language = "ka" }: { language?: "ka" | "en" }) {
  const en = language === "en";
  const marketingTitle = en ? "Marketing" : "მარკეტინგი";
  const groups = [
    { title: en ? "IT services" : "IT მომსახურება", href: itHref, services: itServiceOrder.map(key => itServices[key]) },
    { title: marketingTitle, href: marketingHubHref, services: marketingServiceOrder.map(key => marketingServices[key]) },
  ];

  return (
    <footer className="it-footer it-col">
      <div className="it-footer-columns">
        {groups.map(({ title, href, services }) => (
          <nav key={href} className="it-footer-column" aria-label={title}>
            <h2><PageLink to={href}>{title}</PageLink></h2>
            <ul className="it-footer-list">
              {services.map(service => <li key={service.href}><PageLink to={service.href}>{service[language].title}</PageLink></li>)}
            </ul>
          </nav>
        ))}
        {/* The marketing industry pages bring search traffic (a hotel found us through them) but have no
            tiles on the marketing pages since 2026-11-25, so the footer keeps them linked from every page. */}
        <nav className="it-footer-column" aria-label={en ? "Marketing by industry" : "მარკეტინგი დარგებისთვის"}>
          <h2>{en ? "Marketing by industry" : "მარკეტინგი დარგებისთვის"}</h2>
          <ul className="it-footer-list">
            {marketingIndustryOrder.map(slug => (
              <li key={slug}><PageLink to={`/industry/marketing/${slug}`}>{marketingIndustries[slug].label[language]}</PageLink></li>
            ))}
          </ul>
        </nav>
        <section className="it-footer-column" aria-labelledby="it-footer-contact">
          <h2 id="it-footer-contact">{en ? "Contact" : "კონტაქტი"}</h2>
          <address>
            <ul className="it-footer-list">
              <li className="it-footer-phone"><span>IT</span> <a href="tel:+995557624243">+995 557 62 42 43</a></li>
              <li className="it-footer-phone"><span>{marketingTitle}</span> <a href="tel:+995577175132">+995 577 17 51 32</a></li>
              <li><a href="mailto:vifa.official2020@gmail.com">vifa.official2020@gmail.com</a></li>
              <li>{en ? "Tbilisi, Georgia" : "თბილისი, საქართველო"}</li>
            </ul>
          </address>
          <ul className="it-footer-socials" aria-label={en ? "Social media" : "სოციალური ქსელები"}>
            {marketingChannels.map(({ name, href }) => (
              <li key={name}><a href={href} target="_blank" rel="noopener noreferrer">{name}</a></li>
            ))}
          </ul>
        </section>
      </div>
      <div className="it-footer-line">
        <span>© 2026 VIFA Digital</span>
        <nav className="it-footer-links" aria-label={en ? "Legal information" : "იურიდიული ინფორმაცია"}>
          <PageLink to="/privacy">{en ? "Privacy policy" : "კონფიდენციალურობის პოლიტიკა"}</PageLink>
          <PageLink to="/terms">{en ? "Terms of service" : "მომსახურების პირობები"}</PageLink>
        </nav>
      </div>
    </footer>
  );
}
