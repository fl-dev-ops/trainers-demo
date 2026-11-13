import Image from 'next/image'
import Link from 'next/link'
import { PRATHOSH } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { RoleplayPair, TwinNotebook } from '@/components/ProfileCards.jsx'
import { Eye, Sparkle } from '@/components/Icons.jsx'

const DOUBTS = [
  'Why do we minimise empirical risk instead of the true risk?',
  'How does the kernel trick help an SVM?',
]

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={PRATHOSH.face} alt={PRATHOSH.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />AI twin of {PRATHOSH.name} · Demo</span>
          <h1>Meet {PRATHOSH.firstName}’s AI Twin</h1>
          <p>Clear your doubts on Mathematical Foundations of Machine Learning today!</p>
          <MadeFrom youtubeOnly linkedin />
        </div>
        <div className="paths">
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image className={PRATHOSH.portraitClass} src={PRATHOSH.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">The twin is waiting</span>
              <span className="tag"><Eye />Meet to reveal</span>
            </div>
            <div className="path-b">
              <h2>Meet the video twin</h2>
              <p>A short intro from Prathosh’s AI twin.</p>
              <div className="row">
                <Link href="/prathosh/meet" className="btn btn--strong card-link">Watch the intro</Link>
                <span className="meta">35 sec</span>
              </div>
            </div>
          </article>

          <article className="path">
            <TwinNotebook trainer={PRATHOSH} livePath="/prathosh/live" questions={DOUBTS} />
            <div className="path-b">
              <h2>Meet the interactive twin</h2>
              <p>Pick a post-it to ask a doubt, or ask your own.</p>
              <div className="row">
                <Link href="/prathosh/live" className="btn btn--strong card-link">Ask a doubt</Link>
                <span className="meta">Mathematical Foundations of ML · NPTEL</span>
              </div>
            </div>
          </article>

          <article className="path path--wide">
            <div className="peek peek--fig peek--pyr peek--pyr2" aria-hidden="true">
              <span className="peek-k">Teaching methodology</span>
              <figure><img src="/media/prathosh-pyramid.jpg" alt="" /><figcaption>ML professor · 362 sources</figcaption></figure>
              <figure><img src="/media/prathosh-sanskrit-pyramid.jpg" alt="" /><figcaption>Sanskrit teacher · 115 sources</figcaption></figure>
            </div>
            <div className="path-b">
              <h2>Your teaching method, which the twin learns from</h2>
              <p>Two personas, two pyramids: switch between the ML professor and the Sanskrit teacher on every screen.</p>
              <div className="row">
                <Link href="/prathosh/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
          <article className="path path--wide">
            <RoleplayPair
              coachee={{ role: 'M.Tech student', text: 'A student defending a project on generative models in front of the viva panel.', practises: ['The why behind the how', 'Intuition before equations'] }}
              persona={{ role: 'Viva Examiner', name: 'Dr Suresh Iyer', photo: '/media/prathosh-roleplay-suresh.jpg', behaviour: ['Curious & Probing'], speaking: ['Formal', 'Short answers'], voice: 'Oliver', text: 'Professor and external examiner on an M.Tech viva panel in Bengaluru. Has read the report on generative models. Calm, precise and patient, and keeps asking why.' }}
            />
            <div className="path-b">
              <h2>Defend your project in the viva</h2>
              <div className="row">
                <a href="https://dash.roleplay.foreverlearning.in/agents/defend-your-project-in-the-viva" target="_blank" rel="noopener noreferrer" className="btn btn--strong card-link">Start the role play</a>
                <span className="meta">Opens the role-play app</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={PRATHOSH} />
      </div>
    </section>
  )
}
