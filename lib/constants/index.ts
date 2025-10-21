/**
 * Constantes de la aplicación
 * Centraliza todos los valores estáticos y configuraciones
 */

// ============================================
// CONTACTO Y PAISES
// ============================================

export const COUNTRY_CODES = [
  { code: '+52', country: 'México', flag: '🇲🇽' },
  { code: '+1', country: 'USA/Canadá', flag: '🇺🇸' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+34', country: 'España', flag: '🇪🇸' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+51', country: 'Perú', flag: '🇵🇪' },
  { code: '+593', country: 'Ecuador', flag: '🇪🇨' },
] as const;

export const DEFAULT_COUNTRY_CODE = '+52'; // México

// ============================================
// EMAIL
// ============================================

export const EMAIL_DOMAINS = [
  '@gmail.com',
  '@hotmail.com',
  '@outlook.com',
  '@yahoo.com',
] as const;

// ============================================
// ESTADOS DE MÉXICO
// ============================================

export const ESTADOS_MEXICO = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas',
] as const;

// ============================================
// PRENDAS DISPONIBLES
// ============================================

export const PRENDAS_DISPONIBLES = [
  {
    id: 'Hoodie XSV1',
    nombre: 'Hoodie "XSV1"',
    descripcion: 'Gramaje 350gr/m2, 100% algodón, técnica "Puff"',
    precio: '$899.00 mxn',
    imagen: '/Resources/Hoodie%20Boxy%20Frente%20mockup_Mesa%20de%20trabajo%201%20copia-10.png',
  },
  {
    id: 'Tank Top XSV2',
    nombre: 'Tank Top "XSV2"',
    descripcion: 'Gramaje 200gr/m2, sin mangas, corte regular',
    precio: '$549.00 mxn',
    imagen: '/Resources/Diseño sin título (3).png',
  },
  {
    id: 'Cropped Boxy "XSV3"',
    nombre: 'Cropped Boxy "XSV3"',
    descripcion: 'Gramaje 200gr/m2, sin mangas, corte boxy.',
    precio: '$579.00 mxn',
    imagen: '/Resources/Diseño sin título (3).png',
  },
] as const;

export const DEFAULT_PRENDA = 'Hoodie XSV1';

// ============================================
// FORMULARIO
// ============================================

export const CANTIDAD_MIN = 1;
export const CANTIDAD_MAX = 5;
export const CANTIDAD_DEFAULT = 1;

// ============================================
// ANIMACIONES
// ============================================

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

export const ANIMATION_DELAY = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.3,
} as const;

