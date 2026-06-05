import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function LoginInput() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Mohon isi username dan password!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login gagal. Coba lagi.");
        return;
      }

      // Simpan token dan data user dari API
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
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
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button type="submit" className="btn-primary btn-auth-submit" disabled={loading}>
        {loading ? "Memuat..." : "Masuk"}
      </button>

      <div className="form-links" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "15px" }}>
        <div style={{ textAlign: "right" }}>
          <Link to="/forgot-password" style={{ fontSize: "0.9rem" }}>Lupa Password?</Link>
        </div>
        <p style={{ margin: 0 }}>
          Belum punya akun? <Link to="/register">Daftar Sekarang</Link>
        </p>
      </div>
    </form>
  );
}

export default LoginInput;