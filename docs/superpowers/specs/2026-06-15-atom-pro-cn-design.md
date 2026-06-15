# Atom Pro CN Theme Design

## Summary

Atom Pro CN is a modern Obsidian theme based on the visual DNA of Atom One Dark and Atom One Light, rebuilt for the current Obsidian CSS variable system. The theme prioritizes Chinese reading and writing rhythm while preserving Atom's calm engineering feel and strong code highlighting.

The default typography direction is "Chinese balanced": comfortable for long Chinese notes, still dense enough for technical notes, meeting notes, task lists, and mixed Chinese-English/code writing.

## Sources And Constraints

The design follows current Obsidian theme guidance:

- A theme package is centered on `manifest.json` and `theme.css`.
- Use Obsidian CSS variables wherever possible.
- Put general variables under `body`; put color-scheme-specific variables under `.theme-dark` and `.theme-light`.
- Keep selectors low-specificity and avoid brittle DOM-depth selectors.
- Avoid `!important`.
- Avoid remote fonts, images, or other network-loaded assets.
- Avoid `:has()` unless absolutely necessary.
- Release-ready themes should include `README.md`, `LICENSE`, a screenshot or thumbnail, `manifest.json`, and `theme.css`.

The current workspace is not a git repository, so this design document is written without a commit.

## Theme Direction

The chosen direction is **Modern variable-first**:

- Use Atom's colors as the design foundation.
- Rewrite the theme around modern Obsidian variables such as `--color-*`, `--background-*`, `--text-*`, `--interactive-*`, `--code-*`, `--callout-*`, `--table-*`, `--bases-*`, and `--canvas-*`.
- Keep compatibility selectors minimal and shallow.
- Treat the old Atom theme's Prism and CodeMirror selectors as reference material, not as the primary implementation.

This avoids carrying forward older theme patterns that rely heavily on specific selectors and `!important` declarations.

## Package Structure

The first implementation should create these files:

- `manifest.json`: theme name, semantic version, minimum Obsidian version, author metadata.
- `theme.css`: all theme variables and minimal compatibility selectors.
- `README.md`: positioning, installation, Chinese typography notes, compatibility notes.
- `versions.json`: theme version to minimum Obsidian version mapping.
- `LICENSE`: default to MIT unless the user chooses another license.

Screenshots or thumbnails can be added after the visual direction stabilizes.

## CSS Organization

`theme.css` should be organized in this order:

1. Theme metadata comment.
2. Shared foundation variables.
3. Dark palette.
4. Light palette.
5. Chinese typography defaults.
6. Editor content: headings, paragraphs, lists, blockquotes, links, tags, tables.
7. Code and syntax highlighting.
8. Workspace UI: ribbon, tabs, sidebars, status bar, navigation, search.
9. Modern Obsidian surfaces: Callouts, Properties, Bases, Canvas, Graph.
10. Minimal compatibility selectors.

## Color System

### Dark Mode

Dark mode should stay close to Atom One Dark:

- Primary background: deep blue-gray, near `#272b34`.
- Secondary background: deeper panel blue-gray, near `#20242b` and `#1a1e24`.
- Text: soft light gray, avoiding pure white.
- Accent: Atom blue for links, focus states, selected navigation, and primary interactions.
- Extended colors: Atom red, orange, yellow, green, cyan, purple, and blue for code, callouts, Canvas cards, and graph nodes.

### Light Mode

Light mode should stay close to Atom One Light:

- Primary background: soft off-white/light gray, not harsh pure white.
- Secondary surfaces: subtle gray layering.
- Text: deep gray instead of absolute black.
- Accent: clear blue for links and interaction states.

### Variable Mapping

Atom colors should map into Obsidian semantic variables:

- Base surfaces: `--color-base-*`, `--background-primary`, `--background-secondary`, `--background-primary-alt`, `--background-secondary-alt`.
- Text: `--text-normal`, `--text-muted`, `--text-faint`, `--text-accent`, `--text-accent-hover`, `--text-on-accent`.
- Interactions: `--interactive-normal`, `--interactive-hover`, `--interactive-accent`, `--interactive-accent-hover`.
- Extended colors: `--color-red`, `--color-orange`, `--color-yellow`, `--color-green`, `--color-cyan`, `--color-blue`, `--color-purple`, and their RGB variants where useful.

## Chinese Typography

Chinese typography is a primary feature, not a polish pass.

### Font Stack

Use local/system fonts only. The default text font stack should prefer system UI fonts and common Chinese fonts, roughly:

```css
-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif
```

The theme should not bundle or remotely load fonts in the first version.

### Body Text

- Preserve the user's Obsidian font-size preference where possible.
- Set normal reading line height around `1.9`.
- Keep editing and reading views visually close.
- Use paragraph spacing around `0.9em` to `1.05em`.
- Avoid turning Chinese pages into dense gray blocks.

Likely variables and selectors:

- `--line-height-normal`
- `--p-spacing`
- shallow `.markdown-rendered p` and editor equivalents only if variables cannot express the desired spacing.

### Headings

- Use restrained heading sizes.
- Prefer weight, color, and spacing to oversized typography.
- Chinese heading line height should sit around `1.35` to `1.45`.
- H1/H2 need stronger top spacing than lower levels, but should not create landing-page-like gaps.

Likely variables:

- `--heading-spacing`
- `--h1-line-height` through `--h6-line-height`
- `--h1-weight` through `--h6-weight`

### Lists

Lists require special handling for Chinese notes:

- Overall list block spacing should be slightly smaller than paragraph spacing.
- Top-level list item spacing should sit around `0.4em` to `0.5em`.
- Multi-line list items should retain normal Chinese line height.
- Nested lists should tighten progressively to avoid large stair-step gaps.
- Task lists should feel operational and not overly airy.

Likely variables and shallow selectors:

- `--list-spacing`
- `--list-indent`
- `.markdown-rendered li`
- `.markdown-rendered li > p`
- editor equivalents where needed.

### Blockquotes

- Use Atom blue/cyan as a restrained left border.
- Keep Chinese reading line height inside quotes.
- Slightly tighten paragraph spacing inside quotes.
- Avoid heavy quote backgrounds.

Likely variables:

- `--blockquote-border-color`
- `--blockquote-border-thickness`
- `--blockquote-background-color`
- `--blockquote-color`

### Callouts

- Preserve Obsidian semantic callout colors.
- Reduce background saturation so Chinese text remains dominant.
- Use border and icon color for meaning.
- Keep paragraph and list rhythm inside callouts close to normal text, slightly tighter if needed.

### Code

Code is a signature feature inherited from Atom:

- Prefer modern `--code-*` variables for syntax colors.
- Keep code block backgrounds one step away from normal surfaces.
- Inline code should be subtle and should not interrupt Chinese sentence rhythm.
- Add only minimal compatibility selectors for Prism/CodeMirror where needed.

Important variables:

- `--code-background`
- `--code-normal`
- `--code-comment`
- `--code-function`
- `--code-important`
- `--code-keyword`
- `--code-operator`
- `--code-property`
- `--code-punctuation`
- `--code-string`
- `--code-tag`
- `--code-value`
- `--code-size`

### Tables And Data Surfaces

Tables should be denser than prose:

- Table line height around `1.55` to `1.65`.
- Clear but quiet header background.
- Light row borders.
- Hover states visible but not loud.

Bases should follow a productivity-tool density rather than prose spacing.

## Component Scope

The first implementation should cover:

- Editor text and reading view.
- Inline title.
- Headings.
- Paragraphs.
- Lists and task lists.
- Blockquotes.
- Links.
- Tags.
- Tables.
- Inline code and code blocks.
- Syntax highlighting.
- Callouts.
- Properties.
- File explorer.
- Search.
- Navigation.
- Ribbon.
- Workspace tabs.
- Status bar.
- Canvas.
- Graph.
- Bases.

The first version should not attempt to theme every community plugin.

## Style Settings Strategy

The first implementation should not start with a large Style Settings surface. It should prioritize a good default.

However, the CSS should be structured so later settings can expose:

- Typography density: compact, balanced, spacious.
- Code font size.
- Optional stronger/lighter UI contrast.
- Optional roundedness.

If Style Settings are added in a later phase, they should be limited to variables that users are likely to adjust repeatedly.

## Compatibility Strategy

Compatibility rules:

- Prefer Obsidian variables.
- Use shallow selectors only when variables cannot express the target.
- Avoid `!important`.
- Avoid `:has()`.
- Avoid remote resources.
- Keep old Atom selector patterns out of the main theme body.
- Keep selectors grouped and commented by component so future maintenance is straightforward.

## Verification Plan

Use a sample Markdown document containing:

- Chinese headings from H1 to H6.
- Chinese paragraphs of different lengths.
- Chinese-English mixed paragraphs.
- Inline code inside Chinese sentences.
- Links inside Chinese paragraphs.
- Ordered and unordered lists.
- Nested lists.
- Task lists.
- Blockquotes.
- Callouts.
- Tables.
- Code blocks with several languages.
- Tags and properties.

Checks:

- CSS parses without syntax errors.
- `manifest.json` matches Obsidian theme schema.
- `versions.json` maps the initial version to the chosen minimum Obsidian version.
- No remote resources are loaded.
- No unnecessary `!important`.
- No `:has()` unless explicitly justified.
- Reading and editing views have similar Chinese rhythm.
- Lists do not look either cramped or over-expanded.
- Code highlighting keeps the Atom feel.
- Bases and tables remain dense enough for work.

## Implementation Defaults

Use these defaults unless the user overrides them before implementation:

- Theme name: `Atom Pro CN`.
- Initial version: `1.0.0`.
- Initial `minAppVersion`: `1.9.10`, because Bases became public in Obsidian 1.9.10 and this theme explicitly covers Bases.
- Author: use `Reposkeeper` as the local default, unless the user provides another name.
- Thumbnail: defer until the theme is visually tested in Obsidian.

## Approved Direction

The user approved:

- Direction: Atom Pro.
- Primary improvement: Chinese layout and typography.
- Default typography density: Chinese balanced.
- Implementation route: modern variable-first.
- Scope: full first-version theme package, with Style Settings deferred.
