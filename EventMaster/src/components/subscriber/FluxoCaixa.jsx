import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  Edit3,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  PieChart,
  BarChart3
} from 'lucide-react';

const FluxoCaixa = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState('entrada');
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Dados mockados de transações
  const [transacoes, setTransacoes] = useState([
    {
      id: 1,
      tipo: 'entrada',
      descricao: 'Serviço de Encanamento - Cliente João',
      categoria: 'Serviços',
      valor: 350.00,
      data: '2024-01-15',
      status: 'confirmado'
    },
    {
      id: 2,
      tipo: 'saida',
      descricao: 'Compra de Ferramentas',
      categoria: 'Equipamentos',
      valor: 120.50,
      data: '2024-01-14',
      status: 'confirmado'
    },
    {
      id: 3,
      tipo: 'entrada',
      descricao: 'Reparo Elétrico - Cliente Maria',
      categoria: 'Serviços',
      valor: 280.00,
      data: '2024-01-13',
      status: 'pendente'
    },
    {
      id: 4,
      tipo: 'saida',
      descricao: 'Combustível',
      categoria: 'Transporte',
      valor: 85.00,
      data: '2024-01-12',
      status: 'confirmado'
    },
    {
      id: 5,
      tipo: 'entrada',
      descricao: 'Instalação de Torneira',
      categoria: 'Serviços',
      valor: 150.00,
      data: '2024-01-11',
      status: 'confirmado'
    }
  ]);

  // Cálculos financeiros
  const entradas = transacoes
    .filter(t => t.tipo === 'entrada' && t.status === 'confirmado')
    .reduce((sum, t) => sum + t.valor, 0);
  
  const saidas = transacoes
    .filter(t => t.tipo === 'saida' && t.status === 'confirmado')
    .reduce((sum, t) => sum + t.valor, 0);
  
  const saldo = entradas - saidas;
  
  const pendentes = transacoes
    .filter(t => t.status === 'pendente')
    .reduce((sum, t) => sum + t.valor, 0);

  const categorias = {
    entrada: ['Serviços', 'Vendas', 'Outros'],
    saida: ['Equipamentos', 'Transporte', 'Materiais', 'Outros']
  };

  const handleAddTransaction = (newTransaction) => {
    const transaction = {
      ...newTransaction,
      id: transacoes.length + 1,
      data: new Date().toISOString().split('T')[0]
    };
    setTransacoes([transaction, ...transacoes]);
    setShowAddModal(false);
  };

  const handleEditTransaction = (updatedTransaction) => {
    const updated = transacoes.map(t => 
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    setTransacoes(updated);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransacoes(transacoes.filter(t => t.id !== id));
  };

  const getTransactionIcon = (tipo) => {
    return tipo === 'entrada' ? ArrowUpCircle : ArrowDownCircle;
  };

  const getTransactionColor = (tipo) => {
    return tipo === 'entrada' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Cards de resumo financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saldo Atual</p>
              <p className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                R$ {saldo.toFixed(2)}
              </p>
            </div>
            <DollarSign className={`w-8 h-8 ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Entradas</p>
              <p className="text-2xl font-bold text-green-600">R$ {entradas.toFixed(2)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Saídas</p>
              <p className="text-2xl font-bold text-red-600">R$ {saidas.toFixed(2)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-yellow-600">R$ {pendentes.toFixed(2)}</p>
            </div>
            <Calendar className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>
      </div>

      {/* Gráfico de fluxo de caixa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Fluxo de Caixa</h3>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="semana">Última Semana</option>
              <option value="mes">Último Mês</option>
              <option value="trimestre">Último Trimestre</option>
            </select>
            <button className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <BarChart3 className="w-4 h-4 mr-1" />
              Gráfico
            </button>
          </div>
        </div>
        
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Gráfico de fluxo de caixa será implementado aqui</p>
            <p className="text-sm text-gray-400">Integração com biblioteca de gráficos</p>
          </div>
        </div>
      </motion.div>

      {/* Controles e filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Todas as Categorias</option>
              <option>Serviços</option>
              <option>Equipamentos</option>
              <option>Transporte</option>
            </select>
            
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Todos os Status</option>
              <option>Confirmado</option>
              <option>Pendente</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lista de transações */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Transações Recentes</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {transacoes.map((transacao, index) => {
            const Icon = getTransactionIcon(transacao.tipo);
            return (
              <motion.div
                key={transacao.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Icon className={`w-8 h-8 ${getTransactionColor(transacao.tipo)}`} />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{transacao.descricao}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span>{transacao.categoria}</span>
                        <span>•</span>
                        <span>{new Date(transacao.data).toLocaleDateString('pt-BR')}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transacao.status === 'confirmado' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transacao.status === 'confirmado' ? 'Confirmado' : 'Pendente'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`text-lg font-semibold ${getTransactionColor(transacao.tipo)}`}>
                      {transacao.tipo === 'entrada' ? '+' : '-'}R$ {transacao.valor.toFixed(2)}
                    </span>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingTransaction(transacao)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transacao.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal de adicionar/editar transação */}
      {(showAddModal || editingTransaction) && (
        <TransactionModal
          transaction={editingTransaction}
          onSave={editingTransaction ? handleEditTransaction : handleAddTransaction}
          onClose={() => {
            setShowAddModal(false);
            setEditingTransaction(null);
          }}
          categorias={categorias}
        />
      )}
    </div>
  );
};

// Modal para adicionar/editar transações
const TransactionModal = ({ transaction, onSave, onClose, categorias }) => {
  const [formData, setFormData] = useState({
    tipo: transaction?.tipo || 'entrada',
    descricao: transaction?.descricao || '',
    categoria: transaction?.categoria || 'Serviços',
    valor: transaction?.valor || 0,
    status: transaction?.status || 'confirmado'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...transaction, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {transaction ? 'Editar Transação' : 'Nova Transação'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              value={formData.tipo}
              onChange={(e) => setFormData({ 
                ...formData, 
                tipo: e.target.value,
                categoria: categorias[e.target.value][0]
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <input
              type="text"
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva a transação..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categorias[formData.tipo].map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.valor}
              onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="confirmado">Confirmado</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {transaction ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default FluxoCaixa;

