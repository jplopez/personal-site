// Text size configuration for accessibility
// Supports three sizes: small, normal, large

export const textSizes = {
  small: 0.875,   // 87.5% of base size
  normal: 1,    // 100% - default
  large: 1.25     // 125% of base size
}

// Get current text size from localStorage or default to normal
export function getCurrentTextSize() {
  return localStorage.getItem('textSize') || 'normal'
}

// Set text size and save to localStorage
export function setTextSize(size) {
  if (textSizes[size]) {
    localStorage.setItem('textSize', size)
    applyTextSize(size)
    return true
  }
  return false
}

// Apply text size to the document root
export function applyTextSize(size) {
  const multiplier = textSizes[size] || textSizes.normal
  // Set CSS custom property on root element
  document.documentElement.style.setProperty('--text-size-multiplier', multiplier)
}

// Cycle to next text size (small -> normal -> large -> small)
export function cycleTextSize() {
  const current = getCurrentTextSize()
  const sizes = Object.keys(textSizes)
  const currentIndex = sizes.indexOf(current)
  const nextIndex = (currentIndex + 1) % sizes.length
  const nextSize = sizes[nextIndex]
  
  setTextSize(nextSize)
  return nextSize
}

// Initialize text size system
export function initTextSize() {
  const savedSize = getCurrentTextSize()
  applyTextSize(savedSize)
}

// Get display name for text size
export function getTextSizeLabel(size) {
  const labels = {
    small: 'A',
    normal: 'A',
    large: 'A'
  }
  return labels[size] || 'A'
}
