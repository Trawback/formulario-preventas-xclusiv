'use client';

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Cuándo comienza la preventa?',
      answer:
        'La preventa inicia el 1 de noviembre de 2024 y estará disponible durante tiempo limitado o hasta agotar stock.',
    },
    {
      question: '¿Cuál es el descuento de preventa?',
      answer:
        'Los primeros 500 registrados obtienen 30% de descuento. Después, el descuento será del 20% hasta finalizar la preventa.',
    },
    {
      question: '¿Cuándo recibiré mi pedido?',
      answer:
        'Los envíos se realizarán a partir del 15 de diciembre de 2024. Recibirás tracking una vez despachado tu pedido.',
    },
    {
      question: '¿Puedo devolver mi pedido?',
      answer:
        'Sí, tienes 15 días desde que recibes tu pedido para hacer cambios o devoluciones. El producto debe estar sin usar y con etiquetas.',
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer:
        'Aceptamos tarjetas de crédito/débito, PSE, Nequi, Daviplata y transferencias bancarias.',
    },
    {
      question: '¿El registro me obliga a comprar?',
      answer:
        'No, el registro solo te da acceso prioritario y el descuento. No hay obligación de compra.',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4">Preguntas Frecuentes</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Resolvemos tus dudas sobre la preventa
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                >
                  <span className="pr-8 text-lg font-semibold text-gray-900">
                    {faq.question}
                  </span>
                  <svg
                    className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform ${
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
                  <div className="border-t border-gray-100 px-6 pb-6 pt-4">
                    <p className="text-gray-600">{faq.answer}</p>
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

