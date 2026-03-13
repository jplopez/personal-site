import { i18n, i18nFindWithPrefix } from "../i18n"

export function Portfolio() {

  const portfolioItems = getPortfolioItems();
  const portfolioCards = BuildPortfolioCards(portfolioItems)

  if(portfolioCards) {
  /* html */
  return `
    <section id="portfolio" >
      <div class="container">
        <h2>${i18n('portfolio-title')}</h2>
        <p class="subtitle">${i18n('portfolio-subtitle')}</p>
        <div class="cards">
          ${portfolioCards}
        </div>
      </div>
    </section>
  `
  }
}

function BuildPortfolioCards(portfolioItems) {
  /* html */
  const portfolioCards = portfolioItems.map(item => `
    <div class="bg-zinc-50 dark:bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden hover:bg-zinc-100 dark:hover:bg-white/15 transition-all group">
      <div class="h-56 bg-linear-to-br ${item.gradient} relative overflow-hidden">
        <div class="absolute inset-0 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
          ${item.type === 'Game' ? `
            <svg class="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"/>
            </svg>
          ` : `
            <svg class="w-20 h-20 text-white/30" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          `}
        </div>
        <div class="absolute top-4 left-4">
          <span class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">${item.type}</span>
        </div>
      </div>
      <div class="p-6">
        <h4 class="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">${item.title}</h4>
        <p class="text-zinc-700 dark:text-gray-300 mb-3 leading-relaxed">${item.description}</p>
        <div class="flex items-center justify-between">
          <span class="text-sm text-zinc-600 dark:text-gray-400">
            <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clip-rule="evenodd"/>
            </svg>
            ${item.platform}
          </span>
          <a href="${item.link}" class="inline-flex items-center text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors">
            View
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  `).join('');

  return portfolioCards || '';

}

/*
  Returns an array with the portfolio Items
  Items:
  { type: localized from getPortfolioItems() ,
    title: string,
    description: string,
    platform: string. One or more values from getPortfolioPlatforms(), joined using ',' (comma)
    link: string,
    gradient: tailwing styles}
*/
function getPortfolioItems() {
  const types = i18nFindWithPrefix('portfolio-type',true)
  const platforms = getPortfolioPlatforms();

  return [
    {
      type: types.game,
      title: "Space Explorer",
      description: "A 2D space exploration game with procedural generation and engaging combat mechanics.",
      platform: [platforms.pc, platforms.web].join(","),
      link: "#",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      type: types.game,
      title: "Puzzle Quest",
      description: "Innovative puzzle-platformer combining classic mechanics with modern design.",
      platform: [platforms.pc, platforms.web].join(","),
      link: "#",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      type: types.library,
      title: "React UI Kit",
      description: "Comprehensive component library for building modern web applications with React.",
      platform: [platforms.package].join(","),
      link: "#",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      type: types.tool,
      title: "Code Generator CLI",
      description: "Command-line tool for scaffolding projects and generating boilerplate code.",
      platform: [platforms.package].join(","),
      link: "#",
      gradient: "from-green-500 to-teal-500"
    },
    {
      type: types.game,
      title: "Dungeon Crawler",
      description: "Roguelike dungeon crawler with procedural levels and deep character progression.",
      platform: [platforms.pc].join(","),
      link: "#",
      gradient: "from-red-600 to-orange-600"
    },
    {
      type: types.library,
      title: "Game Physics Engine",
      description: "Lightweight 2D physics engine optimized for browser-based games.",
      platform: [platforms.js].join(","),
      link: "#",
      gradient: "from-indigo-500 to-purple-500"
    }
  ]
}

/*
  Returns the array of possible portfolio platforms
*/
function getPortfolioPlatforms() {
  return {
    pc: "PC", 
    web: "Web", 
    package: "Package", 
    gameAsset: "Game Asset",
    unity: "Unity",
    pico8: "Pico-8",
    js: "Javascript",
    java: "Java",
    spring: "Spring",
    cs: "C#",
  }
}
