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
          DEFAULT: '#893D07'
        },
        secondary: '#F2B49B',
        tertiary: '#A65E30',
        ...defaultTheme.colors 
      },
    }
  },
  plugins: [],
}