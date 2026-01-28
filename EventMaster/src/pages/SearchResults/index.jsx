import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Filter, Star, MapPin, Clock, Phone, Eye } from 'lucide-react';
import ContactModal from '../../components/ContactModal';
import './style.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');
  const [contactModal, setContactModal] = useState({ isOpen: false, provider: null });

  const query = searchParams.get('query') || '';
  const type = searchParams.get('type') || 'all';

  // Dados mockados de serviços para demonstração
  const mockServices = [
    {
      id: 1,
      name: "Oficina do João",
      type: "mecanica",
      description: "Especializada em mecânica geral, troca de óleo e revisões completas",
      rating: 4.8,
      reviews: 127,
      distance: "1.2 km",
      address: "Rua das Flores, 123 - Centro",
      phone: "(11) 99999-1234",
      image: "https://via.placeholder.com/300x200",
      services: ["Troca de óleo", "Revisão", "Freios", "Suspensão"],
      price: "$$",
      openTime: "08:00 - 18:00"
    },
    {
      id: 2,
      name: "Auto Elétrica Silva",
      type: "eletrica",
      description: "Diagnóstico e reparo de sistemas elétricos automotivos",
      rating: 4.6,
      reviews: 89,
      distance: "2.1 km",
      address: "Av. Principal, 456 - Jardim",
      phone: "(11) 99999-5678",
      image: "https://via.placeholder.com/300x200",
      services: ["Diagnóstico", "Bateria", "Alternador", "Sistema elétrico"],
      price: "$$$",
      openTime: "07:30 - 17:30"
    },
    {
      id: 3,
      name: "Funilaria Express",
      type: "funilaria",
      description: "Funilaria e pintura automotiva com acabamento premium",
      rating: 4.9,
      reviews: 203,
      distance: "3.5 km",
      address: "Rua da Indústria, 789 - Industrial",
      phone: "(11) 99999-9012",
      image: "https://via.placeholder.com/300x200",
      services: ["Pintura", "Funilaria", "Polimento", "Restauração"],
      price: "$$$$",
      openTime: "08:00 - 17:00"
    },
    {
      id: 4,
      name: "Lava Car Premium",
      type: "lavagem",
      description: "Lavagem completa e detalhamento automotivo",
      rating: 4.4,
      reviews: 156,
      distance: "0.8 km",
      address: "Rua do Comércio, 321 - Centro",
      phone: "(11) 99999-3456",
      image: "https://via.placeholder.com/300x200",
      services: ["Lavagem simples", "Enceramento", "Detalhamento", "Lavagem a seco"],
      price: "$",
      openTime: "06:00 - 20:00"
    },
    {
      id: 5,
      name: "Auto Peças Central",
      type: "pecas",
      description: "Peças originais e paralelas para todas as marcas",
      rating: 4.7,
      reviews: 94,
      distance: "1.8 km",
      address: "Av. das Peças, 654 - Comercial",
      phone: "(11) 99999-7890",
      image: "https://via.placeholder.com/300x200",
      services: ["Peças originais", "Peças paralelas", "Acessórios", "Instalação"],
      price: "$$",
      openTime: "08:00 - 18:00"
    },
    {
      id: 6,
      name: "Mecânica do Bairro",
      type: "mecanica",
      description: "Atendimento personalizado e preços justos",
      rating: 4.5,
      reviews: 78,
      distance: "2.7 km",
      address: "Rua Tranquila, 987 - Residencial",
      phone: "(11) 99999-2468",
      image: "https://via.placeholder.com/300x200",
      services: ["Mecânica geral", "Ar condicionado", "Injeção eletrônica", "Escapamento"],
      price: "$",
      openTime: "07:00 - 17:00"
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
                        Contatar
                      </button>
                      <button
                        onClick={() => handleViewDetails(service)}
                        className="details-button"
                      >
                        Ver Detalhes
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
    </div>
  );
};

export default SearchResults;

