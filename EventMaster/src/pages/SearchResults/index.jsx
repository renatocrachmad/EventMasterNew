import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Star, MapPin, Clock, Phone, Eye, FileText, XCircle } from 'lucide-react';
import ContactModal from '../../components/ContactModal';
import './style.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [contactModal, setContactModal] = useState({ isOpen: false, provider: null });
  const [budgetModal, setBudgetModal] = useState({ isOpen: false, provider: null });
  const [budgetForm, setBudgetForm] = useState({
    eventDate: '',
    guests: '',
    location: '',
    message: ''
  });

  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'all';

  // Dados mockados de serviços para demonstração
  const mockServices = [
    {
      id: 1,
      name: "Sabor & Festa Buffet",
      type: "buffet",
      description: "Buffet completo para casamentos e eventos corporativos com cardápio personalizado",
      rating: 4.9,
      reviews: 156,
      distance: "2.5 km",
      address: "Av. das Festas, 100 - Centro",
      phone: "(11) 99999-1111",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["Jantar", "Coquetel", "Bebidas", "Garçons"],
      price: "$$$",
      openTime: "09:00 - 18:00"
    },
    {
      id: 2,
      name: "Flores & Cores Decorações",
      type: "decoracao",
      description: "Projetos de decoração floral e ambientação para tornar seu evento único",
      rating: 4.8,
      reviews: 98,
      distance: "3.2 km",
      address: "Rua das Orquídeas, 55 - Jardim",
      phone: "(11) 99999-2222",
      image: "https://images.unsplash.com/photo-1519225468063-3f83797b2f42?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["Arranjos Florais", "Mobiliário", "Iluminação Cênica", "Buquês"],
      price: "$$",
      openTime: "08:00 - 19:00"
    },
    {
      id: 3,
      name: "DJ Night Beat",
      type: "som",
      description: "A melhor seleção musical e estrutura de som e luz para sua pista de dança",
      rating: 4.7,
      reviews: 210,
      distance: "5.0 km",
      address: "Atendimento no local do evento",
      phone: "(11) 99999-3333",
      image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["DJ", "Sonorização", "Iluminação", "Pista de LED"],
      price: "$$",
      openTime: "24h"
    },
    {
      id: 4,
      name: "Memórias em Foco",
      type: "foto",
      description: "Fotografia e filmagem profissional para eternizar os momentos especiais",
      rating: 5.0,
      reviews: 134,
      distance: "1.8 km",
      address: "Rua da Imagem, 42 - Vila Nova",
      phone: "(11) 99999-4444",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["Fotografia", "Filmagem", "Drone", "Álbum"],
      price: "$$$",
      openTime: "09:00 - 20:00"
    },
    {
      id: 5,
      name: "Espaço Cristal",
      type: "locais",
      description: "Salão de festas luxuoso com capacidade para 300 pessoas e área externa",
      rating: 4.6,
      reviews: 87,
      distance: "8.5 km",
      address: "Estrada do Campo, km 12",
      phone: "(11) 99999-5555",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["Salão", "Jardim", "Estacionamento", "Cozinha Industrial"],
      price: "$$$$",
      openTime: "Visitas agendadas"
    },
    {
      id: 6,
      name: "Doce Encanto Confeitaria",
      type: "buffet",
      description: "Bolos artísticos e doces finos que encantam pelo sabor e beleza",
      rating: 4.9,
      reviews: 312,
      distance: "1.5 km",
      address: "Av. dos Doces, 789 - Centro",
      phone: "(11) 99999-6666",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=300&h=200",
      services: ["Bolos de Casamento", "Doces Finos", "Bem-casados", "Degustação"],
      price: "$$",
      openTime: "09:00 - 18:00"
    }
  ];

  useEffect(() => {
    // Simular carregamento
    setLoading(true);
    setTimeout(() => {
      let filteredResults = mockServices;

      // Filtrar por tipo
      if (type !== 'all') {
        filteredResults = filteredResults.filter(service => service.type === type);
      }

      // Filtrar por termo de busca
      if (query) {
        filteredResults = filteredResults.filter(service =>
          service.name.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase()) ||
          service.services.some(s => s.toLowerCase().includes(query.toLowerCase()))
        );
      }

      // Ordenar resultados
      switch (sortBy) {
        case 'rating':
          filteredResults.sort((a, b) => b.rating - a.rating);
          break;
        case 'distance':
          filteredResults.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
          break;
        case 'reviews':
          filteredResults.sort((a, b) => b.reviews - a.reviews);
          break;
        default:
          // relevance - manter ordem original
          break;
      }

      setResults(filteredResults);
      setLoading(false);
    }, 1000);
  }, [query, type, sortBy]);

  const handleContactService = (service) => {
    setContactModal({ isOpen: true, provider: service });
  };

  const handleRequestBudget = (service) => {
    setBudgetModal({ isOpen: true, provider: service });
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitação de orçamento enviada para ${budgetModal.provider.name}! O prestador responderá em breve.`);
    setBudgetModal({ isOpen: false, provider: null });
    setBudgetForm({ eventDate: '', guests: '', location: '', message: '' });
  };

  const handleViewDetails = (service) => {
    navigate(`/service/${service.id}`);
  };

  return (
    <div className="search-results-page">
      {/* Header */}
      <div className="search-header">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/')}
              className="back-button"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-white">Resultados da Busca</h1>
          </div>
          
          <div className="search-info">
            <p className="text-blue-100">
              {query ? `Buscando por "${query}"` : 'Todos os serviços'}
              {type !== 'all' && ` na categoria ${type}`}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filtros e Ordenação */}
        <div className="filters-section">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="results-count">
              {loading ? (
                <p className="text-gray-600">Carregando...</p>
              ) : (
                <p className="text-gray-600">
                  {results.length} {results.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
                </p>
              )}
            </div>
            
            <div className="sort-controls">
              <label className="text-sm text-gray-600 mr-2">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevância</option>
                <option value="rating">Avaliação</option>
                <option value="distance">Distância</option>
                <option value="reviews">Número de avaliações</option>
              </select>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="results-grid">
          {loading ? (
            // Loading skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="service-card-skeleton">
                  <div className="skeleton-image"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line skeleton-title"></div>
                    <div className="skeleton-line skeleton-text"></div>
                    <div className="skeleton-line skeleton-text short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : results.length === 0 ? (
            // Nenhum resultado
            <div className="no-results">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum resultado encontrado</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar sua busca ou remover alguns filtros.
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Voltar à página inicial
              </button>
            </div>
          ) : (
            // Resultados encontrados
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="service-card"
                >
                  <div className="service-image">
                    <img src={service.image} alt={service.name} />
                    <div className="service-price">{service.price}</div>
                  </div>
                  
                  <div className="service-content">
                    <div className="service-header">
                      <h3 className="service-name">{service.name}</h3>
                      <div className="service-rating">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                        <span className="text-gray-500">({service.reviews})</span>
                      </div>
                    </div>
                    
                    <p className="service-description">{service.description}</p>
                    
                    <div className="service-info">
                      <div className="info-item">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{service.distance} • {service.address}</span>
                      </div>
                      <div className="info-item">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{service.openTime}</span>
                      </div>
                    </div>
                    
                    <div className="service-tags">
                      {service.services.slice(0, 3).map((tag, i) => (
                        <span key={i} className="service-tag">{tag}</span>
                      ))}
                      {service.services.length > 3 && (
                        <span className="service-tag more">+{service.services.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="service-actions">
                      <button
                        onClick={() => handleContactService(service)}
                        className="contact-button"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Contatar</span>
                      </button>
                      <button
                        onClick={() => handleRequestBudget(service)}
                        className="budget-button"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Orçamento</span>
                      </button>
                      <button
                        onClick={() => handleViewDetails(service)}
                        className="details-button"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Detalhes</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={contactModal.isOpen}
        onClose={() => setContactModal({ isOpen: false, provider: null })}
        provider={contactModal.provider}
      />

      {/* Modal de Solicitação de Orçamento */}
      {budgetModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Solicitar Orçamento</h2>
              <button 
                onClick={() => setBudgetModal({ isOpen: false, provider: null })} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleBudgetSubmit} className="p-6 space-y-4">
              <div className="text-sm text-gray-600 mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                Serviço selecionado: <strong>{budgetModal.provider.name}</strong>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Data do Evento</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={budgetForm.eventDate}
                    onChange={(e) => setBudgetForm({...budgetForm, eventDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nº de Convidados</label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 150"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={budgetForm.guests}
                    onChange={(e) => setBudgetForm({...budgetForm, guests: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Local do Evento</label>
                <input
                  type="text"
                  required
                  placeholder="Cidade, bairro ou endereço do local"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={budgetForm.location}
                  onChange={(e) => setBudgetForm({...budgetForm, location: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Detalhes Adicionais</label>
                <textarea
                  rows="3"
                  placeholder="Conte um pouco mais sobre o que você precisa..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={budgetForm.message}
                  onChange={(e) => setBudgetForm({...budgetForm, message: e.target.value})}
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                Enviar Solicitação
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
