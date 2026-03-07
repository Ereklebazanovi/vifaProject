import React, { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "Corporate Advisory",
    desc: "End-to-end counsel for complex transactions, governance frameworks, and regulatory compliance at the enterprise level.",
    tags: ["M&A", "Governance", "Compliance"],
  },
  {
    num: "02",
    title: "Dispute Resolution",
    desc: "Strategic litigation and alternative dispute resolution, delivering decisive outcomes in high-stakes commercial matters.",
    tags: ["Litigation", "Arbitration", "Mediation"],
  },
  {
    num: "03",
    title: "Real Estate & Finance",
    desc: "Sophisticated counsel for complex real estate transactions, project finance, and capital markets across all asset classes.",
    tags: ["Commercial", "Financing", "Development"],
  },
  {
    num: "04",
    title: "Technology & IP",
    desc: "Protecting innovation through comprehensive IP strategy, licensing, and enforcement in a rapidly evolving landscape.",
    tags: ["Patents", "Licensing", "Data Privacy"],
  },
  {
    num: "05",
    title: "Employment & People",
    desc: "Forward-thinking employment counsel that balances organizational objectives with workforce rights and regulatory demands.",
    tags: ["Workplace", "EEOC", "Benefits"],
  },
  {
    num: "06",
    title: "Private Wealth",
    desc: "Integrated estate planning, trust structuring, and succession advisory for high-net-worth individuals and families.",
    tags: ["Trusts", "Estates", "Family Office"],
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Initial Consultation",
    desc: "A confidential conversation to understand your matter, assess the landscape, and determine the optimal path forward.",
  },
  {
    step: "02",
    title: "Strategic Assessment",
    desc: "Our team conducts a thorough analysis of your position, identifying risks, opportunities, and the full range of outcomes.",
  },
  {
    step: "03",
    title: "Tailored Engagement",
    desc: "We build a dedicated team with the precise expertise your matter requires, aligned around clear objectives and milestones.",
  },
  {
    step: "04",
    title: "Decisive Execution",
    desc: "Rigorous execution with continuous communication, adapting to developments while keeping your interests central.",
  },
];

const STATS = [
  { num: "37", suffix: "+", label: "Years of Practice" },
  { num: "2.4", suffix: "k+", label: "Matters Resolved" },
  { num: "98", suffix: "%", label: "Client Retention" },
  { num: "45", suffix: "", label: "Expert Attorneys" },
];

const LawDemoModern: React.FC = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setFormState({ ...formState, [e.target.name]: e.target.value });

  return (
    <div
      className="bg-white min-h-screen"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >

      {/* ── NAVBAR ── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #f1f5f9" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-5">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#0f172a" }}
              >
                V&amp;C
              </div>
              <div>
                <div
                  className="text-sm font-semibold tracking-tight"
                  style={{ color: "#0f172a" }}
                >
                  Vance &amp; Cole
                </div>
                <div className="text-xs text-slate-400 tracking-wide">Legal</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {["Services", "About", "Process", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-150"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+12125550100"
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
                +1 (212) 555-0100
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-semibold text-white rounded-sm transition-all duration-200"
                style={{ backgroundColor: "#0f172a" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4f46e5")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0f172a")
                }
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 text-slate-600"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4 space-y-2 bg-white">
              {["Services", "About", "Process", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-2 py-2 text-sm text-slate-700 hover:text-slate-900"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <a
                  href="#contact"
                  className="block px-4 py-2.5 text-sm font-semibold text-white text-center rounded-sm"
                  style={{ backgroundColor: "#0f172a" }}
                  onClick={() => setMenuOpen(false)}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center"
        style={{ backgroundColor: "#fafafa", paddingTop: "80px" }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 60%, #fafafa 100%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                <span className="text-xs font-medium text-slate-500 tracking-widest uppercase">
                  Strategic Legal Advisory
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
                style={{ color: "#0f172a" }}
              >
                Law, Reimagined
                <br />
                for the
                <br />
                <span className="text-indigo-600">Modern World.</span>
              </h1>

              <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-xl">
                Vance &amp; Cole is a new generation legal practice built for the demands of modern
                business. Precise. Fast. Unconflicted.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-sm transition-all duration-200"
                  style={{ backgroundColor: "#0f172a" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4f46e5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#0f172a")
                  }
                >
                  Start a Conversation
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z" clipRule="evenodd"/>
                  </svg>
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-semibold rounded-sm transition-all duration-200 text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-slate-900"
                >
                  View Services
                </a>
              </div>
            </div>

            {/* Stats panel */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ num, suffix, label }) => (
                  <div
                    key={label}
                    className="p-6 border border-slate-100 bg-white hover:border-indigo-200 transition-colors duration-200"
                    style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                  >
                    <div
                      className="text-4xl font-bold tracking-tight mb-1"
                      style={{ color: "#0f172a" }}
                    >
                      {num}
                      <span className="text-indigo-600">{suffix}</span>
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badge */}
              <div
                className="mt-4 p-4 border border-slate-100 bg-white flex items-center gap-3"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="text-indigo-600 text-xl">✓</div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">
                    Chambers USA Ranked
                  </div>
                  <div className="text-xs text-slate-400">
                    Band 1 · Corporate / M&amp;A · 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                  What We Do
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ color: "#0f172a" }}
              >
                Practice Areas
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Deep expertise across the legal disciplines that matter most to ambitious organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(({ num, title, desc, tags }) => (
              <div
                key={num}
                className="group p-7 bg-white border border-slate-100 transition-all duration-200 cursor-pointer"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#c7d2fe";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(79,70,229,0.08)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "#f1f5f9";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                <div
                  className="text-xs font-bold tracking-widest mb-4"
                  style={{ color: "#c7d2fe" }}
                >
                  {num}
                </div>
                <h3
                  className="text-lg font-bold mb-3 tracking-tight"
                  style={{ color: "#0f172a" }}
                >
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: "#eef2ff",
                        color: "#4f46e5",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                  About the Firm
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8"
                style={{ color: "#0f172a" }}
              >
                A Different Kind
                <br />
                of Law Firm.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6 text-lg">
                Vance &amp; Cole was founded on a simple premise: that the best legal advice comes
                from attorneys who are deeply invested in their clients' success, not just in
                billing hours.
              </p>
              <p className="text-slate-500 leading-relaxed mb-10">
                We are selective about the clients we serve. This allows our attorneys to develop
                genuine expertise in your industry, anticipate issues before they arise, and
                deliver the kind of proactive counsel that creates real competitive advantage.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { num: "2012", label: "Founded" },
                  { num: "8", label: "Offices" },
                  { num: "#1", label: "in Client NPS" },
                ].map(({ num, label }) => (
                  <div key={label} className="border-l-2 border-indigo-600 pl-4">
                    <div
                      className="text-2xl font-bold tracking-tight"
                      style={{ color: "#0f172a" }}
                    >
                      {num}
                    </div>
                    <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual panel */}
            <div className="space-y-4">
              {/* Featured attorney card */}
              <div
                className="p-8 border border-slate-100"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-sm flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: "#0f172a" }}
                  >
                    AV
                  </div>
                  <div>
                    <div
                      className="font-semibold tracking-tight"
                      style={{ color: "#0f172a" }}
                    >
                      Alexis Vance
                    </div>
                    <div className="text-sm text-slate-400">Founding Partner · Corporate</div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed italic">
                  "We measure our success by a single metric: whether our clients are better
                  positioned after working with us than before. Everything else follows from that."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Legal 500 Recognized", sub: "Corporate · 2023–24" },
                  { label: "Pro Bono Commitment", sub: "500+ hours annually" },
                ].map(({ label, sub }) => (
                  <div
                    key={label}
                    className="p-5 border border-slate-100 bg-slate-50"
                  >
                    <div
                      className="text-sm font-semibold mb-1"
                      style={{ color: "#0f172a" }}
                    >
                      {label}
                    </div>
                    <div className="text-xs text-slate-400">{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ backgroundColor: "#0f172a" }} className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
              <span className="text-xs font-medium text-slate-500 tracking-widest uppercase">
                How We Work
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Our Process
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800">
            {PROCESS_STEPS.map(({ step, title, desc }, idx) => (
              <div
                key={step}
                className="p-8 transition-colors duration-200 group"
                style={{ backgroundColor: "#0f172a" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#1e293b")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.backgroundColor = "#0f172a")
                }
              >
                <div
                  className="text-4xl font-bold tracking-tight mb-6 opacity-20 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: "#6366f1" }}
                >
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 tracking-tight">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="mt-6 text-slate-600 text-xs">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
                  Contact
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
                style={{ color: "#0f172a" }}
              >
                Let's Start
                <br />
                a Conversation.
              </h2>
              <p className="text-slate-500 leading-relaxed mb-12 text-lg">
                Whether you have a specific matter in mind or simply want to explore what a modern
                legal partnership looks like, we'd like to hear from you.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: "📍",
                    title: "New York",
                    detail: "One World Trade Center, Suite 8500",
                  },
                  { icon: "📞", title: "Call", detail: "+1 (212) 555-0100" },
                  { icon: "✉️", title: "Email", detail: "hello@vancecole.com" },
                ].map(({ icon, title, detail }) => (
                  <div key={title} className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center text-sm flex-shrink-0"
                      style={{ backgroundColor: "#f1f5f9" }}
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5"
                      >
                        {title}
                      </div>
                      <div className="text-sm text-slate-700">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  {[
                    { name: "name", label: "Full Name", placeholder: "Jane Smith", type: "text" },
                    { name: "email", label: "Email Address", placeholder: "jane@company.com", type: "email" },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name}>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                        {label}
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formState[name as keyof typeof formState]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 text-sm border border-slate-200 outline-none rounded-sm transition-colors duration-150 bg-white text-slate-900 placeholder-slate-300"
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#6366f1";
                          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#e2e8f0";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 text-sm border border-slate-200 outline-none rounded-sm transition-colors duration-150 bg-white text-slate-900 placeholder-slate-300"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#6366f1";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Area of Interest
                  </label>
                  <select
                    name="service"
                    value={formState.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-slate-200 outline-none rounded-sm transition-colors duration-150 bg-white text-slate-900"
                    style={{ color: formState.service ? "#0f172a" : "#cbd5e1" }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#6366f1";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <option value="" disabled>Select a service area</option>
                    {SERVICES.map(({ title }) => (
                      <option key={title} value={title} style={{ color: "#0f172a" }}>
                        {title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                    Tell us about your matter
                  </label>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Give us a brief overview of what you're looking to accomplish..."
                    className="w-full px-4 py-3 text-sm border border-slate-200 outline-none rounded-sm transition-colors duration-150 bg-white text-slate-900 placeholder-slate-300 resize-none"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#6366f1";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.08)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e2e8f0";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-sm font-semibold text-white rounded-sm transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#0f172a" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#4f46e5")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0f172a")
                  }
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 01.5-.5h5.793L8.146 5.354a.5.5 0 11.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L10.293 8.5H4.5A.5.5 0 014 8z" clipRule="evenodd"/>
                  </svg>
                </button>

                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  All communications are subject to attorney-client privilege.
                  We respond within one business day.
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
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: "#0f172a" }}
              >
                V
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Vance &amp; Cole Legal
              </span>
            </div>

            <p className="text-xs text-slate-400 text-center">
              © 2024 Vance &amp; Cole LLP · All Rights Reserved · Attorney Advertising
            </p>

            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Accessibility"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-slate-400 hover:text-slate-700 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LawDemoModern;
