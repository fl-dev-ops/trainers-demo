export const TWIN = {
  id: 'olga',
  name: 'Olga Sinenko',
  firstName: 'Olga',
  initials: 'OS',
  video: '/media/olga-intro.mp4',
  demo: 'https://www.loom.com/share/5d5335a668de4abebec06d4c2271f7d0',
  poster: '/media/olga-intro-poster.jpg',
  face: '/media/olga-face.jpg',
}

export const JAMEEL = {
  id: 'jameel',
  name: 'Jameel',
  firstName: 'Jameel',
  initials: 'J',
  face: '/media/jameel-face.png',
  portraitClass: 'jameel-portrait',
  room: {
    kind: 'Interview practice · Demo',
    title: 'Demand Planner Job',
    scenario: 'Jameel’s AI twin is ready to help you prepare for a Demand Planner Job based on top 10 frequently asked questions. During the interaction, the twin will also share tips on how to answer these questions effectively to impress your potential employer.',
  },
}

export const PRATHOSH = {
  id: 'prathosh',
  name: 'Prathosh A P',
  firstName: 'Prathosh',
  initials: 'PA',
  face: '/media/prathosh-face.jpg',
  // Wide crop for short, wide containers (welcome card, live tile) so his whole face stays visible.
  portrait: '/media/prathosh-portrait.jpg',
  portraitClass: 'prathosh-portrait',
  room: {
    kind: 'Course Q&A · Demo',
    title: 'Mathematical Foundations of ML',
    scenario: 'Prathosh’s AI twin answers your doubts on his NPTEL course, Mathematical Foundations of Machine Learning (IISc Bengaluru), and points you to the lecture where each topic is covered. It is a pedagogical aid, not a replacement for Prathosh.',
  },
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
