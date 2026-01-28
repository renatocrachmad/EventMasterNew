import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Package,
  CreditCard,
  Settings,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  DollarSign,
  Star,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

import ControleEstoque from '../../components/subscriber/ControleEstoque';
import FluxoCaixa from '../../components/subscriber/FluxoCaixa';
import GerenciarPromocoes from '../../components/subscriber/GerenciarPromocoes';
import PlanoAssinatura from '../../components/subscriber/PlanoAssinatura';

const SubscriberDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dashboardStats = {
    vendas: { valor: 'R$ 12.450', variacao: '+12%' },
    estoque: { valor: '156 itens', variacao: '-3%' },
    promocoes: { valor: '8 ativas', variacao: '+2%' },
    visualizacoes: { valor: '2.3k', variacao: '+18%' }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'estoque', label: 'Controle de Estoque', icon: Package },
    { id: 'fluxo', label: 'Fluxo de Caixa', icon: DollarSign },
    { id: 'promocoes', label: 'Minhas Promoções', icon: Star },
    { id: 'assinatura', label: 'Plano & Assinatura', icon: CreditCard },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'estoque':
        return <ControleEstoque />;
      case 'fluxo':
        return <FluxoCaixa />;
      case 'promocoes':
        return <GerenciarPromocoes />;
      case 'assinatura':
        return <PlanoAssinatura />;
      case 'configuracoes':
        return <ConfiguracoesPage />;
      default:
        return <DashboardHome stats={dashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full Width */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold">Painel do Prestador</h1>
                <p className="text-white/90 mt-1">Gerencie seus serviços e acompanhe seu desempenho</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-3 bg-white/20 border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 bg-white/20 border border-white/30 rounded-xl px-4 py-2">
                <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="font-semibold text-white">João Silva</p>
                  <p className="text-sm text-white/80">Oficina do João</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:relative lg:translate-x-0 lg:shadow-none lg:w-64 lg:flex-shrink-0"
        >
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <h2 className="text-xl font-bold text-gray-800">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="mt-4 lg:mt-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-4 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg mx-2 rounded-xl'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button className="w-full flex items-center px-6 py-4 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 hover:-translate-y-0.5">
              <LogOut className="w-5 h-5 mr-3" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </motion.div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Conteúdo principal */}
        <div className="flex-1 p-6 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ stats }) => {
  const statCards = [
    {
      title: 'Vendas do Mês',
      value: stats.vendas.valor,
      change: stats.vendas.variacao,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Itens em Estoque',
      value: stats.estoque.valor,
      change: stats.estoque.variacao,
      icon: Package,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Promoções Ativas',
      value: stats.promocoes.valor,
      change: stats.promocoes.variacao,
      icon: Star,
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
    {
      title: 'Visualizações',
      value: stats.visualizacoes.valor,
      change: stats.visualizacoes.variacao,
      icon: Eye,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Estatísticas */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            const isPositive = stat.change.startsWith('+');
            const TrendIcon = isPositive ? TrendingUp : TrendingDown;
            
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stat.bgColor}`}>
                    <TrendIcon className={`w-4 h-4 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">vs mês anterior</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Gráfico de Vendas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Vendas dos Últimos 7 Dias</h3>
            <p className="text-gray-600 mt-1">Acompanhe o desempenho das suas vendas</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-xl">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Últimos 7 dias</span>
          </div>
        </div>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Gráfico de vendas será implementado aqui</p>
            <p className="text-sm text-gray-400 mt-1">Integração com biblioteca de gráficos</p>
          </div>
        </div>
      </motion.div>

      {/* Ações Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Ações Rápidas</h3>
          <p className="text-gray-600 mt-1">Acesse rapidamente as funcionalidades mais utilizadas</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="group flex items-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-blue-200">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-1">Adicionar Produto</p>
              <p className="text-sm text-gray-600">Cadastrar novo item no estoque</p>
            </div>
          </button>

          <button className="group flex items-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-green-200">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-1">Nova Promoção</p>
              <p className="text-sm text-gray-600">Criar oferta especial</p>
            </div>
          </button>

          <button className="group flex items-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg border border-purple-200">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 mb-1">Ver Relatórios</p>
              <p className="text-sm text-gray-600">Análise detalhada de vendas</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* Informações do Negócio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
      >
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Informações do Negócio</h3>
          <p className="text-gray-600 mt-1">Dados principais da sua empresa</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <Clock className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Horário de funcionamento</h4>
              <p className="text-gray-600">08:00 - 18:00</p>
              <p className="text-sm text-gray-500">Segunda a Sábado</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <MapPin className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Endereço</h4>
              <p className="text-gray-600">Rua das Flores, 123</p>
              <p className="text-sm text-gray-500">Centro - São Paulo</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
            <Phone className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Contato</h4>
              <p className="text-gray-600">(11) 99999-1234</p>
              <p className="text-sm text-gray-500">contato@oficinajao.com.br</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ConfiguracoesPage = () => (
  <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-gray-900">Configurações</h3>
      <p className="text-gray-600 mt-1">Gerencie as configurações da sua conta e negócio</p>
    </div>
    <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
      <div className="text-center">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Página de configurações será implementada aqui</p>
        <p className="text-sm text-gray-400 mt-1">Configurações de perfil, notificações e preferências</p>
      </div>
    </div>
  </div>
);

export default SubscriberDashboard;
