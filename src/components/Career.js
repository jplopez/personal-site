import { getCurrentLanguage, i18n } from "../i18n"
import { achievements, achievements_es } from "./career/achievements.js"
import { highlights, highlights_es } from "./career/highlights.js"
import { askAI, renderAIResponse } from "../ai.js"

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
      <div id="highlights-ai-panel" class="ai-section-panel hidden"></div>

      <h3 class="mt-12">${i18n('career-timeline-title')}</h3>
      <div class="career-timeline">
        ${careers.map((career, i) => CareerEntry(career, i)).join('')}
      </div>
      <div id="timeline-ai-panel" class="ai-section-panel hidden"></div>
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
        <div class="achievement-card achievement-stat achievement-card--clickable"
          style="transition-delay: ${delay}ms"
          data-ai-title="${escAttr(achievement.value + ' ' + achievement.label)}"
          data-ai-body="">
          <span class="achievement-value">${achievement.value}</span>
          <span class="achievement-label">${achievement.label}</span>
        </div>`;
    case 'badge':
      return `
        <div class="achievement-card achievement-badge achievement-card--clickable"
          style="transition-delay: ${delay}ms"
          data-ai-title="${escAttr(achievement.text)}"
          data-ai-body="">
          ${achievement.text}
        </div>`;
    case 'link':
      return `
        <a href="${achievement.url}" class="achievement-card achievement-link" style="transition-delay: ${delay}ms" target="_blank" rel="noopener">
          ${achievement.title}
        </a>`;
    default: // text
      return `
        <div class="achievement-card achievement-text achievement-card--clickable"
          style="transition-delay: ${delay}ms"
          data-ai-title="${escAttr(achievement.title)}"
          data-ai-body="${escAttr(achievement.body)}">
          <p class="achievement-title">${achievement.title}</p>
          <p class="achievement-body">${achievement.body}</p>
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
  document.querySelectorAll('.achievement-card--clickable').forEach(el => {
    el.addEventListener('click', () => onAchievementClick(el));
  });
}

async function onAchievementClick(card) {
  const title = card.dataset.aiTitle;
  const body  = card.dataset.aiBody || '';
  if (!title) return;

  const isHighlight = !!card.closest('.career-highlights');
  const panelId = isHighlight ? 'highlights-ai-panel' : 'timeline-ai-panel';
  const panel = document.getElementById(panelId);
  if (!panel) return;

  // Toggle: clicking the active card collapses the panel
  if (panel.dataset.activeCard === title && !panel.classList.contains('hidden')) {
    panel.classList.add('hidden');
    panel.dataset.activeCard = '';
    card.classList.remove('achievement-card--active');
    return;
  }

  // Deactivate previous card in this section
  const sectionEl = isHighlight
    ? document.querySelector('.career-highlights')
    : document.querySelector('.career-timeline');
  sectionEl?.querySelectorAll('.achievement-card--active').forEach(el => el.classList.remove('achievement-card--active'));

  card.classList.add('achievement-card--active');
  panel.dataset.activeCard = title;

  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="ai-panel-loading">
      <span class="ai-panel-spinner"></span>
      ${i18n('ai-loading')}
    </div>
  `;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const lang = getCurrentLanguage();
  const bodySuffix = body ? `. ${body}` : '';
  const prompt = lang === 'es'
    ? `Cuéntame más sobre: "${title}"${bodySuffix}`
    : `Tell me more about Juan Pablo's "${title}"${bodySuffix}`;

  try {
    const text = await askAI(prompt);
    panel.innerHTML = `
      <h4 class="ai-panel-heading">${i18n('ai-career-heading')}: <em>${title}</em></h4>
      <div class="ai-panel-content">${renderAIResponse(text)}</div>
    `;
  } catch {
    panel.innerHTML = `<p class="ai-panel-error">${i18n('ai-error')}</p>`;
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