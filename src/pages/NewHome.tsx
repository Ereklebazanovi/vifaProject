"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import SEO from "../components/SEO";
import Hyperspeed from "../components/Hyperspeed";
import { hyperspeedPresets } from "../components/hyperspeedPresets";
import LogoLoop from "../components/LogoLoop";
const NewHome: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [activeClient, setActiveClient] = useState<number>(0);

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

  // Client companies data for detail view
  const clients = [
    {
      id: "client1",
      name: "Partner 1",
      logo: "/saitislogoebi/Untitled-1.png",
      description: t("newHome.clients.tech.description"),
    },
    {
      id: "client2",
      name: "Partner 2",
      logo: "/saitislogoebi/Untitled-2.png",
      description: t("newHome.clients.restaurant.description"),
    },
    {
      id: "client3",
      name: "Partner 3",
      logo: "/saitislogoebi/Untitled-3.png",
      description: t("newHome.clients.healthcare.description"),
    },
    {
      id: "client4",
      name: "Partner 4",
      logo: "/saitislogoebi/Untitled-4.png",
      description: t("newHome.clients.ecommerce.description"),
    },
    {
      id: "client5",
      name: "Partner 5",
      logo: "/saitislogoebi/Untitled-5.png",
      description: t("newHome.clients.education.description"),
    },
    {
      id: "client6",
      name: "Partner 6",
      logo: "/saitislogoebi/Untitled-6.png",
      description: t("newHome.clients.fashion.description"),
    },
    {
      id: "client7",
      name: "Partner 7",
      logo: "/saitislogoebi/Untitled-7.png",
      description: t("newHome.clients.tech.description"),
    },
    {
      id: "client8",
      name: "Partner 8",
      logo: "/saitislogoebi/Untitled-8.png",
      description: t("newHome.clients.restaurant.description"),
    },
    {
      id: "client9",
      name: "Partner 9",
      logo: "/saitislogoebi/Untitled-9.png",
      description: t("newHome.clients.healthcare.description"),
    },
    {
      id: "client10",
      name: "Partner 10",
      logo: "/saitislogoebi/Untitled-10.png",
      description: t("newHome.clients.ecommerce.description"),
    },
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

      {/* Light overlay for text readability */}
      <div className="fixed inset-0 z-5 bg-black/15"></div>

      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-24 mt-28">
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
                {t("newHome.services.strategic")
                  .split(" ")
                  .slice(0, 2)
                  .join(" ")}
              </h3>
              <p className="text-slate-300">
                {t("newHome.services.strategic")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 border border-green-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-green-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.digital").split(" ").slice(0, 2).join(" ")}
              </h3>
              <p className="text-slate-300">{t("newHome.services.digital")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-purple-400"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.results").split(" ").slice(0, 2).join(" ")}
              </h3>
              <p className="text-slate-300">{t("newHome.services.results")}</p>
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
                {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
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

            {/* Active Client Display */}
            <div className="border border-slate-700/30 bg-black/40 p-8 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    {clients[activeClient].name}
                  </h3>
                </div>
                <div
                  className="w-20 h-20 border-2 rounded-xl border-slate-600/30 bg-white/5
                  flex items-center justify-center animate-pulse p-2"
                >
                  <img
                    src={clients[activeClient].logo}
                    alt={clients[activeClient].name}
                    className="w-full h-full object-contain filter brightness-0 invert opacity-70"
                  />
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed">
                {clients[activeClient].description}
              </p>
            </div>
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
