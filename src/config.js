// Global configuration for personal portfolio
export const config = {
  // Personal Information

  personal: {
    name: "Juan Pablo Lopez",
    title: "Software & Game Developer",
    email: "jp.lopez.navarro@gmail.com",
    phone: "+1 206 619 1071",
    location: "Seattle, Washington. United States",
    bio: "I'm Juan Pablo, a software and game developer based in Seattle. I build innovative applications, create immersive games, and love solving complex problems with elegant solutions."
  },

  // Social Media Links
  social: {
    github: "https://github.com/jplopez",
    linkedin: "https://linkedin.com/in/jplopeznavarro",
    email: "mailto:jp.lopez.navarro@gmail.com",
    itch: "https://jplopez.itch.io"
  },

  // Resume
  resume: {
    path: "downloads",
    filename: "JuanPabloLopez.pdf"
  },

  // Contact Form
  // Sign up at https://formspree.io, create a new form, and paste your endpoint URL here.
  formspree: {
    endpoint: 'https://formspree.io/f/xzdjgrwv'
  },

  // Navigation Items
  navigation: [
    { label: "About", href: "/about" },
    { label: "Articles", href: "#articles" },
    { label: "Projects", href: "/projects" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" }
  ]
}
