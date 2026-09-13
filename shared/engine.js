/* ============================================================
   Revise — shared engine
   Loaded by BOTH profiles (ayga/ and eljay/) before their own
   app.js. Contains only the pieces that are genuinely identical
   between the two profiles: the DOM helper, text helpers, the
   localStorage wrapper, and the small bits of routing/progress/
   activity-chrome DOM mechanics that don't depend on either
   profile's own content shape or grading rules.

   Each profile keeps its own same-named wrapper around the
   parameterized functions here (e.g. its own `paintProgress()`,
   `route()`, `buildNav()`, `activityShell()`/`setState()`), so
   nothing about how a profile's renderers call these changes —
   only the implementation behind the wrapper is shared.
   ============================================================ */

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

/* ---------- text helpers ---------- */
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

/* inline markdown: **bold** and `code`; raw HTML in the source is allowed through */
function md(s){
  return String(s)
    .replace(/`([^`]+)`/g, (m,c) => '<code>' + esc(c) + '</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

/* ---------- storage that never throws ---------- */
function createStore(clearKeys){
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
      try { if (ok){ clearKeys.forEach(k => localStorage.removeItem(k)); } mem = {}; }
      catch(e){}
    }
  };
}

/* ---------- nav list, built from any array of {id, group, nav, title} ---------- */
function buildNavList(pages){
  const nav = document.getElementById('nav');
  let group = null;
  pages.forEach(s => {
    if (s.group !== group){ group = s.group; nav.appendChild(el('div', {class:'nav-group', text:group})); }
    nav.appendChild(el('a', {href:'#/' + s.id}, [
      el('span', {text: s.nav || s.title}),
      el('span', {class:'tick', text:'✓'})
    ]));
  });
}

/* ---------- hash routing: resolve #/id against a pages array ---------- */
function routeTo(pages, renderSection){
  const id = (location.hash || '#/start').replace('#/','');
  const sec = pages.find(s => s.id === id);
  if (!sec){                                    // unknown hash — normalise the URL
    if (location.replace) location.replace('#/' + pages[0].id);
    else location.hash = '#/' + pages[0].id;
    renderSection(pages[0]);
    return;
  }
  renderSection(sec);
  document.body.classList.remove('nav-open');
  window.scrollTo(0,0);
  document.getElementById('main').focus({preventScroll:true});
}

/* ---------- progress ring + nav ticks ----------
   allIds:     every activity id that counts toward the total
   isDone:     (id) => boolean
   pages:      array of {id, ...} shown in the sidebar
   idsForPage: (page) => the activity ids that belong to that page
   ---------------------------------------------- */
function paintProgressCore(allIds, isDone, pages, idsForPage){
  const total = allIds.length;
  const done  = allIds.filter(isDone).length;
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
    const page = pages.find(p => '#/' + p.id === href);
    if (!page) return;
    const ids = idsForPage(page);
    a.classList.toggle('done', ids.length > 0 && ids.every(isDone));
  });
}

/* ---------- activity chrome: the box/head/body an activity renders into ---------- */
function makeActivityShell(kind, title){
  const state = el('span', {class:'activity-state', text:''});
  const body  = el('div', {class:'activity-body'});
  const box   = el('div', {class:'activity'}, [
    el('div', {class:'activity-head'}, [
      el('span', {class:'activity-kind', text:kind}),
      el('span', {class:'activity-title', text:title}),
      state
    ]),
    body
  ]);
  box._state = state;
  return {box, body};
}
function setActivityState(box, label, ok){
  const s = box._state; if (!s) return;
  s.textContent = label;
  s.className = 'activity-state' + (ok ? ' ok' : '');
}

/* ---------- mobile nav toggle + scrim (identical markup/ids in both profiles) ---------- */
function initChrome(){
  const toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.getElementById('scrim').addEventListener('click', () => document.body.classList.remove('nav-open'));
}
