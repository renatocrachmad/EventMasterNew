import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Check, 
  Star, 
  Calendar,
  DollarSign,
  Shield,
  Zap,
  Users,
  BarChart3,
  Package,
  Crown,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  X
} from 'lucide-react';


const premiumAnualRecursos = [
  'Acesso completo ao dashboard',
  'Gestão de agenda ilimitada',
  'Fluxo de caixa detalhado',
  'Promoções ilimitadas',
  'Relatórios avançados',
  'Suporte prioritário',
  'Cadastro de Clientes e Fornecedores',
  'controle de Estoque'
];

const premiumMensalRecursos = [
  'Acesso completo ao dashboard',
  'Backup automático',
  'Integração com APIs externas'
];

const ALL_PLANOS = {
  mensal: {
    nome: 'Plano Basico Mensal',
    preco: 29.90, // Ajustado para R$29,90
    periodo: 'mês',
    desconto: 0,
    popular: false,
    recursos: [
      'Acesso completo ao dashboard',
      'Gestão de agenda básica',
      'Fluxo de caixa detalhado',
      'Até 5 promoções ativas',
      'Relatórios básicos',
      'Suporte por email'
    ]
  },
  premiumAnual: { // Renomeado para ser mais específico
    nome: 'Plano Premium Anual',
    precoPorMes: 49.90, // Preço equivalente por mês para exibição
    precoAnual: (49.90 * 12 * 0.95), // R$49,90 * 12 meses com 5% de desconto
    desconto: 5, // 5% de desconto
    popular: true,
    recursos: premiumAnualRecursos
  },
  basicoAnual: { // Novo plano: Básico Anual
    nome: 'Plano Básico Anual',
    precoPorMes: 29.90, // Preço equivalente por mês para exibição
    precoAnual: (29.90 * 12 * 0.95), // R$29,90 * 12 meses com 5% de desconto
    desconto: 5,
    popular: false,
    recursos: [
      'Acesso completo ao dashboard',
      'Gestão de agenda básica',
      'Fluxo de caixa detalhado',
      'Até 5 promoções ativas',
      'Relatórios básicos',
      'Suporte por email',
      'Desconto anual'
    ]
  },
  premiumMensal: { // Novo plano: Premium Mensal
    nome: 'Plano Premium Mensal',
    preco: 49.90,
    periodo: 'mês',
    desconto: 0,
    popular: false,
    recursos: premiumAnualRecursos.filter(r => r !== 'Desconto anual') // Agora premiumAnualRecursos está definido
  }
};

const PlanoAssinatura = () => {
  const [selectedPlan, setSelectedPlan] = useState('mensal');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate(); // Import useNavigate
  const [currentSubscription, setCurrentSubscription] = useState({
    id: 'premiumAnual', // Exemplo: Assinatura Premium Anual
    status: 'ativo',
    proximoVencimento: '2025-01-15', // Exemplo de vencimento futuro
    valorMensal: 49.90, // Valor mensal equivalente pago
    inicioAssinatura: '2024-01-15'
  });
  // Planos disponíveis
  const planos = ALL_PLANOS; // Usar a constante definida fora do componente

  const handleSubscribe = (planType) => {
    // Redireciona para a página de planos externa conforme solicitado
    navigate('/seja-parceiro');
  };

  const handlePayment = (paymentMethod) => {
    // Aqui seria integrado com a plataforma de pagamento externa
    console.log(`Processando pagamento via ${paymentMethod} para plano ${selectedPlan}`);
    
    // Simular redirecionamento para plataforma de pagamento
    const paymentUrls = {
      stripe: 'https://checkout.stripe.com/pay/cs_test_...',
      paypal: 'https://www.paypal.com/checkoutnow?token=...',
      mercadopago: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=...'
    };

    // Em um cenário real, redirecionaria para a URL de pagamento
    alert(`Redirecionando para ${paymentMethod}...\nURL: ${paymentUrls[paymentMethod] || 'URL de pagamento'}`);
    setShowPaymentModal(false);
  };

  const handleCancelSubscription = () => {
    if (confirm('Tem certeza que deseja cancelar sua assinatura?')) {
      setCurrentSubscription({
        ...currentSubscription,
        status: 'cancelado'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo': return 'bg-green-100 text-green-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      case 'cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ativo': return 'Ativo';
      case 'vencido': return 'Vencido';
      case 'cancelado': return 'Cancelado';
      default: return 'Pendente';
    }
  };

  const calculateSavings = (precoMensalRef, precoAnualTotal) => {
    return (precoMensalRef * 12) - precoAnualTotal;
  };

  return (
    <div className="space-y-6">
      {/* Status da assinatura atual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Minha Assinatura</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentSubscription.status)}`}>
            {getStatusText(currentSubscription.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-sm text-gray-600">Plano Atual</p>
              <p className="font-semibold text-gray-900 capitalize">
                {planos[currentSubscription.id]?.nome || 'Nenhum'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Próximo Vencimento</p>
              <p className="font-semibold text-gray-900">
                {new Date(currentSubscription.proximoVencimento).toLocaleDateString('pt-BR')}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Valor Mensal</p>
              <p className="font-semibold text-gray-900">
                R$ {currentSubscription.valorMensal.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {currentSubscription.status === 'ativo' && (
          <div className="mt-6 flex space-x-3">
            <button onClick={() => navigate('/seja-parceiro')} className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
              <RefreshCw className="w-4 h-4 mr-2" />
              Alterar Plano
            </button>
            <button 
              onClick={handleCancelSubscription}
              className="flex items-center px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar Assinatura
            </button>
          </div>
        )}
      </motion.div>

      {/* Comparação de planos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      > {/* Este é o bloco "Comparação de planos" */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Escolha seu Plano</h3>
          <p className="text-gray-600">Selecione o plano que melhor atende às suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Plano Mensal */}
          <div className="relative border border-gray-200 rounded-lg p-6 flex flex-col">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{planos.mensal.nome}</h4>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                R$ {planos.mensal.preco.toFixed(2)}
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600">Cobrança mensal</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {planos.mensal.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recurso}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('basicoMensal')} // Alterado para basicoMensal
              className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Escolher Plano Mensal
            </button>
          </div>

          {/* Plano Premium Anual */}
          <div className="relative border-2 border-blue-500 rounded-lg p-6">
            {planos.premiumAnual.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Mais Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{planos.premiumAnual.nome}</h4>
              <div className="text-3xl font-bold text-gray-900 mb-1"> {/* Exibe o preço por mês equivalente */}
                R$ {planos.premiumAnual.precoPorMes.toFixed(2)}
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600">
                R$ {planos.premiumAnual.precoAnual.toFixed(2)} cobrado anualmente
              </p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <Star className="w-4 h-4 mr-1" /> 
                Economize R$ {calculateSavings(planos.premiumAnual.precoPorMes, planos.premiumAnual.precoAnual).toFixed(2)} por ano
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {planos.premiumAnual.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recurso}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('premiumAnual')} // Alterado para premiumAnual
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Escolher Plano Anual
            </button>
          </div>

          {/* Plano Básico Anual */}
          <div className="relative border border-gray-200 rounded-lg p-6 flex flex-col">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{planos.basicoAnual.nome}</h4>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                R$ {planos.basicoAnual.precoPorMes.toFixed(2)}
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600">
                R$ {planos.basicoAnual.precoAnual.toFixed(2)} cobrado anualmente
              </p>
              <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                <Star className="w-4 h-4 mr-1" /> 
                Economize R$ {calculateSavings(planos.basicoAnual.precoPorMes, planos.basicoAnual.precoAnual).toFixed(2)} por ano
              </div>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {planos.basicoAnual.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recurso}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('basicoAnual')}
              className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Escolher Plano Anual
            </button>
          </div>

          {/* Plano Premium Mensal */}
          <div className="relative border border-gray-200 rounded-lg p-6 flex flex-col">
            <div className="text-center mb-6">
              <h4 className="text-xl font-semibold text-gray-800 mb-2">{planos.premiumMensal.nome}</h4>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                R$ {planos.premiumMensal.preco.toFixed(2)}
                <span className="text-lg font-normal text-gray-600">/mês</span>
              </div>
              <p className="text-sm text-gray-600">Cobrança mensal</p>
            </div>

            <ul className="space-y-3 mb-6 flex-grow">
              {planos.premiumMensal.recursos.map((recurso, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{recurso}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe('premiumMensal')}
              className="w-full py-3 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Escolher Plano Mensal
            </button>
          </div>
        </div>
      </motion.div>

      {/* Benefícios da assinatura */}
      {/* Mantido como estava, pois não foi solicitado alteração */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Por que assinar?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Gestão Completa</h4>
            <p className="text-sm text-gray-600">
              Controle total do seu negócio com ferramentas profissionais de gestão
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Aumente suas Vendas</h4>
            <p className="text-sm text-gray-600">
              Promova seus serviços no carrossel e atraia mais clientes
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Dados Seguros</h4>
            <p className="text-sm text-gray-600">
              Seus dados protegidos com backup automático e segurança avançada
            </p>
          </div>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Perguntas Frequentes</h3>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800 mb-2">Posso cancelar a qualquer momento?</h4>
            <p className="text-sm text-gray-600">
              Sim, você pode cancelar sua assinatura a qualquer momento. O acesso continuará até o final do período pago.
            </p>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-800 mb-2">Quais formas de pagamento são aceitas?</h4>
            <p className="text-sm text-gray-600">
              Aceitamos cartão de crédito, débito, PIX e boleto bancário através de nossas plataformas de pagamento seguras.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Há período de teste gratuito?</h4>
            <p className="text-sm text-gray-600">
              Oferecemos 7 dias de teste gratuito para novos usuários conhecerem todas as funcionalidades.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Modal de pagamento */}
      {/* Mantido como estava, pois não foi solicitado alteração */}
      {showPaymentModal && (
        <PaymentModal
          plan={planos[selectedPlan]}
          planType={selectedPlan}
          onPayment={handlePayment}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
};

// Modal de pagamento
const PaymentModal = ({ plan, planType, onPayment, onClose }) => {
  const [selectedPayment, setSelectedPayment] = useState('stripe');

  const paymentMethods = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Cartão de crédito/débito',
      icon: CreditCard,
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Conta PayPal ou cartão',
      icon: Shield,
      popular: false
    },
    {
      id: 'mercadopago',
      name: 'Mercado Pago',
      description: 'PIX, cartão ou boleto',
      icon: DollarSign,
      popular: false
    }
  ];

  const totalValue = planType === 'anual' ? plan.precoAnual : plan.preco;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Finalizar Assinatura</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resumo do plano */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-800 mb-2">{plan.nome}</h4>
          <div className="flex justify-between items-center"> {/* Exibe o valor total e o tipo de cobrança */}
            <span className="text-gray-600">
              {plan.precoAnual ? 'Cobrança anual' : 'Cobrança mensal'}
            </span>
            <span className="text-xl font-bold text-gray-900"> {/* Usa precoAnual se existir, senão preco */}
              R$ {totalValue.toFixed(2)}
            </span>
          </div>
          {planType === 'anual' && (
            <div className="mt-2 text-sm text-green-600">
              Economize R$ {(plan.preco * 12 - plan.precoAnual).toFixed(2)} por ano
            </div>
          )}
        </div>

        {/* Métodos de pagamento */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-800 mb-3">Escolha a forma de pagamento</h4>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center p-3 border rounded-lg transition-colors ${
                    selectedPayment === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 text-gray-600 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-800">{method.name}</span>
                      {method.popular && (
                        <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">{method.description}</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedPayment === method.id
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedPayment === method.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Termos e condições */}
        <div className="mb-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-gray-600">
              <p>
                Ao continuar, você concorda com nossos{' '}
                <a href="#" className="text-blue-600 hover:underline">Termos de Serviço</a>
                {' '}e{' '}
                <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => onPayment(selectedPayment)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Pagar Agora
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PlanoAssinatura;
