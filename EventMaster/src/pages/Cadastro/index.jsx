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
import { Eye, EyeOff, Mail, User, Lock, Phone, ArrowLeft, Loader } from "lucide-react";
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

      // Armazena os dados temporariamente até o usuário escolher tipo
      setTempUserData({
        uid: user.uid,
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone, // Incluir telefone aqui para o cadastro por email/senha
        profileImage: "" // Não há imagem de perfil para cadastro por email/senha
      });
      setModalVisible(true);
      // A navegação ocorrerá após a seleção do tipo de conta no modal

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
        profileImage: user.photoURL || "",
        phone: "" // Telefone não vem do social login, será preenchido depois se necessário
      });

      setModalVisible(true);
    } catch (error) {
      console.error("Erro no login social:", error.message);
      alert("Erro ao autenticar: " + error.message);
    }
  };

  const handleTipoSelecionado = async (tipo) => {
    try {
      const { uid, name, email, profileImage, phone } = tempUserData;

      await setDoc(doc(db, "users", uid), {
        name,
        email,
        profileImage,
        phone: phone || '', // Garante que o telefone seja salvo, mesmo que vazio
        type: tipo,
        isProvider: tipo === "prestador",
        createdAt: new Date()
      }, { merge: true });

      setModalVisible(false);
      navigate("/login"); // Redireciona para a tela de login após o cadastro
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
              <svg className="social-icon" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg> Google
            </button>
            <button className="social-button" onClick={() => handleSocialSignup("Facebook")}>
              <svg className="social-icon" width="18" height="18" viewBox="0 0 48 48">
                <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.231V29.036z" />
              </svg> Facebook
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
