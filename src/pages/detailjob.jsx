import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/style.css";

import JobDetailSidebar from "../components/DetailJob/JobDetailSidebar";
import JobHeroCard from "../components/DetailJob/JobHeroCard";
import JobDetailContent from "../components/DetailJob/JobDetailContent";
import JobDetailPanel from "../components/DetailJob/JobDetailPanel";
import { DUMMY_JOBS } from "../data/dummyJobs";

function DetailJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const handleBack = () => {
    navigate("/search");
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

  const job = DUMMY_JOBS.find((j) => j.id === parseInt(id));

  const getInitials = (name) => {
    if (!name) return "G";
    const words = name.split(" ");
    if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  if (!job) {
    return (
      <div className="dash-container">
        <div style={{ margin: "auto", textAlign: "center", color: "white" }}>
          <h2>Job not found</h2>
          <button
            className="btn-primary"
            onClick={handleBack}
            style={{ marginTop: "20px" }}
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-container">
      {/* Sidebar Navigasi */}
      <JobDetailSidebar userData={userData} getInitials={getInitials} />

      {/* Konten Utama */}
      <main className="dash-main">
        {/* Header */}
        <header className="dash-header">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button className="btn-back" onClick={handleBack}>
              ← Back
            </button>
            <h1>Job Detail ✨</h1>
          </div>
          <div className="header-actions">
            <button
              className={`btn-save-toggle ${saved ? "saved" : ""}`}
              onClick={() => setSaved(!saved)}
            >
              {saved ? "♥ Saved" : "♡ Save Job"}
            </button>
          </div>
        </header>

        {/* Kartu Hero */}
        <JobHeroCard job={job} />

        {/* Body: Konten + Panel */}
        <div className="detail-body">
          <JobDetailContent job={job} />
          <JobDetailPanel job={job} />
        </div>
      </main>
    </div>
  );
}

export default DetailJob;
