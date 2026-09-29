/* ============================================================
   CS214 Revise — coin change: greedy vs dynamic programming
   (Lec 8.1's coin examples, used on the Greedy vs DP page).
   Greedy: take the largest coin that still fits, repeatedly.
   DP (my working — the slides only state the optimal answer):
     C[0] = 0,  C[a] = 1 + min over coins c ≤ a of C[a − c]
   ============================================================ */

function greedyCoins(amount, coins){
  const cs = coins.slice().sort((a, b) => b - a), out = [];
  let left = amount;
  for (const c of cs){ while (c <= left){ out.push(c); left -= c; } }
  return {coins: out, ok: left === 0};
}
function dpCoins(amount, coins){
  const C = [0], pick = [null];
  for (let a = 1; a <= amount; a++){
    C[a] = Infinity; pick[a] = null;
    coins.forEach(c => { if (c <= a && C[a - c] + 1 < C[a]){ C[a] = C[a - c] + 1; pick[a] = c; } });
  }
  const out = [];
  let a = amount;
  while (a > 0 && pick[a] != null){ out.push(pick[a]); a -= pick[a]; }
  return {C, pick, coins: out.sort((x, y) => y - x), ok: C[amount] < Infinity};
}

function renderCoinDemo(opts, onDone){
  const root = el('div', {class:'no-gloss'});
  const amt = el('input', {class:'din wide', type:'text', inputmode:'numeric', 'aria-label':'Amount in cents'});
  const cs = el('input', {class:'path-in', type:'text', 'aria-label':'Coin values'});
  amt.value = opts.amount || '16'; cs.value = opts.coins || '12, 10, 5, 1';
  const presets = el('select', {class:'sel', 'aria-label':'Examples'}, [
    el('option', {value:'16|12, 10, 5, 1', text:'[Lecture] 16c with 12c, 10c, 5c, 1c — greedy fails'}),
    el('option', {value:'75|50, 20, 10, 5, 2, 1', text:'[Lecture] 75c with 50c, 20c, 10c, 5c, 2c, 1c — greedy optimal'}),
    el('option', {value:'30|25, 10, 1', text:'[Extra practice] 30c with 25c, 10c, 1c'}),
    el('option', {value:'8|6, 4, 1', text:'[Extra practice] 8c with 6c, 4c, 1c'})]);
  presets.addEventListener('change', () => { const [a, c] = presets.value.split('|'); amt.value = a; cs.value = c; run(); });
  const btn = el('button', {class:'btn', type:'button', text:'Compare'});
  btn.addEventListener('click', run);
  const out = el('div');
  root.appendChild(el('div', {class:'ctrl'}, [presets]));
  root.appendChild(el('div', {class:'ctrl'}, [el('label', {}, [document.createTextNode('Amount'), amt]), el('label', {}, [document.createTextNode('Coins'), cs]), btn]));
  root.appendChild(out);
  function run(){
    out.innerHTML = '';
    const a = Number(amt.value), coins = String(cs.value).split(/[^0-9]+/).filter(Boolean).map(Number).filter(x => x > 0);
    if (!(a > 0 && a <= 200 && Math.floor(a) === a) || !coins.length){ out.appendChild(el('p', {class:'err', text:'Give a whole amount from 1 to 200 and at least one coin value.'})); return; }
    const g = greedyCoins(a, coins), d = dpCoins(a, coins);
    const fmt = r => r.ok ? r.coins.join(' + ') + ' = ' + r.coins.length + ' coin' + (r.coins.length > 1 ? 's' : '') : 'cannot make the amount';
    out.appendChild(el('div', {class:'tablewrap'}, [el('table', {}, [el('tbody', {}, [
      el('tr', {}, [el('th', {text:'Greedy (largest coin first)'}), el('td', {text: fmt(g)})]),
      el('tr', {}, [el('th', {text:'Dynamic programming (fewest possible)'}), el('td', {text: fmt(d)})])])])]));
    const same = g.ok && d.ok && g.coins.length === d.coins.length;
    out.appendChild(el('div', {class:'feedback show ' + (same ? 'good' : 'bad'), html: same
      ? 'Greedy is optimal here — the same number of coins as DP.'
      : 'Greedy is <b>not</b> optimal here: its locally best choice (the largest coin) leads to ' + (g.ok ? g.coins.length + ' coins' : 'a dead end') + ', but ' + d.coins.length + ' is possible. DP finds it by trying every coin for every smaller amount.'}));
    if (a <= 40){
      out.appendChild(el('div', {class:'prompt'}, [el('span', {class:'badge lecture', text:'My working'}), document.createTextNode(' The DP table C[a] = fewest coins for a cents (bottom-up)')]));
      const cols = []; for (let i = 0; i <= a; i++) cols.push(i);
      out.appendChild(el('div', {class:'tablewrap'}, [el('table', {class:'coins'}, [
        el('thead', {}, [el('tr', {}, [el('th', {text:'a'})].concat(cols.map(i => el('th', {text:String(i)}))))]),
        el('tbody', {}, [
          el('tr', {}, [el('th', {text:'C[a]'})].concat(cols.map(i => el('td', {class: i === a ? 'hit' : '', text: d.C[i] === Infinity ? '∞' : String(d.C[i])})))),
          el('tr', {}, [el('th', {text:'last coin'})].concat(cols.map(i => el('td', {class:'subtle', text: d.pick[i] == null ? '—' : String(d.pick[i])}))))])])]));
    }
    if (onDone) onDone();
  }
  run();
  return root;
}
