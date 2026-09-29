/* ============================================================
   CS214 Revise — two EXTRA PRACTICE papers in the 2025 format
   (4 questions, 15 marks). Written for this site, not from the
   course. Run by the paper engine in mock.js.

   Designed to have ONE right answer each (checked with the engines,
   see the Stage 4 notes):
     A Q1  Huffman: no equal weights at any merge → unique tree + codes
     A Q4  Dijkstra: no tie when circling, no equal-length alternative path
     B Q1  Huffman reverse: the question STATES the convention (smaller
           left, ties either way), so the 2025 ambiguity does not arise
     B Q3  Kruskal: all weights different → one order, two rejections
     B Q4  Dijkstra on an undirected graph (as in Lab 9): no ties
   Model answers are my working.
   ============================================================ */

const PAPER_ITEMS = {
  a2a: { id:'pa-2a', tag:'extra', choices:APPROACHES, answer:DP,
    prompt:'(a) The cheapest route from the top-left square of a grid to the bottom-right square, moving only right or down, satisfies <span class="formula-inline">c(i, j) = cost(i, j) + min( c(i − 1, j), c(i, j − 1) )</span>, where cost(i, j) is the price of entering square (i, j).',
    model:'<p><b>Dynamic programming.</b> The answer for each square is built from the answers for the square above and the square to the left, and these smaller instances <b>overlap</b>: c(i − 1, j − 1) is needed by both c(i − 1, j) and c(i, j − 1), so plain recursion would solve the same squares again and again. DP stores each c(i, j) in a table and fills it row by row from the top-left (bottom-up), solving each square once.</p><p>Not divide and conquer: the smaller instances are not independent. Not greedy: stepping to whichever neighbour is cheaper right now can miss the cheapest route overall.</p>',
    checklist: approachChecklist('dynamic programming', 'Justifies it: the smaller instances <b>overlap</b> (the same c values are needed again), so they are stored in a table and built bottom-up — and/or says why not D&C or greedy') },
  a2b: { id:'pa-2b', tag:'extra', choices:APPROACHES, answer:GR,
    prompt:'(b) One meeting room, many requests, each with a start and a finish time. Strategy: sort the requests by finishing time. Go through them in that order and accept a meeting if it does not clash with a meeting already accepted. An accepted meeting is never cancelled.',
    model:'<p><b>Greedy.</b> Each step makes the choice that looks best right now — the meeting that finishes earliest among those that still fit — and never goes back on it. In Lec 8.1 terms: selection = earliest finish; feasibility check = no clash; solution check = no requests left.</p><p>No table of stored sub-answers (not DP) and no splitting into independent smaller instances (not divide and conquer).</p>',
    checklist: approachChecklist('greedy', 'Justifies it: a locally best choice (earliest finish) is made at each step and never undone; ideally names the selection / feasibility / solution steps'),
    note:'Meeting scheduling is not in the slides; it is here only as a strategy to classify.' },
  a3: { id:'pa-3', tag:'extra', choices:['Prim', 'Kruskal', 'Dijkstra'], answer:2,
    prompt:'A city fire service has one fire station. Its road map is a weighted graph: the weights are travel times in minutes, and several streets are one-way. For every suburb the service wants the fastest route from the station. Which algorithm from Prim, Kruskal or Dijkstra will you use? Justify your choice and explain why the others are not appropriate for this objective.',
    model:'<p><b>Dijkstra\'s algorithm.</b> This is the single-source shortest path problem: one source (the station) and the fastest route from it to <b>each</b> suburb. Dijkstra handles directed graphs — the one-way streets — as long as no weight is negative, and travel times are never negative (Lec 9.2).</p><p><b>Prim and Kruskal are not appropriate:</b> they build a minimum spanning tree, which minimises the <b>total</b> weight of a network joining every vertex — not the time from the station to each suburb. The route from the station through an MST can be slower than the fastest route. They also need an undirected graph, and one-way streets make this one directed.</p>',
    checklist:[
      {t:'Chooses <b>Dijkstra</b>', m:1, auto:true},
      {t:'Justifies it: one source (the station) and the shortest/fastest route to <b>each</b> destination = single-source shortest paths', m:1},
      {t:'Explains why <b>Prim and Kruskal</b> do not fit: an MST minimises total weight, not each route from the station (and/or they need an undirected graph)', m:1}],
    note:'The mark split is my guess (1 choice + 1 justification + 1 "why not the others"), as for 2025 Q3.' },
  b2a: { id:'pb-2a', tag:'extra', choices:APPROACHES, answer:DC,
    prompt:'(a) To find both the smallest and the largest of n numbers, find them for each half and then compare the two answers. The number of comparisons is <span class="formula-inline">M(n) = 2M(n/2) + 2</span>, with M(2) = 1.',
    model:'<p><b>Divide and conquer.</b> The instance is split into <b>two half-size instances that do not overlap</b>, each is solved recursively, and the answers are combined with 2 comparisons (the smaller of the two minimums, the larger of the two maximums) — the divide / conquer / combine pattern of mergesort (Lec 4.1).</p><p>No sub-instance is solved twice, so storing answers in a table (DP) gains nothing, and no one-way locally best choice is made (not greedy).</p>',
    checklist: approachChecklist('divide and conquer', 'Justifies it from the formula: two independent (non-overlapping) half-size instances plus a combine step — and/or says why not DP or greedy') },
  b2b: { id:'pb-2b', tag:'extra', choices:APPROACHES, answer:DP,
    prompt:'(b) A carpenter can cut a plank of length n into pieces and has a price list for pieces of each length 1 … n. Strategy: work out the best income for a plank of length 1, then 2, then 3, and so on up to n, storing each answer. For each length, try every possible first piece and add the stored best income for what is left; keep the best.',
    model:'<p><b>Dynamic programming.</b> The answers for all smaller lengths are worked out first, <b>stored in a table</b>, and looked up (bottom-up). The smaller instances overlap — the best income for length 3 is reused for lengths 4, 5, … — which is exactly when DP pays off (Lec 6.1).</p><p>It tries <b>every</b> first piece and keeps the best rather than committing to one choice (not greedy), and the pieces are not independent halves solved separately (not divide and conquer).</p>',
    checklist: approachChecklist('dynamic programming', 'Justifies it: answers for smaller lengths are stored and reused (overlapping instances, bottom-up), trying every option — and/or says why not greedy or D&C'),
    note:'Rod cutting is not in the slides; it is here only as a strategy to classify.' }
};

/* Paper B Q1: the code table comes from a real Huffman run with Y = 16 (hidden) */
const PAPER_B_Q1 = { title:'Practice paper B Q1', tag:'extra', unknown:'Y', lo:1, hi:40,
  rows:[['A',3,'0000'],['B',5,'0001'],['C',9,'001'],['D',12,'110'],['Y',null,'111'],['E',20,'01'],['F',22,'10']],
  working:[
    '<b>Read the tree off the codes.</b> Root → left (0): node "0" has node "00" on the left and E (01) on the right; node "00" has node "000" (A 0000, B 0001) on the left and C (001) on the right. Root → right (1): F = 10 on the left, and node "11" joins D (110, left) and Y (111, right).',
    '<b>Node weights:</b> A + B = <b>8</b>; 8 + C = <b>17</b>; 17 + E = <b>37</b>; D + Y = <b>Y+12</b>; F + (Y + 12) = <b>Y+34</b>; root = 37 + (Y + 34) = <b>Y+71</b>.',
    '<b>Conditions, merge by merge</b> (each merge must take the two smallest nodes in the queue):',
    '(A, B) first: queue A3, B5, C9, D12, Y, E20, F22 → needs Y ≥ 5.',
    '(8, C): queue 8, C9, D12, Y, E20, F22 → needs Y ≥ 9.',
    'Next D and Y must be joined (not D with the 17 node): queue D12, Y, 17, E20, F22 → Y must be one of the two smallest, so Y ≤ 17 (at 17 it ties with the 17 node, and the question lets a tie go either way).',
    '<b>Left or right?</b> D is the left child (110) and Y the right (111), so D is removed first: D ≤ Y, i.e. <b>Y ≥ 12</b> (at 12 it is a tie).',
    '(17, E): queue 17, E20, F22, Y+12 → needs Y + 12 ≥ 20, i.e. Y ≥ 8 — already true.',
    '(F, Y+12): queue F22, Y+12, 37 → F on the left needs 22 ≤ Y + 12 (Y ≥ 10), and Y + 12 ≤ 37 (Y ≤ 25) — both already true.',
    'Root: 37 on the left, Y + 34 on the right → 37 ≤ Y + 34 → Y ≥ 3, already true.',
    '<b>Together: 12 ≤ Y ≤ 17.</b> (The value used to make the table was 16.)'
  ],
  ends:'At Y = 12, Y ties with D (D must come out first); at Y = 17, Y ties with the 17 node (Y must come out first). The question says equal weights may be removed in either order, so both ends count.'
};

PAPERS.pA = {id:'pA', curKey:'cs214.paperA.cur', histKey:'cs214.paperA.hist', tag:'extra', name:'Practice paper A',
  intro:'<b>EXTRA PRACTICE</b> — written for this site in the 2025 format, not a real paper. 4 questions, <b>15 marks</b>. Q1 builds a Huffman code (the 2025 paper went the other way); Q3 is a shortest-path scenario.',
  assumptions:'<ul><li><b>Q1:</b> the question fixes the convention — smaller weight on the left, 0 = left. No two weights are ever equal at a merge, so the tree and codes are unique.</li>' +
    '<li><b>Q4:</b> no ties when circling, and every vertex has exactly one shortest path. An entry is replaced only when the new distance is strictly shorter.</li>' +
    '<li><b>Q2/Q3:</b> the mark splits are my guess at a sensible scheme.</li></ul><p><b>On the real paper, write your assumptions down.</b></p>',
  qs:[
    {id:'q1', label:'Q1', marks:4, guide:15, topic:'Huffman: build the tree, codes and bit counts',
     links:[['#/huff-algo', 'Huffman\'s algorithm'], ['#/huff-diy', 'Huffman: do it yourself'], ['#/huff-encode', 'Encode & decode']],
     kind:'huffBuild', symbols:[['A',14],['B',7],['C',25],['D',4],['E',12],['F',19]],
     text:'1. A file contains only the six characters below, with these frequencies.<br>(a) Construct the Huffman tree and write down the code for each character. Put the node removed first (the smaller weight) on the <b>left</b>; 0 = left branch, 1 = right branch. <b>(2 marks)</b><br>(b) How many bits does the file take with your Huffman code? How many would it take with a fixed-length code? <b>(2 marks)</b>'},
    {id:'q2', label:'Q2', marks:4, guide:10, guideText:'5 + 5', topic:'Design approaches (a: formula, b: strategy)',
     links:[['#/rec-drill', 'Recurrence drill'], ['#/strat-drill', 'Strategy drill'], ['#/design', 'Design approaches']],
     kind:'approach', lead:Q2_LEAD,
     parts:[{key:'q2a', label:'2 (a)', item: () => PAPER_ITEMS.a2a, answer:0}, {key:'q2b', label:'2 (b)', item: () => PAPER_ITEMS.a2b, answer:2}]},
    {id:'q3', label:'Q3', marks:3, guide:5, topic:'Prim, Kruskal or Dijkstra?',
     links:[['#/compare', 'Comparison'], ['#/scen-drill', 'Scenario drill']],
     kind:'written', key:'q3', item: () => PAPER_ITEMS.a3, num:'3. '},
    {id:'q4', label:'Q4', marks:4, guide:15, topic:'Dijkstra from S: distances and paths',
     links:[['#/dij-table', 'Fill in the table'], ['#/dijkstra', 'Dijkstra\'s algorithm']],
     kind:'dijkstra', graph: () => cloneGraph(PAPER_GRAPHS.aQ4),
     text:'4. A courier company\'s depot is at node \'S\' in the directed graph below; the edge weights are delivery costs. Use <b>Dijkstra\'s Algorithm</b> to find the cheapest cost and route from \'S\' to every other location. Show all steps clearly. <b>(4 marks)</b>'}
  ]};

PAPERS.pB = {id:'pB', curKey:'cs214.paperB.cur', histKey:'cs214.paperB.hist', tag:'extra', name:'Practice paper B',
  intro:'<b>EXTRA PRACTICE</b> — written for this site in the 2025 format, not a real paper. 4 questions, <b>15 marks</b>. Q3 is a <b>Kruskal trace</b> instead of a typed answer: the 2025 paper did not trace Prim or Kruskal, but Lab 9 does. Q4 uses an undirected graph, as Lab 9 does.',
  assumptions:'<ul><li><b>Q1:</b> the question states the convention (smaller weight on the left; equal weights may come out in either order), so there is one answer, and the tie values at the ends count.</li>' +
    '<li><b>Q3:</b> all edge weights are different, so Kruskal\'s order is unique. Rows after the tree is finished are not needed.</li>' +
    '<li><b>Q4:</b> no ties when circling, one shortest path per vertex. The graph is undirected: every edge works both ways.</li>' +
    '<li><b>Q2:</b> the mark splits are my guess at a sensible scheme.</li></ul><p><b>On the real paper, write your assumptions down.</b></p>',
  qs:[
    {id:'q1', label:'Q1', marks:4, guide:15, topic:'Huffman tree from a code table + range of Y',
     links:[['#/huff-reverse', 'Reverse mode (Q1 style)'], ['#/huff-algo', 'Huffman\'s algorithm']],
     kind:'huffReverse', ex: () => PAPER_B_Q1, lenient:false,
     text:'1. Draw the Huffman tree corresponding to the encoding table below. Then determine all possible integer values for the frequency of character \'Y\', given that it is between 1 and 40 (inclusive). Show your working. Use the course convention: the node removed first (the smaller weight) goes on the <b>left</b>, and when two weights are equal, either may be removed first. (0 = left branch, 1 = right branch.) <b>(2 + 2 marks)</b>'},
    {id:'q2', label:'Q2', marks:4, guide:10, guideText:'5 + 5', topic:'Design approaches (a: formula, b: strategy)',
     links:[['#/rec-drill', 'Recurrence drill'], ['#/strat-drill', 'Strategy drill'], ['#/design', 'Design approaches']],
     kind:'approach', lead:Q2_LEAD,
     parts:[{key:'q2a', label:'2 (a)', item: () => PAPER_ITEMS.b2a, answer:1}, {key:'q2b', label:'2 (b)', item: () => PAPER_ITEMS.b2b, answer:0}]},
    {id:'q3', label:'Q3', marks:3, guide:5, topic:'Kruskal trace (in place of the typed Q3)',
     links:[['#/kr-diy', 'Kruskal: do it yourself'], ['#/kruskal', 'Kruskal\'s algorithm'], ['#/mst-lab', 'Lab 9 answer format']],
     kind:'kruskal', graph: () => cloneGraph(PAPER_GRAPHS.bQ3),
     text:'3. The graph below shows the possible cable routes between six offices (weights = cost in $1000s). Use <b>Kruskal\'s algorithm</b> to find a minimum spanning tree. List the edges in the order Kruskal considers them and say whether each is added to F or rejected, and why. Give the total weight. <b>(3 marks)</b>'},
    {id:'q4', label:'Q4', marks:4, guide:15, topic:'Dijkstra from P (undirected): distances and paths',
     links:[['#/dij-table', 'Fill in the table'], ['#/dijkstra', 'Dijkstra\'s algorithm']],
     kind:'dijkstra', graph: () => cloneGraph(PAPER_GRAPHS.bQ4),
     text:'4. The undirected graph below shows the roads between six towns (weights = km). Use <b>Dijkstra\'s Algorithm</b> to find the shortest distance and path from \'P\' to every other town. Show all steps clearly. <b>(4 marks)</b>'}
  ]};

const PAPER_GRAPHS = {
  aQ4: { name:'Practice paper A Q4', tag:'extra', directed:true, source:'S',
    nodes:[ {id:'S',x:40,y:170}, {id:'A',x:180,y:60}, {id:'B',x:180,y:280}, {id:'C',x:330,y:60}, {id:'D',x:330,y:280}, {id:'E',x:470,y:170} ],
    edges:[ {u:'S',v:'A',w:4}, {u:'S',v:'B',w:1}, {u:'B',v:'A',w:2}, {u:'A',v:'C',w:5}, {u:'A',v:'D',w:9},
            {u:'B',v:'D',w:10}, {u:'C',v:'D',w:2}, {u:'C',v:'E',w:6}, {u:'D',v:'E',w:3} ] },
  bQ3: { name:'Practice paper B Q3', tag:'extra', directed:false, source:'A',
    nodes:[ {id:'A',x:60,y:60}, {id:'B',x:260,y:40}, {id:'C',x:80,y:240}, {id:'D',x:290,y:210}, {id:'E',x:190,y:350}, {id:'F',x:430,y:330} ],
    edges:[ {u:'A',v:'B',w:4}, {u:'A',v:'C',w:3}, {u:'B',v:'C',w:6}, {u:'B',v:'D',w:2}, {u:'C',v:'D',w:5},
            {u:'C',v:'E',w:8}, {u:'D',v:'E',w:7}, {u:'D',v:'F',w:9}, {u:'E',v:'F',w:1} ] },
  bQ4: { name:'Practice paper B Q4', tag:'extra', directed:false, source:'P',
    nodes:[ {id:'P',x:40,y:170}, {id:'Q',x:180,y:60}, {id:'R',x:180,y:280}, {id:'S',x:330,y:170}, {id:'T',x:470,y:60}, {id:'U',x:480,y:280} ],
    edges:[ {u:'P',v:'Q',w:7}, {u:'P',v:'R',w:2}, {u:'R',v:'Q',w:3}, {u:'R',v:'S',w:8}, {u:'Q',v:'S',w:2},
            {u:'Q',v:'T',w:6}, {u:'S',v:'T',w:3}, {u:'S',v:'U',w:7}, {u:'T',v:'U',w:1} ] }
};
