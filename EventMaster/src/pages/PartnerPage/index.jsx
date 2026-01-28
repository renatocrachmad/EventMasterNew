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
import "./style.css";

const PartnerPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handlePlanSelection = (planType) => {
    setSelectedPlan(planType);
    // Aqui você pode implementar a lógica de redirecionamento para pagamento
    alert(
      `Você selecionou o Plano ${planType}! Redirecionando para o pagamento...`
    );
  };

  const basicFeatures = [
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Controle de Ganhos Mensais",
      description: "Acompanhe sua receita mensal de forma detalhada",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Ganhos por Serviço",
      description: "Veja quanto você ganhou com cada serviço prestado",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Controle de Serviços",
      description: "Monitore quantos serviços você realizou por mês",
    },
  ];

  const premiumFeatures = [
    {
      icon: <Megaphone className="w-5 h-5" />,
      title: "Anúncio no Carrossel",
      description: "Seu negócio em destaque na página inicial",
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Promoções em Destaque",
      description: "Divulgue suas promoções na página Home",
    },
  ];

  return (
    <div className="partner-page">
      {/* Header */}
      <div className="partner-header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <h1>Seja Nosso Parceiro</h1>
            <p>
              Escolha o plano que melhor se adapta às suas necessidades e comece
              a expandir seu negócio conosco!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="plans-section">
        <div className="container">
          <div className="plans-container">
            {/* Plano Básico */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="plan-card basic"
            >
              <div className="plan-header">
                <div className="plan-icon">
                  <Shield className="w-8 h-8" />
                </div>
                <h2>Plano Básico</h2>
                <div className="price">
                  <span className="currency">R$</span>
                  <span className="amount">49</span>
                  <span className="period">,90/mês</span>
                </div>
                <p className="plan-description">
                  Ideal para começar a organizar seu negócio
                </p>
              </div>

              <div className="features-section">
                <h3>O que está incluído:</h3>
                <div className="features-list">
                  {basicFeatures.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">{feature.icon}</div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-choose-plan"
                onClick={() => handlePlanSelection("Básico")}
              >
                Escolher Plano Básico
              </button>
            </motion.div>

            {/* Plano Premium */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="plan-card premium featured"
            >
              <div className="popular-badge">
                <Star className="w-4 h-4" />
                Mais Popular
              </div>

              <div className="plan-header">
                <div className="plan-icon">
                  <Crown className="w-8 h-8" />
                </div>
                <h2>Plano Premium</h2>
                <div className="price">
                  <span className="currency">R$</span>
                  <span className="amount">99</span>
                  <span className="period">,90/mês</span>
                </div>
                <p className="plan-description">
                  Para quem quer maximizar sua visibilidade
                </p>
              </div>

              <div className="features-section">
                <h3>Tudo do Básico, mais:</h3>
                <div className="features-list">
                  {basicFeatures.map((feature, index) => (
                    <div key={index} className="feature-item included">
                      <div className="feature-icon">
                        <Check className="w-4 h-4" />
                      </div>
                      <div className="feature-content">
                        <span>{feature.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <h3>Recursos Exclusivos:</h3>
                <div className="features-list">
                  {premiumFeatures.map((feature, index) => (
                    <div key={index} className="feature-item">
                      <div className="feature-icon">{feature.icon}</div>
                      <div className="feature-content">
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="btn-choose-plan"
                onClick={() => handlePlanSelection("Premium")}
              >
                Escolher Plano Premium
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="benefits-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="benefits-content"
          >
            <h2>Por que ser nosso parceiro?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <div className="benefit-icon">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3>Aumente sua Receita</h3>
                <p>
                  Tenha controle total sobre seus ganhos e identifique
                  oportunidades de crescimento
                </p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <Target className="w-6 h-6" />
                </div>
                <h3>Mais Visibilidade</h3>
                <p>
                  Apareça em destaque para milhares de clientes em potencial
                </p>
              </div>

              <div className="benefit-item">
                <div className="benefit-icon">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3>Relatórios Detalhados</h3>
                <p>Acompanhe o desempenho do seu negócio com dados precisos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
