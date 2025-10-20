import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { RegisterFormSchema, type WebhookPayload } from '@/lib/types';
import {
  hashIp,
  getClientIp,
  validateRecaptcha,
  formatTimestamp,
} from '@/lib/utils';

// Configuración desde variables de entorno
const WEBHOOK_URL = process.env.APP_WEBHOOK_URL || '';
const WEBHOOK_TOKEN = process.env.APP_WEBHOOK_TOKEN || '';
const HASH_SALT = process.env.APP_HASH_SALT || 'default-salt-change-me';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    // Parsear el body
    const body = await request.json();

    // Validar datos con Zod
    const validationResult = RegisterFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Datos inválidos',
          details: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Validar reCAPTCHA si está configurado
    if (RECAPTCHA_SECRET && data.recaptcha_token) {
      const isValidRecaptcha = await validateRecaptcha(
        data.recaptcha_token,
        RECAPTCHA_SECRET
      );

      if (!isValidRecaptcha) {
        return NextResponse.json(
          {
            ok: false,
            error: 'Verificación de seguridad fallida',
          },
          { status: 400 }
        );
      }
    }

    // Generar lead_id único
    const leadId = uuidv4();

    // Obtener y hashear la IP del cliente
    const clientIp = getClientIp(request.headers);
    const ipHash = hashIp(clientIp, HASH_SALT);

    // Obtener headers adicionales
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    // Preparar payload para el webhook
    const webhookPayload: WebhookPayload = {
      lead_id: leadId,
      timestamp: formatTimestamp(),
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      whatsapp: data.whatsapp,
      prenda: 'Hoodie', // Prenda fija
      talla: data.talla,
      ciudad: data.ciudad,
      cantidad_estimada: data.cantidad_estimada,
      contacto: data.contacto,
      instagram_user: data.instagram_user,
      consent_marketing: data.consent_marketing,
      ip_hash: ipHash,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      user_agent: userAgent,
      referer: referer,
    };

    // Enviar al webhook de Google Sheets (Apps Script)
    if (WEBHOOK_URL) {
      try {
        const webhookResponse = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${WEBHOOK_TOKEN}`,
          },
          body: JSON.stringify(webhookPayload),
        });

        if (!webhookResponse.ok) {
          console.error('Webhook error:', await webhookResponse.text());
          throw new Error('Error al guardar los datos');
        }
      } catch (webhookError) {
        console.error('Error sending to webhook:', webhookError);
        // No bloqueamos la respuesta al usuario si el webhook falla
        // pero lo registramos para debugging
      }
    } else {
      console.warn('WEBHOOK_URL not configured');
    }

    // Respuesta exitosa
    return NextResponse.json(
      {
        ok: true,
        lead_id: leadId,
        message: 'Registro exitoso',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in register API:', error);

    return NextResponse.json(
      {
        ok: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}

// Método OPTIONS para CORS (si es necesario)
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
