# 🎨 Guía de Personalización - XCLUSIV Preventa

Esta guía te muestra cómo personalizar todos los aspectos visuales y de contenido de tu landing page.

## 📝 Contenido y Textos

### Configuración General

Edita `lib/config.ts`:

```typescript
export const APP_CONFIG = {
  name: 'TU MARCA',                    // Nombre de tu marca
  tagline: 'Tu Tagline Aquí',          // Slogan de la preventa
  description: 'Descripción...',        // Descripción corta
  url: 'https://tu-dominio.com',       // URL de producción
  email: 'hola@tumarca.com',           // Email de contacto
  social: {
    instagram: 'https://instagram.com/tumarca',
    tiktok: 'https://tiktok.com/@tumarca',
  },
};
```

### SEO y Metadata

Edita `lib/config.ts`:

```typescript
export const SEO_CONFIG = {
  title: 'Tu Título SEO',
  description: 'Tu descripción para SEO (150-160 caracteres)',
  keywords: 'tus, palabras, clave, aquí',
  ogImage: '/og-image.jpg',           // Imagen para redes sociales (1200x630px)
  twitterHandle: '@tumarca',
};
```

### Hero Section

Edita `components/Hero.tsx`:

- **Línea 9**: Badge de preventa
- **Línea 15-20**: Título principal
- **Línea 23-28**: Descripción
- **Línea 32-45**: Botones CTA
- **Línea 48-64**: Estadísticas

### Modelos/Productos Disponibles

Edita `lib/types.ts`:

```typescript
export const MODELOS_DISPONIBLES = [
  { value: 'tu-producto-1', label: 'Nombre del Producto 1' },
  { value: 'tu-producto-2', label: 'Nombre del Producto 2' },
  // Agrega todos tus productos
];
```

### Tallas

Si necesitas modificar las tallas, edita `lib/types.ts`:

```typescript
export const TALLAS_DISPONIBLES = [
  { value: 'xs', label: 'XS' },
  { value: 's', label: 'S' },
  // ... tus tallas
];
```

### Guía de Tallas

Edita `components/SizeGuide.tsx` (línea 3-10):

```typescript
const sizes = [
  { size: 'XS', chest: '86-91', waist: '71-76', hip: '86-91' },
  // Actualiza con tus medidas
];
```

### FAQ (Preguntas Frecuentes)

Edita `components/FAQ.tsx` (línea 8-40):

```typescript
const faqs = [
  {
    question: '¿Tu pregunta?',
    answer: 'Tu respuesta...',
  },
  // Agrega o modifica preguntas
];
```

### Beneficios

Edita `components/Benefits.tsx` (línea 3-26):

```typescript
const benefits = [
  {
    icon: '🎁',                         // Emoji o icono
    title: 'Título del beneficio',
    description: 'Descripción...',
  },
  // Agrega o modifica beneficios
];
```

## 🎨 Diseño y Estilos

### Colores de Marca

Edita `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#faf5ff',
        100: '#f3e8ff',
        // ... hasta 900
        // Genera tus colores en: https://uicolors.app/create
      },
      secondary: {
        // Tus colores secundarios
      },
    },
  },
},
```

**Herramientas útiles:**
- [UI Colors](https://uicolors.app/create) - Generador de paletas Tailwind
- [Coolors](https://coolors.co) - Generador de paletas de colores

### Fuentes

Por defecto se usa **Inter**. Para cambiar:

1. Edita `app/layout.tsx`:

```typescript
import { TuFuente } from 'next/font/google';

const tuFuente = TuFuente({ 
  subsets: ['latin'],
  variable: '--font-tu-fuente' 
});
```

2. Usa en Tailwind: `font-tu-fuente`

**Fuentes recomendadas:**
- [Google Fonts](https://fonts.google.com/)
- Montserrat, Poppins, Raleway para brands modernas
- Playfair Display, Crimson Text para luxury

### Estilos del Botón Principal

Edita `app/globals.css` (línea 27-30):

```css
.btn-primary {
  @apply inline-flex items-center justify-center 
         rounded-lg bg-primary-600 px-6 py-3 
         text-base font-semibold text-white 
         /* personaliza aquí */;
}
```

### Animaciones

Ya incluidas en `tailwind.config.ts`:
- `animate-fade-in` - Fade in suave
- `animate-slide-up` - Slide desde abajo
- `animate-pulse-slow` - Pulse lento

Usa así:
```jsx
<div className="animate-fade-in">Contenido</div>
```

## 🖼️ Imágenes y Recursos

### Favicon

Reemplaza estos archivos en `/public`:

- `favicon.ico` (32x32px)
- `favicon-16x16.png` (16x16px)
- `apple-touch-icon.png` (180x180px)

**Generador recomendado:** [Favicon.io](https://favicon.io/)

### Open Graph Image

Crea una imagen de 1200x630px para compartir en redes sociales:

1. Diseña en [Canva](https://canva.com) o Figma
2. Guárdala como `/public/og-image.jpg`
3. Ya está configurada en el SEO

### Galería de Productos

Edita `components/Gallery.tsx` (línea 3-26):

```typescript
const items = [
  {
    id: 1,
    title: 'Nombre del Producto',
    description: 'Descripción corta',
    price: 'Desde $45.000',
    image: '/images/producto.jpg',    // Agrega tus imágenes aquí
  },
];
```

**Carpeta de imágenes:**
- Crea `/public/images/`
- Coloca tus imágenes de productos
- Formato recomendado: JPG o WebP
- Tamaño recomendado: 800x800px

## 📄 Páginas Legales

### Política de Privacidad

Edita `app/privacidad/page.tsx`:
- Personaliza cada sección con tu información
- Actualiza datos de contacto
- Ajusta según las leyes de tu país

### Términos y Condiciones

Edita `app/terminos/page.tsx`:
- Personaliza condiciones de venta
- Actualiza políticas de devolución
- Ajusta precios y métodos de pago

**Importante:** Estos son textos genéricos. Consulta con un abogado para textos legales específicos.

## 📧 Email y Notificaciones

### Configurar Email en Registro

Por defecto, solo se guardan datos en Google Sheets. Para enviar emails:

1. Agrega un servicio como [Resend](https://resend.com) o [SendGrid](https://sendgrid.com)

2. Instala el paquete:
```bash
npm install resend
```

3. Edita `app/api/register/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Después de guardar en sheets:
await resend.emails.send({
  from: 'hola@tumarca.com',
  to: data.email,
  subject: '¡Registro confirmado!',
  html: '<p>Gracias por registrarte...</p>',
});
```

## 🔔 Notificaciones a Admin

Para recibir notificación cuando alguien se registre:

Edita `app/api/register/route.ts` (después del webhook):

```typescript
// Enviar notificación a admin
await fetch('https://api.telegram.org/botTU_TOKEN/sendMessage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: 'TU_CHAT_ID',
    text: `🎉 Nuevo registro!\nEmail: ${data.email}\nModelo: ${data.modelo_favorito}`,
  }),
});
```

## 📊 Analytics Avanzado

### Facebook Pixel

Agrega en `app/layout.tsx` (dentro del `<head>`):

```tsx
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', 'TU_PIXEL_ID');
    fbq('track', 'PageView');
  `}
</Script>
```

### Eventos Personalizados

Edita `components/RegisterForm.tsx` (después del registro exitoso):

```typescript
// Google Analytics Event
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'registration', {
    method: 'form',
    lead_id: result.lead_id,
  });
}

// Facebook Pixel Event
if (typeof window !== 'undefined' && window.fbq) {
  window.fbq('track', 'Lead');
}
```

## 🌐 Internacionalización

Para múltiples idiomas:

1. Instala next-intl:
```bash
npm install next-intl
```

2. Crea archivos de traducción en `/messages/`:
   - `es.json`
   - `en.json`

3. Sigue la documentación de [next-intl](https://next-intl-docs.vercel.app/)

## 📱 PWA (Aplicación Web Progresiva)

Ya incluye `site.webmanifest`. Para mejorar:

1. Instala next-pwa:
```bash
npm install @ducanh2912/next-pwa
```

2. Configura en `next.config.js`

3. Agrega iconos en diferentes tamaños en `/public`

## 🎯 Conversión y CRO

### A/B Testing

Usa [Vercel Analytics](https://vercel.com/analytics) + Experiments:

```tsx
import { useExperiment } from '@vercel/flags/react';

const variant = useExperiment('button-color', ['red', 'blue']);
```

### Urgencia y Escasez

Edita `components/Hero.tsx` para agregar contadores:

```tsx
// Instala: npm install react-countdown
import Countdown from 'react-countdown';

<Countdown date={new Date('2024-12-31')} />
```

## 🔍 SEO Avanzado

### Schema Markup

Agrega en `app/page.tsx`:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "XCLUSIV Preventa",
      "description": "...",
      "brand": "XCLUSIV",
      "offers": {
        "@type": "Offer",
        "price": "45000",
        "priceCurrency": "COP",
      }
    })
  }}
/>
```

## 💡 Tips de Personalización

1. **Mantén la simplicidad**: No sobrecargues con información
2. **Imágenes de calidad**: Usa fotos profesionales de tus productos
3. **CTA claros**: Los botones deben decir claramente qué hacen
4. **Prueba móvil**: 70%+ del tráfico será mobile
5. **Velocidad**: Optimiza imágenes (usa WebP, max 200KB por imagen)

## 🛠️ Herramientas Útiles

- **Diseño**: [Figma](https://figma.com), [Canva](https://canva.com)
- **Colores**: [Coolors](https://coolors.co), [UI Colors](https://uicolors.app)
- **Imágenes**: [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Iconos**: [Heroicons](https://heroicons.com), [Lucide](https://lucide.dev)
- **Optimización**: [TinyPNG](https://tinypng.com), [Squoosh](https://squoosh.app)

---

**¿Necesitas más ayuda?** Consulta el README.md principal o abre un issue en GitHub.

