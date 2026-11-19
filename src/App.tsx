import { useLayoutEffect } from "react";
import type { ComponentType } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, RouterProvider, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import FacebookPixel from "./components/FacebookPixel";
import GoogleAnalytics from "./components/GoogleAnalytics";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { itHref } from "./data/itServices";
import { marketingServices } from "./data/marketingServices";
import Layout from "./layout/Layout";
import Home from "./pages/organic/Home";

// Route-level code splitting: only the homepage ships in the initial bundle.
// Every other page loads on demand, shrinking first-load JS / improving CWV.
// Resolve the destination module before the router captures its transition.
const lazyRoute = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const webDev = lazyRoute(() => import("./offeredServices/WebDev"));
const marketing = lazyRoute(() => import("./offeredServices/Marketing"));

// The admin and the design previews (/preview/*) are entered directly by URL,
// never via in-app navigation, so the initial path is enough to keep their
// visits out of GA and the Meta Pixel.
const isStudio =
  typeof window !== "undefined" && /^\/(studio|preview)(\/|$)/.test(window.location.pathname);

function AppShell() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (!/^\/studio(\/|$)/.test(pathname)) window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!isStudio && import.meta.env.VITE_GA_MEASUREMENT_ID && (
        <GoogleAnalytics measurementId={import.meta.env.VITE_GA_MEASUREMENT_ID} />
      )}
      {!isStudio && import.meta.env.VITE_FACEBOOK_PIXEL_ID && (
        <FacebookPixel pixelId={import.meta.env.VITE_FACEBOOK_PIXEL_ID} />
      )}
      <Outlet />
    </>
  );
}

function AdvertisingRedirect() {
  const { search, hash } = useLocation();
  return <Navigate to={{ pathname: marketingServices.advertising.href, search, hash }} replace />;
}

const loadingClass = /^\/(preview|industry\/web|services\/(marketing|production|social-media|advertising|branding|digital-advertising))(\/|$)/.test(window.location.pathname)
  ? "bg-[#f5f5f7]" : "bg-[#050404]";

const router = createBrowserRouter(createRoutesFromElements(
  <Route element={<AppShell />} hydrateFallbackElement={<div className={`min-h-screen ${loadingClass}`} />}>
    <Route element={<Layout light />}>
      <Route path="services/web" lazy={webDev} />
      <Route path="services/web-development" lazy={webDev} />
      <Route path="industry/web/:slug" lazy={async () => ({
        Component: (await import("./pages/landing/IndustryLanding")).WebIndustryLanding,
      })} />
      <Route path="services/ai-chatbot" lazy={lazyRoute(() => import("./pages/AIChatbot"))} />
      <Route path="inventowms" lazy={lazyRoute(() => import("./offeredServices/InventoLandingPage"))} />
      <Route path="lineup" lazy={lazyRoute(() => import("./offeredServices/LineupLandingPage"))} />
      <Route path="services/marketing" lazy={marketing} />
      <Route path="services/production" lazy={lazyRoute(() => import("./offeredServices/Production"))} />
      <Route path="services/social-media" lazy={lazyRoute(() => import("./offeredServices/SocialMedia"))} />
      <Route path="services/advertising" lazy={lazyRoute(() => import("./offeredServices/Advertising"))} />
      <Route path="services/branding" lazy={lazyRoute(() => import("./offeredServices/Branding"))} />
      <Route path="services/digital-advertising" element={<AdvertisingRedirect />} />
    </Route>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="contact" lazy={lazyRoute(() => import("./pages/ContactPage"))} />
      <Route path="about" lazy={lazyRoute(() => import("./pages/AboutPage"))} />
      <Route path="blog" lazy={lazyRoute(() => import("./pages/blog/BlogIndex"))} />
      <Route path="blog/:slug" lazy={lazyRoute(() => import("./pages/blog/BlogPost"))} />
      <Route path="privacy" lazy={lazyRoute(() => import("./pages/PrivacyPolicy"))} />
      <Route path="terms" lazy={lazyRoute(() => import("./pages/TermsOfService"))} />
      <Route path="industry/:service/:slug" lazy={lazyRoute(() => import("./pages/landing/IndustryLanding"))} />
      <Route path="*" lazy={lazyRoute(() => import("./pages/NotFound"))} />
    </Route>

    {/* Admin routes use their own layout and navigation. */}
    <Route path="/studio" lazy={lazyRoute(() => import("./admin/AdminLayout"))}>
      <Route index element={<Navigate to="overview" replace />} />
      <Route path="overview" lazy={lazyRoute(() => import("./admin/overview/OverviewPage"))} />
      <Route path="pipeline" lazy={lazyRoute(() => import("./admin/pipeline/PipelinePage"))} />
      <Route path="contacts" lazy={lazyRoute(() => import("./admin/contacts/ContactsPage"))} />
      <Route path="sources" lazy={lazyRoute(() => import("./admin/sources/SourcesPage"))} />
      <Route path="campaigns" lazy={lazyRoute(() => import("./admin/send/SendPage"))} />
      <Route path="send" element={<Navigate to="/studio/campaigns" replace />} />
      <Route path="blog" lazy={lazyRoute(() => import("./pages/blog/BlogEditor"))} />
    </Route>

    <Route path={itHref} lazy={lazyRoute(() => import("./pages/preview/ITHubPreview"))} />
    <Route path="/preview/type" lazy={lazyRoute(() => import("./pages/preview/TypeSpecimen"))} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Route>,
));

const App = () => {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <NavigationProvider>
          <RouterProvider router={router} />
        </NavigationProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default App;
