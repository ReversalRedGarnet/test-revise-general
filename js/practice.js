/* ============================================================
   CS160 Revise — quiz bank + exercise set
   ============================================================ */

const QUIZ_BANK = [

/* ---- Week 1: the profession & ethics ---- */
{ topic:'Week 1 · Profession', q:'Unlike hardware, software does not physically wear out, but it can still become unreliable because…',
  opts:['It slowly degrades the more it is used','It follows the same bathtub curve as hardware','Its instructions physically erode over time','Every change made to it carries a risk of introducing a new defect'],
  a:3, why:'Software does not degrade with use, but every change (bug fix, new feature) risks introducing a new defect, so reliability spikes after each change rather than wearing out smoothly.' },

{ topic:'Week 1 · Profession', q:'A COTS (generic) product is best described as…',
  opts:['Built for one specific customer\u2019s exact needs','Built once and sold or distributed to many customers who all get the same product','Software that can never be sold commercially','A product built only for government use'],
  a:1, why:'COTS = commercial off-the-shelf, e.g. Microsoft Word. Bespoke/custom software is built for one specific customer, e.g. M-PAiSA.' },

{ topic:'Week 1 · Profession', q:'In Pressman\u2019s layered model of software engineering, "methods" refers to…',
  opts:['The defined steps followed, in order','The specific technical know-how used at each step of the process','The team\u2019s shared commitment to doing good work','The software and automation that supports development'],
  a:1, why:'Process = the steps in order; methods = the technical how-to at each step; tools = automation; quality focus = the foundation commitment.' },

{ topic:'Week 1 · Profession', q:'The "software crisis" that led to the term "software engineering" is traced to which event?',
  opts:['The release of the first personal computer','The 1968 NATO Software Engineering Conference','The invention of the first compiler','The founding of the ACM'],
  a:1, why:'The 1968 NATO Software Engineering Conference is where the term "software engineering" was first used deliberately.' },

{ topic:'Week 1 · Roles', q:'Which core role is the bridge between the people who want software and the people who build it?',
  opts:['Developer','Tester','Business/systems analyst','DevOps Engineer'],
  a:2, why:'The analyst elicits and documents requirements, and confirms the finished product matches what was actually asked for.' },

{ topic:'Week 1 · Roles', q:'In an Agile team, the "Scrum Master" role most closely resembles which Week 1 role, though with a key difference?',
  opts:['Tester, but does not write test cases','Analyst, but does not talk to stakeholders','Project Manager, but guides the team\u2019s process rather than directing individual work','Developer, but focuses only on testing'],
  a:2, why:'The Scrum Master protects and facilitates the team\u2019s process rather than directing individuals\u2019 day-to-day work, unlike a traditional Project Manager.' },

{ topic:'Week 1 · Roles', q:'Which two roles emerged specifically as software moved to the cloud and released more frequently?',
  opts:['Analyst and Project Manager','DevOps Engineer and Site Reliability Engineer','Developer and Tester','Product Owner and Scrum Master'],
  a:1, why:'DevOps Engineer automates safe, frequent releases; SRE keeps already-live cloud systems available and fast.' },

{ topic:'Week 1 · Ethics', q:'Data-protection laws such as the GDPR, which require "privacy by design," most directly relate to which of Week 1\u2019s four areas of responsibility?',
  opts:['No Misuse','Confidentiality','Competence','Intellectual Property'],
  a:1, why:'"Privacy by design" is about protecting personal data from the very start — the Confidentiality obligation, made stricter.' },

{ topic:'Week 1 · Ethics', q:'How many areas does the ACM/IEEE Software Engineering Code of Ethics organise a professional\u2019s obligations into?',
  opts:['Four','Six','Eight','Ten'],
  a:2, why:'Public, Client & Employer, Product, Judgement, Management, Profession, Colleagues, Self — eight areas.' },

{ topic:'Week 1 · Ethics', q:'The Boeing 737 MAX case is described as a failure of which Code of Ethics areas above all?',
  opts:['Colleagues and Self','Public and Judgement','Profession and Management','Intellectual Property and Competence'],
  a:1, why:'Concerns were not acted on with independent judgement, and the public\u2019s safety interest was not prioritised as the Code requires.' },

{ topic:'Week 1 · Ethics', q:'The Knight Capital Group failure (2012) was ultimately caused by…',
  opts:['A brand-new untested feature released for the first time','A dormant, deprecated routine left on a server, triggered by a recycled feature flag during an incomplete deployment','A deliberate cyberattack by a competitor','A hardware failure in the data centre'],
  a:1, why:'"Power Peg" was deprecated but left dormant; a later deployment left one of eight servers unpatched, and it wrongly triggered the old routine — losing $440 million in 45 minutes.' },

/* ---- Week 2: SDLC ---- */
{ topic:'Week 2 · SDLC', q:'Which of the following is NOT one of the three reasons given for why a structured SDLC process matters?',
  opts:['Shared understanding','Predictability','Quality control','Lower marketing costs'],
  a:3, why:'The three reasons are predictability, quality control, and shared understanding.' },

{ topic:'Week 2 · SDLC', q:'A Software Requirements Specification (SRS) typically lists both…',
  opts:['Budgets and schedules only','Developers and testers','Verification and deployment plans','Functional requirements and non-functional requirements'],
  a:3, why:'The SRS is the output of the Requirements phase, listing functional and non-functional requirements.' },

{ topic:'Week 2 · SDLC', q:'Updating software so it keeps working after a new operating system version is released is an example of which type of maintenance?',
  opts:['Adaptive','Perfective','Corrective','Preventive'],
  a:0, why:'Adaptive maintenance updates software so it keeps working as its environment changes.' },

{ topic:'Week 2 · SDLC', q:'In Boehm\u2019s cost-of-change curve, which phase shows a defect as cheapest to fix?',
  opts:['Maintenance','Testing','Requirements','Design'],
  a:2, why:'A mistake caught on paper during Requirements is cheap; the same mistake caught in Maintenance can cost 50–200x more.' },

{ topic:'Week 2 · SDLC', q:'Which pair of terms describes "are we building the product right?" and "are we building the right product?"',
  opts:['Testing and Deployment','Verification and Validation','Requirements and Design','Elicitation and Specification'],
  a:1, why:'Verification checks the output matches its spec; validation checks the system meets the real need.' },

{ topic:'Week 2 · SDLC', q:'What is "traceability"?',
  opts:['The speed at which a team can deploy code','The ability to follow a chain from requirement to design to code to test case','A measure of how many bugs are found in testing','The process of tracking a project\u2019s budget only'],
  a:1, why:'Traceability is the chain requirement → design decision → code → test case, made checkable by documentation.' },

{ topic:'Week 2 · SDLC', q:'Roughly what share of a system\u2019s total lifetime cost is typically spent after launch, during maintenance?',
  opts:['Under 10%','About 30%','About 50%','Over 70%'],
  a:3, why:'Maintenance typically accounts for over 70% of a system\u2019s total lifetime cost.' },

/* ---- Week 3: process models ---- */
{ topic:'Week 3 · Process models', q:'The Waterfall model gets its name because…',
  opts:['Like water flowing down steps, the project moves in one direction only, with no going back','It was invented at a company called Waterfall Software','It involves building software near rivers','It refers to a steep drop in project costs'],
  a:0, why:'The visual metaphor: like water flowing down steps, the project moves in one direction only.' },

{ topic:'Week 3 · Process models', q:'Waterfall traces back to a 1970 paper by which author — who actually recommended AGAINST the strict, single-pass version?',
  opts:['Kent Beck','Winston Royce','Barry Boehm','Ian Sommerville'],
  a:1, why:'Winston Royce\u2019s 1970 paper argued the strict single-pass version was risky and recommended iterating and prototyping alongside it.' },

{ topic:'Week 3 · Process models', q:'The Incremental model is most appropriate when…',
  opts:['The project must have zero working software until the very end','Requirements are completely unknown and cannot be identified at all','A regulator requires a single, complete, signed-off plan before any work begins','The system\u2019s core features can be identified early, even if details change later'],
  a:3, why:'Incremental fits when core features can be identified early and delivering a working part has real value.' },

{ topic:'Week 3 · Process models', q:'In the V-Model, System Testing is paired with which development phase?',
  opts:['System Design','Module Design','Coding','Requirements'],
  a:0, why:'System Testing sits opposite System Design on the ascending side of the V.' },

{ topic:'Week 3 · Process models', q:'In the V-Model, which testing phase pairs with Requirements?',
  opts:['Unit Testing','Integration Testing','System Testing','Acceptance Testing'],
  a:3, why:'Acceptance Testing pairs with Requirements — both sit at the top of the V, and this pairing is validation.' },

{ topic:'Week 3 · Process models', q:'A weakness shared by both the V-Model and Waterfall is that…',
  opts:['Neither model produces test cases','They are both sequential and rigid, with no working software until late in the project','They both require no documentation at all','They are both impossible to use for safety-critical systems'],
  a:1, why:'Both are strictly sequential with no planned point to revisit an earlier phase.' },

{ topic:'Week 3 · Process models', q:'Which process model would best fit a government e-Tax system, where tax rules are fixed by law before development starts?',
  opts:['Agile','Waterfall','Extreme Programming','Scrum'],
  a:1, why:'Stable, well-understood, heavily regulated requirements with required sign-off is exactly Waterfall\u2019s strength.' },

/* ---- Week 4: Agile, Scrum, XP ---- */
{ topic:'Week 4 · Agile', q:'True or False: Agile was invented at the Snowbird meeting in 2001; before that meeting, no lightweight development methods existed.',
  opts:['True','False'],
  a:1, why:'False — Scrum (1993) and XP (1996–1999) already existed. The Manifesto gave scattered approaches a shared name.' },

{ topic:'Week 4 · Agile', q:'The Agile Manifesto\u2019s four values are each written in what format?',
  opts:['"X and Y"','"X over Y"','"Either X or Y"','"X before Y"'],
  a:1, why:'Each value is "X over Y" — the left item is favoured when the two conflict, not that the right item is worthless.' },

{ topic:'Week 4 · Scrum', q:'Scrum defines exactly how many artifacts?',
  opts:['Two','Five','Three','Four'],
  a:2, why:'Product Backlog, Sprint Backlog, and Increment — exactly three.' },

{ topic:'Week 4 · Scrum', q:'Which Scrum event involves stakeholders outside the Development Team?',
  opts:['Sprint Retrospective','Sprint Planning only','Daily Scrum','Sprint Review'],
  a:3, why:'The Sprint Review demos the Increment to stakeholders. The Retrospective is team-only.' },

{ topic:'Week 4 · Scrum', q:'Scrum is often said to have "four events" — why is this not quite accurate?',
  opts:['There are actually six events','The Sprint itself is the first event, containing the other four, making five in total','Scrum has no fixed events','The Daily Scrum does not count as an event'],
  a:1, why:'The Sprint is the container event; Planning, Daily Scrum, Review and Retrospective happen inside it — five events total.' },

{ topic:'Week 4 · Scrum', q:'Who owns the Product Backlog?',
  opts:['The Scrum Master','The Development Team','The Product Owner','The customer\u2019s legal department'],
  a:2, why:'The Product Owner owns the Product Backlog and decides what matters most.' },

{ topic:'Week 4 · XP', q:'Which XP practice means "write the test before the code, then write just enough code to pass it"?',
  opts:['Pair Programming','Test-Driven Development','Continuous Integration','Collective Code Ownership'],
  a:1, why:'TDD: write a failing test first, then the minimal code to make it pass, then refactor.' },

{ topic:'Week 4 · XP', q:'XP was developed under real pressure on which project?',
  opts:['The London Ambulance Service dispatch system','The Chrysler Comprehensive Compensation System (C3)','The Knight Capital trading platform','The USP Student Portal'],
  a:1, why:'Kent Beck was brought in to rescue Chrysler\u2019s C3 payroll project in 1996, introducing the practices that became XP.' },

{ topic:'Week 4 · Comparison', q:'Across Waterfall, Incremental, V-Model and Agile/Scrum, which has the HIGHEST flexibility to change?',
  opts:['Waterfall','Incremental','V-Model','Agile/Scrum'],
  a:3, why:'Agile/Scrum is High; Incremental is Moderate; Waterfall and V-Model are both Low.' },

/* ---- Week 5: requirements engineering ---- */
{ topic:'Week 5 · Requirements', q:'What is the main output (deliverable) of the requirements phase?',
  opts:['The source code','The Software Requirements Specification (SRS)','The test plan','The deployment schedule'],
  a:1, why:'The SRS lists functional and non-functional requirements; every later phase is checked against it.' },

{ topic:'Week 5 · Requirements', q:'The London Ambulance Service (1992) case is described as primarily a failure of…',
  opts:['Coding standards','Requirements engineering','Deployment automation','Test coverage'],
  a:1, why:'The inquiry found an unrealistic timeline, inadequate consultation with users, and a specification that did not reflect real conditions.' },

{ topic:'Week 5 · Elicitation', q:'Which elicitation technique reaches many stakeholders quickly and cheaply, but has no follow-up if an answer is unclear?',
  opts:['Interviews','Questionnaires','Observation','Joint Application Design'],
  a:1, why:'Questionnaires reach many people fast but cannot dig deeper into an unclear or ambiguous answer.' },

{ topic:'Week 5 · Elicitation', q:'Which elicitation technique is also called "ethnography"?',
  opts:['Interviews','Questionnaires','Observation','JAD'],
  a:2, why:'Observation — watching stakeholders do their actual work — is also called ethnography.' },

{ topic:'Week 5 · Elicitation', q:'What problem was Joint Application Design (JAD) originally designed to solve?',
  opts:['Writing automated test cases faster','Speeding up requirements gathering by bringing stakeholders into one structured workshop instead of separate interviews','Replacing the need for an SRS entirely','Automating software deployment'],
  a:1, why:'JAD solves both the slowness of interviewing and the risk that stakeholders never hear each other\u2019s conflicting needs.' },

{ topic:'Week 5 · FR vs NFR', q:'"The system shall support 500 concurrent users without slowing down" is an example of a…',
  opts:['Functional requirement','Non-functional requirement','User story only','Use case only'],
  a:1, why:'This describes a performance constraint — how well the system copes — not a feature, so it is non-functional.' },

{ topic:'Week 5 · FR vs NFR', q:'What does IEEE 830 actually define?',
  opts:['How to elicit requirements from stakeholders','The structure and qualities of a good Software Requirements Specification','The programming language a system must be written in','The org chart for a requirements team'],
  a:1, why:'IEEE 830 defines what a good SRS should look like (correct, unambiguous, complete, verifiable, etc.) — not how to gather requirements.' },

/* ---- Week 6: design & security ---- */
{ topic:'Week 6 · Design', q:'A module that does one well-defined job has…',
  opts:['High coupling','High cohesion','Low information hiding','Low abstraction'],
  a:1, why:'High cohesion means the responsibilities inside a module closely relate to one another — one clear job.' },

{ topic:'Week 6 · Design', q:'The rule of thumb every textbook repeats for good design is…',
  opts:['High cohesion and high coupling','Low cohesion and low coupling','High cohesion and low coupling','Low cohesion and high coupling'],
  a:2, why:'Aim for high cohesion (one job per module) and low coupling (modules depend on each other as little as possible).' },

{ topic:'Week 6 · Design', q:'In a layered architecture, the Presentation Layer should NOT…',
  opts:['Display a web interface to the user','Talk to the database directly','Handle button clicks','Show forms to the user'],
  a:1, why:'The Presentation Layer should only talk to the Business Logic Layer — going straight to the database breaks the layering.' },

{ topic:'Week 6 · UML', q:'What is the difference between include and extend in a use case diagram?',
  opts:['Include is for actors; extend is for use cases','Include means one use case always triggers another; extend means an optional behaviour happens only under certain conditions','They mean exactly the same thing','Extend always happens; include is optional'],
  a:1, why:'«include» = always triggered every run. «extend» = optional, conditional extra behaviour.' },

{ topic:'Week 6 · UML', q:'What is the difference between aggregation and composition?',
  opts:['Aggregation is drawn with a filled diamond, composition with a hollow one','In aggregation the part can exist independently of the whole; in composition it cannot','They are two names for the same relationship','Composition only applies to interfaces'],
  a:1, why:'Aggregation (hollow diamond) — the part can exist independently. Composition (filled diamond) — the part cannot exist without the whole.' },

{ topic:'Week 6 · UML', q:'A hollow triangle arrow pointing to a parent class represents…',
  opts:['Association','Aggregation','Composition','Generalization (inheritance)'],
  a:3, why:'Generalization is the "is-a" relationship, drawn with a hollow triangle pointing to the parent class.' },

{ topic:'Week 6 · Security', q:'Name the three parts of the CIA triad.',
  opts:['Confidentiality, Integrity, Availability','Certainty, Isolation, Authentication','Confidentiality, Isolation, Auditability','Compliance, Integrity, Access'],
  a:0, why:'Confidentiality (only authorised people see data), Integrity (data is accurate/unaltered), Availability (system accessible when needed).' },

{ topic:'Week 6 · Security', q:'Which secure design principle directly defends against SQL injection?',
  opts:['Least privilege','Defense in depth','Input validation','Fail securely'],
  a:2, why:'Input validation means never trusting data from a user or external system, and checking it before acting on it.' },

{ topic:'Week 6 · Security', q:'What is the difference between authentication and authorisation?',
  opts:['They mean the same thing','Authentication confirms who someone is; authorisation confirms what they are allowed to do once logged in','Authorisation happens before authentication','Authentication only applies to administrators'],
  a:1, why:'Authentication = logging in (who you are). Authorisation = what you can do once logged in.' },

{ topic:'Week 6 · Security', q:'Overwhelming a system with traffic so it cannot serve real users is an attack on which part of the CIA triad specifically?',
  opts:['Confidentiality','Integrity','Availability','All three equally'],
  a:2, why:'A Denial-of-Service (DoS/DDoS) attack targets availability — the system becomes unreachable for legitimate users.' }
];

/* ============================================================
   Exercises section
   ============================================================ */

const EXERCISES_SECTION = {
  id: 'exercises', group: 'Practice', nav: 'Exercises',
  eyebrow: 'Practice',
  title: 'Exercises',
  lede: 'Type the missing piece and check it, order the phases, or classify each item. These mix material from all six weeks.',
  blocks: [

    { t:'h', x:'Week 1–2: foundations' },

    { t:'fill', id:'ex1', title:'Exercise 1 — the four layers', lang:'text',
      prompt:'Fill in Pressman\u2019s four layers of software engineering, from the foundation upward.',
      code:'Foundation: quality {{0}}\nThen: {{1}}  (the steps, in order)\nThen: {{2}}  (the technical how-to at each step)\nThen: {{3}}  (automation supporting it all)',
      answers:[['focus'],['process'],['methods'],['tools']],
      hint:'Quality focus is the foundation everything else rests on.',
      sol:'Quality focus \u2192 process \u2192 methods \u2192 tools.' },

    { t:'fill', id:'ex2', title:'Exercise 2 — the six SDLC phases', lang:'text',
      prompt:'Fill in the six SDLC phases in order.',
      code:'1. {{0}}\n2. Design\n3. {{1}}\n4. Testing\n5. {{2}}\n6. Maintenance',
      answers:[['Requirements','requirements'],['Implementation','implementation'],['Deployment','deployment']],
      hint:'What → how → build → check → ship → keep working.',
      sol:'Requirements, Design, Implementation, Testing, Deployment, Maintenance.' },

    { t:'fill', id:'ex3', title:'Exercise 3 — verification or validation?', lang:'text',
      prompt:'Write V1 for verification or V2 for validation.',
      code:'"Are we building the product right?"     ->  {{0}}\n"Are we building the right product?"     ->  {{1}}',
      answers:[['V1','v1'],['V2','v2']],
      hint:'Verification checks against the spec. Validation checks against the real need.',
      sol:'"Building the product right" is Verification. "Building the right product" is Validation.' },

    { t:'h', x:'Week 3: process models' },

    { t:'fill', id:'ex4', title:'Exercise 4 — V-Model pairings', lang:'text',
      prompt:'Complete each testing pair.',
      code:'Coding            pairs with  {{0}} Testing\nModule Design     pairs with  {{1}} Testing\nSystem Design     pairs with  {{2}} Testing\nRequirements      pairs with  {{3}} Testing',
      answers:[['Unit','unit'],['Integration','integration'],['System','system'],['Acceptance','acceptance']],
      hint:'The left, descending side of the V lists development phases; the right, ascending side lists testing phases in reverse order.',
      sol:'Unit \u2194 Coding, Integration \u2194 Module Design, System \u2194 System Design, Acceptance \u2194 Requirements.' },

    { t:'pairs', id:'ex5', title:'Exercise 5 — which model fits?', prompt:'Match each scenario to the best-fitting process model.',
      cats:['Waterfall','Incremental','V-Model'],
      items:[
        {x:'A government e-Tax system where tax rules are fixed by law before development starts.', a:'Waterfall'},
        {x:'A grid control system for Energy Fiji Limited, where a fault could cause blackouts.', a:'V-Model'},
        {x:'A mobile money app that wants to launch person-to-person transfer first, then add features.', a:'Incremental'}
      ]},

    { t:'h', x:'Week 4: Agile, Scrum, XP' },

    { t:'fill', id:'ex6', title:'Exercise 6 — Scrum\u2019s three roles', lang:'text',
      prompt:'Name the three Scrum roles.',
      code:'Owns the Product Backlog:              {{0}}\nProtects the team\u2019s process:            {{1}}\nBuilds the Increment each Sprint:       {{2}}',
      answers:[['Product Owner','product owner'],['Scrum Master','scrum master'],['Development Team','development team']],
      hint:'Exactly three, no overlap.',
      sol:'Product Owner, Scrum Master, Development Team.' },

    { t:'fill', id:'ex7', title:'Exercise 7 — the Red-Green-Refactor loop', lang:'text',
      prompt:'Complete the TDD cycle.',
      code:'1. Write a {{0}} test (red)\n2. Write {{1}} code to pass it (green)\n3. {{2}} the code without changing its behaviour',
      answers:[['failing','fail'],['minimal','minimum'],['Refactor','refactor']],
      hint:'Red = fails. Green = passes. Then clean up.',
      sol:'Write a failing test, write minimal code to pass it, then refactor.' },

    { t:'h', x:'Week 5: requirements' },

    { t:'fill', id:'ex8', title:'Exercise 8 — functional or non-functional', lang:'text',
      prompt:'Write FR or NFR for each statement.',
      code:'"A patient shall be able to join the waitlist."          ->  {{0}}\n"Notifications shall be sent within 1 minute."           ->  {{1}}\n"Only the patient may view their own waitlist place."    ->  {{2}}',
      answers:[['FR','fr'],['NFR','nfr'],['NFR','nfr']],
      hint:'"What must it do" is functional; "how well" is non-functional.',
      sol:'Joining the waitlist is a feature (FR). Timing and security are qualities (NFR).' },

    { t:'h', x:'Week 6: design & security' },

    { t:'fill', id:'ex9', title:'Exercise 9 — cohesion and coupling', lang:'text',
      prompt:'Fill in high or low.',
      code:'Aim for {{0}} cohesion (one clear job per module)\nAim for {{1}} coupling (modules depend on each other as little as possible)',
      answers:[['high','High'],['low','Low']],
      hint:'The rule every textbook repeats.',
      sol:'High cohesion, low coupling.' },

    { t:'fill', id:'ex10', title:'Exercise 10 — the CIA triad', lang:'text',
      prompt:'Name the three parts of the CIA triad.',
      code:'C = {{0}}\nI = {{1}}\nA = {{2}}',
      answers:[['Confidentiality','confidentiality'],['Integrity','integrity'],['Availability','availability']],
      hint:'Only authorised people can see it, it hasn\u2019t been improperly changed, and it\u2019s accessible when needed.',
      sol:'Confidentiality, Integrity, Availability.' }
  ]
};

const QUIZ_SECTION = {
  id: 'quiz', group: 'Practice', nav: 'Quiz',
  eyebrow: 'Practice',
  title: 'Quiz',
  lede: 'Ten questions at a time, drawn from all six weeks. Every answer comes with the reasoning, so a wrong one is still worth something.',
  blocks: [ { t:'quiz' } ]
};

const CHEATSHEET_SECTION = {
  id: 'cheatsheet', group: 'Practice', nav: 'Cheat sheet',
  eyebrow: 'Reference',
  title: 'Everything on one page',
  lede: 'For the night before (or the morning of). If you can reconstruct this page from memory, you are ready.',
  blocks: [

    { t:'h', x:'Week 1 — the profession & ethics' },
    { t:'ul', x:[
      'Software = code + data + documentation.',
      'COTS/generic = built once, sold to many (Word). Bespoke/custom = built for one customer (M-PAiSA).',
      'IEEE definition: systematic, disciplined, quantifiable approach to development/operation/maintenance.',
      'Four layers (bottom to top): quality focus \u2192 process \u2192 methods \u2192 tools.',
      'Four core roles: Developer, Tester/QA, Analyst, Project Manager.',
      'Emerging roles: DevOps Engineer, Site Reliability Engineer, Data/ML Engineer, Security Engineer.',
      'Law = minimum standard, government-set. Ethics = personal standard, broader than law.',
      'Four areas of responsibility (plain version): Confidentiality, Competence, Intellectual Property, No Misuse.',
      'ACM/IEEE Code of Ethics — 8 areas: Public, Client & Employer, Product, Judgement, Management, Profession, Colleagues, Self.',
      'Boeing 737 MAX: 1 sensor, no backup, 346 deaths — breached Public & Judgement.',
      'Knight Capital (2012): dormant "Power Peg" code + unpatched server \u2192 $440m lost in 45 minutes.'
    ]},

    { t:'h', x:'Week 2 — the SDLC' },
    { t:'formula', x:'Requirements \u2192 Design \u2192 Implementation \u2192 Testing \u2192 Deployment \u2192 Maintenance' },
    { t:'ul', x:[
      'Why structure matters: predictability, quality control, shared understanding.',
      'Boehm\u2019s cost-of-change curve: a mistake caught in Requirements ~ 1 hour to fix; caught after deployment ~ 50\u2013200x more.',
      'Verification = building the product RIGHT (matches spec). Validation = building the RIGHT product (matches real need).',
      'Traceability = requirement \u2192 design decision \u2192 code \u2192 test case.',
      'SRS = Software Requirements Specification (functional + non-functional requirements).',
      'Maintenance types: Corrective (fix bugs), Adaptive (environment changed), Perfective (new feature/performance), Preventive (refactor).',
      'Over 70% of a system\u2019s total lifetime cost is spent AFTER launch, in maintenance.'
    ]},

    { t:'h', x:'Week 3 — Waterfall, Incremental, V-Model' },
    { t:'table', head:['','Waterfall','Incremental','V-Model'], rows:[
      ['Shape', 'One pass, strict order', 'Small repeated cycles', 'Waterfall bent into a V'],
      ['Flexibility', 'Low', 'Moderate', 'Low'],
      ['Testing', 'At the end', 'Within each increment', 'Planned alongside each phase'],
      ['Working software', 'Only at the end', 'Early and often', 'Only at the end'],
      ['Best for', 'Stable, regulated, short projects', 'Medium projects needing feedback', 'Safety-critical / regulated systems'],
      ['Traces to / example', 'Winston Royce, 1970', 'M-PAiSA rollout', 'EFL grid control']
    ]},
    { t:'ul', x:[
      'V-Model pairings: Coding\u2194Unit, Module Design\u2194Integration, System Design\u2194System, Requirements\u2194Acceptance.',
      'Left side of the V = verification. Right side = validation.'
    ]},

    { t:'h', x:'Week 4 — Agile, Scrum, XP' },
    { t:'ul', x:[
      'Manifesto 4 values (each "X over Y"): Individuals & interactions, Working software, Customer collaboration, Responding to change.',
      'Snowbird meeting, Feb 2001, 17 authors, invited by Robert C. Martin. Agile was NAMED there, not invented — Scrum (1993) and XP (1996\u201399) already existed.',
      'Scrum roles (3): Product Owner, Scrum Master, Development Team.',
      'Scrum artifacts (3): Product Backlog, Sprint Backlog, Increment.',
      'Scrum events (5, not 4!): the Sprint itself, + Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.',
      'Sprint Review = with stakeholders. Retrospective = team only.',
      'XP practices: Pair Programming, TDD, Continuous Integration, Refactoring, Simple Design, Collective Code Ownership.',
      'Red-Green-Refactor: failing test \u2192 minimal code to pass \u2192 refactor.',
      'XP was born on Chrysler\u2019s C3 payroll project (Kent Beck, 1996); the project itself was later cancelled (2000).',
      'Flexibility to change across all 4 models: Waterfall Low, Incremental Moderate, V-Model Low, Agile High.'
    ]},

    { t:'h', x:'Week 5 — requirements engineering' },
    { t:'ul', x:[
      'User requirement = plain language, for stakeholders. System requirement = precise, for developers.',
      'Sommerville\u2019s RE process: Elicitation & Analysis \u2192 Specification \u2192 Validation, wrapped by Requirements Management.',
      'Pressman\u2019s 7 tasks: Inception, Elicitation, Elaboration, Negotiation, Specification, Validation, Management.',
      'London Ambulance Service (1992): CAD system abandoned within ~9 days — a requirements engineering failure (poor consultation, unrealistic timeline), not a coding failure.',
      'Interviews: deep but slow, few people. Questionnaires: fast, many people, no follow-up. Observation (ethnography): reveals real behaviour, slow, people act differently when watched.',
      'JAD (Joint Application Design) — IBM, late 1970s: one structured workshop instead of separate interviews.',
      'Functional = WHAT the system does. Non-functional = HOW WELL it does it (performance, usability, reliability, security, portability, maintainability).',
      'A system can meet every functional requirement and still fail if non-functional requirements are not met.',
      'IEEE 830 (1984): defines what a good SRS looks like (correct, unambiguous, complete, consistent, ranked, verifiable, modifiable, traceable) — NOT how to gather requirements.'
    ]},

    { t:'h', x:'Week 6 — design & cybersecurity' },
    { t:'ul', x:[
      'Cohesion = how related a module\u2019s responsibilities are (aim HIGH). Coupling = how much a module depends on another\u2019s internals (aim LOW).',
      'Abstraction, Architecture, Modularity, Information hiding, Functional independence (= cohesion + coupling), Refinement/refactoring.',
      'Architectural styles: Layered, Client-server, Microservices.',
      'USP Portal layers: Presentation \u2192 Business Logic \u2192 Data Access \u2192 Database (each only talks to its neighbour).',
      'Use case diagram: Actor (stick figure), Use Case (oval), System Boundary (box), Association (line), Include/Extend (dashed arrow).',
      'Include = always triggers. Extend = optional, conditional.',
      'Class diagram: Class (3-part box), Association (line + multiplicity), Generalization (hollow triangle, "is-a"), Aggregation (hollow diamond, part survives), Composition (filled diamond, part does not survive).',
      'CIA triad: Confidentiality, Integrity, Availability.',
      'Threats: Phishing, Malware, SQL Injection, DoS/DDoS (targets availability), Privilege escalation.',
      'Principles: Least privilege, Defense in depth, Input validation (defends SQL injection), Fail securely.',
      'Authentication = who you are (login). Authorisation = what you can do once logged in.'
    ]},

    { t:'note', k:'exam', title:'If you only remember five things', x:'1) The six SDLC phases, in order. 2) Boehm\u2019s cost-of-change curve. 3) Waterfall/Incremental/V-Model/Agile flexibility ranking: Low, Moderate, Low, High. 4) Scrum = 3 roles, 3 artifacts, 5 events. 5) High cohesion, low coupling.' }
  ]
};

/* insert the practice sections right after Week 6 */
(function(){
  const i = SECTIONS.findIndex(s => s.id === 'w6');
  SECTIONS.splice(i + 1, 0, EXERCISES_SECTION, QUIZ_SECTION, CHEATSHEET_SECTION);
})();
