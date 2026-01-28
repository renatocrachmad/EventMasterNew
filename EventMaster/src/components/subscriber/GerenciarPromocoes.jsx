import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Star, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  Calendar,
  Tag,
  TrendingUp,
  Users,
  MousePointer,
  Image,
  Save,
  X
} from 'lucide-react';

const GerenciarPromocoes = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Dados mockados de promoções
  const [promocoes, setPromocoes] = useState([
    {
      id: 1,
      titulo: 'Desconto 20% em Serviços Elétricos',
      descricao: 'Aproveite nossa promoção especial para instalações elétricas residenciais',
      desconto: 20,
      tipo: 'percentual',
      validoAte: '2024-02-15',
      categoria: 'Serviços Elétricos',
      ativo: true,
      visualizacoes: 245,
      cliques: 18,
      conversoes: 3,
      imagem: null
    },
    {
      id: 2,
      titulo: 'Pacote Completo de Encanamento',
      descricao: 'Instalação completa de encanamento com 15% de desconto',
      desconto: 15,
      tipo: 'percentual',
      validoAte: '2024-02-28',
      categoria: 'Encanamento',
      ativo: true,
      visualizacoes: 189,
      cliques: 12,
      conversoes: 2,
      imagem: null
    },
    {
      id: 3,
      titulo: 'Manutenção Preventiva - R$ 50 OFF',
      descricao: 'Serviço de manutenção preventiva com desconto especial',
      desconto: 50,
      tipo: 'valor',
      validoAte: '2024-01-30',
      categoria: 'Manutenção',
      ativo: false,
      visualizacoes: 156,
      cliques: 8,
      conversoes: 1,
      imagem: null
    }
  ]);

  const categorias = [
    'Serviços Elétricos',
    'Encanamento',
    'Manutenção',
    'Pintura',
    'Marcenaria',
    'Jardinagem',
    'Limpeza',
    'Outros'
  ];

  const handleAddPromo = (newPromo) => {
    const promo = {
      ...newPromo,
      id: promocoes.length + 1,
      visualizacoes: 0,
      cliques: 0,
      conversoes: 0
    };
    setPromocoes([promo, ...promocoes]);
    setShowAddModal(false);
  };

  const handleEditPromo = (updatedPromo) => {
    const updated = promocoes.map(p => 
      p.id === updatedPromo.id ? updatedPromo : p
    );
    setPromocoes(updated);
    setEditingPromo(null);
  };

  const handleDeletePromo = (id) => {
    setPromocoes(promocoes.filter(p => p.id !== id));
  };

  const togglePromoStatus = (id) => {
    const updated = promocoes.map(p => 
      p.id === id ? { ...p, ativo: !p.ativo } : p
    );
    setPromocoes(updated);
  };

  const getStatusColor = (ativo) => {
    return ativo ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (ativo) => {
    return ativo ? 'Ativa' : 'Inativa';
  };

  const calculateCTR = (cliques, visualizacoes) => {
    return visualizacoes > 0 ? ((cliques / visualizacoes) * 100).toFixed(1) : '0.0';
  };

  const calculateConversionRate = (conversoes, cliques) => {
    return cliques > 0 ? ((conversoes / cliques) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="space-y-6">
      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Promoções Ativas</p>
              <p className="text-2xl font-bold text-green-600">
                {promocoes.filter(p => p.ativo).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Total de Visualizações</p>
              <p className="text-2xl font-bold text-blue-600">
                {promocoes.reduce((sum, p) => sum + p.visualizacoes, 0)}
              </p>
            </div>
            <Eye className="w-8 h-8 text-blue-600" />
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
              <p className="text-sm font-medium text-gray-600">Taxa de Cliques</p>
              <p className="text-2xl font-bold text-purple-600">
                {calculateCTR(
                  promocoes.reduce((sum, p) => sum + p.cliques, 0),
                  promocoes.reduce((sum, p) => sum + p.visualizacoes, 0)
                )}%
              </p>
            </div>
            <MousePointer className="w-8 h-8 text-purple-600" />
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
              <p className="text-sm font-medium text-gray-600">Conversões</p>
              <p className="text-2xl font-bold text-orange-600">
                {promocoes.reduce((sum, p) => sum + p.conversoes, 0)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-600" />
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
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Minhas Promoções</h3>
            <p className="text-sm text-gray-600">Gerencie suas ofertas especiais no carrossel da plataforma</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                previewMode 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'text-gray-600 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Sair do Preview' : 'Preview'}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Promoção
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preview do carrossel */}
      {previewMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
        >
          <h4 className="text-md font-semibold text-gray-800 mb-4">Preview do Carrossel</h4>
          <CarrosselPreview promocoes={promocoes.filter(p => p.ativo)} />
        </motion.div>
      )}

      {/* Lista de promoções */}
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
                  Promoção
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Desconto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Válido até
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
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
              {promocoes.map((promo, index) => (
                <motion.tr
                  key={promo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{promo.titulo}</div>
                      <div className="text-sm text-gray-500">{promo.categoria}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {promo.tipo === 'percentual' ? `${promo.desconto}%` : `R$ ${promo.desconto}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(promo.validoAte).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>{promo.visualizacoes} visualizações</div>
                      <div className="text-xs text-gray-500">
                        CTR: {calculateCTR(promo.cliques, promo.visualizacoes)}% | 
                        Conv: {calculateConversionRate(promo.conversoes, promo.cliques)}%
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => togglePromoStatus(promo.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(promo.ativo)}`}
                    >
                      {getStatusText(promo.ativo)}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingPromo(promo)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePromo(promo.id)}
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

      {/* Modal de adicionar/editar promoção */}
      {(showAddModal || editingPromo) && (
        <PromoModal
          promo={editingPromo}
          onSave={editingPromo ? handleEditPromo : handleAddPromo}
          onClose={() => {
            setShowAddModal(false);
            setEditingPromo(null);
          }}
          categorias={categorias}
        />
      )}
    </div>
  );
};

// Componente de preview do carrossel
const CarrosselPreview = ({ promocoes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (promocoes.length === 0) {
    return (
      <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Nenhuma promoção ativa para exibir</p>
      </div>
    );
  }

  return (
    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center text-white p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
            <Tag className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold mb-2">{promocoes[currentIndex]?.titulo}</h3>
          <p className="text-sm opacity-90 mb-3">{promocoes[currentIndex]?.descricao}</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
            Aproveitar Oferta
          </button>
        </div>
      </div>
      
      {promocoes.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {promocoes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Modal para adicionar/editar promoções
const PromoModal = ({ promo, onSave, onClose, categorias }) => {
  const [formData, setFormData] = useState({
    titulo: promo?.titulo || '',
    descricao: promo?.descricao || '',
    desconto: promo?.desconto || 0,
    tipo: promo?.tipo || 'percentual',
    validoAte: promo?.validoAte || '',
    categoria: promo?.categoria || categorias[0],
    ativo: promo?.ativo ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...promo, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {promo ? 'Editar Promoção' : 'Nova Promoção'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título da Promoção</label>
            <input
              type="text"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Desconto 20% em Serviços Elétricos"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Descreva os detalhes da promoção..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Desconto</label>
              <select
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentual">Percentual (%)</option>
                <option value="valor">Valor Fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desconto {formData.tipo === 'percentual' ? '(%)' : '(R$)'}
              </label>
              <input
                type="number"
                value={formData.desconto}
                onChange={(e) => setFormData({ ...formData, desconto: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="0"
                step={formData.tipo === 'percentual' ? '1' : '0.01'}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categorias.map(categoria => (
                <option key={categoria} value={categoria}>{categoria}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Válido até</label>
            <input
              type="date"
              value={formData.validoAte}
              onChange={(e) => setFormData({ ...formData, validoAte: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="ativo" className="ml-2 text-sm text-gray-700">
              Ativar promoção imediatamente
            </label>
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
              {promo ? 'Salvar' : 'Criar Promoção'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default GerenciarPromocoes;

