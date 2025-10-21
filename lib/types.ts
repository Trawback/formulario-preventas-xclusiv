import { z } from 'zod';

// Schema de validación para el formulario de registro
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
  prenda: z.string().min(1, 'Selecciona una prenda'),
  talla: z.string().min(1, 'Selecciona una talla'),
  ciudad: z.string().optional(),
  cantidad_estimada: z.number().min(1, 'Mínimo 1').max(5, 'Máximo 5'),
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

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

// Tipo para la respuesta de la API
export interface RegisterApiResponse {
  ok: boolean;
  lead_id?: string;
  error?: string;
  message?: string;
}

// Tipo para los datos que se envían al webhook
export interface WebhookPayload {
  lead_id: string;
  timestamp: string;
  nombre: string;
  apellido: string;
  email: string;
  whatsapp: string;
  prenda: string;
  talla: string;
  ciudad?: string;
  cantidad_estimada: number;
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

// Configuración de tallas
export const TALLAS_DISPONIBLES = [
  { value: 'S', label: 'CH' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'G' },
  { value: 'XL', label: 'XG' },
];

// Prenda fija de la preventa
export const PRENDA_PREVENTA = 'Hoodie';

// Opciones de contacto
export const CONTACTO_OPTIONS = [
  { value: 'WhatsApp', label: 'WhatsApp' },
  { value: 'Instagram', label: 'Instagram' },
];

