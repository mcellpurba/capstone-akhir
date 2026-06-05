import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function RegisterInput() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Mohon isi semua data!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registrasi gagal. Coba lagi.");
        return;
      }

      // Redirect ke halaman login setelah register berhasil
      alert("Registrasi berhasil! Silakan login dengan akun Anda.");
      navigate("/login");
    } catch {
      setError("Tidak dapat terhubung ke server. Pastikan backend berjalan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="auth-error-msg">
          ⚠️ {error}
        </div>
      )}

      <div className="input-group-auth">
        <input
          type="text"
          placeholder="Username Lengkap"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="email"
          placeholder="Alamat Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password (min. 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Ulangi Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button type="submit" className="btn-primary btn-auth-submit" disabled={loading}>
        {loading ? "Memuat..." : "Daftar"}
      </button>

      <p className="form-links">
        Sudah punya akun? <Link to="/login">Masuk</Link>
      </p>
    </form>
  );
}

export default RegisterInput;