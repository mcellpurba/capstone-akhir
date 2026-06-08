import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";
import { useTheme } from "../context/ThemeContext";

const CHATBOT_URL = "https://chatbot-capstone.streamlit.app/";

function Chatbot() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [userData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch {
        // ignore
      }
    }
    return { username: "Guest", email: "guest@email.com" };
  });

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "G";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="dash-container">
      {/* ── Sidebar ── */}
      <aside className="dash-sidebar">
        <div className="dash-logo">
          <div className="logo-icon">M</div>
          <div>
            <h2>MyJobTrend</h2>
            <p>Free Plan</p>
          </div>
        </div>

        <div className="dash-menu-group">
          <p className="menu-label">MAIN MENU</p>
          <Link to="/dashboard" className="menu-item">
            <span>🏠</span> Dashboard
          </Link>
          <Link to="/search" className="menu-item">
            <span>💼</span> Job Search
          </Link>
        </div>

        <div className="dash-menu-group">
          <p className="menu-label">Job Trend</p>
          <Link to="/prediction" className="menu-item">
            <span>⚙️</span> Job Prediction
          </Link>
          <Link to="/chatbot" className="menu-item active">
            <span>🤖</span> AI Chatbot
          </Link>
          <Link to="/profile" className="menu-item">
            <span>👤</span> Profile
          </Link>
          <button
            className="menu-item"
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              width: "100%",
              textAlign: "left",
              cursor: "pointer",
              color: "#ef4444",
              font: "inherit",
              marginTop: "auto",
            }}
          >
            <span>🚪</span> Keluar
          </button>
        </div>

        <div className="dash-user-profile">
          <div className="avatar">{getInitials(userData.username)}</div>
          <div className="user-info">
            <p className="name">{userData.username}</p>
            <p className="email">{userData.email}</p>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="dash-main">
        <header className="dash-header">
          <h1>🤖 AI Career Chatbot</h1>
          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme" style={{ marginRight: '10px' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <a
              href={CHATBOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-action"
            >
              <span>↗️</span> Buka di Tab Baru
            </a>
          </div>
        </header>

        {/* Info banner */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(177,78,255,0.15), rgba(74,144,226,0.15))",
            border: "1px solid rgba(177,78,255,0.3)",
            borderRadius: "12px",
            padding: "14px 20px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#c4b5fd",
            fontSize: "14px",
          }}
        >
          <span style={{ fontSize: "20px" }}>💡</span>
          <span>
            Tanyakan apa saja tentang karir, skill yang dibutuhkan, atau tren pekerjaan
            kepada AI Career Chatbot kami.
          </span>
        </div>

        {/* Iframe wrapper */}
        <div className="widget-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              position: "relative",
              borderRadius: "16px",
              overflow: "hidden",
              background: "#12131a",
              height: "calc(100vh - 220px)",
              minHeight: "500px",
            }}
          >
            {/* Loading spinner */}
            {!iframeLoaded && !iframeError && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "50%",
                    border: "4px solid #2a2b35",
                    borderTopColor: "#b14eff",
                    animation: "spin 0.9s linear infinite",
                  }}
                />
                <p style={{ color: "#a0a0a0", margin: 0, fontSize: "14px" }}>
                  Memuat AI Chatbot...
                </p>
              </div>
            )}

            {/* Fallback jika iframe diblokir */}
            {iframeError && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "linear-gradient(135deg, #12131a 0%, #1e1f2e 100%)",
                  gap: "20px",
                  zIndex: 0,
                  padding: "32px",
                }}
              >
                <div style={{ fontSize: "64px" }}>🤖</div>
                <h2 style={{ color: "#fff", margin: 0, textAlign: "center" }}>
                  AI Career Chatbot
                </h2>
                <p
                  style={{
                    color: "#a0a0a0",
                    textAlign: "center",
                    maxWidth: "380px",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  Chatbot tidak dapat ditampilkan langsung karena kebijakan
                  keamanan browser. Klik tombol di bawah untuk membukanya di tab
                  baru.
                </p>
                <a
                  href={CHATBOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "14px 32px",
                    background: "linear-gradient(135deg, #b14eff, #4a90e2)",
                    color: "#fff",
                    borderRadius: "12px",
                    fontWeight: 700,
                    fontSize: "16px",
                    textDecoration: "none",
                    boxShadow: "0 4px 24px rgba(177,78,255,0.45)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(177,78,255,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(177,78,255,0.45)";
                  }}
                >
                  🚀 Buka AI Chatbot
                </a>
              </div>
            )}

            {/* Iframe utama */}
            {theme === 'dark' ? (
              <iframe
                key="dark"
                src={`${CHATBOT_URL}?embed=true&embed_options=hide_toolbar,hide_padding,dark_theme`}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                  opacity: iframeLoaded ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
                title="AI Career Chatbot"
                allow="camera; microphone; fullscreen"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
              />
            ) : (
              <iframe
                key="light"
                src={`${CHATBOT_URL}?embed=true&embed_options=hide_toolbar,hide_padding,light_theme`}
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                  opacity: iframeLoaded ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
                title="AI Career Chatbot"
                allow="camera; microphone; fullscreen"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
              />
            )}
          </div>
        </div>
      </main>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default Chatbot;
