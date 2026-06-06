import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import Layout from "./layout/Layout";
import Home from "./pages/organic/Home";

// Route-level code splitting: only the homepage ships in the initial bundle.
// Every other page loads on demand, shrinking first-load JS / improving CWV.
const WebDev = lazy(() => import("./offeredServices/WebDev"));
const Marketing = lazy(() => import("./offeredServices/Marketing"));
const Production = lazy(() => import("./offeredServices/Production"));
const AIChatbot = lazy(() => import("./pages/AIChatbot"));
const NotFound = lazy(() => import("./pages/NotFound"));
const IndustryLanding = lazy(() => import("./pages/landing/IndustryLanding"));
const InventoLandingPage = lazy(() => import("./offeredServices/InventoLandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const BlogEditor = lazy(() => import("./pages/blog/BlogEditor"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <NavigationProvider>
          <BrowserRouter>
            {import.meta.env.VITE_GA_MEASUREMENT_ID && (
              <GoogleAnalytics
                measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID}
              />
            )}

            {import.meta.env.VITE_FACEBOOK_PIXEL_ID && (
              <FacebookPixel pixelId={import.meta.env.VITE_FACEBOOK_PIXEL_ID} />
            )}

            <Suspense fallback={<div className="min-h-screen bg-[#050404]" />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />

                  {/* Organic Traffic Flow */}
                  <Route path="services/web" element={<WebDev />} />
                  <Route path="services/marketing" element={<Marketing />} />
                  {/* Photo/video/drone production — indexable, NOT in navbar (linked from
                      Marketing + footer). Same model as industry money-SEO pages. */}
                  <Route path="services/production" element={<Production />} />

                  {/* Route aliases (server-side 301'd to canonical in vercel.json) */}
                  <Route path="services/web-development" element={<WebDev />} />
                  <Route
                    path="services/digital-advertising"
                    element={<Marketing />}
                  />
                  <Route path="services/ai-chatbot" element={<AIChatbot />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="inventowms" element={<InventoLandingPage />} />

                  {/* Blog (organic content engine) */}
                  <Route path="blog" element={<BlogIndex />} />
                  <Route path="blog/:slug" element={<BlogPost />} />

                  {/* Legal pages (linked from footer) */}
                  <Route path="privacy" element={<PrivacyPolicy />} />
                  <Route path="terms" element={<TermsOfService />} />

                  {/* Dynamic Ad-Landing Flow */}
                  <Route path="industry/:service/:slug" element={<IndustryLanding />} />

                  <Route path="*" element={<NotFound />} />
                </Route>

                {/* Hidden blog editor — unlinked, no auth. Standalone (no navbar/footer). */}
                <Route path="/vifa-studio" element={<BlogEditor />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </NavigationProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
