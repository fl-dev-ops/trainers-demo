#!/usr/bin/env python3
"""Build a coach's "How <Name>'s twin learns" demo page: one self-contained HTML file.

The data layers come from users/<slug>/ (data/, workspace/index.json, workspace/taxonomy.json).
The written parts (the exchange we follow, captions, principles, About you, Do's & Don'ts)
come from configs/<slug>.yaml. See README.md and configs/darren-mitchell.yaml.

  python build.py [--users DIR] scout  <slug> [--grep REGEX]   # what's in the corpus, candidate exchanges
  python build.py [--users DIR] window <slug> <data-path> [--turn N] [--n 14]   # read turns of one transcript
  python build.py [--users DIR] count  <slug> REGEX            # sources per kind mentioning REGEX
  python build.py [--users DIR] build  <slug> [--out DIR]      # write "<Full Name> - Coaching Twin.html"
  python build.py shots <html> [--out DIR]                     # screenshot every step (needs Chrome)
"""
import argparse
import glob
import json
import math
import os
import random
import re
import subprocess
import sys
from collections import Counter, defaultdict

import yaml

HERE = os.path.dirname(os.path.abspath(__file__))
# Where coaches live: users/<slug>/data, users/<slug>/workspace. Set with --users or COACH_USERS_DIR;
# defaults to a users/ folder next to this one (the trainertwin-lore layout), then ./users.
USERS = os.environ.get('COACH_USERS_DIR') or next(
    (p for p in (os.path.join(os.path.dirname(HERE), 'users'), os.path.join(os.getcwd(), 'users')) if os.path.isdir(p)),
    os.path.join(os.getcwd(), 'users'))

# top-level data folder -> page kind (see KIND in template.html)
KIND_OF_DIR = {'youtube': 'youtube', 'youtube-guests': 'youtube', 'linkedin': 'linkedin', 'website': 'web',
               'medium': 'medium', 'docs': 'doc', 'drive': 'doc', 'loom': 'recording', 'recordings': 'recording',
               'instagram': 'instagram', 'twitter': 'twitter', 'x': 'twitter'}
MAX_L1, MAX_L2, N_TOPICS = 30000, 22000, 44
META_TOPICS = {'guest-introduction', 'podcast-outro', 'career-background', 'podcast-introduction',
               'podcast-promotion', 'podcast-wrap-up', 'call-to-action'}
SPEAKER = re.compile(r'(speaker_\d+):\s*(.*)')


def die(msg):
    sys.exit(f'error: {msg}')


def kind_of(path):
    return KIND_OF_DIR.get(path.split('/')[0], 'doc')


def split_fm(txt):
    """Return (frontmatter text, number of lines it takes)."""
    if not txt.startswith('---'):
        return '', 0
    end = txt.find('\n---', 3)
    if end < 0:
        return '', 0
    return txt[:end], txt[:end + 4].count('\n') + 1


def fm_field(fm, key):
    m = re.search(rf"^{key}:\s*['\"]?(.*?)['\"]?\s*$", fm, re.M)
    return m.group(1) if m else None


# ---------------------------------------------------------------- corpus
class Corpus:
    def __init__(self, slug, first_name=None, session_file=None, session_speaker=None):
        self.slug, self.root = slug, os.path.join(USERS, slug)
        self.data = os.path.join(self.root, 'data')
        ws = os.path.join(self.root, 'workspace')
        for f in ('index.json', 'taxonomy.json'):
            if not os.path.exists(os.path.join(ws, f)):
                die(f'users/{slug}/workspace/{f} is missing. Run the indexing pipeline for this coach first (see README.md).')
        self.ix = json.load(open(os.path.join(ws, 'index.json'), encoding='utf-8'))
        self.tax = json.load(open(os.path.join(ws, 'taxonomy.json'), encoding='utf-8'))
        self.scenarios = sorted(glob.glob(os.path.join(ws, 'scenarios', '*.md')))
        self.items_by_src = defaultdict(list)
        for it in self.ix['items']:
            self.items_by_src[it['source_id']].append(it)
        self.files, self.lines, self.words = [], [], 0
        self.transcripts = {}                       # path -> list of turn dicts
        for sid, s in self.ix['sources'].items():
            self._read(sid, s['path'], first_name, session_file, session_speaker)
        self.files.sort(key=lambda f: (f['d'], f['n']))

    def _read(self, sid, path, first_name, session_file, session_speaker):
        fp = os.path.join(self.data, path)
        if not os.path.exists(fp):
            return
        txt = open(fp, encoding='utf-8', errors='replace').read()
        fm, pre = split_fm(txt)
        title = fm_field(fm, 'title')
        if not title:
            its = self.items_by_src.get(sid)
            title = its[0]['title'] if its else os.path.splitext(os.path.basename(path))[0]
        title = re.sub(r'\\u([0-9a-fA-F]{4})', lambda m: chr(int(m.group(1), 16)), title)
        dm = re.search(r'(\d{4}-\d{2}-\d{2})', path) or re.search(r"^date:\s*['\"]?(\d{4}-\d{2}-\d{2})", fm, re.M)
        k = kind_of(path)
        self.files.append({'n': title, 'd': dm.group(1) if dm else '', 's': os.path.getsize(fp), 'k': k, 'p': path})
        body = txt.split('\n')[pre:]
        turns = []
        for j, raw in enumerate(body):
            raw = raw.strip()
            m = SPEAKER.match(raw)
            if m:
                turns.append({'src': sid, 'ln': pre + j + 1, 'spk': m.group(1), 'text': m.group(2)})
        if turns:
            coach = session_speaker if (path == session_file and session_speaker) else guess_coach(turns, first_name)
            for t in turns:
                t['coach'] = t['spk'] == coach
            self.transcripts[path] = turns
            src_lines = turns
        else:                                       # written material: one line per paragraph
            src_lines = [{'src': sid, 'ln': pre + j + 1, 'spk': 'coach', 'coach': True, 'text': r.strip()}
                         for j, r in enumerate(body)
                         if len(r.split()) >= 3 and not r.strip().startswith(('http', '#', '---'))]
        for t in src_lines:
            t['w'] = len(t['text'].split())
            self.words += t['w']
        self.lines.extend(src_lines)

    def kinds(self):
        return Counter(f['k'] for f in self.files)


def guess_coach(turns, first_name):
    """Which speaker is the coach: others address the coach by first name; the coach rarely says it."""
    spk = Counter(t['spk'] for t in turns)
    if len(spk) == 1 or not first_name:
        return turns[0]['spk'] if len(spk) == 1 else spk.most_common(1)[0][0]
    pat = re.compile(rf'\b{re.escape(first_name)}\b', re.I)
    said = Counter()
    words = Counter()
    for t in turns:
        said[t['spk']] += len(pat.findall(t['text']))
        words[t['spk']] += len(t['text'].split())
    # self-introductions ("this is Darren", "Darren Mitchell here", "the ... podcast with Darren") name the coach
    n = re.escape(first_name)
    intro = re.compile(rf"\b(this is|i am|i'm|im|my name is|podcast with)\s+{n}\b|\b{n}(\s+\w+)?\s+here\b", re.I)
    for t in turns[:8]:
        if intro.search(t['text']):
            return t['spk']
    # otherwise: the speaker the others address by name
    return min(spk, key=lambda s: (said[s] / max(1, words[s]), -words[s]))


# ---------------------------------------------------------------- layout (pure python)
def topic_layout(n, co, iters=600, seed=7):
    """2-D positions for n topics: co-occurring topics sit together, all spread to roughly +-760."""
    rnd = random.Random(seed)
    diag = [math.sqrt(co[i][i]) + 1e-9 for i in range(n)]
    want = [[1 - co[a][b] / diag[a] / diag[b] if a != b else 0 for b in range(n)] for a in range(n)]
    P = [[math.cos(2.4 * i) * (0.2 + i / n), math.sin(2.4 * i) * (0.2 + i / n)] for i in range(n)]
    for it in range(iters):
        lr = 0.05 * (1 - it / iters) + 0.005
        for a in range(n):
            gx = gy = 0.0
            for b in range(n):
                if a == b:
                    continue
                dx, dy = P[a][0] - P[b][0], P[a][1] - P[b][1]
                d = math.hypot(dx, dy) + 1e-6
                f = (d - want[a][b]) / d                 # stress toward wanted distance
                f -= 0.004 / (d * d)                     # and keep apart
                gx += f * dx; gy += f * dy
            P[a][0] -= lr * gx / n; P[a][1] -= lr * gy / n
    mx = max(max(abs(p[0]) for p in P), 1e-9); my = max(max(abs(p[1]) for p in P), 1e-9)
    return [[p[0] / mx * 760 + rnd.gauss(0, 8), p[1] / my * 760 + rnd.gauss(0, 8)] for p in P]


def jit(rnd, c, s):
    return [max(-985, min(985, c[0] + rnd.gauss(0, s))), max(-985, min(985, c[1] + rnd.gauss(0, s)))]


def tok(s):
    return set(re.findall(r'[a-z]+', s.lower())) - {'and', 'in', 'of', 'the', 'for', 'to', 'a', 'sales', 'with', 'on'}


# ---------------------------------------------------------------- the STORY payload
def build_story(cfg, C):
    rnd = random.Random(7)
    tax, ix = C.tax, C.ix
    sess_cfg, thr = cfg['session'], cfg['thread']

    def lookup(facet):
        m = {}
        for key, v in tax.get(facet, {}).items():
            for a in [v['preferred'], *v.get('aliases', []), key]:
                m[a.lower()] = key
        return m
    TOPIC, SITU = lookup('topic'), lookup('situation')

    for facet, key in (('situation', thr['situation']), ('topic', thr['topic'])):
        if key not in tax.get(facet, {}):
            close = [k for k in tax.get(facet, {}) if tok(key) & tok(k)][:12]
            die(f"thread.{facet} '{key}' is not in taxonomy.json. Close matches: {close}")

    ranked = [k for k, v in sorted(tax['topic'].items(), key=lambda kv: -kv[1]['count']) if k not in META_TOPICS]
    L4 = ranked[:N_TOPICS]
    if thr['topic'] not in L4:
        L4[-1] = thr['topic']
    L4i = {t: i for i, t in enumerate(L4)}
    L4tok = [tok(tax['topic'][t]['preferred']) for t in L4]
    n4 = len(L4)

    def to_l4(label):
        key = TOPIC.get(label.lower())
        if key in L4i:
            return L4i[key]
        tt = tok(label)
        best = max(range(n4), key=lambda i: len(tt & L4tok[i]) / (len(tt | L4tok[i]) or 1))
        return best if tt & L4tok[best] else None

    item_l4, src_l4 = {}, defaultdict(Counter)
    for it in ix['items']:
        ts = [x for x in (to_l4(t['label']) for t in it['tags'] if t['facet'] == 'topic') if x is not None]
        item_l4[it['item_id']] = ts
        for t in ts:
            src_l4[it['source_id']][t] += 1
    co = [[0] * n4 for _ in range(n4)]
    for c in src_l4.values():
        for a in c:
            for b in c:
                co[a][b] += 1
    TP = topic_layout(n4, co)

    def line_l4(L):
        its = [it for it in C.items_by_src[L['src']] if it['span']['start_line'] <= L['ln'] <= it['span']['end_line']]
        ts = [t for it in its for t in item_l4[it['item_id']]] or list(src_l4[L['src']].elements())
        return ts or [rnd.randrange(n4)]

    # ----- the conversation we follow
    turns = C.transcripts.get(sess_cfg['file'])
    if not turns:
        die(f"session.file '{sess_cfg['file']}' has no speaker_N: turns (or is not in index.json).")
    start = sess_cfg['start'].lower()
    w0 = next((i for i, t in enumerate(turns) if t['text'].lower().startswith(start)), None)
    if w0 is None:
        die(f"session.start text not found at the start of any turn in {sess_cfg['file']}. "
            f"Use: build.py window {C.slug} {sess_cfg['file']}")
    frames_cfg = sess_cfg['frames']
    win = turns[w0:w0 + len(frames_cfg)]
    if len(win) < len(frames_cfg):
        die('session.frames has more entries than turns left in the transcript.')
    other = sess_cfg['other']

    def clip(t, n=235):
        return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + ' …'
    sess_lines = [{'id': f"t{t['ln']:04d}", 'ts': f'¶{w0 + k + 1}', 'raw': t['spk'], 'coach': t['coach'],
                   'who': cfg['coach']['name'] if t['coach'] else other, 'text': clip(t['text'])}
                  for k, t in enumerate(win)]
    frames = [{'id': f'f-{k:02d}', 'span': s, 'kind': kd, 'from': [sess_lines[k]['id']]}
              for k, (kd, s) in enumerate(frames_cfg)]
    cue_k, move_k = sess_cfg['cue'], sess_cfg['move']
    if not win[move_k]['coach'] or win[cue_k]['coach']:
        print(f"warning: cue (turn {cue_k}) should be {other}'s line and move (turn {move_k}) the coach's. "
              f"Check session.coach_speaker.", file=sys.stderr)

    # ----- layers 1 & 2
    win_keys = {(t['src'], t['ln']) for t in win}
    others = [L for L in C.lines if (L['src'], L['ln']) not in win_keys]
    L1 = win + rnd.sample(others, min(len(others), MAX_L1 - len(win)))
    pos1 = []
    for L in L1:
        L['t4'] = rnd.choice(line_l4(L))
        pos1.append(jit(rnd, TP[L['t4']], 115))
    coach_sub = [i for i, L in enumerate(L1) if L['coach'] and L['w'] >= 8 and i >= len(win)]
    coach_total = sum(1 for L in C.lines if L['coach'] and L['w'] >= 8)
    L2src = list(range(len(win))) + rnd.sample(coach_sub, min(MAX_L2 - len(win), len(coach_sub)))
    pos2 = [jit(rnd, pos1[i], 22) for i in L2src]

    # ----- layer 3: situations
    sit_items = defaultdict(list)
    for it in ix['items']:
        for t in it['tags']:
            if t['facet'] == 'situation' and SITU.get(t['label'].lower()):
                sit_items[SITU[t['label'].lower()]].append(it)
    L3 = [thr['situation']] + [k for k in tax['situation'] if k != thr['situation']]
    pos3, sit_t4 = [], []
    for k in L3:
        ts = [t for it in sit_items[k] for t in item_l4[it['item_id']]] or [rnd.randrange(n4)]
        sit_t4.append(ts)
        pos3.append(jit(rnd, TP[Counter(ts).most_common(1)[0][0]], 70))

    # ----- layers 5 & 6: written in the config
    phases, beliefs = cfg['phases'], cfg['beliefs']
    topic_phase = []
    for t in L4:
        tt = tok(tax['topic'][t]['preferred']) | set(t.split('-'))
        sc = [len(tt & set(p.get('keywords', []))) for p in phases]
        topic_phase.append(sc.index(max(sc)) if max(sc) else cfg.get('default_phase', 0))
    topic_phase[L4i[thr['topic']]] = thr['phase']

    def mean(ps):
        return [sum(p[0] for p in ps) / len(ps), sum(p[1] for p in ps) / len(ps)]
    pos5 = [jit(rnd, [c * 1.1 for c in mean([TP[i] for i in range(n4) if topic_phase[i] == p] or [TP[p % n4]])], 40)
            for p in range(len(phases))]
    pos6 = [jit(rnd, mean([pos5[p] for p in b['phases']]), 60) for b in beliefs]

    floors = {1: pos1, 2: pos2, 3: pos3, 4: TP, 5: pos5, 6: pos6}
    off, NN = {}, 0
    for lv in range(1, 7):
        off[lv] = NN
        NN += len(floors[lv])
    edges = []
    for k, i in enumerate(L2src):
        if k < len(win) or rnd.random() < .16:
            edges.append((off[1] + i, off[2] + k))
    by_t4 = defaultdict(list)
    for k, i in enumerate(L2src):
        by_t4[L1[i]['t4']].append(k)
    for j, ts in enumerate(sit_t4):
        for t in set(ts):
            for k in rnd.sample(by_t4[t], min(2, len(by_t4[t]))):
                edges.append((off[2] + k, off[3] + j))
        for t in set(ts[:2]):
            edges.append((off[3] + j, off[4] + t))
    for t in range(n4):
        edges.append((off[4] + t, off[5] + topic_phase[t]))
    for b, bel in enumerate(beliefs):
        for p in bel['phases']:
            edges.append((off[5] + p, off[6] + b))

    sess_nodes = [off[1] + k for k in range(len(win))]
    edges += [(sess_nodes[cue_k], off[3]), (sess_nodes[move_k], off[3])]
    thread_nodes = [sess_nodes[cue_k], sess_nodes[move_k], off[2] + cue_k, off[2] + move_k, off[3],
                    off[4] + L4i[thr['topic']], off[5] + thr['phase'], off[6] + thr['belief']]

    files = [dict(f) for f in C.files]
    for f in files:
        if f['p'] == sess_cfg['file']:
            f['sel'] = 1
        f.pop('p')
    sit_lbl = lambda k: tax['situation'][k]['preferred']
    totals = {'conversations': len(files), 'actions': len(C.lines), 'frames': coach_total, 'tactics': len(L3),
              'scenes': n4, 'phases': len(phases), 'beliefs': len(beliefs), 'words': C.words}
    fm, _ = split_fm(open(os.path.join(C.data, sess_cfg['file']), encoding='utf-8').read())
    return {
        'files': files, 'totals': totals,
        'session': {'title': sess_cfg.get('title') or fm_field(fm, 'title') or '', 'date': fm_field(fm, 'date') or '',
                    'kind': sess_cfg.get('kind', ''), 'turns': len(turns), 'other': other, 'lines': sess_lines},
        'frames': frames,
        'thread': {'cue': frames[cue_k]['id'], 'move': frames[move_k]['id'],
                   'cueLine': sess_lines[cue_k]['id'], 'moveLine': sess_lines[move_k]['id']},
        'labels': {'tactics': [sit_lbl(k) for k in L3], 'scenes': [tax['topic'][t]['preferred'] for t in L4],
                   'phases': [p['title'] for p in phases], 'beliefs': [f"{b['title']}: {b['text']}" for b in beliefs]},
        'floors': {str(lv): [int(round(c)) for p in floors[lv] for c in p] for lv in range(1, 7)},
        'edges': [x for e in edges for x in e],
        'sessNodes': sess_nodes, 'sessFrameNodes': {f['id']: off[2] + k for k, f in enumerate(frames)},
        'threadNodes': thread_nodes,
    }


# ---------------------------------------------------------------- the CONFIG payload (captions etc.)
DEFAULT_STEPS = {
    'collect': ['{sources} sources, gathered in one place',
                'We read {breakdown}: <em>{words} words across {lines} lines.</em> From this collection, we follow one conversation: <em>{session_title}</em>.'],
    'transcript': ['A recording becomes text',
                   'The conversation is transcribed turn by turn. At first, it is simply a record of what each person said.'],
    'speakers': ['Who said what',
                 'We identify {name} and {other}, while keeping their words exactly as spoken. Now every moment has a speaker, a turn and a source.'],
    'layer1': ['Layer 1 · What was said', None],
    'meaning': ['What happened next?', None],
    'cue': ['What {name} does in response', None],
    'layer2': ['Layer 2 · {name}’s response', None],
    'layer3': ['Layer 3 · The situation', None],
    'layer4': ['Layer 4 · The recurring pattern', None],
    'layer5': ['Layer 5 · The coaching purpose', None],
    'layer6': ['Layer 6 · The principle', None],
    'trace': ['One exchange becomes a principle',
              'We can travel from the principle back through its purpose, recurring pattern and situation, all the way to the exact moment {name} responded.'],
}
KIND_WORDS = {'youtube': ('video', 'videos'), 'linkedin': ('LinkedIn post', 'LinkedIn posts'), 'web': ('web page', 'web pages'),
              'medium': ('Medium article', 'Medium articles'), 'doc': ('document', 'documents'),
              'recording': ('recorded session', 'recorded sessions'), 'instagram': ('Instagram post', 'Instagram posts'),
              'twitter': ('post on X', 'posts on X')}


class Strict(dict):
    def __missing__(self, k):
        die(f'unknown placeholder {{{k}}} in config. Available: {", ".join(sorted(self))}')


def resolve(cfg, story):
    co = cfg['coach']
    he, him, his = co['pronouns']
    T = story['totals']
    kinds = Counter(f['k'] for f in story['files'])
    parts = [f"{n} {KIND_WORDS[k][n != 1]}" for k, n in kinds.most_common()]
    vals = Strict(name=co['name'], full_name=co['full_name'], he=he, him=him, his=his, He=he.capitalize(),
                  His=his.capitalize(), other=cfg['session']['other'], session_title=story['session']['title'],
                  sources=f"{T['conversations']:,}", words=f"{T['words']:,}", lines=f"{T['actions']:,}",
                  coach_lines=f"{T['frames']:,}", situations=f"{T['tactics']:,}", topics=f"{T['scenes']}",
                  breakdown=', '.join(parts[:-1]) + (' and ' if len(parts) > 1 else '') + parts[-1],
                  **{k: str(kinds.get(k, 0)) for k in KIND_WORDS})

    def fmt(x):
        if isinstance(x, str):
            return x.format_map(vals)
        if isinstance(x, list):
            return [fmt(v) for v in x]
        if isinstance(x, dict):
            return {k: fmt(v) for k, v in x.items()}
        return x
    steps = {}
    for key, (title, body) in DEFAULT_STEPS.items():
        v = cfg.get('steps', {}).get(key)
        if isinstance(v, list):
            title, body = v
        elif isinstance(v, str):
            body = v
        if body is None:
            die(f'steps.{key} needs a caption (see configs/darren-mitchell.yaml).')
        steps[key] = {'t': fmt(title), 'b': fmt(body)}
    return {'coach': {'name': co['name'], 'full_name': co['full_name'], 'slug': co['slug'], 'pronouns': [he, him, his]},
            'session': {'other_role': cfg['session'].get('other_role', cfg['session']['other'])},
            'steps': steps, 'cards': fmt(cfg['cards']), 'about': fmt(cfg['about']),
            'dos': fmt(cfg.get('dos') or cfg['personas'][0]['dos']),
            'donts': fmt(cfg.get('donts') or cfg['personas'][0]['donts']),
            'personas': fmt(cfg.get('personas', [])),  # optional: [{label, dd_lead, dos, donts}] shown as tabs on Do's & Don'ts
            'mobile': bool(cfg.get('mobile', False)),  # optional: phone layout (portrait) instead of the scaled-down slide
            'words': cfg.get('words', {}),  # optional wording, e.g. {coaching: teaching, Coaching: Teaching, coaches: teaches}
            'dd_lead': fmt(cfg.get('dd_lead', '{name}’s twin follows these in every answer. They start as frequent patterns in how {he} coaches, plus the rules from {his} validated scenarios.'))}


def check_quotes(cfg, story):
    """Warn when a card quote is not (roughly) in the transcript lines."""
    norm = lambda s: re.sub(r'[^a-z0-9 ]', '', re.sub(r'<[^>]+>|&[a-z]+;', ' ', s.lower()).replace('’', '').replace("'", ''))
    whole = norm(' '.join(t['text'] for t in story['session']['lines_full']))
    for k in ('cue', 'move'):
        q = cfg['cards']['layer1'][k]
        for piece in re.split(r'…|\.\.\.|&hellip;', q):
            words = norm(piece).split()
            if len(words) >= 4 and ' '.join(words) not in whole:
                print(f'warning: cards.layer1.{k} is not word-for-word in the transcript: "{piece.strip()[:80]}"', file=sys.stderr)


# ---------------------------------------------------------------- commands
def load_cfg(slug):
    p = os.path.join(HERE, 'configs', f'{slug}.yaml')
    if not os.path.exists(p):
        die(f'configs/{slug}.yaml not found. Copy configs/_template.yaml and fill it in.')
    return yaml.safe_load(open(p, encoding='utf-8'))


def cmd_build(a):
    cfg = load_cfg(a.slug)
    s = cfg['session']
    C = Corpus(a.slug, cfg['coach']['name'], s['file'], s.get('coach_speaker'))
    story = build_story(cfg, C)
    turns = C.transcripts[s['file']]
    w0 = int(story['session']['lines'][0]['ts'][1:]) - 1
    story['session']['lines_full'] = turns[w0:w0 + len(s['frames'])]
    check_quotes(cfg, story)
    story['session'].pop('lines_full')
    conf = resolve(cfg, story)
    tpl = open(os.path.join(HERE, 'template.html'), encoding='utf-8').read()
    js = lambda o: json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    html = tpl.replace('/*__STORY__*/null', js(story)).replace('/*__CONFIG__*/null', js(conf))
    out_dir = a.out or os.getcwd()
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, f"{cfg['coach']['full_name']} - Coaching Twin.html")
    open(out, 'w', encoding='utf-8').write(html)
    T = story['totals']
    print(f"wrote {os.path.relpath(out, os.getcwd())} ({len(html) / 1e6:.1f} MB)\n"
          f"  {T['conversations']:,} sources · {T['actions']:,} lines · {T['words']:,} words · "
          f"{T['frames']:,} coach lines · {T['tactics']:,} situations · {T['scenes']} topics")


def cmd_scout(a):
    C = Corpus(a.slug, a.name)
    print(f'# {a.slug}\n{len(C.files):,} sources {dict(C.kinds())} · {len(C.lines):,} lines · {C.words:,} words')
    two = [p for p, ts in C.transcripts.items() if len({t["spk"] for t in ts}) > 1]
    print(f'{len(C.transcripts)} transcripts, {len(two)} with 2+ speakers (the page needs at least one)')
    for y in glob.glob(os.path.join(C.data, 'linkedin', '*.yaml')):
        p = (yaml.safe_load(open(y, encoding='utf-8')) or {}).get('profile') or {}
        if p:
            import unicodedata
            loc = (p.get('location') or {}).get('linkedinText')
            print(f"\n## LinkedIn profile\nheadline: {p.get('headline')}\nlocation: {loc} · followers: {p.get('followerCount')}"
                  f"\nabout: {unicodedata.normalize('NFKC', p.get('about') or '')[:900]}")
    print('\n## Validated scenarios')
    for s in C.scenarios:
        print(' ', os.path.relpath(s, USERS))
    for facet in ('topic', 'situation'):
        top = sorted(C.tax.get(facet, {}).items(), key=lambda kv: -kv[1]['count'])[:30]
        print(f'\n## Top {facet}s (key · count)\n' + '\n'.join(f'  {k} · {v["count"]}' for k, v in top))
    if a.grep:
        pat = re.compile(a.grep, re.I)
        print(f'\n## Exchanges where the other speaker matches /{a.grep}/ and the coach answers next')
        n = 0
        for path in two:
            ts = C.transcripts[path]
            for i in range(len(ts) - 1):
                cue, mv = ts[i], ts[i + 1]
                if not cue['coach'] and mv['coach'] and pat.search(cue['text']) and len(mv['text'].split()) >= 8:
                    print(f"\n{path}  turn {i + 1}\n  OTHER: {cue['text'][:220]}\n  COACH: {mv['text'][:220]}")
                    n += 1
                    if n >= a.limit:
                        return


def cmd_window(a):
    C = Corpus(a.slug, a.name, a.path, a.speaker)
    ts = C.transcripts.get(a.path) or die(f'{a.path}: no speaker_N: turns found')
    for i, t in enumerate(ts[a.turn - 1:a.turn - 1 + a.n], start=a.turn):
        print(f"¶{i} {t['spk']}{' (coach)' if t['coach'] else ''}: {t['text'][:a.width]}\n")


def cmd_count(a):
    pat = re.compile(a.regex, re.I)
    hits, d = Counter(), os.path.join(USERS, a.slug, 'data')
    for fp in glob.glob(os.path.join(d, '**', '*.md'), recursive=True):
        if pat.search(open(fp, encoding='utf-8', errors='replace').read()):
            hits[kind_of(os.path.relpath(fp, d))] += 1
    print(f'{sum(hits.values())} sources mention /{a.regex}/  {dict(hits)}')


def find_chrome():
    for c in ('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 'google-chrome', 'chromium', 'chromium-browser'):
        if os.path.exists(c) or subprocess.run(['which', c], capture_output=True).returncode == 0:
            return c
    die('Chrome/Chromium not found for screenshots.')


def cmd_shots(a):
    import tempfile
    chrome, out = find_chrome(), a.out or os.path.join(tempfile.gettempdir(), 'coach-twin-shots')
    os.makedirs(out, exist_ok=True)
    html = open(a.html, encoding='utf-8').read().replace('</style>', '*{transition:none!important;animation:none!important}</style>', 1)
    test = os.path.join(out, 'page.html')
    open(test, 'w', encoding='utf-8').write(html)
    n = len(re.findall(r'^\s*\{ch: ', html, re.M))
    for i in range(n):
        subprocess.run([chrome, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1600,900',
                        '--virtual-time-budget=6000', f'--user-data-dir={out}/profile',
                        f'--screenshot={out}/step-{i:02d}.png', f'file://{test}#{i}'], capture_output=True)
    print(f'{n} screenshots in {out}')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--users', help='folder holding <slug>/data and <slug>/workspace (default: ../users or ./users)')
    sub = ap.add_subparsers(dest='cmd', required=True)
    p = sub.add_parser('build'); p.add_argument('slug'); p.add_argument('--out'); p.set_defaults(f=cmd_build)
    p = sub.add_parser('scout'); p.add_argument('slug'); p.add_argument('--name', help='coach first name, to tell speakers apart')
    p.add_argument('--grep'); p.add_argument('--limit', type=int, default=25); p.set_defaults(f=cmd_scout)
    p = sub.add_parser('window'); p.add_argument('slug'); p.add_argument('path'); p.add_argument('--turn', type=int, default=1)
    p.add_argument('--n', type=int, default=14); p.add_argument('--width', type=int, default=400)
    p.add_argument('--name'); p.add_argument('--speaker'); p.set_defaults(f=cmd_window)
    p = sub.add_parser('count'); p.add_argument('slug'); p.add_argument('regex'); p.set_defaults(f=cmd_count)
    p = sub.add_parser('shots'); p.add_argument('html'); p.add_argument('--out'); p.set_defaults(f=cmd_shots)
    a = ap.parse_args()
    if a.users:
        global USERS
        USERS = os.path.abspath(a.users)
    if not os.path.isdir(USERS):
        die(f'coach data folder not found: {USERS}. Pass --users /path/to/users or set COACH_USERS_DIR.')
    a.f(a)


if __name__ == '__main__':
    main()
