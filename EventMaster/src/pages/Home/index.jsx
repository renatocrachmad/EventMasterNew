import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ControlledCarousel from "../../components/Carrossel";
import ServiceCard from "../../components/ServiceCard";
import ServiceSearch from "../../components/ServiceSearch";
import { PromocoesSection } from "../../components/promocoes";
import TorneParceiro from "../../components/TorneParceiro";
import Footer from "../../components/Footer";
import { Sun, Moon, Plus, Minus, Type } from "lucide-react";
import "../../App.css";

// Dados mockados (poderiam vir de uma API no futuro)
const services = [
  {
    id: 1,
    title: "Buffet e Catering",
    description:
      "Serviços completos de alimentação e bebidas para casamentos, festas corporativas e aniversários",
    icon: "🍽️",
    type: "buffet",
  },
  {
    id: 2,
    title: "Decoração",
    description:
      "Projetos de decoração personalizados, floristas e ambientação para seu evento",
    icon: "✨",
    type: "decoracao",
  },
  {
    id: 3,
    title: "DJ e Sonorização",
    description:
      "DJs profissionais, bandas, iluminação e equipamentos de som de alta qualidade",
    icon: "🎵",
    type: "som",
  },
  {
    id: 4,
    title: "Fotografia e Filmagem",
    description:
      "Registre os melhores momentos com fotógrafos e videomakers especializados",
    icon: "📸",
    type: "foto",
  },
  {
    id: 5,
    title: "Locais e Salões",
    description:
      "Encontre o espaço perfeito: sítios, salões de festa, hotéis e espaços para eventos",
    icon: "🏰",
    type: "locais",
  },
];

const propagandas = [
  {
    id: 1,
    nome: "Pacote Casamento Completo",
    imagem: "Logo1.png",
    link: "https://empresa1.com",
  },
  {
    id: 2,
    nome: "Festa Infantil Temática",
    imagem: "Logo1.png",
    link: "https://empresa2.com",
  },
  {
    id: 3,
    nome: "Formatura Inesquecível",
    imagem: "Logo1.png",
    link: "https://empresa3.com",
  },
];

const promocoesExemplo = [
  {
    id: 1,
    titulo: "Desconto em Buffet Completo",
    fornecedor: "Sabor & Festa",
    validoAte: "15 de junho de 2025, 2h00",
    logo: "Logo1.png",
  },
  {
    id: 2,
    titulo: "Decoração Floral com 20% OFF",
    fornecedor: "Flores & Cores",
    validoAte: "30 de junho de 2025, 4h00",
    logo: "Logo1.png",
  },
  {
    id: 3,
    titulo: "DJ + Iluminação Promocional",
    fornecedor: "Beat Sound",
    validoAte: "20 de maio de 2025, 5h00",
    logo: "Logo1.png",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceType, setServiceType] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  // Efeito para aplicar o tema escuro no documento
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Função para ajustar o tamanho da fonte entre 80% e 150%
  const adjustFontSize = (delta) => {
    setFontSize((prev) => Math.min(Math.max(prev + delta, 80), 150));
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = serviceType === "all" || service.type === serviceType;
    return matchesSearch && matchesType;
  });

  const handleParceiroClick = () => {
    navigate("/seja-parceiro");
  };

  return (
    <div 
      className="min-h-screen bg-background text-foreground transition-colors duration-300" 
      style={{ fontSize: `${fontSize}%` }}
    >
      {/* Header com botões de navegação */}
      <div className="absolute top-4 right-4 z-50 flex flex-wrap justify-end gap-1 items-center">
        {/* Grupo unificado de Acessibilidade e Navegação */}
        <div className="flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-lg border border-white/10 shadow-sm">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-white/20 rounded-md transition-colors text-white"
            title={darkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <div className="w-px h-4 bg-white/20 mx-1" />
          
          <button
            onClick={() => adjustFontSize(10)}
            className="p-2 hover:bg-white/20 rounded-md transition-colors text-white"
            title="Aumentar Fonte"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          <Type className="w-4 h-4 text-white/60" />
          
          <button
            onClick={() => adjustFontSize(-10)}
            className="p-2 hover:bg-white/20 rounded-md transition-colors text-white"
            title="Diminuir Fonte"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => navigate("/client-profile")}
          className="px-4 py-2 bg-green-600/80 backdrop-blur-sm text-white border border-green-500/30 rounded-lg hover:bg-green-700/90 transition-all duration-200"
        >
          Perfil Cliente
        </button>

        <button
          onClick={() => navigate("/provider-profile")}
          className="px-4 py-2 bg-purple-600/80 backdrop-blur-sm text-white border border-purple-500/30 rounded-lg hover:bg-purple-700/90 transition-all duration-200"
        >
          Perfil Prestador
        </button>

        <button
          onClick={() => navigate("/cadastro")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          Cadastrar
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/30 transition-all duration-200"
        >
          Entrar
        </button>
      </div>

      {/* Hero Section EventMaster */}
      <div className="relative bg-gradient-to-r from-purple-900 to-blue-900 text-white py-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">EventMaster</h1>
          <div className="text-xl md:text-2xl text-blue-100 mb-8">Transforme seu evento em uma experiência inesquecível. Encontre os melhores profissionais para sua festa.</div>
        </div>
      </div>

      <ServiceSearch
        onSearchTermChange={setSearchTerm}
        onServiceTypeChange={setServiceType}
        searchTerm={searchTerm}
        serviceType={serviceType}
      />

      <div className="px-4 py-8">
        <ControlledCarousel items={propagandas} />
      </div>

      <PromocoesSection promocoes={promocoesExemplo} />

      <div className="bg-gray-700 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Categorias de Serviços para Eventos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </div>

      <TorneParceiro onClickParceiro={handleParceiroClick} />

      <Footer />
    </div>
  );
};

export default Home;
