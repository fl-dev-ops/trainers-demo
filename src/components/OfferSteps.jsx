/* "Our offer and next steps" + "Digital twin pricing", shown under a coach's demo cards.
   Copied from the sales team's artifact "How is the twin built?" (claude.ai/artifact/WEV9wx89yweywMtPNGHY5Y, 26 Nov 2026).
   Prices and terms come from Shyam/DJ: change them here, in one place, for every coach page that uses this. */

const NDA = ['No training on content', 'You own your content', 'Your name, voice, face', 'Deletion within 30 days', 'We answer for leaks', 'No commitment, exit anytime']

const PLANS = [
  { name: 'Starter', price: '$50', note: 'Voice only' },
  { name: 'Pro', price: '$100', note: 'Voice and video avatar', featured: true },
  { name: 'Business', price: '$300', note: 'Voice and video avatar, at scale' },
]

const TABLE = [
  ['Voice', [['Voice minutes / month', '150', '300', '1,000'], ['Concurrent voice sessions', '5', '25', '50']]],
  ['Video avatar', [['Video avatar minutes / month', '—', '150', '500'], ['Video avatars', '—', '1', '3'], ['Concurrent video sessions', '—', '3', '5']]],
  ['Roleplay', [['Personas', '8', '20', '50'], ['Scenarios', '30', '50', '100']]],
  ['Extra minutes (any plan)', [['Voice', ['$25', 'per 100 min'], ['$25', 'per 100 min'], ['$25', 'per 100 min']], ['Video avatar', '—', ['$50', 'per 100 min'], ['$50', 'per 100 min']]]],
]

const Ico = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
)
const CLOCK = <Ico d={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />
const PEOPLE = <Ico d={<><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14.2c2.1.7 3.5 2.8 3.5 5.8" /></>} />
const SLIDERS = <Ico d={<><path d="M5 4v16M12 4v16M19 4v16" /><path d="M3 9h4M10 15h4M17 7h4" /></>} />

const cell = (v) => (Array.isArray(v) ? <><b>{v[0]}</b><small>{v[1]}</small></> : v === '—' ? <span className="ofr-dash">—</span> : <b>{v}</b>)

export default function OfferSteps() {
  return (
    <section className="ofr" aria-labelledby="ofr-h">
      <h2 id="ofr-h" className="ofr-h">Our offer and next steps</h2>

      <div className="ofr-step">
        <span className="ofr-n">1</span>
        <div>
          <h3>Sign an NDA and finalise the scope</h3>
          <p>Before we start, we sign an NDA to protect your IP: your content, methods and coaching style stay yours. Highlights include, but aren’t limited to:</p>
          <div className="ofr-chips">{NDA.map((c) => <span key={c}>{c}</span>)}</div>
          <p>We then draw up <b>a clear scope document</b> to ensure the quality of your twin and the roleplays to be built. It covers:</p>
          <ul className="ofr-list"><li>When and where the twin will be used</li><li>Who the end users are</li><li>Frequency</li></ul>
        </div>
      </div>

      <div className="ofr-step">
        <span className="ofr-n">2</span>
        <div>
          <h3>What you get: your Day 1 to Day 14 journey</h3>
          <div className="ofr-prices">
            <div><strong>$200</strong><span>Up to 1 million tokens</span></div>
            <div><strong>$300</strong><span>More than 2 million tokens</span></div>
          </div>
          <ol className="ofr-line">
            <li><b>Day 7</b><span>Your twin at <b>70% accuracy</b></span></li>
            <li><b>Day 7 – 14</b><span>Calibration with your <b>Customer Success team</b></span></li>
            <li className="on"><b>Day 14</b><span>Your twin at <b>90% accuracy</b></span></li>
          </ol>
        </div>
      </div>

      <div className="ofr-step">
        <span className="ofr-n">3</span>
        <div>
          <h3>Go live with your clients</h3>
          <p>Your twin goes live with your clients, set up to reinforce what they learn with you.</p>
          <div className="ofr-feats">
            <div><i>{CLOCK}</i><b>Assign minutes</b><span>Give each client a set number of minutes with your twin.</span></div>
            <div><i>{PEOPLE}</i><b>Customised roleplays</b><span>Practice scenarios built around your clients’ real situations.</span></div>
            <div><i>{SLIDERS}</i><b>Feedback configuration</b><span>Set what the twin gives feedback on, in line with your method.</span></div>
          </div>
          <p>Choose the plan that fits how many clients you’ll bring on.</p>
        </div>
      </div>

      <h2 className="ofr-h ofr-h--sub">Digital twin pricing</h2>
      <p className="ofr-lead">One-time build: <b>$200 to $300</b>, depending on how much content we ingest and what the build requires. Includes a <b>70% ready twin</b> for calibration, <b>100 minutes</b> of trial usage and a dedicated Customer Success resource.</p>
      <div className="ofr-plans">
        {PLANS.map((p) => (
          <div key={p.name} className={p.featured ? 'feat' : undefined}>
            <span className="ofr-pn">{p.name}</span>
            <span className="ofr-pp"><strong>{p.price}</strong> / month</span>
            <span>{p.note}</span>
          </div>
        ))}
      </div>
      <div className="ofr-tbl-wrap">
        <table className="ofr-tbl">
          <thead><tr><th /><th>Starter · $50</th><th>Pro · $100</th><th>Business · $300</th></tr></thead>
          <tbody>
            {TABLE.map(([group, rows]) => [
              <tr key={group} className="grp"><td colSpan={4}>{group}</td></tr>,
              ...rows.map(([label, ...vals]) => (
                <tr key={group + label}><td>{label}</td>{vals.map((v, i) => <td key={i}>{cell(v)}</td>)}</tr>
              )),
            ])}
          </tbody>
        </table>
      </div>
      <p className="ofr-quote">The twin steps in to review the roleplay interaction and gives conversational feedback based on the coach’s framework and methodology.</p>
    </section>
  )
}
