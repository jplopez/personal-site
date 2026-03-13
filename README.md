# Personal Portfolio Website

A modern, responsive portfolio website showcasing software development and game development work.

## Overview
This personal portfolio site features a clean, professional design with sections for:
- **About Me**: Background, experience, education, and skills
- **Projects**: Featured software development projects
- **Portfolio**: Games, libraries, and tools created or contributed to
- **Contact**: Multiple ways to get in touch, with a contact form and social links

## Features

- ✨ Fully responsive design (desktop, tablets, mobile)
- 🎨 Modern gradient design with smooth animations
- 📱 Mobile-friendly navigation with slide-out menu
- 📄 Resume download accessible from navigation and footer
- 🔗 Social media integration (GitHub, LinkedIn, Twitter, Itch.io)
- 📧 Contact form and direct contact information
- ⚡ Smooth scrolling between sections
- 🎯 Sticky navigation header

## Tech Stack

- **Build Tool**: Vite 7.2.2
- **CSS Framework**: Tailwind CSS
- **JavaScript**: Vanilla JS (ES6+)

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:

**Option A: Using VS Code Task (Recommended)**
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Tasks: Run Task"
   - Select "Dev Server"
   - The server will start in the background

**Option B: Using Terminal**
```bash
npm run dev
```

The site will be available at `http://localhost:5173/`

### Running in VS Code

The easiest way to run the site is using the pre-configured VS Code task:

1. Open the project in VS Code
2. Press `Ctrl+Shift+P` to open the Command Palette
3. Type "Run Task" and select "Tasks: Run Task"
4. Choose "Dev Server" from the list
5. The development server will start and you can view the site at `http://localhost:5173/`

To stop the server, close the terminal or press `Ctrl+C` in the terminal running the task.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── src/
│   ├── main.js              # Main application logic and layout
│   ├── style.css            # Tailwind CSS imports
│   └── components/
│       ├── Navigation.js    # Header navigation with resume download
│       ├── About.js         # About section with bio, experience, education
│       ├── Projects.js      # Featured software projects
│       ├── Portfolio.js     # Games, libraries, and tools showcase
│       ├── Contact.js       # Contact form and information
│       └── Footer.js        # Footer with links and social media
├── public/
│   ├── resume.pdf          # Your resume (replace with actual file)
│   ├── images/             # Image assets
│   └── fonts/              # Custom fonts
├── index.html              # HTML entry point
├── tailwind.config.js      # Tailwind configuration
└── postcss.config.js       # PostCSS configuration
```

## Customization

### Personal Information
Update the following placeholders in the components:

1. **Navigation.js**: Replace "Your Name" with your actual name
2. **About.js**: 
   - Update bio, experience, education, and skills
   - Replace profile emoji or add an actual image
3. **Projects.js**: Add your actual projects with descriptions and links
4. **Portfolio.js**: Add your games, libraries, and tools
5. **Contact.js**: 
   - Replace email: `your.email@example.com`
   - Replace phone: `+1 (234) 567-890`
   - Replace location: `City, Country`
   - Update social media links (GitHub, LinkedIn, Twitter, Itch.io)
6. **Footer.js**: Update all contact information and social links

### Resume
Replace the placeholder `public/resume.pdf` with your actual resume PDF file.

### Colors & Theme
The site uses a teal-to-blue gradient theme. To customize:
- Edit gradient colors in Tailwind classes (e.g., `from-teal-900 via-blue-900 to-slate-950`)
- Update accent colors (currently `teal-400`, `orange-400`, etc.)

### Images
- Add a profile photo by replacing the emoji in About.js
- Add project screenshots in the Projects and Portfolio sections
- Update favicon in `public/images/`

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License
MIT License - Feel free to use this template for your own portfolio!

---

Built with ❤️ using Vite and Tailwind CSS
- Add your own images and assets to the `public/` folder

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy to any static hosting service.

## License

© 2025 Ameba Games Studio. All rights reserved.
