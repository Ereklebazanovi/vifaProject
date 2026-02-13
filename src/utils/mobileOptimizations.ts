// Mobile and performance optimization utilities

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  hasSlowConnection: boolean;
  hasTouchScreen: boolean;
  screenWidth: number;
  screenHeight: number;
}

export const getDeviceInfo = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      hasSlowConnection: false,
      hasTouchScreen: false,
      screenWidth: 1920,
      screenHeight: 1080
    };
  }

  const userAgent = navigator.userAgent;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // More accurate device detection
  const isMobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isSmallScreen = screenWidth < 640; // Only very small screens
  const isMobile = isMobileDevice || (isSmallScreen && screenWidth < 480); // Only truly mobile
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent) || (screenWidth >= 640 && screenWidth <= 1024 && !isMobileDevice);
  const isDesktop = !isMobile && !isTablet;

  // Less aggressive connection detection
  const connection = (navigator as any).connection;
  const hasSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' ||
    connection.effectiveType === '2g' ||
    (connection.effectiveType === '3g' && connection.downlink < 1.0) // Only very slow 3G
  );

  // Touch detection
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    isMobile,
    isTablet,
    isDesktop,
    hasSlowConnection,
    hasTouchScreen,
    screenWidth,
    screenHeight
  };
};

// Performance optimization settings based on device
export const getOptimizationSettings = (deviceInfo: DeviceInfo) => {
  const { isMobile, hasSlowConnection, screenWidth } = deviceInfo;

  return {
    // Video settings - Much more permissive
    shouldLoadVideo: !isMobile || (!hasSlowConnection && screenWidth > 480), // Allow tablets and small laptops
    videoQuality: isMobile ? 'low' : hasSlowConnection ? 'medium' : 'high',
    videoPreload: hasSlowConnection ? 'none' : isMobile ? 'metadata' : 'auto',

    // Image settings
    imageQuality: isMobile ? 0.7 : 0.9,
    shouldLazyLoad: true,
    lazyLoadThreshold: isMobile ? 0.3 : 0.1,

    // Animation settings
    reduceMotion: hasSlowConnection || isMobile,
    animationDuration: hasSlowConnection ? 0 : isMobile ? 200 : 300,

    // Bundle settings
    shouldPreloadRoutes: !hasSlowConnection,
    maxConcurrentRequests: hasSlowConnection ? 2 : isMobile ? 4 : 6,

    // Layout settings
    showVideoControls: isMobile,
    useTouchOptimizations: deviceInfo.hasTouchScreen,
    gridColumns: screenWidth < 640 ? 1 : screenWidth < 1024 ? 2 : 3,

    // Network settings
    requestTimeout: hasSlowConnection ? 10000 : 5000,
    retryAttempts: hasSlowConnection ? 1 : 3
  };
};

// React hook for device-aware optimizations
export const useDeviceOptimizations = () => {
  const deviceInfo = getDeviceInfo();
  const settings = getOptimizationSettings(deviceInfo);

  return {
    deviceInfo,
    settings,

    // Utility functions
    shouldLoadMedia: (type: 'video' | 'image' = 'video') => {
      return type === 'video' ? settings.shouldLoadVideo : true;
    },

    getAnimationDuration: () => settings.animationDuration,

    isLowPerformanceDevice: () => deviceInfo.isMobile || deviceInfo.hasSlowConnection,

    getImageSrc: (baseSrc: string) => {
      // Return optimized image URLs based on device
      if (deviceInfo.isMobile && baseSrc.includes('.jpg')) {
        return baseSrc.replace('.jpg', '_mobile.jpg');
      }
      return baseSrc;
    }
  };
};

// Critical CSS injection for above-the-fold content
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const criticalCSS = `
    .critical-loading {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      min-height: 100vh;
    }

    .critical-text {
      color: white;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .critical-spinner {
      width: 32px;
      height: 32px;
      border: 2px solid #475569;
      border-top-color: #3b82f6;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  const style = document.createElement('style');
  style.textContent = criticalCSS;
  document.head.appendChild(style);
};

// Preload critical resources based on device
export const preloadCriticalResources = (deviceInfo: DeviceInfo) => {
  if (typeof document === 'undefined') return;

  const settings = getOptimizationSettings(deviceInfo);

  // Preload critical fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);

  // Preload critical CSS only if not slow connection
  if (!settings.reduceMotion) {
    const cssLink = document.createElement('link');
    cssLink.rel = 'preload';
    cssLink.href = '/src/index.css';
    cssLink.as = 'style';
    document.head.appendChild(cssLink);
  }
};