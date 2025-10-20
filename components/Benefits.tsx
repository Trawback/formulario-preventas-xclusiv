export default function Benefits() {
  const benefits = [
    {
      icon: '🎁',
      title: 'Descuento exclusivo',
      description: 'Hasta 30% OFF en preventa para los primeros registrados',
    },
    {
      icon: '🚚',
      title: 'Envío gratis',
      description: 'En compras superiores a $100.000 en toda Colombia',
    },
    {
      icon: '⚡',
      title: 'Acceso anticipado',
      description: 'Sé el primero en comprar antes del lanzamiento oficial',
    },
    {
      icon: '🔒',
      title: 'Stock garantizado',
      description: 'Tu talla reservada sin riesgo de agotarse',
    },
    {
      icon: '💳',
      title: 'Pago seguro',
      description: 'Múltiples métodos de pago y protección del comprador',
    },
    {
      icon: '🎨',
      title: 'Edición limitada',
      description: 'Diseños únicos que no se volverán a producir',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4">¿Por qué registrarte?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Beneficios exclusivos para quienes se adelantan
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">{benefit.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

