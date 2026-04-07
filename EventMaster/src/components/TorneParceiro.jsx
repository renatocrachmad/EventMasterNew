import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TorneParceiro = ({ onClickParceiro }) => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Mais Clientes",
      description: "Acesse milhares de clientes em busca de serviços automotivos"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Aumente sua Receita",
      description: "Expanda seus negócios e aumente seus ganhos mensais"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança Garantida",
      description: "Plataforma segura com pagamentos protegidos"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Credibilidade",
      description: "Ganhe credibilidade com avaliações e certificações"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Torne-se Nosso Parceiro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Junte-se à nós  e transforme seu negócio
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center text-white"
            >
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/80 text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Pronto para começar?
            </h3>
            <p className="text-white/90 mb-6">
              Cadastre-se agora e comece a receber clientes hoje mesmo. 
              É rápido, fácil e sem taxas de adesão.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onClickParceiro}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              >
                Quero ser Parceiro
              </button>
              <button 
                onClick={() => navigate('/subscriber-dashboard')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300"
              >
                Acessar Painel do Assinante
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TorneParceiro;


