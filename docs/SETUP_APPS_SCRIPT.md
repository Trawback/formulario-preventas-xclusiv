# 🔧 Configuración de Google Apps Script - Paso a Paso

## ⚠️ IMPORTANTE: Sigue estos pasos EN ORDEN

### Paso 1: Copiar el Código

1. **Abre** el archivo `GOOGLE_APPS_SCRIPT.js` de este proyecto
2. **Copia TODO** el contenido (Ctrl+A, Ctrl+C)
3. **Ve a** tu Google Sheet → Extensiones → Apps Script
4. **Pega** el código (reemplaza todo lo que esté ahí)

---

### Paso 2: Configurar el Token

Necesitas el **MISMO token** en 3 lugares:

#### A. Generar un Token Seguro

Ejecuta esto en tu terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

O usa este que ya generamos:
```
ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=
```

#### B. Configurar en Google Apps Script

En el editor de Apps Script, busca la **línea 9**:
```javascript
const AUTHORIZED_TOKEN = "CAMBIA_ESTE_TOKEN_POR_UNO_SEGURO";
```

Cámbialo por:
```javascript
const AUTHORIZED_TOKEN = "ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=";
```

#### C. Configurar en la Función de Prueba

En el editor de Apps Script, busca la **línea 139**:
```javascript
const TEST_TOKEN = "CAMBIA_ESTE_TOKEN_POR_UNO_SEGURO";
```

Cámbialo por:
```javascript
const TEST_TOKEN = "ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=";
```

#### D. Configurar en tu .env.local

En tu archivo `.env.local`:
```env
APP_WEBHOOK_TOKEN=ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=
```

**✅ VERIFICA**: Los 3 lugares deben tener **EXACTAMENTE** el mismo token.

---

### Paso 3: Ejecutar setupSheet()

En Google Apps Script:

1. **Selecciona** la función `setupSheet` en el dropdown (arriba del código)
2. **Click** en "Ejecutar" (▶️)
3. **Autoriza** el script cuando te lo pida
4. **Espera** hasta ver "Execution completed"
5. **Verifica** en tu Google Sheet que:
   - Existe una hoja llamada "Registros"
   - Tiene encabezados con fondo morado
   - Tiene una fila de ejemplo

**Logs esperados:**
```
Petición recibida
Encabezados configurados correctamente
Fila de ejemplo agregada
Setup completado
```

---

### Paso 4: Ejecutar testScript()

En Google Apps Script:

1. **Selecciona** la función `testScript` en el dropdown
2. **Click** en "Ejecutar" (▶️)
3. **Observa** los logs

**✅ Si ves esto, está bien:**
```
🧪 Ejecutando test con token: ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=
✅ Token autorizado correctamente
✅ Fila agregada exitosamente
📊 Resultado completo:
{"ok":true,"success":true,"message":"Datos guardados correctamente","lead_id":"test-..."}
✅ ¡TEST EXITOSO! Los datos se guardaron en la hoja
```

**❌ Si ves esto, hay un error:**
```
❌ Token no autorizado
❌ TEST FALLÓ: unauthorized
```
→ Significa que los tokens NO coinciden. Revisa el Paso 2.

**❌ Si ves esto:**
```
❌ Hoja no encontrada: Registros
```
→ Ejecuta `setupSheet()` primero (Paso 3).

---

### Paso 5: Desplegar como Web App

En Google Apps Script:

1. **Click** en "Implementar" (arriba derecha) → "Nueva implementación"
2. **Click** en el ícono de ⚙️ junto a "Seleccionar tipo"
3. **Selecciona** "Aplicación web"
4. **Configura**:
   - **Descripción**: Webhook Preventa XCLUSIV
   - **Ejecutar como**: Yo (tu correo)
   - **Quién tiene acceso**: **Cualquier usuario**
5. **Click** en "Implementar"
6. **COPIA** la URL que aparece (algo como `https://script.google.com/macros/s/AKfy...../exec`)

---

### Paso 6: Configurar .env.local

Actualiza tu archivo `.env.local`:

```env
# Google Sheets Webhook
APP_WEBHOOK_URL=https://script.google.com/macros/s/TU_URL_AQUI/exec
APP_WEBHOOK_TOKEN=ZDtGKTRwgp6HdRJLUFx0bi1VxdRyCBI8Q1NblA1xARQ=

# reCAPTCHA (opcional)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=tu_site_key_aqui
RECAPTCHA_SECRET_KEY=tu_secret_key_aqui

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

**✅ VERIFICA:**
- `APP_WEBHOOK_URL` es la URL que copiaste en el Paso 5
- `APP_WEBHOOK_TOKEN` es **exactamente** el mismo que en Apps Script

---

### Paso 7: Probar el Formulario

1. **Reinicia** el servidor:
   ```bash
   # Detén el servidor (Ctrl+C)
   npm run dev
   ```

2. **Abre** http://localhost:3002 (o el puerto que te muestre)

3. **Envía** el formulario con datos de prueba

4. **Observa** la terminal, deberías ver:
   ```
   🔄 Enviando datos al webhook...
   📊 Respuesta del webhook: { status: 200, ... }
   ✅ Datos guardados en Google Sheets exitosamente
   ```

5. **Verifica** en Google Sheets que apareció una nueva fila

---

## 🎉 ¡Todo Listo!

Si llegaste hasta aquí y todo funcionó, tu formulario está completamente configurado.

## 🐛 Troubleshooting

### Error: "unauthorized"
→ Los tokens NO coinciden. Verifica el Paso 2.

### Error: "Hoja no encontrada"
→ Ejecuta `setupSheet()` en Apps Script.

### Error: 404 en la URL del webhook
→ La URL está incorrecta o no desplegaste el script.

### El formulario no envía nada
→ Verifica que `.env.local` tenga las variables correctas y reinicia el servidor.

