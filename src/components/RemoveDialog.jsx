import { useEffect, useRef } from 'react'

export default function RemoveDialog({ onCancel, onConfirm }) {
  const keepRef = useRef(null)

  useEffect(() => {
    const opener = document.activeElement
    keepRef.current?.focus()
    const esc = (e) => { if (e.key === 'Escape') onCancel() }
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('keydown', esc)
      opener?.focus?.()
    }
  }, [onCancel])

  return (
    <div className="scrim" onClick={(e) => { if (e.target === e.currentTarget) onCancel() }}>
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="rmH" aria-describedby="rmD">
        <div>
          <h2 id="rmH">Remove your twin?</h2>
          <p className="sub" id="rmD">We'll delete your twin and everything we collected. You'll get a confirmation when it's done. This can't be undone.</p>
        </div>
        <div className="actions">
          <button type="button" className="btn btn--secondary" onClick={onCancel} ref={keepRef}>Keep my twin</button>
          <button type="button" className="btn btn--danger" onClick={onConfirm}>Remove</button>
        </div>
      </div>
    </div>
  )
}
