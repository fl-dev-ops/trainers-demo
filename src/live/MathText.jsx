import katex from 'katex'
import 'katex/dist/katex.min.css'

/* Renders a twin's chat line. Formulas arrive as [[ latex || words ]]: the chat shows the typeset formula and the
   voice reads the words (the agent strips the LaTeX before speaking). While a formula is still streaming in, its
   unfinished part is hidden. Anything that fails to typeset falls back to the words. */
const FORMULA = /\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g

export default function MathText({ text = '' }) {
  if (!text.includes('[[')) return text
  const parts = []
  let last = 0
  let m
  FORMULA.lastIndex = 0
  while ((m = FORMULA.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    const tex = m[1].trim()
    const words = m[2].trim()
    let html = null
    try {
      html = katex.renderToString(tex, { throwOnError: true, displayMode: false })
    } catch {
      html = null
    }
    parts.push(
      html ? (
        <span key={m.index} className="chat-math" title={words} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <span key={m.index}>{words}</span>
      ),
    )
    last = m.index + m[0].length
  }
  let rest = text.slice(last)
  const open = rest.indexOf('[[')
  if (open >= 0) rest = rest.slice(0, open) + ' …' // a formula still streaming in
  if (rest) parts.push(rest)
  return parts
}
