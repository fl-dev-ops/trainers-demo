# Trainer demos

A Next.js app for trainer twins, with each trainer under their own `/<slug>` route. Olga is the first trainer. No authentication.

Repository: [fl-dev-ops/trainers-demo](https://github.com/fl-dev-ops/trainers-demo).

Production: [Trainer directory](https://trainers.trainertwin.com). Olga's demo is at [/olga](https://trainers.trainertwin.com/olga).

Permanent hostname: `trainers.trainertwin.com` (verified and live).

| Route   | Page                                                                |
| ------- | ------------------------------------------------------------------- |
| `/` | Trainer directory, currently listing Olga |
| `/olga` | Overview: what the twin is, the two paths, and the sources drawer |
| `/olga/meet` | Preview video of Olga's twin (`public/media/olga-intro.mp4`) |
| `/olga/live` | Real-time role play against the LiveKit agent; `?s=<id>` picks a scenario |
| `/olga/removed` | Shown after confirming "Remove my twin" on the overview (UI only, nothing is deleted yet) |
| `POST /api/connection-details` | Mints the LiveKit join token, creates the room and dispatches the agent |

`/` displays the trainer directory. Trainer pages use folder-based routing without legacy redirects.

## Adding trainers

Add each trainer's pages under `src/app/<slug>/`, for example `/vasanth`. Olga's pages and metadata live in `src/app/olga/`. Once a trainer's demo is ready, add their card and link to the directory in `src/app/page.tsx`.

Trainer data in `src/data.js` and the LiveKit API currently support Olga only. Adding another trainer also requires their content, media, and agent configuration; adding a route alone does not switch the agent.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the LiveKit credentials
npm run dev
```

The LiveKit agent worker must also be running for `/olga/live` to connect. Credentials are read from
`.env.local` on the server only — the browser never sees the API secret.

## Deploy to Vercel

Import `fl-dev-ops/trainers-demo` as a new `trainers-demo` project under **Forever Learning's projects** (`forever-learnings-projects`). Next.js is detected automatically. Use `main` as the production branch and the repository root as the root directory.

Add these server-side environment variables from your local configuration:

- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_AGENT_NAME`

Keep credentials out of Git. The LiveKit agent worker must run separately; deploying this app does not deploy the worker.

Deployed as `trainers-demo` under **Forever Learning's projects** at [trainers.trainertwin.com](https://trainers.trainertwin.com), connected to `fl-dev-ops/trainers-demo` with production branch `main`. The four LiveKit variables are configured securely. The production pages, legacy redirects, and LiveKit room/token API were verified. The separate worker's audio/video session was not verified.

## Custom trainer domain

Trainer demos use [trainers.trainertwin.com](https://trainers.trainertwin.com), with the directory at `/` and each trainer at `/<slug>`. The marketing website is unchanged.

Status: complete. Vercel reports `trainers.trainertwin.com` attached to and verified for the `trainers-demo` project, with DNS configured correctly. The directory, Olga's overview, meet, live (including `?s=prices`), and removed pages, and the favicon returned HTTP 200 over HTTPS with valid certificate verification. The directory includes a working link to Olga's demo. The header and favicon use the docs project's logo. The live page's audio/video session was not verified in this domain check.

DNS is managed through Cloudflare. For future domain changes, use the `trainers-demo` project's [Vercel domain settings](https://vercel.com/forever-learnings-projects/trainers-demo/settings/domains) and the exact DNS values Vercel provides.

## How `/olga/live` is wired

- `src/app/olga/live/page.tsx` — obtains connection details via `POST /api/connection-details`, then mounts the
  room with `useSession` + `SessionProvider`. The status pill, the mm:ss clock, the camera/mic
  toggles and the hang-up button are all driven by the room.
- `src/app/api/connection-details/route.ts` — creates the room, dispatches the agent and mints a
  participant token using the `olga` profile metadata.
- `src/lib/livekit.ts` — server-only LiveKit helpers (credentials, room + dispatch clients, token).
- `src/lib/connection.ts` — the client-side connection details shape and its sessionStorage key.
- `src/live/AvatarStage.jsx` — renders the agent's avatar video (`agent.cameraTrack`) into
  `.rtile-slot` (`#twin-avatar`).
- `src/live/TranscriptPanel.jsx` — renders the room's messages as `lines` (`{ id, who, text }`) and
  sends the typed message back to the room.
- Scenario copy lives in `SCENARIOS` in `src/data.js`; `/olga/live?s=<id>` picks one (defaults to the
  first).
