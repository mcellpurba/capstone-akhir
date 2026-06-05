import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";
import { DUMMY_JOBS } from "../data/dummyJobs";
import { useTheme } from "../context/ThemeContext";
import { useSavedJobs } from "../hooks/useSavedJobs";

function SavedJobs() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

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
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
    return { username: "Guest", email: "guest@email.com" };
  });

  const { savedJobIds, toggleSaveJob, isJobSaved } = useSavedJobs(userData.username);

  const getInitials = (name) => {
    if (!name) return "G";
    const words = name.split(" ");
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handleCardClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const savedJobsList = DUMMY_JOBS.filter(job => savedJobIds.includes(job.id));

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

          <div className="menu-item active">
            <span>💼</span> Job Search
          </div>
          <div className="nested-menu">
            <Link to="/search" className="nested-item">Find Jobs</Link>
            <Link to="/saved-jobs" className="nested-item active">Saved Jobs</Link>
            <a href="#" className="nested-item">Applications</a>
          </div>
        </div>

        <div className="dash-menu-group">
          <p className="menu-label">Job Trend</p>
          <Link to="/prediction" className="menu-item"><span>⚙️</span> Job Prediction</Link>
          <Link to="/chatbot" className="menu-item"><span>🤖</span> AI Chatbot</Link>
          <Link to="/profile" className="menu-item"><span>👤</span> Profile</Link>
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

      {/* ── Main ── */}
      <main className="dash-main">
        <header className="dash-header">
          <h1>Saved Jobs ♥</h1>
          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme" style={{ marginRight: '10px' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="js-dark-layout">
          <section className="js-dark-results" style={{ width: '100%' }}>
            <div className="results-header">
              <h3>Your Saved Jobs <span className="results-count">{savedJobsList.length}</span></h3>
            </div>

            {savedJobsList.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '50px', color: '#a0a0a0' }}>
                <span style={{ fontSize: '48px' }}>📂</span>
                <p>You haven't saved any jobs yet.</p>
                <Link to="/search">
                  <button className="btn-primary" style={{ marginTop: '10px' }}>Browse Jobs</button>
                </Link>
              </div>
            ) : (
              <div className="js-dark-grid">
                {savedJobsList.map((job, index) => (
                  <div
                    key={job.id}
                    id={`job-card-${job.id}`}
                    className="job-card-dark job-card-clickable"
                    style={{ animationDelay: `${index * 60}ms` }}
                    onClick={() => handleCardClick(job.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleCardClick(job.id)}
                    aria-label={`View details for ${job.title} at ${job.company}`}
                  >
                    {/* Match score ribbon */}
                    <div className="card-match-ribbon">
                      <span>🎯 {job.matchScore}%</span>
                    </div>

                    <div className="jc-header">
                      <div className="jc-company">
                        <div className="jc-logo">{job.logo}</div>
                        <div>
                          <h4>{job.title}</h4>
                          <p>{job.company} • 📍 {job.location}</p>
                        </div>
                      </div>
                      <button
                        className="jc-save"
                        style={{ color: isJobSaved(job.id) ? '#ff5e8e' : '#9ca3af' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        aria-label="Save job"
                      >
                        {isJobSaved(job.id) ? '♥' : '♡'}
                      </button>
                    </div>

                    <div className="jc-tags">
                      {job.tags.map((tag, idx) => (
                        <span key={idx} className="tag-dark">{tag}</span>
                      ))}
                    </div>

                    <p className="jc-desc">{job.desc}</p>

                    <div className="jc-footer">
                      <span className="jc-salary">{job.salary}</span>
                      <span className="jc-posted">🕒 {job.posted}</span>
                    </div>

                    <div className="card-hover-cta">
                      <span>View Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default SavedJobs;
