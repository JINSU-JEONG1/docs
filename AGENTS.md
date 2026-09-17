# Document production

Create clear, accurate, and professional document artifacts.

Supported formats:

* DOCX
* PPTX
* XLSX
* PDF

## Principles

* Clarity over decoration.
* Accuracy over completeness.
* Consistency over novelty.
* Keep content concise and easy to scan.
* Never invent facts, metrics, citations, or sources.
* Prefer official or primary sources.
* Use approved templates when available.

## Skills

Reusable, agent-neutral skills live in `skills/`.

Agent-specific discovery paths such as `.agents/skills` and `.claude/skills` are filesystem links to that canonical directory. Never create duplicate skill copies under an agent-specific directory.

Use the appropriate format-specific skill:

* DOCX → Word skill
* PPTX → PowerPoint skill
* XLSX → Excel skill
* PDF → PDF skill

Keep format-specific styling and implementation rules out of this file.

## Files

Work is split by owner at the top level:

* `Jinsu/` — personal work
* `Teia/` — company work

Organize work by project under `<owner>/projects/<project-name>/`:

* `source/` — original inputs
* `working/` — editable work
* `final/` — completed deliverables

Approved templates live in `templates/<format>/` — check there before designing a layout from scratch.

Use descriptive lowercase kebab-case filenames.

## Quality

Before delivery:

* verify content and calculations
* verify sources
* check layout and visual consistency
* visually inspect the final artifact

Produce the simplest artifact that fully communicates the required information.
