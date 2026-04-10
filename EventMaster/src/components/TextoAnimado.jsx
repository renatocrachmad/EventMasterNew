import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TextoAnimado = () => {
  const [currentText, setCurrentText] = useState(0);
  
  const texts = [
    "Transforme seu evento em uma experiência inesquecível.",
    "Encontre os melhores profissionais para sua festa.",
    "Profissionais qualificados perto de você",
    "Qualidade e confiança em cada serviço"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          key={currentText}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
        >
          {texts[currentText]}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/90 mb-4"
        >
          Conectamos você aos melhores profissionais da sua região
        </motion.p>

        {/* Novo título em vez de botão */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-2xl md:text-3xl text-white font-semibold"
        >
          Encontre Serviços
        </motion.h2>
      </div>
      
      {/* Elementos decorativos animados */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-10 right-10 w-20 h-20 border-4 border-white/20 rounded-full"
      />
      
      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-10 left-10 w-16 h-16 border-4 border-white/20 rounded-full"
      />
    </div>
  );
};

export default TextoAnimado;
