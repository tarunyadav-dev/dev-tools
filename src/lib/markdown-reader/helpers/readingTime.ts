/**
 * helpers/readingTime.ts
 *
 * Thin re-export so consumers can `import { getReadingTime } from
 * "docs-engine/helpers/readingTime"` without reaching into utils.ts
 * directly. The actual computation lives in utils.ts next to the other
 * pure text helpers.
 */

import { calculateReadingTime } from "../utils";
import type { DocNode } from "../types";

export function getReadingTime(ast: DocNode[]): number {
  return calculateReadingTime(ast);
}

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}
