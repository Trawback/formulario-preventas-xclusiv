# 📝 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2024-10-20

### ✨ Agregado

#### Funcionalidades Core
- Landing page completa con Next.js 14 App Router
- Formulario de registro con validación en tiempo real (React Hook Form + Zod)
- Integración con Google Sheets vía webhook de Apps Script
- Sistema de tracking UTM automático
- Generación de lead_id único para cada registro
- Hash seguro de IPs con HMAC-SHA256

#### Páginas
- Página principal (landing) con todas las secciones
- Página de confirmación `/gracias` con datos del registro
- Página de política de privacidad `/privacidad`
- Página de términos y condiciones `/terminos`

#### Componentes
- `RegisterForm` - Formulario completo con validaciones
- `Hero` - Sección hero con CTA principal
- `Gallery` - Galería de productos
- `Benefits` - Grid de beneficios
- `SizeGuide` - Tabla de guía de tallas
- `FAQ` - Acordeón de preguntas frecuentes
- `Footer` - Footer con links y redes sociales

#### API
- Endpoint `/api/register` para procesar registros
- Validación server-side con Zod
- Integración con Google Apps Script webhook
- Soporte para reCAPTCHA v3 (opcional)

#### Seguridad
- Hash de IPs antes de almacenar
- Token de autorización para webhook
- Validación de datos en cliente y servidor
- Headers de seguridad configurados (X-Frame-Options, etc.)
- reCAPTCHA v3 para prevenir spam

#### SEO y Analytics
- Metadata completa en todas las páginas
- Open Graph tags para redes sociales
- Twitter Cards configuradas
- robots.txt y sitemap.xml
- Google Tag Manager integrado
- Manifest PWA

#### Estilos
- TailwindCSS configurado con paleta personalizada
- Diseño responsive (mobile-first)
- Animaciones suaves (fade-in, slide-up)
- Modo oscuro preparado (colores configurables)
- Componentes reutilizables con clases utility

#### Documentación
- README.md completo con guía detallada
- QUICKSTART.md para inicio rápido
- DEPLOYMENT.md con guía de despliegue paso a paso
- CUSTOMIZATION.md para personalización
- PROJECT_STRUCTURE.md con estructura del proyecto
- GOOGLE_APPS_SCRIPT.js con código del webhook
- Comentarios en código en español

#### Desarrollo
- TypeScript en modo strict
- ESLint configurado
- Prettier-ready
- Scripts npm útiles (dev, build, type-check)
- .env.example con todas las variables necesarias
- Git ignore configurado

#### Testing
- Validación de tipos con TypeScript
- Schemas de validación con Zod
- Error handling robusto

### 🎨 Diseño

- Paleta de colores primary (morado) y secondary (rosa)
- Tipografía Inter para textos
- Iconos con emojis y SVG
- Grid responsivo
- Cards con hover effects
- Botones con estados loading/success/error

### 🔧 Configuración

- Next.js 14 con App Router
- Node.js 18+ requerido
- Vercel deployment ready
- Variables de entorno seguras
- CORS configurado
- Headers de seguridad

### 📦 Dependencias

#### Producción
- next@14.2.13
- react@18.3.1
- react-dom@18.3.1
- react-hook-form@7.53.0
- zod@3.23.8
- @hookform/resolvers@3.9.0
- uuid@10.0.0

#### Desarrollo
- typescript@5.6.2
- tailwindcss@3.4.11
- @types/node@20.16.5
- @types/react@18.3.5
- eslint@8.57.0

### 🚀 Deploy

- Compatible con Vercel Free Tier
- Configuración automática en Vercel
- Variables de entorno via UI de Vercel
- Deploy automático con cada push a main

### 📱 Features Adicionales

- Captura automática de parámetros UTM
- Compartir en WhatsApp desde página de gracias
- Formulario con estados de loading
- Mensajes de error amigables
- Validación en tiempo real
- Contador de caracteres (potencial)

---

## 🔮 Futuras Versiones

### [1.1.0] - Planeado

#### A considerar
- [ ] Modo oscuro completo
- [ ] Internacionalización (i18n)
- [ ] Email notifications con Resend
- [ ] Dashboard de analytics
- [ ] A/B testing integrado
- [ ] Optimización de imágenes automática
- [ ] Service Worker para PWA
- [ ] Chat en vivo (Intercom/Crisp)

### [1.2.0] - Ideas futuras

- [ ] Pasarela de pago integrada (Stripe/Mercado Pago)
- [ ] Sistema de referidos
- [ ] Cupones de descuento
- [ ] Multi-idioma
- [ ] Panel de administración
- [ ] Exportación de datos a CSV
- [ ] Integración con CRM (HubSpot, etc.)

---

## 📋 Notas de Versión

### Versión 1.0.0
Primera versión estable del proyecto. Incluye todas las funcionalidades core necesarias para una landing page de preventa profesional con integración a Google Sheets.

**Destacados:**
- ✅ Listo para producción
- ✅ Cero dependencias de pago
- ✅ Compatible con Vercel Free Tier
- ✅ SEO optimizado
- ✅ Mobile responsive
- ✅ Documentación completa

**Testeado en:**
- ✅ Chrome 119+
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 119+
- ✅ Mobile (iOS Safari, Chrome Android)

---

Para más información, consulta el [README.md](README.md)

