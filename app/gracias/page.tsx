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
              <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 px-8 py-12 text-center">
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
                    Ya eres parte de la preventa exclusiva
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
                          Revisa tu email
                        </h3>
                        <p className="text-sm text-gray-600">
                          Te enviamos una confirmación con todos los detalles de
                          la preventa
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
                          Espera el lanzamiento
                        </h3>
                        <p className="text-sm text-gray-600">
                          Te avisaremos cuando la preventa esté activa para que
                          hagas tu compra
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
                          Disfruta tu descuento
                        </h3>
                        <p className="text-sm text-gray-600">
                          Accede con tu código de descuento exclusivo
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compartir */}
                <div className="rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 p-6 text-center">
                  <h3 className="mb-3 font-semibold text-primary-900">
                    🎁 Comparte y obtén más beneficios
                  </h3>
                  <p className="mb-4 text-sm text-primary-800">
                    Por cada amigo que se registre usando tu recomendación,
                    ambos obtienen 5% de descuento adicional
                  </p>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Compartir en WhatsApp
                  </a>
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

