import type { ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router'
import Home from '../src/pages/Home'
import NotFound from '../src/pages/NotFound'
import ProjectDetail from '../src/pages/ProjectDetail'
import Resume from '../src/pages/Resume'
import Work from '../src/pages/Work'

type Case = {
  url: string
  pattern: string
  element: ReactElement
  /** Text that must appear in the output — guards against a route silently 404ing. */
  expect: string
}

const cases: Case[] = [
  { url: '/', pattern: '/', element: <Home />, expect: 'Air-Gapped Notes' },
  { url: '/work', pattern: '/work', element: <Work />, expect: 'SmartQueue LTE' },
  {
    url: '/work/air-gapped-notes',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
    expect: 'privacy-first',
  },
  {
    url: '/work/autonomous-portfolio-agent',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
    expect: 'Autonomous Portfolio Management Agent',
  },
  {
    url: '/work/smartqueue-lte',
    pattern: '/work/:slug',
    element: <ProjectDetail />,
    expect: 'SmartQueue LTE',
  },
  {
    url: '/resume',
    pattern: '/resume',
    element: <Resume />,
    expect: 'The Copperbelt University',
  },
  { url: '/nope', pattern: '*', element: <NotFound />, expect: 'Not found' },
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

    const hasContent = html.includes(testCase.expect)
    if (!hasContent) failed += 1

    console.log(
      `${hasContent ? 'ok  ' : 'FAIL'} ${testCase.url.padEnd(36)} ${html.length} bytes`,
    )
    if (!hasContent) {
      console.error(`     missing expected text: "${testCase.expect}"`)
    }
  } catch (error) {
    failed += 1
    console.error(`FAIL ${testCase.url}`, error)
  }
}

if (failed > 0) {
  console.error(`\n${failed} case(s) failed`)
  process.exit(1)
}

console.log('\nAll routes rendered the expected content.')
