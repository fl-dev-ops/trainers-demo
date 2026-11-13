import Image from 'next/image'
import Link from 'next/link'
import { DARREN_MITCHELL } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { LinkedIn, Sparkle, YouTube } from '@/components/Icons.jsx'

const QUESTIONS = [
  'I have just been promoted to sales manager. Where do I start?',
  'My best rep hits target but ignores our process. What should I do?',
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={DARREN_MITCHELL.face} alt={DARREN_MITCHELL.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {DARREN_MITCHELL.name} · Demo</span>
          <h1>Meet {DARREN_MITCHELL.firstName}’s AI Twin</h1>
          <p>Ask {DARREN_MITCHELL.firstName}’s AI twin about leading a sales team, coaching salespeople and building a sales culture. It was made only for this demo.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill">Podcast</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Articles</span>
            <span className="srcpill"><YouTube />YouTube</span>
          </div>
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/darren-mitchell-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {DARREN_MITCHELL.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/darren-mitchell/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            <TwinNotebook trainer={DARREN_MITCHELL} livePath="/darren-mitchell/live" questions={QUESTIONS} />
            <div className="path-b">
              <h2>Ask {DARREN_MITCHELL.firstName}’s twin live</h2>
              <p>Pick a post-it to start a conversation, or ask your own question.</p>
              <div className="row">
                <Link href="/darren-mitchell/live" className="btn btn--strong card-link">Start asking</Link>
                <span className="meta">{DARREN_MITCHELL.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Sales manager', text: 'A newly promoted sales manager holding a coaching session with the team’s top performer.', practises: ['Coaching, not telling', 'Holding the standard'] }}
              persona={{ role: 'Senior Account Executive', name: 'Jake Morrison', photo: '/media/darren-roleplay-jake.jpg', behaviour: ['Warm & Open', 'Direct & Challenging'], speaking: ['Casual', 'Short answers'], voice: 'Ethan', text: 'Top performer on a sales team of eight in Melbourne, on target every quarter. Rarely updates the CRM. Has moved this coaching session twice already.' }}
            />
            <div className="path-b">
              <h2>Coach your top rep</h2>
              <div className="row">
                <a href="https://dash.roleplay.foreverlearning.in/agents/coach-your-top-rep" target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={DARREN_MITCHELL} />
      </div>
    </section>
  )
}
