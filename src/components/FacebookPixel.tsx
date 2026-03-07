// Facebook Pixel Component for React Integration
// Handles initialization and route-based page view tracking
//FacebookPixel.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { facebookPixel, type FacebookPixelConfig } from '../utils/facebookPixel';

interface FacebookPixelProps {
  pixelId: string;
  enabled?: boolean;
}

/**
 * Facebook Pixel component that initializes tracking and handles route changes
 * Should be placed at the app level, similar to GoogleAnalytics
 */
const FacebookPixel: React.FC<FacebookPixelProps> = ({ pixelId, enabled = true }) => {
  const location = useLocation();

  // Initialize Facebook Pixel on component mount
  useEffect(() => {
    const config: FacebookPixelConfig = {
      pixelId,
      enabled: enabled && !!pixelId,
    };

    facebookPixel.init(config);
  }, [pixelId, enabled]);

  // Track page views on route changes
  useEffect(() => {
    if (facebookPixel.getStatus().isEnabled) {
      // Small delay to ensure page is fully rendered
      const timeoutId = setTimeout(() => {
        facebookPixel.pageView();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [location.pathname, location.search]);

  // This component doesn't render anything
  return null;
};

export default FacebookPixel;