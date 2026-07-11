# docs-engine

A hand-written Markdown → AST → React documentation engine for Next.js.

No `remark`. No `rehype`. No `unified`. Every stage — lexer, parser,
renderer, table of contents, search index — is plain TypeScript you can
read top to bottom.

## Pipeline

```
Markdown → Lexer → Tokens → Parser → AST → Renderer → React Components
```

Each stage is independent and single-purpose:

| Stage | File | Responsibility |
| --- | --- | --- |
| Lexer | `lexer.ts` | Raw text → flat token stream. Only tokenizes, one pass. |
| Parser | `parser.ts` | Tokens → AST (`DocNode[]`). Groups tokens, resolves directives via the plugin registry. |
| Renderer | `renderer.tsx` | AST → React elements. Pure `switch (node.type)` dispatch, one component per node type. |
| TOC | `toc.ts` | AST → table of contents / sidebar / prev-next / breadcrumbs. |
| Search | `search.ts` | AST → flat searchable index (code blocks excluded). |
| Slug | `slug.ts` | Standalone slug generation, no pipeline dependency. |

## Install

Copy `src/lib/docs-engine/` into your Next.js app (e.g. as
`src/lib/docs-engine/`), or publish this folder as its own package and
`npm install docs-engine`. Tailwind CSS must already be configured in the
host app — every component uses Tailwind utility classes and nothing else.

## Usage (Next.js App Router)

```tsx
// app/[slug]/page.tsx
import { parseMarkdown, DocsRenderer, generateToc } from "@/lib/docs-engine";
import fs from "node:fs/promises";
import path from "node:path";

export default async function DocPage({ params }: { params: { slug: string } }) {
  const source = await fs.readFile(
    path.join(process.cwd(), "content", `${params.slug}.md`),
    "utf-8",
  );
  const { ast, errors } = parseMarkdown(source);

  if (errors.length > 0) {
    console.warn(`Parse warnings in ${params.slug}.md:`, errors);
  }

  const toc = generateToc(ast);

  return (
    <div className="flex gap-8">
      <DocsRenderer ast={ast} />
      <aside className="hidden w-56 shrink-0 lg:block">
        <nav className="sticky top-20 space-y-1 text-sm">
          {toc.map((entry) => (
            <a
              key={entry.slug}
              href={`#${entry.slug}`}
              className={entry.depth === 3 ? "block pl-4 text-slate-500" : "block font-medium text-slate-700"}
            >
              {entry.title}
            </a>
          ))}
        </nav>
      </aside>
    </div>
  );
}
```

### One-call shortcut

```tsx
import { renderMarkdown } from "@/lib/docs-engine";

export default function Page() {
  return renderMarkdown(source);
}
```

### Search

```ts
import { parseMarkdown, buildSearchIndex, searchIndex } from "@/lib/docs-engine";

const { ast } = parseMarkdown(source);
const index = buildSearchIndex(ast, "React Flow");
const results = searchIndex(index, "installation");
```

### Live demos inside markdown

`:::demo`, `:::playground`, and `:::component` reference an id that *you*
resolve to a real component:

```tsx
import BasicExample from "@/components/demos/BasicExample";

<DocsRenderer ast={ast} demoRegistry={{ "basic-example": BasicExample }} />;
```

```md
:::demo

basic-example

:::
```

### Extending with new directives

The parser never needs to change to support a new directive:

```ts
import { registerDirective } from "@/lib/docs-engine";

registerDirective({
  name: "callout",
  parse: (body, parseBlock) => [
    { type: "note", children: parseBlock(body) }, // reuse an existing node type,
    // or extend DocNode in types.ts + add a case in renderer.tsx for a
    // brand new node type.
  ],
});
```

## Supported syntax

See `SPEC.md` in this folder for the full authoring specification (also
mirrored at `docs/devtools-markdown-specification.md` in the workspace this
was generated from).

Standard markdown: `#`/`##`/`###`/`####`, paragraphs, lists, ordered lists,
tables, images, links, fenced code blocks, blockquotes, horizontal rules,
inline code, `<kbd>`, checklists.

Directives: `:::tip`, `:::warning`, `:::danger`, `:::note`, `:::success`,
`:::install` (single or multi-manager), `:::related`, `:::resources`,
`:::video`, `:::demo`, `:::playground`, `:::component`, `:::tree`,
`:::folder`, `:::tabs` (with `=== Label` sections), `:::badge`,
`:::version`.

## Error handling

`parseMarkdown` never throws for authoring mistakes — it returns
`{ ast, errors }`. Error codes: `UNKNOWN_DIRECTIVE`, `UNCLOSED_DIRECTIVE`,
`BROKEN_CODE_BLOCK`, `BROKEN_TABLE`, `INVALID_TABS`, `INVALID_INSTALL`,
`MULTIPLE_H1`.

## Folder structure

```
src/lib/docs-engine/
├── index.ts              barrel export + renderMarkdown() shortcut
├── types.ts               AST node types (discriminated union)
├── tokens.ts               lexer token types
├── lexer.ts                markdown -> tokens
├── parser.ts                tokens -> AST
├── renderer.tsx              AST -> React
├── rules.ts                   line-matching regexes
├── utils.ts                    text helpers (plain-text extraction, reading time)
├── errors.ts                    parse error types + formatting
├── constants.ts                   fixed vocabulary (directive names, languages)
├── toc.ts                          TOC / sidebar / prev-next / breadcrumb
├── search.ts                        search index builder
├── slug.ts                           slug generator
├── directives/
│   ├── registry.ts                     registerDirective() plugin system
│   └── coreDirectives.ts                 v1 directive registrations
├── components/                             one React component per node type
├── helpers/
│   ├── inline.ts                             inline markdown (bold/italic/code/links)
│   └── readingTime.ts
└── README.md
```
