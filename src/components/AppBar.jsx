'use client'

import { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TWIN } from '../data.js'
import { Lock, Logo, Play } from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function AppBar({ children }) {
  const pathname = usePathname()
  const trainerHome = pathname.match(/^\/[^/]+/)?.[0] ?? '/'
  // The live room has its own session header.
  const live = pathname.endsWith('/live')
  const headRef = useRef(null)

  // One-fold sizing: screens fill exactly the space under the header.
  useLayoutEffect(() => {
    const fit = () => {
      const height = headRef.current?.getBoundingClientRect().height ?? 0
      document.documentElement.style.setProperty('--fold', Math.max(0, window.innerHeight - height) + 'px')
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [live])

  return (
    <>
      {!live && <header className="app-head" ref={headRef}>
        <div className="in">
          <Link href={trainerHome} className="lockup"><Logo />TrainerTwin</Link>
          <div className="head-r">
            {!['/jameel', '/prathosh', '/antoni', '/johnny-daniele', '/darren-mitchell', '/tony-latimer'].includes(trainerHome) && TWIN.demo && (
              <a className="btn btn--secondary" href={TWIN.demo} target="_blank" rel="noopener noreferrer">
                <Play />Watch demo of Olga
              </a>
            )}
            <span className="badge hide-sm"><Lock />Private preview</span>
            <ThemeToggle />
          </div>
        </div>
      </header>}
      <main>{children}</main>
    </>
  )
}
