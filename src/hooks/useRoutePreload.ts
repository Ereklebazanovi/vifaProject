import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Route preloading for faster navigation
const routeMap: Record<string, () => Promise<any>> = {
  "/about": () => import("../pages/AboutPage"),
  "/contact": () => import("../pages/ContactPage"),
  "/services/marketing": () => import("../offeredServices/Marketing"),
  "/services/web": () => import("../offeredServices/WebDev"),
  // Note: AIChatbot deliberately not preloaded to show loading spinner
};

export const useRoutePreload = () => {
  const location = useLocation();

  useEffect(() => {
    // Preload routes based on current location
    const preloadRoutes = () => {
      const currentPath = location.pathname;

      // Preload likely next routes based on current page
      const getPreloadRoutes = (path: string): string[] => {
        switch (path) {
          case "/":
            return [
              "/about",
              "/contact",
              "/services/marketing",
            ];
          case "/about":
            return ["/contact", "/services/web"];
          case "/services/marketing":
            return ["/services/web", "/services/ai-chatbot"];
          case "/services/web":
            return ["/contact", "/services/ai-chatbot"];
          case "/services/ai-chatbot":
            return ["/contact", "/inventowms"];
          default:
            return ["/"];
        }
      };

      const routesToPreload = getPreloadRoutes(currentPath);

      // Preload after a short delay to not interfere with current page
      setTimeout(() => {
        routesToPreload.forEach((route) => {
          if (routeMap[route]) {
            routeMap[route]().catch(() => {
              // Silently fail - preloading is optional
            });
          }
        });
      }, 1500);
    };

    preloadRoutes();
  }, [location.pathname]);
};

// Manual preload function for hover events
export const preloadRoute = (path: string) => {
  if (routeMap[path]) {
    routeMap[path]().catch(() => {
      // Silently fail - preloading is optional
    });
  }
};
