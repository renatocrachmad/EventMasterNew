import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  X,
  Linkedin,
  Music,
  Clock,
  Shield
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Serviços",
      links: [
        "Buffet e Catering",
        "Decoração e Flores",
        "DJ e Sonorização",
        "Fotografia e Filmagem",
        "Locais para Eventos"
      ]
    },
    {
      title: "Empresa",
      links: [
        "Sobre Nós",
        "Como Funciona",
        "Seja um Parceiro",
        "Carreiras",
        "Imprensa"
      ]
    },
    {
      title: "Suporte",
      links: [
        { name: "Central de Ajuda", path: "/help-center" },
        { name: "Contato", path: "/contact" },
        { name: "Política de Privacidade", path: "/privacy-policy" },
        { name: "Termos de Uso", path: "/terms-of-use" },
        { name: "FAQ", path: "/help-center" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/", label: "Instagram" },
    { icon: <X className="w-5 h-5" />, href: "https://twitter.com/", label: "X (Twitter)" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/", label: "LinkedIn" }
  ];

  const features = [
    {
      icon: <Music className="w-6 h-6" />,
      text: "Profissionais Verificados"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      text: "Atendimento 24/7"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      text: "Garantia de Qualidade"
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Seção principal do footer */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e descrição */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                EventMaster
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Conectamos você aos melhores profissionais de eventos da sua região.
                Qualidade, confiança e praticidade para tornar sua festa inesquecível.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <div className="text-blue-400 mr-3">
                      {feature.icon}
                    </div>
                    {feature.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links das seções */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4 text-blue-400">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.name}>
                    <Link
                      to={typeof link === 'string' ? "#" : link.path}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {typeof link === 'string' ? link : link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Informações de contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Telefone</p>
                <p className="text-white">(24) 9999-9999</p>
              </div>
            </div>

            <div className="flex items-center">
              <Mail className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">contato@eventmaster.com</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-blue-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Endereço</p>
                <p className="text-white">Petropolis, RJ - Brasil</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-gray-700 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm mb-4 md:mb-0"
            >
              © {currentYear} EventMaster. Todos os direitos reservados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank" // Abre o link em uma nova aba
                  rel="noopener noreferrer" // Segurança para links externos
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
