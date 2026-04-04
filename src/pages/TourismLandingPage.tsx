import React, { useEffect, useState } from "react";

// ─── Bilingual content ───────────────────────────────────────────────────────
const T = {
  ka: {
    // Navbar
    nav_home: "მთავარი",
    nav_about: "ჩვენს შესახებ",
    nav_rooms: "ოთახები",
    nav_booking: "ჯავშანი",
    nav_gallery: "გალერეა",
    nav_contact: "კონტაქტი",
    nav_book_now: "ახლავე დაჯავშნე",

    // Hero
    hero_tagline: "საქართველო გელოდება",
    hero_h1_line1: "გაგეხსნება",
    hero_h1_line2: "ოცნების შვებულება",
    hero_sub: "შავი ზღვის სანაპიროზე, სადაც სიმშვიდე, ფუფუნება და ქართული სტუმართმოყვარეობა ერთ სახლში ხვდება.",
    hero_cta: "ოთახის არჩევა",
    hero_cta2: "გაიგე მეტი",

    // About
    about_sub: "ჩვენს შესახებ",
    about_h2: "ფუფუნებული გამოცდილება,\nრომელსაც არ დაივიწყებ",
    about_p: "მოგესალმებით ჩვენს ელეგანტურ სასტუმროში, სადაც სრულყოფილება, განსაკუთრებული სერვისი და შეუდარებელი კომფორტი გელოდებათ. ჩვენი სასტუმრო გთავაზობთ შავი ზღვის ულამაზეს ხედს, ქართულ სამზარეულოს და სპა-ცენტრს. თქვენი ყოველი ვიზიტი — განსაკუთრებული მოგონება.",
    about_cta: "ოთახების ნახვა",

    // Facilities
    facilities_h2: "სასტუმროს სერვისები",
    fac_restaurant: "რესტორანი",
    fac_restaurant_p: "ქართული ტრადიციული სამზარეულო და საერთაშორისო კერძები პირველი კლასის შეფ-მზარეულებისგან.",
    fac_pool: "საცურაო აუზი",
    fac_pool_p: "გახსნილი 24 საათის განმავლობაში, ზღვის ხედით. ინფრაწითელი საუნა და ჰიდრომასაჟი.",
    fac_fitness: "ფიტნეს ცენტრი",
    fac_fitness_p: "თანამედროვე სპორტული ინვენტარით აღჭურვილი ფიტნეს ცენტრი პირადი ტრენერის სერვისით.",
    fac_bar: "ბარი",
    fac_bar_p: "ლოკალური ღვინოები, კოლხური ჩაჩა და სეზონური კოქტეილები ლამაზ ტერასაზე.",
    fac_meeting: "კონფერენც-დარბაზი",
    fac_meeting_p: "სრულად აღჭურვილი საკონფერენციო სივრცე — ბიზნეს-ღონისძიებებისა და წვეულებებისთვის.",
    fac_laundry: "სარეცხი სერვისი",
    fac_laundry_p: "სწრაფი და ეფექტური სარეცხი სერვისი ყველა სტუმრისთვის 24/7 გრაფიკით.",
    fac_tv: "სატელიტური TV",
    fac_tv_p: "200+ საერთაშორისო არხი ინგლისურ, ქართულ, რუსულ და სხვა ენებზე.",
    fac_safe: "სეიფი",
    fac_safe_p: "ყველა ოთახში ციფრული სეიფი — თქვენი ფასეულობების სრული დაცვისათვის.",
    fac_parking: "სადგომი",
    fac_parking_p: "სამ დონიანი охраняемый სადგომი, 24/7 ვიდეო მეთვალყურეობით.",

    // Rooms
    rooms_sub: "ოთახები",
    rooms_h2: "აირჩიე შენი ოთახი",
    room_left: "დარჩა",
    room_guests: "სტუმარი",
    room_book: "ახლავე დაჯავშნე",
    room_from: "ღამიდან",
    rooms: [
      { name: "სტანდარტული ოთახი", size: "30 მ²", guests: 2, price: "$29", label: "2 ოთახი დარჩა", img: "1" },
      { name: "დელუქს ოთახი", size: "35 მ²", guests: 2, price: "$39", label: "1 ოთახი დარჩა", img: "2" },
      { name: "პრემიერ ოთახი", size: "40 მ²", guests: 2, price: "$49", label: "3 ოთახი დარჩა", img: "3" },
      { name: "საოჯახო სუიტი", size: "60 მ²", guests: 4, price: "$59", label: "2 ოთახი დარჩა", img: "4" },
      { name: "ლუქს სუიტი", size: "70 მ²", guests: 4, price: "$79", label: "2 ოთახი დარჩა", img: "5" },
      { name: "საპრეზიდენტო სუიტი", size: "90 მ²", guests: 4, price: "$99", label: "2 ოთახი დარჩა", img: "6" },
    ],

    // Booking
    booking_sub: "ჯავშანი",
    booking_h2: "დაჯავშნე ოთახი",
    book_date: "აირჩიეთ თარიღი",
    book_adults: "მოზრდილი",
    book_children: "ბავშვი",
    book_rooms: "ოთახი",
    book_room_type: "ოთახის ტიპი",
    book_your_details: "შეიყვანეთ თქვენი მონაცემები",
    book_name: "სახელი და გვარი",
    book_email: "ელ-ფოსტა",
    book_phone: "ტელეფონი",
    book_message: "შეტყობინება",
    book_submit: "გაგზავნა",

    // Footer
    footer_tagline: "სადაც ქართული სტუმართმოყვარეობა ხვდება ოკეანეს",
    footer_contact: "კონტაქტი",
    footer_address: "ბათუმი, ჩაქვი, 6010, საქართველო",
    footer_phone: "+995 422 23 00 00",
    footer_email: "info@seasidehotel.ge",
    footer_links: "გვერდები",
    footer_copyright: "© 2025 Seaside Hotel. ყველა უფლება დაცულია.",
    footer_powered: "შექმნილია Invento Technologies-ის მიერ",
  },
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_rooms: "Rooms",
    nav_booking: "Booking",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    nav_book_now: "Book Now",

    hero_tagline: "Georgia Is Waiting For You",
    hero_h1_line1: "Experience Your",
    hero_h1_line2: "Dream Vacation",
    hero_sub: "On the Black Sea coast, where tranquility, luxury, and Georgian hospitality meet under one roof.",
    hero_cta: "Choose Room",
    hero_cta2: "Learn More",

    about_sub: "About Us",
    about_h2: "The Luxury Experience\nYou'll Remember",
    about_p: "Welcome to our luxurious hotel, where sophistication, impeccable service, and unparalleled comfort await you. Nestled on the stunning Black Sea coastline, we offer breathtaking views, authentic Georgian cuisine, and a world-class spa. Every visit leaves a lasting memory.",
    about_cta: "View Rooms",

    facilities_h2: "Hotel Facilities",
    fac_restaurant: "Restaurant",
    fac_restaurant_p: "Traditional Georgian cuisine and international dishes from first-class chefs.",
    fac_pool: "Swimming Pool",
    fac_pool_p: "Open 24/7 with sea views. Infrared sauna and hydro-massage available.",
    fac_fitness: "Fitness Area",
    fac_fitness_p: "Modern fitness equipment with personal trainer service.",
    fac_bar: "Mini Bar",
    fac_bar_p: "Local wines, Colchian chacha and seasonal cocktails on a beautiful terrace.",
    fac_meeting: "Meeting Room",
    fac_meeting_p: "Fully equipped conference space for business events and celebrations.",
    fac_laundry: "Laundry Service",
    fac_laundry_p: "Fast and efficient laundry service for all guests on a 24/7 schedule.",
    fac_tv: "Satellite TV",
    fac_tv_p: "200+ international channels in English, Georgian, Russian and other languages.",
    fac_safe: "Safe Box",
    fac_safe_p: "Digital safe in every room for the complete protection of your valuables.",
    fac_parking: "Parking Area",
    fac_parking_p: "Three-level guarded parking with 24/7 video surveillance.",

    rooms_sub: "Rooms",
    rooms_h2: "Choose Your Room",
    room_left: "left",
    room_guests: "Guests",
    room_book: "Book Now For",
    room_from: "from",
    rooms: [
      { name: "Standard Room", size: "30 ft", guests: 2, price: "$29", label: "only 2 rooms left", img: "1" },
      { name: "Deluxe Room", size: "35 ft", guests: 2, price: "$39", label: "only 1 room left", img: "2" },
      { name: "Premier Room", size: "40 ft", guests: 2, price: "$49", label: "only 3 rooms left", img: "3" },
      { name: "Family Suite", size: "60 ft", guests: 4, price: "$59", label: "only 2 rooms left", img: "4" },
      { name: "Luxury Suite", size: "70 ft", guests: 4, price: "$79", label: "only 2 rooms left", img: "5" },
      { name: "Presidential Suite", size: "90 ft", guests: 4, price: "$99", label: "only 2 rooms left", img: "6" },
    ],

    booking_sub: "Reservations",
    booking_h2: "Book A Room",
    book_date: "Choose Date",
    book_adults: "Adult",
    book_children: "Children",
    book_rooms: "Room",
    book_room_type: "Room Type",
    book_your_details: "Enter Your Details",
    book_name: "Your Name",
    book_email: "Your Email",
    book_phone: "Your Phone",
    book_message: "Your Message",
    book_submit: "Submit",

    footer_tagline: "Where Georgian hospitality meets the ocean",
    footer_contact: "Contact",
    footer_address: "Batumi, Chakvi, 6010, Georgia",
    footer_phone: "+995 422 23 00 00",
    footer_email: "info@seasidehotel.ge",
    footer_links: "Pages",
    footer_copyright: "© 2025 Seaside Hotel. All rights reserved.",
    footer_powered: "Built by Invento Technologies",
  },
} as const;

type Lang = keyof typeof T;

// ─── Scroll helper ─────────────────────────────────────────────────────────
const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

type AnyRoom = typeof T.ka.rooms[number] | typeof T.en.rooms[number];
type AnyT = typeof T.ka | typeof T.en;

// ─── Room card ─────────────────────────────────────────────────────────────
const RoomCard: React.FC<{
  room: AnyRoom;
  t: AnyT;
  lang: Lang;
  hovered: boolean;
  onHover: (v: boolean) => void;
}> = ({ room, t, lang, hovered, onHover }) => (
  <div
    style={styles.roomCard}
    onMouseEnter={() => onHover(true)}
    onMouseLeave={() => onHover(false)}
  >
    <div style={styles.roomImageWrap}>
      <div style={styles.roomLabel}>{room.label}</div>
      <div style={styles.roomMeta}>
        <span style={styles.roomMetaItem}>👤 {room.guests} {t.room_guests}</span>
        <span style={styles.roomMetaItem}>📐 {room.size}</span>
      </div>
      <img
        src={hovered ? `/tourism/images/room/${room.img}-alt.jpg` : `/tourism/images/room/${room.img}.jpg`}
        alt={room.name}
        style={styles.roomImg}
      />
    </div>
    <div style={styles.roomText}>
      <h3 style={styles.roomName}>{room.name}</h3>
      <p style={styles.roomDesc}>
        {lang === "ka"
          ? "ფუფუნებული ინტერიერი, ზღვის პანორამული ხედი და ყველა საჭირო კომფორტი — ოჯახური დასვენებისთვის სრულყოფილი სივრცე."
          : "Luxurious interiors, panoramic sea views and all necessary amenities — the perfect space for a family getaway."}
      </p>
      <button
        onClick={() => scrollTo("booking")}
        style={styles.btnLine}
      >
        {t.room_book} {room.price}
      </button>
    </div>
  </div>
);

// ─── Facility card ─────────────────────────────────────────────────────────
const FacIcon: React.FC<{ emoji: string; title: string; desc: string }> = ({ emoji, title, desc }) => (
  <div style={styles.facBox}>
    <div style={styles.facIcon}>{emoji}</div>
    <div>
      <h3 style={styles.facTitle}>{title}</h3>
      <p style={styles.facDesc}>{desc}</p>
    </div>
  </div>
);

// ─── Counter ───────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+", label_ka: "სტუმარი წელიწადში", label_en: "Guests per year" },
  { value: "6", label_ka: "ოთახის ტიპი", label_en: "Room types" },
  { value: "15+", label_ka: "წლის გამოცდილება", label_en: "Years experience" },
  { value: "24/7", label_ka: "სერვისი", label_en: "Service" },
];

// ─── Main Component ────────────────────────────────────────────────────────
const TourismLandingPage: React.FC = () => {
  const [lang, setLang] = useState<Lang>("ka");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroImages = [
    "/tourism/images/slider/1.jpg",
    "/tourism/images/slider/2.jpg",
    "/tourism/images/slider/3.jpg",
  ];

  const t = T[lang];

  // Inject Seaside CSS into <head> once
  useEffect(() => {
    const links = [
      "/tourism/css/bootstrap.min.css",
      "/tourism/css/plugins.css",
      "/tourism/css/style.css",
      "/tourism/css/color.css",
      "/tourism/css/colors/brown.css",
    ];
    const injected: HTMLLinkElement[] = [];
    links.forEach((href) => {
      const existing = document.querySelector(`link[href="${href}"]`);
      if (!existing) {
        const el = document.createElement("link");
        el.rel = "stylesheet";
        el.href = href;
        document.head.appendChild(el);
        injected.push(el);
      }
    });
    // Inject Font Awesome
    const fa = document.querySelector('link[href*="font-awesome"]');
    if (!fa) {
      const el = document.createElement("link");
      el.rel = "stylesheet";
      el.href = "/tourism/fonts/font-awesome/css/font-awesome.min.css";
      document.head.appendChild(el);
      injected.push(el);
    }
    return () => {
      injected.forEach((el) => el.parentNode?.removeChild(el));
    };
  }, []);

  // Scroll listener for navbar
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Hero auto-slide
  useEffect(() => {
    const id = setInterval(() => setHeroSlide((s) => (s + 1) % heroImages.length), 5000);
    return () => clearInterval(id);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navLinks = [
    { key: "nav_home", id: "hero" },
    { key: "nav_about", id: "about" },
    { key: "nav_rooms", id: "rooms" },
    { key: "nav_booking", id: "booking" },
    { key: "nav_contact", id: "footer" },
  ] as const;

  return (
    <div style={styles.root} className="tourism-page">
      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>
        <div style={styles.navInner}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}
            style={styles.navLogo}
          >
            <span style={styles.navLogoIcon}>🌊</span>
            <span style={styles.navLogoText}>Seaside</span>
          </a>

          {/* Desktop links */}
          <ul style={styles.navLinks}>
            {navLinks.map(({ key, id }) => (
              <li key={key}>
                <a
                  href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                  style={styles.navLink}
                >
                  {t[key]}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div style={styles.navRight}>
            {/* Language switcher */}
            <div style={styles.langSwitch}>
              <button
                style={{ ...styles.langBtn, ...(lang === "ka" ? styles.langBtnActive : {}) }}
                onClick={() => setLang("ka")}
              >
                🇬🇪 ქარ
              </button>
              <button
                style={{ ...styles.langBtn, ...(lang === "en" ? styles.langBtnActive : {}) }}
                onClick={() => setLang("en")}
              >
                🇬🇧 Eng
              </button>
            </div>

            {/* Book Now CTA */}
            <button style={styles.navCta} onClick={() => scrollTo("booking")}>
              {t.nav_book_now}
            </button>

            {/* Hamburger */}
            <button
              style={styles.hamburger}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="menu"
            >
              <span style={{ ...styles.hamburgerLine, ...(menuOpen ? styles.hamLine1Open : {}) }} />
              <span style={{ ...styles.hamburgerLine, ...(menuOpen ? styles.hamLine2Open : {}) }} />
              <span style={{ ...styles.hamburgerLine, ...(menuOpen ? styles.hamLine3Open : {}) }} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU OVERLAY ────────────────────────────────────────── */}
      {menuOpen && (
        <div style={styles.mobileOverlay} onClick={() => setMenuOpen(false)}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div style={styles.mobileLogoRow}>
              <span style={{ ...styles.navLogoIcon, fontSize: "2rem" }}>🌊</span>
              <span style={{ ...styles.navLogoText, fontSize: "1.6rem", color: "#c9a96e" }}>Seaside</span>
            </div>
            {navLinks.map(({ key, id }) => (
              <a
                key={key}
                href={`#${id}`}
                style={styles.mobileLink}
                onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollTo(id); }}
              >
                {t[key]}
              </a>
            ))}
            <div style={{ marginTop: "2rem", display: "flex", gap: "0.5rem", justifyContent: "center" }}>
              <button style={{ ...styles.langBtn, ...(lang === "ka" ? styles.langBtnActive : {}) }} onClick={() => setLang("ka")}>🇬🇪 ქარ</button>
              <button style={{ ...styles.langBtn, ...(lang === "en" ? styles.langBtnActive : {}) }} onClick={() => setLang("en")}>🇬🇧 Eng</button>
            </div>
            <button style={{ ...styles.navCta, marginTop: "1.5rem", width: "100%" }} onClick={() => { setMenuOpen(false); scrollTo("booking"); }}>
              {t.nav_book_now}
            </button>
          </div>
        </div>
      )}

      {/* ── FLOATING SOCIAL ────────────────────────────────────────────── */}
      <div style={styles.floatBar}>
        <div style={styles.floatSocials}>
          <a href="#" style={styles.floatIcon} title="Facebook"><i className="fa fa-facebook" /></a>
          <a href="#" style={styles.floatIcon} title="Instagram"><i className="fa fa-instagram" /></a>
          <a href="#" style={styles.floatIcon} title="Twitter"><i className="fa fa-twitter" /></a>
        </div>
        <a
          href="#booking"
          style={styles.floatBookNow}
          onClick={(e) => { e.preventDefault(); scrollTo("booking"); }}
        >
          {t.nav_book_now}
        </a>
      </div>

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section id="hero" style={styles.hero}>
        {/* Slides */}
        {heroImages.map((img, i) => (
          <div
            key={img}
            style={{
              ...styles.heroSlide,
              backgroundImage: `url(${img})`,
              opacity: i === heroSlide ? 1 : 0,
            }}
          />
        ))}
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.heroTagline}>{t.hero_tagline}</p>
          <h1 style={styles.heroH1}>
            {t.hero_h1_line1}
            <br />
            <span style={styles.heroH1Gold}>{t.hero_h1_line2}</span>
          </h1>
          <p style={styles.heroSub}>{t.hero_sub}</p>
          <div style={styles.heroBtns}>
            <button style={styles.btnMain} onClick={() => scrollTo("rooms")}>
              {t.hero_cta}
            </button>
            <button style={styles.btnGhost} onClick={() => scrollTo("about")}>
              {t.hero_cta2}
            </button>
          </div>
        </div>
        {/* Slide indicators */}
        <div style={styles.heroIndicators}>
          {heroImages.map((_, i) => (
            <button
              key={i}
              style={{ ...styles.heroDot, ...(i === heroSlide ? styles.heroDotActive : {}) }}
              onClick={() => setHeroSlide(i)}
            />
          ))}
        </div>
        {/* Scroll hint */}
        <div style={styles.heroScroll} onClick={() => scrollTo("about")}>
          <div style={styles.heroScrollDot} />
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────── */}
      <div style={styles.statsBar}>
        {STATS.map((s) => (
          <div key={s.value} style={styles.statItem}>
            <span style={styles.statValue}>{s.value}</span>
            <span style={styles.statLabel}>{lang === "ka" ? s.label_ka : s.label_en}</span>
          </div>
        ))}
      </div>

      {/* ── ABOUT ──────────────────────────────────────────────────────── */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.aboutGrid}>
            {/* Images */}
            <div style={styles.aboutImages}>
              <img
                src="/tourism/images/misc/1.jpg"
                alt="hotel"
                style={{ ...styles.aboutImg, ...styles.aboutImg1 }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/tourism/images/background/1.jpg"; }}
              />
              <img
                src="/tourism/images/misc/2.jpg"
                alt="hotel interior"
                style={{ ...styles.aboutImg, ...styles.aboutImg2 }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/tourism/images/background/2.jpg"; }}
              />
            </div>
            {/* Text */}
            <div style={styles.aboutText}>
              <p style={styles.sectionSub}>{t.about_sub}</p>
              <h2 style={styles.sectionH2}>
                {t.about_h2.split("\n").map((line, i) => (
                  <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
                ))}
                <span style={styles.smallBorder} />
              </h2>
              <p style={styles.bodyText}>{t.about_p}</p>
              <button style={styles.btnLine} onClick={() => scrollTo("rooms")}>
                {t.about_cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACILITIES ─────────────────────────────────────────────────── */}
      <section id="facilities" style={{ ...styles.section, ...styles.sectionDark }}>
        <div
          style={{
            ...styles.sectionBg,
            backgroundImage: "url(/tourism/images/background/3.jpg)",
          }}
        />
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionH2, color: "#fff" }}>
              {t.facilities_h2}
              <span style={{ ...styles.smallBorder, background: "#c9a96e" }} />
            </h2>
          </div>
          <div style={styles.facGrid}>
            {[
              { emoji: "🍽️", title: t.fac_restaurant, desc: t.fac_restaurant_p },
              { emoji: "🏊", title: t.fac_pool, desc: t.fac_pool_p },
              { emoji: "💪", title: t.fac_fitness, desc: t.fac_fitness_p },
              { emoji: "🍸", title: t.fac_bar, desc: t.fac_bar_p },
              { emoji: "🖥️", title: t.fac_meeting, desc: t.fac_meeting_p },
              { emoji: "👕", title: t.fac_laundry, desc: t.fac_laundry_p },
              { emoji: "📺", title: t.fac_tv, desc: t.fac_tv_p },
              { emoji: "🔒", title: t.fac_safe, desc: t.fac_safe_p },
              { emoji: "🚗", title: t.fac_parking, desc: t.fac_parking_p },
            ].map((fac) => (
              <FacIcon key={fac.title} {...fac} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS ──────────────────────────────────────────────────────── */}
      <section id="rooms" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionHeader}>
            <p style={styles.sectionSub}>{t.rooms_sub}</p>
            <h2 style={styles.sectionH2}>
              {t.rooms_h2}
              <span style={styles.smallBorder} />
            </h2>
          </div>
          <div style={styles.roomGrid}>
            {(t.rooms as AnyRoom[]).map((room, i) => (
              <RoomCard
                key={room.name}
                room={room}
                t={t as AnyT}
                lang={lang}
                hovered={hoveredRoom === i}
                onHover={(v) => setHoveredRoom(v ? i : null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ────────────────────────────────────────────────────── */}
      <section
        id="booking"
        style={{
          ...styles.section,
          backgroundImage: "url(/tourism/images/background/2.jpg)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        <div style={styles.bookingOverlay} />
        <div style={{ ...styles.container, position: "relative", zIndex: 2 }}>
          <div style={styles.sectionHeader}>
            <p style={{ ...styles.sectionSub, color: "#c9a96e" }}>{t.booking_sub}</p>
            <h2 style={{ ...styles.sectionH2, color: "#fff" }}>
              {t.booking_h2}
              <span style={{ ...styles.smallBorder, background: "#c9a96e" }} />
            </h2>
          </div>

          <div style={styles.bookingCard}>
            <div style={styles.bookingRow}>
              {/* Date */}
              <div style={styles.bookingField}>
                <label style={styles.bookingLabel}>{t.book_date}</label>
                <input type="date" style={styles.bookingInput} />
              </div>
              {/* Counters */}
              {[t.book_adults, t.book_children, t.book_rooms].map((label, i) => (
                <CounterField key={label} label={label} initial={i === 0 ? 1 : 0} />
              ))}
            </div>

            {/* Room type */}
            <div style={styles.bookingField}>
              <label style={styles.bookingLabel}>{t.book_room_type}</label>
              <select style={styles.bookingInput}>
                {t.rooms.map((r) => (
                  <option key={r.name}>{r.name}</option>
                ))}
              </select>
            </div>

            <div style={styles.bookingDivider} />
            <p style={{ ...styles.bookingLabel, fontWeight: 700, fontSize: "1rem", marginBottom: "1.2rem" }}>
              {t.book_your_details}
            </p>

            <div style={styles.bookingDetailsGrid}>
              <div style={styles.bookingField}>
                <input type="text" placeholder={t.book_name} style={styles.bookingInput} />
              </div>
              <div style={styles.bookingField}>
                <input type="email" placeholder={t.book_email} style={styles.bookingInput} />
              </div>
              <div style={styles.bookingField}>
                <input type="tel" placeholder={t.book_phone} style={styles.bookingInput} />
              </div>
              <div style={styles.bookingField}>
                <textarea placeholder={t.book_message} style={{ ...styles.bookingInput, height: "80px", resize: "none" }} />
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button style={styles.btnMain} onClick={(e) => e.preventDefault()}>
                {t.book_submit}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────── */}
      <footer id="footer" style={styles.footer}>
        <div style={styles.footerBg} />
        <div style={{ ...styles.container, position: "relative", zIndex: 2 }}>
          <div style={styles.footerGrid}>
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "2rem" }}>🌊</span>
                <span style={{ fontSize: "1.6rem", fontWeight: 700, color: "#c9a96e", fontFamily: "serif" }}>Seaside</span>
              </div>
              <p style={{ color: "#aaa", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: "220px" }}>
                {t.footer_tagline}
              </p>
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.2rem" }}>
                {["facebook", "instagram", "twitter"].map((s) => (
                  <a key={s} href="#" style={styles.footerSocial}><i className={`fa fa-${s}`} /></a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={styles.footerHeading}>{t.footer_contact}</h4>
              <p style={styles.footerText}>📍 {t.footer_address}</p>
              <p style={styles.footerText}>📞 {t.footer_phone}</p>
              <p style={styles.footerText}>✉️ {t.footer_email}</p>
            </div>

            {/* Links */}
            <div>
              <h4 style={styles.footerHeading}>{t.footer_links}</h4>
              {navLinks.map(({ key, id }) => (
                <a
                  key={key}
                  href={`#${id}`}
                  style={styles.footerLink}
                  onClick={(e) => { e.preventDefault(); scrollTo(id); }}
                >
                  {t[key]}
                </a>
              ))}
            </div>
          </div>

          <div style={styles.footerBottom}>
            <span style={{ color: "#666", fontSize: "0.85rem" }}>{t.footer_copyright}</span>
            <span style={{ color: "#c9a96e", fontSize: "0.85rem" }}>{t.footer_powered}</span>
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP ────────────────────────────────────────────────── */}
      {scrolled && (
        <button style={styles.backToTop} onClick={() => scrollTo("hero")} aria-label="back to top">
          ↑
        </button>
      )}
    </div>
  );
};

// ─── Counter field ─────────────────────────────────────────────────────────
const CounterField: React.FC<{ label: string; initial: number }> = ({ label, initial }) => {
  const [val, setVal] = useState(initial);
  return (
    <div style={styles.bookingField}>
      <label style={styles.bookingLabel}>{label}</label>
      <div style={styles.counter}>
        <button style={styles.counterBtn} onClick={() => setVal((v) => Math.max(0, v - 1))}>−</button>
        <span style={styles.counterVal}>{val}</span>
        <button style={styles.counterBtn} onClick={() => setVal((v) => v + 1)}>+</button>
      </div>
    </div>
  );
};

// ─── Styles ────────────────────────────────────────────────────────────────
const GOLD = "#c9a96e";
const DARK = "#0d0d0d";
const DARK2 = "#141414";
const WHITE = "#ffffff";

const styles: Record<string, React.CSSProperties> = {
  root: {
    fontFamily: "'Crimson Text', 'Cormorant Garamond', 'Noto Sans Georgian', Georgia, serif",
    background: WHITE,
    color: DARK,
    overflowX: "hidden",
  },

  // Navbar
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    padding: "1.2rem 2rem",
    background: "transparent",
    transition: "all 0.4s ease",
  },
  navbarScrolled: {
    background: "rgba(13,13,13,0.97)",
    padding: "0.7rem 2rem",
    boxShadow: "0 2px 30px rgba(0,0,0,0.5)",
  },
  navInner: {
    maxWidth: "1280px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navLogo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
  },
  navLogoIcon: { fontSize: "1.5rem" },
  navLogoText: {
    fontSize: "1.4rem",
    fontWeight: 700,
    color: GOLD,
    letterSpacing: "0.05em",
    fontFamily: "serif",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "2rem",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "0.85rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    transition: "color 0.3s",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  langSwitch: {
    display: "flex",
    gap: "0.3rem",
  },
  langBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "rgba(255,255,255,0.7)",
    padding: "0.3rem 0.6rem",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.75rem",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
  },
  langBtnActive: {
    background: GOLD,
    border: `1px solid ${GOLD}`,
    color: DARK,
    fontWeight: 700,
  },
  navCta: {
    background: GOLD,
    color: DARK,
    border: "none",
    padding: "0.6rem 1.4rem",
    fontSize: "0.8rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
  },
  hamburger: {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  hamburgerLine: {
    display: "block",
    width: "24px",
    height: "2px",
    background: WHITE,
    transition: "all 0.3s",
  },
  hamLine1Open: { transform: "rotate(45deg) translate(5px, 5px)" },
  hamLine2Open: { opacity: 0 },
  hamLine3Open: { transform: "rotate(-45deg) translate(5px, -5px)" },

  // Mobile overlay
  mobileOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.8)",
    zIndex: 999,
    display: "flex",
    alignItems: "stretch",
    justifyContent: "flex-end",
  },
  mobileMenu: {
    width: "min(320px, 85vw)",
    background: DARK2,
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
    overflowY: "auto",
  },
  mobileLogoRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "2rem",
  },
  mobileLink: {
    color: "rgba(255,255,255,0.85)",
    textDecoration: "none",
    fontSize: "1.1rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "0.8rem 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    fontFamily: "'Inter', sans-serif",
  },

  // Float bar
  floatBar: {
    position: "fixed",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 900,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem",
  },
  floatSocials: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
  },
  floatIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "34px",
    height: "34px",
    background: "rgba(255,255,255,0.15)",
    color: WHITE,
    textDecoration: "none",
    fontSize: "0.85rem",
    backdropFilter: "blur(8px)",
    transition: "background 0.3s",
  },
  floatBookNow: {
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    color: DARK,
    textDecoration: "none",
    fontSize: "0.7rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    fontFamily: "'Inter', sans-serif",
    background: GOLD,
    padding: "0.8rem 0.4rem",
    marginTop: "0.5rem",
    fontWeight: 700,
  },

  // Hero
  hero: {
    position: "relative",
    height: "100vh",
    minHeight: "600px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroSlide: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "opacity 1.5s ease-in-out",
    transform: "scale(1.03)",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 60%, rgba(0,0,0,0.75) 100%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    padding: "0 1.5rem",
    maxWidth: "800px",
  },
  heroTagline: {
    color: GOLD,
    fontSize: "0.85rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    marginBottom: "1rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
  },
  heroH1: {
    color: WHITE,
    fontSize: "clamp(2.4rem, 6vw, 5rem)",
    fontWeight: 400,
    lineHeight: 1.15,
    margin: "0 0 1.5rem",
    letterSpacing: "0.02em",
  },
  heroH1Gold: { color: GOLD },
  heroSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
    lineHeight: 1.7,
    maxWidth: "560px",
    margin: "0 auto 2.5rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
  },
  heroBtns: { display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" },
  heroIndicators: {
    position: "absolute",
    bottom: "5rem",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "0.5rem",
    zIndex: 3,
  },
  heroDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.4)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s",
    padding: 0,
  },
  heroDotActive: { background: GOLD, transform: "scale(1.3)" },
  heroScroll: {
    position: "absolute",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "24px",
    height: "40px",
    border: "2px solid rgba(255,255,255,0.5)",
    borderRadius: "12px",
    cursor: "pointer",
    zIndex: 3,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "5px 0",
  },
  heroScrollDot: {
    width: "4px",
    height: "8px",
    background: WHITE,
    borderRadius: "2px",
    animation: "scroll-dot 1.5s ease-in-out infinite",
  },

  // Stats bar
  statsBar: {
    background: DARK,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 0,
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1.8rem 3.5rem",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    color: GOLD,
    fontFamily: "serif",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "rgba(255,255,255,0.6)",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    marginTop: "0.2rem",
    fontFamily: "'Inter', sans-serif",
  },

  // Sections
  section: {
    padding: "6rem 1.5rem",
  },
  sectionDark: {
    position: "relative",
    overflow: "hidden",
  },
  sectionBg: {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    filter: "brightness(0.25)",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "3.5rem",
  },
  sectionSub: {
    color: GOLD,
    fontSize: "0.8rem",
    letterSpacing: "0.3em",
    textTransform: "uppercase",
    marginBottom: "0.8rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 500,
  },
  sectionH2: {
    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
    fontWeight: 400,
    color: DARK,
    lineHeight: 1.3,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
  },
  smallBorder: {
    display: "block",
    width: "60px",
    height: "2px",
    background: GOLD,
    margin: "1rem auto 0",
  },
  bodyText: {
    color: "#555",
    fontSize: "1.05rem",
    lineHeight: 1.85,
    marginBottom: "2rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
  },

  // About
  aboutGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "5rem",
    alignItems: "center",
  },
  aboutImages: {
    position: "relative",
    height: "480px",
  },
  aboutImg: {
    position: "absolute",
    objectFit: "cover",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  aboutImg1: {
    width: "65%",
    height: "75%",
    top: 0,
    left: 0,
  },
  aboutImg2: {
    width: "55%",
    height: "65%",
    bottom: 0,
    right: 0,
    border: "6px solid #fff",
  },
  aboutText: {
    paddingLeft: "1rem",
  },

  // Facilities
  facGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.5rem",
  },
  facBox: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    padding: "1.5rem",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    transition: "border-color 0.3s",
  },
  facIcon: {
    fontSize: "1.8rem",
    flexShrink: 0,
    marginTop: "0.1rem",
  },
  facTitle: {
    color: WHITE,
    fontSize: "1rem",
    fontWeight: 600,
    margin: "0 0 0.4rem",
    fontFamily: "'Inter', sans-serif",
  },
  facDesc: {
    color: "rgba(255,255,255,0.55)",
    fontSize: "0.85rem",
    lineHeight: 1.7,
    margin: 0,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
  },

  // Rooms
  roomGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "2rem",
  },
  roomCard: {
    background: WHITE,
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  roomImageWrap: {
    position: "relative",
    overflow: "hidden",
    height: "220px",
  },
  roomLabel: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    background: GOLD,
    color: DARK,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    padding: "0.3rem 0.7rem",
    textTransform: "uppercase",
    zIndex: 2,
    fontFamily: "'Inter', sans-serif",
  },
  roomMeta: {
    position: "absolute",
    bottom: "1rem",
    left: "1rem",
    display: "flex",
    gap: "1rem",
    zIndex: 2,
  },
  roomMetaItem: {
    background: "rgba(0,0,0,0.6)",
    color: WHITE,
    fontSize: "0.75rem",
    padding: "0.25rem 0.6rem",
    backdropFilter: "blur(4px)",
    fontFamily: "'Inter', sans-serif",
  },
  roomImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  roomText: {
    padding: "1.5rem",
  },
  roomName: {
    fontSize: "1.15rem",
    fontWeight: 600,
    margin: "0 0 0.6rem",
    color: DARK,
  },
  roomDesc: {
    color: "#777",
    fontSize: "0.88rem",
    lineHeight: 1.7,
    margin: "0 0 1.2rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 300,
  },

  // Buttons
  btnMain: {
    background: GOLD,
    color: DARK,
    border: "none",
    padding: "0.85rem 2.2rem",
    fontSize: "0.82rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
  },
  btnGhost: {
    background: "transparent",
    color: WHITE,
    border: "1px solid rgba(255,255,255,0.6)",
    padding: "0.85rem 2.2rem",
    fontSize: "0.82rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
  },
  btnLine: {
    background: "transparent",
    color: GOLD,
    border: `1px solid ${GOLD}`,
    padding: "0.7rem 1.8rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
  },

  // Booking
  bookingOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.75)",
  },
  bookingCard: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    backdropFilter: "blur(12px)",
    padding: "2.5rem",
  },
  bookingRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  bookingField: {
    flex: 1,
    minWidth: "140px",
  },
  bookingLabel: {
    display: "block",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.78rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
    fontFamily: "'Inter', sans-serif",
  },
  bookingInput: {
    width: "100%",
    background: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: WHITE,
    padding: "0.7rem 1rem",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    boxSizing: "border-box",
  },
  bookingDivider: {
    borderTop: "1px solid rgba(255,255,255,0.12)",
    margin: "1.5rem 0",
  },
  bookingDetailsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  counter: {
    display: "flex",
    alignItems: "center",
    gap: "0",
    border: "1px solid rgba(255,255,255,0.2)",
  },
  counterBtn: {
    background: "rgba(255,255,255,0.1)",
    color: WHITE,
    border: "none",
    width: "38px",
    height: "40px",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "background 0.2s",
    fontFamily: "monospace",
  },
  counterVal: {
    flex: 1,
    textAlign: "center",
    color: WHITE,
    fontSize: "0.95rem",
    fontFamily: "'Inter', sans-serif",
  },

  // Footer
  footer: {
    background: DARK2,
    padding: "5rem 1.5rem 0",
    position: "relative",
    overflow: "hidden",
  },
  footerBg: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(201,169,110,0.05) 0%, transparent 60%)",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr",
    gap: "4rem",
    paddingBottom: "3rem",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  footerHeading: {
    color: GOLD,
    fontSize: "0.82rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "1.5rem",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
  },
  footerText: {
    color: "#888",
    fontSize: "0.9rem",
    lineHeight: 2,
    margin: 0,
    fontFamily: "'Inter', sans-serif",
  },
  footerLink: {
    display: "block",
    color: "#888",
    textDecoration: "none",
    fontSize: "0.9rem",
    lineHeight: 2,
    fontFamily: "'Inter', sans-serif",
    transition: "color 0.3s",
  },
  footerSocial: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "all 0.3s",
  },
  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem 0",
    flexWrap: "wrap",
    gap: "0.5rem",
  },

  // Back to top
  backToTop: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    width: "44px",
    height: "44px",
    background: GOLD,
    color: DARK,
    border: "none",
    fontSize: "1.2rem",
    fontWeight: 700,
    cursor: "pointer",
    zIndex: 800,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
  },
};

// ─── Responsive CSS injection ──────────────────────────────────────────────
const responsiveCSS = `
  @keyframes scroll-dot {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(14px); opacity: 0; }
  }
  .tourism-page a:hover { color: #c9a96e !important; }
  .tourism-page .float-icon:hover { background: rgba(201,169,110,0.3) !important; }
  @media (max-width: 900px) {
    .tourism-page nav ul { display: none !important; }
    .tourism-page .nav-cta-desktop { display: none !important; }
    .tourism-page button[aria-label="menu"] { display: flex !important; }
    .tourism-page .float-bar { display: none !important; }
  }
  @media (max-width: 768px) {
    .tourism-page .about-grid { grid-template-columns: 1fr !important; }
    .tourism-page .fac-grid { grid-template-columns: 1fr 1fr !important; }
    .tourism-page .room-grid { grid-template-columns: 1fr !important; }
    .tourism-page .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .tourism-page .booking-details-grid { grid-template-columns: 1fr !important; }
    .tourism-page .stat-item { padding: 1.2rem 1.5rem !important; }
  }
  @media (max-width: 480px) {
    .tourism-page .fac-grid { grid-template-columns: 1fr !important; }
  }
`;

const TourismPageWithStyles: React.FC = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: responsiveCSS }} />
    <TourismLandingPage />
  </>
);

export default TourismPageWithStyles;
