import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Benefits from '@/components/Benefits';
import FAQ from '@/components/FAQ';
import RegisterForm from '@/components/RegisterForm';
import Footer from '@/components/Footer';
import ScrollIndicator from '@/components/ScrollIndicator';
import Script from 'next/script';
import { RECAPTCHA_SITE_KEY } from '@/lib/config';

export default function Home() {
  return (
    <>
      {RECAPTCHA_SITE_KEY && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="lazyOnload"
        />
      )}

      {/* Scroll Indicator */}
      <ScrollIndicator />

      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <Benefits />

        {/* Sección de Registro - con fondo oscuro */}
        <section className="relative section-padding overflow-hidden bg-[#231123]">
          {/* Decoraciones de fondo */}
          <div className="absolute inset-0">
            <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl"></div>
            <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-primary-600/15 blur-3xl"></div>
          </div>
          
          <div className="container-custom relative z-10">
            <div className="mx-auto max-w-3xl">
              <RegisterForm />
            </div>
          </div>
        </section>

        <FAQ />
      </main>

      <Footer />
    </>
  );
}

