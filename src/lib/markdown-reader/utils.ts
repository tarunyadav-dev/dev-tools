/**
 * utils.ts
 *
 * Small, pure, dependency-free helpers shared across lexer/parser/renderer.
 * Nothing here knows about markdown or the AST specifically.
 */

import type { DocNode, InlineNode } from "./types";

/** Splits raw markdown source into lines, normalizing CRLF -> LF. */
export function splitLines(source: string): string[] {
  return source.replace(/\r\n/g, "\n").split("\n");
}

/** True if a line is empty or only whitespace. */
export function isBlank(line: string): boolean {
  return line.trim().length === 0;
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Flattens inline nodes back to plain text -- used by search + reading time. */
export function inlineToPlainText(nodes: InlineNode[]): string {
  return nodes
    .map((node): string => {
      switch (node.type) {
        case "text":
          return node.value;
        case "bold":
        case "italic":
          return inlineToPlainText(node.children);
        case "inlineCode":
          return node.value;
        case "kbd":
          return node.value;
        case "link":
          return inlineToPlainText(node.children);
        case "break":
          return " ";
        default:
          return "";
      }
    })
    .join("");
}

/** Flattens an entire AST subtree to plain text, skipping code blocks. */
export function nodeToPlainText(node: DocNode): string {
  switch (node.type) {
    case "heading":
    case "paragraph":
      return inlineToPlainText(node.children);
    case "list":
      return node.items.map((item) => inlineToPlainText(item.children)).join(" ");
    case "table":
      return [
        ...node.header.map(inlineToPlainText),
        ...node.rows.map((row) => row.map(inlineToPlainText).join(" ")),
      ].join(" ");
    case "blockquote":
      return node.children.map(nodeToPlainText).join(" ");
    case "tip":
    case "warning":
    case "danger":
    case "note":
    case "success":
    case "badge":
    case "version":
      return node.children.map(nodeToPlainText).join(" ");
    case "install":
      return node.commands.map((c) => c.command).join(" ");
    case "related":
      return node.items.join(" ");
    case "resources":
      return node.items.map((i) => i.title).join(" ");
    case "code":
      return ""; // code is intentionally excluded from text extraction
    default:
      return "";
  }
}

const WORDS_PER_MINUTE = 200;

/** Reading time in whole minutes (minimum 1), computed from the AST. */
export function calculateReadingTime(ast: DocNode[]): number {
  const text = ast.map(nodeToPlainText).join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
