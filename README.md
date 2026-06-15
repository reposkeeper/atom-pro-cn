# Atom Pro CN

Atom Pro CN is a modern Obsidian theme inspired by Atom One Dark and Atom One Light, rebuilt around current Obsidian CSS variables with Chinese typography as a first-class design goal.

The theme keeps Atom's calm editor feel, strong code highlighting, and low-friction workspace colors while improving Chinese reading rhythm for daily notes, technical writing, meeting notes, lists, and mixed Chinese-English/code documents.

## Features

- Modern variable-first Obsidian theme structure.
- Dark and light modes based on Atom One palettes.
- Balanced Chinese typography with comfortable line height and paragraph spacing.
- Special list spacing for Chinese notes, including nested lists and task lists.
- Atom-style syntax highlighting through modern `--code-*` variables.
- Coverage for Callouts, Properties, Bases, Canvas, Graph, file explorer, search, tabs, ribbon, and status bar.
- No remote fonts or images.
- No intentional `!important` or `:has()` usage.

## Installation

Manual installation:

1. Open your vault's `.obsidian/themes/` folder.
2. Create a folder named `Atom Pro CN`.
3. Copy `manifest.json` and `theme.css` into that folder.
4. Restart Obsidian if needed.
5. Open **Settings -> Appearance -> Themes** and select `Atom Pro CN`.

## Chinese Typography

The default density is **Chinese balanced**:

- Body line height is tuned around `1.9`.
- Paragraph spacing is present but not loose.
- List items have a clear pause between items.
- Nested lists tighten slightly to avoid large stair-step gaps.
- Tables and Bases stay denser than prose.
- Inline code is subtle enough to sit inside Chinese sentences.

The theme uses local system fonts only. It does not load remote font files.

## Development

Run the local validation script before committing changes:

```bash
node scripts/validate-theme.mjs
```

The sample note at `samples/chinese-typography-sample.md` covers common Chinese and mixed-content cases for visual testing inside Obsidian.

## Compatibility

Atom Pro CN targets Obsidian `1.9.10` and later because it includes styling for Bases, which became public in Obsidian 1.9.x.

## License

MIT
