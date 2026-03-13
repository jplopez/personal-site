// Internationalization (i18n) configuration
// Supported languages: English (en), Spanish (es)
// Translation strings are loaded from JSON files in /public/i18n/

const debug = false
let translations = {}
const supportedLanguages = new Set(['en', 'es'])

// Load translations from JSON files
async function loadTranslations(lang) {
  if (translations[lang]) {
    return translations[lang]
  }
  
  try {
    const response = await fetch(`/i18n/${lang}.json`)
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`)
    }
    translations[lang] = await response.json()
    
    if (debug) {
      console.log(`Loaded translations for ${lang}:`, Object.keys(translations[lang]).length, 'keys')
      Object.entries(translations[lang]).forEach(([key, value]) => {
        console.log(`${key} : ${value}`)
      })
    }

    return translations[lang]
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error)
    // Fallback to English if not already trying to load English
    if (lang !== 'en') {
      console.warn('Falling back to English translations')
      return loadTranslations('en')
    }
    return {}
  }
}

// Get current language from localStorage or default to English
export function getCurrentLanguage() {
  const saved = localStorage.getItem('language')
  return supportedLanguages.has(saved) ? saved : 'en'
}

// Set language and save to localStorage
export async function setLanguage(lang) {
  if (supportedLanguages.has(lang)) {
    localStorage.setItem('language', lang)
    await loadTranslations(lang)
    document.documentElement.setAttribute('lang', lang)
    return true
  }
  console.warn(`Unsupported language: ${lang}`)
  return false
}

// Get translation for a given key
export function i18n(key) {
  const lang = getCurrentLanguage()
  const value = translations[lang]?.[key]
  
  if (value === undefined) {
    console.warn(`Translation key not found: ${key} for language: ${lang}`)
    return key
  }
  return value
}

export function i18nFindWithPrefix(prefix = '', removePrefix=false) {
  const lang = getCurrentLanguage()
  if (!prefix || prefix.length==0) return translations[lang]
  const result = {}
  Object.entries(translations[lang])
      .forEach(([key, value]) => {
        if(key.startsWith(prefix+'-')) {
          let newKey = removePrefix? key.replace(prefix+'-','') : prefix
          result[newKey]=value
        }
      })
  return result;
}

export function i18nFind(...keys) {
  const result = {}
  if (keys.length > 0) {
    Object.entries(keys)
      .forEach(k => {
        let val = i18n(k)
        if(val) result[k] = val
      })
  }
  return result;
}

// Initialize language system - call this on app startup
export async function initLanguage() {
  const lang = getCurrentLanguage()
  await loadTranslations(lang)
  document.documentElement.setAttribute('lang', lang)
  if (debug) console.log("Language initialized: " + lang)
}

// Pre-register all language-specific component files so Vite bundles them.
// The glob patterns must be string literals; dynamic paths are looked up at runtime.
const _langComponentModules = {
  ...import.meta.glob('./components/**/*-en.js'),
  ...import.meta.glob('./components/**/*-es.js'),
}

// Dynamically import a language-specific component
// Usage: const AboutContent = await importComponent('./components/about/content')
// Will import: ./components/about/content-en.js or ./components/about/content-es.js
export async function importComponent(basePath) {
  const lang = getCurrentLanguage()
  const componentPath = `${basePath}-${lang}.js`

  const loader = _langComponentModules[componentPath]
  if (loader) {
    const module = await loader()
    return module.default || module
  }

  console.error(`Failed to import component: ${componentPath}`)

  // Fallback to English if specific language file doesn't exist
  if (lang !== 'en') {
    const fallbackPath = `${basePath}-en.js`
    const fallbackLoader = _langComponentModules[fallbackPath]
    if (fallbackLoader) {
      console.warn(`Falling back to: ${fallbackPath}`)
      const fallbackModule = await fallbackLoader()
      return fallbackModule.default || fallbackModule
    }
  }

  throw new Error(`Component not found: ${componentPath}`)
}