import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Benefits from '@/components/Benefits';
import SizeGuide from '@/components/SizeGuide';
import FAQ from '@/components/FAQ';
import RegisterForm from '@/components/RegisterForm';
import Footer from '@/components/Footer';
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

      <main className="min-h-screen">
        <Hero />
        <Gallery />
        <Benefits />

        {/* Sección de Registro */}
        <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl">
              <RegisterForm />
            </div>
          </div>
        </section>

        <SizeGuide />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}

