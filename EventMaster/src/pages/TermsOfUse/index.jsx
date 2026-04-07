import React from 'react';
import { Scale, Info, Users } from 'lucide-react';
import Layout from '../../components/Layout';

const TermsOfUse = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Termos de Uso</h1>
        <div className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Scale className="text-blue-600" />
              <h2 className="text-xl font-bold">1. Aceitação</h2>
            </div>
            <p className="text-gray-600">Ao usar o EventMaster, você concorda com todas as nossas diretrizes e regras de conduta.</p>
          </section>
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Info className="text-purple-600" />
              <h2 className="text-xl font-bold">2. Responsabilidade</h2>
            </div>
            <p className="text-gray-600">Somos uma plataforma de conexão. A execução do serviço é de responsabilidade do prestador escolhido.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfUse;
