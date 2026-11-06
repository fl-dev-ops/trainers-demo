# Coach twin demo page

Builds **"How &lt;Coach&gt;'s twin learns"**: one self-contained HTML file that walks a coach from their own
words to the principles their twin will follow. Open `examples/Darren - Coaching Twin.html` to see one.

## What's in this folder

| Path | What it is |
|---|---|
| `build.py` | The builder and its research helpers (`scout`, `window`, `count`, `shots`) |
| `template.html` | The page; `build.py` fills in the data and copy |
| `configs/<slug>.yaml` | The written copy for each coach; `_template.yaml` is blank, `darren-mitchell.yaml` is a full example |
| `.claude/skills/coach-twin-page/SKILL.md` | Claude Code skill (`/coach-twin-page`) that writes a config and builds the page |
| `examples/` | Darren's page (built by this tool) and Olga's original hand-made page it was based on |

The folder is self-contained, so it can be its own repo. The skill works when this folder is the repo root
(Claude Code reads `.claude/skills/` from there); in a bigger repo, move it to that repo's `.claude/skills/`.

The page has six chapters:

1. **Collect**: every source we have for the coach, in a Finder-style list.
2. **Read**: one real conversation, transcribed, with the speakers named.
3. **Follow**: what each line meant, focused on one cue from the other person and the coach's reply.
4. **Understand**: a 3D stack of six layers (lines → moves → situations → topics → purposes → principles), with the exchange traced all the way up.
5. **About you**: "Here's who we think you are", with options the coach can tap on and off.
6. **Do's & Don'ts**: the rules the twin follows, each with where it was seen.

## What's generated vs written

| Part | Where it comes from |
|---|---|
| Source list, line/word counts, layers 1–4, dot layout, links | `<users>/<slug>/data/` + `workspace/index.json` + `workspace/taxonomy.json` (automatic) |
| The exchange, captions, cards, phases, principles, About you, Do's & Don'ts | `configs/<slug>.yaml` (written per coach) |

A config takes about 30–60 minutes to write by hand, or a few minutes with Claude Code using the
`/coach-twin-page` skill, which does the research and writes it.

## Requirements

- Python 3.10+ and `pip install pyyaml`. Nothing else.
- The coaches' data, in the trainertwin-lore layout: `<users>/<slug>/data/` (sources) and
  `<users>/<slug>/workspace/index.json` + `taxonomy.json` (made by the trainertwin-lore indexing pipeline).
  `build.py` looks for `../users`, then `./users`; otherwise pass `--users /path/to/users` before the
  command, or set `COACH_USERS_DIR`.
- At least one transcript with two speakers (`speaker_1:` / `speaker_2:` lines). LinkedIn-only coaches
  can't be built yet.
- Google Chrome, only for the `shots` command.

## Commands

```bash
T=build.py   # add --users /path/to/users after it if the data isn't in ../users or ./users

python $T scout  <slug> --name <First>                   # corpus stats, LinkedIn profile, top topics/situations, scenarios
python $T scout  <slug> --name <First> --grep "busy|price" # candidate exchanges: other person says X, coach replies
python $T window <slug> <data/path.md> --turn 30 --n 14     # read turns of one transcript (to pick `start`, write frames)
python $T count  <slug> "servant lead"                      # how many sources mention a theme (for Do's & Don'ts)
python $T build  <slug> [--out DIR]                         # writes "<Full Name> - Coaching Twin.html"
python $T shots  "<Full Name> - Coaching Twin.html"         # screenshots of all 15 steps, to check before shipping
```

## New coach, step by step

1. `cp configs/_template.yaml configs/<slug>.yaml`
2. `scout` the coach. Pick an exchange where the other person raises something and the coach's reply shows
   how they coach. Prefer one that matches a validated scenario in `workspace/scenarios/`.
3. `window` around it, then fill `session` (file, start, coach_speaker, cue/move, one frame per turn).
4. Pick `thread.situation` and `thread.topic` from the `scout` lists (keys, not labels).
5. Write phases, beliefs, captions and cards. Card quotes must be the coach's words; `build` warns if
   they aren't in the transcript.
6. Fill About you from the LinkedIn profile `scout` prints, and Do's & Don'ts with counts from `count`.
7. `build`, then `shots` and look at every step.

## Hosting

The output is a single HTML file (~1 MB) with the data inlined. It only loads Google Fonts from outside,
so it can be uploaded as-is to any static host or demo page. Step links work with `#N`, e.g. `page.html#13`
opens "About you".

## Notes and limits

- Layers 1–2 show a random sample (up to 30,000 / 22,000 dots); the counts shown are the full totals.
- Which speaker is the coach is guessed per transcript (self-introductions, then who is addressed by name).
  The featured conversation always uses `session.coach_speaker`, so only the "coach lines" total is approximate.
- Dot positions are by topic, from the index tags, not by embeddings.
- Phases and beliefs are written, not mined. The page calls them "derived"; keep them grounded in the coach's
  material.
