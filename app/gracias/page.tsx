'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Footer from '@/components/Footer';
import { buildWhatsAppShareUrl } from '@/lib/utils';
import { APP_CONFIG } from '@/lib/config';

function GraciasContent() {
  const searchParams = useSearchParams();
  const [leadId, setLeadId] = useState('');
  const [email, setEmail] = useState('');
  const [modelo, setModelo] = useState('');

  useEffect(() => {
    setLeadId(searchParams.get('lead_id') || '');
    setEmail(searchParams.get('email') || '');
    setModelo(searchParams.get('modelo') || '');
  }, [searchParams]);

  const shareText = `¡Me acabo de registrar en la preventa exclusiva de ${APP_CONFIG.name}! 🔥 Consigue hasta 30% de descuento en la nueva colección. ¡No te quedes fuera! ${APP_CONFIG.url}`;
  const shareUrl = buildWhatsAppShareUrl(shareText);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="container-custom section-padding">
          <div className="mx-auto max-w-2xl">
            {/* Success Card */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              {/* Header con confetti visual */}
              <div className="relative overflow-hidden bg-[#C30F45] px-8 py-12 text-center">
                <div className="relative z-10">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white">
                    <svg
                      className="h-10 w-10 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h1 className="mb-3 text-3xl font-bold text-white">
                    ¡Registro Exitoso!
                  </h1>
                  <p className="text-lg text-white/90">
                    Tu preventa se ah completado con éxito.
                  </p>
                </div>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-white"></div>
                  <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-white"></div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Datos del registro */}
                {email && (
                  <div className="mb-8 rounded-xl bg-gray-50 p-6">
                    <h2 className="mb-4 text-lg font-semibold text-gray-900">
                      Detalles de tu registro
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium text-gray-900">
                          {email}
                        </span>
                      </div>
                      {modelo && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Modelo favorito:</span>
                          <span className="font-medium text-gray-900">
                            {modelo}
                          </span>
                        </div>
                      )}
                      {leadId && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID de registro:</span>
                          <span className="font-mono text-xs text-gray-500">
                            {leadId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Próximos pasos */}
                <div className="mb-8">
                  <h2 className="mb-4 text-lg font-semibold text-gray-900">
                    ¿Qué sigue ahora?
                  </h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                          1
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Mantente al tanto del contacto que seleccionaste, en breve nos pondremos en contacto contigo.
                        </h3>
                        <p className="text-sm text-gray-600">
                          Nos pondremos en contacto contigo para finalizar tu compra.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                          2
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Espera tu confirmación de compra.
                        </h3>
                        <p className="text-sm text-gray-600">
                          Al finalizar tu pago, sabrás todos los detalles de tu compra.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-600">
                          3
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Bienvenido a la revolución
                        </h3>
                        <p className="text-sm text-gray-600">
                          Continua dando tu máximo y recuerda que nuestro mayor sacrificio es nuestra mejor recompensa.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA de retorno */}
                <div className="mt-8 text-center">
                  <a
                    href="/"
                    className="inline-flex items-center text-sm text-gray-600 hover:text-primary-600"
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Volver al inicio
                  </a>
                </div>
              </div>
            </div>

            {/* Additional info */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                ¿Alguna pregunta? Escríbenos a{' '}
                <a
                  href={`mailto:${APP_CONFIG.email}`}
                  className="text-primary-600 underline hover:text-primary-700"
                >
                  {APP_CONFIG.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function GraciasPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      }
    >
      <GraciasContent />
    </Suspense>
  );
}

