// Helper to load admin data from localStorage
export function getAdminData() {
  try {
    const saved = localStorage.getItem('portfolio_admin_data');
    if (saved) return JSON.parse(saved);
  } catch { /* ignore */ }
  return null;
}

// Helper to get the resume URL (uploaded or default)
export function getResumeURL() {
  try {
    const data = localStorage.getItem('portfolio_resume_pdf');
    if (data) return data;
  } catch { /* ignore */ }
  return '/resume.pdf';
}

// Helper to get resume metadata
export function getResumeMeta() {
  try {
    const meta = localStorage.getItem('portfolio_resume_meta');
    if (meta) return JSON.parse(meta);
  } catch { /* ignore */ }
  return null;
}
