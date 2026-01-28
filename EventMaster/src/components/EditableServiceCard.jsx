import React, { useState } from 'react';
import { Check, X, Clock } from 'lucide-react';

const EditableServiceCard = ({ service, onSave, onCancel }) => {
  const [editedService, setEditedService] = useState({ ...service });

  const handleSave = () => {
    if (!editedService.name || !editedService.price || !editedService.duration) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave(editedService);
  };

  return (
    <div className="service-form">
      <input
        type="text"
        value={editedService.name}
        onChange={(e) => setEditedService(prev => ({ ...prev, name: e.target.value }))}
        className="service-input"
        placeholder="Nome do serviço"
      />
      <input
        type="text"
        value={editedService.price}
        onChange={(e) => setEditedService(prev => ({ ...prev, price: e.target.value }))}
        className="service-input"
        placeholder="Preço (ex: R$ 50,00)"
      />
      <input
        type="text"
        value={editedService.duration}
        onChange={(e) => setEditedService(prev => ({ ...prev, duration: e.target.value }))}
        className="service-input"
        placeholder="Duração (ex: 30 min)"
      />
      <div className="service-form-actions">
        <button onClick={handleSave} className="save-service-btn">
          <Check className="w-4 h-4" />
          Salvar
        </button>
        <button onClick={onCancel} className="cancel-service-btn">
          <X className="w-4 h-4" />
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditableServiceCard;

