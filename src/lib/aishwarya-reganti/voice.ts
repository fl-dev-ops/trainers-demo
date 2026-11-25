/* Voice in and voice out for Aishwarya's Slack twin.
   Speech to text: Deepgram (DEEPGRAM_API_KEY), the same provider the live twins use.
   Text to speech: the VoxCPM2 service the live twins use (TTS_SERVICE_URL, TTS_SERVICE_KEY), with her cloned voice. */

// Her cloned VoxCPM2 voice (registered 23 Nov 2026 from her "evals" video; same voice as her live twin).
export const AISHWARYA_VOICE_ID = process.env.AISHWARYA_VOICE_ID || 'cmwsqqrxn00007fitf0fpdznc'

/* Added to her system prompt when the reply will be spoken. */
export const SPOKEN_REPLY = `# THIS REPLY WILL BE SPOKEN
The person sent a voice message, and your reply will be read aloud in Aishwarya's cloned voice and sent back as a voice message.
- Answer in plain spoken sentences, under 80 words.
- No bullets, no asterisks or other formatting, no links, no emoji.
- Say numbers and abbreviations the way you would say them out loud.
- Everything else above still applies.`

/* Turns spoken text into audio: strips Slack formatting so it is not read aloud. */
export function speakable(text: string): string {
  return text
    .replace(/<https?:[^|>]+\|([^>]+)>/g, '$1')
    .replace(/<https?:[^>]+>/g, '')
    .replace(/[*_`~]/g, '')
    .replace(/^\s*[-•]\s+/gm, '')
    .replace(/:[a-z0-9_+-]+:/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export async function transcribe(audio: ArrayBuffer, mimetype: string): Promise<string> {
  const key = process.env.DEEPGRAM_API_KEY
  if (!key) throw new Error('DEEPGRAM_API_KEY is not set')
  const res = await fetch('https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true&punctuate=true', {
    method: 'POST',
    headers: { Authorization: `Token ${key}`, 'Content-Type': mimetype || 'application/octet-stream' },
    body: audio,
  })
  if (!res.ok) throw new Error(`Deepgram ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const data = await res.json()
  return String(data?.results?.channels?.[0]?.alternatives?.[0]?.transcript || '').trim()
}

/* 16-bit mono PCM to a WAV file, so Slack can play it. */
function wav(pcm: Uint8Array, sampleRate: number): Uint8Array {
  const header = new DataView(new ArrayBuffer(44))
  const text = (offset: number, s: string) => [...s].forEach((c, i) => header.setUint8(offset + i, c.charCodeAt(0)))
  text(0, 'RIFF'); header.setUint32(4, 36 + pcm.length, true); text(8, 'WAVE')
  text(12, 'fmt '); header.setUint32(16, 16, true); header.setUint16(20, 1, true); header.setUint16(22, 1, true)
  header.setUint32(24, sampleRate, true); header.setUint32(28, sampleRate * 2, true); header.setUint16(32, 2, true); header.setUint16(34, 16, true)
  text(36, 'data'); header.setUint32(40, pcm.length, true)
  const out = new Uint8Array(44 + pcm.length)
  out.set(new Uint8Array(header.buffer), 0)
  out.set(pcm, 44)
  return out
}

export async function speak(text: string): Promise<Uint8Array> {
  const key = process.env.TTS_SERVICE_KEY
  if (!key) throw new Error('TTS_SERVICE_KEY is not set')
  const base = (process.env.TTS_SERVICE_URL || 'https://tts.trainertwin.com').replace(/\/$/, '')
  const res = await fetch(`${base}/v1/audio/speech`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'voxcpm2', voice: AISHWARYA_VOICE_ID, input: speakable(text), stream: true, response_format: 'pcm' }),
  })
  if (!res.ok) throw new Error(`VoxCPM2 ${res.status}: ${(await res.text()).slice(0, 300)}`)
  const sampleRate = Number(res.headers.get('X-Sample-Rate') || 48000)
  const pcm = new Uint8Array(await res.arrayBuffer())
  if (!pcm.length) throw new Error('VoxCPM2 returned no audio')
  return wav(pcm, sampleRate)
}
