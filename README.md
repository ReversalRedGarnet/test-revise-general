# CS160 Revise

An interactive revision site for **CS160 — Introduction to Software Engineering**,
covering Weeks 1–6 for the Mid-Semester Test:
the profession & ethics, the SDLC, Waterfall/Incremental/V-Model, Agile & Scrum,
Requirements Engineering, and Design & Cybersecurity basics.

Built from the Week 1–6 detailed notes and the lecturer's ungraded practice test.
Every lesson page opens with a plain-English summary and a short numbered ladder
before the lecture wording starts, and every technical word is clickable for a
one-line definition.

## Coming back to it under time pressure

- **Dotted words are clickable.** Click or tap any term with a dotted underline
for a definition, an example, and a link to the page that teaches it. All of
them are on the **Glossary** page, searchable and filterable by area.
- **Guided vs Full.** The button in the top bar toggles the reading mode.
*Guided* (default) folds each page's content into collapsible panels, one per
heading. *Full* opens everything — better for a last-minute skim.
- **Start at "How to use this."** It carries a suggested route through the
material for someone with under 24 hours before the test.

## What's in it

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

### The three interactive widgets

1. **V-Model Explorer** — click each node of the V to see its pairing and whether it's verification or validation.
2. **Scrum Sprint Cycle** — click through one full Sprint using the M-PAiSA bill-payments example.
3. **UML Symbol Match** — match each symbol to its meaning.

Your answers and progress are saved in the browser's local storage, so you can
close the tab and come back. The **Reset** button in the top bar clears
everything.

## Deploying to GitHub Pages

There is no build step. Plain HTML, CSS and JavaScript.

1. Create a new repository on GitHub (public, or private on a plan that allows Pages).
2. Upload **everything in this folder, keeping the folder structure**:

```
index.html
.nojekyll
README.md
css/style.css
js/data.js
js/glossary.js
js/primer.js
js/practice.js
js/widgets.js
js/app.js
```

The scripts must stay in that order in `index.html`: `data.js`, `glossary.js`
and `primer.js` all define content that `app.js` reads at boot.

To upload through the web interface: on the repo page choose **Add file →
Upload files**, then drag the whole folder in. GitHub preserves the `css/`
and `js/` subfolders. If drag-and-drop misses `.nojekyll` (some browsers
hide dotfiles), create it manually with **Add file → Create new file**, name
it `.nojekyll`, and leave it empty.

3. Go to **Settings → Pages**.
4. Under *Build and deployment*, set **Source** to `Deploy from a branch`,
**Branch** to `main` and folder to `/ (root)`. Save.
5. Wait about a minute, then open `https://<your-username>.github.io/<repo-name>/`.

### Notes

- All paths are relative, so the site works from a subdirectory — no
configuration needed for a project page.
- Routing uses the URL hash (`#/w3`), so there are no 404s on refresh and no
rewrite rules needed.
- `.nojekyll` tells Pages to serve the files as-is instead of running them
through Jekyll.
- No webfonts, no CDN, no external requests of any kind — you can open
`index.html` straight from your file system and everything works offline.

## Editing it

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
