import { i18n } from '../i18n.js'
import { config } from '../config.js'

export function Contact() {
  /* html */
  return `
  <section id="contact">
    <div class="horizontal-line">
      <div class="container">
        <h3>${i18n('contact-title')}</h3>
        <p class="style-paragraph">${i18n('contact-subtitle')}</p>
        <div class="form-container">
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-field">
              <label for="contact-name">${i18n('contact-form-name')}</label>
              <input type="text" id="contact-name" name="name"
                placeholder="${i18n('contact-form-name')}" autocomplete="name" />
              <span class="field-error" id="name-error" role="alert"></span>
            </div>
            <div class="form-field">
              <label for="contact-email">${i18n('contact-form-email')}</label>
              <input type="email" id="contact-email" name="email"
                placeholder="${i18n('contact-form-email')}" autocomplete="email" />
              <span class="field-error" id="email-error" role="alert"></span>
            </div>
            <div class="form-field">
              <label for="contact-message">${i18n('contact-form-message')}</label>
              <textarea id="contact-message" name="message" rows="5"
                placeholder="${i18n('contact-form-message')}"></textarea>
              <span class="field-error" id="message-error" role="alert"></span>
            </div>
            <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
            <button type="submit" id="contact-submit" class="contact-submit-btn">
              ${i18n('contact-form-send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
  `
}

// --- Validation helpers ---

const DANGEROUS_TAGS   = /<\s*(script|iframe|object|embed|link|meta|svg)/i
const JS_PROTOCOL      = /javascript\s*:/i
const DATA_HTML        = /data\s*:\s*text\/html/i
const INLINE_HANDLER   = /\bon\w+\s*=/i

function sanitizeInput(value) {
  if (DANGEROUS_TAGS.test(value) || JS_PROTOCOL.test(value) ||
      DATA_HTML.test(value)      || INLINE_HANDLER.test(value)) return null
  return value.replaceAll(/<[^>]*>/g, '').trim()
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
}

// --- UI helpers ---

function showError(errorId, message) {
  const errorEl = document.getElementById(errorId)
  const inputId = 'contact-' + errorId.replace('-error', '')
  const inputEl = document.getElementById(inputId)
  if (errorEl) { errorEl.textContent = message; errorEl.classList.add('visible') }
  if (inputEl) inputEl.classList.add('invalid')
}

function clearError(errorId) {
  const errorEl = document.getElementById(errorId)
  const inputId = 'contact-' + errorId.replace('-error', '')
  const inputEl = document.getElementById(inputId)
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('visible') }
  if (inputEl) inputEl.classList.remove('invalid')
}

// --- Location ---

async function getLocationInfo() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) })
    if (!res.ok) throw new Error('ip lookup failed')
    const data = await res.json()
    const parts = [data.city, data.region, data.country_name].filter(Boolean)
    return `${parts.join(', ')} (IP: ${data.ip || 'unknown'})`
  } catch {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    return `Timezone: ${tz} | Language: ${navigator.language || 'unknown'}`
  }
}

// --- Form initialization ---

export function initializeContact() {
  const form = document.getElementById('contact-form')
  if (!form) return

  // Real-time validation on blur
  document.getElementById('contact-name')?.addEventListener('blur', () => {
    const val = document.getElementById('contact-name').value
    if (!val.trim()) showError('name-error', i18n('contact-error-name-required'))
    else if (sanitizeInput(val) === null) showError('name-error', i18n('contact-error-injection'))
    else clearError('name-error')
  })

  document.getElementById('contact-email')?.addEventListener('blur', () => {
    const val = document.getElementById('contact-email').value
    if (!val.trim()) showError('email-error', i18n('contact-error-email-required'))
    else if (!validateEmail(val)) showError('email-error', i18n('contact-error-email-invalid'))
    else if (sanitizeInput(val) === null) showError('email-error', i18n('contact-error-injection'))
    else clearError('email-error')
  })

  document.getElementById('contact-message')?.addEventListener('blur', () => {
    const val = document.getElementById('contact-message').value
    if (!val.trim()) showError('message-error', i18n('contact-error-message-required'))
    else if (sanitizeInput(val) === null) showError('message-error', i18n('contact-error-injection'))
    else clearError('message-error')
  })

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const nameInput    = document.getElementById('contact-name')
    const emailInput   = document.getElementById('contact-email')
    const messageInput = document.getElementById('contact-message')
    const submitBtn    = document.getElementById('contact-submit')
    const statusEl     = document.getElementById('form-status')

    clearError('name-error')
    clearError('email-error')
    clearError('message-error')
    statusEl.textContent = ''
    statusEl.className = 'form-status'

    let valid = true

    const name = sanitizeInput(nameInput.value)
    if (!nameInput.value.trim()) {
      showError('name-error', i18n('contact-error-name-required')); valid = false
    } else if (name === null) {
      showError('name-error', i18n('contact-error-injection')); valid = false
    }

    const email = emailInput.value.trim()
    if (!email) {
      showError('email-error', i18n('contact-error-email-required')); valid = false
    } else if (!validateEmail(email)) {
      showError('email-error', i18n('contact-error-email-invalid')); valid = false
    } else if (sanitizeInput(email) === null) {
      showError('email-error', i18n('contact-error-injection')); valid = false
    }

    const message = sanitizeInput(messageInput.value)
    if (!messageInput.value.trim()) {
      showError('message-error', i18n('contact-error-message-required')); valid = false
    } else if (message === null) {
      showError('message-error', i18n('contact-error-injection')); valid = false
    }

    if (!valid) return

    submitBtn.disabled = true
    submitBtn.textContent = i18n('contact-form-sending')
    statusEl.textContent = i18n('contact-form-fetching-location')
    statusEl.className = 'form-status info'

    const timestamp = new Date().toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' })
    const location  = await getLocationInfo()

    try {
      const res = await fetch(config.formspree.endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Personal Site: Contact from ${name}`,
          _replyto: email,
          location,
          timestamp,
        }),
      })

      if (res.ok) {
        statusEl.textContent = i18n('contact-form-success')
        statusEl.className = 'form-status success'
        form.reset()
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data?.errors?.map(err => err.message).join(' ') || i18n('contact-form-error')
        statusEl.textContent = msg
        statusEl.className = 'form-status error'
      }
    } catch {
      statusEl.textContent = i18n('contact-form-error')
      statusEl.className = 'form-status error'
    }

    submitBtn.disabled = false
    submitBtn.textContent = i18n('contact-form-send')
  })
}