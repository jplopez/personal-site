import { i18n, getCurrentLanguage, setLanguage } from '../i18n.js'
import { config } from '../config.js'

export function Navigation() {
  /* html */
  return `
    <!-- Top Navigation -->
    <header>
      <div class="container">
        <div class="nav-container">
          <!-- Empty spacer for left side -->
          <div class="flex-1 "></div>
          
          <!-- Desktop Navigation Pill (Centered) -->
          <nav class="pointer-events-auto">
            <ul class="nav-pill">
              <li>
                <a href="/" class="nav-link" title="${i18n('nav-home-title')}">
                  ${i18n('nav-home')}
                </a>
              </li>
              <li>
                <a href="/career" class="nav-link" title="${i18n('nav-career-title')}">
                  ${i18n('nav-career')}
                </a>
              </li>
              <li>
                <a href="/job-fit" class="nav-link" title="${i18n('nav-jobfit-title')}">
                  ${i18n('nav-jobfit')}
                </a>
              </li> `

              // <li>
              //   <a href="/portfolio" class="nav-link" title="${i18n('nav-portfolio-title')}">
              //     ${i18n('nav-portfolio')}
              //   </a>
              // </li>
              + 
              /* html */
              `
              <li>
                <a href="/contact" class="nav-link" title="${i18n('nav-contact-title')}">
                  ${i18n('nav-contact')}
                </a>
              </li>
              <li class="my-2 mx-1 md:mx-2 border"> </li>
              <li>
                <a href="/downloads/${config['resume']['filename']}" download 
                    class="nav-link text-accent" title="${i18n('dl-resume-title')}">
                      ${i18n('nav-downloadResume')}
                  <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </nav>

          <!-- Theme & Language Toggles (Right side) -->
          <div class="flex-1 flex justify-end gap-2">

            <button id="theme-toggle" type="button" aria-label="Toggle theme" 
              class="toggle-btn transition-all hover:ring-2 hover:ring-teal-500/50">
              <!-- light theme icon -->
              <svg viewBox="0 0 24 24" aria-hidden="true" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"  
                  class="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600">
                <path d="M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"></path>
                <path d="M12.25 3v1.5M21.5 12.25H20M18.791 18.791l-1.06-1.06M18.791 5.709l-1.06 1.06M12.25 20v1.5M4.5 12.25H3M6.77 6.77 5.709 5.709M6.77 17.73l-1.061 1.061" fill="none"></path>
              </svg>
              <!-- dark theme icon -->
              <svg viewBox="0 0 24 24" aria-hidden="true" 
                  class="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400">
                <path d="M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z" 
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>

            <button id="lang-en" type="button" aria-label="Switch to English" 
              class="toggle-btn transition-all ${getCurrentLanguage() === 'en' ? 'ring-2 ring-teal-500 shadow-lg shadow-teal-500/50' : 'opacity-60 hover:opacity-100'}">
              EN
            </button>
            <button id="lang-es" type="button" aria-label="Cambiar a Español" 
              class="toggle-btn transition-all ${getCurrentLanguage() === 'es' ? 'ring-2 ring-teal-500 shadow-lg shadow-teal-500/50' : 'opacity-60 hover:opacity-100'}">
              ES
            </button>
          </div>
        </div>

      </div>
    </header>
  `
}

export function initializeNavigation() {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const html = document.documentElement
      const isDark = html.classList.contains("dark")

      if (isDark) {
        html.classList.remove("dark")
        html.style.colorScheme = "light"
        localStorage.theme = "light"
      } else {
        html.classList.add("dark")
        html.style.colorScheme = "dark"
        localStorage.theme = "dark"
      }
    })
  }

  // Language toggle functionality
  const langEnBtn = document.getElementById("lang-en")
  const langEsBtn = document.getElementById("lang-es")

  if (langEnBtn) {
    langEnBtn.addEventListener("click", () => {
      if (getCurrentLanguage() !== 'en') {
        setLanguage('en')
        document.documentElement.setAttribute('lang', 'en')
        globalThis.location.reload()
      }
    })
  }

  if (langEsBtn) {
    langEsBtn.addEventListener("click", () => {
      if (getCurrentLanguage() !== 'es') {
        setLanguage('es')
        document.documentElement.setAttribute('lang', 'es')
        globalThis.location.reload()
      }
    })
  }


  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll(".mobile-menu-link")
    mobileMenuLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden")
      })
    })
    for (const link of mobileMenuLinks) {
      link.addEventListener('click', mobileMenu)
    }

    mobileMenuButton.addEventListener('click', mobileMenu)
    mobileMenu.addEventListener('click', mobileMenu)
    // menuOverlay.addEventListener('click', mobileMenu)

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.add("hidden")
      }
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    })
  })



}
