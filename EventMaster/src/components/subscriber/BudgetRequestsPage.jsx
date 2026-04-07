import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  User, 
  Calendar, 
  Clock, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  Info,
  DollarSign,
  Phone,
  Edit3
} from 'lucide-react';

const BudgetRequestsPage = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      clientName: 'Maria Silva',
      clientEmail: 'maria.silva@example.com',
      clientPhone: '(11) 98765-4321',
      requestedService: 'Buffet Casamento',
      eventDate: '2024-09-20',
      eventTime: '19:00',
      guests: 150,
      message: 'Gostaria de um orçamento para um casamento com 150 convidados. O evento será no dia 20 de setembro de 2024, à noite. Precisamos de buffet completo e bebidas.',
      status: 'pendente', // pendente, respondido, recusado
      receivedAt: '2024-07-25T10:30:00Z',
      response: null,
    },
    {
      id: 2,
      clientName: 'João Santos',
      clientEmail: 'joao.santos@example.com',
      clientPhone: '(11) 91234-5678',
      requestedService: 'Decoração Aniversário Infantil',
      eventDate: '2024-08-10',
      eventTime: '14:00',
      guests: 50,
      message: 'Preciso de decoração temática para aniversário infantil (tema super-heróis) para 50 crianças. O evento será à tarde.',
      status: 'respondido',
      receivedAt: '2024-07-20T15:00:00Z',
      response: 'Orçamento enviado por e-mail com opções de pacotes de decoração.',
    },
    {
      id: 3,
      clientName: 'Ana Paula',
      clientEmail: 'ana.paula@example.com',
      clientPhone: '(11) 99887-6655',
      requestedService: 'Fotografia Evento Corporativo',
      eventDate: '2024-10-05',
      eventTime: '09:00',
      guests: 200,
      message: 'Solicito orçamento para cobertura fotográfica de um evento corporativo de 8 horas de duração.',
      status: 'pendente',
      receivedAt: '2024-07-22T09:00:00Z',
      response: null,
    },
  ]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const getStatusClasses = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'respondido': return 'bg-green-100 text-green-800';
      case 'recusado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailsModal(true);
  };

  const handleRespond = () => {
    if (!responseMessage.trim()) {
      alert('Por favor, digite uma mensagem de resposta.');
      return;
    }
    const updatedRequests = requests.map(req => 
      req.id === selectedRequest.id 
        ? { ...req, status: 'respondido', response: responseMessage, receivedAt: new Date().toISOString() }
        : req
    );
    setRequests(updatedRequests);
    alert('Resposta enviada com sucesso!');
    setShowDetailsModal(false);
    setSelectedRequest(null);
    setResponseMessage('');
  };

  const handleDecline = () => {
    if (window.confirm('Tem certeza que deseja recusar este pedido de orçamento?')) {
      const updatedRequests = requests.map(req => 
        req.id === selectedRequest.id 
          ? { ...req, status: 'recusado', response: 'Pedido recusado pelo prestador.', receivedAt: new Date().toISOString() }
          : req
      );
      setRequests(updatedRequests);
      alert('Pedido recusado.');
      setShowDetailsModal(false);
      setSelectedRequest(null);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pedidos de Orçamento</h2>
      <p className="text-gray-600 mb-8">Gerencie as solicitações de orçamento dos seus clientes.</p>

      {requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
          <Mail className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum pedido de orçamento</h3>
          <p className="mt-1 text-sm text-gray-500">Quando clientes solicitarem orçamentos, eles aparecerão aqui.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{request.requestedService}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(request.status)}`}>
                  {request.status === 'pendente' && 'Pendente'}
                  {request.status === 'respondido' && 'Respondido'}
                  {request.status === 'recusado' && 'Recusado'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <User className="w-4 h-4" />
                <span>{request.clientName}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(request.eventDate).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <Clock className="w-4 h-4" />
                <span>{request.eventTime} • {request.guests} convidados</span>
              </div>
              <p className="text-gray-500 text-sm flex-grow mb-4 line-clamp-3">{request.message}</p>
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleViewDetails(request)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  <Info className="w-4 h-4 mr-2" />
                  Detalhes
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes do Pedido */}
      {showDetailsModal && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl"
          >
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Detalhes do Pedido</h3>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-gray-700"><span className="font-semibold">Serviço:</span> {selectedRequest.requestedService}</p>
              <p className="text-gray-700"><span className="font-semibold">Cliente:</span> {selectedRequest.clientName}</p>
              <p className="text-gray-700 flex items-center gap-2"><Mail className="w-4 h-4" /> <span className="font-semibold">Email:</span> {selectedRequest.clientEmail}</p>
              <p className="text-gray-700 flex items-center gap-2"><Phone className="w-4 h-4" /> <span className="font-semibold">Telefone:</span> {selectedRequest.clientPhone}</p>
              <p className="text-gray-700 flex items-center gap-2"><Calendar className="w-4 h-4" /> <span className="font-semibold">Data do Evento:</span> {new Date(selectedRequest.eventDate).toLocaleDateString('pt-BR')}</p>
              <p className="text-gray-700 flex items-center gap-2"><Clock className="w-4 h-4" /> <span className="font-semibold">Hora do Evento:</span> {selectedRequest.eventTime}</p>
              <p className="text-gray-700"><span className="font-semibold">Convidados:</span> {selectedRequest.guests}</p>
              <p className="text-gray-700"><span className="font-semibold">Mensagem:</span> {selectedRequest.message}</p>
              <p className="text-gray-700"><span className="font-semibold">Status:</span> <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(selectedRequest.status)}`}>
                {selectedRequest.status === 'pendente' && 'Pendente'}
                {selectedRequest.status === 'respondido' && 'Respondido'}
                {selectedRequest.status === 'recusado' && 'Recusado'}
              </span></p>
              {selectedRequest.response && (
                <p className="text-gray-700"><span className="font-semibold">Sua Resposta:</span> {selectedRequest.response}</p>
              )}
            </div>

            {selectedRequest.status === 'pendente' && (
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Responder ao Cliente</h4>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows="4"
                  placeholder="Digite sua proposta de orçamento ou mensagem..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                ></textarea>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRespond}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Enviar Resposta
                  </button>
                  <button
                    onClick={handleDecline}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Recusar Pedido
                  </button>
                </div>
              </div>
            )}
             {selectedRequest.status === 'respondido' && (
              <div className="text-center p-4 bg-green-50 rounded-lg text-green-700">
                <p className="font-medium">Você já respondeu a este pedido.</p>
                <button 
                  onClick={() => {
                    setResponseMessage(selectedRequest.response);
                    setSelectedRequest({...selectedRequest, status: 'pendente'}); // Temporarily set to pending to allow editing
                  }}
                  className="mt-2 text-sm text-green-800 hover:underline flex items-center mx-auto gap-1"
                >
                  <Edit3 className="w-4 h-4" /> Editar Resposta
                </button>
              </div>
            )}
            {selectedRequest.status === 'recusado' && (
              <div className="text-center p-4 bg-red-50 rounded-lg text-red-700">
                <p className="font-medium">Você recusou este pedido.</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default BudgetRequestsPage;