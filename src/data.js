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
  video: '/media/prathosh-intro.mp4',
  poster: '/media/prathosh-intro-poster.jpg',
  // Wide crop for short, wide containers (welcome card, live tile) so his whole face stays visible.
  portrait: '/media/prathosh-portrait.jpg',
  portraitClass: 'prathosh-portrait',
  room: {
    kind: 'Course Q&A · Demo',
    title: 'Mathematical Foundations of ML',
    scenario: 'Prathosh’s AI twin answers your doubts on his NPTEL course, Mathematical Foundations of Machine Learning (IISc Bengaluru), and points you to the lecture where each topic is covered. It is a pedagogical aid, not a replacement for Prathosh.',
  },
}

export const ANTONI = {
  id: 'antoni',
  name: 'Antoni Lacinai',
  firstName: 'Antoni',
  initials: 'AL',
  face: '/media/antoni-face.png',
  room: {
    kind: 'Pitch practice · Demo',
    title: 'Practise your pitch',
    scenario: 'Antoni’s AI twin will get to know you, listen to your pitch and give you feedback the way he does. It is a demo and not a replacement for Antoni.',
  },
}

export const JOHNNY_DANIELE = {
  id: 'johnny-daniele',
  name: 'Johnny',
  firstName: 'Johnny',
  initials: 'J',
  face: '/media/johnny-daniele-face.png',
  room: {
    kind: 'English for IT professionals · Demo',
    title: 'Practise speaking English at work',
    scenario: 'Johnny, Daniele Ponzo’s practice assistant for IT and tech professionals who work in English, will set up the situation, play the people in the room and give you feedback at the end. He is an AI assistant, not Daniele.',
  },
}

export const TONY_LATIMER = {
  id: 'tony-latimer',
  name: 'Tony Latimer',
  firstName: 'Tony',
  initials: 'TL',
  face: '/media/tony-latimer-headshot.jpg',
  room: {
    kind: 'Ask me anything · Demo',
    title: 'Ask about your transition',
    scenario: 'Tony’s AI twin will answer your questions about stepping into a CEO or senior leadership role, building a leadership team and coaching. It is a demo and not a replacement for Tony.',
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

/* Sources for Jameel and Prathosh, from fl-dev-ops/trainertwin-lore (users/<id>/data). */
JAMEEL.sourceSummary = '184 videos · 235 Shorts · 825 LinkedIn posts'
JAMEEL.sources = [
  ['YouTube', '184 videos · 235 Shorts', [
    ['TOP 5 FREE Supply Chain Courses for Beginners', '87K views'],
    ['Top 5 FREE Logistics Courses You MUST Take!', '51K views'],
    ['TOP 5 Supply Chain CERTIFICATIONS', '45K views'],
    ['Top 5 Supply Chain Interview Questions (and How to Get Hired!)', '33K views'],
  ]],
  ['LinkedIn', '825 posts · 2015 to 2026', [
    ['Celebrating 15 incredible years at Mars Inc.', 'Aug 2025'],
    ['25,000 subscribers — thank you!', 'Sept 2026'],
  ]],
]

PRATHOSH.sourceSummary = '89 videos'
PRATHOSH.sources = [
  ['YouTube', '89 videos', [
    ['Pedagogy with AI', '295K views'],
    ['Survival with AI', '95K views'],
    ['Lec 1 - Deep Generative Models: Intro to Probability Theory', '12K views'],
    ['Lec 12 - Deep Generative Models: Diffusion Models part 2', '10K views'],
  ]],
  // ['LinkedIn', '272 posts · 2016 to 2026', [
  //   ['A 15-year-old dream has come true: open-sourcing Sanskrit shloka chanting', 'June 2026'],
  //   ['Announcing “Mathematical Foundations of Generative AI”', 'May 2025'],
  //   ['I just completed teaching another NPTEL course', 'Oct 2026'],
  // ]],
]

/* Sources for Antoni, from fl-dev-ops/trainertwin-lore (users/antoni-lacinai/data). */
ANTONI.sourceSummary = '97 videos · 110 Shorts · 1,314 LinkedIn posts · 343 Instagram posts'
ANTONI.sources = [
  ['YouTube', '97 videos · 110 Shorts', [
    ['3 Ways to Manipulate You', '2.2K views'],
    ['PowerPoint for dummies', '1.1K views'],
    ['How to Handle People Who Talk Too Much – Communication Hack', '1.1K views'],
    ['The Difference Between an Optimist and a Pessimist', '1.1K views'],
  ]],
  ['LinkedIn', '1,314 posts · 2020 to 2026', [
    ['The management team is dead! Ledningsgruppen är död!', 'Oct 2023'],
    ['Vill du ha 21 tips på att få människor att minnas vad du säger?', 'Feb 2020'],
  ]],
  ['Instagram', '343 posts', [['@antonilacinai', 'Reels and carousels']]],
]

/* Sources for Tony, from fl-dev-ops/trainertwin-lore (users/tony-latimer/data). */
TONY_LATIMER.sourceSummary = '10 videos · 4 Shorts · 500 LinkedIn posts · 49 Instagram posts'
TONY_LATIMER.sources = [
  ['YouTube', '10 videos · 4 Shorts', [
    ['The power of energy in coaching. Coaching Gary to a life changing breakthrough.', 'Coaching demo'],
    ['ICF Coaching Competency 6: The Dilemma for MCC Master Coach', 'Masterclass'],
    ['Competency 7. Evokes Awareness; How do you do it?', 'Masterclass'],
    ['ICF Armenia - Coaching at the Speed of Thought', 'Talk'],
  ]],
  ['LinkedIn', '500 posts · 2023 to 2026', [
    ['Honoured to deliver the opening keynote at the India Coaching Conclave', 'June 2026'],
    ['“ICF has ruined coaching!” Really?', 'Oct 2025'],
  ]],
  ['Instagram', '49 posts', [['@tonylatimermcc', 'Posts and reels']]],
]
