/**
 * parser.ts
 *
 * Stage 2 of the pipeline: `Token[]` -> `DocNode[]` (AST).
 *
 * The parser groups tokens that the lexer deliberately left flat: adjacent
 * list-item lines become one `list`, adjacent table rows become one
 * `table`, a `codeFenceOpen ... codeFenceClose` run becomes one `code`
 * block, and a `directiveOpen ... directiveClose` run is handed to the
 * matching entry in the directive registry (recursing back into this same
 * parser for directive bodies that hold nested markdown).
 *
 * The parser never renders anything and never imports React.
 */

import { makeParseError } from "./errors";
import { getDirective } from "./directives/registry";
import { parseInline } from "./helpers/inline";
import { makeSlugger } from "./slug";
import { tokenize } from "./lexer";
import type { Token } from "./tokens";
import type {
  BlockquoteNode,
  CodeNode,
  DocNode,
  DocParseError,
  HeadingNode,
  ImageNode,
  ListItemNode,
  ListNode,
  ParseResult,
  TableNode,
} from "./types";

/**
 * Parses a full markdown document (source text) into an AST + error list.
 * This is the entry point most consumers use directly.
 */
export function parseMarkdown(source: string): ParseResult {
  const tokens = tokenize(source);
  const errors: DocParseError[] = [];
  const slugger = makeSlugger();
  let h1Count = 0;

  const ast = parseTokens(tokens, errors, slugger, (count) => {
    h1Count += count;
  });

  if (h1Count > 1) {
    errors.push(
      makeParseError("MULTIPLE_H1", "A document must contain exactly one H1 heading.", 1),
    );
  }

  return { ast, errors };
}

/**
 * Parses a subset of raw markdown *lines* (used recursively by directives
 * such as `tip`/`warning`/`tabs` that hold nested markdown in their body).
 * Shares the same slugger scope semantics are not needed here since nested
 * bodies don't usually contain headings, but if they do, they get their own
 * local slug space to avoid colliding with the parent document.
 */
function parseNestedBlock(lines: string[]): DocNode[] {
  const source = lines.join("\n");
  const tokens = tokenize(source);
  const errors: DocParseError[] = [];
  const slugger = makeSlugger();
  return parseTokens(tokens, errors, slugger, () => {});
}

function parseTokens(
  tokens: Token[],
  errors: DocParseError[],
  slugger: (title: string) => string,
  onHeading: (h1Delta: number) => void,
): DocNode[] {
  const nodes: DocNode[] = [];
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    switch (token.kind) {
      case "blank": {
        i++;
        break;
      }

      case "heading": {
        if (token.depth === 1) onHeading(1);
        const heading: HeadingNode = {
          type: "heading",
          depth: token.depth,
          children: parseInline(token.text),
          slug: slugger(token.text),
        };
        nodes.push(heading);
        i++;
        break;
      }

      case "horizontalRule": {
        nodes.push({ type: "horizontalRule" });
        i++;
        break;
      }

      case "image": {
        const image: ImageNode = { type: "image", src: token.src, alt: token.alt };
        nodes.push(image);
        i++;
        break;
      }

      case "codeFenceOpen": {
        const lang = token.lang;
        const lines: string[] = [];
        i++;
        let closed = false;
        while (i < tokens.length) {
          const inner = tokens[i];
          if (inner.kind === "codeFenceClose") {
            closed = true;
            i++;
            break;
          }
          if (inner.kind === "codeLine") {
            lines.push(inner.text);
            i++;
            continue;
          }
          // Should not happen -- lexer guarantees codeLine/codeFenceClose only.
          i++;
        }
        if (!closed) {
          errors.push(
            makeParseError("BROKEN_CODE_BLOCK", "Code block was never closed with ```.", token.line),
          );
        }
        const code: CodeNode = { type: "code", lang, value: lines.join("\n") };
        nodes.push(code);
        break;
      }

      case "directiveOpen": {
        const name = token.name;
        const bodyLines: string[] = [];
        i++;
        let closed = false;
        while (i < tokens.length) {
          const inner = tokens[i];
          if (inner.kind === "directiveClose") {
            closed = true;
            i++;
            break;
          }
          bodyLines.push(tokenToRawLine(inner));
          i++;
        }
        if (!closed) {
          errors.push(
            makeParseError(
              "UNCLOSED_DIRECTIVE",
              `Directive ":::${name}" was never closed with ":::".`,
              token.line,
            ),
          );
        }
        const definition = getDirective(name);
        if (!definition) {
          errors.push(
            makeParseError("UNKNOWN_DIRECTIVE", `Unknown directive ":::${name}".`, token.line),
          );
          break;
        }
        try {
          const directiveNodes = definition.parse(bodyLines, parseNestedBlock);
          nodes.push(...directiveNodes);
        } catch (err) {
          const code = name === "install" ? "INVALID_INSTALL" : name === "tabs" ? "INVALID_TABS" : "UNKNOWN_DIRECTIVE";
          errors.push(
            makeParseError(code, `Failed to parse ":::${name}": ${(err as Error).message}`, token.line),
          );
        }
        break;
      }

      case "listItemLine": {
        const ordered = token.ordered;
        const items: ListItemNode[] = [];
        while (i < tokens.length && tokens[i].kind === "listItemLine") {
          const item = tokens[i] as Extract<Token, { kind: "listItemLine" }>;
          items.push({
            checked: item.checked,
            children: parseInline(item.text),
          });
          i++;
        }
        const list: ListNode = { type: "list", ordered, items };
        nodes.push(list);
        break;
      }

      case "tableRow": {
        const headerCells = token.cells;
        let cursor = i + 1;
        if (cursor >= tokens.length || tokens[cursor].kind !== "tableSeparator") {
          errors.push(
            makeParseError("BROKEN_TABLE", "Table header is missing its separator row (e.g. |---|---|).", token.line),
          );
          nodes.push({
            type: "table",
            header: headerCells.map(parseInline),
            align: headerCells.map(() => null),
            rows: [],
          });
          i++;
          break;
        }
        const separator = tokens[cursor] as Extract<Token, { kind: "tableSeparator" }>;
        cursor++;
        const rows: string[][] = [];
        while (cursor < tokens.length && tokens[cursor].kind === "tableRow") {
          rows.push((tokens[cursor] as Extract<Token, { kind: "tableRow" }>).cells);
          cursor++;
        }
        const table: TableNode = {
          type: "table",
          header: headerCells.map(parseInline),
          align: separator.align,
          rows: rows.map((row) => row.map(parseInline)),
        };
        nodes.push(table);
        i = cursor;
        break;
      }

      case "blockquoteLine": {
        const lines: string[] = [];
        while (i < tokens.length && tokens[i].kind === "blockquoteLine") {
          lines.push((tokens[i] as Extract<Token, { kind: "blockquoteLine" }>).text);
          i++;
        }
        const blockquote: BlockquoteNode = {
          type: "blockquote",
          children: parseNestedBlock(lines),
        };
        nodes.push(blockquote);
        break;
      }

      case "text": {
        const lines: string[] = [token.text];
        i++;
        while (i < tokens.length && tokens[i].kind === "text") {
          lines.push((tokens[i] as Extract<Token, { kind: "text" }>).text);
          i++;
        }
        nodes.push({ type: "paragraph", children: parseInline(lines.join(" ")) });
        break;
      }

      // Directive/tab markers that appear outside their expected context are
      // treated as inert text rather than crashing the parser.
      case "tabMarker": {
        nodes.push({ type: "paragraph", children: parseInline(`=== ${token.label}`) });
        i++;
        break;
      }

      case "directiveClose":
      case "codeFenceClose":
      case "codeLine":
      case "tableSeparator": {
        // Orphaned tokens (e.g. a stray closing fence). Skip defensively.
        i++;
        break;
      }

      default: {
        i++;
      }
    }
  }

  return nodes;
}

/** Reconstructs a raw source line from a token, for directive body capture. */
function tokenToRawLine(token: Token): string {
  switch (token.kind) {
    case "text":
      return token.text;
    case "blank":
      return "";
    case "heading":
      return `${"#".repeat(token.depth)} ${token.text}`;
    case "listItemLine":
      if (token.checked !== undefined) {
        return `- [${token.checked ? "x" : " "}] ${token.text}`;
      }
      return token.ordered ? `1. ${token.text}` : `- ${token.text}`;
    case "blockquoteLine":
      return `> ${token.text}`;
    case "horizontalRule":
      return "---";
    case "tabMarker":
      return `=== ${token.label}`;
    case "codeFenceOpen":
      return "```" + token.lang;
    case "codeLine":
      return token.text;
    case "codeFenceClose":
      return "```";
    case "tableRow":
      return `| ${token.cells.join(" | ")} |`;
    case "image":
      return `![${token.alt}](${token.src})`;
    default:
      return "";
  }
}
