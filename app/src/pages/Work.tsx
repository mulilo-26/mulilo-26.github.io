import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { disciplines, projects } from '../data/projects'
import { site } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

export default function Work() {
  usePageMeta(
    `Work | ${site.name}`,
    'Selected projects across local AI, developer tooling, and networking.',
  )

  const [filter, setFilter] = useState('All')
  const shown =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.discipline === filter)

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
      <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
        Work
      </p>

      <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
        Three systems, three constraints.
      </h1>

      <p className="mt-5 max-w-xl text-muted">
        Each project here was limited by something real — memory, bandwidth, or a
        token budget. The write-ups cover what broke, what I changed, and what I
        would do differently.
      </p>

      <div
        role="group"
        aria-label="Filter projects by discipline"
        className="mt-10 flex flex-wrap gap-2"
      >
        {disciplines.map((discipline) => {
          const active = filter === discipline
          return (
            <button
              key={discipline}
              type="button"
              onClick={() => setFilter(discipline)}
              aria-pressed={active}
              className={`rounded-sm border px-3 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted hover:border-muted hover:text-text'
              }`}
            >
              {discipline}
            </button>
          )
        })}
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <p className="mt-12 font-mono text-[11px] text-muted">
        {String(shown.length).padStart(2, '0')} of {String(projects.length).padStart(2, '0')} shown
      </p>
    </div>
  )
}
