import { useState, useEffect } from 'react';
import './About.css';
import { getAdminData } from './adminUtils';

export default function About() {
  const [aboutData, setAboutData] = useState(() => {
    const data = getAdminData();
    return data?.about || {
      bio1: "I'm Shakeel Irfan A R, a B.Tech Computer Science & Engineering student at SRM Institute of Science and Technology (SRMIST), based in Chennai, India. I'm passionate about Full Stack Development, Cybersecurity, and building intelligent applications powered by AI.",
      bio2: 'As a Technical Team Member at Eleet SRMIST, I collaborate with fellow developers on innovative projects. I enjoy building scalable applications, writing clean backend logic, and exploring modern web technologies. From Python tools to React frontends, I love turning ideas into working software.',
    };
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.about) setAboutData(data.about);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Turning Ideas Into <span className="gradient-text">Digital Reality</span>
          </h2>
          <p className="section-subtitle">Get to know the person behind the code</p>
        </div>
        <div className="about-grid">
          <div className="about-text reveal">
            <p>{aboutData.bio1}</p>
            <p>{aboutData.bio2}</p>
            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <h4>Cybersecurity Enthusiast</h4>
                  <p>Built security tools like Cyber-tool-kit and password checkers.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div>
                  <h4>Full Stack Developer</h4>
                  <p>Experienced with React, Express, Django, NestJS and more.</p>
                </div>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div>
                  <h4>AI & Data Explorer</h4>
                  <p>Built Doctor-AI and explored NumPy, Pandas for data analysis.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-card reveal" style={{ '--delay': '0.2s' }}>
            <div className="glass-card">
              <div className="card-decoration"></div>
              <h3>Quick Info</h3>
              <ul className="info-list">
                <li>
                  <span className="info-label">Name</span>
                  <span className="info-value">Shakeel Irfan A R</span>
                </li>
                <li>
                  <span className="info-label">Education</span>
                  <span className="info-value">B.Tech CSE, SRMIST</span>
                </li>
                <li>
                  <span className="info-label">Location</span>
                  <span className="info-value">Chennai, India</span>
                </li>
                <li>
                  <span className="info-label">Speciality</span>
                  <span className="info-value">Full Stack & Security</span>
                </li>
                <li>
                  <span className="info-label">Role</span>
                  <span className="info-value">Tech Team @ Eleet</span>
                </li>
                <li>
                  <span className="info-label">Open to Work</span>
                  <span className="info-value available">Available</span>
                </li>
              </ul>
              <a href="https://github.com/irfanshakeel1094" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full">
                <span>View GitHub Profile</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
