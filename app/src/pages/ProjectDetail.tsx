import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { ProjectCover } from '../components/ProjectCover'
import { getProject, nextProject } from '../data/projects'
import { site } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'
import NotFound from './NotFound'

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
        {label}
      </dt>
      <dd className="text-right text-xs">{value}</dd>
    </div>
  )
}

function Block({
  id,
  index,
  title,
  children,
}: {
  id: string
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] text-accent">{index}</span>
        <h2 className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  )
}

const sections = [
  { id: 'problem', label: 'Problem' },
  { id: 'constraints', label: 'Constraints' },
  { id: 'approach', label: 'Approach' },
  { id: 'result', label: 'Result' },
  { id: 'retrospective', label: 'Retrospective' },
]

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  usePageMeta(
    project ? `${project.title} | ${site.name}` : `Page not found | ${site.name}`,
    project?.summary,
  )

  if (!project) return <NotFound />

  const study = project.caseStudy
  const next = nextProject(project.slug)

  return (
    <article className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <Link
        to="/work"
        className="font-mono text-xs text-muted transition-colors hover:text-accent"
      >
        ← All projects
      </Link>

      <header className="mt-8 max-w-3xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
          {project.discipline}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{project.subtitle}</p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_300px] lg:gap-12">
        <ProjectCover project={project} />

        <aside className="space-y-6">
          <dl className="divide-y divide-border border-y border-border">
            <MetaRow label="Role" value={project.role} />
            {project.year !== null && (
              <MetaRow label="Year" value={String(project.year)} />
            )}
            {project.timeline !== null && (
              <MetaRow label="Timeline" value={project.timeline} />
            )}
            <MetaRow label="Discipline" value={project.discipline} />
          </dl>

          {project.metrics.length > 0 && (
            <dl className="grid grid-cols-2 gap-4">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="border border-border p-3">
                  <dt className="font-mono text-[9px] tracking-[0.14em] text-muted uppercase">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 font-mono text-lg text-accent">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
              Stack
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-sm border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {(project.links.repo || project.links.live) && (
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-accent hover:underline"
                >
                  Live site ↗
                </a>
              )}
              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-accent hover:underline"
                >
                  Source ↗
                </a>
              )}
            </div>
          )}
        </aside>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[180px_1fr]">
        <nav aria-label="Case study sections" className="hidden lg:block">
          <ul className="sticky top-24 space-y-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="font-mono text-[11px] text-muted transition-colors hover:text-accent"
                >
                  {String(index + 1).padStart(2, '0')} {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="max-w-2xl space-y-14">
          <Block id="problem" index="01" title="Problem">
            <p className="text-lg leading-relaxed">{study.problem}</p>
          </Block>

          <Block id="constraints" index="02" title="Constraints">
            <ul className="space-y-3">
              {study.constraints.map((constraint) => (
                <li
                  key={constraint}
                  className="border-l border-accent-dim pl-4 text-muted"
                >
                  {constraint}
                </li>
              ))}
            </ul>
          </Block>

          <Block id="approach" index="03" title="Approach">
            <ol className="space-y-7">
              {study.approach.map((step, index) => (
                <li key={step.title}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <p className="mt-2 pl-8 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block id="result" index="04" title="Result">
            <p className="border border-border bg-surface p-5 text-muted">
              {study.result}
            </p>
          </Block>

          <Block id="retrospective" index="05" title="Retrospective">
            <p className="text-muted">{study.retrospective}</p>
          </Block>
        </div>
      </div>

      <Link
        to={`/work/${next.slug}`}
        className="group mt-20 block border-t border-border pt-8"
      >
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
          Next project
        </span>
        <span className="mt-2 flex items-center justify-between gap-4 text-2xl font-semibold transition-colors group-hover:text-accent sm:text-3xl">
          {next.title}
          <span
            aria-hidden="true"
            className="font-mono transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </Link>
    </article>
  )
}
