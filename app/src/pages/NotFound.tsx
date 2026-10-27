import { Link } from 'react-router'
import { usePageMeta } from '../lib/usePageMeta'
import { site } from '../data/site'

export default function NotFound() {
  usePageMeta(`Page not found | ${site.name}`)

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-6 py-24 sm:py-32">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
        Error 404
      </p>

      <h1 className="mt-6 text-6xl font-semibold tracking-tight sm:text-8xl">
        Not found
      </h1>

      <p className="mt-6 max-w-md text-muted">
        This path does not exist. If you followed a link from somewhere, that link
        is probably out of date — the projects are all still under{' '}
        <span className="font-mono text-text">/work</span>.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/"
          className="rounded-sm bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
        >
          Back home
        </Link>
        <Link
          to="/work"
          className="rounded-sm border border-border px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          View work
        </Link>
      </div>
    </div>
  )
}
