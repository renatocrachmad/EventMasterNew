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
  FileText,
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
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [budgetForm, setBudgetForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    eventDate: '',
    guests: '',
    message: ''
  });

  const availableSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'];

  const mockServiceDetails = {
    1: {
      id: 1,
      name: 'Sabor & Festa Buffet',
      description: 'Buffet completo para casamentos e eventos corporativos com cardápio personalizado.',
      rating: 4.9,
      reviews: 156,
      lat: -23.5505,
      lng: -46.6333,
      distance: 'Distância não calculada',
      address: 'Av. das Festas, 100 - Centro',
      phone: '(11) 99999-1111',
      email: 'contato@saborefesta.com.br',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=800&h=400',
      gallery: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400&h=300',
        'https://images.unsplash.com/photo-1519225468063-3f83797b2f42?auto=format&fit=crop&q=80&w=400&h=300',
      ],
      services: [
        { name: 'Jantar Completo', price: 'R$ 120,00/pessoa', duration: '4 horas' },
        { name: 'Coquetel Volante', price: 'R$ 80,00/pessoa', duration: '3 horas' },
        { name: 'Ilha de Bebidas', price: 'R$ 45,00/pessoa', duration: '4 horas' },
        { name: 'Equipe de Garçons', price: 'R$ 200,00/garçom', duration: 'Evento' },
      ],
      openTime: '08:00 - 18:00',
      workingDays: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      owner: 'Ana Pereira',
      experience: '12 anos',
      certifications: ['Segurança Alimentar', 'Gastronomia Internacional'],
      about: 'A Sabor & Festa Buffet atua há mais de 12 anos no mercado de eventos, proporcionando experiências gastronômicas únicas. Nossa equipe é formada por chefs renomados e profissionais dedicados a tornar seu casamento, aniversário ou evento corporativo um sucesso absoluto.',
      reviews_list: [
        { 
          id: 1, 
          user: 'Fernanda Lima', 
          rating: 5, 
          comment: 'Comida maravilhosa e serviço impecável! Todos os convidados elogiaram.', 
          date: '2024-02-20' 
        },
        { 
          id: 2, 
          user: 'Roberto Souza', 
          rating: 5, 
          comment: 'Profissionalismo nota 10. O jantar estava divino.', 
          date: '2024-02-15' 
        },
      ],
    },
    2: {
      id: 2,
      name: "Flores & Cores Decorações",
      description: "Projetos de decoração floral e ambientação para tornar seu evento único.",
      rating: 4.8,
      reviews: 98,
      distance: "3.2 km",
      address: "Rua das Orquídeas, 55 - Jardim",
      phone: "(11) 99999-2222",
      email: "contato@floresecores.com",
      image: "https://images.unsplash.com/photo-1519225468063-3f83797b2f42?auto=format&fit=crop&q=80&w=800&h=400",
      gallery: [
        "https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=400&h=300"
      ],
      services: [
        { name: "Decoração Completa Casamento", price: "R$ 5.000,00", duration: "Projeto" },
        { name: "Arranjos de Mesa", price: "R$ 150,00/un", duration: "Unidade" },
        { name: "Buquê de Noiva", price: "R$ 450,00", duration: "Unidade" },
        { name: "Iluminação Cênica", price: "R$ 1.200,00", duration: "Evento" }
      ],
      openTime: "08:00 - 19:00",
      workingDays: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"],
      owner: "Mariana Costa",
      experience: "8 anos",
      certifications: ["Design Floral", "Ambientação de Eventos"],
      about: "Transformamos sonhos em realidade através das flores e cores. Especialistas em criar ambientes mágicos e acolhedores para o seu grande dia.",
      reviews_list: [
        { id: 1, user: "Julia Martins", rating: 5, comment: "Minha festa ficou linda, parecia um conto de fadas!", date: "2024-01-10" },
        { id: 2, user: "Pedro Alves", rating: 4, comment: "Ótimo atendimento e muito bom gosto.", date: "2023-12-05" }
      ]
    },
    3: {
      id: 3,
      name: "DJ Night Beat",
      description: "A melhor seleção musical e estrutura de som e luz para sua pista de dança.",
      rating: 4.7,
      reviews: 210,
      distance: "5.0 km",
      address: "Atendimento no local do evento",
      phone: "(11) 99999-3333",
      email: "dj@nightbeat.com",
      image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?auto=format&fit=crop&q=80&w=800&h=400",
      gallery: [
        "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400&h=300"
      ],
      services: [
        { name: "Pacote DJ + Som", price: "R$ 2.500,00", duration: "5 horas" },
        { name: "Iluminação Pista", price: "R$ 800,00", duration: "Evento" },
        { name: "Pista de LED", price: "R$ 1.500,00", duration: "Evento" },
        { name: "Hora Adicional", price: "R$ 400,00", duration: "1 hora" }
      ],
      openTime: "24h",
      workingDays: ["Todos os dias"],
      owner: "Carlos 'Beat' Oliveira",
      experience: "10 anos",
      certifications: ["Produção Musical", "Técnico de Som"],
      about: "Levamos a energia certa para a sua festa! Repertório personalizado e equipamentos de última geração para garantir que ninguém fique parado.",
      reviews_list: [
        { id: 1, user: "Lucas Mendes", rating: 5, comment: "O DJ mandou muito bem, a pista bombou a noite toda!", date: "2024-03-01" },
        { id: 2, user: "Camila Rocha", rating: 4, comment: "Ótima estrutura de som.", date: "2024-02-28" }
      ]
    },
    4: {
      id: 4,
      name: "Memórias em Foco",
      description: "Fotografia e filmagem profissional para eternizar os momentos especiais.",
      rating: 5.0,
      reviews: 134,
      distance: "1.8 km",
      address: "Rua da Imagem, 42 - Vila Nova",
      phone: "(11) 99999-4444",
      email: "contato@memoriasemfoco.com",
      image: "https://images.unsplash.com/photo-1520854221256-17451cc330e7?auto=format&fit=crop&q=80&w=800&h=400",
      gallery: [
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1537907690979-ee8e29932c4f?auto=format&fit=crop&q=80&w=400&h=300"
      ],
      services: [
        { name: "Cobertura Fotográfica", price: "R$ 3.000,00", duration: "8 horas" },
        { name: "Filmagem 4K", price: "R$ 3.500,00", duration: "8 horas" },
        { name: "Ensaio Pré-Wedding", price: "R$ 800,00", duration: "3 horas" },
        { name: "Álbum Impresso", price: "R$ 1.200,00", duration: "Unidade" }
      ],
      openTime: "09:00 - 20:00",
      workingDays: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      owner: "Ricardo Santos",
      experience: "15 anos",
      certifications: ["Fotografia Artística", "Edição Avançada"],
      about: "Capturamos emoções e contamos histórias através de nossas lentes. Cada clique é pensado para eternizar a beleza e a espontaneidade do seu evento.",
      reviews_list: [
        { id: 1, user: "Beatriz Silva", rating: 5, comment: "As fotos ficaram incríveis, emocionantes!", date: "2024-01-20" },
        { id: 2, user: "João Paulo", rating: 5, comment: "Equipe super discreta e atenciosa.", date: "2024-01-15" }
      ]
    },
    5: {
      id: 5,
      name: "Espaço Cristal",
      description: "Salão de festas luxuoso com capacidade para 300 pessoas e área externa.",
      rating: 4.6,
      reviews: 87,
      distance: "8.5 km",
      address: "Estrada do Campo, km 12",
      phone: "(11) 99999-5555",
      email: "reservas@espacocristal.com",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800&h=400",
      gallery: [
        "https://images.unsplash.com/photo-1519225468063-3f83797b2f42?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1464366400600-7168b8af0bc3?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=400&h=300"
      ],
      services: [
        { name: "Aluguel Salão Principal", price: "R$ 8.000,00", duration: "Diária" },
        { name: "Cerimônia no Jardim", price: "R$ 2.000,00", duration: "Período" },
        { name: "Serviço de Valet", price: "R$ 1.500,00", duration: "Evento" },
        { name: "Segurança", price: "R$ 1.000,00", duration: "Evento" }
      ],
      openTime: "Visitas agendadas",
      workingDays: ["Terça a Domingo"],
      owner: "Grupo Cristal Eventos",
      experience: "20 anos",
      certifications: ["AVCB em dia", "Acessibilidade"],
      about: "O Espaço Cristal é o cenário perfeito para o seu sonho. Com arquitetura moderna e integração com a natureza, oferecemos infraestrutura completa para eventos sociais e corporativos.",
      reviews_list: [
        { id: 1, user: "Patrícia Gomes", rating: 5, comment: "Lugar lindo, estrutura impecável.", date: "2023-11-10" },
        { id: 2, user: "Marcos Vinícius", rating: 4, comment: "Muito bom, só o acesso que é um pouco longe.", date: "2023-10-25" }
      ]
    },
    6: {
      id: 6,
      name: "Doce Encanto Confeitaria",
      description: "Bolos artísticos e doces finos que encantam pelo sabor e beleza.",
      rating: 4.9,
      reviews: 312,
      distance: "1.5 km",
      address: "Av. dos Doces, 789 - Centro",
      phone: "(11) 99999-6666",
      email: "encomendas@doceencanto.com",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&q=80&w=800&h=400",
      gallery: [
        "https://images.unsplash.com/photo-1563729768647-d81b3b2e5c0b?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=400&h=300",
        "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400&h=300"
      ],
      services: [
        { name: "Bolo de Casamento (kg)", price: "R$ 120,00", duration: "Kg" },
        { name: "Cento de Doces Finos", price: "R$ 250,00", duration: "Cento" },
        { name: "Bem-Casados", price: "R$ 5,50", duration: "Unidade" },
        { name: "Mesa de Chocolates", price: "R$ 1.800,00", duration: "Mesa" }
      ],
      openTime: "09:00 - 18:00",
      workingDays: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
      owner: "Sofia Confeiteira",
      experience: "18 anos",
      certifications: ["Pâtisserie Francesa", "Chocolatier"],
      about: "A Doce Encanto traz o melhor da confeitaria artística para o seu evento. Ingredientes nobres e acabamento perfeito para adoçar os momentos mais importantes da sua vida.",
      reviews_list: [
        { id: 1, user: "Larissa Dias", rating: 5, comment: "O bolo estava divino e lindo demais!", date: "2024-02-10" },
        { id: 2, user: "Felipe Nogueira", rating: 5, comment: "Os doces finos fizeram sucesso.", date: "2024-02-05" }
      ]
    }
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

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    // Aqui você integraria com o Firebase para salvar o pedido na coleção 'orcamentos'
    // Para demonstração, apenas exibimos um alerta
    alert('Solicitação de orçamento enviada com sucesso! O prestador entrará em contato em breve.');
    setShowBudgetModal(false);
    setBudgetForm({
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      eventDate: '',
      guests: '',
      message: ''
    });
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
                onClick={() => setShowBudgetModal(true)} 
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl min-w-[140px]"
              >
                <FileText className="w-5 h-5" /> Orçamento
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

      {/* Budget Request Modal */}
      {showBudgetModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Solicitar Orçamento</h2>
              <button 
                onClick={() => setShowBudgetModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleBudgetSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Seu Nome</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={budgetForm.clientName}
                  onChange={(e) => setBudgetForm({...budgetForm, clientName: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={budgetForm.clientEmail}
                    onChange={(e) => setBudgetForm({...budgetForm, clientEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
                  <input
                    type="tel"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={budgetForm.clientPhone}
                    onChange={(e) => setBudgetForm({...budgetForm, clientPhone: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Data do Evento</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={budgetForm.eventDate}
                    onChange={(e) => setBudgetForm({...budgetForm, eventDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nº Convidados</label>
                  <input
                    type="number"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    value={budgetForm.guests}
                    onChange={(e) => setBudgetForm({...budgetForm, guests: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Detalhes do Pedido</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Descreva o que você precisa (ex: tipo de evento, preferências, horário...)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={budgetForm.message}
                  onChange={(e) => setBudgetForm({...budgetForm, message: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Enviar Solicitação
                </button>
              </div>
            </form>
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
