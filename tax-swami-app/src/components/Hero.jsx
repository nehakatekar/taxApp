import { useEffect, useRef } from 'react'
import useCountUp from '../useCountUp.js'

const stats = [
  { value: '10+', label: 'Years combined CA experience' },
  { value: '500+', label: 'Returns filed on time' },
  { value: '<48hrs', label: 'Typical response time' },
]

function HeroStat({ stat }) {
  const [ref, display] = useCountUp(stat.value)
  return (
    <div className="hero__stat" ref={ref}>
      <dt>{display}</dt>
      <dd>{stat.label}</dd>
    </div>
  )
}

function HeroArt() {
  return (
    <svg
      className="hero__art-svg"
      viewBox="0 0 420 420"
      role="img"
      aria-label="Illustration of a tax return document with a checkmark, next to a rising savings chart"
    >
      <defs>
        <filter id="heroShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="14" stdDeviation="16" floodColor="#0f766e" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* soft backdrop blob */}
      <circle cx="210" cy="210" r="180" fill="#ccfbf1" opacity="0.6" />
      <circle cx="330" cy="90" r="34" fill="#f59e0b" opacity="0.16" />
      <circle cx="60" cy="330" r="26" fill="#0f766e" opacity="0.12" />

      {/* document card */}
      <g filter="url(#heroShadow)">
        <rect x="95" y="60" width="210" height="270" rx="18" fill="#ffffff" transform="rotate(-4 200 195)" />
        <g transform="rotate(-4 200 195)">
          <rect x="120" y="95" width="120" height="14" rx="7" fill="#0f766e" />
          <rect x="120" y="122" width="160" height="9" rx="4.5" fill="#e6e2da" />
          <rect x="120" y="141" width="160" height="9" rx="4.5" fill="#e6e2da" />
          <rect x="120" y="160" width="110" height="9" rx="4.5" fill="#e6e2da" />
          <rect x="120" y="190" width="160" height="1.5" fill="#e6e2da" />
          <rect x="120" y="208" width="90" height="9" rx="4.5" fill="#e6e2da" />
          <rect x="120" y="227" width="130" height="9" rx="4.5" fill="#e6e2da" />
          <rect x="120" y="255" width="70" height="24" rx="8" fill="#f59e0b" />
        </g>
      </g>

      {/* approved badge */}
      <g filter="url(#heroShadow)">
        <circle cx="305" cy="270" r="46" fill="#0f766e" />
        <path
          d="M285 271 l13 13 l28 -30"
          fill="none"
          stroke="#ffffff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* small rising-savings chart card */}
      <g filter="url(#heroShadow)">
        <rect x="30" y="235" width="110" height="90" rx="14" fill="#ffffff" transform="rotate(5 85 280)" />
        <g transform="rotate(5 85 280)" stroke="#0f766e" strokeWidth="6" strokeLinecap="round">
          <line x1="48" y1="300" x2="48" y2="285" />
          <line x1="68" y1="300" x2="68" y2="270" />
          <line x1="88" y1="300" x2="88" y2="255" />
          <line x1="108" y1="300" x2="108" y2="240" />
        </g>
      </g>

      {/* sparkle accents */}
      <g fill="#f59e0b">
        <circle cx="70" cy="75" r="5" />
        <circle cx="345" cy="205" r="4" />
        <circle cx="310" cy="40" r="3.5" />
      </g>
    </svg>
  )
}

// Subtle pointer-driven parallax on the hero illustration (desktop only -
// mobile has no hover pointer, and prefers-reduced-motion disables it).
function useParallax() {
  const wrapRef = useRef(null)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (prefersReduced || !isFinePointer) return undefined

    let frame
    const handleMove = (event) => {
      const rect = el.getBoundingClientRect()
      const relX = (event.clientX - rect.left) / rect.width - 0.5
      const relY = (event.clientY - rect.top) / rect.height - 0.5
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.transform = `rotate(${relX * -3}deg) translate(${relX * 10}px, ${relY * 10}px)`
      })
    }
    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }

    const section = el.closest('.hero')
    section?.addEventListener('mousemove', handleMove)
    section?.addEventListener('mouseleave', handleLeave)
    return () => {
      section?.removeEventListener('mousemove', handleMove)
      section?.removeEventListener('mouseleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return wrapRef
}

function Hero() {
  const parallaxRef = useParallax()

  return (
    <section id="top" className="hero">
      <div className="hero__blobs" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__blob hero__blob--three" />
      </div>

      <div className="hero__inner">
        <div className="hero__content" data-reveal>
          <p className="hero__eyebrow">Chartered Accountants, on your side</p>
          <h1 className="hero__title">Taxes, sorted - without the headache.</h1>
          <p className="hero__subtitle">
            We file your returns, handle your GST, and plan your taxes in plain
            English. No jargon, no last-minute panic - just a friendly team of
            CAs who&apos;ve got it covered.
          </p>
          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Book a Free Consultation
            </a>
            <a href="#services" className="btn btn--ghost">
              See What We Do
            </a>
          </div>

          <dl className="hero__stats">
            {stats.map((stat) => (
              <HeroStat stat={stat} key={stat.label} />
            ))}
          </dl>
        </div>

        <div className="hero__art" data-reveal data-reveal-delay="1">
          <div className="hero__art-parallax" ref={parallaxRef}>
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
