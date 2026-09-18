// Small hand-drawn icon set (stroke-based, 24x24, currentColor) so the site
// has zero external dependencies - no icon library, no CDN, no image files.
// Every icon shares the same visual language: rounded strokes, 1.8px weight.

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
}

export function IconDocument(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v4h4" />
      <path d="M9 12h6M9 15.5h6M9 8.5h2" />
    </svg>
  )
}

export function IconReceipt(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2.5h12v19l-2.2-1.5-2.1 1.5-2.2-1.5-2.1 1.5-2.2-1.5L6 21.5Z" />
      <path d="M9 7h6M9 10.5h6M9 14h4" />
    </svg>
  )
}

export function IconChartUp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 19h16" />
      <path d="M6 16.5V13M10.5 16.5v-6M15 16.5V9M19 16.5V6" />
      <path d="M15 5.5 19 6l-.4 4" />
    </svg>
  )
}

export function IconShieldCheck(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 5 5.2V11c0 5 3 8.4 7 10.5 4-2.1 7-5.5 7-10.5V5.2Z" />
      <path d="m9 12 2 2 4-4.5" />
    </svg>
  )
}

export function IconBriefcase(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="7.5" width="18" height="12" rx="1.6" />
      <path d="M8.5 7.5V5.8A1.8 1.8 0 0 1 10.3 4h3.4a1.8 1.8 0 0 1 1.8 1.8v1.7" />
      <path d="M3 12.5c2.7 1.4 5.7 2.1 9 2.1s6.3-.7 9-2.1" />
    </svg>
  )
}

export function IconLaptop(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4.5" y="4.5" width="15" height="10" rx="1.2" />
      <path d="M2.5 19.5h19l-1.6-3.5H4.1Z" />
      <path d="M10.5 17h3" />
    </svg>
  )
}

export function IconStore(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5 5 4h14l1 5.5" />
      <path d="M4 9.5a2.3 2.3 0 0 0 4.4 1 2.3 2.3 0 0 0 4.4 0 2.3 2.3 0 0 0 4.4 0 2.3 2.3 0 0 0 4.4-1" />
      <path d="M5.5 11v9h13v-9" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  )
}

export function IconUserPlus(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="10" cy="8" r="3.3" />
      <path d="M3.5 20c.7-3.6 3.4-5.6 6.5-5.6s5.8 2 6.5 5.6" />
      <path d="M18.5 6.5v5M16 9h5" />
    </svg>
  )
}

export function IconClock(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.5 2" />
    </svg>
  )
}

export function IconUsers(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.5" cy="8" r="3" />
      <circle cx="16.2" cy="9.2" r="2.4" />
      <path d="M3 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M14.8 14.3c2.2.2 4 1.8 4.5 4.7" />
    </svg>
  )
}

export function IconLock(props) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="9.5" rx="1.6" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
      <path d="M12 14.3v2.4" />
    </svg>
  )
}

export function IconWhatsapp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 17.5 4 20l2.6-.7A8 8 0 1 0 4 12a7.9 7.9 0 0 0 1 3.9Z" />
      <path d="M8.7 9.6c.2-.6.5-.6.8-.6h.5c.2 0 .4 0 .5.4.2.5.6 1.5.6 1.6s0 .3-.2.5l-.5.5c-.1.2-.3.3-.1.6.2.3.8 1.2 1.7 1.9 1.1.9 1.8 1.1 2 1.2.2.1.4.1.5-.1l.6-.8c.2-.2.4-.2.6-.1l1.5.8c.2.1.4.2.4.4 0 .2 0 1-.4 1.4-.4.4-1.2.9-2.3.6-1.3-.4-3.1-1.2-4.5-2.9-1.2-1.3-1.9-2.7-2.1-3.3-.2-.5-.2-1.1-.1-1.4Z" />
    </svg>
  )
}

export function IconPhone(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 3.5h3l1.4 4-2 1.6a12 12 0 0 0 5 5l1.6-2 4 1.4v3a1.5 1.5 0 0 1-1.6 1.5A15.5 15.5 0 0 1 4 4.9a1.5 1.5 0 0 1 1.5-1.4Z" />
    </svg>
  )
}

export function IconMail(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="1.6" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  )
}

export function IconChevronDown(props) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconArrowUp(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 19V5" />
      <path d="m6 11 6-6 6 6" />
    </svg>
  )
}

export function IconMessageCircle(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L4 20.5l1.2-4.3A8.5 8.5 0 1 1 21 12Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" strokeWidth="2.4" />
    </svg>
  )
}

export function IconUpload(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 15.5V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4 15.5v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  )
}

export function IconClipboardCheck(props) {
  return (
    <svg {...base} {...props}>
      <rect x="5.5" y="4.5" width="13" height="17" rx="1.6" />
      <path d="M9 4.5V3.8A1.8 1.8 0 0 1 10.8 2h2.4A1.8 1.8 0 0 1 15 3.8v.7" />
      <path d="m9 13.5 2 2 4-4.5" />
    </svg>
  )
}

export function IconSend(props) {
  return (
    <svg {...base} {...props}>
      <path d="M21 3 3 10.5l7.2 2.8L13 20.5Z" />
      <path d="M21 3 10.2 13.3" />
    </svg>
  )
}

// Used on the service flip cards: a diagonal "expand" cue on the front
// (echoes an external-link glyph, hinting "there's more here") and a plain
// rightward arrow on the back's "Ask about this" link.
export function IconArrowUpRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7" />
      <path d="M8.5 7h8.5v8.5" />
    </svg>
  )
}

export function IconArrowRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}
