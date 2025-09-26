"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import SEO from "../components/SEO";
import Hyperspeed from "../components/Hyperspeed";
import { hyperspeedPresets } from "../components/hyperspeedPresets";
const NewHome: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [showDigitalConsequences, setShowDigitalConsequences] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Partner logos data - simple array
  const partnerLogos = [
    { src: "/saitislogoebi/Untitled-1.png", alt: "Partner 1" },
    { src: "/saitislogoebi/Untitled-2.png", alt: "Partner 2" },
    { src: "/saitislogoebi/Untitled-3.png", alt: "Partner 3" },
    { src: "/saitislogoebi/Untitled-4.png", alt: "Partner 4" },
    { src: "/saitislogoebi/Untitled-5.png", alt: "Partner 5" },
    { src: "/saitislogoebi/Untitled-6.png", alt: "Partner 6" },
    { src: "/saitislogoebi/Untitled-7.png", alt: "Partner 7" },
    { src: "/saitislogoebi/Untitled-8.png", alt: "Partner 8" },
    { src: "/saitislogoebi/Untitled-9.png", alt: "Partner 9" },
    { src: "/saitislogoebi/Untitled-10.png", alt: "Partner 10" },
  ];

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />

      {/* Hyperspeed Background - Full Page Coverage */}
      <Hyperspeed
        className="fixed inset-0 z-0"
        effectOptions={hyperspeedPresets.one}
      />

      {/* Light overlay for text readability - limited to main content area */}
      <div className="fixed inset-0 z-5 bg-black/15 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-24 mt-30">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-3 py-1 rounded">
                    {t("newHome.badge")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                  {t("newHome.hero.title")}{" "}
                  <span className="text-blue-400">
                    {t("newHome.hero.brand")}
                  </span>{" "}
                  {t("newHome.hero.connection")}
                </h1>

                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {t("newHome.hero.description")}
                </p>

                <div className="flex gap-4">
                  <Link
                    to="/start-project"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {t("newHome.hero.startProject")}
                  </Link>
                  <Link
                    to="/about"
                    className="border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {t("newHome.hero.aboutUs")}
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/5">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-blue-400 rounded mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      </div>
                      <div className="text-blue-400 text-sm font-medium">
                        {t("newHome.visual.brand")}
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-full w-16 h-px bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2"></div>
                  </div>

                  {/* Target Audience Circle */}
                  <div className="absolute top-1/2 -right-8 w-32 h-32 border border-green-400/30 rounded-full flex items-center justify-center bg-green-500/5 transform -translate-y-1/2">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-green-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-green-400 text-xs font-medium">
                        {t("newHome.visual.audience")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-slate-400 text-sm">
                  {t("newHome.visual.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-32">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 border border-blue-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-blue-400 rounded"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.research.title")}
              </h3>
              <p className="text-slate-300">
                {t("newHome.services.research.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-green-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.strategy.title")}
              </h3>
              <p className="text-slate-300">
                {t("newHome.services.strategy.description")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-purple-400"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.execution.title")}
              </h3>
              <p className="text-slate-300">
                {t("newHome.services.execution.description")}
              </p>
            </div>
          </div>

          {/* Partners Section with Moving Logos */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                {t("newHome.partners.title")}
              </h2>
              <div className="flex justify-center items-center gap-12 text-sm text-slate-400">
                <div>
                  <span className="text-2xl font-bold text-blue-400">50+</span>{" "}
                  {t("newHome.partners.projects")}
                </div>
                <div>
                  <span className="text-2xl font-bold text-green-400">98%</span>{" "}
                  {t("newHome.partners.satisfaction")}
                </div>
                <div>
                  <span className="text-2xl font-bold text-purple-400">3+</span>{" "}
                  {t("newHome.partners.experience")}
                </div>
              </div>
            </div>

            {/* Partner Logos - Simple Moving Strip */}
            <div className="mb-12 overflow-hidden">
              <div className="flex animate-scroll-infinite space-x-12 py-8">
                {[
                  ...partnerLogos,
                  ...partnerLogos,
                  ...partnerLogos,
                  ...partnerLogos,
                ].map((logo, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Information Section */}
          <div
            ref={sectionRef}
            className="max-w-7xl mx-auto mt-32 mb-24"
            style={{ position: "relative" }}
          >
            {/* მთავარი კონტენტი */}
            <div className={showDigitalConsequences ? "hidden" : "block"}>
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                  {t("newHome.interactive.title")}{" "}
                  <span className="text-blue-400">
                    {t("newHome.interactive.titleHighlight")}
                  </span>
                </h2>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                  {t("newHome.interactive.intro")}
                </p>
              </div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* Left Side - Process Animation */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {t("newHome.interactive.processTitle")}{" "}
                      <span className="text-green-400">
                        {t("newHome.interactive.processTitleHighlight")}
                      </span>
                    </h3>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div
                        key={stepNum}
                        className="flex items-start gap-6 group"
                      >
                        {/* Step Circle with Animation */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                              {stepNum}
                            </div>
                          </div>
                          {/* Connection Line */}
                          {stepNum < 4 && (
                            <div className="w-px h-12 bg-gradient-to-b from-blue-400/30 to-green-400/30 mx-auto mt-2"></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pb-8">
                          <h4 className="text-lg font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {t(`newHome.interactive.step${stepNum}.title`)}
                          </h4>
                          <p className="text-blue-400 text-sm font-medium mb-2">
                            {t(`newHome.interactive.step${stepNum}.subtitle`)}
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {t(
                              `newHome.interactive.step${stepNum}.description`
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - 21st Century Challenges */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
                      {t("newHome.interactive.challengesTitle")}
                    </h3>
                  </div>

                  {/* Challenge Cards */}
                  <div className="grid gap-6">
                    {[1, 2, 3, 4].map((challengeNum) => (
                      <div key={challengeNum} className="group">
                        <div className="bg-black/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:bg-black/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.icon`
                                )}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.title`
                                )}
                              </h4>
                              <p className="text-slate-400 text-sm leading-relaxed">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.description`
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Consequences Trigger */}
              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    setShowDigitalConsequences(true);
                    // Scroll to section top with smooth animation
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  რატომ არის ციფრული არსებობა აუცილებელი?
                </button>
              </div>
            </div>

            {/* რა მოსდის ბიზნესს ციფრული არსებობის გარეშე */}
            {showDigitalConsequences && (
              <div className="animate-fade-in">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                    რა მოსდის ბიზნესს{" "}
                    <span className="text-red-400">
                      ციფრული არსებობის გარეშე
                    </span>
                  </h2>
                  <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
                    XXI საუკუნეში ციფრული ტექნოლოგიების გარეშე ბიზნესი წყვეტს
                    კავშირს თანამედროვე ბაზართან
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* პრობლემა 1 */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-red-400">📉</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      გაყიდვების შემცირება
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ონლაინ არყოფნა ნიშნავს 80% პოტენციური კლიენტების
                      დაკარგვას, რადგან მომხმარებლები ინტერნეტში ეძებენ
                      პროდუქტებს და სერვისებს.
                    </p>
                  </div>

                  {/* პრობლემა 2 */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-orange-400">🏃‍♂️</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      კონკურენტების ჩამორჩენა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      კონკურენტები რომლებსაც აქვთ ციფრული ყოფნა, უკეთ მიაღწევენ
                      აუდიტორიას და უფრო სწრაფად იზრდებიან.
                    </p>
                  </div>

                  {/* პრობლემა 3 */}
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-yellow-400">👥</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      ნდობის დაკარგვა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      თანამედროვე მომხმარებლები უნდობლობით ეკიდებიან ბიზნესებს,
                      რომლებსაც ციფრული არსებობა არ აქვთ.
                    </p>
                  </div>

                  {/* პრობლემა 4 */}
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-purple-400">📱</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      მობილური გამოცდილება
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      70% მომხმარებლებისთვის მობილური მოწყობილობიდან ინფორმაციის
                      მიღება შეუძლებლობა ნიშნავს მომსახურების უარყოფას.
                    </p>
                  </div>

                  {/* პრობლემა 5 */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-blue-400">⏰</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      24/7 ხელმისაწვდომობა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ციფრული პლატფორმის გარეშე ვერ იქნება 24/7 ხელმისაწვდომი,
                      რაც ნიშნავს ბიზნეს შესაძლებლობების დაკარგვას.
                    </p>
                  </div>

                  {/* პრობლემა 6 */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                    <div className="text-4xl mb-4 text-green-400">📊</div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      მონაცემების ანალიზი
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ციფრული ანალიტიკის გარეშე შეუძლებელია ბიზნეს
                      გადაწყვეტილებების მიღება მონაცემებზე დაფუძნებით.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowDigitalConsequences(false)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    უკან დაბრუნება
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-white mb-6">
                {t("newHome.final.question")}
              </h3>
              <Link
                to="/start-project"
                className="inline-block bg-blue-500 text-white px-10 py-4 text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                {t("newHome.final.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHome;
