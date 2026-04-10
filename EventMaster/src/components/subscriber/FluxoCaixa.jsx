import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Filter,
  Download,
  Upload,
  Edit3,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  PieChart,
  BarChart3
} from 'lucide-react';

const FluxoCaixa = () => {
  const fileInputRef = useRef(null);
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionType, setTransactionType] = useState('entrada');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [filterCategory, setFilterCategory] = useState('Todas');
  const [filterStatus, setFilterStatus] = useState('Todos');

  // Dados mockados de transações
  const [transacoes, setTransacoes] = useState([
    {
      id: 1,
      tipo: 'entrada',
      descricao: 'Sinal - Casamento Ana & Pedro',
      categoria: 'Eventos',
      valor: 5000.00,
      data: '2024-01-15',
      status: 'confirmado'
    },
    {
      id: 2,
      tipo: 'saida',
      descricao: 'Compra de Bebidas - Adega Central',
      categoria: 'Insumos',
      valor: 1200.00,
      data: '2024-01-14',
      status: 'confirmado'
    },
    {
      id: 3,
      tipo: 'entrada',
      descricao: 'Pagamento Final - Festa 15 Anos',
      categoria: 'Eventos',
      valor: 8000.00,
      data: '2024-01-13',
      status: 'pendente'
    },
    {
      id: 4,
      tipo: 'saida',
      descricao: 'Pagamento Equipe de Garçons',
      categoria: 'Pessoal',
      valor: 600.00,
      data: '2024-01-12',
      status: 'confirmado'
    },
    {
      id: 5,
      tipo: 'entrada',
      descricao: 'Degustação - Noivos Lucas e Carla',
      categoria: 'Degustações',
      valor: 150.00,
      data: '2024-01-11',
      status: 'confirmado'
    }
  ]);

  // Lógica de filtragem das transações
  const filteredTransacoes = transacoes.filter(t => {
    const matchesCategory = filterCategory === 'Todas' || t.categoria === filterCategory;
    const matchesStatus = filterStatus === 'Todos' || t.status === filterStatus;
    return matchesCategory && matchesStatus;
  });

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
    entrada: ['Eventos', 'Sinais', 'Degustações', 'Outros'],
    saida: ['Insumos', 'Pessoal', 'Aluguel', 'Transporte', 'Marketing', 'Outros']
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

  const handleExportCSV = () => {
    const headers = ['Tipo', 'Descrição', 'Categoria', 'Valor', 'Data', 'Status'];
    const rows = filteredTransacoes.map(t => [
      t.tipo,
      `"${t.descricao}"`,
      t.categoria,
      t.valor.toFixed(2),
      t.data,
      t.status
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fluxo_caixa_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        const newTransactions = [];
        const startIndex = lines[0].toLowerCase().includes('descri') ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          const [tipo, descricao, categoria, valor, data, status] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
          if (descricao && valor) {
            newTransactions.push({
              id: Date.now() + i,
              tipo: tipo?.toLowerCase().includes('saida') ? 'saida' : 'entrada',
              descricao,
              categoria: categoria || 'Outros',
              valor: parseFloat(valor.replace(',', '.')),
              data: data || new Date().toISOString().split('T')[0],
              status: status?.toLowerCase().includes('pendente') ? 'pendente' : 'confirmado'
            });
          }
        }
        setTransacoes(prev => [...newTransactions, ...prev]);
        alert(`${newTransactions.length} transações importadas com sucesso!`);
      } catch (err) { alert('Erro ao processar o arquivo CSV.'); }
    };
    reader.readAsText(file);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Configuração de cores e estilos
    const primary = [79, 70, 229]; // Indigo 600
    const dark = [31, 41, 55]; // Gray 800

    // Cabeçalho estilizado
    doc.setFillColor(...primary);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('EventMaster', pageWidth / 2, 18, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório Financeiro de Fluxo de Caixa', pageWidth / 2, 28, { align: 'center' });

    // Seção de Resumo
    doc.setTextColor(...dark);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Resumo Financeiro', 15, 55);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Saldo Consolidado: R$ ${saldo.toFixed(2)}`, 15, 65);
    doc.text(`Total de Entradas: R$ ${entradas.toFixed(2)}`, 15, 72);
    doc.text(`Total de Saídas: R$ ${saidas.toFixed(2)}`, 15, 79);
    doc.text(`Valores Pendentes: R$ ${pendentes.toFixed(2)}`, 15, 86);

    // Tabela de Transações
    let y = 100;
    doc.setFillColor(243, 244, 246);
    doc.rect(15, y, pageWidth - 30, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Data', 20, y + 7);
    doc.text('Descrição', 45, y + 7);
    doc.text('Categoria', 110, y + 7);
    doc.text('Tipo', 150, y + 7);
    doc.text('Valor', 175, y + 7);

    // Conteúdo da Tabela
    y += 10;
    doc.setFont('helvetica', 'normal');
    filteredTransacoes.forEach((t) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      
      doc.text(new Date(t.data + 'T00:00:00').toLocaleDateString('pt-BR'), 20, y + 7);
      doc.text(t.descricao.substring(0, 30), 45, y + 7);
      doc.text(t.categoria, 110, y + 7);
      doc.text(t.tipo === 'entrada' ? 'Entrada' : 'Saída', 150, y + 7);
      
      // Cor dinâmica para o valor
      doc.setTextColor(t.tipo === 'entrada' ? 16 : 239, t.tipo === 'entrada' ? 185 : 68, t.tipo === 'entrada' ? 129 : 68);
      doc.text(`R$ ${t.valor.toFixed(2)}`, 175, y + 7);
      doc.setTextColor(...dark);
      y += 10;
    });

    doc.save(`fluxo_caixa_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const chartData = {
    semana: [
      { name: 'Seg', entradas: 1200, saidas: 800 },
      { name: 'Ter', entradas: 2100, saidas: 1100 },
      { name: 'Qua', entradas: 800, saidas: 1500 },
      { name: 'Qui', entradas: 1600, saidas: 1200 },
      { name: 'Sex', entradas: 2500, saidas: 900 },
      { name: 'Sáb', entradas: 4000, saidas: 2000 },
      { name: 'Dom', entradas: 3200, saidas: 1800 },
    ],
    mes: [
      { name: 'Semana 1', entradas: 8500, saidas: 4200 },
      { name: 'Semana 2', entradas: 6200, saidas: 3800 },
      { name: 'Semana 3', entradas: 9800, saidas: 5100 },
      { name: 'Semana 4', entradas: 12000, saidas: 4500 },
    ],
    trimestre: [
      { name: 'Janeiro', entradas: 32000, saidas: 18000 },
      { name: 'Fevereiro', entradas: 28000, saidas: 15000 },
      { name: 'Março', entradas: 35000, saidas: 22000 },
    ]
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
        
        <div className="h-72 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData[selectedPeriod]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12 }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                formatter={(value) => [`R$ ${value.toFixed(2)}`, '']}
              />
              <Legend verticalAlign="top" height={36}/>
              <Area 
                type="monotone" 
                dataKey="entradas" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorEntradas)" 
                strokeWidth={3}
                name="Entradas"
              />
              <Area 
                type="monotone" 
                dataKey="saidas" 
                stroke="#ef4444" 
                fillOpacity={1} 
                fill="url(#colorSaidas)" 
                strokeWidth={3}
                name="Saídas"
              />
            </AreaChart>
          </ResponsiveContainer>
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
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todas">Todas as Categorias</option>
              <option value="Eventos">Eventos</option>
              <option value="Insumos">Insumos</option>
              <option value="Pessoal">Pessoal</option>
              <option value="Transporte">Transporte</option>
              <option value="Outros">Outros</option>
            </select>
            
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Todos">Todos os Status</option>
              <option value="confirmado">Confirmado</option>
              <option value="pendente">Pendente</option>
            </select>
          </div>

          <div className="flex space-x-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImportCSV} 
              accept=".csv" 
              className="hidden" 
            />
            <button 
              onClick={handleExportPDF}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </button>
            <button 
              onClick={handleExportCSV}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV
            </button>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Importar
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
          {filteredTransacoes.map((transacao, index) => {
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
    categoria: transaction?.categoria || 'Eventos',
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
