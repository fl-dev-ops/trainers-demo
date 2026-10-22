import { Instagram, LinkedIn, YouTube } from './Icons.jsx'

export default function MadeFrom({ youtubeOnly = false, linkedin = false, x = true }) {
  return (
    <div className="made">
      <span className="made-l">Made from</span>
      <span className="srcpill"><YouTube />YouTube</span>
      {(!youtubeOnly || linkedin) && <span className="srcpill"><LinkedIn />LinkedIn</span>}
      {!youtubeOnly && <span className="srcpill"><Instagram />Instagram</span>}
      {!youtubeOnly && x && <span className="srcpill">X (Twitter)</span>}
    </div>
  )
}
