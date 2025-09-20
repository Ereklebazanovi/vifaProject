"use client";

import type React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import SEO from "../components/SEO";
import OptimizedVideo from "../components/OptimizedVideo";

const NewHome: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [activeClient, setActiveClient] = useState<number>(0);
  const [videoError, setVideoError] = useState(false);

  // Client companies data
  const clients = [
    {
      id: "client1",
      name: "TechCorp",
      category: t("newHome.clients.technology"),
      description: t("newHome.clients.tech.description"),
      color: "blue",
    },
    {
      id: "client2",
      name: "RestaurantChain",
      category: t("newHome.clients.food"),
      description: t("newHome.clients.restaurant.description"),
      color: "green",
    },
    {
      id: "client3",
      name: "HealthCare",
      category: t("newHome.clients.medicine"),
      description: t("newHome.clients.healthcare.description"),
      color: "red",
    },
    {
      id: "client4",
      name: "ECommerce",
      category: t("newHome.clients.commerce"),
      description: t("newHome.clients.ecommerce.description"),
      color: "purple",
    },
    {
      id: "client5",
      name: "Education",
      category: t("newHome.clients.education"),
      description: t("newHome.clients.education.description"),
      color: "orange",
    },
    {
      id: "client6",
      name: "Fashion",
      category: t("newHome.clients.fashion"),
      description: t("newHome.clients.fashion.description"),
      color: "pink",
    },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      red: "border-red-400 bg-red-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      orange: "border-orange-400 bg-orange-500/10",
      pink: "border-pink-400 bg-pink-500/10",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />

      {/* Video Background - Full Page Coverage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          {/* Always show dark background first for smooth loading */}
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Optimized video with mobile detection */}
          {!videoError && (
            <OptimizedVideo
              src="/advertising-hero-video.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: `brightness(0.4) contrast(1.2) saturate(1.1)`,
              }}
              onError={() => setVideoError(true)}
            />
          )}

          <div className="absolute inset-0 bg-slate-950/30" />
        </div>
      </div>

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

                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
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
              <p className="text-slate-400">
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
              <p className="text-slate-400">{t("newHome.services.digital")}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 border border-purple-400/30 rounded mx-auto mb-4 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-purple-400"></div>
              </div>
              <h3 className="text-xl font-medium text-white mb-3">
                {t("newHome.services.results").split(" ").slice(0, 2).join(" ")}
              </h3>
              <p className="text-slate-400">{t("newHome.services.results")}</p>
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

            {/* Moving Logo Strip */}
            <div className="relative overflow-hidden bg-slate-900/20 rounded-2xl border border-slate-700/30 mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10 pointer-events-none"></div>

              {/* First Row - Moving Right */}
              <div className="flex animate-scroll-right py-8">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`row1-${index}`}
                    className="flex-shrink-0 mx-8 group cursor-pointer"
                    onClick={() => setActiveClient(index % clients.length)}
                  >
                    <div
                      className={`w-32 h-20 rounded-xl border-2 ${getColorClass(
                        client.color
                      )}
                      flex items-center justify-center transition-all duration-300
                      group-hover:scale-110 group-hover:border-opacity-100`}
                    >
                      <div className="text-center">
                        <div className="text-white font-bold text-xl mb-1">
                          {client.name.slice(0, 2)}
                        </div>
                        <div className="text-xs opacity-70">
                          {client.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Second Row - Moving Left */}
              <div className="flex animate-scroll-left pb-8">
                {[
                  ...clients.slice().reverse(),
                  ...clients.slice().reverse(),
                ].map((client, index) => (
                  <div
                    key={`row2-${index}`}
                    className="flex-shrink-0 mx-8 group cursor-pointer"
                    onClick={() => setActiveClient(index % clients.length)}
                  >
                    <div
                      className={`w-32 h-20 rounded-xl border-2 ${getColorClass(
                        client.color
                      )}
                      flex items-center justify-center transition-all duration-300
                      group-hover:scale-110 group-hover:border-opacity-100`}
                    >
                      <div className="text-center">
                        <div className="text-white font-bold text-xl mb-1">
                          {client.name.slice(0, 2)}
                        </div>
                        <div className="text-xs opacity-70">
                          {client.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Client Display */}
            <div className="border border-slate-600 bg-slate-900/30 p-8 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    {clients[activeClient].name}
                  </h3>
                  <p className="text-blue-400">
                    {clients[activeClient].category}
                  </p>
                </div>
                <div
                  className={`w-20 h-20 border-2 rounded-xl ${getColorClass(
                    clients[activeClient].color
                  )}
                  flex items-center justify-center animate-pulse`}
                >
                  <span className="text-white font-bold text-xl">
                    {clients[activeClient].name.slice(0, 2)}
                  </span>
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
