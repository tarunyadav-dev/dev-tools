/**
 * helpers/inline.ts
 *
 * Inline-level markdown parsing: bold, italic, inline code, links, kbd, and
 * plain text. This runs on a single logical line (already joined from a
 * paragraph/heading/list item/table cell) and produces `InlineNode[]`.
 *
 * Kept independent of the block-level lexer/parser on purpose -- inline
 * parsing is a different grammar (character-by-character) than block
 * parsing (line-by-line).
 */

import type { InlineNode } from "../types";

type InlineRule = {
  pattern: RegExp;
  build: (match: RegExpMatchArray) => InlineNode;
};

// Order matters: longer/more specific tokens must be tried before shorter
// ones (e.g. bold `**` before italic `*`).
const INLINE_RULES: InlineRule[] = [
  {
    pattern: /^\*\*([^*]+)\*\*/,
    build: (m) => ({ type: "bold", children: parseInline(m[1]) }),
  },
  {
    pattern: /^__([^_]+)__/,
    build: (m) => ({ type: "bold", children: parseInline(m[1]) }),
  },
  {
    pattern: /^\*([^*]+)\*/,
    build: (m) => ({ type: "italic", children: parseInline(m[1]) }),
  },
  {
    pattern: /^_([^_]+)_/,
    build: (m) => ({ type: "italic", children: parseInline(m[1]) }),
  },
  {
    pattern: /^`([^`]+)`/,
    build: (m) => ({ type: "inlineCode", value: m[1] }),
  },
  {
    pattern: /^<kbd>([^<]+)<\/kbd>/i,
    build: (m) => ({ type: "kbd", value: m[1] }),
  },
  {
    pattern: /^\[([^\]]*)\]\(([^)]+)\)/,
    build: (m) => {
      const href = m[2];
      const internal = !/^https?:\/\//i.test(href);
      return { type: "link", href, internal, children: parseInline(m[1]) };
    },
  },
  {
    pattern: /^(https?:\/\/[^\s)]+)/,
    build: (m) => ({
      type: "link",
      href: m[1],
      internal: false,
      children: [{ type: "text", value: m[1] }],
    }),
  },
  {
    pattern: /^  \n/,
    build: () => ({ type: "break" }),
  },
];

/**
 * Parses one line/string of raw inline markdown into `InlineNode[]`.
 * Single forward scan: at each position, try every rule; on no match,
 * consume one plain-text character and continue.
 */
export function parseInline(raw: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  let remaining = raw;
  let textBuffer = "";

  const flushText = () => {
    if (textBuffer.length > 0) {
      nodes.push({ type: "text", value: textBuffer });
      textBuffer = "";
    }
  };

  while (remaining.length > 0) {
    let matched = false;
    for (const rule of INLINE_RULES) {
      const match = rule.pattern.exec(remaining);
      if (match) {
        flushText();
        nodes.push(rule.build(match));
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      textBuffer += remaining[0];
      remaining = remaining.slice(1);
    }
  }
  flushText();
  return nodes;
}
