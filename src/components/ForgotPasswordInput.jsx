import React, { useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5000/api";

function ForgotPasswordInput() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Mohon isi semua data!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Gagal mengubah password. Coba lagi.");
        return;
      }

      setSuccess("Password berhasil diubah. Silakan login kembali dengan password baru Anda.");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
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
      {success && (
        <div className="auth-success-msg" style={{ color: "green", backgroundColor: "rgba(0, 255, 0, 0.1)", padding: "10px", borderRadius: "8px", marginBottom: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
          ✅ {success}
        </div>
      )}

      <div className="input-group-auth">
        <input
          type="email"
          placeholder="Alamat Email Akun Anda"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password Baru (min. 6 karakter)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Ulangi Password Baru"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
          required
        />
      </div>

      <button type="submit" className="btn-primary btn-auth-submit" disabled={loading}>
        {loading ? "Memproses..." : "Ganti Password"}
      </button>

      <p className="form-links" style={{ marginTop: '15px' }}>
        <Link to="/login">Kembali ke Login</Link>
      </p>
    </form>
  );
}

export default ForgotPasswordInput;
