/**
 * plugins/exampleCustomDirective.ts
 *
 * Example of extending the engine with a directive that isn't in the core
 * v1 set, WITHOUT touching lexer.ts, parser.ts, or the registry itself.
 *
 * This registers `:::callout` as an alias for `:::note`. Import and call
 * `registerExampleDirective()` once (e.g. at the top of your app entry)
 * before parsing any markdown that uses it.
 */

import { registerDirective, hasDirective } from "../directives/registry";

export function registerExampleDirective(): void {
  if (hasDirective("callout")) return;

  registerDirective({
    name: "callout",
    parse: (body, parseBlock) => [{ type: "note", children: parseBlock(body) }],
  });
}
