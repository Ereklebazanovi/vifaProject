// Facebook Pixel Integration Utility
// Provides type-safe Facebook Pixel tracking with custom events support
//facebookPixel.ts
declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

export interface FacebookPixelConfig {
  pixelId: string;
  enabled?: boolean;
}

export interface CustomEventData {
  [key: string]: string | number | boolean;
}

class FacebookPixelManager {
  private pixelId: string | null = null;
  private isEnabled: boolean = false;
  private isInitialized: boolean = false;
  private eventQueue: Array<() => void> = [];

  /**
   * Initialize Facebook Pixel with configuration
   */
  init(config: FacebookPixelConfig): void {
    this.pixelId = config.pixelId;
    this.isEnabled = config.enabled ?? true;

    if (!this.isEnabled || typeof window === 'undefined') {
      console.log('[Facebook Pixel] Disabled or not in browser environment');
      return;
    }

    if (!this.pixelId) {
      console.warn('[Facebook Pixel] No Pixel ID provided');
      return;
    }

    this.loadPixelScript();
  }

  /**
   * Load Facebook Pixel script dynamically
   */
  private loadPixelScript(): void {
    if (this.isInitialized) return;

    // Facebook Pixel base code
    const script = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
    `;

    // Create script element
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = script;
    document.head.appendChild(scriptElement);

    // Initialize pixel
    window.fbq('init', this.pixelId);
    window.fbq('track', 'PageView');

    this.isInitialized = true;

    // Process any queued events
    this.eventQueue.forEach(eventFn => eventFn());
    this.eventQueue = [];

    console.log(`[Facebook Pixel] Initialized with ID: ${this.pixelId}`);
  }

  /**
   * Track page view (for SPA route changes)
   */
  pageView(): void {
    this.executeOrQueue(() => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
        console.log('[Facebook Pixel] PageView tracked');
      }
    });
  }

  /**
   * Track custom events with optional custom data
   */
  trackEvent(eventName: string, customData?: CustomEventData): void {
    this.executeOrQueue(() => {
      if (window.fbq) {
        if (customData) {
          window.fbq('track', eventName, customData);
        } else {
          window.fbq('track', eventName);
        }
        console.log(`[Facebook Pixel] Event tracked: ${eventName}`, customData || '');
      }
    });
  }

  /**
   * Track standard Facebook events with parameters
   */
  trackStandardEvent(eventName: 'Lead' | 'Contact' | 'CompleteRegistration' | 'InitiateCheckout' | 'Purchase' | 'ViewContent', parameters?: Record<string, any>): void {
    this.executeOrQueue(() => {
      if (window.fbq) {
        window.fbq('track', eventName, parameters || {});
        console.log(`[Facebook Pixel] Standard event tracked: ${eventName}`, parameters || '');
      }
    });
  }

  /**
   * Track custom conversion events
   */
  trackConversion(eventName: string, value?: number, currency: string = 'GEL'): void {
    const parameters: Record<string, any> = {};
    if (value !== undefined) {
      parameters.value = value;
      parameters.currency = currency;
    }

    this.trackStandardEvent(eventName as any, parameters);
  }

  /**
   * Execute tracking function or queue it if pixel not ready
   */
  private executeOrQueue(trackingFn: () => void): void {
    if (!this.isEnabled) return;

    if (this.isInitialized && window.fbq) {
      trackingFn();
    } else {
      this.eventQueue.push(trackingFn);
    }
  }

  /**
   * Get current configuration status
   */
  getStatus(): { pixelId: string | null; isEnabled: boolean; isInitialized: boolean } {
    return {
      pixelId: this.pixelId,
      isEnabled: this.isEnabled,
      isInitialized: this.isInitialized,
    };
  }
}

// Export singleton instance
export const facebookPixel = new FacebookPixelManager();

// Convenience functions for common events
export const trackLeadEvent = (source: string = 'website') => {
  facebookPixel.trackStandardEvent('Lead', { source });
};

export const trackContactEvent = (method: string = 'whatsapp') => {
  facebookPixel.trackStandardEvent('Contact', { method });
};

export const trackConsultationRequest = (service?: string) => {
  facebookPixel.trackEvent('ConsultationRequest', { service: service || 'general' });
};

export const trackServiceInterest = (serviceName: string) => {
  facebookPixel.trackEvent('ServiceInterest', { service: serviceName });
};