import React from "react";
import type { InlineNode } from "../types";

/**
 * Renders `InlineNode[]` (bold/italic/inline code/links/kbd/text) produced
 * by helpers/inline.ts. This is the only place inline nodes turn into DOM.
 */
export function Inline({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "text":
            return <React.Fragment key={i}>{node.value}</React.Fragment>;
          case "bold":
            return (
              <strong key={i} className="font-semibold text-slate-900 dark:text-slate-100">
                <Inline nodes={node.children} />
              </strong>
            );
          case "italic":
            return (
              <em key={i}>
                <Inline nodes={node.children} />
              </em>
            );
          case "inlineCode":
            return (
              <code
                key={i}
                className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-700 dark:bg-slate-800 dark:text-indigo-300"
              >
                {node.value}
              </code>
            );
          case "kbd":
            return (
              <kbd
                key={i}
                className="rounded border border-slate-300 bg-slate-50 px-1.5 py-0.5 font-mono text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                {node.value}
              </kbd>
            );
          case "link":
            return (
              <a
                key={i}
                href={node.href}
                target={node.internal ? undefined : "_blank"}
                rel={node.internal ? undefined : "noopener noreferrer"}
                className="font-medium text-indigo-600 underline decoration-indigo-300 underline-offset-2 hover:text-indigo-700 dark:text-indigo-400"
              >
                <Inline nodes={node.children} />
              </a>
            );
          case "break":
            return <br key={i} />;
          default:
            return null;
        }
      })}
    </>
  );
}
