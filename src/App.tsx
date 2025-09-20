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
import MouseTrail from "./components/MouseTrail";
import { useRoutePreload } from "./hooks/useRoutePreload";
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

// Smooth loading component that maintains visual continuity
const LoadingSpinner = () => (
  <div className="min-h-screen bg-slate-950">
    {/* Dark gradient background similar to video backgrounds */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-slate-950/30" />
    </div>

    {/* Minimal loading indicator */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Subtle spinner */}
        <div className="relative">
          <div className="w-8 h-8 border-2 border-slate-600 rounded-full"></div>
          <div className="absolute top-0 left-0 w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        {/* Subtle loading text */}
        <p className="text-slate-400 text-sm font-light">იტვირთება</p>
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

// Optimized route transition with immediate rendering
const RouteTransition: React.FC<{ children: React.ReactNode }> = React.memo(({
  children,
}) => {
  return (
    <div className="transition-opacity duration-200 opacity-100">
      {children}
    </div>
  );
});

// Component that uses router hooks - must be inside Router
const AppWithRouter: React.FC = () => {
  useRoutePreload(); // Now safely inside Router context

  return (
    <ErrorBoundary>
      <MouseTrail />
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
  );
};

// Main App component
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
            <AppWithRouter />
          </Router>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
