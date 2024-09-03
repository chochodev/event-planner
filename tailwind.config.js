/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,svelte}"],
  theme: {
    screens: {
      'sm': '480px',
      'xmd': '640px',
      'md': '768px',
      'xlg': '900px',
      'lg': '1024px',
      'xxl': '1260px',
      'xl': '1440px'
    },
    extend: {
      fontFamily: {
        primary: ['var(--primary-font)', 'sans-serif'],
        secondary: ['var(--secondary-font)', 'sans-serif'],
        dance: ['var(--dancing-font)', 'cursive'],
      },
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
        success: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        message: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        ...defaultTheme.colors
      },
    }
  },
  plugins: [],
}
