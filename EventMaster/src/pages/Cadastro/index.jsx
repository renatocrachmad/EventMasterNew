import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Eye, EyeOff, Facebook, Mail, User, Lock, Phone, ArrowLeft, Loader, UploadCloud } from "lucide-react";
import "./style.css";

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nome: "", email: "", senha: "", telefone: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tempUserData, setTempUserData] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.senha);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        type: "cliente", // padrão ao criar via formulário
        isProvider: false,
        createdAt: new Date()
      });

      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error.message);
      alert("Erro ao cadastrar: " + error.message);
    }

    setIsLoading(false);
  };

  const handleSocialSignup = async (providerName) => {
    const provider = providerName === "Google" ? googleProvider : facebookProvider;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Armazena os dados temporariamente até o usuário escolher tipo
      setTempUserData({
        uid: user.uid,
        name: user.displayName || "",
        email: user.email || "",
        profileImage: user.photoURL || ""
      });

      setModalVisible(true);
    } catch (error) {
      console.error("Erro no login social:", error.message);
      alert("Erro ao autenticar: " + error.message);
    }
  };

  const handleTipoSelecionado = async (tipo) => {
    try {
      const { uid, name, email, profileImage } = tempUserData;

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        profileImage,
        type: tipo,
        isProvider: tipo === "prestador",
        createdAt: new Date()
      }, { merge: true });

      setModalVisible(false);
      navigate("/"); // ou dashboard
    } catch (error) {
      console.error("Erro ao salvar tipo:", error.message);
      alert("Erro ao salvar tipo: " + error.message);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-container">
        <div className="cadastro-card">
          <div className="cadastro-header">
            <button className="back-button" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <h1>Criar Conta</h1>
            <p>Preencha seus dados para começar</p>
          </div>

          <form className="cadastro-form" onSubmit={handleCadastro}>
            <div className="input-group">
              <label>Nome</label>
              <div className="input-container">
                <User className="input-icon" />
                <input type="text" name="nome" value={formData.nome} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Email</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="input-group">
              <label>Telefone</label>
              <div className="input-container">
                <Phone className="input-icon" />
                <input type="tel" name="telefone" value={formData.telefone} onChange={handleInputChange} />
              </div>
            </div>

            <div className="input-group">
              <label>Senha</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  value={formData.senha}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="cadastro-button" type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="loading-spinner" /> : "Cadastrar"}
            </button>
          </form>

          <div className="divider"><span>ou cadastre-se com</span></div>

          <div className="social-buttons">
            <button className="social-button" onClick={() => handleSocialSignup("Google")}>
              <UploadCloud size={18} className="social-icon" /> Google
            </button>
            <button className="social-button" onClick={() => handleSocialSignup("Facebook")}>
              <Facebook size={18} className="social-icon" /> Facebook
            </button>
          </div>

          <div className="cadastro-footer">
            <p>Já tem uma conta? <button className="link-button" onClick={() => navigate("/login")}>Entrar</button></p>
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Escolha o tipo de conta</h2>
            <p>Você quer se cadastrar como:</p>
            <div className="modal-buttons">
              <button onClick={() => handleTipoSelecionado("cliente")}>Cliente</button>
              <button onClick={() => handleTipoSelecionado("prestador")}>Prestador</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
