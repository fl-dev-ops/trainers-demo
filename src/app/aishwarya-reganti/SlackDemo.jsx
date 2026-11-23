'use client'

import { useEffect, useRef, useState } from 'react'
import { AISHWARYA_REGANTI } from '@/data.js'

const TWIN_HANDLE = 'Aishwarya’s twin'
const CHANNEL = 'ai-engineering'

export const SUGGESTIONS = [
  'Should we start our support bot as a multi-agent system?',
  'How do I get started with evals for our agent?',
  'Is RAG dead now that context windows are so big?',
  'What projects should I build to get hired as an AI engineer?',
]

const time = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })

/* Slack mrkdwn subset the twin uses: *bold*, _italic_, `code`, "- " bullets. */
function inline(text, key) {
  const parts = text.split(/(\*[^*\n]+\*|_[^_\n]+_|`[^`\n]+`)/g)
  return parts.map((p, i) => {
    if (/^\*[^*]+\*$/.test(p)) return <strong key={`${key}-${i}`}>{p.slice(1, -1)}</strong>
    if (/^_[^_]+_$/.test(p)) return <em key={`${key}-${i}`}>{p.slice(1, -1)}</em>
    if (/^`[^`]+`$/.test(p)) return <code key={`${key}-${i}`}>{p.slice(1, -1)}</code>
    return p
  })
}

function Mrkdwn({ text }) {
  const blocks = []
  let list = null
  text.replace(/\*\*/g, '*').split('\n').forEach((line, i) => {
    const bullet = line.match(/^\s*(?:[-•*]|\d+\.)\s+(.*)$/)
    if (bullet) {
      if (!list) { list = []; blocks.push(<ul key={`ul-${i}`}>{list}</ul>) }
      list.push(<li key={i}>{inline(bullet[1], i)}</li>)
    } else {
      list = null
      if (line.trim()) blocks.push(<p key={i}>{inline(line, i)}</p>)
    }
  })
  return <div className="slk-text">{blocks}</div>
}

function TwinAvatar() {
  return <img className="slk-av" src={AISHWARYA_REGANTI.face} alt="" />
}

export default function SlackDemo() {
  const [threads, setThreads] = useState([])
  const [draft, setDraft] = useState('')
  const listRef = useRef(null)
  const busy = threads.some((t) => t.pending)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [threads])

  async function ask(question) {
    const q = question.trim()
    if (!q || busy) return
    const id = Date.now()
    setDraft('')
    setThreads((all) => [...all, { id, question: q, at: time(), pending: true }])
    let reply
    let failed = false
    try {
      const res = await fetch('/api/aishwarya-reganti/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turns: [{ role: 'user', content: q }] }),
      })
      const data = await res.json()
      reply = data.reply ?? data.error
      failed = !res.ok
    } catch {
      reply = 'The twin could not answer just now. Try again.'
      failed = true
    }
    setThreads((all) => all.map((t) => (t.id === id ? { ...t, pending: false, reply, failed, replyAt: time() } : t)))
  }

  return (
    <div className="slk" aria-label="Slack workspace with Aishwarya’s twin">
      <aside className="slk-side" aria-hidden="true">
        <div className="slk-ws">Acme AI<span className="slk-caret">▾</span></div>
        <div className="slk-sec">Channels</div>
        <div className="slk-ch"># general</div>
        <div className="slk-ch slk-ch--on"># {CHANNEL}</div>
        <div className="slk-ch"># product</div>
        <div className="slk-sec">Direct messages</div>
        <div className="slk-ch slk-dm"><TwinAvatar />{TWIN_HANDLE}<span className="slk-app">APP</span></div>
        <div className="slk-ch slk-dm"><span className="slk-av slk-av--p">P</span>Priya</div>
      </aside>

      <section className="slk-main">
        <header className="slk-head">
          <span className="slk-title"># {CHANNEL}</span>
          <span className="slk-meta">Questions about building with AI</span>
        </header>

        <div className="slk-list" ref={listRef} aria-live="polite">
          <div className="slk-sys"><TwinAvatar /><span><strong>{TWIN_HANDLE}</strong> was added to #{CHANNEL} by Priya.</span></div>
          <div className="slk-msg">
            <span className="slk-av slk-av--p">P</span>
            <div>
              <div className="slk-who"><strong>Priya</strong><span className="slk-time">9:41 AM</span></div>
              <div className="slk-text"><p>Added Aishwarya’s twin here 🎉 Mention <span className="slk-mention">@{TWIN_HANDLE}</span> with any question about building AI products and it answers in a thread.</p></div>
            </div>
          </div>

          {threads.map((t) => (
            <div key={t.id} className="slk-msg">
              <span className="slk-av slk-av--you">You</span>
              <div className="slk-body">
                <div className="slk-who"><strong>You</strong><span className="slk-time">{t.at}</span></div>
                <div className="slk-text"><p><span className="slk-mention">@{TWIN_HANDLE}</span> {t.question}</p></div>
                <div className="slk-thread">
                  <div className="slk-msg slk-msg--reply">
                    <TwinAvatar />
                    <div className="slk-body">
                      <div className="slk-who"><strong>{TWIN_HANDLE}</strong><span className="slk-app">APP</span>{t.replyAt && <span className="slk-time">{t.replyAt}</span>}</div>
                      {t.pending
                        ? <div className="slk-typing" aria-label="Typing"><i /><i /><i /></div>
                        : <div className={t.failed ? 'slk-failed' : undefined}><Mrkdwn text={t.reply} /></div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!threads.length && (
          <div className="slk-try">
            <span className="slk-try-k">Try asking</span>
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" className="slk-chip" onClick={() => ask(s)} disabled={busy}>{s}</button>
            ))}
          </div>
        )}

        <form className="slk-compose" onSubmit={(e) => { e.preventDefault(); ask(draft) }}>
          <span className="slk-mention" aria-hidden="true">@{TWIN_HANDLE}</span>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={busy ? 'Aishwarya’s twin is answering…' : 'Ask a question'}
            aria-label={`Ask ${TWIN_HANDLE} in #${CHANNEL}`}
            maxLength={500}
          />
          <button type="submit" className="slk-send" disabled={busy || !draft.trim()} aria-label="Send">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M2.5 17.5 18 10 2.5 2.5l2.4 6.3L13 10l-8.1 1.2z" /></svg>
          </button>
        </form>
      </section>
    </div>
  )
}
