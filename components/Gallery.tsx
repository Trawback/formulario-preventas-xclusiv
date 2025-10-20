export default function Gallery() {
  const items = [
    {
      id: 1,
      title: 'Oversized Tee',
      description: 'Algodón premium 100%',
      price: 'Desde $45.000',
      image: '/images/tee.jpg',
    },
    {
      id: 2,
      title: 'Crop Top',
      description: 'Diseño exclusivo',
      price: 'Desde $38.000',
      image: '/images/crop.jpg',
    },
    {
      id: 3,
      title: 'Hoodie Classic',
      description: 'Confort y estilo',
      price: 'Desde $85.000',
      image: '/images/hoodie.jpg',
    },
    {
      id: 4,
      title: 'Joggers Premium',
      description: 'Máxima comodidad',
      price: 'Desde $75.000',
      image: '/images/joggers.jpg',
    },
  ];

  return (
    <section id="galeria" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4">La Colección</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Descubre las piezas más exclusivas diseñadas para quienes no siguen
            tendencias, las crean.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden bg-gray-200">
                {/* Placeholder - reemplazar con imágenes reales */}
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
                  <span className="text-4xl font-bold text-primary-600">
                    {item.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="mb-3 text-sm text-gray-600">
                  {item.description}
                </p>
                <p className="text-lg font-semibold text-primary-600">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

