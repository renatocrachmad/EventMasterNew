import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Check, User } from 'lucide-react';

const ProfilePhotoEditor = ({ isOpen, onClose, currentPhoto, onPhotoUpdate }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      setSelectedFile(file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    
    try {
      // Simular upload (em produção, você faria upload para um servidor)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Salvar no localStorage (simulando persistência)
      const photoData = previewUrl;
      localStorage.setItem('userProfilePhoto', photoData);
      
      // Notificar componente pai
      onPhotoUpdate(photoData);
      
      alert('Foto de perfil atualizada com sucesso!');
      onClose();
    } catch (error) {
      alert('Erro ao fazer upload da foto. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePhoto = () => {
    if (window.confirm('Tem certeza que deseja remover sua foto de perfil?')) {
      setSelectedFile(null);
      setPreviewUrl('https://via.placeholder.com/150');
      localStorage.removeItem('userProfilePhoto');
      onPhotoUpdate('https://via.placeholder.com/150');
      alert('Foto de perfil removida com sucesso!');
      onClose();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewUrl(currentPhoto);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="photo-editor-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="photo-editor-modal"
      >
        <div className="modal-header">
          <h3>Editar Foto de Perfil</h3>
          <button onClick={handleCancel} className="close-button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-content">
          <div className="photo-preview-section">
            <div className="photo-preview">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="preview-image"
              />
              <div className="photo-overlay">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="change-photo-button"
                >
                  <Camera className="w-6 h-6" />
                  <span>Alterar Foto</span>
                </button>
              </div>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden-file-input"
            />
          </div>

          <div className="upload-options">
            <div className="upload-info">
              <h4>Requisitos da Foto</h4>
              <ul>
                <li>Formato: JPG, PNG ou GIF</li>
                <li>Tamanho máximo: 5MB</li>
                <li>Recomendado: 400x400 pixels</li>
                <li>A foto deve ser quadrada para melhor resultado</li>
              </ul>
            </div>

            <div className="upload-actions">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="select-file-button"
              >
                <Upload className="w-5 h-5" />
                Selecionar Arquivo
              </button>

              {currentPhoto !== 'https://via.placeholder.com/150' && (
                <button 
                  onClick={handleRemovePhoto}
                  className="remove-photo-button"
                >
                  <X className="w-5 h-5" />
                  Remover Foto
                </button>
              )}
            </div>

            {selectedFile && (
              <div className="file-info">
                <div className="file-details">
                  <User className="w-5 h-5" />
                  <div>
                    <p className="file-name">{selectedFile.name}</p>
                    <p className="file-size">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button 
            onClick={handleCancel} 
            className="cancel-button"
            disabled={isUploading}
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleUpload} 
            className="save-button"
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <div className="loading-spinner"></div>
                Salvando...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Salvar Foto
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePhotoEditor;

