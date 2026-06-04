import React from "react";

/**
 * Panel kanan halaman Detail Job.
 * Menampilkan benefit, ringkasan pekerjaan, dan tombol Apply.
 *
 * @param {Object} job - Objek data pekerjaan
 */
function JobDetailPanel({ job }) {
  return (
    <div className="detail-sidebar">
      {/* Benefits */}
      <div className="detail-side-card">
        <h3 className="detail-section-title">Benefits</h3>
        <div className="benefit-list">
          {job.benefits.map((benefit, idx) => (
            <div key={idx} className="benefit-item">
              <span className="benefit-icon">✅</span>
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Overview */}
      <div className="detail-side-card">
        <h3 className="detail-section-title">Job Overview</h3>
        <div className="overview-list">
          <div className="overview-item">
            <span className="overview-label">📅 Posted</span>
            <span className="overview-value">{job.posted}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">📍 Location</span>
            <span className="overview-value">{job.location}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">💼 Job Type</span>
            <span className="overview-value">{job.type}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">🎓 Level</span>
            <span className="overview-value">{job.level}</span>
          </div>
          <div className="overview-item">
            <span className="overview-label">⏰ Deadline</span>
            <span className="overview-value">{job.deadline}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPanel;
