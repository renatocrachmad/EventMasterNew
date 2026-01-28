import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
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
      navigate("/home");
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
      navigate("/home");
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
                <span className="social-icon">🔵</span> Google
              </button>
              <button className="social-button facebook" onClick={() => handleSocialLogin("Facebook")}>
                <span className="social-icon">🔷</span> Facebook
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
