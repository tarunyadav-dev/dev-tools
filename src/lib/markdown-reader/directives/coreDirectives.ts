/**
 * directives/coreDirectives.ts
 *
 * Registrations for every directive in the v1 spec. Each one is a small,
 * declarative mapping from raw body lines to AST node(s). Import
 * `registerCoreDirectives()` once (index.ts does this for you) before
 * parsing any document.
 */

import { PACKAGE_MANAGERS } from "../constants";
import { parseInline } from "../helpers/inline";
import type {
  CalloutNode,
  DocNode,
  InstallCommand,
  ResourceItem,
  TabItem,
} from "../types";
import { registerDirective, hasDirective } from "./registry";

function isBlankLine(line: string): boolean {
  return line.trim().length === 0;
}

function trimBlankEdges(lines: string[]): string[] {
  let start = 0;
  let end = lines.length;
  while (start < end && isBlankLine(lines[start])) start++;
  while (end > start && isBlankLine(lines[end - 1])) end--;
  return lines.slice(start, end);
}

/** Registers a plain "callout" directive (tip/warning/danger/note/success/badge/version). */
function registerCallout(name: CalloutNode["type"]) {
  registerDirective({
    name,
    parse: (body, parseBlock) => {
      const trimmed = trimBlankEdges(body);
      const node: CalloutNode = { type: name, children: parseBlock(trimmed) };
      return [node];
    },
  });
}

function parseInstallBody(body: string[]): InstallCommand[] {
  const lines = trimBlankEdges(body);
  const commands: InstallCommand[] = [];

  // Detect the "single command" form: no line matches a bare manager name.
  const hasManagerHeaders = lines.some((line) =>
    (PACKAGE_MANAGERS as readonly string[]).includes(line.trim()),
  );

  if (!hasManagerHeaders) {
    const command = lines.filter((l) => !isBlankLine(l)).join("\n").trim();
    if (command) {
      // Infer the manager from the first word of the command, default npm.
      const manager = (PACKAGE_MANAGERS as readonly string[]).find((m) =>
        command.startsWith(m),
      ) ?? "npm";
      commands.push({ manager, command });
    }
    return commands;
  }

  let currentManager: string | null = null;
  let currentLines: string[] = [];

  const flush = () => {
    if (currentManager && currentLines.length > 0) {
      commands.push({
        manager: currentManager,
        command: currentLines.join("\n").trim(),
      });
    }
    currentLines = [];
  };

  for (const line of lines) {
    const trimmedLine = line.trim();
    if ((PACKAGE_MANAGERS as readonly string[]).includes(trimmedLine)) {
      flush();
      currentManager = trimmedLine;
    } else if (!isBlankLine(line)) {
      currentLines.push(line.trim());
    }
  }
  flush();

  return commands;
}

function parseResourcesBody(body: string[]): ResourceItem[] {
  const lines = trimBlankEdges(body).filter((l) => !isBlankLine(l));
  const items: ResourceItem[] = [];
  for (let i = 0; i < lines.length; i += 2) {
    const title = lines[i]?.trim();
    const href = lines[i + 1]?.trim();
    if (title && href) items.push({ title, href });
  }
  return items;
}

export function registerCoreDirectives(): void {
  if (hasDirective("tip")) return; // idempotent -- safe to call more than once

  (["tip", "warning", "danger", "note", "success", "badge", "version"] as const).forEach(
    registerCallout,
  );

  registerDirective({
    name: "install",
    parse: (body) => [{ type: "install", commands: parseInstallBody(body) }],
  });

  registerDirective({
    name: "related",
    parse: (body) => [
      {
        type: "related",
        items: trimBlankEdges(body)
          .filter((l) => !isBlankLine(l))
          .map((l) => l.trim()),
      },
    ],
  });

  registerDirective({
    name: "resources",
    parse: (body) => [{ type: "resources", items: parseResourcesBody(body) }],
  });

  registerDirective({
    name: "video",
    parse: (body) => {
      const url = trimBlankEdges(body).find((l) => !isBlankLine(l))?.trim() ?? "";
      return [{ type: "video", url }];
    },
  });

  registerDirective({
    name: "demo",
    parse: (body) => {
      const id = trimBlankEdges(body).find((l) => !isBlankLine(l))?.trim() ?? "";
      return [{ type: "demo", id }];
    },
  });

  registerDirective({
    name: "playground",
    parse: (body) => {
      const id = trimBlankEdges(body).find((l) => !isBlankLine(l))?.trim() ?? "";
      return [{ type: "playground", id }];
    },
  });

  registerDirective({
    name: "component",
    parse: (body) => {
      const id = trimBlankEdges(body).find((l) => !isBlankLine(l))?.trim() ?? "";
      return [{ type: "component", id }];
    },
  });

  registerDirective({
    name: "tree",
    parse: (body) => [{ type: "tree", value: trimBlankEdges(body).join("\n") }],
  });

  registerDirective({
    name: "folder",
    parse: (body) => {
      const value = trimBlankEdges(body).find((l) => !isBlankLine(l))?.trim() ?? "";
      return [{ type: "folder", value }];
    },
  });

  registerDirective({
    name: "tabs",
    parse: (body, parseBlock) => {
      const tabs: TabItem[] = [];
      let currentLabel: string | null = null;
      let currentLines: string[] = [];

      const flush = () => {
        if (currentLabel !== null) {
          tabs.push({ label: currentLabel, children: parseBlock(trimBlankEdges(currentLines)) });
        }
        currentLines = [];
      };

      for (const line of body) {
        const match = /^===\s+(.*)$/.exec(line);
        if (match) {
          flush();
          currentLabel = match[1].trim();
        } else {
          currentLines.push(line);
        }
      }
      flush();

      return [{ type: "tabs", tabs }];
    },
  });
}

// Re-exported for callers who only need inline parsing inside a directive
// body without pulling in the whole parser module.
export { parseInline };
