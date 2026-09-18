import { useEffect, useState } from 'react'
import useScrollSpy from '../useScrollSpy.js'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { href: '#services', label: 'Services', id: 'services' },
  { href: '#how-it-works', label: 'How it works', id: 'how-it-works' },
  { href: '#team', label: 'Team', id: 'team' },
  { href: '#pricing', label: 'Pricing', id: 'pricing' },
  { href: '#faq', label: 'FAQ', id: 'faq' },
  { href: '#contact', label: 'Contact', id: 'contact' },
]

// Toggles a "compact" style (less vertical padding, subtle shadow) once the
// page has scrolled past the hero - same sentinel pattern StickyMobileCta
// already uses for its own visibility logic.
function useCompactOnScroll() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero || !('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setCompact(!entry.isIntersecting),
      { rootMargin: '-120px 0px 0px 0px' }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return compact
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const activeId = useScrollSpy(links.map((link) => link.id))
  const compact = useCompactOnScroll()

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`navbar ${compact ? 'navbar--compact' : ''}`}>
      <div className="navbar__inner">
        <a href="#top" className="navbar__logo" onClick={closeMenu}>
          Tax<span>Swami</span>
        </a>

        <button
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">
            {menuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <span
            className={`navbar__bars ${menuOpen ? 'navbar__bars--open' : ''}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>

        <nav
          id="primary-nav"
          className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}
          aria-label="Primary"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={closeMenu}
              aria-current={activeId === link.id ? 'true' : undefined}
              className={activeId === link.id ? 'navbar__link--active' : undefined}
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle className="navbar__theme-toggle" />
          <a href="#contact" className="navbar__cta" onClick={closeMenu}>
            Book a Free Call
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
