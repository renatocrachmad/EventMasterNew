import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Layout from '../../components/Layout';

const Contact = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Contato</h1>
            <p className="text-gray-600">Estamos aqui para tirar suas dúvidas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold">Telefone</h3>
              <p className="text-gray-500 text-sm">(24) 9999-9999</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
              <Mail className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-bold">E-mail</h3>
              <p className="text-gray-500 text-sm">suporte@eventmaster.com</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
              <MapPin className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <h3 className="font-bold">Localização</h3>
              <p className="text-gray-500 text-sm">Petrópolis, RJ</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Nome" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
                <input type="email" placeholder="E-mail" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <input type="text" placeholder="Assunto" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none" />
              <textarea rows="5" placeholder="Mensagem" className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
              <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                Enviar <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
