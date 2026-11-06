import Image from 'next/image'
import Link from 'next/link'
import { DARREN_MITCHELL } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Play, Sparkle, YouTube } from '@/components/Icons.jsx'

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
            <div className="peek peek--rps peek--wrap">
              <span className="peek-k">Ask a question</span>
              <div className="rprows">
                {QUESTIONS.map((q) => (
                  <Link key={q} href={{ pathname: '/darren-mitchell/live', query: { q } }} className="rprow" aria-label={'Ask: ' + q}>
                    <span className="cl" aria-hidden="true">Y</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={DARREN_MITCHELL.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Ask {DARREN_MITCHELL.firstName}’s twin live</h2>
              <p>Talk to {DARREN_MITCHELL.firstName}’s twin using your mic and camera, and ask whatever is on your mind about leading your team.</p>
              <div className="row">
                <Link href="/darren-mitchell/live" className="btn btn--strong">Start asking</Link>
                <span className="meta">{DARREN_MITCHELL.room.kind}</span>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image src={DARREN_MITCHELL.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
              <span className="peek-k">Coaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {DARREN_MITCHELL.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {DARREN_MITCHELL.firstName}’s coaching, layer by layer.</p>
              <div className="row">
                <Link href="/darren-mitchell/methodology" className="btn btn--strong">See how it learns</Link>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={DARREN_MITCHELL} />
      </div>
    </section>
  )
}
