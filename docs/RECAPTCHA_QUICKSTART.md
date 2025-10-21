# 🚀 reCAPTCHA Quick Start (5 minutos)

## Paso 1: Obtén tus Keys (2 min)

1. Ve a: **https://www.google.com/recaptcha/admin/create**
2. Completa:
   ```
   Etiqueta: Xclusiv Preventa
   Tipo: reCAPTCHA v3
   Dominios: 
     - localhost
     - tu-dominio.com
   ```
3. Click en **Enviar**
4. Copia las dos keys que te da Google:
   - **Site Key** (6LcXXX...)
   - **Secret Key** (6LcYYY...)

## Paso 2: Configura .env.local (2 min)

1. Crea el archivo `.env.local` en la raíz del proyecto
2. Copia y pega esto:

```bash
# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_KEY=PEGA_TU_SITE_KEY_AQUI
RECAPTCHA_SECRET=PEGA_TU_SECRET_KEY_AQUI

# Genera un salt único (ejecuta este comando):
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
APP_HASH_SALT=tu_salt_generado_aqui
```

3. Reemplaza los valores con tus keys reales

## Paso 3: Genera el Salt (1 min)

En la terminal, ejecuta:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copia el resultado y pégalo en `APP_HASH_SALT`

## Paso 4: Reinicia el Servidor

```bash
# Detén el servidor (Ctrl + C)
npm run dev
```

## Paso 5: Prueba

1. Abre: **http://localhost:3000**
2. Busca el badge de reCAPTCHA en la esquina inferior derecha 🛡️
3. Completa el formulario
4. Envía

**¡Listo!** reCAPTCHA está activo.

---

## 🧪 Verificación

### En el Navegador (DevTools → Console):
```
✅ reCAPTCHA v3 cargado
```

### En la Terminal del Servidor:
```
🔄 Enviando datos al webhook...
✅ Datos guardados en Google Sheets exitosamente
```

### Badge Visible:
En la esquina inferior derecha: "This site is protected by reCAPTCHA"

---

## 📊 Monitoreo

Ve a: **https://www.google.com/recaptcha/admin**

Ahí verás:
- Total de solicitudes
- Score promedio (0.0 = bot, 1.0 = humano)
- Estadísticas por día

---

## 🐛 Problemas Comunes

### "reCAPTCHA validation failed"
- ✅ Verifica que las keys estén correctas
- ✅ Asegúrate de haber reiniciado el servidor

### No veo el badge de reCAPTCHA
- ✅ Verifica que `NEXT_PUBLIC_RECAPTCHA_KEY` tenga valor
- ✅ Abre DevTools → Console para ver errores

### Error "Timeout"
- ✅ Verifica tu conexión a internet
- ✅ Verifica que el dominio esté autorizado en Google

---

## 🔒 Seguridad

❌ **NO SUBAS** `.env.local` a GitHub (ya está en .gitignore)

✅ **SÍ SUBE** `.env.example` (sin valores reales)

---

## 📚 Más Info

Para una guía completa, ve a: `docs/RECAPTCHA_SETUP.md`

---

**¿Listo?** ¡A proteger tu formulario! 🛡️

