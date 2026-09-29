/* ============================================================
   CS214 Revise — page content
   Every page: { id, group, nav, title, eyebrow, lede, blocks:[…] }
   Block types are rendered by app.js (see R.*). Blocks with an `id`
   (mcq, quiz, widget) count toward progress.
   Source tags: lecture / lab / past / extra / textbook / noncourse.
   ============================================================ */

const TEST_INFO = {
  when: 'Tuesday, week 11, 2–3 pm (the lecture slot)',
  paper2025: '50 minutes, 15 marks, 10% of the final grade'
};

const PAGES = [

/* ================================================================ */
{ id:'start', group:'Start', nav:'Start here', eyebrow:'CS214 · Test 2',
  title:'Test 2 revision',
  lede:'Everything here is built from the CS214 week 6–10 slides and labs, and from the 2025 Test 2 paper. Work from the top of the menu down.',
  blocks:[
    {t:'table', head:['', ''], rows:[
      ['**When**', TEST_INFO.when],
      ['**Last year\'s paper (2025)**', TEST_INFO.paper2025 + ' · 4 questions, all compulsory'],
      ['**Learning outcome tested**', 'CLO 2 — "Assess the suitability of different algorithms/data structures for solving a given problem"'],
      ['**Rules on the paper**', '"Show all working to get the full marks." No course material or internet.']
    ], noHead:true},

    {t:'h', x:'What the 2025 paper asked'},
    {t:'p', x:'There is no separate "sample Test 2" in the course files; the closest thing is the real 2025 paper (uploaded to Moodle without solutions). It is the best guide to the format. The worked solutions in this site are ours, not an official key.'},
    {t:'table', head:['Q', 'What it asks', 'Marks', 'Guide time', 'Practise it'], rows:[
      ['1', 'Huffman: draw the tree from a code table, then find every possible frequency for one character', '2 + 2', '15 min', '<a href="#/huff-reverse">Reverse mode</a>'],
      ['2a', 'Which approach (DP, divide & conquer, greedy) fits a recurrence? Justify.', '2', '5 min', '<a href="#/rec-drill">Formula drill</a>'],
      ['2b', 'Which approach fits a described strategy? (It is Prim\'s.) Justify.', '2', '5 min', '<a href="#/strat-drill">Strategy drill</a>'],
      ['3', 'Prim, Kruskal or Dijkstra for a cabling problem — and why not the others', '3', '5 min', '<a href="#/scen-drill">Scenario drill</a>'],
      ['4', 'Dijkstra on a directed graph: shortest distance **and path** to every vertex, all steps shown', '4', '15 min', '<a href="#/dij-table">Fill in the table</a>']
    ]},
    {t:'note', k:'exam', title:'Timing', x:'The 2025 paper gave 50 minutes; your slot is an hour. The <a href="#/mock">mock test</a> defaults to 50 minutes with a 60-minute option, and shows the per-question guide times from the paper.'},

    {t:'h', x:'Scope (from your lecturer)'},
    {t:'table', head:['In scope', 'Out of scope'], rows:[
      ['Design approaches learned so far (brute force, divide and conquer, dynamic programming, greedy)<br>Kruskal\'s, Prim\'s and Dijkstra\'s algorithms<br>Huffman encoding, minimum spanning tree, single-source shortest path',
       'Knapsack (0-1 and fractional)<br>Travelling salesperson (TSP)<br>Floyd\'s algorithm']
    ]},

    {t:'h', x:'How to read the labels'},
    {t:'legend'},
    {t:'settings'},
    {t:'note', k:'trap', title:'Errors in the course material', x:'Some slides and posted solutions contain mistakes (a Huffman frequency, a wrong code in a lab photo, a misleading "% compression", a missing bit). They are listed in the <a href="#/huff-algo">Known problems</a> box, and each worked example says where it differs from the source.'},

    {t:'h', x:'What is ready'},
    {t:'p', x:'The site is being built in stages; each stage works on its own.'},
    {t:'table', head:['Stage', 'Contents', 'Status'], rows:[
      ['1', 'Graph basics, SSSP, Dijkstra (step-through, do-it-yourself, fill-in table, quiz), glossary', '**Ready**'],
      ['2', 'Huffman coding: the problem, the algorithm with worked examples, step-through, do-it-yourself, encode/decode drill, reverse mode (Q1), quiz', '**Ready**'],
      ['3', 'Design approaches (formula and strategy drills, greedy vs DP); Kruskal and Prim lessons; comparison and scenario drill; the timed mock test', '**Ready**'],
      ['4', 'Kruskal and Prim step-through and do-it-yourself, the Lab 9 answer-format checker, Kruskal vs Prim side by side', '**Ready**'],
      ['5', 'Two extra practice papers in the 2025 format (timed, auto-marked Huffman/Dijkstra/Kruskal, self-marked typed answers)', '**Ready**'],
      ['6', 'A one-page printable <a href="sheet.html">revision sheet</a>', '**Ready**']
    ]},
    {t:'cards', x:[
      {href:'#/graphs', kick:'Start', title:'Graph basics', text:'Vertices, edges, weights, paths, the adjacency matrix.'},
      {href:'#/dijkstra', kick:'Learn', title:'Dijkstra\'s algorithm', text:'Plain version, the slide pseudocode, the lecturer\'s table method.'},
      {href:'#/dij-table', kick:'Test skill', title:'Fill in the table', text:'Exactly what Q4 asks: every row, then distances and paths.'},
      {href:'#/huff-algo', kick:'Learn', title:'Huffman\'s algorithm', text:'The merge loop, the slide pseudocode, every course example worked row by row.'},
      {href:'#/huff-reverse', kick:'Test skill', title:'Reverse mode (Q1)', text:'Code table → tree → the possible frequency range, with all three readings.'},
      {href:'#/rec-drill', kick:'Test skill', title:'Design approaches (Q2)', text:'Formula and strategy drills: choose, justify, self-mark.'},
      {href:'#/scen-drill', kick:'Test skill', title:'Which algorithm? (Q3)', text:'Scenarios: MST, shortest paths, Huffman or none — and why not the others.'},
      {href:'#/mock', kick:'Timed', title:'Mock test', text:'The 2025 paper, 50 or 60 minutes, auto-marked Q1/Q4, results per question.'},
      {href:'#/kr-diy', kick:'Practise', title:'Kruskal and Prim', text:'Step-throughs, do-it-yourself, and the Lab 9 "sequence added" answer check.'},
      {href:'#/paper-a', kick:'Timed · Extra practice', title:'Practice papers A and B', text:'Two new papers in the 2025 format. B has a Kruskal trace.'},
      {href:'sheet.html', kick:'Print', title:'Revision sheet', text:'The whole test on one A4 page, for the night before.'}
    ]}
  ]
},

/* ================================================================ */
{ id:'graphs', group:'Shortest paths', nav:'Graph basics', eyebrow:'Background · Lec 6.1, Lec 9.1',
  title:'Graph basics you need',
  lede:'Dijkstra, Prim and Kruskal all work on graphs, so start with the words the slides use.',
  blocks:[
    {t:'plain', x:'A graph is a set of places joined by connections. The places are **vertices** (circles), the connections are **edges** (lines). A **weight** is a number on an edge — a cost, a distance, a time.'},
    {t:'src', tags:[['lecture','Lec 6.1 slides 11–12'], ['lecture','Lec 9.1 slide 2']]},
    {t:'ul', x:[
      '**Directed graph (digraph):** every edge has a direction (an arrow). You may only follow it the way it points.',
      '**Undirected graph:** edges have no direction. Prim and Kruskal need an undirected graph; Dijkstra works on either.',
      '**Weighted graph:** the edges have values (weights).',
      '**Path:** a sequence of adjacent vertices. **Simple path:** never visits a vertex twice. The **length** of a path in a weighted graph is the sum of its weights.',
      '**Cycle:** a simple path of three or more vertices where the last is adjacent to the first. No cycles = **acyclic**.',
      '**Connected** (undirected): there is a path between every pair of vertices.'
    ]},
    {t:'graph', preset:'lecture92', caption:'A directed, weighted graph (the Lec 9.2 example). The edge v1→v5 has weight 1; there is no edge from v5 back to v1.'},
    {t:'graph', preset:'lab9', caption:'An undirected, weighted graph (Lab 9). Each edge works both ways.'},

    {t:'h', x:'The adjacency matrix'},
    {t:'p', x:'The slides represent a graph as an **adjacency matrix** W: row = the vertex you leave, column = the vertex you arrive at. The entry is the edge weight, **∞** if there is no edge, and **0** on the diagonal. In Lec 9.2 the lecturer\'s first step for Dijkstra is "Make adjacency matrix".'},
    {t:'matrix', preset:'lecture92', caption:'W for the directed graph above. Row v1 reads 0 7 4 6 1 — exactly the lecturer\'s handwritten first row (Lec 9.2 slide 6).'},
    {t:'note', x:'For an **undirected** graph the matrix is symmetric: W[i][j] = W[j][i], because the same edge works both ways.'},

    {t:'mcq', id:'g-q1', tag:'extra', q:'In the matrix above, what is W[v3][v2]?',
      opts:['2', '∞', '5', '4'], a:0,
      why:'Row v3, column v2 = the edge v3→v2, which has weight 2. (v2→v3 does not exist, so W[v2][v3] = ∞ — direction matters.)'},
    {t:'mcq', id:'g-q2', tag:'extra', q:'What is the length of the path v1 → v3 → v4 in the directed graph above?',
      opts:['9', '5', '4', '10'], a:0,
      why:'Length = sum of the weights: v1→v3 is 4, v3→v4 is 5, so 4 + 5 = 9.'},
    {t:'mcq', id:'g-q3', tag:'extra', q:'Which of these is always true of an undirected graph\'s adjacency matrix?',
      opts:['It is symmetric: W[i][j] = W[j][i]', 'Every entry off the diagonal is finite', 'The diagonal holds the largest weights', 'It has one row per edge'], a:0,
      why:'Each undirected edge can be used both ways, so the entry is the same in both directions. The diagonal is 0 and missing edges are ∞; rows are per vertex, not per edge.'}
  ]
},

/* ================================================================ */
{ id:'sssp', group:'Shortest paths', nav:'SSSP: the problem', eyebrow:'Single-source shortest path · Lec 9.2',
  title:'Shortest paths: the problem',
  lede:'Before the algorithm, be clear about what it has to produce.',
  blocks:[
    {t:'plain', x:'You stand at one place — the **source**. You want the cheapest route from there to **every** other place: one answer per destination, all from the same start. That is the single-source shortest path problem (SSSP).'},
    {t:'h', x:'The formal version'},
    {t:'src', tags:[['lecture','Lec 9.2 slide 2'], ['lecture','Lec 6.1 slides 14–15']]},
    {t:'note', k:'def', title:'Definition (Lec 9.2)', x:'"Given a graph G = ⟨V, E⟩, find the shortest path from a given source vertex s ∈ V to every vertex v ∈ V." A greedy algorithm that solves it is **Dijkstra\'s algorithm**, which "is similar to Prim\'s algorithm for the Minimum Spanning Tree".'},
    {t:'ul', x:[
      'It is an **optimization problem** (Lec 6.1): there are many candidate paths, and we want the one with the minimum length.',
      'A shortest path is always a **simple path** — going round a cycle can only add length.',
      'The answer for each vertex is two things: its **shortest distance** and **the path itself**. Test 2 (2025) Q4 asked for both.'
    ]},
    {t:'h', x:'What a finished answer looks like'},
    {t:'graph', preset:'lecture92', final:true, caption:'Lec 9.2 example, source v1. The blue edges are F at the end: each vertex keeps the one edge it was reached along. Together they connect v1 to every vertex.'},
    {t:'finalpaths', preset:'lecture92'},
    {t:'note', k:'trap', title:'Not the same as a minimum spanning tree', x:'SSSP makes each path from the source as short as possible. An MST makes the **total weight of all the edges** as small as possible, with no source. The blue edges above are not necessarily an MST. Test 2 (2025) Q3 is exactly this distinction — the <a href="#/compare">comparison page</a> and the <a href="#/scen-drill">scenario drill</a> practise it.'},
    {t:'mcq', id:'s-q1', tag:'extra', q:'A courier company starts every delivery from its depot and wants the cheapest route to each customer. Which problem is this?',
      opts:['Single-source shortest path', 'Minimum spanning tree', 'Huffman coding', 'Travelling salesperson'], a:0,
      why:'One fixed start (the depot), the cheapest route to each destination separately: SSSP → Dijkstra. An MST would minimise the total length of a network instead; TSP (out of scope) is one tour visiting everything.'},
    {t:'mcq', id:'s-q2', tag:'extra', q:'In the Lec 9.2 example, the direct edge v1→v2 has weight 7. Why is the shortest distance to v2 only 5?',
      opts:['The path v1→v5→v4→v2 has length 1 + 1 + 3 = 5', 'Dijkstra rounds weights down', 'v2 is closer to v3', 'Because the graph is undirected'], a:0,
      why:'A longer path (more edges) can still be shorter in total weight: 1 + 1 + 3 = 5 < 7.'}
  ]
},

/* ================================================================ */
{ id:'dijkstra', group:'Shortest paths', nav:'Dijkstra\'s algorithm', eyebrow:'Greedy algorithms · Lec 9.2',
  title:'Dijkstra\'s algorithm',
  lede:'Simple version first, then the slide pseudocode, then the lecturer\'s table method — which is what you write in the test.',
  blocks:[
    {t:'plain', x:'Imagine water spreading out from the source along the edges. Whichever vertex the water reaches first is **settled** — nothing can get there sooner. Dijkstra settles the vertices one at a time, always the **closest unsettled one next**. Once a vertex is settled its distance never changes.'},
    {t:'ladder', title:'In simple steps', x:[
      ['Start', 'Y = {source}. Every other vertex gets the weight of a direct edge from the source, or ∞ if there is no direct edge.'],
      ['Select', 'Of the vertices not in Y, take the one with the **smallest** distance. That distance is now final.'],
      ['Record', 'Add it to Y, and add the edge it was reached along to F.'],
      ['Update', 'For each vertex v not in Y: is (distance of the new vertex) + (weight of the edge to v) smaller than v\'s current distance? If so, replace it and note where it now comes from.'],
      ['Repeat', 'Back to Select until Y = V (every vertex is in Y).']
    ]},

    {t:'h', x:'The formal version'},
    {t:'src', tags:[['lecture','Lec 9.2 slide 3']]},
    {t:'code', title:'Dijkstra\'s algorithm — pseudocode as on the slide', x:
'Y = {v1};\nF = ∅;\nwhile (the instance is not solved){\n    select a vertex v from V − Y, that has a      // selection\n    shortest path from v1, using only vertices    // procedure and\n    in Y as intermediates;                         // feasibility check\n\n    add the new vertex v to Y;\n    add the edge (on the shortest path) that touches v to F;\n\n    if (Y == V)\n        the instance is solved;                    // solution check\n}'},
    {t:'p', x:'The underlined phrase on the slide is **"using only vertices in Y as intermediates"**: when you pick the next vertex, the only paths you are allowed to count are ones whose in-between vertices are all already in Y. That is why each row of the table only uses edges leaving vertices in Y.'},
    {t:'h3', x:'Why it is a greedy algorithm'},
    {t:'src', tags:[['lecture','Lec 8.1 slide 4']]},
    {t:'table', head:['Greedy step (Lec 8.1)', 'In Dijkstra'], rows:[
      ['Selection procedure', 'Choose the vertex in V − Y with the shortest distance found so far'],
      ['Feasibility check', 'The path may only use vertices in Y as intermediates (the slide combines this with selection)'],
      ['Solution check', 'Y == V']
    ]},
    {t:'note', title:'Why the closest one is safe (intuition, not a proof)', x:'Say u has the smallest distance of all the vertices outside Y. Any other route to u has to leave Y through some vertex outside Y — and that vertex is already at least as far away as u. Adding more edges (weights ≥ 0) can only make it longer. So u\'s distance cannot improve any more.'},

    {t:'h', x:'The lecturer\'s table method'},
    {t:'src', tags:[['lecture','Lec 9.2 slides 6–7 (handwritten)']]},
    {t:'p', x:'This is how the lecturer solved the example in class, so it is the safest layout for the test:'},
    {t:'ul', x:[
      'One **column** per vertex; one **row** per vertex added to Y (first row = the source).',
      'Each entry is written **distance<sup>predecessor</sup>** — e.g. 7<sup>1</sup> means "distance 7 so far, reached from vertex 1".',
      '**Circle** the smallest entry in each row: that vertex is the next one added to Y, and its row comes next.',
      'Once a vertex is in Y its column shows **—** from then on.',
      'In each new row, only the edges from the vertex just added can change anything; every other entry is copied down.'
    ]},
    {t:'dijtable', preset:'lecture92', caption:'Our typed copy of the lecturer\'s table for the Lec 9.2 example. The small grey sums show each check; a struck-through sum was not shorter, so the old entry stays.'},
    {t:'ol', x:[
      '**Row 1** (source v1): direct edges give 7<sup>1</sup>, 4<sup>1</sup>, 6<sup>1</sup>, 1<sup>1</sup>. Smallest is 1<sup>1</sup> → circle it: v5 joins Y, edge (v1, v5) joins F.',
      '**Row 5:** v5→v4 gives 1 + 1 = 2 < 6, so v4 becomes 2<sup>5</sup>. v2 and v3 have no edge from v5 — copy 7<sup>1</sup> and 4<sup>1</sup> down. Circle 2<sup>5</sup>: v4 joins Y.',
      '**Row 4:** v4→v2 gives 2 + 3 = 5 < 7 → 5<sup>4</sup>. v3 is copied as 4<sup>1</sup>. Circle 4<sup>1</sup>: v3 joins Y.',
      '**Row 3:** v3→v2 gives 4 + 2 = 6, not less than 5 → keep 5<sup>4</sup> (the lecturer wrote "2+4 ✗"). Circle 5<sup>4</sup>: v2 joins Y.',
      '**Row 2:** every column is "—". Y = V, solved.'
    ]},
    {t:'p', x:'**Reading a path back:** follow the superscripts. v2 is 5<sup>4</sup> → came from v4; v4 is 2<sup>5</sup> → from v5; v5 is 1<sup>1</sup> → from v1. So the path is v1 → v5 → v4 → v2, length 5 — the same path the textbook figure on slide 4 highlights.'},
    {t:'graph', preset:'lecture92', final:true, caption:'The finished F: (v1,v5), (v5,v4), (v1,v3), (v4,v2) — the four edges drawn under the lecturer\'s table.'},

    {t:'h', x:'Setting out a test answer'},
    {t:'note', k:'exam', title:'For "Use Dijkstra\'s algorithm … show all steps clearly" (2025 Q4, 4 marks)', x:'Write (1) the table with superscripts and circles, and (2) a final list: each vertex, its shortest distance and its path. There is no official marking scheme in the course files, so give both — the list takes one extra minute and answers the "shortest distance **and path**" wording directly.'},

    {t:'h', x:'Traps'},
    {t:'ul', x:[
      '**Directed edges go one way only.** An edge A→C cannot be used from C to A.',
      '**Never update a vertex that is already in Y** — its column is "—".',
      '**Replace only if strictly shorter.** If the new sum equals the old value, the pseudocode keeps the old one; both are shortest paths.',
      '**Ties:** if two entries share the smallest value, circle either — the course states no tie rule. Say which you took.',
      '**∞ stays ∞** until some edge from Y reaches that vertex.',
      '**The superscript is the previous vertex**, not the source.',
      '**Give the path as well as the distance** when the question asks for it.'
    ]},
    {t:'note', title:'Words you may see elsewhere', x:'<span class="badge noncourse">Not a course term</span> Other books call the update step **relaxation** and say Dijkstra can fail with **negative weights**. The CS214 slides use neither term, and every course example has weights ≥ 0.'},
    {t:'note', title:'How fast is it?', x:'<span class="badge textbook">Textbook, not in the slides</span> The prescribed text (Neapolitan & Naimipour, ch. 4) gives Dijkstra\'s algorithm an every-case time complexity of **Θ(n²)** for n vertices: there are n − 1 rounds, and each round scans the vertices outside Y to find the smallest and then to update them. The slides do not give a complexity; the <a href="#/compare">comparison page</a> puts it next to Prim and Kruskal.'}
  ]
},

/* ================================================================ */
{ id:'dij-vis', group:'Shortest paths', nav:'Step-through', eyebrow:'Dijkstra · interactive',
  title:'Dijkstra step by step',
  lede:'Press Next and watch one decision at a time: the table grows row by row, exactly in the lecturer\'s format.',
  blocks:[
    {t:'p', x:'Start with the lecture example, then the Lab 9 graph. You can pick a different source, edit the edges, or drag vertices to tidy the picture.'},
    {t:'widget', w:'dij-vis', id:'w-dij-vis', title:'Step-through visualiser', preset:'lecture92', kind:'Visualiser',
     doneText:'Stepped through to the end'}
  ]
},

{ id:'dij-diy', group:'Shortest paths', nav:'Do it yourself', eyebrow:'Dijkstra · interactive',
  title:'Do it yourself: choose each step',
  lede:'You make every greedy choice: which vertex joins Y next, and which edge joins F. Each choice is checked and explained.',
  blocks:[
    {t:'p', x:'When you are comfortable, tick **Hide distances** and keep the running values in your head (or on paper), the way you will have to in the test.'},
    {t:'widget', w:'dij-diy', id:'w-dij-diy', title:'Pick the next vertex, then its edge', preset:'lab9', kind:'Do it yourself',
     doneText:'Completed a graph'}
  ]
},

{ id:'dij-table', group:'Shortest paths', nav:'Fill in the table', eyebrow:'Dijkstra · Test 2 Q4 skill',
  title:'Fill in the Dijkstra table',
  lede:'This is the written skill Test 2 Q4 marks: fill each row, circle the minimum, then give every distance and path.',
  blocks:[
    {t:'p', x:'Each row is checked when you press **Check row**; wrong entries get a one-line reason. "Show this row" fills it in if you are stuck (it is counted). For a fresh graph every time, choose one of the random options — they are extra practice, not from the course.'},
    {t:'widget', w:'dij-table', id:'w-dij-table', title:'Lecturer-format table, row by row', preset:'lecture92', kind:'Trace table',
     doneText:'Completed a full table'}
  ]
},

{ id:'dij-quiz', group:'Shortest paths', nav:'Dijkstra quiz', eyebrow:'Dijkstra · check yourself',
  title:'Dijkstra quiz',
  lede:'Twelve quick questions with instant feedback. Your first answer to each is the one that counts for the score.',
  blocks:[
    {t:'quiz', id:'quiz-dij', title:'Dijkstra and SSSP', tag:'extra', items:[
      {q:'What does Dijkstra\'s algorithm compute?',
       opts:['The shortest path from one source vertex to every other vertex', 'The cheapest set of edges connecting all vertices', 'The shortest tour visiting every vertex once', 'The shortest path between every pair of vertices'], a:0,
       why:'Lec 9.2: single-source shortest path. Connecting all vertices cheaply is an MST (Prim/Kruskal); the tour is TSP; all pairs is a different problem (out of scope here).'},
      {q:'Which design approach is Dijkstra\'s algorithm?',
       opts:['Greedy', 'Dynamic programming', 'Divide and conquer', 'Brute force'], a:0,
       why:'Lec 9.2 is titled "Greedy Algorithms: Dijkstra\'s Algorithm": each step makes the locally best choice (the closest vertex) and never undoes it.'},
      {q:'In the lecturer\'s table, what does the entry 7<sup>1</sup> in column 2 mean?',
       opts:['The best distance to vertex 2 found so far is 7, reached from vertex 1', 'Vertex 2 is 7 edges from vertex 1', 'The edge from 2 to 1 has weight 7', 'Vertex 2 was the 7th vertex added to Y'], a:0,
       why:'Distance, with the predecessor as a superscript (Lec 9.2 slide 7).'},
      {q:'The current row reads A 3<sup>W</sup>, B 2<sup>W</sup>, C ∞, D ∞. Which vertex is circled (added to Y) next?',
       opts:['B', 'A', 'C', 'D'], a:0,
       why:'The selection procedure takes the smallest entry among the vertices not in Y: 2 < 3 < ∞.'},
      {q:'B has just joined Y with distance 2. There is an edge B→C of weight 1 and C is currently ∞. What does C\'s entry become?',
       opts:['3<sup>B</sup>', '1<sup>B</sup>', '3<sup>W</sup>', '∞'], a:0,
       why:'2 + 1 = 3, which is shorter than ∞, so C becomes 3 with superscript B (it is reached from B).'},
      {q:'D is currently 9<sup>B</sup>. C joins Y with distance 3, and C→D has weight 2. What is D\'s new entry?',
       opts:['5<sup>C</sup>', '9<sup>B</sup>', '5<sup>B</sup>', '2<sup>C</sup>'], a:0,
       why:'3 + 2 = 5 < 9, so it is replaced, and the superscript changes to C.'},
      {q:'v2 is currently 5<sup>4</sup>. v3 joins Y with distance 4, and v3→v2 has weight 2. What happens?',
       opts:['v2 stays 5<sup>4</sup>, because 4 + 2 = 6 is not shorter', 'v2 becomes 6<sup>3</sup>', 'v2 becomes 2<sup>3</sup>', 'v2 joins Y immediately'], a:0,
       why:'This is the "2+4 ✗" in the lecturer\'s table: only a strictly shorter value replaces the old one.'},
      {q:'Two vertices tie for the smallest entry in a row. What should you do?',
       opts:['Circle either one; the final distances come out the same', 'Always circle the one added to the graph first', 'Circle both in the same row', 'Stop: Dijkstra cannot handle ties'], a:0,
       why:'The course states no tie rule. Either choice is a correct run of the algorithm; the shortest distances do not change (the paths may, if two are equally short).'},
      {q:'When does the algorithm stop (the solution check)?',
       opts:['When Y == V', 'When F has as many edges as the graph', 'When the circled value is 0', 'After exactly n rounds of updates'], a:0,
       why:'Lec 9.2 pseudocode: "if (Y == V) the instance is solved". (If some vertices are unreachable they stay ∞ and can never be added.)'},
      {q:'In a directed graph there is an edge A→C of weight 4. When C joins Y, can you use that edge to update A?',
       opts:['No — it can only be followed from A to C', 'Yes, weights work both ways', 'Only if A is not in Y', 'Only if the weight is below C\'s distance'], a:0,
       why:'Directed edges have a direction; the matrix entry W[C][A] is ∞ unless there is a separate C→A edge.'},
      {q:'According to Lec 9.2, Dijkstra\'s algorithm is similar to which other algorithm?',
       opts:['Prim\'s algorithm', 'Kruskal\'s algorithm', 'Huffman\'s algorithm', 'Mergesort'], a:0,
       why:'Both grow a set Y one vertex at a time from a start vertex. The difference: Prim picks the vertex nearest to Y (one edge weight); Dijkstra picks the one nearest to the source (whole path length).'},
      {q:'<span class="badge textbook">Textbook</span> What every-case time complexity does the prescribed text give for Dijkstra\'s algorithm on n vertices?',
       opts:['Θ(n²)', 'Θ(n)', 'Θ(n log n)', 'Θ(2ⁿ)'], a:0,
       why:'n − 1 rounds, each scanning the vertices outside Y: about n × n. Not stated in the slides — it comes from the textbook.'}
    ]}
  ]
},

/* ================================================================
   STAGE 2 — HUFFMAN
   ================================================================ */
{ id:'huff-problem', group:'Huffman coding', nav:'Huffman: the problem', eyebrow:'Huffman coding · Lec 8.1–8.2',
  title:'Huffman coding: the problem',
  lede:'What we are trying to save, why codes of different lengths help, and the one rule they must obey.',
  blocks:[
    {t:'plain', x:'A file is stored as bits. If every character uses the same number of bits, common characters cost as much as rare ones. Give the **common** characters **short** codes and the rare ones longer codes and the file shrinks — as long as the bits can still be read back without any doubt about where one character ends and the next begins.'},

    {t:'h', x:'Fixed-length vs variable-length codes'},
    {t:'src', tags:[['lecture','Lec 8.1 slides 9–10']]},
    {t:'ul', x:[
      'A **fixed-length code** uses the same number of bits for every character (each character\'s bit string is its **codeword**).',
      'A **variable-length code** uses different numbers of bits for different characters.'
    ]},
    {t:'table', head:['', 'Code', 'File ABABCBBBC encoded', 'Bits'], rows:[
      ['Fixed-length', 'A 00, B 01, C 11', '<span class="mono">000100011101010111</span>', '18'],
      ['Variable-length', 'A 10, B 0, C 11', '<span class="mono">1001001100011</span>', '13']
    ]},
    {t:'p', x:'B is the most common character (5 of 9), so giving it a 1-bit code saves the most. (The slide prints the fixed-length string with one bit missing — see Known problems on the next page.)'},

    {t:'h', x:'Prefix codes: the rule'},
    {t:'src', tags:[['lecture','Lec 8.2 slides 11–13']]},
    {t:'note', k:'def', title:'Definition (Lec 8.2)', x:'In a **prefix code**, "no codeword for one character constitutes the beginning of the codeword for another character" — e.g. if A is 01, no other character may have 011.'},
    {t:'p', x:'**Why it matters.** Suppose A = 0, B = 01, C = 1 (not a prefix code: 0 is the start of 01). The bits <span class="mono">01</span> could be B, or A then C — you cannot tell. With a prefix code there is never a choice: the first codeword that matches is the only one that can.'},
    {t:'p', x:'Every prefix code can be drawn as a binary tree whose **leaves** are the characters: 0 = go left, 1 = go right. Because characters are only at leaves, no code can run on through another one.'},
    {t:'codetree', rows:[['A','10'],['B','0'],['C','11']], caption:'The tree for A = 10, B = 0, C = 11 (Lec 8.2 slide 12). Codes are shown under the leaves.'},
    {t:'ladder', title:'Decoding ("parsing", Lec 8.2 slide 13)', x:[
      ['Start', 'At the root, with the first bit.'],
      ['Walk', 'Go left on 0, right on 1.'],
      ['Leaf', 'When you reach a leaf, write down its character.'],
      ['Repeat', 'Go back to the root and carry on with the next bit.']
    ]},

    {t:'h', x:'What Huffman\'s algorithm gives you'},
    {t:'src', tags:[['lecture','Lec 8.2 slides 14 and 19']]},
    {t:'p', x:'"Huffman developed a **greedy** algorithm that produces an optimal binary character code by constructing a binary tree" — the code it builds gives the fewest total bits of any prefix code for those frequencies.'},
    {t:'p', x:'The slide asks: *"Why not just 3 digits for each character? Try it!"* For the lecture example (6 characters, 85 in total), a 3-bit fixed-length code needs 85 × 3 = **255 bits**; the Huffman code needs **212 bits**.'},

    {t:'mcq', id:'hp-q1', tag:'extra', q:'Which of these is a prefix code?',
      opts:['A 0, B 10, C 11', 'A 0, B 01, C 11', 'A 1, B 10, C 00', 'A 00, B 0, C 11'], a:0,
      why:'Check whether any code is the start of another. In the others: 0 starts 01; 1 starts 10; 0 starts 00. Only A 0, B 10, C 11 is safe.'},
    {t:'mcq', id:'hp-q2', tag:'lecture', q:'With A = 10, B = 0, C = 11 (Lec 8.2 slide 12), what does <span class="mono">10011</span> decode to?',
      opts:['ABC', 'BAC', 'ACB', 'CAB'], a:0,
      why:'10 → A, then 0 → B, then 11 → C. Read from the left and stop as soon as the bits match a codeword.'},
    {t:'mcq', id:'hp-q3', tag:'extra', q:'A file uses 6 different characters. What is the shortest fixed-length code that gives each its own codeword?',
      opts:['3 bits', '2 bits', '6 bits', '8 bits'], a:0,
      why:'2 bits give only 4 different codewords; 3 bits give 8, enough for 6. (That is the "3 digits" on slide 19.)'}
  ]
},

{ id:'huff-algo', group:'Huffman coding', nav:'The algorithm', eyebrow:'Huffman coding · Lec 8.2',
  title:'Huffman\'s algorithm',
  lede:'The plain idea, the slide pseudocode, then every course example worked row by row.',
  blocks:[
    {t:'plain', x:'Keep all the characters in a queue ordered by frequency. Take out the **two rarest**, join them under a new node whose weight is their total, and put that node back. Repeat. When only one tree is left, it is the Huffman tree — rare characters end up deep (long codes), common ones near the top (short codes).'},
    {t:'ladder', title:'In simple steps', x:[
      ['Start', 'One node per character, holding its frequency. Put them all in a priority queue: the **lowest** frequency has the **highest** priority.'],
      ['Remove two', 'Remove the lowest (call it p), then the next lowest (q).'],
      ['Join', 'Make a new node r with p on the **left**, q on the **right**, and frequency p + q. Insert r into the queue.'],
      ['Repeat', 'n − 1 times in total, for n characters.'],
      ['Read the codes', 'The last node is the root. Each character\'s code is its path from the root: left = 0, right = 1.']
    ]},

    {t:'h', x:'The formal version'},
    {t:'src', tags:[['lecture','Lec 8.2 slides 15–16']]},
    {t:'code', title:'Huffman\'s algorithm — as on the slide', x:
'n = number of characters in the file;\nArrange n pointers to nodetype records in a priority queue PQ as follows:\nFor each pointer p in PQ\n    p->symbol = a distinct character in the file;\n    p->frequency = the frequency of that character in the file;\n    p->left = p->right = NULL;\n\nfor (i = 1; i <= n-1; i++){   // There is no solution check; rather,\n    remove(PQ, p);            // solution is obtained when i = n − 1.\n    remove(PQ, q);            // Selection procedure.\n    r = new nodetype;         // There is no feasibility check.\n    r->left = p;\n    r->right = q;\n    r->frequency = p->frequency + q->frequency;\n    insert(PQ, r);\n}\nremove(PQ, r);\nreturn r;'},
    {t:'ul', x:[
      '**Priority queue** (slide 15): "the element with the highest priority is the character with the lowest frequency". It "can be implemented as a linked list, but more efficiently as a **heap**".',
      '**Left and right:** `r->left = p` and p is removed first, so the **smaller** node goes on the left (0). Every course example — the lecture tree and all three lab photos — follows this. We call it the course convention.',
      '**Ties:** the course states no tie rule for equal frequencies. Any choice gives an optimal code (the same total bits), but the codewords can differ — so in a test, say which you took.'
    ]},
    {t:'h3', x:'Why it is a greedy algorithm'},
    {t:'src', tags:[['lecture','Lec 8.1 slide 4 + the comments on slide 16']]},
    {t:'table', head:['Greedy step (Lec 8.1)', 'In Huffman\'s algorithm (slide 16 comments)'], rows:[
      ['Selection procedure', 'Remove the two nodes with the lowest frequencies — the locally best choice'],
      ['Feasibility check', '"There is no feasibility check" — any two nodes can be joined'],
      ['Solution check', '"There is no solution check; rather, solution is obtained when i = n − 1"']
    ]},
    {t:'note', title:'How fast is it?', x:'<span class="badge textbook">Textbook, not in the slides</span> With the priority queue as a heap, the prescribed text gives **Θ(n lg n)**: n − 1 rounds, each doing a few heap operations of Θ(lg n).'},

    {t:'h', x:'Known problems in the course material'},
    {t:'note', k:'trap problems', title:'Known problems in the course material', x:
'<ol>' +
'<li><b>Lecture 8.2 slide 15: A = 15 or 16?</b> The frequency table says A = 15, but the tree (slide 18) and the final code table (slide 19) use <b>a = 16</b>, taken from the textbook figure. This site uses <b>16</b>. With 15 the slide\'s answer is still optimal, but step 2 becomes a tie between A:15 and the (B,E) node:15. Only taking the (B,E) node gives slide 19\'s codes; taking A gives A 111, B 000, E 001 instead. Both come to 210 bits. With 16 there are no ties and the answer is 212 bits. (The step-through has both versions.)</li>' +
'<li><b>ISSUE WITH TISSUE photo: T is wrong.</b> The code table writes <b>T = 000</b>, but the photo\'s own tree puts T at root → left → right → left = <b>010</b>. And with I = 00, the code 000 would <i>start with</i> I\'s code, so the table as written is not a prefix code: a decoder would read 00 as I and never reach T. The photo\'s bit string appears to use 000 for T as well. The <b>40-bit total is still right</b>, because 000 and 010 are both 3 bits. Corrected codes: I 00, T 010, U 011, E 100, H 1010, W 1011, S 11.</li>' +
'<li><b>"% compression" in all three photos.</b> The photos write 40/120 = 33.33% as "% compression". That number is the <b>compressed size</b> — the file is still 33.33% of its original size. The <b>space saved</b> is 100 − 33.33 = <b>66.67%</b>. Same for COMMITTEE (31.9% of the size, 68.1% saved) and MISSISSIPPI (23.9% of the size, 76.1% saved). This site names both numbers every time.</li>' +
'<li><b>Lecture 8.1 slide 9: one bit missing.</b> ABABCBBBC with A 00, B 01, C 11 is printed as <span class="mono">00010001110101011</span> (17 bits). Nine characters × 2 bits = 18: the correct string is <span class="mono">000100011101010111</span>. The variable-length version on slide 10 (13 bits) is right.</li>' +
'</ol>'},

    {t:'h', x:'Worked examples'},
    {t:'p', x:'There are no official solutions for these beyond the lecture slides and the handwritten lab photos, so each one below is **my working**, checked against the photo where there is one. The table shows the queue before each step; the first node removed goes left.'},
    {t:'huffwork', set:'lecture', open:true, title:'Lecture 8.2 example (A = 16)', badge:'My working · Lecture',
     notes:[{title:'Check against the slides', x:'Same tree as slide 18 and the same codes as slide 19: A 00, D 01, F 10, C 110, B 1110, E 1111. With a 3-bit fixed-length code it would be 255 bits; Huffman needs 212.'}]},
    {t:'huffwork', set:'tissue', title:'ISSUE WITH TISSUE (spaces ignored)', badge:'My working · Lab photo',
     notes:[{k:'trap', title:'Correction to the photo', x:'The photo\'s table says T = 000; its tree (and this one) gives **T = 010**. Everything else matches the photo, including the 40-bit total. The photo\'s "33.33% compression" is the **compressed size**; the space saved is **66.67%**.'},
            {title:'The photo\'s tie choices', x:'Every step except the last involves a tie. The photo puts H left of W, joins T+U (E and the HW node were also 2), joins I with the TU node (over S:4 and the EHW node:4), and puts the EHW node on the left of S. Other choices give different codewords but the same 40 bits.'}]},
    {t:'huffwork', set:'committee', title:'COMMITTEE', badge:'My working · Lab photo',
     notes:[{title:'Matches the photo', x:'Codes T 00, E 01, M 10, I 110, C 1110, O 1111 and 23 bits, as in the photo. The photo\'s 72/23 = 3.13 : 1 is right. Its "Compression % = 31.9%" is the **compressed size** (23 ÷ 72); the space saved is **68.1%**. Steps 1–3 are ties: the photo joins C with O (I was also 1), then I with the CO node (M, T and E were also 2), then T with E (M was also 2).'}]},
    {t:'huffwork', set:'mississippi', title:'MISSISSIPPI', badge:'My working · Lab photo',
     notes:[{title:'Matches the photo', x:'Codes S 0, I 11, M 100, P 101 and 21 bits, as in the photo; 88/21 = 4.19 : 1. Its "% compression = 23.8%" is the **compressed size** (21 ÷ 88 = 23.86%); the space saved is **76.1%**. Step 2 is a tie between I:4 and S:4 — the photo takes I. The reverse-mode page shows why that tie matters.'}]},
    {t:'huffwork', set:'lab8', title:'Lab 8 activity 1 (A 10, B 8, D 18, H 9, I 5, K 3, P 1)', badge:'My working · Lab',
     notes:[{title:'No posted solution', x:'Step 3 is a tie between H:9 and the (P,K,I) node:9. Taking H (older first, shown here) or the merged node gives different codes but the same **138 bits** either way — try both tie rules in the step-through.'}]},

    {t:'mcq', id:'ha-q1', tag:'lecture', q:'In the slide pseudocode, <code>r->left = p</code>. Which node is p?',
      opts:['The first node removed — the one with the lowest frequency', 'The node with the higher frequency', 'Always an original character, never a merged node', 'The root of the tree'], a:0,
      why:'p is removed from the priority queue first, and the queue gives the lowest frequency first. So the smaller node goes on the left (0).'},
    {t:'mcq', id:'ha-q2', tag:'lecture', q:'How many times does the merge loop run for a file with 7 different characters?',
      opts:['6', '7', '3', '14'], a:0,
      why:'`for (i = 1; i <= n-1; i++)` — n − 1 = 6. Each merge turns two trees into one, and 7 trees need 6 joins to become one.'},
    {t:'mcq', id:'ha-q3', tag:'lecture', q:'According to the comments on the slide pseudocode, which greedy step does Huffman\'s algorithm NOT have?',
      opts:['A feasibility check (it has no solution check either)', 'A selection procedure', 'A priority queue', 'An insert step'], a:0,
      why:'Slide 16: "There is no feasibility check" and "There is no solution check; rather, solution is obtained when i = n − 1". Removing the two lowest is the selection procedure.'}
  ]
},

{ id:'huff-vis', group:'Huffman coding', nav:'Step-through', eyebrow:'Huffman · interactive',
  title:'Huffman step by step',
  lede:'Watch the priority queue and the trees after every merge, then read off the code table.',
  blocks:[
    {t:'p', x:'Try the lecture example with **A = 15** (as printed) under both tie rules to see the tie at step 2. You can also change the left/right convention, type your own frequencies, or count the letters of any word.'},
    {t:'widget', w:'huff-vis', id:'w-huff-vis', title:'Step-through visualiser', preset:'lecture', kind:'Visualiser', doneText:'Stepped through to the end'}
  ]
},

{ id:'huff-diy', group:'Huffman coding', nav:'Do it yourself', eyebrow:'Huffman · interactive',
  title:'Do it yourself: build the tree, write the codes',
  lede:'First you choose the two nodes at every step; then you write the codes from a finished tree.',
  blocks:[
    {t:'p', x:'The nodes are listed in the order they were made, **not** sorted, so you have to find the smallest yourself — as on paper. Tap the smaller one first: it becomes the left child.'},
    {t:'widget', w:'huff-diy', id:'w-huff-diy', title:'Pick the two smallest, then write the codes', preset:'lecture', kind:'Do it yourself', doneText:'Built a tree'},
    {t:'h', x:'Write the codes from a finished tree'},
    {t:'p', x:'Here the tree is already built. Follow each path from the root: left = 0, right = 1. The ISSUE WITH TISSUE tree is the one in the posted photo — check what you get for T.'},
    {t:'widget', w:'huff-codes', id:'w-huff-codes', title:'Codes from the tree', preset:'tissue', kind:'Codes', doneText:'All codes right'}
  ]
},

{ id:'huff-encode', group:'Huffman coding', nav:'Encode & decode', eyebrow:'Huffman · drill',
  title:'Encode, decode, count the bits',
  lede:'The three things the lab solutions do with a finished code — and the sizes, named properly.',
  blocks:[
    {t:'h', x:'Three size measures (keep them apart)'},
    {t:'table', head:['Measure', 'Formula', 'ISSUE WITH TISSUE'], rows:[
      ['**Compressed size**, as % of the original', 'encoded bits ÷ original bits × 100', '40 ÷ 120 = **33.33%**'],
      ['**Space saved**', '100% − compressed size', '100 − 33.33 = **66.67%**'],
      ['**Compression ratio**', 'original bits : encoded bits', '120 : 40 = **3 : 1**']
    ]},
    {t:'note', k:'trap', title:'Watch the wording', x:'The lab photos call the 33.33% "% compression". It is really the size that is **left** (the file is a third of its old size), not the amount removed. Write "compressed size = 33.33% of the original, so 66.67% saved" and nobody can misread you.'},
    {t:'p', x:'Like the photos, the original size counts **8 bits per character** (a standard byte per character). The encoded size is Σ frequency × code length.'},
    {t:'widget', w:'huff-encode', id:'w-huff-encode', title:'Encode, decode and size drill', preset:'tissue', kind:'Drill', doneText:'All three parts right'},
    {t:'mcq', id:'he-q1', tag:'lab', q:'MISSISSIPPI: 11 characters × 8 = 88 bits originally, 21 bits with the Huffman code. What is the space saved?',
      opts:['About 76.1%', 'About 23.9%', '4.19%', '67%'], a:0,
      why:'Compressed size = 21 ÷ 88 = 23.86% of the original, so the space saved is 100 − 23.86 = 76.14%. (The photo\'s "23.8%" is the compressed size.) The compression ratio is 88 : 21 ≈ 4.19 : 1.'}
  ]
},

{ id:'huff-reverse', group:'Huffman coding', nav:'Reverse (Q1 style)', eyebrow:'Huffman · Test 2 Q1 skill',
  title:'Reverse mode: from a code table back to the tree',
  lede:'Test 2 (2025) Q1 gave the codes and asked for the tree and the possible frequencies of one character. This is how to do it.',
  blocks:[
    {t:'ladder', title:'The method', x:[
      ['Draw the tree', 'Each code is a path from the root (0 = left, 1 = right). Put each character at the end of its path.'],
      ['Weigh the nodes', 'Each internal node = the sum of its two children. Nodes above the unknown are written like X + 22.'],
      ['List the merges', 'Huffman builds from the bottom, so the deepest join happened first. Write the merges in order.'],
      ['One condition per merge', 'At each merge, the two nodes joined must be the two smallest in the queue at that moment. Each merge gives an inequality for the unknown.'],
      ['Left or right', 'Under the course convention the left child is the smaller one — one more inequality.'],
      ['Combine', 'Put the inequalities together, and say which convention you assumed.']
    ]},
    {t:'note', k:'exam', title:'On the test', x:'**Write down the convention you assumed** (e.g. "smaller weight on the left, as in the lecture; ties may go either way") before you give the range. The paper only says "0 = left branch, 1 = right branch"; it does not say which child is the smaller one.'},
    {t:'widget', w:'huff-reverse', id:'w-huff-reverse', title:'Rebuild the tree, then find the range', preset:'t2025', kind:'Reverse mode', doneText:'Range found'},
    {t:'mcq', id:'hr-q1', tag:'past', q:'In Test 2 (2025) Q1, P = 00 and R = 01, each with frequency 15. What is the weight of the root\'s left child?',
      opts:['30', '15', '52', 'X + 22'], a:0,
      why:'Both codes start with 0, so P and R are the two children of the root\'s left child: 15 + 15 = 30.'}
  ]
},

{ id:'huff-quiz', group:'Huffman coding', nav:'Huffman quiz', eyebrow:'Huffman · check yourself',
  title:'Huffman quiz',
  lede:'Fifteen questions. Each is labelled: from the lecture, a lab, the 2025 paper, the textbook, or written for this site (extra practice). Your first answer counts.',
  blocks:[
    {t:'quiz', id:'quiz-huff', title:'Huffman coding', tag:'extra', items:[
      {tag:'lecture', q:'In the priority queue used by Huffman\'s algorithm, which element has the highest priority?',
       opts:['The one with the lowest frequency', 'The one with the highest frequency', 'The one added most recently', 'The one with the shortest code'], a:0,
       why:'Lec 8.2 slide 15: "the element with the highest priority is the character with the lowest frequency".'},
      {tag:'lecture', q:'Which design approach is Huffman\'s algorithm?',
       opts:['Greedy', 'Dynamic programming', 'Divide and conquer', 'Brute force'], a:0,
       why:'Lec 8.2 slide 14: "Huffman developed a greedy algorithm…". Each step takes the locally best choice — the two lowest frequencies — and never undoes it.'},
      {tag:'lecture', q:'In the slide pseudocode, which node goes on the left of the new node r?',
       opts:['p, the first node removed (the smaller)', 'q, the second node removed', 'Whichever is a leaf', 'Whichever has the longer code'], a:0,
       why:'`r->left = p`, and p is removed first — so smaller on the left (bit 0).'},
      {tag:'extra', q:'A file has 7 different characters. How many internal (non-leaf) nodes does its Huffman tree have?',
       opts:['6', '7', '8', '13'], a:0,
       why:'One new node per merge, and there are n − 1 = 6 merges.'},
      {tag:'lecture', q:'Which of these is NOT a prefix code?',
       opts:['A 0, B 01, C 11', 'A 10, B 0, C 11', 'A 00, B 01, C 1', 'A 1, B 01, C 00'], a:0,
       why:'A = 0 is the beginning of B = 01, so "01" could be B or A followed by something else.'},
      {tag:'lab', q:'The ISSUE WITH TISSUE tree has I = 00 and U = 011. T sits at root → left → right → left. What is T\'s code?',
       opts:['010', '000', '001', '0100'], a:0,
       why:'left 0, right 1, left 0 → 010. The photo\'s table says 000, which clashes with I = 00 (see Known problems).'},
      {tag:'lab', q:'With the MISSISSIPPI code S 0, I 11, M 100, P 101, what does <span class="mono">100110</span> decode to?',
       opts:['MIS', 'MSI', 'PIS', 'MISS'], a:0,
       why:'100 → M, 11 → I, 0 → S.'},
      {tag:'lab', q:'The ISSUE WITH TISSUE photo gives "% compression = 33.33%" (40 of 120 bits). What does 33.33% actually measure?',
       opts:['The compressed size — the file is still 33.33% of its original size', 'The space saved', 'The compression ratio', 'The share of characters with short codes'], a:0,
       why:'40 ÷ 120 = 33.33% is what remains. The space saved is 66.67%; the compression ratio is 3 : 1.'},
      {tag:'lab', q:'COMMITTEE: 9 characters at 8 bits each, 23 bits with the Huffman code. Which is the compression ratio?',
       opts:['3.13 : 1', '31.9 : 1', '1 : 3.13', '68.1 : 1'], a:0,
       why:'Original ÷ encoded = 72 ÷ 23 ≈ 3.13, written 3.13 : 1. (31.9% is the compressed size; 68.1% is the space saved.)'},
      {tag:'past', q:'Test 2 (2025) Q1: B 3, A 4, F 6, H 9, P 15, R 15 and X unknown, with codes B 11110, A 11111, F 1110, H 110, X 10, P 00, R 01. Under the course convention (smaller on the left), what are the possible values of X?',
       opts:['15 to 22', '16 to 21', '15 to 30', '13 to 22'], a:0,
       why:'P and R must be joined before X is used (X ≥ 15), X must join the 22 node before the 30 node is used (X ≤ 30), and X is the left child of the 22 node (X ≤ 22). 16–21 is the strict (no-ties) reading; 15–30 ignores left/right.'},
      {tag:'past', q:'In that same question, why is X ≥ 15 needed?',
       opts:['P and R (15 each) must be merged before X is, so X cannot be smaller than them', 'Because X must be larger than H + F', 'Because X is on the right', 'Because the root is 52'], a:0,
       why:'P and R are joined directly (codes 00 and 01). If X were below 15, X would be one of the two smallest and would be joined instead.'},
      {tag:'extra', q:'Two nodes tie for the lowest frequency. What happens to the total number of bits depending on which one you take?',
       opts:['Nothing — every tie choice gives the same (optimal) total', 'It can get larger', 'It can get smaller', 'The algorithm fails'], a:0,
       why:'Any tie choice still gives an optimal prefix code. The codewords can differ (e.g. the lecture example with A = 15), but the total is the same — 210 bits either way.'},
      {tag:'lecture', q:'Slide 19 asks "Why not just 3 digits for each character?" For the lecture example (85 characters), how many bits does a 3-bit fixed-length code need, compared with Huffman\'s 212?',
       opts:['255', '212', '170', '510'], a:0,
       why:'85 × 3 = 255 bits. Huffman saves 43 bits here.'},
      {tag:'extra', q:'Where are the characters in a Huffman tree, and why does that matter?',
       opts:['Only at the leaves — so no code can be the start of another', 'At every node', 'Only on the left side', 'At the root and the leaves'], a:0,
       why:'A code is a path from the root to a leaf. If a character sat on an internal node, its code would be the beginning of the codes below it.'},
      {tag:'textbook', q:'What time complexity does the prescribed text give Huffman\'s algorithm when the priority queue is a heap?',
       opts:['Θ(n lg n)', 'Θ(n²)', 'Θ(n)', 'Θ(2ⁿ)'], a:0,
       why:'n − 1 rounds of heap operations, each Θ(lg n). Not in the slides — the slides only say a heap is "more efficient" than a linked list.'}
    ]}
  ]
},

/* ================================================================
   STAGE 3 — DESIGN APPROACHES (Q2), MST LESSONS, COMPARISON (Q3), MOCK
   ================================================================ */
{ id:'design', group:'Design approaches', nav:'The four approaches', eyebrow:'Design approaches · Lec 4.1, 6.1, 7.1, 8.1, 10.1',
  title:'Algorithm design approaches',
  lede:'Test 2 Q2 asks you to pick an approach and justify it. That means knowing what each one looks like — and how to tell them apart.',
  blocks:[
    {t:'plain', x:'There are four ways to attack a problem in this course:<ul><li><b>Brute force</b> — try everything, keep the best.</li><li><b>Divide and conquer</b> — cut the problem into smaller copies that don\'t overlap, solve those, stitch the answers together.</li><li><b>Dynamic programming</b> — the smaller copies <i>do</i> overlap, so solve the small ones first, write them in a table, and look them up.</li><li><b>Greedy</b> — build the answer one step at a time, always taking what looks best right now, and never going back.</li></ul>'},
    {t:'src', tags:[['lecture','Lec 7.1 slide 3']], x:' "So far we have seen various kinds of algorithm design approaches. No design is perfect and they come with their pros and cons."'},

    {t:'h', x:'The course definitions'},
    {t:'note', k:'def', title:'Brute force (named in Lec 6.2 and 7.1)', x:'Try every candidate solution and keep the best — the slides only name it (e.g. "factorial time").'},
    {t:'note', k:'def', title:'Divide and conquer (Lec 4.1)', x:'A <b>top-down</b> approach: "divides an instance of a problem into two or more smaller instances", until they are small enough to solve directly. Steps: <b>1 Divide</b> into one or more smaller instances; <b>2 Conquer</b> each by recursion; <b>3 Combine</b> the solutions, if needed. Examples: binary search (one smaller instance, no combine), mergesort, quicksort.'},
    {t:'note', k:'def', title:'Dynamic programming (Lec 6.1)', x:'"Similar to the divide-and-conquer approach in that an instance of a problem is divided into smaller instances" — but "we solve the small instances first, store the results, and look them up when we need them instead of recomputing them". A <b>bottom-up</b> approach, in two steps: establish the <b>recursive property</b>; then solve an instance bottom-up, smallest first. Example: the binomial coefficient array B. For optimisation problems the <b>principle of optimality</b> must apply.'},
    {t:'note', k:'def', title:'Greedy (Lec 8.1)', x:'"Arrives at the solution by making a sequence of decisions, each of which simply looks like the best decision at that moment" — the locally optimal choice, "hoping to arrive at a globally optimal solution". It "may not always be the optimal". Each iteration: <b>selection procedure</b>, <b>feasibility check</b>, <b>solution check</b>. Examples: coin change, Huffman, Prim, Kruskal, Dijkstra.'},
    {t:'note', title:'The key warning (Lec 6.1 slide 5)', x:'"It is always inefficient when an instance is divided into almost as large as original instance using D&C approach" — when the smaller instances overlap (Fibonacci, binomial coefficient), use dynamic programming instead.'},

    {t:'h', x:'How to tell them apart'},
    {t:'table', head:['Ask…', 'Divide and conquer', 'Dynamic programming', 'Greedy'], rows:[
      ['**One subproblem or many?**', 'One or more, usually a **fraction** of the size (n/2)', 'Many, often **almost as large** (n − 1, n − 2)', 'None — make one choice, then carry on with what is left'],
      ['**Do the subproblems overlap?**', 'No — each piece is separate', '**Yes** — the same small instance is needed again and again', '—'],
      ['**Are results combined?**', 'Yes (merge) — or not needed at all (binary search)', 'Bigger answers are built from stored smaller ones', 'No — the choices made <i>are</i> the answer'],
      ['**Is each choice final (irrevocable)?**', 'No choice is made', 'No — it compares every option (max/min over cases)', '**Yes** — a choice is never undone'],
      ['**Is there a table?**', 'No (just recursion)', '**Yes** — filled bottom-up', 'No (maybe a sorted list or priority queue)'],
      ['**Direction**', 'Top-down', 'Bottom-up', 'Step by step forwards']
    ]},
    {t:'ul', x:[
      '**A formula with n/2 (or n/3) and no overlap** → divide and conquer. 2025 Q2a, f(n) = f(n/2) + (n − 1), is this.',
      '**A formula with n − 1 and n − 2, where the same values come back** → dynamic programming (Fibonacci, binomial coefficient).',
      '**"Take the best of every option", using answers for smaller cases** → dynamic programming.',
      '**"Always take the cheapest / smallest / largest now, and keep it"** → greedy. 2025 Q2b (Prim\'s algorithm in words) is this.'
    ]},
    {t:'note', k:'exam', title:'Getting both marks', x:'Each part of Q2 is 2 marks. Name the approach, then justify it from <b>features of the given formula or strategy</b> ("one half-size sub-instance, no overlap", "the cheapest edge is chosen and never undone") — not just a definition. Saying why the other approaches do not fit makes the justification solid.'},

    {t:'mcq', id:'da-q1', tag:'extra', q:'Which feature most clearly says "use dynamic programming, not divide and conquer"?',
      opts:['The smaller instances overlap — the same ones would be solved again and again', 'The instance is split into halves', 'Each step takes the best choice available', 'The answer is found without recursion'], a:0,
      why:'Both split into smaller instances; DP is for when they overlap, so storing them pays off (Lec 6.1).'},
    {t:'mcq', id:'da-q2', tag:'lecture', q:'According to Lec 8.1, what does a greedy algorithm never do?',
      opts:['Go back and change a choice it has already made', 'Make a locally optimal choice', 'Use a feasibility check', 'Solve optimisation problems'], a:0,
      why:'Each decision "simply looks like the best decision at that moment" and is kept. That is why it can miss the optimum (16c with 12, 10, 5, 1).'}
  ]
},

{ id:'rec-drill', group:'Design approaches', nav:'Formula drill (Q2a)', eyebrow:'Design approaches · Test 2 Q2a skill',
  title:'Which approach does this formula describe?',
  lede:'Pick the approach, write a one- or two-sentence justification, then compare with the model answer and mark yourself.',
  blocks:[
    {t:'p', x:'The first one is the real 2025 question. The rest come from the course\'s own examples (labelled with the lecture) or are extra practice. Your answers and marks are saved.'},
    {t:'writtenset', bank:'rec'}
  ]
},

{ id:'strat-drill', group:'Design approaches', nav:'Strategy drill (Q2b)', eyebrow:'Design approaches · Test 2 Q2b skill',
  title:'Which approach is this strategy?',
  lede:'A strategy described in words, as in 2025 Q2b. Name the approach — and the algorithm, if it is one from the course.',
  blocks:[
    {t:'writtenset', bank:'strat'}
  ]
},

{ id:'greedy-dp', group:'Design approaches', nav:'Greedy vs DP', eyebrow:'Design approaches · Lec 8.1, 10.1',
  title:'Greedy vs dynamic programming',
  lede:'Both solve optimisation problems. Greedy is simpler and faster; DP is guaranteed to be optimal when the principle of optimality applies.',
  blocks:[
    {t:'src', tags:[['lecture','Lec 10.1 slide 2'], ['lecture','Lec 8.1 slides 3–6']]},
    {t:'ul', x:[
      '"The greedy approach and dynamic programming are two ways to solve **optimization problems**."',
      '"When a greedy approach solves a problem, the result may be simpler. However, it can be difficult to determine whether a greedy algorithm always produces an optimal solution."',
      'DP relies on the **principle of optimality**: "an optimal solution to an instance of a problem always contains optimal solutions to all sub-instances" (Lec 6.1/6.2).'
    ]},
    {t:'h', x:'The coin example (Lec 8.1)'},
    {t:'table', head:['Coins', 'Change for', 'Greedy (largest first)', 'Optimal'], rows:[
      ['50c, 20c, 10c, 5c, 2c, 1c', '75c', '50 + 20 + 5 — 3 coins', '3 coins — greedy is optimal'],
      ['12c, 10c, 5c, 1c', '16c', '12 + 1 + 1 + 1 + 1 — **5 coins**', '10 + 5 + 1 — **3 coins**']
    ]},
    {t:'p', x:'With 12c available, "take the largest coin" looks best at the first step, but it leaves 4c, which can only be paid in 1c coins. Greedy never goes back, so it cannot recover. DP tries every coin for every smaller amount and keeps the best, so it finds 10 + 5 + 1.'},
    {t:'widget', w:'coins', id:'w-coins', title:'Greedy vs DP on coins', kind:'Try it', doneText:'Tried it'},
    {t:'table', head:['', 'Greedy', 'Dynamic programming'], rows:[
      ['How it works', 'One sequence of locally best choices', 'Solves every smaller instance, stores it, builds up'],
      ['Optimal?', 'Only for some problems (Huffman, Prim, Kruskal, Dijkstra; coins with "nice" values)', 'Yes, whenever the principle of optimality applies'],
      ['Cost', 'Usually faster and simpler', 'More work and memory (the table)'],
      ['Course examples in this test', 'Coin change, Huffman, Prim, Kruskal, Dijkstra', 'Binomial coefficient (the other DP examples — Floyd, TSP, knapsack — are out of scope)']
    ]},
    {t:'mcq', id:'gd-q1', tag:'lecture', q:'With coins 12c, 10c, 5c and 1c, how many coins does the greedy rule use for 16c, and what is the optimum?',
      opts:['Greedy 5 (12+1+1+1+1); optimum 3 (10+5+1)', 'Greedy 3; optimum 3', 'Greedy 4 (12+4×1); optimum 2', 'Greedy 5; optimum 2 (12+4)'], a:0,
      why:'Lec 8.1 example 2. There is no 4c coin, so 12 + 4 is impossible.'},
    {t:'mcq', id:'gd-q2', tag:'lecture', q:'Why might you still choose a greedy algorithm over DP?',
      opts:['It is usually simpler and faster — when it is known to be optimal for the problem', 'It always gives the optimal answer', 'It uses a bigger table', 'It works bottom-up'], a:0,
      why:'Lec 10.1: the greedy result "may be simpler", but you have to be sure it is optimal for that problem.'}
  ]
},

{ id:'mst', group:'Minimum spanning trees', nav:'Spanning trees & MST', eyebrow:'Greedy algorithms · Lec 9.1',
  title:'Spanning trees and minimum spanning trees',
  lede:'What Prim and Kruskal produce, on the Lec 9.1 example graph.',
  blocks:[
    {t:'plain', x:'You want to connect every place using as little road as possible. You need enough roads that everything is connected, but no loops — a loop means at least one road is wasted. The cheapest such network is a <b>minimum spanning tree</b>.'},
    {t:'src', tags:[['lecture','Lec 9.1 slides 2–4']]},
    {t:'ul', x:[
      'A **tree** is "an acyclic, connected, undirected graph".',
      'A **spanning tree** is "a connected subgraph that contains all the vertices of the given graph and is a tree". With n vertices it has **n − 1 edges**.',
      'A **minimum spanning tree** is a spanning tree "with minimum weight". A graph can have many spanning trees and sometimes more than one MST, but they all have the same minimum weight.',
      'The input is an **undirected, weighted, connected** graph. Applications in the slides: Google Maps, telecommunication networks, operations research.'
    ]},
    {t:'graph', preset:'lecture91', caption:'The Lec 9.1 example graph (5 vertices, 7 edges).'},
    {t:'graph', preset:'lecture91', tree:[['v1','v2'],['v2','v3'],['v2','v4'],['v4','v5']], caption:'A spanning tree (Lec 9.1 figure c): all 5 vertices, 4 edges, no cycle — total weight 1 + 3 + 6 + 5 = 15.'},
    {t:'graph', preset:'lecture91', mst:'kruskal', caption:'A minimum spanning tree (figure d): (v1,v2), (v3,v5), (v1,v3), (v3,v4) — total weight 1 + 2 + 3 + 4 = 10.'},
    {t:'h', x:'Both algorithms are greedy'},
    {t:'table', head:['Greedy step (Lec 8.1)', 'Kruskal', 'Prim'], rows:[
      ['Selection procedure', 'The next edge in nondecreasing weight order', 'The vertex in V − Y nearest to Y'],
      ['Feasibility check', 'The edge must join two different (disjoint) subsets — otherwise it makes a cycle', 'Combined with selection: the edge must go from Y to V − Y'],
      ['Solution check', 'All subsets merged into one', 'Y == V']
    ]},
    {t:'mcq', id:'mst-q1', tag:'extra', q:'How many edges does a spanning tree of a graph with 7 vertices have?',
      opts:['6', '7', '8', 'It depends on the weights'], a:0,
      why:'Any spanning tree has n − 1 edges: fewer cannot connect all vertices, more would create a cycle.'},
    {t:'mcq', id:'mst-q2', tag:'lecture', q:'Which graphs do Prim and Kruskal work on (Lec 9.1)?',
      opts:['Undirected, weighted, connected graphs', 'Directed graphs with a source vertex', 'Any graph, including disconnected ones', 'Only trees'], a:0,
      why:'"The problem of finding the minimum spanning tree in an undirected, weighted, connected graph…" (slide 3).'}
  ]
},

{ id:'kruskal', group:'Minimum spanning trees', nav:'Kruskal\'s algorithm', eyebrow:'Greedy algorithms · Lec 9.1',
  title:'Kruskal\'s algorithm',
  lede:'Cheapest edges first, skipping any that would close a loop.',
  blocks:[
    {t:'plain', x:'Sort all the edges from cheapest to dearest. Go down the list: keep an edge if it joins two parts that are not yet connected, and skip it if its two ends are already connected (it would make a loop). Stop when everything is one connected piece.'},
    {t:'src', tags:[['lecture','Lec 9.1 slides 9–11']]},
    {t:'code', title:'Kruskal\'s algorithm — as on the slide', x:
'F = ∅;                                        // Initialize set of edges to empty.\ncreate disjoint subsets of V, one for each\nvertex and containing only that vertex;\nsort the edges in E in nondecreasing order;\nwhile (the instance is not solved){\n    select next edge;                          // selection procedure\n    if (the edge connects two vertices in      // feasibility check\n            disjoint subsets){\n        merge the subsets;\n        add the edge to F;\n    }\n    if (all the subsets are merged)            // solution check\n        the instance is solved;\n}'},
    {t:'p', x:'The **disjoint subsets** are how Kruskal spots a cycle: each subset is a group of vertices already connected by F. An edge inside one subset would close a loop; an edge between two subsets joins them — so merge the subsets.'},
    {t:'h', x:'The Lec 9.1 example, step by step'},
    {t:'kruskaltable', preset:'lecture91'},
    {t:'graph', preset:'lecture91', mst:'kruskal', caption:'F = {(v1,v2), (v3,v5), (v1,v3), (v3,v4)}, total 10. The edges (v4,v5) and (v2,v4) are never looked at: after 4 edges all subsets are merged.'},
    {t:'note', k:'trap', title:'The tie at weight 3', x:'(v1,v3) and (v2,v3) both weigh 3. The slide takes (v1,v3) first (its sorted list has hand-written corrections at exactly this point), so (v2,v3) is then skipped. Taking (v2,v3) first is just as correct: you get the other MST, {(v1,v2), (v3,v5), (v2,v3), (v3,v4)}, also total 10. <b>The course states no tie rule</b> — in a test, list your sorted edges so the marker can see which order you used.'},
    {t:'h', x:'Answer format: "list the sequence of vertices and edges added" (Lab 9)'},
    {t:'p', x:'Lab 9 asks exactly this for its 7-vertex graph. There is no posted solution — this is my working, in a format that answers the question directly:'},
    {t:'graph', preset:'lab9', mst:'kruskal', caption:'The Lab 9 graph with Kruskal\'s MST highlighted.'},
    {t:'labformat', preset:'lab9', which:'kruskal', title:'Lab 9, Kruskal (my working)'},
    {t:'p', x:'Practise it: the <a href="#/kr-vis">Kruskal step-through</a>, <a href="#/kr-diy">do it yourself</a>, and the <a href="#/mst-lab">Lab 9 answer format</a> checker.'},
    {t:'note', title:'How fast is it?', x:'<span class="badge textbook">Textbook, not in the slides</span> Θ(m lg m) in the worst case for m edges, because sorting the edges dominates. Good for <b>sparse</b> graphs (few edges).'},
    {t:'mcq', id:'kr-q1', tag:'lecture', q:'In the Lec 9.1 example (with the slide\'s order), which edge does Kruskal skip, and why?',
      opts:['(v2,v3) — v2 and v3 are already in the same subset, so it would make a cycle', '(v3,v4) — it is too heavy', '(v1,v2) — it is the first edge', '(v3,v5) — v5 is a leaf'], a:0,
      why:'After (v1,v2), (v3,v5) and (v1,v3), the subset {v1, v2, v3, v5} contains both v2 and v3.'},
    {t:'mcq', id:'kr-q2', tag:'extra', q:'When does Kruskal\'s algorithm stop?',
      opts:['When all the subsets have been merged into one (n − 1 edges accepted)', 'When every edge has been looked at', 'When it returns to the start vertex', 'When the heaviest edge is reached'], a:0,
      why:'The slide\'s solution check: "if (all the subsets are merged) the instance is solved".'}
  ]
},

{ id:'prim', group:'Minimum spanning trees', nav:'Prim\'s algorithm', eyebrow:'Greedy algorithms · Lec 9.1',
  title:'Prim\'s algorithm',
  lede:'Grow one tree from a start vertex, always adding the nearest new vertex.',
  blocks:[
    {t:'plain', x:'Start at any vertex. Look at every edge that leaves the tree you have built so far, take the cheapest one, and add the vertex at its far end. Repeat until every vertex is in the tree. This is exactly the strategy in 2025 Q2b.'},
    {t:'src', tags:[['lecture','Lec 9.1 slides 5–8']]},
    {t:'code', title:'Prim\'s algorithm — as on the slide', x:
'F = ∅;                                // Initialize set of edges to empty.\nY = {v1};                             // Initialize set of vertices to\n                                      // contain only the first one.\nwhile (the instance is not solved){\n    select a vertex in V − Y that is  // selection procedure and\n    nearest to Y;                     // feasibility check\n\n    add the vertex to Y;\n    add the edge to F;\n\n    if (Y == V)                       // solution check\n        the instance is solved;\n}'},
    {t:'p', x:'"A vertex **nearest to Y** is a vertex in V − Y that is connected to a vertex in Y by an edge of minimum weight." Only the weight of that one edge counts — not the distance from v1 (that is the difference from Dijkstra).'},
    {t:'h', x:'The Lec 9.1 example from v1, step by step'},
    {t:'primtable', preset:'lecture91', start:'v1'},
    {t:'graph', preset:'lecture91', mst:'prim', caption:'Vertices added: v1, v2, v3, v5, v4 — the order in the slide\'s figures. F = {(v1,v2), (v1,v3), (v3,v5), (v3,v4)}, total 10.'},
    {t:'note', k:'trap', title:'The tie at step 2', x:'With Y = {v1, v2}, both (v1,v3) and (v2,v3) weigh 3. Both lead to <b>the same vertex</b> v3, so the vertex added is certain; only the edge put in F differs. The slide uses (v1,v3). <b>The course states no tie rule</b> — say which edge you took.'},
    {t:'h', x:'Answer format for Lab 9 (Prim from v1)'},
    {t:'graph', preset:'lab9', mst:'prim', caption:'Lab 9 graph, Prim from v1. Same total as Kruskal (30), because both give a minimum spanning tree.'},
    {t:'labformat', preset:'lab9', which:'prim', start:'v1', title:'Lab 9, Prim from v1 (my working)'},
    {t:'p', x:'Practise it: the <a href="#/pr-vis">Prim step-through</a>, <a href="#/pr-diy">do it yourself</a>, the <a href="#/mst-lab">Lab 9 answer format</a> checker, and <a href="#/mst-sbs">Kruskal vs Prim side by side</a>.'},
    {t:'note', title:'How fast is it?', x:'<span class="badge textbook">Textbook, not in the slides</span> Θ(n²) every-case for n vertices. Good for <b>dense</b> graphs (many edges).'},
    {t:'mcq', id:'pr-q1', tag:'lecture', q:'Y = {v1, v2} in the Lec 9.1 graph. The edges leaving Y are (v1,v3) 3, (v2,v3) 3 and (v2,v4) 6. Which vertex joins Y next?',
      opts:['v3', 'v4', 'v5', 'Both v3 and v4'], a:0,
      why:'The cheapest edge leaving Y weighs 3, and both 3-edges go to v3.'},
    {t:'mcq', id:'pr-q2', tag:'extra', q:'Does the start vertex change the total weight Prim finds?',
      opts:['No — every start gives a minimum spanning tree, so the same total weight', 'Yes — it is the distance from the start', 'Only for directed graphs', 'Yes, unless all weights are equal'], a:0,
      why:'Prim always produces an MST; only the order of the steps (and possibly which MST, on ties) changes.'}
  ]
},

{ id:'kr-vis', group:'Minimum spanning trees', nav:'Kruskal step-through', eyebrow:'Kruskal · interactive',
  title:'Kruskal\'s algorithm, one step at a time',
  lede:'Watch the sorted edge list being worked through: each edge is added (subsets merge) or skipped (it would make a cycle).',
  blocks:[
    {t:'p', x:'Pick a graph, then press **Next**. The lecture, lab and past-paper-style graphs are all here; "New random graph" makes extra practice. Drag vertices to tidy the picture, open **Edit this graph** to type your own, or **Show matrix** to see it the way Lab 9\'s optional exercises give it.'},
    {t:'widget', w:'kr-vis', id:'w-kr-vis', title:'Kruskal step-through', kind:'Visualiser', doneText:'Watched to the end'},
    {t:'note', k:'trap', title:'Ties', x:'Edges of equal weight are taken in the order the graph lists them (for Lec 9.1, the slide\'s own sorted list). <b>The course states no tie rule</b> — on the Base stations graph, try it and then check the other order in the do-it-yourself: you get a different MST with the same total.'}
  ]
},

{ id:'kr-diy', group:'Minimum spanning trees', nav:'Kruskal: do it yourself', eyebrow:'Kruskal · interactive',
  title:'Kruskal: you pick the edges',
  lede:'Choose each edge Kruskal adds to F. A wrong pick is explained: too heavy, or it would make a cycle.',
  blocks:[
    {t:'p', x:'Only the edges Kruskal **adds** are picked; the ones it skips appear in the list as you pass them. When edges tie, any of them is accepted, and the feedback says a tie was involved.'},
    {t:'widget', w:'kr-diy', id:'w-kr-diy', title:'Kruskal — do it yourself', kind:'Do it yourself', doneText:'Completed'}
  ]
},

{ id:'pr-vis', group:'Minimum spanning trees', nav:'Prim step-through', eyebrow:'Prim · interactive',
  title:'Prim\'s algorithm, one step at a time',
  lede:'Y grows from the start vertex. Each step compares every edge from Y to V − Y and adds the nearest vertex.',
  blocks:[
    {t:'p', x:'Choose a graph and a start vertex, then press **Next**. The dashed edges are the ones compared at that step; the narration lists them with their weights.'},
    {t:'widget', w:'pr-vis', id:'w-pr-vis', title:'Prim step-through', kind:'Visualiser', doneText:'Watched to the end'},
    {t:'note', k:'trap', title:'Ties', x:'Two kinds: two <b>vertices</b> equally near Y (this page takes the first in column order), or two equal <b>edges</b> into the same vertex (the vertex is certain; only the edge in F differs). <b>The course states no tie rule</b> — say which one you took.'}
  ]
},

{ id:'pr-diy', group:'Minimum spanning trees', nav:'Prim: do it yourself', eyebrow:'Prim · interactive',
  title:'Prim: you pick the vertices',
  lede:'Choose each vertex that joins Y, then the edge that joins F.',
  blocks:[
    {t:'p', x:'Tap a vertex on the picture or use the buttons. If only one edge joins your vertex to Y it goes into F automatically; if several do, you choose. Any tied choice is accepted, and the feedback says so.'},
    {t:'widget', w:'pr-diy', id:'w-pr-diy', title:'Prim — do it yourself', kind:'Do it yourself', doneText:'Completed'},
    {t:'note', k:'exam', title:'The classic mistake', x:'Prim compares <b>one edge</b> from Y — not the whole distance back to the start. Adding up path lengths is Dijkstra. The feedback points it out if you do it.'}
  ]
},

{ id:'mst-lab', group:'Minimum spanning trees', nav:'Lab 9 answer format', eyebrow:'Prim & Kruskal · Lab 9 skill',
  title:'"List the sequence of vertices and edges added"',
  lede:'Type your answer the way you would write it on paper. It is checked step by step, and any valid tie order is accepted.',
  blocks:[
    {t:'src', tags:[['lab','Lab 9 activity 1 and the optional exercises']], x:' The lab has no posted solution — the checking and the model answers are my working.'},
    {t:'p', x:'Choose the algorithm and the graph. Lab 9 activity 1 uses its 7-vertex graph with Prim starting at v1; the optional exercises give matrices (A) and (B) and name no start vertex, so vertex 1 is the default here.'},
    {t:'widget', w:'mst-lab', id:'w-mst-lab', title:'Write the sequence', kind:'Answer check', doneText:'Correct answer given'},
    {t:'note', k:'exam', title:'On paper', x:'For <b>Prim</b>, list the vertices in the order they join Y and the edge added with each. For <b>Kruskal</b>, list the edges in the order they are added (and it helps to list the skipped ones with "cycle"). In both, give the total weight, and if a tie comes up, write which edge you took.'}
  ]
},

{ id:'mst-sbs', group:'Minimum spanning trees', nav:'Kruskal vs Prim side by side', eyebrow:'Prim & Kruskal · compare',
  title:'Kruskal and Prim on the same graph',
  lede:'Same total weight every time. The order of the edges usually differs, and with ties even the edges can.',
  blocks:[
    {t:'p', x:'Lab 9 activity 3 asks you to compare the algorithms. Here they run on the same graph: Kruskal works through the whole edge list by weight, while Prim grows one tree out from its start vertex. Try the Base stations graph (it has a tie) and different Prim start vertices.'},
    {t:'widget', w:'mst-sbs', id:'w-mst-sbs', title:'Side by side', kind:'Compare', doneText:'Viewed'}
  ]
},

{ id:'compare', group:'Choosing an algorithm', nav:'Kruskal vs Prim vs Dijkstra', eyebrow:'Comparison · Test 2 Q3 skill',
  title:'Kruskal vs Prim vs Dijkstra (and Huffman)',
  lede:'What each one optimises, what it needs, and what it gives back — the facts Q3 tests.',
  blocks:[
    {t:'table', head:['', 'Kruskal', 'Prim', 'Dijkstra', 'Huffman'], rows:[
      ['**Problem**', 'Minimum spanning tree', 'Minimum spanning tree', 'Single-source shortest paths', 'Optimal prefix code'],
      ['**Optimises**', 'Total weight of all edges in the tree', 'Total weight of all edges in the tree', 'The path length from the source to <b>each</b> vertex, separately', 'Total bits (Σ frequency × code length)'],
      ['**Input**', 'Undirected, weighted, connected graph', 'Undirected, weighted, connected graph', 'Weighted graph, directed or undirected (weights ≥ 0)', 'Characters and their frequencies'],
      ['**Start vertex?**', 'No', 'Yes — any vertex; same total weight', 'Yes — the source; the answer depends on it', '—'],
      ['**Each step picks**', 'The cheapest remaining edge joining two different subsets', 'The vertex nearest to Y (one edge weight)', 'The vertex nearest to the source (whole path length)', 'The two lowest frequencies'],
      ['**Output**', 'MST edges F (n − 1 of them)', 'MST edges F (n − 1)', 'Shortest distance + path to every vertex (F = the edges on those paths)', 'A tree and a code table'],
      ['**Approach**', 'Greedy', 'Greedy', 'Greedy', 'Greedy'],
      ['**Complexity** <span class="badge textbook">Textbook</span>', 'Θ(m lg m) — good for sparse graphs', 'Θ(n²) — good for dense graphs', 'Θ(n²)', 'Θ(n lg n) with a heap']
    ]},
    {t:'p', x:'The complexities come from the prescribed text; the slides give none. n = vertices (or characters), m = edges.'},
    {t:'h', x:'Prim vs Dijkstra: the one real difference'},
    {t:'p', x:'The slides say Dijkstra "is similar to Prim\'s algorithm". Both grow Y from a start vertex. But Prim adds the vertex joined to Y by the **cheapest single edge**, while Dijkstra adds the vertex with the **shortest total path from the source**. So they can build different trees:'},
    {t:'graph', graph:{directed:false, source:'A', nodes:[{id:'A',x:60,y:200},{id:'B',x:250,y:60},{id:'C',x:440,y:200}], edges:[{u:'A',v:'B',w:2},{u:'B',v:'C',w:2},{u:'A',v:'C',w:3}]},
      tree:[['A','B'],['B','C']], caption:'MST (Prim or Kruskal): A–B and B–C, total <b>4</b>.'},
    {t:'graph', graph:{directed:false, source:'A', nodes:[{id:'A',x:60,y:200},{id:'B',x:250,y:60},{id:'C',x:440,y:200}], edges:[{u:'A',v:'B',w:2},{u:'B',v:'C',w:2},{u:'A',v:'C',w:3}]},
      tree:[['A','B'],['A','C']], caption:'Dijkstra from A: C is reached directly (3 < 2 + 2), so it keeps A–B and A–C — total <b>5</b>. Shorter trips from A, but more "cable" overall.'},
    {t:'note', k:'exam', title:'Shape of a full Q3 answer (3 marks)', x:'1. <b>Choose</b> the algorithm. 2. <b>Justify</b> it from the objective in the question ("connect all" + "minimum total" = MST; "from one place to each place" = shortest paths). 3. Say <b>why each of the others does not fit</b> — including, for an MST question, that the other MST algorithm would also work.'},
    {t:'mcq', id:'cmp-q1', tag:'extra', q:'Which algorithm\'s result depends on the choice of start vertex?',
      opts:['Dijkstra — the distances are measured from the source', 'Prim — the total weight changes with the start', 'Kruskal', 'None of them'], a:0,
      why:'Prim needs a start vertex, but every start gives an MST of the same total weight. Kruskal needs no start at all.'}
  ]
},

{ id:'scen-drill', group:'Choosing an algorithm', nav:'Scenario drill (Q3)', eyebrow:'Comparison · Test 2 Q3 skill',
  title:'Which algorithm for this scenario?',
  lede:'Choose, justify, and say why the others do not fit — then mark yourself against the model answer.',
  blocks:[
    {t:'p', x:'The first is the real 2025 Q3. The rest are extra practice: some are MST, some shortest paths, some Huffman, and some none of these.'},
    {t:'writtenset', bank:'scen'}
  ]
},

{ id:'mock', group:'Mock tests', nav:'Mock test (2025 paper)', eyebrow:'Mock test · Test 2, 2025 paper',
  title:'Mock test: the 2025 paper',
  lede:'All four questions, timed. Q1 and Q4 are marked automatically; you mark Q2 and Q3 yourself after submitting.',
  blocks:[
    {t:'note', k:'exam', title:'Not the official key', x:'The 2025 paper was released without solutions. Every model answer and mark split here is <b>my working</b>, built from the course material — see the assumptions below the start button.'},
    {t:'widget', w:'mock', id:'w-mock', title:'Test 2 (2025) — timed mock', kind:'Mock test', doneText:'Attempt submitted'},
    {t:'p', x:'Done this one? Try the two <b>extra practice</b> papers in the same format: <a href="#/paper-a">Practice paper A</a> and <a href="#/paper-b">Practice paper B</a>.'}
  ]
},

{ id:'paper-a', group:'Mock tests', nav:'Practice paper A (extra)', eyebrow:'Mock test · extra practice',
  title:'Practice paper A',
  lede:'A new paper in the 2025 format: Huffman (build), design approaches, algorithm choice, Dijkstra. Timed like the mock.',
  blocks:[
    {t:'note', k:'exam', title:'EXTRA PRACTICE — not a real paper', x:'Written for this site in the course style. Every question was checked with the site\'s Huffman and Dijkstra engines and designed to have one right answer. The model answers and mark splits are <b>my working</b>.'},
    {t:'widget', w:'mock', preset:'pA', id:'w-paper-a', title:'Practice paper A — timed', kind:'Mock test · Extra practice', doneText:'Attempt submitted'}
  ]
},

{ id:'paper-b', group:'Mock tests', nav:'Practice paper B (extra)', eyebrow:'Mock test · extra practice',
  title:'Practice paper B',
  lede:'A new paper in the 2025 format, with a Kruskal trace in place of the typed Q3. Timed like the mock.',
  blocks:[
    {t:'note', k:'exam', title:'EXTRA PRACTICE — not a real paper', x:'Written for this site in the course style. Q3 traces Kruskal because Lab 9 does, although the 2025 paper did not. Every question was checked with the site\'s engines and designed to have one right answer; Q1 states its convention so that the 2025 tie problem does not arise. The model answers and mark splits are <b>my working</b>.'},
    {t:'widget', w:'mock', preset:'pB', id:'w-paper-b', title:'Practice paper B — timed', kind:'Mock test · Extra practice', doneText:'Attempt submitted'}
  ]
},

/* ================================================================ */
{ id:'sheet', group:'Reference', nav:'Revision sheet (print)', eyebrow:'Reference',
  title:'One-page revision sheet',
  lede:'Everything on one printable A4 page: the four approaches, the greedy steps, the four algorithms, the Dijkstra table, Huffman bit counts, traps, and the assumptions to write down.',
  blocks:[
    {t:'p', x:'<a class="btn" href="sheet.html">Open the revision sheet</a> — it opens as its own page. Use its <b>Print this sheet</b> button (or Ctrl+P / ⌘P) to print it or save it as a PDF; it fits one A4 page.'},
    {t:'p', x:'The sheet uses course terms only. Time complexities come from the prescribed text, not the slides, so they sit in their own box marked <span class="badge textbook">Textbook</span>.'}
  ]
},

{ id:'glossary', group:'Reference', nav:'Glossary', eyebrow:'Reference',
  title:'Glossary',
  lede:'Every underlined word on the other pages opens one of these. Each entry says where it comes from, so you can tell course wording from general CS wording.',
  blocks:[ {t:'glossary'} ]
}
];
