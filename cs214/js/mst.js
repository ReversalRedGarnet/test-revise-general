/* ============================================================
   CS214 Revise — Kruskal and Prim (Lec 9.1): step engines and the
   static step tables used by the lesson pages. mstviz.js builds the
   interactive activities on top of these.

   Ties: the course states no tie rule. Here:
     Kruskal — edges of equal weight are taken in the order the graph
               lists them (the slide's own sorted list for Lec 9.1)
     Prim    — among equally near vertices, the first in column order;
               among equal edges into that vertex, the first listed
   Every step records whether a tie was involved, so the pages can say so.
   ============================================================ */

/* endpoints in natural order, so an edge always reads (v5, v6), never (v6, v5) */
function undirectedEdges(g){
  return g.edges.map((e, i) => naturalCmp(e.u, e.v) <= 0 ? {u:e.u, v:e.v, w:e.w, i} : {u:e.v, v:e.u, w:e.w, i});
}

/* ---------- Kruskal ---------- */
function kruskalSteps(g){
  const edges = undirectedEdges(g).sort((a, b) => a.w - b.w || a.i - b.i);
  const setOf = {};
  nodeIds(g).forEach(v => setOf[v] = [v]);
  const F = [], steps = [];
  let subsets = nodeIds(g).length;
  for (const e of edges){
    if (subsets === 1) break;
    const before = uniqueSets(setOf, g);
    const sameW = edges.filter(x => x !== e && x.w === e.w);
    const A = setOf[e.u], B = setOf[e.v];
    const ok = A !== B;
    if (ok){
      const merged = A.concat(B).sort(naturalCmp);
      merged.forEach(v => setOf[v] = merged);
      F.push([e.u, e.v]); subsets--;
    }
    steps.push({edge:e, before, accept:ok, tie: sameW.length > 0, F:F.map(x => x.slice()), after:uniqueSets(setOf, g)});
  }
  return {steps, F, total: F.reduce((s, e) => s + gW(g, e[0], e[1]), 0)};
}
function uniqueSets(setOf, g){
  const seen = [], out = [];
  nodeIds(g).forEach(v => { if (seen.indexOf(setOf[v]) < 0){ seen.push(setOf[v]); out.push(setOf[v].slice()); } });
  return out;
}

/* ---------- Prim ---------- */
function primSteps(g, start){
  start = start || g.source || nodeIds(g)[0];
  const ids = nodeIds(g), Y = [start], F = [], steps = [];
  const edges = undirectedEdges(g);
  while (Y.length < ids.length){
    // every edge with one end in Y and the other outside
    const cross = edges.filter(e => (Y.indexOf(e.u) >= 0) !== (Y.indexOf(e.v) >= 0))
      .map(e => Y.indexOf(e.u) >= 0 ? {from:e.u, to:e.v, w:e.w, i:e.i} : {from:e.v, to:e.u, w:e.w, i:e.i});
    if (!cross.length) break;                              // graph not connected
    const m = Math.min.apply(null, cross.map(c => c.w));
    const best = cross.filter(c => c.w === m).sort((a, b) => ids.indexOf(a.to) - ids.indexOf(b.to) || a.i - b.i);
    const pick = best[0];
    const tieVertices = best.map(c => c.to).filter((v, k, a) => a.indexOf(v) === k);
    steps.push({Y:Y.slice(), cross, pick, tie: best.length > 1, tieVertices, tieEdges: best});
    Y.push(pick.to); F.push([pick.from, pick.to]);
  }
  return {steps, Y, F, total: F.reduce((s, e) => s + gW(g, e[0], e[1]), 0)};
}

/* ---------- static tables for the lessons ---------- */
function setsText(sets){ return sets.map(s => '{' + s.join(', ') + '}').join(' '); }

function kruskalTable(g){
  const r = kruskalSteps(g);
  const rows = r.steps.map((s, k) => el('tr', {class: s.accept ? '' : 'rej'}, [
    el('td', {text: String(k + 1)}),
    el('td', {class:'mono', text: '(' + s.edge.u + ', ' + s.edge.v + ')'}),
    el('td', {text: String(s.edge.w) + (s.tie ? ' (tie)' : '')}),
    el('td', {class:'mono small', text: setsText(s.before)}),
    el('td', {html: s.accept ? '✔ <b>Add</b> — ' + esc(s.edge.u) + ' and ' + esc(s.edge.v) + ' are in different subsets; merge them'
                              : '✘ <b>Skip</b> — both already in the same subset, so it would make a cycle'})
  ]));
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'mst'}, [
    el('thead', {}, [el('tr', {}, ['Step', 'Next edge', 'Weight', 'Disjoint subsets before', 'Feasibility check'].map(x => el('th', {text:x})))]),
    el('tbody', {}, rows)])]);
}

function primTable(g, start){
  const r = primSteps(g, start);
  const rows = r.steps.map((s, k) => el('tr', {}, [
    el('td', {text: String(k + 1)}),
    el('td', {class:'mono small', text: '{' + s.Y.join(', ') + '}'}),
    el('td', {class:'mono small', text: s.cross.slice().sort((a, b) => a.w - b.w).map(c => '(' + c.from + ',' + c.to + ') ' + c.w).join('  ')}),
    el('td', {html: '<b>' + esc(s.pick.to) + '</b> via (' + esc(s.pick.from) + ', ' + esc(s.pick.to) + '), weight ' + s.pick.w +
      (s.tie ? '<br><span class="tie small">tie: ' + s.tieEdges.map(c => '(' + esc(c.from) + ',' + esc(c.to) + ')').join(' and ') + ' both weigh ' + s.pick.w + '</span>' : '')})
  ]));
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'mst'}, [
    el('thead', {}, [el('tr', {}, ['Step', 'Y before', 'Edges from Y to V − Y', 'Nearest vertex (added to Y) and edge (added to F)'].map(x => el('th', {text:x})))]),
    el('tbody', {}, rows)])]);
}

/* the Lab 9 answer format: "list the sequence of vertices and edges added" */
function labFormat(g, which, start){
  if (which === 'prim'){
    const r = primSteps(g, start);
    return 'Vertices added (in order): ' + r.Y.join(', ') + '\nEdges added (in order): ' + r.F.map(e => '(' + e[0] + ', ' + e[1] + ')').join(', ') +
           '\nTotal weight: ' + r.total;
  }
  const r = kruskalSteps(g);
  return 'Edges added (in order): ' + r.F.map(e => '(' + e[0] + ', ' + e[1] + ') ' + gW(g, e[0], e[1])).join(', ') +
         '\nEdges skipped (cycle): ' + (r.steps.filter(s => !s.accept).map(s => '(' + s.edge.u + ', ' + s.edge.v + ')').join(', ') || 'none') +
         '\nTotal weight: ' + r.total;
}
