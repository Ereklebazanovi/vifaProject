import { useEffect, useCallback, useMemo } from 'react';
import { debounce, throttle } from '../utils/performance';

// Hook for performance optimization utilities
export const usePerformanceOptimization = () => {
  // Memoized debounce function
  const debouncedCallback = useCallback(
    (callback: (...args: any[]) => void, delay: number) =>
      debounce(callback, delay),
    []
  );

  // Memoized throttle function
  const throttledCallback = useCallback(
    (callback: (...args: any[]) => void, delay: number) =>
      throttle(callback, delay),
    []
  );

  // Performance observer for long tasks
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    }
  }, []);

  // Memory cleanup utility
  const cleanup = useCallback(() => {
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc) {
      window.gc();
    }

    // Clear any unnecessary cached data
    if ('caches' in window) {
      caches.keys().then(cacheNames => {
        // Keep only current cache
        const currentCache = 'vifa-v1';
        cacheNames.forEach(cacheName => {
          if (cacheName !== currentCache) {
            caches.delete(cacheName);
          }
        });
      });
    }
  }, []);

  // Intersection Observer for lazy loading
  const createIntersectionObserver = useCallback(
    (callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {
      if ('IntersectionObserver' in window) {
        return new IntersectionObserver(callback, {
          threshold: 0.1,
          rootMargin: '50px',
          ...options
        });
      }
      return null;
    },
    []
  );

  return useMemo(() => ({
    debouncedCallback,
    throttledCallback,
    cleanup,
    createIntersectionObserver
  }), [debouncedCallback, throttledCallback, cleanup, createIntersectionObserver]);
};

// Hook for component render performance tracking
export const useRenderTracking = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 16) { // More than one frame at 60fps
        console.warn(`${componentName} took ${renderTime.toFixed(2)}ms to render`);
      }
    };
  });
};