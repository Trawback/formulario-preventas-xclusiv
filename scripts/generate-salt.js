#!/usr/bin/env node

/**
 * Script para generar un salt aleatorio seguro
 * 
 * Uso:
 *   node scripts/generate-salt.js
 *   npm run generate-salt
 */

const crypto = require('crypto');

// Colores para la terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
};

console.log(`\n${colors.bright}${colors.cyan}🔐 Generador de Salt de Seguridad${colors.reset}\n`);

// Generar salt aleatorio de 32 bytes
const salt = crypto.randomBytes(32).toString('hex');

console.log(`${colors.green}✅ Salt generado exitosamente:${colors.reset}\n`);
console.log(`${colors.bright}${salt}${colors.reset}\n`);

console.log(`${colors.yellow}📋 Instrucciones:${colors.reset}`);
console.log(`1. Copia el salt de arriba`);
console.log(`2. Abre tu archivo .env.local`);
console.log(`3. Pégalo en la variable APP_HASH_SALT`);
console.log(`\n   Ejemplo:`);
console.log(`   APP_HASH_SALT=${salt}\n`);

console.log(`${colors.cyan}🔒 Importante:${colors.reset}`);
console.log(`- Este salt es único y debe ser secreto`);
console.log(`- NO lo compartas ni lo subas a GitHub`);
console.log(`- Úsalo solo en .env.local (ya está en .gitignore)\n`);

