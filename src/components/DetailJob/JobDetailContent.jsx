import React from "react";

/**
 * Kolom kiri halaman Detail Job.
 * Menampilkan deskripsi peran, tanggung jawab, dan persyaratan pekerjaan.
 *
 * @param {Object} job - Objek data pekerjaan
 */
function JobDetailContent({ job }) {
  return (
    <div className="detail-content">
      {/* About the Role */}
      <div className="detail-section">
        <h3 className="detail-section-title">About the Role</h3>
        <p className="detail-desc">{job.desc}</p>
      </div>

      {/* Responsibilities */}
      <div className="detail-section">
        <h3 className="detail-section-title">Responsibilities</h3>
        <ul className="detail-list">
          {job.responsibilities.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="detail-section">
        <h3 className="detail-section-title">Requirements</h3>
        <ul className="detail-list">
          {job.requirements.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JobDetailContent;
