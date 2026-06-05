import React from "react";
import LoginInput from "../components/LoginInput";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Login() {
  const { theme, toggleTheme } = useTheme();
  return (
    // Tambahkan class auth-page-container dan login-page
    <div className="auth-page-container login-page">
      <Link to="/" className="auth-logo-top">
        MyJob<span>Trend</span>
      </Link>
      <button onClick={toggleTheme} className="theme-toggle-btn" style={{ position: 'absolute', top: '30px', right: '40px', color: 'var(--text-main)' }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="card">
        <h1>Selamat Datang</h1>
        <p className="subtitle">Masuk untuk melihat tren skill terbaru</p>
        <LoginInput />
      </div>
    </div>
  );
}

export default Login;