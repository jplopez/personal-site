import { getCurrentLanguage } from './i18n.js';
import { config } from './config.js'
import { AIResponseProcessor } from './ai-response-processor.js'
/**
 * Sends a prompt to the AI serverless function and returns the response text.
 * @param {string} userPrompt
 * @returns {Promise<string>}
 */
export async function askAI(userPrompt) {
  //console.log("askAI - Start")
  let path = config['api']['aipath'] ;

  console.log("askAI - path: " + path)
  console.log("askAI - userPrompt (" + userPrompt.length + " chars) :")
  // console.log(userPrompt)
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      prompt: userPrompt,
      language: getCurrentLanguage(),
    }),
  });
  //console.log("askAI - Received response")

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status}`);
  }

  const data = await response.json();
  //console.log("askAI - returning")

  return data.text;
}

/**
 * Per-use-case rendering configuration.
 * Edit the CSS class names here to style AI output differently for each feature.
 * Each key corresponds to the `type` argument passed to renderAIResponse().
 */
const RENDER_CONFIG = {
  skill: {
    paragraphClass: 'ai-response-paragraph',
    headingClass:   'ai-response-heading',
    listClass:      'ai-response-list',
  },
  career: {
    paragraphClass: 'ai-response-paragraph',
    headingClass:   'ai-response-heading',
    listClass:      'ai-response-list',
  },
  jobfit: {
    paragraphClass: 'ai-response-paragraph ai-response-paragraph--jobfit',
    headingClass:   'ai-response-heading ai-response-heading--jobfit',
    listClass:      'ai-response-list ai-response-list--jobfit',
  },
  default: {
    paragraphClass: 'ai-response-paragraph',
    headingClass:   'ai-response-heading',
    listClass:      'ai-response-list',
  },
};

/**
 * Converts a plain-text AI response (with optional markdown) to safe HTML.
 * Delegates formatting to AIResponseProcessor.
 * @param {string}      text      Raw markdown text from the AI
 * @param {'skill'|'career'|'jobfit'|'default'} [type='default']
 * @param {string|null} [template=null]  The markdown template used in the prompt
 * @returns {string}
 */
export function renderAIResponse(text, type = 'default', template = null) {
  const cfg = RENDER_CONFIG[type] ?? RENDER_CONFIG.default;
  return AIResponseProcessor.process(text, template, cfg);
}
