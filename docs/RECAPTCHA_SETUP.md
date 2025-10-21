# 🔐 Guía de Configuración de Google reCAPTCHA v3

## 📋 Resumen

Esta guía te ayudará a configurar Google reCAPTCHA v3 en tu aplicación de preventa para protegerla contra bots y spam.

---

## ✅ Ventajas de reCAPTCHA v3

- **Invisible**: No interrumpe la experiencia del usuario
- **Inteligente**: Usa IA para detectar bots
- **Gratis**: Hasta 1 millón de solicitudes/mes
- **Efectivo**: Reduce spam en ~95%
- **Score-based**: Puedes ajustar la sensibilidad

---

## 🚀 Paso 1: Obtener las Keys de Google

### 1.1 Accede a la consola de reCAPTCHA

Ve a: **https://www.google.com/recaptcha/admin/create**

### 1.2 Rellena el formulario

```
┌─────────────────────────────────────────────────┐
│ Etiqueta (Label)                                │
│ → Xclusiv Preventa                              │
├─────────────────────────────────────────────────┤
│ Tipo de reCAPTCHA                               │
│ → ✓ reCAPTCHA v3                                │
├─────────────────────────────────────────────────┤
│ Dominios                                        │
│ → preventa.xclusiv.com                          │
│ → localhost (para desarrollo)                   │
│ → vercel.app (si usas Vercel)                   │
├─────────────────────────────────────────────────┤
│ Propietarios                                    │
│ → tu-email@gmail.com                            │
├─────────────────────────────────────────────────┤
│ ✓ Acepto términos de servicio                  │
└─────────────────────────────────────────────────┘
```

### 1.3 Obtén tus keys

Después de crear el sitio, Google te dará:

- **Site Key** (Clave del sitio): `6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
  - ✅ Es pública, se expone en el frontend
  
- **Secret Key** (Clave secreta): `6LcYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`
  - ⚠️ Es privada, solo para el backend

---

## 🔧 Paso 2: Configurar Variables de Entorno

### 2.1 Edita el archivo `.env.local`

Abre el archivo `.env.local` en la raíz de tu proyecto y reemplaza los valores:

```bash
# ====================================
# GOOGLE RECAPTCHA v3
# ====================================
NEXT_PUBLIC_RECAPTCHA_KEY=6LcXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET=6LcYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
```

### 2.2 Genera un salt para seguridad

Genera un string aleatorio único para `APP_HASH_SALT`:

```bash
# Opción 1: En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opción 2: En Python
python -c "import secrets; print(secrets.token_hex(32))"

# Opción 3: En línea
# Ve a: https://www.random.org/strings/
```

Ejemplo de salida:
```bash
APP_HASH_SALT=a7f3e9d2c1b8456f7e9d3c2b1a8f7e6d5c4b3a2f1e9d8c7b6a5f4e3d2c1b0a9
```

---

## 🧪 Paso 3: Verificar la Instalación

### 3.1 Reinicia el servidor de desarrollo

```bash
# Detén el servidor (Ctrl + C)
# Reinicia
npm run dev
```

### 3.2 Abre el navegador

Ve a: **http://localhost:3000**

### 3.3 Verifica en la consola del navegador

Abre DevTools (F12) y ve a la pestaña **Console**. Deberías ver:

```
✅ reCAPTCHA v3 cargado correctamente
```

### 3.4 Inspecciona el DOM

En la esquina inferior derecha de la página debería aparecer el badge de reCAPTCHA:

```
🛡️ This site is protected by reCAPTCHA
```

### 3.5 Prueba el formulario

1. Completa el formulario de registro
2. Haz clic en "Reservar Mi Hoodie Ahora"
3. Verifica en la consola del navegador (DevTools → Network):
   - Debería haber una llamada a `recaptcha/api.js`
   - Debería haber una llamada POST a `/api/register` con `recaptcha_token`

### 3.6 Verifica en el backend

En la terminal del servidor, deberías ver logs como:

```bash
🔄 Enviando datos al webhook...
✅ Datos guardados en Google Sheets exitosamente
```

---

## 📊 Paso 4: Monitorear en Google Admin Console

### 4.1 Accede al panel de administración

Ve a: **https://www.google.com/recaptcha/admin**

### 4.2 Selecciona tu sitio

Haz clic en **Xclusiv Preventa**

### 4.3 Revisa las métricas

- **Solicitudes**: Cuántos usuarios han enviado el formulario
- **Score promedio**: Entre 0.0 (bot) y 1.0 (humano)
- **Acciones**: Cuántas veces se ha ejecutado cada acción

### 4.4 Ajusta el threshold (opcional)

Si tienes muchos falsos positivos o negativos, puedes ajustar el score mínimo en:

**`lib/utils.ts`** (línea 51):

```typescript
return data.success && data.score >= 0.5; // 0.5 es el valor predeterminado
```

Valores recomendados:
- **0.3**: Muy permisivo (menos falsos positivos)
- **0.5**: Balance (recomendado) ✅
- **0.7**: Estricto (más seguro, más falsos positivos)

---

## 🐛 Solución de Problemas

### ❌ Error: "reCAPTCHA validation failed"

**Causas posibles:**

1. **Site Key incorrecta**
   - Verifica que `NEXT_PUBLIC_RECAPTCHA_KEY` esté correctamente copiada
   
2. **Dominio no autorizado**
   - Ve a la consola de reCAPTCHA
   - Agrega tu dominio a la lista de dominios autorizados

3. **Secret Key incorrecta**
   - Verifica que `RECAPTCHA_SECRET` esté correctamente copiada

### ❌ Error: "Timeout or duplicate session"

**Solución:**

```typescript
// Aumenta el timeout en lib/utils.ts
const response = await fetch(
  'https://www.google.com/recaptcha/api/siteverify',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token,
    }),
    signal: AbortSignal.timeout(10000), // 10 segundos
  }
);
```

### ❌ Badge de reCAPTCHA muy grande o molesto

**Solución 1: Ocultar el badge (si muestras el disclaimer)**

Agrega a `app/globals.css`:

```css
.grecaptcha-badge {
  visibility: hidden;
}
```

⚠️ **Solo si mantienes el disclaimer en el formulario** (líneas 800-823 de `RegisterForm.tsx`)

**Solución 2: Mover el badge**

```css
.grecaptcha-badge {
  bottom: 80px !important; /* Mueve hacia arriba */
}
```

### ❌ Error: "grecaptcha is not defined"

**Causa:** El script no se cargó a tiempo

**Solución:**

Agrega un listener en `RegisterForm.tsx`:

```typescript
useEffect(() => {
  const checkRecaptcha = () => {
    if (window.grecaptcha) {
      console.log('✅ reCAPTCHA cargado');
    } else {
      console.log('⏳ Esperando reCAPTCHA...');
      setTimeout(checkRecaptcha, 100);
    }
  };
  checkRecaptcha();
}, []);
```

---

## 🔒 Mejores Prácticas de Seguridad

### ✅ Hacer

- ✅ Rotar las keys cada 3-6 meses
- ✅ Monitorear el score promedio semanalmente
- ✅ Registrar intentos fallidos para análisis
- ✅ Usar HTTPS en producción
- ✅ Mantener el disclaimer visible

### ❌ No Hacer

- ❌ Compartir la Secret Key públicamente
- ❌ Usar la misma key para múltiples dominios
- ❌ Ignorar scores muy bajos (< 0.3)
- ❌ Ocultar el badge sin el disclaimer
- ❌ Subir `.env.local` a GitHub

---

## 📈 Configuración para Producción (Vercel)

### 1. Ve a tu proyecto en Vercel

**https://vercel.com/tu-usuario/formulario-xclusiv**

### 2. Agrega las variables de entorno

```
Settings → Environment Variables → Add New
```

Agrega cada una:

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_RECAPTCHA_KEY` | `6LcXXXX...` | Production, Preview, Development |
| `RECAPTCHA_SECRET` | `6LcYYYY...` | Production, Preview, Development |
| `APP_HASH_SALT` | `a7f3e9d2...` | Production |

### 3. Redeploy

```bash
git push origin main
```

O en Vercel:

```
Deployments → ... → Redeploy
```

---

## 🎯 Testing

### Test Manual

1. Abre el formulario
2. Completa con datos reales
3. Envía
4. ✅ Debería registrarse exitosamente

### Test de Bot Simulation

Usa el script de prueba:

```bash
node scripts/test-recaptcha.js
```

### Test de Score Threshold

Temporalmente cambia el threshold a 0.9 y prueba:

```typescript
// lib/utils.ts
return data.success && data.score >= 0.9; // Muy estricto
```

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa los logs** en la consola del navegador y terminal
2. **Consulta la documentación oficial**: https://developers.google.com/recaptcha/docs/v3
3. **Revisa los issues del proyecto** en GitHub
4. **Contacta al equipo** si el problema persiste

---

## ✅ Checklist de Activación

Usa esto para verificar que todo esté configurado:

- [ ] Crear cuenta en Google reCAPTCHA Admin
- [ ] Obtener Site Key y Secret Key
- [ ] Configurar `.env.local` con las keys
- [ ] Generar y configurar `APP_HASH_SALT`
- [ ] Reiniciar servidor de desarrollo
- [ ] Verificar badge de reCAPTCHA en el frontend
- [ ] Probar envío de formulario
- [ ] Verificar token en Network tab
- [ ] Verificar validación en backend logs
- [ ] Configurar variables en Vercel (producción)
- [ ] Redeploy en producción
- [ ] Probar en producción

---

**¡Listo!** Tu formulario ahora está protegido contra bots. 🛡️

