# Document identity

Status: Draft. This file defines the shared identity of user-facing documents produced from this repository. Undecided values must not be inferred or presented as established preferences.

## Application

Apply this guide when creating a new user-facing document or intentionally redesigning an existing one.

Do not apply it to extraction, conversion, merging, analysis, or a minor edit that should preserve an existing document's style.

Precedence:

1. Explicit instructions for the current task
2. An approved project or format template
3. The established style of an existing document when redesign was not requested
4. This guide
5. Neutral, restrained defaults for any remaining undecided details

## Identity statement

| Decision | Direction |
|---|---|
| Core impression | Clear, structured, calm, and comfortable to read |
| Distinctive traits | Technical-document structure with a restrained grayscale and lavender visual system |
| Intended audiences | Readers of technical materials, internal reports, meeting notes, and explanatory documents |
| Qualities to avoid | Dense pages, ornamental or artistic presentation, generic corporate styling, excessive formality, navy-and-brass palettes |

## Voice and writing

| Decision | Direction |
|---|---|
| Tone | Conclusion-first Korean declarative style; direct and neutral without honorific expressions |
| Information density | Balanced: normally use about 65–75% of the available area for content and leave 25–35% as breathing room |
| Sentence and paragraph style | One judgment or action per sentence; one idea per paragraph; normally 2–4 sentences per paragraph |
| Terminology and naming | Prefer familiar, broadly understood words; use technical terms only when they improve precision and define them on first use when needed |
| Korean and English usage | Write explanations in Korean; preserve standard product names, identifiers, commands, code, and technical terms when translation would reduce precision |

### Writing rules

- Present the conclusion, recommendation, decision, or required action before supporting detail.
- Structure detail as conclusion → primary reasons → supporting evidence → references.
- Distinguish confirmed facts, analysis, recommendations, decisions, and unresolved items.
- Use `~다` for explanation and `~한다` for procedures. Do not use Korean honorific endings such as `~합니다`, `~드립니다`, or `~바랍니다`.
- Prefer short, ordinary words over bureaucratic expressions and abstract noun phrases.
- Place conditions and exceptions beside the statement they qualify.
- Make dates, quantities, units, owners, deadlines, and action items explicit.
- Ensure that titles and headings alone reveal the document's purpose and reasoning path.

## Visual system

| Decision | Direction |
|---|---|
| Primary colors | Cool grayscale: soft white, white, near-black, and neutral gray |
| Supporting and accent colors | A blue-gray lavender family used sparingly; reserve pale lavender for fills and dark lavender for text or high-contrast emphasis |
| Heading typography | Pretendard Bold or SemiBold |
| Body typography | Pretendard Regular |
| Spacing and margins | Balanced and slightly relaxed; preserve roughly 25–35% visual breathing room when the format permits |
| Shapes and recurring motifs | Modestly rounded information containers, orderly grids, and light dividers; avoid turning every section into a card |
| Icons, illustrations, and photography | Use simple linear icons and rich, purposeful visual material; give each visual one primary focal point rather than several competing effects |
| Tables and charts | Pale-lavender table headers, horizontal dividers, and charts that use lavender for the primary message and grayscale for comparison |

### Color roles

| Role | Color | Use |
|---|---|---|
| Page background | `#FAFAFC` | Default background when the format supports it |
| Surface | `#FFFFFF` | Cards, tables, and raised information areas |
| Primary text | `#202026` | Headings and body text |
| Secondary text | `#666672` | Captions, metadata, and supporting information |
| Divider | `#E5E3E9` | Borders, separators, and inactive structure |
| Pale lavender | `#ECE8F6` | Highlight fills, selected areas, and table-header fills |
| Lavender | `#8B72BE` | Icons, chart series, key numbers, and small accents |
| Dark lavender | `#60468F` | Links, emphasis text, and accessible accents on light backgrounds |

Keep grayscale at roughly 85–90% of the visual composition and lavender at roughly 10–15%. Do not use pale lavender as body text on a light background.

Semantic colors are exceptions to the grayscale-and-lavender system. Use them only when the status itself carries meaning.

| Status | Foreground | Pale fill |
|---|---|---|
| Success | `#3F7D68` | `#E5F1EC` |
| Warning | `#9A6424` | `#F7EEDB` |
| Error | `#A94F55` | `#F8E6E8` |
| Information | `#60468F` | `#ECE8F6` |

### Typography

- Use Pretendard across headings and body text; create hierarchy through size and weight rather than a second decorative typeface.
- Use Bold for document titles, SemiBold for section headings, and Regular for body and supporting text.
- Use a monospace typeface only for code, commands, paths, and fixed-width technical values.
- When Pretendard is unavailable and cannot be installed or embedded, use `Noto Sans KR`, then `Malgun Gothic`, as fallbacks and disclose the substitution for final artifacts.
- Do not use IBM Plex as a default identity typeface.

### Spacing and shapes

- Keep paragraphs to roughly 3–6 rendered lines when practical; split longer passages by idea rather than by arbitrary length.
- Use about 0.5–1 body-line of space between paragraphs and 1.5–2 body-lines before a section heading.
- Use modest corner radii: approximately 6–10 px for digital surfaces or an equivalent restrained radius in document formats.
- Prefer no shadow. When separation requires one, use a subtle shadow with low contrast.
- Do not combine extensive lavender fills, rounded cards, and shadows across every section; this produces a generic application-dashboard appearance.

### Tables

- Use `#ECE8F6` for the header fill, `#202026` for header text, and `#E5E3E9` for dividers.
- Prefer horizontal dividers and omit vertical grid lines unless they are necessary to follow a dense matrix.
- Keep ordinary body rows white. Use extremely subtle alternating row fills only when a long table is difficult to track horizontally.
- Align text to the left and numeric values to the right. Keep alignment consistent within each column.
- Use `#60468F`, bold weight, or a pale-lavender fill to emphasize important values; avoid stacking all three treatments without a reason.
- Apply modest rounding to an outer table container when the format supports it. Keep the internal grid square and orderly.
- Use semantic colors only for actual status values, warnings, or errors.

### Charts

- Use `#8B72BE` for the primary data series and `#60468F` for a selected or specially emphasized series.
- Use `#A8A6AF` for comparison data and `#D5D3DA` for baselines, historical context, or inactive series.
- When several categories must be distinguished, use a controlled lavender value scale before introducing unrelated colors.
- Reserve semantic colors for data that represents success, warning, error, or another real status.
- Use a white or soft-white background without a decorative frame, gradient, 3D treatment, or shadow.
- Minimize grid lines and axis decoration. Preserve only the structure necessary to read values accurately.
- Prefer direct labels to a separate legend when labels remain legible.
- Show data labels only for values needed to understand the chart's message.
- Give each chart one primary message and make the visual emphasis match that message.

### Icons

- Use simple linear icons with consistent stroke weight, rounded line endings, and restrained geometry.
- Use one approved icon family within a document. Do not mix unrelated outline, filled, duotone, 3D, or hand-drawn styles.
- Use `#202026` or `#666672` by default and reserve `#8B72BE` for meaningful emphasis.
- Use icons to improve navigation, recognition, or explanation. Do not attach an icon to every heading or paragraph as decoration.
- Avoid emojis, novelty symbols, ambiguous metaphors, and icons with unnecessary internal detail.
- Pair unfamiliar icons with a text label. Never rely on icon shape or color alone to communicate critical meaning.

### Images and diagrams

- Use photographs, screenshots, diagrams, and illustrations generously when they improve understanding, orientation, recall, or context.
- Prefer adding a useful visual to adding another explanatory paragraph. Do not merely place a visual beside text that repeats the same information in full.
- Give each visual one primary message and one visual focal point. Use only one distinctive accent, highlight, or stylistic kick within that visual.
- Keep the remaining elements quiet through grayscale, consistent line weight, simple shapes, and restrained lavender.
- Preserve the document's breathing room. A visual-rich document must not become a dense collage.
- Crop screenshots and photographs to the relevant content. Remove or redact private, confidential, and irrelevant information.
- Annotate screenshots with a limited sequence of numbers, arrows, or lavender highlights that follows the reader's task path.
- Build diagrams in a clear left-to-right or top-to-bottom flow. Avoid crossing connectors and place one concept in each node.
- Use lavender for the primary path or focal node and grayscale for supporting nodes and connectors.
- Use natural image treatment without strong filters, dramatic shadows, 3D effects, or multiple competing visual styles.
- Add concise captions, labels, alt text, and source information when they are needed to understand, verify, or access the visual.

## Format conventions

Record only decisions that differ by format or are necessary to preserve the shared identity.

### Markdown

Markdown documents must remain easy to scan as plain text and in a rendered view. Use the repository's established Markdown flavor; otherwise use portable CommonMark with GitHub Flavored Markdown features where they materially improve the document.

#### Structure

- Use one level-one heading for a standalone title and do not skip heading levels.
- Write headings that reveal the section's conclusion, subject, or reader task. Avoid vague headings such as `Overview` when a more informative label is available.
- For reports and explanatory documents, place a short conclusion, decision, or summary immediately after the title. Do not force this section into reference pages where readers arrive to look up a specific item.
- Organize for layered reading: title → conclusion or summary → descriptive section headings → supporting detail → references.
- Keep paragraphs to one idea and normally 2–4 sentences. Split a rendered paragraph that grows beyond roughly 3–6 lines when there is a natural idea boundary.
- Use lists for parallel items, steps, decisions, and action items. Prefer 3–7 items in one group and avoid nesting beyond two levels when another structure is clearer.
- Add a table of contents only when the document has enough sections or length to make navigation materially faster.

#### Information elements

- Use blockquotes with a bold plain-language label for portable callouts. The standard labels are `결론`, `결정`, `주의`, and `참고`.
- Write callouts in the portable form `> **레이블:** 내용`. Do not depend on GitHub alerts, Confluence panels, Jira status elements, or other platform-specific syntax.
- Keep a callout focused on one message and normally within 1–3 sentences. Use it for information that deserves interruption or immediate recognition, not for routine paragraphs.
- Use Markdown tables for comparisons and repeated fields, not for page layout. Split or restructure a table when its width makes ordinary reading difficult.
- Keep table labels short, align numeric columns consistently, and place the most important columns first.
- Use fenced code blocks with a language identifier. Separate commands, output, and explanatory text rather than mixing them in one block.
- Use inline code for commands, paths, identifiers, field names, and literal values—not for ordinary emphasis.
- Use descriptive link text. Prefer relative links for repository-local files and avoid bare URLs in prose when a meaningful label is available.
- Add images with useful alt text and a short caption or source line when context is not already clear. Store repository-owned visuals in an appropriate project or shared asset directory and link them relatively.

#### Visual identity and portability

- Do not use raw HTML, repeated inline styling, Unicode decoration, badges, or emoji merely to simulate the visual identity.
- Apply Pretendard, the grayscale-and-lavender palette, spacing, and callout appearance through an approved renderer, stylesheet, or export template when one exists.
- Keep the source readable without that renderer. Meaning must not depend on color, font, or visual placement alone.
- Add YAML frontmatter only when the documentation system requires it or the user requests it.
- Preserve UTF-8 and use LF or the repository's established line endings consistently.

#### Review

- Confirm that the title, opening summary, and section headings communicate the document's purpose and conclusion during a short scan.
- Check heading hierarchy, list numbering, table structure, code fences, image paths, and repository-local links.
- Preview the rendered result when a renderer is available, but also inspect the raw Markdown for maintainability.

### Word

Undecided.

### PowerPoint

Undecided.

### Excel

Undecided.

### PDF

Undecided.

## Templates and assets

- Approved templates live in `../templates/<format>/`.
- Shared fonts, logos, icons, and images live in `../assets/`.
- Record the purpose and preferred use of each approved template or asset here when it is added.
- Do not substitute an unavailable brand asset without making the substitution explicit.

## Identity review

Before delivering a document governed by this guide, confirm that it:

- follows every decided identity rule relevant to its format
- uses an approved template when one applies
- remains consistent across headings, body text, tables, charts, and supporting visuals
- avoids qualities explicitly listed under `Qualities to avoid`
- does not invent a preference for any item still marked `Undecided`
