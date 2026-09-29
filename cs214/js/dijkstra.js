/* ============================================================
   CS214 Revise — Dijkstra: algorithm, the lecturer's table, and
   three activities (step-through, do-it-yourself, fill-in table).

   The algorithm follows Lec 9.2's pseudocode (Y, F, "select a
   vertex from V − Y that has a shortest path from v1 using only
   vertices in Y as intermediates"). The table follows the
   lecturer's handwritten method (Lec 9.2 slide 7): one row per
   vertex added to Y, one column per vertex, each entry written
   distance^predecessor, the row minimum circled, "—" once a vertex
   is in Y.

   Ties: the course states no tie rule. We accept any tied
   minimum, and for equal-length alternatives we accept either
   predecessor (the pseudocode only replaces on "strictly shorter",
   so the walkthroughs keep the old one).
   ============================================================ */

class DijkstraState {
  constructor(g){
    this.g = g; this.ids = nodeIds(g); this.s = g.source;
    this.dist = {}; this.pred = {}; this.alt = {};
    this.Y = [this.s]; this.F = [];
    this.rows = []; this.circled = [];
    this.updates = 0; this.ties = 0;
    const cells = {};
    this.ids.forEach(v => {
      this.alt[v] = [];
      if (v === this.s){ this.dist[v] = 0; this.pred[v] = null; cells[v] = {done:true}; return; }
      const w = gW(g, this.s, v);
      this.dist[v] = w; this.pred[v] = w < Infinity ? this.s : null;
      cells[v] = {d:w, p:this.pred[v], calc: w < Infinity ? {from:this.s, base:0, w, cand:w, first:true, better:true} : null, first:true};
    });
    this.rows.push({label:this.s, cells});
  }
  inY(v){ return this.Y.indexOf(v) >= 0; }
  remaining(){ return this.ids.filter(v => !this.inY(v)); }
  minIds(){
    const rem = this.remaining(); if (!rem.length) return [];
    const m = Math.min.apply(null, rem.map(v => this.dist[v]));
    if (m === Infinity) return [];
    return rem.filter(v => this.dist[v] === m);
  }
  finished(){ return this.minIds().length === 0; }
  validPreds(v){ return [this.pred[v]].concat(this.alt[v]); }
  /* circle u in the last row; u joins Y and its edge joins F */
  choose(u){
    this.circled[this.rows.length - 1] = u;
    this.Y.push(u);
    this.F.push([this.pred[u], u]);
  }
  /* write the next row: every vertex not in Y, checked against the edge from u */
  relax(u){
    const cells = {}, du = this.dist[u];
    this.ids.forEach(v => {
      if (this.inY(v)){ cells[v] = {done:true}; return; }
      const w = gW(this.g, u, v);
      if (w === Infinity){ cells[v] = {d:this.dist[v], p:this.pred[v], calc:null}; return; }
      const old = this.dist[v], oldP = this.pred[v], cand = du + w;
      const better = cand < old, tie = cand === old;
      if (better){ if (old < Infinity) this.updates++; this.dist[v] = cand; this.pred[v] = u; this.alt[v] = []; }
      else if (tie){ this.alt[v].push(u); }
      cells[v] = {d:this.dist[v], p:this.pred[v], calc:{from:u, base:du, w, cand, better, tie, old, oldP}};
    });
    this.rows.push({label:u, cells});
  }
  runAll(){
    while (!this.finished()){
      const m = this.minIds();
      if (m.length > 1) this.ties++;
      this.choose(m[0]); this.relax(m[0]);
    }
    return {dist:this.dist, updates:this.updates, ties:this.ties};
  }
  pathTo(v){
    if (this.dist[v] === Infinity) return null;
    const p = [v]; let c = v, guard = 0;
    while (c !== this.s && guard++ < 50){ c = this.pred[c]; p.unshift(c); }
    return p;
  }
}

/* ---------- notation setting ----------
   ON (default): superscripts exactly as the lecturer writes them — 7¹, not 7ᵛ¹
   (a "v" in front of a numeric vertex name is dropped). Letter names (W, A…) are unchanged.
   app.js loads/saves the choice; onDijNotationChange is set by app.js. */
let DIJ_LECT = true;
let onDijNotationChange = null;
function setDijNotation(v){ DIJ_LECT = !!v; }
function supLabel(p){ return DIJ_LECT ? String(p).replace(/^v(?=\d+$)/i, '') : String(p); }
function notationToggle(repaint){
  const box = el('input', {type:'checkbox'});
  box.checked = DIJ_LECT;
  box.addEventListener('change', () => {
    setDijNotation(box.checked);
    if (onDijNotationChange) onDijNotationChange(box.checked);
    repaint();
  });
  return el('label', {title:'Show entries as distance with the predecessor as a superscript, e.g. 7¹'}, [box, document.createTextNode('Lecturer\'s notation (7¹)')]);
}

/* ---------- small formatting helpers ---------- */
function dsup(d, p){ return d === Infinity ? '∞' : d + (p != null ? '<sup>' + esc(supLabel(p)) + '</sup>' : ''); }
function setStr(arr){ return '{' + arr.join(', ') + '}'; }
function edgeStr(e){ return '(' + e[0] + ', ' + e[1] + ')'; }
function parseDist(s){
  const t = String(s || '').trim().toLowerCase();
  if (!t) return NaN;
  if (/^(∞|inf|infinity|oo|∝)$/.test(t)) return Infinity;
  return /^-?\d+(\.\d+)?$/.test(t) ? Number(t) : NaN;
}

/* ---------- the lecturer's table ----------
   nRows: how many rows to show; nCirc: rows whose circle is visible;
   input: optional fn(v, cell) → element, used for the row being filled in */
function dijTable(st, nRows, nCirc, opts){
  opts = opts || {};
  const ids = st.ids;
  const head = el('tr', {}, [el('th', {class:'rowh', text:'Added'})].concat(ids.map(v => el('th', {text:v}))));
  const body = [];
  for (let r = 0; r < nRows; r++){
    const row = st.rows[r];
    const tr = el('tr', {class: r === opts.curRow ? 'cur' : ''});
    tr.appendChild(el('td', {class:'rowh', text: row.label}));
    ids.forEach(v => {
      const c = row.cells[v];
      if (opts.inputRow === r && !c.done){ tr.appendChild(opts.input(v, c)); return; }
      const td = el('td');
      if (c.done){ td.appendChild(el('span', {class:'dash', text:'—'})); tr.appendChild(td); return; }
      if (opts.calc !== false && c.calc && !c.calc.first){
        const k = c.calc;
        const txt = k.base + '+' + k.w + (k.better ? '' : '=' + k.cand + (k.tie ? ' =' : ' ✗'));
        td.appendChild(el('span', {class:'calc' + (k.better ? '' : k.tie ? ' tie' : ' no'), text: txt,
          title: k.better ? 'Shorter: replaces the value above' : k.tie ? 'Same length: the old value stays (either is a shortest path)' : 'Not shorter: the old value stays'}));
      }
      const val = el('span', {class: c.calc && c.calc.better && !c.calc.first ? 'upd' : '', html: dsup(c.d, c.p)});
      if (r < nCirc && st.circled[r] === v) td.appendChild(el('span', {class:'circ'}, [val]));
      else td.appendChild(val);
      tr.appendChild(td);
    });
    body.push(tr);
  }
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'dij'}, [el('thead', {}, [head]), el('tbody', {}, body)])]);
}

function finalPathsTable(st){
  const rows = st.ids.filter(v => v !== st.s).map(v => {
    const p = st.pathTo(v);
    return el('tr', {}, [
      el('td', {text: v}),
      el('td', {text: fmtW(st.dist[v])}),
      el('td', {text: p ? p.join(' → ') : 'no path'})
    ]);
  });
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {}, [
    el('thead', {}, [el('tr', {}, [el('th', {text:'To'}), el('th', {text:'Shortest distance'}), el('th', {text:'Path from ' + st.s})])]),
    el('tbody', {}, rows)
  ])]);
}

function distLabels(st, dist, pred, Y){
  const out = {};
  st.ids.forEach(v => {
    const inY = Y.indexOf(v) >= 0;
    out[v] = dist[v] === Infinity ? {text:'∞'} : {text:String(dist[v]), sup: pred[v] ? supLabel(pred[v]) : '', final: inY};
  });
  return out;
}
function mapOf(arr){ const m = {}; arr.forEach(x => m[x] = true); return m; }
function edgesFrom(g, u, targets){
  return targets.filter(v => gW(g, u, v) < Infinity).map(v => [u, v]);
}

/* the "why this vertex?" / "why not that one?" wording, shared by DIY and the table */
function whyWrongVertex(st, v){
  const mins = st.minIds(), m = mins[0];
  if (st.dist[v] === Infinity)
    return '<b>' + esc(v) + '</b> is still ∞ — there is no path to it yet that uses only vertices in Y as intermediates. ' +
           'The smallest entry is <b>' + esc(m) + '</b> = ' + dsup(st.dist[m], st.pred[m]) + '.';
  return '<b>' + esc(v) + '</b> is ' + dsup(st.dist[v], st.pred[v]) + ', but <b>' + esc(m) + '</b> is ' + dsup(st.dist[m], st.pred[m]) +
         ' — smaller. Dijkstra\'s selection procedure always takes the smallest distance; ' + esc(v) + ' might still get shorter later (maybe through ' + esc(m) + ').';
}
function whyRightVertex(st, u){
  const mins = st.minIds();
  let s = '<b>' + esc(u) + '</b> = ' + dsup(st.dist[u], st.pred[u]) + ' is the smallest entry among the vertices not in Y';
  if (mins.length > 1) s += ' (tied with ' + mins.filter(x => x !== u).map(esc).join(', ') + ' — the course states no tie rule, so either is fine)';
  return s + '. Its distance is now final.';
}
function relaxNarration(st, u){
  const row = st.rows[st.rows.length - 1];
  const items = [];
  st.ids.forEach(v => {
    const c = row.cells[v];
    if (c.done) return;
    const k = c.calc;
    if (!k){ items.push('<b>' + esc(v) + '</b>: no edge ' + esc(u) + (st.g.directed ? '→' : '–') + esc(v) + ', so copy ' + dsup(c.d, c.p) + ' down.'); return; }
    const sum = k.base + ' + ' + k.w + ' = ' + k.cand;
    if (k.better) items.push('<b>' + esc(v) + '</b>: ' + sum + (k.old === Infinity ? ' (was ∞)' : ' &lt; ' + k.old) + ' → <b>' + dsup(c.d, c.p) + '</b>');
    else if (k.tie) items.push('<b>' + esc(v) + '</b>: ' + sum + ' = ' + k.old + ' — same length, keep ' + dsup(c.d, c.p) + ' (' + esc(u) + ' would be an equally short route)');
    else items.push('<b>' + esc(v) + '</b>: ' + sum + ' is not shorter than ' + k.old + ' — keep ' + dsup(c.d, c.p));
  });
  return items;
}

/* ---------- graph picker shared by the three activities ---------- */
function presetPicker(current, onChange, withRandom){
  const sel = el('select', {class:'sel', 'aria-label':'Choose a graph'});
  Object.keys(GRAPH_PRESETS).forEach(k => {
    const p = GRAPH_PRESETS[k];
    sel.appendChild(el('option', {value:k, text: '[' + PRESET_TAG_LABEL[p.tag] + '] ' + p.name}));
  });
  if (withRandom){
    sel.appendChild(el('option', {value:'random-d', text:'[Extra practice] New random directed graph'}));
    sel.appendChild(el('option', {value:'random-u', text:'[Extra practice] New random undirected graph'}));
  }
  sel.appendChild(el('option', {value:'custom', text:'Your edited graph', hidden:'hidden'}));
  sel.value = current;
  sel.addEventListener('change', () => onChange(sel.value));
  return sel;
}
function graphFor(key){
  if (key === 'random-d') return randomGraph({directed:true});
  if (key === 'random-u') return randomGraph({directed:false});
  return presetGraph(key);
}
function graphNote(g){
  const tag = g.tag || 'extra';
  return el('p', {class:'src'}, [
    el('span', {class:'badge ' + tag, text: PRESET_TAG_LABEL[tag] || 'Extra practice'}),
    document.createTextNode((g.note || '') + ' ' + (g.directed ? 'Directed' : 'Undirected') + ', source ' + g.source + '.')
  ]);
}

/* ============================================================
   1) Step-through visualiser
   ============================================================ */
function dijSteps(g){
  const st = new DijkstraState(g);
  const steps = [];
  const snap = (kind, extra) => steps.push(Object.assign({
    kind, nRows: st.rows.length, nCirc: st.circled.length,
    Y: st.Y.slice(), F: st.F.map(e => e.slice()),
    dist: Object.assign({}, st.dist), pred: Object.assign({}, st.pred)
  }, extra));

  const firstEdges = edgesFrom(g, st.s, st.remaining());
  snap('init', { nCirc: 0, cur: st.s, cand: firstEdges,
    html: '<p><b>Start.</b> Y = {' + esc(st.s) + '}, F = ∅. Fill the first row: every vertex with a direct edge from ' + esc(st.s) +
          ' gets that weight, with superscript ' + esc(st.s) + ' ("reached from ' + esc(st.s) + '"). No direct edge → ∞.</p>' });

  let guard = 0;
  while (guard++ < 40){
    const mins = st.minIds();
    if (!mins.length){
      if (st.remaining().length)
        snap('stuck', { html:'<p><b>Stop.</b> Everything left (' + st.remaining().map(esc).join(', ') + ') is ∞: there is no path from ' +
          esc(st.s) + ' to ' + (st.remaining().length > 1 ? 'them' : 'it') + '. The algorithm ends with those vertices unreachable.</p>' });
      break;
    }
    const u = mins[0];
    const why = whyRightVertex(st, u);
    const p = st.pred[u];
    st.choose(u);
    snap('select', { nRows: st.rows.length, nCirc: st.rows.length, cur: u, cand: [],
      html: '<p><b>Selection.</b> Circle the smallest entry in row ' + esc(st.rows[st.rows.length-1].label) + ': ' + why + '</p>' +
            '<p>Add ' + esc(u) + ' to Y and the edge ' + edgeStr([p, u]) + ' to F.</p>' });
    st.relax(u);
    if (!st.remaining().length){
      snap('done', { cur: null, cand: [],
        html: '<p><b>Solution check: Y = V</b>, so the instance is solved. The last row is all dashes — every vertex is in Y. ' +
              'F holds the ' + st.F.length + ' edges of the shortest paths. Read each path by following the superscripts backwards.</p>' });
      break;
    }
    const items = relaxNarration(st, u);
    snap('relax', { nCirc: st.rows.length - 1, cur: u, cand: edgesFrom(g, u, st.remaining()),
      html: '<p><b>New row ' + esc(u) + '.</b> Only paths through Y are allowed, and ' + esc(u) + ' has just joined Y, so check every edge leaving ' + esc(u) + ' (dashed):</p><ul><li>' + items.join('</li><li>') + '</li></ul>' });
  }
  return {st, steps};
}

function renderDijVisualiser(opts, onDone){
  let key = opts.preset || 'lecture92';
  let g = graphFor(key);
  let run, idx = 0, showMatrix = false;

  const root = el('div', {class:'no-gloss'});
  const picker = presetPicker(key, k => { key = k; g = graphFor(k); editText.value = graphToText(g); dirBox.checked = g.directed; rebuild(); }, true);
  const srcSel = el('select', {class:'sel', 'aria-label':'Source vertex'});
  srcSel.addEventListener('change', () => { g.source = srcSel.value; rebuild(); });
  const matBtn = el('button', {class:'btn sec', type:'button', text:'Show matrix'});
  matBtn.addEventListener('click', () => { showMatrix = !showMatrix; matBtn.textContent = showMatrix ? 'Hide matrix' : 'Show matrix'; paint(); });

  // editor
  const editText = el('textarea', {spellcheck:'false', 'aria-label':'Edge list'});
  editText.value = graphToText(g);
  const dirBox = el('input', {type:'checkbox'}); dirBox.checked = g.directed;
  const editErr = el('div', {class:'err'});
  const applyBtn = el('button', {class:'btn', type:'button', text:'Use this graph'});
  applyBtn.addEventListener('click', () => {
    const r = textToGraph(editText.value, dirBox.checked, g);
    if (r.error){ editErr.textContent = r.error; return; }
    editErr.textContent = ''; g = r.g; key = 'custom'; picker.value = 'custom'; rebuild();
  });
  const editor = el('details', {class:'fold editbox'}, [
    el('summary', {}, [el('span', {class:'fold-title', text:'Edit this graph'})]),
    el('div', {class:'fold-body'}, [
      el('p', {class:'subtle', html:'One edge per line: <code>from to weight</code> (e.g. <code>A B 3</code>). Weights must be ≥ 0. Up to 9 vertices. You can also drag vertices on the picture to tidy it.'}),
      editText,
      el('div', {class:'btnrow'}, [el('label', {class:'subtle'}, [dirBox, document.createTextNode(' Directed (arrows)')]), applyBtn]),
      editErr
    ])
  ]);

  const figHost = el('div'), noteHost = el('div'), matHost = el('div');
  const narr = el('div', {class:'narr', 'aria-live':'polite'});
  const sets = el('div', {class:'sets'});
  const tableHost = el('div'), finalHost = el('div');
  const counter = el('span', {class:'stepctr'});
  const bFirst = el('button', {class:'btn sec', type:'button', text:'⏮ Start'});
  const bBack  = el('button', {class:'btn sec', type:'button', text:'◀ Back'});
  const bNext  = el('button', {class:'btn', type:'button', text:'Next ▶'});
  const bEnd   = el('button', {class:'btn sec', type:'button', text:'Run to end ⏭'});
  bFirst.addEventListener('click', () => { idx = 0; paint(); });
  bBack.addEventListener('click', () => { if (idx > 0){ idx--; paint(); } });
  bNext.addEventListener('click', () => { if (idx < run.steps.length - 1){ idx++; paint(); } });
  bEnd.addEventListener('click', () => { idx = run.steps.length - 1; paint(); });

  root.appendChild(el('div', {class:'ctrl'}, [picker, el('label', {}, [document.createTextNode('Source'), srcSel]), matBtn, notationToggle(() => paint())]));
  root.appendChild(noteHost);
  root.appendChild(editor);
  root.appendChild(figHost);
  root.appendChild(matHost);
  root.appendChild(el('div', {class:'ctrl'}, [bFirst, bBack, bNext, bEnd, counter]));
  root.appendChild(narr);
  root.appendChild(sets);
  root.appendChild(el('div', {class:'prompt', text:'The table (lecturer\'s format)'}));
  root.appendChild(tableHost);
  root.appendChild(finalHost);

  function rebuild(){
    srcSel.innerHTML = '';
    g.nodes.forEach(n => srcSel.appendChild(el('option', {value:n.id, text:n.id})));
    srcSel.value = g.source;
    run = dijSteps(g); idx = 0; paint();
  }
  function paint(){
    const s = run.steps[idx], st = run.st;
    noteHost.innerHTML = ''; noteHost.appendChild(graphNote(g));
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {
      inY: mapOf(s.Y), cur: s.cur, tree: s.F, cand: s.cand,
      dist: distLabels(st, s.dist, s.pred, s.Y),
      draggable: true, onMoved: () => {}
    }, 'Blue fill = in Y (final). Solid blue edges = F. Dashed = edges being checked. Small label beside a vertex = its distance so far, superscript = where it came from.'));
    matHost.innerHTML = '';
    if (showMatrix){
      matHost.appendChild(el('p', {class:'subtle', text:'Adjacency matrix W (Lec 9.2 slide 6 starts here): row = from, column = to, ∞ = no edge.'}));
      matHost.appendChild(matrixTable(g));
    }
    narr.innerHTML = s.html;
    narr.className = 'narr' + (s.kind === 'done' ? ' good' : '');
    // sets + priority-queue view
    const rem = st.ids.filter(v => s.Y.indexOf(v) < 0)
      .sort((a, b) => (s.dist[a] - s.dist[b]) || (st.ids.indexOf(a) - st.ids.indexOf(b)));
    const minD = rem.length ? s.dist[rem[0]] : Infinity;
    sets.innerHTML = '';
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Y (done)'}), document.createTextNode(setStr(s.Y))]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'F (edges kept)'}), document.createTextNode(s.F.length ? setStr(s.F.map(edgeStr)) : '∅')]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Not in Y, smallest first (priority-queue view)'}),
      rem.length ? el('div', {class:'pq'}, rem.map(v => el('span', {
        class: (s.kind === 'init' || s.kind === 'relax') && s.dist[v] === minD && minD < Infinity ? 'min' : '',
        html: esc(v) + ' ' + dsup(s.dist[v], s.pred[v])
      }))) : document.createTextNode('empty')]));
    tableHost.innerHTML = '';
    tableHost.appendChild(dijTable(st, s.nRows, s.nCirc, {curRow: s.kind === 'relax' || s.kind === 'init' ? s.nRows - 1 : -1}));
    finalHost.innerHTML = '';
    if (s.kind === 'done' || s.kind === 'stuck'){
      finalHost.appendChild(el('div', {class:'prompt', text:'Final answer (what Test 2 Q4 asks for: distance and path)'}));
      finalHost.appendChild(finalPathsTable(st));
    }
    counter.textContent = 'Step ' + (idx + 1) + ' of ' + run.steps.length;
    bBack.disabled = bFirst.disabled = idx === 0;
    bNext.disabled = bEnd.disabled = idx === run.steps.length - 1;
    if (idx === run.steps.length - 1 && onDone) onDone();
  }
  rebuild();
  return root;
}

/* ============================================================
   2) Do it yourself: pick the next vertex, then its edge
   ============================================================ */
function renderDijDIY(opts, onDone){
  let key = opts.preset || 'lecture92';
  let g, st, phase, chosen, mistakes, hideDist = false, flash = {}, doneReported = false;
  const root = el('div', {class:'no-gloss'});
  const picker = presetPicker(key, k => { key = k; start(); }, true);
  const hideBox = el('input', {type:'checkbox'});
  hideBox.addEventListener('change', () => { hideDist = hideBox.checked; paint(); });
  const restart = el('button', {class:'btn sec', type:'button', text:'Restart'});
  restart.addEventListener('click', () => start(true));
  const noteHost = el('div'), figHost = el('div'), promptHost = el('div'), narr = el('div', {class:'narr', 'aria-live':'polite'});
  const tableHost = el('div'), statusHost = el('div', {class:'subtle'});
  root.appendChild(el('div', {class:'ctrl'}, [picker, restart,
    el('label', {}, [hideBox, document.createTextNode('Hide distances (harder — work them out yourself)')]),
    notationToggle(() => paint())]));
  root.appendChild(noteHost); root.appendChild(figHost); root.appendChild(promptHost);
  root.appendChild(narr); root.appendChild(statusHost); root.appendChild(tableHost);

  function start(same){
    if (!same || !g) g = graphFor(key);
    else g = cloneGraph(g);
    st = new DijkstraState(g); phase = 'vertex'; chosen = null; mistakes = 0; flash = {};
    narr.className = 'narr';
    narr.innerHTML = '<p>Y = {' + esc(st.s) + '}. The first row is filled in for you (direct edges from ' + esc(st.s) + '). Your job: choose each next vertex, then the edge that joins F.</p>';
    paint();
  }
  function paint(){
    noteHost.innerHTML = ''; noteHost.appendChild(graphNote(g));
    figHost.innerHTML = '';
    const pickable = phase === 'vertex' ? mapOf(st.remaining()) : {};
    figHost.appendChild(graphFigure(g, {
      inY: mapOf(st.Y), tree: st.F, cur: chosen, mark: flash,
      cand: phase === 'edge' ? st.Y.filter(x => gW(g, x, chosen) < Infinity).map(x => [x, chosen]) : [],
      dist: hideDist ? null : distLabels(st, st.dist, st.pred, st.Y),
      pickable, onPick: pickVertex
    }, phase === 'vertex' ? 'Tap a vertex (or use the buttons) to choose the next one for Y.' : null));
    promptHost.innerHTML = '';
    if (phase === 'vertex'){
      promptHost.appendChild(el('div', {class:'prompt', text:'Which vertex joins Y next?'}));
      promptHost.appendChild(el('div', {class:'pickrow'}, st.remaining().map(v => {
        const b = el('button', {class:'pickbtn' + (flash[v] ? ' ' + flash[v] : ''), type:'button', text:v});
        b.addEventListener('click', () => pickVertex(v)); return b;
      })));
    } else if (phase === 'edge'){
      promptHost.appendChild(el('div', {class:'prompt', html:'Which edge joins F — the last edge on ' + esc(chosen) + '\'s shortest path?'}));
      promptHost.appendChild(el('div', {class:'pickrow'}, st.Y.filter(x => gW(g, x, chosen) < Infinity).map(x => {
        const b = el('button', {class:'pickbtn', type:'button', text: '(' + x + ', ' + chosen + ')  w=' + gW(g, x, chosen)});
        b.addEventListener('click', () => pickEdge(x, b)); return b;
      })));
    } else {
      promptHost.appendChild(el('div', {class:'prompt', text:'Finished.'}));
      promptHost.appendChild(finalPathsTable(st));
      const again = el('button', {class:'btn', type:'button', text:'Try a new random graph'});
      again.addEventListener('click', () => { key = 'random-d'; picker.value = key; start(); });
      promptHost.appendChild(el('div', {class:'btnrow'}, [again]));
    }
    statusHost.textContent = 'Mistakes so far: ' + mistakes;
    tableHost.innerHTML = '';
    if (!hideDist){
      tableHost.appendChild(el('div', {class:'prompt', text:'The table so far'}));
      tableHost.appendChild(dijTable(st, st.rows.length, st.circled.length));
    }
  }
  function pickVertex(v){
    if (phase !== 'vertex') return;
    const mins = st.minIds();
    flash = {};
    if (mins.indexOf(v) >= 0){
      flash[v] = 'ok';
      narr.className = 'narr good';
      narr.innerHTML = '<p>✔ ' + whyRightVertex(st, v) + '</p><p>Now pick the edge that goes into F.</p>';
      chosen = v; phase = 'edge';
    } else {
      mistakes++; flash[v] = 'no';
      narr.className = 'narr bad';
      narr.innerHTML = '<p>✘ ' + whyWrongVertex(st, v) + '</p>';
    }
    paint();
  }
  function pickEdge(x, btn){
    const u = chosen, w = gW(g, x, u);
    const ok = st.validPreds(u).indexOf(x) >= 0;
    if (!ok){
      mistakes++;
      narr.className = 'narr bad';
      const p = st.pred[u];
      narr.innerHTML = '<p>✘ Going through ' + esc(x) + ' costs ' + st.dist[x] + ' + ' + w + ' = ' + (st.dist[x] + w) +
        ', but ' + esc(u) + '\'s shortest distance is ' + st.dist[u] + ', via ' + esc(p) + ' (' + st.dist[p] + ' + ' + gW(g, p, u) + '). ' +
        'F must hold the edge on the <i>shortest</i> path — the superscript tells you which vertex it comes from.</p>';
      btn.classList.add('no'); btn.disabled = true;
      statusHost.textContent = 'Mistakes so far: ' + mistakes;
      return;
    }
    // accept; if the user chose an equal-length alternative, record that edge instead
    st.pred[u] = x;
    st.choose(u); st.relax(u);
    const items = st.remaining().length ? relaxNarration(st, u) : [];
    flash = {}; chosen = u;
    narr.className = 'narr good';
    narr.innerHTML = '<p>✔ Edge ' + edgeStr([x, u]) + ' joins F (' + st.dist[x] + ' + ' + w + ' = ' + st.dist[u] + ').</p>' +
      (items.length ? '<p>Next row ' + esc(u) + ' — the edges leaving ' + esc(u) + ':</p><ul><li>' + items.join('</li><li>') + '</li></ul>' : '');
    if (st.finished()){
      phase = 'done';
      const unreach = st.remaining();
      narr.innerHTML += '<p><b>' + (unreach.length ? 'Stop — ' + unreach.map(esc).join(', ') + ' cannot be reached (∞).' : 'Y = V — solved.') +
        '</b> ' + (mistakes ? mistakes + ' mistake' + (mistakes > 1 ? 's' : '') + ' this run.' : 'No mistakes!') + '</p>';
      if (!doneReported && onDone){ doneReported = true; onDone(mistakes); }
    } else phase = 'vertex';
    paint();
  }
  start();
  return root;
}

/* ============================================================
   3) Fill-in table: write each row yourself, circle the minimum,
      then give the final distances and paths (like Q4)
   ============================================================ */
function renderDijTableDrill(opts, onDone){
  let key = opts.preset || 'lecture92';
  let g, st, phase, mistakes, reveals, inputs, marks, doneReported = false;
  const root = el('div', {class:'no-gloss'});
  const picker = presetPicker(key, k => { key = k; start(); }, true);
  const restart = el('button', {class:'btn sec', type:'button', text:'Restart'});
  restart.addEventListener('click', () => start(true));
  const noteHost = el('div'), figHost = el('div'), tableHost = el('div'), actHost = el('div');
  const narr = el('div', {class:'narr', 'aria-live':'polite'});
  root.appendChild(el('div', {class:'ctrl'}, [picker, restart, notationToggle(() => repaintKeepInputs())]));
  root.appendChild(noteHost); root.appendChild(figHost);
  root.appendChild(el('p', {class:'subtle', html:'Type each entry as a distance plus the small superscript box for the vertex it came from (like 7<sup>1</sup>). Use <b>∞</b> or <b>inf</b> with an empty superscript for "no path yet". Vertices already in Y are shown as —.'}));
  root.appendChild(tableHost); root.appendChild(actHost); root.appendChild(narr);

  function start(same){
    if (!same || !g) g = graphFor(key); else g = cloneGraph(g);
    st = new DijkstraState(g); phase = 'row'; mistakes = 0; reveals = 0; marks = {};
    narr.className = 'narr';
    narr.innerHTML = '<p>Row ' + esc(st.s) + ' first: Y = {' + esc(st.s) + '}, so only direct edges from ' + esc(st.s) + ' count.</p>';
    paint();
  }
  function curRow(){ return st.rows.length - 1; }
  function repaintKeepInputs(){
    const saved = {};
    Object.keys(inputs || {}).forEach(v => saved[v] = [inputs[v].d.value, inputs[v].p.value, inputs[v].d.className, inputs[v].p.className]);
    const finals = [...actHost.querySelectorAll('input')].map(i => [i.value, i.className]);
    paint();
    Object.keys(saved).forEach(v => { if (inputs[v]){ [inputs[v].d.value, inputs[v].p.value, inputs[v].d.className, inputs[v].p.className] = saved[v]; } });
    if (phase === 'final') [...actHost.querySelectorAll('input')].forEach((i, k) => { if (finals[k]){ i.value = finals[k][0]; i.className = finals[k][1]; } });
  }
  function paint(){
    noteHost.innerHTML = ''; noteHost.appendChild(graphNote(g));
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {inY: mapOf(st.Y), tree: st.F}, null));
    inputs = {};
    const r = curRow();
    tableHost.innerHTML = '';
    tableHost.appendChild(dijTable(st, st.rows.length, st.circled.length, {
      curRow: phase === 'row' || phase === 'circle' ? r : -1,
      inputRow: phase === 'row' ? r : -1,
      input: (v) => {
        const d = el('input', {class:'din', type:'text', inputmode:'text', autocomplete:'off', 'aria-label':'Distance to ' + v});
        const p = el('input', {class:'pin', type:'text', autocomplete:'off', 'aria-label':'Came from (superscript) for ' + v});
        [d, p].forEach(i => i.addEventListener('keydown', e => { if (e.key === 'Enter') checkRow(); }));
        inputs[v] = {d, p};
        const td = el('td', {class: marks[v] || ''}, [d, p]);
        return td;
      }
    }));
    actHost.innerHTML = '';
    if (phase === 'row'){
      const chk = el('button', {class:'btn', type:'button', text:'Check row'});
      chk.addEventListener('click', checkRow);
      const rev = el('button', {class:'btn sec', type:'button', text:'Show this row'});
      rev.addEventListener('click', revealRow);
      actHost.appendChild(el('div', {class:'btnrow'}, [chk, rev, el('span', {class:'subtle', text:'Mistakes: ' + mistakes + ' · rows revealed: ' + reveals})]));
    } else if (phase === 'circle'){
      actHost.appendChild(el('div', {class:'prompt', text:'Row correct. Which entry do you circle (which vertex joins Y)?'}));
      actHost.appendChild(el('div', {class:'pickrow'}, st.remaining().map(v => {
        const b = el('button', {class:'pickbtn', type:'button', text:v});
        b.addEventListener('click', () => circle(v, b)); return b;
      })));
    } else if (phase === 'final'){
      actHost.appendChild(finalForm());
    } else if (phase === 'done'){
      actHost.appendChild(el('div', {class:'prompt', text:'Model answer'}));
      actHost.appendChild(finalPathsTable(st));
      const again = el('button', {class:'btn', type:'button', text:'Another random graph'});
      again.addEventListener('click', () => { key = 'random-d'; picker.value = key; start(); });
      actHost.appendChild(el('div', {class:'btnrow'}, [again]));
    }
  }
  function cellExplain(v, c){
    const k = c.calc, r = st.rows[curRow()];
    if (k && k.first) return 'direct edge ' + esc(st.s) + (g.directed ? '→' : '–') + esc(v) + ' has weight ' + k.w + ' → ' + dsup(c.d, c.p);
    if (!k) return curRow() === 0 ? 'no direct edge from ' + esc(st.s) + ' → ∞'
      : 'no edge ' + esc(r.label) + (g.directed ? '→' : '–') + esc(v) + ', so copy down ' + dsup(c.d, c.p);
    const sum = k.base + ' + ' + k.w + ' = ' + k.cand;
    if (k.better) return 'via ' + esc(k.from) + ': ' + sum + (k.old === Infinity ? ', better than ∞' : ' &lt; ' + k.old) + ' → ' + dsup(c.d, c.p);
    if (k.tie) return 'via ' + esc(k.from) + ': ' + sum + ', same as before → ' + dsup(c.d, c.p) + ' (superscript ' + esc(k.from) + ' also accepted)';
    return 'via ' + esc(k.from) + ': ' + sum + ' is not shorter than ' + k.old + ' → keep ' + dsup(c.d, c.p);
  }
  function checkRow(){
    const row = st.rows[curRow()];
    const wrong = [];
    marks = {};
    Object.keys(inputs).forEach(v => {
      const c = row.cells[v], inp = inputs[v];
      const d = parseDist(inp.d.value);
      const pTyped = inp.p.value.trim();
      let ok = d === c.d;
      if (ok){
        if (c.d === Infinity) ok = !pTyped || pTyped === '-' || pTyped === '—';
        else ok = st.validPreds(v).indexOf(matchLabel(g, pTyped)) >= 0;
      }
      inp.d.classList.toggle('right', ok); inp.d.classList.toggle('wrong', !ok);
      inp.p.classList.toggle('right', ok); inp.p.classList.toggle('wrong', !ok);
      marks[v] = ok ? 'ok' : 'no';
      if (!ok){
        let why = cellExplain(v, c);
        if (d === c.d && c.d !== Infinity) why = 'distance right, superscript wrong — ' + why;
        wrong.push('<b>' + esc(v) + '</b>: ' + why);
      }
    });
    if (wrong.length){
      mistakes++;
      narr.className = 'narr bad';
      narr.innerHTML = '<p>✘ ' + wrong.length + ' entr' + (wrong.length > 1 ? 'ies' : 'y') + ' to fix:</p><ul><li>' + wrong.join('</li><li>') + '</li></ul>';
      return;
    }
    narr.className = 'narr good';
    narr.innerHTML = '<p>✔ Row ' + esc(row.label) + ' is right.</p>';
    toCircleOrFinal();
  }
  function revealRow(){
    reveals++;
    const row = st.rows[curRow()];
    const items = st.ids.filter(v => !row.cells[v].done).map(v => '<b>' + esc(v) + '</b>: ' + cellExplain(v, row.cells[v]));
    narr.className = 'narr';
    narr.innerHTML = '<p>Row ' + esc(row.label) + ' worked out:</p><ul><li>' + items.join('</li><li>') + '</li></ul>';
    toCircleOrFinal();
  }
  function toCircleOrFinal(){
    marks = {};
    if (st.finished()){ phase = 'final'; }
    else phase = 'circle';
    paint();
  }
  function circle(v, btn){
    if (st.minIds().indexOf(v) < 0){
      mistakes++;
      btn.classList.add('no'); btn.disabled = true;
      narr.className = 'narr bad';
      narr.innerHTML = '<p>✘ ' + whyWrongVertex(st, v) + '</p>';
      return;
    }
    narr.className = 'narr good';
    narr.innerHTML = '<p>✔ ' + whyRightVertex(st, v) + ' Next row: ' + esc(v) + '.</p>';
    st.choose(v); st.relax(v);
    const r = st.rows[curRow()];
    const allDone = st.ids.every(x => r.cells[x].done);
    if (allDone || st.finished()){
      if (allDone) narr.innerHTML += '<p>Every vertex is in Y now — the last row would be all dashes.</p>';
      phase = st.finished() && !allDone ? 'row' : 'final';
    } else phase = 'row';
    paint();
  }
  function finalForm(){
    const box = el('div');
    box.appendChild(el('div', {class:'prompt', html:'Last step — write the answer the way Q4 asks: shortest distance <i>and</i> path from ' + esc(st.s) + ' to each vertex.'}));
    box.appendChild(el('p', {class:'subtle', text:'Path: list the vertices in order, e.g. "W B C D". Unreachable: distance ∞, path -.'}));
    const rows = [], fin = {};
    st.ids.filter(v => v !== st.s).forEach(v => {
      const d = el('input', {class:'din', type:'text', autocomplete:'off', 'aria-label':'Shortest distance to ' + v});
      const p = el('input', {class:'path-in', type:'text', autocomplete:'off', 'aria-label':'Path to ' + v, placeholder: st.s + ' … ' + v});
      fin[v] = {d, p};
      rows.push(el('tr', {}, [el('td', {text:v}), el('td', {}, [d]), el('td', {}, [p])]));
    });
    box.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [
      el('thead', {}, [el('tr', {}, [el('th', {text:'To'}), el('th', {text:'Distance'}), el('th', {text:'Path'})])]),
      el('tbody', {}, rows)])]));
    const chk = el('button', {class:'btn', type:'button', text:'Check answer'});
    chk.addEventListener('click', () => {
      const wrong = [];
      Object.keys(fin).forEach(v => {
        const d = parseDist(fin[v].d.value), want = st.dist[v];
        const dOk = d === want;
        const pOk = pathOk(v, fin[v].p.value);
        fin[v].d.classList.toggle('right', dOk); fin[v].d.classList.toggle('wrong', !dOk);
        fin[v].p.classList.toggle('right', pOk); fin[v].p.classList.toggle('wrong', !pOk);
        if (!dOk || !pOk){
          const path = st.pathTo(v);
          wrong.push('<b>' + esc(v) + '</b>: ' + (path ? 'distance ' + want + ', path ' + path.map(esc).join(' → ') +
            ' (follow the superscripts back from ' + esc(v) + ')' : 'unreachable (∞)'));
        }
      });
      if (wrong.length){
        mistakes++;
        narr.className = 'narr bad';
        narr.innerHTML = '<p>✘ Not yet:</p><ul><li>' + wrong.join('</li><li>') + '</li></ul>';
        return;
      }
      narr.className = 'narr good';
      narr.innerHTML = '<p>✔ All correct. ' + (mistakes ? mistakes + ' mistake' + (mistakes > 1 ? 's' : '') : 'No mistakes') +
        (reveals ? ', ' + reveals + ' row' + (reveals > 1 ? 's' : '') + ' revealed.' : '.') + '</p>';
      phase = 'done'; paint();
      if (!doneReported && onDone){ doneReported = true; onDone(mistakes, reveals); }
    });
    box.appendChild(el('div', {class:'btnrow'}, [chk]));
    return box;
  }
  function pathOk(v, typed){ return dijPathOk(g, st, v, typed); }
  start();
  return root;
}

/* any valid shortest path is accepted (there can be more than one when there are ties) */
function dijPathOk(g, st, v, typed){
  const want = st.dist[v];
  const t = String(typed || '').trim();
  if (want === Infinity) return !t || /^[-—–]$/.test(t) || /^(none|no path)$/i.test(t);
  const parts = t.split(/[^A-Za-z0-9_]+/).filter(Boolean).map(x => matchLabel(g, x));
  if (parts.length < 2 || parts.some(x => !x)) return false;
  if (parts[0] !== st.s || parts[parts.length - 1] !== v) return false;
  let sum = 0;
  for (let i = 0; i + 1 < parts.length; i++){
    const w = gW(g, parts[i], parts[i + 1]);
    if (w === Infinity) return false;
    sum += w;
  }
  return sum === want;
}
