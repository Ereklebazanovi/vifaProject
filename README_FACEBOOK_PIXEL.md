# Facebook Pixel Integration Guide

## Setup

### 1. Environment Variable
Add your Facebook Pixel ID to your environment variables:

```env
VITE_FACEBOOK_PIXEL_ID=your_pixel_id_here
```

### 2. Integration Overview
The Facebook Pixel is automatically integrated and will:
- ✅ Load the base Facebook Pixel script
- ✅ Track `PageView` events on route changes (SPA-compatible)
- ✅ Track custom conversion events
- ✅ Work with your existing Google Analytics setup

## Usage Examples

### Basic Event Tracking
```typescript
import { facebookPixel, trackConsultationRequest, trackContactEvent } from '../utils/facebookPixel';

// Track custom events
trackConsultationRequest('hero_section');
trackContactEvent('whatsapp');

// Track standard Facebook events
facebookPixel.trackStandardEvent('Lead', { source: 'website' });
facebookPixel.trackStandardEvent('Contact', { method: 'whatsapp' });

// Track custom events with data
facebookPixel.trackEvent('ServiceInterest', { service: 'web_development' });
```

### Current Implementation
The following buttons already track events:
- **Hero Section "Free Consultation"** → `ConsultationRequest` + `Contact`
- **Final CTA "Free Consultation"** → `ConsultationRequest` + `Contact`

### Adding More Events
To track additional interactions:

```typescript
// Import the utility
import { trackServiceInterest, facebookPixel } from '../utils/facebookPixel';

// Track service card clicks
<Link
  to="/services/web-development"
  onClick={() => trackServiceInterest('web_development')}
>

// Track form submissions
const handleFormSubmit = () => {
  facebookPixel.trackStandardEvent('Lead', {
    source: 'contact_form',
    value: 100,
    currency: 'GEL'
  });
};
```

## Event Types Available

### Standard Facebook Events
- `Lead` - Lead generation events
- `Contact` - Contact interactions
- `ViewContent` - Content views
- `InitiateCheckout` - Start purchase process
- `Purchase` - Completed purchases

### Custom Events (Already Implemented)
- `ConsultationRequest` - Free consultation clicks
- `ServiceInterest` - Service page interactions

### Event Parameters
All events support custom parameters:
```typescript
facebookPixel.trackEvent('CustomEvent', {
  source: 'hero_section',
  service: 'ai_chatbot',
  value: 500,
  currency: 'GEL'
});
```

## Testing
1. Install Facebook Pixel Helper browser extension
2. Navigate through your site to verify:
   - ✅ Base pixel loads
   - ✅ PageView fires on route changes
   - ✅ Custom events fire on button clicks

## Performance
- Script loads asynchronously (non-blocking)
- Events are queued until pixel is ready
- Follows same pattern as existing Google Analytics integration