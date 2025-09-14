import type { NavItem } from "../types";

export const navigationItems: NavItem[] = [
  {
    key: "home",
    path: "/",
    label: "Home",
  },
  {
    key: "services",
    path: "/services",
    label: "Services",
    children: [
      {
        key: "social-media",
        path: "/services/social-media",
        label: "Social Media Management",
      },
      {
        key: "digital-ads",
        path: "/services/digital-advertising",
        label: "Digital Advertising",
      },
      {
        key: "web-dev",
        path: "/services/web-development",
        label: "Web Development",
      },
      {
        key: "seo",
        path: "/services/seo",
        label: "SEO & Analytics",
      },
    ],
  },
  {
    key: "about",
    path: "/about",
    label: "About",
  },
  
  {
    key: "contact",
    path: "/contact",
    label: "Contact",
  },
];
