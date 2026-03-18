import { getCurrentLanguage, i18n } from "../i18n"
import { achievements, achievements_es } from "./career/achievements.js"
import { highlights, highlights_es } from "./career/highlights.js"
import { askAI, renderAIResponse } from "../ai.js"
import { buildCareerPrompt } from "../prompts.js"

export function Career() {
  const careers = getCareersList();

  /* html */
  return `
    <section id="career">
      <h2>${i18n('career-title')}</h2>

      <h3 class="mt-12">${i18n('career-highlights-title')}</h3>
      <div class="career-highlights">
        ${getHighlightsList().map((h, i) => HighlightCard(h, i)).join('')}
      </div>
      <h3 class="mt-12">${i18n('career-timeline-title')}</h3>
      <div class="career-timeline">
        ${careers.map((career, i) => CareerEntry(career, i)).join('')}
      </div>
    </section>
  `
}

function HighlightCard(achievement, index) {
  const delay = index * 70;
  const card = AchievementCard(achievement, delay);
  return `<div class="highlight-item" style="transition-delay: ${delay}ms">${card}</div>`;
}

function CareerEntry(career, index) {
  const delay = index * 80;
  const endLabel = career.present ? i18n('work-to-present') : career.yearEnd;
  const careerAchievements = getCarrerAchievements(career.name) ?? [];

  if (careerAchievements.length === 0) return '';

  /* html */
  return `
    <div class="career-item" style="transition-delay: ${delay}ms">
      <div class="career-dot"></div>
      <div class="career-content">
        <div class="career-header">
          <span class="career-company">${career.name}</span>
          <span class="career-years">${career.yearStart} – ${endLabel}</span>
        </div>
        <p class="career-role">${career.role}</p>
        <div class="career-achievements">
          ${careerAchievements.map((a, i) => AchievementCard(a, i)).join('')}
        </div>
      </div>
    </div>
  `;
}

function escAttr(v) {
  return String(v ?? '').replaceAll(/<[^>]*>/g, '').replaceAll('&', '&amp;').replaceAll('"', '&quot;');
}

function AchievementCard(achievement, index) {
  const delay = index * 80;
  switch (achievement.type) {
    case 'stat':
      return `
        <div class="achievement-card achievement-stat"
          style="transition-delay: ${delay}ms">
          <span class="achievement-value">${achievement.value}</span>
          <span class="achievement-label">${achievement.label}</span>
          <button class="ai-card-ask-btn"
            data-ai-title="${escAttr(achievement.value + ' ' + achievement.label)}"
            data-ai-body="">${i18n('ai-card-ask')}</button>
          <div class="ai-card-panel hidden"></div>
        </div>`;
    case 'badge':
      return `
        <div class="achievement-card achievement-badge"
          style="transition-delay: ${delay}ms">
          ${achievement.text}
          <button class="ai-card-ask-btn"
            data-ai-title="${escAttr(achievement.text)}"
            data-ai-body="">${i18n('ai-card-ask')}</button>
          <div class="ai-card-panel hidden"></div>
        </div>`;
    case 'link':
      return `
        <a href="${achievement.url}" class="achievement-card achievement-link" style="transition-delay: ${delay}ms" target="_blank" rel="noopener">
          ${achievement.title}
        </a>`;
    default: // text
      return `
        <div class="achievement-card achievement-text"
          style="transition-delay: ${delay}ms">
          <p class="achievement-title">${achievement.title}</p>
          <p class="achievement-body">${achievement.body}</p>
          <button class="ai-card-ask-btn"
            data-ai-title="${escAttr(achievement.title)}"
            data-ai-body="${escAttr(achievement.body)}">${i18n('ai-card-ask')}</button>
          <div class="ai-card-panel hidden"></div>
        </div>`;
  }
}

export function initializeCareer() {
  const revealOnScroll = (selector) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  };

  revealOnScroll('.career-item');
  revealOnScroll('.highlight-item');

  // AI click handlers for achievement cards
  document.querySelectorAll('.ai-card-ask-btn').forEach(btn => {
    btn.addEventListener('click', () => onAchievementClick(btn));
  });
}

async function onAchievementClick(btn) {
  const title = btn.dataset.aiTitle;
  const body  = btn.dataset.aiBody || '';
  if (!title) return;

  const panel = btn.nextElementSibling; // .ai-card-panel sibling
  if (!panel) return;

  // Disable the button while loading, restore on error
  btn.disabled = true;

  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="ai-panel-loading">
      <span class="ai-panel-spinner"></span>
      ${i18n('ai-loading')}
    </div>
  `;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const lang = getCurrentLanguage();
  const { prompt, template } = await buildCareerPrompt(title, body, lang);

  try {
    const text = await askAI(prompt);
    panel.innerHTML = `<div class="ai-panel-content">${renderAIResponse(text, 'career', template)}</div>`;
  } catch {
    panel.innerHTML = `<p class="ai-panel-error">${i18n('ai-error')}</p>`;
    btn.disabled = false;
  }
}

function getHighlightsList() {
  let curLang = getCurrentLanguage();
  if (curLang == "es") return highlights_es;
  if (curLang == "en") return highlights;
  return highlights; // default is EN
}

function getCareersList() { 
  return [
    {
      name: "Ameba Games Studio", 
      role: "Founder",
      yearStart: 2024,
      yearEnd: 0,
      present: true 
    },
    {
      name: "Amazon Music", 
      role: "Engineering Excellence",
      yearStart: 2022,
      yearEnd: 2024,
      present: false 
    },
    {
      name: "Amazon Fashion Tech", 
      role: "Virtual Try-On",
      yearStart: 2021,
      yearEnd: 2022,
      present: false 
    },
    {
      name: "Amazon Advertising", 
      role: "Advertising Console",
      yearStart: 2015,
      yearEnd: 2021,
      present: false 
    },
      {
      name: "Banco de Chile / El Mercurio / I2B", 
      role: "Lead Developer",
      yearStart: 2009,
      yearEnd: 2015,
      present: false 
    },
  ];
}

function getCarrerAchievements(careerName) {
  return getAchievementsList()[careerName]
}

function getAchievementsList() {
  let curLang = getCurrentLanguage();
  if (curLang == "es") return achievements_es;
  if (curLang == "en") return achievements;
  return achievements; // default is EN
}