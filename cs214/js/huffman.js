/* ============================================================
   CS214 Revise — Huffman coding: engine, tree drawing, and the
   activities (step-through, do-it-yourself, write-the-codes,
   encode/decode drill, reverse mode).

   The merge loop follows the slide pseudocode (Lec 8.2 slide 16):
     remove(PQ, p); remove(PQ, q);
     r->left = p; r->right = q; r->frequency = p + q; insert(PQ, r);
   p is removed first, so it is the smaller (or equal) node and goes
   on the LEFT (bit 0). That is the default here ("smaller on the
   left"); a "larger on the left" option exists for comparison.

   Ties: the course never states a rule. Two rules are offered and
   named everywhere they matter:
     'old' — among equal frequencies the node that has been in the
             queue longest comes out first (original symbols in table
             order, then merged nodes in the order they were made)
     'new' — merged nodes come out before original symbols, newest first
   Worked examples from the posted photos replay the photo's own
   choices instead (a "script"), and say so at each tie.
   ============================================================ */

/* ---------- built-in inputs ---------- */
const HUFF_SETS = {
  lecture: { name:'Lecture 8.2 example (A = 16, as in the tree)', tag:'lecture',
    note:'Lec 8.2 slides 15–19. The tree and final code table use A = 16 (the slide\'s own table prints 15 — see Known problems).',
    symbols:[['A',16],['B',5],['C',12],['D',17],['E',10],['F',25]] },
  lecture15: { name:'Lecture 8.2 table as printed (A = 15)', tag:'lecture',
    note:'The frequency table exactly as printed on slide 15. A = 15 creates a tie at step 2 — compare the two tie rules.',
    symbols:[['A',15],['B',5],['C',12],['D',17],['E',10],['F',25]] },
  tissue: { name:'ISSUE WITH TISSUE (spaces ignored)', tag:'lab', text:'ISSUE WITH TISSUE', ignoreSpaces:true,
    note:'Lab 9 additional question — posted handwritten solution ("Ignore: space").',
    symbols:[['I',3],['S',4],['U',2],['E',2],['W',1],['H',1],['T',2]],
    script:[['H','W'],['T','U'],['E','HW'],['I','TU'],['EHW','S'],['ITU','EHWS']] },
  committee: { name:'COMMITTEE', tag:'lab', text:'COMMITTEE',
    note:'Lab 9 additional question — posted handwritten solution.',
    symbols:[['C',1],['O',1],['M',2],['I',1],['T',2],['E',2]],
    script:[['C','O'],['I','CO'],['T','E'],['M','ICO'],['TE','MICO']] },
  mississippi: { name:'MISSISSIPPI', tag:'lab', text:'MISSISSIPPI',
    note:'Lab 9 additional question — posted handwritten solution.',
    symbols:[['M',1],['P',2],['I',4],['S',4]],
    script:[['M','P'],['MP','I'],['S','MPI']] },
  lab8: { name:'Lab 8 activity 1 letters', tag:'lab',
    note:'Lab 8 activity 1: "construct an optimal binary prefix code". No posted solution — any working shown is ours.',
    symbols:[['A',10],['B',8],['D',18],['H',9],['I',5],['K',3],['P',1]] }
};
const HUFF_WORDS_EXTRA = ['BANANA', 'ABRACADABRA', 'TENNESSEE', 'BOOKKEEPER', 'ASSESSMENT', 'COCONUT', 'REFERRER', 'SUCCESS'];
const TIE_TEXT = { old:'older first (original symbols in table order, then merged nodes oldest first)',
                   new:'newest first (merged nodes before original symbols)' };
const ORIENT_TEXT = { small:'smaller weight on the left (course)', large:'larger weight on the left' };

/* ---------- engine ---------- */
class Huff {
  constructor(symbols, opts){
    this.opts = Object.assign({tie:'old', orient:'small'}, opts || {});
    this.nodes = []; this.queue = []; this.steps = []; this.counter = 0;
    symbols.forEach(s => {
      const n = {id:this.nodes.length, name:s[0], f:s[1], leaf:true, order:this.counter++};
      this.nodes.push(n); this.queue.push(n.id);
    });
    this.leafIds = this.queue.slice();
  }
  cmp(a, b){
    if (a.f !== b.f) return a.f - b.f;
    if (this.opts.tie === 'new'){
      if (a.leaf !== b.leaf) return a.leaf ? 1 : -1;
      return a.leaf ? a.order - b.order : b.order - a.order;
    }
    return a.order - b.order;
  }
  sorted(){ return this.queue.map(i => this.nodes[i]).sort((a, b) => this.cmp(a, b)).map(n => n.id); }
  legalFirst(){
    const s = this.sorted(), m = this.nodes[s[0]].f;
    return s.filter(i => this.nodes[i].f === m);
  }
  legalSecond(pId){
    const s = this.sorted().filter(i => i !== pId), m = this.nodes[s[0]].f;
    return s.filter(i => this.nodes[i].f === m);
  }
  tieInfo(pId){
    const a = this.legalFirst(), b = pId != null ? this.legalSecond(pId) : [];
    if (a.length < 2 && b.length < 2) return null;
    return { first: a.length > 1 ? a : null, second: b.length > 1 ? b : null };
  }
  done(){ return this.queue.length <= 1; }
  byName(name){ return this.queue.find(i => this.nodes[i].name === name); }
  merge(pId, qId, extra){
    const p = this.nodes[pId], q = this.nodes[qId];
    const before = this.sorted(), rootsBefore = this.queue.slice();
    const tie = this.tieInfo(pId);
    const L = this.opts.orient === 'large' ? q : p, R = this.opts.orient === 'large' ? p : q;
    const r = {id:this.nodes.length, name:L.name + R.name, f:p.f + q.f, leaf:false, left:L.id, right:R.id, order:this.counter++};
    this.nodes.push(r);
    this.queue = this.queue.filter(i => i !== pId && i !== qId);
    this.queue.push(r.id);
    const step = Object.assign({n:this.steps.length + 1, before, rootsBefore, p:pId, q:qId, r:r.id, after:this.sorted(), roots:this.queue.slice(), tie}, extra || {});
    this.steps.push(step);
    return step;
  }
  autoStep(){ const s = this.sorted(); return this.merge(s[0], s[1], {rule:this.opts.tie}); }
  runAll(){ while (!this.done()) this.autoStep(); return this; }
  runScript(picks){
    picks.forEach(([a, b]) => {
      const p = this.byName(a), q = this.byName(b);
      if (p == null || q == null) throw new Error('Script names a node that is not in the queue: ' + a + ', ' + b);
      if (this.legalFirst().indexOf(p) < 0 || this.legalSecond(p).indexOf(q) < 0)
        throw new Error('Script choice is not a legal Huffman step: ' + a + ' + ' + b);
      this.merge(p, q, {scripted:true});
    });
    return this;
  }
  root(){ return this.queue[0]; }
  codes(){
    const out = {};
    const walk = (id, c) => {
      const n = this.nodes[id];
      if (n.leaf){ out[n.name] = c || '0'; return; }
      walk(n.left, c + '0'); walk(n.right, c + '1');
    };
    if (this.queue.length === 1) walk(this.queue[0], '');
    return out;
  }
  leaves(){ return this.leafIds.map(i => this.nodes[i]); }
}

function huffFromSet(key, opts, useScript){
  const set = HUFF_SETS[key];
  const h = new Huff(set.symbols, opts);
  if (useScript && set.script) h.runScript(set.script); else h.runAll();
  return h;
}
function countText(text, ignoreSpaces){
  const out = [], idx = {};
  String(text).toUpperCase().split('').forEach(ch => {
    if (ignoreSpaces && ch === ' ') return;
    const s = ch === ' ' ? '␣' : ch;
    if (idx[s] == null){ idx[s] = out.length; out.push([s, 0]); }
    out[idx[s]][1]++;
  });
  return out;
}
function textSymbols(text, ignoreSpaces){
  return String(text).toUpperCase().split('').filter(ch => !(ignoreSpaces && ch === ' ')).map(ch => ch === ' ' ? '␣' : ch);
}

/* ---------- sizes: name the three measures clearly ---------- */
function huffSizes(h){
  const codes = h.codes();
  const leaves = h.leaves();
  const chars = leaves.reduce((s, n) => s + n.f, 0);
  const encoded = leaves.reduce((s, n) => s + n.f * codes[n.name].length, 0);
  const fixedBits = Math.max(1, Math.ceil(Math.log2(leaves.length)));
  return { chars, encoded, original8: chars * 8, fixedBits, originalFixed: chars * fixedBits };
}
function pct(a, b){ return Math.round(a / b * 10000) / 100; }
function ratio(a, b){ return Math.round(a / b * 100) / 100; }

/* ---------- encode / decode ---------- */
function huffEncode(symbols, codes){ return symbols.map(s => codes[s]).join(''); }
function huffDecode(bits, codes){
  const rev = {}; Object.keys(codes).forEach(s => rev[codes[s]] = s);
  const out = [], parts = []; let cur = '';
  for (const b of bits){
    cur += b;
    if (rev[cur] != null){ out.push(rev[cur]); parts.push(cur); cur = ''; }
  }
  return {symbols: out, parts, rest: cur};
}

/* ---------- labels ---------- */
function hLabel(n){ return n.leaf ? n.name + ':' + n.f : String(n.f); }
function hChipLabel(n){ return n.leaf ? n.name + ':' + n.f : n.f + ' (' + n.name + ')'; }
function hName(n){ return n.leaf ? n.name + ':' + n.f : 'node ' + n.f + ' (' + n.name + ')'; }

/* ---------- tree / forest drawing ----------
   nodes: array indexed by id with {leaf, left, right}; rootIds: trees left to right
   opts.text(n): label; opts.hl: {id:'p'|'q'|'r'}; opts.codes: {name:code} shown under leaves */
function drawHuffForest(nodes, rootIds, opts){
  opts = opts || {};
  const UX = 62, UY = 64, pos = {};
  let slot = 0, maxD = 0;
  function place(id, d){
    const n = nodes[id]; maxD = Math.max(maxD, d);
    if (n.leaf){ const x = slot * UX; slot++; pos[id] = {x, y:d * UY}; return x; }
    const a = place(n.left, d + 1), b = place(n.right, d + 1);
    pos[id] = {x:(a + b) / 2, y:d * UY};
    return pos[id].x;
  }
  rootIds.forEach((r, i) => { if (i) slot += 0.45; place(r, 0); });
  const xs = Object.keys(pos).map(k => pos[k].x);
  const minX = Math.min.apply(null, xs) - 40, maxX = Math.max.apply(null, xs) + 40;
  const minY = -26, maxY = maxD * UY + (opts.codes ? 44 : 28);
  const W = maxX - minX, H = maxY - minY;
  const svg = svgEl('svg', {viewBox:[minX, minY, W, H].join(' '), width:Math.round(W), height:Math.round(H),
    role:'img', 'aria-label':'Huffman tree'});
  const text = opts.text || hLabel;
  const eg = svgEl('g'), ng = svgEl('g');
  function walk(id){
    const n = nodes[id], P = pos[id];
    if (!n.leaf){
      [[n.left, '0'], [n.right, '1']].forEach(([c, bit]) => {
        const C = pos[c];
        eg.appendChild(svgEl('line', {x1:P.x, y1:P.y + 15, x2:C.x, y2:C.y - 14, class:'h-edge'}));
        const t = svgEl('text', {x:(P.x + C.x) / 2 + (bit === '0' ? -9 : 9), y:(P.y + C.y) / 2 + 2, class:'h-bit'});
        t.textContent = bit; eg.appendChild(t);
        walk(c);
      });
    }
    const cls = (n.leaf ? 'h-leaf' : 'h-int') + (opts.hl && opts.hl[id] ? ' h-' + opts.hl[id] : '') + (opts.unknown && n.hasX ? ' h-x' : '');
    const g = svgEl('g', {class:cls, transform:'translate(' + P.x + ',' + P.y + ')'});
    const label = text(n);
    if (n.leaf){
      const w = Math.max(44, label.length * 8 + 12);
      g.appendChild(svgEl('rect', {x:-w / 2, y:-13, width:w, height:26, rx:2}));
    } else if (label.length <= 3){
      g.appendChild(svgEl('circle', {r:16}));
    } else {
      const w = label.length * 8 + 14;
      g.appendChild(svgEl('rect', {x:-w / 2, y:-14, width:w, height:28, rx:14}));
    }
    const t = svgEl('text', {}); t.textContent = label; g.appendChild(t);
    if (opts.codes && n.leaf && opts.codes[n.name] != null){
      const c = svgEl('text', {y:30, class:'h-code'}); c.textContent = opts.codes[n.name]; g.appendChild(c);
    }
    ng.appendChild(g);
  }
  rootIds.forEach(walk);
  svg.appendChild(eg); svg.appendChild(ng);
  return el('div', {class:'hscroll no-gloss'}, [svg]);
}

function huffCodeTable(h, opts){
  opts = opts || {};
  const codes = h.codes();
  let total = 0, chars = 0;
  const rows = h.leaves().map(n => {
    const c = codes[n.name] || '';
    total += n.f * c.length; chars += n.f;
    return el('tr', {}, [el('td', {text:n.name}), el('td', {text:String(n.f)}),
      el('td', {class:'mono', text: opts.hideCodes ? '' : c}), el('td', {text: opts.hideCodes ? '' : c.length + ' × ' + n.f + ' = ' + c.length * n.f})]);
  });
  rows.push(el('tr', {class:'total'}, [el('td', {text:'Total'}), el('td', {text:String(chars)}), el('td'), el('td', {text: opts.hideCodes ? '' : total + ' bits'})]));
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {class:'codes'}, [
    el('thead', {}, [el('tr', {}, ['Symbol', 'Frequency', 'Code', 'Bits (length × frequency)'].map(x => el('th', {text:x})))]),
    el('tbody', {}, rows)])]);
}

/* the size measures, named so they can't be confused */
function sizesTable(h){
  const s = huffSizes(h);
  const row = (a, b, c) => el('tr', {}, [el('td', {html:a}), el('td', {html:b}), el('td', {html:c})]);
  return el('div', {class:'tablewrap no-gloss'}, [el('table', {}, [
    el('thead', {}, [el('tr', {}, ['Measure', 'How', 'Value'].map(x => el('th', {text:x})))]),
    el('tbody', {}, [
      row('Encoded size', 'Σ frequency × code length', '<b>' + s.encoded + ' bits</b>'),
      row('Original size (8-bit characters)', s.chars + ' characters × 8 bits — the baseline the lab photos use', s.original8 + ' bits'),
      row('Compressed size, as % of original', s.encoded + ' ÷ ' + s.original8 + ' × 100', '<b>' + pct(s.encoded, s.original8) + '%</b>'),
      row('Space saved', '100% − compressed size', '<b>' + Math.round((100 - pct(s.encoded, s.original8)) * 100) / 100 + '%</b>'),
      row('Compression ratio', 'original : encoded', '<b>' + ratio(s.original8, s.encoded) + ' : 1</b>'),
      row('Fixed-length code instead', s.chars + ' × ' + s.fixedBits + ' bits (the fewest bits that give every symbol its own code)', s.originalFixed + ' bits')
    ])])]);
}

/* the queue, lowest first, as chips */
function queueChips(h, ids, hl){
  return el('div', {class:'hq no-gloss'}, ids.map(i => {
    const n = h.nodes[i];
    return el('span', {class:'chip' + (n.leaf ? ' leaf' : ' node') + (hl && hl[i] ? ' ' + hl[i] : ''), text:hChipLabel(n)});
  }));
}

function stepNarration(h, st, scriptedBy){
  const p = h.nodes[st.p], q = h.nodes[st.q], r = h.nodes[st.r];
  const L = h.nodes[r.left], R = h.nodes[r.right];
  let s = '<p><b>Step ' + st.n + '.</b> Remove <b>' + esc(hName(p)) + '</b>, then <b>' + esc(hName(q)) + '</b> — the two lowest frequencies. ' +
          'New node <b>' + r.f + '</b> = ' + p.f + ' + ' + q.f + ', with ' + esc(hName(L)) + ' on the left (0) and ' + esc(hName(R)) + ' on the right (1). Insert it back into the queue.</p>';
  if (st.tie){
    const parts = [];
    if (st.tie.first) parts.push(st.tie.first.map(i => esc(hChipLabel(h.nodes[i]))).join(', ') + ' are tied for lowest');
    if (st.tie.second) parts.push('for the second removal ' + st.tie.second.map(i => esc(hChipLabel(h.nodes[i]))).join(', ') + ' are tied');
    s += '<p class="tie"><b>Tie:</b> ' + parts.join('; ') + '. ' +
      (st.scripted ? (scriptedBy || 'The worked solution') + ' takes ' + esc(p.name) + ' and ' + esc(q.name) + '.'
                   : 'Rule used: <i>' + TIE_TEXT[st.rule || h.opts.tie] + '</i>.') +
      ' Any tied choice still gives an optimal code (same total bits), just possibly different codewords.</p>';
  }
  return s;
}

/* ---------- symbol editor parsing: "A 15" per line ---------- */
function parseSymbolLines(text){
  const out = [], seen = {};
  const lines = String(text).split(/\r?\n/);
  for (let i = 0; i < lines.length; i++){
    const raw = lines[i].trim();
    if (!raw) continue;
    const t = raw.replace(/[,:=]/g, ' ').trim().split(/\s+/);
    if (t.length !== 2) return {error:'Line ' + (i + 1) + ' ("' + raw + '"): write it as  symbol frequency,  e.g.  A 15'};
    const s = t[0], f = Number(t[1]);
    if ([...s].length !== 1) return {error:'Line ' + (i + 1) + ': use single-character symbols (so merged node names stay readable).'};
    if (!(f > 0) || !isFinite(f)) return {error:'Line ' + (i + 1) + ': the frequency must be a positive number.'};
    if (seen[s]) return {error:'Line ' + (i + 1) + ': "' + s + '" appears twice.'};
    seen[s] = 1; out.push([s, f]);
  }
  if (out.length < 2) return {error:'Give at least two symbols.'};
  if (out.length > 12) return {error:'Keep it to 12 symbols or fewer so the tree fits.'};
  return {symbols:out};
}

/* ============================================================
   Activity: step-through visualiser
   ============================================================ */
function renderHuffVisualiser(opts, onDone){
  let setKey = opts.preset || 'lecture', symbols = HUFF_SETS[setKey].symbols, meta = HUFF_SETS[setKey];
  let tie = 'old', orient = 'small', h, idx = 0;
  const root = el('div', {class:'no-gloss'});

  const setSel = el('select', {class:'sel', 'aria-label':'Choose an input'});
  Object.keys(HUFF_SETS).forEach(k => setSel.appendChild(el('option', {value:k, text:'[' + tagName(HUFF_SETS[k].tag) + '] ' + HUFF_SETS[k].name})));
  setSel.appendChild(el('option', {value:'custom', text:'Your own input', hidden:'hidden'}));
  setSel.value = setKey;
  setSel.addEventListener('change', () => { setKey = setSel.value; meta = HUFF_SETS[setKey]; symbols = meta.symbols; err.textContent = ''; syncEditor(); rebuild(); });
  const tieSel = el('select', {class:'sel', 'aria-label':'Tie rule'}, [
    el('option', {value:'old', text:'Ties: older first'}), el('option', {value:'new', text:'Ties: newest merged first'})]);
  tieSel.addEventListener('change', () => { tie = tieSel.value; rebuild(); });
  const orSel = el('select', {class:'sel', 'aria-label':'Left/right convention'}, [
    el('option', {value:'small', text:'Smaller on the left (course)'}), el('option', {value:'large', text:'Larger on the left'})]);
  orSel.addEventListener('change', () => { orient = orSel.value; rebuild(); });

  // editor: frequencies or a word
  const ta = el('textarea', {spellcheck:'false', 'aria-label':'Symbols and frequencies'});
  const word = el('input', {type:'text', class:'path-in', placeholder:'e.g. MISSISSIPPI', 'aria-label':'Word to count'});
  const ign = el('input', {type:'checkbox'}); ign.checked = true;
  const err = el('div', {class:'err'});
  const useFreq = el('button', {class:'btn', type:'button', text:'Use these frequencies'});
  const useWord = el('button', {class:'btn sec', type:'button', text:'Count the letters'});
  useFreq.addEventListener('click', () => {
    const r = parseSymbolLines(ta.value);
    if (r.error){ err.textContent = r.error; return; }
    err.textContent = ''; symbols = r.symbols; meta = {name:'Your input', tag:'extra', note:'Your own frequencies.'}; setKey = 'custom'; setSel.value = 'custom'; rebuild();
  });
  useWord.addEventListener('click', () => {
    const w = word.value.trim();
    if (!w){ err.textContent = 'Type a word or phrase first.'; return; }
    const c = countText(w, ign.checked);
    if (c.length < 2 || c.length > 12){ err.textContent = 'It needs between 2 and 12 different characters.'; return; }
    err.textContent = ''; symbols = c; meta = {name:'"' + w.toUpperCase() + '"', tag:'extra', note:'Counted from your text' + (ign.checked ? ', spaces ignored.' : ' (␣ = space).')};
    setKey = 'custom'; setSel.value = 'custom'; syncEditor(); rebuild();
  });
  function syncEditor(){ ta.value = symbols.map(s => s[0] + ' ' + s[1]).join('\n'); }
  syncEditor();
  const editor = el('details', {class:'fold editbox'}, [
    el('summary', {}, [el('span', {class:'fold-title', text:'Edit the symbols and frequencies'})]),
    el('div', {class:'fold-body'}, [
      el('p', {class:'subtle', html:'One symbol per line: <code>symbol frequency</code> (e.g. <code>A 15</code>). Single characters, 2–12 of them. Or type a word and count its letters.'}),
      ta, el('div', {class:'btnrow'}, [useFreq]),
      el('div', {class:'btnrow'}, [word, el('label', {class:'subtle'}, [ign, document.createTextNode(' ignore spaces')]), useWord]),
      err
    ])
  ]);

  const noteHost = el('div'), queueHost = el('div'), treeHost = el('div'), finalHost = el('div');
  const narr = el('div', {class:'narr', 'aria-live':'polite'});
  const counter = el('span', {class:'stepctr'});
  const bFirst = el('button', {class:'btn sec', type:'button', text:'⏮ Start'});
  const bBack = el('button', {class:'btn sec', type:'button', text:'◀ Back'});
  const bNext = el('button', {class:'btn', type:'button', text:'Next ▶'});
  const bEnd = el('button', {class:'btn sec', type:'button', text:'Run to end ⏭'});
  bFirst.addEventListener('click', () => { idx = 0; paint(); });
  bBack.addEventListener('click', () => { if (idx > 0){ idx--; paint(); } });
  bNext.addEventListener('click', () => { if (idx < h.steps.length){ idx++; paint(); } });
  bEnd.addEventListener('click', () => { idx = h.steps.length; paint(); });

  root.appendChild(el('div', {class:'ctrl'}, [setSel]));
  root.appendChild(el('div', {class:'ctrl'}, [orSel, tieSel]));
  root.appendChild(noteHost);
  root.appendChild(editor);
  root.appendChild(el('div', {class:'ctrl'}, [bFirst, bBack, bNext, bEnd, counter]));
  root.appendChild(narr);
  root.appendChild(el('div', {class:'prompt', text:'Priority queue (lowest frequency first)'}));
  root.appendChild(queueHost);
  root.appendChild(el('div', {class:'prompt', text:'The trees'}));
  root.appendChild(treeHost);
  root.appendChild(finalHost);

  function rebuild(){ h = new Huff(symbols, {tie, orient}).runAll(); idx = 0; paint(); }
  function paint(){
    noteHost.innerHTML = '';
    noteHost.appendChild(el('p', {class:'src'}, [el('span', {class:'badge ' + (meta.tag || 'extra'), text:tagName(meta.tag)}),
      document.createTextNode((meta.note || '') + ' Using: ' + ORIENT_TEXT[orient] + '; ties ' + TIE_TEXT[tie] + '.')]));
    const st = idx > 0 ? h.steps[idx - 1] : null;
    const roots = st ? st.after : h.leafIds.slice().sort((a, b) => h.cmp(h.nodes[a], h.nodes[b]));
    const hl = {}; if (st){ hl[st.p] = 'p'; hl[st.q] = 'q'; hl[st.r] = 'r'; }
    queueHost.innerHTML = ''; queueHost.appendChild(queueChips(h, roots, st ? {[st.r]:'r'} : null));
    treeHost.innerHTML = ''; treeHost.appendChild(drawHuffForest(h.nodes, roots, {hl, codes: idx === h.steps.length ? h.codes() : null}));
    if (!st){
      narr.className = 'narr';
      narr.innerHTML = '<p><b>Start.</b> Every symbol is a one-node tree in the priority queue; the lowest frequency has the highest priority. ' +
        'There are ' + h.leafIds.length + ' symbols, so the loop runs ' + (h.leafIds.length - 1) + ' times (n − 1).</p>';
    } else {
      narr.className = 'narr' + (idx === h.steps.length ? ' good' : '');
      narr.innerHTML = stepNarration(h, st) + (idx === h.steps.length ? '<p><b>One tree left</b> — remove it: that is the Huffman tree. Read each code from the root: left = 0, right = 1.</p>' : '');
    }
    finalHost.innerHTML = '';
    if (idx === h.steps.length){
      finalHost.appendChild(el('div', {class:'prompt', text:'Code table'}));
      finalHost.appendChild(huffCodeTable(h));
      finalHost.appendChild(el('div', {class:'prompt', text:'Sizes'}));
      finalHost.appendChild(sizesTable(h));
      if (onDone) onDone();
    }
    counter.textContent = 'Step ' + idx + ' of ' + h.steps.length;
    bFirst.disabled = bBack.disabled = idx === 0;
    bNext.disabled = bEnd.disabled = idx === h.steps.length;
  }
  rebuild();
  return root;
}
function tagName(t){ return ({lecture:'Lecture', lab:'Lab', past:'Past paper', extra:'Extra practice'})[t] || 'Extra practice'; }

/* shared picker: built-in sets + random extra-practice words */
function huffPicker(current, onChange, opts){
  opts = opts || {};
  const sel = el('select', {class:'sel', 'aria-label':'Choose an input'});
  Object.keys(HUFF_SETS).forEach(k => {
    if (opts.wordsOnly && !HUFF_SETS[k].text) return;
    sel.appendChild(el('option', {value:k, text:'[' + tagName(HUFF_SETS[k].tag) + '] ' + HUFF_SETS[k].name}));
  });
  sel.appendChild(el('option', {value:'random', text:'[Extra practice] Random word'}));
  sel.value = current;
  sel.addEventListener('change', () => onChange(sel.value));
  return sel;
}
function randomWordSet(){
  const w = HUFF_WORDS_EXTRA[Math.floor(Math.random() * HUFF_WORDS_EXTRA.length)];
  return {name:w, tag:'extra', text:w, note:'Extra practice word — not from the course.', symbols:countText(w, true)};
}
function setFor(key){ return key === 'random' ? randomWordSet() : HUFF_SETS[key]; }
/* photo sets replay the photo's tree so codes match the posted solution; others use rule 'old' */
function huffFor(set){
  const h = new Huff(set.symbols, {tie:'old', orient:'small'});
  if (set.script) h.runScript(set.script); else h.runAll();
  return h;
}
function setNote(set, extra){
  return el('p', {class:'src'}, [el('span', {class:'badge ' + set.tag, text:tagName(set.tag)}),
    document.createTextNode((set.note || '') + (extra ? ' ' + extra : ''))]);
}

/* ============================================================
   Activity: do it yourself — pick the two smallest, then codes
   ============================================================ */
function renderHuffDIY(opts, onDone){
  let key = opts.preset || 'lecture', set, h, first, mistakes, phase, reported = false;
  const root = el('div', {class:'no-gloss'});
  const picker = huffPicker(key, k => { key = k; start(); });
  const restart = el('button', {class:'btn sec', type:'button', text:'Restart'});
  restart.addEventListener('click', () => start(true));
  const noteHost = el('div'), treeHost = el('div'), pickHost = el('div'), codeHost = el('div'), status = el('p', {class:'subtle'});
  const narr = el('div', {class:'narr', 'aria-live':'polite'});
  root.appendChild(el('div', {class:'ctrl'}, [picker, restart]));
  root.appendChild(noteHost); root.appendChild(pickHost); root.appendChild(narr); root.appendChild(treeHost);
  root.appendChild(codeHost); root.appendChild(status);

  function start(same){
    if (!same || !set) set = setFor(key);
    h = new Huff(set.symbols, {tie:'old', orient:'small'});
    first = null; mistakes = 0; phase = 'merge';
    narr.className = 'narr';
    narr.innerHTML = '<p>Each step: tap the node the priority queue removes <b>first</b> (it becomes the left child, 0), then the one it removes <b>second</b> (right child, 1). The nodes are listed in the order they were made, not sorted — finding the smallest is your job.</p>';
    paint();
  }
  function paint(){
    noteHost.innerHTML = ''; noteHost.appendChild(setNote(set, 'Convention: smaller on the left. Any tied choice is accepted.'));
    pickHost.innerHTML = '';
    if (phase === 'merge'){
      pickHost.appendChild(el('div', {class:'prompt', text: first == null ? 'Which node is removed first (lowest frequency)?' : 'Which node is removed second?'}));
      pickHost.appendChild(el('div', {class:'pickrow'}, h.queue.map(i => {
        const n = h.nodes[i];
        const b = el('button', {class:'pickbtn' + (i === first ? ' ok' : ''), type:'button', text:hChipLabel(n)});
        b.addEventListener('click', () => pick(i, b));
        return b;
      })));
    }
    const hl = {}; if (first != null) hl[first] = 'p';
    const last = h.steps[h.steps.length - 1]; if (last && first == null) hl[last.r] = 'r';
    treeHost.innerHTML = ''; treeHost.appendChild(drawHuffForest(h.nodes, h.queue, {hl}));
    codeHost.innerHTML = '';
    if (phase === 'codes') codeHost.appendChild(codeForm(h, () => finish()));
    status.textContent = 'Mistakes so far: ' + mistakes;
  }
  function pick(i, btn){
    if (first == null){
      if (h.legalFirst().indexOf(i) >= 0){
        first = i;
        narr.className = 'narr good';
        const ties = h.legalFirst().filter(x => x !== i);
        narr.innerHTML = '<p>✔ ' + esc(hName(h.nodes[i])) + ' has the lowest frequency (' + h.nodes[i].f + ')' +
          (ties.length ? ' — tied with ' + ties.map(x => esc(hChipLabel(h.nodes[x]))).join(', ') + ', so any of them is fine' : '') +
          '. It becomes the <b>left</b> child. Now the second one.</p>';
      } else {
        mistakes++;
        const m = h.nodes[h.legalFirst()[0]];
        narr.className = 'narr bad';
        narr.innerHTML = '<p>✘ ' + esc(hName(h.nodes[i])) + ' has frequency ' + h.nodes[i].f + ', but ' + esc(hName(m)) + ' has ' + m.f +
          '. The priority queue always hands out the <b>lowest</b> frequency first.</p>';
      }
      paint(); return;
    }
    if (i === first){ first = null; narr.className = 'narr'; narr.innerHTML = '<p>Selection cleared.</p>'; paint(); return; }
    if (h.legalSecond(first).indexOf(i) < 0){
      mistakes++;
      const m = h.nodes[h.legalSecond(first)[0]];
      narr.className = 'narr bad';
      narr.innerHTML = '<p>✘ With ' + esc(hName(h.nodes[first])) + ' removed, the lowest left is ' + esc(hName(m)) + ' (' + m.f + '), not ' +
        esc(hName(h.nodes[i])) + ' (' + h.nodes[i].f + '). Huffman always joins the <b>two</b> lowest.</p>';
      paint(); return;
    }
    const st = h.merge(first, i, {manual:true});
    first = null;
    const r = h.nodes[st.r];
    narr.className = 'narr good';
    narr.innerHTML = '<p>✔ New node ' + r.f + ' = ' + h.nodes[st.p].f + ' + ' + h.nodes[st.q].f + ' goes back into the queue.</p>';
    if (h.done()){
      phase = 'codes';
      narr.innerHTML += '<p><b>The tree is finished.</b> Now write the code for each symbol: from the root, left = 0, right = 1.</p>';
    }
    paint();
  }
  function finish(){
    phase = 'done';
    narr.className = 'narr good';
    narr.innerHTML = '<p>✔ Tree and codes done — ' + (mistakes ? mistakes + ' mistake' + (mistakes > 1 ? 's' : '') : 'no mistakes') + '. ' +
      'Total: ' + huffSizes(h).encoded + ' bits.</p>';
    paint();
    codeHost.appendChild(huffCodeTable(h));
    const again = el('button', {class:'btn', type:'button', text:'Try a random word'});
    again.addEventListener('click', () => { key = 'random'; picker.value = key; start(); });
    codeHost.appendChild(el('div', {class:'btnrow'}, [again]));
    if (!reported && onDone){ reported = true; onDone(mistakes); }
  }
  start();
  return root;
}

/* code-writing form for a finished tree; calls onRight() once all codes are right */
function codeForm(h, onRight){
  const codes = h.codes(), inputs = {};
  const box = el('div');
  box.appendChild(el('div', {class:'prompt', text:'Write each symbol\'s code (left = 0, right = 1).'}));
  const rows = h.leaves().map(n => {
    const inp = el('input', {class:'din code-in', type:'text', inputmode:'numeric', autocomplete:'off', 'aria-label':'Code for ' + n.name});
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') check(); });
    inputs[n.name] = inp;
    return el('tr', {}, [el('td', {text:n.name + ':' + n.f}), el('td', {}, [inp])]);
  });
  box.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'codes'}, [
    el('thead', {}, [el('tr', {}, [el('th', {text:'Symbol'}), el('th', {text:'Code'})])]), el('tbody', {}, rows)])]));
  const fb = el('div', {class:'feedback'});
  const btn = el('button', {class:'btn', type:'button', text:'Check codes'});
  btn.addEventListener('click', check);
  box.appendChild(el('div', {class:'btnrow'}, [btn])); box.appendChild(fb);
  function pathWords(code){ return code.split('').map(b => b === '0' ? 'left' : 'right').join(', '); }
  function check(){
    const wrong = [];
    Object.keys(inputs).forEach(s => {
      const v = inputs[s].value.replace(/\s+/g, '');
      const ok = v === codes[s];
      inputs[s].classList.toggle('right', ok); inputs[s].classList.toggle('wrong', !ok);
      if (!ok) wrong.push('<b>' + esc(s) + '</b>: from the root go ' + pathWords(codes[s]) + ' → <b>' + codes[s] + '</b>');
    });
    if (wrong.length){
      fb.className = 'feedback show bad';
      fb.innerHTML = '✘ ' + wrong.length + ' to fix:<ul><li>' + wrong.join('</li><li>') + '</li></ul>';
      return;
    }
    fb.className = 'feedback show good';
    fb.innerHTML = '✔ All codes right. Check: no code is the start of another — it is a prefix code, because every symbol is a leaf.';
    btn.disabled = true;
    if (onRight) onRight();
  }
  return box;
}

/* ============================================================
   Activity: write the codes from a finished tree
   ============================================================ */
function renderHuffCodes(opts, onDone){
  let key = opts.preset || 'tissue';
  const root = el('div', {class:'no-gloss'});
  const picker = huffPicker(key, k => { key = k; start(); });
  const body = el('div');
  root.appendChild(el('div', {class:'ctrl'}, [picker])); root.appendChild(body);
  function start(){
    const set = setFor(key), h = huffFor(set);
    body.innerHTML = '';
    body.appendChild(setNote(set, set.script ? 'The tree is the one in the posted solution.' : 'Tree built with the course convention, ties older-first.'));
    body.appendChild(drawHuffForest(h.nodes, [h.root()]));
    body.appendChild(codeForm(h, () => {
      if (key === 'tissue') body.appendChild(el('div', {class:'note trap'}, [el('div', {class:'note-title', text:'Compare with the photo'}),
        el('div', {html:'The posted photo writes T = 000. The tree says <b>010</b> (root → left → right → left) — see Known problems.'})]));
      if (onDone) onDone();
    }));
  }
  start();
  return root;
}

/* ============================================================
   Activity: encode / decode / sizes drill
   ============================================================ */
function renderHuffEncode(opts, onDone){
  let key = opts.preset || 'tissue', set, h, codes, msg, got = {};
  const root = el('div', {class:'no-gloss'});
  const picker = huffPicker(key, k => { key = k; start(); }, {wordsOnly:true});
  const body = el('div');
  root.appendChild(el('div', {class:'ctrl'}, [picker])); root.appendChild(body);

  function randomMessage(){
    const pool = textSymbols(set.text, set.ignoreSpaces);
    const len = 4 + Math.floor(Math.random() * 4);
    const out = [];
    for (let i = 0; i < len; i++) out.push(pool[Math.floor(Math.random() * pool.length)]);
    return out;
  }
  function start(){
    set = setFor(key); h = huffFor(set); codes = h.codes(); got = {};
    msg = randomMessage();
    paint();
  }
  function done(k){
    got[k] = true;
    if (got.enc && got.dec && got.size && onDone) onDone();
  }
  function paint(){
    body.innerHTML = '';
    body.appendChild(setNote(set, set.script ? 'Codes from the posted solution\'s tree' + (key === 'tissue' ? ' (with T corrected to 010).' : '.') : 'Codes built with the course convention, ties older-first.'));
    const syms = textSymbols(set.text, set.ignoreSpaces);
    const tbl = el('table', {class:'codes'}, [
      el('thead', {}, [el('tr', {}, h.leaves().map(n => el('th', {text:n.name})))]),
      el('tbody', {}, [el('tr', {}, h.leaves().map(n => el('td', {class:'mono', text:codes[n.name]})))])]);
    body.appendChild(el('div', {class:'prompt', text:'Code table'}));
    body.appendChild(el('div', {class:'tablewrap'}, [tbl]));

    // 1 encode
    const encIn = el('textarea', {class:'scratch', spellcheck:'false', 'aria-label':'Your encoding'});
    const encFb = el('div', {class:'feedback'});
    const encBtn = el('button', {class:'btn', type:'button', text:'Check encoding'});
    const wantEnc = huffEncode(syms, codes);
    encBtn.addEventListener('click', () => {
      const v = encIn.value.replace(/[^01]/g, '');
      const photoT = key === 'tissue' ? huffEncode(syms, Object.assign({}, codes, {T:'000'})) : null;
      if (v === wantEnc){ encFb.className = 'feedback show good'; encFb.innerHTML = '✔ Correct — ' + wantEnc.length + ' bits.'; done('enc'); }
      else if (photoT && v === photoT){
        encFb.className = 'feedback show hint';
        encFb.innerHTML = 'That is the photo\'s encoding, with <b>T = 000</b>. The tree gives T = <b>010</b>; with 000 a decoder would read the first 00 as I and could never reach T. Use 010.';
      } else {
        encFb.className = 'feedback show bad';
        encFb.innerHTML = '✘ Not quite. Letter by letter:<br><span class="mono">' + syms.map(s => esc(s) + '=' + codes[s]).join('  ') + '</span><br>' +
          'Joined: <span class="mono">' + wantEnc + '</span> (' + wantEnc.length + ' bits)' +
          (v.length && v.length !== wantEnc.length ? '. Yours has ' + v.length + ' bits.' : '.');
      }
    });
    body.appendChild(activityPart('1 · Encode', 'Encode <b class="mono">' + esc(set.text) + '</b>' + (set.ignoreSpaces ? ' (ignore the spaces)' : '') + '. Spaces between codes are fine.', [encIn, el('div', {class:'btnrow'}, [encBtn]), encFb]));

    // 2 decode
    const bits = huffEncode(msg, codes);
    const decIn = el('input', {type:'text', class:'path-in', autocomplete:'off', 'aria-label':'Decoded letters'});
    const decFb = el('div', {class:'feedback'});
    const decBtn = el('button', {class:'btn', type:'button', text:'Check decoding'});
    const newMsg = el('button', {class:'btn sec', type:'button', text:'New bit string'});
    newMsg.addEventListener('click', () => { msg = randomMessage(); paint(); });
    decBtn.addEventListener('click', () => {
      const v = decIn.value.toUpperCase().replace(/[^A-Z0-9␣]/g, '');
      const want = msg.join('');
      if (v === want){ decFb.className = 'feedback show good'; decFb.innerHTML = '✔ ' + esc(want) + '.'; done('dec'); }
      else {
        const d = huffDecode(bits, codes);
        decFb.className = 'feedback show bad';
        decFb.innerHTML = '✘ Read from the left, and stop as soon as the bits so far match a code (that is why a prefix code needs no separators):<br><span class="mono">' +
          d.parts.map((p, i) => p + '→' + esc(d.symbols[i])).join('  ') + '</span><br>Answer: <b>' + esc(want) + '</b>';
      }
    });
    body.appendChild(activityPart('2 · Decode', 'Decode <span class="mono">' + bits + '</span> (it is made of the same letters; it need not be a real word).', [decIn, el('div', {class:'btnrow'}, [decBtn, newMsg]), decFb]));

    // 3 sizes
    const s = huffSizes(h);
    const fields = [
      ['enc', 'Encoded size (bits)', s.encoded, 0],
      ['orig', 'Original size at 8 bits per character (bits)', s.original8, 0],
      ['cs', 'Compressed size as % of original', s.encoded / s.original8 * 100, 0.51],
      ['saved', 'Space saved (%)', 100 - s.encoded / s.original8 * 100, 0.51],
      ['ratio', 'Compression ratio (original : encoded) — the number before ": 1"', s.original8 / s.encoded, 0.051]
    ];
    const ins = {};
    const rows = fields.map(f => {
      const i = el('input', {class:'din wide', type:'text', inputmode:'decimal', autocomplete:'off', 'aria-label':f[1]});
      ins[f[0]] = i;
      return el('tr', {}, [el('td', {text:f[1]}), el('td', {}, [i])]);
    });
    const sizeFb = el('div', {class:'feedback'});
    const sizeBtn = el('button', {class:'btn', type:'button', text:'Check sizes'});
    sizeBtn.addEventListener('click', () => {
      let bad = 0;
      fields.forEach(f => {
        const v = Number(String(ins[f[0]].value).replace(/[%\s]/g, '').replace(/:1$/, ''));
        const ok = isFinite(v) && ins[f[0]].value.trim() !== '' && Math.abs(v - f[2]) <= f[3] + 1e-9;
        ins[f[0]].classList.toggle('right', ok); ins[f[0]].classList.toggle('wrong', !ok);
        if (!ok) bad++;
      });
      if (!bad){ sizeFb.className = 'feedback show good'; sizeFb.innerHTML = '✔ All five right.'; done('size'); return; }
      sizeFb.className = 'feedback show bad';
      sizeFb.innerHTML = '✘ ' + bad + ' to fix. Worked out:';
      sizeFb.appendChild(sizesTable(h));
    });
    body.appendChild(activityPart('3 · Sizes', 'Work these out for the whole of <b class="mono">' + esc(set.text) + '</b>. Percentages to 1 or 2 decimal places are fine.',
      [el('div', {class:'tablewrap'}, [el('table', {}, [el('tbody', {}, rows)])]), el('div', {class:'btnrow'}, [sizeBtn]), sizeFb]));
  }
  start();
  return root;
}
function activityPart(title, html, kids){
  return el('div', {class:'part'}, [el('div', {class:'part-title', text:title}), el('p', {html:html})].concat(kids));
}

/* ============================================================
   Reverse mode (Test 2 Q1 style): code table → tree → range
   ============================================================ */
const HUFF_REVERSE = {
  t2025: { title:'Test 2 (2025) Q1', tag:'past', unknown:'X', lo:1, hi:40,
    ask:'Draw the Huffman Tree corresponding to the encoding table below. Then determine all possible integer values for the frequency of character \'X\', given that its frequency is between 1 and 40 (inclusive). (Hint: 0 = left branch, 1 = right branch.) — 2 + 2 marks, 15 minutes',
    rows:[['B',3,'11110'],['A',4,'11111'],['F',6,'1110'],['H',9,'110'],['X',null,'10'],['P',15,'00'],['R',15,'01']],
    working:[
      '<b>Read the tree off the codes.</b> P = 00 and R = 01 share the prefix 0, so the root\'s left child joins P and R. Everything else starts with 1: X = 10 is the left child of node "1"; node "11" has H (110) on the left; node "111" has F (1110) on the left; node "1111" has B (11110) left and A (11111) right.',
      '<b>Node weights</b> (a node = the sum of its children): B + A = 3 + 4 = <b>7</b>; F + 7 = <b>13</b>; H + 13 = <b>22</b>; P + R = <b>30</b>; X + 22; root = 30 + (X + 22).',
      '<b>Huffman builds bottom-up</b>, so the merges happened in this order: (B, A), (F, 7), (H, 13), (P, R), (X, 22), root. Each merge must take the <b>two smallest</b> nodes in the queue at that moment — each gives a condition on X:',
      '(B, A) first: queue B3, A4, F6, H9, X, P15, R15 → needs X ≥ 4 (at 4, X ties with A).',
      '(F, 7): queue F6, 7, H9, X, 15, 15 → needs X ≥ 7.',
      '(H, 13): queue H9, 13, X, 15, 15 → needs X ≥ 13.',
      '(P, R) before X is used: queue X, P15, R15, 22 → X must not be one of the two smallest, so X ≥ 15 (at 15 it is a three-way tie).',
      '(X, 22): queue X, 22, 30 → X and 22 must be the two smallest, so X ≤ 30 (at 30, X ties with the P+R node).',
      '<b>Left or right?</b> X is the <b>left</b> child (code 10) and the 22 node is the right child (11). With the course convention — the node removed first, the smaller, goes left — X ≤ 22 (at 22 it is a tie).',
      'Root: the P+R node (30) is on the left, X + 22 on the right, so 30 ≤ X + 22, i.e. X ≥ 8 — already true.',
      '<b>Together: 15 ≤ X ≤ 22</b> under the course convention.'
    ],
    ends:'At X = 15, X ties with P and R, and the tree only comes out right if P and R are removed first. At X = 22, X ties with the 22 node, and X must be the one removed first. That is why the strict answer drops both ends.'
  },
  lect: { title:'Lecture tree, F unknown', tag:'extra', unknown:'F', lo:1, hi:60,
    ask:'The code table below is the one from Lec 8.2 (slide 19). Draw the tree and find every integer frequency F could have (1 to 60).',
    rows:[['A',16,'00'],['D',17,'01'],['F',null,'10'],['C',12,'110'],['B',5,'1110'],['E',10,'1111']],
    working:[
      '<b>Tree:</b> the root\'s left child joins A (00) and D (01). On the right: F = 10 is the left child of node "1"; node "11" has C on the left; node "111" joins B (left) and E (right).',
      '<b>Weights:</b> B + E = 15; C + 15 = 27; A + D = 33; F + 27; root = 33 + (F + 27).',
      '<b>Merge order:</b> (B, E), (C, 15), (A, D), (F, 27), root.',
      '(B, E) first: needs F ≥ 10 (at 10, F ties with E).',
      '(C, 15): queue C12, 15, A16, D17, F → needs F ≥ 15.',
      '(A, D) before F is used: queue A16, D17, F, 27 → needs F ≥ 17.',
      '(F, 27): queue F, 27, 33 → needs F ≤ 33.',
      '<b>Left or right?</b> F is the left child (10), the 27 node the right (11) → course convention: F ≤ 27.',
      'Root: 33 on the left, F + 27 on the right → F ≥ 6, already true.',
      '<b>Together: 17 ≤ F ≤ 27</b> under the course convention. (The lecture\'s real value, 25, is inside.)'
    ],
    ends:'At F = 17, F ties with D; at F = 27, F ties with the 27 node.'
  },
  miss: { title:'MISSISSIPPI tree, I unknown', tag:'extra', unknown:'I', lo:1, hi:20,
    ask:'This code table is from the MISSISSIPPI worked solution. Find every integer frequency I could have (1 to 20).',
    rows:[['S',4,'0'],['I',null,'11'],['M',1,'100'],['P',2,'101']],
    working:[
      '<b>Tree:</b> S = 0 is the root\'s left child. On the right, node "10" joins M (left) and P (right); I = 11 is the right child of node "1".',
      '<b>Weights:</b> M + P = 3; 3 + I; root = 4 + (3 + I).',
      '<b>Merge order:</b> (M, P), (3, I), root.',
      '(M, P) first: needs I ≥ 2 (at 2, I ties with P).',
      '(3, I) before S: queue 3, I, S4 → needs I ≤ 4 (at 4, I ties with S).',
      '<b>Left or right?</b> The 3 node is the left child (10) and I the right (11) → course convention: 3 ≤ I (at 3 it is a tie).',
      'Root: S4 left, 3 + I right → I ≥ 1, already true.',
      '<b>Together: 3 ≤ I ≤ 4</b> under the course convention — and <b>both</b> ends are ties, so there is <b>no</b> strictly safe value. The real word has I = 4: the photo\'s tree relies on a tie being broken its way.'
    ],
    ends:'At I = 3, I ties with the 3 node; at I = 4, I ties with S.'
  }
};

/* build the tree described by a code table; weights are {k, x} = k + x·(unknown) */
function treeFromCodes(rows, unknown){
  const nodes = [], byPath = {};
  function get(path){
    if (byPath[path] != null) return nodes[byPath[path]];
    const n = {id:nodes.length, path, leaf:false, left:null, right:null};
    nodes.push(n); byPath[path] = n.id;
    if (path.length){ const par = get(path.slice(0, -1)); if (path.slice(-1) === '0') par.left = n.id; else par.right = n.id; }
    return n;
  }
  get('');
  for (const [s, f, code] of rows){
    if (byPath[code] != null) return {error:'Two symbols share code ' + code};
    for (let i = 1; i < code.length; i++){ const pre = byPath[code.slice(0, i)]; if (pre != null && nodes[pre].leaf) return {error:'Not a prefix code: ' + nodes[pre].name + ' is a prefix of ' + s}; }
    const n = get(code);
    n.leaf = true; n.name = s; n.w = f == null ? {k:0, x:1} : {k:f, x:0}; n.hasX = f == null;
  }
  // weights bottom-up; `set` = the node's symbols, sorted (used to match merges)
  function fill(id){
    const n = nodes[id];
    if (n.leaf){ n.set = n.name; return n; }
    if (n.left == null || n.right == null) throw new Error('Incomplete tree at ' + n.path);
    const a = fill(n.left), b = fill(n.right);
    n.w = {k:a.w.k + b.w.k, x:a.w.x + b.w.x}; n.hasX = n.w.x > 0;
    n.set = (a.set + b.set).split('').sort().join('');
    return n;
  }
  fill(0);
  return {nodes, unknown};
}
function wText(w, unknown){
  if (!w.x) return String(w.k);
  return w.k ? unknown + '+' + w.k : unknown;
}
function parseW(s, unknown){
  const t = String(s || '').toUpperCase().replace(/\s+/g, '');
  const U = unknown.toUpperCase();
  if (/^\d+$/.test(t)) return {k:Number(t), x:0};
  if (t === U) return {k:0, x:1};
  let m = t.match(new RegExp('^' + U + '\\+(\\d+)$')); if (m) return {k:Number(m[1]), x:1};
  m = t.match(new RegExp('^(\\d+)\\+' + U + '$')); if (m) return {k:Number(m[1]), x:1};
  return null;
}

/* can Huffman produce this tree when the unknown = X?
   mode 'ordered': left child must be the node removed first (smaller, or either on a tie)
   mode 'unordered': only the pairings matter, not left/right */
function huffCanProduce(tree, X, mode){
  const target = {};
  tree.nodes.forEach(n => { if (!n.leaf) target[n.set] = {left:tree.nodes[n.left].set, right:tree.nodes[n.right].set}; });
  const start = tree.nodes.filter(n => n.leaf).map(n => ({set:n.set, f: n.hasX ? X : n.w.k}));
  const rootSet = tree.nodes[0].set;
  function dfs(queue){
    if (queue.length === 1) return queue[0].set === rootSet;
    const m1 = Math.min.apply(null, queue.map(n => n.f));
    const P = queue.filter(n => n.f === m1);
    for (const p of P){
      const rest = queue.filter(n => n !== p);
      const m2 = Math.min.apply(null, rest.map(n => n.f));
      for (const q of rest.filter(n => n.f === m2)){
        const key = (p.set + q.set).split('').sort().join('');
        const t = target[key];
        if (!t) continue;
        if (mode === 'ordered' && t.left !== p.set) continue;
        if (dfs(rest.filter(n => n !== q).concat([{set:key, f:p.f + q.f}]))) return true;
      }
    }
    return false;
  }
  return dfs(start);
}
function huffRanges(tree, lo, hi){
  const ord = [], strict = [], unord = [];
  for (let X = lo; X <= hi; X++){
    const o = huffCanProduce(tree, X, 'ordered');
    if (o) ord.push(X);
    if (o && huffCanProduce(tree, X - 0.5, 'ordered') && huffCanProduce(tree, X + 0.5, 'ordered')) strict.push(X);
    if (huffCanProduce(tree, X, 'unordered')) unord.push(X);
  }
  return {ordered:ord, strict, unordered:unord};
}
function rangeText(arr){
  if (!arr.length) return 'none';
  const contiguous = arr.every((v, i) => !i || v === arr[i - 1] + 1);
  return contiguous ? (arr.length === 1 ? String(arr[0]) : arr[0] + ' to ' + arr[arr.length - 1]) : arr.join(', ');
}

function renderHuffReverse(opts, onDone){
  let key = opts.preset || 't2025';
  const root = el('div', {class:'no-gloss'});
  const sel = el('select', {class:'sel', 'aria-label':'Choose an exercise'});
  Object.keys(HUFF_REVERSE).forEach(k => sel.appendChild(el('option', {value:k, text:'[' + tagName(HUFF_REVERSE[k].tag) + '] ' + HUFF_REVERSE[k].title})));
  sel.value = key;
  sel.addEventListener('change', () => { key = sel.value; start(); });
  const body = el('div');
  root.appendChild(el('div', {class:'ctrl'}, [sel])); root.appendChild(body);

  function start(){
    const ex = HUFF_REVERSE[key];
    const tree = treeFromCodes(ex.rows, ex.unknown);
    const U = ex.unknown;
    body.innerHTML = '';
    body.appendChild(el('p', {class:'src'}, [el('span', {class:'badge ' + ex.tag, text:tagName(ex.tag)}), document.createTextNode(ex.tag === 'past' ? 'The real 2025 question. No official solution exists — the working is ours.' : 'Written for this site in the style of Q1.')]));
    body.appendChild(el('p', {html:'<i>' + esc(ex.ask) + '</i>'}));
    body.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'codes'}, [
      el('thead', {}, [el('tr', {}, ['Character', 'Frequency', 'Code'].map(x => el('th', {text:x})))]),
      el('tbody', {}, ex.rows.map(r => el('tr', {}, [el('td', {text:r[0]}), el('td', {text: r[1] == null ? '?' : String(r[1])}), el('td', {class:'mono', text:r[2]})])))])]));

    // part 1: node weights
    const internals = tree.nodes.filter(n => !n.leaf).sort((a, b) => b.path.length - a.path.length);
    const ins = {};
    const describe = id => { const n = tree.nodes[id]; return n.leaf ? n.name : 'node "' + (n.path || 'root') + '"'; };
    const rows = internals.map(n => {
      const i = el('input', {class:'din wide', type:'text', autocomplete:'off', 'aria-label':'Weight of node ' + (n.path || 'root')});
      ins[n.id] = i;
      return el('tr', {}, [el('td', {class:'mono', text: n.path === '' ? 'root' : n.path}), el('td', {text: describe(n.left) + ' + ' + describe(n.right)}), el('td', {}, [i])]);
    });
    const treeHost = el('div');
    const p1fb = el('div', {class:'feedback'});
    const p1btn = el('button', {class:'btn', type:'button', text:'Check weights'});
    const p1show = el('button', {class:'btn sec', type:'button', text:'Show the tree'});
    const drawTree = () => { treeHost.innerHTML = ''; treeHost.appendChild(drawHuffForest(tree.nodes, [0], {unknown:true,
      text: n => n.leaf ? n.name + ':' + (n.hasX ? '?' : n.w.k) : wText(n.w, U)})); };
    p1btn.addEventListener('click', () => {
      let bad = [];
      internals.forEach(n => {
        const v = parseW(ins[n.id].value, U);
        const ok = v && v.k === n.w.k && v.x === n.w.x;
        ins[n.id].classList.toggle('right', !!ok); ins[n.id].classList.toggle('wrong', !ok);
        if (!ok) bad.push('node <span class="mono">' + (n.path || 'root') + '</span> = ' + describe(n.left) + ' + ' + describe(n.right) + ' = <b>' + wText(n.w, U) + '</b>');
      });
      if (bad.length){ p1fb.className = 'feedback show bad'; p1fb.innerHTML = '✘ A node\'s weight is the sum of its two children:<ul><li>' + bad.join('</li><li>') + '</li></ul>'; }
      else { p1fb.className = 'feedback show good'; p1fb.innerHTML = '✔ All node weights right.'; drawTree(); }
    });
    p1show.addEventListener('click', drawTree);
    body.appendChild(activityPart('Part 1 · Rebuild the tree', 'Every code is a path from the root (0 = left, 1 = right), so the codes fix the shape. Give the weight of each internal node — a number, or an expression like <span class="mono">' + U + '+22</span>. The column on the left is the node\'s path from the root.',
      [el('div', {class:'tablewrap'}, [el('table', {}, [el('thead', {}, [el('tr', {}, ['Node (path)', 'Children', 'Weight'].map(x => el('th', {text:x})))]), el('tbody', {}, rows)])]),
       el('div', {class:'btnrow'}, [p1btn, p1show]), p1fb, treeHost]));

    // part 2: range
    const loIn = el('input', {class:'din', type:'text', inputmode:'numeric', 'aria-label':'Smallest value'});
    const hiIn = el('input', {class:'din', type:'text', inputmode:'numeric', 'aria-label':'Largest value'});
    const p2fb = el('div', {class:'feedback'});
    const p2btn = el('button', {class:'btn', type:'button', text:'Check range'});
    const reveal = el('button', {class:'btn sec', type:'button', text:'Show the working'});
    const workHost = el('div');
    const R = huffRanges(tree, ex.lo, ex.hi);
    const showWork = () => {
      workHost.innerHTML = '';
      workHost.appendChild(el('div', {class:'prompt'}, [el('span', {class:'badge lecture', text:'My working'}), document.createTextNode(' Step by step')]));
      workHost.appendChild(el('ol', {class:'working'}, ex.working.map(w => el('li', {html:w}))));
      workHost.appendChild(threeAnswers(R, ex));
    };
    p2btn.addEventListener('click', () => {
      const a = Number(loIn.value), b = Number(hiIn.value);
      const same = arr => arr.length && a === arr[0] && b === arr[arr.length - 1] && arr.length === b - a + 1;
      if (same(R.ordered)){ p2fb.className = 'feedback show good'; p2fb.innerHTML = '✔ ' + rangeText(R.ordered) + ' — the answer under the course convention. Compare the other two readings below.'; showWork(); if (onDone) onDone(); }
      else if (same(R.strict)){ p2fb.className = 'feedback show hint'; p2fb.innerHTML = 'That is the <b>strict</b> answer (no ties). Under the course convention the ends also count: <b>' + rangeText(R.ordered) + '</b>. See below.'; showWork(); }
      else if (same(R.unordered)){ p2fb.className = 'feedback show hint'; p2fb.innerHTML = 'That is the answer if left/right order is <b>ignored</b>. The code table fixes ' + U + ' as a left or right child, so under the course convention it is <b>' + rangeText(R.ordered) + '</b>.'; showWork(); }
      else { p2fb.className = 'feedback show bad'; p2fb.innerHTML = '✘ Not quite. Work through the merges one at a time: each must take the two smallest nodes in the queue at that moment. "Show the working" has every condition.'; }
    });
    reveal.addEventListener('click', showWork);
    body.appendChild(activityPart('Part 2 · Possible values of ' + U, 'Enter the smallest and largest whole-number value of ' + U + ' (between ' + ex.lo + ' and ' + ex.hi + ').',
      [el('div', {class:'btnrow'}, [el('span', {text:'From '}), loIn, el('span', {text:' to '}), hiIn, p2btn, reveal]), p2fb, workHost]));
  }
  start();
  return root;
}

function threeAnswers(R, ex){
  const U = ex.unknown;
  const wrap = el('div');
  wrap.appendChild(el('div', {class:'prompt', text:'Three readings of the question — checked by trying every value from ' + ex.lo + ' to ' + ex.hi}));
  wrap.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [
    el('thead', {}, [el('tr', {}, ['Reading', U, 'When it applies'].map(x => el('th', {text:x})))]),
    el('tbody', {}, [
      el('tr', {}, [el('td', {html:'<b>Course convention</b><br>smaller on the left, ties may break either way'}), el('td', {class:'big-ans', text:rangeText(R.ordered)}),
        el('td', {html:'The default. The slide pseudocode puts the first node removed (the smaller) on the left, and every course example does the same. On a tie either node may come out first.'})]),
      el('tr', {}, [el('td', {html:'<b>Strict</b><br>no ties relied on'}), el('td', {class:'big-ans', text:rangeText(R.strict)}),
        el('td', {html:'If you cannot assume a tie breaks your way, drop any value where ' + U + ' ties with another node. ' + esc(ex.ends)})]),
      el('tr', {}, [el('td', {html:'<b>Orientation ignored</b><br>only the pairings matter'}), el('td', {class:'big-ans', text:rangeText(R.unordered)}),
        el('td', {html:'If left/right order does not matter (some markers only check which nodes are joined), the left-or-right condition disappears.'})])
    ])])]));
  wrap.appendChild(el('div', {class:'note exam'}, [el('div', {class:'note-title', text:'In the test'}),
    el('div', {html:'<b>On the test, write down the convention you assumed</b> — e.g. "smaller weight on the left (as in the lecture), ties may go either way" — then give your range.'})]));
  return wrap;
}

/* ============================================================
   Worked example (static block): row-by-row table + tree + codes
   ============================================================ */
function renderHuffWorked(key, notes){
  const set = HUFF_SETS[key], h = huffFor(set);
  const wrap = el('div', {class:'no-gloss'});
  wrap.appendChild(setNote(set));
  const who = set.script ? 'The photo' : null;
  const rows = h.steps.map(st => {
    const tieTxt = st.tie ? (st.scripted ? 'Tie — photo takes ' + h.nodes[st.p].name + ', ' + h.nodes[st.q].name : 'Tie — rule: older first') : '';
    return el('tr', {}, [
      el('td', {text:String(st.n)}),
      el('td', {class:'mono small', text: st.before.map(i => hChipLabel(h.nodes[i])).join('  ')}),
      el('td', {text: hChipLabel(h.nodes[st.p])}),
      el('td', {text: hChipLabel(h.nodes[st.q])}),
      el('td', {html: '<b>' + h.nodes[st.r].f + '</b>' + (tieTxt ? '<br><span class="tie small">' + esc(tieTxt) + '</span>' : '')})
    ]);
  });
  wrap.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'steps'}, [
    el('thead', {}, [el('tr', {}, ['Step', 'Queue before (lowest first)', 'Removed first → left (0)', 'Removed second → right (1)', 'New node'].map(x => el('th', {text:x})))]),
    el('tbody', {}, rows)])]));
  const tieSteps = h.steps.filter(s => s.tie);
  if (tieSteps.length) wrap.appendChild(el('div', {class:'narr'}, tieSteps.map(s => el('div', {html: stepNarration(h, s, who)}))));
  wrap.appendChild(drawHuffForest(h.nodes, [h.root()], {codes:h.codes()}));
  wrap.appendChild(huffCodeTable(h));
  if (set.text){
    const bits = huffEncode(textSymbols(set.text, set.ignoreSpaces), h.codes());
    wrap.appendChild(el('p', {html:'Encoded ' + esc(set.text) + ': <span class="mono wrapbits">' + bits + '</span> (' + bits.length + ' bits)'}));
    wrap.appendChild(sizesTable(h));
  }
  (notes || []).forEach(n => wrap.appendChild(el('div', {class:'note ' + (n.k || '')}, [el('div', {class:'note-title', text:n.title}), el('div', {html:md(n.x)})])));
  return wrap;
}
