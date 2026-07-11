"use client";

import React, { useState } from "react";
import type { TabsNode } from "../types";
import { NodeRenderer } from "../renderer";

export function Tabs({ node }: { node: TabsNode }) {
  const [active, setActive] = useState(0);
  if (node.tabs.length === 0) return null;
  const current = node.tabs[active] ?? node.tabs[0];

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
      <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        {node.tabs.map((tab, i) => (
          <button
            key={tab.label + i}
            type="button"
            onClick={() => setActive(i)}
            className={`shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
              i === active
                ? "border-b-2 border-indigo-500 bg-white text-indigo-600 dark:bg-slate-950 dark:text-indigo-400"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-4">
        <NodeRenderer nodes={current.children} />
      </div>
    </div>
  );
}
