/**
 * tokens.ts
 *
 * The token vocabulary produced by lexer.ts and consumed by parser.ts. The
 * lexer's only job is to turn raw lines into this flat stream -- it does not
 * know what a "list" or a "table" is, only what an individual line looks
 * like.
 */

export type Token =
  | { kind: "heading"; depth: 1 | 2 | 3 | 4; text: string; line: number }
  | { kind: "horizontalRule"; line: number }
  | { kind: "blockquoteLine"; text: string; line: number }
  | {
      kind: "listItemLine";
      ordered: boolean;
      checked?: boolean;
      text: string;
      line: number;
    }
  | { kind: "tableRow"; cells: string[]; line: number }
  | { kind: "tableSeparator"; align: Array<"left" | "center" | "right" | null>; line: number }
  | { kind: "codeFenceOpen"; lang: string; line: number }
  | { kind: "codeFenceClose"; line: number }
  | { kind: "codeLine"; text: string; line: number }
  | { kind: "directiveOpen"; name: string; line: number }
  | { kind: "directiveClose"; line: number }
  | { kind: "tabMarker"; label: string; line: number }
  | { kind: "image"; alt: string; src: string; line: number }
  | { kind: "blank"; line: number }
  | { kind: "text"; text: string; line: number };
