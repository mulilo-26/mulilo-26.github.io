import { Link } from 'react-router'
import { nav, site } from '../data/site'
import { InstallButton } from './InstallButton'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-lg font-semibold">{site.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-mono text-xs text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              GitHub ↗
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-muted transition-colors hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <div className="mt-2">
              <InstallButton />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 font-mono text-[11px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p>Built with React, Vite and Tailwind</p>
        </div>
      </div>
    </footer>
  )
}
