import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaSearch, FaPhone } from 'react-icons/fa';
import SEO from '../components/SEO';
import { useLanguage } from '../contexts/LanguageContext';

const NotFound: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <SEO
        title="404 - გვერდი ვერ მოიძებნა"
        description="მოძებნილი გვერდი ვერ მოიძებნა. დაბრუნდით მთავარ გვერდზე ან დაგვიკავშირდით დახმარებისთვის."
        type="website"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-8xl md:text-9xl font-light text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                404
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6 rounded-full"></div>
            </div>

            {/* Error Message */}
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              გვერდი ვერ მოიძებნა
            </h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              ბოდიშს ვიხდით, მოძებნილი გვერდი არ არსებობს ან გადატანილია სხვა ლოკაციაზე.
              გთხოვთ, ისარგებლოთ ქვემოთ მოცემული ღილაკებით ნავიგაციისთვის.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaHome />
                <span>მთავარი გვერდი</span>
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-slate-500"
              >
                <FaArrowLeft />
                <span>უკან დაბრუნება</span>
              </button>

              <Link
                to="/start-project"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FaPhone />
                <span>კონტაქტი</span>
              </Link>
            </div>

            {/* Search Suggestion */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-6"
            >
              <FaSearch className="text-blue-400 text-2xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                რას ეძებდით?
              </h3>
              <p className="text-slate-400 mb-4">
                შესაძლოა დაინტერესებდეთ ჩვენი სერვისები:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/services/web-development"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  ვებ განვითარება
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  to="/services/digital-advertising"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  ციფრული მარკეტინგი
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  to="/about"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  ჩვენს შესახებ
                </Link>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-slate-400"
            >
              <p className="text-sm">
                თუ მაინც გჭირდებათ დახმარება, დაგვიკავშირდით:{' '}
                <a
                  href="mailto:info@vifadigital.ge"
                  className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  info@vifadigital.ge
                </a>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFound;