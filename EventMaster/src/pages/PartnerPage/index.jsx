import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Star,
  TrendingUp,
  BarChart3,
  Calendar,
  Megaphone,
  Target,
  Crown,
  Shield,
} from "lucide-react";

const PartnerPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (planType) => {
    // setSelectedPlan(planType); // O estado não está sendo usado, pode ser removido se não houver lógica futura
    // Aqui você pode implementar a lógica de redirecionamento para pagamento
    alert(
      `Você selecionou o Plano ${planType}! Redirecionando para o pagamento...`
    );
  };

  const basicFeatures = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Controle de Ganhos Mensais",
      description: "Acompanhe sua receita mensal de forma detalhada",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Ganhos por Serviço",
      description: "Veja quanto você ganhou com cada serviço prestado",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Controle de Serviços",
      description: "Monitore quantos serviços você realizou por mês",
    },
  ];

  const premiumFeatures = [
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Anúncio no Carrossel",
      description: "Seu negócio em destaque na página inicial",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Promoções em Destaque",
      description: "Divulgue suas promoções na página Home",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Seja Nosso Parceiro</h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades e comece
              a expandir seu negócio conosco!
            </p>
          </motion.div>
        </div>
      </header>

      {/* Plans Section */}
      <main className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Plano Básico */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col border border-gray-200"
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600">
                  <Shield className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Plano Básico</h2>
                <p className="mt-2 text-gray-500">
                  Ideal para começar a organizar seu negócio
                </p>
                <p className="mt-6">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">R$49</span>
                  <span className="text-lg font-medium text-gray-500">,90/mês</span>
                </p>
              </div>

              <div className="flex-grow">
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-6">O que está incluído:</h3>
                <ul className="space-y-5">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection("Básico")}
                className="w-full mt-10 py-3 px-6 rounded-lg font-semibold text-lg text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-all"
              >
                Escolher Plano Básico
              </button>
            </motion.div>

            {/* Plano Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col border-4 border-indigo-500 relative"
            >
              <div className="absolute -top-4 right-6 bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <Star className="w-3 h-3" />
                Mais Popular
              </div>

              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                  <Crown className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Plano Premium</h2>
                <p className="mt-2 text-gray-500">
                  Para quem quer maximizar sua visibilidade
                </p>
                <p className="mt-6">
                  <span className="text-5xl font-bold tracking-tight text-gray-900">R$99</span>
                  <span className="text-lg font-medium text-gray-500">,90/mês</span>
                </p>
              </div>

              <div className="flex-grow">
                <h3 className="text-sm font-bold uppercase text-gray-500 mb-4">Tudo do Básico, mais:</h3>
                <ul className="space-y-3 mb-8">
                  {basicFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm font-medium">{feature.title}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-sm font-bold uppercase text-gray-500 mb-6">Recursos Exclusivos:</h3>
                <ul className="space-y-5">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection("Premium")}
                className="w-full mt-10 py-3 px-6 rounded-lg font-semibold text-lg text-white bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                Escolher Plano Premium
              </button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Benefits Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Por que ser nosso parceiro?</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Aumente sua Receita</h3>
                <p className="mt-2 text-gray-600">
                  Tenha controle total sobre seus ganhos e identifique
                  oportunidades de crescimento
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Mais Visibilidade</h3>
                <p className="mt-2 text-gray-600">
                  Apareça em destaque para milhares de clientes em potencial.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Relatórios Detalhados</h3>
                <p className="mt-2 text-gray-600">Acompanhe o desempenho do seu negócio com dados precisos.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerPage;
