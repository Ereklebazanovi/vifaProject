import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaCode,
  FaChartLine,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp
} from "react-icons/fa";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [showBackToTop] = useState(true);
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const socialLinks = [
    { 
      icon: <FaFacebookF />, 
      href: "https://facebook.com/vifa.ge", 
      label: "Facebook",
      color: "hover:text-blue-400 hover:bg-blue-400/10"
    },
    { 
      icon: <FaInstagram />, 
      href: "https://instagram.com/vifa.ge", 
      label: "Instagram",
      color: "hover:text-pink-400 hover:bg-pink-400/10"
    },
    { 
      icon: <FaLinkedinIn />, 
      href: "https://linkedin.com/company/vifa-ge", 
      label: "LinkedIn",
      color: "hover:text-blue-500 hover:bg-blue-500/10"
    },
    { 
      icon: <FaTwitter />, 
      href: "https://twitter.com/vifa_ge", 
      label: "Twitter",
      color: "hover:text-cyan-400 hover:bg-cyan-400/10"
    },
  ];

  const services = [
    { name: t('footer.services.webdev'), href: "/services/web-development", icon: <FaCode className="w-4 h-4" /> },
    { name: t('footer.services.ads'), href: "/services/digital-advertising", icon: <FaChartLine className="w-4 h-4" /> },
    { name: t('footer.services.social'), href: "/services/social-media", icon: <FaInstagram className="w-4 h-4" /> },
  ];

  const quickLinks = [
    { name: t('footer.quickLinks.home'), href: "/" },
    { name: t('footer.quickLinks.about'), href: "/about" },
    { name: t('footer.quickLinks.contact'), href: "/contact" },
  ];

  const contactInfo = [
    { 
      icon: <FaPhone className="w-4 h-4" />, 
      text: "+995 555 123 456", 
      href: "tel:+995555123456",
      color: "text-green-400"
    },
    { 
      icon: <FaEnvelope className="w-4 h-4" />, 
      text: "info@vifa.ge", 
      href: "mailto:info@vifa.ge",
      color: "text-blue-400"
    },
    { 
      icon: <FaMapMarkerAlt className="w-4 h-4" />, 
      text: t('footer.contact.location'), 
      href: "#",
      color: "text-purple-400"
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <footer className={`relative overflow-hidden transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-slate-900 border-t border-slate-800/50 text-slate-300' 
        : 'bg-slate-100 border-t border-slate-300/50 text-slate-700'
    }`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDarkMode 
          ? 'bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent' 
          : 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent'
      }`} />
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <motion.div 
                whileHover={{ rotate: 12 }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
              >
                <img 
                  src="/vifa.jpg" 
                  alt="Vifa Digital Logo" 
                  className="w-10 h-10 rounded-lg object-cover"
                />
              </motion.div>
              <div>
                <div className="text-2xl font-bold">
                  <span className={`group-hover:text-blue-200 transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>Vifa</span>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{" "}Digital</span>
                </div>
                <div className={`text-xs font-medium -mt-1 group-hover:text-slate-300 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {t('footer.brand.tagline')}
                </div>
              </div>
            </Link>
            
            <p className={`leading-relaxed mb-6 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t('footer.brand.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all duration-300 ${social.color} hover:border-current ${
                    isDarkMode 
                      ? 'border-slate-700/50 text-slate-400' 
                      : 'border-slate-300/50 text-slate-500 hover:text-current'
                  }`}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></span>
              {t('footer.quickLinks.title')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className={`flex items-center hover:translate-x-1 transition-all duration-300 group ${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className={`w-1 h-1 rounded-full mr-3 group-hover:bg-blue-400 transition-colors duration-300 ${
                      isDarkMode ? 'bg-slate-600' : 'bg-slate-400'
                    }`}></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-semibold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-3"></span>
              {t('footer.services.title')}
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className={`flex items-center hover:translate-x-1 transition-all duration-300 group ${
                      isDarkMode 
                        ? 'text-slate-400 hover:text-white' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span className={`mr-3 group-hover:text-blue-400 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-600' : 'text-slate-500'
                    }`}>
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
            <h3 className={`text-lg font-semibold mb-6 flex items-center ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-3"></span>
              {t('footer.contact.title')}
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className={`flex items-center transition-all duration-300 group ${
                    isDarkMode 
                      ? 'text-slate-400 hover:text-white' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <span className={`mr-3 ${contact.color} group-hover:scale-110 transition-transform duration-300`}>
                    {contact.icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {contact.text}
                  </span>
                </a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className={`font-medium mb-3 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>{t('footer.newsletter.title')}</h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-blue-400 transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700/50 focus:bg-slate-800/70 text-white placeholder-slate-500'
                      : 'bg-white/80 border-slate-300/50 focus:bg-white text-slate-900 placeholder-slate-400'
                  }`}
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  {t('footer.newsletter.subscribe')}
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
            isDarkMode ? 'border-slate-800/50' : 'border-slate-300/50'
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className={`text-sm mb-4 sm:mb-0 ${
              isDarkMode ? 'text-slate-500' : 'text-slate-600'
            }`}>
              © {currentYear} Vifa Digital. {t('footer.copyright')} 
              <span className="mx-2">•</span>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors duration-300">
                {t('footer.privacy')}
              </Link>
              <span className="mx-2">•</span>
              <Link to="/terms" className="hover:text-blue-400 transition-colors duration-300">
                {t('footer.terms')}
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <p className={`text-sm ${
                isDarkMode ? 'text-slate-500' : 'text-slate-600'
              }`}>
                {t('footer.createdBy')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">Vifa Digital</span> {t('footer.createdByTeam')}
              </p>
              
              {/* Back to Top Button */}
              {showBackToTop && (
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 border hover:border-blue-400/50 hover:text-blue-400 transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                      : 'bg-white/80 border-slate-300/50 text-slate-500'
                  }`}
                  title={t('footer.backToTop')}
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