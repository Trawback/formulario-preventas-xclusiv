/**
 * Script para probar el webhook de Google Apps Script directamente
 * 
 * USO:
 * 1. Edita este archivo y pega tu WEBHOOK_URL y WEBHOOK_TOKEN
 * 2. Ejecuta: node scripts/test-webhook.js
 */

// ⚠️ CONFIGURA ESTAS VARIABLES CON TUS DATOS REALES:
const WEBHOOK_URL = process.env.APP_WEBHOOK_URL || 'https://script.google.com/macros/s/AKfycbyhPGxcCN5Lcwgtn0UbxVqMybuI9EifOKD2nGpoJfIigMef6__f5EnEvjHhFFwqnBr5/exec';
const WEBHOOK_TOKEN = process.env.APP_WEBHOOK_TOKEN || 'ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=';

if (!WEBHOOK_URL) {
  console.error('❌ ERROR: APP_WEBHOOK_URL no está configurada en .env.local');
  process.exit(1);
}

if (!WEBHOOK_TOKEN) {
  console.error('❌ ERROR: APP_WEBHOOK_TOKEN no está configurada en .env.local');
  process.exit(1);
}

console.log('🔧 Configuración:');
console.log('   WEBHOOK_URL:', WEBHOOK_URL);
console.log('   WEBHOOK_TOKEN:', WEBHOOK_TOKEN.substring(0, 10) + '...');
console.log('');

const testData = {
  lead_id: 'test-' + Date.now(),
  timestamp: new Date().toISOString(),
  nombre: 'TEST',
  apellido: 'DEBUGGING',
  email: 'test@debugging.com',
  whatsapp: '+52 55 1234 5678',
  prenda: 'Hoodie XSV1',
  talla: 'M',
  ciudad: 'Ciudad de México',
  cantidad_estimada: 1,
  contacto: 'WhatsApp',
  instagram_user: '',
  consent_marketing: true,
  ip_hash: 'test-hash-' + Date.now(),
  utm_source: 'test',
  utm_medium: 'debug',
  utm_campaign: 'webhook-test',
  utm_content: '',
  user_agent: 'Test Script',
  referer: 'http://localhost:3000'
};

console.log('📤 Enviando datos de prueba...');
console.log('   Lead ID:', testData.lead_id);
console.log('');

async function testWebhook() {
  try {
    console.log('⏳ Haciendo petición al webhook...');
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${WEBHOOK_TOKEN}`
      },
      body: JSON.stringify(testData)
    });

    console.log('📊 Respuesta del servidor:');
    console.log('   Status:', response.status, response.statusText);
    console.log('');

    const responseText = await response.text();
    
    try {
      const responseJson = JSON.parse(responseText);
      console.log('✅ Respuesta JSON:');
      console.log(JSON.stringify(responseJson, null, 2));
      
      if (responseJson.success) {
        console.log('');
        console.log('🎉 ¡ÉXITO! Los datos se guardaron correctamente');
        console.log('   Verifica tu Google Sheet');
      } else {
        console.log('');
        console.log('❌ ERROR: El webhook respondió pero falló');
        console.log('   Mensaje:', responseJson.error || responseJson.message);
      }
    } catch (e) {
      console.log('⚠️  Respuesta no es JSON válido:');
      console.log(responseText);
    }

  } catch (error) {
    console.error('');
    console.error('❌ ERROR al conectar con el webhook:');
    console.error('   ', error.message);
    console.error('');
    console.error('Posibles causas:');
    console.error('   1. La URL del webhook es incorrecta');
    console.error('   2. El webhook no está desplegado');
    console.error('   3. Hay un problema de red');
  }
}

testWebhook();

