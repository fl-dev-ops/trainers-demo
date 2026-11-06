---
name: coach-twin-page
description: Build the "How <Coach>'s twin learns" demo page (one HTML file) for a coach in users/<slug>. Use when asked to make, rebuild or update a coaching-twin demo page, twin explainer, or "Coaching Twin.html" for a coach.
---

# Coach twin demo page

You write `configs/<slug>.yaml` from the coach's real material, then build and check
the page. The builder does all the data work; your job is the judgement: which exchange to follow, what it
shows about how the coach coaches, and copy that a coach understands at a glance.

Read first: `README.md`, `configs/_template.yaml`, and the finished example
`configs/darren-mitchell.yaml` (match its length and tone).

`T=build.py` below. Run from this folder. If the coaches' data isn't in `../users` or `./users`,
add `--users /path/to/users` before the command (or set `COACH_USERS_DIR`).

## 1. Check the coach is ready

- `<users>/<slug>/workspace/index.json` and `taxonomy.json` exist. If not, stop: the coach needs indexing first.
- Pronouns: ask the user unless they already gave them. Never infer from the name.
- Run `python $T scout <slug> --name <First>`. If it reports 0 transcripts with 2+ speakers, stop and tell
  the user; the page needs one real two-person conversation.

## 2. Pick the exchange (the most important choice)

You want two consecutive turns: the other person raises a real problem or belief (the **cue**), and the
coach's reply (the **move**) shows how they coach: a question, a reframe, a standard they hold.

- Start from the coach's validated scenarios (`workspace/scenarios/*.md`, listed by `scout`): grep for
  exchanges about the same situation, e.g. `scout <slug> --name X --grep "too busy|no time|cancel"`.
- Prefer a coaching call or role-play over an interview intro; prefer a move of 15–60 words that stands
  on its own; avoid moves that are just "yeah" or a new question unrelated to the cue.
- Read around it with `window <slug> <file> --turn <N-3> --n 14`. Confirm which `speaker_N` is the coach.
- Window: 8–12 turns that include the cue and move near the middle. `start` = the first words of the first turn.

## 3. Write the config

Follow `_template.yaml`. Rules:

- **Real words only.** `cards.layer1.cue/move` and any quote in captions are the transcript's words, with
  only punctuation and apostrophes restored (`dont` → `don't`), and `&hellip;` for cuts. `build` warns
  when a quote isn't in the transcript; fix every warning.
- **Frames**: one per turn in the window, `[kind, plain-English description of what the line was doing]`.
  Describe, don't quote. Kinds: question, statement, reframe, story, acknowledgment, request.
- **thread.situation / thread.topic**: keys from `scout`'s lists (or grep taxonomy.json) that genuinely match
  the cue and the pattern. `build` lists close matches if a key is wrong.
- **Phases (4–6)**: the stages of how this coach moves a learner; keywords sort the 44 top topics into them.
  **Beliefs (4–6)**: principles grounded in things the coach says repeatedly; prefer their own phrasing.
  The thread's phase and belief must be the ones this exchange actually shows.
- **Captions**: 1–3 short sentences each, plain words, written for the coach. No jargon such as
  "frames", "tactics" or "taxonomy".
- **About you**: from the LinkedIn profile `scout` prints (headline, location, About), plus the top topics.
  Every row's evidence note must say where it came from. "Your style" is a first read; say so.
- **Do's & Don'ts**: 5–6 Do's, 4–5 Don'ts, each a short imperative after "Do"/"Don't". Every meta note
  cites a real number from `count <slug> REGEX` ("Frequent pattern · servant leadership in 47 sources")
  or the validated scenario it came from. A keyword count says a theme is *discussed*; word the note that way.
- Keep list entries in "double quotes"; unquoted commas, colons and question marks break YAML.

## 4. Build and check

```bash
python $T build <slug>
python $T shots "<Full Name> - Coaching Twin.html" --out /tmp/<slug>-shots
```

Look at every screenshot (step-00 … step-14). Check: no text overflow in the transcript window or cards,
the cue and move highlighted on steps 5–6, the right card on each layer step, About you and Do's & Don'ts
fit without scrolling (trim wording if not). Counters may show mid-animation in screenshots; that's fine.

## 5. Report

Tell the user the output path, the exchange you followed (file, turns, the two quotes), and which parts
are written by you (phases, beliefs, style, Do's & Don'ts wording) versus taken from the data.
