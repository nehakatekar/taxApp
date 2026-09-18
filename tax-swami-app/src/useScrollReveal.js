import { useEffect } from 'react'

// Fades/slides elements marked with [data-reveal] into place the first time
// they scroll into view. Respects prefers-reduced-motion by doing nothing
// (elements are visible by default in CSS; this only adds the animation).
//
// Safety net: a full-page render that never "scrolls" in the normal sense
// (a search-engine crawler, a print/zoomed-out view, or a test tool taking a
// full-page screenshot) can leave elements permanently un-revealed, since
// the IntersectionObserver may not fire for them in time. A short fallback
// timer force-reveals anything still hidden so content is never lost, only
// its entrance animation is.
export default function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const elements = Array.from(document.querySelectorAll('[data-reveal]'))

    if (prefersReduced || elements.length === 0 || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const reveal = (el) => el.classList.add('is-visible')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target)
            observer.unobserve(entry.target)
          }
        })
      },
      // Generous margin so content reveals well before it's centered in
      // view - a fast scroll or fling shouldn't be able to outrun it.
      { threshold: 0.01, rootMargin: '0px 0px 200px 0px' }
    )

    elements.forEach((el) => observer.observe(el))

    const safetyTimer = window.setTimeout(() => {
      elements.forEach(reveal)
      observer.disconnect()
    }, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(safetyTimer)
    }
  }, [])
}
