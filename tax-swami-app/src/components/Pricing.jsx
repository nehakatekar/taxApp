const plans = [
  {
    name: 'Basic',
    price: '₹999',
    tagline: 'For simple salaried returns',
    features: [
      'ITR filing for salaried income',
      'One round of document review',
      'Filed before the deadline',
      'Filing confirmation & copy for your records',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '₹2,499',
    tagline: 'For freelancers & multiple income sources',
    features: [
      'Everything in Basic',
      'Freelance, rental, or capital gains income',
      'Personalised tax-saving suggestions',
      'Priority WhatsApp support',
    ],
    cta: 'Get Started',
    highlighted: true,
  },
  {
    name: 'Business',
    price: 'Custom quote',
    tagline: 'For GST & compliance needs',
    features: [
      'GST registration & ongoing filings',
      'Bookkeeping support',
      'Compliance & TDS handling',
      'A dedicated point of contact',
    ],
    cta: 'Talk to Us',
    highlighted: false,
  },
]

function Pricing() {
  return (
    <section id="pricing" className="pricing">
      <div className="section__inner">
        <h2 className="section__title" data-reveal>
          Simple, upfront pricing
        </h2>
        <p className="section__subtitle" data-reveal>
          No hidden fees. Pick what fits, or ask us and we&apos;ll point you the right way.
        </p>
        <div className="pricing__grid">
          {plans.map((plan, index) => (
            <div
              className={`pricing-card ${plan.highlighted ? 'pricing-card--highlighted' : ''}`}
              key={plan.name}
              data-reveal
              data-reveal-delay={index}
            >
              {plan.highlighted && (
                <span className="pricing-card__badge">Most popular</span>
              )}
              <h3>{plan.name}</h3>
              <p className="pricing-card__price">{plan.price}</p>
              <p className="pricing-card__tagline">{plan.tagline}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#contact" className="btn btn--primary btn--full">
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
        <p className="pricing__note">
          Prices shown are starting points - your final quote depends on your
          specific situation. We&apos;ll always confirm the cost before we start.
        </p>
      </div>
    </section>
  )
}

export default Pricing
