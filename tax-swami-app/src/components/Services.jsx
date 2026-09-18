import { useState } from 'react'
import {
  IconDocument,
  IconReceipt,
  IconChartUp,
  IconShieldCheck,
  IconArrowUpRight,
  IconArrowRight,
} from './icons.jsx'

const services = [
  {
    icon: IconDocument,
    title: 'Income Tax Return Filing',
    blurb:
      "Your ITR is the yearly form that tells the government what you earned and what tax you owe. We fill it out correctly and file it on time, so you don't have to decode the forms yourself.",
    forWho: 'Salaried employees, freelancers, and anyone who needs to file a return.',
    getWhat: 'An accurate return filed before the deadline, plus a copy for your records.',
  },
  {
    icon: IconReceipt,
    title: 'GST Registration & Filing',
    blurb:
      "GST is the tax businesses collect on sales. If you're starting or running a business, we handle your registration and the monthly or quarterly filings, so nothing slips through the cracks.",
    forWho: 'Small business owners, shop owners, and service providers who bill clients.',
    getWhat: 'A registered GSTIN and on-time filings, with reminders before each due date.',
  },
  {
    icon: IconChartUp,
    title: 'Tax Planning Advice',
    blurb:
      'Tax planning means arranging your finances ahead of time to legally pay less tax - think investments, deductions, and timing. We map this out with you before the year ends, not after.',
    forWho: 'Anyone who wants to keep more of what they earn, especially higher earners.',
    getWhat: 'A simple plan of the deductions and investments that actually apply to you.',
  },
  {
    icon: IconShieldCheck,
    title: 'Small Business Compliance',
    blurb:
      'Compliance just means staying on the right side of the rules - bookkeeping, TDS, audits, and filings that keep your business in good standing.',
    forWho: "Small business owners who'd rather run the business than chase paperwork.",
    getWhat: 'One team handling your books and filings, so nothing is ever overdue.',
  },
]

// A flip card: the front is a big icon-illustration + heading (a stand-in
// for a real photo - see the CLAUDE.md note on the site's no-stock-photo,
// hand-drawn-illustration convention), the back is the full description.
// It flips on hover for mouse/trackpad visitors (pure CSS, purely a
// preview - see the (hover:hover) media query in index.css) and on
// click/tap/Enter/Space for everyone else, which is also what makes it
// keyboard- and screen-reader-accessible: the `flipped` state below is the
// single source of truth for aria-hidden and tabIndex on each face, so a
// keyboard user's Tab order and a screen reader's view always match what's
// visually showing, regardless of whether a mouse happens to be hovering.
function ServiceFlipCard({ service, index }) {
  const [flipped, setFlipped] = useState(false)
  const Icon = service.icon

  return (
    // data-reveal/data-reveal-delay live on this OUTER wrapper, not on
    // .flip-card itself. useScrollReveal() adds "is-visible" by mutating
    // classList directly (it's plain DOM code, not React state), and React
    // has no idea that class exists. If [data-reveal] were on .flip-card,
    // clicking the card to flip it (which changes `flipped` state and
    // re-renders with a new className string) would make React overwrite
    // the whole className attribute - silently dropping "is-visible" and
    // snapping the card back to its pre-reveal opacity:0 state. Confirmed
    // bug: click a card right after it scrolls into view and it visually
    // disappears. Keeping data-reveal on a wrapper whose className never
    // changes avoids the collision entirely.
    <div className="flip-card-wrap" data-reveal data-reveal-delay={index % 2}>
      <div className={`flip-card ${flipped ? 'flip-card--flipped' : ''}`}>
        <div className="flip-card__inner">
          {/* FRONT - a full-bleed "photo" card: this site has no stock-photo
              or image-gen source (see CLAUDE.md), so the image slot is a
              tinted gradient plus the service's own icon blown up into a
              faint watermark, instead of a small in-line glyph. A dark
              scrim at the bottom keeps the white title legible over it,
              same job a real photo's bottom gradient would do. */}
          <button
            type="button"
            className="flip-card__face flip-card__face--front"
            onClick={() => setFlipped(true)}
            aria-hidden={flipped}
            tabIndex={flipped ? -1 : 0}
          >
            <span className="flip-card__art" aria-hidden="true">
              <Icon className="flip-card__art-icon" width={132} height={132} />
            </span>
            <span className="flip-card__scrim" aria-hidden="true" />
            <span className="flip-card__front-content">
              {/* A heading element isn't valid inside <button>'s content
                  model, so the visible title here is styled text; the
                  "real" <h3> for this card lives on the back face below,
                  which keeps it once in the heading outline without
                  breaking HTML validity. */}
              <span className="flip-card__title">{service.title}</span>
              <span className="flip-card__hint">Tap for details</span>
            </span>
            <span className="flip-card__expand" aria-hidden="true">
              <IconArrowUpRight width={18} height={18} />
            </span>
          </button>

          <div
            className="flip-card__face flip-card__face--back"
            aria-hidden={!flipped}
          >
            <button
              type="button"
              className="flip-card__back-btn"
              onClick={() => setFlipped(false)}
              tabIndex={flipped ? 0 : -1}
            >
              <IconArrowUpRight width={15} height={15} aria-hidden="true" />
              <span className="sr-only">Back to {service.title} card front</span>
            </button>

            <div className="service-card__icon" aria-hidden="true">
              <Icon />
            </div>
            <h3>{service.title}</h3>
            <p>{service.blurb}</p>
            {/* <dl className="service-card__meta">
              <div>
                <dt>Who it&apos;s for</dt>
                <dd>{service.forWho}</dd>
              </div>
              <div>
                <dt>What you get</dt>
                <dd>{service.getWhat}</dd>
              </div>
            </dl> */}
            <a href="#contact" className="flip-card__cta" tabIndex={flipped ? 0 : -1}>
              Ask about this
              <span className="flip-card__cta-arrow" aria-hidden="true">
                <IconArrowRight width={16} height={16} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services" className="services">
      <div className="section__inner">
        <h2 className="section__title" data-reveal>
          What we help with
        </h2>
        <p className="section__subtitle" data-reveal>
          Four services, explained the way we&apos;d explain them to a friend -
          hover or tap a card for the details.
        </p>
        <div className="services__grid">
          {services.map((service, index) => (
            <ServiceFlipCard service={service} index={index} key={service.title} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
