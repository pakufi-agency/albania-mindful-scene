/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-blue': '#6A5ACD',
        'powder-blue': '#B0E0E6',
        'gold': '#FFD700',
        'sea-shell': '#FFF5EE',
        'indigo': '#4B0082',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
