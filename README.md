# Trainer demos

A Next.js app for trainer twins, with each trainer under their own `/trainers/<slug>` route. Olga is the first trainer. No authentication.

Repository: [fl-dev-ops/trainers-demo](https://github.com/fl-dev-ops/trainers-demo).

Production: [Trainer directory](https://trainers-demo.vercel.app). Olga's demo is at [/trainers/olga](https://trainers-demo.vercel.app/trainers/olga).

Planned permanent hostname: `trainers.trainertwin.com` (domain configuration pending).

| Route   | Page                                                                |
| ------- | ------------------------------------------------------------------- |
| `/` | Trainer directory, currently listing Olga |
| `/trainers/olga` | Overview: what the twin is, the two paths, and the sources drawer |
| `/trainers/olga/meet` | Preview video of Olga's twin (`public/media/olga-intro.mp4`) |
| `/trainers/olga/live` | Real-time role play against the LiveKit agent; `?s=<id>` picks a scenario |
| `/trainers/olga/removed` | Shown after confirming "Remove my twin" on the overview (UI only, nothing is deleted yet) |
| `POST /api/connection-details` | Mints the LiveKit join token, creates the room and dispatches the agent |

`/` displays the trainer directory. The previous `/meet`, `/live`, and `/removed` URLs redirect to their Olga routes, preserving query parameters.

## Adding trainers

Add each trainer's pages under `src/app/trainers/<slug>/`, for example `/trainers/vasanth`. Olga's pages and metadata live in `src/app/trainers/olga/`. Once a trainer's demo is ready, add their card and link to the directory in `src/app/page.tsx`.

Trainer data in `src/data.js` and the LiveKit API currently support Olga only. Adding another trainer also requires their content, media, and agent configuration; adding a route alone does not switch the agent.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in the LiveKit credentials
npm run dev
```

The LiveKit agent worker must also be running for `/trainers/olga/live` to connect. Credentials are read from
`.env.local` on the server only — the browser never sees the API secret.

## Deploy to Vercel

Import `fl-dev-ops/trainers-demo` as a new `trainers-demo` project under **Forever Learning's projects** (`forever-learnings-projects`). Next.js is detected automatically. Use `main` as the production branch and the repository root as the root directory.

Add these server-side environment variables from your local configuration:

- `LIVEKIT_URL`
- `LIVEKIT_API_KEY`
- `LIVEKIT_API_SECRET`
- `LIVEKIT_AGENT_NAME`

Keep credentials out of Git. The LiveKit agent worker must run separately; deploying this app does not deploy the worker.

Deployed as `trainers-demo` under **Forever Learning's projects** at [trainers-demo.vercel.app](https://trainers-demo.vercel.app), connected to `fl-dev-ops/trainers-demo` with production branch `main`. The four LiveKit variables are configured securely. The production pages, legacy redirects, and LiveKit room/token API were verified. The separate worker's audio/video session was not verified.

## Custom trainer domain

Trainer demos will use `trainers.trainertwin.com`, with the directory at `/` and each trainer at `/trainers/<slug>`. The marketing website requires no changes.

Status: the directory is deployed at [trainers-demo.vercel.app](https://trainers-demo.vercel.app). Its homepage and Olga's overview, meet, live, and removed pages were checked over HTTPS and returned HTTP 200. The header and favicon use the docs project's logo. The custom domain is not attached yet; HTTPS on that hostname remains unverified.

To finish domain setup:

1. Open the `trainers-demo` project's [Vercel domain settings](https://vercel.com/forever-learnings-projects/trainers-demo/settings/domains).
2. Add `trainers.trainertwin.com` to the production environment.
3. If Vercel requests DNS configuration, create the `trainers` CNAME at the current DNS provider using the exact target Vercel displays.
4. Wait for Vercel to confirm the domain and HTTPS certificate, then check the directory and Olga's routes on the new hostname.
5. Update the production links and this status after successful verification.

The connected Vercel tools do not expose domain or DNS mutations, and the local shell could not start, so that configuration could not be completed from this session.

## How `/trainers/olga/live` is wired

- `src/app/trainers/olga/live/page.tsx` — obtains connection details via `POST /api/connection-details`, then mounts the
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
- Scenario copy lives in `SCENARIOS` in `src/data.js`; `/trainers/olga/live?s=<id>` picks one (defaults to the
  first).
