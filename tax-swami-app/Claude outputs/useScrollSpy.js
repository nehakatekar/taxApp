import { useEffect, useState } from 'react'

// Tracks which of the given section ids is currently most in view, so the
// nav can highlight the active link as the user scrolls.
export default function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (sections.length === 0 || !('IntersectionObserver' in window)) return

    const visible = new Map()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible.set(entry.target.id, entry.intersectionRatio)
        })
        let topId = null
        let topRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > topRatio) {
            topRatio = ratio
            topId = id
          }
        })
        // Always set state, including back to null. Bailing out here when
        // topId is falsy (the old behavior) left the *previous* active link
        // highlighted forever once the visitor scrolled above every tracked
        // section (the hero/partners area, or after using Back to Top) -
        // nothing was intersecting, so this callback still fired but never
        // cleared the stale id. Confirmed bug: scroll to Contact, then back
        // to the hero, and "Contact" stayed underlined the whole time.
        setActiveId(topId)
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-90px 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [ids])

  return activeId
}
