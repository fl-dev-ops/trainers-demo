import { useEffect, useRef, useState } from 'react'
import { Send } from '../components/Icons.jsx'

/**
 * The live chat / transcription feed. `lines` ({ id, who, text, mine }) comes from the
 * session's messages; `onSend` publishes the candidate's text back to the room
 * and is only available once the room is connected.
 *
 * NOTE: type the `lines` default inline (below). A `@param` tag on this
 * destructured signature is mis-parsed by TypeScript and types every prop wrong.
 */
export default function TranscriptPanel({
  lines = /** @type {{ id: string, who: string, text: string, mine: boolean }[]} */ ([]),
  connected = false,
  twinName = 'the twin',
  onSend,
}) {
  const [draft, setDraft] = useState('')
  const feedRef = useRef(null)

  // Keeps the newest line in view as the transcript grows.
  useEffect(() => {
    const feed = feedRef.current
    if (feed) feed.scrollTop = feed.scrollHeight
  }, [lines])

  // Publishes the typed text to the room and clears the box; no-op while disconnected or empty.
  function handleSubmit(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!connected || !text) return
    Promise.resolve(onSend?.(text)).catch((error) => {
      console.error('Failed to send chat message:', error)
    })
    setDraft('')
  }

  return (
    <div className="chatp">
      <div className="feed" id="transcript" aria-live="polite" ref={feedRef}>
        {lines.length === 0 ? (
          <div className="feed-empty">
            <b>No messages yet</b>
            <span>What you and {twinName} say appears here. You can also type.</span>
          </div>
        ) : (
          lines.map((l) => (
            <div key={l.id} className={'msg' + (l.mine ? ' mine' : '')}>
              <span className="who">{l.who}</span>
              <p>{l.text}</p>
            </div>
          ))
        )}
      </div>
      <form className="chat-in" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder={connected ? `Message ${twinName}…` : 'Connecting…'}
          disabled={!connected}
          aria-label={`Message ${twinName}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="rsend" aria-label="Send" disabled={!connected || !draft.trim()}><Send /></button>
      </form>
    </div>
  )
}
