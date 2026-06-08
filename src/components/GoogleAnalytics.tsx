import { useEffect } from 'react';

interface GoogleAnalyticsProps {
  measurementId: string;
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId }) => {
  useEffect(() => {
    let script1: HTMLScriptElement | null = null;
    let script2: HTMLScriptElement | null = null;

    const inject = () => {
      // Create script tag for Google Analytics
      script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script1);

      // Initialize gtag
      script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `;
      document.head.appendChild(script2);
    };

    // Defer analytics out of the critical load window so its scripts/beacons
    // never keep the browser tab's loading spinner active. Runs once idle/loaded.
    const schedule = () => {
      const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void }).requestIdleCallback;
      if (typeof ric === 'function') ric(inject, { timeout: 3000 });
      else setTimeout(inject, 1500);
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (script1?.parentNode) script1.parentNode.removeChild(script1);
      if (script2?.parentNode) script2.parentNode.removeChild(script2);
    };
  }, [measurementId]);

  return null;
};

// Helper function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Helper function to track page views
export const trackPageView = (page_title: string, page_location: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_title,
      page_location,
    });
  }
};

export default GoogleAnalytics;