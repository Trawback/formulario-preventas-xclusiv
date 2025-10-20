import Link from 'next/link';

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[#231123] py-20">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 transition-colors mb-6"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al inicio
            </Link>
            <h1 className="heading-1 mb-4 text-white">Política de Cookies</h1>
            <p className="text-gray-400">Última actualización: Octubre 2024</p>
          </div>

          {/* Contenido */}
          <div className="space-y-8 text-gray-300">
            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">¿Qué son las Cookies?</h2>
              <p className="leading-relaxed">
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. 
                Se utilizan ampliamente para hacer que los sitios web funcionen de manera más eficiente, así como para 
                proporcionar información a los propietarios del sitio.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">¿Cómo Utilizamos las Cookies?</h2>
              <p className="leading-relaxed mb-4">
                XCLUSIV utiliza cookies para mejorar tu experiencia en nuestro sitio web. Las cookies nos ayudan a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Recordar tus preferencias y configuraciones</li>
                <li>Entender cómo usas nuestro sitio web</li>
                <li>Mejorar el rendimiento y la funcionalidad del sitio</li>
                <li>Personalizar contenido y anuncios</li>
                <li>Proporcionar funciones de redes sociales</li>
                <li>Analizar el tráfico del sitio</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Tipos de Cookies que Utilizamos</h2>
              
              <div className="space-y-6">
                {/* Cookies Esenciales */}
                <div className="border-l-4 border-primary-500 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2">1. Cookies Esenciales</h3>
                  <p className="text-sm text-gray-400 mb-2">Necesarias para el funcionamiento del sitio</p>
                  <p className="leading-relaxed mb-3">
                    Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas.
                  </p>
                  <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                    <p className="text-sm"><strong className="text-white">Ejemplos:</strong></p>
                    <ul className="text-sm list-disc list-inside ml-2 mt-2 space-y-1">
                      <li><code className="text-primary-400">cookie_consent</code> - Recuerda tu preferencia de cookies</li>
                      <li><code className="text-primary-400">session_id</code> - Mantiene tu sesión activa</li>
                    </ul>
                    <p className="text-sm mt-2"><strong className="text-white">Duración:</strong> Sesión / 1 año</p>
                  </div>
                </div>

                {/* Cookies Analíticas */}
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2">2. Cookies Analíticas</h3>
                  <p className="text-sm text-gray-400 mb-2">Nos ayudan a entender cómo los visitantes usan el sitio</p>
                  <p className="leading-relaxed mb-3">
                    Estas cookies nos permiten contar visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio.
                  </p>
                  <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                    <p className="text-sm"><strong className="text-white">Proveedor:</strong> Google Analytics</p>
                    <p className="text-sm mt-2"><strong className="text-white">Ejemplos:</strong></p>
                    <ul className="text-sm list-disc list-inside ml-2 mt-2 space-y-1">
                      <li><code className="text-blue-400">_ga</code> - Distingue usuarios</li>
                      <li><code className="text-blue-400">_gid</code> - Distingue usuarios</li>
                      <li><code className="text-blue-400">_gat</code> - Limita solicitudes</li>
                    </ul>
                    <p className="text-sm mt-2"><strong className="text-white">Duración:</strong> 2 años / 24 horas / 1 minuto</p>
                  </div>
                </div>

                {/* Cookies de Marketing */}
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2">3. Cookies de Marketing</h3>
                  <p className="text-sm text-gray-400 mb-2">Rastrean tu actividad para personalizar anuncios</p>
                  <p className="leading-relaxed mb-3">
                    Estas cookies pueden ser establecidas por nosotros o por terceros para crear un perfil de tus intereses.
                  </p>
                  <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                    <p className="text-sm"><strong className="text-white">Proveedor:</strong> Google Tag Manager, Facebook Pixel</p>
                    <p className="text-sm mt-2"><strong className="text-white">Ejemplos:</strong></p>
                    <ul className="text-sm list-disc list-inside ml-2 mt-2 space-y-1">
                      <li><code className="text-purple-400">_fbp</code> - Facebook Pixel</li>
                      <li><code className="text-purple-400">fr</code> - Facebook ads</li>
                    </ul>
                    <p className="text-sm mt-2"><strong className="text-white">Duración:</strong> 3 meses / 90 días</p>
                  </div>
                </div>

                {/* Cookies de Funcionalidad */}
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-xl font-bold text-white mb-2">4. Cookies de Funcionalidad</h3>
                  <p className="text-sm text-gray-400 mb-2">Permiten funciones mejoradas y personalización</p>
                  <p className="leading-relaxed mb-3">
                    Estas cookies permiten que el sitio web proporcione funcionalidad y personalización mejoradas.
                  </p>
                  <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                    <p className="text-sm"><strong className="text-white">Ejemplos:</strong></p>
                    <ul className="text-sm list-disc list-inside ml-2 mt-2 space-y-1">
                      <li><code className="text-green-400">preferred_size</code> - Recuerda tu talla favorita</li>
                      <li><code className="text-green-400">language_preference</code> - Idioma preferido</li>
                    </ul>
                    <p className="text-sm mt-2"><strong className="text-white">Duración:</strong> 6 meses / 1 año</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Cookies de Terceros</h2>
              <p className="leading-relaxed mb-4">
                Además de nuestras propias cookies, utilizamos cookies de terceros para los siguientes propósitos:
              </p>
              <div className="space-y-4">
                <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Google Analytics</h4>
                  <p className="text-sm">Analiza el uso del sitio web</p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 text-sm">
                    Ver Política de Privacidad →
                  </a>
                </div>
                <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">Google Tag Manager</h4>
                  <p className="text-sm">Gestiona etiquetas de marketing</p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 text-sm">
                    Ver Política de Privacidad →
                  </a>
                </div>
                <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">reCAPTCHA</h4>
                  <p className="text-sm">Protege contra spam y bots</p>
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 text-sm">
                    Ver Política de Privacidad →
                  </a>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Gestión de Cookies</h2>
              <p className="leading-relaxed mb-4">
                Tienes derecho a decidir si aceptas o rechazas las cookies. Puedes ejercer tus preferencias de cookies de varias maneras:
              </p>
              
              <div className="space-y-4">
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">🍪 Banner de Cookies</h4>
                  <p className="text-sm">
                    Al visitar nuestro sitio por primera vez, verás un banner donde puedes aceptar o rechazar cookies no esenciales.
                  </p>
                </div>

                <div className="bg-[#0f0a0f]/50 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">⚙️ Configuración del Navegador</h4>
                  <p className="text-sm mb-3">Puedes configurar tu navegador para rechazar cookies:</p>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                    <li>• <strong>Firefox:</strong> Opciones → Privacidad y Seguridad → Cookies</li>
                    <li>• <strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                    <li>• <strong>Edge:</strong> Configuración → Cookies y permisos</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-sm text-yellow-200">
                  ⚠️ <strong>Nota:</strong> Si deshabilitas las cookies, algunas partes de nuestro sitio web pueden no funcionar correctamente.
                </p>
              </div>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">¿Con Qué Frecuencia Actualizaremos Esta Política?</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta Política de Cookies de vez en cuando para reflejar cambios en las cookies que utilizamos 
                o por otras razones operativas, legales o reglamentarias. Te notificaremos de cualquier cambio material mediante 
                un aviso en nuestro sitio web.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Más Información</h2>
              <p className="leading-relaxed mb-4">
                Si tienes preguntas sobre nuestro uso de cookies, puedes contactarnos:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">📧 Email:</span>
                  <a href="mailto:privacidad@xclusiv.com" className="text-white hover:text-primary-500 transition-colors">
                    privacidad@xclusiv.com
                  </a>
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Para más información sobre cómo procesamos tus datos personales, consulta nuestra{' '}
                <Link href="/privacidad" className="text-primary-500 hover:text-primary-400">
                  Política de Privacidad
                </Link>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

