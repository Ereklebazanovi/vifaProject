import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bpg-nino-mtavruli/css/bpg-nino-mtavruli.min.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/poppins/300.css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/space-grotesk/300.css'
import '@fontsource/space-grotesk/400.css'
import '@fontsource/space-grotesk/500.css'
import '@fontsource/space-grotesk/600.css'
import '@fontsource/space-grotesk/700.css'
import App from './App.tsx'

// 👇 დიაგნოსტიკა: ეს გამოაჩენს კონსოლში ზუსტ ვერსიას
console.log(
  "%c [DIAGNOSTIC] Running React Version: " + React.version, 
  "background: #bada55; color: #222; font-size: 16px; padding: 4px; border-radius: 4px;"
);

// Defer non-critical optimizations to avoid blocking
setTimeout(() => {
  import('./utils/mobileOptimizations').then(({ injectCriticalCSS, preloadCriticalResources, getDeviceInfo }) => {
    injectCriticalCSS();
    const deviceInfo = getDeviceInfo();
    preloadCriticalResources(deviceInfo);
  });
}, 100);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)