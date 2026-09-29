/* ============================================================
   CS214 Revise — Stage 3 question banks (written answers)
   Recurrence drill (Q2a style), strategy drill (Q2b style) and
   scenario drill (Q3 style). The mock test reuses the three 2025
   items (rec-2025, strat-2025, scen-2025) so the model answers are
   identical everywhere.
   Every model answer is my working, not an official key.
   ============================================================ */

const APPROACHES = ['Divide and conquer', 'Dynamic programming', 'Greedy', 'Brute force'];
const [DC, DP, GR, BF] = [0, 1, 2, 3];
const PROBLEMS = ['MST — Prim or Kruskal', 'Shortest paths — Dijkstra', 'Huffman coding', 'None of these'];
const [P_MST, P_SSSP, P_HUFF, P_NONE] = [0, 1, 2, 3];

/* standard 2-mark checklist for "which approach? justify" */
function approachChecklist(name, why){
  return [{t:'Names <b>' + name + '</b>', m:1, auto:true}, {t:why, m:1}];
}

/* ---------------- recurrence drill (Q2a style) ---------------- */
const REC_ITEMS = [
  { id:'rec-2025', tag:'past', title:'Test 2 (2025) Q2a', choices:APPROACHES, answer:DC,
    prompt:'A problem can be solved recursively using the formula <span class="formula-inline">f(n) = f(n/2) + (n − 1)</span>. Which approach — dynamic programming, divide and conquer, or greedy — would you choose? Justify your choice.',
    model:'<p><b>Divide and conquer.</b> The formula turns an instance of size n into <b>one smaller instance of half the size</b>, f(n/2), plus n − 1 steps of extra work — a top-down split, the same shape as binary search (Lec 4.1: divide an instance "into one or more smaller instances").</p><p>The smaller instances never <b>overlap</b> (each call works on a different, halved instance), so storing results in a table as dynamic programming does would gain nothing. And no step-by-step "best choice" is being made, so it is not greedy.</p>',
    checklist:approachChecklist('divide and conquer', 'Justifies it from the formula: the instance is split into a <b>smaller, half-size</b> instance that <b>does not overlap</b> with others (so no DP table is needed), and/or says why it is not greedy'),
    note:'Some books call a split into a single smaller instance "decrease and conquer". The course counts it as divide and conquer (binary search, Lec 4.1 slide 8), so say divide and conquer.' },

  { id:'rec-bsearch', tag:'lecture', tagText:'Lecture (Lec 4.1)', title:'Binary search', choices:APPROACHES, answer:DC,
    prompt:'Binary search\'s worst case satisfies <span class="formula-inline">W(n) = W(n/2) + 1</span>. Which approach is it, and why?',
    model:'<p><b>Divide and conquer.</b> Each comparison with the middle item leaves <b>one</b> half-size sub-array to search. Lec 4.1: "the instance is broken down into only one smaller instance, so there is no combination of outputs." The halves never overlap, so there is nothing to store; W(n) = ⌊lg n⌋ + 1, i.e. Θ(lg n).</p>',
    checklist:approachChecklist('divide and conquer', 'Mentions the split into one half-size instance (no combine step needed, no overlap)') },

  { id:'rec-merge', tag:'lecture', tagText:'Lecture (Lec 4.1)', title:'Mergesort', choices:APPROACHES, answer:DC,
    prompt:'<span class="formula-inline">T(n) = 2T(n/2) + n</span>, where the "+ n" is the work of merging two sorted halves. Which approach?',
    model:'<p><b>Divide and conquer.</b> Divide the array into two halves, conquer each by sorting it recursively, then <b>combine</b> them by merging (Lec 4.1 slide 15). The two halves are separate — no overlap — so D&C is efficient here: Θ(n lg n).</p>',
    checklist:approachChecklist('divide and conquer', 'Names the divide (two halves), conquer (recursive sort) and combine (merge) steps, or says the halves do not overlap') },

  { id:'rec-quick', tag:'lecture', tagText:'Lecture (Lec 4.1)', title:'Quicksort (worst case)', choices:APPROACHES, answer:DC,
    prompt:'In quicksort\'s worst case, <span class="formula-inline">T(n) = T(n − 1) + (n − 1)</span>. The instance only shrinks by one each time. Which approach is quicksort?',
    model:'<p><b>Divide and conquer.</b> Quicksort partitions the array around a pivot (n − 1 comparisons) and then sorts each part recursively (Lec 4.1 slides 21–25). In the worst case one part is empty, so it is slow — Θ(n²) — but the parts still never <b>overlap</b>, so it is not dynamic programming, and nothing is chosen greedily.</p>',
    checklist:approachChecklist('divide and conquer', 'Explains partition-then-recurse on non-overlapping parts; recognises that an unbalanced split makes it slow but does not change the approach'),
    note:'Trap: "shrinks by one" does not automatically mean DP. DP is for sub-instances that <i>overlap</i> (the same ones solved again and again).' },

  { id:'rec-binom', tag:'lecture', tagText:'Lecture (Lec 6.1)', title:'Binomial coefficient', choices:APPROACHES, answer:DP,
    prompt:'<span class="formula-inline">B(n, k) = B(n − 1, k − 1) + B(n − 1, k)</span> for 0 &lt; k &lt; n, and B(n, k) = 1 when k = 0 or k = n. Which approach should compute it?',
    model:'<p><b>Dynamic programming.</b> Each instance splits into two instances <b>almost as large</b> as itself (n − 1), and these <b>overlap</b>: the same B(i, j) is recomputed many times by plain recursion (Lec 6.1: "same instances are being solved in each recursion"). DP solves the small instances first, stores them in an array B, and looks them up — bottom-up, Θ(nk).</p>',
    checklist:approachChecklist('dynamic programming', 'Points out the overlapping sub-instances (recomputed by recursion) and that DP stores them in a table / works bottom-up') },

  { id:'rec-fib', tag:'lecture', tagText:'Lecture (Lec 6.1)', title:'Fibonacci', choices:APPROACHES, answer:DP,
    prompt:'<span class="formula-inline">fib(n) = fib(n − 1) + fib(n − 2)</span>, fib(0) = 0, fib(1) = 1. Which approach should compute fib(n) efficiently?',
    model:'<p><b>Dynamic programming.</b> The two sub-instances are nearly as large as the original and overlap heavily — fib(n − 2) is computed inside fib(n − 1) as well — so plain recursion takes exponential time (Lec 6.1 slide 5: "Remember Fibonacci"). Storing each value once and building up from fib(0) takes linear time.</p>',
    checklist:approachChecklist('dynamic programming', 'Mentions the overlap / repeated work in the recursion and storing results bottom-up') },

  { id:'rec-max', tag:'extra', title:'Largest element by halves', choices:APPROACHES, answer:DC,
    prompt:'<span class="formula-inline">f(n) = 2f(n/2) + 1</span>: find the largest element of each half, then compare the two answers. Which approach?',
    model:'<p><b>Divide and conquer.</b> Two independent half-size instances, solved recursively, then combined with one comparison. The halves do not overlap, so no table is needed.</p>',
    checklist:approachChecklist('divide and conquer', 'Mentions independent halves plus a combine step') },

  { id:'rec-stairs', tag:'extra', title:'Ways to climb stairs', choices:APPROACHES, answer:DP,
    prompt:'<span class="formula-inline">w(n) = w(n − 1) + w(n − 2) + w(n − 3)</span>: the number of ways to climb n stairs taking 1, 2 or 3 at a time. Which approach?',
    model:'<p><b>Dynamic programming.</b> The sub-instances overlap (w(n − 2) is also needed inside w(n − 1)), so store w(0), w(1), … in a table and fill it from the bottom up.</p>',
    checklist:approachChecklist('dynamic programming', 'Mentions overlapping sub-instances and a bottom-up table') },

  { id:'rec-coins', tag:'extra', title:'Fewest coins', choices:APPROACHES, answer:DP,
    prompt:'<span class="formula-inline">C(a) = 1 + min<sub>coins c ≤ a</sub> C(a − c)</span>, C(0) = 0: the fewest coins that make a cents. Which approach does this formula describe?',
    model:'<p><b>Dynamic programming.</b> The formula tries <b>every</b> coin and takes the best, using answers for smaller amounts that overlap (C(4) is needed for 5, 14, 16…). Fill a table C[0..a] from the bottom up. A greedy "largest coin first" rule is faster but not always optimal — with coins 12, 10, 5, 1 it gives 5 coins for 16c instead of 3 (Lec 8.1).</p>',
    checklist:approachChecklist('dynamic programming', 'Mentions trying all options with stored (overlapping) smaller answers — and ideally why greedy is not enough') },

  { id:'rec-third', tag:'extra', title:'Split into thirds', choices:APPROACHES, answer:DC,
    prompt:'<span class="formula-inline">f(n) = f(n/3) + 1</span>. Which approach?',
    model:'<p><b>Divide and conquer.</b> One smaller instance a third of the size, like binary search with thirds. No overlap, no choice being made.</p>',
    checklist:approachChecklist('divide and conquer', 'Mentions the split into a (single) smaller, non-overlapping instance') },

  { id:'rec-perm', tag:'extra', title:'Try every ordering', choices:APPROACHES, answer:BF,
    prompt:'An algorithm checks every possible order of visiting n places and keeps the cheapest. The number of orders it checks is <span class="formula-inline">P(n) = n × P(n − 1)</span>, P(1) = 1. Which approach is this?',
    model:'<p><b>Brute force.</b> It tries every candidate (n! of them) and keeps the best. There is no splitting into independent parts, no stored table of sub-answers and no one-way choice.</p>',
    checklist:approachChecklist('brute force', 'Says it tries every candidate (n! orders)') }
];

/* ---------------- strategy-in-words drill (Q2b style) ---------------- */
const STRAT_ITEMS = [
  { id:'strat-2025', tag:'past', title:'Test 2 (2025) Q2b', choices:APPROACHES, answer:GR,
    prompt:'You must connect all sites in a connected, undirected, weighted graph with minimum total cost. Strategy: start from any site and call the built set S. While not all sites are in S: look at all roads that have one endpoint in S and the other outside S; pick the cheapest such road, add it to your network, and add the new site to S; repeat until every site is included. Which approach (DP, divide and conquer, greedy)? Justify.',
    model:'<p><b>Greedy.</b> At every step the strategy makes the choice that looks best <b>right now</b> — the cheapest road leaving S — and never goes back on it. There is no table of stored sub-answers (so not DP) and no splitting into smaller independent instances (so not divide and conquer).</p><p>It is exactly <b>Prim\'s algorithm</b> (Lec 9.1): S is the set Y, and "the cheapest road with one end in S" picks the vertex nearest to Y. It produces a minimum spanning tree.</p>',
    checklist:approachChecklist('greedy', 'Justifies it: the cheapest (locally best) road is chosen at each step and never undone — and ideally recognises it as <b>Prim\'s</b> algorithm') },

  { id:'strat-coins', tag:'lecture', tagText:'Lecture (Lec 8.1)', title:'Coin change', choices:APPROACHES, answer:GR,
    prompt:'To give change, repeatedly take the largest coin that does not take you past the amount, until the amount is reached.',
    model:'<p><b>Greedy</b> — Lec 8.1\'s own example. Selection: the largest coin; feasibility: total ≤ amount; solution check: amount reached. It is optimal for 50c/20c/10c/5c/2c/1c, but not for coins 12c, 10c, 5c, 1c (16c → 12+1+1+1+1 instead of 10+5+1).</p>',
    checklist:approachChecklist('greedy', 'Mentions the locally best choice (largest coin) made once and never undone; ideally the selection / feasibility / solution steps') },

  { id:'strat-huff', tag:'lecture', tagText:'Lecture (Lec 8.2)', title:'Huffman', choices:APPROACHES, answer:GR,
    prompt:'Put every character in a queue by frequency. Repeatedly remove the two least frequent, join them under a new node whose weight is their sum, and put that node back, until one tree is left.',
    model:'<p><b>Greedy</b> — Huffman\'s algorithm (Lec 8.2: "Huffman developed a greedy algorithm"). Each step takes the locally best pair, the two lowest frequencies, and never revisits it. The result is an optimal prefix code.</p>',
    checklist:approachChecklist('greedy', 'Mentions always taking the two lowest frequencies, never undone (and names Huffman)') },

  { id:'strat-kruskal', tag:'lecture', tagText:'Lecture (Lec 9.1)', title:'Kruskal', choices:APPROACHES, answer:GR,
    prompt:'Sort all the roads from cheapest to dearest. Go down the list, and build each road unless it would join two sites that are already connected. Stop when everything is connected.',
    model:'<p><b>Greedy</b> — Kruskal\'s algorithm. Selection: the next cheapest edge; feasibility: it must join two different subsets (no cycle); solution check: all subsets merged. Each accepted edge is never removed. It gives a minimum spanning tree.</p>',
    checklist:approachChecklist('greedy', 'Mentions cheapest-edge-first choices kept for good, with the cycle check as the feasibility step (and names Kruskal)') },

  { id:'strat-dijkstra', tag:'lecture', tagText:'Lecture (Lec 9.2)', title:'Dijkstra', choices:APPROACHES, answer:GR,
    prompt:'From a depot, repeatedly settle the unsettled place with the shortest known distance from the depot, then update the distances of its neighbours, until every place is settled.',
    model:'<p><b>Greedy</b> — Dijkstra\'s algorithm (Lec 9.2). Each step picks the vertex with the smallest distance so far (locally best) and it is never reconsidered. It gives the shortest path from the depot to every place.</p>',
    checklist:approachChecklist('greedy', 'Mentions picking the closest unsettled vertex each time, never undone (and names Dijkstra)') },

  { id:'strat-binom', tag:'lecture', tagText:'Lecture (Lec 6.1)', title:'A table filled row by row', choices:APPROACHES, answer:DP,
    prompt:'Fill a table row by row: every entry is the sum of two entries in the row above; the first and last entries of each row are 1. Read the answer from the last row.',
    model:'<p><b>Dynamic programming</b> — this is the binomial coefficient array B from Lec 6.1. Small instances are solved first, stored, and looked up to build bigger ones (bottom-up), instead of recomputing the same values recursively.</p>',
    checklist:approachChecklist('dynamic programming', 'Mentions solving small instances first and storing them in a table (bottom-up)') },

  { id:'strat-merge', tag:'lecture', tagText:'Lecture (Lec 4.1)', title:'Split, sort, merge', choices:APPROACHES, answer:DC,
    prompt:'Split the list into two halves, sort each half the same way, then merge the two sorted halves into one.',
    model:'<p><b>Divide and conquer</b> — mergesort (Lec 4.1). Divide into two independent halves, conquer each recursively, combine by merging. The halves do not overlap.</p>',
    checklist:approachChecklist('divide and conquer', 'Names the divide / conquer / combine steps') },

  { id:'strat-allroutes', tag:'extra', title:'List every route', choices:APPROACHES, answer:BF,
    prompt:'List every possible route through the network, work out the cost of each, and keep the cheapest.',
    model:'<p><b>Brute force</b> — it tries every candidate solution. It always finds the best, but the number of routes grows very fast (factorial in the number of places).</p>',
    checklist:approachChecklist('brute force', 'Says it checks every candidate and keeps the best') },

  { id:'strat-coinsdp', tag:'extra', title:'Fewest coins, every amount', choices:APPROACHES, answer:DP,
    prompt:'To find the fewest coins for n cents, work out the answer for every amount from 1 up to n. For each amount, try every coin and use the stored answer for what is left.',
    model:'<p><b>Dynamic programming.</b> Smaller amounts are solved first and stored; each new amount looks them up and takes the best over all coins. Unlike the greedy rule, it is always optimal.</p>',
    checklist:approachChecklist('dynamic programming', 'Mentions stored answers for smaller amounts, built bottom-up, trying every option') },

  { id:'strat-maxhalf', tag:'extra', title:'Largest by halves', choices:APPROACHES, answer:DC,
    prompt:'Find the largest number in an array by splitting it into halves, finding the largest in each half the same way, and returning the larger of the two.',
    model:'<p><b>Divide and conquer.</b> Two independent smaller instances solved recursively, then combined with one comparison.</p>',
    checklist:approachChecklist('divide and conquer', 'Names the split into independent halves and the combine step') },

  { id:'strat-jobs', tag:'lab', tagText:'Lab 8 activity 2', title:'Shortest job first', choices:APPROACHES, answer:GR,
    prompt:'Jobs take t1 = 5, t2 = 10 and t3 = 4. To finish them all as early as possible on average, always run the shortest job that is left next.',
    model:'<p><b>Greedy.</b> Each step picks the locally best job (the shortest remaining) and never changes the order afterwards. Order 4, 5, 10 gives finishing times 4, 9, 19 — total 32, the smallest of the six possible orders.</p>',
    checklist:approachChecklist('greedy', 'Mentions the shortest-remaining choice made each step and never undone'),
    note:'Lab 8 asks "what algorithm approach can be used to design an algorithm to give an optimal schedule?" — no posted solution; this is my working.' }
];

/* ---------------- scenario drill (Q3 style) ---------------- */
const SCEN_ITEMS = [
  { id:'scen-2025', tag:'past', title:'Test 2 (2025) Q3', choices:PROBLEMS, answer:P_MST,
    prompt:'A telecom firm must lay fibre-optic cable to connect all base stations. The engineering map can be modelled as an undirected weighted graph (weights = trenching length in km). Which algorithm from Prim, Kruskal or Dijkstra will you use to minimise total cable length? Justify your choice and explain why the others are not appropriate for this objective.',
    model:'<p><b>Prim\'s algorithm (or Kruskal\'s — either is correct).</b> The goal is to connect <b>every</b> station with the <b>minimum total</b> length of cable, which is exactly a <b>minimum spanning tree</b> of the undirected weighted graph. Both Prim and Kruskal are greedy algorithms that produce an MST (Lec 9.1).</p><p><b>Dijkstra is not appropriate:</b> it solves single-source shortest paths — it makes each station\'s distance <i>from one chosen source</i> as small as possible, not the total length of the network. Its tree can use more cable in total. E.g. stations A, B, C with A–B 2, B–C 2, A–C 3: the MST uses A–B and B–C (4 km), but Dijkstra from A keeps A–C (3) because C is closer to A that way, giving 5 km.</p><p><b>The other MST algorithm</b> (Kruskal, if you chose Prim) would also be correct — it gives a tree of the same minimum total weight. Choosing between them is about convenience or efficiency, e.g. Prim for a dense map with many possible trenches, Kruskal for a sparse one (textbook).</p>',
    checklist:[
      {t:'Chooses <b>Prim or Kruskal</b>', m:1, auto:true},
      {t:'Justifies it: connecting <b>all</b> stations with <b>minimum total</b> length = a minimum spanning tree', m:1},
      {t:'Explains why <b>Dijkstra</b> is wrong (shortest paths from one source, not minimum total length) <b>and</b> notes the other MST algorithm would also work', m:1}
    ],
    note:'The mark split is my guess at a sensible scheme (1 choice + 1 justification + 1 "why not the others"); the paper only says 3 marks.' },

  { id:'scen-gps', tag:'extra', title:'Delivery routes from a depot', choices:PROBLEMS, answer:P_SSSP,
    prompt:'A courier leaves the depot for each delivery separately and wants the quickest route from the depot to every customer. Roads have travel times; some are one-way.',
    model:'<p><b>Dijkstra</b> (single-source shortest path): one fixed start, the best route to <b>each</b> destination, and one-way roads are fine (directed graph). <b>Not an MST:</b> an MST minimises the total length of a network, not each trip from the depot, and needs an undirected graph. <b>Not Huffman:</b> there is nothing to encode.</p>',
    checklist:[{t:'Chooses Dijkstra / SSSP', m:1, auto:true}, {t:'Links it to one source and the best route to each destination', m:1}, {t:'Says why an MST (total length, undirected) and Huffman do not fit', m:1}] },

  { id:'scen-pipes', tag:'extra', title:'Water pipes between villages', choices:PROBLEMS, answer:P_MST,
    prompt:'The council wants every village connected to the water network using the least total length of pipe. Any village can be reached through others.',
    model:'<p><b>MST — Prim or Kruskal.</b> Connect all villages with minimum <b>total</b> pipe = minimum spanning tree. <b>Not Dijkstra:</b> nobody cares about the distance from one particular village; only the total matters. <b>Not Huffman:</b> no coding problem.</p>',
    checklist:[{t:'Chooses MST (Prim/Kruskal)', m:1, auto:true}, {t:'Links it to "connect all" with minimum total length', m:1}, {t:'Says why Dijkstra (one source, not the total) and Huffman do not fit', m:1}] },

  { id:'scen-sensor', tag:'extra', title:'Compressing sensor readings', choices:PROBLEMS, answer:P_HUFF,
    prompt:'A weather station sends readings as characters. A few values occur far more often than the rest. The link is slow, so the file must be as small as possible without losing information.',
    model:'<p><b>Huffman coding.</b> Lossless compression with an optimal <b>prefix code</b>: frequent values get short codewords, rare ones long. <b>Not MST or Dijkstra:</b> there is no graph and nothing to connect or route.</p>',
    checklist:[{t:'Chooses Huffman coding', m:1, auto:true}, {t:'Mentions frequencies → shorter codes for common values (prefix code, lossless)', m:1}, {t:'Says why the graph algorithms do not apply', m:1}] },

  { id:'scen-ambulance', tag:'extra', title:'Ambulance station', choices:PROBLEMS, answer:P_SSSP,
    prompt:'An ambulance station needs, for every suburb, the fastest route from the station to that suburb.',
    model:'<p><b>Dijkstra.</b> One source (the station) and the shortest route to each suburb. <b>Not an MST:</b> the MST minimises total road length, and its path from the station to a suburb can be longer than the shortest one. <b>Not Huffman.</b></p>',
    checklist:[{t:'Chooses Dijkstra / SSSP', m:1, auto:true}, {t:'Links it to one source and each destination\'s shortest route', m:1}, {t:'Says why an MST and Huffman do not fit', m:1}] },

  { id:'scen-grid', tag:'extra', title:'Dense power grid', choices:PROBLEMS, answer:P_MST,
    prompt:'Connect all substations with the least total cable. Almost every pair of substations could be linked directly, so the graph has very many edges.',
    model:'<p><b>MST.</b> Either Prim or Kruskal gives the minimum total. With a <b>dense</b> graph the textbook favours <b>Prim</b>, Θ(n²), over Kruskal, Θ(m lg m) with m close to n² — but both are correct. <b>Not Dijkstra</b> (distances from one source) and <b>not Huffman</b>.</p>',
    checklist:[{t:'Chooses MST (Prim/Kruskal)', m:1, auto:true}, {t:'Links it to "connect all" with minimum total, ideally Prim for dense graphs (textbook)', m:1}, {t:'Says why Dijkstra and Huffman do not fit', m:1}] },

  { id:'scen-sort', tag:'extra', title:'Sorting exam marks', choices:PROBLEMS, answer:P_NONE,
    prompt:'A lecturer needs 300 exam marks in increasing order.',
    model:'<p><b>None of these.</b> It is sorting — e.g. mergesort or quicksort (divide and conquer, Lec 4.1). There is no graph to span or route through, and nothing to compress.</p>',
    checklist:[{t:'Chooses "none of these"', m:1, auto:true}, {t:'Names a suitable method instead (a sorting algorithm, divide and conquer)', m:1}, {t:'Says why MST / Dijkstra / Huffman do not apply', m:1}] },

  { id:'scen-tour', tag:'extra', title:'Visit every city once and return', choices:PROBLEMS, answer:P_NONE,
    prompt:'A salesperson must visit every city exactly once and come home, as cheaply as possible.',
    model:'<p><b>None of these.</b> It is a tour (the course calls it the travelling salesperson problem, which is not in this test). An MST connects the cities but is not a single round trip; Dijkstra gives separate shortest paths from one city, not one tour; Huffman is about codes.</p>',
    checklist:[{t:'Chooses "none of these"', m:1, auto:true}, {t:'Identifies it as a tour (one round trip visiting all)', m:1}, {t:'Says why an MST and Dijkstra are not tours', m:1}] },

  { id:'scen-morse', tag:'extra', title:'Signal codes', choices:PROBLEMS, answer:P_HUFF,
    prompt:'Design binary signal codes for 20 commands so that the average message is as short as possible. How often each command is used is known, and a receiver must decode a stream without separators.',
    model:'<p><b>Huffman coding.</b> Known frequencies, shortest average length, and decoding without separators = an optimal <b>prefix code</b>. No graph, so MST and Dijkstra do not apply.</p>',
    checklist:[{t:'Chooses Huffman coding', m:1, auto:true}, {t:'Mentions frequencies and prefix codes (decodable without separators)', m:1}, {t:'Says why the graph algorithms do not apply', m:1}] },

  { id:'scen-committee', tag:'extra', title:'Choosing a committee', choices:PROBLEMS, answer:P_NONE,
    prompt:'How many different 5-person committees can be chosen from 12 people?',
    model:'<p><b>None of these.</b> It is the binomial coefficient C(12, 5) = 792, computed efficiently with dynamic programming (Lec 6.1). No graph and nothing to encode.</p>',
    checklist:[{t:'Chooses "none of these"', m:1, auto:true}, {t:'Recognises the binomial coefficient / DP', m:1}, {t:'Says why the graph algorithms and Huffman do not apply', m:1}] },

  { id:'scen-fares', tag:'extra', title:'Cheapest fares from Nadi', choices:PROBLEMS, answer:P_SSSP,
    prompt:'An airline wants the cheapest fare from Nadi to every other airport it serves. Some flights only go one way, and all fares are positive.',
    model:'<p><b>Dijkstra.</b> One source (Nadi), cheapest route to each airport, a directed graph with positive weights. <b>Not an MST</b> (that needs an undirected graph and minimises the total, not each route). <b>Not Huffman.</b></p>',
    checklist:[{t:'Chooses Dijkstra / SSSP', m:1, auto:true}, {t:'Links it to one source, each destination, directed edges', m:1}, {t:'Says why an MST and Huffman do not fit', m:1}] }
];

function findWrittenItem(id){
  return REC_ITEMS.concat(STRAT_ITEMS, SCEN_ITEMS).find(i => i.id === id);
}
