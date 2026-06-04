import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React — must come first
          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/')
          ) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/@remix-run')) {
            return 'router';
          }
          if (id.includes('node_modules/framer-motion')) {
            return 'framer';
          }
          if (id.includes('node_modules/firebase')) {
            return 'firebase';
          }
          // Rich-text editor (quill) + its exclusive deps — heavy; keep it OUT of the
          // shared vendor chunk so it only loads on the lazy hidden editor route.
          // (lodash-es/eventemitter3/parchment/quill-delta/fast-diff are quill-only here.)
          if (
            id.includes('node_modules/quill') ||
            id.includes('node_modules/react-quill-new') ||
            id.includes('node_modules/parchment') ||
            id.includes('node_modules/quill-delta') ||
            id.includes('node_modules/eventemitter3') ||
            id.includes('node_modules/lodash-es') ||
            id.includes('node_modules/lodash.clonedeep') ||
            id.includes('node_modules/fast-diff')
          ) {
            return 'editor';
          }
          // HTML sanitizer — used by the (lazy) blog post page only.
          if (id.includes('node_modules/dompurify')) {
            return 'sanitize';
          }
          // antd + all its rc-* sub-packages together
          if (
            id.includes('node_modules/antd') ||
            id.includes('node_modules/rc-') ||
            id.includes('node_modules/@rc-component') ||
            id.includes('node_modules/@ant-design')
          ) {
            return 'antd';
          }

          // Service pages chunking
          if (id.includes('offeredServices/')) {
            return 'services';
          }

          // Other vendors
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false, // Disable sourcemaps for smaller bundles
    emptyOutDir: false,
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['firebase/app', 'firebase/firestore']
  }
});
