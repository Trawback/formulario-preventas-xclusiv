import Link from 'next/link';

export default function PrivacidadPage() {
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
            <h1 className="heading-1 mb-4 text-white">Política de Privacidad</h1>
            <p className="text-gray-400">Última actualización: Octubre 2024</p>
          </div>

          {/* Contenido */}
          <div className="space-y-8 text-gray-300">
            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Información que Recopilamos</h2>
              <p className="leading-relaxed mb-4">
                En XCLUSIV recopilamos la siguiente información cuando te registras en nuestra preventa:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Información personal:</strong> Nombre, apellido, correo electrónico</li>
                <li><strong className="text-white">Información de contacto:</strong> Número de WhatsApp, usuario de Instagram (opcional)</li>
                <li><strong className="text-white">Información de preferencias:</strong> Talla, cantidad estimada de productos</li>
                <li><strong className="text-white">Información de ubicación:</strong> Estado/ciudad</li>
                <li><strong className="text-white">Información técnica:</strong> Dirección IP, tipo de navegador, parámetros UTM</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Cómo Utilizamos tu Información</h2>
              <p className="leading-relaxed mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Procesar tu registro en la preventa</li>
                <li>Contactarte sobre el estado de tu preventa</li>
                <li>Enviarte información sobre productos y promociones (si aceptaste marketing)</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Prevenir fraudes y garantizar la seguridad</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Base Legal para el Tratamiento</h2>
              <p className="leading-relaxed mb-4">
                Procesamos tus datos personales bajo las siguientes bases legales:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Consentimiento:</strong> Al registrarte, aceptas que procesemos tus datos</li>
                <li><strong className="text-white">Ejecución de contrato:</strong> Para procesar tu preventa y entrega</li>
                <li><strong className="text-white">Interés legítimo:</strong> Para mejorar nuestros servicios y prevenir fraudes</li>
                <li><strong className="text-white">Cumplimiento legal:</strong> Para cumplir con obligaciones fiscales y legales</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Compartir Información</h2>
              <p className="leading-relaxed mb-4">
                Podemos compartir tu información con:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Proveedores de servicios:</strong> Para procesamiento de pagos, envíos y hosting</li>
                <li><strong className="text-white">Servicios de análisis:</strong> Google Analytics, Tag Manager</li>
                <li><strong className="text-white">Autoridades:</strong> Cuando sea requerido por ley</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Nunca vendemos tu información personal a terceros.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Cookies y Tecnologías Similares</h2>
              <p className="leading-relaxed mb-4">
                Utilizamos cookies y tecnologías similares para:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Recordar tus preferencias</li>
                <li>Analizar el uso del sitio web</li>
                <li>Mejorar la experiencia de usuario</li>
                <li>Rastrear campañas de marketing</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Puedes gestionar las cookies a través de la configuración de tu navegador. 
                Consulta nuestra <Link href="/cookies" className="text-primary-500 hover:text-primary-400">Política de Cookies</Link> para más información.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Seguridad de los Datos</h2>
              <p className="leading-relaxed">
                Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos personales:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Encriptación SSL/TLS para todas las comunicaciones</li>
                <li>Hashing de direcciones IP</li>
                <li>Almacenamiento seguro en servidores protegidos</li>
                <li>Acceso restringido a datos personales</li>
                <li>Monitoreo continuo de seguridad</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Tus Derechos (ARCO)</h2>
              <p className="leading-relaxed mb-4">
                Conforme a la Ley Federal de Protección de Datos Personales en Posesión de Particulares, tienes derecho a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong className="text-white">Acceso:</strong> Conocer qué datos personales tenemos sobre ti</li>
                <li><strong className="text-white">Rectificación:</strong> Solicitar la corrección de datos inexactos</li>
                <li><strong className="text-white">Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                <li><strong className="text-white">Oposición:</strong> Oponerte al tratamiento de tus datos</li>
                <li><strong className="text-white">Revocación:</strong> Retirar tu consentimiento en cualquier momento</li>
                <li><strong className="text-white">Portabilidad:</strong> Recibir una copia de tus datos en formato estructurado</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Para ejercer estos derechos, contáctanos en: <a href="mailto:privacidad@xclusiv.com" className="text-primary-500 hover:text-primary-400">privacidad@xclusiv.com</a>
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Retención de Datos</h2>
              <p className="leading-relaxed">
                Conservamos tus datos personales durante el tiempo necesario para cumplir con los fines descritos 
                en esta política, o según lo requiera la ley mexicana. Típicamente:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                <li>Datos de clientes activos: Durante la relación comercial</li>
                <li>Datos de marketing: Hasta que retires tu consentimiento</li>
                <li>Datos fiscales: 5 años según la legislación mexicana</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Transferencias Internacionales</h2>
              <p className="leading-relaxed">
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera de México. 
                Cuando transferimos datos internacionalmente, nos aseguramos de que existan las salvaguardas 
                adecuadas conforme a la legislación mexicana.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Menores de Edad</h2>
              <p className="leading-relaxed">
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente 
                información de menores. Si eres padre/madre y crees que tu hijo nos ha proporcionado información, 
                contáctanos para eliminarla.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">11. Cambios a esta Política</h2>
              <p className="leading-relaxed">
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos de cambios 
                significativos mediante un aviso en nuestro sitio web o por correo electrónico. 
                Te recomendamos revisar esta política periódicamente.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">12. Contacto</h2>
              <p className="leading-relaxed mb-4">
                Si tienes preguntas sobre esta política de privacidad o deseas ejercer tus derechos ARCO:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">Email de Privacidad:</span>
                  <a href="mailto:privacidad@xclusiv.com" className="text-white hover:text-primary-500 transition-colors">
                    privacidad@xclusiv.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">Email General:</span>
                  <a href="mailto:contacto@xclusiv.com" className="text-white hover:text-primary-500 transition-colors">
                    contacto@xclusiv.com
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
