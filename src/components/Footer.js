import { config } from "../config.js"
import { i18n } from "../i18n.js"
import { getConnectLinks } from "./Home.js"

export function Footer() {

  const links = getConnectLinks();
  /* html */
  return `
    <footer>
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          <!-- Contact -->
          <div class="footer-section">
            <h4>${i18n('footer-contactTitle')}</h4>
            <div class="flex flex-col space-y-2 text-zinc-600 dark:text-gray-400">
              <a href="mailto:${config.personal.email}" class="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">${config.personal.email}</a>
              <a href="tel:+${config.personal.phone.replaceAll(" ","")}" class="hover:text-teal-500 dark:hover:text-teal-400 transition-colors">${config.personal.phone}</a>
              <p>${config.personal.location}</p>
            </div>
          </div>

          <!-- Social & Resume -->
          <div class="footer-section" >
            <h4>${i18n('footer-connect')}</h4>
            <div class="flex space-x-4 mb-4">
              ${links.map(item => LinkItem(item)).join('')} 
            </div>
            <a href="/downloads/${config['resume']['filename']}" download class="download-btn" title="${i18n('dl-resume-title')}">
              <svg class="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              ${i18n('footer-download-resume')}
            </a>
          </div>
        </div>

        <div class="text-center pt-8 border-t border-zinc-200 dark:border-white/10">
          <p class="text-zinc-600 dark:text-gray-400">© ${new Date().getFullYear()} ${config.personal.name}. ${i18n('footer-copyright')}.</p>
        </div>
      </div>
    </footer>
  `
}

function LinkItem(item) {
  /* html */
  return `
    <a href="${item.name}" target="_blank" rel="noopener noreferrer" class="social-link" title="${item.title}">
      ${item.iconSvg}
    </a>
  `
}