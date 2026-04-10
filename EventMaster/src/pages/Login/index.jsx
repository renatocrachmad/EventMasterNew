import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Facebook } from "lucide-react";
import "./style.css";

import {
  auth,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "../../firebase/firebase";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para solicitar localização e navegar
  const requestLocationAndNavigate = () => {
    if (window.confirm("Deseja permitir que o EventMaster acesse sua localização para encontrar prestadores próximos?")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            localStorage.setItem("userCoords", JSON.stringify(coords));
            navigate("/home");
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
            navigate("/home");
          }
        );
      } else {
        navigate("/home");
      }
    } else {
      navigate("/home");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      if (lembrarSenha) {
        localStorage.setItem("usuarioLogado", user.email);
      }

      alert(`✅ Bem-vindo, ${user.email}`);
      requestLocationAndNavigate();
    } catch (error) {
      let message = "❌ Erro no login.";
      if (error.code === "auth/user-not-found") message = "Usuário não encontrado.";
      else if (error.code === "auth/wrong-password") message = "Senha incorreta.";
      else if (error.code === "auth/invalid-email") message = "E-mail inválido.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (providerName) => {
    const provider = providerName === "Google" ? googleProvider : facebookProvider;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("usuarioLogado", user.email);
      alert(`✅ Login com ${providerName}!`);
      requestLocationAndNavigate();
    } catch (error) {
      console.error("Erro no login social:", error);
      alert("Erro no login com " + providerName);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="login-card"
        >
          <div className="login-header">
            <button onClick={() => navigate("/")} className="back-button">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1>Entrar na sua conta</h1>
            <p>Bem-vindo de volta! Faça login para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">E-mail</label>
              <div className="input-container">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="senha">Senha</label>
              <div className="input-container">
                <Lock className="input-icon" />
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={lembrarSenha}
                  onChange={(e) => setLembrarSenha(e.target.checked)}
                />
                <span className="checkmark" />
                Lembrar de mim
              </label>
              <a href="#" className="forgot-password">Esqueceu a senha?</a>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? <div className="loading-spinner" /> : "Entrar"}
            </button>
          </form>

          <div className="social-login">
            <div className="divider"><span>ou continue com</span></div>
            <div className="social-buttons">
              <button className="social-button google" onClick={() => handleSocialLogin("Google")}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button className="social-button facebook" onClick={() => handleSocialLogin("Facebook")}>
                <Facebook className="w-5 h-5 mr-2 text-[#1877F2] fill-[#1877F2]" /> Facebook
              </button>
            </div>
          </div>

          <div className="login-footer">
            <p>
              Não tem uma conta?{" "}
              <button onClick={() => navigate("/cadastro")} className="link-button">
                Cadastre-se
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
