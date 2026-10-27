import { Link } from 'react-router'
import type { Project } from '../data/projects'
import { ProjectCover } from './ProjectCover'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article>
      <Link to={`/work/${project.slug}`} className="group block">
        <ProjectCover project={project} />

        <div className="mt-5 flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
            {project.title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-1 font-mono text-sm text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent"
          >
            →
          </span>
        </div>

        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
          {project.subtitle}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </Link>

      {project.metrics.length > 0 && (
        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-3">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex items-baseline gap-2">
              <dt className="font-mono text-[10px] tracking-wider text-muted uppercase">
                {metric.label}
              </dt>
              <dd className="font-mono text-xs text-accent">{metric.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  )
}
