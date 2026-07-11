"use client";

import React, { useState } from "react";
import type { InstallNode } from "../types";

export function Install({ node }: { node: InstallNode }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  if (node.commands.length === 0) return null;
  const current = node.commands[active] ?? node.commands[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-slate-800 bg-slate-950">
      {node.commands.length > 1 && (
        <div className="flex border-b border-slate-800">
          {node.commands.map((c, i) => (
            <button
              key={c.manager + i}
              type="button"
              onClick={() => setActive(i)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
                i === active
                  ? "border-b-2 border-indigo-500 text-slate-100"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {c.manager}
            </button>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto font-mono text-sm text-slate-100">
          <span aria-hidden>{"\u{1F4E6}"}</span>
          <code>{current.command}</code>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 rounded px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}
