import React from "react";
import type { RelatedNode } from "../types";
import { slugify } from "../slug";

export function Related({ node }: { node: RelatedNode }) {
  if (node.items.length === 0) return null;
  return (
    <div className="my-6">
      <p className="mb-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
        Related
      </p>
      <div className="flex flex-wrap gap-2">
        {node.items.map((item) => (
          <a
            key={item}
            href={`/${slugify(item)}`}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}
