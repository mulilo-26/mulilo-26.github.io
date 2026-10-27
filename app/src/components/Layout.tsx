import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SkipLink } from '../components/SkipLink'

export default function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const target = document.getElementById(hash.slice(1))
    if (!target) return

    const frame = requestAnimationFrame(() => target.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
