import React from "react";
import RegisterInput from "../components/RegisterInput";
import { Link } from "react-router-dom";

function Register() {
  return (
    // Tambahkan class auth-page-container dan register-page (akan jadi biru)
    <div className="auth-page-container register-page">
      <Link to="/" className="auth-logo-top">
        MyJob<span>Trend</span>
      </Link>

      <div className="card">
        <h1>Buat Akun</h1>
        <p className="subtitle">Mulai perjalanan karier masa depan Anda</p>
        <RegisterInput />
      </div>
    </div>
  );
}

export default Register;