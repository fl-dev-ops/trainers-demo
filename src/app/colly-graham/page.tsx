import Image from 'next/image'
import Link from 'next/link'
import { COLLY_GRAHAM } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Colly's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'we-have-no-budget',
    title: '“We have no budget”',
    coachee: { role: 'Sales rep', text: 'A sales rep for a job-sheet app for field service engineers. The engineers loved the trial, but the service director is about to say there is no budget this year.', practises: ['Handling “no budget” calmly', 'Costing the problem'] },
    persona: { role: 'Service Director', name: 'Martin Doyle', photo: '/media/colly-roleplay-martin.jpg', behaviour: ['Cautious & Reserved'], speaking: ['Casual', 'Medium answers'], text: 'Service Director of a commercial refrigeration servicing company in Belfast with about 25 engineers. Polite and careful, he liked the app on the trial but does not like being pushed.' },
  },
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={COLLY_GRAHAM.face} alt={COLLY_GRAHAM.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {COLLY_GRAHAM.name} · Demo</span>
          <h1>Meet {COLLY_GRAHAM.firstName}’s AI Twin</h1>
          <p>Ask {COLLY_GRAHAM.firstName}’s AI twin about brain-based selling, handling objections, discovery questions, your sales mindset and using AI in sales.</p>
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
              <img src="/media/colly-graham-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {COLLY_GRAHAM.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/colly-graham/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...COLLY_GRAHAM, portrait: COLLY_GRAHAM.face }} livePath="/colly-graham/live" plain notes={[{ label: 'Text', query: { mode: 'text' } }, { label: 'Voice', query: { mode: 'voice' } }, { label: 'Video', query: {} }]} />
            <div className="path-b">
              <h2>Ask {COLLY_GRAHAM.firstName}’s twin live</h2>
              <p>Choose how to talk with {COLLY_GRAHAM.firstName}’s twin: text, voice or video.</p>
              <div className="row">
                <Link href="/colly-graham/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{COLLY_GRAHAM.room.kind}</span>
              </div>
            </div>
          </article>
          {ROLE_PLAYS.map((r) => (
            <article key={r.slug} className="path path--wide">
              <RoleplayPair coachee={r.coachee} persona={r.persona} label="Your client" />
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
        <TrustFooter twin={COLLY_GRAHAM} />
      </div>
    </section>
  )
}
