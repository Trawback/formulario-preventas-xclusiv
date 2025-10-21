# 🧪 Guía de Testing - XCLUSIV Preventa

Esta guía te ayudará a configurar y probar que el formulario funciona correctamente y que los datos se envían a Google Sheets.

---

## 📋 Índice
1. [Configuración de Google Sheets](#1-configuración-de-google-sheets)
2. [Configuración de Variables de Entorno](#2-configuración-de-variables-de-entorno)
3. [Cómo Probar el Formulario](#3-cómo-probar-el-formulario)
4. [Verificar que los Datos Llegaron](#4-verificar-que-los-datos-llegaron)
5. [Solución de Problemas](#5-solución-de-problemas)

---

## 1. Configuración de Google Sheets

### Paso 1.1: Crear la Google Sheet

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "XCLUSIV - Registros Preventa" (o el nombre que prefieras)

### Paso 1.2: Configurar el Apps Script

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Borra el código de ejemplo que aparece
3. Copia y pega el código del archivo `GOOGLE_APPS_SCRIPT.js` de este proyecto
4. **IMPORTANTE**: Cambia esta línea (línea 32):
   ```javascript
   const AUTHORIZED_TOKEN = "CAMBIA_ESTE_TOKEN_POR_UNO_SEGURO";
   ```
   Por un token seguro. Puedes generar uno en tu terminal:
   ```bash
   # En Mac/Linux
   openssl rand -base64 32
   
   # O simplemente usa un string largo y aleatorio
   const AUTHORIZED_TOKEN = "mi-token-super-seguro-12345-abcde";
   ```

5. Guarda el proyecto (Ctrl+S o Cmd+S)
6. Cambia el nombre del proyecto a "XCLUSIV Webhook"

### Paso 1.3: Ejecutar Setup Automático

1. En Apps Script, selecciona la función `setupSheet` del dropdown
2. Haz click en el botón **▶ Ejecutar**
3. La primera vez te pedirá permisos:
   - Click en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Click en "Avanzado"
   - Click en "Ir a [nombre del proyecto] (no seguro)"
   - Click en "Permitir"
4. Verifica en los logs que dice "Setup completado"
5. Revisa tu Google Sheet - debería tener:
   - Una hoja llamada "Registros"
   - Encabezados formateados en morado
   - Una fila de ejemplo

### Paso 1.4: Desplegar como Web App

1. En Apps Script, click en **Implementar > Nueva implementación**
2. Click en el ícono de engranaje ⚙️ junto a "Seleccionar tipo"
3. Selecciona **Aplicación web**
4. Configura:
   - **Descripción**: "XCLUSIV Webhook v1"
   - **Ejecutar como**: Yo
   - **Quién tiene acceso**: Cualquier persona
5. Click en **Implementar**
6. **¡MUY IMPORTANTE!** Copia la URL que aparece. Se verá así:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXX/exec
   ```
   **Guarda esta URL, la necesitarás en el siguiente paso.**

---

## 2. Configuración de Variables de Entorno

### Paso 2.1: Crear archivo .env.local

1. En la raíz de tu proyecto, crea un archivo llamado `.env.local`
2. Copia y pega esto (reemplaza los valores):

```bash
# ===================================
# GOOGLE APPS SCRIPT WEBHOOK
# ===================================
# URL del webhook (la que copiaste en el paso anterior)
APP_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec

# Token de seguridad (el mismo que pusiste en GOOGLE_APPS_SCRIPT.js)
APP_WEBHOOK_TOKEN=mi-token-super-seguro-12345-abcde

# Salt para hashear IPs (genera uno diferente)
APP_HASH_SALT=otro-token-diferente-para-salt-xyz789

# ===================================
# GOOGLE RECAPTCHA V3 (OPCIONAL)
# ===================================
# Si no tienes reCAPTCHA configurado, deja estas líneas comentadas o vacías
# NEXT_PUBLIC_RECAPTCHA_KEY=
# RECAPTCHA_SECRET=

# ===================================
# APLICACIÓN
# ===================================
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Paso 2.2: Reiniciar el servidor

```bash
# Si el servidor está corriendo, detenlo (Ctrl+C) y reinicia:
npm run dev
# o
yarn dev
```

---

## 3. Cómo Probar el Formulario

### Opción A: Modo Desarrollo (Recomendado)

1. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

2. **Abre tu navegador** en `http://localhost:3000`

3. **Llena el formulario** con datos de prueba:
   - Nombre: TEST
   - Apellido: PRUEBA
   - Email: test@prueba.com
   - WhatsApp: 55 1234 5678
   - Estado: Ciudad de México
   - Prenda: Hoodie "XSV1"
   - Talla: M
   - Cantidad: 1
   - Método de contacto: WhatsApp
   - ✅ Acepta el consentimiento

4. **Haz click en "¡Reservar Mi Hoodie Ahora!"**

5. **Espera la confirmación**:
   - Si funciona: Te redirigirá a `/gracias?lead_id=xxx`
   - Si falla: Verás un mensaje de error en el formulario

### Opción B: Modo Producción

1. **Construye el proyecto**:
   ```bash
   npm run build
   npm run start
   ```

2. Sigue los mismos pasos que en Modo Desarrollo

---

## 4. Verificar que los Datos Llegaron

### Paso 4.1: Revisar Google Sheets

1. Ve a tu Google Sheet
2. Actualiza la página (F5)
3. Deberías ver una nueva fila con los datos que enviaste:
   - lead_id
   - timestamp
   - nombre: TEST
   - apellido: PRUEBA
   - email: test@prueba.com
   - etc.

### Paso 4.2: Revisar Logs de Apps Script

1. En Apps Script, ve a **Ejecuciones** (en el menú lateral)
2. Deberías ver la ejecución más reciente de `doPost`
3. Click en la ejecución para ver los logs:
   - "Petición recibida"
   - "Datos recibidos: {...}"
   - "Fila agregada exitosamente"

### Paso 4.3: Revisar Console del Navegador

1. En el navegador, abre las DevTools (F12)
2. Ve a la pestaña **Console**
3. Deberías ver logs como:
   - "Form submitted"
   - "Response: {ok: true, lead_id: '...'}"

### Paso 4.4: Revisar Network en DevTools

1. En DevTools, ve a la pestaña **Network**
2. Busca la petición a `/api/register`
3. Click en ella para ver:
   - **Request Payload**: Los datos que enviaste
   - **Response**: {ok: true, lead_id: "...", message: "Registro exitoso"}
   - **Status**: 200 OK

---

## 5. Solución de Problemas

### ❌ Error: "No autorizado"

**Causa**: El token no coincide entre `.env.local` y `GOOGLE_APPS_SCRIPT.js`

**Solución**:
1. Verifica que `APP_WEBHOOK_TOKEN` en `.env.local` sea exactamente igual a `AUTHORIZED_TOKEN` en Apps Script
2. Reinicia el servidor: `npm run dev`

---

### ❌ Error: "WEBHOOK_URL not configured"

**Causa**: No configuraste `APP_WEBHOOK_URL` en `.env.local`

**Solución**:
1. Copia la URL de tu Web App de Google Apps Script
2. Pégala en `APP_WEBHOOK_URL` en `.env.local`
3. Reinicia el servidor

---

### ❌ Error: "Hoja 'Registros' no encontrada"

**Causa**: La hoja no existe o tiene otro nombre

**Solución**:
1. Ve a tu Google Sheet
2. Asegúrate de que hay una hoja llamada exactamente "Registros"
3. O ejecuta la función `setupSheet` en Apps Script

---

### ❌ Los datos no llegan a Google Sheets

**Pasos de debugging**:

1. **Verifica el formulario**:
   ```
   DevTools > Console
   ¿Hay errores en rojo?
   ```

2. **Verifica la API**:
   ```
   DevTools > Network > /api/register
   Status: ¿200 OK o error?
   Response: ¿{ok: true}?
   ```

3. **Verifica Apps Script**:
   ```
   Apps Script > Ejecuciones
   ¿Hay ejecuciones recientes?
   ¿Hay errores?
   ```

4. **Verifica variables de entorno**:
   ```bash
   # En la terminal, verifica que las variables están configuradas
   echo $APP_WEBHOOK_URL  # En Mac/Linux
   # O revisa el archivo .env.local directamente
   ```

---

### ❌ Error de CORS

**Causa**: El webhook no permite peticiones desde tu dominio

**Solución**:
En Apps Script, verifica que en la implementación seleccionaste "Quién tiene acceso: **Cualquier persona**"

---

### ✅ Testing Exitoso: Checklist

- [ ] Google Sheet creada
- [ ] Apps Script configurado con token
- [ ] Función `setupSheet` ejecutada
- [ ] Web App desplegada
- [ ] URL del webhook copiada
- [ ] `.env.local` creado con todas las variables
- [ ] Servidor reiniciado
- [ ] Formulario enviado con datos de prueba
- [ ] Página de confirmación `/gracias` mostrada
- [ ] Datos visibles en Google Sheets
- [ ] Logs de Apps Script sin errores

---

## 🚀 ¡Listo para Producción!

Si todo funciona en desarrollo, tu proyecto está listo para:

1. **Desplegar a producción** (Vercel, Netlify, etc.)
2. **Actualizar** `NEXT_PUBLIC_APP_URL` con tu dominio real
3. **Configurar reCAPTCHA** (opcional pero recomendado)
4. **Monitorear** los registros en Google Sheets

---

## 🐛 Debugging: Los Datos No Llegan a Sheets

Si la página de confirmación aparece pero los datos NO llegan a Google Sheets:

### Opción 1: Script de Prueba Directo

1. **Edita** `scripts/test-webhook.js`
2. **Pega** tu `WEBHOOK_URL` y `WEBHOOK_TOKEN` del `.env.local`
3. **Ejecuta**:
   ```bash
   node scripts/test-webhook.js
   ```

**Resultados posibles:**

✅ **Éxito**: Si ves `🎉 ¡ÉXITO!`, tu webhook funciona. El problema está en otro lado.

❌ **Error 401/403**: Tu `WEBHOOK_TOKEN` es incorrecto o no coincide con Apps Script.

❌ **Error 404**: Tu `WEBHOOK_URL` es incorrecta.

❌ **Error de red**: El webhook no está desplegado o la URL no es accesible.

### Opción 2: Ver Logs en Tiempo Real

1. **Reinicia** el servidor en desarrollo:
   ```bash
   npm run dev
   ```

2. **Observa la terminal** mientras envías el formulario

3. **Busca estos logs**:
   ```
   🔄 Enviando datos al webhook...
   📊 Respuesta del webhook: { status: 200, ... }
   ✅ Datos guardados en Google Sheets exitosamente
   ```

**Si ves:**
- `⚠️ WEBHOOK_URL not configured` → Falta la variable en `.env.local`
- `❌ Webhook error:` → Hay un problema con Apps Script
- `❌ Error sending to webhook:` → Error de red o URL incorrecta

### Opción 3: Verificar Apps Script

1. Ve a **Google Apps Script** → **Ejecuciones**
2. Busca ejecuciones recientes de `doPost`
3. Revisa si hay errores

**Errores comunes:**
- `Unauthorized`: Token incorrecto
- `TypeError`: Datos mal formateados
- `No authorization`: Falta el header Authorization

### Opción 4: Prueba Manual del Endpoint

Abre tu navegador y ve a:
```
https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

Deberías ver: `Method Not Allowed` (es normal, solo acepta POST)

Si ves un error diferente, tu deployment no está activo.

---

## 📞 Soporte Adicional

Si después de todos estos pasos sigues teniendo problemas:

1. ✅ Verifica que el **Web App** esté desplegado como **Nueva implementación**
2. ✅ Confirma que el acceso sea **Cualquier usuario**
3. ✅ Copia de nuevo la URL del webhook (a veces cambia)
4. ✅ Reinicia el servidor después de cambiar `.env.local`
5. ✅ Revisa que no haya espacios extra en las variables de entorno
6. ✅ Prueba con el script `test-webhook.js` primero

**Recuerda**: El archivo `.env.local` NUNCA se debe commitear a Git (ya está en `.gitignore`).

