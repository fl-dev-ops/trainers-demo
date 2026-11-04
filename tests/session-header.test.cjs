const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const ts = require('typescript')

function load(file, mocks, globals = {}, extra = '') {
  const exports = {}
  const source = ts.transpileModule(readFileSync(file, 'utf8') + extra, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS }, fileName: file,
  }).outputText
  runInNewContext(source, { exports, require: (name) => mocks[name] ?? require(name), ...globals })
  return exports
}
const icons = new Proxy({}, { get: () => () => React.createElement('svg') })
const Link = ({ children, ...props }) => React.createElement('a', props, children)

test('live routes hide the site header and reclaim its height; normal pages retain it', () => {
  let pathname = '/olga/live'
  let fit
  let fold
  let deps
  const AppBar = load('src/components/AppBar.jsx', {
    react: { ...React, useRef: () => ({ current: pathname.endsWith('/live') ? null : { getBoundingClientRect: () => ({ height: 68 }) } }), useLayoutEffect: (fn, dependencies) => { fit = fn; deps = dependencies } },
    'next/link': { default: Link },
    'next/navigation': { usePathname: () => pathname },
    '../data.js': { TWIN: { demo: 'https://example.com/demo' } },
    './Icons.jsx': icons,
    './ThemeToggle.jsx': { default: () => React.createElement('button', null, 'Theme') },
  }, {
    window: { innerHeight: 900, addEventListener() {}, removeEventListener() {} },
    document: { documentElement: { style: { setProperty: (_, value) => { fold = value } } } },
  }).default
  const render = () => renderToStaticMarkup(React.createElement(AppBar, null, 'Session'))
  assert.doesNotMatch(render(), /<header|Watch demo/)
  assert.equal(deps[0], true)
  fit()
  assert.equal(fold, '900px')
  pathname = '/olga'
  assert.match(render(), /<header/)
  assert.match(render(), /Watch demo of Olga/)
  assert.equal(deps[0], false)
  fit()
  assert.equal(fold, '832px')
})

test('session header combines branding, title, status, timer and theme in one header', () => {
  const { SessionHeader } = load('src/live/LiveRoom.tsx', {
    'next/link': { default: Link },
    'next/navigation': {},
    '@livekit/components-react': {},
    'livekit-client': {},
    '@/components/Icons.jsx': icons,
    '@/components/ThemeToggle.jsx': { default: () => React.createElement('button', null, 'Theme') },
    '@/data.js': {}, '@/lib/connection': {}, '@/live/AvatarStage.jsx': {}, '@/live/TranscriptPanel.jsx': {},
  }, {}, '\nexport { SessionHeader }\n')
  const html = renderToStaticMarkup(React.createElement(SessionHeader, { home: '/olga', title: 'My client disappeared' }, React.createElement('span', null, 'Live 00:47')))
  assert.equal((html.match(/<header/g) ?? []).length, 1)
  for (const text of ['Back to trainer', 'TrainerTwin', 'My client disappeared', 'Live 00:47', 'Theme']) assert.ok(html.includes(text))
  assert.doesNotMatch(html, /Watch demo/)
})

test('theme stays hydration-safe and preserves saved dark preference until restored', () => {
  let theme = 'light'
  let saved = 'dark'
  let reads = 0
  let effects = []
  const document = { documentElement: { dataset: {} } }
  const ThemeToggle = load('src/components/ThemeToggle.jsx', {
    react: { useState: () => [theme, (value) => { theme = value }], useEffect: (fn) => effects.push(fn) },
    './Icons.jsx': icons,
  }, { document, localStorage: { getItem: () => { reads++; return saved }, setItem: (_, value) => { saved = value } } }).default
  assert.equal(ThemeToggle().props['aria-label'], 'Switch to dark mode')
  assert.equal(reads, 0)
  effects.forEach((fn) => fn())
  effects = []
  const button = ThemeToggle()
  effects.forEach((fn) => fn())
  assert.equal(button.props['aria-label'], 'Switch to light mode')
  assert.equal(saved, 'dark')
  assert.equal(document.documentElement.dataset.theme, 'dark')
  button.props.onClick()
  assert.equal(saved, 'light')
})
