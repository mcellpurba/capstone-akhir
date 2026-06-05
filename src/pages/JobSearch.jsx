import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/style.css";
import { DUMMY_JOBS } from "../data/dummyJobs";
import { useTheme } from "../context/ThemeContext";
import { useSavedJobs } from "../hooks/useSavedJobs";

function JobSearch() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [locationTerm, setLocationTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: {
      "Full-Time": false,
      "Part-Time": false,
      "Internship": false,
      "Contract": false,
    },
    experienceLevel: {
      "Entry Level": false,
      "Intermediate": false,
      "Expert": false,
    },
    salaryRange: 50,
  });
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
  const { toggleSaveJob, isJobSaved } = useSavedJobs(userData.username);

  const getInitials = (name) => {
    if (!name) return "G";
    const words = name.split(" ");
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };



  const handleCardClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const activeJobTypes = Object.keys(filters.jobType).filter(k => filters.jobType[k]);
  const activeExperience = Object.keys(filters.experienceLevel).filter(k => filters.experienceLevel[k]);

  const filteredJobs = DUMMY_JOBS.filter((job) => {
    // 1. Search term
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;

    // 1.5 Location term
    const matchesLocation = job.location.toLowerCase().includes(locationTerm.toLowerCase());
    if (!matchesLocation) return false;

    const jobTags = job.tags.map(t => t.toLowerCase());

    // 2. Job Type
    const matchesJobType = activeJobTypes.length === 0 || activeJobTypes.some(type => jobTags.includes(type.toLowerCase()));
    if (!matchesJobType) return false;

    // 3. Experience Level
    const matchesExperience = activeExperience.length === 0 || activeExperience.some(level => jobTags.includes(level.toLowerCase()));
    if (!matchesExperience) return false;

    // 4. Salary Range
    const salaryNum = parseInt(job.salary.replace(/\D/g, '')) || 0;
    const matchesSalary = salaryNum >= filters.salaryRange;
    if (!matchesSalary) return false;

    return true;
  });

  const handleJobTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      jobType: { ...prev.jobType, [type]: !prev.jobType[type] }
    }));
  };

  const handleExperienceChange = (level) => {
    setFilters(prev => ({
      ...prev,
      experienceLevel: { ...prev.experienceLevel, [level]: !prev.experienceLevel[level] }
    }));
  };

  const handleSalaryChange = (e) => {
    setFilters(prev => ({
      ...prev,
      salaryRange: parseInt(e.target.value)
    }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: { "Full-Time": false, "Part-Time": false, "Internship": false, "Contract": false },
      experienceLevel: { "Entry Level": false, "Intermediate": false, "Expert": false },
      salaryRange: 50
    });
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

          <div className="menu-item active">
            <span>💼</span> Job Search
          </div>
          <div className="nested-menu">
            <Link to="/search" className="nested-item active">Find Jobs</Link>
            <Link to="/saved-jobs" className="nested-item">Saved Jobs</Link>
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
          <h1>Find Your Dream Job ✨</h1>
          <div className="header-actions">
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme" style={{ marginRight: '10px' }}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Search bar */}
        <div className="js-dark-search">
          <div className="js-dark-input">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Job title, keyword, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="js-divider-dark"></div>
          <div className="js-dark-input">
            <span>📍</span>
            <input 
            type="text" 
            placeholder="Location or Remote" 
            value={locationTerm}
              onChange={(e) => setLocationTerm(e.target.value)}
            />
          </div>
          <button className="btn-primary" style={{ padding: "12px 30px" }}>Search</button>
        </div>

        <div className="js-dark-layout">
          {/* Filter panel */}
          <aside className="js-dark-filters">
            <div className="filter-header">
              <h3>Filters</h3>
              <span className="clear-btn" onClick={clearFilters} style={{ cursor: 'pointer' }}>Clear all</span>
            </div>

            <div className="filter-section">
              <h4>Job Type</h4>
              <label><input type="checkbox" checked={filters.jobType["Full-Time"]} onChange={() => handleJobTypeChange("Full-Time")} /> Full time</label>
              <label><input type="checkbox" checked={filters.jobType["Part-Time"]} onChange={() => handleJobTypeChange("Part-Time")} /> Part time</label>
              <label><input type="checkbox" checked={filters.jobType["Internship"]} onChange={() => handleJobTypeChange("Internship")} /> Internship</label>
              <label><input type="checkbox" checked={filters.jobType["Contract"]} onChange={() => handleJobTypeChange("Contract")} /> Contract</label>
            </div>

            <div className="filter-section">
              <h4>Min Salary: ${filters.salaryRange}k</h4>
              <input type="range" min="50" max="250" value={filters.salaryRange} onChange={handleSalaryChange} className="range-dark" />
              <div className="range-labels">
                <span>$50k</span>
                <span>$250k</span>
              </div>
            </div>

            <div className="filter-section">
              <h4>Experience Level</h4>
              <label><input type="checkbox" checked={filters.experienceLevel["Entry Level"]} onChange={() => handleExperienceChange("Entry Level")} /> Entry level <span className="count">12</span></label>
              <label><input type="checkbox" checked={filters.experienceLevel["Intermediate"]} onChange={() => handleExperienceChange("Intermediate")} /> Intermediate <span className="count">48</span></label>
              <label><input type="checkbox" checked={filters.experienceLevel["Expert"]} onChange={() => handleExperienceChange("Expert")} /> Expert <span className="count">19</span></label>
            </div>
          </aside>

          {/* Job cards */}
          <section className="js-dark-results">
            <div className="results-header">
              <h3>Recommended Jobs <span className="results-count">{filteredJobs.length}</span></h3>
              <button className="btn-outline-dark">Most Recent ⚲</button>
            </div>

            <div className="js-dark-grid">
              {filteredJobs.map((job, index) => (
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

                  {/* CTA yang muncul saat hover */}
                  <div className="card-hover-cta">
                    <span>View Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default JobSearch;