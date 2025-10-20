# 🎉 ¡Bienvenido a tu Landing de Preventa XCLUSIV!

## ⚡ Inicio Rápido en 3 Pasos

### 1️⃣ Instalar (1 minuto)

```bash
npm install
```

### 2️⃣ Configurar (3 minutos)

```bash
# Copiar variables de entorno
cp .env.example .env.local

# Editar .env.local con tus valores
# Necesitas configurar:
# - APP_WEBHOOK_URL (de Google Apps Script)
# - APP_WEBHOOK_TOKEN (genera uno seguro)
# - APP_HASH_SALT (genera otro token seguro)
```

**Generar tokens seguros:**
```bash
# Mac/Linux
openssl rand -base64 32

# O usa: https://randomkeygen.com/
```

### 3️⃣ Iniciar (30 segundos)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) 🚀

---

## 📚 ¿Qué Leer Después?

Dependiendo de tu rol y objetivo:

| Si eres... | Lee esto | Tiempo |
|------------|----------|--------|
| 👨‍💻 **Desarrollador nuevo** | [QUICKSTART.md](QUICKSTART.md) | 10 min |
| 🎨 **Diseñador/Marketer** | [CUSTOMIZATION.md](CUSTOMIZATION.md) | 15 min |
| 🚀 **Listo para desplegar** | [DEPLOYMENT.md](DEPLOYMENT.md) | 20 min |
| 📖 **Quiero entender todo** | [README.md](README.md) | 30 min |
| 🔧 **Busco algo específico** | [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | 5 min |

---

## 🎯 Checklist Inicial

Marca cada paso cuando lo completes:

- [ ] ✅ `npm install` ejecutado
- [ ] ✅ `.env.local` creado y configurado
- [ ] ✅ Google Sheet creada
- [ ] ✅ Apps Script configurado (usa `GOOGLE_APPS_SCRIPT.js`)
- [ ] ✅ Webhook URL copiada a `.env.local`
- [ ] ✅ `npm run dev` funcionando
- [ ] ✅ Probaste el formulario
- [ ] ✅ Los datos llegan a Google Sheets

---

## 🆘 ¿Problemas?

### El servidor no inicia
```bash
# Verifica Node.js (debe ser v18+)
node --version

# Reinstala dependencias
rm -rf node_modules package-lock.json
npm install
```

### El formulario no envía datos
1. ✅ Revisa `.env.local` (variables correctas)
2. ✅ Verifica que Apps Script esté desplegado
3. ✅ Comprueba que los tokens coincidan
4. ✅ Mira la consola del navegador (F12)

### No aparecen datos en Google Sheets
1. ✅ La hoja debe llamarse "Registros"
2. ✅ Apps Script debe estar con acceso "Cualquier persona"
3. ✅ Revisa los logs en Apps Script (Ejecuciones)

---

## 🎨 Personalización Rápida

### Cambiar el nombre de la marca

Edita `lib/config.ts`:
```typescript
export const APP_CONFIG = {
  name: 'TU MARCA',  // ← Cambia aquí
  // ...
};
```

### Cambiar colores

Edita `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* tus colores */ },
}
```

Genera paletas en: [https://uicolors.app/create](https://uicolors.app/create)

### Cambiar productos

Edita `lib/types.ts`:
```typescript
export const MODELOS_DISPONIBLES = [
  { value: 'tu-producto', label: 'Nombre' },
  // ...
];
```

---

## 📁 Estructura del Proyecto

```
📦 tu-proyecto/
├── 📁 app/              ← Páginas y rutas
├── 📁 components/       ← Componentes React
├── 📁 lib/              ← Lógica y utilidades
├── 📁 public/           ← Archivos estáticos
└── 📄 *.md              ← Documentación
```

---

## 🚀 Despliegue en Vercel

Cuando estés listo para publicar:

1. **Sube a GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git push
```

2. **Despliega en Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repo de GitHub
   - Agrega las variables de entorno
   - ¡Deploy! 🎉

**Guía completa:** [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 💡 Tips

- 🎯 **Primero haz que funcione**, luego personaliza
- 📱 **Prueba en móvil** (70% del tráfico será mobile)
- 🖼️ **Usa imágenes optimizadas** (WebP, < 200KB)
- 🔍 **Configura GTM** para analytics
- 🔒 **Configura reCAPTCHA** para prevenir spam

---

## 🎓 Recursos Útiles

- [Next.js Docs](https://nextjs.org/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

---

## 📞 ¿Necesitas Ayuda?

1. 📖 Lee la documentación correspondiente (arriba)
2. 🔍 Busca en el README.md
3. 🐛 Revisa los logs (consola del navegador y Apps Script)
4. 💬 Abre un issue en GitHub (si aplica)

---

<div align="center">

## 🎉 ¡Listo para Empezar!

Ejecuta `npm run dev` y comienza a construir 🚀

**Hecho con ❤️ usando Next.js 14**

</div>

