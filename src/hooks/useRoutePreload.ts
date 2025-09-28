import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Route preloading for faster navigation
const routeMap: Record<string, () => Promise<any>> = {
  "/about": () => import("../pages/AboutPage"),
  "/start-project": () => import("../service/StartProject"),

  "/services/digital-advertising": () => import("../offeredServices/Marketing"),
  "/services/web-development": () => import("../offeredServices/WebDev"),
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
              "/start-project",
              "/services/digital-advertising",
            ];
          case "/about":
            return ["/start-project", "/services/web-development"];
          case "/services/digital-advertising":
            return ["/services/web-development", "/services/social-media"];
          case "/services/web-development":
            return ["/start-project"];
          case "/services/social-media":
            return ["/start-project", "/about"];
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
