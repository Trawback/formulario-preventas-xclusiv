# 🚨 Solución: Conexión con Google Sheets

## Problema
Los datos del formulario no llegan a Google Sheets.

## ✅ Solución Paso a Paso

### **Paso 1: Configurar Google Sheets**

1. **Abre tu Google Sheet** donde quieres guardar los datos
2. Ve a **Extensiones** → **Apps Script**
3. **Borra todo el código** que viene por defecto
4. **Copia y pega** TODO el contenido del archivo `GOOGLE_APPS_SCRIPT.js`
5. Haz clic en **💾 Guardar** (Ctrl+S)

### **Paso 2: Crear la hoja "Registros"**

En el editor de Apps Script:

1. Haz clic en **▶️ Ejecutar** (o presiona Ctrl+R)
2. En el menú desplegable junto al botón, selecciona la función **`setupSheet`**
3. Haz clic en **▶️ Ejecutar**
4. **Primera vez**: Te pedirá permisos
   - Haz clic en **"Revisar permisos"**
   - Selecciona tu cuenta de Google
   - Haz clic en **"Avanzado"**
   - Haz clic en **"Ir a [nombre del proyecto] (no seguro)"**
   - Haz clic en **"Permitir"**
5. Espera a que termine (verás "Execution completed" abajo)
6. Ve a tu Google Sheet y verifica que se creó la hoja **"Registros"** con encabezados

### **Paso 3: Desplegar como Web App**

1. En el editor de Apps Script, haz clic en **🚀 Implementar** (arriba a la derecha)
2. Selecciona **"Nueva implementación"**
3. Haz clic en el ⚙️ icono de engranaje junto a "Seleccionar tipo"
4. Selecciona **"Aplicación web"**
5. Configura así:
   - **Descripción**: "Webhook Preventa Xclusiv"
   - **Ejecutar como**: **Yo (tu email)**
   - **Quién tiene acceso**: **Cualquier persona** ⚠️ (IMPORTANTE)
6. Haz clic en **"Implementar"**
7. **Copia la URL** que te da (se parece a: `https://script.google.com/macros/s/AKfycbxxx.../exec`)
8. Haz clic en **"Listo"**

### **Paso 4: Configurar .env.local**

1. Abre el archivo `.env.local` en tu proyecto
2. Pega la URL que copiaste en el paso anterior:

```env
# URL del webhook de Google Apps Script
APP_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbxxx.../exec

# Token de autorización (YA ESTÁ CONFIGURADO en tu GOOGLE_APPS_SCRIPT.js línea 8)
APP_WEBHOOK_TOKEN=ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=

# Salt para hashear IPs (genera uno nuevo)
APP_HASH_SALT=tu_salt_aqui_genera_uno_nuevo
```

3. Para generar el `APP_HASH_SALT`, ejecuta:
```bash
node scripts/generate-salt.js
```

4. Copia el salt generado y pégalo en `APP_HASH_SALT`

### **Paso 5: Probar la Conexión**

#### **Opción A: Desde Google Apps Script (Recomendado)**

1. En el editor de Apps Script
2. En el menú desplegable, selecciona **`testScript`**
3. Haz clic en **▶️ Ejecutar**
4. Ve a **"Registro de ejecución"** (abajo) y busca:
   - ✅ "¡TEST EXITOSO!" = Todo funciona
   - ❌ Si ves errores, cópialos y compártelos

#### **Opción B: Desde tu aplicación**

1. Reinicia tu servidor de desarrollo:
```bash
npm run dev
```

2. Abre tu navegador en `http://localhost:3000`
3. Llena el formulario con datos de prueba
4. Envía el formulario
5. Verifica en Google Sheets que llegaron los datos

### **Paso 6: Verificar que funciona**

1. Abre tu Google Sheet
2. Ve a la hoja **"Registros"**
3. Deberías ver:
   - Una fila con encabezados (morado)
   - Una fila de ejemplo
   - Una o más filas con tus datos de prueba

---

## 🔍 Errores Comunes y Soluciones

### ❌ Error: "unauthorized"
**Causa**: El token en `.env.local` no coincide con el del script

**Solución**:
- Verifica que `APP_WEBHOOK_TOKEN` en `.env.local` sea **EXACTAMENTE IGUAL** a `AUTHORIZED_TOKEN` en `GOOGLE_APPS_SCRIPT.js` línea 8
- Actual en el script: `ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=`

### ❌ Error: "Hoja 'Registros' no encontrada"
**Causa**: No ejecutaste la función `setupSheet()`

**Solución**: 
- Ve al Paso 2 arriba y ejecuta `setupSheet()`

### ❌ Error: "403 Forbidden"
**Causa**: El deployment no está configurado como "Cualquier persona"

**Solución**:
1. En Apps Script, ve a **🚀 Implementar** → **"Administrar implementaciones"**
2. Haz clic en el ✏️ icono de editar
3. Cambia **"Quién tiene acceso"** a **"Cualquier persona"**
4. Haz clic en **"Implementar"**
5. **Copia la NUEVA URL** y actualízala en `.env.local`

### ❌ No aparecen datos en el Sheet
**Causa**: La URL del webhook está mal o falta reiniciar el servidor

**Solución**:
1. Verifica que `APP_WEBHOOK_URL` en `.env.local` termine en `/exec`
2. Reinicia el servidor: `npm run dev`
3. Prueba de nuevo

---

## 📋 Checklist Final

Antes de probar, verifica que tengas:

- [ ] Script copiado en Google Apps Script
- [ ] Función `setupSheet()` ejecutada exitosamente
- [ ] Hoja "Registros" creada en Google Sheets con encabezados
- [ ] Web App desplegada con acceso "Cualquier persona"
- [ ] URL del webhook copiada
- [ ] `.env.local` configurado con:
  - [ ] `APP_WEBHOOK_URL` (la URL que copiaste)
  - [ ] `APP_WEBHOOK_TOKEN=ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=`
  - [ ] `APP_HASH_SALT` (generado con el script)
- [ ] Servidor reiniciado después de modificar `.env.local`
- [ ] Función `testScript()` ejecutada exitosamente

---

## 🆘 ¿Todavía no funciona?

Si sigues teniendo problemas:

1. **Ve a Google Apps Script**
2. Haz clic en **"Ejecuciones"** (ícono de reloj en el menú lateral)
3. Busca la última ejecución con error
4. Copia el mensaje de error completo
5. Compártelo para recibir ayuda específica

---

## 📞 Debug Adicional

Para ver qué está pasando exactamente:

1. Abre **Chrome DevTools** (F12)
2. Ve a la pestaña **"Network"**
3. Envía el formulario
4. Busca la petición a `/api/register`
5. Revisa:
   - **Status Code**: ¿200, 400, 500?
   - **Response**: ¿Qué mensaje devuelve?
   - **Request Payload**: ¿Los datos se envían correctamente?

Comparte estos detalles si necesitas más ayuda.

