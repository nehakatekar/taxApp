import { useState } from 'react'
import { IconWhatsapp, IconPhone, IconMail } from './icons.jsx'

const initialForm = {
  name: '',
  phone: '',
  service: 'Income Tax Return Filing',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Hook this up to a real backend or a form service (e.g. Formspree).
    // For now we confirm locally so the flow works end to end.
    setSubmitted(true)
  }

  return (
    <section id="contact" className="contact">
      <div className="section__inner contact__inner">
        <div className="contact__intro" data-reveal>
          <h2 className="section__title">Let&apos;s sort your taxes</h2>
          <p className="section__subtitle">
            Message us, call, or fill in the form - whichever&apos;s easiest.
            We usually reply within a few hours.
          </p>

          <div className="contact__methods">
            <a
              className="contact__method"
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact__method-icon" aria-hidden="true">
                <IconWhatsapp width={20} height={20} />
              </span>
              <span className="contact__method-text">
                <span className="contact__method-label">WhatsApp</span>
                <span>Chat with us directly</span>
              </span>
            </a>
            <a className="contact__method" href="tel:+919999999999">
              <span className="contact__method-icon" aria-hidden="true">
                <IconPhone width={20} height={20} />
              </span>
              <span className="contact__method-text">
                <span className="contact__method-label">Call</span>
                <span>+91 99999 99999</span>
              </span>
            </a>
            <a className="contact__method" href="mailto:hello@taxswami.in">
              <span className="contact__method-icon" aria-hidden="true">
                <IconMail width={20} height={20} />
              </span>
              <span className="contact__method-text">
                <span className="contact__method-label">Email</span>
                <span>hello@taxswami.in</span>
              </span>
            </a>
          </div>
        </div>

        <div className="contact__form-wrap" data-reveal data-reveal-delay="1">
          {submitted ? (
            <div className="contact__success" role="status">
              <h3>Thanks - we&apos;ve got it!</h3>
              <p>
                One of our CAs will reach out within one business day. If
                it&apos;s urgent, message us on WhatsApp instead.
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={form.name}
                onChange={handleChange}
              />

              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={handleChange}
              />

              <label htmlFor="service">What do you need help with?</label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
              >
                <option>Income Tax Return Filing</option>
                <option>GST Registration & Filing</option>
                <option>Tax Planning Advice</option>
                <option>Small Business Compliance</option>
                <option>Not sure yet</option>
              </select>

              <label htmlFor="message">Anything else we should know? (optional)</label>
              <textarea
                id="message"
                name="message"
                rows="3"
                value={form.message}
                onChange={handleChange}
              />

              <button type="submit" className="btn btn--primary btn--full">
                Request a Free Callback
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default Contact
