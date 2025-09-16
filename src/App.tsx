import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./layout/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { addResourceHints } from "./utils/preload";
import "./index.css";

// Simple lazy loading - back to basics
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

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-4">დაფიქსირდა შეცდომა</h1>
            <p className="text-slate-400 mb-4">გვერდის ჩატვირთვისას მოხდა შეცდომა</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              გვერდის განახლება
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Enhanced Loading component with skeleton
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

// Route transition wrapper component - REMOVED ARTIFICIAL DELAY
const RouteTransition: React.FC<{ children: React.ReactNode }> = React.memo(({
  children,
}) => {
  return <>{children}</>;
});

const App: React.FC = () => {
  useEffect(() => {
    // Only add basic resource hints - no aggressive monitoring
    addResourceHints();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <Router>
            <ErrorBoundary>
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
                        element={<DigitalAdvertising />}
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
            </ErrorBoundary>
          </Router>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
