# Personal Portfolio - Workspace Instructions

## Project Overview
This is a personal portfolio website for a software and game developer. The site showcases professional work, projects, games, and provides contact information. Built with Vite and Tailwind CSS for modern, fast, and responsive design.

## Tech Stack
- **Build Tool**: Vite 7.2.2
- **CSS Framework**: Tailwind CSS
- **JavaScript**: Vanilla JS (ES6+)

## Development
- Run `npm run dev` to start the local development server at http://localhost:5173/
- The Dev Server task is configured in `.vscode/tasks.json`
- Tailwind CSS is configured with PostCSS for automatic compilation

## Project Structure
- `src/main.js` - Main application logic, hero section, and layout assembly
- `src/style.css` - Tailwind CSS imports
- `src/components/` - Modular component files:
  - `Navigation.js` - Sticky header with navigation and resume download
  - `About.js` - About section with bio, experience, education, skills
  - `Projects.js` - Featured software development projects
  - `Portfolio.js` - Games, libraries, and tools showcase
  - `Contact.js` - Contact form and social links
  - `Footer.js` - Footer with quick links and contact info
- `index.html` - HTML entry point
- `public/` - Static assets including resume.pdf
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration

## Key Features
- Fully responsive design (desktop, tablets, mobile)
- Sticky navigation with mobile slide-out menu
- Resume download accessible from multiple locations
- Smooth scrolling between sections
- Contact form and social media integration
- Modern gradient design with teal-to-blue theme

## Customization Points
- Personal information placeholders in all components (name, email, phone, location)
- Social media links (GitHub, LinkedIn, Twitter, Itch.io)
- Projects and portfolio items (games, libraries, tools)
- Experience and education details
- Skills and technologies
- Profile image/avatar
- Resume PDF file (add to `/public/resume.pdf`)

## Design System
- Primary gradient: teal-900 → blue-900 → slate-950
- Accent colors: teal-400, orange-400
- Hover states with smooth transitions
- Glass-morphism effects with backdrop-blur
- Responsive breakpoints: sm, md, lg (Tailwind defaults)
