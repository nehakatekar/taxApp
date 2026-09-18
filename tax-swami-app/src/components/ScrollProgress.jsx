import { useEffect, useRef } from 'react'

// A thin bar fixed to the top of the viewport showing how far down the page
// the visitor has scrolled. Reads the DOM directly via a ref instead of
// useState, so scrolling never triggers a React re-render - just a rAF-
// throttled style write, which is what "rAF-throttled" means in practice.
function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let ticking = false

    const update = () => {
      ticking = false
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - doc.clientHeight
      const progress = scrollable > 0 ? (doc.scrollTop / scrollable) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__bar" ref={barRef} />
    </div>
  )
}

export default ScrollProgress
