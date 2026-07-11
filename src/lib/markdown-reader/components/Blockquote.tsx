import React from "react";
import type { BlockquoteNode } from "../types";
import { NodeRenderer } from "../renderer";

export function Blockquote({ node }: { node: BlockquoteNode }) {
  return (
    <blockquote className="my-6 border-l-4 border-indigo-300 bg-indigo-50/50 py-1 pl-4 italic text-slate-700 dark:border-indigo-700 dark:bg-indigo-950/30 dark:text-slate-300">
      <NodeRenderer nodes={node.children} />
    </blockquote>
  );
}
