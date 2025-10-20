import Footer from '@/components/Footer';
import { APP_CONFIG } from '@/lib/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Política de Privacidad - ${APP_CONFIG.name}`,
  description: 'Política de privacidad y tratamiento de datos personales',
};

export default function PrivacidadPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="container-custom py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="heading-2 mb-8">Política de Privacidad</h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  1. Información que Recopilamos
                </h2>
                <p className="text-gray-700 mb-4">
                  En {APP_CONFIG.name}, recopilamos la siguiente información
                  cuando te registras en nuestra preventa:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Email (obligatorio)</li>
                  <li>Número de WhatsApp (opcional)</li>
                  <li>Ciudad de residencia (opcional)</li>
                  <li>Preferencias de productos y tallas</li>
                  <li>
                    Información técnica: dirección IP (hasheada), navegador,
                    dispositivo
                  </li>
                  <li>
                    Parámetros UTM para análisis de marketing (si aplica)
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  2. Uso de la Información
                </h2>
                <p className="text-gray-700 mb-4">
                  Utilizamos tu información para:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Gestionar tu registro en la preventa y procesar tu compra
                  </li>
                  <li>
                    Enviarte comunicaciones sobre la preventa y lanzamiento de
                    productos
                  </li>
                  <li>
                    Personalizar tu experiencia y mostrarte contenido relevante
                  </li>
                  <li>Mejorar nuestros productos y servicios</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  3. Compartir Información
                </h2>
                <p className="text-gray-700 mb-4">
                  No vendemos ni compartimos tu información personal con
                  terceros para fines de marketing. Podemos compartir
                  información con:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Proveedores de servicios (hosting, email, procesamiento de
                    pagos)
                  </li>
                  <li>
                    Autoridades legales cuando sea requerido por ley
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  4. Seguridad de los Datos
                </h2>
                <p className="text-gray-700">
                  Implementamos medidas de seguridad técnicas y organizativas
                  para proteger tu información personal contra acceso no
                  autorizado, pérdida o alteración. Esto incluye el hash de
                  direcciones IP, cifrado de datos en tránsito y almacenamiento
                  seguro.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  5. Tus Derechos
                </h2>
                <p className="text-gray-700 mb-4">Tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Acceder a tu información personal</li>
                  <li>Corregir datos inexactos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                  <li>Retirar tu consentimiento en cualquier momento</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Para ejercer estos derechos, contáctanos en{' '}
                  <a
                    href={`mailto:${APP_CONFIG.email}`}
                    className="text-primary-600 underline"
                  >
                    {APP_CONFIG.email}
                  </a>
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  6. Cookies y Tecnologías Similares
                </h2>
                <p className="text-gray-700">
                  Utilizamos cookies y tecnologías similares (como Google
                  Analytics y reCAPTCHA) para mejorar tu experiencia, analizar
                  el uso del sitio y prevenir fraude. Puedes configurar tu
                  navegador para rechazar cookies, aunque esto puede afectar la
                  funcionalidad del sitio.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  7. Retención de Datos
                </h2>
                <p className="text-gray-700">
                  Mantenemos tu información personal durante el tiempo necesario
                  para cumplir con los fines descritos en esta política, o según
                  lo requiera la ley.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  8. Menores de Edad
                </h2>
                <p className="text-gray-700">
                  Nuestro servicio no está dirigido a menores de 18 años. No
                  recopilamos intencionalmente información de menores de edad.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  9. Cambios a esta Política
                </h2>
                <p className="text-gray-700">
                  Podemos actualizar esta política de privacidad ocasionalmente.
                  Te notificaremos sobre cambios significativos publicando la
                  nueva política en esta página.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  10. Contacto
                </h2>
                <p className="text-gray-700">
                  Si tienes preguntas sobre esta política de privacidad,
                  contáctanos:
                </p>
                <ul className="list-none space-y-2 text-gray-700 mt-4">
                  <li>
                    Email:{' '}
                    <a
                      href={`mailto:${APP_CONFIG.email}`}
                      className="text-primary-600 underline"
                    >
                      {APP_CONFIG.email}
                    </a>
                  </li>
                  <li>Empresa: {APP_CONFIG.name}</li>
                </ul>
              </section>
            </div>

            <div className="mt-12 text-center">
              <a href="/" className="btn-primary">
                Volver al inicio
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

