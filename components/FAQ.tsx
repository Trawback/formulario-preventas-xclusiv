'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuándo comienza la preventa?',
      answer:
        'La preventa inicia el 28 de Octubre de 2025 y estará disponible durante tiempo limitado o hasta agotar stock.',
    },
    {
      question: '¿Cuál es el descuento de preventa?',
      answer:
        'Los primeros 100 registrados obtienen un descuento exclusivo de $150 mxn.',
    },
    {
      question: '¿Cuándo recibiré mi pedido?',
      answer:
        'Una vez confirmada tu preventa, te contactaremos por el método de contacto que seleccionaste en el formulario para explicarte el proceso de envío.',
    },
    {
      question: '¿Puedo devolver mi pedido?',
      answer:
        'Sí, el pedido puede ser devuelto hasta 5 días después de recibido únicamente si es defecto de fabricación y se notifica en las primeras 36hrs de recibido..',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos tarjetas de crédito/débito y transferencias bancarias.',
    },
  ];

  return (
    <section id="faq" className="section-padding bg-[#231123]">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4 text-white">Preguntas Frecuentes</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Resolvemos tus dudas sobre la preventa
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#1a0f1a] shadow-lg shadow-primary-500/5 transition-all duration-300 hover:border-primary-500/50"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-white/5"
                >
                  <span className="pr-8 text-lg font-semibold text-white">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-primary-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-4 bg-[#0f0a0f]/50">
                    <p className="text-gray-300">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

