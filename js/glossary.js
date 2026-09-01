/* ============================================================
   CS160 Revise — glossary
   Every entry here becomes (a) a tooltip the first time the word
   appears on a page, and (b) a row on the Glossary page.

   Fields:
     w    the word as it should be displayed
     alt  other spellings/forms that should also trigger the tooltip
     c    category — 'gen' | 'proc' | 'agile' | 'req' | 'design' | 'sec'
     d    the one-or-two-sentence definition (inline `code` and **bold** work)
     ex   optional example or "why it matters" line
     see  optional hash link to the page that teaches it

   Keep definitions SHORT. A tooltip is not a lecture.
   ============================================================ */

const GLOSSARY = [

/* ---------------- General / profession ---------------- */
{ w:'software crisis', c:'gen', see:'#/w1',
  d:'The pattern of 1960s–70s software projects running badly over budget, over schedule, and full of defects — the reason "software engineering" as a discipline was created.',
  ex:'Traced to the 1968 NATO Software Engineering Conference.' },

{ w:'COTS', alt:['commercial off-the-shelf','generic software'], c:'gen', see:'#/w1',
  d:'Software built once and sold or distributed to many customers who all get the same product.',
  ex:'Microsoft Word, Instagram.' },

{ w:'bespoke software', alt:['custom software'], c:'gen', see:'#/w1',
  d:'Software built for one specific customer or market to solve their exact problem.',
  ex:'M-PAiSA, built by Vodafone Fiji for the Fijian mobile money market.' },

{ w:'quality focus', c:'gen', see:'#/w1',
  d:'The foundation layer of Pressman\u2019s model — the whole organisation\u2019s shared commitment to doing good work.' },

{ w:'process (layer)', alt:['process layer'], c:'gen', see:'#/w1',
  d:'Pressman\u2019s second layer — the defined steps followed, and in what order.' },

{ w:'DevOps Engineer', c:'gen', see:'#/w1',
  d:'A role that automates building, testing and release so software can ship safely many times a day.' },

{ w:'Site Reliability Engineer', alt:['SRE'], c:'gen', see:'#/w1',
  d:'A role focused on keeping already-live, cloud-hosted systems available and fast.' },

{ w:'ACM/IEEE Code of Ethics', c:'gen', see:'#/w1',
  d:'The joint professional code organising a software engineer\u2019s obligations into eight areas: Public, Client & Employer, Product, Judgement, Management, Profession, Colleagues, Self.' },

{ w:'Boehm\u2019s cost-of-change curve', alt:['cost-of-change curve'], c:'gen', see:'#/w2',
  d:'The finding that the cost of fixing a defect rises sharply the later it is discovered in the life cycle — 50 to 200 times more expensive after deployment than during requirements.' },

/* ---------------- Process & SDLC ---------------- */
{ w:'SDLC', alt:['Software Development Life Cycle'], c:'proc', see:'#/w2',
  d:'The structured sequence of phases a piece of software passes through, from idea to retirement: Requirements, Design, Implementation, Testing, Deployment, Maintenance.' },

{ w:'verification', c:'proc', see:'#/w2',
  d:'Checking that a phase\u2019s output correctly satisfies the specification handed to it — "are we building the product right?"' },

{ w:'validation', c:'proc', see:'#/w2',
  d:'Checking that the finished system actually satisfies the customer\u2019s real needs — "are we building the right product?"' },

{ w:'traceability', c:'proc', see:'#/w2',
  d:'The ability to follow a chain from a requirement, through the design decision that addressed it, to the code that implements it, to the test case that checks it.' },

{ w:'corrective maintenance', c:'proc', see:'#/w2',
  d:'Fixing bugs discovered after release.' },

{ w:'adaptive maintenance', c:'proc', see:'#/w2',
  d:'Updating software so it keeps working as its environment changes — e.g. a new OS version or a new law.' },

{ w:'perfective maintenance', c:'proc', see:'#/w2',
  d:'Improving performance or adding a feature users have asked for.' },

{ w:'preventive maintenance', c:'proc', see:'#/w2',
  d:'Restructuring or "cleaning up" code now to make future changes easier and safer — also called refactoring.' },

{ w:'Waterfall', c:'proc', see:'#/w3',
  d:'A process model that runs the six SDLC phases once, in strict order, with each phase fully signed off before the next begins.',
  ex:'Traces to a 1970 paper by Winston Royce.' },

{ w:'increment', c:'proc', see:'#/w3',
  d:'A smaller, working piece of the overall system, delivered on its own mini development cycle, adding functionality on top of what already exists.' },

{ w:'V-Model', c:'proc', see:'#/w3',
  d:'A variation of Waterfall bent into a "V" shape, where every development phase (left, descending) is paired with a matching testing phase (right, ascending) planned before coding begins.' },

/* ---------------- Agile & Scrum ---------------- */
{ w:'Agile Manifesto', c:'agile', see:'#/w4',
  d:'A short 2001 document built around four "X over Y" values, written by seventeen practitioners at Snowbird, Utah, giving a shared name to existing "lightweight" development methods.' },

{ w:'Sprint', c:'agile', see:'#/w4',
  d:'A fixed-length cycle (commonly 1–4 weeks) in which a Scrum team plans, builds, and delivers a usable increment. Scrum\u2019s first and largest event.' },

{ w:'Product Backlog', c:'agile', see:'#/w4',
  d:'The full, ordered list of everything a product might need, owned by the Product Owner. Never truly finished.' },

{ w:'Sprint Backlog', c:'agile', see:'#/w4',
  d:'The backlog items a Scrum team commits to building in the current Sprint, plus its plan for delivering them.' },

{ w:'Increment (Scrum)', c:'agile', see:'#/w4',
  d:'All completed backlog items added together — a usable piece of the product, produced fresh every Sprint.' },

{ w:'Product Owner', c:'agile', see:'#/w4',
  d:'The Scrum role that owns the Product Backlog and decides what matters most, speaking for the customer and stakeholders.' },

{ w:'Scrum Master', c:'agile', see:'#/w4',
  d:'The Scrum role that protects the team\u2019s way of working, clears blockers, and coaches the team in Scrum — closest to a Project Manager, but guides process rather than directing individuals.' },

{ w:'Daily Scrum', c:'agile', see:'#/w4',
  d:'A 15-minute daily check-in during a Sprint: what\u2019s done, what\u2019s next, what\u2019s blocking progress.' },

{ w:'Sprint Review', c:'agile', see:'#/w4',
  d:'The end-of-Sprint event where the team demos the Increment to stakeholders and gathers feedback.' },

{ w:'Sprint Retrospective', c:'agile', see:'#/w4',
  d:'The end-of-Sprint, team-only event where the team reflects on how it worked together and agrees what to improve.' },

{ w:'Extreme Programming', alt:['XP'], c:'agile', see:'#/w4',
  d:'An Agile method that prescribes specific engineering practices (pair programming, TDD, continuous integration, refactoring) for how code itself is written, tested and integrated.',
  ex:'Developed by Kent Beck on the Chrysler C3 project in the 1990s.' },

{ w:'Test-Driven Development', alt:['TDD'], c:'agile', see:'#/w4',
  d:'An XP practice: write the test before the code, then write just enough code to pass it.' },

{ w:'pair programming', c:'agile', see:'#/w4',
  d:'An XP practice where two developers work at one keyboard — one writes, one reviews in real time.' },

{ w:'continuous integration', c:'agile', see:'#/w4',
  d:'An XP practice: merge and test code changes often, several times a day, to catch problems within hours rather than weeks.' },

{ w:'refactoring', c:'agile', see:'#/w4',
  d:'Restructuring code to improve its internal structure without changing what it does from the outside.' },

/* ---------------- Requirements ---------------- */
{ w:'requirements engineering', c:'req', see:'#/w5',
  d:'The process of finding out what a system should do, and the limits it must work within, by talking to the people who will use it and studying how they work today.' },

{ w:'user requirement', c:'req', see:'#/w5',
  d:'A high-level statement of what a system must do, written in plain language for non-technical stakeholders.' },

{ w:'system requirement', c:'req', see:'#/w5',
  d:'A precise, detailed statement of what a system must do, written for developers to design and build from.' },

{ w:'elicitation', alt:['requirements elicitation'], c:'req', see:'#/w5',
  d:'Talking to stakeholders and studying how they work to find out what a system is really needed for.' },

{ w:'Joint Application Design', alt:['JAD'], c:'req', see:'#/w5',
  d:'An elicitation technique bringing users, managers and developers into a single structured workshop, guided by a facilitator, instead of interviewing separately.',
  ex:'Credited to Chuck Morris and Tony Crawford of IBM, late 1970s.' },

{ w:'functional requirement', c:'req', see:'#/w5',
  d:'A statement of a specific service, feature, or action the system must provide — answers "what happens when...?"' },

{ w:'non-functional requirement', c:'req', see:'#/w5',
  d:'A statement of a constraint or quality the system must have, rather than a feature — answers "how well, how fast, how safe...?"',
  ex:'Performance, usability, reliability, security, portability, maintainability.' },

{ w:'Software Requirements Specification', alt:['SRS'], c:'req', see:'#/w5',
  d:'The agreed document listing every functional and non-functional requirement for a system — the single reference everyone checks against for the rest of the project.' },

{ w:'IEEE 830', c:'req', see:'#/w5',
  d:'A standard (first 1984) defining the structure and qualities a good SRS should have — correct, unambiguous, complete, consistent, ranked, verifiable, modifiable, traceable. It does not define how to gather requirements.' },

/* ---------------- Design & UML ---------------- */
{ w:'abstraction', c:'design', see:'#/w6',
  d:'Describing something at a simpler level of detail than its full complexity — e.g. naming what a Course is without specifying how it is stored.' },

{ w:'modularity', c:'design', see:'#/w6',
  d:'Dividing software into separate, named, addressable components ("modules") that can be developed, tested and understood largely on their own.' },

{ w:'information hiding', c:'design', see:'#/w6',
  d:'Each module hides its own internal design decisions behind a well-defined interface, so other modules only need to know what it does, never how.' },

{ w:'cohesion', c:'design', see:'#/w6',
  d:'How closely the responsibilities inside a single module relate to one another. Aim high — one well-defined job per module.' },

{ w:'coupling', c:'design', see:'#/w6',
  d:'How much one module depends on the internal details of another. Aim low — modules that can be changed, tested or replaced independently.' },

{ w:'layered architecture', c:'design', see:'#/w6',
  d:'An architectural style organising a system into horizontal layers (e.g. presentation, business logic, data access), where each layer only talks to the layer directly above or below it.' },

{ w:'microservices', c:'design', see:'#/w6',
  d:'An architectural style where a system is built as a set of small, independently deployable services, each owning one piece of functionality.' },

{ w:'actor', c:'design', see:'#/w6',
  d:'In a UML use case diagram, a person or external system that interacts with the software from outside — drawn as a stick figure.' },

{ w:'use case', c:'design', see:'#/w6',
  d:'In a UML use case diagram, a goal the actor wants to accomplish — drawn as an oval.' },

{ w:'include (UML)', c:'design', see:'#/w6',
  d:'A dashed arrow meaning one use case always triggers another every single time it runs.' },

{ w:'extend (UML)', c:'design', see:'#/w6',
  d:'A dashed arrow meaning an optional extra behaviour happens only under certain conditions.' },

{ w:'aggregation', c:'design', see:'#/w6',
  d:'A whole-part relationship (hollow diamond) where the part can exist independently of the whole.',
  ex:'A Team has Players — a Player still exists if the Team disbands.' },

{ w:'composition', c:'design', see:'#/w6',
  d:'A whole-part relationship (filled diamond) where the part cannot exist without the whole.',
  ex:'An Order is made up of OrderLines — an OrderLine has no meaning on its own.' },

{ w:'generalization', c:'design', see:'#/w6',
  d:'An "is-a" relationship drawn with a hollow triangle arrow pointing to the parent class.',
  ex:'FullTimeStaff and PartTimeStaff are both types of Employee.' },

{ w:'multiplicity', c:'design', see:'#/w6',
  d:'How many instances of one class relate to instances of another, e.g. one Customer can have 0..* Orders.' },

/* ---------------- Cybersecurity ---------------- */
{ w:'CIA triad', c:'sec', see:'#/w6',
  d:'The three foundational security goals: Confidentiality (only authorised people can see data), Integrity (data is accurate and unaltered), Availability (authorised people can access the system when needed).' },

{ w:'confidentiality', c:'sec', see:'#/w6',
  d:'Only authorised people can see the data.' },

{ w:'integrity (security)', c:'sec', see:'#/w6',
  d:'Data is accurate and has not been improperly changed.' },

{ w:'availability', c:'sec', see:'#/w6',
  d:'Authorised people can access the system when they need it.' },

{ w:'SQL injection', c:'sec', see:'#/w6',
  d:'Malicious input tricking a database into running commands it was never meant to run, usually because a form field was not checked before use.' },

{ w:'denial-of-service', alt:['DoS','DDoS'], c:'sec', see:'#/w6',
  d:'Overwhelming a system with traffic so it cannot serve real users — an attack on availability specifically.' },

{ w:'least privilege', c:'sec', see:'#/w6',
  d:'A secure design principle: give each user or component only the access it actually needs to do its job.' },

{ w:'defense in depth', c:'sec', see:'#/w6',
  d:'A secure design principle: layer multiple security controls so that one failure does not compromise the whole system.',
  ex:'A password plus a one-time code.' },

{ w:'input validation', c:'sec', see:'#/w6',
  d:'A secure design principle: never trust data from a user or external system; check it before acting on it. The direct defence against SQL injection.' },

{ w:'authentication', c:'sec', see:'#/w6',
  d:'Confirming who someone is — logging in.' },

{ w:'authorisation', alt:['authorization'], c:'sec', see:'#/w6',
  d:'Confirming what someone is allowed to do once logged in.' }

];
