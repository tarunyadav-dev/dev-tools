import React from "react";
import type { ResourcesNode } from "../types";

export function Resources({ node }: { node: ResourcesNode }) {
  if (node.items.length === 0) return null;
  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2">
      {node.items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-slate-100">
            {item.title}
          </p>
          <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">{item.href}</p>
        </a>
      ))}
    </div>
  );
}
