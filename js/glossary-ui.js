/* ============================================================
   CS160 Revise — glossary tooltip UI
   Moved out of app.js: this is a self-contained subsystem (build
   a search index over GLOSSARY, annotate first mentions on a
   page, show/hide the popover) that doesn't depend on anything
   else in app.js. GLOSSARY itself (the data) still lives in
   glossary.js; this file is the UI built on top of it.
   ============================================================ */
const GLOSS = (typeof GLOSSARY !== 'undefined') ? GLOSSARY : [];
const GLOSS_BY_KEY = Object.create(null);
let GLOSS_RE = null;

function glossSlug(w){ return String(w).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''); }

(function buildGlossIndex(){
  const keys = [];
  GLOSS.forEach(e => {
    e.slug = glossSlug(e.w);
    [e.w].concat(e.alt || []).forEach(k => {
      const lk = k.toLowerCase();
      if (!GLOSS_BY_KEY[lk]){ GLOSS_BY_KEY[lk] = e; keys.push(k); }
    });
  });
  if (!keys.length) return;
  keys.sort((a,b) => b.length - a.length);           // longest first: "abstract class" beats "class"
  const src = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
  GLOSS_RE = new RegExp('(' + src + ')', 'gi');
})();

const GLOSS_SKIP = {PRE:1, A:1, BUTTON:1, SELECT:1, TEXTAREA:1, INPUT:1, SCRIPT:1, STYLE:1, H1:1, SUMMARY:1, LABEL:1, OPTION:1};
function isWordChar(ch){ return !!ch && /[A-Za-z0-9_]/.test(ch); }

const GLOSS_MAX_PER_PAGE = 30;
function annotateGlossary(root){
  if (!root || !GLOSS_RE) return;
  const used = Object.create(null);
  let placed = 0;
  const texts = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node){
      if (!node.nodeValue || !/[A-Za-z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
      let p = node.parentNode;
      while (p && p !== root){
        if (GLOSS_SKIP[p.nodeName]) return NodeFilter.FILTER_REJECT;
        if (p.classList && (p.classList.contains('no-gloss') || p.classList.contains('gterm'))) return NodeFilter.FILTER_REJECT;
        p = p.parentNode;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  }, false);
  let n; while ((n = walker.nextNode())) texts.push(n);

  texts.forEach(node => {
    if (placed >= GLOSS_MAX_PER_PAGE) return;
    const inCode = node.parentNode && node.parentNode.nodeName === 'CODE';
    const text = node.nodeValue;
    GLOSS_RE.lastIndex = 0;
    let m, last = 0, frag = null;
    while ((m = GLOSS_RE.exec(text)) !== null){
      const hit = m[0], start = m.index, end = start + hit.length;
      const entry = GLOSS_BY_KEY[hit.toLowerCase()];
      if (!entry || used[entry.slug]) continue;
      if (entry.kw && !inCode) continue;        // bare Java keywords only inside `code`
      if (placed >= GLOSS_MAX_PER_PAGE) break;
      // require real word boundaries when the term begins/ends with a word character
      if (isWordChar(hit[0]) && isWordChar(text[start-1])) continue;
      if (isWordChar(hit[hit.length-1]) && isWordChar(text[end])) continue;
      used[entry.slug] = true; placed++;
      frag = frag || document.createDocumentFragment();
      if (start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gterm';
      btn.textContent = hit;
      btn.setAttribute('data-term', entry.slug);
      btn.setAttribute('aria-label', hit + ' — show definition');
      frag.appendChild(btn);
      last = end;
    }
    if (frag){
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    }
  });
}

/* ---------- the popover ---------- */
let TIP = null, TIP_FOR = null;
function tipEl(){
  if (TIP) return TIP;
  TIP = el('div', {class:'gtip', role:'dialog'});
  TIP.addEventListener('click', e => e.stopPropagation());
  document.body.appendChild(TIP);
  return TIP;
}
function hideTip(){
  if (TIP) TIP.classList.remove('show');
  if (TIP_FOR) TIP_FOR.classList.remove('open');
  TIP_FOR = null;
}
function showTip(btn){
  const entry = GLOSS.find(e => e.slug === btn.getAttribute('data-term'));
  if (!entry) return;
  if (TIP_FOR === btn){ hideTip(); return; }
  hideTip();
  const t = tipEl();
  t.innerHTML = '';
  t.appendChild(el('div', {class:'gtip-word no-gloss', text: entry.w}));
  t.appendChild(el('div', {class:'gtip-def no-gloss', html: md(entry.d)}));
  if (entry.ex) t.appendChild(el('div', {class:'gtip-ex no-gloss', html: md(entry.ex)}));
  const foot = el('div', {class:'gtip-foot'});
  if (entry.see) foot.appendChild(el('a', {href: entry.see, text:'Where it is taught'}));
  foot.appendChild(el('a', {href:'#/glossary', text:'All terms'}));
  t.appendChild(foot);

  t.classList.add('show');
  TIP_FOR = btn; btn.classList.add('open');

  const r = btn.getBoundingClientRect();
  const w = Math.min(330, window.innerWidth - 20);
  t.style.width = w + 'px';
  let left = r.left + r.width/2 - w/2;
  left = Math.max(10, Math.min(left, window.innerWidth - w - 10));
  const h = t.offsetHeight;
  let top = r.bottom + window.scrollY + 8;
  if (r.bottom + h + 16 > window.innerHeight && r.top - h - 8 > 0) top = r.top + window.scrollY - h - 8;
  t.style.left = left + 'px';
  t.style.top  = top + 'px';
}

document.addEventListener('click', e => {
  const btn = e.target.closest ? e.target.closest('.gterm') : null;
  if (btn){ e.preventDefault(); e.stopPropagation(); showTip(btn); return; }
  hideTip();
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') hideTip(); });
window.addEventListener('resize', hideTip);
window.addEventListener('hashchange', hideTip);
