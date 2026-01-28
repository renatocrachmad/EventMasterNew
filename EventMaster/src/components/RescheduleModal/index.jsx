import React, { useState, useEffect } from 'react';
import { Calendar, Clock, X, CheckCircle } from 'lucide-react';
import '../RescheduleModal/style.css';

const RescheduleModal = ({ isOpen, booking, onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (booking) {
      setDate(booking.date || '');
      setTime(booking.time || '');
    }
  }, [booking]);

  if (!isOpen || !booking) return null;

  const handleSubmit = () => {
    if (!date || !time) {
      alert('Preencha a data e o horário.');
      return;
    }

    const updated = {
      ...booking,
      date,
      time,
      status: 'agendado'
    };

    onSave(updated);
  };

  return (
    <div className="reschedule-modal-overlay">
      <div className="reschedule-modal-content">
        <button className="reschedule-modal-close" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <h2 className="reschedule-modal-title">Reagendar Serviço</h2>

        <div className="reschedule-modal-form">
          <label>Nova Data</label>
          <div className="input-with-icon">
            <Calendar className="w-4 h-4" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <label>Nova Hora</label>
          <div className="input-with-icon">
            <Clock className="w-4 h-4" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="reschedule-modal-actions">
            <button className="save-button" onClick={handleSubmit}>
              <CheckCircle className="w-4 h-4" />
              Salvar
            </button>
            <button className="cancel-button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleModal;
