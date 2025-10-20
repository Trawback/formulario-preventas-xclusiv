# 🚀 XCLUSIV - Landing Page de Preventa

Landing page profesional para preventa de prendas con integración a Google Sheets, construida con Next.js 14, TypeScript y TailwindCSS.

## ✨ Características

- ⚡ **Next.js 14** con App Router
- 🎨 **TailwindCSS** para estilos modernos y responsivos
- 📝 **TypeScript** para mayor seguridad de tipos
- 🔐 **Validación** con React Hook Form y Zod
- 📊 **Google Sheets** integración vía webhook de Apps Script
- 🤖 **reCAPTCHA v3** (opcional) para seguridad
- 📈 **Google Tag Manager** soporte integrado
- 🎯 **SEO optimizado** con metadata completa
- 📱 **100% Responsive** - Mobile First
- 🚀 **Vercel** ready para deploy instantáneo

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Google (para Google Sheets)
- Cuenta de Vercel (opcional, para deployment)

## 🛠️ Instalación

1. **Clona el repositorio o copia los archivos:**

```bash
cd tu-proyecto
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno:**

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:

```env
# URL del webhook de Google Apps Script
APP_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec

# Token de seguridad para el webhook
APP_WEBHOOK_TOKEN=tu-token-super-seguro-aqui

# Salt para hashear IPs
APP_HASH_SALT=un-salt-aleatorio-muy-seguro

# reCAPTCHA v3 (opcional)
NEXT_PUBLIC_RECAPTCHA_KEY=tu-recaptcha-site-key
RECAPTCHA_SECRET=tu-recaptcha-secret-key

# Google Tag Manager (opcional)
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# URL de tu aplicación
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

4. **Ejecuta en modo desarrollo:**

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Configuración de Google Sheets

### Paso 1: Crear la Hoja de Cálculo

1. Crea una nueva hoja de cálculo en [Google Sheets](https://sheets.google.com)
2. Nombra la primera hoja como "Registros"
3. Crea las siguientes columnas en la primera fila:

```
| A        | B         | C      | D        | E     | F        | G      | H      | I       | J                 | K        | L              | M                 | N       | O          | P          | Q            | R            | S       |
|----------|-----------|--------|----------|-------|----------|--------|--------|---------|-------------------|----------|----------------|-------------------|---------|-----------|-----------|--------------|--------------|---------|
| lead_id  | timestamp | nombre | apellido | email | whatsapp | prenda | talla  | ciudad  | cantidad_estimada | contacto | instagram_user | consent_marketing | ip_hash | utm_source| utm_medium| utm_campaign | utm_content  | referer |
```

### Paso 2: Crear el Apps Script

1. En tu hoja de cálculo, ve a **Extensiones > Apps Script**
2. Borra el código por defecto y pega el siguiente código:

```javascript
function doPost(e) {
  try {
    // Configuración
    const AUTHORIZED_TOKEN = "tu-token-super-seguro-aqui"; // Debe coincidir con APP_WEBHOOK_TOKEN
    const SHEET_NAME = "Registros";
    
    // Verificar autorización
    const authHeader = e.parameter.authorization || e.postData?.headers?.Authorization || "";
    const token = authHeader.replace("Bearer ", "");
    
    if (token !== AUTHORIZED_TOKEN) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "No autorizado"
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Parsear datos
    const data = JSON.parse(e.postData.contents);
    
    // Obtener la hoja
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      throw new Error("Hoja no encontrada");
    }
    
    // Preparar la fila de datos
    const row = [
      data.lead_id || "",
      data.timestamp || new Date().toISOString(),
      data.email || "",
      data.whatsapp || "",
      data.ciudad || "",
      data.modelo_favorito || "",
      data.talla || "",
      data.intencion_compra || "",
      data.cantidad_estimada || "",
      data.marketing_consent ? "Si" : "No",
      data.ip_hash || "",
      data.utm_source || "",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.utm_content || "",
      data.referer || ""
    ];
    
    // Agregar la fila
    sheet.appendRow(row);
    
    // Respuesta exitosa
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Datos guardados correctamente"
    }))
    .setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Guarda el proyecto** (Ctrl+S o Cmd+S)
4. **Despliega el script:**
   - Haz clic en **Implementar** > **Nueva implementación**
   - Selecciona tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   - Haz clic en **Implementar**
   - **Copia la URL del webhook** (termina en `/exec`)
   - Pega esta URL en tu `.env.local` como `APP_WEBHOOK_URL`

### Paso 3: Probar el Webhook

Puedes probar el webhook usando curl:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu-token-super-seguro-aqui" \
  -d '{
    "lead_id": "test-123",
    "timestamp": "2024-01-01T00:00:00Z",
    "email": "test@example.com",
    "modelo_favorito": "oversized-tee-black",
    "talla": "m",
    "intencion_compra": "seguro",
    "cantidad_estimada": "2",
    "marketing_consent": true,
    "ip_hash": "test-hash"
  }' \
  https://script.google.com/macros/s/TU_SCRIPT_ID/exec
```

## 🔐 Configuración de reCAPTCHA (Opcional)

1. Ve a [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Registra un nuevo sitio:
   - Tipo: reCAPTCHA v3
   - Dominios: tu dominio + localhost (para desarrollo)
3. Copia las claves:
   - **Site Key** → `NEXT_PUBLIC_RECAPTCHA_KEY`
   - **Secret Key** → `RECAPTCHA_SECRET`

## 📦 Estructura del Proyecto

```
.
├── app/
│   ├── api/
│   │   └── register/
│   │       └── route.ts          # API endpoint para registro
│   ├── gracias/
│   │   └── page.tsx              # Página de confirmación
│   ├── privacidad/
│   │   └── page.tsx              # Política de privacidad
│   ├── terminos/
│   │   └── page.tsx              # Términos y condiciones
│   ├── layout.tsx                # Layout principal con SEO
│   ├── page.tsx                  # Landing page principal
│   └── globals.css               # Estilos globales
├── components/
│   ├── RegisterForm.tsx          # Formulario de registro
│   ├── Hero.tsx                  # Sección hero
│   ├── Gallery.tsx               # Galería de productos
│   ├── Benefits.tsx              # Beneficios de la preventa
│   ├── SizeGuide.tsx             # Guía de tallas
│   ├── FAQ.tsx                   # Preguntas frecuentes
│   └── Footer.tsx                # Footer del sitio
├── lib/
│   ├── types.ts                  # Tipos TypeScript y schemas
│   ├── utils.ts                  # Funciones utilitarias
│   └── config.ts                 # Configuración de la app
├── public/
│   ├── robots.txt                # Configuración de robots
│   ├── sitemap.xml               # Mapa del sitio
│   └── favicon.ico               # Favicon
├── .env.example                  # Variables de entorno de ejemplo
├── .env.local                    # Variables de entorno (no commiteado)
├── next.config.js                # Configuración de Next.js
├── tailwind.config.ts            # Configuración de Tailwind
├── tsconfig.json                 # Configuración de TypeScript
└── package.json                  # Dependencias del proyecto
```

## 🚀 Deployment en Vercel

1. **Conecta tu repositorio:**
   - Sube tu código a GitHub/GitLab/Bitbucket
   - Importa el proyecto en [Vercel](https://vercel.com)

2. **Configura las variables de entorno:**
   - En Vercel, ve a Project Settings > Environment Variables
   - Agrega todas las variables de tu `.env.local`

3. **Despliega:**
   - Vercel desplegará automáticamente
   - Cada push a `main` creará un nuevo deployment

## 🎨 Personalización

### Colores y Marca

Edita `tailwind.config.ts` para cambiar los colores principales:

```typescript
colors: {
  primary: {
    // Tus colores aquí
  },
  secondary: {
    // Tus colores aquí
  },
}
```

### Configuración de la App

Edita `lib/config.ts`:

```typescript
export const APP_CONFIG = {
  name: 'TU MARCA',
  tagline: 'Tu tagline aquí',
  // ...
};
```

### Modelos y Productos

Edita `lib/types.ts`:

```typescript
export const MODELOS_DISPONIBLES = [
  { value: 'tu-producto-1', label: 'Nombre del Producto 1' },
  // ...
];
```

## 📱 Capturas de Pantalla

### Landing Page
- Hero section con CTA principal
- Galería de productos
- Formulario de registro inline
- Guía de tallas
- FAQ

### Flujo de Registro
1. Usuario completa el formulario
2. Validación en tiempo real
3. Envío a Google Sheets
4. Redirección a página de agradecimiento
5. Opción de compartir en WhatsApp

## 🧪 Testing

```bash
# Verificar tipos
npm run type-check

# Lint
npm run lint

# Build para producción
npm run build
```

## 📈 Analytics y Tracking

### UTM Parameters

La landing captura automáticamente:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`

Ejemplo de URL con UTMs:
```
https://tu-dominio.com/?utm_source=instagram&utm_medium=stories&utm_campaign=preventa2024
```

### Google Tag Manager

1. Crea un contenedor en [Google Tag Manager](https://tagmanager.google.com)
2. Agrega tu GTM ID en `.env.local`:
   ```
   NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
   ```

## 🔒 Seguridad

- ✅ IPs hasheadas con HMAC-SHA256
- ✅ Token de autorización para webhook
- ✅ Validación de datos con Zod
- ✅ reCAPTCHA v3 para prevenir spam
- ✅ Headers de seguridad configurados
- ✅ CORS controlado

## 🐛 Troubleshooting

### El webhook no funciona

1. Verifica que el Apps Script esté desplegado como "Aplicación web"
2. Asegúrate de que el token en el script coincida con `APP_WEBHOOK_TOKEN`
3. Revisa los logs en Google Apps Script (Ver > Registros)

### Los datos no aparecen en Google Sheets

1. Verifica el nombre de la hoja ("Registros")
2. Revisa que las columnas estén en el orden correcto
3. Comprueba los permisos de la hoja

### Error de CORS

El script de Apps Script debe estar desplegado con acceso "Cualquier persona"

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

## 📞 Soporte

Para soporte, contacta a: hola@xclusiv.com

---

**Desarrollado con ❤️ usando Next.js 14**
