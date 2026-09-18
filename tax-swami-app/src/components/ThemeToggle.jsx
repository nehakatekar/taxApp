import useTheme from '../useTheme.js'
import { IconSun, IconMoon } from './icons.jsx'

function ThemeToggle({ className = '' }) {
  const [theme, toggleTheme] = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <IconSun width={17} height={17} aria-hidden="true" />
      ) : (
        <IconMoon width={17} height={17} aria-hidden="true" />
      )}
      <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  )
}

export default ThemeToggle
