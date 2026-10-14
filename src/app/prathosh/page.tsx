import Image from 'next/image'
import Link from 'next/link'
import { PRATHOSH } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Eye, Play, Sparkle } from '@/components/Icons.jsx'

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
                <Link href="/prathosh/meet" className="btn btn--strong">Watch the intro</Link>
                <span className="meta">35 sec</span>
              </div>
            </div>
          </article>

          <article className="path">
            <div className="peek peek--rps">
              <span className="peek-k">{DOUBTS.length} doubts from the course</span>
              <div className="rprows">
                {DOUBTS.map((q) => (
                  <Link key={q} href="/prathosh/live" className="rprow" aria-label={'Ask the twin: ' + q}>
                    <span className="cl" aria-hidden="true">S</span>
                    <span className="q">“{q}”</span>
                    <img className="tw" src={PRATHOSH.face} alt="" />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="path-b">
              <h2>Meet the interactive twin</h2>
              <p>Where students clear their doubts and get pointed to the right lecture.</p>
              <div className="row">
                <Link href="/prathosh/live" className="btn btn--strong">Ask a doubt</Link>
                <span className="meta">Mathematical Foundations of ML · NPTEL</span>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={PRATHOSH} />
      </div>
    </section>
  )
}
