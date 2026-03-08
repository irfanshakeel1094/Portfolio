import './Services.css';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: 'Full Stack Development',
    description: 'Building end-to-end web applications with React, Express, Django, and modern frameworks — from responsive frontends to robust backends.',
    color: '#8b5cf6',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Cybersecurity Solutions',
    description: 'Developing security tools, performing vulnerability analysis, and building secure applications with best practices in mind.',
    color: '#22c55e',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'AI & Machine Learning',
    description: 'Building intelligent applications using Python, NumPy, Pandas, and ML frameworks to solve real-world problems with data.',
    color: '#ec4899',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Crafting beautiful, intuitive user interfaces with Figma and translating designs into pixel-perfect responsive layouts.',
    color: '#06b6d4',
  },
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">What I Do</span>
          <h2 className="section-title">
            Services I <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle">Turning complex problems into elegant solutions</p>
        </div>
        <div className="services-grid">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card reveal"
              style={{ '--delay': `${i * 0.1}s`, '--service-color': service.color }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
