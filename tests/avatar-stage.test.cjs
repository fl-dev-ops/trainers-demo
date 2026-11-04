const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const { test } = require('node:test')
const { runInNewContext } = require('node:vm')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const ts = require('typescript')

// Exercise the actual component without requiring a LiveKit server or camera.
test('avatar placeholder waits for a frame and returns on failure or a replacement track', () => {
  let agent = { state: 'connecting' }
  let readySid = null
  let videoProps
  const exports = {}
  const source = ts.transpileModule(readFileSync('src/live/AvatarStage.jsx', 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS },
    fileName: 'AvatarStage.jsx',
  }).outputText
  runInNewContext(source, {
    exports,
    require(name) {
      if (name === 'react') return { useState: () => [readySid, (sid) => { readySid = sid }] }
      if (name === '@livekit/components-react') return {
        useAgent: () => agent,
        VideoTrack: (props) => {
          videoProps = props
          return React.createElement('video', { style: props.style })
        },
      }
      return require(name)
    },
  })
  const render = () => renderToStaticMarkup(React.createElement(exports.default))
  assert.match(render(), /Starting avatar/)
  assert.doesNotMatch(render(), /<img/)
  agent = { state: 'listening', cameraTrack: { publication: { trackSid: 'first' } } }
  assert.match(render(), /Starting avatar/)
  assert.equal(videoProps.style.opacity, 0)
  videoProps.onLoadedData()
  assert.doesNotMatch(render(), /Starting avatar/)
  assert.equal(videoProps.style.opacity, 1)
  videoProps.onError()
  assert.match(render(), /Starting avatar/)
  videoProps.onLoadedData()
  render()
  videoProps.onEmptied()
  assert.match(render(), /Starting avatar/)
  videoProps.onLoadedData()
  agent.cameraTrack.publication.trackSid = 'replacement'
  assert.match(render(), /Starting avatar/)
  agent = { state: 'failed' }
  assert.match(render(), /Avatar unavailable/)
  assert.doesNotMatch(render(), /avatar-spinner|<img/)
})
