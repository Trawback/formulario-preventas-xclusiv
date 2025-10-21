/**
 * API Route: Register
 * Maneja el registro de usuarios en la preventa
 */

import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { RegisterFormSchema, type WebhookPayload } from '@/lib/types';
import {
  hashIp,
  getClientIp,
  validateRecaptcha,
  formatTimestamp,
} from '@/lib/utils';
import { sendToWebhook, isWebhookConfigured } from '@/lib/services';

// ============================================
// CONFIGURACIÓN
// ============================================

const WEBHOOK_CONFIG = {
  url: process.env.APP_WEBHOOK_URL || '',
  token: process.env.APP_WEBHOOK_TOKEN || '',
};

const HASH_SALT = process.env.APP_HASH_SALT || 'default-salt-change-me';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET || '';

// ============================================
// HANDLERS
// ============================================

/**
 * POST /api/register
 * Registra un nuevo lead en la preventa
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Parsear y validar datos
    const body = await request.json();
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

    // 2. Validar reCAPTCHA (si está configurado)
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

    // 3. Generar identificadores y metadata
    const leadId = uuidv4();
    const clientIp = getClientIp(request.headers);
    const ipHash = hashIp(clientIp, HASH_SALT);
    const userAgent = request.headers.get('user-agent') || '';
    const referer = request.headers.get('referer') || '';

    // 4. Preparar payload para el webhook
    const webhookPayload: WebhookPayload = {
      lead_id: leadId,
      timestamp: formatTimestamp(),
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      whatsapp: data.whatsapp,
      prenda: data.prenda,
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

    // 5. Enviar al webhook de Google Sheets
    if (isWebhookConfigured(WEBHOOK_CONFIG)) {
      try {
        console.log('🔄 Enviando datos al webhook...', {
          url: WEBHOOK_CONFIG.url,
          lead_id: webhookPayload.lead_id
        });

        const webhookResponse = await sendToWebhook(webhookPayload, WEBHOOK_CONFIG);
        
        console.log('✅ Datos guardados en Google Sheets exitosamente', {
          lead_id: webhookResponse.lead_id
        });
      } catch (webhookError) {
        console.error('❌ Error enviando al webhook:', webhookError);
        // No bloqueamos la respuesta al usuario si el webhook falla
        // pero lo registramos para debugging
      }
    } else {
      console.warn('⚠️  Webhook no configurado (URL o TOKEN faltante)');
    }

    // 6. Respuesta exitosa al cliente
    return NextResponse.json(
      {
        ok: true,
        lead_id: leadId,
        message: 'Registro exitoso',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error en API register:', error);

    return NextResponse.json(
      {
        ok: false,
        error: 'Error interno del servidor',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/register
 * Maneja preflight requests para CORS
 */
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
