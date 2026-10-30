import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ANTONI, JAMEEL, PRATHOSH, TONY_LATIMER, TWIN } from '../data.js'

export const metadata: Metadata = {
  title: 'Trainer demos · TrainerTwin',
  description: 'Explore trainer AI twins and try their demos.',
}

export default function Home() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <h1>Meet the trainers.</h1>
          <p>Explore their AI twins and try a demo.</p>
        </div>
        <div className="paths">
          <article className="path">
            <div className="path-b">
              <Image
                src={TWIN.face}
                alt={TWIN.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{TWIN.name}</h2>
              <p>Meet Olga’s video twin and practise with her interactive twin.</p>
              <div className="row">
                <Link href="/olga" className="btn btn--strong">
                  Explore Olga’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <span className="jameel-avatar">
                <Image src={JAMEEL.face} alt={JAMEEL.name} fill sizes="76px" />
              </span>
              <h2>{JAMEEL.name}</h2>
              <p>Practise client conversations with Jameel’s interactive video twin.</p>
              <div className="row">
                <Link href="/jameel" className="btn btn--strong">
                  Explore Jameel’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <span className="prathosh-avatar">
                <Image src={PRATHOSH.face} alt={PRATHOSH.name} fill sizes="76px" />
              </span>
              <h2>{PRATHOSH.name}</h2>
              <p>Ask your doubts on Prathosh’s NPTEL machine learning course to his AI twin.</p>
              <div className="row">
                <Link href="/prathosh" className="btn btn--strong">
                  Explore Prathosh’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={ANTONI.face}
                alt={ANTONI.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{ANTONI.name}</h2>
              <p>Practise your pitch with Antoni’s AI twin and get his style of feedback.</p>
              <div className="row">
                <Link href="/antoni" className="btn btn--strong">
                  Explore Antoni’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={TONY_LATIMER.face}
                alt={TONY_LATIMER.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{TONY_LATIMER.name}</h2>
              <p>Ask Tony’s AI twin about CEO transitions, leadership teams and coaching.</p>
              <div className="row">
                <Link href="/tony-latimer" className="btn btn--strong">
                  Explore Tony’s demo
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
