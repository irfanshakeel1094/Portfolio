import { useState, useEffect } from 'react';
import './Contact.css';
import { getAdminData } from './adminUtils';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [contactData, setContactData] = useState(() => {
    const data = getAdminData();
    return { email: 'irfanshakeel1094@gmail.com', phone: '+91 98423 99132', location: 'Chennai, Tamil Nadu, India', ...data?.contact };
  });

  useEffect(() => {
    const handleUpdate = () => {
      const data = getAdminData();
      if (data?.contact) setContactData(data.contact);
    };
    window.addEventListener('adminDataUpdated', handleUpdate);
    return () => window.removeEventListener('adminDataUpdated', handleUpdate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');

    const formData = new FormData(e.target);
    formData.append('access_key', 'b9238913-cb79-445d-a5d3-aa17e48ffffa'); // TODO: Replace with your Web3Forms access key from https://web3forms.com

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        e.target.reset();
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again later.');
    }
    setSending(false);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle">Have a project in mind? Let's make it happen</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h4>Email</h4>
                <p>{contactData.email}</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h4>Location</h4>
                <p>{contactData.location}</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <h4>Phone</h4>
                <p>{contactData.phone}</p>
              </div>
            </div>
            <div className="social-links">
              <a href="https://github.com/irfanshakeel1094" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/shakeel-irfan-a-r-832501368" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href={`mailto:${contactData.email}`} className="social-link" aria-label="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
          <div className="contact-form-wrapper reveal" style={{ '--delay': '0.2s' }}>
            {submitted ? (
              <div className="success-container form-submitted-visible">
                <div className="form-success">
                  <div className="success-particles">
                    {[...Array(12)].map((_, i) => (
                      <span key={i} className="particle particle-animate" style={{ '--i': i }} />
                    ))}
                  </div>
                  <div className="success-icon success-icon-animate">
                    <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="success-circle-svg">
                      <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.5" className="success-circle success-circle-animate" />
                      <polyline points="8 12 11 15 16 9" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="success-check success-check-animate" />
                    </svg>
                  </div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
                  <div className="success-divider success-divider-animate"></div>
                  <button className="btn btn-outline success-btn success-btn-animate" onClick={() => setSubmitted(false)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    <span>Send Another Message</span>
                  </button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h3 className="form-title">Let's Connect</h3>
                <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                <input type="hidden" name="subject" value="New message from Portfolio" />
                {error && <div className="form-error">{error}</div>}
                <div className="form-group">
                  <input type="text" id="name" name="name" placeholder=" " required />
                  <label htmlFor="name">Your Name</label>
                  <div className="form-line"></div>
                </div>
                <div className="form-group">
                  <input type="email" id="email" name="email" placeholder=" " required />
                  <label htmlFor="email">Your Email</label>
                  <div className="form-line"></div>
                </div>
                <div className="form-group">
                  <input type="text" id="subject" name="subject_line" placeholder=" " required />
                  <label htmlFor="subject">Subject</label>
                  <div className="form-line"></div>
                </div>
                <div className="form-group">
                  <textarea id="message" name="message" rows="5" placeholder=" " required></textarea>
                  <label htmlFor="message">Your Message</label>
                  <div className="form-line"></div>
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={sending}>
                  <span>{sending ? 'Sending...' : 'Send Message'}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
