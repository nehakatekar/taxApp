import { useState } from 'react'

// A "tax deadline reminders" signup strip. Like the Contact form, this
// confirms locally (no backend yet) - wire it to a real email service
// before launch.
function NewsletterStrip() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="footer__newsletter">
      <div>
        <p className="footer__newsletter-title">Never miss a deadline</p>
        <p className="footer__newsletter-copy">
          A short reminder email before ITR and GST due dates - nothing else.
        </p>
      </div>
      {submitted ? (
        <p className="footer__newsletter-success" role="status">
          You&apos;re on the list - we&apos;ll remind you before the next deadline.
        </p>
      ) : (
        <form className="footer__newsletter-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="btn btn--primary">
            Remind me
          </button>
        </form>
      )}
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="section__inner footer__newsletter-wrap">
        <NewsletterStrip />
      </div>
      <div className="footer__inner">
        <div className="footer__brand-block">
          <p className="footer__brand">TaxSwami</p>
          <p className="footer__tagline">Friendly tax filing and compliance, handled by chartered accountants.</p>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#team">Team</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer__contact">
          <a href="tel:+919999999999">+91 99999 99999</a>
          <a href="mailto:hello@taxswami.in">hello@taxswami.in</a>
        </div>
      </div>
      <p className="footer__copyright">
        © {new Date().getFullYear()} TaxSwami. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
