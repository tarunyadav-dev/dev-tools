/**
 * constants.ts
 *
 * Fixed vocabulary for the engine. Nothing in here should be computed --
 * these are the literal tokens the spec defines.
 */

/** Directive names supported out of the box (see docs-engine README + spec). */
export const CORE_DIRECTIVES = [
  "tip",
  "warning",
  "danger",
  "note",
  "success",
  "install",
  "related",
  "resources",
  "video",
  "demo",
  "playground",
  "component",
  "tree",
  "folder",
  "tabs",
  "badge",
  "version",
] as const;

export type CoreDirectiveName = (typeof CORE_DIRECTIVES)[number];

/** Fenced code languages the spec explicitly recognizes. */
export const SUPPORTED_CODE_LANGUAGES = [
  "tsx",
  "jsx",
  "ts",
  "js",
  "python",
  "cpp",
  "bash",
  "json",
  "css",
  "html",
  "sql",
  "md",
  "mermaid",
  "text",
] as const;

/** Package managers recognized inside `:::install` blocks. */
export const PACKAGE_MANAGERS = ["npm", "pnpm", "yarn", "bun"] as const;

/** Directive fence marker, e.g. `:::tip`. */
export const DIRECTIVE_FENCE = ":::";

/** Tab section marker inside `:::tabs`, e.g. `=== npm`. */
export const TAB_MARKER = "===";

/** Only these heading depths participate in TOC + sidebar generation. */
export const TOC_HEADING_DEPTHS = [2, 3] as const;
