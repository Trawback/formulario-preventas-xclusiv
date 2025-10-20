"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya aceptó/rechazó las cookies
    const cookieConsent = localStorage.getItem('cookie_consent');
    if (!cookieConsent) {
      // Mostrar el banner después de un pequeño delay
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
    
    // Aquí puedes inicializar servicios de analytics/marketing
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie_consent', 'rejected');
    setShowBanner(false);
    
    // Deshabilitar servicios de analytics/marketing
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container-custom">
            <div className="mx-auto max-w-6xl rounded-2xl border-2 border-primary-500/50 bg-[#1a0f1a] backdrop-blur-xl shadow-2xl shadow-primary-500/20">
              <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
                {/* Contenido */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🍪</span>
                    <h3 className="text-lg font-black text-white">
                      Utilizamos Cookies
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Utilizamos cookies esenciales para el funcionamiento del sitio y cookies opcionales para análisis y marketing. 
                    Puedes elegir aceptar todas las cookies o solo las esenciales.
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <Link 
                      href="/cookies" 
                      className="text-primary-400 hover:text-primary-300 underline transition-colors"
                    >
                      Política de Cookies
                    </Link>
                    <span className="text-gray-500">•</span>
                    <Link 
                      href="/privacidad" 
                      className="text-primary-400 hover:text-primary-300 underline transition-colors"
                    >
                      Política de Privacidad
                    </Link>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={handleReject}
                    className="rounded-xl border-2 border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
                  >
                    Solo Esenciales
                  </button>
                  <button
                    onClick={handleAccept}
                    className="rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-600/50"
                  >
                    Aceptar Todas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

