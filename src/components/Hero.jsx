import { useEffect, useRef, useState } from 'react';
import './Hero.css';
import profileImg from '../assets/images/profile.jpg';
import { useMouseParallax } from './Effects3D';
import { getAdminData } from './AdminPanel';

const typedStrings = [
  'Full Stack Web Apps',
  'Python & AI Tools',
  'Cybersecurity Solutions',
  'Beautiful User Interfaces',
];

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const indexRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const parallaxRef = useMouseParallax(25);

  const [heroData, setHeroData] = useState(() => {
    const data = getAdminData();
    return data?.hero || { name: 'Shakeel Irfan', subtitle: 'A B.Tech CSE student at SRMIST passionate about Full Stack Development, Cybersecurity, and AI — building scalable apps with clean code and modern technologies.' };
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.hero) setHeroData(data.hero);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  // Typing effect
  useEffect(() => {
    const type = () => {
      const current = typedStrings[indexRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        setTypedText(current.substring(0, charRef.current));
        if (charRef.current === current.length) {
          deletingRef.current = true;
          setTimeout(type, 2000);
          return;
        }
        setTimeout(type, 80);
      } else {
        charRef.current--;
        setTypedText(current.substring(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          indexRef.current = (indexRef.current + 1) % typedStrings.length;
          setTimeout(type, 400);
          return;
        }
        setTimeout(type, 40);
      }
    };
    const timer = setTimeout(type, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Counter animation
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Open to opportunities
          </div>
          <h1 className="hero-title">
            Hi, I'm <span className="gradient-text">{heroData.name}</span>
          </h1>
          <h2 className="hero-subtitle">
            I build <span className="typed-text">{typedText}</span>
            <span className="cursor">|</span>
          </h2>
          <p className="hero-description">
            {heroData.subtitle}
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="https://github.com/irfanshakeel1094" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>GitHub</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div>
                <span className="stat-number" data-target="9">0</span>
                <span className="stat-plus">+</span>
              </div>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div>
                <span className="stat-number" data-target="15">0</span>
                <span className="stat-plus">+</span>
              </div>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div>
                <span className="stat-number" data-target="4">0</span>
                <span className="stat-plus">+</span>
              </div>
              <span className="stat-label">GitHub Followers</span>
            </div>
          </div>
        </div>
        <div className="hero-visual" ref={parallaxRef}>
          <div className="hero-image-wrapper">
            <div className="hero-glow" data-depth="0.5"></div>
            <div className="hero-avatar" data-depth="1.2">
              <img src={profileImg} alt="Shakeel Irfan" className="avatar-image" />
            </div>
            <div className="floating-card card-1" data-depth="2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <span>Full Stack</span>
            </div>
            <div className="floating-card card-2" data-depth="1.8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Cybersecurity</span>
            </div>
            <div className="floating-card card-3" data-depth="2.2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
              <span>AI & Python</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
