import type { Project } from '../data/projects'

/** Decorative, project-specific artwork. No fake screenshots, no broken images. */
function Artwork({ slug }: { slug: string }) {
  if (slug === 'air-gapped-notes') {
    return (
      <g>
        <g stroke="var(--color-accent-dim)" strokeWidth="1" opacity="0.8">
          <line x1="120" y1="110" x2="200" y2="80" />
          <line x1="200" y1="80" x2="280" y2="130" />
          <line x1="120" y1="110" x2="150" y2="190" />
          <line x1="150" y1="190" x2="240" y2="210" />
          <line x1="240" y1="210" x2="280" y2="130" />
          <line x1="280" y1="130" x2="320" y2="190" />
          <line x1="240" y1="210" x2="320" y2="190" />
        </g>
        <g fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5">
          <circle cx="120" cy="110" r="13" />
          <circle cx="200" cy="80" r="10" />
          <circle cx="280" cy="130" r="12" />
          <circle cx="150" cy="190" r="10" />
          <circle cx="320" cy="190" r="9" />
        </g>
        <circle cx="240" cy="210" r="17" fill="var(--color-accent)" />
        <circle
          cx="240"
          cy="210"
          r="26"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="1"
          opacity="0.45"
        />
      </g>
    )
  }

  if (slug === 'scoped-autonomy') {
    return (
      <g fill="none">
        <rect
          x="55"
          y="55"
          width="290"
          height="190"
          rx="10"
          stroke="var(--color-border)"
          strokeWidth="1.5"
        />
        <rect
          x="95"
          y="85"
          width="210"
          height="130"
          rx="8"
          stroke="var(--color-accent-dim)"
          strokeWidth="1.5"
          strokeDasharray="4 5"
        />
        <rect
          x="140"
          y="115"
          width="120"
          height="70"
          rx="6"
          fill="var(--color-accent)"
          opacity="0.14"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="150" r="5" fill="var(--color-accent)" />
        <path
          d="M200 150 L262 108"
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          markerEnd="url(#none)"
        />
        <circle cx="262" cy="108" r="4" fill="var(--color-accent)" />
      </g>
    )
  }

  return (
    <g fill="none">
      <line
        x1="45"
        y1="245"
        x2="360"
        y2="245"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <path
        d="M45 220 L75 150 L105 205 L135 120 L165 215 L195 140 L225 225 L255 130 L285 205 L315 150 L350 230"
        stroke="var(--color-border)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M45 192 C 85 192 110 182 145 180 S 215 174 250 172 S 310 170 350 169"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="250" cy="172" r="4.5" fill="var(--color-accent)" />
      <line
        x1="250"
        y1="172"
        x2="250"
        y2="245"
        stroke="var(--color-accent)"
        strokeWidth="1"
        strokeDasharray="3 4"
        opacity="0.5"
      />
    </g>
  )
}

export function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-surface">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="relative h-full w-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      >
        <Artwork slug={project.slug} />
      </svg>

      <span className="absolute top-4 left-4 font-mono text-[11px] text-muted">
        {String(project.order).padStart(2, '0')}
      </span>
      <span className="absolute right-4 bottom-4 font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
        {project.discipline}
      </span>
    </div>
  )
}
