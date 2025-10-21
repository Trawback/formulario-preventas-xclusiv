"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  name: string;
}

const sections: Section[] = [
  { id: 'hero', name: 'Inicio' },
  { id: 'galeria', name: 'Productos' },
  { id: 'beneficios', name: 'Beneficios' },
  { id: 'registro-form', name: 'Registro' },
  { id: 'tallas', name: 'Tallas' },
  { id: 'faq', name: 'FAQ' },
];

export default function ScrollIndicator() {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mostrar/ocultar el indicador basado en scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Usar Intersection Observer para detectar la sección activa
    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px', // La sección se considera activa en la parte superior
      threshold: [0, 0.1, 0.5]
    };

    const visibleSections = new Set<string>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        
        if (entry.isIntersecting) {
          visibleSections.add(sectionId);
        } else {
          visibleSections.delete(sectionId);
        }
      });

      // Encontrar la sección más alta que esté visible
      if (visibleSections.size > 0) {
        let topMostIndex = -1;
        let topMostPosition = Infinity;

        visibleSections.forEach((sectionId) => {
          const index = sections.findIndex(s => s.id === sectionId);
          const element = document.getElementById(sectionId);
          
          if (element && index !== -1) {
            const rect = element.getBoundingClientRect();
            // Priorizar la sección que esté más arriba en el viewport
            if (rect.top < topMostPosition) {
              topMostPosition = rect.top;
              topMostIndex = index;
            }
          }
        });

        if (topMostIndex !== -1) {
          setActiveSection(topMostIndex);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const section = sections[index];
    const element = document.getElementById(section.id);
    
    if (element) {
      // Calcular la posición con un pequeño offset desde el top
      const offsetTop = element.offsetTop;
      const offset = section.id === 'hero' ? 0 : 80; // 80px de offset para otras secciones
      
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Indicadores de sección */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 py-2"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(index)}
                  className="group relative"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      index === activeSection
                        ? 'bg-[#C30F45] border-[#C30F45] w-4 h-4'
                        : 'bg-transparent border-white/40 hover:border-[#C30F45]'
                    }`}
                  />
                  
                  {/* Tooltip */}
                  <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#231123] border border-white/20 rounded-lg text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {section.name}
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Botón Volver al Inicio */}
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-6 z-40 group w-12 h-12 rounded-full backdrop-blur-md border-2 border-white/20 bg-[#231123]/80 hover:bg-[#C30F45] hover:border-[#C30F45] hover:scale-110 transition-all duration-300 shadow-lg shadow-black/20"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 mx-auto text-white transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              
              {/* Tooltip */}
              <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#231123] border border-white/20 rounded-lg text-xs font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Volver al inicio
              </span>
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

