import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServiceSearch = ({
  onSearchTermChange,
  onServiceTypeChange,
  searchTerm,
  serviceType,
}) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');

  const serviceTypes = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'buffet', label: 'Buffet e Catering' },
    { value: 'decoracao', label: 'Decoração' },
    { value: 'som', label: 'DJ e Som' },
    { value: 'foto', label: 'Fotografia e Filmagem' },
    { value: 'locais', label: 'Locais e Salões' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navega para a página de resultados com os parâmetros de busca
    navigate(
      `/search-results?query=${searchTerm}&type=${serviceType}&location=${location}`
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mx-4 -mt-8 relative z-20 max-w-4xl mx-auto">
      <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por buffet, DJ, decoração..."
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </div>
        
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={serviceType}
            onChange={(e) => onServiceTypeChange(e.target.value)}
            className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 bg-white"
          >
            {serviceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cidade ou região"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300"
          />
        </div>
        
        <button
          type="submit"
          className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Buscar
        </button>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Populares:</span>
        {['Casamento', 'Festa Infantil', 'DJ', 'Decoração'].map((tag) => (
          <button
            key={tag}
            onClick={() => onSearchTermChange(tag)}
            className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSearch;
