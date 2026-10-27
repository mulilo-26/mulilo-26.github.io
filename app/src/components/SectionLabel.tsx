import type { ReactNode } from 'react'

export function SectionLabel({
  index,
  children,
}: {
  index: string
  children: ReactNode
}) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="font-mono text-xs text-accent">{index}</span>
      <h2 className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
        {children}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-border" />
    </div>
  )
}
