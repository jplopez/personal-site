/**
 * AIResponseProcessor
 * Owns the markdown → HTML conversion for all AI responses.
 *
 * process(text, template, cfg)
 *   text     — raw markdown string returned by the AI
 *   template — the markdown template that was embedded in the prompt (for context /
 *              future section-aware processing); may be null
 *   cfg      — { paragraphClass, headingClass, listClass } from RENDER_CONFIG in ai.js
 */

function toHtml(text, cfg) {
  return text
    .split('\n\n')
    .map(block => {
      block = block.trim();
      if (!block) return '';

      // Inline formatting
      block = block.replaceAll(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      block = block.replaceAll(/\*(.*?)\*/g,     '<em>$1</em>');

      // Block: heading (# / ## / ###) optionally followed by body text
      const headingMatch = /^#{1,3}\s+(.+)/.exec(block);
      if (headingMatch) {
        const heading = `<h4 class="${cfg.headingClass}">${headingMatch[1]}</h4>`;
        const rest = block.slice(block.indexOf('\n') + 1).trim();
        return rest
          ? heading + `<p class="${cfg.paragraphClass}">${rest.replaceAll('\n', '<br>')}</p>`
          : heading;
      }

      // Block: list (bullet or numbered)
      const lines = block.split('\n');
      const isList = lines.every(
        l => /^(?:[-\u2022*]|\d+\.)\s/.test(l.trim()) || l.trim() === ''
      );
      if (isList) {
        const items = lines
          .map(l => l.trim().replace(/^(?:[-\u2022*]|\d+\.)\s+/, ''))
          .filter(Boolean)
          .map(l => `<li>${l}</li>`)
          .join('');
        return `<ul class="${cfg.listClass}">${items}</ul>`;
      }

      // Block: paragraph
      return `<p class="${cfg.paragraphClass}">${block.replaceAll('\n', '<br>')}</p>`;
    })
    .join('');
}

export const AIResponseProcessor = {
  /**
   * @param {string}      text      Raw markdown from the AI
   * @param {string|null} template  Template used in the prompt (null = not available)
   * @param {{ paragraphClass: string, headingClass: string, listClass: string }} cfg
   * @returns {string}  Safe HTML string
   */
  process(text, template, cfg) {
    return toHtml(text, cfg);
  },
};
