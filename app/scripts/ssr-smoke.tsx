import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import Home from '../src/pages/Home'
import NotFound from '../src/pages/NotFound'
import ProjectDetail from '../src/pages/ProjectDetail'
import Resume from '../src/pages/Resume'
import Work from '../src/pages/Work'

type Case = { url: string; pattern: string; element: ReactElement }

const cases: Case[] = [
  { url: '/', pattern: '/', element: <Home /> },
  { url: '/work', pattern: '/work', element: <Work /> },
  {
    url: '/work/air-gapped-notes',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
  },
  {
    url: '/work/scoped-autonomy',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
  },
  {
    url: '/work/latency-over-bandwidth',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
  },
  { url: '/resume', pattern: '/resume', element: <Resume /> },
  { url: '/nope', pattern: '*', element: <NotFound /> },
]

let failed = 0

for (const testCase of cases) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={[testCase.url]}>
        <Routes>
          <Route path={testCase.pattern} element={testCase.element} />
        </Routes>
      </MemoryRouter>,
    )

    const ok = html.length > 500
    if (!ok) failed += 1
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${testCase.url.padEnd(34)} ${html.length} bytes`,
    )
  } catch (error) {
    failed += 1
    console.error(`FAIL ${testCase.url}`, error)
  }
}

if (failed > 0) {
  console.error(`\n${failed} case(s) failed`)
  process.exit(1)
}

console.log('\nAll routes rendered without runtime errors.')
