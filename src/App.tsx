import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import Layout from "./layout/Layout";
import Marketing from "./offeredServices/Marketing";
import WebDev from "./offeredServices/WebDev";
import Home from "./pages/organic/Home";
import AIChatbot from "./pages/AIChatbot";
import ChatbotRequestForm from "./pages/ChatbotRequestForm";
import NotFound from "./pages/NotFound";
import IndustryLanding from "./pages/landing/IndustryLanding";
import InventoLandingPage from "./offeredServices/InventoLandingPage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";

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

            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />

                {/* Organic Traffic Flow */}
                <Route path="services/web" element={<WebDev />} />
                <Route path="services/marketing" element={<Marketing />} />

                {/* Existing route aliases used inside the current homepage */}
                <Route path="services/web-development" element={<WebDev />} />
                <Route
                  path="services/digital-advertising"
                  element={<Marketing />}
                />
                <Route path="services/ai-chatbot" element={<AIChatbot />} />
                <Route
                  path="services/ai-chatbot/request"
                  element={<ChatbotRequestForm />}
                />
                <Route path="contact" element={<ContactPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="inventowms" element={<InventoLandingPage />} />

                {/* Dynamic Ad-Landing Flow */}
                <Route path="industry/:service/:slug" element={<IndustryLanding />} />

                <Route path="*" element={<NotFound />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NavigationProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
