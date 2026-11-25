import { AISHWARYA_PROMPT } from './prompt'

export type Turn = { role: 'user' | 'assistant'; content: string }

const MAX_TURNS = 10
const MAX_CHARS = 1500

/* One reply from Aishwarya's twin, through OpenRouter with the same model as the voice agents. */
export async function askAishwarya(turns: Turn[], askerName?: string, extraSystem?: string): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY
  if (!key) throw new Error('OPENROUTER_API_KEY is not set')

  const history = turns
    .filter((t) => t.content.trim())
    .slice(-MAX_TURNS)
    .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_CHARS) }))
  const base = askerName ? `${AISHWARYA_PROMPT}\n# WHO IS ASKING\nTheir name is ${askerName}.\n` : AISHWARYA_PROMPT
  const system = extraSystem ? `${base}\n${extraSystem}\n` : base

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || 'google/gemini-2.5-flash',
      temperature: 0.4,
      max_tokens: 600,
      messages: [{ role: 'system', content: system }, ...history],
    }),
  })
  if (!res.ok) throw new Error(`OpenRouter ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  const reply = data.choices?.[0]?.message?.content?.trim()
  if (!reply) throw new Error('OpenRouter returned no reply')
  return reply
}
