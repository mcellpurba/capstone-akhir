import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts";
import "../styles/style.css";

const skillRadarData = [
  { subject: "React/JS", user: 80, industry: 90, fullMark: 100 },
  { subject: "Python", user: 65, industry: 85, fullMark: 100 },
  { subject: "Deep Learning", user: 40, industry: 75, fullMark: 100 },
  { subject: "Data Analysis", user: 60, industry: 70, fullMark: 100 },
  { subject: "UI/UX", user: 85, industry: 60, fullMark: 100 },
  { subject: "SQL", user: 75, industry: 80, fullMark: 100 },
];

const progressData = [
  { day: "Sen", jam: 2 },
  { day: "Sel", jam: 4 },
  { day: "Rab", jam: 3 },
  { day: "Kam", jam: 6 },
  { day: "Jum", jam: 5 },
  { day: "Sab", jam: 8 },
  { day: "Min", jam: 2 },
];

const CV_ANALYZER_FRONTEND = "https://dealer-maximize-paragraph-municipality.trycloudflare.com/";

function Dashboard() {
  const navigate = useNavigate();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // CV Analyzer states
  const [showCvModal, setShowCvModal] = useState(false);
  const [cvModalTab, setCvModalTab] = useState("upload"); // 'upload' | 'iframe'
  const [cvFile, setCvFile] = useState(null);
  const [cvAnalyzing, setCvAnalyzing] = useState(false);
  const [cvResult, setCvResult] = useState(null);
  const [cvError, setCvError] = useState("");
  const [iframeAnalyzerLoaded, setIframeAnalyzerLoaded] = useState(false);
  const [flaskApiUrl, setFlaskApiUrl] = useState(
    () => localStorage.getItem("cvApiUrl") || "https://soft-thrush-everywhere.trycloudflare.com"
  );
  const [showApiUrlInput, setShowApiUrlInput] = useState(false);
  const fileInputRef = useRef(null);

  // State untuk menyimpan data user dari login/register
  const [userData] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
    return {
      username: "Guest",
      email: "guest@email.com",
    };
  });

  const userCvKey = `cvMatchScore_${userData.email || "guest"}`;

  // Job Market Fit — baca dari localStorage spesifik untuk user yang sedang login
  const [matchScore, setMatchScore] = useState(() => {
    const saved = localStorage.getItem(userCvKey);
    return saved ? JSON.parse(saved) : { score: null, have: [], gap: [], bonus: [] };
  });

  // Modal detail Skill Gap Summary
  const [showSkillDetail, setShowSkillDetail] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // Tidak menghapus cvMatchScore di sini agar historinya tetap ada jika login lagi dengan akun yang sama
    navigate("/login");
  };

  const handleOpenCvModal = () => {
    setShowCvModal(true);
    setCvModalTab("upload");
    setCvFile(null);
    setCvResult(null);
    setCvError("");
    setIframeAnalyzerLoaded(false);
    setShowApiUrlInput(false);
  };

  const handleCloseModal = () => setShowCvModal(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCvFile(file);
      setCvError("");
      setCvResult(null);
    } else {
      setCvError("Hanya file PDF yang didukung.");
      setCvFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!cvFile) { setCvError("Pilih file CV terlebih dahulu."); return; }
    setCvAnalyzing(true);
    setCvError("");
    setCvResult(null);

    const formData = new FormData();
    formData.append("file", cvFile);

    try {
      const endpoint = `${flaskApiUrl.replace(/\/$/, "")}/analyze`;
      const res = await fetch(endpoint, { method: "POST", body: formData });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data = await res.json();
      console.log("CV API Response:", data);

      // Normalisasi — tangkap berbagai kemungkinan nama field dari Flask API
      let rawScore =
        data.match_rate ?? data.match_score ?? data.score ?? data.fit_score ??
        data.matchScore ?? data.percentage ?? data.skor ?? 
        data["Match Score"] ?? data["Match_Score"] ?? data.MatchScore ?? null;
      
      // Jika ternyata score ada di object dalam, misal data.result.score
      if (rawScore === null && data.result) {
        rawScore = data.result.match_rate ?? data.result.match_score ?? data.result.score ?? data.result.percentage ?? null;
      }

      // Pastikan score menjadi angka (menghapus '%' jika ada dan membulatkan float)
      let score = null;
      if (rawScore !== null) {
        const parsed = parseFloat(String(rawScore).replace(/[^0-9.]/g, ''));
        score = isNaN(parsed) ? null : Math.round(parsed);
      }

      const have  = data.matched ?? data.have  ?? data.dimiliki ?? data.skills_matched ?? [];
      const gap   = data.gap     ?? data.skills_gap ?? data.missing ?? [];
      const bonus = data.bonus   ?? data.bonus_skills ?? data.extra ?? [];

      const result = { score: isNaN(score) ? null : score, have, gap, bonus, raw: data };
      setCvResult(result);
      // Otomatis simpan ke dashboard sesuai akun user
      localStorage.setItem(userCvKey, JSON.stringify(result));
      setMatchScore(result);
    } catch (err) {
      const isCors = err.message.includes("Failed to fetch") || err.message.includes("NetworkError");
      if (isCors) {
        setCvError("Tidak bisa terhubung ke Flask API. Pastikan server aktif dan URL-nya benar. Klik ⚙️ untuk ubah URL.");
      } else {
        setCvError(`Error: ${err.message}`);
      }
    } finally {
      setCvAnalyzing(false);
    }
  };

  const handleSaveApiUrl = (url) => {
    setFlaskApiUrl(url);
    localStorage.setItem("cvApiUrl", url);
  };



  // Fungsi untuk mengambil maksimal 2 huruf pertama dari nama untuk Avatar
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "G";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
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
          <Link to="/dashboard" className="menu-item active">
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
          <Link to="/chatbot" className="menu-item">
            <span>🤖</span> AI Chatbot
          </Link>
          <Link to="/profile" className="menu-item">
            <span>👤</span> Profile
          </Link>
          <button className="menu-item" onClick={handleLogout} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer', color: '#ef4444', font: 'inherit', marginTop: 'auto' }}>
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
          <h1>Welcome, {userData.username.split(" ")[0]}</h1>
          <div className="header-actions">
            <button className="btn-action">
              <span>🤖</span> AI Career Assistant
            </button>
            <button className="btn-action" onClick={handleOpenCvModal}>
              <span>📥</span> Import CV
            </button>
          </div>
        </header>

        {/* ══ CV Analyzer Modal ══ */}
        {showCvModal && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }} onClick={handleCloseModal}>
            <div style={{
              background: '#13141f', borderRadius: '20px',
              width: '100%', maxWidth: '680px',
              position: 'relative', display: 'flex', flexDirection: 'column',
              border: '1px solid rgba(177,78,255,0.3)',
              boxShadow: '0 24px 80px rgba(177,78,255,0.2)',
              maxHeight: '90vh', overflow: 'hidden'
            }} onClick={e => e.stopPropagation()}>

              {/* Header */}
              <div style={{ padding: '20px 24px 16px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '24px' }}>📄</span>
                    <div>
                      <h2 style={{ color: '#fff', margin: 0, fontSize: '18px' }}>CV Analyzer</h2>
                      <p style={{ color: '#6b7280', margin: 0, fontSize: '12px' }}>Hasil analisis otomatis tersimpan ke dashboard</p>
                    </div>
                  </div>
                  <button onClick={handleCloseModal} style={{
                    background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%',
                    width: '32px', height: '32px', cursor: 'pointer', color: '#9ca3af', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>✕</button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '4px', marginTop: '14px' }}>
                  {[
                    { key: 'upload', label: '🔍 Upload & Analisis' },
                    { key: 'iframe', label: '💻 Buka CV Analyzer' }
                  ].map(tab => (
                    <button key={tab.key} onClick={() => setCvModalTab(tab.key)} style={{
                      flex: 1, padding: '8px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                      background: cvModalTab === tab.key ? 'linear-gradient(135deg, #b14eff, #4a90e2)' : 'transparent',
                      color: cvModalTab === tab.key ? '#fff' : '#6b7280',
                      fontWeight: cvModalTab === tab.key ? 700 : 400, fontSize: '13px', transition: 'all 0.2s'
                    }}>{tab.label}</button>
                  ))}
                </div>
              </div>

              {/* ── Tab: Upload & Analisis ── */}
              {cvModalTab === 'upload' && (
                <div style={{ padding: '20px 24px 24px', overflowY: 'auto' }}>

                  {/* API URL setting */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: '#6b7280', fontSize: '12px' }}>Flask API: <span style={{ color: '#a0a0a0' }}>{flaskApiUrl}</span></span>
                      <button onClick={() => setShowApiUrlInput(v => !v)} style={{
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '6px', padding: '3px 10px', color: '#9ca3af', fontSize: '11px', cursor: 'pointer'
                      }}>⚙️ Ubah URL</button>
                    </div>
                    {showApiUrlInput && (
                      <input
                        type="text"
                        defaultValue={flaskApiUrl}
                        onBlur={e => handleSaveApiUrl(e.target.value)}
                        placeholder="https://your-flask-api.trycloudflare.com"
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '8px', boxSizing: 'border-box',
                          background: '#1e1f2e', border: '1px solid rgba(177,78,255,0.3)',
                          color: '#fff', fontSize: '13px', outline: 'none'
                        }}
                      />
                    )}
                  </div>

                  {/* Upload area */}
                  {!cvResult && (
                    <div
                      style={{
                        border: `2px dashed ${cvFile ? '#10b981' : 'rgba(177,78,255,0.5)'}`,
                        borderRadius: '14px', padding: '36px 24px', textAlign: 'center',
                        cursor: 'pointer', marginBottom: '16px',
                        background: cvFile ? 'rgba(16,185,129,0.06)' : 'rgba(177,78,255,0.04)',
                        transition: 'all 0.2s'
                      }}
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => {
                        e.preventDefault();
                        const f = e.dataTransfer.files[0];
                        if (f) handleFileChange({ target: { files: [f] } });
                      }}
                    >
                      <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileChange} />
                      {cvFile ? (
                        <>
                          <div style={{ fontSize: '36px', marginBottom: '8px' }}>✅</div>
                          <p style={{ color: '#10b981', fontWeight: 700, margin: '0 0 4px', fontSize: '15px' }}>{cvFile.name}</p>
                          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>{(cvFile.size / 1024).toFixed(1)} KB — Klik untuk ganti file</p>
                        </>
                      ) : (
                        <>
                          <div style={{ fontSize: '36px', marginBottom: '8px' }}>📂</div>
                          <p style={{ color: '#c4b5fd', fontWeight: 600, margin: '0 0 4px' }}>Drag & drop atau klik untuk upload</p>
                          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>Format: PDF • Maks. 10MB</p>
                        </>
                      )}
                    </div>
                  )}

                  {/* Error */}
                  {cvError && (
                    <div style={{
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                      borderRadius: '10px', padding: '12px 16px', marginBottom: '16px',
                      color: '#fca5a5', fontSize: '13px', lineHeight: '1.5'
                    }}>
                      ⚠️ {cvError}
                    </div>
                  )}

                  {/* Hasil otomatis */}
                  {cvResult && (
                    <div style={{ marginBottom: '16px' }}>
                      {/* Score badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', padding: '16px', background: 'rgba(177,78,255,0.08)', borderRadius: '14px', border: '1px solid rgba(177,78,255,0.2)' }}>
                        <div style={{
                          width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, rgba(177,78,255,0.35), rgba(74,144,226,0.35))',
                          border: '2px solid rgba(177,78,255,0.5)',
                          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <span style={{ color: '#b14eff', fontWeight: 800, fontSize: '22px', lineHeight: 1 }}>{cvResult.score ?? '—'}%</span>
                          <span style={{ color: '#a0a0a0', fontSize: '10px' }}>Match</span>
                        </div>
                        <div>
                          <p style={{ color: '#10b981', fontWeight: 700, margin: '0 0 4px', fontSize: '14px' }}>✅ Tersimpan ke dashboard!</p>
                          <p style={{ color: '#a0a0a0', margin: 0, fontSize: '12px' }}>Skor {cvResult.score ?? 'N/A'}% telah diperbarui di widget Job Market Fit</p>
                        </div>
                      </div>

                      {/* Skill breakdown */}
                      {[
                        { label: '✅ Sudah Kamu Miliki', items: cvResult.have,  color: '#10b981' },
                        { label: '⚠️ Gap — Perlu Dipelajari', items: cvResult.gap, color: '#f59e0b' },
                        { label: '🎁 Bonus Skill', items: cvResult.bonus, color: '#b14eff' },
                      ].filter(g => g.items && g.items.length > 0).map(group => (
                        <div key={group.label} style={{ marginBottom: '12px' }}>
                          <p style={{ color: group.color, fontSize: '13px', fontWeight: 600, margin: '0 0 7px' }}>{group.label}</p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {group.items.map((s, i) => (
                              <span key={i} style={{
                                background: `${group.color}18`, color: group.color,
                                borderRadius: '20px', padding: '4px 12px', fontSize: '12px', fontWeight: 500
                              }}>{s}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!cvResult ? (
                      <button
                        onClick={handleAnalyze}
                        disabled={!cvFile || cvAnalyzing}
                        style={{
                          flex: 1, padding: '13px', borderRadius: '12px', border: 'none',
                          cursor: cvFile && !cvAnalyzing ? 'pointer' : 'not-allowed',
                          background: cvFile ? 'linear-gradient(135deg, #b14eff, #4a90e2)' : '#2a2b35',
                          color: '#fff', fontWeight: 700, fontSize: '15px',
                          boxShadow: cvFile ? '0 4px 20px rgba(177,78,255,0.35)' : 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        {cvAnalyzing ? (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                            <span style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                            Menganalisis CV...
                          </span>
                        ) : '🔍 Analisis CV Otomatis'}
                      </button>
                    ) : (
                      <>
                        <button onClick={() => { setCvResult(null); setCvFile(null); setCvError(''); }}
                          style={{ flex: 1, padding: '13px', borderRadius: '12px', border: '1px solid rgba(177,78,255,0.4)', background: 'transparent', color: '#c4b5fd', fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
                          🔄 Analisis Ulang
                        </button>
                        <button onClick={handleCloseModal}
                          style={{ flex: 1, padding: '13px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff', fontWeight: 700, fontSize: '14px', cursor: 'pointer' }}>
                          ✓ Selesai
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* ── Tab: Iframe CV Analyzer ── */}
              {cvModalTab === 'iframe' && (
                <div style={{ flex: 1, position: 'relative', margin: '16px', borderRadius: '12px', overflow: 'hidden', background: '#fff', minHeight: '500px' }}>
                  {!iframeAnalyzerLoaded && (
                    <div style={{
                      position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '12px',
                      background: '#13141f', zIndex: 1
                    }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #2a2b35', borderTopColor: '#b14eff', animation: 'spin 0.8s linear infinite' }} />
                      <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>Memuat CV Analyzer...</p>
                    </div>
                  )}
                  <iframe
                    src={CV_ANALYZER_FRONTEND}
                    width="100%" height="100%"
                    style={{ border: 'none', display: 'block', minHeight: '500px' }}
                    title="CV Analyzer"
                    onLoad={() => setIframeAnalyzerLoaded(true)}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="dash-widgets-top">

          <div className="widget-card">
            <div className="widget-header">
              <h3>Skill Analysis (Radar)</h3>
              <span className="icon-btn">🎯</span>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  data={skillRadarData}
                >
                  <PolarGrid stroke="#444" />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#a0a0a0", fontSize: 10 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="User Skill"
                    dataKey="user"
                    stroke="#b14eff"
                    fill="#b14eff"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Industry Avg"
                    dataKey="industry"
                    stroke="#4a90e2"
                    fill="#4a90e2"
                    fillOpacity={0.3}
                  />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1a1b1e",
                      borderColor: "#333",
                      color: "#fff",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                    labelStyle={{ color: "#a0a0a0" }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="chart-legend">
              <span className="legend-item">
                <span className="dot purple"></span>Your Skill
              </span>
              <span className="legend-item">
                <span className="dot blue"></span>Industry Avg
              </span>
            </div>
          </div>

          <div className="widget-card" style={{ cursor: 'pointer' }} onClick={handleOpenCvModal}>
            <div className="widget-header">
              <h3>Job Market Fit</h3>
              <span className="icon-btn">📊</span>
            </div>
            <div className="fit-stats">
              <div className="stat-circle" style={matchScore.score !== null ? { background: 'linear-gradient(135deg, rgba(177,78,255,0.25), rgba(74,144,226,0.25))', borderColor: 'rgba(177,78,255,0.5)' } : {}}>
                <h2 style={{ color: matchScore.score !== null ? '#b14eff' : undefined }}>
                  {matchScore.score !== null ? `${matchScore.score}%` : '—'}
                </h2>
                <p>Match Score</p>
              </div>
              <div className="stat-details">
                {matchScore.score !== null ? (
                  <>
                    <p style={{ color: '#10b981', fontWeight: 600, fontSize: '13px', margin: '0 0 6px' }}>✅ Dari hasil CV kamu</p>
                    {matchScore.gap && matchScore.gap.length > 0 && (
                      <p style={{ color: '#a0a0a0', fontSize: '12px', margin: 0 }}>
                        ⚠️ {matchScore.gap.length} skill perlu ditingkatkan
                      </p>
                    )}
                    <p style={{ color: '#6b7280', fontSize: '11px', margin: '6px 0 0' }}>Klik untuk analisis ulang</p>
                  </>
                ) : (
                  <>
                    <p style={{ color: '#a0a0a0', fontSize: '13px', margin: '0 0 6px' }}>Belum ada data CV</p>
                    <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>📥 Klik untuk import & analisis CV kamu</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="widget-card">
            <div className="widget-header">
              <h3>Skill Gap Summary</h3>
              <span className="icon-btn">🧩</span>
            </div>
            {matchScore.score !== null ? (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
                  {[
                    { label: 'Matched', count: matchScore.have?.length ?? 0, color: '#10b981', bg: 'rgba(16,185,129,0.12)', icon: '✅' },
                    { label: 'Gap (Perlu Dipelajari)', count: matchScore.gap?.length ?? 0, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', icon: '⚠️' },
                    { label: 'Bonus Skill', count: matchScore.bonus?.length ?? 0, color: '#b14eff', bg: 'rgba(177,78,255,0.12)', icon: '🎁' },
                  ].map(item => (
                    <div key={item.label} style={{ background: item.bg, borderRadius: '10px', padding: '10px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ color: item.color, fontSize: '12px', fontWeight: 600 }}>{item.icon} {item.label}</span>
                        <span style={{ color: item.color, fontWeight: 800, fontSize: '14px' }}>{item.count}</span>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '99px', height: '6px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.min(100, (item.count / Math.max(1, (matchScore.have?.length ?? 0) + (matchScore.gap?.length ?? 0) + (matchScore.bonus?.length ?? 0))) * 100)}%`,
                          height: '100%', borderRadius: '99px',
                          background: item.color, transition: 'width 0.6s ease'
                        }} />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowSkillDetail(true)}
                  style={{
                    marginTop: '12px', width: '100%', padding: '9px',
                    borderRadius: '10px', border: '1px solid rgba(177,78,255,0.35)',
                    background: 'rgba(177,78,255,0.07)', color: '#c4b5fd',
                    fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(177,78,255,0.18)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(177,78,255,0.07)'}
                >
                  🔍 Lihat Detail Skill
                </button>
              </>
            ) : (
              <div
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', gap: '8px', cursor: 'pointer' }}
                onClick={handleOpenCvModal}
              >
                <span style={{ fontSize: '36px' }}>🧩</span>
                <p style={{ color: '#a0a0a0', fontSize: '13px', margin: 0, textAlign: 'center' }}>Belum ada data analisis CV</p>
                <p style={{ color: '#6b7280', fontSize: '11px', margin: 0 }}>📥 Klik untuk upload CV</p>
              </div>
            )}
          </div>

          {/* ══ Skill Gap Detail Modal ══ */}
          {showSkillDetail && (
            <div style={{
              position: 'fixed', inset: 0, zIndex: 1100,
              background: 'rgba(0,0,0,0.80)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
            }} onClick={() => setShowSkillDetail(false)}>
              <div style={{
                background: '#13141f', borderRadius: '20px',
                width: '100%', maxWidth: '600px', maxHeight: '85vh',
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
                border: '1px solid rgba(177,78,255,0.3)',
                boxShadow: '0 24px 80px rgba(177,78,255,0.25)'
              }} onClick={e => e.stopPropagation()}>

                {/* Modal Header */}
                <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '22px' }}>🧩</span>
                      <div>
                        <h2 style={{ color: '#fff', margin: 0, fontSize: '17px' }}>Detail Skill Gap</h2>
                        <p style={{ color: '#6b7280', margin: 0, fontSize: '12px' }}>Berdasarkan hasil analisis CV terakhir</p>
                      </div>
                    </div>
                    <button onClick={() => setShowSkillDetail(false)} style={{
                      background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '50%',
                      width: '32px', height: '32px', cursor: 'pointer', color: '#9ca3af',
                      fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>✕</button>
                  </div>
                </div>

                {/* Modal Body */}
                <div style={{ overflowY: 'auto', padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: '✅ Sudah Kamu Miliki (Matched)', items: matchScore.have ?? [], color: '#10b981', bg: 'rgba(16,185,129,0.10)', border: 'rgba(16,185,129,0.25)' },
                    { label: '⚠️ Gap — Perlu Dipelajari', items: matchScore.gap ?? [], color: '#f59e0b', bg: 'rgba(245,158,11,0.10)', border: 'rgba(245,158,11,0.25)' },
                    { label: '🎁 Bonus Skill (Nilai Lebih)', items: matchScore.bonus ?? [], color: '#b14eff', bg: 'rgba(177,78,255,0.10)', border: 'rgba(177,78,255,0.25)' },
                  ].map(group => (
                    <div key={group.label}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <p style={{ color: group.color, fontSize: '13px', fontWeight: 700, margin: 0 }}>{group.label}</p>
                        <span style={{
                          background: group.bg, border: `1px solid ${group.border}`,
                          color: group.color, borderRadius: '99px', padding: '2px 10px',
                          fontSize: '11px', fontWeight: 700
                        }}>{group.items.length} skill</span>
                      </div>
                      {group.items.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {group.items.map((skill, i) => (
                            <span key={i} style={{
                              background: group.bg, border: `1px solid ${group.border}`,
                              color: group.color, borderRadius: '20px',
                              padding: '5px 14px', fontSize: '12px', fontWeight: 600,
                              textTransform: 'capitalize'
                            }}>{skill}</span>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: '#4b5563', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>Tidak ada data</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Modal Footer */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.07)', flexShrink: 0, display: 'flex', gap: '10px' }}>
                  <button onClick={handleOpenCvModal} style={{
                    flex: 1, padding: '10px', borderRadius: '10px',
                    border: '1px solid rgba(177,78,255,0.4)', background: 'transparent',
                    color: '#c4b5fd', fontWeight: 600, fontSize: '13px', cursor: 'pointer'
                  }}>🔄 Analisis Ulang</button>
                  <button onClick={() => setShowSkillDetail(false)} style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #b14eff, #4a90e2)',
                    color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer'
                  }}>✓ Tutup</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="dash-widgets-bottom">
          <div className="widget-card span-2">
            <div className="widget-header">
              <h3>🎯 Skill Improvement Plan</h3>
              {matchScore.score !== null && (
                <span style={{
                  background: 'rgba(177,78,255,0.15)', border: '1px solid rgba(177,78,255,0.3)',
                  color: '#c4b5fd', borderRadius: '99px', padding: '3px 12px', fontSize: '11px', fontWeight: 700
                }}>Dari hasil analisis CV</span>
              )}
            </div>

            {matchScore.score !== null ? (() => {
              const allGaps = matchScore.gap ?? [];
              const checkedKey = `skillChecked_${userData.email || 'guest'}`;
              const checked = JSON.parse(localStorage.getItem(checkedKey) || '[]');
              const doneCount = allGaps.filter(s => checked.includes(s)).length;

              const toggleCheck = (skill) => {
                const current = JSON.parse(localStorage.getItem(checkedKey) || '[]');
                const updated = current.includes(skill)
                  ? current.filter(s => s !== skill)
                  : [...current, skill];
                localStorage.setItem(checkedKey, JSON.stringify(updated));
                setMatchScore(prev => ({ ...prev }));
              };

              return (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <p style={{ color: '#a0a0a0', fontSize: '13px', margin: 0 }}>{doneCount}/{allGaps.length} skill telah dipelajari</p>
                    <span style={{ color: doneCount === allGaps.length && allGaps.length > 0 ? '#10b981' : '#f59e0b', fontWeight: 700, fontSize: '13px' }}>
                      {allGaps.length > 0 ? `${Math.round((doneCount / allGaps.length) * 100)}%` : '—'}
                    </span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '99px', height: '6px', marginBottom: '18px', overflow: 'hidden' }}>
                    <div style={{ width: allGaps.length > 0 ? `${Math.round((doneCount / allGaps.length) * 100)}%` : '0%', height: '100%', borderRadius: '99px', background: 'linear-gradient(90deg, #f59e0b, #10b981)', transition: 'width 0.5s ease' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: '12px', margin: '0 0 10px', letterSpacing: '0.05em' }}>⚠️ PERLU DIPELAJARI</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {allGaps.filter(s => !checked.includes(s)).length === 0
                          ? <p style={{ color: '#4b5563', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>Semua skill sudah dipelajari! 🎉</p>
                          : allGaps.filter(s => !checked.includes(s)).map((skill, i) => (
                            <div key={i} onClick={() => toggleCheck(skill)}
                              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(245,158,11,0.08)', borderRadius: '10px', padding: '9px 14px', cursor: 'pointer', border: '1px solid rgba(245,158,11,0.2)', transition: 'all 0.15s' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.16)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.08)'}
                            >
                              <div style={{ width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, border: '2px solid #f59e0b' }} />
                              <span style={{ color: '#fde68a', fontSize: '13px', fontWeight: 600, textTransform: 'capitalize' }}>{skill}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div>
                      <p style={{ color: '#10b981', fontWeight: 700, fontSize: '12px', margin: '0 0 10px', letterSpacing: '0.05em' }}>✅ SUDAH DIPELAJARI</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {allGaps.filter(s => checked.includes(s)).length === 0
                          ? <p style={{ color: '#4b5563', fontSize: '12px', fontStyle: 'italic', margin: 0 }}>Belum ada yang selesai</p>
                          : allGaps.filter(s => checked.includes(s)).map((skill, i) => (
                            <div key={i} onClick={() => toggleCheck(skill)}
                              style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', padding: '9px 14px', cursor: 'pointer', border: '1px solid rgba(16,185,129,0.2)', transition: 'all 0.15s' }}
                              onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.16)'}
                              onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}
                            >
                              <div style={{ width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0, border: '2px solid #10b981', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#fff', fontSize: '11px', fontWeight: 900 }}>✓</span>
                              </div>
                              <span style={{ color: '#6ee7b7', fontSize: '13px', fontWeight: 600, textDecoration: 'line-through', textTransform: 'capitalize' }}>{skill}</span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              );
            })() : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', gap: '12px' }}>
                <span style={{ fontSize: '48px' }}>🎯</span>
                <p style={{ color: '#a0a0a0', fontSize: '14px', margin: 0, textAlign: 'center' }}>Upload CV terlebih dahulu untuk mendapatkan<br />rencana peningkatan skill yang personal</p>
                <button onClick={handleOpenCvModal} style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #b14eff, #4a90e2)', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(177,78,255,0.3)' }}>📥 Import CV Sekarang</button>
              </div>
            )}
          </div>

          <div className="widget-card">
            <div className="widget-header">
              <h3>Recommended Courses</h3>
              <span className="badge">{(matchScore.gap ?? []).length > 0 ? `${Math.min((matchScore.gap ?? []).length, 5)} Skill` : '3 Kelas'}</span>
            </div>
            <div className="course-list">
              {(() => {
                // Mapping skill → kursus Dicoding
                const DICODING_COURSES = {
                  'python': { title: 'Memulai Pemrograman dengan Python', level: 'Dasar', url: 'https://www.dicoding.com/academies/86' },
                  'machine learning': { title: 'Belajar Machine Learning untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/184' },
                  'deep learning': { title: 'Belajar Fundamental Deep Learning', level: 'Menengah', url: 'https://www.dicoding.com/academies/517' },
                  'tensorflow': { title: 'Belajar Fundamental Deep Learning', level: 'Menengah', url: 'https://www.dicoding.com/academies/517' },
                  'data analysis': { title: 'Belajar Analisis Data dengan Python', level: 'Menengah', url: 'https://www.dicoding.com/academies/555' },
                  'data science': { title: 'Belajar Analisis Data dengan Python', level: 'Menengah', url: 'https://www.dicoding.com/academies/555' },
                  'sql': { title: 'Belajar Dasar Structured Query Language', level: 'Dasar', url: 'https://www.dicoding.com/academies/480' },
                  'javascript': { title: 'Belajar Dasar Pemrograman JavaScript', level: 'Dasar', url: 'https://www.dicoding.com/academies/256' },
                  'react': { title: 'Belajar Membuat Aplikasi Web dengan React', level: 'Menengah', url: 'https://www.dicoding.com/academies/403' },
                  'node.js': { title: 'Belajar Membuat Aplikasi Back-End untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/261' },
                  'nodejs': { title: 'Belajar Membuat Aplikasi Back-End untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/261' },
                  'git': { title: 'Belajar Dasar Git dengan GitHub', level: 'Dasar', url: 'https://www.dicoding.com/academies/317' },
                  'docker': { title: 'Belajar Jaringan Komputer untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/375' },
                  'kubernetes': { title: 'Belajar Jaringan Komputer untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/375' },
                  'cloud computing': { title: 'Cloud Practitioner Essentials (AWS)', level: 'Dasar', url: 'https://www.dicoding.com/academies/251' },
                  'aws': { title: 'Cloud Practitioner Essentials (AWS)', level: 'Dasar', url: 'https://www.dicoding.com/academies/251' },
                  'flutter': { title: 'Belajar Membuat Aplikasi Flutter untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/159' },
                  'kotlin': { title: 'Belajar Membuat Aplikasi Android untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/51' },
                  'android': { title: 'Belajar Membuat Aplikasi Android untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/51' },
                  'natural language processing': { title: 'Belajar Machine Learning untuk Pemula', level: 'Dasar', url: 'https://www.dicoding.com/academies/184' },
                  'computer vision': { title: 'Belajar Fundamental Deep Learning', level: 'Menengah', url: 'https://www.dicoding.com/academies/517' },
                  'postgresql': { title: 'Belajar Dasar Structured Query Language', level: 'Dasar', url: 'https://www.dicoding.com/academies/480' },
                  'mysql': { title: 'Belajar Dasar Structured Query Language', level: 'Dasar', url: 'https://www.dicoding.com/academies/480' },
                  'html': { title: 'Belajar Dasar Pemrograman Web', level: 'Dasar', url: 'https://www.dicoding.com/academies/123' },
                  'css': { title: 'Belajar Dasar Pemrograman Web', level: 'Dasar', url: 'https://www.dicoding.com/academies/123' },
                };

                const levelColor = { 'Dasar': 'bg-blue', 'Menengah': 'bg-pink', 'Lanjut': 'bg-purple' };

                const gapSkills = matchScore.gap ?? [];

                if (gapSkills.length > 0) {
                  return gapSkills.slice(0, 5).map((skill, i) => {
                    const key = skill.toLowerCase();
                    const course = DICODING_COURSES[key];
                    const colors = ['bg-blue', 'bg-pink', 'bg-purple', 'bg-blue', 'bg-pink'];
                    const url = course
                      ? course.url
                      : `https://www.dicoding.com/search?q=${encodeURIComponent(skill)}`;
                    const title = course ? course.title : `Cari kelas "${skill}" di Dicoding`;
                    const sub = course ? `Dicoding • ${course.level}` : 'Dicoding • Cari kelas →';
                    const avatarClass = course ? levelColor[course.level] ?? 'bg-purple' : colors[i % colors.length];
                    return (
                      <a key={i} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div className="course-item" style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div className={`c-avatar ${avatarClass}`}>{skill.charAt(0).toUpperCase()}</div>
                          <div className="c-info">
                            <h4>{title}</h4>
                            <p>{sub}</p>
                          </div>
                        </div>
                      </a>
                    );
                  });
                }

                // Default: tampilkan 3 kursus unggulan Dicoding
                return (
                  <>
                    <a href="https://www.dicoding.com/academies/184" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="course-item" style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="c-avatar bg-blue">M</div>
                        <div className="c-info"><h4>Belajar Machine Learning untuk Pemula</h4><p>Dicoding • Dasar</p></div>
                      </div>
                    </a>
                    <a href="https://www.dicoding.com/academies/555" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="course-item" style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="c-avatar bg-pink">A</div>
                        <div className="c-info"><h4>Belajar Analisis Data dengan Python</h4><p>Dicoding • Menengah</p></div>
                      </div>
                    </a>
                    <a href="https://www.dicoding.com/academies/480" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      <div className="course-item" style={{ cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="c-avatar bg-purple">S</div>
                        <div className="c-info"><h4>Belajar Dasar Structured Query Language</h4><p>Dicoding • Dasar</p></div>
                      </div>
                    </a>
                  </>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Streamlit Dashboard Integration */}
        <div className="widget-card" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column' }}>
          <div className="widget-header">
            <h3>📊 Job Skill Analytics Dashboard</h3>
          </div>
          <div style={{ position: 'relative', marginTop: '16px', borderRadius: '12px', overflow: 'hidden', background: '#12131a', height: '800px' }}>

            {/* Loading spinner — tampil sebelum iframe selesai load */}
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
                <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>Memuat dashboard...</p>
              </div>
            )}

            {/* Fallback — hanya tampil jika iframe gagal (X-Frame-Options blocked) */}
            {iframeError && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex',
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, #12131a 0%, #1e1f2e 100%)',
                gap: '16px', zIndex: 0,
              }}>
                <div style={{ fontSize: '48px' }}>📊</div>
                <h3 style={{ color: '#fff', margin: 0 }}>Streamlit Dashboard</h3>
                <p style={{ color: '#a0a0a0', textAlign: 'center', maxWidth: '320px', margin: 0 }}>
                  Dashboard tidak dapat ditampilkan secara langsung karena kebijakan keamanan.
                  Klik tombol di bawah untuk membukanya.
                </p>
                <a
                  href="https://dashboardcapstoneda.streamlit.app/"
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
                  🚀 Buka Dashboard Streamlit
                </a>
              </div>
            )}

            {/* Iframe utama — selalu di atas layer lain (zIndex: 1) */}
            <iframe
              src="https://dashboardcapstoneda.streamlit.app/?embed=true&embed_options=hide_toolbar,hide_padding"
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
              title="Streamlit Job Skill Dashboard"
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

export default Dashboard;
