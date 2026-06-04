import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/style.css";

function JobPrediction() {
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  const [userData] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : { username: "Guest", email: "guest@email.com" };
    } catch {
      return { username: "Guest", email: "guest@email.com" };
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "G";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="dash-container">
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
          <Link to="/prediction" className="menu-item active">
            <span>⚙️</span> Job Prediction
          </Link>
          <Link to="/chatbot" className="menu-item"><span>🤖</span> AI Chatbot</Link>
          <Link to="/profile" className="menu-item">
            <span>👤</span> Profile
          </Link>
          <button
            className="menu-item"
            onClick={handleLogout}
            style={{
              background: "none", border: "none", width: "100%",
              textAlign: "left", cursor: "pointer", color: "#ef4444",
              font: "inherit", marginTop: "auto",
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

      <main className="dash-main">
        <header className="dash-header">
          <h1>Job Skill Prediction</h1>
          <div className="header-actions">
            <button className="btn-action">
              <span>🤖</span> AI Career Assistant
            </button>
          </div>
        </header>



        {/* Streamlit Prediction App */}
        <div className="widget-card" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column' }}>
          <div className="widget-header">
            <h3>🤖 Skill Prediction App (Streamlit)</h3>
          </div>
          <div style={{ position: 'relative', marginTop: '16px', borderRadius: '12px', overflow: 'hidden', background: '#12131a', height: '800px' }}>

            {/* Loading spinner */}
            {!iframeLoaded && !iframeError && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '16px', zIndex: 0,
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '4px solid #2a2b35', borderTopColor: '#b14eff',
                  animation: 'spin 0.9s linear infinite',
                }} />
                <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>Memuat Skill Prediction...</p>
              </div>
            )}

            {/* Fallback jika diblokir */}
            {iframeError && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #12131a 0%, #1e1f2e 100%)',
                gap: '16px', zIndex: 0,
              }}>
                <div style={{ fontSize: '48px' }}>🤖</div>
                <h3 style={{ color: '#fff', margin: 0 }}>Skill Prediction App</h3>
                <p style={{ color: '#a0a0a0', textAlign: 'center', maxWidth: '320px', margin: 0 }}>
                  Aplikasi tidak dapat ditampilkan langsung. Klik tombol di bawah untuk membukanya.
                </p>
                <a
                  href="https://predictskillcapstone-w88pdmefqtiiollyqchwz9.streamlit.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 28px',
                    background: 'linear-gradient(135deg, #b14eff, #4a90e2)',
                    color: '#fff', borderRadius: '10px', fontWeight: 700,
                    fontSize: '15px', textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(177,78,255,0.4)',
                  }}
                >
                  🚀 Buka Skill Prediction
                </a>
              </div>
            )}

            {/* Iframe utama */}
            <iframe
              src="https://predictskillcapstone-w88pdmefqtiiollyqchwz9.streamlit.app/?embed=true&embed_options=hide_toolbar,hide_padding"
              width="100%"
              height="100%"
              style={{
                border: 'none',
                display: 'block',
                position: 'relative',
                zIndex: 1,
                opacity: iframeLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }}
              title="Streamlit Skill Prediction"
              allow="camera; microphone; fullscreen"
              onLoad={() => setIframeLoaded(true)}
              onError={() => setIframeError(true)}
            />
          </div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    </div>
  );
}

export default JobPrediction;
