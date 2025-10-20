import Link from 'next/link';

export default function TerminosPage() {
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
            <h1 className="heading-1 mb-4 text-white">Términos y Condiciones</h1>
            <p className="text-gray-400">Última actualización: Octubre 2025</p>
          </div>

          {/* Contenido */}
          <div className="space-y-8 text-gray-300">
            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">1. Aceptación de los Términos</h2>
              <p className="leading-relaxed">
                Al acceder y utilizar este sitio web de XCLUSIV, aceptas estar sujeto a estos términos y condiciones de uso. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestro sitio web.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">2. Preventa</h2>
              <p className="leading-relaxed mb-4">
                La preventa de productos está sujeta a las siguientes condiciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>El registro en la preventa no constituye una obligación de compra</li>
                <li>Los precios de preventa son exclusivos y no serán válidos después del período establecido</li>
                <li>Los descuentos aplican únicamente durante el período de preventa</li>
                <li>Los productos están sujetos a disponibilidad de stock</li>
                <li>XCLUSIV se reserva el derecho de cancelar pedidos en caso de inconsistencias</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">3. Propiedad Intelectual</h2>
              <p className="leading-relaxed">
                Todo el contenido de este sitio web, incluyendo diseños, logos, textos, gráficos e imágenes, 
                es propiedad de XCLUSIV y está protegido por las leyes de propiedad intelectual mexicanas e internacionales. 
                Queda prohibida su reproducción sin autorización expresa.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">4. Pagos y Facturación</h2>
              <p className="leading-relaxed mb-4">
                Los pagos se procesan de forma segura a través de nuestros proveedores de pago autorizados:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Todas las transacciones se realizan en pesos mexicanos (MXN)</li>
                <li>Los precios incluyen IVA cuando aplica</li>
                <li>Aceptamos tarjetas de crédito/débito y transferencias bancarias</li>
                <li>El cargo se realizará una vez confirmado el pedido</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">5. Envíos y Entregas</h2>
              <p className="leading-relaxed mb-4">
                Los envíos se realizan a toda la República Mexicana:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Los tiempos de entrega se informan al momento de la compra</li>
                <li>Los costos de envío varían según la ubicación</li>
                <li>Envío gratis en compras superiores a $1,299 MXN</li>
                <li>No nos hacemos responsables por retrasos causados por la paquetería</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">6. Devoluciones y Cambios</h2>
              <p className="leading-relaxed mb-4">
                Política de devoluciones:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Tienes 5 días después de recibido para notificar defectos de fabricación</li>
                <li>Las primeras 36 horas son críticas para reportar cualquier problema</li>
                <li>El producto debe estar sin usar y con etiquetas originales</li>
                <li>Los cambios están sujetos a disponibilidad de stock</li>
                <li>Los costos de envío de devolución corren por cuenta del cliente salvo defecto de fabricación</li>
              </ul>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitación de Responsabilidad</h2>
              <p className="leading-relaxed">
                XCLUSIV no será responsable de daños indirectos, incidentales o consecuentes derivados del uso 
                o la imposibilidad de usar nuestros productos o servicios. Nuestra responsabilidad se limita 
                al precio de compra del producto.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">8. Modificaciones</h2>
              <p className="leading-relaxed">
                XCLUSIV se reserva el derecho de modificar estos términos y condiciones en cualquier momento. 
                Las modificaciones serán efectivas inmediatamente después de su publicación en el sitio web. 
                Es responsabilidad del usuario revisar periódicamente estos términos.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">9. Ley Aplicable</h2>
              <p className="leading-relaxed">
                Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. 
                Cualquier disputa será resuelta en los tribunales competentes de la Ciudad de México.
              </p>
            </section>

            <section className="rounded-2xl bg-[#1a0f1a] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-4">10. Contacto</h2>
              <p className="leading-relaxed mb-4">
                Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-primary-500">Instagram:</span>
                  <a href="https://instagram.com/xclusiv_comp" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-500 transition-colors">
                    @xclusiv_comp
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
