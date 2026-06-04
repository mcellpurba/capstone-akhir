import React from "react";
import { Link, useNavigate } from "react-router-dom";

/**
 * Sidebar navigasi untuk halaman Job Detail & Job Search.
 * Menerima props userData untuk menampilkan info user.
 */
function JobDetailSidebar({ userData, getInitials }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="dash-sidebar">
      <div className="dash-logo">
        <div className="logo-icon">M</div>
        <div>
          <h2>MyJobTrend</h2>
          <p>Free Plan</p>
        </div>
      </div>

      <div className="dash-search">
        <span>🔍</span>
        <input type="text" placeholder="Search" />
        <kbd>⌘K</kbd>
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
          <Link to="/search" className="nested-item active">
            Find Jobs
          </Link>
          <a href="#" className="nested-item">
            Saved Jobs
          </a>
          <a href="#" className="nested-item">
            Applications
          </a>
        </div>
      </div>

      <div className="dash-menu-group">
        <p className="menu-label">Job Trend</p>
        <Link to="/prediction" className="menu-item">
          <span>⚙️</span> Job Prediction
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
  );
}

export default JobDetailSidebar;
