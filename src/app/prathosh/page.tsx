import Image from 'next/image'
import Link from 'next/link'
import { PRATHOSH } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Play, Sparkle } from '@/components/Icons.jsx'

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
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/prathosh-pyramid.jpg" alt="" />
              <span className="peek-k">Teaching methodology</span>
            </div>
            <div className="path-b">
              <h2>What {PRATHOSH.firstName}’s twin learns from</h2>
              <p>See how the twin was built from {PRATHOSH.firstName}’s lectures, layer by layer.</p>
              <div className="row">
                <Link href="/prathosh/methodology" className="btn btn--strong">See how it learns</Link>
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
