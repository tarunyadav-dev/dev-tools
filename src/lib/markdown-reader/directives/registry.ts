/**
 * directives/registry.ts
 *
 * The plugin system. New directives are added by calling `registerDirective`
 * -- the core parser never needs to be modified to support a new directive
 * name. `parser.ts` looks up directive bodies exclusively through this
 * registry.
 */

import { DocsEngineError } from "../errors";
import type { DocNode } from "../types";

/**
 * A directive definition tells the parser how to turn the *raw lines*
 * between `:::name` and `:::` into zero or more AST nodes. Most directives
 * only ever produce exactly one node, but the signature allows more (kept
 * as an array for uniformity/extensibility).
 */
export interface DirectiveDefinition {
  name: string;
  /**
   * `body` is the raw, unindented lines between the opening and closing
   * fence. `parseBlock` is a callback into the block parser so directives
   * that hold nested markdown (e.g. tip/warning/note) can recursively parse
   * their body instead of duplicating parsing logic.
   */
  parse: (body: string[], parseBlock: (lines: string[]) => DocNode[]) => DocNode[];
}

const registry = new Map<string, DirectiveDefinition>();

export function registerDirective(definition: DirectiveDefinition): void {
  const key = definition.name.toLowerCase();
  if (registry.has(key)) {
    throw new DocsEngineError(
      `Directive "${key}" is already registered. Use a unique name or unregister it first.`,
    );
  }
  registry.set(key, definition);
}

export function unregisterDirective(name: string): void {
  registry.delete(name.toLowerCase());
}

export function getDirective(name: string): DirectiveDefinition | undefined {
  return registry.get(name.toLowerCase());
}

export function hasDirective(name: string): boolean {
  return registry.has(name.toLowerCase());
}

export function listDirectives(): string[] {
  return Array.from(registry.keys());
}
