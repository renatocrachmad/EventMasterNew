import React from 'react';
import { motion } from 'framer-motion';
import { X, Phone } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, provider }) => {
  if (!isOpen) return null; // 👈 ESSENCIAL para ocultar o modal

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Olá! Gostaria de agendar um serviço na ${provider.name}.`);
    const whatsappUrl = `https://wa.me/55${provider.phone.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailClick = () => {
    const subject = encodeURIComponent(`Agendamento de Serviço - ${provider.name}`);
    const body = encodeURIComponent(`Olá!\n\nGostaria de agendar um serviço na ${provider.name}.\n\nAguardo retorno.\n\nObrigado!`);
    const emailUrl = `mailto:${provider.email}?subject=${subject}&body=${body}`;
    window.open(emailUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:${provider.phone}`, '_self');
  };

  return (
    <div className="contact-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="contact-modal"
      >
        <div className="modal-header">
          <h3>Entrar em Contato</h3>
          <button onClick={onClose} className="close-button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-content">
          <div className="provider-info">
            <img src={provider.image} alt={provider.name} className="provider-avatar" />
            <div>
              <h4>{provider.name}</h4>
              <p>{provider.address}</p>
            </div>
          </div>

          <div className="contact-options">
            <button onClick={handleWhatsAppClick} className="contact-option whatsapp">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M17.472 14.382...Z" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-title">WhatsApp</span>
                <span className="contact-subtitle">Conversar agora</span>
              </div>
            </button>

            <button onClick={handleEmailClick} className="contact-option email">
              <div className="contact-icon">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M24 5.457...Z" />
                </svg>
              </div>
              <div className="contact-details">
                <span className="contact-title">E-mail</span>
                <span className="contact-subtitle">{provider.email}</span>
              </div>
            </button>

            <button onClick={handlePhoneClick} className="contact-option phone">
              <div className="contact-icon">
                <Phone className="w-6 h-6" />
              </div>
              <div className="contact-details">
                <span className="contact-title">Telefone</span>
                <span className="contact-subtitle">{provider.phone}</span>
              </div>
            </button>
          </div>

          <div className="modal-footer">
            <p>Escolha a forma de contato de sua preferência</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactModal;
