/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-2xl': { 'max': '1535px' },// Custom max-width breakpoint for 2x extra-large screens
        'max-xl': { 'max': '1279px' }, // Custom max-width breakpoint for extra-large screens
        'max-lg': { 'max': '1023px' }, // Custom max-width breakpoint for large screens
        'max-md': { 'max': '767px' },  // Custom max-width breakpoint for medium screens
        'max-sm': { 'max': '639px' },  // Custom max-width breakpoint for small screens
      },
      colors: {
        gold: {
          DEFAULT: "#FFD700",
          dark: "#B8860B",
        },
        black: {
          DEFAULT: "#000000",
          light: "#222222",
        },
        gray: {
          200: "#E5E7EB",
          400: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
}
