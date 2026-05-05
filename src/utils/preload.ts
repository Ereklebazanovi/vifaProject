// Preload utilities for better performance

// Preload critical assets
export const preloadAssets = {
  // Preload critical videos
  videos: (urls: string[]) => {
    if (typeof window === 'undefined') return;

    urls.forEach(url => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = url;
      video.load();
    });
  },

  // Preload critical images
  images: (urls: string[]) => {
    if (typeof window === 'undefined') return;

    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  },

  // Preload next route component
  route: async (routeImporter: () => Promise<any>) => {
    try {
      await routeImporter();
    } catch (error) {
      console.warn('Failed to preload route:', error);
    }
  },

  // Initialize all critical preloads
  init: () => {
    if (typeof window === 'undefined') return;

    // Preload critical videos after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloadAssets.videos([
          '/advertising-hero-video.mp4',
          '/digital-advertising-video.mp4',
          '/web-development-bg.mp4'
        ]);
      }, 2000); // Delay to not interfere with initial load
    });
  }
};

// Service Worker removed for better cache management

// Critical resource hints
export const addResourceHints = () => {
  if (typeof document === 'undefined') return;

  const head = document.head;

  // DNS prefetch for external domains
  const dnsPrefetchDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    head.appendChild(link);
  });

  // Preconnect to critical origins
  const preconnectOrigins = [
    'https://fonts.gstatic.com'
  ];

  preconnectOrigins.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    head.appendChild(link);
  });
};