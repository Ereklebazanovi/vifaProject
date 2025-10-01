import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
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
