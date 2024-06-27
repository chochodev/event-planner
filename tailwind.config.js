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
          dark: '#323d76',
          hover: '#4963c7',
          light: '#5d7dd4',
        },
        tertiary: {
          DEFAULT: '#FF3131',
        },
        black: {
          DEFAULT: '#000000',
          dim: '#23262F',
          light: '#777E90',
          fade: '#B1B5C3'
        },
        ...defaultTheme.colors 
      },
    }
  },
  plugins: [],
}