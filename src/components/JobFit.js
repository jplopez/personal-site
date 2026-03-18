import { i18n, importComponent, getCurrentLanguage } from '../i18n.js'
import { askAI, renderAIResponse } from '../ai.js'

// Localized intro for about section
const JobFitText = await importComponent('./components/jobfit/content')

const MAX_CHARS = 4800;

export function JobFit() {
  /* html */
  return `
    <section id="jobfit">
      <h2>${i18n('jobfit-title')}</h2>
      <div class="style-paragraph max-w-prose mx-auto mt-2"> ${JobFitText()} </div>

      <div class="jobfit-form">
        <div class="relative">
          <textarea
            id="jobfit-input"
            class="jobfit-textarea"
            placeholder="${i18n('jobfit-placeholder')}"
            rows="10"
            spellcheck="false"
          ></textarea>
          <div id="jobfit-char-counter" class="flex items-center justify-between mt-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <span id="jobfit-char-hint" class="hidden text-amber-600 dark:text-amber-400">
              ${i18n('jobfit-char-hint').replace('{{max}}', MAX_CHARS.toLocaleString())}
            </span>
            <span class="ml-auto" id="jobfit-char-count">0 / ${MAX_CHARS.toLocaleString()}</span>
          </div>
        </div>
        <button id="jobfit-submit" class="jobfit-submit-btn">
          ${i18n('jobfit-submit')}
        </button>
      </div>
      ...
    </section>
  `
}


export function initializeJobFit() {
    const submitBtn  = document.getElementById('jobfit-submit')
  const input      = document.getElementById('jobfit-input')
  const result     = document.getElementById('jobfit-result')
  const indicator  = document.getElementById('jobfit-indicator')
  const responseEl = document.getElementById('jobfit-response')
  const charCount  = document.getElementById('jobfit-char-count')
  const charHint   = document.getElementById('jobfit-char-hint')

  if (!submitBtn || !input) return

  input.addEventListener('input', () => {
    const len = input.value.length
    charCount.textContent = `${len.toLocaleString()} / ${MAX_CHARS.toLocaleString()}`
    const over = len > MAX_CHARS
    charCount.classList.toggle('text-amber-600', over)
    charCount.classList.toggle('dark:text-amber-400', over)
    charHint.classList.toggle('hidden', !over)
  })
  

  submitBtn.addEventListener('click', () => runJobFitAnalysis({
    submitBtn, input, result, indicator, responseEl
  }))

  // Also allow Ctrl+Enter to submit
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      runJobFitAnalysis({ submitBtn, input, result, indicator, responseEl })
    }
  })
}

async function runJobFitAnalysis({ submitBtn, input, result, indicator, responseEl }) {
  const jobDescription = input.value.trim()
  if (!jobDescription) return

  submitBtn.disabled = true
  submitBtn.textContent = i18n('jobfit-analyzing')
  result.classList.add('hidden')

  const lang = getCurrentLanguage()
  const prompt = lang === 'es'
    ? `Por favor analiza la compatibilidad entre el perfil de Juan Pablo Lopez y la siguiente descripci\u00f3n de trabajo:\n\n${jobDescription}`
    : `Please analyze the fit between Juan Pablo Lopez's profile and the following job description:\n\n${jobDescription}`

  try {
    const text = await askAI(prompt)

    // Parse fit level from first line
    const firstLine = text.split('\n')[0].trim()
    let fitLevel = 'medium'
    let fitLabel = i18n('jobfit-medium')
    if (/^FIT:\s*HIGH/i.test(firstLine)) {
      fitLevel = 'high'
      fitLabel = i18n('jobfit-high')
    } else if (/^FIT:\s*LOW/i.test(firstLine)) {
      fitLevel = 'low'
      fitLabel = i18n('jobfit-low')
    }

    const bodyText = text.replace(/^FIT:\s*(HIGH|MEDIUM|LOW)[^\n]*\n?/i, '').trim()

    indicator.className = `jobfit-indicator jobfit-indicator--${fitLevel}`
    indicator.textContent = fitLabel
    responseEl.innerHTML = renderAIResponse(bodyText)
    result.classList.remove('hidden')
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  } catch {
    indicator.className = 'jobfit-indicator jobfit-indicator--error'
    indicator.textContent = ''
    responseEl.innerHTML = `<p class="ai-panel-error">${i18n('jobfit-error')}</p>`
    result.classList.remove('hidden')
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = i18n('jobfit-submit')
  }
}
