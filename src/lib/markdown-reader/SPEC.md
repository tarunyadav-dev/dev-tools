# DevTools Markdown Specification v1

A documentation format designed to be:

1. **Easy to write by hand** — authors shouldn't need a manual to write a page.
2. **Easy to parse with code** — the grammar stays simple enough for a hand-written lexer/parser (no `remark`/`rehype`/`unified` required).
3. **Easy to extend for years** — new features are added as new directives, never by inventing new ad-hoc syntax.

This document is the single source of truth for the markdown dialect and the engine that renders it. Part 1 defines the authoring rules. Part 2 defines the engine architecture that turns this markdown into React components.

---

## Part 1 — Markdown Rules

### 1. Document Structure

Every document represents **one library or one topic**. Never combine multiple libraries into a single file.

- Exactly **one H1** per document, and it must be the first line of content.
- Never use a second H1.

```md
# React Flow
```

**File naming**

- Always lowercase, kebab-case: `react-flow.md`, `lucide-react.md`, `tailwind-css.md`.
- Never uppercase, never spaces.
- One library = one markdown file. Never hardcode a library's name inside prose that should instead reference another doc via a directive/link (e.g. don't write "Next Library" as plain text — link to it).

### 2. Sections (H2)

H2 headings define the document's top-level sections. These drive the sidebar, search indexing, scroll-spy, and the URL hash.

```md
## Installation

## Basic Usage

## Components

## Best Practices

## Resources
```

Each H2 becomes an anchor, e.g. `## Installation` → `/react-flow#installation`.

### 3. Subsections (H3)

```md
### npm

### pnpm

### yarn
```

### 4. Sub-subsections (H4)

Allowed, but rare. Not part of sidebar/TOC generation (see §41).

### 5. Paragraphs

Standard markdown paragraphs.

### 6. Lists

```md
- Item
- Item
- Item
```

### 7. Ordered Lists

```md
1. First
2. Second
3. Third
```

### 8. Tables

Standard markdown tables.

```md
| Name | Description |
| ---- | ----------- |
| foo  | bar          |
```

### 9. Images

Standard markdown image syntax. The renderer for images can be swapped later without changing the authoring syntax.

```md
![React Flow](image.png)
```

### 10. Links

**Internal** links reference another doc by slug:

```md
[React](react)
```

**External** links are bare URLs:

```md
https://react.dev
```

### 11. Code Blocks

Standard fenced code blocks with a language tag.

````md
```tsx
const x = 1;
```
````

Supported languages: `tsx`, `jsx`, `ts`, `js`, `python`, `cpp`, `bash`, `json`, `css`, `html`, `sql`.

### 12. Blockquotes

```md
> Important
```

### 13. Horizontal Rule

```md
---
```

Use between major topics.

### 14. Inline Code

Standard backtick inline code, e.g. `` `useState` ``.

### 15. Keyboard Keys

Standard HTML `<kbd>` tags — no custom syntax needed.

```md
Press <kbd>Ctrl</kbd> + <kbd>C</kbd>
```

### 16. Checklists

```md
- [x] Installation
- [ ] Advanced usage
```

Used to render progress indicators.

---

## Part 2 — Custom Directives

Directives are the *only* extension mechanism. All custom blocks use the same fenced syntax:

```md
:::directive

content

:::
```

Example:

```md
:::tip

Always import individual icons.

:::
```

**Rule:** Never invent new markdown syntax. If something new is needed, add a new directive name — the fence syntax itself never changes. This keeps the grammar stable while the vocabulary of directives grows.

### Directive reference

| Directive | Purpose | Body format |
| --- | --- | --- |
| `tip` | Helpful suggestion | Free text |
| `warning` | Caution the reader | Free text |
| `danger` | Breaking change / high-risk callout | Free text |
| `note` | Neutral supplementary info | Free text |
| `success` | Positive confirmation | Free text |
| `install` | One or more install commands | See §Install |
| `related` | Related libraries | One item per line |
| `resources` | External reference links | Title + URL pairs |
| `video` | Embedded video player | A single URL |
| `demo` | Loads a live React example by name | A single identifier |
| `playground` | Reserved for a future interactive playground | A single identifier |
| `component` | Reserved for embedding a future custom React component | A single identifier |
| `tree` | Renders a pretty file tree | Plain-text tree |
| `folder` | Marks a single folder reference | Plain text |
| `tabs` | Tabbed content | `=== Label` sections |
| `badge` | Small label, e.g. difficulty | Free text |
| `version` | Version marker, e.g. "React 19" | Free text |

#### Install

Single command:

```md
:::install

npm install reactflow

:::
```

Multiple package managers become automatic tabs — each tab is a manager name on its own line, followed by its command:

```md
:::install

npm
npm install reactflow

pnpm
pnpm add reactflow

yarn
yarn add reactflow

:::
```

The renderer later adds a package icon and a copy button automatically — authors never write those.

#### Related

One library identifier per line; rendered as cards.

```md
:::related

react-flow
lucide-react

:::
```

#### Resources

Alternating title/URL pairs, rendered as cards.

```md
:::resources

Official Docs
https://example.com/docs

GitHub
https://github.com/example/example

:::
```

#### Tree

```md
:::tree

src/
 ├── app/
 └── components/

:::
```

#### Tabs

Sections are separated with `=== Label`.

```md
:::tabs

=== React

content for the React tab

=== Vue

content for the Vue tab

:::
```

#### Video

```md
:::video

https://youtube.com/watch?v=example

:::
```

#### Demo / Playground / Component

These reference an identifier that the host app resolves to a live React component. The markdown only carries the identifier — never inline code for the demo itself.

```md
:::demo

basic-example

:::
```

### Reserved for later (not implemented in v1)

These are documented now so the syntax never has to change when they're implemented, but engines are not required to render them yet:

- **Mermaid diagrams** — a fenced code block with the `mermaid` language tag.
  ````md
  ```mermaid
  graph LR
  A-->B
  ```
  ````
- **Math** — `$$ ... $$` blocks.
- **API Table** — no new syntax; just a standard markdown table under a `## API` section.

---

## Part 3 — Derived Behavior

These are computed by the engine, never authored by hand.

### Table of Contents (TOC)

Generated automatically from `##` and `###` headings only (H1 and H4 are excluded). Each TOC entry has:

- `title`
- `slug`
- `depth`

### Sidebar

Generated from the same heading set as the TOC (`##` and `###` only). Nothing else contributes to the sidebar.

### Anchors / Slugs

Every heading gets a slug automatically, generated by lowercasing, trimming, and hyphenating:

```
React Flow → react-flow
Installation → installation
```

Anchors follow the same rule: `## Installation` → `#installation`.

### Search Index

The search index is built from the AST, not raw text. It **includes**:

- Title (H1)
- Headings (H2, H3)
- Paragraphs
- Lists
- Tables
- `warning` / `tip` / `note` / `success` directive bodies
- `install` directive content
- `resources` directive content

It **excludes**:

- Code blocks (both fenced code and inline code)

### Reading Time

Calculated automatically from word count — never authored.

### Previous / Next

Generated automatically from the surrounding document order (defined outside the markdown, in metadata/navigation config).

### Breadcrumb

Generated from JSON navigation metadata, not from the markdown file itself.

### Metadata

Anything that isn't content — title overrides, ordering, category, tags, publish date — lives in a JSON metadata file alongside the markdown, never inside the markdown body.

---

## Part 4 — Engine Architecture

The engine that consumes this markdown is a small compiler, not a text-replacement script. It is intentionally split into independent stages so each one can be tested, replaced, or extended without touching the others.

```
Markdown
   │
   ▼
 Lexer   → tokenizes raw text into a flat token stream
   │
   ▼
 Tokens
   │
   ▼
 Parser  → consumes tokens, produces an AST
   │
   ▼
  AST
   │
   ▼
Renderer → walks the AST, renders React components
   │
   ▼
React Components
```

**Separation of concerns**

- The **lexer** only tokenizes. It has no knowledge of directives' meaning, tables, or rendering.
- The **parser** only builds the AST from tokens. It has no knowledge of React.
- The **renderer** only renders. It has no knowledge of markdown syntax — it operates purely on the AST via `switch (node.type)`.
- **TOC** and **search** both operate on the finished AST — they never re-parse markdown themselves.
- The **slug generator** and general **utilities** are pure, standalone functions with no dependency on the pipeline.

No stage reaches backward into an earlier stage. This keeps the pipeline a single forward pass: one lexer pass, one parser pass, independent rendering.

### AST node types (v1 + reserved)

Every markdown construct and directive becomes a discriminated-union AST node (e.g. `{ type: "heading", depth, ... }`). The full node vocabulary the engine's types must account for:

Heading, Paragraph, List, Ordered List, Table, Image, Link, Code, Blockquote, Horizontal Rule, Tip, Warning, Note, Danger, Success, Install, Related, Resources, Video, Demo, Tabs, Tree, Folder, Badge, Version, Checklist, Component, Playground, Mermaid, Math, API Table.

Each directive node renders through its own dedicated React component (e.g. `Tip.tsx`, `Warning.tsx`, `Install.tsx`, `Tabs.tsx`) — the renderer never special-cases directive markup inline.

### Extensibility

New directives must be addable without modifying the core parser. The engine exposes a plugin/registration API, e.g.:

```ts
registerDirective("callout", { ... });
```

This is what lets the vocabulary in Part 2 grow over time while the fence syntax (`:::name ... :::`) stays fixed forever.

### Error Handling

The parser surfaces actionable errors rather than failing silently or producing malformed output, for at least:

- Unknown directive
- Unclosed directive
- Broken code block (unterminated fence)
- Broken table (misaligned columns / missing header separator)
- Invalid tabs (missing `=== Label` markers)
- Invalid install block (malformed manager/command pairing)

---

## Part 5 — v1 Scope Recommendation

Implementing every directive in Part 2 on day one is not necessary and slows down shipping. The recommended v1 cut is:

- `#`, `##`, `###`
- Paragraphs, lists, ordered lists
- Code blocks
- Tables
- `:::tip`
- `:::warning`
- `:::note`
- `:::install`
- `:::related`

Everything else in this spec — `success`, `resources`, `video`, `demo`, `playground`, `component`, `tree`, `folder`, `tabs`, `badge`, `version`, mermaid, math — can be added later purely as new directive registrations, without ever changing already-published documents or the core grammar.
