'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from './Icons.jsx'

export default function ThemeToggle() {
  // Match the server first, then restore the visitor's preference after hydration.
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    try {
      setTheme(localStorage.getItem('theme') === 'dark' ? 'dark' : 'light')
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try { localStorage.setItem('theme', next) } catch { /* storage unavailable */ }
  }

  const dark = theme === 'dark'
  return (
    <button
      type="button"
      className="btn btn--ghost btn--icon"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  )
}
