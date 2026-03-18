import { getCurrentLanguage } from './i18n.js';
import { config } from './config.js'
/**
 * Sends a prompt to the AI serverless function and returns the response text.
 * @param {string} userPrompt
 * @returns {Promise<string>}
 */
export async function askAI(userPrompt) {
  let path = config['api']['aipath'] ;
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      prompt: userPrompt,
      language: getCurrentLanguage(),
    }),
  });

  if (!response.ok) {
    throw new Error(`AI request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.text;
}

/**
 * Converts a plain-text AI response (with optional markdown) to safe HTML.
 * Supports: **bold**, # headings, and bullet/numbered lists.
 * @param {string} text
 * @returns {string}
 */
export function renderAIResponse(text) {
  return text
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      // Bold
      block = block.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

      // Heading
      const headingMatch = /^#{1,3}\s+(.+)/.exec(block);
      if (headingMatch) {
        return `<h4 class="ai-response-heading">${headingMatch[1]}</h4>`;
      }

      // List (bullet or numbered)
      const lines = block.split('\n');
      const isList = lines.every(l => /^(?:[-\u2022*]|\d+\.)\s/.test(l.trim()) || l.trim() === '');

      if (isList) {
        const items = lines
          .map(l => l.trim().replace(/^(?:[-\u2022*]|\d+\.)\s+/, ''))
          .filter(Boolean)
          .map(l => `<li>${l}</li>`)
          .join('');
        return `<ul class="ai-response-list">${items}</ul>`;
      }

      return `<p>${block.replaceAll('\n', '<br>')}</p>`;
    })
    .join('');
}
