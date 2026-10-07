import Image from 'next/image'
import Link from 'next/link'
import { JAMEEL, SCENARIOS } from '@/data.js'
import MadeFrom from '@/components/MadeFrom.jsx'
import { Play, Sparkle } from '@/components/Icons.jsx'

export default function Welcome() {
  return (
    <section className="wrap">
      <div className="welcome">
        <div className="hero">
          <Image
                src={JAMEEL.face}
                alt={JAMEEL.name}
                width={76}
                height={76}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
          <span className="badge"><Sparkle />AI twin of {JAMEEL.name}</span>
          <h1>Meet {JAMEEL.firstName}'s training twin.</h1>
          <p>Practise client conversations with a live video avatar.</p>
          <MadeFrom youtubeOnly />
        </div>
        <div className="paths">
          <article className="path">
            <div className="path-b">
              <h2>Meet your interactive twin</h2>
              <p>Bring a client question or try a sales role play with Jameel's AI twin.</p>
              <div className="row">
                <Link href="/jameel/live" className="btn btn--strong">Meet your twin</Link>
              </div>
              <div className="rprows">
                {SCENARIOS.map((scenario) => (
                  <Link key={scenario.id} href={`/jameel/live?s=${scenario.id}`} className="rprow" aria-label={'Start the role play: ' + scenario.title}>
                    <span className="cl" aria-hidden="true">{scenario.initials}</span>
                    <span className="q">{scenario.quote}</span>
                    <Image className="tw" src={JAMEEL.face} alt="" width={32} height={32} />
                    <span className="pl" aria-hidden="true"><Play /></span>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
