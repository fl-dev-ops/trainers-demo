import { NextResponse } from 'next/server'
import { askAishwarya, type Turn } from '@/lib/aishwarya-reganti/twin'

export const revalidate = 0

/* Answers for the Slack view on the demo page. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const turns: Turn[] = Array.isArray(body?.turns)
    ? body.turns.filter((t: Turn) => (t?.role === 'user' || t?.role === 'assistant') && typeof t.content === 'string')
    : []
  if (!turns.length || turns[turns.length - 1].role !== 'user') {
    return NextResponse.json({ error: 'Send at least one question.' }, { status: 400 })
  }
  try {
    const reply = await askAishwarya(turns)
    return NextResponse.json({ reply }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[aishwarya-reganti] ask failed', error)
    return NextResponse.json({ error: 'The twin could not answer just now. Try again.' }, { status: 502 })
  }
}
