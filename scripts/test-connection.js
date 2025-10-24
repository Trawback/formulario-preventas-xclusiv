#!/usr/bin/env node

/**
 * Script para diagnosticar problemas de conexión con Google Sheets
 * 
 * Uso: node scripts/test-connection.js
 */

require('dotenv').config({ path: '.env.local' });

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, 'cyan');
  console.log('='.repeat(60));
}

async function testConnection() {
  logSection('🔍 DIAGNÓSTICO DE CONEXIÓN A GOOGLE SHEETS');

  // 1. Verificar variables de entorno
  logSection('1️⃣ Verificando Variables de Entorno');

  const webhookUrl = process.env.APP_WEBHOOK_URL;
  const webhookToken = process.env.APP_WEBHOOK_TOKEN;
  const hashSalt = process.env.APP_HASH_SALT;

  if (!webhookUrl) {
    log('❌ APP_WEBHOOK_URL no está configurada', 'red');
    log('   → Agrega la URL de tu Google Apps Script en .env.local', 'yellow');
  } else {
    log('✅ APP_WEBHOOK_URL configurada', 'green');
    log(`   URL: ${webhookUrl.substring(0, 50)}...`, 'blue');
  }

  if (!webhookToken) {
    log('❌ APP_WEBHOOK_TOKEN no está configurado', 'red');
    log('   → Genera un token con: node scripts/generate-salt.js', 'yellow');
  } else {
    log('✅ APP_WEBHOOK_TOKEN configurado', 'green');
    log(`   Token: ${webhookToken.substring(0, 10)}...`, 'blue');
  }

  if (!hashSalt) {
    log('❌ APP_HASH_SALT no está configurado', 'red');
    log('   → Genera un salt con: node scripts/generate-salt.js', 'yellow');
  } else {
    log('✅ APP_HASH_SALT configurado', 'green');
  }

  if (!webhookUrl || !webhookToken) {
    log('\n❌ Configuración incompleta. No se puede continuar con el test.', 'red');
    log('\n📝 PASOS PARA SOLUCIONAR:', 'yellow');
    log('1. Copia .env.example a .env.local', 'yellow');
    log('2. Ejecuta: node scripts/generate-salt.js', 'yellow');
    log('3. Copia los valores generados a .env.local', 'yellow');
    log('4. Despliega tu GOOGLE_APPS_SCRIPT.js en Google Apps Script', 'yellow');
    log('5. Copia la URL del deployment en APP_WEBHOOK_URL', 'yellow');
    return;
  }

  // 2. Test de conectividad
  logSection('2️⃣ Testeando Conexión al Webhook');

  const testPayload = {
    lead_id: `test-${Date.now()}`,
    timestamp: new Date().toISOString(),
    nombre: 'TEST',
    apellido: 'USUARIO',
    email: 'test@example.com',
    whatsapp: '+52 55 1234 5678',
    ciudad: 'Ciudad de México',
    dia_competencia: '7_noviembre',
    prendas_seleccionadas: [
      {
        prenda_id: 'Hoodie XSV1',
        prenda_nombre: 'Hoodie "XSV1"',
        tallas: ['M'],
        cantidad: 1,
      },
    ],
    metodo_entrega: 'envio_nacional',
    contacto: 'WhatsApp',
    instagram_user: '',
    consent_marketing: true,
    ip_hash: 'test-hash-123',
    utm_source: 'test',
    utm_medium: 'script',
    utm_campaign: 'diagnostic',
    user_agent: 'Test Script',
    referer: 'http://localhost:3000',
    _auth_token: webhookToken,
  };

  try {
    log('📤 Enviando petición de prueba...', 'blue');
    log(`   URL: ${webhookUrl}`, 'blue');

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    logSection('3️⃣ Respuesta del Servidor');

    log(`Status: ${response.status} ${response.statusText}`, response.ok ? 'green' : 'red');

    const contentType = response.headers.get('content-type');
    log(`Content-Type: ${contentType}`, 'blue');

    const responseText = await response.text();
    
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      log('\n📥 Respuesta JSON:', 'cyan');
      console.log(JSON.stringify(responseData, null, 2));
    } catch (e) {
      log('\n📥 Respuesta (no JSON):', 'cyan');
      console.log(responseText.substring(0, 500));
    }

    if (response.ok && (responseData?.ok || responseData?.success)) {
      log('\n✅ ¡CONEXIÓN EXITOSA!', 'green');
      log('   Los datos deberían aparecer en tu Google Sheet', 'green');
      log('   Busca el lead_id: ' + testPayload.lead_id, 'cyan');
    } else {
      log('\n❌ Error en la respuesta', 'red');
      
      if (responseData?.error === 'unauthorized') {
        log('\n💡 PROBLEMA: Token no autorizado', 'yellow');
        log('   → Verifica que APP_WEBHOOK_TOKEN en .env.local sea IGUAL a', 'yellow');
        log('     AUTHORIZED_TOKEN en tu GOOGLE_APPS_SCRIPT.js (línea 8)', 'yellow');
        log(`   → Token actual: ${webhookToken.substring(0, 20)}...`, 'blue');
      } else if (responseData?.error?.includes('Hoja')) {
        log('\n💡 PROBLEMA: Hoja no encontrada', 'yellow');
        log('   → Ejecuta la función setupSheet() en Google Apps Script', 'yellow');
      } else {
        log('\n💡 Revisa los logs en Google Apps Script:', 'yellow');
        log('   1. Abre tu proyecto en script.google.com', 'yellow');
        log('   2. Ve a "Ejecuciones" en el menú lateral', 'yellow');
        log('   3. Revisa los errores en la última ejecución', 'yellow');
      }
    }
  } catch (error) {
    logSection('❌ ERROR DE CONEXIÓN');
    log(error.message, 'red');
    
    if (error.message.includes('fetch')) {
      log('\n💡 PROBLEMA: No se pudo conectar al servidor', 'yellow');
      log('   → Verifica que la URL del webhook sea correcta', 'yellow');
      log('   → Verifica que tu proyecto de Apps Script esté desplegado', 'yellow');
    }
  }

  logSection('📚 RECURSOS ÚTILES');
  log('Documentación: docs/SETUP_APPS_SCRIPT.md', 'blue');
  log('Inicio rápido: docs/QUICKSTART.md', 'blue');
  log('Deployment: docs/DEPLOYMENT.md', 'blue');
}

// Ejecutar el test
testConnection().catch(console.error);

