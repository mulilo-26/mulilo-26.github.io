import { site } from '../data/site'
import { SectionLabel } from './SectionLabel'

const socials = [
  {
    label: 'LinkedIn',
    href: site.linkedin,
    note: 'Best place to reach me',
  },
  {
    label: 'GitHub',
    href: site.github,
    note: 'Code and project history',
  },
]

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
      <SectionLabel index="03">Contact</SectionLabel>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <h3 className="max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Let&apos;s talk about data, systems, or something you&apos;re stuck on.
          </h3>
          <p className="mt-4 max-w-md text-muted">
            I&apos;m open to internships, junior roles, and collaborative projects —
            particularly anything involving databases, data pipelines, or local
            tooling.
          </p>

          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              {site.email}
            </a>
          ) : (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Message me on LinkedIn ↗
            </a>
          )}
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {socials.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent"
              >
                <span>
                  <span className="block font-medium">{item.label}</span>
                  <span className="mt-1 block font-mono text-xs text-muted">
                    {item.note}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
