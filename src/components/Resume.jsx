import { useState, useEffect } from 'react';
import './Resume.css';
import { getResumeURL, getResumeMeta } from './AdminPanel';

export default function Resume() {
  const [resumeUrl, setResumeUrl] = useState(() => getResumeURL());
  const [resumeMeta, setResumeMeta] = useState(() => getResumeMeta());

  useEffect(() => {
    const handleUpdate = () => {
      setResumeUrl(getResumeURL());
      setResumeMeta(getResumeMeta());
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  const uploadDate = resumeMeta?.uploadedAt || 'March 2026';

  return (
    <section className="section resume" id="resume">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Resume</span>
          <h2 className="section-title">
            Download My <span className="gradient-text">Resume</span>
          </h2>
          <p className="section-subtitle">Get a detailed overview of my experience and skills</p>
        </div>
        <div className="resume-content reveal">
          <div className="resume-card">
            <div className="resume-card-glow"></div>
            <div className="resume-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <h3>Shakeel Irfan A R</h3>
            <p className="resume-subtitle">B.Tech CSE — SRMIST, Chennai</p>
            <div className="resume-highlights">
              <div className="resume-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Full Stack Development</span>
              </div>
              <div className="resume-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Cybersecurity & Ethical Hacking</span>
              </div>
              <div className="resume-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>AI & Machine Learning</span>
              </div>
              <div className="resume-highlight-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Python, Java, JavaScript & React</span>
              </div>
            </div>
            <a
              href={resumeUrl}
              download={resumeMeta?.name || 'Shakeel_Irfan_Resume.pdf'}
              className="btn btn-primary resume-download-btn"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download Resume</span>
            </a>
            <p className="resume-note">PDF • Updated {uploadDate}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
