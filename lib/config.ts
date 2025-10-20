// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'XCLUSIV',
  tagline: 'Preventa Exclusiva',
  description: 'Reserva tu lugar en la preventa de la nueva colección de XCLUSIV',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://preventa.xclusiv.com',
  email: 'hola@xclusiv.com',
  social: {
    instagram: 'https://instagram.com/xclusiv',
    tiktok: 'https://tiktok.com/@xclusiv',
  },
};

// Configuración de SEO
export const SEO_CONFIG = {
  title: 'XCLUSIV - Preventa Exclusiva Nueva Colección',
  description:
    'Sé de los primeros en conseguir las prendas más exclusivas. Regístrate ahora y asegura tu lugar en nuestra preventa.',
  keywords:
    'ropa exclusiva, streetwear, preventa, moda urbana, xclusiv, oversized',
  ogImage: '/og-image.jpg',
  twitterHandle: '@xclusiv',
};

// Configuración de Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Configuración de reCAPTCHA
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '';

