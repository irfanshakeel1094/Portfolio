import { useState, useEffect } from 'react';
import './Projects.css';
import { getAdminData } from './AdminPanel';

const DEFAULT_PROJECTS = [
  {
    title: 'Cyber Tool Kit',
    description: 'A comprehensive Python-based cybersecurity toolkit for security analysis, vulnerability assessment, and penetration testing.',
    tags: 'Python, Cybersecurity, Bash, Networking',
    github: 'https://github.com/irfanshakeel1094/Cyber-tool-kit',
    status: 'Completed',
  },
  {
    title: 'Doctor AI',
    description: 'An AI-powered medical assistant built with Python that leverages machine learning for intelligent health recommendations.',
    tags: 'Python, AI, NumPy, Pandas',
    github: 'https://github.com/irfanshakeel1094/Doctor-AI',
    status: 'Completed',
  },
  {
    title: 'Instagram Clone',
    description: 'A pixel-perfect Instagram UI clone built with modern frontend technologies, replicating the feed, stories, and profile layouts.',
    tags: 'HTML5, CSS3, JavaScript, React',
    github: 'https://github.com/irfanshakeel1094/Instagram_clone',
    status: 'In Progress',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    const data = getAdminData();
    return data?.projects || DEFAULT_PROJECTS;
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.projects) setProjects(data.projects);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">My Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">A selection of my recent work</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => {
            const tags = typeof project.tags === 'string'
              ? project.tags.split(',').map(t => t.trim()).filter(Boolean)
              : project.tags || [];

            return (
              <div key={project.title + i} className="project-card reveal" style={{ '--delay': `${i * 0.15}s` }}>
                <div className="project-info">
                  <div className="project-info-header">
                    <h3>{project.title}</h3>
                    <span className={`project-status-badge ${project.status === 'In Progress' ? 'status-in-progress' : 'status-completed'}`}>
                      {project.status || 'Completed'}
                    </span>
                  </div>
                  <p>{project.description}</p>
                  <div className="project-tags">
                    {tags.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
