import type React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Suspense, lazy, useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./layout/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import "./index.css";
import NewDigitalAdvertising from "./offeredServices/NewDigitalAdvertising";

// Lazy load components
const Home = lazy(() => import("./pages/NewHome"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StartProject = lazy(() => import("./service/StartProject"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const SocialMediaService = lazy(
  () => import("./offeredServices/SocialMediaService")
);
const DigitalAdvertising = lazy(
  () => import("./offeredServices/NewDigitalAdvertising")
);
const WebDevelopment = lazy(() => import("./offeredServices/NewWebDevelopment"));

// Enhanced Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="flex flex-col items-center space-y-6">
      {/* Main spinner */}
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-slate-700 rounded-full"></div>
        {/* Animated ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
      </div>

      {/* Loading text */}
      <div className="flex flex-col items-center space-y-2">
        <p className="text-white text-lg font-medium">იტვირთება</p>
        <div className="flex space-x-1">
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="pt-24 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-gray-400 text-center">Contact page coming soon...</p>
    </div>
  </div>
);

// Route transition wrapper component
const RouteTransition: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 200); // Minimum loading time for smooth UX

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
          <Router>
            <Suspense fallback={<LoadingSpinner />}>
              <RouteTransition>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route
                      path="services/social-media"
                      element={<SocialMediaService />}
                    />
                    <Route
                      path="services/digital-advertising"
                      element={<NewDigitalAdvertising />}
                    />
                    <Route
                      path="services/web-development"
                      element={<WebDevelopment />}
                    />

                    <Route path="about" element={<AboutPage />} />

                    <Route path="contact" element={<Contact />} />
                    <Route path="start-project" element={<StartProject />} />
                  </Route>

                  {/* Admin routes without Layout (no navbar/footer) */}

                  <Route path="/admin/leads" element={<AdminDashboard />} />
                </Routes>
              </RouteTransition>
            </Suspense>
          </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
