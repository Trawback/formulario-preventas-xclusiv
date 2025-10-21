# ⚡ Quick Start - XCLUSIV Preventa

Guía rápida para tener tu landing funcionando en **menos de 10 minutos**.

## 🚀 Pasos Rápidos

### 1. Instalar Dependencias (1 min)

```bash
npm install
```

### 2. Configurar Variables de Entorno (2 min)

Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

Genera tokens seguros (Mac/Linux):

```bash
echo "APP_WEBHOOK_TOKEN=$(openssl rand -base64 32)"
echo "APP_HASH_SALT=$(openssl rand -base64 32)"
```

O usa este generador online: [https://randomkeygen.com/](https://randomkeygen.com/)

Edita `.env.local` con tus valores:

```env
APP_WEBHOOK_URL=https://script.google.com/macros/s/TU_SCRIPT_ID/exec
APP_WEBHOOK_TOKEN=el-token-generado
APP_HASH_SALT=otro-token-generado
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Configurar Google Sheets (3 min)

**Opción A - Automática (Recomendada):**

1. Crea una [Google Sheet](https://sheets.google.com)
2. Ve a **Extensiones → Apps Script**
3. Pega el código de `GOOGLE_APPS_SCRIPT.js`
4. Ejecuta la función `setupSheet()` (esto crea automáticamente los encabezados)
5. Cambia el `AUTHORIZED_TOKEN` en el script por tu token de `.env.local`
6. **Implementar → Nueva implementación → Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
7. Copia la URL y pégala en `.env.local` como `APP_WEBHOOK_URL`

**Opción B - Manual:**

1. Crea una [Google Sheet](https://sheets.google.com)
2. Crea una hoja llamada "Registros"
3. Agrega estos encabezados en la primera fila:

```
lead_id | timestamp | nombre | apellido | email | whatsapp | prenda | talla | ciudad | cantidad_estimada | contacto | instagram_user | consent_marketing | ip_hash | utm_source | utm_medium | utm_campaign | utm_content | referer
```

4. Sigue los pasos 2-7 de la Opción A

### 4. Iniciar el Proyecto (1 min)

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

### 5. Probar el Formulario (1 min)

1. Completa el formulario en la página principal
2. Haz clic en "Reservar mi lugar"
3. Deberías ser redirigido a `/gracias`
4. Verifica que los datos aparezcan en tu Google Sheet

## ✅ Checklist Rápido

- [ ] `npm install` ejecutado
- [ ] `.env.local` creado y configurado
- [ ] Google Sheet creada con encabezados
- [ ] Apps Script desplegado
- [ ] URL del webhook copiada a `.env.local`
- [ ] `npm run dev` funcionando
- [ ] Formulario probado
- [ ] Datos llegando a Google Sheets

## 🎯 Siguiente Paso: Desplegar

Una vez que todo funcione localmente, sigue la guía de despliegue:

```bash
# Ver guía completa de deployment
cat DEPLOYMENT.md
```

## 🆘 ¿Problemas?

### El formulario no envía datos

1. Verifica que `APP_WEBHOOK_URL` esté correctamente configurada
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica los logs en Apps Script (Ejecuciones)

### Error "No autorizado"

El `APP_WEBHOOK_TOKEN` en `.env.local` debe coincidir **exactamente** con el `AUTHORIZED_TOKEN` en tu Apps Script.

### No aparecen datos en Google Sheets

1. Verifica que la hoja se llame exactamente "Registros"
2. Asegúrate de que el Apps Script esté desplegado con acceso "Cualquier persona"
3. Revisa los logs en Apps Script

## 📚 Más Información

- `README.md` - Documentación completa
- `DEPLOYMENT.md` - Guía de despliegue detallada
- `GOOGLE_APPS_SCRIPT.js` - Código del webhook

---

**¿Todo funcionando? ¡Ahora despliega en Vercel! 🚀**

```bash
# Push a GitHub
git add .
git commit -m "Initial commit"
git push

# Luego importa en Vercel desde tu repo
```

