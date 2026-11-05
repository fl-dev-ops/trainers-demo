import { useEffect, useRef, useState } from 'react'
import { Send } from '../components/Icons.jsx'

/**
 * The live chat / transcription feed. `lines` ({ id, who, text }) comes from the
 * session's messages; `onSend` publishes the candidate's text back to the room
 * and is only available once the room is connected.
 *
 * NOTE: type the `lines` default inline (below). A `@param` tag on this
 * destructured signature is mis-parsed by TypeScript and types every prop wrong.
 */
export default function TranscriptPanel({
  lines = /** @type {{ id: string, who: string, text: string }[]} */ ([]),
  connected = false,
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
    <aside className="rpanel chatp" aria-label="Chat">
      <div className="chat-h"><span>Chat</span><span className="cnt">{lines.length}</span></div>
      <div className="feed" id="transcript" aria-live="polite" ref={feedRef}>
        {lines.map((l) => (
          <p key={l.id}><b>{l.who}: </b>{l.text}</p>
        ))}
      </div>
      <form className="chat-in" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your twin is coaching…"
          disabled={!connected}
          aria-label="Ask as the agent"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button type="submit" className="rsend" aria-label="Send" disabled={!connected || !draft.trim()}><Send /></button>
      </form>
    </aside>
  )
}
