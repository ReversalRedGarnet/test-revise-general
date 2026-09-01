/* ============================================================
   CS160 Revise — interactive widgets
   Each entry is mount(container). Plain DOM, no dependencies.
   ============================================================ */

const WIDGETS = {};

/* ---------- tiny DOM helper ---------- */
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
function shell(title, kind){
  const body = el('div', {class:'activity-body'});
  const box  = el('div', {class:'activity'}, [
    el('div', {class:'activity-head'}, [
      el('span', {class:'activity-kind', text:kind || 'Interactive'}),
      el('span', {class:'activity-title', text:title})
    ]),
    body
  ]);
  return {box, body};
}

/* ============================================================
   1 — V-Model Explorer
   ============================================================ */
WIDGETS.vmodel = function(host){
  const {box, body} = shell('V-Model Explorer', 'Interactive');
  host.appendChild(box);
  body.appendChild(el('p', {html:'Click a node on either side of the V. Left = development (verification). Right = testing (validation). Nodes at the same height are paired.'}));

  const LEFT = [
    {k:'req',  label:'Requirements',        info:'The customer\u2019s needs are gathered and written down. Paired with Acceptance Testing on the right — does the finished system meet what the customer actually asked for?'},
    {k:'sysd', label:'System Design',       info:'The overall system structure is planned. Paired with System Testing — does the whole system work together as designed?'},
    {k:'archd',label:'Architecture Design', info:'The major components and how they connect are decided.'},
    {k:'modd', label:'Module Design',       info:'Each individual component\u2019s internals are worked out. Paired with Integration Testing — do the modules work correctly together?'}
  ];
  const RIGHT = [
    {k:'acc',  label:'Acceptance Testing', info:'Checks the finished system against the original Requirements. This is validation — "did we build the right product?"'},
    {k:'sys',  label:'System Testing',     info:'Checks the whole system against the System Design. This is validation at the system level.'},
    {k:'int',  label:'Integration Testing',info:'Checks that modules work correctly together, planned alongside Module Design.'},
    {k:'unit', label:'Unit Testing',       info:'Checks individual pieces of code against Coding — the bottom point of the V. This is verification — "did we build it right?"'}
  ];
  const BOTTOM = {k:'code', label:'Coding', info:'The lowest point of the V — where development meets testing. Coding is paired with Unit Testing.'};

  const info = el('div', {class:'note', style:'margin-top:14px; display:none'}, [
    el('div', {class:'note-title', text:'Selected'}),
    el('div', {class:'vinfo-text'})
  ]);

  const wrap = el('div', {class:'vmodel-wrap', style:'display:flex; flex-direction:column; gap:6px; margin-top:10px'});

  function makeNode(item, side){
    const btn = el('button', {type:'button', class:'vnode', style:
      'display:block; width:100%; text-align:' + (side === 'L' ? 'left' : side === 'R' ? 'right' : 'center') +
      '; padding:10px 14px; border:1.5px solid var(--line, #ccd4e6); border-radius:6px; background:var(--card-bg, #fff); cursor:pointer; font:inherit;'});
    btn.textContent = item.label;
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.vnode').forEach(b => b.classList.remove('vnode-on'));
      btn.classList.add('vnode-on');
      btn.style.borderColor = '#5a6f9a';
      btn.style.background = '#f1f3fa';
      info.style.display = 'block';
      info.querySelector('.vinfo-text').innerHTML = '<strong>' + item.label + '.</strong> ' + item.info;
    });
    return btn;
  }

  LEFT.forEach((item,i) => {
    const row = el('div', {style:'display:flex; gap:10px; align-items:center'});
    row.appendChild(el('div', {style:'flex:1'}, [makeNode(item, 'L')]));
    row.appendChild(el('div', {style:'flex:1'}, [makeNode(RIGHT[i], 'R')]));
    wrap.appendChild(row);
  });
  wrap.appendChild(el('div', {style:'display:flex; justify-content:center'}, [
    el('div', {style:'width:50%'}, [makeNode(BOTTOM, 'C')])
  ]));

  body.appendChild(wrap);
  body.appendChild(info);
};

/* ============================================================
   2 — Scrum Sprint Cycle
   ============================================================ */
WIDGETS.scrumcycle = function(host){
  const {box, body} = shell('The Scrum Sprint Cycle', 'Interactive');
  host.appendChild(box);
  body.appendChild(el('p', {html:'Click each step in order to walk through one Sprint, using the M-PAiSA bill-payments example.'}));

  const STEPS = [
    {label:'1 · Sprint Planning', info:'The team selects backlog items for this Sprint. In Fiji: the M-PAiSA team pulls "pay FEA bill" and "pay water bill" into a two-week Sprint.'},
    {label:'2 · Daily Scrum (repeats)', info:'A 15-minute daily check-in on progress and blockers, throughout the Sprint. In Fiji: the team flags a payment-gateway integration issue on day 3.'},
    {label:'3 · Development work', info:'The team builds and tests the chosen items alongside the Daily Scrum. In Fiji: developers build the bill-payment screens and the gateway link.'},
    {label:'4 · Sprint Review', info:'The Increment is demoed to stakeholders. In Fiji: real users trial the bill-payment demo and suggest a receipt screen.'},
    {label:'5 · Sprint Retrospective', info:'The team reflects, team-only, and agrees what to improve. In Fiji: the team agrees to test gateway integrations earlier next Sprint.'},
    {label:'6 · Repeat', info:'The cycle begins again with the next Sprint Planning. In Fiji: merchant payments become the focus of the following Sprint.'}
  ];

  const info = el('div', {class:'note', style:'margin-top:14px; display:none'}, [
    el('div', {class:'note-title', text:'Step'}),
    el('div', {class:'sinfo-text'})
  ]);

  const row = el('div', {style:'display:flex; flex-wrap:wrap; gap:8px; margin-top:10px'});
  STEPS.forEach((s, i) => {
    const btn = el('button', {type:'button', style:
      'padding:9px 13px; border:1.5px solid var(--line, #ccd4e6); border-radius:20px; background:var(--card-bg, #fff); cursor:pointer; font:inherit; font-size:0.92em;'});
    btn.textContent = s.label;
    btn.addEventListener('click', () => {
      row.querySelectorAll('button').forEach(b => { b.style.borderColor = ''; b.style.background = ''; });
      btn.style.borderColor = '#5a6f9a';
      btn.style.background = '#f1f3fa';
      info.style.display = 'block';
      info.querySelector('.sinfo-text').innerHTML = '<strong>' + s.label + '.</strong> ' + s.info;
    });
    row.appendChild(btn);
  });

  body.appendChild(row);
  body.appendChild(info);
};

/* ============================================================
   3 — UML Symbol Matching Game
   ============================================================ */
WIDGETS.umlmatch = function(host){
  const {box, body} = shell('UML symbol match', 'Interactive');
  host.appendChild(box);
  body.appendChild(el('p', {html:'Click a symbol, then click its meaning. Matched pairs turn green.'}));

  const PAIRS = [
    {sym:'Stick figure', mean:'Actor — a person or external system'},
    {sym:'Oval', mean:'Use Case — a goal the actor wants'},
    {sym:'Hollow diamond', mean:'Aggregation — part can exist without the whole'},
    {sym:'Filled diamond', mean:'Composition — part cannot exist without the whole'},
    {sym:'Hollow triangle', mean:'Generalization — an "is-a" relationship'},
    {sym:'Dashed arrow', mean:'Include / Extend between use cases'}
  ];

  function shuffled(arr){
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; }
    return a;
  }

  const symCol = el('div', {style:'display:flex; flex-direction:column; gap:6px; flex:1'});
  const meanCol = el('div', {style:'display:flex; flex-direction:column; gap:6px; flex:1'});
  const rowWrap = el('div', {style:'display:flex; gap:16px; margin-top:10px'}, [symCol, meanCol]);
  const status = el('div', {class:'note', style:'margin-top:14px; display:none'}, [
    el('div', {class:'note-title', text:'Nice'}),
    el('div', {text:'All matched. These six symbols cover every mark this course tends to give for reading a diagram.'})
  ]);

  let selSym = null, selMean = null, matched = 0;

  function mkBtn(text, kind, pairIdx){
    const btn = el('button', {type:'button', style:
      'text-align:left; padding:9px 12px; border:1.5px solid var(--line, #ccd4e6); border-radius:6px; background:var(--card-bg, #fff); cursor:pointer; font:inherit; font-size:0.92em;'});
    btn.textContent = text;
    btn.dataset.pair = pairIdx;
    btn.dataset.kind = kind;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      if (kind === 'sym'){
        if (selSym) selSym.style.borderColor = '';
        selSym = btn; btn.style.borderColor = '#5a6f9a';
      } else {
        if (selMean) selMean.style.borderColor = '';
        selMean = btn; btn.style.borderColor = '#5a6f9a';
      }
      if (selSym && selMean){
        if (selSym.dataset.pair === selMean.dataset.pair){
          [selSym, selMean].forEach(b => { b.disabled = true; b.style.borderColor = '#2e7d5b'; b.style.background = '#eaf6ee'; b.style.color = '#1f5c40'; });
          matched++;
          if (matched === PAIRS.length) status.style.display = 'block';
        } else {
          [selSym, selMean].forEach(b => { b.style.borderColor = '#b23a48'; });
          setTimeout(() => { if (selSym) selSym.style.borderColor = ''; if (selMean) selMean.style.borderColor = ''; }, 500);
        }
        selSym = null; selMean = null;
      }
    });
    return btn;
  }

  shuffled(PAIRS.map((p,i) => ({...p, i}))).forEach(p => symCol.appendChild(mkBtn(p.sym, 'sym', p.i)));
  shuffled(PAIRS.map((p,i) => ({...p, i}))).forEach(p => meanCol.appendChild(mkBtn(p.mean, 'mean', p.i)));

  body.appendChild(rowWrap);
  body.appendChild(status);
};
