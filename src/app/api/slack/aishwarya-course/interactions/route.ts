import { NextResponse } from 'next/server'
import { verifiedDemo } from '@/lib/aishwarya-reganti/slack-demo'

/* Slack sends a notice here when someone clicks a link button (for example "Start the call"). The link
   already opens in their browser, so all this does is acknowledge it. */
export async function POST(req: Request) {
  const raw = await req.text()
  if (!verifiedDemo(req, raw)) return new NextResponse('Invalid signature', { status: 401 })
  return new NextResponse(null, { status: 200 })
}
