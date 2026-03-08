import { useState, useEffect } from 'react';
import './Skills.css';
import { getAdminData } from './adminUtils';

const DEFAULT_SKILLS = [
  { name: 'Python', percent: 90, color: '#3776AB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', percent: 85, color: '#ED8B00', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'JavaScript', percent: 85, color: '#F7DF1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', percent: 80, color: '#61DAFB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'HTML5', percent: 92, color: '#E44D26', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', percent: 88, color: '#2965F1', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'TailwindCSS', percent: 78, color: '#38B2AC', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bash Script', percent: 72, color: '#4EAA25', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
  { name: 'Figma', percent: 75, color: '#F24E1E', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
];

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
              <div className="skill-icon">
                <img src={skill.icon} alt={skill.name} width="40" height="40" loading="lazy" />
              </div>
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
