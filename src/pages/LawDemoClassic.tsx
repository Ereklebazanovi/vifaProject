import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "მთავარი", href: "hero" },
  { label: "სერვისები", href: "services" },
  { label: "ჩვენს შესახებ", href: "about" },
  { label: "კონტაქტი", href: "contact" },
];

const SERVICES = [
  {
    icon: "⚖️",
    title: "სისხლის სამართალი",
    desc: "დაცვა და წარმომადგენლობა ყველა ეტაპზე — გამოძიებიდან სასამართლო განხილვამდე. გარანტირებული პროფესიონალიზმი.",
  },
  {
    icon: "🏛️",
    title: "სამოქალაქო სამართალი",
    desc: "ქონებრივი, საოჯახო და სახელშეკრულებო დავები. თქვენი ინტერესების სრულყოფილი დაცვა სასამართლოში.",
  },
  {
    icon: "📋",
    title: "ადმინისტრაციული სამართალი",
    desc: "დავები სახელმწიფო ორგანოებთან — ლიცენზიები, ნებართვები, ადმინისტრაციული სანქციები და სხვა.",
  },
  {
    icon: "💼",
    title: "კორპორატიული მომსახურება",
    desc: "იურიდიული მომსახურება ორგანიზაციებისთვის — კომპანიის რეგისტრაცია, კონტრაქტები, კორპორატიული მართვა.",
  },
];

const TEAM = [
  { name: "გიორგი დარჩია", role: "მენეჯინგ პარტნიორი", exp: "22 წელი" },
  { name: "ნინო კვარაცხელია", role: "უფროსი პარტნიორი", exp: "17 წელი" },
  { name: "დავით მამულაშვილი", role: "პარტნიორი", exp: "11 წელი" },
];

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const GOLD = "#c9a84c";
const DARK_GOLD = "#b8960c";
const NAVY = "#0d1f3c";
const NAVY_DEEP = "#081527";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "14px",
  fontFamily: "'Noto Sans Georgian', sans-serif",
  border: "1px solid #d1d5db",
  outline: "none",
  backgroundColor: "#fff",
  color: NAVY,
  transition: "border-color 0.2s",
};

const LawDemoClassic: React.FC = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Inject Noto Serif/Sans Georgian from Google Fonts — scoped to this page only
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian:wght@400;500;600;700;800;900&family=Noto+Sans+Georgian:wght@300;400;500;600;700&display=swap";
    link.id = "law-demo-classic-fonts";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "law-demo-classic-styles";
    style.textContent = `
      .law-demo-classic,
      .law-demo-classic p,
      .law-demo-classic a,
      .law-demo-classic button,
      .law-demo-classic input,
      .law-demo-classic textarea,
      .law-demo-classic select,
      .law-demo-classic label,
      .law-demo-classic span,
      .law-demo-classic li {
        font-family: 'Noto Sans Georgian', sans-serif;
      }
      .law-demo-classic h1,
      .law-demo-classic h2,
      .law-demo-classic h3,
      .law-demo-classic h4 {
        font-family: 'Noto Serif Georgian', serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("law-demo-classic-fonts")?.remove();
      document.getElementById("law-demo-classic-styles")?.remove();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const focusGold = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = DARK_GOLD);
  const blurGray = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderColor = "#d1d5db");

  return (
    <div
      className="law-demo-classic bg-white min-h-screen"
      style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
    >
      {/* ── STICKY NAVBAR ── */}
      <header
        className="sticky top-0 z-50"
        style={{ backgroundColor: "#0a0f1a", borderBottom: "1px solid rgba(201,168,76,0.18)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="focus:outline-none flex items-center gap-3"
            >
              <img
                src="/darchialogo.png"
                alt="დარჩია და პარტნიორები"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: "200px", mixBlendMode: "lighten" }}
              />
              <div
                className="hidden sm:block text-xs tracking-[0.2em] uppercase leading-tight border-l pl-3"
                style={{ color: DARK_GOLD, borderColor: `${GOLD}40` }}
              >
                <div>საადვოკატო ბიურო</div>
                <div style={{ color: "#64748b", fontSize: "10px" }}>დაარსებულია 2015 წელს</div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-sm font-medium transition-colors duration-200 pb-1 focus:outline-none"
                  style={{
                    color: "#cbd5e1",
                    borderBottom: "2px solid transparent",
                    background: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                    (e.currentTarget as HTMLButtonElement).style.borderBottomColor = DARK_GOLD;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1";
                    (e.currentTarget as HTMLButtonElement).style.borderBottomColor = "transparent";
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="ml-2 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 focus:outline-none"
                style={{ backgroundColor: DARK_GOLD }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = GOLD)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK_GOLD)
                }
              >
                კონსულტაცია
              </button>
            </nav>

            {/* Mobile right-side actions */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Direct call CTA */}
              <a
                href="tel:+995322110506"
                className="flex items-center justify-center w-9 h-9 rounded-sm transition-colors duration-150 focus:outline-none"
                style={{ color: DARK_GOLD }}
                aria-label="Call +995 32 211 05 06"
              >
                <svg
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                </svg>
              </a>

              {/* Divider */}
              <div className="w-px h-5" style={{ backgroundColor: "rgba(255,255,255,0.12)" }} />

              {/* Hamburger + MENU label */}
              <button
                className="flex items-center gap-2 focus:outline-none"
                style={{ color: "#e2e8f0" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <div className="w-5 h-px bg-current" />
                  <div className="w-5 h-px bg-current" />
                  <div className="w-5 h-px bg-current" />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#94a3b8" }}
                >
                  MENU
                </span>
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div
              className="lg:hidden py-4 space-y-1"
              style={{ borderTop: "1px solid rgba(201,168,76,0.15)", backgroundColor: "#080d17" }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => { scrollTo(href); setMenuOpen(false); }}
                  className="block w-full text-left px-2 py-3 text-sm font-medium focus:outline-none transition-colors duration-150"
                  style={{ color: "#cbd5e1" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#cbd5e1")}
                >
                  {label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
                  className="w-full py-3 text-sm font-semibold text-white focus:outline-none"
                  style={{ backgroundColor: DARK_GOLD }}
                >
                  კონსულტაცია
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative overflow-hidden flex items-center"
        style={{ minHeight: "95vh" }}
      >
        {/* Background image — prestigious dark law library hallway */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2000')",
          }}
        />
        {/* Heavy dark overlay — bg-black/80 equivalent, ensures Georgian text is 100% readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, rgba(4,10,20,0.93) 0%, rgba(8,18,38,0.88) 50%, rgba(4,10,20,0.80) 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 w-full">
          <div className="max-w-3xl">
            {/* Gold rule + eyebrow */}
            <div className="flex items-center gap-4 mb-10">
              <div
                className="h-px w-16"
                style={{ backgroundColor: GOLD, opacity: 0.8 }}
              />
              <span
                className="text-xs tracking-[0.4em] uppercase font-medium"
                style={{ color: GOLD }}
              >
                2015 წლიდან თქვენს გვერდით
              </span>
            </div>

            <h1
              className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold leading-[1.1] text-white mb-8"
            >
              საადვოკატო ბიურო
              <br />
              <span style={{ color: GOLD }}>დარჩია</span>
              <span className="text-white"> და</span>
              <br />
              <span className="text-white">პარტნიორები</span>
            </h1>

            <p
              className="text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
              style={{ color: "rgba(226,232,240,0.9)" }}
            >
              თქვენი უფლებების საიმედო დაცვა ყველა ინსტანციაში.
              მრავალწლიანი გამოცდილება და პროფესიონალიზმი.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("contact")}
                className="px-10 py-4 text-sm tracking-wide font-semibold text-white text-center transition-all duration-200 focus:outline-none"
                style={{ backgroundColor: DARK_GOLD }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = GOLD)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK_GOLD)
                }
              >
                უფასო კონსულტაცია
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="px-10 py-4 text-sm tracking-wide font-semibold text-center transition-all duration-200 focus:outline-none"
                style={{
                  color: GOLD,
                  border: `1px solid ${GOLD}80`,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = GOLD;
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = `${GOLD}80`;
                  (e.currentTarget as HTMLButtonElement).style.color = GOLD;
                }}
              >
                ჩვენი სერვისები →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-12" style={{ backgroundColor: DARK_GOLD }} />
              <span
                className="text-xs tracking-[0.4em] uppercase font-medium"
                style={{ color: DARK_GOLD }}
              >
                სამართლებრივი დახმარება
              </span>
              <div className="h-px w-12" style={{ backgroundColor: DARK_GOLD }} />
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: NAVY }}
            >
              ჩვენი სერვისები
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              კვალიფიციური სამართლებრივი დახმარება ყველა სფეროში — გამოძიებიდან
              კომპლექსური კორპორატიული საქმეებამდე.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="group p-8 border transition-all duration-300 cursor-default"
                style={{
                  borderColor: "#e2e8f0",
                  borderTopWidth: "3px",
                  borderTopColor: GOLD,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = NAVY;
                  el.style.borderTopColor = DARK_GOLD;
                  el.style.boxShadow = "0 12px 40px rgba(13,31,60,0.1)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = "#e2e8f0";
                  el.style.borderTopColor = GOLD;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Icon in gold circle */}
                <div
                  className="w-14 h-14 flex items-center justify-center text-2xl mb-5 rounded-sm"
                  style={{ backgroundColor: `${GOLD}18`, border: `1px solid ${GOLD}40` }}
                >
                  {icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: NAVY }}
                >
                  {title}
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm">{desc}</p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="mt-5 text-xs tracking-widest uppercase font-semibold focus:outline-none transition-colors duration-150"
                  style={{ color: DARK_GOLD, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = NAVY)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = DARK_GOLD)
                  }
                >
                  დეტალურად →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-14" style={{ backgroundColor: "#f8f7f4" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Office image — no overflow bleed */}
            <div className="w-full aspect-4/3 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2000"
                alt="საადვოკატო ბიუროს ოფისი — კლასიკური ინტერიერი"
                className="w-full h-full object-cover object-center"
                style={{ filter: "brightness(0.82) saturate(0.72)" }}
              />
              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(8,21,39,0.50) 0%, rgba(13,31,60,0.20) 50%, rgba(8,21,39,0.65) 100%)",
                }}
              />
              {/* Caption badge — bottom-left inside the photo */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-2"
              >
                <div className="w-4 h-px" style={{ backgroundColor: GOLD }} />
                <span
                  className="text-[10px] tracking-[0.3em] uppercase font-semibold"
                  style={{ color: GOLD }}
                >
                  თბილისი, საქართველო
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12" style={{ backgroundColor: DARK_GOLD }} />
                <span
                  className="text-xs tracking-[0.4em] uppercase font-medium"
                  style={{ color: DARK_GOLD }}
                >
                  ჩვენს შესახებ
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                style={{ color: NAVY }}
              >
                სამართლებრივი
                <br />
                <span style={{ color: DARK_GOLD }}>სრულყოფილება</span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6 text-lg">
                შპს „დარჩია და პარტნიორები" დაარსდა 2015 წელს და ამ
                პერიოდიდან ახორციელებს ფიზიკური და იურიდიული პირების
                სამართლებრივი ინტერესების დაცვას სასამართლოსა თუ სხვა
                სახელმწიფო დაწესებულებებში.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                კომპანია იურიდიული მომსახურებას უწევს არაერთ სამეწარმეო
                სუბიექტს, რომლებიც ოპერირებენ წიაღის, სამშენებლო, საკვები
                პროდუქტების და საკრედიტო სფეროში.
              </p>
              <p className="text-slate-600 leading-relaxed mb-5">
                ჩვენს გუნდს გააჩნია საერთო სპეციალიზაცია და მომსახურების
                მიღება შესაძლებელია სისხლის, სამოქალაქო და
                ადმინისტრაციულ-სამართლებრივი მიმართულებით.
              </p>
              <p
                className="text-sm font-medium leading-relaxed mb-10 px-4 py-3 border-l-4"
                style={{ color: DARK_GOLD, borderLeftColor: GOLD, backgroundColor: `${GOLD}0d` }}
              >
                საადვოკატო მომსახურების მიღება შესაძლებელია ქართულ,
                რუსულ და ინგლისურ ენებზე.
              </p>

              {/* Team list */}
              <div className="space-y-3">
                {TEAM.map(({ name, role, exp }) => (
                  <div
                    key={name}
                    className="flex items-center justify-between py-3 border-b"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <div>
                      <div className="font-semibold" style={{ color: NAVY }}>
                        {name}
                      </div>
                      <div className="text-sm text-slate-500">{role}</div>
                    </div>
                    <div
                      className="text-sm font-medium px-3 py-1 rounded-sm"
                      style={{
                        color: DARK_GOLD,
                        backgroundColor: `${GOLD}15`,
                        border: `1px solid ${GOLD}40`,
                      }}
                    >
                      {exp}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US BANNER ── */}
      <section style={{ backgroundColor: NAVY }} className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "🛡️", title: "სანდოობა", desc: "2015 წლიდან — ასობით კმაყოფილი კლიენტი და წარმატებული საქმე" },
              { icon: "⚡", title: "სისწრაფე", desc: "სწრაფი რეაქცია და ოპერატიული იურიდიული დახმარება" },
              { icon: "🔐", title: "კონფიდენციალობა", desc: "ადვოკატ-კლიენტის საიდუმლოება სრულად გარანტირებულია" },
              { icon: "🏆", title: "შედეგი", desc: "ჩვენი მიზანია თქვენი საქმის წარმატებული გადაწყვეტა" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center text-lg flex-shrink-0 rounded-sm mt-0.5"
                  style={{ backgroundColor: `${GOLD}20`, border: `1px solid ${GOLD}40` }}
                >
                  {icon}
                </div>
                <div>
                  <div
                    className="font-bold mb-1 text-sm"
                    style={{ color: GOLD }}
                  >
                    {title}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12" style={{ backgroundColor: DARK_GOLD }} />
                <span
                  className="text-xs tracking-[0.4em] uppercase font-medium"
                  style={{ color: DARK_GOLD }}
                >
                  დაგვიკავშირდით
                </span>
              </div>
              <h2
                className="text-4xl font-bold leading-tight mb-6"
                style={{ color: NAVY }}
              >
                კონტაქტი
              </h2>
              <p className="text-slate-600 leading-relaxed mb-10">
                ჩვენი ადვოკატები მზად არიან განიხილონ თქვენი სიტუაცია
                და გთავაზობთ კონფიდენციალურ კონსულტაციას.
              </p>

              <div className="space-y-5">
                {[
                  { label: "მისამართი", value: "დ. აღმაშენებლის ხეივანი 66ბ\nთბილისი 0131, საქართველო" },
                  { label: "ტელეფონი", value: "+995 32 211 05 06" },
                  { label: "ელ-ფოსტა", value: "giadarchia@gmail.com" },
                  { label: "სამუშაო საათები", value: "ორშაბათი – პარასკევი: 10:00 – 18:00" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="pb-5 border-b"
                    style={{ borderColor: "#e2e8f0" }}
                  >
                    <div
                      className="text-xs tracking-widest uppercase font-semibold mb-1"
                      style={{ color: DARK_GOLD }}
                    >
                      {label}
                    </div>
                    <div className="text-sm text-slate-700">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form
                className="space-y-5"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs tracking-widest uppercase font-semibold mb-2"
                      style={{ color: NAVY }}
                    >
                      სახელი და გვარი *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={focusGold}
                      onBlur={blurGray}
                      placeholder="გიორგი ბერიძე"
                      style={inputBase}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-xs tracking-widest uppercase font-semibold mb-2"
                      style={{ color: NAVY }}
                    >
                      ტელეფონის ნომერი *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={focusGold}
                      onBlur={blurGray}
                      placeholder="+995 5XX XX XX XX"
                      style={inputBase}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs tracking-widest uppercase font-semibold mb-2"
                    style={{ color: NAVY }}
                  >
                    ელ-ფოსტა
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={focusGold}
                    onBlur={blurGray}
                    placeholder="giorgi@example.ge"
                    style={inputBase}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs tracking-widest uppercase font-semibold mb-2"
                    style={{ color: NAVY }}
                  >
                    თქვენი შეტყობინება *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={focusGold}
                    onBlur={blurGray}
                    rows={5}
                    placeholder="მოკლედ აღწერეთ თქვენი სიტუაცია..."
                    style={{ ...inputBase, resize: "none" }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-sm tracking-wide font-semibold text-white transition-all duration-200 focus:outline-none"
                  style={{ backgroundColor: NAVY }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK_GOLD)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = NAVY)
                  }
                >
                  კონსულტაციის მოთხოვნა
                </button>
                <p className="text-xs text-slate-400 text-center">
                  ყველა განაცხადი დაცულია ადვოკატ-კლიენტის კონფიდენციალობის პრინციპით.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: NAVY_DEEP }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/darchialogo.png"
                alt="დარჩია და პარტნიორები"
                className="h-8 w-auto object-contain"
                style={{ maxWidth: "140px", opacity: 0.9, filter: "brightness(0) invert(1)" }}
              />
              <span
                className="text-xs font-medium"
                style={{ color: `${GOLD}99` }}
              >
                საადვოკატო ბიურო
              </span>
            </div>
            <p className="text-xs text-slate-500 text-center">
              © 2024 შპს „დარჩია და პარტნიორები" · +995 32 211 05 06 · giadarchia@gmail.com
            </p>
            <div className="flex gap-6">
              {["კონფიდენციალობა", "დაგვიკავშირდით"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo("contact")}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LawDemoClassic;
