import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Download,
  Upload
} from 'lucide-react';

const ControleEstoque = () => {
  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todos');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Dados mockados do estoque
  const [estoque, setEstoque] = useState([
    {
      id: 1,
      nome: 'Toalha de Mesa Branca (Retangular)',
      categoria: 'Têxteis',
      quantidade: 50,
      minimo: 10,
      preco: 12.00,
      fornecedor: 'Casa & Pano',
      ultimaMovimentacao: '2024-01-15',
      status: 'normal'
    },
    {
      id: 2,
      nome: 'Prato de Jantar Porcelana',
      categoria: 'Louças',
      quantidade: 180,
      minimo: 200,
      preco: 5.50,
      fornecedor: 'Louças Finas SA',
      ultimaMovimentacao: '2024-01-10',
      status: 'baixo'
    },
    {
      id: 3,
      nome: 'Taça de Vinho Cristal',
      categoria: 'Copos',
      quantidade: 250,
      minimo: 2,
      preco: 8.00,
      fornecedor: 'Cristais & Cia',
      ultimaMovimentacao: '2024-01-12',
      status: 'normal'
    },
    {
      id: 4,
      nome: 'Arranjo de Flores (Mesa)',
      categoria: 'Decoração',
      quantidade: 0,
      minimo: 5,
      preco: 75.00,
      fornecedor: 'Floricultura Bela Flor',
      ultimaMovimentacao: '2024-01-08',
      status: 'esgotado'
    }
  ]);

  const categorias = ['todos', 'Têxteis', 'Louças', 'Copos', 'Decoração', 'Mobiliário'];

  const filteredEstoque = estoque.filter(item => {
    const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todos' || item.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'esgotado': return 'bg-red-100 text-red-800';
      case 'baixo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'esgotado': return 'Esgotado';
      case 'baixo': return 'Estoque Baixo';
      default: return 'Normal';
    }
  };

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: estoque.length + 1,
      ultimaMovimentacao: new Date().toISOString().split('T')[0],
      status: newItem.quantidade === 0 ? 'esgotado' : 
              newItem.quantidade <= newItem.minimo ? 'baixo' : 'normal'
    };
    setEstoque([...estoque, item]);
    setShowAddModal(false);
  };

  const handleEditItem = (updatedItem) => {
    const updated = estoque.map(item => 
      item.id === updatedItem.id ? {
        ...updatedItem,
        status: updatedItem.quantidade === 0 ? 'esgotado' : 
                updatedItem.quantidade <= updatedItem.minimo ? 'baixo' : 'normal'
      } : item
    );
    setEstoque(updated);
    setEditingItem(null);
  };

  const handleDeleteItem = (id) => {
    setEstoque(estoque.filter(item => item.id !== id));
  };

  const handleExportCSV = () => {
    const headers = ['Nome', 'Categoria', 'Quantidade', 'Mínimo', 'Preço', 'Fornecedor', 'Status'];
    const rows = filteredEstoque.map(item => [
      `"${item.nome}"`,
      item.categoria,
      item.quantidade,
      item.minimo,
      item.preco.toFixed(2),
      `"${item.fornecedor}"`,
      item.status
    ]);
    
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `estoque_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target.result;
        const lines = text.split('\n');
        const newItems = [];
        const startIndex = lines[0].toLowerCase().includes('nome') ? 1 : 0;

        for (let i = startIndex; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          const [nome, categoria, quantidade, minimo, preco, fornecedor] = line.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
          
          if (nome && quantidade) {
            const qty = parseInt(quantidade);
            const min = parseInt(minimo || 0);
            newItems.push({
              id: Date.now() + i,
              nome,
              categoria: categoria || 'Outros',
              quantidade: qty,
              minimo: min,
              preco: parseFloat(preco) || 0,
              fornecedor: fornecedor || 'Não informado',
              ultimaMovimentacao: new Date().toISOString().split('T')[0],
              status: qty === 0 ? 'esgotado' : qty <= min ? 'baixo' : 'normal'
            });
          }
        }
        setEstoque(prev => [...newItems, ...prev]);
        alert(`${newItems.length} itens importados com sucesso!`);
      } catch (err) {
        alert('Erro ao importar CSV. Verifique se o formato está correto.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const handleExportPDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text('EventMaster', pageWidth / 2, 18, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Relatório de Controle de Estoque', pageWidth / 2, 28, { align: 'center' });

    let y = 50;
    doc.setTextColor(31, 41, 55);
    filteredEstoque.forEach(item => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text(`${item.nome} (${item.categoria})`, 15, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`Qtd: ${item.quantidade} | Mín: ${item.minimo} | Preço: R$ ${item.preco.toFixed(2)} | Status: ${getStatusText(item.status)}`, 15, y + 6);
      y += 15;
    });
    doc.save(`estoque_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-900">{estoque.length}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">
                R$ {estoque.reduce((total, item) => total + (item.quantidade * item.preco), 0).toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Estoque Baixo</p>
              <p className="text-2xl font-bold text-yellow-600">
                {estoque.filter(item => item.status === 'baixo').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Esgotados</p>
              <p className="text-2xl font-bold text-red-600">
                {estoque.filter(item => item.status === 'esgotado').length}
              </p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-600" />
          </div>
        </motion.div>
      </div>

      {/* Controles */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>
                  {categoria === 'todos' ? 'Todas as Categorias' : categoria}
                </option>
              ))}
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
              Adicionar Item
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabela de estoque */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantidade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preço Unit.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEstoque.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                      <div className="text-sm text-gray-500">{item.fornecedor}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.quantidade}</div>
                    <div className="text-xs text-gray-500">Mín: {item.minimo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    R$ {item.preco.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal de adicionar/editar item */}
      {(showAddModal || editingItem) && (
        <ItemModal
          item={editingItem}
          onSave={editingItem ? handleEditItem : handleAddItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

// Modal para adicionar/editar itens
const ItemModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    nome: item?.nome || '',
    categoria: item?.categoria || 'Têxteis',
    quantidade: item?.quantidade || 0,
    minimo: item?.minimo || 0,
    preco: item?.preco || 0,
    fornecedor: item?.fornecedor || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...item, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {item ? 'Editar Item' : 'Adicionar Item'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              <option value="Têxteis">Têxteis</option>
              <option value="Louças">Louças</option>
              <option value="Copos">Copos</option>
              <option value="Decoração">Decoração</option>
              <option value="Mobiliário">Mobiliário</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
              <input
                type="number"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estoque Mínimo</label>
              <input
                type="number"
                value={formData.minimo}
                onChange={(e) => setFormData({ ...formData, minimo: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Preço Unitário (R$)</label>
            <input
              type="number"
              step="0.01"
              value={formData.preco}
              onChange={(e) => setFormData({ ...formData, preco: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fornecedor</label>
            <input
              type="text"
              value={formData.fornecedor}
              onChange={(e) => setFormData({ ...formData, fornecedor: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
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
              {item ? 'Salvar' : 'Adicionar'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ControleEstoque;
