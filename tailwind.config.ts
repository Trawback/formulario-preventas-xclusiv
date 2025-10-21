import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#231123',
        brand: {
          pink: {
            50: '#fef2f5',
            100: '#fde6eb',
            200: '#fbc9d5',
            300: '#f89cb3',
            400: '#f36689',
            500: '#C30F45',
            600: '#a90c3a',
            700: '#8e0a31',
            800: '#740829',
            900: '#5f0723',
          },
          light: '#FFFFFF',
          dark: '#231123',
        },
        primary: {
          50: '#fef2f5',
          100: '#fde6eb',
          200: '#fbc9d5',
          300: '#f89cb3',
          400: '#f36689',
          500: '#C30F45',
          600: '#a90c3a',
          700: '#8e0a31',
          800: '#740829',
          900: '#5f0723',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
        satoshi: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

