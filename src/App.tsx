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
import { NavigationProvider } from "./contexts/NavigationContext";
// Lazy load performance utilities
import GoogleAnalytics from "./components/GoogleAnalytics";
import "./index.css";

// Simple lazy loading - no artificial delays
const Home = lazy(() => import("./pages/NewHome"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const StartProject = lazy(() => import("./service/StartProject"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const Marketing = lazy(() => import("./offeredServices/Marketing"));
const WebDev = lazy(() => import("./offeredServices/WebDev"));
const AIChatbot = lazy(() => import("./pages/AIChatbot"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

// Elegant black loading component (consistent with Layout)
const LoadingSpinner = () => (
  <div className="min-h-screen bg-black">
    {/* Pure black gradient background with subtle elegance */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950/50 via-black to-gray-900/30" />
      <div className="absolute inset-0" style={{background: 'radial-gradient(circle at center, rgba(17, 24, 39, 0.2), transparent, transparent)'}} />
    </div>

    {/* Elegant loading indicator */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-8">
        {/* Sophisticated multi-layer spinner */}
        <div className="relative">
          {/* Outer glow ring */}
          <div className="w-20 h-20 border border-gray-800/20 rounded-full shadow-2xl"></div>

          {/* Secondary ring with subtle glow */}
          <div className="absolute top-1 left-1 w-18 h-18 border border-gray-700/30 rounded-full"></div>

          {/* Main spinning ring - elegant blue accent */}
          <div className="absolute top-2 left-2 w-16 h-16 border-2 border-gray-800/40 border-t-blue-500 border-r-blue-400 rounded-full animate-spin shadow-lg"></div>

          {/* Inner ring with slower rotation */}
          <div className="absolute top-4 left-4 w-12 h-12 border border-gray-600/30 border-b-blue-300 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '2s'}}></div>

          {/* Center elegant dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-lg shadow-blue-500/30"></div>

          {/* Subtle outer glow effect */}
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-blue-500/5 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
        </div>

        {/* Elegant loading text */}
        <div className="text-center space-y-3">
          <p className="text-gray-300 text-lg font-light tracking-[0.2em] animate-pulse font-['Inter','Noto_Sans_Georgian',sans-serif] opacity-80">
            იტვირთება
          </p>

          {/* Sophisticated dot animation */}
          <div className="flex space-x-2 justify-center">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '0ms'}}></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '200ms'}}></div>
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full animate-bounce opacity-70" style={{animationDelay: '400ms'}}></div>
          </div>
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
  // Lazy load route preloading after initial render
  useEffect(() => {
    import('./hooks/useRoutePreload').then(() => {
      // Defer route preloading for better performance
    });
  }, []);

  return (
    <ErrorBoundary>
      <RouteTransition>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services/digital-advertising" element={<Marketing />} />
              <Route path="services/web-development" element={<WebDev />} />
              <Route path="services/ai-chatbot" element={<AIChatbot />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<Contact />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="start-project" element={<StartProject />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />

              {/* 404 Not Found - Catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin routes without Layout (no navbar/footer) */}
            <Route
              path="/admin/leads"
              element={<AdminDashboard />}
            />
          </Routes>
        </Suspense>
      </RouteTransition>
    </ErrorBoundary>
  );
};

// Main App component
const App: React.FC = () => {
  useEffect(() => {
    // Defer performance optimizations to avoid blocking initial render
    setTimeout(() => {
      Promise.all([
        import('./utils/performanceOptimizations'),
        import('./utils/preload')
      ]).then(([{ initializePerformanceOptimizations }, { addResourceHints }]) => {
        initializePerformanceOptimizations();
        addResourceHints();
      });
    }, 200);
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <NavigationProvider>
            <Router>
              {/* Google Analytics */}
              {import.meta.env.VITE_GA_MEASUREMENT_ID && (
                <GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID} />
              )}
              <AppWithRouter />
            </Router>
          </NavigationProvider>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
