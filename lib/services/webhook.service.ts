/**
 * Servicio para enviar datos al webhook de Google Sheets
 */

import type { WebhookPayload } from '../types';

interface WebhookResponse {
  ok: boolean;
  success: boolean;
  message?: string;
  error?: string;
  lead_id?: string;
}

interface WebhookConfig {
  url: string;
  token: string;
}

/**
 * Envía datos al webhook de Google Apps Script
 * 
 * Nota: Google Apps Script no recibe headers HTTP correctamente desde peticiones externas,
 * por eso enviamos el token como query parameter en la URL
 */
export async function sendToWebhook(
  payload: WebhookPayload,
  config: WebhookConfig
): Promise<WebhookResponse> {
  if (!config.url) {
    throw new Error('Webhook URL no configurada');
  }

  if (!config.token) {
    throw new Error('Webhook token no configurado');
  }

  // Construir URL con token como query parameter
  const webhookUrlWithAuth = `${config.url}?authorization=Bearer%20${encodeURIComponent(config.token)}`;

  try {
    const response = await fetch(webhookUrlWithAuth, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Webhook error: ${response.status} - ${responseText}`);
    }

    const responseJson: WebhookResponse = JSON.parse(responseText);

    if (!responseJson.success) {
      throw new Error(responseJson.error || 'Error desconocido del webhook');
    }

    return responseJson;
  } catch (error) {
    console.error('❌ Error enviando al webhook:', error);
    throw error;
  }
}

/**
 * Verifica si el webhook está configurado
 */
export function isWebhookConfigured(config: WebhookConfig): boolean {
  return Boolean(config.url && config.token);
}

