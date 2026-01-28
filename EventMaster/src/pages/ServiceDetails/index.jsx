import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  AlertCircle,
  User,
  Award,
} from 'lucide-react';
import ContactModal from '../../components/ContactModal';
import { addBooking, isTimeAvailable } from '../../services/bookingService';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Campos de agendamento
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const availableSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

  const mockServiceDetails = {
    1: {
      id: 1,
      name: 'Oficina do João',
      description: 'Especializada em mecânica geral, oferecemos serviços de qualidade com profissionais experientes.',
      rating: 4.8,
      reviews: 127,
      distance: '1.2 km',
      address: 'Rua das Flores, 123 - Centro',
      phone: '(11) 99999-1234',
      email: 'contato@oficinajao.com.br',
      image: 'https://via.placeholder.com/800x400/4f46e5/ffffff?text=Oficina+do+João',
      gallery: [
        'https://via.placeholder.com/400x300/6366f1/ffffff?text=Galeria+1',
        'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Galeria+2',
        'https://via.placeholder.com/400x300/06b6d4/ffffff?text=Galeria+3',
      ],
      services: [
        { name: 'Troca de óleo', price: 'R$ 80,00', duration: '30 min' },
        { name: 'Revisão completa', price: 'R$ 250,00', duration: '2 horas' },
        { name: 'Alinhamento e balanceamento', price: 'R$ 120,00', duration: '1 hora' },
        { name: 'Troca de pastilhas de freio', price: 'R$ 180,00', duration: '45 min' },
      ],
      openTime: '08:00 - 18:00',
      workingDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      owner: 'João Silva',
      experience: '15 anos',
      certifications: ['Certificado Bosch'],
      about: 'Nossa oficina é especializada em mecânica geral e oferece serviços de qualidade com mais de 15 anos de experiência no mercado. Contamos com profissionais qualificados e equipamentos modernos para garantir o melhor atendimento aos nossos clientes. Trabalhamos com todas as marcas de veículos e oferecemos garantia em todos os nossos serviços.',
      reviews_list: [
        { 
          id: 1, 
          user: 'Maria Santos', 
          rating: 5, 
          comment: 'Excelente atendimento! Serviço de qualidade e preço justo.', 
          date: '2024-01-15' 
        },
        { 
          id: 2, 
          user: 'Carlos Silva', 
          rating: 4, 
          comment: 'Muito bom! Recomendo a todos.', 
          date: '2024-01-10' 
        },
      ],
    },
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const data = mockServiceDetails[id || '1'];
      if (data) setService(data);
      setLoading(false);
    }, 1000);
  }, [id]);

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !clientName || !clientEmail) {
      alert('Preencha todos os campos!');
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientEmail)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }

    setBookingLoading(true);

    const available = await isTimeAvailable(service.id, selectedDate, selectedTime);
    if (!available) {
      alert('Este horário já foi reservado. Escolha outro.');
      setBookingLoading(false);
      return;
    }

    const booking = {
      serviceId: service.id,
      serviceName: selectedService,
      date: selectedDate,
      time: selectedTime,
      clientName,
      clientEmail,
    };

    await addBooking(booking);

    alert('Agendamento confirmado com sucesso!');
    setBookingLoading(false);
    setShowBookingModal(false);

    // Reset dos campos
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
    setClientName('');
    setClientEmail('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Carregando detalhes do serviço...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Serviço não encontrado</h2>
        <p className="text-gray-600 mb-6">O serviço que você está procurando não existe ou foi removido.</p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Full Width - Consistent with ProviderProfile */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold mb-1">{service.name}</h1>
              <p className="text-white/90 text-lg mb-2">{service.description}</p>
              <p className="text-white/80 text-sm flex items-center justify-center md:justify-start gap-2 mb-2">
                <MapPin className="w-4 h-4" /> {service.address}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-semibold">{service.rating}</span>
                <span className="text-white/80 text-sm">({service.reviews} avaliações)</span>
                <span className="text-white/80 text-sm">• {service.distance}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-4 mt-6 md:mt-0">
              <button 
                onClick={() => setShowBookingModal(true)} 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl min-w-[140px]"
              >
                <Calendar className="w-5 h-5" /> Agendar
              </button>
              <button 
                onClick={() => setShowContactModal(true)} 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-200 hover:-translate-y-0.5 shadow-md min-w-[140px]"
              >
                <Phone className="w-5 h-5" /> Contatar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Consistent with ProviderProfile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-80 object-cover rounded-xl shadow-md mb-4"
          />
          <div className="flex gap-3 overflow-x-auto pb-2">
            {service.gallery.map((img, i) => (
              <img 
                key={i} 
                src={img} 
                alt={`Galeria ${i + 1}`} 
                className="w-24 h-18 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-indigo-500 transition-all duration-200 hover:scale-105 flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sobre</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{service.about}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Clock className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Horário de funcionamento</h4>
                <p className="text-gray-600">{service.openTime}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <User className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Proprietário</h4>
                <p className="text-gray-600">{service.owner}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
              <Award className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Experiência</h4>
                <p className="text-gray-600">{service.experience}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Serviços Oferecidos</h2>
          <div className="space-y-4">
            {service.services.map((s, i) => (
              <div 
                key={i} 
                className="flex justify-between items-center p-5 border border-gray-200 rounded-xl hover:border-indigo-500 hover:bg-gray-50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">{s.name}</h4>
                  <span className="text-gray-500">{s.duration}</span>
                </div>
                <span className="text-lg font-bold text-green-600">{s.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avaliações dos Clientes</h2>
          <div className="space-y-6">
            {service.reviews_list.map((review) => (
              <div key={review.id} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-gray-900">{review.user}</h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-2">{review.comment}</p>
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal - Enhanced with consistent styling */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Agendar Serviço</h2>
              <button 
                onClick={() => setShowBookingModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu nome completo:
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Seu email:
                </label>
                <input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="Digite seu email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selecione o serviço:
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="">Escolha um serviço</option>
                  {service.services.map((s, i) => (
                    <option key={i} value={s.name}>
                      {s.name} - {s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Selecione a data:
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="">Escolha uma data</option>
                  {generateAvailableDates().map((d) => (
                    <option key={d} value={d}>
                      {new Date(d).toLocaleDateString('pt-BR')}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horários disponíveis:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map((time) => (
                      <button
                        key={time}
                        className={`p-3 text-center border rounded-lg font-medium transition-all duration-200 ${
                          selectedTime === time
                            ? 'bg-indigo-500 text-white border-indigo-500'
                            : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 space-y-3">
              <button 
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                  !selectedService || !selectedDate || !selectedTime || !clientName || !clientEmail || bookingLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 hover:-translate-y-0.5 shadow-lg hover:shadow-xl'
                }`}
                onClick={handleBooking}
                disabled={!selectedService || !selectedDate || !selectedTime || !clientName || !clientEmail || bookingLoading}
              >
                {bookingLoading ? 'Confirmando...' : 'Confirmar Agendamento'}
              </button>
              <button 
                onClick={() => setShowBookingModal(false)} 
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        provider={{
          name: service.name,
          phone: service.phone,
          email: service.email,
          image: service.image,
          address: service.address,
        }}
      />
    </div>
  );
};

export default ServiceDetails;

