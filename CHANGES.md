# Dr. Suffrin site — multi-page rebuild

## Pages
| File | What it is |
|---|---|
| index.html | Home: hero, Currently box, 6 research domains, From the field to the paper, Selected impact |
| research.html | Current research (3 studies), Research questions, Research in progress, From field to paper |
| fieldwork.html | Field notes 01–03 with patient-pathway diagrams, health-system map |
| projects.html | How I work (7 steps), filterable project cases (open/close), study timeline |
| publications.html | Papers with Why / Found / Matters / Change, other outputs, ORCID/Scholar/PubMed |
| writing.html | Essay list; essays/essay-template.html for each new essay |
| about.html | Short About + CV button |
| contact.html | Collaborate + contact details |
| 404.html | Not-found page (uses root paths: works on a custom domain) |

## Edit in one place
- `js/site.js` → `LINKS`: email, CV, ORCID, Scholar, PubMed, LinkedIn, Harvard. Empty links are hidden automatically.
- `js/site.js` → `NAV`: menu items. Header and footer are generated on every page from here.
- Put the CV at `cv/Suffrin-CV.pdf`.

## Things to fill in
Search the HTML for `class="todo"` — those are highlighted yellow on the page until replaced.

## Files to delete from the repo (replaced)
Drsuffrinlogo.png, suffrinpic.svg, images/Drsuffrinlogo.png, images/suffrinpic.svg, js/main.js, supabase/
New assets: images/portrait.webp (70 KB, was 2.7 MB), images/logo-ink.png, images/logo-white.png, images/favicon.png
