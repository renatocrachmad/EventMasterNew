import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit3,
  LogOut,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Check,
  X,
  Camera
} from "lucide-react";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("agendamentos");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Fernanda Lima",
    email: "fernanda.lima@email.com",
    phone: "(11) 98888-7777",
    address: "Rua das Acácias, 45 - Jardins",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300"
  });

  useEffect(() => {
    setLoading(true);
    
    // Carregar dados do perfil do localStorage se existirem
    const savedProfile = localStorage.getItem("clientProfile");
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }

    // Simular carregamento de agendamentos
    setTimeout(() => {
      const clientBookings = JSON.parse(localStorage.getItem("clientBookings") || "[]");
      setBookings(clientBookings);
      setLoading(false);
    }, 800);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("clienteLogado"); // Exemplo de chave de sessão
      navigate("/");
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("clientProfile", JSON.stringify(profileData));
    setIsEditing(false);
    alert("Perfil atualizado com sucesso!");
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Deseja realmente cancelar este agendamento?")) {
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: "cancelado" } : b
      );
      setBookings(updatedBookings);
      localStorage.setItem("clientBookings", JSON.stringify(updatedBookings));
      
      // Atualizar também no lado do prestador (simulação)
      const providerBookings = JSON.parse(localStorage.getItem("providerBookings") || "[]");
      const updatedProviderBookings = providerBookings.map(b => 
        b.id === bookingId ? { ...b, status: "cancelado" } : b
      );
      localStorage.setItem("providerBookings", JSON.stringify(updatedProviderBookings));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "agendado": return "bg-blue-100 text-blue-800";
      case "confirmado": return "bg-green-100 text-green-800";
      case "concluido": return "bg-purple-100 text-purple-800";
      case "cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "agendado": return <Clock className="w-4 h-4" />;
      case "confirmado": return <CheckCircle className="w-4 h-4" />;
      case "concluido": return <CheckCircle className="w-4 h-4" />;
      case "cancelado": return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const activeBookings = bookings.filter(b => b.status !== "concluido" && b.status !== "cancelado");
  const historyBookings = bookings.filter(b => b.status === "concluido" || b.status === "cancelado");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Home
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={profileData.avatar}
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors shadow-md">
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
              <div className="flex flex-col md:flex-row gap-4 text-white/90">
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" /> {profileData.email}
                </span>
                <span className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-4 h-4" /> {profileData.phone}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => navigate("/search")}
                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-all shadow-md"
              >
                <Search className="w-5 h-5" />
                Buscar Serviços
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-red-500/20 border border-red-200/30 text-white rounded-xl hover:bg-red-500/30 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-xl shadow-sm border border-gray-200 w-fit mx-auto md:mx-0">
          <button
            onClick={() => setActiveTab("agendamentos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "agendamentos"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Meus Agendamentos
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "historico"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Clock className="w-5 h-5" />
            Histórico
          </button>
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === "perfil"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5" />
            Meus Dados
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-[400px]">
          {/* Tab: Agendamentos Ativos */}
          {activeTab === "agendamentos" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Próximos Eventos</h2>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : activeBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Você não tem agendamentos ativos.</p>
                  <button 
                    onClick={() => navigate("/search")}
                    className="mt-4 text-blue-600 font-medium hover:underline"
                  >
                    Encontrar prestadores de serviço
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {activeBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-gray-50">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-gray-900">{booking.serviceName}</h3>
                          <p className="text-sm text-gray-600">{booking.providerName || "Prestador"}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(booking.date).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </div>
                      </div>

                      <button 
                        onClick={() => handleCancelBooking(booking.id)}
                        className="w-full py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                      >
                        Cancelar Agendamento
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Histórico */}
          {activeTab === "historico" && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico de Serviços</h2>
              {historyBookings.length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Seu histórico está vazio.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {historyBookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4 mb-4 md:mb-0 w-full md:w-auto">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${booking.status === 'concluido' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                          {booking.status === 'concluido' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{booking.serviceName}</h4>
                          <p className="text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString('pt-BR')} às {booking.time}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        {booking.status === 'concluido' && (
                          <button className="text-blue-600 text-sm font-medium hover:underline">
                            Avaliar Serviço
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab: Perfil */}
          {activeTab === "perfil" && (
            <div className="p-6 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Dados Pessoais</h2>
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Edit3 className="w-4 h-4" /> Editar
                  </button>
                ) : (
                  <div className="flex gap-3">
                    <button 
                      onClick={handleSaveProfile}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
                    >
                      <Check className="w-4 h-4" /> Salvar
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium"
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-blue-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'} transition-all`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      disabled={!isEditing}
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-blue-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'} transition-all`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      disabled={!isEditing}
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-blue-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'} transition-all`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${isEditing ? 'border-blue-300 focus:ring-2 focus:ring-blue-500' : 'border-gray-200 bg-gray-50'} transition-all`}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;