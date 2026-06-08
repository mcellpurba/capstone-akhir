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
          <a href="#">Beranda</a>
          <a href="#performa">Performa</a>
          <a href="#why-us">Why Us?</a>
          <a href="#testimoni">Testimoni</a>
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

      {/* Performa Section */}
      <section className="performance-section" id="performa" style={{ padding: '80px 20px', backgroundColor: 'var(--white)', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-block', backgroundColor: 'rgba(0, 98, 255, 0.1)', color: 'var(--primary-color)', padding: '6px 16px', borderRadius: '50px', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>
            Kinerja Terpercaya
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '15px' }}>
            Membantu Ribuan Kandidat Meraih Karier Impian
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Platform kami memberikan kemudahan dan analisis akurat untuk memastikan CV Anda siap bersaing di dunia kerja profesional.
          </p>
        </div>

        <div className="perf-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Stat 1 */}
          <div className="perf-card" style={{ background: 'var(--white)', padding: '35px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)', margin: '0 0 10px 0' }}>10,000+</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: '500' }}>CV Dianalisis</p>
          </div>

          {/* Stat 2 */}
          <div className="perf-card" style={{ background: 'var(--white)', padding: '35px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)', margin: '0 0 10px 0' }}>95%</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: '500' }}>Akurasi Prediksi</p>
          </div>

          {/* Stat 3 */}
          <div className="perf-card" style={{ background: 'var(--white)', padding: '35px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)', margin: '0 0 10px 0' }}>80%</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: '500' }}>Peningkatan Peluang</p>
          </div>

          {/* Stat 4 */}
          <div className="perf-card" style={{ background: 'var(--white)', padding: '35px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '48px', height: '48px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><line x1="9" y1="22" x2="15" y2="22"></line><line x1="9" y1="8" x2="9" y2="8.01"></line><line x1="15" y1="8" x2="15" y2="8.01"></line><line x1="9" y1="12" x2="9" y2="12.01"></line><line x1="15" y1="12" x2="15" y2="12.01"></line><line x1="9" y1="16" x2="9" y2="16.01"></line><line x1="15" y1="16" x2="15" y2="16.01"></line></svg>
            </div>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary-color)', margin: '0 0 10px 0' }}>500+</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0, fontWeight: '500' }}>Rekomendasi Pekerjaan</p>
          </div>

        </div>
      </section>

      {/* Why Us Section */}
      <section className="why-us-section" id="why-us" style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)' }}>
            Why Choose <span style={{ color: 'var(--primary-color)' }}>MyJobTrend</span>?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginTop: '10px' }}>
            Discover the powerful features that make MyJobTrend the leading AI-driven career platform.
          </p>
        </div>

        <div className="why-us-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Card 1 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Analisis Berbasis AI</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Manfaatkan teknologi canggih untuk menganalisis CV dan merekomendasikan keterampilan yang paling dibutuhkan oleh industri saat ini.</p>
          </div>

          {/* Card 2 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Penilaian Objektif</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Hilangkan bias dengan kriteria evaluasi berbasis data yang memastikan pencocokan yang adil antara profil Anda dan lowongan pekerjaan.</p>
          </div>

          {/* Card 3 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Hemat Waktu</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Kurangi waktu riset skill dengan panduan terarah, sehingga Anda dapat fokus meningkatkan kompetensi pada hal yang paling penting.</p>
          </div>

          {/* Card 4 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Laporan Detail</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Dapatkan wawasan komprehensif mengenai kekuatan dan area yang perlu ditingkatkan secara spesifik dari profil serta CV Anda.</p>
          </div>

          {/* Card 5 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Aman & Privat</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Sistem keamanan tingkat tinggi kami memastikan semua data profil dan informasi pekerjaan Anda tetap rahasia serta terlindungi.</p>
          </div>

          {/* Card 6 */}
          <div className="why-card" style={{ background: '#ffffff', padding: '30px', borderRadius: '16px', border: '1px solid #eaeaea', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div className="icon-wrapper" style={{ width: '50px', height: '50px', backgroundColor: 'rgba(0, 98, 255, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary-color)', marginBottom: '15px' }}>Feedback Real-time</h3>
            <p style={{ fontSize: '14px', color: '#1a1a1a', lineHeight: '1.6' }}>Terima rekomendasi skill dan insight yang dapat ditindaklanjuti secara instan segera setelah Anda mengunggah atau memperbarui CV.</p>
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimoni" style={{ padding: '80px 20px', backgroundColor: 'var(--bg-color)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Background Decorative Elements */}
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '150px', height: '150px', backgroundImage: 'radial-gradient(circle, #d1d5db 2px, transparent 2px)', backgroundSize: '20px 20px', opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', bottom: '5%', right: '2%', width: '200px', height: '200px', backgroundImage: 'radial-gradient(circle, #d1d5db 2px, transparent 2px)', backgroundSize: '20px 20px', opacity: 0.4 }}></div>
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: '15px', height: '15px', backgroundColor: '#6366f1', borderRadius: '50%', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', bottom: '20%', left: '10%', width: '15px', height: '15px', backgroundColor: '#fbbf24', borderRadius: '50%', opacity: 0.8 }}></div>
        <div style={{ position: 'absolute', top: '15%', left: '20%', width: '12px', height: '12px', backgroundColor: '#fbbf24', borderRadius: '50%', opacity: 0.6 }}></div>
        <div style={{ position: 'absolute', top: '0', left: '-5%', width: '400px', height: '400px', background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)', transform: 'rotate(-45deg)', borderRadius: '100px' }}></div>
        
        <div style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 1 }}>
          <h4 style={{ color: '#4b5563', fontSize: '14px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '10px' }}>Testimonials</h4>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--text-main)' }}>What People Say's About Us</h2>
        </div>

        <div className="testimonials-grid" style={{ display: 'flex', gap: '30px', justifyItems: 'center', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          
          {/* Card 1 */}
          <div className="testimonial-card" style={{ background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', flex: '1', minWidth: '300px', maxWidth: '360px', transition: 'transform 0.3s ease' }}>
            <div className="stars" style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '20px', letterSpacing: '2px' }}>
              ★★★★★
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px', minHeight: '80px' }}>
              MyJobTrend membantu saya memahami skill yang paling dibutuhkan industri saat ini. Setelah mengikuti rekomendasi yang diberikan, saya lebih percaya diri melamar pekerjaan yang sesuai dengan kemampuan saya.
            </p>
            <div className="author" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Charles Byrum" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>Charles Byrum</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Data Scientist</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="testimonial-card" style={{ background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', flex: '1', minWidth: '300px', maxWidth: '360px', transition: 'transform 0.3s ease' }}>
            <div className="stars" style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '20px', letterSpacing: '2px' }}>
              ★★★★★
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px', minHeight: '80px' }}>
              CV Analyzer memberikan insight yang sangat bermanfaat. Dalam hitungan detik saya bisa mengetahui kekuatan dan kekurangan CV saya sebelum melamar pekerjaan.
            </p>
            <div className="author" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="William Campisi" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>William Campisi</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>HRD</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="testimonial-card" style={{ background: 'var(--white)', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', flex: '1', minWidth: '300px', maxWidth: '360px', transition: 'transform 0.3s ease' }}>
            <div className="stars" style={{ color: '#fbbf24', fontSize: '20px', marginBottom: '20px', letterSpacing: '2px' }}>
              ★★★★★
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: '1.7', marginBottom: '30px', minHeight: '80px' }}>
              Analisis tren lowongan kerja yang ditampilkan sangat informatif. Saya dapat melihat teknologi dan keterampilan yang sedang banyak dicari oleh perusahaan.
            </p>
            <div className="author" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src="https://randomuser.me/api/portraits/men/46.jpg" alt="Michael Miller" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>Michael Miller</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#9ca3af', fontWeight: '500' }}>Senior Backend</p>
              </div>
            </div>
          </div>

        </div>
      </section>

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

      {/* Main Footer Section */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-col-1">
            <h2>
              <div className="footer-logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              MyJobTrend
            </h2>
            <p className="footer-desc">
              MyJobTrend — Platform navigasi karier cerdas dengan solusi berbasis AI untuk evaluasi kandidat yang objektif dan efisien.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              </a>
              <a href="#" className="footer-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="footer-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" className="footer-social-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>Produk</h3>
            <ul>
              <li><a href="#">Fitur</a></li>
              <li><a href="#">Harga</a></li>
              <li><a href="#">API</a></li>
              <li><a href="#">Integrasi</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Perusahaan</h3>
            <ul>
              <li><a href="#">Tentang Kami</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Karier</a></li>
              <li><a href="#">Kontak</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Sumber Daya</h3>
            <ul>
              <li><a href="#">Dokumentasi</a></li>
              <li><a href="#">Pusat Bantuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MyJobTrend. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;