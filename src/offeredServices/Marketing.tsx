"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import BeautifulBackground from "../components/BeautifulBackground";
import {
  FaVideo,
  FaCamera,
  FaShare,
  FaEdit,
  FaChartLine,
  FaBullseye,
  FaPaintBrush,
  FaStar,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaLinkedin,
  FaRocket,
  FaArrowRight,
} from "react-icons/fa";
import SEO from "../components/SEO";

const Marketing: React.FC = () => {
  const { getTransitionClasses } = useLanguageTransition();
  const [activeService, setActiveService] = useState<number>(0);

  // Main advertising services
  const services = [
    {
      id: "video-production",
      icon: <FaVideo />,
      title: "ვიდეო გადაღება",
      description: "პროფესიონალური ვიდეო კონტენტის შექმნა",
      color: "red",
      features: [
        "4K ვიდეო ხარისხი",
        "დრონით გადაღება",
        "პოსტ-პროდუქცია",
        "მონტაჟი",
      ],
    },
    {
      id: "photo-shooting",
      icon: <FaCamera />,
      title: "ფოტო გადაღება",
      description: "სპეციალური ფოტო სესიები ბრენდებისთვის",
      color: "blue",
      features: [
        "სტუდიური გადაღება",
        "ლოკაციური სესიები",
        "პროდუქტის ფოტოები",
        "რეტუშირება",
      ],
    },
    {
      id: "social-media",
      icon: <FaShare />,
      title: "სოციალური მედია",
      description: "სრული სოციალური მედიის მართვა",
      color: "green",
      features: [
        "კონტენტ დაგეგმვა",
        "Community Management",
        "Analytics",
        "Engagement",
      ],
    },
    {
      id: "content-creation",
      icon: <FaEdit />,
      title: "კონტენტის შექმნა",
      description: "ორიგინალური და ეფექტური კონტენტი",
      color: "purple",
      features: [
        "კოპირაიტინგი",
        "სცენარების წერა",
        "Blog პოსტები",
        "Caption-ები",
      ],
    },
    {
      id: "marketing-strategy",
      icon: <FaChartLine />,
      title: "მარკეტინგ სტრატეგია",
      description: "ინდივიდუალური მარკეტინგ გეგმები",
      color: "orange",
      features: [
        "ბაზრის ანალიზი",
        "კონკურენტების შესწავლა",
        "ROI გაანგარიშება",
        "KPI განსაზღვრა",
      ],
    },
    {
      id: "brand-positioning",
      icon: <FaBullseye />,
      title: "საკომუნიკაციო მიზნები",
      description: "ბრენდის პოზიციონირება და მესიჯინგი",
      color: "pink",
      features: [
        "Brand Voice",
        "Target Audience",
        "Messaging Framework",
        "Brand Guidelines",
      ],
    },
    {
      id: "graphic-design",
      icon: <FaPaintBrush />,
      title: "გრაფიკული დიზაინი",
      description: "ვიზუალური იდენტობის შექმნა",
      color: "indigo",
      features: [
        "Banner დიზაინი",
        "Post Templates",
        "Infographics",
        "Brand Materials",
      ],
    },
    {
      id: "logo-design",
      icon: <FaStar />,
      title: "ლოგოს შექმნა",
      description: "უნიკალური ლოგო დიზაინი და ბრენდ იდენტიტი",
      color: "yellow",
      features: [
        "კონცეპტუალური დიზაინი",
        "ვექტორული ფაილები",
        "Brand Identity",
        "Usage Guidelines",
      ],
    },
  ];

  // Social media platforms
  const platforms = [
    { icon: <FaInstagram />, name: "Instagram", color: "pink" },
    { icon: <FaFacebook />, name: "Facebook", color: "blue" },
    { icon: <FaYoutube />, name: "YouTube", color: "red" },
    { icon: <FaTiktok />, name: "TikTok", color: "black" },
    { icon: <FaLinkedin />, name: "LinkedIn", color: "blue" },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      red: "border-red-400 bg-red-500/10",
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      orange: "border-orange-400 bg-orange-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      indigo: "border-indigo-400 bg-indigo-500/10",
      yellow: "border-yellow-400 bg-yellow-500/10",
      black: "border-gray-400 bg-gray-500/10",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      red: "text-red-400",
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      orange: "text-orange-400",
      pink: "text-pink-400",
      indigo: "text-indigo-400",
      yellow: "text-yellow-400",
      black: "text-gray-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title="Digital Advertising Services - VIFA"
        description="Professional digital advertising services including video production, photography, social media management, and creative content."
      />

      {/* Beautiful Animated Background - Full Page Coverage */}
      <BeautifulBackground
        className="fixed inset-0 z-0"
        variant="purple"
      />

      <div className="relative z-10 min-h-screen mt-20">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32 mt-25">
            <div className="text-center mb-16">
              <div className="mb-8">
                <span className="text-red-400 text-sm font-medium tracking-wider uppercase border border-red-400/30 px-4 py-2 rounded">
                  Digital Marketing Agency
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight"
              >
                თქვენი ბრენდის{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent font-medium">
                  ციფრული ზრდა
                </span>
                <br />
                <span className="text-slate-300 text-xl sm:text-2xl md:text-4xl lg:text-5xl">
                  დღეს იწყება
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-slate-200 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                დღევანდელ ციფრულ ეპოქაში, თქვენი ბრენდი უნდა იყოს ხილული,
                მიმზიდველი და დამაჯერებელი. ჩვენ ვქმნით სრულყოფილ ციფრულ
                ეკოსისტემას თქვენ
                ი ბიზნესისთვის - ვიდეო კონტენტიდან სოციალურ
                მედიამდე.
              </motion.p>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-16"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400 mb-2">
                    200+
                  </div>
                  <div className="text-sm text-slate-400">
                    წარმატებული პროექტი
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    98%
                  </div>
                  <div className="text-sm text-slate-400">
                    კმაყოფილი კლიენტები
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">
                    5x
                  </div>
                  <div className="text-sm text-slate-400">ROI გაზრდა</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-slate-400">მხარდაჭერა</div>
                </div>
              </motion.div>

              <div className="flex justify-center gap-6">
                <Link
                  to="/start-project"
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  პროექტის დაწყება
                </Link>
                <Link
                  to="#services"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  ჩვენი სერვისები
                </Link>
              </div>
            </div>

            {/* Digital Marketing Process Visualization */}
            <div className="relative">
              <div className="flex justify-center items-center gap-3 sm:gap-6 lg:gap-8 flex-wrap">
                {/* Step 1: Strategy */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center bg-blue-500/5 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaChartLine className="text-blue-400 text-3xl mb-2 mx-auto" />
                      <div className="text-blue-400 text-xs font-medium">
                        სტრატეგია
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 2: Content */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-red-400/30 rounded-2xl flex items-center justify-center bg-red-500/5 group-hover:border-red-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaVideo className="text-red-400 text-3xl mb-2 mx-auto" />
                      <div className="text-red-400 text-xs font-medium">
                        კონტენტი
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 3: Distribution */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-2xl flex items-center justify-center bg-green-500/5 group-hover:border-green-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaShare className="text-green-400 text-3xl mb-2 mx-auto" />
                      <div className="text-green-400 text-xs font-medium">
                        გავრცელება
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 4: Results */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center bg-purple-500/5 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaBullseye className="text-purple-400 text-3xl mb-2 mx-auto" />
                      <div className="text-purple-400 text-xs font-medium">
                        შედეგები
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → კრეატიული კონტენტი →
                  მიზნობრივი გავრცელება → მონიტორინგი და ოპტიმიზაცია
                </p>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                ჩვენი სერვისები
              </h2>
              <div className="flex justify-center items-center gap-4 sm:gap-8 lg:gap-12 text-sm text-slate-400">
                <div>
                  <span className="text-2xl font-bold text-red-400">8+</span>{" "}
                  სერვისი
                </div>
                <div>
                  <span className="text-2xl font-bold text-orange-400">
                    100%
                  </span>{" "}
                  ხარისხი
                </div>
                <div>
                  <span className="text-2xl font-bold text-yellow-400">
                    24/7
                  </span>{" "}
                  მხარდაჭერა
                </div>
              </div>
            </div>

            {/* Services Grid - Fixed height for all cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                  onClick={() => setActiveService(index)}
                >
                  <div
                    className={`p-6 rounded-xl border-2 h-44 flex flex-col justify-between bg-black/60 backdrop-blur-lg ${getColorClass(
                      service.color
                    ).replace('bg-', 'border-')}
                    ${
                      activeService === index
                        ? "border-opacity-100 scale-105"
                        : "border-opacity-40"
                    }
                    transition-all duration-300 group-hover:border-opacity-100`}
                  >
                    <div>
                      <div
                        className={`text-3xl mb-4 ${getTextColorClass(
                          service.color
                        )}`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Media Platforms */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-white mb-4">
                სოციალური მედია პლატფორმები
              </h2>
              <p className="text-slate-400">
                ყველა მთავარ პლატფორმაზე შენი ბრენდის წარმატებული წარდგენა
              </p>
            </div>

            <div className="flex justify-center items-center gap-3 sm:gap-6 lg:gap-8 flex-wrap">
              {platforms.map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer p-6 rounded-xl border-2 bg-black/60 backdrop-blur-lg ${getColorClass(
                    platform.color
                  ).replace('bg-', 'border-')}
                  border-opacity-40 hover:border-opacity-100 transition-all duration-300 hover:scale-110`}
                >
                  <div className="text-center">
                    <div
                      className={`text-4xl mb-3 ${getTextColorClass(
                        platform.color
                      )} group-hover:scale-110 transition-transform duration-300`}
                    >
                      {platform.icon}
                    </div>
                    <div className="text-white font-medium">
                      {platform.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light text-white mb-6">
                მზად ხარ შენი ბრენდის ციფრული ტრანსფორმაციისთვის?
              </h3>
              <p className="text-lg text-slate-400 mb-8">
                დაუკავშირდი ჩვენს გუნდს და დავიწყოთ შენი წარმატებული სარეკლამო
                კამპანიის შექმნა დღესვე.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-red-600 hover:to-orange-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket />
                  პროექტის დაწყება
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/60 text-white px-4 sm:px-6 lg:px-10 py-4 text-lg font-medium rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaArrowRight />
                  მეტი ინფორმაცია
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketing;
