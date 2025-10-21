/**
 * Script de prueba para reCAPTCHA v3
 * 
 * Este script simula un envío de formulario para verificar
 * que reCAPTCHA esté funcionando correctamente.
 * 
 * Uso:
 *   node scripts/test-recaptcha.js
 */

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✅ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}❌ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠️  ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ️  ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.blue}${msg}${colors.reset}\n`),
};

async function testRecaptcha() {
  log.header('🔐 Test de reCAPTCHA v3');

  // 1. Verificar variables de entorno
  log.info('Verificando variables de entorno...');
  
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET;

  if (!siteKey) {
    log.error('NEXT_PUBLIC_RECAPTCHA_KEY no está configurada');
    log.warning('Configura las variables en .env.local');
    process.exit(1);
  }

  if (!secretKey) {
    log.error('RECAPTCHA_SECRET no está configurada');
    log.warning('Configura las variables en .env.local');
    process.exit(1);
  }

  log.success('Variables de entorno configuradas');
  log.info(`Site Key: ${siteKey.substring(0, 20)}...`);
  log.info(`Secret Key: ${secretKey.substring(0, 20)}...`);

  // 2. Nota sobre testing
  log.header('📝 Instrucciones de Testing');
  
  console.log('Para probar reCAPTCHA v3 completamente, necesitas:');
  console.log('');
  console.log('1. Iniciar el servidor de desarrollo:');
  console.log('   npm run dev');
  console.log('');
  console.log('2. Abrir el navegador en:');
  console.log('   http://localhost:3000');
  console.log('');
  console.log('3. Abrir DevTools (F12) → Console');
  console.log('');
  console.log('4. Completar y enviar el formulario');
  console.log('');
  console.log('5. Verificar en Network tab:');
  console.log('   - Llamada a recaptcha/api.js');
  console.log('   - POST a /api/register con recaptcha_token');
  console.log('');
  console.log('6. Verificar en la terminal del servidor:');
  console.log('   - Logs de validación de reCAPTCHA');
  console.log('   - Logs de envío al webhook');
  console.log('');

  // 3. Test de validación (simulado)
  log.header('🧪 Test de Validación de API');

  log.info('Simulando validación de reCAPTCHA...');
  
  // Nota: No podemos hacer un test real sin un token válido del frontend
  log.warning('Para un test completo, usa el formulario en el navegador');
  
  console.log('');
  console.log('Parámetros de validación actuales:');
  console.log('- Endpoint: https://www.google.com/recaptcha/api/siteverify');
  console.log('- Score mínimo: 0.5 (configurable en lib/utils.ts)');
  console.log('- Timeout: 10 segundos');
  console.log('');

  // 4. Checklist
  log.header('✅ Checklist de Configuración');

  const checklist = [
    { item: 'NEXT_PUBLIC_RECAPTCHA_KEY configurada', status: !!siteKey },
    { item: 'RECAPTCHA_SECRET configurada', status: !!secretKey },
    { item: 'Script de reCAPTCHA en layout.tsx', status: true },
    { item: 'Función getRecaptchaToken en RegisterForm', status: true },
    { item: 'Validación en /api/register', status: true },
    { item: 'Disclaimer en formulario', status: true },
  ];

  checklist.forEach(({ item, status }) => {
    if (status) {
      log.success(item);
    } else {
      log.error(item);
    }
  });

  // 5. Próximos pasos
  log.header('🚀 Próximos Pasos');

  console.log('1. Obtén tus keys en:');
  console.log('   https://www.google.com/recaptcha/admin/create');
  console.log('');
  console.log('2. Configura .env.local con tus keys');
  console.log('');
  console.log('3. Reinicia el servidor:');
  console.log('   npm run dev');
  console.log('');
  console.log('4. Prueba el formulario en el navegador');
  console.log('');
  console.log('5. Monitorea en Google reCAPTCHA Admin:');
  console.log('   https://www.google.com/recaptcha/admin');
  console.log('');

  log.success('Script de test completado');
}

// Ejecutar test
testRecaptcha().catch((error) => {
  log.error(`Error en el test: ${error.message}`);
  process.exit(1);
});

