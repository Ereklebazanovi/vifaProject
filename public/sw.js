// Service Worker for VIFA Digital
// Version 1.0

const CACHE_NAME = 'vifa-digital-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/vifa.jpg',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Install Event');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activate Event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Fetch Event - Cache First Strategy for static assets, Network First for API calls
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetch Event', event.request.url);

  if (event.request.url.includes('/api/')) {
    // Network First for API calls
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response
          const responseClone = response.clone();

          // Store in cache
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseClone);
            });

          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request);
        })
    );
  } else {
    // Cache First for static assets
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached version or fetch from network
          return response || fetch(event.request)
            .then((fetchResponse) => {
              // Check if valid response
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }

              // Clone the response
              const responseToCache = fetchResponse.clone();

              // Store in cache
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return fetchResponse;
            });
        })
        .catch(() => {
          // Fallback for offline navigation
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        })
    );
  }
});

// Background Sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form') {
    console.log('Service Worker: Background sync for contact form');
    // Handle offline form submissions here
    event.waitUntil(
      // Process queued form submissions
      processQueuedFormSubmissions()
    );
  }
});

// Helper function to process queued form submissions
async function processQueuedFormSubmissions() {
  console.log('Processing queued form submissions...');
}