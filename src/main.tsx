import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { injectCriticalCSS, preloadCriticalResources, getDeviceInfo } from './utils/mobileOptimizations'

// Initialize critical optimizations
injectCriticalCSS();
const deviceInfo = getDeviceInfo();
preloadCriticalResources(deviceInfo);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
