/* ============================================================
   CS214 Revise — router, block renderers, activities, progress
   Relies on ../shared/engine.js (el/esc/md, createStore, buildNavList,
   routeTo, paintProgressCore, makeActivityShell, initChrome), then
   glossary*.js, graph.js, dijkstra.js and data.js.
   ============================================================ */

/* ---------- storage, namespaced to this profile (wrapped: never throws) ---------- */
const STORE_KEYS = ['cs214.done', 'cs214.mcq', 'cs214.quiz', 'cs214.stats', 'cs214.settings', 'cs214.written', 'cs214.mockCur', 'cs214.mockHist',
                    'cs214.paperA.cur', 'cs214.paperA.hist', 'cs214.paperB.cur', 'cs214.paperB.hist'];
const Store = createStore(STORE_KEYS);
let DONE  = Store.get('cs214.done', {});
let MCQ   = Store.get('cs214.mcq', {});     // id → index picked last (correct answer reached)
let QUIZ  = Store.get('cs214.quiz', {});    // id → {answers:{i:choice}, best, last}
let STATS = Store.get('cs214.stats', {});   // widget id → {runs, bestMistakes}
let SETTINGS = Object.assign({lectNotation:true}, Store.get('cs214.settings', {}));
let WRITTEN = Store.get('cs214.written', {});   // written-answer id → {choice, text, revealed, ticks}

/* Dijkstra superscript notation (default ON = the lecturer's 7¹) */
setDijNotation(SETTINGS.lectNotation);
onDijNotationChange = v => { SETTINGS.lectNotation = v; Store.set('cs214.settings', SETTINGS); };

function markDone(id){
  if (!id || DONE[id]) return;
  DONE[id] = true; Store.set('cs214.done', DONE); paintProgress();
}

/* ---------- progress census ---------- */
const WRITTEN_BANKS = { rec: REC_ITEMS, strat: STRAT_ITEMS, scen: SCEN_ITEMS };
function pageActivityIds(p){
  let ids = [];
  (p.blocks || []).forEach(b => {
    if (b.id && (b.t === 'mcq' || b.t === 'quiz' || b.t === 'widget')) ids.push(b.id);
    if (b.t === 'writtenset') ids = ids.concat(WRITTEN_BANKS[b.bank].map(i => i.id));
  });
  return ids;
}
const ALL_ACTIVITIES = (function(){
  let ids = []; PAGES.forEach(p => { ids = ids.concat(pageActivityIds(p)); }); return ids;
})();
function paintProgress(){ paintProgressCore(ALL_ACTIVITIES, id => !!DONE[id], PAGES, pageActivityIds); }

/* ============================================================
   Block renderers
   ============================================================ */
const R = {};
R.h  = b => el('h2', {html: md(b.x)});
R.h3 = b => el('h3', {html: md(b.x)});
R.p  = b => el('p',  {html: md(b.x)});
R.ul = b => el('ul', {}, b.x.map(i => el('li', {html: md(i)})));
R.ol = b => el('ol', {}, b.x.map(i => el('li', {html: md(i)})));

R.note = b => el('div', {class:'note ' + (b.k || '')}, [
  el('div', {class:'note-title', text: b.title || 'Note'}),
  el('div', {html: md(b.x)})
]);
R.plain = b => el('div', {class:'plainbox'}, [
  el('div', {class:'plainbox-title', text: b.title || 'In plain English'}),
  el('div', {html: md(b.x)})
]);

const TAG_TEXT = {lecture:'Lecture', lab:'Lab', past:'Past paper', extra:'Extra practice', textbook:'Textbook', noncourse:'Not a course term'};
function tagBadge(tag, text){ return el('span', {class:'badge ' + tag, text: text || TAG_TEXT[tag] || tag}); }

R.src = b => el('p', {class:'src'}, [document.createTextNode('Source: ')].concat(
  b.tags.map(t => tagBadge(t[0], t[1])), b.x ? [document.createTextNode(b.x)] : []));

R.legend = () => el('div', {class:'legend'}, [
  ['lecture', 'Lecture', 'taken from the slides'],
  ['lab', 'Lab', 'from a lab sheet or its posted solution'],
  ['past', 'Past paper', 'the real 2025 Test 2'],
  ['extra', 'Extra practice', 'written or generated for this site, in the course style'],
  ['textbook', 'Textbook', 'prescribed text only, not in the slides'],
  ['noncourse', 'Not a course term', 'general CS wording the course does not use']
].map(r => el('span', {}, [tagBadge(r[0], r[1]), document.createTextNode(r[2])])));

R.code = b => el('div', {class:'codebox no-gloss'}, [
  el('div', {class:'codebox-head'}, [el('span', {class:'tag', text:'Pseudocode'}), el('span', {text: b.title || ''})]),
  el('pre', {text: b.x})
]);

R.ladder = b => {
  const frag = el('div');
  if (b.title) frag.appendChild(el('div', {class:'ladder-title', text:b.title}));
  frag.appendChild(el('ol', {class:'ladder'}, b.x.map(r => el('li', {}, [el('strong', {html: md(r[0])}), el('div', {html: md(r[1])})]))));
  return frag;
};

R.table = b => el('div', {class:'tablewrap'}, [el('table', {}, [
  b.noHead ? null : el('thead', {}, [el('tr', {}, b.head.map(h => el('th', {html: md(h)})))]),
  el('tbody', {}, b.rows.map(r => el('tr', {}, r.map(c => el('td', {html: md(c)})))))
].filter(Boolean))]);

R.cards = b => el('div', {class:'cards'}, b.x.map(c => el('a', {class:'card', href:c.href}, [
  el('div', {class:'kick', text:c.kick}), el('h3', {text:c.title}), el('p', {text:c.text})
])));

/* static graph figure. final:true runs Dijkstra and shows the finished F;
   mst:'kruskal'|'prim' shows that algorithm's tree; tree:[[u,v],…] highlights given edges;
   graph:{…} draws an inline graph instead of a preset */
R.graph = b => {
  const g = b.graph ? cloneGraph(b.graph) : presetGraph(b.preset);
  if (b.graph) fitViewBox(g);
  let opts = {};
  if (b.final){
    const st = new DijkstraState(g); st.runAll();
    opts = {inY: mapOf(st.Y), tree: st.F, dist: distLabels(st, st.dist, st.pred, st.Y)};
  }
  if (b.mst) opts = {tree: (b.mst === 'prim' ? primSteps(g) : kruskalSteps(g)).F};
  if (b.tree) opts = {tree: b.tree};
  return graphFigure(g, opts, b.caption);
};
R.kruskaltable = b => kruskalTable(presetGraph(b.preset));
R.primtable = b => primTable(presetGraph(b.preset), b.start);
R.labformat = b => el('div', {class:'codebox no-gloss'}, [
  el('div', {class:'codebox-head'}, [el('span', {class:'tag', text:'Answer'}), el('span', {text: b.title || ''})]),
  el('pre', {text: labFormat(presetGraph(b.preset), b.which, b.start)})
]);

/* a set of written (self-marked) questions from a bank in data3.js */
R.writtenset = b => renderWrittenSet(WRITTEN_BANKS[b.bank],
  id => WRITTEN[id],
  (id, st) => { WRITTEN[id] = st; Store.set('cs214.written', WRITTEN); },
  markDone);
R.matrix = b => {
  const frag = el('div');
  frag.appendChild(matrixTable(presetGraph(b.preset)));
  if (b.caption) frag.appendChild(el('p', {class:'subtle', html: md(b.caption)}));
  return frag;
};
R.dijtable = b => {
  const st = new DijkstraState(presetGraph(b.preset)); st.runAll();
  const frag = el('div');
  frag.appendChild(dijTable(st, st.rows.length, st.circled.length));
  if (b.caption) frag.appendChild(el('p', {class:'subtle', html: md(b.caption)}));
  return frag;
};
R.finalpaths = b => {
  const st = new DijkstraState(presetGraph(b.preset)); st.runAll();
  return finalPathsTable(st);
};

/* ---------- activities ---------- */
function activityShell(kind, title, id){
  const sh = makeActivityShell(kind, title);
  if (id && DONE[id]) setActivityState(sh.box, 'Done ✓', true);
  return sh;
}

/* Options are written with the answer first in data.js; show them in a fixed shuffled
   order per question (seeded by the question text, so it's the same on every visit
   and saved answers — stored as original indexes — still line up). */
function optionOrder(q, n){
  let h = 2166136261;
  for (let i = 0; i < q.length; i++){ h ^= q.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  const rand = () => {                              // mulberry32, seeded by the FNV-1a hash above
    h = (h + 0x6D2B79F5) >>> 0;
    let t = Math.imul(h ^ (h >>> 15), 1 | h);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const idx = []; for (let i = 0; i < n; i++) idx.push(i);
  for (let i = n - 1; i > 0; i--){ const j = Math.floor(rand() * (i + 1)); const t = idx[i]; idx[i] = idx[j]; idx[j] = t; }
  return idx;
}

/* single multiple-choice question: instant feedback; keep trying until right */
R.mcq = b => {
  const sh = activityShell('Quick check', '', b.id);
  sh.box.querySelector('.activity-title').appendChild(tagBadge(b.tag || 'extra'));
  sh.body.appendChild(el('p', {class:'qtext', html: md(b.q)}));
  const fb = el('div', {class:'feedback'});
  const buttons = [];
  const order = optionOrder(b.q, b.opts.length);
  const list = el('ul', {class:'choices'}, order.map((i, pos) => {
    const btn = el('button', {class:'choice', type:'button'}, [el('span', {class:'key', text:'ABCD'[pos]}), el('span', {html: md(b.opts[i])})]);
    btn.addEventListener('click', () => pick(i));
    buttons[i] = btn;
    return el('li', {}, [btn]);
  }));
  function pick(i){
    if (i === b.a){
      buttons.forEach((x, j) => { x.disabled = true; x.setAttribute('disabled', ''); if (j === i) x.classList.add('correct'); });
      fb.className = 'feedback show good'; fb.innerHTML = '<b>Correct.</b> ' + md(b.why);
      MCQ[b.id] = i; Store.set('cs214.mcq', MCQ);
      markDone(b.id); setActivityState(sh.box, 'Done ✓', true);
    } else {
      buttons[i].classList.add('incorrect'); buttons[i].disabled = true; buttons[i].setAttribute('disabled', '');
      fb.className = 'feedback show bad'; fb.innerHTML = '<b>Not that one — try again.</b>';
    }
  }
  sh.body.appendChild(list); sh.body.appendChild(fb);
  if (MCQ[b.id] === b.a) pick(b.a);
  return sh.box;
};

/* quiz: first answer counts; the score and best score are saved */
R.quiz = b => {
  const sh = activityShell('Quiz', b.title, b.id);
  sh.box.querySelector('.activity-title').appendChild(document.createTextNode(' '));
  sh.box.querySelector('.activity-title').appendChild(tagBadge(b.tag || 'extra'));
  const rec = QUIZ[b.id] || {answers:{}, best:null};
  const score = el('div', {class:'scorecard'});
  const items = el('div');
  function save(){ QUIZ[b.id] = rec; Store.set('cs214.quiz', QUIZ); }
  function paintScore(){
    const n = b.items.length, answered = Object.keys(rec.answers).length;
    const right = b.items.filter((q, i) => rec.answers[i] === q.a).length;
    score.innerHTML = '';
    score.appendChild(el('div', {class:'big', text: right + ' / ' + n}));
    score.appendChild(el('div', {class:'bar'}, [el('i', {style:'width:' + Math.round(answered / n * 100) + '%'})]));
    score.appendChild(el('div', {class:'subtle', text: answered + ' of ' + n + ' answered' +
      (rec.best != null ? ' · best completed score: ' + rec.best + ' / ' + n : '')}));
    if (answered === n){
      if (rec.best == null || right > rec.best){ rec.best = right; save(); }
      markDone(b.id); setActivityState(sh.box, 'Done ✓', true);
    }
  }
  function paintItems(){
    items.innerHTML = '';
    b.items.forEach((q, i) => {
      const box = el('div', {class:'qitem'});
      box.appendChild(el('div', {class:'qnum'}, [document.createTextNode('Question ' + (i + 1))].concat(q.tag ? [tagBadge(q.tag, q.tagText)] : [])));
      box.appendChild(el('div', {class:'qtext', html: md(q.q)}));
      const fb = el('div', {class:'feedback'});
      const btns = [];
      const order = optionOrder(q.q, q.opts.length);
      const keyOf = {}; order.forEach((j, pos) => keyOf[j] = 'ABCD'[pos]);
      const list = el('ul', {class:'choices'}, order.map((j, pos) => {
        const btn = el('button', {class:'choice', type:'button'}, [el('span', {class:'key', text:'ABCD'[pos]}), el('span', {html: md(q.opts[j])})]);
        btn.addEventListener('click', () => { if (rec.answers[i] != null) return; rec.answers[i] = j; save(); show(); paintScore(); });
        btns[j] = btn;
        return el('li', {}, [btn]);
      }));
      function show(){
        const ans = rec.answers[i];
        if (ans == null) return;
        btns.forEach((x, j) => {
          x.setAttribute('disabled', '');
          if (j === q.a) x.classList.add('correct');
          else if (j === ans) x.classList.add('incorrect');
        });
        fb.className = 'feedback show ' + (ans === q.a ? 'good' : 'bad');
        fb.innerHTML = '<b>' + (ans === q.a ? 'Correct.' : 'The answer is ' + keyOf[q.a] + '.') + '</b> ' + md(q.why);
      }
      box.appendChild(list); box.appendChild(fb);
      show();
      items.appendChild(box);
    });
  }
  const again = el('button', {class:'btn sec', type:'button', text:'Start the quiz again'});
  again.addEventListener('click', () => { rec.answers = {}; save(); paintItems(); paintScore(); });
  sh.body.appendChild(score);
  sh.body.appendChild(items);
  sh.body.appendChild(el('div', {class:'btnrow'}, [again]));
  paintItems(); paintScore();
  return sh.box;
};

/* interactive widgets */
const WIDGETS = {
  'dij-vis':      renderDijVisualiser,
  'dij-diy':      renderDijDIY,
  'dij-table':    renderDijTableDrill,
  'huff-vis':     renderHuffVisualiser,
  'huff-diy':     renderHuffDIY,
  'huff-codes':   renderHuffCodes,
  'huff-encode':  renderHuffEncode,
  'huff-reverse': renderHuffReverse,
  'kr-vis':       renderKruskalVisualiser,
  'kr-diy':       renderKruskalDIY,
  'pr-vis':       renderPrimVisualiser,
  'pr-diy':       renderPrimDIY,
  'mst-lab':      renderMstLab,
  'mst-sbs':      renderMstSideBySide,
  'coins':        renderCoinDemo,
  'mock':         renderMock
};
const NO_STATS = {'dij-vis':1, 'huff-vis':1, 'huff-codes':1, 'huff-encode':1, 'huff-reverse':1, 'coins':1, 'mock':1, 'kr-vis':1, 'pr-vis':1, 'mst-lab':1, 'mst-sbs':1};
R.widget = b => {
  const sh = activityShell(b.kind || 'Activity', b.title, b.id);
  const st = STATS[b.id];
  const statLine = el('p', {class:'subtle'});
  function paintStat(){
    const s = STATS[b.id];
    statLine.textContent = s ? 'Completed runs: ' + s.runs + (s.best != null ? ' · fewest mistakes: ' + s.best : '') : '';
  }
  const onDone = (mistakes) => {
    if (!NO_STATS[b.w]){
      const s = STATS[b.id] || {runs:0, best:null};
      s.runs++;
      if (mistakes != null && (s.best == null || mistakes < s.best)) s.best = mistakes;
      STATS[b.id] = s; Store.set('cs214.stats', STATS); paintStat();
    }
    markDone(b.id); setActivityState(sh.box, b.doneText ? b.doneText + ' ✓' : 'Done ✓', true);
  };
  if (st && !NO_STATS[b.w]) paintStat();
  sh.body.appendChild(WIDGETS[b.w]({preset: b.preset}, onDone));
  sh.body.appendChild(statLine);
  return sh.box;
};

/* Huffman worked example (static): row-by-row table, tree, codes, sizes, notes */
R.huffwork = b => {
  const box = el('details', {class:'fold', open: b.open ? 'open' : null});
  if (!b.open) box.removeAttribute('open');
  box.appendChild(el('summary', {}, [el('span', {class:'fold-title', text:b.title}), el('span', {class:'fold-count', text: b.badge || 'My working'})]));
  const body = el('div', {class:'fold-body'});
  if (b.intro) body.appendChild(el('p', {html: md(b.intro)}));
  body.appendChild(renderHuffWorked(b.set, b.notes));
  box.appendChild(body);
  return box;
};

/* a prefix-code tree drawn straight from a code table: rows = [[symbol, code], …] */
R.codetree = b => {
  const t = treeFromCodes(b.rows.map(r => [r[0], 0, r[1]]), '?');
  const frag = el('div');
  frag.appendChild(drawHuffForest(t.nodes, [0], {text: n => n.leaf ? n.name : '', codes: Object.fromEntries(b.rows)}));
  if (b.caption) frag.appendChild(el('p', {class:'subtle', html: md(b.caption)}));
  return frag;
};

/* settings (currently one: the Dijkstra table notation) */
R.settings = () => {
  const box = el('input', {type:'checkbox'});
  box.checked = SETTINGS.lectNotation;
  box.addEventListener('change', () => { setDijNotation(box.checked); onDijNotationChange(box.checked); });
  return el('div', {class:'note'}, [
    el('div', {class:'note-title', text:'Settings'}),
    el('label', {class:'setting'}, [box, el('span', {html:' <b>Lecturer\'s notation in Dijkstra tables</b> — write entries as distance with the predecessor as a superscript, exactly as on Lec 9.2 slide 7 (7<sup>1</sup>, not 7<sup>v1</sup>). On by default; the same switch is on each Dijkstra activity.'})])
  ]);
};

/* glossary page: search + source filter */
R.glossary = () => {
  const wrap = el('div', {class:'no-gloss'});
  const search = el('input', {class:'gsearch', type:'search', placeholder:'Search terms…', 'aria-label':'Search the glossary'});
  const tabs = el('div', {class:'gtabs'});
  const list = el('div');
  let filter = 'all';
  [['all','All'], ['course','Course terms'], ['textbook','Textbook only'], ['noncourse','Not course terms']].forEach(([k, label]) => {
    const t = el('button', {class:'gtab' + (k === 'all' ? ' on' : ''), type:'button', text: label});
    t.addEventListener('click', () => { filter = k; tabs.querySelectorAll('.gtab').forEach(x => x.classList.remove('on')); t.classList.add('on'); paint(); });
    tabs.appendChild(t);
  });
  search.addEventListener('input', paint);
  function paint(){
    const q = search.value.trim().toLowerCase();
    list.innerHTML = '';
    GLOSS.slice().sort((a, b) => a.w.toLowerCase() < b.w.toLowerCase() ? -1 : 1).forEach(e => {
      if (filter !== 'all' && e.src !== filter) return;
      if (q && (e.w + ' ' + (e.alt || []).join(' ') + ' ' + e.d).toLowerCase().indexOf(q) < 0) return;
      const row = el('div', {class:'gentry', id:'g-' + e.slug}, [
        el('div', {class:'gentry-word'}, [document.createTextNode(e.w), srcBadge(e)]),
        el('div', {html: md(e.d)})
      ]);
      if (e.ex) row.appendChild(el('div', {class:'gentry-ex', html: md(e.ex)}));
      if (e.see) row.appendChild(el('a', {class:'gentry-see', href: e.see, text:'Where it is taught →'}));
      list.appendChild(row);
    });
    if (!list.firstChild) list.appendChild(el('p', {class:'muted', text:'No matching terms.'}));
  }
  wrap.appendChild(el('div', {class:'gbar'}, [search]));
  wrap.appendChild(tabs); wrap.appendChild(list);
  paint();
  return wrap;
};

/* ============================================================
   Page rendering + routing
   ============================================================ */
function renderBlock(host, b){
  const fn = R[b.t];
  if (!fn){ host.appendChild(el('p', {class:'muted', text:'[unknown block: ' + b.t + ']'})); return; }
  const node = fn(b);
  if (node) host.appendChild(node);
}

function renderSection(sec){
  const page = document.getElementById('page');
  page.innerHTML = '';
  if (sec.eyebrow) page.appendChild(el('p', {class:'eyebrow no-gloss', text: sec.eyebrow}));
  page.appendChild(el('h1', {text: sec.title}));
  if (sec.lede) page.appendChild(el('p', {class:'lede', html: md(sec.lede)}));
  sec.blocks.forEach(b => renderBlock(page, b));
  annotateGlossary(page);
  document.title = sec.title + ' — CS214 Test 2';

  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + sec.id));
  const i = PAGES.indexOf(sec);
  const pager = document.getElementById('pager');
  pager.innerHTML = '';
  if (i > 0) pager.appendChild(el('a', {class:'prev', href:'#/' + PAGES[i-1].id}, [el('span', {text:'Previous'}), document.createTextNode(PAGES[i-1].nav || PAGES[i-1].title)]));
  if (i < PAGES.length - 1) pager.appendChild(el('a', {class:'next', href:'#/' + PAGES[i+1].id}, [el('span', {text:'Next'}), document.createTextNode(PAGES[i+1].nav || PAGES[i+1].title)]));
  paintProgress();
}

function route(){ routeTo(PAGES, renderSection); }

document.addEventListener('DOMContentLoaded', () => {
  buildNavList(PAGES);
  initChrome();
  window.addEventListener('hashchange', route);
  route();
  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('Clear all saved progress, quiz answers and scores for CS214?')) return;
    Store.clear();
    DONE = {}; MCQ = {}; QUIZ = {}; STATS = {}; WRITTEN = {};
    SETTINGS = {lectNotation:true}; setDijNotation(true);
    paintProgress();
    route();
  });
});
