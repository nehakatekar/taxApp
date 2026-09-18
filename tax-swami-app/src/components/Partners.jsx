// A trust-strip marquee. We don't have real partner or press logos to show
// yet, so this uses clearly-generic abstract marks (geometric shapes + a
// placeholder label) rather than inventing real company names or logos -
// doing that would falsely imply partnerships that don't exist. The
// subtitle says so plainly, and the markup is intentionally simple to swap:
// once real logos exist, replace the `marks` array's SVG with <img> tags.
import { useEffect, useState } from 'react'
import Marquee from 'react-fast-marquee'

const marks = [
  { id: 'p1', label: 'Partner Network' },
  { id: 'p2', label: 'Audit Alliance' },
  { id: 'p3', label: 'Compliance Guild' },
  { id: 'p4', label: 'Finance Council' },
  { id: 'p5', label: 'Advisory Circle' },
  { id: 'p6', label: 'Tax Forum' },
]

function AbstractMark({ index }) {
  // A handful of simple geometric variants, cycling by index, so the strip
  // doesn't look like six copies of the same placeholder icon.
  const variant = index % 3
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" focusable="false">
      {variant === 0 && (
        <>
          <circle cx="14" cy="14" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="14" cy="14" r="4" fill="currentColor" />
        </>
      )}
      {variant === 1 && (
        <rect x="4" y="4" width="20" height="20" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
      )}
      {variant === 2 && <path d="M14 3 24 22H4Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />}
    </svg>
  )
}

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches)

  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

function Partners() {
  const reducedMotion = usePrefersReducedMotion()

  const items = marks.map((mark, index) => (
    <div className="partners__item" key={mark.id}>
      <AbstractMark index={index} />
      <span>{mark.label}</span>
    </div>
  ))

  return (
    <section className="partners" aria-labelledby="partners-title">
      <div className="section__inner partners__inner">
        <p className="partners__eyebrow" id="partners-title" data-reveal>
          Our partner network
        </p>
        <p className="partners__note" data-reveal>
          Placeholder marks for now - swap in real partner and press logos here.
        </p>
      </div>
      <div className="partners__marquee" data-reveal>
        {reducedMotion ? (
          <div className="partners__track">{items}</div>
        ) : (
          // autoFill repeats the items to fill the width, so the loop stays
          // seamless on wide screens without duplicating the list by hand.
          <Marquee autoFill pauseOnHover speed={40}>
            {items}
          </Marquee>
        )}
      </div>
    </section>
  )
}

export default Partners
