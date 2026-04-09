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
  Zap
} from "lucide-react";

const PartnerPage = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const pricing = {
    basico: { mensal: 29.90, anual: 29.90 * 12 * 0.95 },
    premium: { mensal: 49.90, anual: 49.90 * 12 * 0.95 }
  };

  const handlePlanSelection = (planType) => {
    const period = isAnnual ? "Anual" : "Mensal";
    const total = isAnnual 
      ? (planType === "Básico" ? pricing.basico.anual : pricing.premium.anual).toFixed(2)
      : (planType === "Básico" ? pricing.basico.mensal : pricing.premium.mensal).toFixed(2);

    alert(
      `Você selecionou o Plano ${planType} ${period}! Valor: R$ ${total}\nRedirecionando para o pagamento...`
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

  const premiumExtraFeatures = [
    "Gestão de agenda ilimitada",
    "Fluxo de caixa detalhado",
    "Promoções ilimitadas",
    "Relatórios avançados",
    "Suporte prioritário",
    "Cadastro de Clientes e Fornecedores",
    "Controle de Estoque"
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

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

      {/* Periodicidade Selector */}
      <div className="flex justify-center mt-12">
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex items-center">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              !isAnnual ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Mensal
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              isAnnual ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Anual
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">
              5% OFF
            </span>
          </button>
        </div>
      </div>

      {/* Plans Section */}
      <main className="py-12 sm:py-16">
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
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    R$ {isAnnual ? formatPrice(pricing.basico.anual / 12) : "29,90"}
                  </span>
                  <span className="text-lg font-medium text-gray-500">/mês</span>
                </p>
                {isAnnual && (
                  <p className="text-sm text-green-600 font-medium mt-2">R$ {formatPrice(pricing.basico.anual)} cobrado anualmente</p>
                )}
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
                className="w-full mt-10 py-4 px-6 rounded-xl font-bold text-lg text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-all border-2 border-transparent hover:border-indigo-200"
              >
                {isAnnual ? "Assinar Plano Anual" : "Assinar Plano Mensal"}
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
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    R$ {isAnnual ? formatPrice(pricing.premium.anual / 12) : "49,90"}
                  </span>
                  <span className="text-lg font-medium text-gray-500">/mês</span>
                </p>
                {isAnnual && (
                  <p className="text-sm text-indigo-100 font-medium mt-2">R$ {formatPrice(pricing.premium.anual)} cobrado anualmente</p>
                )}
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
                  {premiumExtraFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{feature}</h4>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePlanSelection("Premium")}
                className="w-full mt-10 py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-indigo-600 to-purple-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                {isAnnual ? "Assinar Premium Anual" : "Assinar Premium Mensal"}
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
