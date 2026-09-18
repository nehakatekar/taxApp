import {
  IconClock,
  IconShieldCheck,
  IconClipboardCheck,
  IconSend,
  IconArrowRight,
} from './icons.jsx'
import artChat from '../assets/stepArtChat.png'
import artChecklist from '../assets/stepArtUpload.png'
import artReview from '../assets/stepArtReview.png'
import artSend from '../assets/stepArtSend.png'

const steps = [
  {
    art: artChat,
    title: 'Tell us what you need',
    detail: 'A quick WhatsApp message, call, or the form below - just say what you’re looking to get done.',
    tag: { icon: IconClock, label: 'Quick & Easy' },
  },
  {
    art: artChecklist,
    title: 'Share your documents',
    detail: 'We send a simple checklist and a secure link. No confusing portals to figure out.',
    tag: { icon: IconShieldCheck, label: 'Safe & Secure' },
  },
  {
    art: artReview,
    title: 'We prepare & review',
    detail: 'A CA prepares your filing, then a second pair of eyes checks it before anything is submitted.',
    tag: { icon: IconClipboardCheck, label: 'Double Checked' },
  },
  {
    art: artSend,
    title: 'File & confirm',
    detail: 'We file it, send you the confirmation, and keep a copy on hand for whenever you need it.',
    tag: { icon: IconSend, label: 'Done for You' },
  },
]

function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works">
      {/* Purely decorative background dressing - a soft blob and a dotted
          grid, both aria-hidden, sitting behind the real content. */}
      <span className="how-it-works__blob" aria-hidden="true" />
      <span className="how-it-works__dots" aria-hidden="true" />

      <div className="section__inner">
        <div className="how-it-works__eyebrow-row" data-reveal>
          <span className="how-it-works__eyebrow-line" aria-hidden="true" />
          <span className="how-it-works__eyebrow">Our Process</span>
          <span className="how-it-works__eyebrow-line" aria-hidden="true" />
        </div>
        <h2 className="section__title" data-reveal>
          How working with us goes
        </h2>
        <p className="section__subtitle" data-reveal>
          Four straightforward steps - no surprise paperwork along the way.
        </p>
        <ol className="timeline">
          {steps.map((step, index) => (
            <li
              className="timeline__step"
              key={step.title}
              data-reveal
              data-reveal-delay={index % 4}
            >
              <span className="timeline__number">
                {String(index + 1).padStart(2, '0')}
              </span>

              <img
                // className="timeline__art"
                src={step.art}
                alt=""
                width="auto"
                height="auto"
                loading="lazy"
              />

              <h3>{step.title}</h3>
              <p>{step.detail}</p>

              <span className="timeline__tag">
                <step.tag.icon width={15} height={15} aria-hidden="true" />
                {step.tag.label}
              </span>

              {index < steps.length - 1 && (
                <span className="timeline__connector" aria-hidden="true">
                  <span className="timeline__connector-dots" />
                  <IconArrowRight width={16} height={16} />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default HowItWorks
