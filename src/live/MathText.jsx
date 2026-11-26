import katex from 'katex'
import 'katex/dist/katex.min.css'

/* Renders a twin's chat line with typeset formulas.
   The agent pulls each formula out of the reply before the voice (the voice says it in words) and sends
   { latex, words } on the 'twin-formula' data topic. placeFormulas finds those words in the transcript and
   MathText shows the typeset formula in their place; hovering shows the words. Formulas whose words are not
   found (yet) are shown under the twin's latest line. */

function typeset(latex, display = false) {
  try {
    return katex.renderToString(latex, { throwOnError: true, displayMode: display })
  } catch {
    return null
  }
}

// The spoken words of a formula, matched as whole words, any spacing, any case.
const pattern = (words) =>
  new RegExp(
    '(?<![\\w])' + words.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '(?![\\w])',
    'gi',
  )

/* lines: [{ id, twin, text }], formulas: [{ id, latex, words }] in arrival order.
   Longer formulas are placed first, so a short one ("mu i") can't take a spot inside a longer one's words; each
   formula takes its first free occurrence. Returns { byLine: { [lineId]: [{ start, end, formula }] }, leftover }. */
export function placeFormulas(lines, formulas) {
  const byLine = {}
  const used = new Set()
  const order = [...formulas].sort((a, b) => b.words.length - a.words.length)
  const twinLines = lines.filter((l) => l.twin && l.text)
  for (const f of order) {
    const re = pattern(f.words)
    for (const line of twinLines) {
      const hits = byLine[line.id] || []
      let m
      re.lastIndex = 0
      while ((m = re.exec(line.text))) {
        const start = m.index
        const end = start + m[0].length
        if (!hits.some((h) => start < h.end && end > h.start)) {
          byLine[line.id] = [...hits, { start, end, formula: f }].sort((a, b) => a.start - b.start)
          used.add(f.id)
          break
        }
      }
      if (used.has(f.id)) break
    }
  }
  return { byLine, leftover: formulas.filter((f) => !used.has(f.id)) }
}

export default function MathText({ text = '', hits = [] }) {
  if (!hits.length) return text
  const parts = []
  let last = 0
  for (const { start, end, formula } of hits) {
    if (start > last) parts.push(text.slice(last, start))
    const html = typeset(formula.latex)
    parts.push(
      html ? (
        <span key={formula.id} className="chat-math" title={formula.words} dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        text.slice(start, end)
      ),
    )
    last = end
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

export function FormulaBlock({ formula }) {
  const html = typeset(formula.latex, true)
  if (!html) return null
  return <div className="chat-math-block" title={formula.words} dangerouslySetInnerHTML={{ __html: html }} />
}
