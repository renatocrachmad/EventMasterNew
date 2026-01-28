import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  LogOut,
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Eye,
  MessageSquare,
  Plus,
  Trash2,
  Check,
  X,
} from "lucide-react";
import EditableServiceCard from "../../components/EditableServiceCard";

const ProviderProfile = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("agendamentos");
  const [providerBookings, setProviderBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [services, setServices] = useState([]);
  const [isEditingService, setIsEditingService] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);



  const [newService, setNewService] = useState({
    name: "",
    price: "",
    duration: "",
  });
  const [avatarModal, setAvatarModal] = useState({
    isOpen: false,
    previewUrl: null,
    selectedFile: null,
  });

  const initialProviderData = {
    id: 1,
    name: "João Silva",
    businessName: "Oficina do João",
    email: "joao@oficinajao.com.br",
    phone: "(11) 99999-1234",
    avatar: "https://via.placeholder.com/150",
    address: "Rua das Flores, 123 - Centro",
    memberSince: "2020-03-15",
    totalBookings: 127,
    completedServices: 115,
    rating: 4.8,
    monthlyRevenue: "R$ 8.500,00",
    services: [
      { name: "Troca de óleo", price: "R$ 80,00", duration: "30 min" },
      { name: "Revisão completa", price: "R$ 250,00", duration: "2 horas" },
      { name: "Freios", price: "R$ 150,00", duration: "1 hora" },
      { name: "Suspensão", price: "R$ 300,00", duration: "3 horas" },
    ],
    workingHours: "08:00 - 18:00",
    workingDays: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  };

  useEffect(() => {
    setLoading(true);
    setProfileData(initialProviderData);

    const savedServices = JSON.parse(
      localStorage.getItem("providerServices") ||
        JSON.stringify(initialProviderData.services)
    );
    setServices(savedServices);

    // Carregar agendamentos do localStorage (tanto de providerBookings quanto clientBookings)
    setTimeout(() => {
      const providerBookingsData = JSON.parse(
        localStorage.getItem("providerBookings") || "[]"
      );
      
      // Também carregar agendamentos feitos pelos clientes
      const clientBookingsData = JSON.parse(
        localStorage.getItem("clientBookings") || "[]"
      );
      
      // Filtrar agendamentos para este provedor específico
      const currentProviderBookings = clientBookingsData.filter(
        booking => booking.serviceId === initialProviderData.id || 
                  booking.serviceName === initialProviderData.businessName
      );
      
      // Combinar os agendamentos existentes com os novos
      const allBookings = [...providerBookingsData, ...currentProviderBookings];
      
      // Remover duplicatas baseado no ID
      const uniqueBookings = allBookings.filter((booking, index, self) =>
        index === self.findIndex(b => b.id === booking.id)
      );
      
      setProviderBookings(uniqueBookings);
      
      // Atualizar o localStorage do provedor com todos os agendamentos
      localStorage.setItem("providerBookings", JSON.stringify(uniqueBookings));
      
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "agendado":
        return "bg-blue-100 text-blue-800";
      case "confirmado":
        return "bg-green-100 text-green-800";
      case "concluido":
        return "bg-purple-100 text-purple-800";
      case "cancelado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "agendado":
        return <Clock className="w-4 h-4" />;
      case "confirmado":
        return <CheckCircle className="w-4 h-4" />;
      case "concluido":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelado":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "agendado":
        return "Agendado";
      case "confirmado":
        return "Confirmado";
      case "concluido":
        return "Concluído";
      case "cancelado":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  const handleConfirmBooking = (bookingId) => {
    const updated = providerBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "confirmado" } : b
    );
    setProviderBookings(updated);
    localStorage.setItem("providerBookings", JSON.stringify(updated));
    
    // Também atualizar no clientBookings se existir
    const clientBookings = JSON.parse(localStorage.getItem("clientBookings") || "[]");
    const updatedClientBookings = clientBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "confirmado" } : b
    );
    localStorage.setItem("clientBookings", JSON.stringify(updatedClientBookings));
    
    alert("Agendamento confirmado com sucesso!");
  };

  const handleCompleteBooking = (bookingId) => {
    const updated = providerBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "concluido" } : b
    );
    setProviderBookings(updated);
    localStorage.setItem("providerBookings", JSON.stringify(updated));
    
    // Também atualizar no clientBookings se existir
    const clientBookings = JSON.parse(localStorage.getItem("clientBookings") || "[]");
    const updatedClientBookings = clientBookings.map((b) =>
      b.id === bookingId ? { ...b, status: "concluido" } : b
    );
    localStorage.setItem("clientBookings", JSON.stringify(updatedClientBookings));
    
    alert("Serviço marcado como concluído!");
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Tem certeza que deseja cancelar este agendamento?")) {
      const updated = providerBookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelado" } : b
      );
      setProviderBookings(updated);
      localStorage.setItem("providerBookings", JSON.stringify(updated));
      
      // Também atualizar no clientBookings se existir
      const clientBookings = JSON.parse(localStorage.getItem("clientBookings") || "[]");
      const updatedClientBookings = clientBookings.map((b) =>
        b.id === bookingId ? { ...b, status: "cancelado" } : b
      );
      localStorage.setItem("clientBookings", JSON.stringify(updatedClientBookings));
      
      alert("Agendamento cancelado!");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Tem certeza que deseja sair?")) {
      localStorage.removeItem("prestadorLogado");
      navigate("/");
    }
  };

  const handleEditProfile = () => setIsEditingProfile(true);

  const handleSaveProfile = () => {
    console.log("Salvando dados do perfil:", profileData);
    alert("Informações do perfil atualizadas com sucesso!");
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setProfileData(initialProviderData);
    setIsEditingProfile(false);
  };

  const handleInputChange = (field, value) =>
    setProfileData((prev) => ({ ...prev, [field]: value }));

  const handleEditService = (index) => setIsEditingService(index);

  const handleSaveService = (index, updatedService) => {
    const updated = [...services];
    updated[index] = updatedService;
    setServices(updated);
    localStorage.setItem("providerServices", JSON.stringify(updated));
    setIsEditingService(null);
    alert("Serviço atualizado com sucesso!");
  };

  const handleCancelEditService = () => setIsEditingService(null);

  const handleAddService = () => setIsAddingService(true);

  const handleSaveNewService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      alert("Por favor, preencha todos os campos do serviço.");
      return;
    }
    const updated = [...services, { ...newService }];
    setServices(updated);
    localStorage.setItem("providerServices", JSON.stringify(updated));
    setNewService({ name: "", price: "", duration: "" });
    setIsAddingService(false);
    alert("Novo serviço adicionado com sucesso!");
  };

  const handleCancelAddService = () => {
    setNewService({ name: "", price: "", duration: "" });
    setIsAddingService(false);
  };

  const handleDeleteService = (index) => {
    if (window.confirm("Tem certeza que deseja excluir este serviço?")) {
      const updated = services.filter((_, i) => i !== index);
      setServices(updated);
      localStorage.setItem("providerServices", JSON.stringify(updated));
      alert("Serviço excluído com sucesso!");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarModal({
        isOpen: true,
        previewUrl,
        selectedFile: file,
      });
    }
  };

  const handleAvatarFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarModal((prev) => ({
        ...prev,
        previewUrl,
        selectedFile: file,
      }));
    }
  };

  const handleAvatarSave = () => {
    if (avatarModal.previewUrl) {
      setProfileData((prev) => ({ ...prev, avatar: avatarModal.previewUrl }));
      setAvatarModal({ isOpen: false, previewUrl: null, selectedFile: null });
      alert("Foto de perfil atualizada!");
    }
  };

  const handleAvatarCancel = () => {
    if (avatarModal.previewUrl) URL.revokeObjectURL(avatarModal.previewUrl);
    setAvatarModal({ isOpen: false, previewUrl: null, selectedFile: null });
  };

  const todayBookings = providerBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0];
    return b.date === today && b.status !== "cancelado";
  });

  const upcomingBookings = providerBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0];
    return b.date > today && b.status !== "cancelado";
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <input
        id="avatarInput"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarChange}
      />

      {/* Header - Full Width */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <img
                src={profileData.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute bottom-0 right-0 bg-indigo-700 p-2 rounded-full text-white hover:bg-indigo-800 transition-colors shadow-md"
                onClick={() => document.getElementById("avatarInput").click()}
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-1">
                {profileData.businessName}
              </h1>
              <p className="text-white/90 text-lg mb-2">
                Proprietário: {profileData.name}
              </p>
              <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4" /> {profileData.email}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">
                  {profileData.rating}
                </span>
                <span className="text-white/80 text-sm">
                  ({profileData.totalBookings} avaliações)
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-4 mt-6 md:mt-0">
              <div className="bg-white/20 p-4 rounded-xl text-center shadow-inner">
                <p className="text-2xl font-bold">
                  {profileData.totalBookings}
                </p>
                <p className="text-sm text-white/80">Total Agendamentos</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl text-center shadow-inner">
                <p className="text-2xl font-bold">
                  {profileData.completedServices}
                </p>
                <p className="text-sm text-white/80">Concluídos</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl text-center shadow-inner">
                <p className="text-2xl font-bold">
                  {profileData.monthlyRevenue}
                </p>
                <p className="text-sm text-white/80">Receita Mensal</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-4 mt-8">
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5 shadow-md">
              <Settings className="w-5 h-5" />
              Configurações
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 border border-red-700 rounded-xl text-white hover:bg-red-700 transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {todayBookings.length}
              </h3>
              <p className="text-gray-600">Agendamentos Hoje</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {upcomingBookings.length}
              </h3>
              <p className="text-gray-600">Próximos Agendamentos</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">R$ 2.340</h3>
              <p className="text-gray-600">Receita Esta Semana</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {profileData.rating}
              </h3>
              <p className="text-gray-600">Avaliação Média</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-2 border border-gray-200 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setActiveTab("agendamentos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "agendamentos"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Calendar className="w-5 h-5" />
            Agendamentos
          </button>
          <button
            onClick={() => setActiveTab("historico")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "historico"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Clock className="w-5 h-5" />
            Histórico
          </button>
          <button
            onClick={() => setActiveTab("servicos")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "servicos"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Award className="w-5 h-5" />
            Meus Serviços
          </button>
          <button
            onClick={() => setActiveTab("perfil")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === "perfil"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <User className="w-5 h-5" />
            Dados do Negócio
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          {activeTab === "agendamentos" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Agendamentos Ativos</h2>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Carregando agendamentos...</p>
                </div>
              ) : providerBookings.filter((b) => b.status !== "concluido" && b.status !== "cancelado").length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Nenhum agendamento ativo no momento.</p>
                  <p className="text-gray-500 text-sm mt-2">Os novos agendamentos aparecerão aqui automaticamente.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {providerBookings
                    .filter(
                      (b) => b.status !== "concluido" && b.status !== "cancelado"
                    )
                    .map((booking) => (
                      <div key={booking.id} className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm space-y-3 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.selectedService || booking.serviceName}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {getStatusText(booking.status)}
                          </span>
                        </div>
                        <div className="space-y-2 text-gray-700">
                          <p className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            {new Date(booking.date).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-gray-500" />
                            {booking.time}
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-500" />
                            {booking.clientName}
                          </p>
                          <p className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4 text-gray-500" />
                            {booking.clientEmail}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          {booking.status === "agendado" && (
                            <button
                              className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                              onClick={() => handleConfirmBooking(booking.id)}
                            >
                              Confirmar
                            </button>
                          )}
                          {booking.status === "confirmado" && (
                            <button
                              className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                              onClick={() => handleCompleteBooking(booking.id)}
                            >
                              Concluir
                            </button>
                          )}
                          <button
                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "historico" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Histórico de Agendamentos</h2>
              {providerBookings.filter((b) => b.status === "concluido" || b.status === "cancelado").length === 0 ? (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Nenhum agendamento no histórico.</p>
                  <p className="text-gray-500 text-sm mt-2">Agendamentos concluídos e cancelados aparecerão aqui.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {providerBookings
                    .filter(
                      (b) => b.status === "concluido" || b.status === "cancelado"
                    )
                    .map((booking) => (
                      <div key={booking.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex-1 space-y-1">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {booking.selectedService || booking.serviceName}
                          </h4>
                          <p className="text-gray-700 text-sm">
                            Cliente: {booking.clientName}
                          </p>
                          <p className="text-gray-600 text-sm">
                            Email: {booking.clientEmail}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.date).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.time}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {getStatusIcon(booking.status)}
                            {getStatusText(booking.status)}
                          </span>
                          {booking.rating && (
                            <div className="flex items-center gap-1 text-sm text-yellow-600">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "servicos" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Meus Serviços</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                  onClick={handleAddService}
                >
                  <Plus className="w-5 h-5" /> Adicionar Serviço
                </button>
              </div>

              {isAddingService && (
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 shadow-sm space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Novo Serviço</h3>
                  <input
                    type="text"
                    placeholder="Nome do Serviço"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newService.name}
                    onChange={(e) =>
                      setNewService({ ...newService, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Preço (Ex: R$ 150,00)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newService.price}
                    onChange={(e) =>
                      setNewService({ ...newService, price: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Duração (Ex: 1 hora)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    value={newService.duration}
                    onChange={(e) =>
                      setNewService({ ...newService, duration: e.target.value })
                    }
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      onClick={handleSaveNewService}
                    >
                      <Check className="w-4 h-4" /> Salvar
                    </button>
                    <button
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                      onClick={handleCancelAddService}
                    >
                      <X className="w-4 h-4" /> Cancelar
                    </button>
                  </div>
                </div>
              )}

              {services.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Nenhum serviço cadastrado.</p>
                  <p className="text-gray-500 text-sm mt-2">Adicione um novo serviço acima.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, index) => (
                    <EditableServiceCard
                      key={index}
                      service={service}
                      isEditing={isEditingService === index}
                      onEdit={() => handleEditService(index)}
                      onSave={(updatedService) =>
                        handleSaveService(index, updatedService)
                      }
                      onCancel={handleCancelEditService}
                      onDelete={() => handleDeleteService(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "perfil" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Dados do Negócio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Nome do Negócio</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Award className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="businessName"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.businessName || ""}
                        onChange={(e) =>
                          handleInputChange("businessName", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome do Proprietário</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.phone || ""}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="form-group">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.address || ""}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="workingHours" className="block text-sm font-medium text-gray-700">Horário de Funcionamento</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="workingHours"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.workingHours || ""}
                        onChange={(e) =>
                          handleInputChange("workingHours", e.target.value)
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700">Dias de Funcionamento</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="text"
                        id="workingDays"
                        className={`block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                          isEditingProfile ? "" : "bg-gray-100 cursor-not-allowed"
                        }`}
                        value={profileData.workingDays ? profileData.workingDays.join(", ") : ""}
                        onChange={(e) =>
                          handleInputChange("workingDays", e.target.value.split(", ").map(day => day.trim()))
                        }
                        readOnly={!isEditingProfile}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {!isEditingProfile ? (
                <button
                  className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-base font-medium shadow-md"
                  onClick={handleEditProfile}
                >
                  <Edit3 className="w-5 h-5" /> Editar Perfil
                </button>
              ) : (
                <div className="flex gap-4 mt-6">
                  <button className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-medium shadow-md flex items-center justify-center gap-2" onClick={handleSaveProfile}>
                    <CheckCircle className="w-5 h-5" /> Salvar
                  </button>
                  <button
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-base font-medium shadow-md flex items-center justify-center gap-2"
                    onClick={handleCancelEdit}
                  >
                    <XCircle className="w-5 h-5" /> Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {avatarModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-lg w-full space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Alterar Foto de Perfil</h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Foto Atual</h3>
                <img
                  src={profileData.avatar}
                  alt="Avatar atual"
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 mx-auto"
                />
              </div>

              {avatarModal.previewUrl && (
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Nova Foto</h3>
                  <img
                    src={avatarModal.previewUrl}
                    alt="Nova foto"
                    className="w-28 h-28 rounded-full object-cover border-4 border-indigo-500 mx-auto"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label htmlFor="avatar-upload" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer text-base font-medium shadow-md">
                <Plus className="w-5 h-5" />
                Selecionar Nova Foto
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarFileSelect}
                className="hidden"
              />
              <p className="text-center text-sm text-gray-500">
                Formatos aceitos: JPG, PNG, GIF. Tamanho máximo: 5 MB
              </p>
            </div>

            <div className="flex gap-4">
              <button onClick={handleAvatarSave} className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base font-medium shadow-md flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Salvar Foto
              </button>
              <button
                onClick={handleAvatarCancel}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-base font-medium shadow-md flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;

