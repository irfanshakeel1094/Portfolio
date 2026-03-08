import { useState, useEffect } from 'react';
import { getAdminData, getResumeMeta, getResumeURL } from './adminUtils';
import './AdminPanel.css';

const ADMIN_CREDENTIALS = {
  username: 'irfan',
  password: 'irfan@1094',
};

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

const DEFAULT_CERTIFICATIONS = [
  {
    title: 'Python for Everybody',
    issuer: 'Coursera / University of Michigan',
    date: '2024',
    credentialId: 'COURSERA-PY4E',
    color: '#3b82f6',
    tags: 'Python, Data Structures, OOP',
    link: '#',
  },
  {
    title: 'Web Development Bootcamp',
    issuer: 'Udemy',
    date: '2024',
    credentialId: 'UDEMY-WD-2024',
    color: '#8b5cf6',
    tags: 'HTML, CSS, JavaScript, React',
    link: '#',
  },
  {
    title: 'Cybersecurity Fundamentals',
    issuer: 'IBM / Coursera',
    date: '2023',
    credentialId: 'IBM-CS-FUND',
    color: '#22c55e',
    tags: 'Security, Networking, Cryptography',
    link: '#',
  },
  {
    title: 'Node.js & Express Developer',
    issuer: 'freeCodeCamp',
    date: '2024',
    credentialId: 'FCC-NODE-24',
    color: '#06b6d4',
    tags: 'Node.js, Express, REST API',
    link: '#',
  },
  {
    title: 'Machine Learning with Python',
    issuer: 'Coursera / DeepLearning.AI',
    date: '2024',
    credentialId: 'DLAI-ML-PY',
    color: '#ec4899',
    tags: 'ML, Python, TensorFlow',
    link: '#',
  },
  {
    title: 'SQL & Database Design',
    issuer: 'Oracle Academy',
    date: '2023',
    credentialId: 'ORA-SQL-2023',
    color: '#f59e0b',
    tags: 'SQL, MySQL, Database',
    link: '#',
  },
];



export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('admin_logged_in') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('skills');
  const [saveNotif, setSaveNotif] = useState('');
  const [resumeMeta, setResumeMeta] = useState(() => getResumeMeta());
  const [resumeUploading, setResumeUploading] = useState(false);

  const [editData, setEditData] = useState(() => {
    const saved = getAdminData();
    return saved || {
      hero: {
        name: 'Shakeel Irfan',
        subtitle: 'A B.Tech CSE student at SRMIST passionate about Full Stack Development, Cybersecurity, and AI — building scalable apps with clean code and modern technologies.',
      },
      about: {
        bio1: "I'm Shakeel Irfan A R, a B.Tech Computer Science & Engineering student at SRM Institute of Science and Technology (SRMIST), based in Chennai, India. I'm passionate about Full Stack Development, Cybersecurity, and building intelligent applications powered by AI.",
        bio2: 'As a Technical Team Member at Eleet SRMIST, I collaborate with fellow developers on innovative projects. I enjoy building scalable applications, writing clean backend logic, and exploring modern web technologies. From Python tools to React frontends, I love turning ideas into working software.',
      },
      contact: {
        email: 'irfanshakeel1094@gmail.com',
        phone: '+91 98423 99132',
        location: 'Chennai, Tamil Nadu, India',
      },
      skills: DEFAULT_SKILLS,
      projects: DEFAULT_PROJECTS,
      certifications: DEFAULT_CERTIFICATIONS,
    };
  });



  // Secret key combo: Ctrl+Shift+A toggles admin FAB visibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowFab(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setLoginError('');
      sessionStorage.setItem('admin_logged_in', 'true');
    } else {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('admin_logged_in');
    setUsername('');
    setPassword('');
  };

  const handleSave = () => {
    localStorage.setItem('portfolio_admin_data', JSON.stringify(editData));
    setSaveNotif('Changes saved! Refresh the page to see updates.');
    setTimeout(() => setSaveNotif(''), 4000);
    // Dispatch event so other components can react
    window.dispatchEvent(new Event('adminDataUpdated'));
  };

  const updateField = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  // ---- Skills CRUD ----
  const updateSkill = (index, field, value) => {
    setEditData(prev => {
      const skills = [...prev.skills];
      skills[index] = { ...skills[index], [field]: field === 'percent' ? parseInt(value) || 0 : value };
      return { ...prev, skills };
    });
  };

  const addSkill = () => {
    setEditData(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', percent: 50, color: '#8b5cf6' }],
    }));
  };

  const removeSkill = (index) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // ---- Projects CRUD ----
  const updateProject = (index, field, value) => {
    setEditData(prev => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  };

  const addProject = () => {
    setEditData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: '', description: '', tags: '', github: '', status: 'In Progress' }],
    }));
  };

  const removeProject = (index) => {
    setEditData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  // ---- Certifications CRUD ----
  const updateCertification = (index, field, value) => {
    setEditData(prev => {
      const certifications = [...prev.certifications];
      certifications[index] = { ...certifications[index], [field]: value };
      return { ...prev, certifications };
    });
  };

  const addCertification = () => {
    setEditData(prev => ({
      ...prev,
      certifications: [...prev.certifications, { title: '', issuer: '', date: '', credentialId: '', color: '#8b5cf6', tags: '', link: '' }],
    }));
  };

  const removeCertification = (index) => {
    setEditData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  // ---- Resume Upload ----
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setSaveNotif('Error: Please upload a PDF file only.');
      setTimeout(() => setSaveNotif(''), 3000);
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setSaveNotif('Error: File too large (max 2MB).');
      setTimeout(() => setSaveNotif(''), 3000);
      return;
    }
    setResumeUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      try {
        localStorage.setItem('portfolio_resume_pdf', reader.result);
        const meta = {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + ' KB',
          uploadedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        };
        localStorage.setItem('portfolio_resume_meta', JSON.stringify(meta));
        setResumeMeta(meta);
        setSaveNotif('Resume uploaded successfully!');
        window.dispatchEvent(new Event('adminDataUpdated'));
      } catch {
        setSaveNotif('Error: Storage full. Try a smaller file.');
      }
      setResumeUploading(false);
      setTimeout(() => setSaveNotif(''), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleResumeRemove = () => {
    localStorage.removeItem('portfolio_resume_pdf');
    localStorage.removeItem('portfolio_resume_meta');
    setResumeMeta(null);
    setSaveNotif('Resume removed.');
    window.dispatchEvent(new Event('adminDataUpdated'));
    setTimeout(() => setSaveNotif(''), 3000);
  };

  const tabs = [
    { id: 'skills', label: '🛠 Skills' },
    { id: 'projects', label: '📁 Projects' },
    { id: 'certs', label: '🏅 Certs' },
    { id: 'resume', label: '📄 Resume' },
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Floating Admin Button — hidden until Ctrl+Shift+A */}
      {showFab && (
      <button
        className="admin-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Admin Panel"
        title="Admin Panel"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      </button>
      )}

      {/* Admin Panel Overlay */}
      {isOpen && (
        <div className="admin-overlay" onClick={() => setIsOpen(false)}>
          <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
            <div className="admin-panel-header">
              <h2>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Admin Panel
              </h2>
              <button className="admin-close" onClick={() => setIsOpen(false)} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {!isLoggedIn ? (
              <form className="admin-login" onSubmit={handleLogin}>
                <div className="admin-login-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3>Admin Login</h3>
                <p>Enter your credentials to manage the portfolio</p>
                {loginError && <div className="admin-error">{loginError}</div>}
                <div className="admin-input-group">
                  <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="admin-input-group">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                  <span>Login</span>
                </button>
              </form>
            ) : (
              <div className="admin-dashboard">
                <div className="admin-user-bar">
                  <div className="admin-user-info">
                    <div className="admin-avatar">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <span>Welcome, <strong>Irfan</strong></span>
                  </div>
                  <button className="admin-logout-btn" onClick={handleLogout}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Logout
                  </button>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      className={`admin-tab${activeTab === tab.id ? ' active' : ''}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="admin-tab-content">

                  {/* ===== SKILLS TAB ===== */}
                  {activeTab === 'skills' && (
                    <div className="admin-fields">
                      <div className="admin-section-label">
                        <span>Manage Skills ({editData.skills.length})</span>
                        <button className="admin-add-btn" onClick={addSkill}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add Skill
                        </button>
                      </div>
                      {editData.skills.map((skill, i) => (
                        <div key={i} className="admin-item-card">
                          <div className="admin-item-header">
                            <div className="admin-color-dot" style={{ background: skill.color }}></div>
                            <span className="admin-item-title">{skill.name || 'New Skill'}</span>
                            <button className="admin-remove-btn" onClick={() => removeSkill(i)} title="Remove skill">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                          <div className="admin-item-fields">
                            <div className="admin-field admin-field-inline">
                              <label>Name</label>
                              <input
                                type="text"
                                value={skill.name}
                                onChange={(e) => updateSkill(i, 'name', e.target.value)}
                                placeholder="e.g. TypeScript"
                              />
                            </div>
                            <div className="admin-field-row">
                              <div className="admin-field admin-field-small">
                                <label>Level (%)</label>
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={skill.percent}
                                  onChange={(e) => updateSkill(i, 'percent', e.target.value)}
                                />
                              </div>
                              <div className="admin-field admin-field-small">
                                <label>Color</label>
                                <div className="admin-color-input">
                                  <input
                                    type="color"
                                    value={skill.color}
                                    onChange={(e) => updateSkill(i, 'color', e.target.value)}
                                  />
                                  <span>{skill.color}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ===== PROJECTS TAB ===== */}
                  {activeTab === 'projects' && (
                    <div className="admin-fields">
                      <div className="admin-section-label">
                        <span>Manage Projects ({editData.projects.length})</span>
                        <button className="admin-add-btn" onClick={addProject}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add Project
                        </button>
                      </div>
                      {editData.projects.map((project, i) => (
                        <div key={i} className="admin-item-card">
                          <div className="admin-item-header">
                            <span className="admin-item-num">#{i + 1}</span>
                            <span className="admin-item-title">{project.title || 'New Project'}</span>
                            <button className="admin-remove-btn" onClick={() => removeProject(i)} title="Remove project">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                          <div className="admin-item-fields">
                            <div className="admin-field">
                              <label>Title</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProject(i, 'title', e.target.value)}
                                placeholder="Project name"
                              />
                            </div>
                            <div className="admin-field">
                              <label>Description</label>
                              <textarea
                                rows="2"
                                value={project.description}
                                onChange={(e) => updateProject(i, 'description', e.target.value)}
                                placeholder="Brief project description"
                              />
                            </div>
                            <div className="admin-field">
                              <label>Tags (comma separated)</label>
                              <input
                                type="text"
                                value={project.tags}
                                onChange={(e) => updateProject(i, 'tags', e.target.value)}
                                placeholder="e.g. React, Node.js, MongoDB"
                              />
                            </div>
                            <div className="admin-field">
                              <label>GitHub URL</label>
                              <input
                                type="url"
                                value={project.github}
                                onChange={(e) => updateProject(i, 'github', e.target.value)}
                                placeholder="https://github.com/..."
                              />
                            </div>
                            <div className="admin-field">
                              <label>Status</label>
                              <select
                                value={project.status || 'Completed'}
                                onChange={(e) => updateProject(i, 'status', e.target.value)}
                                className="admin-select"
                              >
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ===== CERTIFICATIONS TAB ===== */}
                  {activeTab === 'certs' && (
                    <div className="admin-fields">
                      <div className="admin-section-label">
                        <span>Manage Certifications ({editData.certifications.length})</span>
                        <button className="admin-add-btn" onClick={addCertification}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add Cert
                        </button>
                      </div>
                      {editData.certifications.map((cert, i) => (
                        <div key={i} className="admin-item-card">
                          <div className="admin-item-header">
                            <div className="admin-color-dot" style={{ background: cert.color }}></div>
                            <span className="admin-item-title">{cert.title || 'New Certification'}</span>
                            <button className="admin-remove-btn" onClick={() => removeCertification(i)} title="Remove certification">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </div>
                          <div className="admin-item-fields">
                            <div className="admin-field">
                              <label>Title</label>
                              <input
                                type="text"
                                value={cert.title}
                                onChange={(e) => updateCertification(i, 'title', e.target.value)}
                                placeholder="e.g. Python for Everybody"
                              />
                            </div>
                            <div className="admin-field">
                              <label>Issuer</label>
                              <input
                                type="text"
                                value={cert.issuer}
                                onChange={(e) => updateCertification(i, 'issuer', e.target.value)}
                                placeholder="e.g. Coursera / University of Michigan"
                              />
                            </div>
                            <div className="admin-field-row">
                              <div className="admin-field admin-field-small">
                                <label>Year</label>
                                <input
                                  type="text"
                                  value={cert.date}
                                  onChange={(e) => updateCertification(i, 'date', e.target.value)}
                                  placeholder="2024"
                                />
                              </div>
                              <div className="admin-field admin-field-small">
                                <label>Color</label>
                                <div className="admin-color-input">
                                  <input
                                    type="color"
                                    value={cert.color}
                                    onChange={(e) => updateCertification(i, 'color', e.target.value)}
                                  />
                                  <span>{cert.color}</span>
                                </div>
                              </div>
                            </div>
                            <div className="admin-field">
                              <label>Credential ID</label>
                              <input
                                type="text"
                                value={cert.credentialId}
                                onChange={(e) => updateCertification(i, 'credentialId', e.target.value)}
                                placeholder="e.g. COURSERA-PY4E"
                              />
                            </div>
                            <div className="admin-field">
                              <label>Tags (comma separated)</label>
                              <input
                                type="text"
                                value={cert.tags}
                                onChange={(e) => updateCertification(i, 'tags', e.target.value)}
                                placeholder="e.g. Python, Data Structures, OOP"
                              />
                            </div>
                            <div className="admin-field">
                              <label>Verification Link</label>
                              <input
                                type="url"
                                value={cert.link}
                                onChange={(e) => updateCertification(i, 'link', e.target.value)}
                                placeholder="https://coursera.org/verify/..."
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ===== HERO TAB ===== */}
                  {activeTab === 'hero' && (
                    <div className="admin-fields">
                      <div className="admin-field">
                        <label>Display Name</label>
                        <input
                          type="text"
                          value={editData.hero.name}
                          onChange={(e) => updateField('hero', 'name', e.target.value)}
                        />
                      </div>
                      <div className="admin-field">
                        <label>Hero Description</label>
                        <textarea
                          rows="4"
                          value={editData.hero.subtitle}
                          onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ===== ABOUT TAB ===== */}
                  {activeTab === 'about' && (
                    <div className="admin-fields">
                      <div className="admin-field">
                        <label>About - Paragraph 1</label>
                        <textarea
                          rows="5"
                          value={editData.about.bio1}
                          onChange={(e) => updateField('about', 'bio1', e.target.value)}
                        />
                      </div>
                      <div className="admin-field">
                        <label>About - Paragraph 2</label>
                        <textarea
                          rows="5"
                          value={editData.about.bio2}
                          onChange={(e) => updateField('about', 'bio2', e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* ===== RESUME TAB ===== */}
                  {activeTab === 'resume' && (
                    <div className="admin-fields">
                      <div className="admin-resume-section">
                        {resumeMeta ? (
                          <div className="admin-resume-uploaded">
                            <div className="admin-resume-file-icon">
                              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                              </svg>
                            </div>
                            <div className="admin-resume-info">
                              <h4>{resumeMeta.name}</h4>
                              <p>{resumeMeta.size} • Uploaded {resumeMeta.uploadedAt}</p>
                            </div>
                            <div className="admin-resume-actions">
                              <a
                                href={getResumeURL()}
                                download={resumeMeta.name}
                                className="admin-resume-preview-btn"
                                title="Download"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                  <polyline points="7 10 12 15 17 10"/>
                                  <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                              </a>
                              <button className="admin-remove-btn" onClick={handleResumeRemove} title="Remove resume">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="admin-resume-empty">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                              <line x1="12" y1="11" x2="12" y2="17"/>
                              <line x1="9" y1="14" x2="15" y2="14"/>
                            </svg>
                            <p>No resume uploaded yet</p>
                          </div>
                        )}
                        <label className="admin-upload-btn">
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            style={{ display: 'none' }}
                          />
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <span>{resumeUploading ? 'Uploading...' : (resumeMeta ? 'Replace Resume' : 'Upload Resume PDF')}</span>
                        </label>
                        <p className="admin-resume-note">PDF only • Max 2MB</p>
                      </div>
                    </div>
                  )}

                  {/* ===== CONTACT TAB ===== */}
                  {activeTab === 'contact' && (
                    <div className="admin-fields">
                      <div className="admin-field">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={editData.contact.email}
                          onChange={(e) => updateField('contact', 'email', e.target.value)}
                        />
                      </div>
                      <div className="admin-field">
                        <label>Location</label>
                        <input
                          type="text"
                          value={editData.contact.location}
                          onChange={(e) => updateField('contact', 'location', e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {saveNotif && <div className="admin-save-notif">{saveNotif}</div>}

                <button className="btn btn-primary btn-full admin-save-btn" onClick={handleSave}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                  <span>Save Changes</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
