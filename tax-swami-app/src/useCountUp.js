import { useEffect, useRef, useState } from 'react'

// Animates a number counting up from 0 to `end` once the element holding
// the returned ref scrolls into view. Mirrors useScrollReveal's philosophy:
// IntersectionObserver drives it, but a safety-net timer guarantees the
// final value is shown even if the observer never fires (full-page
// screenshot tools, crawlers, print views - see useScrollReveal.js).
//
// `end` can include a non-numeric suffix/prefix (e.g. "500+", "<48hrs",
// "10+") - only the numeric portion is animated, the rest is preserved.
export default function useCountUp(rawValue, { duration = 1400 } = {}) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(rawValue)

  useEffect(() => {
    const match = String(rawValue).match(/-?\d+(\.\d+)?/)
    const node = ref.current

    if (!match || !node) {
      setDisplay(rawValue)
      return undefined
    }

    const target = parseFloat(match[0])
    const prefix = rawValue.slice(0, match.index)
    const suffix = rawValue.slice(match.index + match[0].length)
    const decimals = (match[0].split('.')[1] || '').length

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || !('IntersectionObserver' in window)) {
      setDisplay(rawValue)
      return undefined
    }

    let frame
    let started = false

    const run = () => {
      if (started) return
      started = true
      const startTime = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1)
        const eased = 1 - (1 - progress) * (1 - progress) // ease-out quad
        const current = target * eased
        setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
        if (progress < 1) {
          frame = requestAnimationFrame(tick)
        } else {
          setDisplay(rawValue)
        }
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 }
    )
    observer.observe(node)

    // Safety net, same philosophy as useScrollReveal's: if the observer
    // never fires (a full-page screenshot tool, crawler, or print view that
    // never "scrolls"), jump straight to the final value instead of
    // starting the animated count-up late - starting it late would mean
    // the value is still mid-count when whatever's waiting stops watching.
    const safetyTimer = window.setTimeout(() => {
      started = true
      setDisplay(rawValue)
      observer.disconnect()
    }, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(safetyTimer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [rawValue, duration])

  return [ref, display]
}
