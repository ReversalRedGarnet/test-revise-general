/* ============================================================
   CS214 Revise — graph model, presets, parser, SVG drawing
   A graph is a plain object:
     { name, tag, directed, source, nodes:[{id,x,y}], edges:[{u,v,w}] }
   Node order = column order in every table (the lecturer's table
   lists vertices 1..n left to right), so presets keep the course's
   own numbering order.
   Used by dijkstra.js, mst.js and mstviz.js.
   ============================================================ */

function cloneGraph(g){ return JSON.parse(JSON.stringify(g)); }
function nodeIds(g){ return g.nodes.map(n => n.id); }
function findNode(g, id){ return g.nodes.find(n => n.id === id); }

/* weight of the edge u→v (either way round if undirected); Infinity if none */
function gW(g, u, v){
  let best = Infinity;
  g.edges.forEach(e => {
    if ((e.u === u && e.v === v) || (!g.directed && e.u === v && e.v === u)) best = Math.min(best, e.w);
  });
  return best;
}

/* the adjacency matrix W the slides start from: 0 on the diagonal, ∞ for "no edge" */
function adjMatrix(g){
  const ids = nodeIds(g);
  return ids.map(a => ids.map(b => a === b ? 0 : gW(g, a, b)));
}
function fmtW(x){ return x === Infinity ? '∞' : String(x); }

/* ---------- presets (all from the course material unless tagged extra) ---------- */
const GRAPH_PRESETS = {
  lecture92: {
    name:'Lecture 9.2 example (from v1)', tag:'lecture', directed:true, source:'v1',
    note:'The textbook example in Lec 9.2 slides 4–7 — the one the lecturer solved with the table.',
    nodes:[ {id:'v1',x:250,y:40}, {id:'v2',x:420,y:140}, {id:'v3',x:360,y:280},
            {id:'v4',x:140,y:280}, {id:'v5',x:80,y:140} ],
    edges:[ {u:'v1',v:'v5',w:1}, {u:'v1',v:'v4',w:6}, {u:'v1',v:'v3',w:4}, {u:'v1',v:'v2',w:7},
            {u:'v5',v:'v4',w:1}, {u:'v4',v:'v2',w:3}, {u:'v3',v:'v2',w:2}, {u:'v3',v:'v4',w:5} ]
  },
  test2025: {
    name:'Test 2 (2025) Q4 — warehouse W', tag:'past', directed:true, source:'W',
    note:'Question 4 of the 2025 Test 2 paper (4 marks). It is also in the mock test — skip it here if you want it fresh.',
    nodes:[ {id:'W',x:40,y:160}, {id:'A',x:170,y:60}, {id:'B',x:170,y:270},
            {id:'C',x:300,y:110}, {id:'D',x:420,y:165}, {id:'E',x:540,y:220} ],
    edges:[ {u:'W',v:'A',w:3}, {u:'W',v:'B',w:2}, {u:'A',v:'C',w:4}, {u:'B',v:'C',w:1},
            {u:'B',v:'D',w:7}, {u:'C',v:'D',w:2}, {u:'D',v:'E',w:1} ]
  },
  lecture91: {
    name:'Lecture 9.1 MST example (from v1)', tag:'lecture', directed:false, source:'v1',
    note:'The Prim/Kruskal example in Lec 9.1 slides 4–11. Undirected. Edges listed in the slide\'s sorted order.',
    nodes:[ {id:'v1',x:90,y:50}, {id:'v2',x:330,y:50}, {id:'v3',x:90,y:200}, {id:'v4',x:330,y:200}, {id:'v5',x:210,y:310} ],
    edges:[ {u:'v1',v:'v2',w:1}, {u:'v3',v:'v5',w:2}, {u:'v1',v:'v3',w:3}, {u:'v2',v:'v3',w:3},
            {u:'v3',v:'v4',w:4}, {u:'v4',v:'v5',w:5}, {u:'v2',v:'v4',w:6} ]
  },
  lab9: {
    name:'Lab 9 graph (from v2)', tag:'lab', directed:false, source:'v2',
    note:'Lab 9 Activity 2: "List the sequence of vertices and edges added using Dijkstra\'s algorithm … from v2". Undirected.',
    nodes:[ {id:'v1',x:100,y:250}, {id:'v2',x:100,y:110}, {id:'v3',x:250,y:40}, {id:'v4',x:400,y:110},
            {id:'v5',x:400,y:250}, {id:'v6',x:250,y:320}, {id:'v7',x:250,y:180} ],
    edges:[ {u:'v2',v:'v3',w:7}, {u:'v3',v:'v4',w:6}, {u:'v2',v:'v7',w:1}, {u:'v3',v:'v7',w:8},
            {u:'v4',v:'v7',w:8}, {u:'v1',v:'v7',w:5}, {u:'v7',v:'v5',w:9}, {u:'v7',v:'v6',w:15},
            {u:'v1',v:'v6',w:10}, {u:'v6',v:'v5',w:2} ]
  },
  lab9a: {
    name:'Lab 9 optional matrix (A) (from 1)', tag:'lab', directed:false, source:'1',
    note:'Lab 9 optional exercise, adjacency matrix (A). The lab gives only the matrix; the drawing is ours.',
    nodes:[ {id:'1',x:60,y:170}, {id:'2',x:220,y:60}, {id:'3',x:220,y:280}, {id:'4',x:380,y:60} ],
    edges:[ {u:'1',v:'2',w:5}, {u:'1',v:'3',w:6}, {u:'2',v:'3',w:2}, {u:'2',v:'4',w:3} ]
  },
  lab9b: {
    name:'Lab 9 optional matrix (B) (from 1)', tag:'lab', directed:false, source:'1',
    note:'Lab 9 optional exercise, adjacency matrix (B). The lab gives only the matrix; the drawing is ours.',
    nodes:[ {id:'1',x:50,y:170}, {id:'2',x:200,y:50}, {id:'3',x:200,y:290}, {id:'4',x:350,y:170},
            {id:'5',x:350,y:320}, {id:'6',x:500,y:250} ],
    edges:[ {u:'1',v:'2',w:32}, {u:'1',v:'3',w:17}, {u:'2',v:'4',w:45}, {u:'3',v:'4',w:10},
            {u:'3',v:'5',w:3}, {u:'4',v:'6',w:25}, {u:'5',v:'6',w:4} ]
  },
  q3style: {
    name:'Base stations, 2025 Q3-style (from A)', tag:'extra', directed:false, source:'A',
    note:'Written for this site in the setting of 2025 Q3 (cable between base stations; weights = trenching km). Not from the course material. It has a tie at 4, so it has two MSTs.',
    nodes:[ {id:'A',x:60,y:80}, {id:'B',x:250,y:40}, {id:'C',x:170,y:200}, {id:'D',x:420,y:130},
            {id:'E',x:330,y:280}, {id:'F',x:540,y:250} ],
    edges:[ {u:'A',v:'C',w:2}, {u:'C',v:'E',w:3}, {u:'A',v:'B',w:4}, {u:'B',v:'C',w:4},
            {u:'D',v:'E',w:5}, {u:'B',v:'D',w:6}, {u:'D',v:'F',w:7}, {u:'E',v:'F',w:8}, {u:'C',v:'D',w:9} ]
  }
};
const PRESET_TAG_LABEL = { lecture:'Lecture', past:'Past paper', lab:'Lab', extra:'Extra practice' };

function presetGraph(key){
  const g = cloneGraph(GRAPH_PRESETS[key]);
  g.key = key;
  fitViewBox(g);
  return g;
}

/* ---------- random graph for extra practice ----------
   5–6 vertices on a jittered ring, edges only between ring-neighbours
   (keeps the picture readable), every vertex reachable from A, and at
   least one distance that gets improved later (otherwise it's too easy). */
function randomGraph(opts){
  opts = opts || {};
  const directed = opts.directed != null ? opts.directed : Math.random() < 0.5;
  for (let attempt = 0; attempt < 200; attempt++){
    const n = 5 + Math.floor(Math.random()*2);
    const ids = 'ABCDEF'.slice(0, n).split('');
    const nodes = ids.map((id, i) => {
      const a = -Math.PI/2 + i * 2*Math.PI/n + (Math.random()-.5)*0.35;
      return { id, x: Math.round(270 + 210*Math.cos(a)), y: Math.round(175 + 140*Math.sin(a)) };
    });
    const edges = [], has = {};
    const add = (u, v) => {
      const k = [u,v].sort().join('|'); if (has[k] || u === v) return;
      has[k] = 1; edges.push({u, v, w: 1 + Math.floor(Math.random()*9)});
    };
    // a spanning structure out of A so everything is reachable
    const order = ids.slice(1).sort(() => Math.random() - .5);
    const inTree = ['A'];
    order.forEach(v => {
      const near = inTree.filter(u => ringDist(ids, u, v) <= 2);
      const u = near.length ? near[Math.floor(Math.random()*near.length)] : inTree[0];
      add(u, v); inTree.push(v);
    });
    // a few extra ring-neighbour edges to create choices
    for (let i = 0; i < n; i++){
      for (let d = 1; d <= 2; d++){
        if (Math.random() < (d === 1 ? .55 : .3)) add(ids[i], ids[(i+d) % n]);
      }
    }
    if (directed){
      // orient tree edges away from A; others at random
      edges.forEach(e => { if (Math.random() < .25 && e.u !== 'A'){ const t = e.u; e.u = e.v; e.v = t; } });
    }
    const g = { name:'Random graph', tag:'extra', directed, source:'A', nodes, edges,
                note:'Generated for extra practice — not from the course material.' };
    const st = new DijkstraState(g);
    const run = st.runAll();
    const reachAll = ids.every(v => run.dist[v] < Infinity);
    if (!reachAll || run.updates < 1 || run.ties > 1 || edges.length > n + 4) continue;
    fitViewBox(g);
    return g;
  }
  return presetGraph('lecture92');
}
function ringDist(ids, a, b){
  const n = ids.length, d = Math.abs(ids.indexOf(a) - ids.indexOf(b));
  return Math.min(d, n - d);
}

/* ---------- edge-list text <-> graph ---------- */
function graphToText(g){
  return g.edges.map(e => e.u + ' ' + e.v + ' ' + e.w).join('\n');
}
/* accepts lines like "A B 3", "A->B 3", "A-B 3", "A,B,3"; returns {g} or {error} */
function textToGraph(text, directed, oldGraph){
  const edges = [], seen = [];
  const lines = String(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++){
    const raw = lines[i].trim();
    if (!raw || raw[0] === '#') continue;
    let t = raw.replace(/->|→/g, ' ').replace(/,/g, ' ').trim().split(/\s+/);
    if (t.length === 2 && /^[^-]+-[^-]+$/.test(t[0])) t = t[0].split('-').concat(t[1]);
    if (t.length !== 3) return {error:'Line ' + (i+1) + ' ("' + raw + '"): write it as  from to weight,  e.g.  A B 3'};
    const w = Number(t[2]);
    if (!isFinite(w)) return {error:'Line ' + (i+1) + ': "' + t[2] + '" is not a number.'};
    if (w < 0) return {error:'Line ' + (i+1) + ': negative weight. Dijkstra (and every CS214 example) assumes weights ≥ 0, so negative weights are not allowed here.'};
    if (t[0] === t[1]) return {error:'Line ' + (i+1) + ': an edge from a vertex to itself is not allowed.'};
    if (!/^[A-Za-z0-9_]{1,4}$/.test(t[0]) || !/^[A-Za-z0-9_]{1,4}$/.test(t[1])) return {error:'Line ' + (i+1) + ': vertex names must be 1–4 letters/digits.'};
    edges.push({u:t[0], v:t[1], w});
    [t[0], t[1]].forEach(id => { if (seen.indexOf(id) < 0) seen.push(id); });
  }
  if (seen.length < 2) return {error:'Add at least one edge.'};
  if (seen.length > 9) return {error:'Keep it to 9 vertices or fewer — bigger graphs don\'t fit a test-style table.'};
  // keep old positions where the vertex already existed; put new ones on a ring
  const old = {}; (oldGraph ? oldGraph.nodes : []).forEach(n => old[n.id] = n);
  const ordered = seen.slice().sort(naturalCmp);
  const nodes = ordered.map((id, i) => old[id] ? {id, x:old[id].x, y:old[id].y} : {
    id, x: Math.round(270 + 210*Math.cos(-Math.PI/2 + i*2*Math.PI/ordered.length)),
        y: Math.round(175 + 140*Math.sin(-Math.PI/2 + i*2*Math.PI/ordered.length)) });
  const g = { name:'Your graph', tag:'extra', directed:!!directed, nodes, edges,
              source: (oldGraph && seen.indexOf(oldGraph.source) >= 0) ? oldGraph.source : seen[0],
              note:'Your own edited graph.' };
  fitViewBox(g);
  return {g};
}
function naturalCmp(a, b){
  const na = a.replace(/^v/i,''), nb = b.replace(/^v/i,'');
  if (/^\d+$/.test(na) && /^\d+$/.test(nb) && a.replace(/\d+$/,'') === b.replace(/\d+$/,'')) return Number(na) - Number(nb);
  return a < b ? -1 : a > b ? 1 : 0;
}

/* ---------- label matching for typed answers: "1" matches v1, "v1" matches 1, any case ---------- */
function matchLabel(g, typed){
  const s = String(typed || '').trim().toLowerCase();
  if (!s) return null;
  const strip = x => x.toLowerCase().replace(/^v(?=\d)/, '');
  const hit = g.nodes.find(n => n.id.toLowerCase() === s) || g.nodes.find(n => strip(n.id) === strip(s));
  return hit ? hit.id : null;
}

/* ---------- SVG drawing ---------- */
const SVGNS = 'http://www.w3.org/2000/svg';
let SVG_UID = 0;
const NODE_R = 18;

function fitViewBox(g){
  const xs = g.nodes.map(n => n.x), ys = g.nodes.map(n => n.y);
  const pad = 48;
  const minX = Math.min.apply(null, xs) - pad, minY = Math.min.apply(null, ys) - pad;
  const w = Math.max(Math.max.apply(null, xs) - minX + pad, 260);
  const h = Math.max.apply(null, ys) - minY + pad;
  g.vb = [minX, minY, w, h];
}

function svgEl(tag, attrs, kids){
  const n = document.createElementNS(SVGNS, tag);
  for (const k in (attrs || {})) n.setAttribute(k, attrs[k]);
  (kids || []).forEach(c => n.appendChild(c));
  return n;
}

/* opts:
   inY: {id:true}       filled (done) vertices
   cur: id              highlighted vertex (just selected)
   tree: [[u,v],…]      edges drawn as tree edges (F)
   cand: [[u,v],…]      edges drawn as "being looked at"
   mark: {id:'ok'|'no'} coloured feedback on vertices
   dist: {id:{text,sup,final}}  small label above each vertex
   pickable: {id:true}  vertices that respond to onPick
   onPick(id), draggable, onMoved() */
function drawGraph(g, opts){
  opts = opts || {};
  if (!g.vb) fitViewBox(g);
  const uid = ++SVG_UID;
  const svg = svgEl('svg', {viewBox: g.vb.join(' '), role:'img',
    'aria-label': (g.directed ? 'Directed' : 'Undirected') + ' weighted graph with vertices ' + nodeIds(g).join(', ')});

  const defs = svgEl('defs');
  [['n','#9fb4c4'], ['t','#2f7fbf'], ['c','#c98200']].forEach(([k, col]) => {
    defs.appendChild(svgEl('marker', {id:'ar' + k + uid, viewBox:'0 0 10 10', refX:'9', refY:'5',
      markerWidth:'11', markerHeight:'11', orient:'auto-start-reverse', markerUnits:'userSpaceOnUse'},
      [svgEl('path', {d:'M0,0 L10,5 L0,10 z', fill:col})]));
  });
  svg.appendChild(defs);

  const inList = (list, u, v) => (list || []).some(p => (p[0] === u && p[1] === v) || (!g.directed && p[0] === v && p[1] === u));
  const edgeLayer = svgEl('g'), labelLayer = svgEl('g'), nodeLayer = svgEl('g');

  function paintEdges(){
  while (edgeLayer.firstChild) edgeLayer.removeChild(edgeLayer.firstChild);
  while (labelLayer.firstChild) labelLayer.removeChild(labelLayer.firstChild);
  g.edges.forEach(e => {
    const a = findNode(g, e.u), b = findNode(g, e.v);
    if (!a || !b) return;
    const isTree = inList(opts.tree, e.u, e.v), isCand = inList(opts.cand, e.u, e.v);
    const cls = 'g-edge' + (isTree ? ' tree' : isCand ? ' cand' : '') + (opts.dimOthers && !isTree && !isCand ? ' dim' : '');
    // opposite directed edge → bend both so they don't overlap
    const twin = g.directed && g.edges.some(f => f.u === e.v && f.v === e.u);
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    const ux = dx/len, uy = dy/len, nx = -uy, ny = ux;
    const bend = twin ? 22 : 0;
    const sx = a.x + ux*NODE_R, sy = a.y + uy*NODE_R;
    const ex = b.x - ux*(NODE_R + (g.directed ? 2 : 0)), ey = b.y - uy*(NODE_R + (g.directed ? 2 : 0));
    const mx = (a.x + b.x)/2 + nx*bend, my = (a.y + b.y)/2 + ny*bend;
    const path = bend ? 'M' + sx + ',' + sy + ' Q' + mx + ',' + my + ' ' + ex + ',' + ey
                      : 'M' + sx + ',' + sy + ' L' + ex + ',' + ey;
    const attrs = {d: path, class: cls};
    if (g.directed) attrs['marker-end'] = 'url(#ar' + (isTree ? 't' : isCand ? 'c' : 'n') + uid + ')';
    edgeLayer.appendChild(svgEl('path', attrs));
    // weight label: at the midpoint, nudged off the line
    const off = bend ? 12 : 11;
    const lx = bend ? (a.x + b.x)/2 + nx*(bend*0.5 + off) : (a.x + b.x)/2 + nx*off;
    const ly = bend ? (a.y + b.y)/2 + ny*(bend*0.5 + off) : (a.y + b.y)/2 + ny*off;
    const t = svgEl('text', {x:lx, y:ly, class:'g-w' + (isTree ? ' tree' : isCand ? ' cand' : '')});
    t.textContent = fmtW(e.w);
    labelLayer.appendChild(t);
  });
  g.nodes.forEach(nd => {
    const dl = opts.dist && opts.dist[nd.id];
    if (!dl) return;
    const pos = labelSpot(g, nd);
    const tx = svgEl('text', {x: pos.x, y: pos.y, class:'g-dist' + (dl.final ? ' final' : '')});
    tx.appendChild(document.createTextNode(dl.text));
    if (dl.sup){
      const s = svgEl('tspan', {dy:'-5', 'font-size':'10'}); s.textContent = dl.sup; tx.appendChild(s);
    }
    labelLayer.appendChild(tx);
  });
  }
  paintEdges();

  g.nodes.forEach(nd => {
    const cls = ['g-node'];
    if (opts.inY && opts.inY[nd.id]) cls.push('inY');
    if (nd.id === g.source) cls.push('src');
    if (opts.cur === nd.id) cls.push('cur');
    if (opts.mark && opts.mark[nd.id]) cls.push(opts.mark[nd.id]);
    const pick = opts.pickable && opts.pickable[nd.id];
    if (pick) cls.push('pick');
    if (opts.draggable) cls.push('movable');
    const grp = svgEl('g', {class: cls.join(' '), transform:'translate(' + nd.x + ',' + nd.y + ')'});
    grp.appendChild(svgEl('circle', {r: NODE_R}));
    const t = svgEl('text', {}); t.textContent = nd.id; grp.appendChild(t);
    if (pick){
      grp.setAttribute('tabindex', '0'); grp.setAttribute('role', 'button');
      grp.setAttribute('aria-label', 'Pick vertex ' + nd.id);
      grp.addEventListener('click', () => opts.onPick(nd.id));
      grp.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); opts.onPick(nd.id); } });
    }
    if (opts.draggable) enableDrag(svg, grp, g, nd, paintEdges, opts.onMoved);
    nodeLayer.appendChild(grp);
  });
  svg.appendChild(edgeLayer); svg.appendChild(nodeLayer); svg.appendChild(labelLayer);
  return svg;
}

/* put a vertex's distance label in the direction (of 8) furthest from any of its edges; prefer "above" */
function labelSpot(g, nd){
  const angs = [];
  g.edges.forEach(e => {
    const other = e.u === nd.id ? findNode(g, e.v) : e.v === nd.id ? findNode(g, e.u) : null;
    if (other) angs.push(Math.atan2(other.y - nd.y, other.x - nd.x));
  });
  let best = -Math.PI/2, bestGap = -1;
  for (let i = 0; i < 8; i++){
    const a = -Math.PI/2 + i * Math.PI/4;
    let gap = Math.PI;
    angs.forEach(b => { let d = Math.abs(a - b) % (2*Math.PI); if (d > Math.PI) d = 2*Math.PI - d; gap = Math.min(gap, d); });
    if (gap > bestGap + 0.2){ bestGap = gap; best = a; }
  }
  const r = NODE_R + 13;
  return { x: nd.x + Math.cos(best) * (r + 6), y: nd.y + Math.sin(best) * r + 4 };
}

function enableDrag(svg, grp, g, nd, repaint, onMoved){
  let dragging = false, start = null;
  grp.addEventListener('pointerdown', ev => {
    dragging = true; start = {x: ev.clientX, y: ev.clientY};
    try { grp.setPointerCapture(ev.pointerId); } catch(e){}
  });
  grp.addEventListener('pointermove', ev => {
    if (!dragging) return;
    const ctm = svg.getScreenCTM(); if (!ctm) return;
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const p = pt.matrixTransform(ctm.inverse());
    const vb = g.vb;
    nd.x = Math.round(Math.max(vb[0] + NODE_R, Math.min(vb[0] + vb[2] - NODE_R, p.x)));
    nd.y = Math.round(Math.max(vb[1] + NODE_R + 14, Math.min(vb[1] + vb[3] - NODE_R, p.y)));
    grp.setAttribute('transform', 'translate(' + nd.x + ',' + nd.y + ')');
    repaint();
  });
  const end = ev => {
    if (!dragging) return;
    dragging = false;
    const moved = start && Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 3;
    if (moved && onMoved) onMoved();
  };
  grp.addEventListener('pointerup', end);
  grp.addEventListener('pointercancel', end);
}

/* figure wrapper with an optional caption */
function graphFigure(g, opts, caption){
  const fig = el('figure', {class:'gfig no-gloss' + (opts && opts.draggable ? ' drag' : '')});
  fig.style.margin = '0 0 14px';
  fig.appendChild(drawGraph(g, opts));
  if (caption) fig.appendChild(el('figcaption', {html: md(caption)}));
  return fig;
}

/* adjacency matrix as a table */
function matrixTable(g){
  const ids = nodeIds(g), W = adjMatrix(g);
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'matrix'}, [
    el('thead', {}, [el('tr', {}, [el('th', {text:'W'})].concat(ids.map(i => el('th', {text:i}))))]),
    el('tbody', {}, ids.map((a, r) => el('tr', {}, [el('th', {text:a})].concat(W[r].map(x => el('td', {text: fmtW(x)}))))))
  ])]);
}
