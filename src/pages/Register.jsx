import React from "react";
import RegisterInput from "../components/RegisterInput";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Register() {
  const { theme, toggleTheme } = useTheme();
  return (
    // Tambahkan class auth-page-container dan register-page (akan jadi biru)
    <div className="auth-page-container register-page">
      <Link to="/" className="auth-logo-top">
        MyJob<span>Trend</span>
      </Link>
      <button onClick={toggleTheme} className="theme-toggle-btn" style={{ position: 'absolute', top: '30px', right: '40px', color: 'var(--white)' }}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <div className="card">
        <h1>Buat Akun</h1>
        <p className="subtitle">Mulai perjalanan karier masa depan Anda</p>
        <RegisterInput />
      </div>
    </div>
  );
}

export default Register;