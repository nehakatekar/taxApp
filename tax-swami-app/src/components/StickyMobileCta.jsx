import { useEffect, useState } from 'react'

// A persistent "Book a Call" bar for small screens, shown once the visitor
// has scrolled past the hero and hidden again once they reach the contact
// section (where the same action is already front and center).
function StickyMobileCta() {
  const [pastHero, setPastHero] = useState(false)
  const [nearContactOrFooter, setNearContactOrFooter] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const contact = document.getElementById('contact')
    const footer = document.querySelector('.footer')
    if (!hero || !contact || !footer || !('IntersectionObserver' in window)) return undefined

    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: '-50% 0px 0px 0px' }
    )

    // Once the visitor reaches the contact section (or scrolls into the
    // footer beyond it), the same action is already on screen, so the
    // floating bar would just be redundant clutter.
    const tailVisibility = { contact: false, footer: false }
    const tailObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        tailVisibility[entry.target === contact ? 'contact' : 'footer'] = entry.isIntersecting
      })
      setNearContactOrFooter(tailVisibility.contact || tailVisibility.footer)
    })

    heroObserver.observe(hero)
    tailObserver.observe(contact)
    tailObserver.observe(footer)

    return () => {
      heroObserver.disconnect()
      tailObserver.disconnect()
    }
  }, [])

  const visible = pastHero && !nearContactOrFooter

  return (
    <div className={`sticky-cta ${visible ? 'sticky-cta--visible' : ''}`} aria-hidden={!visible}>
      <a href="#contact" className="btn btn--primary btn--full" tabIndex={visible ? 0 : -1}>
        Book a Free Call
      </a>
    </div>
  )
}

export default StickyMobileCta
