/**
 * Prompt builder functions for each AI use-case.
 *
 * Each builder:
 *  1. Fetches the markdown template from public/ai/prompts/<type>-<lang>.md
 *  2. Appends it to the base question so the AI knows the expected structure
 *  3. Returns { prompt, template } — the component passes `template` on to
 *     renderAIResponse() so the processor has the full context
 *
 * To change the response structure, edit the .md files — no JS changes needed.
 */

const _templateCache = new Map();
const TEMPLATE_TYPES = ['skill', 'career', 'jobfit'];
const TEMPLATE_LANGS = ['en', 'es'];

/**
 * Fetches and caches a prompt template from public/ai/prompts/.
 * Returns null if the file is unavailable (graceful degradation).
 * @param {'skill'|'career'|'jobfit'} type
 * @param {string} lang  'en' | 'es'
 * @returns {Promise<string|null>}
 */
export async function readPromptTemplate(type, lang) {
  const key = `${type}-${lang}`;
  if (_templateCache.has(key)) return _templateCache.get(key);
  try {
    const res = await fetch(`/ai/prompts/${key}.md`);
    if (!res.ok) return null;
    const content = await res.text();
    _templateCache.set(key, content);
    return content;
  } catch {
    return null;
  }
}

/**
 * Eagerly fetches all prompt templates in parallel so they are cached before
 * the first user interaction. Call this once at app startup.
 * @returns {Promise<void>}
 */
export function prefetchPromptTemplates() {
  const fetches = TEMPLATE_TYPES.flatMap(type =>
    TEMPLATE_LANGS.map(lang => readPromptTemplate(type, lang))
  );
  return Promise.all(fetches).then(() => {});
}

/**
 * Prompt for the Skills section.
 * @param {string} skill
 * @param {string} lang  'en' | 'es'
 * @returns {Promise<{ prompt: string, template: string|null }>}
 */
export async function buildSkillPrompt(skill, lang) {
  const template = await readPromptTemplate('skill', lang);
  const question = lang === 'es'
    ? `Cuéntame sobre una ocasión en la que Juan Pablo demostró la habilidad de: ${skill}`
    : `Tell me about a time where Juan Pablo demonstrated the skill: ${skill}`;
  const prompt = template ? `${question}\n\n${template}` : question;
  return { prompt, template };
}

/**
 * Prompt for the Career section.
 * @param {string}      title  Highlight title as shown on the card
 * @param {string|null} body   Optional supporting detail already visible on the card
 * @param {string}      lang   'en' | 'es'
 * @returns {Promise<{ prompt: string, template: string|null }>}
 */
export async function buildCareerPrompt(title, body, lang) {
  const template = await readPromptTemplate('career', lang);
  const suffix = body ? `. ${body}` : '';
  const question = lang === 'es'
    ? `Cuéntame más sobre: "${title}"${suffix}`
    : `Tell me more about Juan Pablo's "${title}"${suffix}`;
  const prompt = template ? `${question}\n\n${template}` : question;
  return { prompt, template };
}

/**
 * Prompt for the Job Fit section.
 * @param {string} jobDescription  Raw text pasted by the visitor
 * @param {string} lang  'en' | 'es'
 * @returns {Promise<{ prompt: string, template: string|null }>}
 */
export async function buildJobFitPrompt(jobDescription, lang) {
  const template = await readPromptTemplate('jobfit', lang);
  const question = lang === 'es'
    ? `Por favor analiza la compatibilidad entre el perfil de Juan Pablo Lopez y la siguiente descripción de trabajo:\n\n${jobDescription}`
    : `Please analyze the fit between Juan Pablo Lopez's profile and the following job description:\n\n${jobDescription}`;
  const prompt = template ? `${question}\n\n${template}` : question;
  return { prompt, template };
}
