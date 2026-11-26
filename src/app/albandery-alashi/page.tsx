import Image from 'next/image'
import Link from 'next/link'
import { ALBANDERY_ALASHI } from '@/data.js'
import TrustFooter from '@/components/TrustFooter.jsx'
import { LinkedIn, Sparkle } from '@/components/Icons.jsx'

// Methodology only for now: no live twin or role play yet (her material is Arabic and short).
export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <span className="prathosh-avatar">
            <Image src={ALBANDERY_ALASHI.face} alt={ALBANDERY_ALASHI.name} fill sizes="76px" />
          </span>
          <span className="badge"><Sparkle />{ALBANDERY_ALASHI.name} · Demo</span>
          <h1>How {ALBANDERY_ALASHI.firstName}’s AI twin learns</h1>
          <p>See how an AI twin would learn {ALBANDERY_ALASHI.firstName}’s way of designing training in presentation, communication and influence: diagnose before you develop.</p>
          <div className="made">
            <span className="made-l">Made from</span>
            <span className="srcpill"><LinkedIn />LinkedIn</span>
            <span className="srcpill">Website</span>
          </div>
        </div>
        <div className="paths">
          <article className="path path--wide">
            <div className="peek peek--fig peek--pyr" aria-hidden="true">
              <img src="/media/albandery-alashi-pyramid.jpg" alt="" />
              <span className="peek-k">Training methodology</span>
            </div>
            <div className="path-b">
              <h2>Your training method, which the twin learns from</h2>
              <p>See how the twin was built from {ALBANDERY_ALASHI.firstName}’s posts and Estedama’s programmes, layer by layer. Arabic quotes are shown with English translations.</p>
              <div className="row">
                <Link href="/albandery-alashi/methodology" className="btn btn--strong card-link">See how it learns</Link>
              </div>
            </div>
          </article>
        </div>
        <TrustFooter twin={ALBANDERY_ALASHI} />
      </div>
    </section>
  )
}
