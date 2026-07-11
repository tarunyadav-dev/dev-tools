import React from "react";
import type { FolderNode, TreeNode } from "../types";

export function Tree({ node }: { node: TreeNode }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-4 font-mono text-sm leading-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      {node.value}
    </pre>
  );
}

export function Folder({ node }: { node: FolderNode }) {
  return (
    <div className="my-4 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <span aria-hidden>{"\u{1F4C1}"}</span>
      {node.value}
    </div>
  );
}
