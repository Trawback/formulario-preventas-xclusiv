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
            50: '#fdf4f7',
            100: '#fce7ef',
            200: '#fac9dc',
            300: '#f7a3c1',
            400: '#f4719f',
            500: '#ee4679',
            600: '#dc2761',
            700: '#be1a4f',
            800: '#9e1843',
            900: '#85183b',
          },
          light: '#FFFFFF',
          dark: '#231123',
        },
        primary: {
          50: '#fdf4f7',
          100: '#fce7ef',
          200: '#fac9dc',
          300: '#f7a3c1',
          400: '#f4719f',
          500: '#ee4679',
          600: '#dc2761',
          700: '#be1a4f',
          800: '#9e1843',
          900: '#85183b',
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

