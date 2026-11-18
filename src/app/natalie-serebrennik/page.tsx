import Image from 'next/image'
import Link from 'next/link'
import { NATALIE_SEREBRENNIK } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Natalie's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'ask-for-the-next-level',
    title: 'Ask for the next level',
    coachee: { role: 'Senior associate', text: 'A senior associate with strong results who keeps hearing they are doing great, yet was passed over, asking their director about the next level.', practises: ['Making impact visible', 'Asking for a dated next step'] },
    persona: { role: 'Director', name: 'Andrew Mercer', photo: '/media/natalie-roleplay-andrew.jpg', behaviour: ['Warm & Open'], speaking: ['Neutral', 'Medium answers'], voice: 'Oliver', text: 'Director at a large financial firm in Toronto who has managed the team for two years. Friendly and well liked, always in back-to-back meetings, and quick to say things are going well.' },
  },
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={NATALIE_SEREBRENNIK.face} alt={NATALIE_SEREBRENNIK.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {NATALIE_SEREBRENNIK.name} · Demo</span>
          <h1>Meet {NATALIE_SEREBRENNIK.firstName}’s AI Twin</h1>
          <p>Ask {NATALIE_SEREBRENNIK.firstName}’s AI twin about getting seen at work, going for a promotion, executive presence and hard conversations with your manager.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Website</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/natalie-serebrennik-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {NATALIE_SEREBRENNIK.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/natalie-serebrennik/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...NATALIE_SEREBRENNIK, portrait: NATALIE_SEREBRENNIK.face }} livePath="/natalie-serebrennik/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {NATALIE_SEREBRENNIK.firstName}’s twin live</h2>
              <p>Choose how to talk with {NATALIE_SEREBRENNIK.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/natalie-serebrennik/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{NATALIE_SEREBRENNIK.room.kind}</span>
              </div>
            </div>
          </article>
          {ROLE_PLAYS.map((r) => (
            <article key={r.slug} className="path path--wide">
              <RoleplayPair coachee={r.coachee} persona={r.persona} />
              <div className="path-b">
                <h2>{r.title}</h2>
                <div className="row">
                  <a href={DASH + r.slug} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                  <span className="meta">Opens the role-play app</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <TrustFooter twin={NATALIE_SEREBRENNIK} />
      </div>
    </section>
  )
}
