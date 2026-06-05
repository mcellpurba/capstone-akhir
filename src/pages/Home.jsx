import React from "react";
import gambar_home from "../assets/gambarkerja.jpg";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="home-wrapper">

      <nav className="navbar">

        <h1 className="navbar-logo">MyJob<span>Trend</span></h1>
        
        <div className="navbar-links">
          <a href="#">Syarat</a>
          <a href="#">Kontak</a>
          <a href="#">Pelayanan</a>
          <a href="#">Tentang Kami</a>
        </div>

        <div className="navbar-auth" style={{ alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-toggle-btn" style={{ marginRight: '10px' }} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <Link to="/login">
            <button className="btn-primary" style={{ padding: "10px 35px" }}>Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-outline" style={{ padding: "10px 35px" }}>Register</button>
          </Link>
        </div>
      </nav>


      <main className="hero-section">
        <div className="hero-content">

          <h1 className="hero-title">
            Upgrade <span>Skill</span>,<br />
            Raih Karier.
          </h1>
          <p className="hero-subtitle">
            Temukan skill yang paling dibutuhkan<br />
            dan tingkatkan peluang kerja Anda mulai sekarang.
          </p>
        </div>
        
        <div className="hero-image-container">
          <img src={gambar_home} alt="Ilustrasi Profesional Bekerja" className="gambar_home" />
        </div>
      </main>
    </div>
  );
}

export default Home;