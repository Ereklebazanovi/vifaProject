import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const content = {
    ka: {
      title: 'კონტაქტი',
      subtitle: 'დაუკავშირდით ჩვენ',
      description: 'მზად ვართ განვიხილოთ თქვენი პროექტი და დაგეხმაროთ ბიზნესის ზრდაში',
      contactInfo: {
        title: 'საკონტაქტო ინფორმაცია',
        email: 'ელ. ფოსტა',
        phone: 'ტელეფონი',
        address: 'მისამართი',
        workingHours: 'სამუშაო საათები'
      },
      workingHoursText: 'ორშაბათი - პარასკევი: 10:00 - 19:00',
      addressText: 'თბილისი, საქართველო'
    },
    en: {
      title: 'Contact',
      subtitle: 'Get in Touch',
      description: 'Ready to discuss your project and help grow your business',
      contactInfo: {
        title: 'Contact Information',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        workingHours: 'Working Hours'
      },
      workingHoursText: 'Monday - Friday: 10:00 - 19:00',
      addressText: 'Tbilisi, Georgia'
    }
  };

  const t = content[currentLanguage];

  return (
    <>
      <SEO
        title={t.title}
        description={t.description}
        type="website"
      />

      <div className="min-h-screen bg-black">
        {/* Background with elegant gradient */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-black to-gray-900/30" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, rgba(17, 24, 39, 0.2), transparent, transparent)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-12">

              {/* Contact Form */}
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ContactForm />
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="bg-slate-900/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-8 h-fit">
                  <h3 className="text-2xl font-bold text-white mb-8">
                    {t.contactInfo.title}
                  </h3>

                  <div className="space-y-6">

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t.contactInfo.email}</h4>
                        <a
                          href="mailto:info@vifadigital.ge"
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          info@vifadigital.ge
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t.contactInfo.phone}</h4>
                        <a
                          href="tel:+995555123456"
                          className="text-slate-400 hover:text-green-400 transition-colors"
                        >
                          +995 555 123 456
                        </a>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t.contactInfo.address}</h4>
                        <p className="text-slate-400">{t.addressText}</p>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-1">{t.contactInfo.workingHours}</h4>
                        <p className="text-slate-400">{t.workingHoursText}</p>
                      </div>
                    </div>

                  </div>

                  {/* Social Media */}
                  <div className="mt-8 pt-8 border-t border-slate-700">
                    <div className="flex gap-4">
                      <a
                        href="https://www.facebook.com/vifadigital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.instagram.com/vifadigital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center hover:bg-pink-500/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.337-1.297-.89-.808-1.297-1.953-1.297-3.337s.408-2.529 1.297-3.337c.89-.808 2.04-1.297 3.337-1.297s2.448.49 3.337 1.297c.89.808 1.297 1.953 1.297 3.337s-.408 2.529-1.297 3.337c-.89.808-2.04 1.297-3.337 1.297zm7.072 0c-1.297 0-2.448-.49-3.337-1.297-.89-.808-1.297-1.953-1.297-3.337s.408-2.529 1.297-3.337c.89-.808 2.04-1.297 3.337-1.297s2.448.49 3.337 1.297c.89.808 1.297 1.953 1.297 3.337s-.408 2.529-1.297 3.337c-.89.808-2.04 1.297-3.337 1.297z"/>
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/company/vifadigital"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center hover:bg-blue-600/30 transition-colors"
                      >
                        <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;