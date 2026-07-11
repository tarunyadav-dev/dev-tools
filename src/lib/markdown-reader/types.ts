/**
 * types.ts
 *
 * All AST node shapes for the docs-engine, as a single discriminated union
 * (`DocNode`). The lexer/parser/renderer/toc/search modules all speak this
 * type -- it is the contract between every stage of the pipeline.
 */

/** Every inline-level fragment inside a paragraph, heading, list item, etc. */
export type InlineNode =
  | { type: "text"; value: string }
  | { type: "bold"; children: InlineNode[] }
  | { type: "italic"; children: InlineNode[] }
  | { type: "inlineCode"; value: string }
  | { type: "kbd"; value: string }
  | { type: "link"; href: string; internal: boolean; children: InlineNode[] }
  | { type: "break" };

export interface HeadingNode {
  type: "heading";
  depth: 1 | 2 | 3 | 4;
  children: InlineNode[];
  slug: string;
}

export interface ParagraphNode {
  type: "paragraph";
  children: InlineNode[];
}

export interface ListItemNode {
  checked?: boolean;
  children: InlineNode[];
}

export interface ListNode {
  type: "list";
  ordered: boolean;
  items: ListItemNode[];
}

export interface TableNode {
  type: "table";
  header: InlineNode[][];
  align: Array<"left" | "center" | "right" | null>;
  rows: InlineNode[][][];
}

export interface ImageNode {
  type: "image";
  src: string;
  alt: string;
}

export interface CodeNode {
  type: "code";
  lang: string;
  value: string;
}

export interface BlockquoteNode {
  type: "blockquote";
  children: DocNode[];
}

export interface HorizontalRuleNode {
  type: "horizontalRule";
}

/** Simple callout-style directives that only ever hold inline content. */
export interface CalloutNode {
  type: "tip" | "warning" | "danger" | "note" | "success" | "badge" | "version";
  children: DocNode[];
}

export interface InstallCommand {
  manager: string;
  command: string;
}

export interface InstallNode {
  type: "install";
  commands: InstallCommand[];
}

export interface RelatedNode {
  type: "related";
  items: string[];
}

export interface ResourceItem {
  title: string;
  href: string;
}

export interface ResourcesNode {
  type: "resources";
  items: ResourceItem[];
}

export interface VideoNode {
  type: "video";
  url: string;
}

export interface DemoNode {
  type: "demo";
  id: string;
}

export interface PlaygroundNode {
  type: "playground";
  id: string;
}

export interface ComponentDirectiveNode {
  type: "component";
  id: string;
}

export interface TreeNode {
  type: "tree";
  value: string;
}

export interface FolderNode {
  type: "folder";
  value: string;
}

export interface TabItem {
  label: string;
  children: DocNode[];
}

export interface TabsNode {
  type: "tabs";
  tabs: TabItem[];
}

/** Discriminated union over every node the AST can contain. */
export type DocNode =
  | HeadingNode
  | ParagraphNode
  | ListNode
  | TableNode
  | ImageNode
  | CodeNode
  | BlockquoteNode
  | HorizontalRuleNode
  | CalloutNode
  | InstallNode
  | RelatedNode
  | ResourcesNode
  | VideoNode
  | DemoNode
  | PlaygroundNode
  | ComponentDirectiveNode
  | TreeNode
  | FolderNode
  | TabsNode;

export type DocNodeType = DocNode["type"];

/** The result of a full parse: the AST plus any non-fatal parser errors. */
export interface ParseResult {
  ast: DocNode[];
  errors: DocParseError[];
}

export interface DocParseErrorInfo {
  code: string;
  message: string;
  line: number;
}

/** Minimal shape used by errors.ts; kept here to avoid a circular import. */
export interface DocParseError extends DocParseErrorInfo {}

export interface TocEntry {
  title: string;
  slug: string;
  depth: 2 | 3;
}

export type SearchNodeKind =
  | "title"
  | "heading"
  | "paragraph"
  | "list"
  | "table"
  | "warning"
  | "tip"
  | "note"
  | "danger"
  | "success"
  | "install"
  | "resources";

export interface SearchEntry {
  kind: SearchNodeKind;
  slug: string | null;
  text: string;
}
