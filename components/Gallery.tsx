"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Gallery() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const items = [
    {
      id: 1,
      title: 'Hoodie "XSV1"',
      description: 'Gramaje 350gr/m2, 100% algodón, técnica "Puff", Sin cordones.',
      originalPrice: '$899.00 mxn',
      price: '$749.00 mxn',
      image: '/Resources/Hoodie%20Boxy%20Frente%20mockup_Mesa%20de%20trabajo%201%20copia-10.png',
      hoverImage: '/Resources/Hoodie%20Boxy%20Espalda%20mockup_Mesa%20de%20trabajo%201%20copia%202-12.png',
      gallery: [
        '/Resources/Hoodie%20Boxy%20Frente%20mockup_Mesa%20de%20trabajo%201%20copia-10.png',
        '/Resources/Hoodie%20Boxy%20Espalda%20mockup_Mesa%20de%20trabajo%201%20copia%202-12.png',
        '/Resources/Hoodie%20Boxy%20Frente%20modelo_Mesa%20de%20trabajo%201-03.png',
        '/Resources/Hoodie%20Boxy%20Espalda%20modelo_Mesa%20de%20trabajo%201-08.png',
      ]
    },
    {
      id: 2,
      title: 'Tank Top "XSV2"',
      description: 'Gramaje 200gr/m2, sin mangas, corte regular.',
      originalPrice: '$549.00 mxn',
      price: '$399.00 mxn',
      image: '/resources/tank-top-front.jpg',
      hoverImage: '/resources/tank-top-back.jpg',
      gallery: [
        '/resources/tank-top-front.jpg',
        '/resources/tank-top-back.jpg',
        '/resources/tank-top-side.jpg',
        '/resources/tank-top-detail.jpg',
      ]
    },
    {
      id: 3,
      title: 'Hoodie Classic',
      description: 'Confort y estilo',
      originalPrice: '$899.00 mxn',
      price: '$749.00 mxn',
      image: '/resources/hoodie-front.jpg',
      hoverImage: '/resources/hoodie-back.jpg',
      gallery: [
        '/resources/hoodie-front.jpg',
        '/resources/hoodie-back.jpg',
        '/resources/hoodie-side.jpg',
        '/resources/hoodie-detail.jpg',
      ]
    },
  ];

  const openGallery = (itemId: number) => {
    setSelectedItem(itemId);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedItem) {
      const item = items.find(i => i.id === selectedItem);
      if (item) {
        setCurrentImageIndex((prev) => (prev + 1) % item.gallery.length);
      }
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      const item = items.find(i => i.id === selectedItem);
      if (item) {
        setCurrentImageIndex((prev) => (prev - 1 + item.gallery.length) % item.gallery.length);
      }
    }
  };

  const selectedItemData = selectedItem ? items.find(i => i.id === selectedItem) : null;

  return (
    <section id="galeria" className="section-padding bg-[#231123]">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="heading-2 mb-4 text-white">&ldquo;La colección&rdquo;</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Inspirada en la ciudad de México y creada para brindar estilo, distinción y sobre todo, orgullo por el esfuerzo de cada atleta.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="group overflow-hidden rounded-2xl bg-[#1a0f1a] border border-white/10 shadow-lg shadow-primary-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50"
              whileHover={{ y: -8 }}
            >
              {/* Imagen con hover effect */}
              <div 
                className="aspect-square overflow-hidden bg-[#0f0a0f] cursor-pointer relative"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => openGallery(item.id)}
              >
                <div className="relative w-full h-full">
                  {/* Imagen principal */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: hoveredItem === item.id ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Imagen hover */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.hoverImage}
                      alt={`${item.title} - Vista posterior`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Overlay con icono de zoom */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-white text-center">
                      <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                      <p className="text-sm font-semibold">Ver galería</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-white">
                  {item.title}
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  {item.description}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-medium text-gray-500 line-through">
                    {item.originalPrice}
                  </p>
                  <p className="text-xl font-bold text-primary-500">
                    {item.price}
                  </p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center rounded-full bg-primary-500/20 border border-primary-500/30 px-3 py-1 text-xs font-semibold text-primary-400">
                    🔥 Precio de Preventa
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal de Galería */}
      <AnimatePresence>
        {selectedItem && selectedItemData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="relative w-full max-w-5xl bg-[#1a0f1a] rounded-2xl border border-white/20 overflow-hidden"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h3 className="text-2xl font-black text-white">{selectedItemData.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{selectedItemData.description}</p>
                </div>
                <button
                  onClick={closeGallery}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="p-6">
                {/* Imagen principal grande */}
                <div className="relative aspect-square mb-6 bg-[#0f0a0f] rounded-xl overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      className="absolute inset-0"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={selectedItemData.gallery[currentImageIndex]}
                        alt={`${selectedItemData.title} - Imagen ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Botones de navegación */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Contador de imágenes */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {currentImageIndex + 1} / {selectedItemData.gallery.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-4">
                  {selectedItemData.gallery.map((img, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-primary-500 shadow-lg shadow-primary-500/50'
                          : 'border-white/20 hover:border-primary-500/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="150px"
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Información del precio */}
                <div className="mt-6 flex items-center justify-between p-4 bg-[#0f0a0f] rounded-xl border border-white/10">
                  <div className="flex items-center gap-3">
                    <p className="text-lg font-medium text-gray-500 line-through">
                      {selectedItemData.originalPrice}
                    </p>
                    <p className="text-3xl font-black text-primary-500">
                      {selectedItemData.price}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary-500/20 border border-primary-500/30 px-4 py-2 text-sm font-semibold text-primary-400">
                    🔥 Precio de Preventa
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
