import { useState, useEffect } from 'react';
import './Skills.css';
import { getAdminData } from './adminUtils';

const DEFAULT_SKILLS = [
  { name: 'Python', percent: 90, color: '#3776AB' },
  { name: 'Java', percent: 85, color: '#ED8B00' },
  { name: 'JavaScript', percent: 85, color: '#F7DF1E' },
  { name: 'React', percent: 80, color: '#61DAFB' },
  { name: 'HTML5', percent: 92, color: '#E44D26' },
  { name: 'CSS3', percent: 88, color: '#2965F1' },
  { name: 'TailwindCSS', percent: 78, color: '#38B2AC' },
  { name: 'Bash Script', percent: 72, color: '#4EAA25' },
  { name: 'Figma', percent: 75, color: '#F24E1E' },
];

// Generic code icon for skills
function SkillIcon({ color }) {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState(() => {
    const data = getAdminData();
    return data?.skills || DEFAULT_SKILLS;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.skills) setSkills(data.skills);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  return (
    <section className="section skills" id="skills">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">My Skills</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p className="section-subtitle">Always learning, always growing</p>
        </div>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div
              key={skill.name + i}
              className="skill-card reveal"
              style={{ '--delay': `${i * 0.08}s`, '--accent': `rgba(${hexToRgb(skill.color)}, 0.08)` }}
            >
              <div className="skill-icon"><SkillIcon color={skill.color} /></div>
              <h3>{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function hexToRgb(hex) {
  if (!hex || hex.length < 7) return '139, 92, 246';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
