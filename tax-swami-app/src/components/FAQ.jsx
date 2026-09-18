import { useState } from 'react'
import { IconChevronDown } from './icons.jsx'

const faqs = [
  {
    question: 'Do I need to file a tax return if my income is below the taxable limit?',
    answer:
      "Not always, but it's often still a good idea - a filed return makes it easier to get loans, visas, or refunds you're owed. We can tell you in five minutes whether it's worth it for you.",
  },
  {
    question: "What's the difference between the old and new tax regime?",
    answer:
      'The old regime lets you claim more deductions (like HRA or 80C investments) but has higher rates. The new regime has lower rates but fewer deductions. We compare both for you and pick whichever saves you more.',
  },
  {
    question: 'What documents do I need to file my ITR?',
    answer:
      "Usually your Form 16 (from your employer), bank statements, and details of any other income like interest or freelance work. We'll send you a simple checklist once you get in touch.",
  },
  {
    question: 'Do I need GST registration for my small business?',
    answer:
      "If your turnover crosses a certain limit, or you sell across states or online, yes. Not sure where you stand? Tell us what your business does and we'll check for you - no charge for that first check.",
  },
  {
    question: 'What happens if I miss the ITR deadline?',
    answer:
      "You can usually still file a 'belated return' after the deadline, but you may pay a late fee and lose some benefits. The sooner you file, the less it costs - so reach out even if you're already late.",
  },
  {
    question: 'I freelance and also have a salary - can you handle both?',
    answer:
      'Yes - this is one of the most common situations we handle. We combine all your income sources into one clean return and flag any tax-saving opportunities along the way.',
  },
  {
    question: 'How is tax planning different from tax filing?',
    answer:
      'Filing reports what already happened. Planning happens before the year ends, so we can help you legally reduce what you owe - through investments, timing, or deductions you might not know about.',
  },
  {
    question: 'Is my financial information safe with you?',
    answer:
      "Yes. We're a team of qualified chartered accountants bound by professional confidentiality rules, and we only ever use your information to prepare your filings.",
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1)

  const toggle = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section id="faq" className="faq">
      <div className="section__inner">
        <h2 className="section__title" data-reveal>
          Common questions
        </h2>
        <p className="section__subtitle" data-reveal>
          Straight answers, no legal jargon.
        </p>
        <div className="faq__list" data-reveal>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`
            return (
              <div className="faq__item" key={item.question}>
                <h3 className="faq__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="faq__question"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span>{item.question}</span>
                    <span className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`}>
                      <IconChevronDown width={18} height={18} strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`faq__answer ${isOpen ? 'faq__answer--open' : ''}`}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
