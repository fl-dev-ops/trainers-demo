import Image from 'next/image'
import Link from 'next/link'
import { SHELLEY_WALTERS } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Shelley's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'the-deal-that-s-with-the-decision-maker',
    title: 'The deal that’s with the decision maker',
    coachee: { role: 'Sales manager', text: 'A sales manager of a six-person B2B software team in Johannesburg, running the Monday commit review one to one with a senior account executive.', practises: ['Validating the decision maker', 'Agreeing a dated next step'] },
    persona: { role: 'Senior account executive', name: 'Ryan Mitchell', photo: '/media/shelley-roleplay-ryan.jpg', behaviour: ['Warm but Cautious'], speaking: ['Casual', 'Medium answers'], text: 'Senior account executive at a Johannesburg software company that sells warehouse management systems. Hits his number most quarters, likes to be liked, and is quick with good news.' },
  },
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={SHELLEY_WALTERS.face} alt={SHELLEY_WALTERS.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {SHELLEY_WALTERS.name} · Demo</span>
          <h1>Meet {SHELLEY_WALTERS.firstName}’s AI Twin</h1>
          <p>Ask {SHELLEY_WALTERS.firstName}’s AI twin about building confidence in sales, managing your pipeline, coaching your sales team and winning bigger B2B deals.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Websites</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/shelley-walters-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {SHELLEY_WALTERS.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/shelley-walters/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...SHELLEY_WALTERS, portrait: SHELLEY_WALTERS.face }} livePath="/shelley-walters/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {SHELLEY_WALTERS.firstName}’s twin live</h2>
              <p>Choose how to talk with {SHELLEY_WALTERS.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/shelley-walters/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{SHELLEY_WALTERS.room.kind}</span>
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
        <TrustFooter twin={SHELLEY_WALTERS} />
      </div>
    </section>
  )
}
