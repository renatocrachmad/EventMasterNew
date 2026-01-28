import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag, Star } from 'lucide-react';

const PromocoesSection = ({ promocoes, subscriberPromotions = [] }) => {
  const allPromocoes = [
    ...promocoes,
    ...subscriberPromotions.filter(promo => promo.ativo)
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Promoções Especiais
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Aproveite as melhores ofertas dos nossos parceiros
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allPromocoes.map((promocao, index) => (
            <motion.div
              key={promocao.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <span className="text-3xl">🏷️</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  OFERTA
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {promocao.titulo}
                </h3>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span className="text-sm">{promocao.fornecedor}</span>
                </div>

                <div className="flex items-center text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">Válido até {promocao.validoAte}</span>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Aproveitar Oferta
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Ver Todas as Promoções
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export { PromocoesSection };


