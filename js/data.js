/* ============================================================
   CS160 Revise — lesson content
   Every section is a list of blocks rendered by app.js
   Block types: h, h3, p, ul, ol, code, note, table, formula,
                mcq, fill, reveal, order, pairs, widget
   ============================================================ */

const SECTIONS = [

/* ============================================================ */
{
  id: 'start', group: 'Start', nav: 'How to use this',
  eyebrow: 'CS160 · Introduction to Software Engineering',
  title: 'Revision for Weeks 1–6 (the MST)',
  lede: 'The Mid-Semester Test covers Weeks 1–6: the profession & ethics, the SDLC, Waterfall/Incremental/V-Model, Agile & Scrum, Requirements Engineering, and Design & Cybersecurity basics. Read a bit, then do the activity underneath it.',
  blocks: [
    { t:'p', x:'This works like a W3Schools tutorial: short explanation, worked example, then something you actually have to answer. Your answers are saved in this browser, so you can close the tab and come back.' },

    { t:'note', k:'exam', title:'The test', x:'**Thursday 3 September 2026, 12:00 pm, 50 minutes, 10% of your grade, covering Weeks 1–6.** Bring your student ID. This site is built directly from your Week 1–6 detailed notes, tutorials and the lecturer\u2019s ungraded practice test.' },

    { t:'h', x:'What is covered' },
    { t:'cards', x:[
      { to:'#/w1', kick:'Week 1', h:'The profession & ethics', p:'What software engineering is, the four layers, team roles, and the ACM/IEEE Code of Ethics.' },
      { to:'#/w2', kick:'Week 2', h:'The SDLC', p:'The six phases, why a structured process matters, Boehm\u2019s cost-of-change curve, verification vs validation.' },
      { to:'#/w3', kick:'Week 3', h:'Traditional process models', p:'Waterfall, Incremental, and the V-Model — strengths, weaknesses, and when each fits.' },
      { to:'#/w4', kick:'Week 4', h:'Agile development models', p:'The Agile Manifesto, Scrum roles/artifacts/events, and Extreme Programming.' },
      { to:'#/w5', kick:'Week 5', h:'Requirements engineering', p:'Elicitation techniques, the RE process, and functional vs non-functional requirements.' },
      { to:'#/w6', kick:'Week 6', h:'Design & cybersecurity', p:'Cohesion/coupling, architectural styles, UML (use case & class diagrams), and the CIA triad.' }
    ]},

    { t:'h', x:'And then practise' },
    { t:'cards', x:[
      { to:'#/exercises', kick:'Practice', h:'Exercises', p:'Fill in the missing term, classify the requirement, order the phases.' },
      { to:'#/quiz', kick:'Practice', h:'Quiz', p:'Multiple choice across all six weeks, with an explanation on every answer.' },
      { to:'#/cheatsheet', kick:'Reference', h:'Cheat sheet', p:'Every model, table and definition on one page for the night before.' },
      { to:'#/glossary', kick:'Reference', h:'Glossary', p:'Every technical term on the site, one line each, searchable.' }
    ]},

    { t:'note', k:'def', title:'The one idea that ties every week together', x:'Every week builds on the same skeleton: the six SDLC phases from Week 2. Week 3 and Week 4 are four different ways of **arranging** those six phases (Waterfall, Incremental, V-Model, Agile). Week 5 is how you actually do the first phase (Requirements) properly. Week 6 is what happens in the second phase (Design), plus the security thinking that should run through all of it. If you get lost in a later week, ask "which of the six phases is this part of?"' }
  ]
},

/* ============================================================ */
{
  id: 'w1', group: 'Week 1', nav: 'The profession & ethics',
  eyebrow: 'Week 1 · Lecture Session 1',
  title: 'Introduction to Software Engineering & the Profession',
  lede: 'What software actually is, why the field needed "engineering" discipline, the roles on a software team, and the ethics that govern the profession.',
  blocks: [

    { t:'h', x:'What software actually is' },
    { t:'p', x:'A common myth is that "software" just means code. Working software is really **three things bundled together**: the instructions (the code), the data those instructions operate on, and the documentation that explains how to use, maintain and fix it. Miss any one and the software is incomplete.' },
    { t:'note', k:'exam', title:'Software does not wear out — but it can still fail', x:'Unlike hardware, software does not follow a "bathtub curve" of failure (early defects, a long stable life, then failures as parts age). It does not physically degrade. But **every change carries a risk of introducing a new defect**, so its reliability tends to spike after each modification rather than smoothly wearing out — exactly why change control and testing matter so much.' },

    { t:'h3', x:'Generic vs. custom software' },
    { t:'table', head:['Type','Definition','Example'], rows:[
      ['Generic (COTS)', 'Built once, sold or distributed to many customers who all get the same product', 'Microsoft Word, Instagram'],
      ['Custom (bespoke)', 'Built for one specific customer/market to solve their exact problem', 'M-PAiSA — built by Vodafone Fiji specifically for the Fijian mobile money market']
    ]},
    { t:'p', x:'Most organisations use a mix: generic software for common needs (email, spreadsheets), custom software for anything unique to how they operate.' },

    { t:'h3', x:'Why "engineering", not just coding' },
    { t:'p', x:'In the late 1960s the industry produced a wave of projects that ran badly over budget, over schedule, and full of defects — the **"software crisis"**. This is traced to the **1968 NATO Software Engineering Conference**, where the term "software engineering" was first used deliberately, borrowing from traditional engineering to bring order to development.' },
    { t:'note', k:'def', title:'The IEEE definition', x:'"The application of a **systematic, disciplined, quantifiable** approach to the development, operation, and maintenance of software." Systematic = following a defined process, not improvising. Disciplined = sticking to good habits even under a tight deadline. Quantifiable = measuring progress, cost and quality with real numbers, not a gut feeling.' },

    { t:'h3', x:'The four layers of software engineering' },
    { t:'p', x:'Pressman visualises software engineering as a layered technology resting on a **quality focus** (the shared commitment to good work). On top sits **process** (the defined steps, in order), then **methods** (the technical know-how at each step), then **tools** (software/automation supporting the process and methods).' },
    { t:'table', head:['Layer','What it means'], rows:[
      ['Quality focus (foundation)', 'The whole organisation\u2019s shared commitment to doing good work'],
      ['Process', 'The defined steps followed, and in what order'],
      ['Methods', 'The specific technical know-how used at each step (e.g. how to gather requirements)'],
      ['Tools', 'Software and automation supporting the process and methods, e.g. IDEs, project trackers']
    ]},

    { t:'reveal', id:'w1-q1', title:'Self-test — Session 1', scratch:true,
      q:'In your own words: why is software said to "not wear out" the way hardware does — and what can still make it unreliable over time?',
      ans:'Software does not physically degrade through use, so it does not follow hardware\u2019s bathtub-curve failure pattern. But every change made to it (a bug fix, a new feature) carries a risk of introducing a new defect, so its reliability tends to spike after each modification rather than smoothly decline like a physical part wearing out.' },

    { t:'reveal', id:'w1-q2', title:'Self-test — Session 1', scratch:true,
      q:'What was the "software crisis," and why did it lead to the creation of software engineering as a discipline?',
      ans:'In the 1960s–70s, many software projects ran badly over budget and schedule and delivered poor-quality systems — widely called the "software crisis." It led to the 1968 NATO conference where the term "software engineering" was first used, pushing the field to adopt engineering-style discipline instead of ad-hoc coding.' },

    { t:'mcq', id:'w1-mcq1',
      q:'In Pressman\u2019s layered model of software engineering, "methods" refers to',
      opts:['The defined steps followed, in order','The specific technical know-how used at each step of the process','The team\u2019s shared commitment to doing good work','The software and automation that supports development'],
      a:1, why:'Process is the steps in order; methods are the technical how-to at each step; tools are the automation; quality focus is the foundation commitment.' },

    { t:'h', x:'Roles in the profession' },
    { t:'p', x:'No single person can realistically plan, design, build, test, and manage a large system alone — each activity rewards deep, focused specialisation. Sommerville frames this around what makes software genuinely "good": it must be **maintainable, dependable, efficient, and acceptable** to its users, and each quality depends on a different specialist paying close attention.' },

    { t:'h3', x:'The four core roles' },
    { t:'table', head:['Role','Most responsible for'], rows:[
      ['Developer', 'Turning an agreed design into working, tested code'],
      ['Tester / QA', 'Deliberately trying to break the software before a customer does'],
      ['Business / systems analyst', 'Eliciting and documenting requirements — the bridge between users and builders'],
      ['Project manager', 'Schedule, budget, risk, and keeping the customer and team talking']
    ]},
    { t:'note', k:'def', title:'Agile preview', x:'In Agile teams (Week 4) this blends into the **Scrum Master**, who protects the team\u2019s process rather than directing individuals\u2019 day-to-day work.' },

    { t:'h3', x:'Emerging roles: cloud & AI' },
    { t:'ul', x:[
      '**DevOps Engineer** — automates building, testing and release so software can ship safely many times a day.',
      '**Site Reliability Engineer** — keeps already-live, cloud-hosted systems available and fast.',
      '**Data/ML Engineer** — builds and maintains the models and data pipelines behind AI features.',
      '**Security Engineer** — grew in importance as data-protection laws tightened.'
    ]},
    { t:'p', x:'None of these erase the four core roles — they sit alongside them as the profession keeps specialising.' },

    { t:'reveal', id:'w1-q3', title:'Self-test — Session 2', scratch:true,
      q:'Why is software normally built by a team rather than one generalist? Use the idea of "specialisation."',
      ans:'Each activity (coding, testing, requirements-gathering, planning) rewards deep, focused practice. Specialists who spend all their time on one activity develop instincts a generalist splitting attention across all of them would not — e.g. a full-time tester develops a "what if...?" mindset that is hard to switch into only occasionally.' },

    { t:'reveal', id:'w1-q4', title:'Self-test — Session 2', scratch:true,
      q:'In an Agile team, which traditional role does the "Scrum Master" most resemble, and what is the key difference?',
      ans:'It most resembles the Project Manager. The key difference is that a Scrum Master protects and facilitates the team\u2019s process (removing blockers, running ceremonies) rather than directing what work individuals do day to day.' },

    { t:'mcq', id:'w1-mcq2',
      q:'Which two roles emerged specifically as software moved to the cloud and released more frequently?',
      opts:['Analyst and Project Manager','DevOps Engineer and Site Reliability Engineer','Developer and Tester','Scrum Master and Product Owner'],
      a:1, why:'DevOps Engineer automates safe, frequent releases; Site Reliability Engineer keeps already-live cloud systems available and fast. Data/ML and Security Engineer roles emerged separately, driven by AI and tightening data-protection law.' },

    { t:'h', x:'Professional & ethical responsibility' },
    { t:'note', k:'def', title:'Ethics vs. the law', x:'**The law** is the minimum standard everyone must follow, set by government, with defined penalties. **Ethics** is broader and more personal: your own sense of right and wrong, often not written into any law at all. Example: it is illegal to steal someone\u2019s password and log into their account. But if you were accidentally given legitimate access to someone\u2019s private messages and no law stops you — reading them is still wrong.' },

    { t:'h3', x:'Four areas of responsibility (the plain-English version)' },
    { t:'table', head:['Area','What it means'], rows:[
      ['Confidentiality', 'Keep your employer\u2019s and client\u2019s information private, even without a signed contract'],
      ['Competence', 'Be honest about what you can and cannot do — do not take on work you are not ready for'],
      ['Intellectual Property', 'Respect copyright and patents — do not copy or steal other people\u2019s work'],
      ['No Misuse', 'Never use your technical skills to harm others — from games on a work computer to spreading a virus']
    ]},

    { t:'h3', x:'The ACM/IEEE Software Engineering Code of Ethics — the full 8 rules' },
    { t:'p', x:'This is the formal, examinable version behind the plain-English framing above. Learn all eight headings by name.' },
    { t:'table', head:['#','Area','In plain words'], rows:[
      ['1','Public','Your work must serve the public interest above all'],
      ['2','Client & Employer','Act in their best interest, as long as this does not conflict with the public interest'],
      ['3','Product','Ensure your work meets the highest possible standards'],
      ['4','Judgement','Maintain your own professional judgement and independence'],
      ['5','Management','If you manage others, promote an ethical approach to development'],
      ['6','Profession','Help advance the integrity and reputation of the profession'],
      ['7','Colleagues','Be fair to, and supportive of, your co-workers'],
      ['8','Self','Keep learning throughout your career']
    ]},

    { t:'note', k:'trap', title:'Case study — Boeing 737 MAX (2018–2019)', x:'New flight-control software trusted only **one sensor, with no backup**. Some engineers raised concerns, but the risk was not clearly shared with pilots or regulators. Two planes crashed; **346 people died**; every 737 MAX was grounded. This was not just a coding mistake — it was a failure to be honest about risk, breaching mainly **Rule 1 (Public)** and **Rule 4 (Judgement)**. Lesson: "does the code run?" is not the same question as "is this safe, and have we been honest about the risks?"' },

    { t:'note', k:'trap', title:'Case study — Knight Capital Group (2012)', x:'A dormant, deprecated routine ("Power Peg") was left on a server instead of being removed. During a later deployment, one of eight production servers was left unpatched. When trading began, that server ran the obsolete routine, executing **over 4 million erroneous trades in 45 minutes** and losing **$440 million** — nearly destroying the firm. 97 automated warning emails went unread before the crash. Key lesson: deprecated code must be fully purged, and deployments must be automated, not manual and server-by-server.' },

    { t:'h3', x:'New ethical questions in the age of AI' },
    { t:'ul', x:[
      '**Unfair AI decisions** — AI used for hiring or loans has been shown to unfairly favour some groups (Public & Judgement).',
      '**Data privacy** — laws like GDPR require "privacy by design," making Confidentiality obligations stricter from the very start.',
      '**AI-written code** — if an AI tool suggests code and it is wrong, who is responsible: you, your employer, or the tool\u2019s maker?',
      '**Deepfakes** — AI has made convincing fake video/photos cheap to produce, a new way to cause harm.'
    ]},
    { t:'p', x:'The rule does not change: if something feels wrong, it is your job to speak up, however new the technology is.' },

    { t:'reveal', id:'w1-q5', title:'Self-test — Session 3', scratch:true,
      q:'Using the Boeing 737 MAX case, explain which Code of Ethics area(s) were most clearly breached, and why.',
      ans:'Mainly Judgement (engineers\u2019 concerns were not acted on with independent professional judgement) and Public (the public\u2019s safety interest was not given the priority the Code requires) — this was a failure of honesty about risk, not just a coding defect.' },

    { t:'reveal', id:'w1-q6', title:'Self-test — Session 3', scratch:true,
      q:'Why does the profession argue that "doing the right thing even when no one is watching" is especially important here?',
      ans:'Software professionals are routinely trusted with private data, passwords, and systems that are not closely supervised. Because misuse would often go unnoticed, professional ethics — not just fear of being caught — is what is relied on to prevent harm.' },

    { t:'pairs', id:'w1-pairs1', title:'Classify: Code of Ethics area', prompt:'Which of the 8 ACM/IEEE areas does each scenario mainly touch?',
      cats:['Public','Client & Employer','Product','Judgement','Management','Profession','Colleagues','Self'],
      items:[
        {x:'An engineer stays quiet about a safety concern because a manager told them to.', a:'Judgement'},
        {x:'A developer keeps studying new security practices years after graduating.', a:'Self'},
        {x:'A team lead encourages juniors to cut corners to hit a deadline.', a:'Management'},
        {x:'A programmer badmouths a colleague\u2019s work to make themselves look better.', a:'Colleagues'},
        {x:'A company ships a product it knows does not meet its own quality bar.', a:'Product'}
      ]},

    { t:'mcq', id:'w1-mcq3',
      q:'Data-protection laws such as the GDPR, which require "privacy by design," most directly relate to which of Week 1\u2019s four areas of responsibility?',
      opts:['No Misuse','Confidentiality','Competence','Intellectual Property'],
      a:1, why:'GDPR-style "privacy by design" is about protecting personal data from the very start of a project — that is the Confidentiality obligation, made stricter and no longer an afterthought.' }
  ]
},

/* ============================================================ */
{
  id: 'w2', group: 'Week 2', nav: 'The SDLC',
  eyebrow: 'Week 2 · The Software Development Life Cycle',
  title: 'The SDLC: six phases, and why structure matters',
  lede: 'The skeleton every process model (Waterfall, Incremental, V-Model, Agile) builds on. Know these six phases cold before Week 3 and 4 make sense.',
  blocks: [

    { t:'h', x:'What is the SDLC, and why do we need it?' },
    { t:'p', x:'The Software Development Life Cycle (SDLC) is the profession\u2019s direct answer to the "software crisis" from Week 1. It is a structured sequence of phases a piece of software passes through, from the moment someone has an idea for it to the day it is retired. It is **not one fixed procedure** — it is a general skeleton that different process models (Waterfall, Incremental, V-Model, Agile) flesh out differently.' },

    { t:'h3', x:'The six core phases' },
    { t:'formula', x:'Requirements  →  Design  →  Implementation  →  Testing  →  Deployment  →  Maintenance' },
    { t:'p', x:'Each phase takes the previous phase\u2019s output as its input, and produces its own documented output for the next phase. This is why the Week 1 roles line up so neatly: the analyst is busiest during requirements, the developer during implementation, the tester during testing, and the project manager throughout.' },

    { t:'order', id:'w2-order1', title:'Put the six SDLC phases in order', prompt:'Drag/click these into the correct sequence.',
      items:['Requirements','Design','Implementation','Testing','Deployment','Maintenance'],
      ok:'Correct — this is the skeleton every process model in Weeks 3 and 4 rearranges.',
      no:'Not yet — remember it spells out roughly as "what → how → build → check → ship → keep working."' },

    { t:'h3', x:'Why a structured process matters' },
    { t:'ul', x:[
      '**Predictability** — defined phases and outputs let a project manager estimate cost and schedule, instead of guessing.',
      '**Quality control** — each phase ends with a checkable deliverable, so mistakes are caught close to where they were made.',
      '**Shared understanding** — everyone can point to the same phase/document when they disagree about what "done" means.'
    ]},

    { t:'note', k:'exam', title:'Boehm\u2019s cost-of-change curve', x:'The cost of fixing a defect **rises sharply the later it is discovered**. A misunderstood requirement caught during the requirements phase might cost an hour to fix on paper. The same mistake, if not caught until after deployment, can cost **50 to 200 times more** — rewriting code, re-testing, re-releasing. This is the single biggest reason engineers front-load effort into requirements and design before coding, and it is referenced constantly across Weeks 3–6.' },

    { t:'h3', x:'Verification vs. validation' },
    { t:'table', head:['Term','Question it asks'], rows:[
      ['Verification', '"Are we building the product right?" — does the output of a phase correctly satisfy the specification handed to it?'],
      ['Validation', '"Are we building the right product?" — does the finished system actually satisfy the customer\u2019s real needs?']
    ]},
    { t:'note', k:'trap', title:'A system can pass one and fail the other', x:'A system built exactly to a flawed specification can pass every verification check yet still fail validation — because the specification itself did not capture what the customer actually needed. This is exactly why Week 5 treats requirements as a phase worth doing carefully, not something to sort out informally while coding.' },

    { t:'reveal', id:'w2-q1', title:'Self-test — Session 1', scratch:true,
      q:'Explain the difference between verification and validation, and give an example of a system that could pass one but fail the other.',
      ans:'Verification checks that a phase\u2019s output correctly satisfies the specification it was given ("building the product right"). Validation checks that the finished system actually meets the customer\u2019s real needs ("building the right product"). A system built exactly to a flawed specification could pass every verification check yet still fail validation, because the specification itself did not capture what the customer actually needed.' },

    { t:'mcq', id:'w2-mcq1',
      q:'In Boehm\u2019s cost-of-change curve, which phase shows the defect as cheapest to fix?',
      opts:['Maintenance','Testing','Requirements','Design'],
      a:2, why:'A mistake caught on paper during Requirements might cost an hour to fix. The same mistake surviving to Maintenance can cost 50–200x more.' },

    { t:'h', x:'Walking through the six phases' },

    { t:'h3', x:'1. Requirements' },
    { t:'p', x:'Answers "what should the system do?" The analyst leads elicitation (Week 5\u2019s topic). The output is a **Software Requirements Specification (SRS)**: functional requirements (what it must do) and non-functional requirements (how well it must do it). Every later phase is checked against this document.' },

    { t:'h3', x:'2. Design' },
    { t:'p', x:'Turns the "what" into a "how" — at two levels: **architectural design** (big-picture structure, components and how they communicate) and **detailed design** (each component\u2019s internals — data structures, algorithms, interfaces). Week 6 covers this in depth, including UML.' },

    { t:'h3', x:'3. Implementation' },
    { t:'p', x:'Developers write the actual source code following the design and coding standards. Overlaps heavily with basic testing (unit tests as you go) and version control (Git) so changes can be tracked, reviewed and rolled back.' },

    { t:'h3', x:'4. Testing' },
    { t:'p', x:'The tester deliberately tries to break the system. Testing has layers — unit, integration, system, acceptance (Week 7). Testing checks two things at once: it **verifies** the code matches the design, and it **validates** the system against the original requirements.' },

    { t:'h3', x:'5. Deployment' },
    { t:'p', x:'The tested software is actually delivered to users. DevOps Engineers typically automate this so it happens safely and frequently. A deployment plan usually includes a **rollback strategy** — a way to quickly undo the release if something goes wrong.' },

    { t:'h3', x:'6. Maintenance' },
    { t:'p', x:'Begins the moment software is released and, in most systems, continues for years — **over 70% of a system\u2019s total lifetime cost** is typically spent after launch.' },
    { t:'table', head:['Type','What it is','Example'], rows:[
      ['Corrective', 'Fixing bugs discovered after release', 'Patching a crash reported by users'],
      ['Adaptive', 'Updating so it keeps working as its environment changes', 'Supporting a new OS version, a new privacy law'],
      ['Perfective', 'Improving performance or adding requested features', 'Speeding up a slow report, adding a feature users asked for'],
      ['Preventive', 'Restructuring code now to make future changes safer', 'Refactoring — this is "preventive maintenance"']
    ]},

    { t:'pairs', id:'w2-pairs1', title:'Classify: type of maintenance', prompt:'Corrective, Adaptive, Perfective, or Preventive?',
      cats:['Corrective','Adaptive','Perfective','Preventive'],
      items:[
        {x:'Fixing a bug found after release.', a:'Corrective'},
        {x:'Rewriting a messy module now so future changes are easier and safer.', a:'Preventive'},
        {x:'Updating the app because a new OS version breaks it.', a:'Adaptive'},
        {x:'Adding a feature users have been requesting.', a:'Perfective'}
      ]},

    { t:'reveal', id:'w2-q2', title:'Self-test — Session 2', scratch:true,
      q:'What is the difference between architectural design and detailed design?',
      ans:'Architectural design decides the system\u2019s overall structure — the major components and how they communicate. Detailed design works out the internals of each individual component — its data structures, algorithms, and interfaces.' },

    { t:'reveal', id:'w2-q3', title:'Self-test — Session 2', scratch:true,
      q:'Why does deployment usually include a rollback plan?',
      ans:'Because deployment happens on live, real-world systems — if something unexpected goes wrong once real users are on the new version, the team needs a fast way to undo the release rather than leaving a broken system running.' },

    { t:'h', x:'Documentation, traceability, and what comes next' },
    { t:'note', k:'def', title:'Traceability', x:'The chain requirement → design decision → code → test case. Documentation at each phase is what makes this chain checkable — a tester cannot verify code matches its design without a design document; a customer cannot validate the finished system without a requirements document to compare against.' },

    { t:'h3', x:'One skeleton, many process models' },
    { t:'ul', x:[
      '**Waterfall** runs the six phases once, strictly in order (Week 3).',
      '**Incremental** and the **V-Model** adapt this — building in pieces, or pairing each dev phase with a matching test phase (Week 3).',
      '**Agile** (including Scrum, Week 4) repeats a small version of all six phases inside every short "sprint."'
    ]},

    { t:'reveal', id:'w2-q4', title:'Self-test — Session 3', scratch:true,
      q:'True or false, with a reason: "Every software project follows a completely different set of phases depending on which process model it uses."',
      ans:'False, with a caveat: nearly all process models are built on the same six generic phases. What differs between models is the order, repetition, and overlap of those phases — not the phases themselves.' },

    { t:'mcq', id:'w2-mcq2',
      q:'A Software Requirements Specification (SRS) typically lists both',
      opts:['Budgets and schedules only','Developers and testers','Verification and deployment plans','Functional requirements and non-functional requirements'],
      a:3, why:'The SRS is the output of the Requirements phase and lists functional requirements (what the system does) and non-functional requirements (how well it does it).' },

    { t:'mcq', id:'w2-mcq3',
      q:'Which of the following is NOT one of the three reasons given for why a structured SDLC process matters?',
      opts:['Shared understanding','Predictability','Quality control','Lower marketing costs'],
      a:3, why:'The three reasons are predictability, quality control, and shared understanding. Marketing costs are never mentioned.' }
  ]
},

/* ============================================================ */
{
  id: 'w3', group: 'Week 3', nav: 'Waterfall, Incremental, V-Model',
  eyebrow: 'Week 3 · Traditional Process Models',
  title: 'Waterfall, Incremental, and the V-Model',
  lede: 'Three ways of arranging the same six SDLC phases. Know the strengths, weaknesses, and "when is this the right choice" for each — that pattern repeats for Agile in Week 4.',
  blocks: [

    { t:'h', x:'The Waterfall model' },
    { t:'p', x:'The oldest and simplest way of organising the six SDLC phases. It runs through Requirements → Design → Implementation → Testing → Deployment → Maintenance **exactly once, in strict order**. Each phase must be fully finished, documented, and formally signed off before the next begins. There is no planned point to go back and revisit an earlier phase.' },
    { t:'note', k:'trap', title:'Where it actually comes from', x:'Waterfall traces to a **1970 paper by Winston Royce**. The irony: Royce\u2019s own paper argued the strict, single-pass version was **risky** for large projects, and recommended iterating and prototyping alongside it. The rigid model most people call "Waterfall" today is a simplification of his original, more flexible idea.' },

    { t:'table', head:['Strengths','Weaknesses'], rows:[
      ['Simple to understand and manage, one phase at a time', 'No working software exists until very late in the project'],
      ['Strong documentation & traceability at each phase', 'Going back to an earlier phase is difficult and expensive'],
      ['Progress is easy to measure (signed-off milestones)', 'Handles changing requirements poorly'],
      ['Works well when requirements are stable and well understood', '']
    ]},
    { t:'note', k:'def', title:'When Waterfall is the right choice', x:'Requirements are stable and well understood; the project is short and well-defined; heavy documentation is required (government, defence, regulated industries); the team is less experienced and benefits from a clear sequence; safety/compliance sign-off is required at each phase. Example: a **government e-Tax system**, where tax rules are fixed by law before any developer writes a line of code.' },

    { t:'reveal', id:'w3-q1', title:'Self-test — Waterfall', scratch:true,
      q:'How does Boehm\u2019s cost-of-change curve (Week 2) explain one of Waterfall\u2019s biggest weaknesses?',
      ans:'Boehm\u2019s curve shows a defect gets more expensive the later it is caught. Waterfall has no planned point to revisit an earlier phase, so if a requirement is misunderstood, that mistake is likely to survive all the way to Testing or Maintenance, where it is far more expensive to fix than if caught on paper during Requirements.' },

    { t:'mcq', id:'w3-mcq1',
      q:'The Waterfall model gets its name because',
      opts:['Like water flowing down steps, the project moves in one direction only, with no going back','It was invented at a company called Waterfall Software','It involves building software near rivers','It refers to a steep drop in project costs'],
      a:0, why:'The visual metaphor: like water flowing down a series of steps, the project moves in one direction only.' },

    { t:'h', x:'The Incremental model' },
    { t:'p', x:'Takes the same six phases and, instead of running through them once for the whole system, **repeats a smaller version of them for each piece (increment)** of the system. The first increment usually delivers the most essential core functionality; later increments add more on top, often overlapping in time.' },
    { t:'table', head:['Strengths','Weaknesses'], rows:[
      ['Working software delivered early and often', 'Requires careful planning to split into sensible increments'],
      ['Risk is easier to manage — problems surface early', 'Total cost/timeline harder to estimate up front'],
      ['Customers give feedback on real, working pieces sooner', 'Poor architecture planning can cause rework later'],
      ['Later increments can adapt to feedback more easily', 'System complexity grows as increments build up']
    ]},
    { t:'note', k:'def', title:'Fiji example', x:'A mobile money service like M-PAiSA almost certainly did not launch every feature on day one. The first increment likely focused on **person-to-person transfer**; later increments added bill payments, then merchant payments, then cross-border remittance — each building on something already proven.' },

    { t:'reveal', id:'w3-q2', title:'Self-test — Incremental', scratch:true,
      q:'Why is risk easier to manage in an Incremental project than in a Waterfall project?',
      ans:'Because problems are discovered within a single, smaller increment rather than only being found after the entire system has been built, so a mistake affects a smaller piece of work and is caught sooner.' },

    { t:'mcq', id:'w3-mcq2',
      q:'The Incremental model is most appropriate when',
      opts:['The project must have zero working software until the very end','Requirements are completely unknown and cannot be identified at all','A regulator requires a single, complete, signed-off plan before any work begins','The system\u2019s core features can be identified early, even if details change later'],
      a:3, why:'Incremental fits when core features can be identified early and delivering a working part has real value, even as details evolve.' },

    { t:'h', x:'The V-Model' },
    { t:'p', x:'Best understood as a variation of Waterfall bent into a "V" shape. The **left, descending side** lists development phases: Requirements → System Design → Architecture Design → Module Design → Coding (the bottom point). The **right, ascending side** lists a matching testing phase for each, in reverse: Unit Testing pairs with Coding, Integration Testing with Module Design, System Testing with System Design, Acceptance Testing with Requirements.' },
    { t:'note', k:'exam', title:'Direct link to verification/validation', x:'The left side of the V is **verification**: are we building the product right, against each phase\u2019s own spec? The right side is **validation**: does the finished system meet the real need it was tested against? Every development phase gets a testing partner planned **before any code is written**.' },

    { t:'widget', w:'vmodel' },

    { t:'table', head:['Strengths','Weaknesses'], rows:[
      ['Testing is planned early, alongside development', 'Still sequential and rigid — no working software until late'],
      ['Each phase has a clear, paired validation step', 'Handles changing requirements poorly, like Waterfall'],
      ['Strong fit for safety-critical / regulated projects', 'Planning tests for every phase up front takes time and effort'],
      ['Excellent documentation & traceability', 'Less flexible than Incremental or Agile']
    ]},
    { t:'note', k:'def', title:'Fiji example — Energy Fiji Limited (EFL)', x:'A software fault in a grid control system is not just inconvenient — it can cause blackouts or endanger linesmen. A requirement like "isolate a faulty section within 2 seconds" needs a planned, matching test proving it works under real fault conditions **before the system ever goes live**. This is exactly why safety-critical systems favour the V-Model.' },

    { t:'pairs', id:'w3-pairs1', title:'V-Model pairings', prompt:'Match each development phase to its testing partner.',
      cats:['Unit Testing','Integration Testing','System Testing','Acceptance Testing'],
      items:[
        {x:'Coding', a:'Unit Testing'},
        {x:'Module Design', a:'Integration Testing'},
        {x:'System Design', a:'System Testing'},
        {x:'Requirements', a:'Acceptance Testing'}
      ]},

    { t:'reveal', id:'w3-q3', title:'Self-test — V-Model', scratch:true,
      q:'If you had to choose between Waterfall, Incremental, and the V-Model for a safety-critical hospital system, which would you pick, and why?',
      ans:'The V-Model, because a hospital system is safety-critical and likely heavily regulated. Planning a matching test for every requirement before coding begins gives strong proof, and traceability, that each safety requirement was actually verified — exactly the kind of project the V-Model is designed for.' },

    { t:'mcq', id:'w3-mcq3',
      q:'In the V-Model, System Testing is paired with which development phase?',
      opts:['System Design','Module Design','Coding','Requirements'],
      a:0, why:'System Testing sits opposite System Design on the ascending side of the V; Acceptance Testing is what pairs with Requirements.' },

    { t:'h', x:'Comparing all three models' },
    { t:'table', head:['','Waterfall','Incremental','V-Model'], rows:[
      ['Flexibility to change', 'Low', 'Moderate', 'Low'],
      ['When testing happens', 'After coding, at the end', 'Within each increment', 'Planned alongside each phase'],
      ['Working software delivered', 'Only at the very end', 'Early and often', 'Only at the very end'],
      ['Best for', 'Small, stable, well-understood projects', 'Medium projects needing early feedback', 'Safety-critical / regulated systems']
    ]},

    { t:'mcq', id:'w3-mcq4',
      q:'A weakness shared by both the V-Model and Waterfall is that',
      opts:['Neither model produces test cases','They are both sequential and rigid, with no working software until late in the project','They both require no documentation at all','They are both impossible to use for safety-critical systems'],
      a:1, why:'Both are strictly sequential with no planned point to revisit an earlier phase, so working software only appears very late.' }
  ]
},

/* ============================================================ */
{
  id: 'w4', group: 'Week 4', nav: 'Agile, Scrum & XP',
  eyebrow: 'Week 4 · Agile Development Models',
  title: 'Agile: the Manifesto, Scrum, and Extreme Programming',
  lede: 'Agile is not a rejection of structure — it is a different answer to the same problem the SDLC always tried to solve. Short cycles, working software every cycle, change treated as normal.',
  blocks: [

    { t:'h', x:'Agile foundations' },
    { t:'p', x:'Waterfall and the V-Model share a weakness: neither has a planned point to revisit an earlier phase. Agile methods split work into **very short cycles** (1–4 weeks), deliver working software at the end of every cycle, and treat changing requirements as **normal**, not a planning failure.' },

    { t:'note', k:'def', title:'The Agile Manifesto — four values ("X over Y")', x:'**Individuals and interactions** over processes and tools. **Working software** over comprehensive documentation. **Customer collaboration** over contract negotiation. **Responding to change** over following a plan. "Over" means the left item wins **when the two conflict** — the right-hand items still have value, just less than the left when a team must choose.' },

    { t:'note', k:'trap', title:'The Snowbird Meeting (11–13 Feb 2001)', x:'Seventeen practitioners (including Kent Beck, Ward Cunningham, Martin Fowler, Jim Highsmith) met at a ski resort in Utah, invited by Robert C. Martin. They represented competing "lightweight" methods (XP, Scrum, DSDM, Crystal, and more). **Agile was not invented at Snowbird — it was named there.** Scrum (1993) and XP (1996–1999) already existed; the Manifesto gave them a shared vocabulary.' },

    { t:'h3', x:'The twelve principles, in three themes' },
    { t:'table', head:['Theme','Example principle'], rows:[
      ['Customer & Delivery', 'Deliver working software frequently, from a couple of weeks to a couple of months, preferring the shorter timescale'],
      ['Team & Process', 'The best architectures, requirements, and designs emerge from self-organising teams'],
      ['Quality & Improvement', 'At regular intervals, the team reflects on how to become more effective, then tunes its behaviour']
    ]},

    { t:'note', k:'def', title:'Fiji example — Talanoa Marketplace', x:'A Suva startup app for local sellers. The founders sit with developers daily (individuals & interactions); a basic listing feature goes live in week two, not after a 40-page spec (working software); sellers shape what gets built next (customer collaboration); when buyers ignore a messaging feature, the team drops it for search instead (responding to change). This would not work if requirements were fixed by law, like FRCS\u2019s e-Tax system.' },

    { t:'reveal', id:'w4-q1', title:'Self-test — Foundations', scratch:true,
      q:'State the four values of the Agile Manifesto. What does the word "over" mean in each pairing?',
      ans:'Individuals and interactions over processes and tools; working software over comprehensive documentation; customer collaboration over contract negotiation; responding to change over following a plan. "Over" means the left-hand item is favoured when the two are in conflict — it does not mean the right-hand item is ignored or worthless.' },

    { t:'mcq', id:'w4-mcq1',
      q:'True or False: Agile was invented at the Snowbird meeting in 2001; before that meeting, no lightweight development methods existed.',
      opts:['True','False'],
      a:1, why:'False — Scrum (1993) and Extreme Programming (1996–1999) already existed as separate practices. The Manifesto gave scattered approaches a shared name and vocabulary; it did not invent them.' },

    { t:'h', x:'Scrum in practice' },
    { t:'p', x:'Scrum is the most widely used way of putting the Manifesto\u2019s values into practice: a lightweight framework of roles, artifacts and events, built around fixed-length **Sprints**, each producing a usable increment. Scrum tells a team **how to organise its work** — not how to write code (that is XP).' },

    { t:'h3', x:'Scrum roles (exactly three)' },
    { t:'table', head:['Role','Responsible for'], rows:[
      ['Product Owner', 'Owns the Product Backlog and decides what matters most; speaks for the customer'],
      ['Scrum Master', 'Protects the team\u2019s way of working, clears blockers, coaches the team in Scrum'],
      ['Development Team', 'A small team that manages its own work and holds every skill needed each Sprint']
    ]},

    { t:'h3', x:'Scrum artifacts (exactly three)' },
    { t:'table', head:['Artifact','What it is'], rows:[
      ['Product Backlog', 'The full, ordered list of everything the product might need — never truly finished'],
      ['Sprint Backlog', 'The items the team commits to building this Sprint, plus its delivery plan'],
      ['Increment', 'All completed backlog items added together — a usable piece of the product, fresh every Sprint']
    ]},

    { t:'note', k:'exam', title:'Scrum has FIVE events, not four', x:'The **Sprint itself is the first event** — a container, usually 1–4 weeks, inside which the other four sit: **Sprint Planning** (select & plan the work), **Daily Scrum** (15-minute daily check-in, throughout the Sprint), **Sprint Review** (demo the Increment to stakeholders), **Sprint Retrospective** (team-only reflection on how to improve). Review involves outsiders; Retrospective is team-only.' },

    { t:'widget', w:'scrumcycle' },

    { t:'pairs', id:'w4-pairs1', title:'Classify: Scrum role, artifact, or event?', prompt:'Sort each item.',
      cats:['Role','Artifact','Event'],
      items:[
        {x:'Product Backlog', a:'Artifact'},
        {x:'Scrum Master', a:'Role'},
        {x:'Sprint Review', a:'Event'},
        {x:'Increment', a:'Artifact'},
        {x:'Daily Scrum', a:'Event'},
        {x:'Product Owner', a:'Role'}
      ]},

    { t:'note', k:'trap', title:'Where Scrum actually came from', x:'Jeff Sutherland ran the first Scrum at **Easel Corporation in 1993**, inspired by a 1986 Harvard Business Review article comparing fast product teams to a rugby "scrum." In 1995 Sutherland worked with **Ken Schwaber** to formalise it, first presented publicly at OOPSLA. Both were later among the seventeen Agile Manifesto authors in 2001.' },

    { t:'reveal', id:'w4-q2', title:'Self-test — Scrum', scratch:true,
      q:'Scrum is often described as having "four events." Why is this not quite accurate, and what is the correct number?',
      ans:'The Sprint itself is officially the first of Scrum\u2019s events: it is the container, usually one to four weeks long, inside which the other four events (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective) all take place. Counting it, Scrum defines five events in total, not four.' },

    { t:'mcq', id:'w4-mcq2',
      q:'Scrum defines exactly how many artifacts?',
      opts:['Two','Five','Three','Four'],
      a:2, why:'Product Backlog, Sprint Backlog, and Increment — exactly three.' },

    { t:'mcq', id:'w4-mcq3',
      q:'Which Scrum event involves stakeholders outside the Development Team?',
      opts:['Sprint Retrospective','Sprint Planning only','Daily Scrum','Sprint Review'],
      a:3, why:'The Sprint Review demos the Increment to stakeholders and gathers feedback. The Retrospective is team-only.' },

    { t:'h', x:'Extreme Programming (XP)' },
    { t:'p', x:'Where Scrum organises the team and its rhythm, XP sets out **concrete engineering practices**: how code itself is written, tested and integrated. A useful split: **Scrum asks "how do we organise the work?"; XP asks "how do we actually write the code?"** Many teams run both together.' },

    { t:'table', head:['Practice','What it does'], rows:[
      ['Pair Programming', 'Two developers, one keyboard — one writes, one reviews in real time'],
      ['Test-Driven Development (TDD)', 'Write the test before the code, then write just enough code to pass it'],
      ['Continuous Integration', 'Merge and test code changes often, several times a day'],
      ['Refactoring', 'Keep improving the code\u2019s internal structure without changing what it does'],
      ['Simple Design', 'Build the simplest thing that works; add complexity only when truly needed'],
      ['Collective Code Ownership', 'Any team member can change any part of the code']
    ]},
    { t:'note', k:'def', title:'Red-Green-Refactor', x:'TDD + Refactoring combine into a repeating loop: **write a failing test (red) → write minimal code to pass it (green) → refactor** the structure without changing behaviour. Repeat for the next small piece of functionality.' },

    { t:'note', k:'trap', title:'Case study — Chrysler C3 (where XP was born)', x:'Chrysler\u2019s payroll replacement project ("C3") had not produced a single paycheck after ~3 years. **Kent Beck** was brought in to rescue it in 1996 and introduced pair programming, test-first development, continuous integration, and an on-site customer representative — the practices that became XP. The rebuilt system went live in 1997. Nuance: after Chrysler merged with Daimler-Benz, **the project itself was cancelled in February 2000** before reaching its full scope — good engineering practices did not guarantee the project\u2019s survival.' },

    { t:'reveal', id:'w4-q3', title:'Self-test — XP', scratch:true,
      q:'In one sentence, how does XP\u2019s focus differ from Scrum\u2019s?',
      ans:'Scrum organises the team and its rhythm (roles, events, artifacts); XP prescribes specific engineering practices for how the code itself is written, tested, and integrated.' },

    { t:'h', x:'Comparing all four models' },
    { t:'table', head:['','Waterfall','Incremental','V-Model','Agile / Scrum'], rows:[
      ['Flexibility to change', 'Low', 'Moderate', 'Low', 'High'],
      ['Testing timing', 'After coding, at the end', 'Within each increment', 'Planned alongside each phase', 'Within every iteration'],
      ['Working software delivered', 'Only at the very end', 'Early and often', 'Only at the very end', 'Every 1 to 4 weeks'],
      ['Best for', 'Small, stable projects', 'Medium projects needing feedback', 'Safety-critical / regulated systems', 'Fast-changing, feedback-driven projects']
    ]},
    { t:'note', k:'def', title:'Fiji example — two projects, two choices', x:'**EFL\u2019s grid control system** (Week 3) is safety-critical with requirements fixed by engineering/safety rules — best fit: **the V-Model**. **Talanoa Marketplace** is a startup where nobody yet knows which features will really be used — best fit: **Agile/Scrum**. The right model depends on the project, not on which model is newest.' },

    { t:'reveal', id:'w4-q4', title:'Self-test — Choosing a model', scratch:true,
      q:'A regional hospital wants a new patient records system. Which of the four models would you recommend, and why?',
      ans:'The V-Model, most likely, because a patient records system is probably safety-critical and subject to regulatory requirements (similar to EFL\u2019s grid control system) — every requirement needs a planned, proven test before going live. (A well-reasoned case for Incremental is also acceptable if it argues the project can be safely staged with lower-risk pieces released first.)' }
  ]
},

/* ============================================================ */
{
  id: 'w5', group: 'Week 5', nav: 'Requirements engineering',
  eyebrow: 'Week 5 · Requirements Engineering',
  title: 'Requirements Engineering',
  lede: 'How do you actually find out what a system must do? Elicitation techniques, the RE process, and functional vs. non-functional requirements.',
  blocks: [

    { t:'h', x:'What is requirements engineering?' },
    { t:'p', x:'Boehm\u2019s cost-of-change curve (Week 2) showed a mistake caught during Requirements is cheapest to fix. Requirements engineering is the process of finding out what a system should do, and the limits it must work within, by talking to the people who will use it and studying how they work today. **Most of the effort goes into finding out what people actually need**, which is often unclear even to them.' },

    { t:'table', head:['Level','Audience','Example'], rows:[
      ['User requirement', 'Plain language, non-technical stakeholders', '"The system shall let a patient join the waitlist for a doctor with no available slots."'],
      ['System requirement', 'Precise, for developers to design/build from', '"The waitlist shall notify the next patient in line within 1 hour of a slot becoming available."']
    ]},
    { t:'p', x:'Requirements are **never truly finished** — they change as people learn more. This is normal, and exactly why Agile (Week 4) builds change into the process rather than treating it as a planning failure.' },

    { t:'h3', x:'The requirements engineering process' },
    { t:'p', x:'Sommerville: three main activities, wrapped by a fourth that never stops. **Elicitation and Analysis** (talk to stakeholders, study how they work) → **Specification** (write requirements down clearly) → **Validation** (check they are correct, complete, realistic) — all wrapped by ongoing **Requirements Management**. In practice this loops back constantly: validation revealing a gap sends the team back to elicitation, and that is expected.' },

    { t:'note', k:'def', title:'Pressman\u2019s seven tasks', x:'**Inception** (basic understanding of the problem) → **Elicitation** (draw requirements out) → **Elaboration** (build a fuller model) → **Negotiation** (resolve conflicts, agree scope) → **Specification** (write it down) → **Validation** (check correctness) → **Management** (track change for the rest of the project).' },

    { t:'note', k:'trap', title:'Case study — London Ambulance Service (1992)', x:'The largest ambulance service in the world introduced a new Computer Aided Dispatch system. Within hours of going live it could not cope: response times stretched to hours, ambulances were "lost," and the system was **abandoned within about 9 days**. A formal inquiry found an unrealistic timeline, **inadequate consultation with the crews who would actually use it**, and a specification that did not reflect real dispatch conditions. This was primarily a **requirements engineering failure**, not a coding failure.' },

    { t:'reveal', id:'w5-q1', title:'Self-test — RE overview', scratch:true,
      q:'Using the London Ambulance Service case, explain why its failure is described as a requirements engineering failure rather than simply a coding failure.',
      ans:'The inquiry found the core problems were an unrealistic timeline, inadequate consultation with the controllers and crews who would actually use the system, and a specification that did not reflect how dispatch really worked under pressure. These were all failures of finding out what the system needed to do, not failures of writing correct code for the wrong requirements.' },

    { t:'mcq', id:'w5-mcq1',
      q:'What is the main output (deliverable) of the requirements phase, and why does it matter so much?',
      opts:['The source code — because it is what customers actually use','The Software Requirements Specification (SRS) — every later phase is checked against it','The project budget — because it controls what can be built','The test plan — because it decides what "done" means'],
      a:1, why:'The SRS lists functional and non-functional requirements; design, implementation, and testing are all checked against it, so an error here is the most expensive kind of mistake to fix later.' },

    { t:'h', x:'Requirements elicitation techniques' },
    { t:'note', k:'def', title:'Why elicitation is genuinely hard', x:'Stakeholders don\u2019t always know what they want (good at describing problems, not solutions); people describe things in their own words, which can mean different things to different people; different stakeholders want different, equally valid things; and requirements change as people see early versions.' },

    { t:'table', head:['Technique','Strength','Weakness'], rows:[
      ['Interviews', 'Follow-up questions dig into detail immediately; builds trust; good for sensitive topics', 'Slow, reaches few people; answers shaped by who is asking'],
      ['Questionnaires', 'Reaches many stakeholders quickly and cheaply; easy to compare answers', 'No follow-up if unclear; badly worded questions mislead; low response rates'],
      ['Observation (ethnography)', 'Reveals what people actually do, not just say; surfaces hidden workarounds', 'Slow, covers few people/sites; people act differently when watched']
    ]},

    { t:'note', k:'exam', title:'Fiji example — Bula Health Centre', x:'The team interviews the Clinic Manager (gets official rules), sends a patient questionnaire (reveals notifications are never explained clearly), and observes the reception desk directly (reveals staff keeping a **handwritten waitlist on paper** — a hidden requirement nobody mentioned). No single technique alone would have found all three.' },

    { t:'note', k:'trap', title:'Where JAD came from', x:'**Joint Application Design (JAD)**, credited to Chuck Morris and Tony Crawford of IBM (late 1970s), brings users, managers and developers into a single structured workshop guided by a facilitator, instead of interviewing separately over weeks. It is essentially a formalised, high-intensity version of interviewing, solving both its slowness and the risk that stakeholders never hear each other\u2019s conflicting needs.' },

    { t:'reveal', id:'w5-q2', title:'Self-test — Elicitation', scratch:true,
      q:'Why might a team use a questionnaire and observation together, rather than just one?',
      ans:'A questionnaire confirms ideas across a large group quickly, but only observation reveals things people do without realising, like manual workarounds nobody thinks to mention.' },

    { t:'mcq', id:'w5-mcq2',
      q:'What problem was Joint Application Design (JAD) originally designed to solve?',
      opts:['Writing automated test cases faster','Speeding up requirements gathering by bringing stakeholders into one structured workshop instead of separate interviews','Replacing the need for a Software Requirements Specification','Automating software deployment'],
      a:1, why:'JAD solves both the slowness of one-on-one interviewing and the risk that stakeholders never hear each other\u2019s conflicting needs, by running one structured workshop.' },

    { t:'h', x:'Functional vs. non-functional requirements' },
    { t:'table', head:['','Functional','Non-Functional'], rows:[
      ['Question it answers', 'What must the system do?', 'How well must it do it?'],
      ['Example', '"Join the waitlist for a doctor."', '"Send the notification within 1 minute."'],
      ['Easy to test?', 'Usually — it either works or it doesn\u2019t', 'Sometimes harder — needs a measurable target'],
      ['If missed…', 'A feature is simply absent', 'The system may be unusable even with every feature present']
    ]},
    { t:'p', x:'Common non-functional categories: **performance, usability, reliability, security, portability, maintainability.**' },

    { t:'pairs', id:'w5-pairs1', title:'Classify: functional or non-functional?', prompt:'Sort each requirement.',
      cats:['Functional','Non-Functional'],
      items:[
        {x:'The system shall let a user reset their password.', a:'Functional'},
        {x:'The system shall support 500 concurrent users without slowing down.', a:'Non-Functional'},
        {x:'A receptionist shall be able to view the full waitlist for any doctor.', a:'Functional'},
        {x:'Waitlist confirmation emails shall display correctly on both desktop and mobile.', a:'Non-Functional'},
        {x:'Only the patient who joined the waitlist may view or cancel their place in it.', a:'Non-Functional'}
      ]},

    { t:'h3', x:'The Software Requirements Specification (SRS) & IEEE 830' },
    { t:'p', x:'The SRS is the agreed document listing every functional and non-functional requirement — the single reference everyone checks against. A typical SRS has an introduction, functional requirements (numbered), non-functional requirements, and constraints/assumptions.' },
    { t:'note', k:'def', title:'IEEE 830', x:'First released **1984** (ANSI/IEEE Std 830-1984), revised 1993 and 1998. It defines what a good SRS should look like — **not** how to gather requirements (that\u2019s elicitation\u2019s job). It sets out eight qualities: correct, unambiguous, complete, consistent, ranked for importance, verifiable, modifiable, traceable. Formally superseded by ISO/IEC/IEEE 29148 (2011), but IEEE 830\u2019s basic shape is still widely used, including in Assignment 1\u2019s template.' },

    { t:'reveal', id:'w5-q3', title:'Self-test — FR vs NFR', scratch:true,
      q:'Why can a system with every functional requirement met still fail?',
      ans:'If its non-functional requirements aren\u2019t met — for example if it is too slow, insecure, or unreliable — the system can be unusable even though every feature technically works.' },

    { t:'mcq', id:'w5-mcq3',
      q:'What does the IEEE 830 standard actually define?',
      opts:['How to gather requirements from stakeholders','The structure and qualities of a good Software Requirements Specification document','The programming language requirements must be written in','The budget required for a requirements phase'],
      a:1, why:'IEEE 830 defines what a good SRS document should look like (e.g. correct, unambiguous, complete, verifiable) — it does not define how to elicit requirements in the first place.' }
  ]
},

/* ============================================================ */
{
  id: 'w6', group: 'Week 6', nav: 'Design & cybersecurity',
  eyebrow: 'Week 6 · Software Design Basics & Cybersecurity Principles',
  title: 'Design Fundamentals, UML, and Cybersecurity',
  lede: 'What happens inside the Design phase: the vocabulary of good design, UML diagrams, and the security principles that should be designed in from the start.',
  blocks: [

    { t:'h', x:'Software design fundamentals' },
    { t:'p', x:'Week 2 introduced Design as the second SDLC phase; Week 3 split it into architectural and detailed design inside the V-Model. This session goes inside that phase: the vocabulary that makes one design better than another.' },

    { t:'table', head:['Concept','Meaning'], rows:[
      ['Abstraction', 'Describing something at a simpler level of detail than its full complexity (data / procedural / control abstraction)'],
      ['Architecture', 'The overall structure — which major components exist and how they connect'],
      ['Modularity', 'Dividing software into separate, named, addressable components ("modules")'],
      ['Information hiding', 'Each module hides its internal design behind a well-defined interface — others only need to know what it does, not how'],
      ['Refinement / refactoring', 'Refinement elaborates detail step by step; refactoring restructures code without changing what it does (= preventive maintenance)']
    ]},

    { t:'note', k:'exam', title:'Cohesion and coupling — the two numbers that matter most', x:'**Cohesion**: how closely the responsibilities inside a single module relate to one another (aim **high** — one well-defined job). **Coupling**: how much one module depends on another\u2019s internals (aim **low** — modules can be changed/tested/replaced independently). Rule of thumb: **high cohesion, low coupling** — easier to test, reuse, and change, connecting straight back to Boehm\u2019s cost-of-change curve.' },

    { t:'h3', x:'Architectural styles' },
    { t:'table', head:['Style','Description'], rows:[
      ['Layered', 'Horizontal layers (e.g. presentation, business logic, data access) — each layer only talks to the layer directly above/below it'],
      ['Client-server', 'A server provides a service that one or more clients request over a network'],
      ['Microservices', 'A set of small, independently deployable services, each owning one piece of functionality']
    ]},
    { t:'note', k:'def', title:'Fiji example — USP Student Portal (layered)', x:'**Presentation** (web UI — should NOT talk to the database directly) → **Business Logic** (prerequisite checks, credit limits — should NOT format HTML or run SQL) → **Data Access** (translates requests into DB operations — should NOT contain business rules) → **Database** (stores records — should NOT decide who can enrol). If a mobile app is added later, only the Presentation Layer needs to change.' },

    { t:'reveal', id:'w6-q1', title:'Self-test — Design fundamentals', scratch:true,
      q:'What is the difference between cohesion and coupling?',
      ans:'Cohesion measures how closely the responsibilities inside one module relate to each other (aim high). Coupling measures how much one module depends on another module\u2019s internals (aim low).' },

    { t:'mcq', id:'w6-mcq1',
      q:'A module that does several unrelated things bundled together for convenience has',
      opts:['High cohesion','Low cohesion','High coupling only','No architecture'],
      a:1, why:'Low cohesion means the responsibilities inside a module don\u2019t relate well to each other — the opposite of the "one well-defined job" goal.' },

    { t:'h', x:'Introduction to UML' },
    { t:'p', x:'Prose alone is a poor tool once a design has more than a few moving parts. UML gives a standard visual notation so two engineers draw — and read — a design the same way. This week: **Use Case diagrams** (behavioural — what the system does) and **Class diagrams** (structural — what the system is made of).' },

    { t:'h3', x:'Use case diagram notation' },
    { t:'table', head:['Symbol','Name','Meaning'], rows:[
      ['Stick figure', 'Actor', 'A person or external system that interacts with the software from outside'],
      ['Oval', 'Use Case', 'A goal the actor wants to accomplish'],
      ['Rectangle', 'System Boundary', 'A box marking what is inside the system vs. outside'],
      ['Solid line', 'Association', 'Connects an actor to a use case they perform'],
      ['Dashed arrow', 'Include / Extend', '«include»: one use case always triggers another. «extend»: an optional extra behaviour under certain conditions']
    ]},
    { t:'note', k:'def', title:'Include vs. extend', x:'"Place Order" **includes** "Validate Payment" — every single time it runs. "Apply Discount" **extends** "Place Order" — only if the customer has a valid coupon.' },

    { t:'h3', x:'Class diagram notation' },
    { t:'table', head:['Symbol','Name','Meaning'], rows:[
      ['Three-part box', 'Class', 'Name, attributes (data), and methods (behaviour)'],
      ['Solid line', 'Association', 'A general link, often labelled with a multiplicity such as 0..*'],
      ['Hollow triangle', 'Generalization', 'An "is-a" relationship; the triangle points to the parent class'],
      ['Hollow diamond', 'Aggregation', 'Whole-part; the part can exist independently of the whole'],
      ['Filled diamond', 'Composition', 'Whole-part; the part cannot exist without the whole']
    ]},
    { t:'note', k:'exam', title:'Aggregation vs. composition — the classic exam trap', x:'A **Team has Players** (aggregation, hollow diamond) — a Player still exists as a person if the team disbands. An **Order is made up of OrderLines** (composition, filled diamond) — an OrderLine has no meaning on its own if the Order is deleted.' },

    { t:'widget', w:'umlmatch' },

    { t:'note', k:'def', title:'Fiji example — USP Student Portal in UML', x:'**Actors**: Student (View Catalogue, Enrol — which *includes* Check Prerequisites, Drop Course, Update Details), Lecturer (Submit Grades, View Class List — no association to Student), System (Send Enrolment Confirmation, an automated actor). **Classes**: Student (studentID, name — makes 0..* Enrolment), Course (courseCode, checkPrerequisite()), Enrolment (calculateGPA()) — with FullTimeStudent/PartTimeStudent inheriting from Student (generalization).' },

    { t:'reveal', id:'w6-q2', title:'Self-test — UML', scratch:true,
      q:'What is the difference between aggregation and composition?',
      ans:'Both are whole-part relationships. In aggregation, the part can exist independently of the whole (hollow diamond). In composition, the part cannot exist without the whole (filled diamond).' },

    { t:'mcq', id:'w6-mcq2',
      q:'What is the difference between include and extend in a use case diagram?',
      opts:['Include is for actors; extend is for use cases','Include means one use case always triggers another; extend means an optional behaviour happens only under certain conditions','They mean exactly the same thing','Extend always happens; include is optional'],
      a:1, why:'«include» = always triggered every run. «extend» = optional, conditional extra behaviour.' },

    { t:'h', x:'Cybersecurity principles' },
    { t:'p', x:'Security has to be planned for from the very start — "privacy by design" from Week 1 — not patched on after. A security weakness caught during design might mean redrawing a diagram; the same weakness after deployment can mean a data breach, an emergency patch, and lost trust.' },

    { t:'note', k:'exam', title:'The CIA triad', x:'**Confidentiality** — only authorised people can see the data. **Integrity** — data is accurate and has not been improperly changed. **Availability** — authorised people can access the system when they need it.' },

    { t:'table', head:['Threat','What it is'], rows:[
      ['Phishing', 'Tricking a user into revealing credentials or clicking a malicious link, impersonating a trusted sender'],
      ['Malware', 'Software designed to damage, disrupt, or gain unauthorised access'],
      ['SQL Injection', 'Malicious input tricking a database into running unintended commands — usually an unchecked form field'],
      ['Denial-of-Service (DoS/DDoS)', 'Overwhelming a system with traffic so it cannot serve real users — an attack on availability specifically'],
      ['Unauthorised access / privilege escalation', 'A user or attacker gaining access to data/functions they should not reach']
    ]},

    { t:'table', head:['Principle','What it means'], rows:[
      ['Least privilege', 'Give each user/component only the access it actually needs'],
      ['Defense in depth', 'Layer multiple security controls so one failure does not compromise everything'],
      ['Input validation', 'Never trust data from a user or external system — check it before acting (the direct defence against SQL injection)'],
      ['Fail securely', 'When something goes wrong, default to denying access, not granting it'],
      ['Authentication vs. authorisation', 'Authentication = confirming who someone is (logging in). Authorisation = confirming what they are allowed to do once logged in']
    ]},

    { t:'note', k:'def', title:'Fiji example — M-PAiSA as a high-value target', x:'PIN **plus** the registered SIM = defense in depth. Real-time fraud monitoring for unusual transfer patterns = protecting **integrity**. Restricting agent-level functions to registered agents = **least privilege**. Because M-PAiSA moves real money for a large share of Fiji\u2019s population, it has to assume it is a high-value target from day one.' },

    { t:'pairs', id:'w6-pairs1', title:'Classify: which principle applies?', prompt:'Match each USP Portal risk to the most relevant principle.',
      cats:['Least privilege / authentication','Input validation','Availability (defense in depth)'],
      items:[
        {x:'A login is shared between two lab assistants.', a:'Least privilege / authentication'},
        {x:'A course search field is used to try to manipulate the database.', a:'Input validation'},
        {x:'An attacker floods the enrolment portal with requests during peak registration.', a:'Availability (defense in depth)'}
      ]},

    { t:'reveal', id:'w6-q3', title:'Self-test — Cybersecurity', scratch:true,
      q:'Which secure design principle directly defends against SQL injection, and why?',
      ans:'Input validation: never trusting data from a user or external system, and checking it before acting on it. SQL injection happens because a form field was not checked before being used in a database query, so validating input at the point of entry is the direct defence.' },

    { t:'mcq', id:'w6-mcq3',
      q:'What is the difference between authentication and authorisation?',
      opts:['They mean the same thing','Authentication confirms who someone is; authorisation confirms what they are allowed to do once logged in','Authorisation happens before authentication','Authentication only applies to administrators'],
      a:1, why:'Authentication = logging in (who you are). Authorisation = what you can do once logged in (e.g. a lecturer and a student seeing different menus).' }
  ]
}

];
