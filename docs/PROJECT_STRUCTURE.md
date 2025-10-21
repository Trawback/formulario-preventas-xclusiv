# 📂 Estructura del Proyecto - XCLUSIV Preventa

```
formulario-xclusiv/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/
│   │   └── 📁 register/
│   │       └── route.ts             # API endpoint para registro (POST)
│   │
│   ├── 📁 gracias/
│   │   └── page.tsx                 # Página de confirmación post-registro
│   │
│   ├── 📁 privacidad/
│   │   └── page.tsx                 # Política de privacidad
│   │
│   ├── 📁 terminos/
│   │   └── page.tsx                 # Términos y condiciones
│   │
│   ├── layout.tsx                   # Layout principal con SEO y GTM
│   ├── page.tsx                     # Landing page principal (home)
│   └── globals.css                  # Estilos globales y utilidades Tailwind
│
├── 📁 components/                   # Componentes React reutilizables
│   ├── RegisterForm.tsx             # Formulario de registro con validación
│   ├── Hero.tsx                     # Sección hero con CTA
│   ├── Gallery.tsx                  # Galería de productos
│   ├── Benefits.tsx                 # Beneficios de la preventa
│   ├── SizeGuide.tsx                # Guía de tallas interactiva
│   ├── FAQ.tsx                      # Preguntas frecuentes (acordeón)
│   └── Footer.tsx                   # Footer del sitio
│
├── 📁 lib/                          # Lógica y utilidades
│   ├── types.ts                     # Tipos TypeScript, schemas Zod
│   ├── utils.ts                     # Funciones utilitarias
│   └── config.ts                    # Configuración de la aplicación
│
├── 📁 public/                       # Archivos estáticos
│   ├── robots.txt                   # Configuración de robots para SEO
│   ├── sitemap.xml                  # Mapa del sitio para SEO
│   ├── site.webmanifest             # Manifest PWA
│   ├── favicon.ico                  # Favicon principal
│   └── .gitkeep                     # Mantener carpeta en git
│
├── 📄 Configuración Next.js
│   ├── next.config.js               # Configuración de Next.js
│   ├── tsconfig.json                # Configuración TypeScript
│   ├── tailwind.config.ts           # Configuración Tailwind CSS
│   ├── postcss.config.js            # Configuración PostCSS
│   └── .eslintrc.json               # Configuración ESLint
│
├── 📄 Configuración del Proyecto
│   ├── package.json                 # Dependencias y scripts
│   ├── .gitignore                   # Archivos ignorados por git
│   ├── .env.example                 # Variables de entorno de ejemplo
│   └── .env.local                   # Variables de entorno (no en git)
│
├── 📄 Documentación
│   ├── README.md                    # Documentación principal completa
│   ├── QUICKSTART.md                # Guía rápida de inicio (< 10 min)
│   ├── DEPLOYMENT.md                # Guía detallada de despliegue
│   ├── CUSTOMIZATION.md             # Guía de personalización
│   ├── PROJECT_STRUCTURE.md         # Este archivo
│   └── GOOGLE_APPS_SCRIPT.js        # Código del webhook para Google Sheets
│
└── 📁 node_modules/                 # Dependencias (generado por npm)
```

## 📊 Descripción de Archivos Clave

### 🎯 Rutas y Páginas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Landing principal con formulario |
| `/gracias` | `app/gracias/page.tsx` | Confirmación de registro |
| `/privacidad` | `app/privacidad/page.tsx` | Política de privacidad |
| `/terminos` | `app/terminos/page.tsx` | Términos y condiciones |
| `/api/register` | `app/api/register/route.ts` | API para procesar registros |

### 🧩 Componentes

| Componente | Propósito | Características |
|------------|-----------|-----------------|
| `RegisterForm` | Formulario de registro | Validación, UTM tracking, reCAPTCHA |
| `Hero` | Sección hero | CTA principal, badges, animaciones |
| `Gallery` | Galería de productos | Cards responsivas, hover effects |
| `Benefits` | Beneficios | Grid de iconos y descripciones |
| `SizeGuide` | Guía de tallas | Tabla responsive, consejos |
| `FAQ` | Preguntas frecuentes | Acordeón interactivo |
| `Footer` | Footer | Links, redes sociales, copyright |

### ⚙️ Configuración y Utilidades

| Archivo | Propósito |
|---------|-----------|
| `lib/types.ts` | Tipos, schemas Zod, constantes |
| `lib/utils.ts` | Hash IP, validación reCAPTCHA, UTM |
| `lib/config.ts` | Config de app, SEO, GTM |

### 🎨 Estilos

| Archivo | Propósito |
|---------|-----------|
| `app/globals.css` | Estilos globales, clases utility |
| `tailwind.config.ts` | Paleta de colores, animaciones |

### 📄 Documentación

| Archivo | Para quién | Cuándo usarlo |
|---------|-----------|---------------|
| `README.md` | Desarrolladores | Referencia completa |
| `QUICKSTART.md` | Principiantes | Inicio rápido (< 10 min) |
| `DEPLOYMENT.md` | DevOps | Despliegue a producción |
| `CUSTOMIZATION.md` | Diseñadores/Marketers | Personalización visual |
| `GOOGLE_APPS_SCRIPT.js` | Administradores | Configurar Google Sheets |

## 🔄 Flujo de Datos

```
Usuario completa formulario
        ↓
RegisterForm (validación client-side con Zod)
        ↓
POST /api/register
        ↓
Validación server-side + reCAPTCHA (opcional)
        ↓
Generar lead_id único (UUID)
        ↓
Hash de IP (HMAC-SHA256)
        ↓
POST a Google Apps Script Webhook
        ↓
Datos guardados en Google Sheets
        ↓
Respuesta exitosa
        ↓
Redirect a /gracias?lead_id=xxx
```

## 📦 Dependencias Principales

### Producción
- `next@14.2.13` - Framework React
- `react@18.3.1` - Librería UI
- `react-hook-form@7.53.0` - Manejo de formularios
- `zod@3.23.8` - Validación de esquemas
- `uuid@10.0.0` - Generación de IDs únicos

### Desarrollo
- `typescript@5.6.2` - Tipado estático
- `tailwindcss@3.4.11` - Framework CSS
- `eslint@8.57.0` - Linter
- `@types/*` - Definiciones de tipos

## 🚀 Scripts Disponibles

```bash
npm run dev          # Desarrollo local (port 3000)
npm run build        # Build para producción
npm run start        # Servidor producción
npm run lint         # Verificar código
npm run type-check   # Verificar tipos TypeScript
```

## 🔐 Variables de Entorno

### Obligatorias
- `APP_WEBHOOK_URL` - URL del webhook de Google Apps Script
- `APP_WEBHOOK_TOKEN` - Token de autorización del webhook
- `APP_HASH_SALT` - Salt para hashear IPs

### Opcionales
- `NEXT_PUBLIC_RECAPTCHA_KEY` - reCAPTCHA v3 site key
- `RECAPTCHA_SECRET` - reCAPTCHA v3 secret key
- `NEXT_PUBLIC_GTM_ID` - Google Tag Manager ID
- `NEXT_PUBLIC_APP_URL` - URL pública de la app

## 📝 Notas Importantes

1. **Seguridad**: 
   - Las IPs se hashean antes de guardar
   - Token de autorización para el webhook
   - Validación de datos en cliente y servidor
   - reCAPTCHA v3 para prevenir spam

2. **SEO**:
   - Metadata completa en cada página
   - Open Graph tags para redes sociales
   - robots.txt y sitemap.xml configurados
   - URLs limpias y semánticas

3. **Performance**:
   - Componentes optimizados
   - Imágenes lazy-loaded (cuando las agregues)
   - CSS optimizado con Tailwind
   - Build estático donde es posible

4. **Desarrollo**:
   - TypeScript en modo strict
   - ESLint configurado
   - Hot reload en desarrollo
   - Error boundaries

## 🎯 Próximos Pasos

1. ✅ Instalar dependencias: `npm install`
2. ✅ Configurar `.env.local`
3. ✅ Configurar Google Sheets + Apps Script
4. ✅ Probar localmente: `npm run dev`
5. ✅ Personalizar contenido (ver CUSTOMIZATION.md)
6. ✅ Desplegar en Vercel (ver DEPLOYMENT.md)

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2024  
**Licencia**: MIT

