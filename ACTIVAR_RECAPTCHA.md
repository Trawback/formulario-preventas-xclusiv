# 🔐 ACTIVAR reCAPTCHA - Instrucciones Rápidas

## ✅ Estado: Implementación Completa

reCAPTCHA v3 ya está completamente implementado en tu proyecto.  
Solo necesitas **configurar las keys** para activarlo.

---

## 🚀 ACTIVACIÓN EN 3 PASOS (5 minutos)

### 1️⃣ Obtén tus Keys de Google

**Ve a:** https://www.google.com/recaptcha/admin/create

**Configura:**
- **Etiqueta:** Xclusiv Preventa
- **Tipo:** reCAPTCHA v3 ✓
- **Dominios:** 
  - `localhost`
  - `preventa.xclusiv.com` (tu dominio real)
  - `*.vercel.app` (si usas Vercel)

**Click en:** Enviar

**Guarda estas keys:**
- 🔑 **Site Key** (empieza con 6Lc...)
- 🔐 **Secret Key** (empieza con 6Lc...)

---

### 2️⃣ Crea el archivo .env.local

En la **raíz de tu proyecto**, crea un archivo llamado **`.env.local`**

Copia y pega esto (reemplaza con tus keys reales):

```bash
# ====================================
# GOOGLE RECAPTCHA v3
# ====================================
NEXT_PUBLIC_RECAPTCHA_KEY=6Lc_PEGA_TU_SITE_KEY_AQUI
RECAPTCHA_SECRET=6Lc_PEGA_TU_SECRET_KEY_AQUI

# ====================================
# SEGURIDAD
# ====================================
# Genera con: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
APP_HASH_SALT=pega_aqui_el_resultado_del_comando

# ====================================
# WEBHOOK (Ya configurado)
# ====================================
APP_WEBHOOK_URL=tu_webhook_url_si_la_tienes
APP_WEBHOOK_TOKEN=tu_token_si_lo_tienes

# ====================================
# APLICACIÓN
# ====================================
NEXT_PUBLIC_APP_URL=https://preventa.xclusiv.com
```

---

### 3️⃣ Genera el Salt y Reinicia

En tu terminal, ejecuta:

```bash
# Genera el salt de seguridad
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copia el resultado** y pégalo en `APP_HASH_SALT` en tu `.env.local`

Luego reinicia el servidor:

```bash
# Detén el servidor (Ctrl + C)
npm run dev
```

---

## ✅ VERIFICACIÓN

Abre: **http://localhost:3000**

### 🔍 Deberías ver:

1. **Badge de reCAPTCHA** en la esquina inferior derecha:  
   `"This site is protected by reCAPTCHA"`

2. **En DevTools (F12 → Console):**  
   No debería haber errores de reCAPTCHA

3. **En DevTools (F12 → Network):**  
   Al enviar el formulario, debería haber una llamada a:
   - `recaptcha/api.js`
   - `/api/register` con `recaptcha_token`

4. **En la terminal del servidor:**  
   ```
   🔄 Enviando datos al webhook...
   ✅ Datos guardados exitosamente
   ```

---

## 🧪 PRUEBA EL FORMULARIO

1. Completa el formulario con datos de prueba
2. Haz clic en "Reservar Mi Hoodie Ahora"
3. Deberías ser redirigido a `/gracias`

**Si todo funciona:** ✅ ¡reCAPTCHA está activo!

---

## 📊 MONITOREO

Ve a: **https://www.google.com/recaptcha/admin**

Ahí verás:
- 📈 Total de solicitudes
- 🎯 Score promedio (0.0 = bot, 1.0 = humano)
- 📊 Gráficas de uso

---

## 🐛 PROBLEMAS COMUNES

### ❌ "reCAPTCHA validation failed"
- Verifica que las keys estén correctas
- Asegúrate de haber copiado completas (empiezan con `6Lc`)
- Reinicia el servidor

### ❌ No veo el badge de reCAPTCHA
- Verifica que `NEXT_PUBLIC_RECAPTCHA_KEY` tenga un valor
- Abre la consola del navegador (F12) y busca errores
- Limpia la caché del navegador (Ctrl + Shift + R)

### ❌ "Hostname validation failed"
- Ve a Google reCAPTCHA Admin
- Agrega tu dominio a la lista de dominios autorizados
- Incluye `localhost` para desarrollo

---

## 📚 MÁS INFORMACIÓN

### Documentación Completa:

- 📖 **[Quick Start](docs/RECAPTCHA_QUICKSTART.md)** - Guía de 5 minutos
- 📚 **[Setup Completo](docs/RECAPTCHA_SETUP.md)** - Guía detallada con troubleshooting
- 🧪 **[Script de Test](scripts/test-recaptcha.js)** - Ejecuta: `node scripts/test-recaptcha.js`
- 📘 **[README Principal](README.md)** - Documentación del proyecto

### Documentación Oficial de Google:

- 🔗 https://developers.google.com/recaptcha/docs/v3

---

## 🔒 SEGURIDAD

### ✅ HACER:
- ✅ Mantener `.env.local` en `.gitignore` (ya está)
- ✅ Usar HTTPS en producción
- ✅ Rotar las keys cada 3-6 meses
- ✅ Monitorear el score promedio

### ❌ NO HACER:
- ❌ Subir `.env.local` a GitHub
- ❌ Compartir tus Secret Keys
- ❌ Usar las mismas keys en múltiples dominios

---

## 🚀 DEPLOYMENT EN VERCEL

Cuando despliegues a producción:

1. Ve a tu proyecto en Vercel
2. **Settings → Environment Variables**
3. Agrega cada variable:
   - `NEXT_PUBLIC_RECAPTCHA_KEY`
   - `RECAPTCHA_SECRET`
   - `APP_HASH_SALT`
4. Redeploy

---

## ❓ ¿NECESITAS AYUDA?

- 📖 Lee: [docs/RECAPTCHA_SETUP.md](docs/RECAPTCHA_SETUP.md)
- 🧪 Ejecuta: `node scripts/test-recaptcha.js`
- 🔍 Revisa: Consola del navegador y terminal

---

**¡Listo para activar!** 🛡️

_reCAPTCHA v3 es invisible para usuarios reales y bloquea ~95% de bots._

