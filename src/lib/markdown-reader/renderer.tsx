/**
 * renderer.tsx
 *
 * Stage 3 of the pipeline: `DocNode[]` -> React elements.
 *
 * The renderer ONLY renders. It has zero knowledge of markdown syntax --
 * it dispatches purely on `node.type` via a switch statement, and every
 * directive gets its own dedicated component under `components/`.
 */

import React from "react";
import type { DocNode } from "./types";
import { Heading } from "./components/Heading";
import { Paragraph } from "./components/Paragraph";
import { ListBlock } from "./components/ListBlock";
import { TableBlock } from "./components/TableBlock";
import { ImageBlock } from "./components/ImageBlock";
import { CodeBlock } from "./components/CodeBlock";
import { Blockquote } from "./components/Blockquote";
import { HorizontalRule } from "./components/HorizontalRule";
import { Callout, Badge, VersionTag } from "./components/Callout";
import { Install } from "./components/Install";
import { Related } from "./components/Related";
import { Resources } from "./components/Resources";
import { Video } from "./components/Video";
import { Demo, Playground, ComponentDirective, type DemoRegistry } from "./components/Demo";
import { Tree, Folder } from "./components/Tree";
import { Tabs } from "./components/Tabs";
import { Inline } from "./components/Inline";
import { inlineToPlainText } from "./utils";

export interface RenderOptions {
  /** Maps `:::demo` / `:::playground` / `:::component` ids to live components. */
  demoRegistry?: DemoRegistry;
}

/**
 * Renders a single AST node. This is the one place that knows how every
 * `DocNode` type maps to a component -- adding a new node type means adding
 * one case here and one component under `components/`.
 */
function renderNode(node: DocNode, key: number, options: RenderOptions): React.ReactNode {
  switch (node.type) {
    case "heading":
      return <Heading key={key} node={node} />;
    case "paragraph":
      return <Paragraph key={key} node={node} />;
    case "list":
      return <ListBlock key={key} node={node} />;
    case "table":
      return <TableBlock key={key} node={node} />;
    case "image":
      return <ImageBlock key={key} node={node} />;
    case "code":
      return <CodeBlock key={key} node={node} />;
    case "blockquote":
      return <Blockquote key={key} node={node} />;
    case "horizontalRule":
      return <HorizontalRule key={key} />;
    case "tip":
    case "warning":
    case "danger":
    case "note":
    case "success":
      return <Callout key={key} node={node} />;
    case "badge":
      return <Badge key={key} node={node} />;
    case "version":
      return <VersionTag key={key} node={node} />;
    case "install":
      return <Install key={key} node={node} />;
    case "related":
      return <Related key={key} node={node} />;
    case "resources":
      return <Resources key={key} node={node} />;
    case "video":
      return <Video key={key} node={node} />;
    case "demo":
      return <Demo key={key} node={node} registry={options.demoRegistry} />;
    case "playground":
      return <Playground key={key} node={node} registry={options.demoRegistry} />;
    case "component":
      return <ComponentDirective key={key} node={node} registry={options.demoRegistry} />;
    case "tree":
      return <Tree key={key} node={node} />;
    case "folder":
      return <Folder key={key} node={node} />;
    case "tabs":
      return <Tabs key={key} node={node} />;
    default: {
      // Exhaustiveness guard: if a new DocNode variant is added to types.ts
      // without a matching case above, this line fails to compile.
      const _exhaustive: never = node;
      return null;
    }
  }
}

/**
 * Renders a list of AST nodes. When `inline` is set, renders as flattened
 * inline content (used by Badge/VersionTag, which only ever hold text).
 */
export function NodeRenderer({
  nodes,
  options = {},
  inline = false,
}: {
  nodes: DocNode[];
  options?: RenderOptions;
  inline?: boolean;
}) {
  if (inline) {
    const text = nodes.map((n) => (n.type === "paragraph" ? inlineToPlainText(n.children) : "")).join(" ");
    return <Inline nodes={[{ type: "text", value: text }]} />;
  }
  return <>{nodes.map((node, i) => renderNode(node, i, options))}</>;
}

/**
 * Top-level renderer -- the main export most Next.js pages use directly.
 *
 * ```tsx
 * <DocsRenderer ast={ast} demoRegistry={{ "basic-example": BasicExample }} />
 * ```
 */
export function DocsRenderer({ ast, demoRegistry }: { ast: DocNode[]; demoRegistry?: DemoRegistry }) {
  return (
    <article className="prose-none mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <NodeRenderer nodes={ast} options={{ demoRegistry }} />
    </article>
  );
}
