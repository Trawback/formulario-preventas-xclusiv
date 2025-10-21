export default function Benefits() {
  const benefits = [
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4V9h16v11z"/>
          <path d="M9 13h6"/>
        </svg>
      ),
      title: 'Descuento exclusivo',
      description: 'Descuento exclusivo para los que adquieran su prenda en preventa.',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/>
          <path d="M16 8h5l3 3v5h-4"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      title: 'Envío gratis',
      description: 'En compras superiores a $1299.00 en toda la república mexicana',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
        </svg>
      ),
      title: 'Acceso anticipado',
      description: 'Sé el primero en comprar antes del lanzamiento oficial',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="11" width="14" height="10" rx="2" ry="2"/>
          <path d="M12 16a1 1 0 100-2 1 1 0 000 2z"/>
          <path d="M8 11V7a4 4 0 118 0v4"/>
        </svg>
      ),
      title: 'Stock garantizado',
      description: 'Tu talla reservada sin riesgo de agotarse',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <path d="M2 10h20"/>
        </svg>
      ),
      title: 'Pago seguro',
      description: 'Múltiples métodos de pago y protección del comprador',
    },
    {
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="#C30F45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
      title: 'Colección única',
      description: 'Diseños únicos que no se volverán a producir',
    },
  ];

  return (
    <section id="beneficios" className="section-padding bg-[#231123]">
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
              <div className="mb-4 transform transition-transform duration-300 hover:scale-110">{benefit.icon}</div>
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

