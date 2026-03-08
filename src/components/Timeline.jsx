import './Timeline.css';

const timelineItems = [
  {
    year: '2024 — Present',
    title: 'B.Tech Computer Science & Engineering',
    subtitle: 'SRM Institute of Science and Technology (SRMIST), Chennai',
    description: 'Pursuing a Bachelor\'s degree in CSE with focus on Full Stack Development, Cybersecurity, and AI/ML applications.',
    type: 'education',
    color: '#8b5cf6',
  },
  {
    year: '2024 — Present',
    title: 'Technical Team Member',
    subtitle: 'Eleet SRMIST',
    description: 'Collaborating with fellow developers on innovative projects, contributing to hackathons, and building technical solutions.',
    type: 'experience',
    color: '#06b6d4',
  },
  {
    year: '2023 — 2024',
    title: 'Self-Taught Developer',
    subtitle: 'Online Platforms & Open Source',
    description: 'Completed multiple certifications in Python, Web Development, Cybersecurity, ML, and SQL through Coursera, Udemy, and freeCodeCamp.',
    type: 'education',
    color: '#22c55e',
  },
  {
    year: '2022 — 2024',
    title: 'Higher Secondary Education',
    subtitle: 'Tamil Nadu, India',
    description: 'Completed HSC with a strong foundation in Mathematics and Computer Science, sparking a passion for programming.',
    type: 'education',
    color: '#ec4899',
  },
];

function TimelineIcon({ type }) {
  if (type === 'experience') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 12 3 12 0v-5"/>
    </svg>
  );
}

export default function Timeline() {
  return (
    <section className="section timeline" id="timeline">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">My Journey</span>
          <h2 className="section-title">
            Education & <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">The milestones that shaped my career</p>
        </div>
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>
          {timelineItems.map((item, i) => (
            <div
              key={item.title + i}
              className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'} reveal`}
              style={{ '--delay': `${i * 0.15}s`, '--tl-color': item.color }}
            >
              <div className="timeline-dot">
                <TimelineIcon type={item.type} />
              </div>
              <div className="timeline-card">
                <span className="timeline-year">{item.year}</span>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.description}</p>
                <span className={`timeline-type ${item.type}`}>
                  {item.type === 'education' ? 'Education' : 'Experience'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
