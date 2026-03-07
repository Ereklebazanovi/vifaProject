import React, { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "სერვისები", href: "services" },
  { label: "ჩვენს შესახებ", href: "about" },
  { label: "ჩვენი გუნდი", href: "team" },
  { label: "პროცესი", href: "process" },
  // { label: "კონტაქტი", href: "contact" },
];

const SERVICES = [
  {
    num: "01",
    title: "სისხლის სამართალი",
    desc: "დაცვა და წარმომადგენლობა ყველა ეტაპზე — გამოძიებიდან სასამართლო განხილვამდე. გარანტირებული პროფესიონალიზმი.",
  },
  {
    num: "02",
    title: "სამოქალაქო სამართალი",
    desc: "ქონებრივი, საოჯახო და სახელშეკრულებო დავები. თქვენი ინტერესების სრულყოფილი დაცვა სასამართლოში.",
  },
  {
    num: "03",
    title: "ადმინისტრაციული სამართალი",
    desc: "დავები სახელმწიფო ორგანოებთან — ლიცენზიები, ნებართვები, ადმინისტრაციული სანქციები და სხვა.",
  },
  {
    num: "04",
    title: "კორპორატიული მომსახურება",
    desc: "კომპანიის რეგისტრაცია, კონტრაქტები და კორპორატიული მართვა — ყოვლისმომცველი სამართლებრივი მხარდაჭერა.",
  },
];



const TEAM = [
  { initials: "გ·დ", name: "გიორგი დარჩია", role: "მენეჯინგ პარტნიორი", exp: "22 წელი" },
  { initials: "ნ·კ", name: "ნინო კვარაცხელია", role: "უფროსი პარტნიორი", exp: "17 წელი" },
  { initials: "დ·მ", name: "დავით მამულაშვილი", role: "პარტნიორი", exp: "11 წელი" },
];

const TEAM_PHOTOS = [
  { src: "/photo1.jpg", title: "პარტნიორი", desc: "მრავალწლიანი გამოცდილება საერთო სპეციალიზაციით." },
  { src: "photo2.jpg", title: "პარტნიორი", desc: "სამოქალაქო და სისხლის სამართლის სფეროში." },
  { src: "photo3.jpg", title: "პარტნიორი", desc: "ადმინისტრაციული და კორპორატიული სამართალი." },
  { src: "photo4.jpg", title: "პარტნიორი", desc: "მრავალწლიანი გამოცდილება საერთო სპეციალიზაციით." },
  
  { src: "photo6.jpg", title: "პარტნიორი", desc: "მრავალწლიანი გამოცდილება საერთო სპეციალიზაციით." },
];
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

const INDIGO = "#4f46e5";
const DARK = "#0f172a";

const inputCls =
  "w-full px-4 py-3 text-sm border border-slate-200 outline-none bg-white text-slate-900 placeholder-slate-300 transition-colors duration-150";

const LawDemoModern: React.FC = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700;800;900&display=swap";
    link.id = "law-demo-modern-fonts";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.id = "law-demo-modern-styles";
    style.textContent = `
      .law-demo-modern,
      .law-demo-modern p,
      .law-demo-modern a,
      .law-demo-modern button,
      .law-demo-modern input,
      .law-demo-modern textarea,
      .law-demo-modern select,
      .law-demo-modern label,
      .law-demo-modern span,
      .law-demo-modern h1,
      .law-demo-modern h2,
      .law-demo-modern h3,
      .law-demo-modern h4,
      .law-demo-modern li {
        font-family: 'Noto Sans Georgian', 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("law-demo-modern-fonts")?.remove();
      document.getElementById("law-demo-modern-styles")?.remove();
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const focusIndigo = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = INDIGO;
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.07)";
  };
  const blurSlate = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "#e2e8f0";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div
      className="law-demo-modern bg-white min-h-screen"
      style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
    >
      {/* ── FIXED NAVBAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled ? "1px solid #e2e8f0" : "1px solid #f1f5f9",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("hero")}
              className="focus:outline-none flex items-center gap-4"
            >
              <img
                src="/darchialogo.png"
                alt="დარჩია და პარტნიორები"
                className="h-12 w-auto object-contain"
                style={{ maxWidth: "180px", mixBlendMode: "multiply" }}
              />
              <div className="hidden sm:block border-l border-slate-200 pl-4">
                <div className="text-sm font-semibold tracking-tight text-slate-800">
                  საადვოკატო ბიურო
                </div>
                <div className="text-[11px] text-slate-400 tracking-wide">
                  დაარსებულია 2015 წელს
                </div>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollTo(href)}
                  className="text-[15px] font-medium transition-colors duration-150 focus:outline-none"
                  style={{ color: "#374151", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = DARK)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "#374151")
                  }
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="ml-3 px-7 py-3 text-[15px] font-semibold text-white transition-all duration-200 focus:outline-none"
                style={{ backgroundColor: DARK }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = INDIGO)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK)
                }
              >
                კონსულტაცია
              </button>
            </nav>

            {/* Mobile right-side actions */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Phone CTA */}
              <a
                href="tel:+995322110506"
                className="flex items-center justify-center w-9 h-9 transition-colors duration-150 focus:outline-none"
                style={{ color: "#475569" }}
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
              <div className="w-px h-5 bg-slate-200" />

              {/* Hamburger + MENU */}
              <button
                className="flex items-center gap-2 focus:outline-none"
                style={{ color: "#334155" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
              >
                <div className="flex flex-col justify-center gap-1">
                  <div className="w-5 h-px bg-current" />
                  <div className="w-5 h-px bg-current" />
                  <div className="w-5 h-px bg-current" />
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "#64748b" }}
                >
                  MENU
                </span>
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4 space-y-1 bg-white">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => { scrollTo(href); setMenuOpen(false); }}
                  className="block w-full text-left px-2 py-3.5 text-[15px] font-medium focus:outline-none transition-colors duration-150"
                  style={{ color: "#475569", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = DARK)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "#475569")
                  }
                >
                  {label}
                </button>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => { scrollTo("contact"); setMenuOpen(false); }}
                  className="w-full py-4 text-[15px] font-semibold text-white focus:outline-none"
                  style={{ backgroundColor: DARK }}
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
        className="relative flex items-center overflow-hidden pt-24 pb-10 md:pt-20 md:pb-24"
        style={{ minHeight: "auto" }}
      >
        {/* Background — dramatic dark glass skyscraper */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        {/* Dark overlay — ensures white text is 100% legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(9,14,31,0.94) 0%, rgba(9,14,31,0.88) 50%, rgba(9,14,31,0.70) 100%)",
          }}
        />
        {/* Subtle indigo vignette bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, rgba(79,70,229,0.08), transparent)" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            {/* Eyebrow - Compact mb-4 */}
            <div className="flex items-center justify-center md:justify-start gap-2.5 mb-6">
              <div className="w-5 h-px" style={{ backgroundColor: INDIGO }} />
              <span
                className="text-[10px] font-medium tracking-[0.35em] uppercase"
                style={{ color: "#a5b4fc" }}
              >
                2015 წლიდან თქვენს გვერდით
              </span>
              <div className="w-5 h-px md:hidden" style={{ backgroundColor: INDIGO }} />
            </div>

            {/* Title - Scaled for mobile (text-3xl) */}
            <h1
              className="text-3xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 text-white"
            >
              საადვოკატო ბიურო
              <br />
              „<span className="text-indigo-500">დარჩია</span> და
              <br className="hidden md:block" />
              პარტნიორები“
            </h1>

            {/* Subtitle - Reduced margin */}
            <p
              className="text-base md:text-xl leading-relaxed mb-8 max-w-xl mx-auto md:mx-0"
              style={{ color: "rgba(226,232,240,0.80)" }}
            >
              თქვენი უფლებების საიმედო დაცვა ყველა ინსტანციაში. მრავალწლიანი გამოცდილება და პროფესიონალიზმი.


            </p>

            {/* Buttons - Symmetrical stacking for mobile */}
            <div className="flex flex-col sm:flex-row gap-3 items-center md:items-start justify-center md:justify-start">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 focus:outline-none"
                style={{ backgroundColor: INDIGO }}
              >
                უფასო კონსულტაცია
                <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                  <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold transition-all duration-200 focus:outline-none border"
                style={{ color: "#e2e8f0", borderColor: "rgba(255,255,255,0.25)", backgroundColor: "transparent" }}
              >
                სერვისები →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20" style={{ backgroundColor: "#f1f5f9" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: INDIGO }} />
                <span className="text-xs font-medium text-slate-400 tracking-[0.3em] uppercase">
                  სამართლებრივი დახმარება
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ color: DARK }}
              >
                ჩვენი სერვისები
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              კვალიფიციური სამართლებრივი მომსახურება სისხლის, სამოქალაქო,
              ადმინისტრაციულ და კორპორატიულ სფეროში.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICES.map(({ num, title, desc }) => (
              <div
                key={num}
                className="p-8 bg-white border border-slate-200 transition-all duration-200 cursor-default"
                style={{
                  borderTopWidth: "3px",
                  borderTopColor: INDIGO,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#a5b4fc";
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = INDIGO;
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 10px 36px rgba(79,70,229,0.10)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#e2e8f0";
                  (e.currentTarget as HTMLDivElement).style.borderTopColor = INDIGO;
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 1px 4px rgba(0,0,0,0.05)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="text-xs font-bold tracking-widest mb-5"
                  style={{ color: "#c7d2fe" }}
                >
                  {num}
                </div>
                <h3
                  className="text-xl font-bold mb-3 tracking-tight"
                  style={{ color: DARK }}
                >
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-xs font-semibold tracking-widest uppercase transition-colors duration-150 focus:outline-none"
                  style={{ color: INDIGO, background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = DARK)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = INDIGO)
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
      <section id="about" className="py-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — text */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: INDIGO }} />
                <span className="text-xs font-medium text-slate-400 tracking-[0.3em] uppercase">
                  ჩვენს შესახებ
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8"
                style={{ color: DARK }}
              >
                სამართლებრივი
                <br />
                პარტნიორობა.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-5 text-lg">
                შპს „დარჩია და პარტნიორები" დაარსდა 2015 წელს და ამ პერიოდიდან
                ახორციელებს ფიზიკური და იურიდიული პირების სამართლებრივი
                ინტერესების დაცვას სასამართლოსა თუ სხვა სახელმწიფო
                დაწესებულებებში.
              </p>
              <p className="text-slate-500 leading-relaxed mb-5">
                კომპანია იურიდიული მომსახურებას უწევს არაერთ სამეწარმეო
                სუბიექტს, რომლებიც ოპერირებენ წიაღის, სამშენებლო, საკვები
                პროდუქტების და საკრედიტო სფეროში.
              </p>
              <p className="text-slate-500 leading-relaxed mb-8">
                ჩვენს გუნდს გააჩნია საერთო სპეციალიზაცია სისხლის, სამოქალაქო
                და ადმინისტრაციულ-სამართლებრივი მიმართულებით. საადვოკატო
                მომსახურება ხელმისაწვდომია ქართულ, რუსულ და ინგლისურ ენებზე.
              </p>

             
            </div>

            {/* Right — team cards */}
            <div className="space-y-3">
              {TEAM.map(({ initials, name, role, exp }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 p-5 border border-slate-100 bg-white transition-all duration-200"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 4px 16px rgba(79,70,229,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#f1f5f9";
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.04)";
                  }}
                >
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: DARK }}
                  >
                    {initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold tracking-tight text-sm"
                      style={{ color: DARK }}
                    >
                      {name}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{role}</div>
                  </div>
                  {/* Experience badge */}
                  <div
                    className="text-xs font-medium px-3 py-1.5 shrink-0"
                    style={{
                      backgroundColor: "#eef2ff",
                      color: INDIGO,
                    }}
                  >
                    {exp}
                  </div>
                </div>
              ))}

              {/* Languages badge */}
              <div
                className="p-5 border border-slate-100 bg-slate-50"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}
              >
                <div
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: INDIGO }}
                >
                  სამუშაო ენები
                </div>
                <div className="flex gap-2">
                  {["ქართული", "რუსული", "ინგლისური"].map((lang) => (
                    <span
                      key={lang}
                      className="text-xs font-medium px-3 py-1.5"
                      style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", color: "#475569" }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: INDIGO }} />
              <span className="text-xs font-medium text-slate-400 tracking-[0.3em] uppercase">
                საადვოკატო გუნდი
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight"
              style={{ color: DARK }}
            >
              ჩვენი გუნდი
            </h2>
          </div>

          {/* Photo Grid — 3×2, modern airy cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_PHOTOS.map(({ src, title, desc }) => (
              <div
                key={src}
                className="group rounded-lg overflow-hidden border border-slate-100 transition-all duration-200"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 8px 28px rgba(79,70,229,0.10)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#f1f5f9";
                }}
              >
                {/* Photo */}
                <div className="overflow-hidden">
                  <img
                    src={src}
                    alt={title}
                    className="w-full object-cover object-top block transition-transform duration-300 group-hover:scale-105"
                    style={{ aspectRatio: "4/3" }}
                  />
                </div>
                {/* Caption */}
                <div className="p-4 bg-white">
                  <div
                    className="font-semibold text-sm"
                    style={{ color: DARK }}
                  >
                    {title}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: INDIGO }} />
                <span className="text-xs font-medium text-slate-400 tracking-[0.3em] uppercase">
                  დაგვიკავშირდით
                </span>
              </div>
              <h2
                className="text-4xl font-bold tracking-tight leading-tight mb-5"
                style={{ color: DARK }}
              >
                კონსულტაციის
                <br />
                მოთხოვნა.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-10">
                ჩვენი ადვოკატები მზად არიან განიხილონ თქვენი სიტუაცია
                კონფიდენციალურ გარემოში.
              </p>

              <div className="space-y-5">
                {[
                  {
                    label: "მისამართი",
                    value: "დ. აღმაშენებლის ხეივანი 66ბ\nთბილისი 0131, საქართველო",
                  },
                  { label: "ტელეფონი", value: "+995 32 211 05 06" },
                  { label: "ელ-ფოსტა", value: "giadarchia@gmail.com" },
                  { label: "სამუშაო საათები", value: "ორშ – პარ: 10:00 – 18:00" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-9 h-9 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: "#f1f5f9" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: INDIGO }}
                      />
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest mb-0.5"
                        style={{ color: INDIGO }}
                      >
                        {label}
                      </div>
                      <div className="text-sm text-slate-600 whitespace-pre-line">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                      სახელი და გვარი *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={focusIndigo}
                      onBlur={blurSlate}
                      placeholder="გიორგი ბერიძე"
                      className={inputCls}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                      ტელეფონი *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={focusIndigo}
                      onBlur={blurSlate}
                      placeholder="+995 5XX XX XX XX"
                      className={inputCls}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    ელ-ფოსტა
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={focusIndigo}
                    onBlur={blurSlate}
                    placeholder="giorgi@example.ge"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    თქვენი შეტყობინება *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={focusIndigo}
                    onBlur={blurSlate}
                    rows={5}
                    placeholder="მოკლედ აღწერეთ თქვენი სიტუაცია..."
                    className={inputCls}
                    style={{ resize: "none" }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold text-white transition-all duration-200 focus:outline-none inline-flex items-center justify-center gap-2"
                  style={{ backgroundColor: DARK }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = INDIGO)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = DARK)
                  }
                >
                  კონსულტაციის მოთხოვნა
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z" clipRule="evenodd" />
                  </svg>
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
      <footer className="border-t border-slate-100 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src="/darchialogo.png"
                alt="დარჩია და პარტნიორები"
                className="h-7 w-auto object-contain"
                style={{ maxWidth: "120px", mixBlendMode: "multiply", opacity: 0.85 }}
              />
              <span className="text-xs font-medium text-slate-500">საადვოკატო ბიურო</span>
            </div>

            <p className="text-xs text-slate-400 text-center">
              © 2015 შპს „დარჩია და პარტნიორები" · +995 32 211 05 06 · giadarchia@gmail.com
            </p>

            <div className="flex items-center gap-6">
              {["კონფიდენციალობა", "დაგვიკავშირდით"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo("contact")}
                  className="text-xs text-slate-400 transition-colors focus:outline-none"
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "#475569")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.color = "#94a3b8")
                  }
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

export default LawDemoModern;
