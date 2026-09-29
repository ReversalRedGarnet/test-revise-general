/* ============================================================
   CS214 Revise — Kruskal and Prim activities (Stage 4), built on
   mst.js: step-through visualisers, do-it-yourself, the Lab 9
   answer-format checker, and Kruskal vs Prim side by side.

   Ties: the course states no tie rule. The step-throughs follow the
   rule in mst.js (edge-list order / column order) and say so at every
   tie; the do-it-yourself activities and the answer checker accept
   ANY tied choice and say when a tie was involved.
   ============================================================ */

/* the graphs offered: every undirected preset, plus random extra practice */
function mstPresetKeys(){ return Object.keys(GRAPH_PRESETS).filter(k => !GRAPH_PRESETS[k].directed); }
function mstPicker(current, onChange){
  const sel = el('select', {class:'sel', 'aria-label':'Choose a graph'});
  mstPresetKeys().forEach(k => sel.appendChild(el('option', {value:k, text:'[' + PRESET_TAG_LABEL[GRAPH_PRESETS[k].tag] + '] ' + GRAPH_PRESETS[k].name.replace(/ \(from [^)]*\)$/, '')})));
  sel.appendChild(el('option', {value:'random', text:'[Extra practice] New random graph'}));
  sel.appendChild(el('option', {value:'custom', text:'Your edited graph', hidden:'hidden'}));
  sel.value = current;
  sel.addEventListener('change', () => onChange(sel.value));
  return sel;
}
/* random undirected graph where Kruskal has to skip at least one edge */
function randomMstGraph(){
  for (let i = 0; i < 50; i++){
    const g = randomGraph({directed:false});
    if (g.tag !== 'extra') continue;
    if (kruskalSteps(g).steps.some(s => !s.accept)){ g.name = 'Random graph'; return g; }
  }
  return presetGraph('lecture91');
}
function mstGraphFor(key){ return key === 'random' ? randomMstGraph() : presetGraph(key); }
function mstConnected(g){ return kruskalSteps(g).F.length === g.nodes.length - 1; }
function mstNote(g){
  const tag = g.tag || 'extra';
  return el('p', {class:'src'}, [el('span', {class:'badge ' + tag, text: PRESET_TAG_LABEL[tag] || 'Extra practice'}),
    document.createTextNode((g.note || '') + (g.directed ? ' (Directed on its source slide — read as undirected here.)' : ''))]);
}
function eStr(u, v, w){ return '(' + u + ', ' + v + ')' + (w != null ? ' ' + w : ''); }
function sortedEdges(g){ return undirectedEdges(g).sort((a, b) => a.w - b.w || a.i - b.i); }
function sameEdge(e, a, b){ return (e.u === a && e.v === b) || (e.u === b && e.v === a); }

/* picker + editor + matrix toggle shared by every MST activity.
   onGraph(g) is called whenever the graph changes. */
function mstGraphUI(startKey, onGraph){
  let key = startKey, g = mstGraphFor(key), showMatrix = false;
  const picker = mstPicker(key, k => { key = k; set(mstGraphFor(k)); });
  const matBtn = el('button', {class:'btn sec', type:'button', text:'Show matrix'});
  const matHost = el('div'), noteHost = el('div');
  matBtn.addEventListener('click', () => { showMatrix = !showMatrix; matBtn.textContent = showMatrix ? 'Hide matrix' : 'Show matrix'; paintMatrix(); });
  const editText = el('textarea', {spellcheck:'false', 'aria-label':'Edge list'});
  const editErr = el('div', {class:'err'});
  const applyBtn = el('button', {class:'btn', type:'button', text:'Use this graph'});
  applyBtn.addEventListener('click', () => {
    const r = textToGraph(editText.value, false, g);
    if (r.error){ editErr.textContent = r.error; return; }
    if (!mstConnected(r.g)){ editErr.textContent = 'That graph is not connected, so it has no spanning tree. Prim and Kruskal need an undirected, weighted, connected graph (Lec 9.1).'; return; }
    editErr.textContent = ''; key = 'custom'; picker.value = 'custom'; set(r.g);
  });
  const editor = el('details', {class:'fold editbox'}, [
    el('summary', {}, [el('span', {class:'fold-title', text:'Edit this graph'})]),
    el('div', {class:'fold-body'}, [
      el('p', {class:'subtle', html:'One edge per line: <code>vertex vertex weight</code> (e.g. <code>A B 3</code>). Edges are undirected. Weights ≥ 0, up to 9 vertices, and the graph must be connected. You can also drag vertices on the picture.'}),
      editText, el('div', {class:'btnrow'}, [applyBtn]), editErr])
  ]);
  function paintMatrix(){
    matHost.innerHTML = '';
    if (showMatrix){
      matHost.appendChild(el('p', {class:'subtle', text:'Adjacency matrix W: ∞ = no edge. It is symmetric because the graph is undirected (Lab 9 gives its optional graphs this way).'}));
      matHost.appendChild(matrixTable(g));
    }
  }
  function set(ng){
    g = ng;
    if (g.directed){ g.directed = false; }
    editText.value = graphToText(g);
    editErr.textContent = '';
    noteHost.innerHTML = ''; noteHost.appendChild(mstNote(g));
    paintMatrix();
    onGraph(g);
  }
  return {
    controls: [picker, matBtn],
    blocks: [noteHost, editor],
    matHost,
    start(){ set(g); },
    graph(){ return g; }
  };
}
function startSelect(g, value, onChange){
  const s = el('select', {class:'sel', 'aria-label':'Start vertex'});
  g.nodes.forEach(n => s.appendChild(el('option', {value:n.id, text:n.id})));
  s.value = value && findNode(g, value) ? value : (g.source && findNode(g, g.source) ? g.source : g.nodes[0].id);
  s.addEventListener('change', () => onChange(s.value));
  return s;
}
function stepButtons(getIdx, setIdx, getLen){
  const bFirst = el('button', {class:'btn sec', type:'button', text:'⏮ Start'});
  const bBack  = el('button', {class:'btn sec', type:'button', text:'◀ Back'});
  const bNext  = el('button', {class:'btn', type:'button', text:'Next ▶'});
  const bEnd   = el('button', {class:'btn sec', type:'button', text:'Run to end ⏭'});
  const counter = el('span', {class:'stepctr'});
  bFirst.addEventListener('click', () => setIdx(0));
  bBack.addEventListener('click', () => { if (getIdx() > 0) setIdx(getIdx() - 1); });
  bNext.addEventListener('click', () => { if (getIdx() < getLen() - 1) setIdx(getIdx() + 1); });
  bEnd.addEventListener('click', () => setIdx(getLen() - 1));
  return {
    row: el('div', {class:'ctrl'}, [bFirst, bBack, bNext, bEnd, counter]),
    paint(){
      const i = getIdx(), n = getLen();
      counter.textContent = 'Step ' + (i + 1) + ' of ' + n;
      bBack.disabled = bFirst.disabled = i === 0;
      bNext.disabled = bEnd.disabled = i === n - 1;
    }
  };
}
function subsetMark(sets){
  // colour nothing; just list the subsets
  return el('div', {class:'pq'}, sets.map(s => el('span', {text:'{' + s.join(', ') + '}'})));
}
const TIE_NOTE = 'The course states no tie rule.';

/* ============================================================
   Kruskal step-through
   ============================================================ */
function kruskalViewSteps(g){
  const r = kruskalSteps(g), order = sortedEdges(g);
  const ids = nodeIds(g);
  const steps = [{kind:'init', F:[], sets: ids.map(v => [v]), cur:null, seen:0,
    html:'<p><b>Start.</b> F = ∅. Make one subset per vertex: ' + ids.map(v => '{' + esc(v) + '}').join(' ') + '. Sort the edges in nondecreasing order of weight (the list below).' +
      (order.some((e, k) => k && order[k - 1].w === e.w) ? ' Equal weights are listed in the order the graph gives them — ' + TIE_NOTE + '' : '') + '</p>'}];
  r.steps.forEach((s, k) => {
    const e = s.edge;
    const setU = s.before.find(x => x.indexOf(e.u) >= 0), setV = s.before.find(x => x.indexOf(e.v) >= 0);
    const same = order.filter(x => x.w === e.w && x.i !== e.i);
    let html = '<p><b>Select</b> the next edge: ' + esc(eStr(e.u, e.v)) + ', weight ' + e.w + '.</p>';
    if (s.accept) html += '<p>✔ <b>Feasible:</b> ' + esc(e.u) + ' is in {' + setU.map(esc).join(', ') + '} and ' + esc(e.v) + ' is in {' + setV.map(esc).join(', ') + '} — different subsets, so no cycle. <b>Merge</b> the subsets and <b>add</b> ' + esc(eStr(e.u, e.v)) + ' to F.</p>';
    else html += '<p>✘ <b>Skip:</b> ' + esc(e.u) + ' and ' + esc(e.v) + ' are both in {' + setU.map(esc).join(', ') + '} — already connected by F, so this edge <b>would make a cycle</b>.</p>';
    if (s.tie) html += '<p class="tie small">Tie: ' + same.map(x => esc(eStr(x.u, x.v))).join(', ') + ' also weigh' + (same.length > 1 ? '' : 's') + ' ' + e.w + '. Here they go in the order the graph lists them; taking them the other way is just as correct. ' + TIE_NOTE + '</p>';
    const last = k === r.steps.length - 1;
    if (last){
      const never = order.slice(k + 1);
      html += '<p><b>Solution check: all the subsets are merged</b> — F has ' + r.F.length + ' = n − 1 edges, total weight <b>' + r.total + '</b>.' +
        (never.length ? ' The edges ' + never.map(x => esc(eStr(x.u, x.v))).join(', ') + ' are never looked at.' : '') + '</p>';
    }
    steps.push({kind: last ? 'done' : s.accept ? 'add' : 'skip', F:s.F, sets:s.after, cur:e, accept:s.accept, seen:k + 1, html});
  });
  return {steps, order, result:r};
}
function kruskalListTable(order, statusOf){
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'mst mstlist'}, [
    el('thead', {}, [el('tr', {}, ['#', 'Edge', 'Weight', 'Status'].map(x => el('th', {text:x})))]),
    el('tbody', {}, order.map((e, k) => {
      const st = statusOf(e, k);
      return el('tr', {class: st.cls || ''}, [el('td', {text:String(k + 1)}), el('td', {class:'mono', text:eStr(e.u, e.v)}), el('td', {text:String(e.w)}), el('td', {html:st.html})]);
    }))])]);
}

function renderKruskalVisualiser(opts, onDone){
  let run, idx = 0;
  const root = el('div', {class:'no-gloss'});
  const ui = mstGraphUI(opts.preset || 'lecture91', () => { run = kruskalViewSteps(ui.graph()); idx = 0; paint(); });
  const nav = stepButtons(() => idx, i => { idx = i; paint(); }, () => run.steps.length);
  const figHost = el('div'), narr = el('div', {class:'narr', 'aria-live':'polite'}), sets = el('div', {class:'sets'}), listHost = el('div');
  root.appendChild(el('div', {class:'ctrl'}, ui.controls));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(figHost); root.appendChild(ui.matHost);
  root.appendChild(nav.row); root.appendChild(narr); root.appendChild(sets);
  root.appendChild(el('div', {class:'prompt', text:'The edges in nondecreasing order'}));
  root.appendChild(listHost);

  function paint(){
    const g = ui.graph(), s = run.steps[idx];
    const mark = {};
    if (s.cur){ mark[s.cur.u] = s.accept ? 'ok' : 'no'; mark[s.cur.v] = s.accept ? 'ok' : 'no'; }
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {tree:s.F, cand: s.cur && !s.accept ? [[s.cur.u, s.cur.v]] : [], mark, draggable:true, onMoved:() => {}},
      'Solid blue = edges in F. Green ends = the edge just added; red ends + dashed = the edge just skipped.'));
    narr.innerHTML = s.html;
    narr.className = 'narr' + (s.kind === 'done' ? ' good' : '');
    sets.innerHTML = '';
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Disjoint subsets'}), subsetMark(s.sets)]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'F (edges kept)'}), document.createTextNode(s.F.length ? '{' + s.F.map(e => eStr(e[0], e[1])).join(', ') + '}' : '∅')]));
    listHost.innerHTML = '';
    const r = run.result;
    listHost.appendChild(kruskalListTable(run.order, (e, k) => {
      if (k < s.seen){
        const step = r.steps[k];
        const now = k === s.seen - 1 ? ' <b>← now</b>' : '';
        return step.accept ? {cls:'', html:'✔ added' + now} : {cls:'rej', html:'✘ skipped — would make a cycle' + now};
      }
      if (s.kind === 'done') return {cls:'never', html:'<span class="subtle">not needed — already solved</span>'};
      return {cls:'', html:'<span class="subtle">not yet</span>'};
    }));
    nav.paint();
    if (idx === run.steps.length - 1 && onDone) onDone();
  }
  ui.start();
  return root;
}

/* ============================================================
   Prim step-through
   ============================================================ */
function primViewSteps(g, start){
  const r = primSteps(g, start);
  const steps = [{Y:[r.Y[0]], F:[], cand:[], cur:r.Y[0], html:'<p><b>Start.</b> F = ∅, Y = {' + esc(r.Y[0]) + '}. Prim can start from any vertex; the slide starts from v1.</p>'}];
  r.steps.forEach((s, k) => {
    const list = s.cross.slice().sort((a, b) => a.w - b.w || a.i - b.i);
    const m = s.pick.w;
    let html = '<p><b>Edges from Y = {' + s.Y.map(esc).join(', ') + '} to V − Y:</b> ' +
      list.map(c => (c.w === m ? '<b>' : '') + esc(eStr(c.from, c.to)) + ' ' + c.w + (c.w === m ? '</b>' : '')).join(', ') + '.</p>' +
      '<p><b>Select</b> the vertex in V − Y nearest to Y: <b>' + esc(s.pick.to) + '</b>, through ' + esc(eStr(s.pick.from, s.pick.to)) + ' of weight ' + m +
      '. Add ' + esc(s.pick.to) + ' to Y and ' + esc(eStr(s.pick.from, s.pick.to)) + ' to F.</p>';
    if (s.tie){
      if (s.tieVertices.length > 1) html += '<p class="tie small">Tie: ' + s.tieVertices.map(esc).join(' and ') + ' are both joined to Y by an edge of weight ' + m + '. This page takes the first in column order; either is correct. ' + TIE_NOTE + '</p>';
      else html += '<p class="tie small">Tie: ' + s.tieEdges.map(c => esc(eStr(c.from, c.to))).join(' and ') + ' both weigh ' + m + ' and both lead to ' + esc(s.pick.to) + ' — the vertex is certain; only the edge put in F differs. ' + TIE_NOTE + '</p>';
    }
    const Y = s.Y.concat([s.pick.to]);
    if (k === r.steps.length - 1) html += '<p><b>Solution check: Y = V</b> — solved. F has ' + r.F.length + ' edges, total weight <b>' + r.total + '</b>.</p>';
    steps.push({Y, F:r.F.slice(0, k + 1), cand: list.map(c => [c.from, c.to]), cur:s.pick.to, pick:s.pick, html, done: k === r.steps.length - 1});
  });
  return {steps, result:r};
}

function renderPrimVisualiser(opts, onDone){
  let run, idx = 0, start = null;
  const root = el('div', {class:'no-gloss'});
  const startHost = el('label', {}, [document.createTextNode('Start')]);
  const ui = mstGraphUI(opts.preset || 'lecture91', g => {
    if (!start || !findNode(g, start)) start = g.source && findNode(g, g.source) ? g.source : g.nodes[0].id;
    if (startHost.lastChild && startHost.lastChild.tagName === 'SELECT') startHost.removeChild(startHost.lastChild);
    startHost.appendChild(startSelect(g, start, v => { start = v; rebuild(); }));
    rebuild();
  });
  const nav = stepButtons(() => idx, i => { idx = i; paint(); }, () => run.steps.length);
  const figHost = el('div'), narr = el('div', {class:'narr', 'aria-live':'polite'}), sets = el('div', {class:'sets'}), tabHost = el('div');
  root.appendChild(el('div', {class:'ctrl'}, ui.controls.concat([startHost])));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(figHost); root.appendChild(ui.matHost);
  root.appendChild(nav.row); root.appendChild(narr); root.appendChild(sets);
  root.appendChild(tabHost);
  function rebuild(){ run = primViewSteps(ui.graph(), start); idx = 0; paint(); }
  function paint(){
    const g = ui.graph(), s = run.steps[idx];
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {inY: mapOf(s.Y), tree: s.F, cand: s.done ? [] : s.cand, cur: s.cur, draggable:true, onMoved:() => {}},
      'Blue fill = in Y. Solid blue = F. Dashed = the edges from Y to V − Y that were compared. Thick ring = the vertex just added.'));
    narr.innerHTML = s.html;
    narr.className = 'narr' + (s.done ? ' good' : '');
    sets.innerHTML = '';
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Y (vertices in the tree)'}), document.createTextNode('{' + s.Y.join(', ') + '}')]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'F (edges kept)'}), document.createTextNode(s.F.length ? '{' + s.F.map(e => eStr(e[0], e[1])).join(', ') + '}' : '∅')]));
    tabHost.innerHTML = '';
    if (s.done){
      tabHost.appendChild(el('div', {class:'prompt', text:'Every step as a table'}));
      tabHost.appendChild(primTable(g, start));
    }
    nav.paint();
    if (idx === run.steps.length - 1 && onDone) onDone();
  }
  ui.start();
  return root;
}

/* ============================================================
   Kruskal — do it yourself: pick the next edge to ADD to F
   ============================================================ */
function kruskalState(g){
  const sets = {}; nodeIds(g).forEach(v => sets[v] = [v]);
  return {g, sets, F:[], order: sortedEdges(g), used:{}};
}
function kFeasible(st){ return st.order.filter(e => !st.used[e.i] && st.sets[e.u] !== st.sets[e.v]); }
function kMerge(st, e){
  const m = st.sets[e.u].concat(st.sets[e.v]).sort(naturalCmp);
  m.forEach(v => st.sets[v] = m);
  st.F.push([e.u, e.v]); st.used[e.i] = true;
}
/* judge one pick; returns {ok, html, tie} */
function kJudge(st, e){
  const setsTxt = s => '{' + s.map(esc).join(', ') + '}';
  if (st.sets[e.u] === st.sets[e.v])
    return {ok:false, html:'✘ ' + esc(eStr(e.u, e.v)) + ' would make a cycle: ' + esc(e.u) + ' and ' + esc(e.v) + ' are already in the same subset ' + setsTxt(st.sets[e.u]) + '. Kruskal <b>skips</b> it.'};
  const feas = kFeasible(st), m = Math.min.apply(null, feas.map(x => x.w));
  if (e.w > m){
    const c = feas.filter(x => x.w === m);
    return {ok:false, html:'✘ ' + esc(eStr(e.u, e.v)) + ' weighs ' + e.w + ', but ' + c.map(x => esc(eStr(x.u, x.v))).join(' and ') + ' weigh' + (c.length > 1 ? '' : 's') + ' only ' + m + ' and join' + (c.length > 1 ? '' : 's') + ' two different subsets. Kruskal takes the edges in nondecreasing order of weight.'};
  }
  const others = feas.filter(x => x.w === m && x.i !== e.i);
  return {ok:true, tie: others.length > 0, others,
    html:'✔ ' + esc(eStr(e.u, e.v)) + ', weight ' + e.w + ': ' + esc(e.u) + ' and ' + esc(e.v) + ' are in different subsets, so merge them and add the edge to F.'};
}

function renderKruskalDIY(opts, onDone){
  let st, mistakes, reported = false, flash = {};
  const root = el('div', {class:'no-gloss'});
  const ui = mstGraphUI(opts.preset || 'lecture91', () => begin());
  const restart = el('button', {class:'btn sec', type:'button', text:'Restart'});
  restart.addEventListener('click', () => begin());
  const figHost = el('div'), promptHost = el('div'), narr = el('div', {class:'narr', 'aria-live':'polite'}), sets = el('div', {class:'sets'}), listHost = el('div'), statusHost = el('div', {class:'subtle'});
  root.appendChild(el('div', {class:'ctrl'}, ui.controls.concat([restart])));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(figHost); root.appendChild(ui.matHost);
  root.appendChild(promptHost); root.appendChild(narr); root.appendChild(statusHost); root.appendChild(sets); root.appendChild(listHost);

  function begin(){
    st = kruskalState(ui.graph()); mistakes = 0; flash = {};
    narr.className = 'narr';
    narr.innerHTML = '<p>Every vertex starts in its own subset and F = ∅. Pick the edges in the order Kruskal <b>adds</b> them to F. If a tie comes up, either tied edge is accepted.</p>';
    paint();
  }
  function done(){ return st.F.length === st.g.nodes.length - 1; }
  function paint(){
    const g = st.g;
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {tree: st.F}, 'Solid blue = edges in F so far.'));
    promptHost.innerHTML = '';
    if (!done()){
      promptHost.appendChild(el('div', {class:'prompt', text:'Which edge does Kruskal add to F next?'}));
      promptHost.appendChild(el('div', {class:'pickrow'}, st.order.filter(e => !st.used[e.i]).map(e => {
        const b = el('button', {class:'pickbtn' + (flash[e.i] ? ' ' + flash[e.i] : ''), type:'button', text: eStr(e.u, e.v) + '  w=' + e.w});
        if (flash[e.i] === 'no') b.disabled = true;
        b.addEventListener('click', () => pick(e)); return b;
      })));
    } else {
      const again = el('button', {class:'btn', type:'button', text:'Try a new random graph'});
      again.addEventListener('click', () => { ui.controls[0].value = 'random'; ui.controls[0].dispatchEvent(new Event('change')); });
      promptHost.appendChild(el('div', {class:'btnrow'}, [again]));
    }
    statusHost.textContent = 'Mistakes so far: ' + mistakes;
    sets.innerHTML = '';
    const uniq = []; nodeIds(g).forEach(v => { if (uniq.indexOf(st.sets[v]) < 0) uniq.push(st.sets[v]); });
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Disjoint subsets'}), subsetMark(uniq)]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'F (in the order you added them)'}), document.createTextNode(st.F.length ? st.F.map(e => eStr(e[0], e[1])).join(', ') : '∅')]));
    listHost.innerHTML = '';
    listHost.appendChild(el('div', {class:'prompt', text:'The edges in nondecreasing order'}));
    const lastW = st.F.length ? Math.max.apply(null, st.order.filter(e => st.used[e.i]).map(e => e.w)) : -Infinity;
    listHost.appendChild(kruskalListTable(st.order, e => {
      if (st.used[e.i]) return {html:'✔ added (' + (st.F.findIndex(f => sameEdge(e, f[0], f[1])) + 1) + ')'};
      const cycle = st.sets[e.u] === st.sets[e.v];
      if (cycle && e.w <= lastW) return {cls:'rej', html:'✘ skipped — would make a cycle'};
      if (done()) return {html:'<span class="subtle">not needed — already solved</span>'};
      return {html:'<span class="subtle">not yet</span>'};
    }));
  }
  function pick(e){
    const j = kJudge(st, e);
    flash = {};
    if (!j.ok){
      mistakes++; flash[e.i] = 'no';
      narr.className = 'narr bad'; narr.innerHTML = '<p>' + j.html + '</p>';
      paint(); return;
    }
    kMerge(st, e);
    let html = '<p>' + j.html + '</p>';
    if (j.tie){
      const nowCycle = j.others.filter(x => st.sets[x.u] === st.sets[x.v]);
      html += '<p class="tie small">Tie: ' + j.others.map(x => esc(eStr(x.u, x.v))).join(', ') + ' also weigh' + (j.others.length > 1 ? '' : 's') + ' ' + e.w + ' — ' + (j.others.length > 1 ? 'any of them' : 'either') + ' was a correct pick. ' + TIE_NOTE +
        (nowCycle.length ? ' Now ' + nowCycle.map(x => esc(eStr(x.u, x.v))).join(' and ') + ' would make a cycle, so ' + (nowCycle.length > 1 ? 'they' : 'it') + ' will be skipped: your tree may differ from someone else\'s, with the same total weight.' : '') + '</p>';
    }
    if (done()){
      const total = st.F.reduce((s, f) => s + gW(st.g, f[0], f[1]), 0);
      html += '<p><b>All subsets merged — solved.</b> F has ' + st.F.length + ' edges, total weight ' + total + '. ' + (mistakes ? mistakes + ' mistake' + (mistakes > 1 ? 's' : '') + ' this run.' : 'No mistakes!') + '</p>';
      if (!reported && onDone){ reported = true; onDone(mistakes); }
    }
    narr.className = 'narr good'; narr.innerHTML = html;
    paint();
  }
  ui.start();
  return root;
}

/* ============================================================
   Prim — do it yourself: pick the next vertex, then its edge
   ============================================================ */
function primCross(g, Y){
  return undirectedEdges(g).filter(e => (Y.indexOf(e.u) >= 0) !== (Y.indexOf(e.v) >= 0))
    .map(e => Y.indexOf(e.u) >= 0 ? {from:e.u, to:e.v, w:e.w, i:e.i} : {from:e.v, to:e.u, w:e.w, i:e.i});
}
function primJudgeVertex(g, Y, v){
  const cross = primCross(g, Y), m = Math.min.apply(null, cross.map(c => c.w));
  const into = cross.filter(c => c.to === v);
  const best = cross.filter(c => c.w === m);
  const bestV = best.map(c => c.to).filter((x, k, a) => a.indexOf(x) === k);
  if (!into.length) return {ok:false, html:'✘ ' + esc(v) + ' has no edge to any vertex in Y = {' + Y.map(esc).join(', ') + '} yet. Prim only adds a vertex that is joined to Y by an edge.'};
  const vMin = Math.min.apply(null, into.map(c => c.w));
  if (vMin > m) return {ok:false, html:'✘ The cheapest edge from Y to ' + esc(v) + ' weighs ' + vMin + ', but ' + best.map(c => esc(eStr(c.from, c.to))).join(' and ') + ' weigh' + (best.length > 1 ? '' : 's') + ' only ' + m + '. Prim adds the vertex <b>nearest to Y</b> — the smallest single edge from Y, not the shortest path from the start.'};
  return {ok:true, m, edges: into.filter(c => c.w === m), tieV: bestV.length > 1 ? bestV : null,
    html:'✔ ' + esc(v) + ' is nearest to Y: joined by an edge of weight ' + m + ', the smallest from Y to V − Y.'};
}

function renderPrimDIY(opts, onDone){
  let g, Y, F, phase, chosen, mistakes, flash = {}, reported = false, start = null;
  const root = el('div', {class:'no-gloss'});
  const startHost = el('label', {}, [document.createTextNode('Start')]);
  const ui = mstGraphUI(opts.preset || 'lecture91', ng => {
    if (!start || !findNode(ng, start)) start = ng.source && findNode(ng, ng.source) ? ng.source : ng.nodes[0].id;
    if (startHost.lastChild && startHost.lastChild.tagName === 'SELECT') startHost.removeChild(startHost.lastChild);
    startHost.appendChild(startSelect(ng, start, v => { start = v; begin(); }));
    begin();
  });
  const restart = el('button', {class:'btn sec', type:'button', text:'Restart'});
  restart.addEventListener('click', () => begin());
  const figHost = el('div'), promptHost = el('div'), narr = el('div', {class:'narr', 'aria-live':'polite'}), sets = el('div', {class:'sets'}), statusHost = el('div', {class:'subtle'});
  root.appendChild(el('div', {class:'ctrl'}, ui.controls.concat([startHost, restart])));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(figHost); root.appendChild(ui.matHost);
  root.appendChild(promptHost); root.appendChild(narr); root.appendChild(statusHost); root.appendChild(sets);

  function begin(){
    g = ui.graph(); Y = [start]; F = []; phase = 'vertex'; chosen = null; mistakes = 0; flash = {};
    narr.className = 'narr';
    narr.innerHTML = '<p>Y = {' + esc(start) + '}, F = ∅. Choose each vertex Prim adds to Y, then the edge that goes into F. Ties: any tied choice is accepted.</p>';
    paint();
  }
  function remaining(){ return nodeIds(g).filter(v => Y.indexOf(v) < 0); }
  function paint(){
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {inY: mapOf(Y), tree: F, cur: chosen, mark: flash,
      cand: phase === 'edge' ? primCross(g, Y).filter(c => c.to === chosen).map(c => [c.from, c.to]) : [],
      pickable: phase === 'vertex' ? mapOf(remaining()) : {}, onPick: pickVertex},
      phase === 'vertex' ? 'Tap a vertex (or use the buttons) to choose the next one for Y.' : null));
    promptHost.innerHTML = '';
    if (phase === 'vertex'){
      promptHost.appendChild(el('div', {class:'prompt', text:'Which vertex joins Y next?'}));
      promptHost.appendChild(el('div', {class:'pickrow'}, remaining().map(v => {
        const b = el('button', {class:'pickbtn' + (flash[v] ? ' ' + flash[v] : ''), type:'button', text:v});
        b.addEventListener('click', () => pickVertex(v)); return b;
      })));
    } else if (phase === 'edge'){
      promptHost.appendChild(el('div', {class:'prompt', text:'Which edge joins F — the one that connects ' + chosen + ' to Y?'}));
      promptHost.appendChild(el('div', {class:'pickrow'}, primCross(g, Y).filter(c => c.to === chosen).map(c => {
        const b = el('button', {class:'pickbtn', type:'button', text: eStr(c.from, c.to) + '  w=' + c.w});
        b.addEventListener('click', () => pickEdge(c, b)); return b;
      })));
    } else {
      const again = el('button', {class:'btn', type:'button', text:'Try a new random graph'});
      again.addEventListener('click', () => { ui.controls[0].value = 'random'; ui.controls[0].dispatchEvent(new Event('change')); });
      promptHost.appendChild(el('div', {class:'btnrow'}, [again]));
    }
    statusHost.textContent = 'Mistakes so far: ' + mistakes;
    sets.innerHTML = '';
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'Y (in the order added)'}), document.createTextNode(Y.join(', '))]));
    sets.appendChild(el('div', {class:'setbox'}, [el('b', {text:'F (in the order added)'}), document.createTextNode(F.length ? F.map(e => eStr(e[0], e[1])).join(', ') : '∅')]));
  }
  function pickVertex(v){
    if (phase !== 'vertex') return;
    const j = primJudgeVertex(g, Y, v);
    flash = {};
    if (!j.ok){ mistakes++; flash[v] = 'no'; narr.className = 'narr bad'; narr.innerHTML = '<p>' + j.html + '</p>'; paint(); return; }
    let html = '<p>' + j.html + '</p>';
    if (j.tieV) html += '<p class="tie small">Tie: ' + j.tieV.map(esc).join(' and ') + ' are both ' + j.m + ' from Y — either was a correct choice. ' + TIE_NOTE + '</p>';
    chosen = v; flash[v] = 'ok';
    if (j.edges.length === 1){ accept(j.edges[0], html); return; }
    phase = 'edge';
    narr.className = 'narr good';
    narr.innerHTML = html + '<p>More than one edge joins ' + esc(v) + ' to Y — pick the one for F.</p>';
    paint();
  }
  function pickEdge(c, btn){
    const into = primCross(g, Y).filter(x => x.to === chosen), m = Math.min.apply(null, into.map(x => x.w));
    if (c.w > m){
      mistakes++; btn.classList.add('no'); btn.disabled = true;
      const best = into.filter(x => x.w === m);
      narr.className = 'narr bad';
      narr.innerHTML = '<p>✘ ' + esc(eStr(c.from, c.to)) + ' weighs ' + c.w + '; ' + best.map(x => esc(eStr(x.from, x.to))).join(' and ') + ' weigh' + (best.length > 1 ? '' : 's') + ' ' + m + '. F gets the cheapest edge joining ' + esc(chosen) + ' to Y.</p>';
      statusHost.textContent = 'Mistakes so far: ' + mistakes;
      return;
    }
    const ties = into.filter(x => x.w === m && x.i !== c.i);
    accept(c, '<p>✔ ' + esc(eStr(c.from, c.to)) + ', weight ' + c.w + '.</p>' + (ties.length ? '<p class="tie small">Tie: ' + ties.map(x => esc(eStr(x.from, x.to))).join(' and ') + ' also weigh' + (ties.length > 1 ? '' : 's') + ' ' + m + ' — either edge was right. ' + TIE_NOTE + '</p>' : ''));
  }
  function accept(c, html){
    Y.push(c.to); F.push([c.from, c.to]);
    html += '<p>Add ' + esc(c.to) + ' to Y and ' + esc(eStr(c.from, c.to)) + ' to F.</p>';
    if (Y.length === g.nodes.length){
      phase = 'done'; chosen = null;
      const total = F.reduce((s, f) => s + gW(g, f[0], f[1]), 0);
      html += '<p><b>Y = V — solved.</b> Total weight ' + total + '. ' + (mistakes ? mistakes + ' mistake' + (mistakes > 1 ? 's' : '') + ' this run.' : 'No mistakes!') + '</p>';
      if (!reported && onDone){ reported = true; onDone(mistakes); }
    } else { phase = 'vertex'; chosen = c.to; }
    narr.className = 'narr good'; narr.innerHTML = html;
    paint();
  }
  ui.start();
  return root;
}

/* ============================================================
   Lab 9 answer format: type the sequence, checked for any valid tie order
   ============================================================ */
/* "(v1, v2), (v3,v5) 2, v3-v4" → [['v1','v2'], …]; weights outside brackets are ignored */
function parseEdgeSeq(g, text){
  const out = [], re = /\(\s*([A-Za-z0-9_]+)\s*[,;\s]\s*([A-Za-z0-9_]+)\s*\)|([A-Za-z0-9_]+)\s*[-–—]\s*([A-Za-z0-9_]+)/g;
  let m;
  while ((m = re.exec(String(text || '')))){
    const a = m[1] || m[3], b = m[2] || m[4];
    const u = matchLabel(g, a), v = matchLabel(g, b);
    if (!u || !v) return {error:'"' + (m[0]) + '": ' + (!u ? a : b) + ' is not a vertex of this graph.'};
    out.push([u, v]);
  }
  return {edges: out};
}
function parseVertexSeq(g, text){
  const toks = String(text || '').split(/[\s,;→>\-]+/).filter(Boolean), out = [];
  for (const t of toks){ const v = matchLabel(g, t); if (!v) return {error:'"' + t + '" is not a vertex of this graph.'}; out.push(v); }
  return {ids: out};
}

/* both return {ok, notes:[html], ties:n, stepsRight} — stepsRight counts leading correct steps */
function checkKruskalSeq(g, edges){
  const st = kruskalState(g), n = g.nodes.length, notes = [];
  let ties = 0, k = 0;
  for (; k < edges.length; k++){
    const [a, b] = edges[k];
    const e = st.order.find(x => !st.used[x.i] && sameEdge(x, a, b));
    if (!e){
      notes.push('Edge ' + (k + 1) + ': ' + (st.order.some(x => sameEdge(x, a, b)) ? esc(eStr(a, b)) + ' is already in F.' : 'there is no edge ' + esc(eStr(a, b)) + ' in this graph.'));
      break;
    }
    if (st.F.length === n - 1){ notes.push('Edge ' + (k + 1) + ': the tree was already finished after ' + (n - 1) + ' edges — stop there.'); break; }
    const j = kJudge(st, e);
    if (!j.ok){ notes.push('Edge ' + (k + 1) + ': ' + j.html); break; }
    if (j.tie){ ties++; notes.push('Edge ' + (k + 1) + ' ' + esc(eStr(e.u, e.v)) + ' was a tie with ' + j.others.map(x => esc(eStr(x.u, x.v))).join(', ') + ' — your order is accepted.'); }
    kMerge(st, e);
  }
  const right = st.F.length;
  if (right === edges.length && right < n - 1) notes.push('Not finished: a spanning tree of ' + n + ' vertices has ' + (n - 1) + ' edges; you listed ' + right + '.');
  return {ok: right === n - 1 && right === edges.length, notes, ties, stepsRight: right, total: st.F.reduce((s, f) => s + gW(g, f[0], f[1]), 0)};
}
function checkPrimSeq(g, start, verts, edges){
  const n = g.nodes.length, notes = [];
  let Y = [start], ties = 0, right = 0;
  if (verts.length && verts[0] !== start){ notes.push('The first vertex must be the start vertex, ' + esc(start) + '.'); return {ok:false, notes, ties, stepsRight:0}; }
  for (let k = 0; k < edges.length; k++){
    const [a, b] = edges[k];
    if (gW(g, a, b) === Infinity){ notes.push('Edge ' + (k + 1) + ': there is no edge ' + esc(eStr(a, b)) + ' in this graph.'); break; }
    const inA = Y.indexOf(a) >= 0, inB = Y.indexOf(b) >= 0;
    if (inA === inB){ notes.push('Edge ' + (k + 1) + ' ' + esc(eStr(a, b)) + ': ' + (inA ? 'both ends are already in Y — it would make a cycle.' : 'neither end is in Y yet — Prim only adds edges from Y to V − Y.')); break; }
    const v = inA ? b : a;
    const j = primJudgeVertex(g, Y, v);
    if (!j.ok){ notes.push('Edge ' + (k + 1) + ': ' + j.html); break; }
    if (gW(g, a, b) > j.m){ notes.push('Edge ' + (k + 1) + ': ' + esc(eStr(a, b)) + ' weighs ' + gW(g, a, b) + '; the cheapest edge joining ' + esc(v) + ' to Y weighs ' + j.m + '.'); break; }
    if (verts.length > k + 1 && verts[k + 1] !== v){ notes.push('Vertex ' + (k + 2) + ': you wrote ' + esc(verts[k + 1]) + ', but edge ' + (k + 1) + ' ' + esc(eStr(a, b)) + ' adds ' + esc(v) + '. The vertices and edges must match up.'); break; }
    if (j.tieV || j.edges.length > 1){ ties++; notes.push('Step ' + (k + 1) + ' was a tie (' + (j.tieV ? j.tieV.map(esc).join(' / ') : j.edges.map(c => esc(eStr(c.from, c.to))).join(' / ')) + ') — your choice is accepted.'); }
    Y.push(v); right++;
  }
  if (right === edges.length && right < n - 1) notes.push('Not finished: Prim adds ' + (n - 1) + ' edges (every vertex except the start); you listed ' + right + '.');
  if (right === n - 1 && verts.length && verts.length !== n) notes.push('List all ' + n + ' vertices, starting with ' + esc(start) + ' (you listed ' + verts.length + ').');
  const ok = right === n - 1 && right === edges.length && (!verts.length || verts.length === n);
  return {ok, notes, ties, stepsRight: right, total: ok ? edges.reduce((s, e) => s + gW(g, e[0], e[1]), 0) : null};
}

function renderMstLab(opts, onDone){
  let which = 'prim', start = null;
  const root = el('div', {class:'no-gloss'});
  const algSel = el('select', {class:'sel', 'aria-label':'Algorithm'}, [el('option', {value:'prim', text:'Prim'}), el('option', {value:'kruskal', text:'Kruskal'})]);
  algSel.addEventListener('change', () => { which = algSel.value; paintForm(); });
  const startHost = el('label', {}, [document.createTextNode('Start')]);
  const ui = mstGraphUI(opts.preset || 'lab9', g => {
    start = findNode(g, 'v1') ? 'v1' : g.nodes[0].id;
    if (startHost.lastChild && startHost.lastChild.tagName === 'SELECT') startHost.removeChild(startHost.lastChild);
    startHost.appendChild(startSelect(g, start, v => { start = v; paintForm(); }));
    paintForm();
  });
  const figHost = el('div'), form = el('div');
  root.appendChild(el('div', {class:'ctrl'}, ui.controls.concat([el('label', {}, [document.createTextNode('Algorithm'), algSel]), startHost])));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(figHost); root.appendChild(ui.matHost); root.appendChild(form);

  function paintForm(){
    const g = ui.graph();
    startHost.style.display = which === 'prim' ? '' : 'none';
    figHost.innerHTML = '';
    figHost.appendChild(graphFigure(g, {draggable:true, onMoved:() => {}}, null));
    form.innerHTML = '';
    form.appendChild(el('p', {html:'<i>"List the sequence of vertices and edges added using ' + (which === 'prim' ? 'Prim\'s algorithm … Choose ' + esc(start) + ' as the starting vertex' : 'Kruskal\'s algorithm') + ' to construct a minimum spanning tree."</i> — Lab 9 wording.'}));
    const vIn = el('input', {type:'text', class:'path-in wideline', placeholder: start + ', …', 'aria-label':'Vertices added in order', autocomplete:'off'});
    const eIn = el('input', {type:'text', class:'path-in wideline', placeholder:'(' + (which === 'prim' ? start : 'a') + ', …), (…, …), …', 'aria-label':'Edges added in order', autocomplete:'off'});
    const tIn = el('input', {type:'text', class:'din', inputmode:'numeric', 'aria-label':'Total weight', autocomplete:'off'});
    if (which === 'prim') form.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Vertices added, in order: '}), vIn]));
    form.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Edges added, in order: '}), eIn]));
    form.appendChild(el('div', {class:'btnrow'}, [el('span', {text:'Total weight: '}), tIn]));
    form.appendChild(el('p', {class:'subtle', html:'Write edges as <span class="mono">(v1, v2)</span> or <span class="mono">v1-v2</span>, separated by commas; weights after an edge are ignored. ' + (which === 'kruskal' ? 'Kruskal adds <b>edges</b>, not vertices one at a time, so the edge list is the answer (you may also list the edges it skips, on paper).' : 'Vertices: <span class="mono">v1, v7, v2 …</span>')}));
    const fb = el('div', {class:'feedback'}), model = el('div');
    const check = el('button', {class:'btn', type:'button', text:'Check'});
    const show = el('button', {class:'btn sec', type:'button', text:'Show my working'});
    const showModel = () => {
      model.innerHTML = '';
      model.appendChild(el('div', {class:'prompt'}, [el('span', {class:'badge lecture', text:'My working'}), document.createTextNode(' One valid answer' + (hasTie(g) ? ' (with ties, other orders are also valid — the checker accepts them)' : ''))]));
      model.appendChild(el('div', {class:'codebox no-gloss'}, [el('pre', {text: labFormat(g, which, start)})]));
    };
    show.addEventListener('click', showModel);
    check.addEventListener('click', () => {
      const pe = parseEdgeSeq(g, eIn.value), pv = which === 'prim' ? parseVertexSeq(g, vIn.value) : {ids:[]};
      if (pe.error || pv.error){ fb.className = 'feedback show bad'; fb.innerHTML = '✘ ' + esc(pe.error || pv.error); return; }
      if (!pe.edges.length){ fb.className = 'feedback show bad'; fb.innerHTML = '✘ No edges found — write them like (v1, v2).'; return; }
      if (which === 'prim' && !pv.ids.length){ fb.className = 'feedback show bad'; fb.innerHTML = '✘ Lab 9 asks for the vertices too — list them in the order they join Y.'; return; }
      const r = which === 'prim' ? checkPrimSeq(g, start, pv.ids, pe.edges) : checkKruskalSeq(g, pe.edges);
      const tot = Number(tIn.value), totOk = r.ok && String(tIn.value).trim() !== '' && tot === r.total;
      const good = r.ok && totOk;
      fb.className = 'feedback show ' + (good ? 'good' : 'bad');
      fb.innerHTML = (good ? '✔ A correct ' + (which === 'prim' ? 'Prim' : 'Kruskal') + ' sequence, total ' + r.total + '.' :
        r.ok ? '✔ The sequence is right, but the total weight is ' + r.total + '.' : '✘ ' + r.stepsRight + ' step' + (r.stepsRight === 1 ? '' : 's') + ' right, then a problem:') +
        (r.notes.length ? '<ul><li>' + r.notes.join('</li><li>') + '</li></ul>' : '') +
        (good && r.ties === 0 && hasTie(g) ? '<p class="subtle">This graph has equal weights, but they did not affect your order.</p>' : '');
      if (good){ showModel(); if (onDone) onDone(); }
    });
    form.appendChild(el('div', {class:'btnrow'}, [check, show]));
    form.appendChild(fb); form.appendChild(model);
  }
  function hasTie(g){ const w = g.edges.map(e => e.w); return w.some((x, k) => w.indexOf(x) !== k); }
  ui.start();
  return root;
}

/* ============================================================
   Kruskal vs Prim, side by side
   ============================================================ */
function renderMstSideBySide(opts, onDone){
  let start = null;
  const root = el('div', {class:'no-gloss'});
  const startHost = el('label', {}, [document.createTextNode('Prim starts at')]);
  const ui = mstGraphUI(opts.preset || 'lab9', g => {
    if (!start || !findNode(g, start)) start = findNode(g, 'v1') ? 'v1' : g.nodes[0].id;
    if (startHost.lastChild && startHost.lastChild.tagName === 'SELECT') startHost.removeChild(startHost.lastChild);
    startHost.appendChild(startSelect(g, start, v => { start = v; paint(); }));
    paint();
  });
  const body = el('div');
  root.appendChild(el('div', {class:'ctrl'}, ui.controls.concat([startHost])));
  ui.blocks.forEach(b => root.appendChild(b));
  root.appendChild(ui.matHost); root.appendChild(body);
  function col(title, g, F, lines, total){
    return el('div', {class:'sbs-col'}, [
      el('h3', {text:title}),
      graphFigure(cloneGraph(g), {tree:F}, null),
      el('ol', {class:'sbs-list'}, lines.map(x => el('li', {html:x}))),
      el('p', {html:'Total weight: <b>' + total + '</b>'})
    ]);
  }
  function paint(){
    const g = ui.graph(), k = kruskalSteps(g), p = primSteps(g, start);
    const kKeys = k.F.map(e => [e[0], e[1]].sort(naturalCmp).join('|')).sort(), pKeys = p.F.map(e => [e[0], e[1]].sort(naturalCmp).join('|')).sort();
    const sameSet = kKeys.join() === pKeys.join();
    const sameOrder = sameSet && k.F.every((e, i) => sameEdge({u:e[0], v:e[1]}, p.F[i][0], p.F[i][1]));
    body.innerHTML = '';
    body.appendChild(el('div', {class:'sbs'}, [
      col('Kruskal', g, k.F, k.steps.map(s => (s.accept ? '' : '<s>') + esc(eStr(s.edge.u, s.edge.v, s.edge.w)) + (s.accept ? '' : '</s> <span class="subtle">skipped (cycle)</span>')), k.total),
      col('Prim from ' + start, g, p.F, p.steps.map(s => esc(s.pick.to) + ' via ' + esc(eStr(s.pick.from, s.pick.to, s.pick.w))), p.total)
    ]));
    const notes = ['<b>Same total weight: ' + k.total + (k.total === p.total ? '' : ' vs ' + p.total + ' (this should never happen — please report it)') + '.</b> Both algorithms always give a minimum spanning tree.',
      sameSet ? 'Here they also choose <b>the same edges</b>' + (sameOrder ? ', even in the same order.' : ', but in a <b>different order</b>: Kruskal goes by weight across the whole graph, while Prim grows one tree outward from ' + esc(start) + '.')
              : 'Here they end with <b>different edges</b> — possible only when some weights tie: the graph has more than one MST, and each algorithm found one of them.'];
    body.appendChild(el('div', {class:'note'}, [el('div', {class:'note-title', text:'What to notice'}), el('ul', {}, notes.map(x => el('li', {html:x})))]));
    if (onDone) onDone();
  }
  ui.start();
  return root;
}
