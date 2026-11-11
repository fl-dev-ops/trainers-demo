import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ANTONI, BEVAN_BROADBENT, DARREN_MITCHELL, FLO_AKINBIYI, GOPAL_RAJGURU, JAMEEL, JOHNNY_DANIELE, MARCUS_CAUCHI, PRATHOSH, TONY_LATIMER, TWIN } from '../data.js'

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
                src={JOHNNY_DANIELE.face}
                alt={JOHNNY_DANIELE.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{JOHNNY_DANIELE.name}</h2>
              <p>Practise speaking up in English at work with Johnny, Daniele Ponzo’s AI practice assistant.</p>
              <div className="row">
                <Link href="/johnny-daniele" className="btn btn--strong">
                  Explore Johnny’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={DARREN_MITCHELL.face}
                alt={DARREN_MITCHELL.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{DARREN_MITCHELL.name}</h2>
              <p>Ask Darren’s AI twin anything about leading a sales team.</p>
              <div className="row">
                <Link href="/darren-mitchell" className="btn btn--strong">
                  Explore Darren’s demo
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
          <article className="path">
            <div className="path-b">
              <Image
                src={MARCUS_CAUCHI.face}
                alt={MARCUS_CAUCHI.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{MARCUS_CAUCHI.name}</h2>
              <p>Ask Marcus’s AI twin about prospecting, buyers and the budget conversation.</p>
              <div className="row">
                <Link href="/marcus-cauchi" className="btn btn--strong">
                  Explore Marcus’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={BEVAN_BROADBENT.face}
                alt={BEVAN_BROADBENT.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{BEVAN_BROADBENT.name}</h2>
              <p>Ask Bevan’s AI twin about letting go, trusting your team and self-doubt.</p>
              <div className="row">
                <Link href="/bevan-broadbent" className="btn btn--strong">
                  Explore Bevan’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={FLO_AKINBIYI.face}
                alt={FLO_AKINBIYI.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{FLO_AKINBIYI.name}</h2>
              <p>Ask Flo’s AI twin about stage fright, energy and connecting with people the human-first way.</p>
              <div className="row">
                <Link href="/flo-akinbiyi" className="btn btn--strong">
                  Explore Flo’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={GOPAL_RAJGURU.face}
                alt={GOPAL_RAJGURU.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{GOPAL_RAJGURU.name}</h2>
              <p>Ask Gopal’s AI twin about B2B selling, negotiation and leading your team.</p>
              <div className="row">
                <Link href="/gopal-rajguru" className="btn btn--strong">
                  Explore Gopal’s demo
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
