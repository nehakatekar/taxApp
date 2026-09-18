# TaxSwami Website

A friendly, modern marketing site for TaxSwami - built with React + Vite, plain CSS, no UI libraries, no external CDN assets.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

## Before going live

- Swap the placeholder phone number (`+91 99999 99999`), WhatsApp link, and email (`hello@taxswami.in`) in `src/components/Navbar.jsx`, `Contact.jsx`, and `Footer.jsx` for the real ones.
- Wire the contact form in `src/components/Contact.jsx` up to a real backend or a form service (e.g. Formspree) - it currently confirms locally so the flow works end to end without a server.
- Confirm the pricing figures in `src/components/Pricing.jsx` against what the team actually wants to charge.
