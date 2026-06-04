import React from "react";

/**
 * Kartu hero di bagian atas halaman Detail Job.
 * Menampilkan logo perusahaan, judul posisi, tags, serta statistik singkat.
 *
 * @param {Object} job - Objek data pekerjaan
 */
function JobHeroCard({ job }) {
  return (
    <div className="detail-hero-card">
      <div className="detail-hero-left">
        <div className="detail-logo">{job.logo}</div>
        <div>
          <h2 className="detail-title">{job.title}</h2>
          <p className="detail-company">
            {job.company} &bull; {job.location}
          </p>
          <div className="jc-tags" style={{ marginTop: "12px" }}>
            {job.tags.map((tag, idx) => (
              <span key={idx} className="tag-dark">
                {tag}
              </span>
            ))}
            <span className="tag-match-dark">🎯 {job.matchScore}% Match</span>
          </div>
        </div>
      </div>

      <div className="detail-hero-right">
        <div className="detail-stat">
          <span className="detail-stat-label">Salary</span>
          <span className="detail-stat-value">{job.salary}</span>
        </div>
        <div className="detail-stat">
          <span className="detail-stat-label">Experience</span>
          <span className="detail-stat-value">{job.experience}</span>
        </div>
        <div className="detail-stat">
          <span className="detail-stat-label">Applicants</span>
          <span className="detail-stat-value">{job.applicants}</span>
        </div>
        <div className="detail-stat">
          <span className="detail-stat-label">Deadline</span>
          <span className="detail-stat-value">{job.deadline}</span>
        </div>
      </div>
    </div>
  );
}

export default JobHeroCard;
