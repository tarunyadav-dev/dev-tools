import React from "react";
import type { TableNode } from "../types";
import { Inline } from "./Inline";

const ALIGN_CLASS: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function TableBlock({ node }: { node: TableNode }) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-slate-50 dark:bg-slate-900">
          <tr>
            {node.header.map((cell, i) => (
              <th
                key={i}
                className={`border-b border-slate-200 px-4 py-2.5 font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-100 ${
                  ALIGN_CLASS[node.align[i] ?? ""] ?? "text-left"
                }`}
              >
                <Inline nodes={cell} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {node.rows.map((row, r) => (
            <tr
              key={r}
              className="border-b border-slate-100 last:border-0 even:bg-slate-50/50 dark:border-slate-800 dark:even:bg-slate-900/40"
            >
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={`px-4 py-2.5 text-slate-700 dark:text-slate-300 ${
                    ALIGN_CLASS[node.align[c] ?? ""] ?? "text-left"
                  }`}
                >
                  <Inline nodes={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
