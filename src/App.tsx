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
const LineupLandingPage = lazy(() => import("./offeredServices/LineupLandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const BlogEditor = lazy(() => import("./pages/blog/BlogEditor"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const ContactsPage = lazy(() => import("./admin/contacts/ContactsPage"));
const SendPage = lazy(() => import("./admin/send/SendPage"));
const OverviewPage = lazy(() => import("./admin/overview/OverviewPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

// The admin is entered directly by URL, never via in-app navigation, so the
// initial path is enough to keep its visits out of GA and the Meta Pixel.
const isStudio =
  typeof window !== "undefined" && window.location.pathname.startsWith("/studio");

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <NavigationProvider>
          <BrowserRouter>
            {!isStudio && import.meta.env.VITE_GA_MEASUREMENT_ID && (
              <GoogleAnalytics
                measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID}
              />
            )}

            {!isStudio && import.meta.env.VITE_FACEBOOK_PIXEL_ID && (
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
                  {/* LineUp — sports academy app (product page with a live demo) */}
                  <Route path="lineup" element={<LineupLandingPage />} />

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

                {/* Admin (Google sign-in, locked by firestore.rules). Standalone, no navbar/footer. */}
                <Route path="/studio" element={<AdminLayout />}>
                  <Route index element={<Navigate to="overview" replace />} />
                  <Route path="overview" element={<OverviewPage />} />
                  <Route path="contacts" element={<ContactsPage />} />
                  <Route path="campaigns" element={<SendPage />} />
                  <Route path="send" element={<Navigate to="/studio/campaigns" replace />} />
                  <Route path="blog" element={<BlogEditor />} />
                </Route>

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
