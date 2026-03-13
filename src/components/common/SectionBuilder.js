/**
 * Base SectionBuilder - Provides a template pattern for building sections
 * Each section can override methods to customize rendering
 */
export class SectionBuilder {
  constructor(config = {}) {
    this.id = config.id || '';
    this.title = config.title || '';
    this.subtitle = config.subtitle || '';
    this.items = config.items || [];

    // Allow passing custom classes
    this.classes = {
      section: config.classes?.section || 'section',
      container: config.classes?.container || 'section-container',
      title: config.classes?.title || 'section-title',
      subtitle: config.classes?.subtitle || 'section-subtitle',
      ul: config.classes?.ul || 'section-ul',
      li: config.classes?.li || 'section-li',
      itemTitle: config.classes?.itemTitle || 'section-item-title',
      itemDescription: config.classes?.itemDescription || 'section-item'
    };
  }

  /**
   * Override this to customize section opening HTML
   */
  sectionStart() {
    return `
    <section id="${this.id}" class="${this.classes.section}">
      <div class="${this.classes.container}">
        <h2 class="${this.classes.title}">${this.title}</h2>
        ${this.subtitle ? `<p class="${this.classes.subtitle}">${this.subtitle}</p>` : ''}
        <ul role="list" class="${this.classes.ul}">
    `;
  }

  /**
   * Override this to customize how individual items are rendered
   */
  sectionItem(item) {
    return `
      <li class="${this.classes.li}">
        <h3 class="${this.classes.itemTitle}"> ${item.title || item.name} </h3>
        <p class="${this.classes.itemDescription}"> ${item.description} </p>
      </li>
    `;
  }

  /**
   * Override this to customize section closing HTML
   */
  sectionEnd() {
    return `
          </ul>
        </div>
      </section>
    `;
  }

  /**
   * Builds the complete section HTML
   */
  build() {
    const itemsHtml = this.items.map(item => this.sectionItem(item)).join('');
    return this.sectionStart() + itemsHtml + this.sectionEnd();
  }
}

/**
 * Alternative: Functional approach using object composition
 * Use this if you prefer not to use classes
 */
export function createSection(config) {
  const defaults = {
    id: '',
    title: '',
    subtitle: '',
    items: [],
    
    sectionStart() {
      return `
        <section id="${this.id}" class="mx-auto max-w-2xl lg:max-w-5xl px-4 sm:px-8 lg:px-16 py-16 sm:py-24">
          <div class="border-t border-zinc-100 dark:border-zinc-800 pt-16">
            <h2 class="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-3xl">
              ${this.title}
            </h2>
            ${this.subtitle ? `<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">${this.subtitle}</p>` : ''}
            <div class="mt-16">
      `;
    },
    
    sectionItem(item) {
      return `
        <div class="mb-4">
          <h3>${item.title || item.name}</h3>
          <p>${item.description}</p>
        </div>
      `;
    },
    
    sectionEnd() {
      return `
            </div>
          </div>
        </section>
      `;
    },
    
    build() {
      const itemsHtml = this.items.map(item => this.sectionItem(item)).join('');
      return this.sectionStart() + itemsHtml + this.sectionEnd();
    }
  };

  return { ...defaults, ...config };
}
