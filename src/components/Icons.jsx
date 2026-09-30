const stroke = { fill: 'none', stroke: 'currentColor', 'aria-hidden': true, viewBox: '0 0 24 24' }

export const Logo = () => (
  <svg viewBox="0 0 240 241" aria-hidden="true">
    <path fill="#EC3013" d="M172.891 80C165.711 80 159.891 85.8203 159.891 93L159.891 146.922C159.891 154.102 165.711 159.922 172.891 159.922L227 159.922C234.18 159.922 240 165.742 240 172.922L240 227.031C240 234.211 234.18 240.031 227 240.031L172.891 240.031C165.711 240.031 159.891 234.211 159.891 227.031L159.891 172.926C159.891 165.746 154.07 159.926 146.891 159.926L93.7734 159.926C86.5937 159.926 80.7734 165.746 80.7734 172.926L80.7734 227.031C80.7734 234.211 74.9531 240.031 67.7734 240.031L13.6641 240.031C6.48436 240.031 0.664063 234.211 0.664063 227.031L0.664065 172.922C0.664066 165.742 6.48436 159.922 13.6641 159.922L66.7813 159.922C73.961 159.922 79.7813 154.102 79.7813 146.922L79.7813 93C79.7813 85.8203 73.961 80 66.7813 80L13 80C5.82031 80 7.2496e-06 74.1797 7.56343e-06 67L9.92385e-06 13C1.02377e-05 5.8203 5.82031 2.5441e-07 13 5.68245e-07L227 9.92248e-06C234.18 1.02363e-05 240 5.82031 240 13L240 67C240 74.1797 234.18 80 227 80L172.891 80Z" />
  </svg>
)

export const Lock = () => (
  <svg {...stroke} strokeWidth="2"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
)
export const Sun = () => (
  <svg {...stroke} className="ic16" strokeWidth="1.8"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
)
export const Moon = () => (
  <svg {...stroke} className="ic16" strokeWidth="1.8"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
)
export const Sparkle = () => (
  <svg {...stroke} strokeWidth="2"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
)
export const ChevronLeft = () => (
  <svg {...stroke} className="ic16" strokeWidth="2"><path d="M15 6l-6 6 6 6" /></svg>
)
export const Close = () => (
  <svg {...stroke} className="ic16" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
)
export const Eye = () => (
  <svg {...stroke} strokeWidth="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
)
export const VideoCam = ({ width = 2 }) => (
  <svg {...stroke} strokeWidth={width}><rect x="3" y="6" width="13" height="12" rx="2" /><path d="M16 10l5-3v10l-5-3" /></svg>
)
export const Chat = ({ width = 2 }) => (
  <svg {...stroke} strokeWidth={width}><path d="M4 5h16v11H9l-5 4z" /></svg>
)
export const Mic = () => (
  <svg {...stroke} strokeWidth="1.8"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
)
export const HangUp = () => (
  <svg {...stroke} strokeWidth="1.8"><path d="M3 14c5-5 13-5 18 0l-2 3-4-1v-3c-2-1-4-1-6 0v3l-4 1z" /></svg>
)
export const Shield = () => (
  <svg {...stroke} strokeWidth="1.6"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /></svg>
)
export const Send = () => (
  <svg {...stroke} strokeWidth="2"><path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" /></svg>
)
export const Trash = () => (
  <svg {...stroke} strokeWidth="1.6"><path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13h10l1-13" /></svg>
)
export const Check = () => (
  <svg {...stroke} strokeWidth="2"><path d="M5 12l5 5 9-10" /></svg>
)
export const PlayBox = () => (
  <svg {...stroke} strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3z" /></svg>
)

/* Source pills */
export const YouTube = () => (
  <svg {...stroke} strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="3" /><path d="M10 9l5 3-5 3z" /></svg>
)
export const LinkedIn = () => (
  <svg {...stroke} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v6M8 7v.01M12 16v-4a2 2 0 0 1 4 0v4" /></svg>
)
export const Instagram = () => (
  <svg {...stroke} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></svg>
)
export const XLogo = () => (
  <svg {...stroke} strokeWidth="1.8"><path d="M4 4l16 16M20 4L4 20" /></svg>
)
