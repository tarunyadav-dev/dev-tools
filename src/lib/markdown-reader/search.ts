/**
 * search.ts
 *
 * Builds a flat, searchable index from a finished AST. Indexes headings,
 * paragraphs, lists, tables, and the tip/warning/note/danger/success/
 * install/resources directives. Explicitly ignores code blocks, per spec.
 */

import { inlineToPlainText, nodeToPlainText } from "./utils";
import type { DocNode, SearchEntry } from "./types";

export function buildSearchIndex(ast: DocNode[], docTitle?: string): SearchEntry[] {
  const entries: SearchEntry[] = [];

  if (docTitle) {
    entries.push({ kind: "title", slug: null, text: docTitle });
  }

  let currentSlug: string | null = null;

  for (const node of ast) {
    switch (node.type) {
      case "heading": {
        currentSlug = node.slug;
        entries.push({
          kind: "heading",
          slug: node.slug,
          text: inlineToPlainText(node.children),
        });
        break;
      }
      case "paragraph": {
        const text = inlineToPlainText(node.children);
        if (text.trim()) entries.push({ kind: "paragraph", slug: currentSlug, text });
        break;
      }
      case "list": {
        const text = node.items.map((item) => inlineToPlainText(item.children)).join("; ");
        if (text.trim()) entries.push({ kind: "list", slug: currentSlug, text });
        break;
      }
      case "table": {
        const text = nodeToPlainText(node);
        if (text.trim()) entries.push({ kind: "table", slug: currentSlug, text });
        break;
      }
      case "install": {
        const text = node.commands.map((c) => c.command).join("; ");
        if (text.trim()) entries.push({ kind: "install", slug: currentSlug, text });
        break;
      }
      case "resources": {
        const text = node.items.map((r) => r.title).join("; ");
        if (text.trim()) entries.push({ kind: "resources", slug: currentSlug, text });
        break;
      }
      case "tip":
      case "warning":
      case "danger":
      case "note":
      case "success": {
        const text = node.children.map(nodeToPlainText).join(" ");
        if (text.trim()) {
          entries.push({ kind: node.type, slug: currentSlug, text });
        }
        break;
      }
      default: {
        // code blocks, badge/version, related is handled above, and
        // everything else are intentionally not indexed.
      }
    }
  }

  return entries;
}

/** Minimal case-insensitive substring search over a pre-built index. */
export function searchIndex(entries: SearchEntry[], query: string): SearchEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return entries.filter((entry) => entry.text.toLowerCase().includes(needle));
}
