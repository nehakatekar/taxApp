# TaxSwami Website

A marketing landing page for **TaxSwami**, a small tax and finance practice run by chartered accountants. It covers income tax filing, GST registration, tax planning and small-business compliance. The site is written for everyday people and small-business owners, so the copy is plain and the design is friendly.

![Desktop preview](tax-swami-app/Claude%20outputs/v2-desktop-hero.png)

## Tech stack

- [React 18](https://react.dev/) with function components and hooks
- [Vite 5](https://vitejs.dev/) for dev server and build
- Plain CSS in a single file (`src/index.css`). There is no Tailwind, no CSS-in-JS and no component library.
- Hand-drawn inline SVG icons (`src/components/icons.jsx`)
- One runtime dependency besides React: [`react-fast-marquee`](https://www.npmjs.com/package/react-fast-marquee) for the partners strip

## Features

- Sections: Hero, Partners, Services, How It Works, Who It's For, Team, Pricing, FAQ, Contact and Footer
- Light and dark theme toggle. It follows the system preference and remembers your choice, with no flash on load.
- Sticky navbar that shrinks after you scroll past the hero, a mobile hamburger menu, and highlighting of the current section
- 3D flip cards for services, keyboard accessible
- Scroll-reveal animations, count-up hero stats, pointer parallax, a scroll progress bar and a back-to-top button
- Sticky "Book a Call" bar on mobile
- Accessible FAQ accordion and a skip-to-content link
- Mobile-first responsive layout with breakpoints at 640px and 960px

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
cd tax-swami-app
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

### Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the local dev server               |
| `npm run build`   | Build for production into `dist/`        |
| `npm run preview` | Serve the production build locally       |

`vite.config.js` sets `base: './'`, so the built `dist/` folder works from any path.

## Project structure

```
tax-swami-app/
├── index.html              # entry HTML + inline theme bootstrap script
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx             # composes all page sections
│   ├── index.css           # design tokens, layout, components, breakpoints
│   ├── useScrollReveal.js  # fade/slide-in for [data-reveal] elements
│   ├── useScrollSpy.js     # active-section tracking for the nav
│   ├── useCountUp.js       # animated hero numbers
│   ├── useTheme.js         # light/dark theme state
│   ├── assets/             # "How it works" step illustrations
│   └── components/         # one component per section + shared UI
└── Claude outputs/         # reference screenshots and earlier file versions
```

## Before going live

Some content is still placeholder and must be replaced before launch:

- **Contact details:** replace the phone/WhatsApp number (`+91 99999 99999`) and email (`hello@taxswami.in`) in `Navbar.jsx`, `Contact.jsx` and `Footer.jsx`.
- **Forms:** the contact form and the footer reminder signup only confirm locally. Connect them to a backend or a form service such as Formspree or Mailchimp.
- **Pricing:** check the figures in `Pricing.jsx` with the team.
- **Hero stats:** the numbers in `Hero.jsx` ("10+ years", "500+ returns", "<48hrs") are placeholders.
- **Team and Partners:** `Team.jsx` and `Partners.jsx` show generic roles and abstract logos. Replace them with real people and real partner logos.

## Testing

There is no automated test suite yet. After layout or CSS changes, run `npm run build`, then check the site by hand at about 320px, 375–390px and 1440px wide. Look for:

- The mobile menu opens and closes at full height
- The navbar stays stuck to the top while scrolling, and the desktop nav links are visible
- There is no horizontal scroll, especially around the contact form and the partners marquee
- The highlighted pricing card has readable white text

For contributor notes and known issues, see [`tax-swami-app/CLAUDE.md`](tax-swami-app/CLAUDE.md).
