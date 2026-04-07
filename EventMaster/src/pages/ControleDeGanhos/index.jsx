import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Briefcase,
  TrendingUp,
  BarChart3,
  Clock,
  Filter,
  Download,
  Calendar,
} from "lucide-react";

const EarningsControl = () => {
  const navigate = useNavigate();
  const [monthlyEarnings, setMonthlyEarnings] = useState({});
  const [serviceEarnings, setServiceEarnings] = useState([]);
  const [monthlyServices, setMonthlyServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalServices, setTotalServices] = useState(0);

  useEffect(() => {
    setLoading(true);
    // Simulação de dados (em um cenário real, viriam de uma API)
    setTimeout(() => {
      const mockBookings = [
        {
          id: 1,
          serviceName: "Buffet Casamento",
          price: 15000,
          date: "2024-01-15",
          status: "concluido",
        },
        {
          id: 2,
          serviceName: "Coquetel Corporativo",
          price: 5000,
          date: "2024-01-20",
          status: "concluido",
        },
        {
          id: 3,
          serviceName: "Aniversário 15 Anos",
          price: 12000,
          date: "2024-02-10",
          status: "concluido",
        },
        {
          id: 4,
          serviceName: "Jantar de Noivado",
          price: 3500,
          date: "2024-02-25",
          status: "concluido",
        },
        {
          id: 5,
          serviceName: "Buffet Casamento",
          price: 16000,
          date: "2024-03-05",
          status: "concluido",
        },
        {
          id: 6,
          serviceName: "Coffee Break",
          price: 1500,
          date: "2024-03-15",
          status: "concluido",
        },
        {
          id: 7,
          serviceName: "Aniversário Infantil",
          price: 4000,
          date: "2024-04-02",
          status: "concluido",
        },
        {
          id: 8,
          serviceName: "Buffet Casamento",
          price: 14500,
          date: "2024-04-20",
          status: "concluido",
        },
        {
          id: 9,
          serviceName: "Coquetel Corporativo",
          price: 6000,
          date: "2024-05-10",
          status: "concluido",
        },
        {
          id: 10,
          serviceName: "Bodas de Prata",
          price: 8000,
          date: "2024-05-25",
          status: "concluido",
        },
        {
          id: 11,
          serviceName: "Buffet Casamento",
          price: 15500,
          date: "2024-06-08",
          status: "concluido",
        },
        {
          id: 12,
          serviceName: "Jantar de Formatura",
          price: 9000,
          date: "2024-06-22",
          status: "concluido",
        },
        {
          id: 13,
          serviceName: "Festa Junina Empresa",
          price: 7500,
          date: "2024-07-05",
          status: "concluido",
        },
        {
          id: 14,
          serviceName: "Buffet Casamento",
          price: 17000,
          date: "2024-07-20",
          status: "concluido",
        },
      ];

      // Filtrar por ano selecionado
      const filteredBookings = mockBookings.filter(
        (booking) =>
          booking.status === "concluido" &&
          booking.date.startsWith(selectedYear.toString())
      );

      // Calcular Ganhos Mensais e Serviços por Mês
      const calculatedMonthlyEarnings = {};
      const calculatedMonthlyServices = {};
      const calculatedServiceEarnings = {};
      let yearTotal = 0;
      let yearServices = 0;

      filteredBookings.forEach((booking) => {
        const month = booking.date.substring(0, 7); // YYYY-MM
        const monthName = getMonthName(month);

        // Ganhos Mensais
        calculatedMonthlyEarnings[monthName] =
          (calculatedMonthlyEarnings[monthName] || 0) + booking.price;

        // Serviços por Mês
        calculatedMonthlyServices[monthName] =
          (calculatedMonthlyServices[monthName] || 0) + 1;

        // Ganhos por Serviço
        calculatedServiceEarnings[booking.serviceName] =
          (calculatedServiceEarnings[booking.serviceName] || 0) + booking.price;

        // Totais do ano
        yearTotal += booking.price;
        yearServices += 1;
      });

      setMonthlyEarnings(calculatedMonthlyEarnings);
      setMonthlyServices(calculatedMonthlyServices);
      setServiceEarnings(
        Object.entries(calculatedServiceEarnings)
          .map(([name, total]) => ({ name, total }))
          .sort((a, b) => b.total - a.total)
      );
      setTotalEarnings(yearTotal);
      setTotalServices(yearServices);
      setLoading(false);
    }, 1000);
  }, [selectedYear]);

  const getMonthName = (monthString) => {
    const months = {
      "01": "Janeiro",
      "02": "Fevereiro",
      "03": "Março",
      "04": "Abril",
      "05": "Maio",
      "06": "Junho",
      "07": "Julho",
      "08": "Agosto",
      "09": "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };
    const month = monthString.split("-")[1];
    return months[month] || monthString;
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleExportData = () => {
    alert("Funcionalidade de exportação em desenvolvimento!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight">Controle de Ganhos e Serviços</h1>
            <p className="mt-2 text-lg text-white/80 max-w-2xl mx-auto">
              Acompanhe suas finanças e o desempenho dos seus serviços de forma
              detalhada.
            </p>
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros e Resumo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white rounded-xl shadow-sm border">
            <div className="flex items-center gap-3">
              <label htmlFor="year-select" className="flex items-center text-sm font-medium text-gray-700">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                Filtrar por Ano:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
            <button onClick={handleExportData} className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
              <Download className="w-4 h-4" />
              Exportar Dados
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total de Ganhos no Ano</h3>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-6">
              <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                <BarChart3 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Serviços Realizados no Ano</h3>
                <p className="text-3xl font-bold text-gray-900">{totalServices} serviços</p>
              </div>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-lg">Carregando dados...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ganhos Mensais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="p-6 text-center border-b border-gray-100">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-green-400 to-green-600">
                  <DollarSign className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Ganhos Mensais</h2>
                <p className="text-sm text-gray-500 mt-1">Sua receita mês a mês</p>
              </div>
              <div className="p-6 flex-1">
                {Object.keys(monthlyEarnings).length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-500 italic">
                    <p>Nenhum ganho registrado para {selectedYear}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(monthlyEarnings).map(([month, total]) => (
                      <li key={month} className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-700">{month}</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(total)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* Ganhos por Serviço */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="p-6 text-center border-b border-gray-100">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-blue-400 to-blue-600">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Ganhos por Serviço</h2>
                <p className="text-sm text-gray-500 mt-1">Performance de cada serviço</p>
              </div>
              <div className="p-6 flex-1">
                {serviceEarnings.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-500 italic">
                    <p>Nenhum serviço registrado para {selectedYear}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {serviceEarnings.map((service, index) => (
                      <li key={index} className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-700">{service.name}</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(service.total)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>

            {/* Serviços Realizados por Mês */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden hover:-translate-y-1 transition-transform"
            >
              <div className="p-6 text-center border-b border-gray-100">
                <div className="mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-purple-400 to-purple-600">
                  <Clock className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Serviços por Mês</h2>
                <p className="text-sm text-gray-500 mt-1">Volume de trabalho mensal</p>
              </div>
              <div className="p-6 flex-1">
                {Object.keys(monthlyServices).length === 0 ? (
                  <div className="flex items-center justify-center h-full text-center text-gray-500 italic">
                    <p>Nenhum serviço registrado para {selectedYear}</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {Object.entries(monthlyServices).map(([month, count]) => (
                      <li key={month} className="flex justify-between items-center py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-700">{month}</span>
                        <span className="font-semibold text-blue-600">
                          {count} {count > 1 ? 'serviços' : 'serviço'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EarningsControl;
