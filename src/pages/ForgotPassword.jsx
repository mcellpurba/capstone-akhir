import React from "react";
import ForgotPasswordInput from "../components/ForgotPasswordInput";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function ForgotPassword() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="auth-page-container login-page">
      <Link to="/" className="auth-logo-top">
        MyJob<span>Trend</span>
      </Link>
      <button onClick={toggleTheme} className="theme-toggle-btn" style={{ position: 'absolute', top: '30px', right: '40px', color: 'var(--text-main)' }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="card">
        <h1>Lupa Password</h1>
        <p className="subtitle">Masukkan email Anda untuk mereset password</p>
        <ForgotPasswordInput />
      </div>
    </div>
  );
}

export default ForgotPassword;
