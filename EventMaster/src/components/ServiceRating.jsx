import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, X, Check } from 'lucide-react';

const ServiceRating = ({ isOpen, onClose, booking, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating) => {
    setHoveredRating(starRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação de 1 a 5 estrelas.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envio da avaliação
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Salvar avaliação no localStorage
      const existingRatings = JSON.parse(localStorage.getItem('serviceRatings') || '[]');
      const newRating = {
        bookingId: booking.id,
        serviceId: booking.serviceId,
        serviceName: booking.serviceName,
        rating: rating,
        date: new Date().toISOString(),
        clientName: booking.clientName
      };

      existingRatings.push(newRating);
      localStorage.setItem('serviceRatings', JSON.stringify(existingRatings));

      // Atualizar status do agendamento para "avaliado"
      const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updatedBookings = bookings.map(b => 
        b.id === booking.id ? { ...b, status: 'avaliado', rating: rating } : b
      );
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

      // Notificar componente pai
      onRatingSubmit(booking.id, rating);

      alert(`Obrigado pela sua avaliação de ${rating} estrela${rating > 1 ? 's' : ''}!`);
      onClose();
    } catch (error) {
      alert('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRating(0);
    setHoveredRating(0);
    onClose();
  };

  if (!isOpen || !booking) return null;

  const displayRating = hoveredRating || rating;

  const getRatingText = (stars) => {
    switch (stars) {
      case 1: return 'Muito Ruim';
      case 2: return 'Ruim';
      case 3: return 'Regular';
      case 4: return 'Bom';
      case 5: return 'Excelente';
      default: return 'Selecione uma avaliação';
    }
  };

  return (
    <div className="rating-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="rating-modal"
      >
        <div className="modal-header">
          <h3>Avaliar Serviço</h3>
          <button onClick={handleCancel} className="close-button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-content">
          <div className="service-info">
            <h4>{booking.serviceName}</h4>
            <p>Serviço: {booking.selectedService}</p>
            <p>Data: {new Date(booking.date).toLocaleDateString('pt-BR')}</p>
            <p>Horário: {booking.time}</p>
          </div>

          <div className="rating-section">
            <h4>Como foi o atendimento?</h4>
            <p>Sua avaliação ajuda outros clientes a escolherem o melhor serviço.</p>
            
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={handleStarLeave}
                  className={`star-button ${star <= displayRating ? 'active' : ''}`}
                  disabled={isSubmitting}
                >
                  <Star 
                    className={`star-icon ${star <= displayRating ? 'filled' : ''}`}
                    fill={star <= displayRating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>

            <div className="rating-text">
              <span className={`rating-label ${displayRating > 0 ? 'visible' : ''}`}>
                {getRatingText(displayRating)}
              </span>
            </div>
          </div>

          <div className="rating-info">
            <div className="info-item">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Sua avaliação é anônima e ajuda a melhorar o serviço</span>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            onClick={handleCancel} 
            className="cancel-button"
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleSubmit} 
            className="submit-button"
            disabled={rating === 0 || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="loading-spinner"></div>
                Enviando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Enviar Avaliação
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceRating;

