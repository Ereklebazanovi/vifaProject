import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bpg-nino-mtavruli/css/bpg-nino-mtavruli.min.css'
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