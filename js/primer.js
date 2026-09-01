/* ============================================================
   CS160 Revise — primers
   A short, plain-language run-up shown ABOVE the lecture content
   on each page, for when you are coming back to this cold.

   PRIMERS[sectionId] = {
     fold:   true  -> in Guided mode the lecture content underneath is
                      folded into collapsible panels, one per heading
     blocks: [ ... same block types as data.js, plus: ]
   }

   Two extra block types live here:
     { t:'plain',  title:'...', x:'...' }             a plain-English box
     { t:'steps',  title:'...', x:[{h:'',p:''}, ...]} a numbered ladder
   ============================================================ */

const PRIMERS = {

/* ============================================================ */
'start': { fold:false, blocks:[
  { t:'plain', title:'Read this bit first',
    x:'The test is tomorrow, so here is the fastest useful route through this site. Each week page opens with a plain-English summary before the lecture wording arrives, and every technical term is clickable for a one-line definition.' },

  { t:'steps', title:'How the site works', x:[
    { h:'Dotted words are clickable',
      p:'Any term with a dotted underline opens a short definition when you click or tap it. All of them are also listed on the <a href="#/glossary">Glossary</a> page.' },
    { h:'Guided mode keeps pages short',
      p:'The button in the top bar switches between **Guided** and **Full**. In Guided mode the lecture material is folded into panels you open one at a time. In Full mode everything is open — better for a last-minute skim.' },
    { h:'Do the activity under each section',
      p:'The activities are the actual revision. Reading feels like progress; answering is progress. Your answers are saved in this browser.' }
  ]},

  { t:'steps', title:'A route through, with under 24 hours', x:[
    { h:'1 · Weeks 1–2 (foundations)',
      p:'The profession & ethics, then the six SDLC phases. Everything later depends on knowing these six phases cold.' },
    { h:'2 · Weeks 3–4 (process models)',
      p:'Waterfall / Incremental / V-Model, then Agile / Scrum / XP. Learn the comparison tables — "which model fits this scenario" is a classic question style.' },
    { h:'3 · Week 5 (requirements)',
      p:'Elicitation techniques and functional vs. non-functional. The London Ambulance case and the FR/NFR classification exercise are both worth doing.' },
    { h:'4 · Week 6 (design & security)',
      p:'Cohesion/coupling, UML notation, and the CIA triad. The UML symbol tables come up constantly in this style of course.' },
    { h:'5 · Then stop reading and start answering',
      p:'Exercises \u2192 Quiz \u2192 Cheat sheet. If a question catches you out, go back to that week\u2019s page.' }
  ]}
]},

/* ============================================================ */
'w1': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Software is code + data + documentation, not just code. The industry needed "engineering" discipline because early, undisciplined projects kept failing badly (the "software crisis"). A software team splits into specialised roles because no one person can do requirements, design, coding, testing and management all well at once. And because software professionals are trusted with private systems no one else is watching closely, the profession leans on a written code of ethics — not just the law — to keep people honest.' },
  { t:'steps', title:'Build it up', x:[
    { h:'Start with why "engineering" was needed',
      p:'Before the 1968 NATO conference, software was mostly built ad-hoc, and it showed — projects ran over budget, over schedule, full of bugs. "Software engineering" borrowed discipline from older engineering fields.' },
    { h:'Then the four layers',
      p:'Quality focus (culture) → process (steps) → methods (how-to) → tools (automation). Each later week of the course fits into this stack somewhere.' },
    { h:'Then the roles',
      p:'Developer, Tester, Analyst, Project Manager are the four core roles — plus newer ones (DevOps, SRE, Data/ML, Security Engineer) as software moved to the cloud.' },
    { h:'Then ethics',
      p:'Law is the floor everyone must clear. Ethics is the personal standard above it. The ACM/IEEE Code has 8 areas; Boeing 737 MAX and Knight Capital are the two case studies worth knowing in detail.' }
  ]}
]},

/* ============================================================ */
'w2': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'The SDLC is just the ordered list of things every software project has to do: figure out what to build, plan how, build it, check it, ship it, keep it working. Every process model you\'ll meet in Weeks 3 and 4 is really just a different way of arranging these same six steps. The single most important fact in this whole course is that fixing a mistake gets dramatically more expensive the later you catch it — that is why so much emphasis goes on getting requirements and design right early.' },
  { t:'steps', title:'Build it up', x:[
    { h:'Memorise the six phases in order',
      p:'Requirements \u2192 Design \u2192 Implementation \u2192 Testing \u2192 Deployment \u2192 Maintenance. If you know this order cold, Weeks 3–4 are just "how does each model rearrange these?"' },
    { h:'Then Boehm\u2019s cost-of-change curve',
      p:'A mistake caught during Requirements: cheap (an hour on paper). The same mistake caught after deployment: 50–200x more expensive. This single idea explains half of why the course is structured the way it is.' },
    { h:'Then verification vs. validation',
      p:'Verification = "did we build it right, against the spec?" Validation = "did we build the right thing, against what the customer actually needed?" You can pass one and fail the other.' }
  ]}
]},

/* ============================================================ */
'w3': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'These are three different ways to run the six SDLC phases. Waterfall: do them once, strictly in order, no going back. Incremental: do a small version of all six phases for each piece of the system, then repeat for the next piece. V-Model: same as Waterfall, but every development phase gets a planned matching test phase from the very start. None of the three handle changing requirements well — that gap is exactly what Agile (next week) is built to fix.' },
  { t:'steps', title:'Build it up', x:[
    { h:'Waterfall first, because everything else is a variation on it',
      p:'One pass, strict order, heavy documentation, no working software until near the end. Good for stable, well-understood, or heavily regulated projects.' },
    { h:'Incremental relaxes the "whole system at once" part',
      p:'Same six phases, but run in small slices, so working software appears early and often.' },
    { h:'V-Model relaxes the "test at the end" part',
      p:'Same shape as Waterfall, but bent into a V so every dev phase has a testing partner planned before coding starts. Left side = verification, right side = validation.' },
    { h:'Then memorise the comparison table',
      p:'Flexibility, when testing happens, when working software appears, and "best for" — this table format is exactly how a "which model fits this scenario" question gets asked.' }
  ]}
]},

/* ============================================================ */
'w4': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Agile is what happens when a group of experienced developers got fed up with heavyweight, document-first processes and wrote down what they actually valued: people talking to each other, software that works, working with the customer instead of against them, and treating change as normal. Scrum is the most common way teams organise this (roles, meetings, short cycles called Sprints). XP is a set of very specific coding habits (like writing the test before the code) that keep quality high even as things change fast.' },
  { t:'steps', title:'Build it up', x:[
    { h:'The four values first',
      p:'Individuals & interactions, working software, customer collaboration, responding to change — each "over" something else that still matters, just less when they conflict.' },
    { h:'Scrum organises the team',
      p:'3 roles (Product Owner, Scrum Master, Dev Team), 3 artifacts (Product Backlog, Sprint Backlog, Increment), 5 events (the Sprint itself, plus Planning, Daily Scrum, Review, Retrospective inside it).' },
    { h:'XP tells you how to code',
      p:'Pair programming, test-first (TDD), continuous integration, refactoring, simple design, collective ownership. Red-Green-Refactor is the loop these combine into.' },
    { h:'Then the four-model comparison',
      p:'Waterfall, Incremental, V-Model, Agile — same table as Week 3, one more column. Flexibility to change goes Low, Moderate, Low, High.' }
  ]}
]},

/* ============================================================ */
'w5': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Every process model starts with "Requirements" — this week is about how you actually do that well. You cannot just ask someone what they want and write it down; people are bad at describing solutions, different people want different things, and requirements shift as people see real progress. So requirements engineers combine techniques (interviews, questionnaires, watching people work) and end up writing two different kinds of statement: what the system must do (functional), and how well it must do it (non-functional).' },
  { t:'steps', title:'Build it up', x:[
    { h:'User requirements vs. system requirements',
      p:'Same idea, two levels of detail — plain language for stakeholders, precise language for developers.' },
    { h:'Three elicitation techniques, each with a clear trade-off',
      p:'Interviews (deep but slow), questionnaires (fast but shallow), observation (reveals hidden habits but slow and people act differently when watched).' },
    { h:'Functional vs. non-functional',
      p:'"What must it do?" vs. "how well must it do it?" A system can do everything it\u2019s supposed to and still be unusable if it\u2019s too slow, insecure or unreliable.' },
    { h:'The SRS ties it all together',
      p:'One numbered document, following the shape set out by IEEE 830, that everyone on the project checks against for the rest of its life.' }
  ]}
]},

/* ============================================================ */
'w6': { fold:true, blocks:[
  { t:'plain', title:'In plain English',
    x:'Design is turning "what the system must do" into "how it will actually be built." Good design means each piece does one clear job (high cohesion) and pieces depend on each other as little as possible (low coupling). UML is just a shared drawing language so two engineers draw — and read — the same design the same way. And security has to be part of the design from day one, not bolted on afterwards, because the CIA triad (confidentiality, integrity, availability) is much cheaper to protect by design than to patch after a breach.' },
  { t:'steps', title:'Build it up', x:[
    { h:'Cohesion and coupling first — this is the exam-favourite pairing',
      p:'High cohesion (one job per module), low coupling (modules don\u2019t depend on each other\u2019s internals). Aim for both.' },
    { h:'Architectural styles',
      p:'Layered (horizontal layers, each only talks to its neighbours), client-server, microservices.' },
    { h:'UML — two diagram types this week',
      p:'Use case diagrams show WHO uses the system and WHAT for. Class diagrams show WHAT the system is made of and how the pieces relate (association, aggregation, composition, generalization).' },
    { h:'Then cybersecurity',
      p:'CIA triad (confidentiality, integrity, availability), a handful of named threats you need to recognise (not carry out), and design principles like least privilege and input validation that defend against them.' }
  ]}
]}

};

/* ============================================================
   Extra pages appended to the site
   ============================================================ */
const EXTRA_SECTIONS = [
{
  id: 'glossary', group: 'Practice', nav: 'Glossary',
  eyebrow: 'Reference',
  title: 'Glossary',
  lede: 'Every technical word used on this site, in one line each. These same definitions pop up when you click a dotted word anywhere in the lessons.',
  blocks: [
    { t:'glossary' }
  ]
}
];
