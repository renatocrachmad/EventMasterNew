import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import SearchResults from "./pages/SearchResults";
import ServiceDetails from "./pages/ServiceDetails";
import ClientProfile from "./pages/ClientProfile";
import ProviderProfile from "./pages/ProviderProfile";
import SubscriberDashboard from "./pages/subscriber";
import Layout from "./components/Layout";
import "./App.css";
import PartnerPage from "./pages/PartnerPage";
import EarningsControl from "./pages/ControleDeGanhos";
import PremiumProviderDashboard from "./pages/InserirAnunciosPremium";
import HelpCenter from "./pages/HelpCenter"; // Importe a nova página
import Contact from "./pages/Contact"; // Importe a nova página
import TermsOfUse from "./pages/TermsOfUse"; // Importe a nova página
import PrivacyPolicy from "./pages/PrivacyPolicy"; 

function App() {
  const user = {
    name: "João",
    isSubscriber: true, // ou false para testes
  };

  return (
    <Router>
      <Layout user={user}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/seja-parceiro" element={<PartnerPage />} />
          <Route path="/subscriber-dashboard" element={<SubscriberDashboard />} />
          <Route path="/controle-ganhos" element={<EarningsControl />} />
          <Route path="/premium-dashboard" element={<PremiumProviderDashboard />} />
          <Route path="/help-center" element={<HelpCenter />} /> {/* Nova rota */}
          <Route path="/contact" element={<Contact />} /> {/* Nova rota */}
          <Route path="/terms-of-use" element={<TermsOfUse />} /> {/* Nova rota */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
