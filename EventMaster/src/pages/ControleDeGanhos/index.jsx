import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  Calendar,
  Briefcase,
  TrendingUp,
  BarChart3,
  Clock,
  Filter,
  Download,
} from "lucide-react";
import "./style.css";

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
          serviceName: "Troca de Óleo",
          price: 80,
          date: "2024-01-10",
          status: "concluido",
        },
        {
          id: 2,
          serviceName: "Revisão Completa",
          price: 250,
          date: "2024-01-15",
          status: "concluido",
        },
        {
          id: 3,
          serviceName: "Balanceamento",
          price: 50,
          date: "2024-02-20",
          status: "concluido",
        },
        {
          id: 4,
          serviceName: "Troca de Pneu",
          price: 120,
          date: "2024-02-01",
          status: "concluido",
        },
        {
          id: 5,
          serviceName: "Alinhamento",
          price: 70,
          date: "2024-03-05",
          status: "concluido",
        },
        {
          id: 6,
          serviceName: "Troca de Óleo",
          price: 80,
          date: "2024-03-10",
          status: "concluido",
        },
        {
          id: 7,
          serviceName: "Revisão Completa",
          price: 250,
          date: "2024-04-01",
          status: "concluido",
        },
        {
          id: 8,
          serviceName: "Freios",
          price: 150,
          date: "2024-04-05",
          status: "concluido",
        },
        {
          id: 9,
          serviceName: "Troca de Óleo",
          price: 80,
          date: "2024-05-12",
          status: "concluido",
        },
        {
          id: 10,
          serviceName: "Suspensão",
          price: 300,
          date: "2024-05-18",
          status: "concluido",
        },
        {
          id: 11,
          serviceName: "Balanceamento",
          price: 50,
          date: "2024-06-03",
          status: "concluido",
        },
        {
          id: 12,
          serviceName: "Alinhamento",
          price: 70,
          date: "2024-06-15",
          status: "concluido",
        },
        {
          id: 13,
          serviceName: "Troca de Óleo",
          price: 80,
          date: "2024-07-08",
          status: "concluido",
        },
        {
          id: 14,
          serviceName: "Revisão Completa",
          price: 250,
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
    <div className="earnings-control-page">
      <div className="header">
        <div className="container">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <h1>Controle de Ganhos e Serviços</h1>
            <p>
              Acompanhe suas finanças e o desempenho dos seus serviços de forma
              detalhada.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container content-section">
        {/* Filtros e Resumo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="controls-section"
        >
          <div className="filters">
            <div className="filter-group">
              <label htmlFor="year-select">
                <Filter className="w-4 h-4" />
                Ano:
              </label>
              <select
                id="year-select"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="year-select"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
            <button onClick={handleExportData} className="export-button">
              <Download className="w-4 h-4" />
              Exportar Dados
            </button>
          </div>

          <div className="summary-cards">
            <div className="summary-card total-earnings">
              <div className="summary-icon">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="summary-content">
                <h3>Total do Ano</h3>
                <p>{formatCurrency(totalEarnings)}</p>
              </div>
            </div>
            <div className="summary-card total-services">
              <div className="summary-icon">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="summary-content">
                <h3>Serviços Realizados</h3>
                <p>{totalServices} serviços</p>
              </div>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando dados...</p>
          </div>
        ) : (
          <div className="grid-container">
            {/* Ganhos Mensais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card monthly-earnings"
            >
              <div className="card-header">
                <div className="card-icon monthly">
                  <DollarSign className="w-6 h-6" />
                </div>
                <h2>Ganhos Mensais</h2>
                <p>Acompanhe sua receita mensal de forma detalhada</p>
              </div>
              <div className="data-list">
                {Object.keys(monthlyEarnings).length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum ganho registrado para {selectedYear}</p>
                  </div>
                ) : (
                  Object.entries(monthlyEarnings).map(([month, total]) => (
                    <div key={month} className="data-item">
                      <span className="data-label">{month}</span>
                      <span className="data-value earnings">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Ganhos por Serviço */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card service-earnings"
            >
              <div className="card-header">
                <div className="card-icon service">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2>Ganhos por Serviço</h2>
                <p>Veja quanto você ganhou com cada serviço prestado</p>
              </div>
              <div className="data-list">
                {serviceEarnings.length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum serviço registrado para {selectedYear}</p>
                  </div>
                ) : (
                  serviceEarnings.map((service, index) => (
                    <div key={index} className="data-item">
                      <span className="data-label">{service.name}</span>
                      <span className="data-value earnings">
                        {formatCurrency(service.total)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Serviços Realizados por Mês */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="card monthly-services"
            >
              <div className="card-header">
                <div className="card-icon services">
                  <Clock className="w-6 h-6" />
                </div>
                <h2>Serviços por Mês</h2>
                <p>Monitore quantos serviços você realizou por mês</p>
              </div>
              <div className="data-list">
                {Object.keys(monthlyServices).length === 0 ? (
                  <div className="empty-state">
                    <p>Nenhum serviço registrado para {selectedYear}</p>
                  </div>
                ) : (
                  Object.entries(monthlyServices).map(([month, count]) => (
                    <div key={month} className="data-item">
                      <span className="data-label">{month}</span>
                      <span className="data-value services">
                        {count} serviços
                      </span>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarningsControl;
