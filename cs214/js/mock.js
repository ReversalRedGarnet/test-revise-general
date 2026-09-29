/* ============================================================
   CS214 Revise — timed papers in the 2025 Test 2 format.

   One engine runs every paper: the real 2025 paper (defined here)
   and the extra practice papers (papers.js). A paper is a list of
   questions, each of one kind:
     huffReverse  code table → tree (node weights) + range   auto-marked
     huffBuild    frequencies → codes + bit counts           auto-marked
     dijkstra     the lecturer's table + distances and paths auto-marked
     kruskal      edges in the order considered, add/skip    auto-marked
     approach     Q2 (a) + (b): which approach? justify      self-marked
     written      Q3: which algorithm? why not the others    self-marked
   Self-marked parts are typed during the test and marked AFTER
   submitting against a model answer and checklist (written.js).
   All model answers and mark splits are my working.

   Storage (via app.js's Store, so Reset clears it), per paper:
     2025: cs214.mockCur / cs214.mockHist   (unchanged since Stage 3)
     A, B: cs214.paperA.cur / .hist, cs214.paperB.cur / .hist
   ============================================================ */

const APPROACH_CHOICES = ['Dynamic programming', 'Divide and conquer', 'Greedy'];
const Q2_LEAD = '2. Which algorithmic approach (Dynamic Programming, Divide and Conquer, or Greedy Algorithm) would you choose to solve the given problems? Justify your choice.';

const MOCK_ITEM = {
  q2a: () => findWrittenItem('rec-2025'),
  q2b: () => findWrittenItem('strat-2025'),
  // the paper offers exactly Prim, Kruskal or Dijkstra; Prim and Kruskal both earn the choice mark
  q3:  () => Object.assign({}, findWrittenItem('scen-2025'), {choices:['Prim', 'Kruskal', 'Dijkstra'], answer:0, accept:[0, 1]})
};
const MOCK_ASSUMPTIONS =
  '<ul>' +
  '<li><b>Q1:</b> smaller weight on the <b>left</b> (the node removed first — the course convention from the slide pseudocode), and ties may break either way → X from <b>15 to 22</b>. 16–21 (strict, no ties) and 15–30 (left/right ignored) are also given full marks here, but only count if you <i>wrote that convention down</i>.</li>' +
  '<li><b>Q4:</b> A and C tie at 3 after B is added — either can be circled next. An entry is replaced only when the new distance is strictly shorter (as in the pseudocode). Entries in the lecturer\'s notation (3<sup>B</sup> = distance 3, from B).</li>' +
  '<li><b>Q2/Q3:</b> the mark splits (1 for the choice, 1–2 for the justification) are my guess at a sensible scheme.</li>' +
  '</ul>' +
  '<p><b>On the real paper, write your assumptions down</b> — e.g. "smaller weight on the left, ties either way" for Q1 and "A and C tie; I took A first" for Q4.</p>';

const MOCK_QS = [
  {id:'q1', label:'Q1', marks:4, guide:15, topic:'Huffman tree from a code table + range of X',
   links:[['#/huff-reverse', 'Reverse mode (Q1 style)'], ['#/huff-algo', 'Huffman\'s algorithm']],
   kind:'huffReverse', ex: () => HUFF_REVERSE.t2025, lenient:true,
   text:'1. Draw the Huffman Tree corresponding to the encoding table below. Then determine all possible integer values for the frequency of character \'X\', given that its frequency is between 1 and 40 (inclusive). Show your working for how you determined the exact range. (Hint: 0 = left branch, 1 = right branch.) <b>(2 + 2 marks)</b>'},
  {id:'q2', label:'Q2', marks:4, guide:10, guideText:'5 + 5', topic:'Design approaches (a: formula, b: strategy)',
   links:[['#/rec-drill', 'Recurrence drill'], ['#/strat-drill', 'Strategy drill'], ['#/design', 'Design approaches']],
   kind:'approach', lead:Q2_LEAD,
   parts:[{key:'q2a', label:'2 (a)', item:MOCK_ITEM.q2a, answer:1}, {key:'q2b', label:'2 (b)', item:MOCK_ITEM.q2b, answer:2}]},
  {id:'q3', label:'Q3', marks:3, guide:5, topic:'Prim, Kruskal or Dijkstra?',
   links:[['#/compare', 'Comparison'], ['#/scen-drill', 'Scenario drill']],
   kind:'written', key:'q3', item:MOCK_ITEM.q3, num:'3. '},
  {id:'q4', label:'Q4', marks:4, guide:15, topic:'Dijkstra from W: distances and paths',
   links:[['#/dij-table', 'Fill in the table'], ['#/dijkstra', 'Dijkstra\'s algorithm']],
   kind:'dijkstra', graph: () => presetGraph('test2025'), modelNote:'A taken before C at the tie; C first is equally right',
   text:'4. A logistics company has its main warehouse located at node \'W\' in the directed graph shown below. The numbers on the edges represent the transportation cost to move goods to other destinations. Use <b>Dijkstra\'s Algorithm</b> to determine the shortest distance and path from \'W\' to each of the other locations. Show all steps clearly. <b>(4 marks)</b>'}
];

const PAPERS = {
  p2025: {id:'p2025', curKey:'cs214.mockCur', histKey:'cs214.mockHist', tag:'past', name:'Test 2 (2025)',
    intro:'The 2025 Test 2 paper, question for question. <b>15 marks</b>. The paper allowed <b>50 minutes</b>; your slot is an hour.',
    assumptions:MOCK_ASSUMPTIONS, qs:MOCK_QS}
};

function mockNow(){ return Date.now(); }
function fmtClock(sec){ sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
function fmtMin(sec){ return Math.round(sec / 60 * 10) / 10 + ' min'; }
const AUTO_KINDS = {huffReverse:1, huffBuild:1, dijkstra:1, kruskal:1};
function paperTotal(P){ return P.qs.reduce((s, q) => s + q.marks, 0); }
function paperGraph(q){ const g = q.graph(); if (!g.vb) fitViewBox(g); return g; }

/* written (self-marked) parts of a paper, in order */
function paperParts(P){
  const out = [];
  P.qs.forEach(q => {
    if (q.kind === 'approach') q.parts.forEach(p => out.push({key:p.key, label:p.label, q, item: () => Object.assign({}, p.item(), {choices:APPROACH_CHOICES, answer:p.answer, accept:undefined})}));
    if (q.kind === 'written') out.push({key:q.key, label:q.label.replace('Q', ''), q, item:q.item});
  });
  return out;
}
function initAnswers(P){
  const ans = {};
  P.qs.forEach(q => {
    if (q.kind === 'huffReverse') ans[q.id] = {w:{}, lo:'', hi:'', conv:''};
    if (q.kind === 'huffBuild') ans[q.id] = {codes:{}, bits:'', fixed:''};
    if (q.kind === 'dijkstra'){   // n − 1 rows: the source, then one per vertex circled (the all-dash last row is optional)
      const g = paperGraph(q);
      ans[q.id] = {rows: g.nodes.slice(1).map((n, k) => k === 0 ? {label:g.source, cells:{}} : {cells:{}}), fin:{}};
    }
    if (q.kind === 'kruskal') ans[q.id] = {rows: paperGraph(q).edges.map(() => ({e:'', d:''})), total:''};
  });
  paperParts(P).forEach(p => ans[p.key] = {});
  return ans;
}
function gradeAuto(q, ans){
  return ({huffReverse:gradeHuffReverse, huffBuild:gradeHuffBuild, dijkstra:gradeDijkstra, kruskal:gradeKruskalTrace})[q.kind](q, ans || {});
}

let MOCK_TIMER = null;

function renderMock(opts, onDone){
  const P = PAPERS[opts.preset || 'p2025'];
  const TOTAL = paperTotal(P);
  const root = el('div', {class:'no-gloss mock'});
  let view = null, viewId = null;

  function cur(){ return Store.get(P.curKey, null); }
  function setCur(a){ Store.set(P.curKey, a); }
  function hist(){ return Store.get(P.histKey, []); }
  function setHist(h){ Store.set(P.histKey, h); }

  function go(v, id){ view = v; viewId = id; if (MOCK_TIMER){ clearInterval(MOCK_TIMER); MOCK_TIMER = null; } paint(); }
  function paint(){
    root.innerHTML = '';
    if (view === 'results') return paintResults(viewId);
    const a = cur();
    if (a) return paintTest(a);
    paintIntro();
  }
  const guideText = q => (q.guideText || q.guide) + ' min';

  /* ---------------- intro ---------------- */
  function paintIntro(){
    root.appendChild(el('p', {html:P.intro}));
    root.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [
      el('thead', {}, [el('tr', {}, ['Q', 'Topic', 'Marks', 'Guide time' + (P.tag === 'past' ? ' (from the paper)' : ''), 'Marked'].map(x => el('th', {text:x})))]),
      el('tbody', {}, P.qs.map(q => el('tr', {}, [el('td', {text:q.label}), el('td', {text:q.topic}), el('td', {text:String(q.marks)}),
        el('td', {text: guideText(q)}), el('td', {text: AUTO_KINDS[q.kind] ? 'automatically' : 'by you, after submitting'})])))])]));
    const sel = el('select', {class:'sel', 'aria-label':'Time limit'}, [el('option', {value:'50', text:'50 minutes (as on the 2025 paper)'}), el('option', {value:'60', text:'60 minutes (your slot)'})]);
    const start = el('button', {class:'btn', type:'button', text:'Start the paper'});
    start.addEventListener('click', () => {
      const t = mockNow(), times = {};
      P.qs.forEach(q => times[q.id] = 0);
      setCur({id:t, paper:P.id, limitMin:Number(sel.value), start:t, cur:P.qs[0].id, lastSwitch:t, times, ans:initAnswers(P)});
      go('test');
    });
    root.appendChild(el('div', {class:'ctrl'}, [el('label', {}, [document.createTextNode('Time limit'), sel]), start]));
    root.appendChild(el('div', {class:'note'}, [el('div', {class:'note-title', text:'Assumptions my model answers use'}), el('div', {html:P.assumptions})]));
    root.appendChild(el('p', {class:'subtle', text:'The timer keeps running if you leave this page or reload — like the real test. Your answers are saved as you type. Model answers stay hidden until you submit.'}));
    paintHistory();
  }

  function paintHistory(){
    const h = hist();
    if (!h.length) return;
    const autoQs = P.qs.filter(q => AUTO_KINDS[q.kind]);
    root.appendChild(el('div', {class:'prompt', text:'Past attempts'}));
    root.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [
      el('thead', {}, [el('tr', {}, ['When', 'Limit', 'Time used', 'Auto-marked (' + autoQs.map(q => q.label).join(', ') + ')', 'Total', ''].map(x => el('th', {text:x})))]),
      el('tbody', {}, h.slice().reverse().map(a => {
        const s = paperScore(P, a);
        const v = el('button', {class:'btn sec', type:'button', text:'View'});
        v.addEventListener('click', () => go('results', a.id));
        return el('tr', {}, [el('td', {text: new Date(a.start).toLocaleString()}), el('td', {text:a.limitMin + ' min'}),
          el('td', {text: fmtClock((a.end - a.start) / 1000)}), el('td', {text: s.auto + ' / ' + s.autoMax}),
          el('td', {text: s.complete ? s.total + ' / ' + TOTAL : s.total + ' / ' + TOTAL + ' (typed answers not self-marked yet)'}), el('td', {}, [v])]);
      }))])]));
  }

  /* ---------------- the test ---------------- */
  function paintTest(a){
    const bar = el('div', {class:'mockbar'});
    const clock = el('span', {class:'clock'});
    const qTime = el('span', {class:'subtle'});
    const tabs = el('div', {class:'mocktabs'});
    P.qs.forEach(q => {
      const b = el('button', {class:'pickbtn' + (a.cur === q.id ? ' sel' : ''), type:'button', text:q.label + ' · ' + q.marks + 'm'});
      b.addEventListener('click', () => { switchTo(q.id); });
      tabs.appendChild(b);
    });
    const submit = el('button', {class:'btn', type:'button', text:'Submit'});
    submit.addEventListener('click', () => { if (confirm('Submit the paper now? You can\'t change answers afterwards.')) finish(false); });
    bar.appendChild(el('div', {class:'mockbar-row'}, [clock, qTime, submit]));
    bar.appendChild(tabs);
    root.appendChild(bar);
    const qHost = el('div', {class:'mockq'});
    root.appendChild(qHost);
    const q = P.qs.find(x => x.id === a.cur);
    qHost.appendChild(el('div', {class:'prompt', text: q.label + ' — ' + q.marks + ' marks · guide ' + guideText(q)}));
    ({huffReverse:testHuffReverse, huffBuild:testHuffBuild, approach:testApproach, written:testWritten, dijkstra:testDijkstra, kruskal:testKruskal})[q.kind](qHost, a, q);

    let attached = false;   // the first tick runs before the widget is on the page
    function tick(){
      if (document.body.contains(root)) attached = true;
      else if (attached){ clearInterval(MOCK_TIMER); MOCK_TIMER = null; return; }
      const c = cur(); if (!c) return;
      const left = c.limitMin * 60 - (mockNow() - c.start) / 1000;
      clock.textContent = '⏱ ' + fmtClock(left) + ' left';
      clock.classList.toggle('low', left < 5 * 60);
      const spent = (c.times[c.cur] || 0) + (mockNow() - c.lastSwitch) / 1000;
      const g = P.qs.find(x => x.id === c.cur).guide * 60;
      qTime.textContent = 'This question: ' + fmtClock(spent) + ' of ' + fmtClock(g) + ' guide' + (spent > g ? ' — over, move on' : '');
      if (left <= 0) finish(true);
    }
    tick();
    if (MOCK_TIMER) clearInterval(MOCK_TIMER);
    MOCK_TIMER = setInterval(tick, 1000);
  }
  function saveAns(mut){ const a = cur(); if (!a) return; mut(a.ans); setCur(a); }
  function switchTo(id){
    const a = cur(); if (!a || a.cur === id) return;
    const t = mockNow();
    a.times[a.cur] = (a.times[a.cur] || 0) + (t - a.lastSwitch) / 1000;
    a.cur = id; a.lastSwitch = t; setCur(a); go('test');
  }
  function finish(timedOut){
    const a = cur(); if (!a) return;
    const t = Math.min(mockNow(), a.start + a.limitMin * 60000);   // the clock stops at the deadline
    a.times[a.cur] = (a.times[a.cur] || 0) + Math.max(0, t - a.lastSwitch) / 1000;
    a.end = t; a.timedOut = timedOut;
    a.self = {};
    paperParts(P).forEach(p => { const x = a.ans[p.key] || {}; a.self[p.key] = {choice:x.choice, text:x.text, ticks:[]}; });
    const h = hist(); h.push(a); setHist(h);
    Store.set(P.curKey, null);
    if (onDone) onDone();
    go('results', a.id);
  }

  function codeTable(rows){
    return el('div', {class:'tablewrap'}, [el('table', {class:'codes'}, [
      el('thead', {}, [el('tr', {}, ['Character', 'Frequency', 'Code'].map(x => el('th', {text:x})))]),
      el('tbody', {}, rows.map(r => el('tr', {}, [el('td', {text:r[0]}), el('td', {text: r[1] == null ? '?' : String(r[1])}), el('td', {class:'mono', text:r[2]})])))])]);
  }

  /* Huffman reverse — code table → node weights (the tree) + range */
  function testHuffReverse(host, a, q){
    const ex = q.ex(), tree = treeFromCodes(ex.rows, ex.unknown), U = ex.unknown, A = a.ans[q.id];
    host.appendChild(el('p', {html:q.text}));
    host.appendChild(codeTable(ex.rows));
    host.appendChild(el('p', {class:'subtle', html:'On paper you draw the tree. Here, the tree is fixed by giving the weight of every internal node (the "node" column is its path from the root). Use expressions like <span class="mono">' + U + '+22</span> where ' + U + ' is involved. Work out the conditions on scrap paper as you would on the real paper.'}));
    const rows = mockInternals(tree).map(n => {
      const i = el('input', {class:'din wide', type:'text', autocomplete:'off', 'aria-label':'Weight of node ' + (n.path || 'root')});
      i.value = A.w[n.path] || '';
      i.addEventListener('input', () => saveAns(s => { s[q.id].w[n.path] = i.value; }));
      return el('tr', {}, [el('td', {class:'mono', text: n.path || 'root'}), el('td', {text: mockChildren(tree, n)}), el('td', {}, [i])]);
    });
    host.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [el('thead', {}, [el('tr', {}, ['Node (path)', 'Children', 'Weight'].map(x => el('th', {text:x})))]), el('tbody', {}, rows)])]));
    const lo = el('input', {class:'din', type:'text', inputmode:'numeric', 'aria-label':'Smallest ' + U}); lo.value = A.lo;
    const hi = el('input', {class:'din', type:'text', inputmode:'numeric', 'aria-label':'Largest ' + U}); hi.value = A.hi;
    lo.addEventListener('input', () => saveAns(s => { s[q.id].lo = lo.value; }));
    hi.addEventListener('input', () => saveAns(s => { s[q.id].hi = hi.value; }));
    host.appendChild(el('div', {class:'btnrow'}, [el('span', {text:U + ' can be any whole number from '}), lo, el('span', {text:' to '}), hi]));
    if (q.lenient){
      const conv = el('input', {type:'text', class:'path-in wideline', placeholder:'e.g. smaller weight on the left; ties either way', 'aria-label':'Convention you assumed'});
      conv.value = A.conv || '';
      conv.addEventListener('input', () => saveAns(s => { s[q.id].conv = conv.value; }));
      host.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Convention I assumed (not marked, but write it on the real paper): '}), conv]));
    }
  }

  /* Huffman build — frequencies → a code per character + bit counts */
  function testHuffBuild(host, a, q){
    const A = a.ans[q.id];
    host.appendChild(el('p', {html:q.text}));
    const rows = q.symbols.map(([s, f]) => {
      const i = el('input', {class:'din wide mono', type:'text', autocomplete:'off', inputmode:'numeric', 'aria-label':'Code for ' + s});
      i.value = A.codes[s] || '';
      i.addEventListener('input', () => saveAns(x => { x[q.id].codes[s] = i.value; }));
      return el('tr', {}, [el('td', {text:s}), el('td', {text:String(f)}), el('td', {}, [i])]);
    });
    host.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'codes'}, [el('thead', {}, [el('tr', {}, ['Character', 'Frequency', 'Your code'].map(x => el('th', {text:x})))]), el('tbody', {}, rows)])]));
    host.appendChild(el('p', {class:'subtle', text:'On paper you draw the tree and read the codes off it. Here, type each code (0s and 1s).'}));
    const bits = el('input', {class:'din wide', type:'text', inputmode:'numeric', 'aria-label':'Bits with the Huffman code'}); bits.value = A.bits;
    const fixed = el('input', {class:'din wide', type:'text', inputmode:'numeric', 'aria-label':'Bits with a fixed-length code'}); fixed.value = A.fixed;
    bits.addEventListener('input', () => saveAns(x => { x[q.id].bits = bits.value; }));
    fixed.addEventListener('input', () => saveAns(x => { x[q.id].fixed = fixed.value; }));
    host.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'(b) Bits with the Huffman code: '}), bits]));
    host.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Bits with a fixed-length code: '}), fixed]));
  }

  function testApproach(host, a, q){
    q.parts.forEach((p, k) => {
      const part = paperParts(P).find(x => x.key === p.key), item = part.item();
      host.appendChild(el('div', {class:'part'}, [el('div', {class:'part-title', text: p.label + ' — 2 marks'}),
        el('p', {html: (k === 0 ? q.lead + '<br>' : '') + item.prompt}),
        renderWritten(item, a.ans[p.key], st => saveAns(s => { s[p.key] = st; }), 'answer')]));
    });
  }
  function testWritten(host, a, q){
    const item = q.item();
    host.appendChild(el('p', {html:(q.num || '') + item.prompt + ' <b>(' + q.marks + ' marks)</b>'}));
    host.appendChild(renderWritten(item, a.ans[q.key], st => saveAns(s => { s[q.key] = st; }), 'answer'));
  }

  /* Dijkstra — the lecturer's table (n − 1 rows) + final distances and paths */
  function testDijkstra(host, a, q){
    const g = paperGraph(q), ids = nodeIds(g), src = g.source, A = a.ans[q.id];
    host.appendChild(el('p', {html:q.text}));
    host.appendChild(graphFigure(g, {}, null));
    host.appendChild(el('p', {class:'subtle', html:'Fill the table the lecturer\'s way: row 1 is ' + esc(src) + '; each later row starts with the vertex you circled in the row above. Each entry is a distance plus the superscript box for where it came from (3<sup>' + esc(ids[1]) + '</sup>). Leave a box empty or type — once a vertex is in Y; ∞ (or inf) with an empty superscript for "no path yet". The final all-dashes row can be left out.'}));
    const head = el('tr', {}, [el('th', {class:'rowh', text:'Added'})].concat(ids.map(v => el('th', {text:v}))));
    const body = A.rows.map((row, r) => {
      let labelCell;
      if (r === 0) labelCell = el('td', {class:'rowh', text:src});
      else {
        const s = el('select', {class:'sel', 'aria-label':'Vertex added in row ' + (r + 1)}, [el('option', {value:'', text:'?'})].concat(ids.filter(v => v !== src).map(v => el('option', {value:v, text:v}))));
        s.value = row.label || '';
        s.addEventListener('change', () => saveAns(x => { x[q.id].rows[r].label = s.value; }));
        labelCell = el('td', {class:'rowh'}, [s]);
      }
      return el('tr', {}, [labelCell].concat(ids.map(v => {
        const c = row.cells[v] || {};
        const d = el('input', {class:'din', type:'text', autocomplete:'off', 'aria-label':'Row ' + (r + 1) + ' distance to ' + v});
        const p = el('input', {class:'pin', type:'text', autocomplete:'off', 'aria-label':'Row ' + (r + 1) + ' came from, for ' + v});
        d.value = c.d || ''; p.value = c.p || '';
        const upd = () => saveAns(x => { x[q.id].rows[r].cells[v] = {d:d.value, p:p.value}; });
        d.addEventListener('input', upd); p.addEventListener('input', upd);
        return el('td', {}, [d, p]);
      })));
    });
    host.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'dij'}, [el('thead', {}, [head]), el('tbody', {}, body)])]));
    host.appendChild(el('div', {class:'prompt', text:'Shortest distance and path from ' + src}));
    const fr = ids.filter(v => v !== src).map(v => {
      const f = A.fin[v] || {};
      const d = el('input', {class:'din', type:'text', autocomplete:'off', 'aria-label':'Shortest distance to ' + v}); d.value = f.d || '';
      const p = el('input', {class:'path-in', type:'text', autocomplete:'off', placeholder:src + ' … ' + v, 'aria-label':'Path to ' + v}); p.value = f.path || '';
      const upd = () => saveAns(x => { x[q.id].fin[v] = {d:d.value, path:p.value}; });
      d.addEventListener('input', upd); p.addEventListener('input', upd);
      return el('tr', {}, [el('td', {text:v}), el('td', {}, [d]), el('td', {}, [p])]);
    });
    host.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [el('thead', {}, [el('tr', {}, ['To', 'Distance', 'Path'].map(x => el('th', {text:x})))]), el('tbody', {}, fr)])]));
  }

  /* Kruskal — each edge in the order considered, added or rejected, + total */
  function testKruskal(host, a, q){
    const g = paperGraph(q), A = a.ans[q.id];
    const edges = undirectedEdges(g).slice().sort((x, y) => naturalCmp(x.u, y.u) || naturalCmp(x.v, y.v));
    host.appendChild(el('p', {html:q.text}));
    host.appendChild(graphFigure(g, {}, null));
    host.appendChild(el('p', {class:'subtle', text:'One row per edge, in the order Kruskal considers it. Stop once the tree is finished — leave the remaining rows blank.'}));
    const body = A.rows.map((row, r) => {
      const es = el('select', {class:'sel', 'aria-label':'Edge considered at step ' + (r + 1)}, [el('option', {value:'', text:'—'})].concat(edges.map(e => el('option', {value:String(e.i), text:eStr(e.u, e.v, e.w)}))));
      const ds = el('select', {class:'sel', 'aria-label':'Decision at step ' + (r + 1)}, [el('option', {value:'', text:'—'}), el('option', {value:'add', text:'Add to F'}), el('option', {value:'skip', text:'Reject — would make a cycle'})]);
      es.value = row.e; ds.value = row.d;
      es.addEventListener('change', () => saveAns(x => { x[q.id].rows[r].e = es.value; }));
      ds.addEventListener('change', () => saveAns(x => { x[q.id].rows[r].d = ds.value; }));
      return el('tr', {}, [el('td', {text:String(r + 1)}), el('td', {}, [es]), el('td', {}, [ds])]);
    });
    host.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [el('thead', {}, [el('tr', {}, ['Step', 'Edge considered', 'Decision'].map(x => el('th', {text:x})))]), el('tbody', {}, body)])]));
    const tot = el('input', {class:'din wide', type:'text', inputmode:'numeric', 'aria-label':'Total weight'}); tot.value = A.total;
    tot.addEventListener('input', () => saveAns(x => { x[q.id].total = tot.value; }));
    host.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Total weight of the MST: '}), tot]));
  }

  /* ---------------- results ---------------- */
  function paintResults(id){
    const h = hist(), a = h.find(x => x.id === id);
    if (!a){ view = null; return paint(); }
    const save = () => { const hh = hist(); const k = hh.findIndex(x => x.id === a.id); if (k >= 0){ hh[k] = a; setHist(hh); } paintSummary(); };

    root.appendChild(el('h2', {text:'Results'}));
    if (a.timedOut) root.appendChild(el('div', {class:'note trap'}, [el('div', {class:'note-title', text:'Time ran out'}), el('div', {text:'Your answers were submitted automatically when the ' + a.limitMin + ' minutes ended.'})]));
    const summary = el('div');
    root.appendChild(summary);
    root.appendChild(el('div', {class:'note'}, [el('div', {class:'note-title', text:'Assumptions my model answers use'}), el('div', {html:P.assumptions})]));

    P.qs.forEach(q => {
      if (AUTO_KINDS[q.kind]){
        const r = gradeAuto(q, a.ans[q.id]);
        root.appendChild(sectionHead(q.label + ' — ' + q.topic + ' (marked automatically)', r.marks + ' / ' + q.marks));
        root.appendChild(el('div', {html:r.html}));
        root.appendChild(el('div', {class:'prompt'}, [el('span', {class:'badge lecture', text:'My working'}), document.createTextNode(' Model answer (not an official key' + (q.modelNote ? '; ' + q.modelNote : '') + ')')]));
        root.appendChild(modelAnswer(q));
      } else {
        paperParts(P).filter(p => p.q === q).forEach(p => {
          const item = p.item();
          root.appendChild(sectionHead('Q' + p.label + ' — mark it yourself', ''));
          root.appendChild(el('p', {class:'subtle', html:item.prompt}));
          root.appendChild(renderWritten(item, a.self[p.key], st => { a.self[p.key] = st; save(); }, 'mark'));
        });
      }
    });

    const again = el('button', {class:'btn', type:'button', text:'Back to the start page'});
    again.addEventListener('click', () => go(null));
    root.appendChild(el('div', {class:'btnrow'}, [again]));

    function sectionHead(t, m){ return el('h3', {class:'mockhead'}, [document.createTextNode(t), el('span', {class:'badge extra', text: m || 'self-marked'})]); }
    function paintSummary(){
      const s = paperScore(P, a);
      summary.innerHTML = '';
      const lost = (q, got) => got != null && got < q.marks ? 'Revise: ' + q.links.map(l => '<a href="' + l[0] + '">' + l[1] + '</a>').join(', ') : (got == null ? 'Mark it below' : '✔');
      summary.appendChild(el('div', {class:'scorecard'}, [
        el('div', {class:'big', text: s.total + ' / ' + TOTAL}),
        el('div', {class:'subtle', text: (s.complete ? 'All questions marked.' : 'The auto-marked questions are done; tick the checklists below to mark the typed answers.') +
          ' Time used ' + fmtClock((a.end - a.start) / 1000) + ' of ' + a.limitMin + ':00.'})]));
      summary.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [
        el('thead', {}, [el('tr', {}, ['Question', 'Marks', 'Time used', ''].map(x => el('th', {text:x})))]),
        el('tbody', {}, P.qs.map(q => {
          const got = s.byQ[q.id];
          return el('tr', {}, [el('td', {text:q.label + ' ' + q.topic}), el('td', {html: got == null ? '<i>not marked yet</i>' : '<b>' + got + '</b> / ' + q.marks}),
            el('td', {text: fmtMin(a.times[q.id] || 0) + ' (guide ' + guideText(q) + ')'}), el('td', {html: lost(q, got)})]);
        }))])]));
    }
    paintSummary();
  }

  paint();
  return root;
}

/* ---------- model answers ---------- */
function modelAnswer(q){
  const wrap = el('div');
  if (q.kind === 'huffReverse'){
    const ex = q.ex(), tree = treeFromCodes(ex.rows, ex.unknown), R = huffRanges(tree, ex.lo, ex.hi);
    wrap.appendChild(drawHuffForest(tree.nodes, [0], {unknown:true, text: n => n.leaf ? n.name + ':' + (n.hasX ? ex.unknown : n.w.k) : wText(n.w, ex.unknown)}));
    wrap.appendChild(el('ol', {class:'working'}, ex.working.map(w => el('li', {html:w}))));
    if (q.lenient) wrap.appendChild(threeAnswers(R, ex));
    else wrap.appendChild(el('p', {html:'<b>Answer: ' + esc(ex.unknown) + ' = ' + rangeText(R.ordered) + '</b> (checked by trying every value from ' + ex.lo + ' to ' + ex.hi + ' with the convention the question states). ' + esc(ex.ends)}));
  }
  if (q.kind === 'huffBuild'){
    const h = new Huff(q.symbols).runAll(), s = huffSizes(h);
    wrap.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'steps'}, [
      el('thead', {}, [el('tr', {}, ['Step', 'Queue before (lowest first)', 'Removed first → left (0)', 'Removed second → right (1)', 'New node'].map(x => el('th', {text:x})))]),
      el('tbody', {}, h.steps.map(st => el('tr', {}, [el('td', {text:String(st.n)}), el('td', {class:'mono small', text: st.before.map(i => hChipLabel(h.nodes[i])).join('  ')}),
        el('td', {text:hChipLabel(h.nodes[st.p])}), el('td', {text:hChipLabel(h.nodes[st.q])}), el('td', {text:String(h.nodes[st.r].f)})])))])]));
    wrap.appendChild(drawHuffForest(h.nodes, [h.root()], {codes:h.codes()}));
    wrap.appendChild(huffCodeTable(h));
    wrap.appendChild(el('p', {html:'(b) Huffman: <b>' + s.encoded + ' bits</b>. Fixed-length: ' + q.symbols.length + ' characters need ⌈lg ' + q.symbols.length + '⌉ = ' + s.fixedBits + ' bits each, so ' + s.chars + ' × ' + s.fixedBits + ' = <b>' + s.originalFixed + ' bits</b>.'}));
  }
  if (q.kind === 'dijkstra'){
    const st = new DijkstraState(paperGraph(q)); st.runAll();
    wrap.appendChild(dijTable(st, st.rows.length, st.circled.length));
    wrap.appendChild(finalPathsTable(st));
  }
  if (q.kind === 'kruskal'){
    const g = paperGraph(q);
    wrap.appendChild(kruskalTable(g));
    wrap.appendChild(graphFigure(g, {tree:kruskalSteps(g).F}, 'MST, total weight ' + kruskalSteps(g).total + '.'));
  }
  return wrap;
}

/* ---------- marking ---------- */
function mockInternals(tree){ return tree.nodes.filter(n => !n.leaf).sort((a, b) => b.path.length - a.path.length); }
function mockChildren(tree, n){
  const d = id => { const c = tree.nodes[id]; return c.leaf ? c.name : 'node ' + c.path; };
  return d(n.left) + ' + ' + d(n.right);
}
function blankDash(s){ const t = String(s || '').trim(); return !t || /^[-—–]$/.test(t); }

function gradeHuffReverse(q, ans){
  const ex = q.ex(), U = ex.unknown, tree = treeFromCodes(ex.rows, U);
  const internals = mockInternals(tree);
  let right = 0; const wrong = [];
  internals.forEach(n => {
    const v = parseW((ans.w || {})[n.path], U);
    if (v && v.k === n.w.k && v.x === n.w.x) right++;
    else wrong.push('node <span class="mono">' + (n.path || 'root') + '</span> (' + mockChildren(tree, n) + ') = <b>' + wText(n.w, U) + '</b>' + ((ans.w || {})[n.path] ? ' — you wrote ' + esc(ans.w[n.path]) : ' — left blank'));
  });
  const need = Math.ceil(internals.length * 2 / 3);
  const treeMarks = right === internals.length ? 2 : right >= need ? 1 : 0;
  const R = huffRanges(tree, ex.lo, ex.hi), O = R.ordered;
  const lo = Number(ans.lo), hi = Number(ans.hi);
  const isRange = arr => arr.length && String(ans.lo).trim() !== '' && lo === arr[0] && hi === arr[arr.length - 1];
  const oText = rangeText(O);
  let rangeMarks = 0, rangeNote;
  if (isRange(O)){ rangeMarks = 2; rangeNote = '✔ ' + oText + ' — the course-convention answer.'; }
  else if (q.lenient && isRange(R.strict)){ rangeMarks = 2; rangeNote = rangeText(R.strict) + ' is the <b>strict</b> reading (no ties relied on). Given 2 here — on the paper it only earns full marks if you stated that convention.'; }
  else if (q.lenient && isRange(R.unordered)){ rangeMarks = 2; rangeNote = rangeText(R.unordered) + ' is the <b>left/right ignored</b> reading. Given 2 here — on the paper it only earns full marks if you stated that convention.'; }
  else if (!q.lenient && isRange(R.strict)){ rangeMarks = 1; rangeNote = rangeText(R.strict) + ' is the strict reading: you left out the tie values. The question says equal weights may be removed in either order, so the ends count — answer <b>' + oText + '</b>. 1 mark for otherwise correct working.'; }
  else if (lo === O[0] || hi === O[O.length - 1]){
    rangeMarks = 1;
    rangeNote = 'One end right (answer: ' + oText + '). 1 mark for partly correct working.' +
      (!q.lenient && isRange(R.unordered) ? ' You ignored left/right — but the question fixes the smaller weight on the left.' : '');
  }
  else rangeNote = '✘ You gave ' + esc(ans.lo || '?') + ' to ' + esc(ans.hi || '?') + '. Answer: <b>' + oText + '</b>.' +
      (!q.lenient && isRange(R.unordered) ? ' That is the left/right-ignored reading, but the question fixes the smaller weight on the left.' : '');
  const convNote = !q.lenient ? '' : ans.conv ? ' <span class="subtle">Your stated convention: "' + esc(ans.conv) + '".</span>' : ' <span class="subtle">You did not write a convention — do on the real paper.</span>';
  const html = '<ul>' +
    '<li><b>Tree (' + treeMarks + ' / 2):</b> ' + right + ' of ' + internals.length + ' node weights right' + (wrong.length ? ':<ul><li>' + wrong.join('</li><li>') + '</li></ul>' : '.') +
      ' <span class="subtle">(my split: all right = 2, at least ' + need + ' = 1)</span></li>' +
    '<li><b>Range (' + rangeMarks + ' / 2):</b> ' + rangeNote + convNote + '</li></ul>';
  return {marks: treeMarks + rangeMarks, treeMarks, rangeMarks, html};
}

function gradeHuffBuild(q, ans){
  const h = new Huff(q.symbols).runAll(), codes = h.codes(), s = huffSizes(h);
  const typed = {}; q.symbols.forEach(([c]) => typed[c] = String((ans.codes || {})[c] || '').replace(/\s+/g, ''));
  const names = q.symbols.map(x => x[0]);
  const right = names.filter(c => typed[c] === codes[c]).length;
  const lensRight = names.every(c => /^[01]+$/.test(typed[c]) && typed[c].length === codes[c].length);
  const prefixFree = names.every(a => names.every(b => a === b || typed[b].indexOf(typed[a]) !== 0));
  let codeMarks, codeNote;
  if (right === names.length){ codeMarks = 2; codeNote = '✔ all ' + names.length + ' codes right.'; }
  else if (lensRight && prefixFree){ codeMarks = 1; codeNote = 'Every code has the right length, so your tree has the right shape — but some left/right choices differ from the convention the question set (smaller weight on the left).'; }
  else if (right * 2 >= names.length){ codeMarks = 1; codeNote = right + ' of ' + names.length + ' codes right.'; }
  else { codeMarks = 0; codeNote = right + ' of ' + names.length + ' codes right.'; }
  const wrongList = names.filter(c => typed[c] !== codes[c]).map(c => esc(c) + ' = <span class="mono">' + codes[c] + '</span>' + (typed[c] ? ' (you wrote ' + esc(typed[c]) + ')' : ' (blank)'));
  const bitsOk = Number(ans.bits) === s.encoded && String(ans.bits).trim() !== '';
  const fixedOk = Number(ans.fixed) === s.originalFixed && String(ans.fixed).trim() !== '';
  const html = '<ul>' +
    '<li><b>(a) Tree and codes (' + codeMarks + ' / 2):</b> ' + codeNote + (wrongList.length ? '<ul><li>' + wrongList.join('</li><li>') + '</li></ul>' : '') + ' <span class="subtle">(my split: all right = 2; right shape or at least half right = 1)</span></li>' +
    '<li><b>(b) Huffman bits (' + (bitsOk ? 1 : 0) + ' / 1):</b> ' + (bitsOk ? '✔ ' + s.encoded + '.' : '✘ Σ frequency × code length = <b>' + s.encoded + '</b>.' + (ans.bits ? ' You wrote ' + esc(ans.bits) + '.' : '')) + '</li>' +
    '<li><b>(b) Fixed-length bits (' + (fixedOk ? 1 : 0) + ' / 1):</b> ' + (fixedOk ? '✔ ' + s.originalFixed + '.' : '✘ ' + s.chars + ' characters × ' + s.fixedBits + ' bits = <b>' + s.originalFixed + '</b>.' + (ans.fixed ? ' You wrote ' + esc(ans.fixed) + '.' : '')) + '</li></ul>' +
    (!bitsOk && codeMarks < 2 ? '<p class="subtle">A human marker might give follow-through credit for a bit count that matches your own codes; this marker does not.</p>' : '');
  return {marks: codeMarks + (bitsOk ? 1 : 0) + (fixedOk ? 1 : 0), codeMarks, bitsOk, fixedOk, html};
}

function gradeDijkstra(q, ans){
  const g = paperGraph(q), ids = nodeIds(g), src = g.source;
  const st = new DijkstraState(g);
  let rowsRight = 0, chain = true;
  const notes = [];
  ans.rows.forEach((row, r) => {
    if (r > 0){
      if (!chain){ notes.push('Row ' + (r + 1) + ': not checked — an earlier row was circled wrongly, so the rows after it describe a different run.'); return; }
      const mins = st.minIds();
      if (mins.indexOf(row.label) < 0){
        chain = false;
        notes.push('Row ' + (r + 1) + ': ' + (row.label ? esc(row.label) + ' is not' : 'no vertex chosen — it should be') + ' the smallest entry in the row above' + (row.label ? '; it should be ' : ': ') + mins.map(esc).join(' or ') + '.');
        return;
      }
      st.choose(row.label); st.relax(row.label);
    }
    const expect = st.rows[st.rows.length - 1].cells, bad = [];
    ids.forEach(v => {
      const c = expect[v], inp = row.cells[v] || {};
      if (c.done){ if (!blankDash(inp.d) || !blankDash(inp.p)) bad.push(esc(v) + ' should be —'); return; }
      const d = parseDist(inp.d);
      let ok = d === c.d;
      if (ok) ok = c.d === Infinity ? blankDash(inp.p) : st.validPreds(v).indexOf(matchLabel(g, inp.p)) >= 0;
      if (!ok) bad.push(esc(v) + ' should be ' + dsup(c.d, c.p));
    });
    if (!bad.length) rowsRight++;
    else notes.push('Row ' + (r + 1) + ' (' + esc(r === 0 ? src : row.label) + '): ' + bad.join(', ') + '.');
  });
  const full = new DijkstraState(g); full.runAll();
  const others = ids.filter(v => v !== src);
  const distOk = others.every(v => parseDist((ans.fin[v] || {}).d) === full.dist[v]);
  const pathOkAll = others.every(v => dijPathOk(g, full, v, (ans.fin[v] || {}).path));
  const need = Math.ceil(ans.rows.length / 2);
  const tableMarks = rowsRight === ans.rows.length ? 2 : rowsRight >= need ? 1 : 0;
  const marks = tableMarks + (distOk ? 1 : 0) + (pathOkAll ? 1 : 0);
  const html = '<ul>' +
    '<li><b>Working table (' + tableMarks + ' / 2):</b> ' + rowsRight + ' of ' + ans.rows.length + ' rows right' + (notes.length ? ':<ul><li>' + notes.join('</li><li>') + '</li></ul>' : '.') + ' <span class="subtle">(my split: all rows = 2, at least ' + need + ' = 1)</span></li>' +
    '<li><b>Distances (' + (distOk ? 1 : 0) + ' / 1):</b> ' + (distOk ? '✔ all right.' : '✘ should be ' + others.map(v => v + ' = ' + full.dist[v]).join(', ') + '.') + '</li>' +
    '<li><b>Paths (' + (pathOkAll ? 1 : 0) + ' / 1):</b> ' + (pathOkAll ? '✔ all right.' : '✘ should be ' + others.map(v => full.pathTo(v).join('→')).join(', ') + '.') + '</li></ul>';
  return {marks, tableMarks, distOk, pathOkAll, rowsRight, html};
}

/* Kruskal trace: each filled row must be a lightest not-yet-considered edge (ties in any
   order) with the right decision; rows after the tree is finished are ignored */
function gradeKruskalTrace(q, ans){
  const g = paperGraph(q), st = kruskalState(g), n = g.nodes.length, seen = {}, notes = [];
  const expected = kruskalSteps(g);
  let rowsRight = 0, ok = true, extra = 0;
  for (let r = 0; r < ans.rows.length; r++){
    const row = ans.rows[r];
    const filled = row.e !== '' && row.e != null;
    if (st.F.length === n - 1){ if (filled) extra++; continue; }
    if (!filled){ ok = false; notes.push('Step ' + (r + 1) + ' is blank, but the tree is not finished (' + st.F.length + ' of ' + (n - 1) + ' edges).'); break; }
    const e = st.order.find(x => String(x.i) === String(row.e));
    if (seen[e.i]){ ok = false; notes.push('Step ' + (r + 1) + ': ' + esc(eStr(e.u, e.v)) + ' was already considered.'); break; }
    const m = Math.min.apply(null, st.order.filter(x => !seen[x.i]).map(x => x.w));
    if (e.w > m){
      const lighter = st.order.filter(x => !seen[x.i] && x.w === m);
      ok = false; notes.push('Step ' + (r + 1) + ': ' + esc(eStr(e.u, e.v, e.w)) + ' is out of order — ' + lighter.map(x => esc(eStr(x.u, x.v, x.w))).join(', ') + ' should be considered first (nondecreasing weight).'); break;
    }
    const want = st.sets[e.u] !== st.sets[e.v] ? 'add' : 'skip';
    if (row.d !== want){
      ok = false;
      notes.push('Step ' + (r + 1) + ': ' + esc(eStr(e.u, e.v, e.w)) + ' should be ' + (want === 'add' ? '<b>added</b> — its ends are in different subsets' : '<b>rejected</b> — ' + esc(e.u) + ' and ' + esc(e.v) + ' are already connected, so it would make a cycle') + '.');
      break;
    }
    seen[e.i] = true;
    if (want === 'add') kMerge(st, e);
    rowsRight++;
  }
  const done = ok && st.F.length === n - 1;
  const need = Math.ceil(expected.steps.length / 2);
  const traceMarks = done ? 2 : rowsRight >= need ? 1 : 0;
  const totOk = String(ans.total).trim() !== '' && Number(ans.total) === expected.total;
  const html = '<ul>' +
    '<li><b>Trace (' + traceMarks + ' / 2):</b> ' + (done ? '✔ every edge considered in order with the right decision (' + rowsRight + ' steps).' : rowsRight + ' step' + (rowsRight === 1 ? '' : 's') + ' right' + (notes.length ? ':<ul><li>' + notes.join('</li><li>') + '</li></ul>' : '.')) +
      (extra ? ' <span class="subtle">(' + extra + ' row' + (extra > 1 ? 's' : '') + ' after the tree was finished — not needed, not penalised.)</span>' : '') +
      ' <span class="subtle">(my split: complete = 2, at least ' + need + ' steps = 1)</span></li>' +
    '<li><b>Total (' + (totOk ? 1 : 0) + ' / 1):</b> ' + (totOk ? '✔ ' + expected.total + '.' : '✘ the MST weighs <b>' + expected.total + '</b>.') + '</li></ul>';
  return {marks: traceMarks + (totOk ? 1 : 0), traceMarks, totOk, rowsRight, html};
}

/* score an attempt: auto marks per question, self-marks per written part (null = not confirmed) */
function paperScore(P, a){
  const out = {byQ:{}, auto:0, autoMax:0, total:0, complete:true};
  P.qs.forEach(q => {
    if (AUTO_KINDS[q.kind]){
      const m = gradeAuto(q, a.ans[q.id]).marks;
      out[q.id] = m; out.byQ[q.id] = m; out.auto += m; out.autoMax += q.marks; out.total += m;
    }
  });
  const s = a.self || {};
  paperParts(P).forEach(p => {
    const st = s[p.key];
    const v = st && st.marked ? writtenScore(p.item(), st) : null;
    out[p.key] = v;
    if (v == null) out.complete = false; else out.total += v;
  });
  P.qs.filter(q => !AUTO_KINDS[q.kind]).forEach(q => {
    const keys = paperParts(P).filter(p => p.q === q).map(p => p.key);
    out.byQ[q.id] = keys.some(k => out[k] == null) ? null : keys.reduce((t, k) => t + out[k], 0);
  });
  return out;
}
