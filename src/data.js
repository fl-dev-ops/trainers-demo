export const TWIN = {
  name: 'Olga Sinenko',
  firstName: 'Olga',
  initials: 'OS',
  video: '/media/olga-intro.mp4',
  demo: 'https://www.loom.com/share/5d5335a668de4abebec06d4c2271f7d0',
  poster: '/media/olga-intro-poster.jpg',
  face: '/media/olga-face.jpg',
}

export const SOURCES = [
  ['YouTube', '108 videos · 211 Shorts', [
    ['Dubai 2008 vs 2026: Is 2008 Happening Again?', '134K views'],
    ['2025 Dubai Real Estate Market Correction', '29K views'],
    ['4 Questions That Kill Your Dubai Real Estate Deals in 2026', 'Sales training'],
    ['FULL SALES COURSE: Dubai Real Estate 2026', 'Course'],
  ]],
  ['LinkedIn', '665 posts · 2017 to 2026', [
    ['“Readiness” is a myth — action creates clarity', 'Sept 2025'],
    ['The promotion secret nobody tells', 'Oct 2025'],
  ]],
  ['Instagram', '32 posts', [['@olga_sinenko.official', 'Reels and carousels']]],
  ['X', '2 posts', [['Too few to learn your style from', 'Used for facts only']]],
]

/* Role plays shown on the live page (/live?s=<id>). The first one is the default. */
export const SCENARIOS = [
  {
    id: 'disappeared',
    title: 'My client disappeared',
    tag: 'Agent question · After the call',
    initials: 'P',
    participant: 'Priya · Agent · AI',
    quote: '“He said, ‘Just send me some options.’ I sent three. Now… nothing.”',
    scenario: 'Priya sent options after a good call. The investor went quiet. She asks you what went wrong.',
    cues: [
      'Tell her what happened',
      'Share your opening, word for word',
      'Ask what you should have said',
      'Bring your next objection',
    ],
  },
  {
    id: 'prices',
    title: "I'll wait for prices to drop",
    tag: 'Objection · Investor',
    initials: 'I',
    participant: 'Investor · AI',
    quote: '“I\'ll wait for prices to drop.”',
    scenario: 'An investor expects a 30% drop and wants to wait.',
    cues: [
      "Don't argue with the market",
      'Let him say Dubai will recover',
      'Find his real reason',
    ],
  },
]
