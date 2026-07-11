/**
 * index.ts
 *
 * Barrel export -- the only entry point most consumers need.
 *
 * ```ts
 * import {
 *   parseMarkdown,
 *   DocsRenderer,
 *   generateToc,
 *   buildSearchIndex,
 *   slugify,
 *   registerDirective,
 * } from "docs-engine";
 * ```
 */

// Core pipeline
export { tokenize } from "./lexer";
export { parseMarkdown } from "./parser";
export { DocsRenderer, NodeRenderer } from "./renderer";
export type { RenderOptions } from "./renderer";

// Derived data
export { generateToc, generateSidebar, getPrevNext, buildBreadcrumb } from "./toc";
export type { NavDoc, BreadcrumbItem } from "./toc";
export { buildSearchIndex, searchIndex } from "./search";
export { getReadingTime, formatReadingTime } from "./helpers/readingTime";

// Standalone utilities
export { slugify, makeSlugger } from "./slug";
export { inlineToPlainText, nodeToPlainText, calculateReadingTime } from "./utils";

// Errors
export { DocsEngineError, formatParseErrors, makeParseError } from "./errors";
export type { DocParseErrorCode } from "./errors";

// Plugin system
export { registerDirective, unregisterDirective, getDirective, hasDirective, listDirectives } from "./directives/registry";
export type { DirectiveDefinition } from "./directives/registry";
export { registerCoreDirectives } from "./directives/coreDirectives";

// Types
export type {
  DocNode,
  DocNodeType,
  InlineNode,
  HeadingNode,
  ParagraphNode,
  ListNode,
  ListItemNode,
  TableNode,
  ImageNode,
  CodeNode,
  BlockquoteNode,
  HorizontalRuleNode,
  CalloutNode,
  InstallNode,
  InstallCommand,
  RelatedNode,
  ResourcesNode,
  ResourceItem,
  VideoNode,
  DemoNode,
  PlaygroundNode,
  ComponentDirectiveNode,
  TreeNode,
  FolderNode,
  TabsNode,
  TabItem,
  ParseResult,
  DocParseError,
  TocEntry,
  SearchEntry,
  SearchNodeKind,
} from "./types";
export type { DemoRegistry } from "./components/Demo";

// Constants (useful for building your own authoring linters/tooling)
export {
  CORE_DIRECTIVES,
  SUPPORTED_CODE_LANGUAGES,
  PACKAGE_MANAGERS,
  DIRECTIVE_FENCE,
  TAB_MARKER,
  TOC_HEADING_DEPTHS,
} from "./constants";
export type { CoreDirectiveName } from "./constants";

// Register every v1 directive as soon as the engine is imported, so
// consumers never have to remember to call this themselves.
import { registerCoreDirectives } from "./directives/coreDirectives";
registerCoreDirectives();

/**
 * Convenience one-call helper: parse markdown straight to a fully-formed
 * `<DocsRenderer />` element. Most Next.js pages only need this.
 *
 * ```tsx
 * import { renderMarkdown } from "docs-engine";
 * export default function Page() {
 *   return renderMarkdown(source);
 * }
 * ```
 */
import React from "react";
import { parseMarkdown as _parseMarkdown } from "./parser";
import { DocsRenderer as _DocsRenderer } from "./renderer";
import type { DemoRegistry as _DemoRegistry } from "./components/Demo";

export function renderMarkdown(source: string, demoRegistry?: _DemoRegistry): React.ReactElement {
  const { ast } = _parseMarkdown(source);
  return React.createElement(_DocsRenderer, { ast, demoRegistry });
}
