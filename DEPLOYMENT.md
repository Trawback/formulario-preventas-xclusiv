# 🚀 Guía de Despliegue - XCLUSIV Preventa

Esta guía te ayudará a desplegar tu landing page de preventa en Vercel paso a paso.

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta de GitHub (gratuita)
- ✅ Cuenta de Vercel (gratuita)
- ✅ Cuenta de Google (para Google Sheets)
- ✅ El código del proyecto listo

## 🔧 Paso 1: Preparar Google Sheets

### 1.1 Crear la Hoja de Cálculo

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala: "XCLUSIV Preventa - Registros"
4. En la primera hoja (renómbrala a "Registros"), crea estas columnas:

```
Row 1:
lead_id | timestamp | email | whatsapp | ciudad | modelo_favorito | talla | intencion_compra | cantidad_estimada | marketing_consent | ip_hash | utm_source | utm_medium | utm_campaign | utm_content | referer
```

### 1.2 Configurar Apps Script

1. En tu hoja, ve a **Extensiones → Apps Script**
2. Borra el código existente
3. Copia y pega el código del `README.md` (sección "Configuración de Google Sheets")
4. **IMPORTANTE**: Cambia la línea:
   ```javascript
   const AUTHORIZED_TOKEN = "tu-token-super-seguro-aqui";
   ```
   Por un token seguro generado con:
   ```bash
   openssl rand -base64 32
   ```
   O usa un generador online como [https://randomkeygen.com/](https://randomkeygen.com/)

5. Guarda el proyecto (Ctrl+S)
6. Nómbralo: "XCLUSIV Webhook"

### 1.3 Desplegar el Apps Script

1. Haz clic en **Implementar → Nueva implementación**
2. Selecciona el ícono de engranaje ⚙️ junto a "Seleccionar tipo"
3. Elige **Aplicación web**
4. Configura:
   - **Descripción**: "Webhook para preventa XCLUSIV"
   - **Ejecutar como**: "Yo (tu email)"
   - **Quién tiene acceso**: "Cualquier persona"
5. Haz clic en **Implementar**
6. **Autoriza la aplicación** (es normal que Google muestre un aviso)
7. **COPIA LA URL** que aparece (termina en `/exec`)

📝 **Guarda esta información**:
```
WEBHOOK_URL: https://script.google.com/macros/s/ABC123.../exec
WEBHOOK_TOKEN: el-token-que-generaste-antes
```

## 📦 Paso 2: Subir el Código a GitHub

### 2.1 Crear Repositorio

1. Ve a [GitHub](https://github.com)
2. Haz clic en el botón **"New"** (verde) para crear un repositorio
3. Configura:
   - **Repository name**: `xclusiv-preventa`
   - **Description**: "Landing page de preventa con integración a Google Sheets"
   - **Visibilidad**: Privado (recomendado) o Público
4. **NO** inicialices con README, .gitignore ni license
5. Haz clic en **Create repository**

### 2.2 Subir el Código

En tu terminal, dentro de la carpeta del proyecto:

```bash
# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: XCLUSIV preventa landing page"

# Agregar el repositorio remoto (cambia URL por la tuya)
git remote add origin https://github.com/TU-USUARIO/xclusiv-preventa.git

# Subir el código
git branch -M main
git push -u origin main
```

## 🌐 Paso 3: Desplegar en Vercel

### 3.1 Conectar con Vercel

1. Ve a [Vercel](https://vercel.com)
2. Haz clic en **"Add New → Project"**
3. Importa tu repositorio de GitHub:
   - Si es la primera vez, autoriza a Vercel para acceder a GitHub
   - Busca `xclusiv-preventa`
   - Haz clic en **Import**

### 3.2 Configurar el Proyecto

1. **Project Name**: `xclusiv-preventa` (o el que prefieras)
2. **Framework Preset**: Next.js (detectado automáticamente)
3. **Root Directory**: `./` (raíz)
4. **Build Command**: `npm run build` (automático)
5. **Output Directory**: `.next` (automático)

### 3.3 Configurar Variables de Entorno

**IMPORTANTE**: Antes de hacer deploy, configura las variables de entorno:

1. Haz clic en **"Environment Variables"** (en la configuración del proyecto)
2. Agrega las siguientes variables:

```env
# OBLIGATORIAS
APP_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
APP_WEBHOOK_TOKEN=el-token-que-generaste
APP_HASH_SALT=otro-token-aleatorio-seguro

# OPCIONALES (puedes agregarlas después)
NEXT_PUBLIC_RECAPTCHA_KEY=
RECAPTCHA_SECRET=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

**Cómo generar tokens seguros**:
```bash
# En Mac/Linux
openssl rand -base64 32

# En Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

3. Haz clic en **"Add"** para cada variable

### 3.4 Desplegar

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos mientras Vercel construye tu proyecto
3. ✅ ¡Listo! Tu sitio está en vivo

## 🎯 Paso 4: Verificación Post-Deployment

### 4.1 Probar el Sitio

1. Abre la URL que Vercel te proporcionó
2. Verifica que:
   - ✅ La página carga correctamente
   - ✅ Los estilos se ven bien
   - ✅ El formulario es visible

### 4.2 Probar el Formulario

1. Completa el formulario con datos de prueba
2. Envía el formulario
3. Verifica que:
   - ✅ Redirecciona a `/gracias`
   - ✅ Los datos aparecen en Google Sheets
   - ✅ No hay errores en la consola del navegador

### 4.3 Verificar Logs

Si algo falla:

1. **En Vercel**:
   - Ve a tu proyecto → **Deployments** → Click en el último deploy
   - Revisa la sección **"Functions"** → Busca `/api/register`
   - Verifica los logs

2. **En Google Apps Script**:
   - Abre tu script
   - Ve a **Ejecuciones** (ícono de reloj)
   - Revisa si hay errores

## 🔧 Configuraciones Adicionales

### Dominio Personalizado

1. En Vercel, ve a **Settings → Domains**
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel
4. Actualiza `NEXT_PUBLIC_APP_URL` con tu nuevo dominio

### reCAPTCHA v3 (Opcional pero Recomendado)

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Registra un nuevo sitio:
   - **Etiqueta**: XCLUSIV Preventa
   - **Tipo**: reCAPTCHA v3
   - **Dominios**: 
     - `tu-dominio.vercel.app`
     - `localhost` (para desarrollo)
     - tu dominio personalizado (si tienes)
3. Copia las claves:
   - **Site Key** → Agrégala como `NEXT_PUBLIC_RECAPTCHA_KEY` en Vercel
   - **Secret Key** → Agrégala como `RECAPTCHA_SECRET` en Vercel
4. Redeploy el proyecto (Vercel lo hará automáticamente)

### Google Tag Manager (Opcional)

1. Crea una cuenta en [Google Tag Manager](https://tagmanager.google.com)
2. Crea un nuevo contenedor:
   - **Nombre**: XCLUSIV Preventa
   - **Plataforma**: Web
3. Copia el ID del contenedor (formato: `GTM-XXXXXXX`)
4. Agrégalo como `NEXT_PUBLIC_GTM_ID` en Vercel
5. Redeploy el proyecto

## 🐛 Troubleshooting

### Error: "Webhook failed"

**Problema**: Los datos no llegan a Google Sheets

**Solución**:
1. Verifica que `APP_WEBHOOK_URL` esté correctamente configurada
2. Verifica que `APP_WEBHOOK_TOKEN` coincida en Vercel y Apps Script
3. Asegúrate de que el Apps Script esté desplegado con acceso "Cualquier persona"
4. Revisa los logs en Apps Script (Ejecuciones)

### Error: "Environment variable not found"

**Problema**: Variables de entorno no configuradas

**Solución**:
1. Ve a Vercel → Project Settings → Environment Variables
2. Verifica que todas las variables obligatorias estén configuradas
3. Redeploy el proyecto

### La página se ve sin estilos

**Problema**: TailwindCSS no se compiló correctamente

**Solución**:
1. En Vercel, ve a Deployments → Último deploy → "..." → Redeploy
2. Si persiste, verifica que `tailwind.config.ts` y `postcss.config.js` estén en el repositorio

### Error 500 en el formulario

**Problema**: Error en el API route

**Solución**:
1. Verifica los logs en Vercel (Deployment → Functions → /api/register)
2. Asegúrate de que todas las variables de entorno estén configuradas
3. Verifica la URL del webhook en Google Apps Script

## 📊 Monitoreo

### Analytics

1. Ve a Vercel → Tu proyecto → Analytics
2. Aquí verás:
   - Visitors
   - Page views
   - Performance metrics

### Google Sheets

Tu hoja de cálculo se actualizará en tiempo real con cada registro nuevo.

## 🔄 Actualizaciones Futuras

Para actualizar tu sitio:

```bash
# Hacer cambios en el código
git add .
git commit -m "Descripción de cambios"
git push

# Vercel desplegará automáticamente
```

## ✅ Checklist Final

- [ ] Google Sheets configurado con columnas correctas
- [ ] Apps Script desplegado y URL copiada
- [ ] Token de seguridad generado
- [ ] Código subido a GitHub
- [ ] Proyecto desplegado en Vercel
- [ ] Variables de entorno configuradas en Vercel
- [ ] Formulario probado y funcionando
- [ ] Datos aparecen en Google Sheets
- [ ] reCAPTCHA configurado (opcional)
- [ ] GTM configurado (opcional)
- [ ] Dominio personalizado configurado (opcional)

## 📞 Soporte

Si tienes problemas:

1. Revisa esta guía completa
2. Verifica los logs en Vercel y Apps Script
3. Consulta el `README.md` principal
4. Contacta a soporte técnico

---

**¡Felicitaciones! Tu landing de preventa está en vivo 🎉**

