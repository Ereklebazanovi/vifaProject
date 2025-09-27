// Performance optimization utilities for better Core Web Vitals

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontPreloads = [
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' },
    { href: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ];

  fontPreloads.forEach(({ href, as, type, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });

  // Preload critical images
  const criticalImages = ['/vifa.jpg'];
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
};

// Optimize third-party scripts loading
export const optimizeThirdPartyScripts = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach((script) => {
    const src = script.getAttribute('src');
    if (src && !src.includes('gtag') && !src.includes('analytics')) {
      script.setAttribute('defer', '');
    }
  });
};

// Implement intersection observer for lazy loading
export const createIntersectionObserver = (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Optimize CSS delivery
export const optimizeCSSDelivery = () => {
  // Add critical CSS inline and load non-critical CSS asynchronously
  const nonCriticalCSS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
  ];

  nonCriticalCSS.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    link.onload = function() {
      (this as any).onload = null;
      (this as any).rel = 'stylesheet';
    };
    document.head.appendChild(link);
  });
};

// Reduce JavaScript execution time
export const deferNonCriticalJS = () => {
  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      // Initialize non-critical features here
      console.log('Non-critical JS initialized during idle time');
    });
  }
};

// Optimize image loading
export const optimizeImageLoading = (img: HTMLImageElement) => {
  // Add loading="lazy" and proper sizing attributes
  img.loading = 'lazy';
  img.decoding = 'async';

  // Add error handling
  img.onerror = () => {
    console.warn(`Failed to load image: ${img.src}`);
    // Optionally set a fallback image
    img.src = '/fallback-image.jpg';
  };
};

// Performance monitoring
export const measureWebVitals = () => {
  // Import web-vitals library dynamically
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }).catch(() => {
    console.log('Web Vitals measurement not available');
  });
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//www.googletagmanager.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' }
  ];

  hints.forEach(({ rel, href, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
};

// Bundle size optimization tracking
export const trackBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle analysis available in production build');
  }
};

// Service Worker registration for caching
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  }
};

// Initialize all performance optimizations
export const initializePerformanceOptimizations = () => {
  // Run on page load
  document.addEventListener('DOMContentLoaded', () => {
    preloadCriticalResources();
    optimizeCSSDelivery();
    addResourceHints();
    deferNonCriticalJS();
  });

  // Run after page is fully loaded
  window.addEventListener('load', () => {
    optimizeThirdPartyScripts();
    measureWebVitals();
    registerServiceWorker();
  });
};