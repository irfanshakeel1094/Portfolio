import { useState, useEffect } from 'react';
import './Certifications.css';
import { getAdminData } from './AdminPanel';

const DEFAULT_CERTIFICATIONS = [
  { title: 'Python for Everybody', issuer: 'Coursera / University of Michigan', date: '2024', credentialId: 'COURSERA-PY4E', color: '#3b82f6', tags: 'Python, Data Structures, OOP', link: '#' },
  { title: 'Web Development Bootcamp', issuer: 'Udemy', date: '2024', credentialId: 'UDEMY-WD-2024', color: '#8b5cf6', tags: 'HTML, CSS, JavaScript, React', link: '#' },
  { title: 'Cybersecurity Fundamentals', issuer: 'IBM / Coursera', date: '2023', credentialId: 'IBM-CS-FUND', color: '#22c55e', tags: 'Security, Networking, Cryptography', link: '#' },
  { title: 'Node.js & Express Developer', issuer: 'freeCodeCamp', date: '2024', credentialId: 'FCC-NODE-24', color: '#06b6d4', tags: 'Node.js, Express, REST API', link: '#' },
  { title: 'Machine Learning with Python', issuer: 'Coursera / DeepLearning.AI', date: '2024', credentialId: 'DLAI-ML-PY', color: '#ec4899', tags: 'ML, Python, TensorFlow', link: '#' },
  { title: 'SQL & Database Design', issuer: 'Oracle Academy', date: '2023', credentialId: 'ORA-SQL-2023', color: '#f59e0b', tags: 'SQL, MySQL, Database', link: '#' },
];

function CertIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 15l-3 3 1 4 2-1.5L14 22l1-4-3-3z"/>
      <circle cx="12" cy="9" r="6"/>
      <path d="M9 11l2 2 4-4"/>
    </svg>
  );
}

export default function Certifications() {
  const [certifications, setCertifications] = useState(() => {
    const data = getAdminData();
    return data?.certifications || DEFAULT_CERTIFICATIONS;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.certifications) setCertifications(data.certifications);
      else if (data && !data.certifications) setCertifications([]);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);
  return (
    <section className="section certifications" id="certifications">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Credentials</span>
          <h2 className="section-title">
            Certifications &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Continuously learning and staying ahead of the curve
          </p>
        </div>

        <div className="cert-grid">
          {certifications.map((cert, index) => {
            const tags = typeof cert.tags === 'string'
              ? cert.tags.split(',').map(t => t.trim()).filter(Boolean)
              : cert.tags || [];
            return (
            <div
              key={cert.title + index}
              className="cert-card reveal"
              style={{ '--delay': `${index * 0.1}s`, '--cert-color': cert.color }}
            >
              <div className="cert-card-inner">
                {/* Top bar */}
                <div className="cert-top-bar" />

                {/* Header */}
                <div className="cert-header">
                  <div className="cert-icon" style={{ '--cert-color': cert.color }}>
                    <CertIcon />
                  </div>
                  <div className="cert-badge">
                    <span className="cert-year">{cert.date}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <p className="cert-id">ID: {cert.credentialId}</p>
                </div>

                {/* Tags */}
                <div className="cert-tags">
                  {tags.map(tag => (
                    <span key={tag} className="cert-tag">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="cert-footer">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 11l3 3L22 4"/>
                      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                    </svg>
                    Verify Credential
                  </a>
                </div>
              </div>

              {/* Hover glow */}
              <div className="cert-glow" />
            </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="cert-stats reveal" style={{ '--delay': '0.6s' }}>
          <div className="cert-stat">
            <span className="cert-stat-number">{certifications.length}+</span>
            <span className="cert-stat-label">Certifications</span>
          </div>
          <div className="cert-stat-divider" />
          <div className="cert-stat">
            <span className="cert-stat-number">{new Set(certifications.map(c => c.issuer)).size}+</span>
            <span className="cert-stat-label">Platforms</span>
          </div>
          <div className="cert-stat-divider" />
          <div className="cert-stat">
            <span className="cert-stat-number">2+</span>
            <span className="cert-stat-label">Years Learning</span>
          </div>
        </div>
      </div>
    </section>
  );
}
