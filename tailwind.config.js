/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: {
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
          },
          black: {
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          }
        }
      },
    },
  },
  plugins: [],
}