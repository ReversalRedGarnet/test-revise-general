/* ============================================================
   CS214 Revise — written answers that can't be auto-marked
   (Q2 "which approach? justify" and Q3 "which algorithm? why not
   the others?").

   An item:
     { id, tag, tagText?, prompt (html), marks,
       choices?: [label…], answer?: index,        // the part that CAN be auto-checked
       model (html), checklist: [{t, m, auto?}],   // auto: ticked when the choice is right
       note? (html) }
   Modes:
     'drill'  — choose + type, then "Show model answer", tick the checklist
     'answer' — choose + type only (used inside the timed mock)
     'mark'   — read-only answer + model + checklist (mock results page)
   state = {choice, text, revealed, ticks:[]}; save(state) persists it.
   ============================================================ */

function writtenMax(item){ return item.checklist.reduce((s, c) => s + c.m, 0); }
function writtenScore(item, state){
  if (!state || !state.ticks) return 0;
  return item.checklist.reduce((s, c, i) => s + (writtenTicked(item, state, i) ? c.m : 0), 0);
}
function writtenChoiceRight(item, choice){
  if (choice == null) return false;
  return item.accept ? item.accept.indexOf(choice) >= 0 : choice === item.answer;
}
function writtenAnswerText(item){
  return (item.accept || [item.answer]).map(i => item.choices[i]).join(' or ');
}
function writtenTicked(item, state, i){
  const c = item.checklist[i];
  if (c.auto) return writtenChoiceRight(item, state.choice);
  return !!(state.ticks && state.ticks[i]);
}

function renderWritten(item, state, save, mode, onRevealed){
  state = state || {};
  mode = mode || 'drill';
  const box = el('div', {class:'witem no-gloss'});

  // choices (auto-checkable part)
  let choiceBtns = [];
  if (item.choices){
    const row = el('div', {class:'pickrow'});
    item.choices.forEach((c, i) => {
      const b = el('button', {class:'pickbtn wchoice' + (state.choice === i ? ' sel' : ''), type:'button', text:c});
      if (mode === 'mark') b.disabled = true;
      b.addEventListener('click', () => {
        if (state.revealed && mode === 'drill') return;
        state.choice = i; save(state);
        choiceBtns.forEach((x, j) => x.classList.toggle('sel', j === i));
      });
      choiceBtns.push(b); row.appendChild(b);
    });
    box.appendChild(row);
  }

  // typed justification
  const ta = el('textarea', {class:'scratch', placeholder: item.placeholder || 'Your answer — justify it in one or two sentences, as you would on the paper.', 'aria-label':'Your written answer'});
  ta.value = state.text || '';
  if (mode === 'mark') ta.readOnly = true;
  ta.addEventListener('input', () => { state.text = ta.value; save(state); });
  box.appendChild(ta);

  const reveal = el('div', {class:'reveal-body'});
  box.appendChild(reveal);

  function paintReveal(){
    reveal.innerHTML = '';
    reveal.classList.add('show');
    if (item.choices){
      const right = writtenChoiceRight(item, state.choice);
      reveal.appendChild(el('div', {class:'feedback show ' + (state.choice == null ? 'hint' : right ? 'good' : 'bad'),
        html: state.choice == null ? 'You did not pick an option. The answer is <b>' + esc(writtenAnswerText(item)) + '</b>.'
             : right ? '✔ <b>' + esc(item.choices[state.choice]) + '</b> is right.'
             : '✘ You picked ' + esc(item.choices[state.choice]) + '; the answer is <b>' + esc(writtenAnswerText(item)) + '</b>.'}));
      choiceBtns.forEach((b, j) => { b.disabled = true; if (writtenChoiceRight(item, j)) b.classList.add('ok'); else if (j === state.choice) b.classList.add('no'); });
    }
    reveal.appendChild(el('div', {class:'prompt'}, [el('span', {class:'badge lecture', text:'My working'}), document.createTextNode(' Model answer (not an official key)')]));
    reveal.appendChild(el('div', {class:'model', html: item.model}));
    if (item.note) reveal.appendChild(el('p', {class:'subtle', html: item.note}));
    reveal.appendChild(el('div', {class:'prompt', text:'Mark yourself — tick each point your answer makes (my checklist, not the official scheme)'}));
    const scoreEl = el('div', {class:'wscore'});
    const list = el('ul', {class:'checklist'});
    item.checklist.forEach((c, i) => {
      const cb = el('input', {type:'checkbox'});
      cb.checked = writtenTicked(item, state, i);
      if (c.auto) cb.disabled = true;
      cb.addEventListener('change', () => {
        state.ticks = state.ticks || [];
        state.ticks[i] = cb.checked; state.marked = true; save(state); paintScore();
      });
      list.appendChild(el('li', {}, [el('label', {}, [cb, el('span', {html: ' ' + c.t + ' <b>(' + c.m + ' mark' + (c.m > 1 ? 's' : '') + ')</b>' +
        (c.auto ? ' <span class="subtle">— ticked from your choice</span>' : '')})])]));
    });
    reveal.appendChild(list);
    reveal.appendChild(scoreEl);
    function paintScore(){ scoreEl.textContent = 'Your mark: ' + writtenScore(item, state) + ' / ' + writtenMax(item) + (mode === 'mark' && !state.marked ? ' (not confirmed yet)' : ''); }
    paintScore();
    if (mode === 'mark' && !state.marked){
      const doneBtn = el('button', {class:'btn sec', type:'button', text:'I’ve finished marking this'});
      doneBtn.addEventListener('click', () => { state.marked = true; save(state); doneBtn.remove(); paintScore(); });
      reveal.appendChild(el('div', {class:'btnrow'}, [doneBtn]));
    }
  }

  if (mode === 'drill'){
    const btn = el('button', {class:'btn', type:'button', text:'Show model answer'});
    btn.addEventListener('click', () => {
      if (!state.text && state.choice == null){ ta.focus(); ta.placeholder = 'Write something first — even one line. Committing to an answer is the point.'; return; }
      state.revealed = true; save(state); btn.remove(); paintReveal();
      if (onRevealed) onRevealed();
    });
    box.insertBefore(el('div', {class:'btnrow'}, [btn]), reveal);
    if (state.revealed){ btn.remove(); paintReveal(); }
  } else if (mode === 'mark'){
    state.revealed = true; save(state);
    paintReveal();
  }
  return box;
}

/* a set of written items as one page block; each item counts as its own activity */
function renderWrittenSet(items, getState, setState, markDone){
  const wrap = el('div');
  items.forEach((item, k) => {
    const sh = makeActivityShell(item.kind || 'Written', '');
    const title = sh.box.querySelector('.activity-title');
    title.appendChild(document.createTextNode((item.title || 'Question ' + (k + 1)) + ' '));
    title.appendChild(el('span', {class:'badge ' + item.tag, text: item.tagText || ({lecture:'Lecture', lab:'Lab', past:'Past paper', extra:'Extra practice'})[item.tag]}));
    if (getState(item.id) && getState(item.id).revealed) setActivityState(sh.box, 'Marked ' + writtenScore(item, getState(item.id)) + '/' + writtenMax(item), true);
    sh.body.appendChild(el('div', {class:'qtext', html: item.prompt + ' <span class="subtle">(' + writtenMax(item) + ' marks)</span>'}));
    const st = getState(item.id) || {};
    const save = s => { setState(item.id, s); if (s.revealed) setActivityState(sh.box, 'Marked ' + writtenScore(item, s) + '/' + writtenMax(item), true); };
    sh.body.appendChild(renderWritten(item, st, save, 'drill', () => markDone(item.id)));
    wrap.appendChild(sh.box);
  });
  return wrap;
}
