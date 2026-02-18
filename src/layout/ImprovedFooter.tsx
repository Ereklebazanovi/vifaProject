import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

// Footer Translations
const footerTranslations = {
  ka: {
    "footer.brand.tagline": "ციფრული პარტნიორი",
    "footer.brand.description":
      "შენი ბრენდის ციფრული ტრანსფორმაცია. ჩვენ გთავაზობთ სრულ ეკოსისტემას: ვებ განვითარება, SEO და სოციალური მედიის სტრატეგიული მართვა.",

    "footer.quickLinks.title": "სწრაფი ბმულები",
    "footer.quickLinks.home": "მთავარი",
    "footer.quickLinks.about": "ჩვენ შესახებ",
    "footer.quickLinks.contact": "კონტაქტი",

    "footer.services.title": "სერვისები",
    "footer.services.webdev": "ვებ განვითარება",
    "footer.services.ads": "ციფრული რეკლამა",
    "footer.services.social": "სოციალური მედია",

    "footer.contact.title": "კონტაქტი",
    "footer.contact.location": "თბილისი, საქართველო",

    "footer.newsletter.title": "სიახლეები",
    "footer.newsletter.placeholder": "შეიყვანეთ თქვენი ელ-ფოსტა",
    "footer.newsletter.subscribe": "დადასტურება",

    "footer.copyright": "ყველა უფლება დაცულია.",
    "footer.privacy": "კონფიდენციალურობის პოლიტიკა",
    "footer.terms": "მომსახურების პირობები",
    "footer.createdBy": "შექმნილია",
    "footer.createdByTeam": "გუნდის მიერ",
    "footer.backToTop": "ზემოთ დაბრუნება",
  },
  en: {
    "footer.brand.tagline": "Digital Partner",
    "footer.brand.description":
      "Your brand's digital transformation. We offer a complete ecosystem: web development, SEO and strategic social media management.",

    "footer.quickLinks.title": "Quick Links",
    "footer.quickLinks.home": "Home",
    "footer.quickLinks.about": "About Us",
    "footer.quickLinks.contact": "Contact",

    "footer.services.title": "Services",
    "footer.services.webdev": "Web Development",
    "footer.services.ads": "Digital Ads",
    "footer.services.social": "Social Media",

    "footer.contact.title": "Contact",
    "footer.contact.location": "Tbilisi, Georgia",

    "footer.newsletter.title": "Newsletter",
    "footer.newsletter.placeholder": "Enter your email",
    "footer.newsletter.subscribe": "Subscribe",

    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.createdBy": "Created by",
    "footer.createdByTeam": "team",
    "footer.backToTop": "Back to Top",
  },
};
import {
  FaFacebookF,
  FaCode,
  FaChartLine,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaRobot,
  FaHome,
  FaUser,
  FaProjectDiagram,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [showBackToTop] = useState(true);
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const location = useLocation();

  // Determine if current route should show Invento branding
  const isInventoRoute = () => {
    const path = location.pathname;
    return path.includes('/services/web-development') ||
           path.includes('/services/ai-chatbot') ||
           path.includes('/inventowms') ||
           path === '/';
  };

  const isVifaRoute = () => {
    const path = location.pathname;
    return path.includes('/services/digital-advertising') ||
           path.includes('/about');
  };

  const t = (key: string): string => {
    const translations = footerTranslations[currentLanguage as keyof typeof footerTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  const socialLinks = [
    {
      icon: <FaFacebookF />,
      href: isInventoRoute() && !isVifaRoute() ? "https://www.facebook.com/inventogeo" : "https://facebook.com/vifaweb",
      label: isInventoRoute() && !isVifaRoute() ? "Invento Technologies" : "VIFA WEB • ვიფა ვებ",
      color:
        "hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-400/50",
    },
  ];

  const services = [
    {
      name: currentLanguage === "ka" ? "Invento Web" : "Invento Web",
      href: "/services/web-development",
      icon: <FaCode className="w-4 h-4" />,
    },
    {
      name: t("footer.services.ads"),
      href: "/services/digital-advertising",
      icon: <FaChartLine className="w-4 h-4" />,
    },
    {
      name: currentLanguage === "ka" ? "Invento AI" : "Invento AI",
      href: "/services/ai-chatbot",
      icon: <FaRobot className="w-4 h-4" />,
    },
  ];

  const quickLinks = [
    {
      name: t("footer.quickLinks.home"),
      href: "/",
      icon: <FaHome className="w-4 h-4" />,
    },
    {
      name: t("footer.quickLinks.about"),
      href: "/about",
      icon: <FaUser className="w-4 h-4" />,
    },
    {
      name: currentLanguage === "ka" ? "პროექტის დაწყება" : "Start Project",
      href: "/start-project",
      icon: <FaProjectDiagram className="w-4 h-4" />,
    },
  ];

  const contactInfo = [
    {
      icon: <FaPhone className="w-4 h-4" />,
      text: currentLanguage === "ka" ? "IT დეპარტამენტი" : "IT Department",
      subtext: "+995 557 62 42 43",
      href: "tel:+995557624243",
      color: "text-blue-400",
    },
    {
      icon: <FaPhone className="w-4 h-4" />,
      text: currentLanguage === "ka" ? "ციფრული მარკეტინგი" : "Digital Marketing",
      subtext: "+995 577 17 51 32",
      href: "tel:+995577175132",
      color: "text-green-400",
    },
    {
      icon: <FaEnvelope className="w-4 h-4" />,
      text: isInventoRoute() && !isVifaRoute() ? "team.inventogeo@gmail.com" : "vifa.official2020@gmail.com",
      href: isInventoRoute() && !isVifaRoute() ? "mailto:team.inventogeo@gmail.com" : "mailto:vifa.official2020@gmail.com",
      color: "text-blue-400",
    },                                                       
    {
      icon: <FaMapMarkerAlt className="w-4 h-4" />,
      text: t("footer.contact.location"),
      href: "#",
      color: "text-blue-400",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    // You can add actual newsletter subscription logic here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <footer
      className={`relative overflow-hidden transition-colors duration-500 ${getTransitionClasses()} bg-slate-950/80 backdrop-blur-xl border-t border-slate-700/20 text-slate-300`}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section - Conditional Branding */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-slate-800/50 border border-slate-600/30 rounded-xl flex items-center justify-center hover:bg-blue-500/10 hover:border-blue-400/40 transition-all duration-300 overflow-hidden"
              >
                {isInventoRoute() && !isVifaRoute() ? (
                  <img
                    src="/invento.png"
                    alt="Invento Technologies - ვებ განვითარება და AI ჩატბოტები"
                    className="w-10 h-10 rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <img
                    src="/viffa.png"
                    alt="VIFA Digital - ციფრული მარკეტინგი და ვებ განვითარება საქართველოში"
                    className="w-10 h-10 rounded-lg object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </motion.div>
              <div>
                <div className="text-2xl font-light tracking-wider">
                  <span className="text-blue-600 font-normal group-hover:text-blue-300 transition-colors duration-300">
                    {isInventoRoute() && !isVifaRoute() ? "INVENTO TECHNOLOGIES" : "VIFA DIGITAL"}
                  </span>
                  <span className="text-blue-400 font-normal"> </span>
                </div>
                <div className="text-xs font-light tracking-wide -mt-1 text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                  {isInventoRoute() && !isVifaRoute() ?
                    (currentLanguage === "ka" ? "ტექნოლოგიური პარტნიორი" : "Technology Partner") :
                    t("footer.brand.tagline")}
                </div>
              </div>
            </Link>

            <p
              className={`leading-relaxed mb-6 ${
                true ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {t("footer.brand.description")}
            </p>

            {/* Social Links */}
            <div className="space-y-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    social.color
                  } hover:shadow-lg hover:shadow-blue-500/20 ${
                    true
                      ? "border-slate-700/50 text-slate-400 bg-slate-800/30"
                      : "border-slate-300/50 text-slate-500 bg-white/80"
                  }`}
                  title={social.label}
                >
                  <div className="text-xl">{social.icon}</div>
                  <div>
                    <div className="font-medium text-white text-sm">
                      {currentLanguage === "ka"
                        ? "დაგვიკავშირდი Facebook-ზე"
                        : "Connect on Facebook"}
                    </div>
                    <div className="text-xs text-slate-400">{social.label}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-lg font-semibold mb-6 flex items-center ${
                true ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`flex items-center hover:translate-x-1 transition-all duration-300 group ${
                      true
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`mr-3 group-hover:text-blue-400 transition-colors duration-300 ${
                        true ? "text-slate-600" : "text-slate-500"
                      }`}
                    >
                      {link.icon}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-lg font-semibold mb-6 flex items-center ${
                true ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
              {t("footer.services.title")}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className={`flex items-center hover:translate-x-1 transition-all duration-300 group ${
                      true
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span
                      className={`mr-3 group-hover:text-blue-400 transition-colors duration-300 ${
                        true ? "text-slate-600" : "text-slate-500"
                      }`}
                    >
                      {service.icon}
                    </span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-lg font-semibold mb-6 flex items-center ${
                true ? "text-white" : "text-slate-900"
              }`}
            >
              <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3"></span>
              {t("footer.contact.title")}
            </h3>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className={`flex items-start transition-all duration-300 group ${
                    true
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span
                    className={`mr-3 mt-0.5 ${contact.color} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                  >
                    {contact.icon}
                  </span>
                  <div className="group-hover:translate-x-1 transition-transform duration-300">
                    <div className="text-sm font-medium">{contact.text}</div>
                    {contact.subtext && (
                      <div className="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                        {contact.subtext}
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4
                className={`font-medium mb-3 ${
                  true ? "text-white" : "text-slate-900"
                }`}
              >
                {t("footer.newsletter.title")}
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("footer.newsletter.placeholder")}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-blue-400 transition-all duration-300 ${
                    true
                      ? "bg-slate-800/50 border-slate-700/50 focus:bg-slate-800/70 text-white placeholder-slate-500"
                      : "bg-white/80 border-slate-300/50 focus:bg-white text-slate-900 placeholder-slate-400"
                  }`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  {t("footer.newsletter.subscribe")}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className={`border-t pt-8 ${
            true ? "border-slate-800/50" : "border-slate-300/50"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div
              className={`text-sm mb-4 sm:mb-0 ${
                true ? "text-slate-500" : "text-slate-600"
              }`}
            >
              © {currentYear} {isInventoRoute() && !isVifaRoute() ? "Invento Technologies" : "VIFA Digital"}. {t("footer.copyright")}
              <span className="mx-2">•</span>
              <Link
                to="/privacy"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {t("footer.privacy")}
              </Link>
              <span className="mx-2">•</span>
              <Link
                to="/terms"
                className="hover:text-blue-400 transition-colors duration-300"
              >
                {t("footer.terms")}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <p
                className={`text-sm ${
                  true ? "text-slate-500" : "text-slate-600"
                }`}
              >
                {t("footer.createdBy")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                  {isInventoRoute() && !isVifaRoute() ? "INVENTO TECHNOLOGIES" : "VIFA DIGITAL"}
                </span>{" "}
                {t("footer.createdByTeam")}
              </p>

              {/* Back to Top Button */}
              {showBackToTop && (
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300 ${
                    true
                      ? "bg-slate-800/50 border-slate-700/50 text-slate-400"
                      : "bg-white/80 border-slate-300/50 text-slate-500"
                  }`}
                  title={t("footer.backToTop")}
                >
                  <FaArrowUp className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
