/* ============================================================
   PL101 Revise — router, renderer, activities, progress
   A different engine from the CS160 site on purpose: this course
   is essay/theory-driven (named authors' claims, T/F + written
   explanation, compare-and-contrast), not definition/algorithm
   trivia, so the content shapes and activity types are different.
   ============================================================ */

/* ---------- tiny DOM helper (same convention as the other profile) ---------- */
function el(tag, attrs, kids){
  const n = document.createElement(tag);
  if (attrs) for (const k in attrs){
    if (k === 'class') n.className = attrs[k];
    else if (k === 'html') n.innerHTML = attrs[k];
    else if (k === 'text') n.textContent = attrs[k];
    else if (k.slice(0,2) === 'on') n.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
    else n.setAttribute(k, attrs[k]);
  }
  (kids || []).forEach(c => n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return n;
}

/* ---------- storage that never throws — namespaced to this profile ---------- */
const Store = (function(){
  let ok = true, mem = {};
  try { localStorage.setItem('__t','1'); localStorage.removeItem('__t'); }
  catch(e){ ok = false; }
  return {
    get(k, dflt){
      try { const v = ok ? localStorage.getItem(k) : mem[k];
            return v == null ? dflt : JSON.parse(v); }
      catch(e){ return dflt; }
    },
    set(k, v){
      try { const s = JSON.stringify(v); if (ok) localStorage.setItem(k, s); else mem[k] = s; }
      catch(e){ /* private browsing — carry on */ }
    },
    clear(){
      try { if (ok){ ['pl101.done','pl101.tf','pl101.essay'].forEach(k => localStorage.removeItem(k)); } mem = {}; }
      catch(e){}
    }
  };
})();

let DONE  = Store.get('pl101.done', {});
let TFANS = Store.get('pl101.tf', {});
let ESSAY = Store.get('pl101.essay', {});

function markDone(id){ if (!id || DONE[id]) return; DONE[id] = true; Store.set('pl101.done', DONE); paintProgress(); }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function md(s){
  return String(s)
    .replace(/`([^`]+)`/g, (m,c) => '<code>' + esc(c) + '</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/* ============================================================
   Content census — every week's T/F items + scaffold prompts
   count toward progress
   ============================================================ */
function weekActivityIds(w){
  const ids = (w.tf || []).map(q => 'tf-' + w.id + '-' + q.id);
  return ids;
}
const ALL_ACTIVITIES = (function(){
  let ids = [];
  (typeof WEEKS !== 'undefined' ? WEEKS : []).forEach(w => { ids = ids.concat(weekActivityIds(w)); });
  (typeof SCAFFOLD_PROMPTS !== 'undefined' ? SCAFFOLD_PROMPTS : []).forEach(p => ids.push('scaffold-' + p.id));
  ids.push('scaffold-comparecontrast-sim', 'scaffold-comparecontrast-diff');
  return ids;
})();

function paintProgress(){
  const total = ALL_ACTIVITIES.length;
  const done  = ALL_ACTIVITIES.filter(id => DONE[id]).length;
  const pct   = total ? Math.round(done/total*100) : 0;
  const ring  = document.getElementById('ringFg');
  if (ring){
    const C = 2 * Math.PI * 15.5;
    ring.style.strokeDasharray  = C;
    ring.style.strokeDashoffset = C * (1 - pct/100);
  }
  const txt = document.getElementById('progressText');
  if (txt) txt.textContent = pct + '%';
  const pill = document.getElementById('progressPill');
  if (pill) pill.title = done + ' of ' + total + ' activities completed';
  document.querySelectorAll('#nav a').forEach(a => {
    const href = a.getAttribute('href');
    const w = (WEEKS || []).find(x => '#/' + x.id === href);
    if (!w) return;
    const ids = weekActivityIds(w);
    a.classList.toggle('done', ids.length > 0 && ids.every(i => DONE[i]));
  });
}

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

R.table = b => {
  let h = '<table><thead><tr>';
  b.head.forEach(x => h += '<th>' + md(x) + '</th>');
  h += '</tr></thead><tbody>';
  b.rows.forEach(r => { h += '<tr>'; r.forEach(c => h += '<td>' + md(c) + '</td>'); h += '</tr>'; });
  h += '</tbody></table>';
  return el('div', {class:'tablewrap', html:h});
};

R.cards = b => el('div', {class:'cards'}, b.x.map(c =>
  el('a', {class:'card', href:c.to}, [
    el('div', {class:'kick', text:c.kick}),
    el('h3', {text:c.h}),
    el('p', {text:c.p})
  ])
));

/* ---------- theorist index: "who argued what" ---------- */
R.theorists = b => {
  const list = b.x || [];
  return el('div', {class:'theorist-grid'}, list.map((t,i) => {
    const detail = el('div', {class:'theorist-detail', html: md(t.detail || '')});
    const card = el('div', {class:'theorist-card'}, [
      el('div', {class:'theorist-name', text: t.name}),
      t.work ? el('div', {class:'theorist-work', text: t.work}) : el('span'),
      el('div', {class:'theorist-claim', html: md(t.claim)}),
    ]);
    if (t.detail){
      const more = el('button', {class:'theorist-more', type:'button', text:'More detail'});
      more.addEventListener('click', () => {
        const show = !detail.classList.contains('show');
        detail.classList.toggle('show', show);
        more.textContent = show ? 'Less detail' : 'More detail';
      });
      card.appendChild(more);
      card.appendChild(detail);
    }
    return card;
  }));
};

/* ---------- concept mini-glossary ---------- */
R.concepts = b => el('div', {class:'concept-list'}, (b.x || []).map(c => el('div', {class:'concept-row'}, [
  el('div', {class:'concept-term', text: c.term}),
  el('div', {class:'concept-def', html: md(c.def)}),
  c.ex ? el('div', {class:'concept-ex', html: md(c.ex)}) : el('span')
])));

/* ---------- True/False self-check (not multiple choice) ---------- */
R.tf = b => {
  const uid = 'tf-' + b.weekId + '-' + b.id;
  const {box, body} = activityShell('True or false', uid);
  body.appendChild(el('p', {class:'tf-q', html: md(b.q)}));

  const choices = el('div', {class:'tf-choices'});
  const tBtn = el('button', {class:'tf-btn', type:'button', text:'True'});
  const fBtn = el('button', {class:'tf-btn', type:'button', text:'False'});
  choices.appendChild(tBtn); choices.appendChild(fBtn);

  const verdict = el('div', {class:'tf-verdict'});
  const model = el('div', {class:'tf-model'}, [
    el('div', {class:'tf-model-title', text:'Model explanation'}),
    el('div', {html: md(b.explanation)})
  ]);
  const revealBtn = el('button', {class:'btn sec', type:'button', text:'Show model explanation'});

  function pick(val){
    tBtn.disabled = true; fBtn.disabled = true;
    tBtn.classList.toggle('picked', val === true);
    fBtn.classList.toggle('picked', val === false);
    const right = val === b.answer;
    (val === true ? tBtn : fBtn).classList.add(right ? 'right' : 'wrong');
    verdict.className = 'tf-verdict ' + (right ? 'match' : 'mismatch');
    verdict.textContent = right
      ? 'Matches the answer — check your reasoning against the explanation below.'
      : ('The answer is ' + (b.answer ? 'True' : 'False') + ' — read why below, then compare it to your own reasoning.');
    TFANS[uid] = {picked: val, revealed: true};
    Store.set('pl101.tf', TFANS);
    markDone(uid);
    setState(box, 'reviewed');
    model.classList.add('show');
    revealBtn.style.display = 'none';
  }
  tBtn.addEventListener('click', () => pick(true));
  fBtn.addEventListener('click', () => pick(false));
  revealBtn.addEventListener('click', () => {
    model.classList.add('show'); revealBtn.style.display = 'none';
    markDone(uid); setState(box, 'reviewed');
    TFANS[uid] = TFANS[uid] || {}; TFANS[uid].revealed = true; Store.set('pl101.tf', TFANS);
  });

  body.appendChild(choices);
  body.appendChild(verdict);
  body.appendChild(el('div', {class:'btnrow'}, [revealBtn]));
  body.appendChild(model);

  const saved = TFANS[uid];
  if (saved && saved.picked != null) setTimeout(() => pick(saved.picked), 0);
  else if (saved && saved.revealed){
    model.classList.add('show'); revealBtn.style.display = 'none';
  }
  return box;
};

/* ---------- essay-answer scaffold: Identify -> Define/Explain -> Analyse/Link ---------- */
const SCAFFOLD_STEPS = [
  {title:'1 · Identify / mention', hint:'What are you referring to, specifically? Name the theory, author or claim — don’t start with a vague generalisation.'},
  {title:'2 · Define / explain',   hint:'What does this actually mean, involve, or imply? Explain it in your own words, as if to someone who hasn’t read the source.'},
  {title:'3 · Analyse / support / link', hint:'Why does this matter here? What supports it, or is an example of it? How does it connect back to the course material or the question asked?'}
];

function renderScaffold(prompt, weekId){
  const uid = 'scaffold-' + prompt.id;
  const box = el('div', {class:'scaffold'});
  box.appendChild(el('div', {class:'scaffold-head'}, [prompt.title]));
  const body = el('div', {class:'scaffold-body'});
  box.appendChild(body);

  body.appendChild(el('p', {html: md(prompt.q)}));

  const saved = ESSAY[uid] || {};
  const areas = [];
  SCAFFOLD_STEPS.forEach((step, i) => {
    const wrap = el('div', {class:'scaffold-step'});
    wrap.appendChild(el('div', {class:'scaffold-step-label'}, [
      el('span', {class:'scaffold-num', text: String(i+1)}),
      el('span', {class:'scaffold-step-title', text: step.title.replace(/^\d+\s*·\s*/, '')})
    ]));
    wrap.appendChild(el('p', {class:'scaffold-step-hint', text: prompt.hints ? prompt.hints[i] : step.hint}));
    const ta = el('textarea', {'aria-label': step.title, placeholder:'Write this part of your answer here…'});
    ta.value = saved[i] || '';
    ta.addEventListener('input', () => {
      const cur = ESSAY[uid] || {}; cur[i] = ta.value; ESSAY[uid] = cur; Store.set('pl101.essay', ESSAY);
    });
    wrap.appendChild(ta);
    areas.push(ta);
    body.appendChild(wrap);
  });

  const modelWrap = el('div', {class:'scaffold-model'});
  (prompt.model || []).forEach((m,i) => {
    modelWrap.appendChild(el('div', {class:'scaffold-model-part'}, [
      el('span', {class:'scaffold-model-tag', text: SCAFFOLD_STEPS[i].title.replace(/^\d+\s*·\s*/, '')}),
      el('div', {html: md(m)})
    ]));
  });
  const revealBtn = el('button', {class:'btn', type:'button', text:'Show a model answer, built the same way'});
  revealBtn.addEventListener('click', () => {
    modelWrap.classList.add('show');
    revealBtn.style.display = 'none';
    markDone(uid);
  });
  body.appendChild(el('div', {class:'btnrow'}, [revealBtn]));
  body.appendChild(modelWrap);

  if (Object.keys(saved).length && (typeof DONE !== 'undefined') && DONE[uid]){
    modelWrap.classList.add('show'); revealBtn.style.display = 'none';
  }
  return box;
}

R.scaffold = b => renderScaffold(b.prompt, b.weekId);

/* ---------- compare & contrast tool (modernisation vs dependency) ---------- */
R.comparecontrast = () => {
  const wrap = el('div');
  const mod = THEORY_PROFILES.modernisation, dep = THEORY_PROFILES.dependency;

  wrap.appendChild(el('div', {class:'vs-grid'}, [
    el('div', {class:'vs-col'}, [
      el('h4', {text:'Modernisation theory'}),
      el('p', {html: md(mod.corePremise)}),
      el('ul', {}, mod.critiques.map(c => el('li', {html: md(c)})))
    ]),
    el('div', {class:'vs-col'}, [
      el('h4', {text:'Dependency theory'}),
      el('p', {html: md(dep.corePremise)}),
      el('ul', {}, dep.critiques.map(c => el('li', {html: md(c)})))
    ])
  ]));

  const prompt = {
    id: 'comparecontrast',
    title: 'Practice — Compare and contrast modernisation and dependency theory',
    q: 'Actual 2025 MST question: <strong>"Compare and contrast modernisation and dependency theory: a) how are they similar (5 points); b) how are they different (5 points)?"</strong> Use the boxes below to draft each half using the same Identify → Define/explain → Analyse/link structure, then check your draft against the model.',
    hints: [
      'Similarities first: what do BOTH theories take for granted or agree on (e.g. both are theories of the same thing, both emerged to explain the same global gap)? Name that shared ground specifically.',
      'Then differences: state plainly how their explanations, mechanisms or policy prescriptions diverge.',
      'For both: link each point back to the specific readings/thinkers (Rostow for modernisation; Frank/Wallerstein/dependency theorists) rather than staying abstract.'
    ],
    model: [
      'Both modernisation theory and dependency theory are attempts to explain the same observed gap — why some countries are "developed" and others are not — and both treat this gap as something that can, in principle, be explained by a single overarching structural theory rather than by isolated national circumstances. Both also emerged in the same mid-20th-century period of decolonisation, responding directly to newly independent states asking how to "catch up," and both give a central role to a country’s position in the global/international economy in determining its development path.',
      'Define/explain the shared ground: modernisation theory (Rostow) says every country can follow the same staged path toward a Western industrial end-point; dependency theory says every country’s position is defined relationally, by its place in a single global economic structure. What is genuinely shared is the premise that development is a *general, theorisable process* — not that the two theories agree on what drives it.',
      'Analyse/link: this shared premise is exactly why the two theories are taught as direct rivals in this course — dependency theory (Frank, Wallerstein, extending Rodney’s argument) was constructed specifically as a structural critique of modernisation theory’s claim that all countries follow the same neutral path, so the comparison itself is the course’s way of showing how development theory evolved from one paradigm to its critique.'
    ]
  };
  const simPrompt = Object.assign({}, prompt, {id:'comparecontrast-sim', title:'a) Similarities (5 points)'});
  const diffPrompt = {
    id: 'comparecontrast-diff',
    title: 'b) Differences (5 points)',
    q: 'Now draft the differences half.',
    hints: [
      'Identify the specific point of divergence you are naming (e.g. the direction of causation, or what "underdevelopment" is taken to mean).',
      'Define/explain both sides of that divergence — what modernisation says, and what dependency says, on this specific point.',
      'Analyse/link with a concrete example or named thinker on each side.'
    ],
    model: [
      'The clearest difference is what each theory says "underdevelopment" actually is. Modernisation theory (Rostow) treats it as a starting condition — every society begins "traditional" and undeveloped, the same stage the industrialised West itself once passed through. Dependency theory (Frank) treats it as an outcome — something actively produced and maintained by a country’s exploited position within the global capitalist economy, not a stage it simply hasn’t reached yet.',
      'This changes where each theory looks for the cause of poverty: modernisation looks inward, at a country’s own institutions, capital, technology and culture (hence Rostow’s internal "stages"). Dependency looks outward, at the country’s external relationship to wealthier "core" states — unequal terms of trade, capital extraction, and colonial-era structures that persist after independence.',
      'This is why the two theories prescribe opposite policies: modernisation recommends more integration with the West — aid, investment, technology transfer, adopting Western institutions — to move a country through Rostow’s stages faster. Dependency theory recommends the opposite: reducing dependence on the core (delinking, import substitution, restructuring trade terms), because on its account closer integration under existing terms is exactly what keeps the periphery poor.'
    ]
  };

  wrap.appendChild(renderScaffold(simPrompt, null));
  wrap.appendChild(renderScaffold(diffPrompt, null));
  return wrap;
};

/* ---------- past MST reference (read-only, for format familiarity) ---------- */
R.pastpaper = () => {
  const wrap = el('div');
  (PAST_MST.parts || []).forEach(part => {
    wrap.appendChild(el('h3', {text: part.title}));
    if (part.note) wrap.appendChild(el('p', {class:'lede', html: md(part.note)}));
    part.items.forEach(it => {
      wrap.appendChild(el('div', {class:'pastpaper'}, [
        it.label ? el('div', {class:'qmeta', text: it.label}) : el('span'),
        el('div', {class:'q', html: md(it.q)})
      ]));
    });
  });
  return wrap;
};

/* ---------- activity chrome ---------- */
function activityShell(title, id){
  const state = el('span', {class:'activity-state', text:''});
  const body  = el('div', {class:'activity-body'});
  const box   = el('div', {class:'activity'}, [
    el('div', {class:'activity-head'}, [
      el('span', {class:'activity-kind', text:'Self-check'}),
      el('span', {class:'activity-title', text:title}),
      state
    ]),
    body
  ]);
  box._state = state;
  if (id && DONE[id]) setState(box, 'done');
  return {box, body};
}
function setState(box, kind){
  const s = box._state; if (!s) return;
  const label = {reviewed:'✓ reviewed', done:'✓ done'}[kind] || '';
  s.textContent = label;
  s.className = 'activity-state' + (kind === 'reviewed' || kind === 'done' ? ' ok' : '');
}

/* ============================================================
   Page rendering + routing
   ============================================================ */
function buildNav(){
  const nav = document.getElementById('nav');
  let group = null;
  PAGES.forEach(s => {
    if (s.group !== group){ group = s.group; nav.appendChild(el('div', {class:'nav-group', text:group})); }
    nav.appendChild(el('a', {href:'#/' + s.id}, [
      el('span', {text: s.nav || s.title}),
      el('span', {class:'tick', text:'✓'})
    ]));
  });
}

function renderBlock(host, b){
  const fn = R[b.t];
  if (!fn) return;
  try { host.appendChild(fn(b)); }
  catch(e){ console.error('block failed', b, e); }
}

function renderSection(sec){
  const page = document.getElementById('page');
  page.innerHTML = '';
  if (sec.eyebrow) page.appendChild(el('p', {class:'eyebrow', text:sec.eyebrow}));
  page.appendChild(el('h1', {text:sec.title}));
  if (sec.lede) page.appendChild(el('p', {class:'lede', html: md(sec.lede)}));
  (sec.blocks || []).forEach(b => renderBlock(page, b));

  const pager = document.getElementById('pager');
  pager.innerHTML = '';
  const i = PAGES.indexOf(sec);
  if (i > 0){
    const p = PAGES[i-1];
    pager.appendChild(el('a', {class:'prev', href:'#/' + p.id}, [el('span', {text:'Previous'}), el('strong', {text: p.nav || p.title})]));
  }
  if (i < PAGES.length - 1){
    const nx = PAGES[i+1];
    pager.appendChild(el('a', {class:'next', href:'#/' + nx.id}, [el('span', {text:'Next'}), el('strong', {text: nx.nav || nx.title})]));
  }

  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#/' + sec.id));
  document.title = sec.title + ' — PL101 Revise';
  paintProgress();
}

function buildWeekSection(w){
  const blocks = [];
  if (w.summary) blocks.push({t:'plain', title:'In plain English', x:w.summary});
  if (w.theorists && w.theorists.length){
    blocks.push({t:'h', x:'Who argued what'});
    blocks.push({t:'theorists', x: w.theorists});
  }
  if (w.concepts && w.concepts.length){
    blocks.push({t:'h', x:'Key concepts'});
    blocks.push({t:'concepts', x: w.concepts});
  }
  if (w.tf && w.tf.length){
    blocks.push({t:'h', x:'Practice — True or false'});
    blocks.push({t:'p', x:'Pick True or False, then reveal the model explanation and compare it to your own reasoning — the MST grades the explanation, not just the tick.'});
    w.tf.forEach(q => blocks.push(Object.assign({t:'tf', weekId:w.id}, q)));
  }
  return {
    id: w.id, group:'Weeks', nav:'Week ' + w.week,
    eyebrow: 'Week ' + w.week,
    title: w.title,
    blocks
  };
}

function buildEssaySection(){
  const blocks = [
    {t:'p', x:'The course’s required structure for any point in any answer: **identify/mention** what you’re referring to and be specific, **define/explain** what it means, then **analyse/support/link** — why you’re saying it, what supports it, and how it ties to the course material. That structure is the actual skill being graded, on the True/False explanations and the essay alike. Practice it below.'},
  ];
  SCAFFOLD_PROMPTS.forEach(p => {
    blocks.push({t:'h3', x:p.title});
    blocks.push({t:'scaffold', prompt:p});
  });
  return { id:'essay', group:'Practice', nav:'Essay structure', eyebrow:'Practice', title:'Answer-structure practice', blocks };
}

function buildCompareSection(){
  return {
    id:'comparecontrast', group:'Practice', nav:'Compare & contrast',
    eyebrow:'Practice', title:'Modernisation vs. dependency theory',
    lede:'The MST’s Part 2 essay question, most years, is a compare-and-contrast between two development theories — modernisation and dependency are the two the readings set up directly against each other. Draft your answer below, then check it against the model.',
    blocks: [{t:'comparecontrast'}]
  };
}

function buildPastPaperSection(){
  return {
    id:'pastpaper', group:'Practice', nav:'Past MST (2025)',
    eyebrow:'Reference', title:'The actual 2025 MST',
    lede:'The released 2025 mid-semester test, for format — five True/False-plus-explanation statements (20 points) and one compare-and-contrast question (10 points), 1h15min. Use the practice True/False items on each week’s page (written fresh, same style) to actually test your recall — this page is just so the real phrasing and structure isn’t a surprise.',
    blocks: [{t:'pastpaper'}]
  };
}

function buildHomeSection(){
  const w1 = WEEKS[0];
  return {
    id:'start', group:'Start', nav:'How to use this',
    eyebrow: 'PL101 · Politics of Development',
    title: 'Revision for Weeks 1–7 (the MST)',
    lede: 'The mid-semester test covers Weeks 1–7: poverty & global inequality, colonialism, political independence, the modernisation paradigm, foreign aid & dependency, and critical approaches to development. This is an essay course — the test is True/False-plus-explanation and a compare-and-contrast essay, not multiple choice, so the material below is built around who-argued-what and how to structure a written answer, not flashcards.',
    blocks: [
      {t:'note', k:'exam', title:'The test', x:'Two parts, 30 points, 1h15min. **Part 1**: five True/False statements, each needing a short written explanation (1 point for the tick, 3 for the explanation). **Part 2**: one compare-and-contrast essay (5 + 5 points). Every answer/point should follow the same structure: **identify → define/explain → analyse/link**.'},
      {t:'h', x:'The seven weeks'},
      {t:'cards', x: WEEKS.map(w => ({to:'#/' + w.id, kick:'Week ' + w.week, h:w.title, p:(w.summary||'').slice(0,110) + '…'}))},
      {t:'h', x:'Then practise the actual skill'},
      {t:'cards', x:[
        {to:'#/essay', kick:'Practice', h:'Answer-structure practice', p:'Practice the identify → define/explain → analyse/link structure the course explicitly grades on.'},
        {to:'#/comparecontrast', kick:'Practice', h:'Compare & contrast', p:'Modernisation vs. dependency theory, drafted side by side against a model answer.'},
        {to:'#/pastpaper', kick:'Reference', h:'Past MST (2025)', p:'The real released paper, for format and phrasing.'}
      ]}
    ]
  };
}

let PAGES = [];
function boot(){
  PAGES = [buildHomeSection()].concat(WEEKS.map(buildWeekSection), [buildEssaySection(), buildCompareSection(), buildPastPaperSection()]);
}

function route(){
  const id = (location.hash || '#/start').replace('#/','');
  const sec = PAGES.find(s => s.id === id);
  if (!sec){
    if (location.replace) location.replace('#/' + PAGES[0].id); else location.hash = '#/' + PAGES[0].id;
    renderSection(PAGES[0]);
    return;
  }
  renderSection(sec);
  document.body.classList.remove('nav-open');
  window.scrollTo(0,0);
  document.getElementById('main').focus({preventScroll:true});
}

document.addEventListener('DOMContentLoaded', () => {
  boot();
  buildNav();
  window.addEventListener('hashchange', route);
  route();

  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));

  document.getElementById('resetBtn').addEventListener('click', () => {
    if (!confirm('Clear every saved answer and tick for this profile? This cannot be undone.')) return;
    Store.clear();
    DONE = {}; TFANS = {}; ESSAY = {};
    paintProgress();
    route();
  });
});
