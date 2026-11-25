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
    coachee: { role: 'Sales rep', text: 'A sales rep for a production scheduling software company, in the second meeting with a prospect who liked the demo and is about to say there is no budget this year.', practises: ['Handling “no budget” calmly', 'Costing the problem'] },
    persona: { role: 'Operations Director', name: 'Martin Doyle', photo: '/media/colly-roleplay-martin.jpg', behaviour: ['Cautious & Reserved'], speaking: ['Casual', 'Medium answers'], text: 'Operations Director of a food packaging manufacturer in Belfast with about 150 staff. Polite, careful and well liked, he does not like being rushed or sold to and wants to be sure before he recommends anything.' },
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
