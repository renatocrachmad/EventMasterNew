import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  User, Phone, Calendar, Briefcase, PlusCircle, Edit, Trash2, FileText, Download, Printer, XCircle, Info, Building, Mail, Save
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ClientSupplierManagement = () => {
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' or 'suppliers'

  // --- Client Management State ---
  const [clients, setClients] = useState([
    { id: 'c1', name: 'Maria Silva', phone: '(11) 98765-4321', eventType: 'Casamento', eventDate: '2024-10-20' },
    { id: 'c2', name: 'João Santos', phone: '(11) 91234-5678', eventType: 'Aniversário Infantil', eventDate: '2024-08-15' },
    { id: 'c3', name: 'Ana Paula', phone: '(11) 99887-6655', eventType: 'Evento Corporativo', eventDate: '2024-11-01' },
  ]);
  const [newClient, setNewClient] = useState({ name: '', phone: '', eventType: '', eventDate: '' });
  const [editingClient, setEditingClient] = useState(null); // Client object being edited

  // --- Supplier Management State ---
  const [suppliers, setSuppliers] = useState([
    { id: 's1', name: 'Floricultura Jardim', contact: '(11) 99999-0000', serviceProduct: 'Flores e Decoração' },
    { id: 's2', name: 'Doces da Vovó', contact: 'docesvovo@email.com', serviceProduct: 'Bolos e Doces' },
    { id: 's3', name: 'Fotógrafo Flash', contact: '(11) 97777-1111', serviceProduct: 'Fotografia e Filmagem' },
  ]);
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', serviceProduct: '' });
  const [editingSupplier, setEditingSupplier] = useState(null); // Supplier object being edited

  const pdfContentRef = useRef(); // Ref for the content to be printed

  // --- Client Management Functions ---
  const handleAddClient = () => {
    if (!newClient.name || !newClient.phone || !newClient.eventType || !newClient.eventDate) {
      alert('Por favor, preencha todos os campos do cliente.');
      return;
    }
    setClients([...clients, { id: `c${Date.now()}`, ...newClient }]);
    setNewClient({ name: '', phone: '', eventType: '', eventDate: '' });
    alert('Cliente adicionado com sucesso!');
  };

  const handleUpdateClient = () => {
    if (!editingClient.name || !editingClient.phone || !editingClient.eventType || !editingClient.eventDate) {
      alert('Por favor, preencha todos os campos do cliente.');
      return;
    }
    setClients(clients.map(c => (c.id === editingClient.id ? editingClient : c)));
    setEditingClient(null);
    alert('Cliente atualizado com sucesso!');
  };

  const handleDeleteClient = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      setClients(clients.filter(c => c.id !== id));
      alert('Cliente excluído com sucesso!');
    }
  };

  // --- Supplier Management Functions ---
  const handleAddSupplier = () => {
    if (!newSupplier.name || !newSupplier.contact || !newSupplier.serviceProduct) {
      alert('Por favor, preencha todos os campos do fornecedor.');
      return;
    }
    setSuppliers([...suppliers, { id: `s${Date.now()}`, ...newSupplier }]);
    setNewSupplier({ name: '', contact: '', serviceProduct: '' });
    alert('Fornecedor adicionado com sucesso!');
  };

  const handleUpdateSupplier = () => {
    if (!editingSupplier.name || !editingSupplier.contact || !editingSupplier.serviceProduct) {
      alert('Por favor, preencha todos os campos do fornecedor.');
      return;
    }
    setSuppliers(suppliers.map(s => (s.id === editingSupplier.id ? editingSupplier : s)));
    setEditingSupplier(null);
    alert('Fornecedor atualizado com sucesso!');
  };

  const handleDeleteSupplier = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este fornecedor?')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
      alert('Fornecedor excluído com sucesso!');
    }
  };

  // --- PDF Generation Functions ---
  const generateClientPdf = (client) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Cores em RGB (compatibilidade total)
    const primary = [99, 102, 241]; // Indigo 600
    const dark = [31, 41, 55];

    // Cabeçalho estilizado
    doc.setFillColor(...primary);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('EventMaster', pageWidth / 2, 18, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Relatório Individual do Cliente', pageWidth / 2, 28, { align: 'center' });

    // Card de Informações
    doc.setDrawColor(229, 231, 235);
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(15, 55, pageWidth - 30, 80, 3, 3, 'FD');

    doc.setTextColor(...dark);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Dados Cadastrais', 25, 68);
    doc.line(25, 72, pageWidth - 25, 72);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const fields = [
      ['Nome:', client.name],
      ['WhatsApp/Telefone:', client.phone],
      ['Tipo de Evento:', client.eventType],
      ['Data do Evento:', new Date(client.eventDate + 'T00:00:00').toLocaleDateString('pt-BR')]
    ];

    fields.forEach((field, i) => {
      const y = 85 + (i * 10);
      doc.setFont('helvetica', 'bold');
      doc.text(field[0], 25, y);
      doc.setFont('helvetica', 'normal');
      doc.text(String(field[1]), 70, y);
    });

    // Rodapé
    doc.setFontSize(9);
    doc.setTextColor(156, 163, 175);
    doc.text(`Documento gerado em: ${new Date().toLocaleString('pt-BR')}`, pageWidth / 2, 285, { align: 'center' });

    doc.save(`cliente_${client.name.replace(/\s/g, '_')}.pdf`);
  };

  const generateAllClientsPdf = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const primary = [99, 102, 241];

    // Cabeçalho Geral
    doc.setFillColor(...primary);
    doc.rect(0, 0, pageWidth, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('EventMaster - Listagem Geral de Clientes', 15, 20);

    let y = 45;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de registros: ${clients.length} | Data: ${new Date().toLocaleDateString('pt-BR')}`, 15, 38);

    clients.forEach((client, index) => {
      // Verifica se precisa de nova página
      if (y > 260) {
        doc.addPage();
        y = 20;
      }

      // Desenha bloco do cliente
      doc.setDrawColor(229, 231, 235);
      doc.setLineWidth(0.2);
      doc.rect(15, y, pageWidth - 30, 32);
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text(`${index + 1}. ${client.name}`, 20, y + 8);
      
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.text(`WhatsApp: ${client.phone}`, 20, y + 16);
      doc.text(`Tipo: ${client.eventType}`, 20, y + 22);
      doc.text(`Data: ${new Date(client.eventDate + 'T00:00:00').toLocaleDateString('pt-BR')}`, 20, y + 28);
      
      y += 38;
    });

    doc.save('todos_clientes_eventmaster.pdf');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gerenciar Clientes e Fornecedores</h2>
      <p className="text-gray-600 mb-8">
        Mantenha um registro organizado dos seus clientes e fornecedores para otimizar seus eventos.
      </p>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('clients')}
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'clients'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'suppliers'
              ? 'border-b-2 border-indigo-600 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Fornecedores
        </button>
      </div>

      {activeTab === 'clients' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingClient ? 'Editar Cliente' : 'Adicionar Novo Cliente'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <input
                type="text"
                value={editingClient ? editingClient.name : newClient.name}
                onChange={(e) =>
                  editingClient
                    ? setEditingClient({ ...editingClient, name: e.target.value })
                    : setNewClient({ ...newClient, name: e.target.value })
                }
                placeholder="Nome do Cliente"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                value={editingClient ? editingClient.phone : newClient.phone}
                onChange={(e) =>
                  editingClient
                    ? setEditingClient({ ...editingClient, phone: e.target.value })
                    : setNewClient({ ...newClient, phone: e.target.value })
                }
                placeholder="(XX) XXXXX-XXXX"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
              <input
                type="text"
                value={editingClient ? editingClient.eventType : newClient.eventType}
                onChange={(e) =>
                  editingClient
                    ? setEditingClient({ ...editingClient, eventType: e.target.value })
                    : setNewClient({ ...newClient, eventType: e.target.value })
                }
                placeholder="Ex: Casamento, Aniversário"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Data do Evento</label>
              <input
                type="date"
                value={editingClient ? editingClient.eventDate : newClient.eventDate}
                onChange={(e) =>
                  editingClient
                    ? setEditingClient({ ...editingClient, eventDate: e.target.value })
                    : setNewClient({ ...newClient, eventDate: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {editingClient ? (
              <>
                <button
                  onClick={handleUpdateClient}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <Save className="w-5 h-5" /> Salvar Alterações
                </button>
                <button
                  onClick={() => setEditingClient(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  <XCircle className="w-5 h-5" /> Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleAddClient}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                <PlusCircle className="w-5 h-5" /> Adicionar Cliente
              </button>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-6">Meus Clientes</h3>
          {clients.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhum cliente cadastrado ainda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {clients.map((client) => (
                <motion.div
                  key={client.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-indigo-600" /> {client.name}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Phone className="w-4 h-4 text-gray-500" /> {client.phone}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4 text-gray-500" /> {client.eventType}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-500" /> {new Date(client.eventDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingClient(client)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      title="Editar Cliente"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      title="Excluir Cliente"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => generateClientPdf(client)}
                      className="p-2 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                      title="Gerar PDF do Cliente"
                    >
                      <FileText className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
              <div className="mt-8 text-right">
                <button
                  onClick={generateAllClientsPdf}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold ml-auto"
                >
                  <Download className="w-5 h-5" /> Gerar PDF de Todos os Clientes
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {activeTab === 'suppliers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8 border border-gray-200"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingSupplier ? 'Editar Fornecedor' : 'Adicionar Novo Fornecedor'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Fornecedor</label>
              <input
                type="text"
                value={editingSupplier ? editingSupplier.name : newSupplier.name}
                onChange={(e) =>
                  editingSupplier
                    ? setEditingSupplier({ ...editingSupplier, name: e.target.value })
                    : setNewSupplier({ ...newSupplier, name: e.target.value })
                }
                placeholder="Nome da Empresa/Pessoa"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contato (Telefone/Email)</label>
              <input
                type="text"
                value={editingSupplier ? editingSupplier.contact : newSupplier.contact}
                onChange={(e) =>
                  editingSupplier
                    ? setEditingSupplier({ ...editingSupplier, contact: e.target.value })
                    : setNewSupplier({ ...newSupplier, contact: e.target.value })
                }
                placeholder="(XX) XXXXX-XXXX ou email@exemplo.com"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Serviço/Produto Oferecido</label>
              <input
                type="text"
                value={editingSupplier ? editingSupplier.serviceProduct : newSupplier.serviceProduct}
                onChange={(e) =>
                  editingSupplier
                    ? setEditingSupplier({ ...editingSupplier, serviceProduct: e.target.value })
                    : setNewSupplier({ ...newSupplier, serviceProduct: e.target.value })
                }
                placeholder="Ex: Decoração floral, Bolos personalizados, Fotografia"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            {editingSupplier ? (
              <>
                <button
                  onClick={handleUpdateSupplier}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <Save className="w-5 h-5" /> Salvar Alterações
                </button>
                <button
                  onClick={() => setEditingSupplier(null)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  <XCircle className="w-5 h-5" /> Cancelar
                </button>
              </>
            ) : (
              <button
                onClick={handleAddSupplier}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
              >
                <PlusCircle className="w-5 h-5" /> Adicionar Fornecedor
              </button>
            )}
          </div>

          <h3 className="text-xl font-bold text-gray-900 mt-10 mb-6">Meus Fornecedores</h3>
          {suppliers.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <Info className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Nenhum fornecedor cadastrado ainda.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {suppliers.map((supplier) => (
                <motion.div
                  key={supplier.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200"
                >
                  <div className="flex-1 mb-4 md:mb-0">
                    <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Building className="w-5 h-5 text-indigo-600" /> {supplier.name}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      {supplier.contact.includes('@') ? (
                        <Mail className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Phone className="w-4 h-4 text-gray-500" />
                      )}{' '}
                      {supplier.contact}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <Briefcase className="w-4 h-4 text-gray-500" /> {supplier.serviceProduct}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingSupplier(supplier)}
                      className="p-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      title="Editar Fornecedor"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(supplier.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      title="Excluir Fornecedor"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default ClientSupplierManagement;