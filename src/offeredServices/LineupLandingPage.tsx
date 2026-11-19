import "@fontsource/firago/300.css";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/600.css";
import { ArrowUpRight } from "lucide-react";
import CallbackLink from "../components/CallbackLink";
import SEO from "../components/SEO";
import LiveDemo from "../components/lineup/LiveDemo";
import RoleStory from "../components/lineup/RoleStory";
import { PHONE_HREF, PHONE_LABEL, PLAY_URL, faq, page, whatsappUrl } from "../components/lineup/content";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { LightPage } from "../components/ui/LightPage";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceHero } from "../components/ui/ServiceHero";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { OtherItServices } from "../components/ui/OtherItServices";
import { itBreadcrumbs, itHref } from "../data/itServices";
import { useLanguage } from "../contexts/LanguageContext";
import "./lineupService.css";

const PAGE_URL = "https://vifadigital.ge/lineup";

export default function LineupLandingPage() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const lang = currentLanguage === "en" ? "en" : "ka";
  const en = lang === "en";
  const c = page[lang];
  const whatsappHref = whatsappUrl(lang);
  const breadcrumbs = itBreadcrumbs("lineup", lang);

  return (
    <LightPage className="lineup-service" tone="lineup" whatsappHref={whatsappHref}>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={c.seoKeywords}
        url={PAGE_URL}
        softwareApplication={{
          name: "LineUp: სპორტული აკადემიის მართვის აპლიკაცია",
          description:
            "აპლიკაცია სპორტული აკადემიისთვის: გადახდების აღრიცხვა, დასწრება, შეფასებები და შეტყობინებები მშობლებისთვის, მენეჯერის, მწვრთნელისა და მშობლის როლებით.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Android, iOS, Web",
        }}
        breadcrumbs={breadcrumbs}
        faq={faq[lang]}
      />
      <SiteNav consultationHref={whatsappHref} activeLink={itHref} language={lang} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="lineup-hero-title" breadcrumbs={breadcrumbs} fullBreadcrumbsOnMobile title={c.heroTitle}
          description={c.heroSubtitle}
          actions={<a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="it-pill-button">{c.ctaWrite}</a>}
          facts={<p className="lineup-audience">LineUp · {c.kicker}</p>}>
          <LiveDemo lang={lang} />
        </ServiceHero>

        <section className="it-section it-col lineup-section" aria-labelledby="lineup-roles-title">
          <SectionHeading id="lineup-roles-title">{en ? "One app, three roles" : "სამი როლი ერთ აპში"}</SectionHeading>
          <RoleStory lang={lang} />
        </section>

        <section className="it-section it-col lineup-section" aria-labelledby="lineup-proof-title">
          <div className="lineup-proof">
            <div>
              <div className="lineup-proof-heading">
                <img src="/lineup-rba-emblem.png" alt="" width={44} height={44} loading="lazy" />
                <SectionHeading id="lineup-proof-title">{c.proofTitle}</SectionHeading>
              </div>
              <p>{c.proofText}</p>
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="it-more-link">
                {c.playLink} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
            <dl className="lineup-proof-stats">
              {c.stats.map(({ value, label }) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </div>
        </section>

        <section className="it-section it-col lineup-section" aria-labelledby="lineup-start-title">
          <SectionHeading id="lineup-start-title">{c.startTitle}</SectionHeading>
          <p className="lineup-start-note">{en
            ? "Your name, logo and colours. Teams and rating criteria are set up for your sport."
            : "თქვენი სახელი, ლოგო და ფერები. გუნდები და შეფასების კრიტერიუმები თქვენს სპორტს ერგება."}</p>
          <ol className="lineup-start-steps">
            {c.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}
          </ol>
        </section>

        <FaqSection id="lineup-faq" title={en ? "Frequently asked questions" : "ხშირად დასმული კითხვები"} items={[
          ...faq[lang],
          {
            question: en ? "What can each role do?" : "რას აკეთებს თითოეული როლი?",
            answer: (
              <div className="lineup-faq-details">
                {Object.values(c.roles).map((role) => (
                  <div key={role.label}>
                    <strong>{role.label}</strong><p>{role.text}</p>
                    <ul>{role.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  </div>
                ))}
              </div>
            ),
          },
          { question: en ? "How is LineUp set up for my academy?" : "როგორ მოარგებთ LineUp-ს ჩემს აკადემიას?", answer: c.startText },
          { question: en ? "Can I see a demo for my academy?" : "როგორ ვნახო დემო ჩემი აკადემიისთვის?", answer: c.finalText },
        ]} />
        <OtherItServices current="lineup" language={lang} />
        <ContactBlock whatsappHref={whatsappHref} language={lang}>
          <CallbackLink product="lineup" className="it-callback" />
          <a href={PHONE_HREF} className="it-more-link" aria-label={`${c.orCall} ${PHONE_LABEL}`}>{PHONE_LABEL}</a>
        </ContactBlock>
        <SiteFooter language={lang} />
      </main>
    </LightPage>
  );
}
