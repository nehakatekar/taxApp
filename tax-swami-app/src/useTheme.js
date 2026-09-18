import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'taxswami-theme'

function getPreferredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can throw in private browsing / disabled storage - fall
    // through to the system preference instead of crashing the page.
  }
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

// Reads the theme index.html's inline script already applied to
// <html data-theme> before React mounted (so there's no flash of the wrong
// theme), exposes it plus a toggle, follows the OS-level setting live until
// the person makes an explicit choice, and persists that choice.
function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined' && document.documentElement.dataset.theme) {
      return document.documentElement.dataset.theme
    }
    return getPreferredTheme()
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    let hasStoredChoice = false
    try {
      hasStoredChoice = window.localStorage.getItem(STORAGE_KEY) !== null
    } catch {
      hasStoredChoice = false
    }
    if (hasStoredChoice || !window.matchMedia) return undefined

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // Best-effort persistence only - the toggle still works this visit.
      }
      return next
    })
  }, [])

  return [theme, toggleTheme]
}

export default useTheme
