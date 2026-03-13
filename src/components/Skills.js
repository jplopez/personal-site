import { i18n, getCurrentLanguage } from '../i18n.js'
import { askAI, renderAIResponse } from '../ai.js'

export function Skills() {
  const skills = getSkillsList();
  if (!skills || skills.length === 0) return '';

  /* html */
  return `
    <div id="skills" class="mt-12 w-full">
      <h2>${i18n('skills-title')}</h2>
      <div class="flex flex-wrap justify-center items-center gap-y-3 mt-6 px-4">
        ${skills.map((skill, index) => SkillTag(skill, index, index < skills.length - 1)).join('')}
      </div>
      <div id="skill-ai-panel" class="ai-section-panel hidden"></div>
    </div>
  `;
}

function SkillTag(skill, index, showSeparator) {
  const tooltip = i18n(`skill-tooltip-${index}`);

  /* html */
  return `
    <span class="skill-tag relative group cursor-pointer text-lg font-medium text-zinc-700 dark:text-zinc-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
      data-skill-index="${index}"
      tabindex="0"
      role="button">
      ${skill}
      <span class="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 w-52 rounded-lg bg-slate-800 dark:bg-slate-700 text-white text-sm px-3 py-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-0 group-hover:delay-1000 shadow-lg">
        ${tooltip}
        <span class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-700"></span>
      </span>
    </span>
    ${showSeparator ? '<span class="text-teal-400 mx-2 select-none" aria-hidden="true">•</span>' : ''}
  `;
}

export function initializeSkills() {
  document.querySelectorAll('.skill-tag').forEach(el => {
    el.addEventListener('click', () => onSkillClick(Number.parseInt(el.dataset.skillIndex)));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') onSkillClick(Number.parseInt(el.dataset.skillIndex));
    });
  });
}

async function onSkillClick(skillIndex) {
  const skill = getSkillsList()[skillIndex];
  if (!skill) return;

  // Update selected state
  document.querySelectorAll('.skill-tag').forEach(el => {
    el.classList.toggle('skill-tag--selected', Number.parseInt(el.dataset.skillIndex) === skillIndex);
  });

  const panel = document.getElementById('skill-ai-panel');
  if (!panel) return;

  panel.classList.remove('hidden');
  panel.innerHTML = `
    <div class="ai-panel-loading">
      <span class="ai-panel-spinner"></span>
      ${i18n('ai-loading')}
    </div>
  `;
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const lang = getCurrentLanguage();
  const prompt = lang === 'es'
    ? `Cuéntame sobre una ocasión en la que Juan Pablo demostró la habilidad de: ${skill}`
    : `Tell me about a time where Juan Pablo demonstrated the skill: ${skill}`;

  try {
    const text = await askAI(prompt);
    panel.innerHTML = `
      <h4 class="ai-panel-heading">${i18n('ai-skill-heading')}: <em>${skill}</em></h4>
      <div class="ai-panel-content">${renderAIResponse(text)}</div>
    `;
  } catch {
    panel.innerHTML = `<p class="ai-panel-error">${i18n('ai-error')}</p>`;
  }
}

const ListEn = [
  "Software Development", 
  "Game Development", 
  "Digital Music", 
  "AR/VR", 
  "Real-time Systems Program Management", 
  "Roadmaps", 
  "KPIs", 
  "Cross Functional Leadership", 
  "Technical Mentorship", 
  "Scalability", 
  "Reliability Engineering", 
  "Distributed Systems", 
  "SOA", 
  "Performance Optimization", 
  "Creative Production", 
  "Game Design", 
  "Music Recording", 
  "Drumming"
];

const ListEs = [
  "Desarrollo de Software", 
  "Desarrollo de Videojuegos", 
  "Musica Digital", 
  "Realidad Aumentada", 
  "Program Management de sistemas en tiempo-real", 
  "Roadmaps", 
  "KPIs", 
  "Liderazgo Multi-funcional", 
  "Mentoria Tecnica", 
  "Escalabilidad", 
  "Reliability Engineering", 
  "Sistemas Distribuidos", 
  "Arquitecture Orientada a Servicios (SOA)", 
  "Optimizacion de Performance", 
  "Produccion Creativa", 
  "Diseno de Juegos", 
  "Grabacion de Musica", 
  "Bateria"
];

export default function getSkillsList() {
  let curLang = getCurrentLanguage();
  if (curLang=="es") return ListEs;
  if (curLang=="en") return ListEn;
  return ListEn; // defaults to English
}

