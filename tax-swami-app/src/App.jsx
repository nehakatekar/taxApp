import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Partners from './components/Partners.jsx'
import Services from './components/Services.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import WhoItsFor from './components/WhoItsFor.jsx'
import Team from './components/Team.jsx'
import Pricing from './components/Pricing.jsx'
import FAQ from './components/FAQ.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import StickyMobileCta from './components/StickyMobileCta.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import BackToTop from './components/BackToTop.jsx'
import useScrollReveal from './useScrollReveal.js'

function App() {
  useScrollReveal()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Partners />
        <Services />
        <HowItWorks />
        <WhoItsFor />
        <Team />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <StickyMobileCta />
      <BackToTop />
    </>
  )
}

export default App
