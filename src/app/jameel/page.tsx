import Image from 'next/image'
import Link from 'next/link'
import { JAMEEL } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Sparkle } from '@/components/Icons.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="jameel-avatar">
            <Image src={JAMEEL.face} alt={JAMEEL.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {JAMEEL.name} · Demo</span>
          <h1>Meet {JAMEEL.firstName}’s AI Twin</h1>
          <p>Practise for your Demand Planner Job today!</p>
          <MadeFrom youtubeOnly linkedin />
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/jameel-pyramid.jpg" alt="" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>Your coaching method, which the twin learns from</h2>
              <p>See how the twin was built from {JAMEEL.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/jameel/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path">
            {/* Jameel's twin runs a Demand Planner mock interview, so every post-it opens that interview. */}
            <TwinNotebook
              trainer={JAMEEL}
              livePath="/jameel/live"
              notes={[
                { label: 'Start my Demand Planner mock interview', query: {} },
              ]}
            />
            <div className="path-b">
              <h2>Practise your interview with {JAMEEL.firstName}’s twin</h2>
              <p>A live Demand Planner mock interview, with feedback in {JAMEEL.firstName}’s style.</p>
              <div className="row">
                <Link href="/jameel/live" className="btn btn--strong card-link">Start the interview</Link>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'Demand Planner', text: 'A demand planner presenting the consensus forecast in the monthly S&OP meeting.', practises: ['Questions before positions', 'Data over opinion'] }}
              persona={{ role: 'Sales Director', name: 'Mark Reynolds', photo: '/media/jameel-roleplay-mark.jpg', behaviour: ['Direct & Challenging'], speaking: ['Neutral', 'Interrupts often'], voice: 'Ethan', text: 'Runs key-account sales at a consumer goods company in Toronto. Wants the forecast for a big retailer promotion raised by 30 percent. Confident, pushy and light on numbers.' }}
            />
            <div className="path-b">
              <h2>Defend your forecast in the S&OP meeting</h2>
              <div className="row">
                <a href="https://dash.roleplay.foreverlearning.in/agents/defend-your-forecast-in-the-s-op-meeting" target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={JAMEEL} />
      </div>
    </section>
  )
}
