import Link from 'next/link'

// Shared card thumbnails for coach profile pages (Shyam's redesign, 12 Nov 2026).

const NOTE_COLOURS = ['note--yellow', 'note--pink', 'note--blue', 'note--green']

// The twin in a notebook, with coloured post-its. Each post-it starts a conversation with the twin in that context.
export function TwinNotebook({ trainer, livePath, questions }) {
  const notes = [{ label: 'Ask me anything', query: { mode: 'ama' } }, ...questions.map((q) => ({ label: q, query: { q } }))]
  return (
    <div className="peek peek--nb">
      <div className="nb">
        <div className="nb-page nb-page--left">
          <div className="nb-photo">
            <img src={trainer.portrait ?? trainer.face} alt="" />
            <span className="nb-cap">{trainer.firstName}’s twin</span>
          </div>
        </div>
        <div className="nb-page nb-page--right">
          {notes.map((n, i) => (
            <Link
              key={n.label}
              href={{ pathname: livePath, query: n.query }}
              className={'note ' + NOTE_COLOURS[i % NOTE_COLOURS.length] + (i === 0 ? ' note--ama' : '')}
              aria-label={i === 0 ? 'Ask me anything' : 'Ask: ' + n.label}
            >
              {i === 0 ? n.label : '“' + n.label + '”'}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Instagram-style default profile picture: grey circle with a light silhouette.
function BlankAvatar() {
  return (
    <svg className="pc-av" viewBox="0 0 96 96" aria-hidden="true">
      <circle cx="48" cy="48" r="48" fill="#C7C7CC" />
      <circle cx="48" cy="38" r="17" fill="#F2F2F2" />
      <path d="M16 84c4-17 17-26 32-26s28 9 32 26a48 48 0 0 1-64 0z" fill="#F2F2F2" />
    </svg>
  )
}

function Tags({ items }) {
  if (!items?.length) return null
  return <div className="pc-tags">{items.map((t) => <span key={t} className="pc-tag">{t}</span>)}</div>
}

const Speaker = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
)

// Your coachee (a blank profile picture the coach can picture as one of their own) practises with the AI persona.
// Portrait cards in the style of the role-play dashboard's persona cards.
export function RoleplayPair({ coachee, persona }) {
  return (
    <div className="peek peek--wrap peek--pair">
      <span className="peek-k">Role play</span>
      <div className="pair">
        <div className="pc pc--coachee">
          <span className="pc-role">{coachee.role}</span>
          <BlankAvatar />
          <span className="pc-name">Your coachee</span>
          <Tags items={coachee.practises} />
          <p className="pc-text">{coachee.text}</p>
        </div>
        <div className="pair-mid" aria-hidden="true">
          <span>practises with</span>
          <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4 12h15m-5-5 5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="pc pc--persona">
          <span className="pc-role">{persona.role}</span>
          <img className="pc-av" src={persona.photo} alt="" />
          <span className="pc-name">{persona.name}</span>
          <Tags items={persona.behaviour} />
          <Tags items={persona.speaking} />
          {persona.voice && <span className="pc-voice">{persona.voice}<Speaker /></span>}
          <p className="pc-text">{persona.text}</p>
        </div>
      </div>
    </div>
  )
}
