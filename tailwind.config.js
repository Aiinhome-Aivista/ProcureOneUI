/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // Enable class-based dark mode for PrimeNG
  plugins: [
    require('tailwindcss-primeui')
  ],
};
