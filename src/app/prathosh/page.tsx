import Image from 'next/image'
import Link from 'next/link'
import { PRATHOSH } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import TrustFooter from '@/components/TrustFooter.jsx'
import { Sparkle } from '@/components/Icons.jsx'

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
        <div className="paths" style={{ gridTemplateColumns: 'minmax(0, 1fr)', maxWidth: 460 }}>
          <article className="path">
            <div className="peek peek--fig" aria-hidden="true">
              <Image className={PRATHOSH.portraitClass} src={PRATHOSH.portrait} alt="" fill sizes="(max-width: 680px) 100vw, 460px" />
            </div>
            <div className="path-b">
              <div className="row">
                <Link href="/prathosh/live" className="btn btn--strong">Meet your twin</Link>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={PRATHOSH} />
      </div>
    </section>
  )
}
