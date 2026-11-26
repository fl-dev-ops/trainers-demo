import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { AISHWARYA_REGANTI, ALBANDERY_ALASHI, COLLY_GRAHAM, ANTONI, BEVAN_BROADBENT, CLIVE_MILLER, DARREN_MITCHELL, FLO_AKINBIYI, GOPAL_RAJGURU, JAMEEL, JOHNNY_DANIELE, MARCUS_CAUCHI, PRATHOSH, SEAN_WEAFER, NATALIE_SEREBRENNIK, SHEHZAD_MUKADAM, SHELLEY_WALTERS, TONY_LATIMER, TWIN } from '../data.js'

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
              <p>Ask Olga’s twin about objections and practise role plays with her AI clients.</p>
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
          <article className="path">
            <div className="path-b">
              <Image
                src={SEAN_WEAFER.face}
                alt={SEAN_WEAFER.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{SEAN_WEAFER.name}</h2>
              <p>Ask Seán’s AI twin about winning business as a trusted advisor, without feeling salesy.</p>
              <div className="row">
                <Link href="/sean-weafer" className="btn btn--strong">
                  Explore Seán’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={CLIVE_MILLER.face}
                alt={CLIVE_MILLER.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{CLIVE_MILLER.name}</h2>
              <p>Ask Clive’s AI twin about winning complex B2B sales, qualifying deals and leading a sales team.</p>
              <div className="row">
                <Link href="/clive-miller" className="btn btn--strong">
                  Explore Clive’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={SHEHZAD_MUKADAM.face}
                alt={SHEHZAD_MUKADAM.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{SHEHZAD_MUKADAM.name}</h2>
              <p>Ask Shehzad’s AI twin about sales training that sticks, leading managers and building trust with clients.</p>
              <div className="row">
                <Link href="/shehzad-mukadam" className="btn btn--strong">
                  Explore Shehzad’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={NATALIE_SEREBRENNIK.face}
                alt={NATALIE_SEREBRENNIK.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{NATALIE_SEREBRENNIK.name}</h2>
              <p>Ask Natalie’s AI twin about getting seen at work, going for a promotion and hard conversations with your manager.</p>
              <div className="row">
                <Link href="/natalie-serebrennik" className="btn btn--strong">
                  Explore Natalie’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={SHELLEY_WALTERS.face}
                alt={SHELLEY_WALTERS.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{SHELLEY_WALTERS.name}</h2>
              <p>Ask Shelley’s AI twin about building confidence in sales, managing your pipeline and coaching your sales team.</p>
              <div className="row">
                <Link href="/shelley-walters" className="btn btn--strong">
                  Explore Shelley’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={COLLY_GRAHAM.face}
                alt={COLLY_GRAHAM.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{COLLY_GRAHAM.name}</h2>
              <p>Ask Colly’s AI twin about brain-based selling, objections and your sales mindset.</p>
              <div className="row">
                <Link href="/colly-graham" className="btn btn--strong">
                  Explore Colly’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={AISHWARYA_REGANTI.face}
                alt={AISHWARYA_REGANTI.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{AISHWARYA_REGANTI.name}</h2>
              <p>Ask Aishwarya’s AI twin about building AI products, right inside Slack.</p>
              <div className="row">
                <Link href="/aishwarya-reganti" className="btn btn--strong">
                  Explore Aishwarya’s demo
                </Link>
              </div>
            </div>
          </article>
          <article className="path">
            <div className="path-b">
              <Image
                src={ALBANDERY_ALASHI.face}
                alt={ALBANDERY_ALASHI.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <h2>{ALBANDERY_ALASHI.name}</h2>
              <p>See how an AI twin learns Albandery’s method for presentations and influence: diagnose before you develop. Role plays coming soon.</p>
              <div className="row">
                <Link href="/albandery-alashi" className="btn btn--strong">
                  Explore Albandery’s demo
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
