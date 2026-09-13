# Revise

A static, two-profile revision dashboard. No backend, no build step, no
accounts — pick a profile on the landing page, and each one is a fully
separate revision site with its own content, its own engine, and its own
saved progress (namespaced localStorage keys, so nothing is shared between
profiles even though they live in the same deployment).

- **Ayga** — `ayga/` — **CS160: Introduction to Software Engineering**
  (Weeks 1–6). Definition/algorithm-style revision: lessons, fill-in exercises,
  a quiz bank, a cheat sheet, a glossary.
- **Eljay** — `eljay/` — **PL101: Politics of Development** (Weeks 1–7).
  Essay/theory-style revision, built around the course's own assessment
  format: True/False statements that reveal a written model explanation
  (not a multiple-choice tick), a "who argued what" theorist index per week,
  and a guided essay-answer scaffold (identify → define/explain →
  analyse/link) for the compare-and-contrast question.

Root `index.html` is just the profile-select screen — two cards, no JS
engine of its own.

## File structure

```
index.html              profile-select landing page
ayga/index.html          Ayga's profile shell (CS160)
eljay/index.html         Eljay's profile shell (PL101)
css/style.css            Ayga's stylesheet (unchanged from before the split)
js/data.js, glossary.js, primer.js, practice.js, widgets.js, app.js   Ayga's engine (unchanged)
eljay/css/style.css      Eljay's stylesheet (same design language, its own components)
eljay/js/data.js         Eljay's content: WEEKS, THEORY_PROFILES, SCAFFOLD_PROMPTS, PAST_MST
eljay/js/app.js          Eljay's engine (its own router/renderers — different activity types)
```

Each profile's HTML references its assets with paths relative to its own
folder (`ayga/index.html` uses `../css/style.css` and `../js/*.js`; `eljay/`
is fully self-contained under its own folder). This is why the two engines
don't interfere with each other — they're two independent static apps
sharing one deployment and one landing page.

## Deploying to GitHub Pages

There is no build step. Plain HTML, CSS and JavaScript throughout.

1. Create a new repository on GitHub (public, or private on a plan that allows Pages).
2. Upload **everything in this folder, keeping the folder structure** (`index.html`,
`ayga/`, `eljay/`, `css/`, `js/`, `.nojekyll`, `README.md`).
3. Go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`,
**Branch** to `main` and folder to `/ (root)`. Save.
5. Wait about a minute, then open `https://<your-username>.github.io/<repo-name>/`.

### Notes

- All paths are relative, so the site works from a subdirectory — no
configuration needed for a project page.
- Each profile routes on its own URL hash (`#/w3`), so there are no 404s on
refresh and no rewrite rules needed.
- `.nojekyll` tells Pages to serve the files as-is instead of running them
through Jekyll.
- No webfonts, no CDN, no external requests of any kind — you can open
`index.html` straight from your file system and everything works offline.

---

## Ayga's profile — CS160 Revise

Covers Weeks 1–6 for the Mid-Semester Test: the profession & ethics, the
SDLC, Waterfall/Incremental/V-Model, Agile & Scrum, Requirements Engineering,
and Design & Cybersecurity basics. Built from the Week 1–6 detailed notes
and the lecturer's ungraded practice test. Every lesson page opens with a
plain-English summary and a short numbered ladder before the lecture
wording starts, and every technical word is clickable for a one-line
definition.

### Coming back to it under time pressure

- **Dotted words are clickable.** Click or tap any term with a dotted underline
for a definition, an example, and a link to the page that teaches it. All of
them are on the **Glossary** page, searchable and filterable by area.
- **Guided vs Full.** The button in the top bar toggles the reading mode.
*Guided* (default) folds each page's content into collapsible panels, one per
heading. *Full* opens everything — better for a last-minute skim.
- **Start at "How to use this."** It carries a suggested route through the
material for someone with under 24 hours before the test.

### What's in it

**11 pages** covering Weeks 1–6, plus Exercises, Quiz, Cheat sheet, and Glossary.

| Page | Covers |
| --- | --- |
| Week 1 | The profession, the four layers, team roles, the ACM/IEEE Code of Ethics, Boeing 737 MAX & Knight Capital case studies |
| Week 2 | The six SDLC phases, Boehm's cost-of-change curve, verification vs validation, maintenance types |
| Week 3 | Waterfall, Incremental, and the V-Model — strengths, weaknesses, when each fits |
| Week 4 | The Agile Manifesto, Scrum roles/artifacts/events, Extreme Programming |
| Week 5 | Requirements engineering process, elicitation techniques, functional vs non-functional requirements, IEEE 830 |
| Week 6 | Cohesion/coupling, architectural styles, UML (use case & class diagrams), the CIA triad |
| Exercises | 10 fill-in-the-blank / classification exercises across all six weeks |
| Quiz | 51 questions, 10 at a time, filterable by drawing from all six weeks |
| Cheat sheet | Every table, formula and definition on one page |
| Glossary | Every technical term on the site, one line each, searchable |

#### The three interactive widgets

1. **V-Model Explorer** — click each node of the V to see its pairing and whether it's verification or validation.
2. **Scrum Sprint Cycle** — click through one full Sprint using the M-PAiSA bill-payments example.
3. **UML Symbol Match** — match each symbol to its meaning.

Progress is saved under the `cs160.*` localStorage keys. The **Reset**
button in the top bar clears them.

### Editing it

Content lives in four files and needs no tooling:

- `js/data.js` — every lesson page, as a list of blocks (`p`, `h`, `code`,
`note`, `table`, `formula`, `mcq`, `fill`, `reveal`, `order`, `pairs`,
`widget`).
- `js/primer.js` — the plain-English run-up shown above each page, plus the
Glossary page definition (in `EXTRA_SECTIONS`).
- `js/glossary.js` — the tooltip and glossary terms.
- `js/practice.js` — the quiz bank, the exercise set, and the cheat sheet.

To add a glossary term, append an object to `GLOSSARY`:

```
{ w:'least privilege', alt:['principle of least privilege'], c:'sec', see:'#/w6',
  d:'One-sentence definition. **bold** and `code` work.',
  ex:'Optional example line.' }
```

`c` is the category (`gen`, `proc`, `agile`, `req`, `design`, `sec`). `alt`
lists other spellings that should also trigger the tooltip.

To add a quiz question, append an object to `QUIZ_BANK`:

```
{ topic:'Week 6 · Security', q:'Your question?',
  opts:['A','B','C','D'], a:2, why:'Why C is right.' }
```

To add a fill-in-the-blank exercise, use `{{0}}`, `{{1}}` … as the blanks and
give an array of accepted answers for each:

```
{ t:'fill', id:'unique-id', title:'…', lang:'text',
  prompt:'…',
  code:'The {{0}} phase produces the SRS.',
  answers:[['Requirements','requirements']],
  hint:'…', sol:'…' }
```

Activity ids must be unique across the whole site — they are the keys used
for progress tracking.

To add a primer to a page, key it by the section id from `data.js`:

```
'w3': { fold:true, blocks:[
  { t:'plain', title:'In plain English', x:'…' },
  { t:'steps', title:'Build it up', x:[ {h:'First rung', p:'…'} ] }
]}
```

To add a new widget, add a `mount(host)` function to `WIDGETS` in
`js/widgets.js`, then reference it from a page with `{ t:'widget', w:'yourKey' }`.

---

## Eljay's profile — PL101 Revise

Covers Weeks 1–7 for the Mid-Semester Test: poverty & global inequality,
colonialism, political independence, the modernisation paradigm, foreign aid
& dependency theory, and critical approaches to development. Built from the
Week 1–7 lecture slides and the assigned academic readings (Rist, Escobar,
Said, Acharya, Rodney, Hickel, Sen, Ha-Joon Chang, and others).

This course's MST is not multiple choice: it's five True/False statements
each needing a short written explanation, plus a compare-and-contrast essay
— and the course explicitly teaches a required answer structure (**identify
→ define/explain → analyse/support/link**). The site is built around that,
not around flashcards.

### What's in it

| Page | Covers |
| --- | --- |
| Week 1–7 | Per week: a plain-English summary, a "who argued what" theorist index (named authors' actual claims), a mini key-concepts list, and 11–14 practice True/False items |
| Essay structure | Standalone practice for the identify → define/explain → analyse/link scaffold, with worked model answers (Rist, Rodney, Escobar, Acharya) |
| Compare & contrast | Modernisation vs. dependency theory, drafted in the same scaffold, side by side, against a full model answer — the MST's actual Part 2 essay topic |
| Past MST (2025) | The real released paper, verbatim, for format/phrasing familiarity (not an answer key) |

**True/False items reveal a model written explanation, not a checkmark** —
pick True or False, then compare your own reasoning to the model rather than
just seeing "correct"/"incorrect". That mirrors how the MST is actually
graded (1 point for the tick, 3 for the explanation).

Progress is saved under the `pl101.*` localStorage keys, entirely separate
from Ayga's `cs160.*` keys. The **Reset** button in the top bar clears them.

### Editing it

Everything lives in `eljay/js/data.js`:

- `WEEKS` — an array of seven week objects: `{ id, week, title, summary,
concepts:[{term,def,ex}], theorists:[{name,work,claim,detail}],
tf:[{id,q,answer,explanation}] }`.
- `THEORY_PROFILES` — `{ modernisation, dependency }`, each with
`corePremise`, `keyThinkers`, `mechanism`, `policyImplications`, `critiques`
— feeds the Compare & contrast page.
- `SCAFFOLD_PROMPTS` — standalone essay-structure practice prompts, each
`{ id, title, q, hints:[3], model:[3] }` (one hint/model line per scaffold
step).
- `PAST_MST` — the reference past-paper text.

To add a True/False item to a week, append to that week's `tf` array with a
unique `id` within the week. To add a new essay-structure prompt, append an
object to `SCAFFOLD_PROMPTS` with the same shape as the existing ones.

The rendering engine (`eljay/js/app.js`) and its block types (`theorists`,
`concepts`, `tf`, `scaffold`, `comparecontrast`, `pastpaper`, plus the usual
`h`/`p`/`ul`/`note`/`table`/`cards`) are separate from Ayga's engine on
purpose — the two courses are shaped too differently to share one renderer.
