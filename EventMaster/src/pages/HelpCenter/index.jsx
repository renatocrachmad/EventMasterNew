import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, CreditCard, User, Calendar, ChevronRight, HelpCircle } from 'lucide-react';
import Layout from '../../components/Layout';

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Agendamentos');

  const categories = [
    { id: 'Agendamentos', icon: <Calendar className="w-8 h-8 text-blue-500" />, title: "Agendamentos", desc: "Como reservar e gerenciar datas." },
    { id: 'Pagamentos', icon: <CreditCard className="w-8 h-8 text-green-500" />, title: "Pagamentos", desc: "Reembolsos, taxas e métodos." },
    { id: 'Sua Conta', icon: <User className="w-8 h-8 text-purple-500" />, title: "Sua Conta", desc: "Perfil, senha e segurança." },
    { id: 'Segurança', icon: <Shield className="w-8 h-8 text-red-500" />, title: "Segurança", desc: "Proteção de dados e verificação." }
  ];

  const helpData = {
    'Agendamentos': [
      { q: "Como faço para reservar um serviço?", a: "Navegue pelos perfis dos prestadores, escolha o serviço desejado e clique no botão 'Agendar'. Selecione uma data e horário disponíveis no calendário e confirme seus dados." },
      { q: "Como cancelar ou reagendar?", a: "Acesse seu perfil, vá em 'Meus Agendamentos' e selecione a reserva. Você poderá solicitar o cancelamento ou reagendamento conforme a política do prestador." },
      { q: "Onde vejo o status do meu pedido?", a: "Todos os seus agendamentos ativos e históricos ficam disponíveis na aba 'Meus Agendamentos' dentro do seu painel de cliente." }
    ],
    'Pagamentos': [
      { q: "Quais são as formas de pagamento aceitas?", a: "Aceitamos as principais bandeiras de cartão de crédito, boleto bancário e PIX através de nosso sistema seguro de pagamentos." },
      { q: "Como funcionam os reembolsos?", a: "Em caso de cancelamento dentro do prazo estipulado, o valor é estornado automaticamente para o método original de pagamento em até 7 dias úteis." },
      { q: "É seguro pagar pela plataforma?", a: "Sim! Utilizamos criptografia de ponta a ponta e parceiros certificados (PCI DSS) para garantir que seus dados financeiros nunca fiquem expostos." }
    ],
    'Sua Conta': [
      { q: "Como altero meus dados de perfil?", a: "Clique no seu avatar no menu superior, vá em 'Configurações' ou 'Meu Perfil' para atualizar nome, telefone, foto e biografia." },
      { q: "Esqueci minha senha, o que fazer?", a: "Na tela de login, clique em 'Esqueci minha senha'. Enviaremos um link de recuperação para o seu e-mail cadastrado." },
      { q: "Posso ter uma conta de cliente e prestador?", a: "Sim, você pode migrar ou ativar seu perfil de prestador a qualquer momento clicando em 'Seja um Parceiro'." }
    ],
    'Segurança': [
      { q: "Os prestadores são verificados?", a: "Sim! Todos os prestadores passam por uma análise de documentos e antecedentes antes de serem aprovados para anunciar na plataforma." },
      { q: "Como meus dados são protegidos?", a: "Seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados). Seus dados são usados apenas para a finalidade de agendamento e nunca vendidos a terceiros." },
      { q: "Como denunciar um comportamento inadequado?", a: "Dentro do perfil do prestador ou no detalhe do agendamento, você encontrará a opção 'Denunciar'. Nossa equipe de moderadores analisará o caso em até 24h." }
    ]
  };

  // Lógica de busca simples
  const getAllFaqs = () => {
    if (!searchTerm) return helpData[activeCategory] || [];
    
    return Object.values(helpData).flat().filter(item => 
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-blue-700 py-16 px-4 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-6"
          >
            Como podemos ajudar?
          </motion.h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Busque por dúvidas..." 
              className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 outline-none shadow-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {!searchTerm && (
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Navegue por Categoria</h2>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((cat, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                onClick={() => { setActiveCategory(cat.id); setSearchTerm(''); }}
                className={`p-6 rounded-2xl shadow-sm border transition-all cursor-pointer ${
                  activeCategory === cat.id && !searchTerm 
                  ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-500/20' 
                  : 'bg-white border-gray-100 hover:shadow-md'
                }`}
              >
                <div className="mb-4">{cat.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500">{cat.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              {searchTerm ? `Resultados para "${searchTerm}"` : activeCategory}
            </h2>
            
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {getAllFaqs().map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-100 pb-6 last:border-0"
                  >
                    <h4 className="font-bold text-gray-800 mb-3 flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      {item.q}
                    </h4>
                    <p className="text-gray-600 leading-relaxed pl-7">
                      {item.a}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {getAllFaqs().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 italic">Nenhum resultado encontrado para sua busca.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
