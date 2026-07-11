/**
 * errors.ts
 *
 * The parser never throws for recoverable authoring mistakes -- it records a
 * `DocParseError` and keeps going, so one bad directive doesn't take down an
 * entire page. `DocsEngineError` is reserved for programmer errors (bad
 * plugin registration, etc.) that genuinely should throw.
 */

import type { DocParseError } from "./types";

export type DocParseErrorCode =
  | "UNKNOWN_DIRECTIVE"
  | "UNCLOSED_DIRECTIVE"
  | "BROKEN_CODE_BLOCK"
  | "BROKEN_TABLE"
  | "INVALID_TABS"
  | "INVALID_INSTALL"
  | "MULTIPLE_H1";

export function makeParseError(
  code: DocParseErrorCode,
  message: string,
  line: number,
): DocParseError {
  return { code, message, line };
}

/** Thrown for programmer-level misuse (e.g. re-registering a directive). */
export class DocsEngineError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DocsEngineError";
  }
}

export function formatParseErrors(errors: DocParseError[]): string {
  if (errors.length === 0) return "No parse errors.";
  return errors
    .map((e) => `[${e.code}] line ${e.line}: ${e.message}`)
    .join("\n");
}
