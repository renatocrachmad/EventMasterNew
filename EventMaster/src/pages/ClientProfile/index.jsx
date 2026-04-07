import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Phone, Mail, Edit3, Star, CheckCircle, XCircle, Settings, LogOut, ArrowLeft, Heart } from 'lucide-react';
import ServiceRating from '../../components/ServiceRating';
import RescheduleModal from '../../components/RescheduleModal';
import './style.css';

const mockProviderData = {
  1: { name: 'Sabor & Festa Buffet', avatar: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=100&h=100' },
  4: { name: 'Memórias em Foco', avatar: 'https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=100&h=100' },
  6: { name: 'Doce Encanto Confeitaria', avatar: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=100&h=100' },
};

const initialBookings = [
  { id: 'bk1', providerId: 1, serviceName: 'Jantar Completo', date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), time: '19:00', status: 'confirmado' },
  { id: 'bk2', providerId: 4, serviceName: 'Cobertura Fotográfica', date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(), time: '14:00', status: 'agendado' },
  { id: 'bk3', providerId: 6, serviceName: 'Bolo de Casamento (kg)', date: new Date(new Date().setDate(new Date().getDate() - 20)).toISOString(), time: '11:00', status: 'concluido', rating: null },
  { id: 'bk4', providerId: 1, serviceName: 'Coquetel Volante', date: new Date(new Date().setDate(new Date().getDate() - 45)).toISOString(), time: '20:00', status: 'concluido', rating: 5 },
  { id: 'bk5', providerId: 4, serviceName: 'Ensaio Pré-Wedding', date: new Date(new Date().setDate(new Date().getDate() - 60)).toISOString(), time: '09:00', status: 'cancelado' },
];

const ClientProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('agendamentos');
  const [clientBookings, setClientBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [ratingModal, setRatingModal] = useState({ isOpen: false, booking: null });
  const [rescheduleModal, setRescheduleModal] = useState({ isOpen: false, booking: null });

  const clientData = {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@example.com",
    phone: "(11) 99999-0000",
    avatar: profileData.avatar || "/default-avatar.png",
    memberSince: "2023-01-15",
    totalBookings: initialBookings.length,
    favoriteServices: ["Sabor & Festa Buffet", "Memórias em Foco"]
  };

  useEffect(() => {
    setLoading(true);
    setProfileData({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      avatar: clientData.avatar
    });

    setTimeout(() => {
      setClientBookings(initialBookings);
      setLoading(false);
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getStatusClasses = (status) => {
    switch (status) {
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'confirmado': return 'bg-yellow-100 text-yellow-800';
      case 'concluido': return 'bg-green-100 text-green-800';
      case 'avaliado': return 'bg-emerald-100 text-emerald-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendado':
      case 'confirmado':
        return <Clock className="w-4 h-4" />;
      case 'concluido':
        return <CheckCircle className="w-4 h-4" />;
      case 'avaliado': return <Star className="w-4 h-4" />;
      case 'cancelado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'agendado': return 'Agendado';
      case 'confirmado': return 'Confirmado';
      case 'concluido': return 'Concluído';
      case 'avaliado': return 'Avaliado';
      case 'cancelado': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      const updatedBookings = clientBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelado' } : booking
      );
      setClientBookings(updatedBookings);
      alert('Agendamento cancelado com sucesso!');
    }
  };

  const handleReschedule = (bookingId) => {
    const booking = clientBookings.find(b => b.id === bookingId);
    if (booking) {
      setRescheduleModal({ isOpen: true, booking });
    }
  };

  const handleEditProfile = () => setIsEditingProfile(true);


  const handleSaveProfile = () => {
    alert('Perfil atualizado com sucesso!');
    setIsEditingProfile(false);
  };

  const handleCancelEdit = () => {
    setProfileData({
      name: clientData.name,
      email: clientData.email,
      phone: clientData.phone,
      avatar: clientData.avatar
    });
    setIsEditingProfile(false);
  };

  const handleRateService = (booking) => {
    setRatingModal({ isOpen: true, booking });
  };

  const handleRatingSubmit = (bookingId, rating) => {
    const updatedBookings = clientBookings.map(booking =>
      booking.id === bookingId
        ? { ...booking, status: 'avaliado', rating }
        : booking
    );
    setClientBookings(updatedBookings);
    setRatingModal({ isOpen: false, booking: null });
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    if (window.confirm('Tem certeza que deseja sair?')) {
      localStorage.removeItem('usuarioLogado');
      navigate('/');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatar: imageUrl }));
      alert('Foto de perfil atualizada (localmente).');
    }
  };

  const upcomingBookings = clientBookings.filter(b => b.status === 'agendado' || b.status === 'confirmado');
  const pastBookings = clientBookings.filter(b => b.status === 'concluido' || b.status === 'cancelado' || b.status === 'avaliado');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img src={profileData.avatar || "/default-avatar.png"} alt="avatar" className="w-28 h-28 rounded-full object-cover border-4 border-white/50 shadow-lg" />
              <label htmlFor="avatarInput" className="absolute -bottom-1 -right-1 bg-white text-indigo-600 rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition-colors">
                <Edit3 className="w-4 h-4" />
              </label>
              <input type="file" id="avatarInput" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            </div>
            {/* User Details & Stats */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">{clientData.name}</h1>
              <p className="text-white/80 mt-1">{clientData.email}</p>
              <div className="flex items-center justify-center md:justify-start gap-8 mt-4">
                <div className="text-center">
                  <span className="block text-2xl font-bold">{clientData.totalBookings}</span>
                  <span className="text-sm text-white/80">Agendamentos</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl font-bold">{clientBookings.filter(b => b.status === 'concluido' || b.status === 'avaliado').length}</span>
                  <span className="text-sm text-white/80">Concluídos</span>
                </div>
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors w-full md:w-auto">
                <Settings className="w-4 h-4" />
                Configurações
              </button>
              <button onClick={handleLogout} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500/80 border border-red-500/90 rounded-lg text-sm font-semibold hover:bg-red-500 transition-colors w-full md:w-auto">
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs e Conteúdo */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('agendamentos')} className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'agendamentos' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Calendar className="w-5 h-5" />
              Meus Agendamentos
            </button>
            <button onClick={() => setActiveTab('historico')} className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'historico' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Clock className="w-5 h-5" />
              Histórico
            </button>
            <button onClick={() => setActiveTab('favoritos')} className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'favoritos' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <Heart className="w-5 h-5" />
              Favoritos
            </button>
            <button onClick={() => setActiveTab('perfil')} className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'perfil' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              <User className="w-5 h-5" />
              Dados Pessoais
            </button>
          </nav>
        </div>

        <div className="tab-content">
          {activeTab === 'agendamentos' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {loading ? <p className="text-center text-gray-500">Carregando agendamentos...</p> :
                upcomingBookings.length > 0 ? (
                  upcomingBookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <img src={mockProviderData[booking.providerId]?.avatar} alt="Provider" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between sm:items-start">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{mockProviderData[booking.providerId]?.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{booking.serviceName}</p>
                            </div>
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 sm:mt-0 ${getStatusClasses(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              {getStatusText(booking.status)}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mt-3 border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{new Date(booking.date).toLocaleDateString('pt-BR')}</span></div>
                            <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{booking.time}</span></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:ml-20 sm:mt-2">
                        <button className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" onClick={() => handleReschedule(booking.id)}>Reagendar</button>
                        <button className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors" onClick={() => handleCancelBooking(booking.id)}>Cancelar</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Sem agendamentos futuros</h3>
                    <p className="mt-1 text-sm text-gray-500">Você não tem nenhum serviço agendado no momento.</p>
                  </div>
                )}
            </motion.div>
          )}

          {activeTab === 'historico' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {loading ? <p className="text-center text-gray-500">Carregando histórico...</p> :
                pastBookings.length > 0 ? (
                  pastBookings.map(booking => (
                    <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
                      <div className="flex-1 flex items-center gap-4">
                        <img src={mockProviderData[booking.providerId]?.avatar} alt="Provider" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{mockProviderData[booking.providerId]?.name}</h4>
                          <p className="text-sm text-gray-500">{booking.serviceName} em {new Date(booking.date).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {getStatusText(booking.status)}
                        </div>
                        {booking.status === 'concluido' && (
                          <button className="px-3 py-1.5 text-sm font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1.5" onClick={() => handleRateService(booking)}>
                            <Star className="w-4 h-4" /> Avaliar
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <Clock className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum histórico encontrado</h3>
                    <p className="mt-1 text-sm text-gray-500">Seus agendamentos concluídos e cancelados aparecerão aqui.</p>
                  </div>
                )}
            </motion.div>
          )}

          {activeTab === 'favoritos' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {clientData.favoriteServices.map((service, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4 hover:shadow-md hover:border-indigo-500 transition-all">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="font-semibold text-gray-800">{service}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'perfil' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Dados Pessoais</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><User className="h-5 w-5 text-gray-400" /></div>
                    <input type="text" id="name" value={profileData.name || ''} onChange={(e) => handleInputChange('name', e.target.value)} readOnly={!isEditingProfile} className={`block w-full rounded-lg border-gray-300 pl-10 p-3 transition-colors ${isEditingProfile ? 'bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'bg-gray-100 cursor-not-allowed'}`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Mail className="h-5 w-5 text-gray-400" /></div>
                    <input type="email" id="email" value={profileData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} readOnly={!isEditingProfile} className={`block w-full rounded-lg border-gray-300 pl-10 p-3 transition-colors ${isEditingProfile ? 'bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'bg-gray-100 cursor-not-allowed'}`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Phone className="h-5 w-5 text-gray-400" /></div>
                    <input type="tel" id="phone" value={profileData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} readOnly={!isEditingProfile} className={`block w-full rounded-lg border-gray-300 pl-10 p-3 transition-colors ${isEditingProfile ? 'bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500' : 'bg-gray-100 cursor-not-allowed'}`} />
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                {!isEditingProfile ? (
                  <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors" onClick={handleEditProfile}>
                    <Edit3 className="w-5 h-5" /> Editar Perfil
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors" onClick={handleSaveProfile}>
                      <CheckCircle className="w-5 h-5" /> Salvar Alterações
                    </button>
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors" onClick={handleCancelEdit}>
                      <XCircle className="w-5 h-5" /> Cancelar
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Modais */}
      <ServiceRating isOpen={ratingModal.isOpen} onClose={() => setRatingModal({ isOpen: false, booking: null })} booking={ratingModal.booking} onRatingSubmit={handleRatingSubmit} />


      <RescheduleModal
        isOpen={rescheduleModal.isOpen}
        booking={rescheduleModal.booking}
        onClose={() => setRescheduleModal({ isOpen: false, booking: null })}
        onSave={(updatedBooking) => {
          const updated = clientBookings.map(b => b.id === updatedBooking.id ? updatedBooking : b);
          setClientBookings(updated);
          setRescheduleModal({ isOpen: false, booking: null });
          alert('Agendamento reagendado com sucesso!');
        }}
      />
    </div>
  );
};

export default ClientProfile;
