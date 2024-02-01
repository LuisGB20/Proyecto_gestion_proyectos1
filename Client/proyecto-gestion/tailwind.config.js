/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'strong': '0 6px 40px rgba(0, 0, 0, 0.8)',
      },
      linearGradientColors: {
        'blue-gradient': ['#1E4C6A', '#1B7FC5'],
      },

    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}

