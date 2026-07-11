/**
 * lexer.ts
 *
 * Stage 1 of the pipeline: raw markdown text -> flat `Token[]` stream.
 *
 * The lexer ONLY tokenizes. It has no concept of "this is a list" or "this
 * is a directive body" -- it just labels each line for what it looks like.
 * Multi-line grouping (list items into a list, rows into a table, directive
 * bodies into a subtree) is entirely the parser's job. This keeps the lexer
 * a single, cheap, one-pass function.
 */

import { RULES } from "./rules";
import type { Token } from "./tokens";
import { isBlank, splitLines } from "./utils";

export function tokenize(source: string): Token[] {
  const lines = splitLines(source);
  const tokens: Token[] = [];

  let inCodeFence = false;

  for (let i = 0; i < lines.length; i++) {
    const lineNumber = i + 1;
    const line = lines[i];

    // Inside a fenced code block, every line is raw code text until the
    // closing fence -- no other rule may fire.
    if (inCodeFence) {
      const closeMatch = RULES.codeFence.exec(line);
      if (closeMatch && closeMatch[1] === "") {
        tokens.push({ kind: "codeFenceClose", line: lineNumber });
        inCodeFence = false;
      } else {
        tokens.push({ kind: "codeLine", text: line, line: lineNumber });
      }
      continue;
    }

    if (isBlank(line)) {
      tokens.push({ kind: "blank", line: lineNumber });
      continue;
    }

    const codeFenceMatch = RULES.codeFence.exec(line);
    if (codeFenceMatch) {
      tokens.push({ kind: "codeFenceOpen", lang: codeFenceMatch[1] || "text", line: lineNumber });
      inCodeFence = true;
      continue;
    }

    const directiveOpenMatch = RULES.directiveOpen.exec(line);
    if (directiveOpenMatch) {
      tokens.push({ kind: "directiveOpen", name: directiveOpenMatch[1].toLowerCase(), line: lineNumber });
      continue;
    }

    if (RULES.directiveClose.test(line)) {
      tokens.push({ kind: "directiveClose", line: lineNumber });
      continue;
    }

    const tabMarkerMatch = RULES.tabMarker.exec(line);
    if (tabMarkerMatch) {
      tokens.push({ kind: "tabMarker", label: tabMarkerMatch[1].trim(), line: lineNumber });
      continue;
    }

    const headingMatch = RULES.heading.exec(line);
    if (headingMatch) {
      const depth = headingMatch[1].length as 1 | 2 | 3 | 4;
      tokens.push({ kind: "heading", depth, text: headingMatch[2].trim(), line: lineNumber });
      continue;
    }

    if (RULES.horizontalRule.test(line)) {
      tokens.push({ kind: "horizontalRule", line: lineNumber });
      continue;
    }

    const imageMatch = RULES.image.exec(line);
    if (imageMatch) {
      tokens.push({ kind: "image", alt: imageMatch[1], src: imageMatch[2], line: lineNumber });
      continue;
    }

    const checklistMatch = RULES.checklistItem.exec(line);
    if (checklistMatch) {
      tokens.push({
        kind: "listItemLine",
        ordered: false,
        checked: checklistMatch[2].toLowerCase() === "x",
        text: checklistMatch[3],
        line: lineNumber,
      });
      continue;
    }

    const orderedMatch = RULES.orderedListItem.exec(line);
    if (orderedMatch) {
      tokens.push({ kind: "listItemLine", ordered: true, text: orderedMatch[2], line: lineNumber });
      continue;
    }

    const unorderedMatch = RULES.unorderedListItem.exec(line);
    if (unorderedMatch) {
      tokens.push({ kind: "listItemLine", ordered: false, text: unorderedMatch[2], line: lineNumber });
      continue;
    }

    if (RULES.tableSeparator.test(line) && tokens.at(-1)?.kind === "tableRow") {
      tokens.push({ kind: "tableSeparator", align: parseAlignRow(line), line: lineNumber });
      continue;
    }

    if (RULES.tableRow.test(line)) {
      tokens.push({ kind: "tableRow", cells: splitTableCells(line), line: lineNumber });
      continue;
    }

    const blockquoteMatch = RULES.blockquote.exec(line);
    if (blockquoteMatch) {
      tokens.push({ kind: "blockquoteLine", text: blockquoteMatch[1], line: lineNumber });
      continue;
    }

    tokens.push({ kind: "text", text: line, line: lineNumber });
  }

  // An unterminated fence at EOF still needs a synthetic close so the parser
  // can report BROKEN_CODE_BLOCK instead of silently swallowing the rest of
  // the document.
  if (inCodeFence) {
    tokens.push({ kind: "codeFenceClose", line: lines.length + 1 });
  }

  return tokens;
}

function splitTableCells(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return trimmed.split("|").map((cell) => cell.trim());
}

function parseAlignRow(line: string): Array<"left" | "center" | "right" | null> {
  const cells = splitTableCells(line);
  return cells.map((cell) => {
    const left = cell.startsWith(":");
    const right = cell.endsWith(":");
    if (left && right) return "center";
    if (right) return "right";
    if (left) return "left";
    return null;
  });
}
