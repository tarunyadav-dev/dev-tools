"use client";

import React, { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";

import type { CodeNode } from "../types";

export function CodeBlock({ node }: { node: CodeNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(node.value);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {}
  };

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117] shadow-lg">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-5 py-3">

        <div className="flex items-center gap-3">

          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs uppercase tracking-wider text-slate-300">
            {node.lang || "text"}
          </span>

        </div>

        <button
          onClick={handleCopy}
          className="rounded-md bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 transition hover:bg-slate-700"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>

      </div>

      {/* Code */}
      <Highlight
        theme={themes.vsDark}
        code={node.value}
        language={(node.lang || "text") as any}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-5 text-[14px] leading-7`}
            style={{
              ...style,
              margin: 0,
              background: "transparent",
            }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line })}
                className="table-row"
              >
                <span className="table-cell select-none pr-6 text-right text-slate-600">
                  {i + 1}
                </span>

                <span className="table-cell">
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token })}
                    />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>

    </div>
  );
}