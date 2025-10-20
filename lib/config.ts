// Configuración de la aplicación
export const APP_CONFIG = {
  name: 'XCLUSIV',
  tagline: 'Únete a la Revolución',
  description: 'Reserva tu Hoodie exclusivo y sé parte de la revolución athleisure',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://preventa.xclusiv.com',
  email: 'hola@xclusiv.com',
  social: {
    instagram: 'https://instagram.com/xclusiv',
    tiktok: 'https://tiktok.com/@xclusiv',
  },
};

// Configuración de SEO
export const SEO_CONFIG = {
  title: 'XCLUSIV - Preventa Hoodie | Únete a la Revolución',
  description:
    'Reserva tu Hoodie XCLUSIV y sé parte de la revolución athleisure. Diseñado para atletas que buscan cambiar el mundo.',
  keywords:
    'xclusiv, hoodie, athleisure, ropa deportiva, streetwear, preventa, atletas',
  ogImage: '/og-image.jpg',
  twitterHandle: '@xclusiv',
};

// Configuración de Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';

// Configuración de reCAPTCHA
export const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '';

