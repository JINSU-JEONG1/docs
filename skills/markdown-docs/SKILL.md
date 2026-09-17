---
name: markdown-docs
description: Create, edit, restructure, or review Markdown documents when the primary deliverable is a .md file, such as a README, guide, note, specification, checklist, or project documentation. Do not use merely because a chat response or another document contains Markdown formatting.
---

# Markdown document production

Create clear, maintainable Markdown documents suited to their intended readers and repository.

## Workflow

1. Inspect the target file, nearby documentation, and applicable repository instructions before writing.
2. Read and apply `identity/STYLE.md` when it exists in the repository.
3. Determine the document's purpose, audience, Markdown flavor, and expected location from the request and repository context.
4. Preserve established terminology, heading conventions, link style, and frontmatter when editing an existing documentation set.
5. Use the smallest structure that communicates the content clearly.
6. Verify the completed file's structure, syntax, links, and referenced paths.

## Writing rules

- Follow the user's requested structure and tone. Otherwise, match nearby documentation.
- Use one level-one heading for a standalone document title. Omit it for fragments or systems that derive the title elsewhere.
- Start every standalone document with the title, a document information table, and a table of contents, in that order.
- Use `Version`, `Status`, `Updated`, and `Author` as the document information fields, translated to the document language when appropriate. Never invent unknown values; mark them clearly for confirmation.
- Start a new draft at `v0.1` unless the user or repository already defines another versioning scheme. Update the version, status, date, and author when the document changes according to the applicable project convention.
- Keep the table of contents concise. Include the main sections needed for navigation and use links compatible with the target Markdown renderer.
- Use an ordered list for the table of contents when section sequence matters. An ordered list numbers only the table of contents; Markdown does not automatically number headings.
- When section numbers must appear in the rendered headings as well as the table of contents, include the numbers explicitly in the heading text, such as `## 1. Scope` and `## 2. Usage`. Keep the numbering consistent with the table of contents.
- Mark unresolved information with the literal label `[확인 필요]` at the start of the sentence, list item, or table cell. Do not rely on color, emoji, or renderer-specific alerts to convey this status.
- Keep heading levels hierarchical and avoid empty sections.
- Prefer short paragraphs and descriptive headings.
- Use lists for genuine sequences or collections, not as a substitute for ordinary prose.
- Use tables only when repeated fields or exact comparisons are materially clearer in tabular form.
- Use fenced code blocks and include a language identifier when known.
- Use relative links for repository-local files and assets unless the target system requires another form.
- Add YAML frontmatter only when requested or already required by the surrounding documentation system.
- Preserve uncertainty. Never invent facts, commands, paths, citations, features, or project behavior.
- Do not add decorative badges, emojis, boilerplate sections, or excessive formatting unless requested or established by the repository.

Use the Markdown flavor already present in the project. When none is established, use broadly compatible CommonMark and GitHub Flavored Markdown features.

## Editing existing documents

- Preserve correct content and repository-specific conventions.
- Improve structure without silently changing meaning or scope.
- Do not replace a focused document with a generic template.
- Keep unrelated sections and user-authored wording unless revision is necessary for the request.
- Resolve placeholders and broken references only when the necessary information is available; otherwise identify them clearly.
- Avoid unrelated file edits.

## Validation

Before delivery:

- confirm the file is valid UTF-8
- check heading hierarchy, lists, tables, and code fences
- confirm repository-local links and referenced paths exist when they can be inspected
- remove accidental placeholders, empty sections, and trailing scaffolding
- review the rendered structure or a faithful preview when available
- confirm the resulting filename and location follow repository instructions
