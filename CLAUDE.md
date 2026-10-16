# Document production

Create clear, accurate, and professional document artifacts.

Supported formats:

* Markdown
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

## Identity

Before creating a new user-facing document or intentionally redesigning an existing one, read and follow `identity/STYLE.md`.

Do not apply the identity guide to extraction, conversion, analysis, or minor edits that should preserve an existing style. Explicit user instructions and approved project templates take precedence.

## Format rules

Reusable, agent-neutral skills live in `skills/`.

Agent-specific discovery paths such as `.claude/skills` and `.agents/skills` are filesystem links to that canonical directory. Never create duplicate skill copies under an agent-specific directory.

Use the appropriate format-specific skill:

* Markdown → Markdown Docs skill
* DOCX → Word skill
* PPTX → PowerPoint skill
* XLSX → Excel skill
* PDF → PDF skill

Keep format-specific styling and implementation rules out of this file.

## Files

Work is split by owner at the top level:

* `Jinsu/` — personal work
* `Teia/` — company work

`Teia/` is local-only and excluded by `.gitignore`. This is a personal repository, so never stage, commit, or force-add company material, and never copy company content into `Jinsu/` or any other tracked path.

Inside an owner folder, organize work in two numbered levels:

* `<N>0.<Category>/` — main category, numbered by tens (`10.Project`, `20.Data`)
* `<N>0.<Category>/<N><n>.<Topic>/` — subcategory; its tens digit matches the parent (`10.Project/11.SPAS2.0`)

Do not place a subcategory number such as `21.` directly under an owner folder, and do not give a subcategory a tens number such as `30.`. Below the subcategory level, use descriptive folder names without numbers.

Example:

```
Teia/
├── README.md              # category index and numbering rules
├── 10.Project/
│   ├── README.md          # what belongs here and the subcategory list
│   ├── 11.SPAS2.0/
│   │   └── DB/            # no number below the subcategory level
│   └── 12.VCC/
└── 20.Data/
    ├── README.md
    ├── 21.RDB/
    └── 22.In-Memory/
```

Each owner folder and main category folder has a `README.md`. Every other folder that must exist before it has content gets a `.keep` file; under `Teia/` the file only marks intent, because the folder is not tracked.

When a folder holds a deliverable in progress, split it by stage:

* `source/` — original inputs
* `working/` — editable work
* `final/` — completed deliverables

Approved templates live in `templates/<format>/` — check there before designing a layout from scratch.

Use descriptive lowercase kebab-case filenames. Numbered folder names follow the `<number>.<Name>` pattern above.

## Quality

Before delivery:

* verify content and calculations
* verify sources
* check layout and visual consistency
* visually inspect the final artifact

Produce the simplest artifact that fully communicates the required information.
