export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 section-padding">
      <div className="container-custom">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-semibold text-primary-700">
            <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-primary-600"></span>
            Preventa Exclusiva • Cupos Limitados
          </div>

          {/* Heading */}
          <h1 className="heading-1 mb-6 animate-fade-in">
            Nueva Colección
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              XCLUSIV 2025
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 animate-slide-up md:text-xl">
            Sé de los primeros en conseguir las prendas más exclusivas.
            Registrate ahora y asegura tu lugar en nuestra preventa con
            descuentos especiales.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#registro-form" className="btn-primary text-lg">
              Reservar mi lugar
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
            <a href="#galeria" className="btn-secondary text-lg">
              Ver colección
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-gray-200 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary-600">2.5K+</p>
              <p className="text-sm text-gray-600">Registrados</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600">-30%</p>
              <p className="text-sm text-gray-600">Descuento</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary-600">48h</p>
              <p className="text-sm text-gray-600">Quedan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 top-0 -z-10 h-96 w-96 animate-pulse-slow rounded-full bg-primary-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 -z-10 h-96 w-96 animate-pulse-slow rounded-full bg-secondary-200 opacity-20 blur-3xl"></div>
    </section>
  );
}

