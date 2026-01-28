import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Moon, 
  Sun, 
  Monitor,
  Check,
  X
} from 'lucide-react';

const ThemeSettings = ({ isOpen, onClose }) => {
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [accentColor, setAccentColor] = useState('#10b981');

  const colorOptions = [
    { name: 'Azul', value: '#3b82f6' },
    { name: 'Verde', value: '#10b981' },
    { name: 'Roxo', value: '#8b5cf6' },
    { name: 'Rosa', value: '#ec4899' },
    { name: 'Laranja', value: '#f59e0b' },
    { name: 'Vermelho', value: '#ef4444' },
    { name: 'Índigo', value: '#6366f1' },
    { name: 'Teal', value: '#14b8a6' }
  ];

  useEffect(() => {
    // Carregar configurações salvas
    const savedTheme = localStorage.getItem('userTheme') || 'light';
    const savedPrimaryColor = localStorage.getItem('userPrimaryColor') || '#3b82f6';
    const savedAccentColor = localStorage.getItem('userAccentColor') || '#10b981';
    
    setTheme(savedTheme);
    setPrimaryColor(savedPrimaryColor);
    setAccentColor(savedAccentColor);
    
    applyTheme(savedTheme, savedPrimaryColor, savedAccentColor);
  }, []);

  const applyTheme = (selectedTheme, primary, accent) => {
    const root = document.documentElement;
    
    // Aplicar tema escuro/claro
    if (selectedTheme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.remove('dark-theme');
    }
    
    // Aplicar cores personalizadas
    root.style.setProperty('--primary-color', primary);
    root.style.setProperty('--accent-color', accent);
    
    // Gerar variações da cor primária
    const primaryRgb = hexToRgb(primary);
    const accentRgb = hexToRgb(accent);
    
    if (primaryRgb) {
      root.style.setProperty('--primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
      root.style.setProperty('--primary-light', `rgba(${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}, 0.1)`);
      root.style.setProperty('--primary-hover', darkenColor(primary, 10));
    }
    
    if (accentRgb) {
      root.style.setProperty('--accent-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
      root.style.setProperty('--accent-light', `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.1)`);
      root.style.setProperty('--accent-hover', darkenColor(accent, 10));
    }
  };

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme, primaryColor, accentColor);
  };

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color);
    applyTheme(theme, color, accentColor);
  };

  const handleAccentColorChange = (color) => {
    setAccentColor(color);
    applyTheme(theme, primaryColor, color);
  };

  const handleSave = () => {
    localStorage.setItem('userTheme', theme);
    localStorage.setItem('userPrimaryColor', primaryColor);
    localStorage.setItem('userAccentColor', accentColor);
    alert('Configurações de tema salvas com sucesso!');
    onClose();
  };

  const handleReset = () => {
    const defaultTheme = 'light';
    const defaultPrimary = '#3b82f6';
    const defaultAccent = '#10b981';
    
    setTheme(defaultTheme);
    setPrimaryColor(defaultPrimary);
    setAccentColor(defaultAccent);
    applyTheme(defaultTheme, defaultPrimary, defaultAccent);
    
    localStorage.removeItem('userTheme');
    localStorage.removeItem('userPrimaryColor');
    localStorage.removeItem('userAccentColor');
  };

  if (!isOpen) return null;

  return (
    <div className="theme-settings-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="theme-settings-modal"
      >
        <div className="modal-header">
          <h3>Configurações de Tema</h3>
          <button onClick={onClose} className="close-button">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="modal-content">
          {/* Seleção de Tema */}
          <div className="setting-section">
            <h4>Modo de Exibição</h4>
            <div className="theme-options">
              <button
                onClick={() => handleThemeChange('light')}
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
              >
                <Sun className="w-5 h-5" />
                <span>Claro</span>
                {theme === 'light' && <Check className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => handleThemeChange('dark')}
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
              >
                <Moon className="w-5 h-5" />
                <span>Escuro</span>
                {theme === 'dark' && <Check className="w-4 h-4" />}
              </button>
              
              <button
                onClick={() => handleThemeChange('auto')}
                className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
              >
                <Monitor className="w-5 h-5" />
                <span>Automático</span>
                {theme === 'auto' && <Check className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Cor Primária */}
          <div className="setting-section">
            <h4>Cor Primária</h4>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handlePrimaryColorChange(color.value)}
                  className={`color-option ${primaryColor === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {primaryColor === color.value && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
            <div className="custom-color">
              <label>Cor personalizada:</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => handlePrimaryColorChange(e.target.value)}
                className="color-picker"
              />
            </div>
          </div>

          {/* Cor de Destaque */}
          <div className="setting-section">
            <h4>Cor de Destaque</h4>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleAccentColorChange(color.value)}
                  className={`color-option ${accentColor === color.value ? 'active' : ''}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  {accentColor === color.value && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
            <div className="custom-color">
              <label>Cor personalizada:</label>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => handleAccentColorChange(e.target.value)}
                className="color-picker"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="setting-section">
            <h4>Visualização</h4>
            <div className="theme-preview">
              <div className="preview-card">
                <div className="preview-header" style={{ backgroundColor: primaryColor }}>
                  <div className="preview-title">Exemplo de Card</div>
                </div>
                <div className="preview-content">
                  <p>Este é um exemplo de como ficará o tema.</p>
                  <button 
                    className="preview-button" 
                    style={{ backgroundColor: accentColor }}
                  >
                    Botão de Exemplo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleReset} className="reset-button">
            Restaurar Padrão
          </button>
          <div className="action-buttons">
            <button onClick={onClose} className="cancel-button">
              Cancelar
            </button>
            <button onClick={handleSave} className="save-button">
              Salvar Configurações
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSettings;

