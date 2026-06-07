import React from "react";
import gambar_home from "../assets/polishingfoto.png";
import susanto_img from "../assets/susanto.png";
import bambang_img from "../assets/bambang.png";
import risky_img from "../assets/risky.png";
import haba_img from "../assets/Haba.png";
import marcel_img from "../assets/marcel.png";
import rangga_img from "../assets/rangga.png";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="home-wrapper">

      <nav className="navbar">

        <h1 className="navbar-logo">MyJob<span>Trend</span></h1>
        
        <div className="navbar-links">
          <a href="#">Pelayanan</a>
          <a href="#tentang-kami">Tentang Kami</a>
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

      {/* About Us Section */}
      <section className="about-section" id="tentang-kami">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px', fontSize: '36px', fontWeight: '800' }}>
          Tentang <span style={{ color: 'var(--primary-color)' }}>Kami</span>
        </h2>
        <div className="about-grid">
          
          {/* Card 1 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Susanto */}
              <img src={susanto_img} alt="Susanto" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Susanto</h3>
              <p className="member-role">AI Engineer</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/susanto-s-26b681221/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/m16no" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Bambang */}
              <img src={bambang_img} alt="Bambang" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Bambang</h3>
              <p className="member-role">AI Engineer</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/bambang-supriyadi-6a6b3a31a/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/dugong-pixie" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Risky */}
              <img src={risky_img} alt="Risky" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Rizky</h3>
              <p className="member-role">Data Scientist</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/muhammadrizkyramadhan-sanken/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/pezot" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Haba L */}
              <img src={haba_img} alt="Haba L" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Haba</h3>
              <p className="member-role">Data Scientist</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/haba-l-herlambang-banjarnahor-793524289/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/Bax12299" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Marcellino */}
              <img src={marcel_img} alt="Marcellino" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Marcellino</h3>
              <p className="member-role">Full-Stack Web Developer</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/marcellino-elrobson-purba-21945926b/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/mcellpurba" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="about-card">
            <div className="card-image-wrapper">
              {/* Tempat untuk gambar Rangga */}
              <img src={rangga_img} alt="Rangga" style={{ height: '200px', objectFit: 'cover' }} />
            </div>
            <div className="about-card-content">
              <h3 className="member-name">Rangga</h3>
              <p className="member-role">Full-Stack Web Developer</p>
              <div className="member-socials">
                <a href="https://www.linkedin.com/in/rangga-rizky-nugraha-b3a4123a6/" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
                <a href="https://github.com/RanggaRN123" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="#" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section" style={{ textAlign: 'center', padding: '20px', marginTop: '40px', borderTop: '1px solid var(--border-color, #eaeaea)' }}>
        <p style={{ color: 'var(--text-secondary, #666)', fontSize: '14px' }}>
          &copy; {new Date().getFullYear()} MyJobTrend. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;