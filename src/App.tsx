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
import SEO from "./components/SEO";
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

// Beautiful blue loading component with enhanced design
const LoadingSpinner = () => (
  <div className="min-h-screen bg-slate-950">
    {/* Dark gradient background similar to other pages */}
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-slate-950/40" />
    </div>

    {/* Enhanced loading indicator */}
    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6">
        {/* Beautiful multi-layer spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-2 border-slate-700/30 rounded-full"></div>
          {/* Middle ring */}
          <div className="absolute top-1 left-1 w-14 h-14 border-2 border-blue-500/20 rounded-full"></div>
          {/* Inner spinning ring */}
          <div className="absolute top-2 left-2 w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        </div>

        {/* Loading text with animation */}
        <div className="text-center space-y-2">
          <p className="text-blue-400 text-lg font-medium animate-pulse">იტვირთება</p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <>
    <SEO
      title="კონტაქტი"
      description="დაუკავშირდით VIFA Digital-ს - ვებსაიტის შექმნა, ციფრული მარკეტინგი და AI ჩატბოტები საქართველოში. ჩვენი ექსპერტების გუნდი მზად არის თქვენი ბიზნესის ზრდისთვის."
      url="https://vifadigital.ge/contact"
      keywords="კონტაქტი, VIFA Digital, ვებსაიტის შექმნა კონტაქტი, ციფრული მარკეტინგი კონტაქტი, საქართველო, თბილისი"
    />
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <p className="text-gray-400 text-center">Contact page coming soon...</p>
      </div>
    </div>
  </>
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
