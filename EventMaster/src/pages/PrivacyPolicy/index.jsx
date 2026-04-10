import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Globe, Bell, Clock } from 'lucide-react';
import Layout from '../../components/Layout';

const PrivacyPolicy = () => {
  const lastUpdate = new Date().toLocaleDateString('pt-BR');

  const sections = [
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: "1. Informações que Coletamos",
      content: "Coletamos informações que você nos fornece diretamente ao se cadastrar, como nome, e-mail, telefone e detalhes de perfil. Também coletamos dados técnicos automaticamente, incluindo endereço IP, tipo de dispositivo e como você interage com nossa plataforma de eventos."
    },
    {
      icon: <Lock className="w-6 h-6 text-purple-500" />,
      title: "2. Utilização dos Dados",
      content: "Seus dados são utilizados para processar agendamentos entre clientes e prestadores, personalizar recomendações de serviços, garantir a segurança da conta, processar pagamentos e enviar comunicações importantes sobre seus eventos."
    },
    {
      icon: <Globe className="w-6 h-6 text-green-500" />,
      title: "3. Compartilhamento com Terceiros",
      content: "Compartilhamos informações estritamente necessárias com os prestadores de serviço que você escolher contratar. Não vendemos seus dados para fins de marketing de terceiros. Podemos compartilhar dados para cumprir obrigações legais ou proteger a integridade da plataforma."
    },
    {
      icon: <Shield className="w-6 h-6 text-red-500" />,
      title: "4. Segurança e Armazenamento",
      content: "Utilizamos protocolos de segurança modernos (SSL/TLS) e criptografia para proteger seus dados. As informações são armazenadas em servidores seguros com acesso restrito a pessoal autorizado."
    },
    {
      icon: <Bell className="w-6 h-6 text-orange-500" />,
      title: "5. Seus Direitos de Privacidade",
      content: "De acordo com a LGPD, você tem o direito de acessar, corrigir, anonimizar ou excluir seus dados. Você também pode revogar seu consentimento para o processamento de dados a qualquer momento através das configurações de perfil."
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-500" />,
      title: "6. Alterações na Política",
      content: "Esta política pode ser atualizada ocasionalmente para refletir mudanças em nossas práticas. Quando fizermos alterações significativas, notificaremos você através da plataforma ou por e-mail."
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Hero Header */}
        <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-950 py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center justify-center p-4 bg-blue-500/10 rounded-full mb-6 border border-blue-500/20"
            >
              <Shield className="w-10 h-10 text-blue-400" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Política de Privacidade
            </motion.h1>
            <p className="text-blue-100/80 text-lg max-w-2xl mx-auto">
              No EventMaster, levamos a sério a proteção dos seus dados. 
              Esta página explica de forma transparente como coletamos, usamos e protegemos suas informações.
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="max-w-4xl mx-auto px-4 -mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="p-6 md:p-12">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-10 pb-4 border-b border-gray-50">
                <Clock className="w-4 h-4" />
                <span>Última atualização: {lastUpdate}</span>
              </div>

              <div className="space-y-8 md:space-y-12">
                {sections.map((section, index) => (
                  <motion.section 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                        {section.icon}
                      </div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed pl-0 md:pl-14">
                      {section.content}
                    </p>
                  </motion.section>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
