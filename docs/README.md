# 📚 Documentación del Proyecto XCLUSIV

Bienvenido a la documentación del proyecto de preventa XCLUSIV.

## 🚀 Comenzar

Si es tu primera vez con el proyecto, sigue estos pasos en orden:

1. **[START_HERE.md](./START_HERE.md)** - Punto de inicio, overview del proyecto
2. **[QUICKSTART.md](./QUICKSTART.md)** - Guía rápida de instalación y configuración
3. **[SETUP_APPS_SCRIPT.md](./SETUP_APPS_SCRIPT.md)** - Configuración de Google Apps Script paso a paso

## 📖 Documentación Adicional

- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Estructura completa del proyecto
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía de despliegue a producción
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Cómo probar el formulario y webhook
- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

## 🏗️ Arquitectura

```
formulario-xclusiv/
├── app/                    # Next.js App Router
│   ├── api/register/      # API endpoint de registro
│   ├── gracias/           # Página de confirmación
│   └── ...                # Páginas y layouts
├── components/            # Componentes React
├── lib/                   # Utilidades y servicios
│   ├── constants/        # Constantes centralizadas
│   ├── services/         # Servicios (webhook, etc)
│   ├── config.ts         # Configuración de la app
│   ├── types.ts          # Tipos TypeScript
│   └── utils.ts          # Funciones utilitar ias
├── public/               # Archivos estáticos
└── scripts/              # Scripts de utilidad
```

## 🔧 Tecnologías

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Formularios**: React Hook Form + Zod
- **Animaciones**: Framer Motion
- **Backend**: Next.js API Routes
- **Base de datos**: Google Sheets (via Apps Script)
- **Validación**: reCAPTCHA v3 (opcional)

## 📞 Soporte

Para problemas o preguntas, consulta primero la [guía de testing](./TESTING_GUIDE.md) para solucionar problemas comunes.

