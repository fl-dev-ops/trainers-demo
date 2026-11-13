import Image from 'next/image'
import Link from 'next/link'
import { BEVAN_BROADBENT } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I know I should delegate more, but I just don’t. Why?',
  'I keep feeling like I’ll be found out. What do I do?',
]

const ROLEPLAY_URL = 'https://dash.roleplay.foreverlearning.in/agents/the-one-to-one-you-keep-putting-off-liam-team-lead-bevan-bro'


export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={BEVAN_BROADBENT.face} alt={BEVAN_BROADBENT.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {BEVAN_BROADBENT.name} · Demo</span>
          <h1>Meet {BEVAN_BROADBENT.firstName}’s AI Twin</h1>
          <p>Ask {BEVAN_BROADBENT.firstName}’s AI twin about letting go, trusting your team, self-doubt and the problem behind the problem.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Client videos</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/bevan-broadbent-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {BEVAN_BROADBENT.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/bevan-broadbent/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={BEVAN_BROADBENT} livePath="/bevan-broadbent/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {BEVAN_BROADBENT.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/bevan-broadbent/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{BEVAN_BROADBENT.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Founder', text: 'A startup founder who keeps re-checking the lead engineer’s work, and has their weekly one-to-one today.', practises: ['Letting go', 'Handing back ownership'] }}
              persona={{ role: 'Lead engineer', name: 'Liam Walsh', photo: '/media/bevan-roleplay-liam.jpg', text: 'Lead engineer at a 15-person software startup and one of its first hires. Lately he waits to be told what to do, and says everything is fine.' }}
            />
            <div className="path-b">
              <h2>Help Liam take ownership again</h2>
              <div className="row">
                <a href={ROLEPLAY_URL} target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={BEVAN_BROADBENT} />
      </div>
    </section>
  )
}
