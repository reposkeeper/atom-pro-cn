# Atom Pro CN Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, validate, commit, and publish a modern Obsidian theme package named Atom Pro CN.

**Architecture:** The repository is a single Obsidian theme package rooted at the workspace. `theme.css` contains the theme implementation using modern Obsidian CSS variables first, with shallow compatibility selectors only where variables are insufficient. A small local validation script verifies package metadata, CSS guardrails, and required files before commit and push.

**Tech Stack:** Obsidian theme CSS, JSON theme metadata, Markdown documentation, Node.js validation script, git, GitHub CLI.

---

### Task 1: Initialize Repository Hygiene

**Files:**
- Create: `.gitignore`
- Create: `docs/superpowers/plans/2026-06-15-atom-pro-cn-implementation.md`

- [ ] **Step 1: Initialize git if needed**

Run:

```bash
git rev-parse --is-inside-work-tree || git init
```

Expected: if the workspace is not already a repository, git creates `.git`.

- [ ] **Step 2: Add repository ignore rules**

Create `.gitignore`:

```gitignore
.DS_Store
.superpowers/
node_modules/
dist/
*.log
```

- [ ] **Step 3: Verify git status**

Run:

```bash
git status --short
```

Expected: repository shows planned source files as untracked; `.superpowers/` is ignored.

### Task 2: Create Theme Metadata And Documentation

**Files:**
- Create: `manifest.json`
- Create: `versions.json`
- Create: `README.md`
- Create: `LICENSE`

- [ ] **Step 1: Write manifest**

Create `manifest.json`:

```json
{
  "name": "Atom Pro CN",
  "version": "1.0.0",
  "minAppVersion": "1.9.10",
  "author": "Reposkeeper"
}
```

- [ ] **Step 2: Write versions map**

Create `versions.json`:

```json
{
  "1.0.0": "1.9.10"
}
```

- [ ] **Step 3: Write README**

Create `README.md` describing the theme, installation, Chinese typography defaults, and validation.

- [ ] **Step 4: Write license**

Create `LICENSE` using MIT license text with copyright year `2026` and author `Reposkeeper`.

### Task 3: Implement Theme CSS

**Files:**
- Create: `theme.css`

- [ ] **Step 1: Add theme foundation**

Create the top sections in `theme.css`: metadata comment, shared foundation variables, dark palette, light palette.

- [ ] **Step 2: Add Chinese typography**

Add Chinese balanced defaults for body text, headings, paragraphs, lists, nested lists, task lists, blockquotes, tables, and inline title.

- [ ] **Step 3: Add code highlighting**

Map Atom colors into modern `--code-*` variables and add minimal compatibility selectors for reading and editing code tokens.

- [ ] **Step 4: Add workspace and modern surfaces**

Add variable coverage for tags, callouts, properties, navigation, tabs, ribbon, status bar, search, Canvas, Graph, and Bases.

- [ ] **Step 5: Keep compatibility shallow**

Only add selectors that are low-specificity, component-scoped, and avoid `!important` and `:has()`.

### Task 4: Add Validation And Sample Content

**Files:**
- Create: `scripts/validate-theme.mjs`
- Create: `samples/chinese-typography-sample.md`

- [ ] **Step 1: Add validation script**

Create `scripts/validate-theme.mjs` to:

```js
import fs from "node:fs";

const requiredFiles = ["manifest.json", "versions.json", "theme.css", "README.md", "LICENSE"];
const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`Missing required file: ${file}`);
}

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const versions = JSON.parse(fs.readFileSync("versions.json", "utf8"));
const css = fs.readFileSync("theme.css", "utf8");

for (const key of ["name", "version", "minAppVersion", "author"]) {
  if (!manifest[key]) failures.push(`manifest.json missing ${key}`);
}

if (!/^\\d+\\.\\d+\\.\\d+$/.test(manifest.version)) {
  failures.push("manifest.json version must be x.y.z");
}

if (versions[manifest.version] !== manifest.minAppVersion) {
  failures.push("versions.json must map manifest version to minAppVersion");
}

for (const needle of [".theme-dark", ".theme-light", "--line-height-normal", "--p-spacing", "--list-spacing", "--code-keyword", "--bases-table-row-height", "--canvas-background"]) {
  if (!css.includes(needle)) failures.push(`theme.css missing ${needle}`);
}

if (/!important/.test(css)) failures.push("theme.css should not use !important");
if (/:has\\(/.test(css)) failures.push("theme.css should not use :has()");
if (/url\\(\\s*['\"]?https?:\\/\\//i.test(css)) failures.push("theme.css should not load remote assets");

if (failures.length) {
  console.error(failures.join("\\n"));
  process.exit(1);
}

console.log("Theme validation passed.");
```

- [ ] **Step 2: Add sample note**

Create a Markdown sample covering Chinese headings, paragraphs, nested lists, task lists, blockquotes, callouts, tables, properties, tags, inline code, and fenced code.

- [ ] **Step 3: Run validation**

Run:

```bash
node scripts/validate-theme.mjs
```

Expected: `Theme validation passed.`

### Task 5: Commit And Publish

**Files:**
- Modify: local git repository metadata

- [ ] **Step 1: Inspect status**

Run:

```bash
git status -sb
```

Expected: all created project files are visible; `.superpowers/` is ignored.

- [ ] **Step 2: Stage intended files**

Run:

```bash
git add .gitignore LICENSE README.md manifest.json theme.css versions.json scripts/validate-theme.mjs samples/chinese-typography-sample.md docs/superpowers/specs/2026-06-15-atom-pro-cn-design.md docs/superpowers/plans/2026-06-15-atom-pro-cn-implementation.md
```

- [ ] **Step 3: Commit**

Run:

```bash
git commit -m "feat: add Atom Pro CN theme"
```

- [ ] **Step 4: Create GitHub repository**

Run:

```bash
gh repo create atom-pro-cn --public --source=. --remote=origin --push
```

Expected: GitHub CLI creates the remote repository, sets `origin`, and pushes the default branch.

- [ ] **Step 5: Verify remote**

Run:

```bash
git remote -v
git status -sb
```

Expected: `origin` points to the new GitHub repository and local branch is clean/up to date.

## Self-Review

- Spec coverage: theme package files, CSS variable-first implementation, Chinese typography, Atom palettes, modern components, validation, git initialization, and GitHub push are covered.
- Placeholder scan: no placeholders remain in the implementation steps.
- Type consistency: file names and metadata values are consistent across manifest, versions, validation, and publish steps.
