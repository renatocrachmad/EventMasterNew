import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Calendar,
  Clock,
  Phone,
  Mail,
  Edit3,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  LogOut,
  ArrowLeft
} from 'lucide-react';
import ServiceRating from '../../components/ServiceRating';
import RescheduleModal from '../../components/RescheduleModal';
import './style.css';

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
    email: "maria.silva@email.com",
    phone: "(11) 99999-0000",
    avatar: profileData.avatar || "/default-avatar.png",
    memberSince: "2023-01-15",
    totalBookings: 12,
    favoriteServices: ["Mecânica", "Lavagem"]
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
      const bookings = JSON.parse(localStorage.getItem('clientBookings') || '[]');
      setClientBookings(bookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendado': return 'status-scheduled';
      case 'confirmado': return 'status-confirmed';
      case 'concluido': return 'status-completed';
      case 'cancelado': return 'status-cancelled';
      default: return 'status-scheduled';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'agendado':
      case 'confirmado':
        return <Clock className="w-4 h-4" />;
      case 'concluido':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelado':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'agendado': return 'Agendado';
      case 'confirmado': return 'Confirmado';
      case 'concluido': return 'Concluído';
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
      localStorage.setItem('clientBookings', JSON.stringify(updatedBookings));

      // Atualizar também os agendamentos do prestador
      const providerBookings = JSON.parse(localStorage.getItem('providerBookings') || '[]');
      const updatedProviderBookings = providerBookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: 'cancelado' } : booking
      );
      localStorage.setItem('providerBookings', JSON.stringify(updatedProviderBookings));

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
    localStorage.setItem('clientBookings', JSON.stringify(updatedBookings));

    // Atualizar também os agendamentos do prestador
    const providerBookings = JSON.parse(localStorage.getItem('providerBookings') || '[]');
    const updatedProviderBookings = providerBookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'avaliado', rating } : booking
    );
    localStorage.setItem('providerBookings', JSON.stringify(updatedProviderBookings));

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

  return (
    <div className="client-profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="container mx-auto px-4 py-6">
          <button onClick={() => navigate('/home')} className="back-button mb-4">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="profile-header-content">
            <div className="profile-info">
              <div className="avatar-container">
                <img src={profileData.avatar || "/default-avatar.png"} alt="avatar" className="avatar" />
                <button className="edit-avatar" onClick={() => document.getElementById('avatarInput').click()}>
                  <Edit3 className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="user-details">
                <h1 className="user-name">{clientData.name}</h1>
                <p className="user-email">{clientData.email}</p>
                <p className="member-since">
                  Membro desde {new Date(clientData.memberSince).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-number">{clientData.totalBookings}</span>
                <span className="stat-label">Agendamentos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{clientBookings.filter(b => b.status === 'concluido').length}</span>
                <span className="stat-label">Concluídos</span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="action-button settings">
                <Settings className="w-5 h-5" />
                Configurações
              </button>
              <button onClick={handleLogout} className="action-button logout">
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs e Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        <div className="profile-tabs">
          <button
            onClick={() => setActiveTab('agendamentos')}
            className={`tab-button ${activeTab === 'agendamentos' ? 'active' : ''}`}
          >
            <Calendar className="w-5 h-5" />
            Meus Agendamentos
          </button>
          <button
            onClick={() => setActiveTab('historico')}
            className={`tab-button ${activeTab === 'historico' ? 'active' : ''}`}
          >
            <Clock className="w-5 h-5" />
            Histórico
          </button>
          <button
            onClick={() => setActiveTab('favoritos')}
            className={`tab-button ${activeTab === 'favoritos' ? 'active' : ''}`}
          >
            <Star className="w-5 h-5" />
            Favoritos
          </button>
          <button
            onClick={() => setActiveTab('perfil')}
            className={`tab-button ${activeTab === 'perfil' ? 'active' : ''}`}
          >
            <User className="w-5 h-5" />
            Dados Pessoais
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'agendamentos' && (
            <div className="bookings-grid">
              {loading ? (
                <p>Carregando...</p>
              ) : (
                clientBookings
                  .filter(b => b.status !== 'concluido' && b.status !== 'cancelado')
                  .map(booking => (
                    <div key={booking.id} className="booking-card">
                      <div className="booking-header">
                        <h3>{booking.serviceName}</h3>
                        <div className={`status-badge ${getStatusColor(booking.status)}`}>
                          {getStatusIcon(booking.status)}
                          {getStatusText(booking.status)}
                        </div>
                      </div>
                      <div className="booking-details">
                        <div className="detail-item">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="detail-item">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                        <div className="detail-item">
                          <User className="w-4 h-4" />
                          <span>{booking.selectedService}</span>
                        </div>
                      </div>
                      <div className="booking-actions">
                        <button className="action-btn secondary" onClick={() => handleReschedule(booking.id)}>
                          Reagendar
                        </button>
                        <button className="action-btn danger" onClick={() => handleCancelBooking(booking.id)}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}

          {activeTab === 'historico' && (
            <div className="history-list">
              {clientBookings
                .filter(b => b.status === 'concluido' || b.status === 'cancelado')
                .map(booking => (
                  <div key={booking.id} className="history-item">
                    <div className="history-info">
                      <h4>{booking.serviceName}</h4>
                      <p>{booking.selectedService}</p>
                      <div className="history-meta">
                        <span>{new Date(booking.date).toLocaleDateString('pt-BR')}</span>
                        <span>{booking.time}</span>
                      </div>
                    </div>
                    <div className="history-actions">
                      <div className={`status-badge ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {getStatusText(booking.status)}
                      </div>
                      {booking.status === 'concluido' && !booking.rating && (
                        <button className="rate-service-btn" onClick={() => handleRateService(booking)}>
                          <Star className="w-4 h-4" /> Avaliar
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}

          {activeTab === 'favoritos' && (
            <div className="favorites-grid">
              {clientData.favoriteServices.map((service, i) => (
                <div key={i} className="favorite-item">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="profile-form">
              <div className="form-group">
                <label>Nome</label>
                <div className="input-with-icon">
                  <User className="w-5 h-5" />
                  <input
                    type="text"
                    value={profileData.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    readOnly={!isEditingProfile}
                    className={isEditingProfile ? 'editable' : ''}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email</label>
                <div className="input-with-icon">
                  <Mail className="w-5 h-5" />
                  <input
                    type="email"
                    value={profileData.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    readOnly={!isEditingProfile}
                    className={isEditingProfile ? 'editable' : ''}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Telefone</label>
                <div className="input-with-icon">
                  <Phone className="w-5 h-5" />
                  <input
                    type="tel"
                    value={profileData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    readOnly={!isEditingProfile}
                    className={isEditingProfile ? 'editable' : ''}
                  />
                </div>
              </div>

              {!isEditingProfile ? (
                <button className="edit-profile-button" onClick={handleEditProfile}>
                  <Edit3 className="w-5 h-5" /> Editar Perfil
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-button" onClick={handleSaveProfile}>
                    <CheckCircle className="w-5 h-5" /> Salvar
                  </button>
                  <button className="cancel-button" onClick={handleCancelEdit}>
                    <XCircle className="w-5 h-5" /> Cancelar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <ServiceRating
        isOpen={ratingModal.isOpen}
        onClose={() => setRatingModal({ isOpen: false, booking: null })}
        booking={ratingModal.booking}
        onRatingSubmit={handleRatingSubmit}
      />

      <RescheduleModal
        isOpen={rescheduleModal.isOpen}
        booking={rescheduleModal.booking}
        onClose={() => setRescheduleModal({ isOpen: false, booking: null })}
        onSave={(updatedBooking) => {
          const updated = clientBookings.map(b =>
            b.id === updatedBooking.id ? updatedBooking : b
          );
          setClientBookings(updated);
          localStorage.setItem('clientBookings', JSON.stringify(updated));

          // Adicionar/Atualizar agendamento na lista do prestador
          const providerBookings = JSON.parse(localStorage.getItem('providerBookings') || '[]');
          const existingProviderBookingIndex = providerBookings.findIndex(b => b.id === updatedBooking.id);

          if (existingProviderBookingIndex !== -1) {
            // Se o agendamento já existe, atualiza
            providerBookings[existingProviderBookingIndex] = updatedBooking;
          } else {
            // Se não existe, adiciona
            providerBookings.push(updatedBooking);
          }
          localStorage.setItem('providerBookings', JSON.stringify(providerBookings));

          setRescheduleModal({ isOpen: false, booking: null });
          alert('Agendamento reagendado com sucesso!');
        }}
      />
    </div>
  );
};

export default ClientProfile;
