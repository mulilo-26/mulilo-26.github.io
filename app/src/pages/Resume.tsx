import { Link } from 'react-router'
import { projects } from '../data/projects'
import { education, site, skills } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

function Heading({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
      {children}
    </h2>
  )
}

export default function Resume() {
  usePageMeta(
    `Résumé | ${site.name}`,
    `${site.name} — ${site.role}. Education, technical skills, and selected projects.`,
  )

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
        Résumé
      </p>

      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-3 text-lg text-muted">{site.role}</p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {site.cvAvailable ? (
          <a
            href={site.cvPath}
            download
            className="rounded-sm bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Download CV (PDF)
          </a>
        ) : (
          <span className="rounded-sm border border-dashed border-border px-5 py-3 font-mono text-xs text-muted">
            CV is being updated — ask for the latest copy
          </span>
        )}

        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-sm border border-border px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
        >
          LinkedIn ↗
        </a>
      </div>

      <div className="mt-16 space-y-12">
        <section className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[160px_1fr]">
          <Heading>Education</Heading>
          <div>
            <p className="font-medium">{education.degree}</p>
            <p className="mt-1 text-sm text-muted">{education.status}</p>
            <p className="mt-1 text-sm text-muted">Focus: {education.focus}</p>
          </div>
        </section>

        {skills.map((group) => (
          <section
            key={group.label}
            className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[160px_1fr]"
          >
            <Heading>{group.label}</Heading>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[160px_1fr]">
          <Heading>Projects</Heading>
          <ul className="divide-y divide-border">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/work/${project.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block text-sm font-medium transition-colors group-hover:text-accent">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {project.discipline}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="grid gap-4 border-t border-border pt-6 sm:grid-cols-[160px_1fr]">
          <Heading>Contact</Heading>
          <div className="flex flex-col gap-2 font-mono text-sm">
            {site.email && (
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            )}
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-accent"
            >
              GitHub ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
