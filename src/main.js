import "./style.css"

import { initLanguage } from "./i18n.js"
import { Router } from "./router.js"
import { Navigation, initializeNavigation } from "./components/Navigation.js"
import { Home } from "./components/Home.js"
import { Career, initializeCareer } from "./components/Career.js"
//import { Portfolio } from "./components/Portfolio.js"
import { Contact, initializeContact } from "./components/Contact.js"
import { Footer } from "./components/Footer.js"
import { initializeSkills } from "./components/Skills.js"
import { JobFit, initializeJobFit } from "./components/JobFit.js"


// Initialize i18n
await initLanguage()

// Home page component
function HomePage() {
  return /* html */`
    ${Home()}
    ${Career()} 
    `
    // ${Portfolio()}
    + 
    `
    ${Contact()}
    `
}

// Define routes
const routes = {
  '/': {
    title: 'Home',
    render: HomePage,
    init: () => {
      initializeSkills()
      initializeCareer()
      initializeContact()
    }
  },
  '/career': {
    component: 'Career',
    title: 'Career'
  },
  '/portfolio': {
    component: 'Portfolio',
    title: 'Portfolio'
  },
  '/contact': {
    component: 'Contact',
    title: 'Contact'
  },
  '/job-fit': {
    title: 'Job Fit',
    render: JobFit,
    init: initializeJobFit
  }
}

// Initialize the app
document.querySelector("#app").innerHTML = /* html */`
  ${Navigation()}
  <div class="relative flex w-full flex-col pt-15">
    <!-- Main Content Area -->
    <div>
      <main id="router-outlet">
        <!-- Content will be injected here by the router -->
      </main>
      ${Footer()}
    </div>
  </div>
`

// Initialize navigation functionality
initializeNavigation()

// Create and start the router
const router = new Router(routes)
router.start()