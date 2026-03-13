// Simple client-side router with History API
export class Router {
  constructor(routes) {
    this.routes = routes
    this.currentRoute = null
    
    // Handle browser back/forward buttons
    globalThis.addEventListener('popstate', () => {
      this.handleRoute(globalThis.location.pathname)
    })
    
    // Intercept all link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a')
      if (link?.href && link.origin === globalThis.location.origin) {
        const url = new URL(link.href)
        
        // Skip if it's a download link or external
        if (link.hasAttribute('download') || link.target === '_blank') {
          return
        }
        
        e.preventDefault()
        this.navigate(url.pathname)
      }
    })
  }
  
  // Navigate to a new route
  navigate(path) {
    globalThis.history.pushState({}, '', path)
    this.handleRoute(path)
  }
  
  // Handle the current route
  async handleRoute(path) {
    // Normalize path
    path = path === '' ? '/' : path
    
    // Find matching route
    let route = this.routes[path]
    
    // If no exact match, try to find a component-based route
    if (!route && path !== '/') {
      const componentName = path.slice(1) // Remove leading slash
      route = {
        component: componentName,
        title: componentName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      }
    }
    
    // Fallback to home if no route found
    if (!route) {
      route = this.routes['/']
    }
    
    this.currentRoute = route
    
    // Update page title
    if (route.title) {
      document.title = route.title
    }
    
    // Scroll to top of page when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Render the route
    await this.render(route)
  }
  
  // Render the route's component
  async render(route) {
    const app = document.getElementById('router-outlet') || document.getElementById('app')
    
    if (!app) {
      console.error('App container not found')
      return
    }
    
    try {
      // If route has a render function, use it
      if (route.render) {
        app.innerHTML = route.render()
      }
      // Otherwise try to dynamically import the component
      else if (route.component) {
        try {
          const module = await import(`./components/${route.component}.js`)
          const Component = module.default || module[route.component]
          
          if (typeof Component === 'function') {
            app.innerHTML = Component()
            
            // Call component's initialization function if it exists
            const initFunctionName = `initialize${route.component}`
            if (module[initFunctionName] && typeof module[initFunctionName] === 'function') {
              module[initFunctionName]()
            }
          } else {
            console.error(`Component ${route.component} is not a function`)
            app.innerHTML = '<div class="container py-20 text-center"><h1 class="text-4xl font-bold">Component Error</h1></div>'
          }
        } catch (error) {
          console.error(`Failed to load component: ${route.component}`, error)
          app.innerHTML = '<div class="container py-20 text-center"><h1 class="text-4xl font-bold">Page Not Found</h1><p class="mt-4">The page you\'re looking for doesn\'t exist.</p></div>'
        }
      }
      
      // Initialize any component-specific functionality
      if (route.init) {
        route.init()
      }
    } catch (error) {
      console.error('Error rendering route:', error)
      app.innerHTML = '<div class="container py-20 text-center"><h1 class="text-4xl font-bold">Error</h1><p class="mt-4">Something went wrong.</p></div>'
    }
  }
  
  // Start the router
  start() {
    this.handleRoute(globalThis.location.pathname)
  }
}
