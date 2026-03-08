# Shakeel Irfan — Portfolio

Personal portfolio website built with React 19, Vite 7, and Tailwind CSS v4 — featuring 3D effects, scroll animations, and a dark-themed design system.

## Features

- **Responsive Design** — Fully responsive across desktop, tablet, and mobile devices
- **Dark Theme** — Custom design system with purple/cyan/pink accent gradients and glass-morphism cards
- **3D Effects** — Floating geometric shapes (cube, pyramid, octahedron), mouse-parallax on hero section, and a reusable 3D tilt hook
- **Scroll Animations** — IntersectionObserver-based reveal animations on all sections
- **Animated Background** — Floating gradient orbs with blur effects
- **Typing Effect** — Auto-typing text cycling through specialties in the hero section
- **Admin Panel** — Client-side CMS for editing content (skills, projects, certifications, bio, resume) via localStorage

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Intro with typing animation, profile photo with parallax, stat counters |
| **About** | Bio, highlight cards, and quick-info glass card |
| **Skills** | Technology grid (Python, Java, JavaScript, React, HTML5, CSS3, TailwindCSS, Bash, Figma) |
| **Projects** | Featured project cards with GitHub links and status badges |
| **Certifications** | Credential cards with issuer, tags, and verification links |
| **Resume** | Downloadable PDF resume card |
| **Contact** | Contact info, social links, and a message form |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| Styling | Tailwind CSS v4 + Custom CSS |
| Fonts | Inter, Space Grotesk (Google Fonts) |
| Linting | ESLint 9 |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/irfanshakeel1094/Portfolio.git
cd Portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment.

## Deployment

This project can be deployed to any static hosting platform:

- **Vercel** — Connect the GitHub repo and deploy automatically
- **Netlify** — Connect the GitHub repo or drag-and-drop the `dist/` folder
- **GitHub Pages** — Add `base: '/Portfolio/'` to `vite.config.js` and deploy the `dist/` folder

## Project Structure

```
├── public/
│   ├── resume.pdf
│   └── vite.svg
├── src/
│   ├── assets/images/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── Hero.jsx / .css
│   │   ├── About.jsx / .css
│   │   ├── Skills.jsx / .css
│   │   ├── Projects.jsx / .css
│   │   ├── Certifications.jsx / .css
│   │   ├── Resume.jsx / .css
│   │   ├── Contact.jsx / .css
│   │   ├── Footer.jsx / .css
│   │   ├── AdminPanel.jsx / .css
│   │   └── Effects3D.jsx / .css
│   ├── App.jsx / .css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

## License

© 2026 Shakeel Irfan A R. All rights reserved.
