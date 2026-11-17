import Image from 'next/image'
import Link from 'next/link'
import { CLIVE_MILLER } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'A prospect loved my pitch and asked me to send a proposal. Now they’ve gone quiet. What happened?',
  'I’m selling to a company with lots of people involved. Where do I start?',
]

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Clive's role play on the role-play dashboard. Third person. */
const ROLE_PLAYS = [
  {
    slug: 'just-send-me-a-proposal',
    title: 'Just send me a proposal',
    coachee: { role: 'Account executive', text: 'An account executive at a software company, on a second call with a customer who has seen the demo and wants a proposal.', practises: ['Making no assumptions', 'Facts before the proposal'] },
    persona: { role: 'Operations Director', name: 'Helen Marsh', photo: '/media/clive-roleplay-helen.jpg', behaviour: ['Warm & Open'], speaking: ['Casual', 'Long answers'], voice: 'Olivia', text: 'Runs operations at a 140-person precision-parts manufacturer in the Midlands. She liked the demo and wants to keep things moving.' },
  },
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={CLIVE_MILLER.face} alt={CLIVE_MILLER.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {CLIVE_MILLER.name} · Demo</span>
          <h1>Meet {CLIVE_MILLER.firstName}’s AI Twin</h1>
          <p>Ask {CLIVE_MILLER.firstName}’s AI twin about complex B2B sales, qualifying deals, getting customers to engage and leading a sales team.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill">Podcast</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/clive-miller-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {CLIVE_MILLER.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/clive-miller/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={{ ...CLIVE_MILLER, portrait: CLIVE_MILLER.face }} livePath="/clive-miller/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {CLIVE_MILLER.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/clive-miller/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{CLIVE_MILLER.room.kind}</span>
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
        <TrustFooter twin={CLIVE_MILLER} />
      </div>
    </section>
  )
}
