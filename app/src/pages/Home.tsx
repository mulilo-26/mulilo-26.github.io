import { Link } from 'react-router'
import { Contact } from '../components/Contact'
import { ProjectCard } from '../components/ProjectCard'
import { SectionLabel } from '../components/SectionLabel'
import { projects } from '../data/projects'
import { education, site, skills, stats } from '../data/site'
import { usePageMeta } from '../lib/usePageMeta'

export default function Home() {
  usePageMeta(`${site.name} | ${site.role}`, site.summary)

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
              Computer Science · Data Analysis
            </p>

            <h1 className="mt-6 text-[clamp(2.75rem,9vw,6.5rem)] leading-[0.92] font-semibold tracking-[-0.03em]">
              Emmanuel
              <br />
              Mulilo
            </h1>

            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
              {site.tagline}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/work"
                className="rounded-sm bg-accent px-5 py-3 font-mono text-sm font-semibold text-bg transition-opacity hover:opacity-90"
              >
                View work
              </Link>
              <Link
                to="/#contact"
                className="rounded-sm border border-border px-5 py-3 font-mono text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                Get in touch
              </Link>
            </div>
          </div>

          <aside className="border border-border p-5">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
              Currently
            </p>
            <dl className="mt-4 space-y-3 font-mono text-xs">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">School</dt>
                <dd className="text-right">{education.school}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">Programme</dt>
                <dd className="text-right">{education.degree}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">Status</dt>
                <dd className="text-right text-accent">{education.status}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-muted">Based</dt>
                <dd className="text-right">{site.location}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <dl className="mt-16 grid grid-cols-3 border-y border-border">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-6 ${index > 0 ? 'border-l border-border pl-5' : ''}`}
            >
              <dt className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="mt-2 font-mono text-2xl text-accent sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionLabel index="01">Selected work</SectionLabel>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>

        <div className="mt-14">
          <Link
            to="/work"
            className="font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            All projects →
          </Link>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20">
        <SectionLabel index="02">About</SectionLabel>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-5">
            <p className="text-xl leading-relaxed text-balance">
              I&apos;m Emmanuel — a Computer Science student working between data
              analysis and the systems underneath it.
            </p>
            <p className="text-muted">
              Most of what I build starts with a measurement problem: a network that
              feels slow, a schema that duplicates records, a workflow full of
              friction. I would rather find the actual bottleneck than reach for a
              bigger tool.
            </p>
            <p className="text-muted">
              That is why the projects here run from an air-gapped AI assistant to a
              home network I eventually reverted. The common thread is the method,
              not the stack.
            </p>
          </div>

          <div className="space-y-8">
            {skills.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
                  {group.label}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-sm border border-border px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}
