export default function Benefits() {
  const benefits = [
    {
      icon: '🎁',
      title: 'Descuento exclusivo',
      description: 'Descuento exclusivo para los que adquieran su prenda en preventa.',
    },
    {
      icon: '🚚',
      title: 'Envío gratis',
      description: 'En compras superiores a $1299.00 en toda la república mexicana',
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
      title: 'Colección única',
      description: 'Diseños únicos que no se volverán a producir',
    },
  ];

  return (
    <section className="section-padding bg-[#231123]">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4 text-white">¿Por qué registrarte?</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Beneficios exclusivos para quienes se adelantan
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-[#1a0f1a] p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 hover:border-primary-500/50"
            >
              <div className="mb-4 text-5xl">{benefit.icon}</div>
              <h3 className="mb-2 text-xl font-bold text-white">
                {benefit.title}
              </h3>
              <p className="text-gray-400">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

