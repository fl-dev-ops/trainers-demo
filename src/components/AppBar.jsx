'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lock, Logo, Moon, Sun } from './Icons.jsx'

function readTheme() {
  try {
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export default function AppBar({ children }) {
  const pathname = usePathname()
  const trainerHome = pathname.match(/^\/trainers\/[^/]+/)?.[0] ?? '/'
  const [theme, setTheme] = useState(readTheme)
  const headRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* storage unavailable */ }
  }, [theme])

  // One-fold sizing: screens fill exactly the space under the header.
  useLayoutEffect(() => {
    const fit = () => {
      const height = headRef.current?.getBoundingClientRect().height ?? 61
      document.documentElement.style.setProperty('--fold', Math.max(0, window.innerHeight - height) + 'px')
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const dark = theme === 'dark'
  return (
    <>
      <header className="app-head" ref={headRef}>
        <div className="in">
          <Link href={trainerHome} className="lockup"><Logo />TrainerTwin</Link>
          <div className="head-r">
            <span className="badge hide-sm"><Lock />Private preview</span>
            <button
              type="button"
              className="btn btn--ghost btn--icon"
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setTheme(dark ? 'light' : 'dark')}
            >
              {dark ? <Sun /> : <Moon />}
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  )
}
