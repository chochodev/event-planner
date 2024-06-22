/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,svelte}"],
  theme: {
    screens: {
      'sm': '480px',
      'xmd': '640px',
      'md': '768px',
      'xlg': '960px',
      'lg': '1024px',
      'xl': '1440px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#3F51B5',
        },
        tertiary: {
          DEFAULT: '#FFC107',
        },
        ...defaultTheme.colors 
      },
    }
  },
  plugins: [],
}