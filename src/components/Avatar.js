import { config } from "../config.js"

export function Avatar() {
  /* html */
  return `
    <a href="#" class="shrink-0">  
      <img src="/images/jp-avatar.jpeg" 
        alt="${config.personal.name}" class="size-32 lg:size-40 rounded-full object-cover" />
    </a>
  `
}