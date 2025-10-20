import Footer from '@/components/Footer';
import { APP_CONFIG } from '@/lib/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Términos y Condiciones - ${APP_CONFIG.name}`,
  description: 'Términos y condiciones de uso y compra',
};

export default function TerminosPage() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="container-custom py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="heading-2 mb-8">Términos y Condiciones</h1>

            <div className="prose prose-gray max-w-none">
              <p className="text-sm text-gray-600">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </p>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  1. Aceptación de los Términos
                </h2>
                <p className="text-gray-700">
                  Al registrarte en la preventa de {APP_CONFIG.name}, aceptas
                  estos términos y condiciones en su totalidad. Si no estás de
                  acuerdo con estos términos, no utilices este servicio.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  2. Descripción del Servicio
                </h2>
                <p className="text-gray-700 mb-4">
                  {APP_CONFIG.name} ofrece un servicio de preventa de prendas de
                  vestir. Al registrarte:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Obtienes acceso prioritario a la compra de productos antes
                    del lanzamiento oficial
                  </li>
                  <li>Recibes descuentos exclusivos para preventa</li>
                  <li>
                    No estás obligado a realizar una compra solo por registrarte
                  </li>
                  <li>
                    Los productos están sujetos a disponibilidad de stock
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  3. Registro y Cuenta
                </h2>
                <p className="text-gray-700 mb-4">
                  Para registrarte en la preventa:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Debes proporcionar información veraz y actualizada</li>
                  <li>Debes ser mayor de 18 años</li>
                  <li>
                    Eres responsable de mantener la confidencialidad de tu
                    información
                  </li>
                  <li>Un email solo puede registrarse una vez</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  4. Precios y Pagos
                </h2>
                <p className="text-gray-700 mb-4">
                  Los precios y condiciones de pago:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Los precios están en pesos colombianos (COP) e incluyen IVA
                  </li>
                  <li>
                    Los descuentos de preventa son válidos por tiempo limitado
                  </li>
                  <li>
                    Nos reservamos el derecho de modificar precios sin previo
                    aviso
                  </li>
                  <li>
                    El pago se procesa al momento de la compra, no al registro
                  </li>
                  <li>
                    Aceptamos tarjetas de crédito/débito, PSE, y otros medios
                    electrónicos
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  5. Envíos y Entregas
                </h2>
                <p className="text-gray-700 mb-4">
                  Condiciones de envío:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>
                    Los envíos se realizan a partir de la fecha anunciada en la
                    preventa
                  </li>
                  <li>Los tiempos de entrega son estimados y no garantizados</li>
                  <li>
                    El envío es gratuito en compras superiores a $100.000 COP
                  </li>
                  <li>Realizamos envíos a toda Colombia</li>
                  <li>
                    No somos responsables de retrasos causados por la empresa de
                    mensajería
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  6. Devoluciones y Cambios
                </h2>
                <p className="text-gray-700 mb-4">
                  Política de devoluciones:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Tienes 15 días desde la recepción para cambios/devoluciones</li>
                  <li>
                    Los productos deben estar sin usar, con etiquetas originales
                  </li>
                  <li>El comprador asume el costo de envío de devolución</li>
                  <li>
                    El reembolso se procesa dentro de 5-10 días hábiles tras
                    recibir el producto
                  </li>
                  <li>
                    No se aceptan devoluciones de productos en oferta o
                    promoción especial
                  </li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  7. Propiedad Intelectual
                </h2>
                <p className="text-gray-700">
                  Todo el contenido de este sitio web, incluyendo diseños,
                  logos, textos, gráficos y código, es propiedad de{' '}
                  {APP_CONFIG.name} y está protegido por las leyes de propiedad
                  intelectual. No puedes reproducir, distribuir o modificar
                  ningún contenido sin autorización previa.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  8. Limitación de Responsabilidad
                </h2>
                <p className="text-gray-700">
                  {APP_CONFIG.name} no se hace responsable de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                  <li>
                    Errores tipográficos en la descripción de productos o
                    precios
                  </li>
                  <li>
                    Daños indirectos o consecuentes derivados del uso del
                    servicio
                  </li>
                  <li>
                    Problemas técnicos o interrupciones del servicio
                  </li>
                  <li>Uso no autorizado de tu cuenta por terceros</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  9. Cancelación de Pedidos
                </h2>
                <p className="text-gray-700">
                  Nos reservamos el derecho de cancelar pedidos en casos de:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 mt-4">
                  <li>Sospecha de fraude</li>
                  <li>Error en precios o disponibilidad</li>
                  <li>Incumplimiento de estos términos</li>
                  <li>Imposibilidad de verificar la información del comprador</li>
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  10. Modificaciones
                </h2>
                <p className="text-gray-700">
                  Nos reservamos el derecho de modificar estos términos en
                  cualquier momento. Los cambios entrarán en vigor
                  inmediatamente después de su publicación en este sitio.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  11. Ley Aplicable
                </h2>
                <p className="text-gray-700">
                  Estos términos se rigen por las leyes de la República de
                  Colombia. Cualquier disputa se resolverá en los tribunales
                  competentes de Colombia.
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  12. Contacto
                </h2>
                <p className="text-gray-700">
                  Para preguntas sobre estos términos:
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

