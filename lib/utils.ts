import { createHmac } from 'crypto';

/**
 * Genera un hash seguro de una IP usando HMAC-SHA256
 */
export function hashIp(ip: string, salt: string): string {
  return createHmac('sha256', salt).update(ip).digest('hex');
}

/**
 * Obtiene la IP real del cliente considerando proxies y headers de Vercel
 */
export function getClientIp(headers: Headers): string {
  const xForwardedFor = headers.get('x-forwarded-for');
  const xRealIp = headers.get('x-real-ip');
  const cfConnectingIp = headers.get('cf-connecting-ip');

  if (cfConnectingIp) return cfConnectingIp;
  if (xRealIp) return xRealIp;
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',');
    return ips[0].trim();
  }

  return 'unknown';
}

/**
 * Valida el token de reCAPTCHA v3
 */
export async function validateRecaptcha(
  token: string,
  secret: string
): Promise<boolean> {
  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret,
          response: token,
        }),
      }
    );

    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Error validating reCAPTCHA:', error);
    return false;
  }
}

/**
 * Extrae parámetros UTM de una URL
 */
export function extractUtmParams(url: string): {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
} {
  try {
    const urlObj = new URL(url);
    return {
      utm_source: urlObj.searchParams.get('utm_source') || undefined,
      utm_medium: urlObj.searchParams.get('utm_medium') || undefined,
      utm_campaign: urlObj.searchParams.get('utm_campaign') || undefined,
      utm_content: urlObj.searchParams.get('utm_content') || undefined,
    };
  } catch {
    return {};
  }
}

/**
 * Formatea una fecha en formato ISO 8601
 */
export function formatTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Limpia y formatea un número de WhatsApp
 */
export function sanitizeWhatsApp(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Construye una URL de compartir en WhatsApp
 */
export function buildWhatsAppShareUrl(text: string): string {
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/?text=${encodedText}`;
}

/**
 * Combina clases de CSS (útil con Tailwind)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

