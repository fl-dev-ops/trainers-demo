import { useEffect, useRef, useState } from 'react'
import { SOURCES } from '../data.js'
import { Close } from './Icons.jsx'

export default function SourcesDrawer({ onClose }) {
  const [on, setOn] = useState(() => SOURCES.map(() => true))
  const closeRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    closeRef.current?.focus()
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('keydown', esc)
      opener?.focus?.()
    }
  }, [onClose])

  const offN = on.filter((v) => !v).length

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="srcH">
        <header>
          <div>
            <h2 id="srcH">Where your twin learned from</h2>
            <p>Only your public content. Switch off anything you don't want it to use.</p>
          </div>
          <button type="button" className="btn btn--ghost btn--icon" aria-label="Close" onClick={onClose} ref={closeRef}><Close /></button>
        </header>
        <div className="list">
          {SOURCES.map(([group, count, items], gi) => (
            <div key={group}>
              <div className={'srow grp' + (on[gi] ? '' : ' off')}>
                <div className="m"><b>{group}</b><span>{count}</span></div>
                <button
                  type="button"
                  className="sw"
                  role="switch"
                  aria-checked={on[gi]}
                  aria-label={'Use all ' + group}
                  onClick={() => setOn((prev) => prev.map((v, i) => (i === gi ? !v : v)))}
                />
              </div>
              {items.map(([title, meta]) => (
                <div key={title} className={'srow item' + (on[gi] ? '' : ' off')}>
                  <div className="m"><b>{title}</b><span>{meta}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <footer>
          <span>{offN ? `${offN} source type${offN > 1 ? 's' : ''} switched off · your twin will relearn` : 'All sources in use'}</span>
          <button type="button" className="btn btn--strong" onClick={onClose}>Done</button>
        </footer>
      </aside>
    </>
  )
}
