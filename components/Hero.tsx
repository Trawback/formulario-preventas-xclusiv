import Image from 'next/image';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#231123]">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -right-40 -bottom-40 h-96 w-96 rounded-full bg-primary-600/15 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-2xl"></div>
      </div>

      <div className="container-custom relative z-10 py-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Logo XCLUSIV */}
          <div className="mb-6 flex justify-center animate-fade-in">
            <Image
              src="/Resources/Logo Xclusiv Principal.png"
              alt="XCLUSIV Logo"
              width={100}
              height={27}
              priority
              className="h-auto w-24 md:w-28 lg:w-32"
            />
          </div>

          {/* Badge superior con animación */}
          <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border-2 border-[#C30F45] bg-[#C30F45]/20 backdrop-blur-sm px-6 py-3 shadow-lg shadow-[#C30F45]/25">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C30F45] opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[#C30F45]"></span>
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              Preventa Exclusiva • CDMX 2025
            </span>
          </div>

          {/* Título principal con gradiente */}
          <h1 className="mb-6 animate-slide-up">
            <span className="mb-3 block text-4xl font-black uppercase tracking-tight text-white md:text-6xl lg:text-7xl">
              Inspirada en
            </span>
            <span className="block bg-gradient-to-r from-[#C30F45] via-primary-600 to-purple-600 bg-clip-text text-6xl font-black uppercase tracking-tighter text-transparent md:text-7xl lg:text-8xl xl:text-9xl">
              HYROX CDMX
            </span>
          </h1>

          {/* Descripción con mejor legibilidad */}
          <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-gray-300 md:text-xl lg:text-2xl">
            Registrate  <span className="font-black text-white">en esta preventa</span> y asegura tu prenda.
            <br className="hidden sm:block" />
            <span className="text-[#C30F45]">Diseñado para atletas</span> que buscan cambiar el mundo.
          </p>

          {/* CTA principal con mejor UX */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a 
              href="#registro-form" 
              className="btn-primary group text-lg animate-pulse-glow bg-[#C30F45]"
              aria-label="Ir al formulario de registro"
            >
              <span>Registrarme</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>

          {/* Trust indicators con microinteracciones */}
          <div className="mt-20 grid grid-cols-3 gap-6 lg:gap-12">
            <div className="group transform transition-all duration-300 hover:-translate-y-1">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C30F45] to-primary-600 shadow-lg shadow-[#C30F45]/50 transition-all group-hover:shadow-xl">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-3xl font-black text-white lg:text-4xl">50+</p>
              <p className="mt-1 text-sm font-semibold text-gray-400">Pre-registros</p>
            </div>

            <div className="group transform transition-all duration-300 hover:-translate-y-1">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C30F45] to-primary-600 shadow-lg shadow-[#C30F45]/50 transition-all group-hover:shadow-xl">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-3xl font-black text-white lg:text-4xl">10 días</p>
              <p className="mt-1 text-sm font-semibold text-gray-400">de preventa</p>
            </div>

            <div className="group transform transition-all duration-300 hover:-translate-y-1">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C30F45] to-primary-600 shadow-lg shadow-[#C30F45]/50 transition-all group-hover:shadow-xl">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-3xl font-black text-white lg:text-4xl">1/1</p>
              <p className="mt-1 text-sm font-semibold text-gray-400">Edición limitada</p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <a href="#registro-form" className="inline-flex flex-col items-center gap-2 text-gray-400 transition-colors hover:text-[#C30F45]">
              <span className="text-xs font-semibold uppercase tracking-wider">Desliza para registrarte</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
