import Image from 'next/image'
import Link from 'next/link'
import { ROB_SNOEIJEN } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const DASH = 'https://dash.roleplay.foreverlearning.in/agents/'

/* Rob's role play on the role-play dashboard (persona Martijn Bakker, scenario "Announce the price increase").
   Third person. Built on his argumentation method in Sales-ABC. */
const ROLE_PLAY = {
  slug: 'announce-the-price-increase',
  title: 'Announce the price increase',
  coachee: { role: 'Account manager', text: 'An account manager at a supplier of fixings and installation materials, telling a customer of nine years that prices go up 6 percent from 1 January.', practises: ['Backing the price with proof', 'Trading, not discounting'] },
  persona: { role: 'Purchasing manager', name: 'Martijn Bakker', photo: '/media/rob-roleplay-martijn.jpg', behaviour: ['Skeptical & Reserved'], speaking: ['Professional', 'Short answers'], text: 'Purchasing manager at a mid-sized installation company in Eindhoven. Careful with money, likes facts more than talk, and has heard from a cheaper competitor.' },
}

// Methodology and role play live; the twin is coming soon (Rob's material is Dutch and has little of him speaking).
export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={ROB_SNOEIJEN.face} alt={ROB_SNOEIJEN.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />{ROB_SNOEIJEN.name} · Demo</span>
          <h1>How {ROB_SNOEIJEN.firstName}’s AI twin learns</h1>
          <p>See how an AI twin would learn {ROB_SNOEIJEN.firstName}’s way of selling: facts and proof instead of the claims every competitor makes. Then practise it in a role play.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill"><YouTube />YouTube</span>
            <span className="srcpill">Website and book</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/rob-snoeijen-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {ROB_SNOEIJEN.firstName}’s book, courses and posts, layer by layer. Dutch quotes are shown with English translations.</p>
              <div className="row">
                <Link href="/rob-snoeijen/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path path--soon" aria-disabled="true">
            <div className="peek soon-peek" aria-hidden="true">
              <span className="peek-k">AI twin</span>
              <span className="soon-tag">Coming soon</span>
            </div>
            <div className="path-b">
              <h2>Ask {ROB_SNOEIJEN.firstName}’s twin live</h2>
              <p>A twin that answers your salespeople’s questions the way {ROB_SNOEIJEN.firstName} would, between trainings.</p>
              <div className="row">
                <span className="btn btn--ghost" aria-disabled="true">Coming soon</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair coachee={ROLE_PLAY.coachee} persona={ROLE_PLAY.persona} label="Your client" />
            <div className="path-b">
              <h2>{ROLE_PLAY.title}</h2>
              <div className="row">
                <a href={DASH + ROLE_PLAY.slug} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={ROB_SNOEIJEN} />
      </div>
    </section>
  )
}
