import Link from 'next/link';

export default function AccesibilidadPage() {
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
            <h1 className="heading-1 mb-4 text-white">Declaración de Accesibilidad</h1>
            <p className="text-gray-400">Nuestro compromiso con la accesibilidad web</p>
          </div>

          {/* Contenido */}
          <div className="space-y-8 text-gray-300">
            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Nuestro Compromiso</h2>
              <p className="leading-relaxed">
                En XCLUSIV nos comprometemos a garantizar la accesibilidad digital para personas con discapacidades. 
                Continuamente mejoramos la experiencia de usuario para todos y aplicamos los estándares de accesibilidad relevantes.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Medidas Implementadas</h2>
              <p className="leading-relaxed mb-4">
                XCLUSIV toma las siguientes medidas para garantizar la accesibilidad:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Incluimos la accesibilidad como parte de nuestra misión</li>
                <li>Integramos la accesibilidad en nuestras políticas internas</li>
                <li>Asignamos objetivos y responsabilidades claras de accesibilidad</li>
                <li>Empleamos métodos formales de aseguramiento de calidad de accesibilidad</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Estado de Conformidad</h2>
              <p className="leading-relaxed mb-4">
                Las Pautas de Accesibilidad para el Contenido Web (WCAG) definen requisitos para diseñadores y 
                desarrolladores para mejorar la accesibilidad para personas con discapacidades. Define tres niveles 
                de conformidad: Nivel A, Nivel AA y Nivel AAA.
              </p>
              <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4">
                <p className="font-semibold text-white">
                  Este sitio web cumple parcialmente con WCAG 2.1 nivel AA.
                </p>
                <p className="text-sm mt-2">
                  Parcialmente conforme significa que algunas partes del contenido no cumplen totalmente con el estándar de accesibilidad.
                </p>
              </div>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Características de Accesibilidad</h2>
              <p className="leading-relaxed mb-4">
                Nuestro sitio web incluye las siguientes características de accesibilidad:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Navegación por teclado:</strong> Todo el sitio es navegable usando solo el teclado</li>
                <li><strong className="text-white">Estados de foco visibles:</strong> Los elementos interactivos tienen indicadores de foco claros</li>
                <li><strong className="text-white">Contraste de color:</strong> Cumplimos con los ratios mínimos de contraste WCAG AA</li>
                <li><strong className="text-white">Texto alternativo:</strong> Las imágenes incluyen descripciones alternativas</li>
                <li><strong className="text-white">Etiquetas ARIA:</strong> Usamos atributos ARIA para mejorar la experiencia con lectores de pantalla</li>
                <li><strong className="text-white">Tipografía legible:</strong> Usamos fuentes claras con tamaños adecuados</li>
                <li><strong className="text-white">Formularios accesibles:</strong> Todos los campos tienen etiquetas descriptivas</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Tecnologías Compatibles</h2>
              <p className="leading-relaxed mb-4">
                Este sitio web está diseñado para ser compatible con las siguientes tecnologías asistivas:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Lectores de pantalla (JAWS, NVDA, VoiceOver)</li>
                <li>Software de magnificación de pantalla</li>
                <li>Software de reconocimiento de voz</li>
                <li>Navegación por teclado</li>
                <li>Navegadores modernos con soporte para accesibilidad</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Limitaciones Conocidas</h2>
              <p className="leading-relaxed mb-4">
                A pesar de nuestros mejores esfuerzos, pueden existir algunas limitaciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Contenido de terceros:</strong> Algunos widgets o integraciones pueden no ser totalmente accesibles</li>
                <li><strong className="text-white">Contenido multimedia:</strong> Algunas imágenes de productos pueden carecer de descripciones detalladas</li>
                <li><strong className="text-white">Documentos descargables:</strong> PDFs antiguos pueden no cumplir con estándares de accesibilidad</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Estamos trabajando activamente para resolver estas limitaciones.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Evaluación y Pruebas</h2>
              <p className="leading-relaxed mb-4">
                La accesibilidad de este sitio web ha sido evaluada mediante:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Auto-evaluación interna</li>
                <li>Herramientas automatizadas de pruebas de accesibilidad</li>
                <li>Pruebas manuales con lectores de pantalla</li>
                <li>Pruebas de navegación por teclado</li>
                <li>Verificación de contraste de color</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Feedback y Asistencia</h2>
              <p className="leading-relaxed mb-4">
                Agradecemos tus comentarios sobre la accesibilidad de este sitio web. Si encuentras barreras de accesibilidad:
              </p>
              <ul className="space-y-4">
                <li>
                  <div className="flex items-start gap-2">
                    <div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-2">
                    <span className="text-primary-500 mt-1">📱</span>
                    <div>
                      <p className="font-semibold text-white">Instagram:</p>
                      <a href="https://instagram.com/xclusivcomp" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:text-primary-400 transition-colors">
                        @xclusivcomp
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Intentamos responder a los comentarios de accesibilidad en un plazo de 2 días hábiles.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Proceso de Quejas</h2>
              <p className="leading-relaxed mb-4">
                Si no estás satisfecho con nuestra respuesta:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Envía una queja formal a accesibilidad@xclusiv.com</li>
                <li>Recibirás acuse de recibo en 24 horas</li>
                <li>Investigaremos y responderemos en un plazo de 10 días hábiles</li>
                <li>Si no estás satisfecho, puedes escalar a nuestro gerente de accesibilidad</li>
              </ol>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Aprobación y Actualización</h2>
              <p className="leading-relaxed">
                Esta declaración de accesibilidad fue aprobada el 20 de octubre de 2024 por el equipo de XCLUSIV.
                <br /><br />
                Esta declaración se revisa y actualiza periódicamente para reflejar mejoras continuas en la accesibilidad del sitio web.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

