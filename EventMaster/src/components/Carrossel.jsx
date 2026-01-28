import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const ControlledCarousel = ({ items, subscriberPromotions = [] }) => {
  const allItems = [
    ...items,
    ...subscriberPromotions.filter(promo => promo.ativo)
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    if (allItems.length === 0) return; // Adicionado para evitar loop infinito se não houver itens

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === allItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, allItems.length, isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? allItems.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === allItems.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (allItems.length === 0) {
    return (
      <div className="relative w-full max-w-6xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center h-64">
        <p className="text-gray-500">Nenhum item ou promoção disponível no momento.</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-6xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="relative h-64 md:h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <div className="text-center text-white p-8">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                {allItems[currentIndex]?.nome || allItems[currentIndex]?.titulo}
              </h3>
              <a
                href={allItems[currentIndex]?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                <span className="mr-2">Saiba mais</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Botões de navegação */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center space-x-2 py-4 bg-gray-50">
        {allItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-600 scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ControlledCarousel;


