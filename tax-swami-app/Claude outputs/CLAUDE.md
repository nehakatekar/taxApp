# CLAUDE.md

Guidance for Claude Code (or any future agent) working in this repo.

## What this is

TaxSwami marketing site - a small tax/finance company (income tax filing, GST
registration, tax planning, small-business compliance). Audience is everyday
people and small-business owners, not tax experts, so copy stays plain-spoken
and the design stays friendly rather than corporate, while still reading as
modern and trustworthy (the team is chartered accountants).

## Stack

- Vite + React 18, function components and hooks only, no class components.
- JavaScript + JSX, no TypeScript.
- Plain CSS in `src/index.css` - no CSS-in-JS, no Tailwind, no component
  library, no CDN dependencies. Keep it that way unless asked to change it.
  All animation (marquee, blobs, count-up, parallax, reveal, nav compacting,
  scroll progress) is hand-rolled CSS + vanilla JS/IntersectionObserver - no
  animation library either.
- One component per landing-page section, composed in `src/App.jsx`.
- Icons are hand-drawn inline SVGs in `src/components/icons.jsx` - no icon
  library. Add new icons there in the same stroke style (24x24, `currentColor`,
  1.8px stroke) rather than pulling in a dependency.

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Structure

```
index.html
src/
  main.jsx
  App.jsx                    # composes all sections + calls useScrollReveal()
  index.css                  # all styles: tokens, layout, components, breakpoints
  useScrollReveal.js         # IntersectionObserver fade/slide-in for [data-reveal]
  useScrollSpy.js            # tracks active section id for the nav
  useCountUp.js              # IntersectionObserver-triggered number count-up (hero stats)
  components/
    Navbar.jsx                # sticky nav, mobile hamburger menu, scrollspy active
                               # link, compacts (.navbar--compact) once past the hero
    Hero.jsx                  # two-col desktop layout, inline SVG illustration,
                               # count-up stats, pointer-parallax on the art, drifting
                               # decorative background blobs
    Partners.jsx               # auto-scrolling marquee of PLACEHOLDER partner marks
    Services.jsx                # 4 flip cards (image/icon+heading front, full
                                 # text back), data-driven from an array
    HowItWorks.jsx               # 4-step "how it works" timeline
    WhoItsFor.jsx                 # 4 audience cards w/ icons
    Team.jsx                       # 4 PLACEHOLDER role-based team cards w/ monogram avatars
    Pricing.jsx                     # 3 tiers, data-driven from an array
    FAQ.jsx                          # accordion, useState-driven, keyboard accessible
    Contact.jsx                       # WhatsApp/call/email links w/ icons + booking form
    Footer.jsx                         # incl. a local-only "deadline reminder" signup strip
    StickyMobileCta.jsx                 # fixed "Book a Call" bar, mobile only
    ScrollProgress.jsx                   # thin fixed top-of-viewport scroll progress bar
    BackToTop.jsx                         # fixed back-to-top button, appears past the hero
    icons.jsx                              # the whole icon set, hand-coded inline SVG
```

Design tokens (colors, radius, shadows, max-width) live as CSS custom
properties on `:root` in `index.css`. Mobile-first: base styles target phones,
overrides live in `@media (min-width: 640px)` and `@media (min-width: 960px)`.

## Placeholder content - Team & Partners

`Team.jsx` and `Partners.jsx` are intentionally generic:

- **Team** shows 4 role titles ("Founding Partner", "Senior Tax Consultant",
  etc.) with initials-monogram avatars instead of real names or photos. No
  real people were supplied, and inventing names/photos would put fabricated
  staff on a real business's site. Replace `roles` in `Team.jsx` with real
  people (and swap the monogram `<div>` for a real `<img>`) before launch.
- **Partners** shows an auto-scrolling strip of generic abstract marks
  ("Partner Network", "Audit Alliance", etc.) rather than real company names
  or logos - using a real company's name/mark here would falsely imply a
  partnership that doesn't exist. Replace the `marks` array in `Partners.jsx`
  with real partner/press logos (swap `<AbstractMark>` for `<img>`) once
  they're available; the marquee/hover-pause/reduced-motion behavior doesn't
  need to change.

Both sections say "placeholder" in their own copy - keep that until real
content is in.

## Scroll-reveal pattern (`data-reveal`)

Add `data-reveal` (and optionally `data-reveal-delay="1"`, `"2"`, or `"3"`)
to an element to have it fade/slide in the first time it scrolls into view.
`useScrollReveal()` (called once in `App.jsx`) wires this up globally via
IntersectionObserver - no per-component boilerplate needed. The delay
classes are used to stagger items within a grid (see `Team.jsx`,
`HowItWorks.jsx`'s `data-reveal-delay={index}` usage).

**Important:** this hook has a 2.5s safety-net timer that force-reveals
everything even if the observer never fires. Do not remove it - testing
found that a full-page render that never "scrolls" in the normal sense (a
search-engine crawler, a zoomed-out/print view, or an automated full-page
screenshot tool) can otherwise leave content permanently at `opacity: 0`.
If you add new `[data-reveal]` elements, they're covered automatically; you
don't need to touch the hook.

`useCountUp.js` follows the same safety-net philosophy for the hero's
animated numbers, with one important difference: **its safety net snaps
straight to the final value rather than starting the eased animation late.**
An earlier version started the animated count on the safety timer too, which
meant a screenshot taken at the documented ~2.8s mark could still catch the
number mid-count (e.g. "7+" instead of "10+") if the observer never fired.
If you touch this hook, keep the "snap, don't animate" behavior on the
safety-net path.

## Flip-card pattern (`Services.jsx`)

Each service card is a real CSS 3D flip. **Front face** is a full-bleed
"image" card (a tinted gradient + the service's own icon blown up into a
large, faint watermark - this site has no stock-photo/image-gen source, so
that's the stand-in for a real photo) with a bottom scrim, the service title
in white bottom-left, and a decorative circular arrow (↗) bottom-right
hinting there's more. **Back face** is a plain white card: icon, heading,
description, "who it's for" / "what you get", an "Ask about this →" link
down to `#contact`, and a small circular ↙ button top-right to flip back.
Flips on hover (desktop, CSS-only preview) or on click/tap/Enter/Space
(everyone, and what actually drives accessibility). This was redesigned
once already from an earlier, plainer bordered-card version - the client
supplied a reference screenshot (dark full-bleed image front / white
detail-card back) and asked for that treatment; the notes below still
apply to the current version. Notes for anyone touching this component:

- **Per-card front gradients are picked by DOM position** (`.flip-card-wrap
  :nth-child(1..4)` in `index.css`), not by service content, so they'll
  silently stay in the same visual order if you reorder the `services`
  array - that's fine (still four distinct, on-brand teal/amber gradients),
  just don't expect gradient N to "belong" to a particular service.
- **The front's watermark icon and the back's small icon share the same
  `<Icon>` component**, just rendered at very different sizes/opacity via
  CSS (`.flip-card__art-icon` vs `.flip-card .service-card__icon`) - add a
  new service by giving it an icon from `icons.jsx` the same way the
  existing four do; no extra image asset is needed.
- **The back-face flip-back control is small (32px) and behind a 0.6s 3D
  rotation.** If you ever write a test that clicks it, wait for the flip
  transition to finish first (~700ms is safe). A click dispatched while the
  card is still mid-rotation can compute a skewed, non-square bounding box
  for small elements inside the rotating face (an inherent quirk of
  `getBoundingClientRect()` under an in-progress 3D transform) and miss the
  target - reproduced this while building the redesign; it's a timing
  artifact of testing mid-animation, not a real bug (a real user doesn't
  click faster than they can see the flip complete), but it's a sharp edge
  worth knowing about if this component grows more small interactive
  elements.

- **Markup structure:** `.flip-card-wrap` (data-reveal target) >
  `.flip-card` (perspective scene, gets `.flip-card--flipped`) >
  `.flip-card__inner` (the element that actually rotates, `transform-style:
  preserve-3d`) > two `.flip-card__face` children (front/back), each
  `position: absolute` + `backface-visibility: hidden`. The back face is
  pre-rotated `rotateY(180deg)` in CSS so that when `.flip-card--flipped`
  rotates the whole inner element 180deg, the combined rotation lands back
  at an identity-equivalent orientation and the back face reads correctly
  rather than mirrored.
- **`data-reveal` lives on a separate outer wrapper (`.flip-card-wrap`), not
  on `.flip-card` itself - this is deliberate, not accidental duplication.**
  `useScrollReveal()` adds the `is-visible` class by mutating `classList`
  directly; it's plain DOM code with no idea React exists. `.flip-card`'s
  className is React-state-driven (`flip-card--flipped` toggles on click).
  If `data-reveal` were on `.flip-card`, clicking a card to flip it would
  trigger a re-render that makes React overwrite the whole `className`
  attribute with its own computed string - silently dropping the
  externally-added `is-visible` class and snapping the card back to its
  pre-reveal `opacity: 0` state. **This was a real, reproduced bug**: tap a
  card right after it scrolls into view and it visually disappears (front
  and back both fade to invisible, confirmed via computed-style dump showing
  `opacity: 0` on the wrapper post-click even though every face-level style
  was correct). Fixed by keeping `data-reveal`/`is-visible` on a wrapper
  whose className React never touches. **If you ever add more state-driven
  className changes to an element, check whether that element (or an
  ancestor) also carries `data-reveal` - the same collision will recur.**
- **Explicit `height`, not `min-height`, on `.flip-card`** - both faces are
  `position: absolute` and contribute nothing to flow height, so a
  `min-height` alone doesn't reliably give them a definite height to
  resolve percentages against. Current values (measured against actual
  back-face content, not guessed): `560px` base/mobile, `590px` at the
  `960px` breakpoint (narrower 4-column cards wrap the same text onto more
  lines, so they need a bit more room). If you edit the back-face copy or
  typography, re-measure with a real browser (or Playwright's
  `scrollHeight` vs `clientHeight` on `.flip-card__face--back`) at ~320,
  390, 750, and 1440px before shipping - don't eyeball it.
- **`<button>` can't contain a heading element** (only "phrasing content" is
  valid inside `<button>`), which is why the front face's title is a styled
  `<span>` (`.flip-card__title`) rather than an `<h3>`. The real `<h3>` for
  each card lives on the back-face `<div>` instead, so the heading still
  appears once in the page's heading outline without invalid HTML.
- **Accessibility:** the `flipped` boolean in `ServiceFlipCard` is the single
  source of truth for `aria-hidden`/`tabIndex` on both faces, so a keyboard
  user's tab order and a screen reader's view always match the *committed*
  (click/Enter/Space-triggered) state. The desktop-only CSS `:hover` preview
  (gated to `@media (hover: hover) and (pointer: fine)`) is purely visual -
  it never touches React state or the aria attributes, which is what keeps a
  touchscreen tap from fighting a phantom hover-flip.

## Known gotchas (found by testing - don't reintroduce these)

- **Never put `backdrop-filter` directly on `.navbar`.** It turns that
  element into the containing block for its `position: fixed` descendants
  (the mobile nav panel), which collapses the full-screen mobile menu to a
  sliver. The blur lives on `.navbar::before` instead - keep it there. Same
  reasoning applies to `.sticky-cta`, which is fine to blur directly since it
  has no fixed-position descendants of its own.
- **Highlighted pricing card text color:** rules like `.pricing-card li` and
  `.pricing-card--highlighted li` have equal CSS specificity, so source order
  decides the winner, not which one "sounds" more specific. The highlighted
  variant uses the doubled selector `.pricing-card.pricing-card--highlighted`
  to force higher specificity so it can't silently lose to the base rule
  again. Follow that pattern for any other `--highlighted`/state-variant
  overrides you add to `.pricing-card`.
- **Scroll-reveal safety net** - see above. Don't delete the `setTimeout`
  fallback in `useScrollReveal.js`, and keep `useCountUp.js`'s safety net
  snapping to the final value instead of animating.
- **Don't set `overflow-x: hidden` on both `html` and `body`.** It did the
  quiet damage of breaking `position: sticky` sitewide: when both elements
  have a non-`visible` `overflow-x`, `overflow-y` computes to `auto` on both
  (per the CSS overflow spec's visible/non-visible coupling rule), which
  turns `<body>` into its *own* nested scroll container instead of just the
  `<html>` root. `.navbar`'s sticky positioning then resolves against that
  inert `<body>` box rather than the real scrolling viewport, so it just
  scrolls away with the page instead of sticking - with no console error and
  no visual clue except "the sticky nav doesn't stick." (This is exactly
  what happened here; it went undetected in earlier rounds because nothing
  had tested the navbar mid-scroll, only the mobile off-canvas panel.) Fix:
  don't set `overflow-x` on the root elements at all - clip known-wide
  content locally instead (`.hero` and `.partners__marquee` already do this
  for the background blobs and the marquee track). If horizontal overflow
  ever needs a global backstop again, put `overflow-x: hidden` on `html`
  only, never on `body` too, and re-verify `.navbar` still sticks mid-scroll
  at both a phone and desktop width before shipping.
- **Grid items and `min-width: auto`:** `.contact__form-wrap` sits in a CSS
  grid cell (`.contact__inner`). Its `<select>`'s long option text (e.g.
  "GST Registration & Filing") set the cell's intrinsic min-content width
  wider than the track, overflowing the layout at narrow phone widths (found
  at 320px - a real, if small, horizontal-scroll bug, distinct from the
  sticky-nav issue above). Fixed with `min-width: 0` on both
  `.contact__form-wrap` and `.contact__form select`. If you add another form
  or long-text control inside a grid/flex cell, check for this same
  overflow-by-intrinsic-content failure mode, especially below 375px.
- **Desktop nav links need an explicit `visibility: visible` reset.** The
  mobile-first base rule for `.navbar__nav` sets `visibility: hidden` (it's
  an off-canvas panel that's only shown via `.navbar__nav--open`). The
  `@media (min-width: 960px)` override turns the panel into an inline row
  but must also reset `visibility: visible` - otherwise the desktop nav
  links exist in the DOM, take up layout space, and are simply invisible,
  with no console error. (This had been broken since the nav was first
  built; it went unnoticed because testing checked the mobile panel opening/
  closing but never actually looked closely at the desktop nav row itself.)
  If you touch the 960px breakpoint block for `.navbar__nav`, keep this
  reset and re-check the desktop nav is visibly there, not just present in
  the DOM.
- **`useScrollSpy.js` must always call `setActiveId`, including with
  `null`.** The original version only called `setActiveId(topId)` inside
  `if (topId)`, so once every tracked section had scrolled out of view (the
  hero/partners area above everything, or right after "Back to Top") the
  observer callback still fired but never cleared the *previous* active id -
  the last-highlighted nav link (e.g. "Contact") stayed underlined forever,
  even back at the top of the page. Fixed by always calling `setActiveId`,
  clearing to `null` when nothing has a positive intersection ratio. If you
  touch this hook, keep the unconditional `setActiveId` call and re-verify:
  scroll to the bottom section, then back to the very top - no nav link
  should stay highlighted.
- **`vite.config.js` sets `base: './'`** (relative asset paths) so the
  production build isn't broken if someone ever tries to preview `dist/`
  from a static file listing rather than a proper web server. Don't remove
  it without a reason.
- **npm install on some sandboxed/ARM machines** can hit the known npm
  optional-dependencies bug (`Cannot find module @rollup/rollup-*`,
  https://github.com/npm/cli/issues/4828). Fix: `rm -rf node_modules
  package-lock.json`, `npm cache clean --force`, then `npm install` again.

## Before going live (still placeholder)

- Phone/WhatsApp/email are placeholders (`+91 99999 99999`,
  `hello@taxswami.in`) in `Navbar.jsx`, `Contact.jsx`, `StickyMobileCta.jsx`
  (via the shared `#contact` anchor), and `Footer.jsx`.
- `Contact.jsx`'s form and `Footer.jsx`'s newsletter strip both confirm
  locally (no backend) - wire both to a real endpoint or a form/email
  service (e.g. Formspree, Mailchimp) before launch.
- Pricing figures in `Pricing.jsx` are starting points; confirm real numbers
  with the team.
- The hero's trust stats (`Hero.jsx`, the `stats` array - "10+ years", "500+
  returns", "<48hrs") are placeholder figures. Replace with real numbers
  before launch; don't publish unverified claims.
- **Team and Partners content is placeholder** - see the dedicated section
  above. Replace both before launch.

## Testing notes

There's no automated test suite yet. When changing layout/CSS, at minimum:
sanity-check `npm run build` succeeds, and manually verify at a phone width
(~375–390px), a narrow phone width (~320px), and desktop width (~1440px).
Specifically check:

- The mobile menu opening/closing (full height, not collapsed).
- The highlighted pricing card (white text, not muted gray).
- The scroll-reveal safety net (see above) and the count-up safety net
  (hero stats should read their final value, not a mid-count number, if
  captured without scrolling).
- **The navbar actually sticks to the top when you scroll the page**, on
  both phone and desktop widths, and the desktop nav links are visible (not
  just present in the DOM) - see the two navbar gotchas above; both broke
  silently with zero build/console errors.
- No horizontal scroll at any of the three widths above, especially near the
  contact form and the partners marquee.

If testing with an automated full-page screenshot tool, wait ~2.8s after
load before capturing, or the reveal/count-up safety-net timers won't have
fired yet and most of the page will appear blank (or mid-count-up) in that
one screenshot (real users scrolling normally are unaffected).
