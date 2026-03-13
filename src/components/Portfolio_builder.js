import { createSection } from './common/SectionBuilder.js';

/**
 * Portfolio Section using functional composition pattern
 * Each property can be customized without extending a class
 */
export function Portfolio() {
  const portfolioItems = [
    {
      type: "Game",
      title: "Space Explorer",
      description: "A 2D space exploration game with procedural generation and engaging combat mechanics.",
      platform: "PC, Mobile",
      link: "#",
      gradient: "from-purple-600 to-blue-600"
    },
    {
      type: "Game",
      title: "Puzzle Quest",
      description: "Innovative puzzle-platformer combining classic mechanics with modern design.",
      platform: "PC, Web",
      link: "#",
      gradient: "from-pink-500 to-orange-500"
    },
    {
      type: "Library",
      title: "React UI Kit",
      description: "Comprehensive component library for building modern web applications with React.",
      platform: "NPM Package",
      link: "#",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      type: "Tool",
      title: "Code Generator CLI",
      description: "Command-line tool for scaffolding projects and generating boilerplate code.",
      platform: "NPM Package",
      link: "#",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  const section = createSection({
    id: 'portfolio',
    title: 'Portfolio',
    subtitle: 'Games, libraries, and tools I\'ve built over the years.',
    items: portfolioItems,

    // Custom sectionStart for portfolio grid layout
    sectionStart() {
      return `
        <section id="${this.id}" class="mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
          <div class="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              ${this.title}
            </h2>
            ${this.subtitle ? `<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">${this.subtitle}</p>` : ''}
            <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      `;
    },

    // Custom sectionItem for portfolio cards with gradients
    sectionItem(item) {
      return `
        <div class="bg-zinc-50 dark:bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden hover:bg-zinc-100 dark:hover:bg-white/15 transition-all group">
          <div class="h-56 bg-gradient-to-br ${item.gradient} relative overflow-hidden">
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
              <a href="${item.link}" class="text-teal-500 hover:text-teal-400 transition">
                View →
              </a>
            </div>
          </div>
        </div>
      `;
    },

    sectionEnd() {
      return `
            </div>
          </div>
        </section>
      `;
    }
  });

  return section.build();
}
