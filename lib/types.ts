/**
 * Tipos y schemas de validación para la aplicación
 */

import { z } from 'zod';

// ============================================
// SCHEMAS DE VALIDACIÓN
// ============================================

/**
 * Schema para cada prenda seleccionada
 */
export const PrendaSeleccionadaSchema = z.object({
  prenda_id: z.string().min(1, 'ID de prenda requerido'),
  prenda_nombre: z.string().min(1, 'Nombre de prenda requerido'),
  tallas: z.array(z.string().min(1, 'Selecciona una talla')).min(1, 'Selecciona al menos una talla'),
  cantidad: z.number().min(1, 'Mínimo 1').max(3, 'Máximo 3 por prenda'),
});

/**
 * Schema de validación para el formulario de registro
 */
export const RegisterFormSchema = z.object({
  nombre: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .regex(/^[A-Z\s]+$/, 'Solo letras mayúsculas sin acentos ni caracteres especiales'),
  apellido: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .regex(/^[A-Z\s]+$/, 'Solo letras mayúsculas sin acentos ni caracteres especiales'),
  email: z.string().email('Email inválido').min(1, 'El email es obligatorio'),
  whatsapp: z.string().min(1, 'El WhatsApp es obligatorio'),
  prendas_seleccionadas: z.array(PrendaSeleccionadaSchema).min(1, 'Selecciona al menos una prenda').max(3, 'Máximo 3 prendas'),
  ciudad: z.string().optional(),
  dia_competencia: z.enum(['7_noviembre', '8_noviembre', '9_noviembre', 'no_compito'], {
    required_error: 'Selecciona una opción',
  }),
  metodo_entrega: z.enum(['envio_nacional', 'entrega_presencial', 'entrega_cdmx'], {
    required_error: 'Selecciona un método de entrega',
  }),
  contacto: z.enum(['WhatsApp', 'Instagram'], {
    required_error: 'Selecciona un método de contacto',
  }),
  instagram_user: z.string().optional(),
  consent_marketing: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar para continuar',
  }),
  recaptcha_token: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
});

export type PrendaSeleccionada = z.infer<typeof PrendaSeleccionadaSchema>;

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

// ============================================
// TIPOS DE API
// ============================================

/**
 * Respuesta de la API de registro
 */
export interface RegisterApiResponse {
  ok: boolean;
  lead_id?: string;
  error?: string;
  message?: string;
}

/**
 * Payload que se envía al webhook de Google Sheets
 */
export interface WebhookPayload {
  lead_id: string;
  timestamp: string;
  nombre: string;
  apellido: string;
  email: string;
  whatsapp: string;
  prendas_seleccionadas: PrendaSeleccionada[];
  ciudad?: string;
  dia_competencia: string;
  metodo_entrega: string;
  contacto: string;
  instagram_user?: string;
  consent_marketing: boolean;
  ip_hash: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  user_agent?: string;
  referer?: string;
}

// ============================================
// CONFIGURACIÓN DE PRODUCTOS
// ============================================

/**
 * Tallas disponibles
 */
export const TALLAS_DISPONIBLES = [
  { value: 'S', label: 'CH' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'G' },
  { value: 'XL', label: 'XG' },
];

/**
 * Prenda fija de la preventa
 */
export const PRENDA_PREVENTA = 'Hoodie';

/**
 * Opciones de método de contacto
 */
export const CONTACTO_OPTIONS = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Instagram', label: 'Instagram' },
];

/**
 * Opciones de día de competencia
 */
export const DIA_COMPETENCIA_OPTIONS = [
  { value: '7_noviembre', label: '7 de Noviembre' },
  { value: '8_noviembre', label: '8 de Noviembre' },
  { value: '9_noviembre', label: '9 de Noviembre' },
  { value: 'no_compito', label: 'No compito' },
];

/**
 * Opciones de método de entrega
 */
export const METODO_ENTREGA_OPTIONS = [
  { 
    value: 'envio_nacional', 
    label: 'Envío Nacional',
    descripcion: 'El envío nacional comienza a partir del 9 de noviembre'
  },
  { 
    value: 'entrega_presencial', 
    label: 'Entrega Presencial',
    descripcion: 'Solo disponible los días viernes y sábado en el evento'
  },
  { 
    value: 'entrega_cdmx', 
    label: 'Entrega CDMX',
    descripcion: 'Envíos por paqueterías como Uber dentro de los días del evento'
  },
];

