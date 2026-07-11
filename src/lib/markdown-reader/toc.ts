/**
 * toc.ts
 *
 * Builds the Table of Contents from a finished AST. Operates purely on
 * `DocNode[]` -- it never touches raw markdown or tokens. Only `##` and
 * `###` headings participate, per the spec (H1 is the page title, H4 is
 * too deep for the sidebar/TOC).
 */

import { TOC_HEADING_DEPTHS } from "./constants";
import { inlineToPlainText } from "./utils";
import type { DocNode, TocEntry } from "./types";

export function generateToc(ast: DocNode[]): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const node of ast) {
    if (node.type !== "heading") continue;
    if (!(TOC_HEADING_DEPTHS as readonly number[]).includes(node.depth)) continue;
    entries.push({
      title: inlineToPlainText(node.children),
      slug: node.slug,
      depth: node.depth as 2 | 3,
    });
  }
  return entries;
}

/** Convenience alias used by sidebar UIs -- identical output to `generateToc`. */
export const generateSidebar = generateToc;

/**
 * Given a list of documents (each with its own AST), computes previous/next
 * navigation for the document at `currentIndex`. Order is caller-defined
 * (e.g. from a JSON navigation manifest) -- the engine does not infer order
 * from anything inside the markdown itself.
 */
export interface NavDoc {
  slug: string;
  title: string;
}

export function getPrevNext(
  docs: NavDoc[],
  currentSlug: string,
): { prev: NavDoc | null; next: NavDoc | null } {
  const index = docs.findIndex((d) => d.slug === currentSlug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? docs[index - 1] : null,
    next: index < docs.length - 1 ? docs[index + 1] : null,
  };
}

export interface BreadcrumbItem {
  title: string;
  href: string;
}

/**
 * Breadcrumbs are generated from JSON navigation metadata (category tree),
 * not from the markdown file -- this just walks the metadata into a flat
 * list of `{ title, href }` for rendering.
 */
export function buildBreadcrumb(
  path: Array<{ title: string; slug: string }>,
  basePath = "",
): BreadcrumbItem[] {
  return path.map((entry) => ({
    title: entry.title,
    href: `${basePath}/${entry.slug}`.replace(/\/+/g, "/"),
  }));
}
