import { Link, NavLink } from 'react-router'
import { nav, site } from '../data/site'
import { useTheme } from '../lib/useTheme'
import { ThemeToggle } from './ThemeToggle'

const linkBase =
  'rounded-sm px-2 py-1 font-mono text-[13px] tracking-wide transition-colors'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="grid h-8 w-8 place-items-center rounded-sm bg-accent font-mono text-xs font-bold text-bg">
            EM
          </span>
          <span className="hidden text-sm font-medium sm:block">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) =>
            item.to.startsWith('/#') ? (
              <Link
                key={item.to}
                to={item.to}
                className={`${linkBase} text-muted hover:text-accent`}
              >
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? 'text-accent'
                      : 'text-muted hover:text-accent'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    </header>
  )
}
