import React from "react";
import type { ListNode } from "../types";
import { Inline } from "./Inline";

export function ListBlock({ node }: { node: ListNode }) {
  const hasChecklist = node.items.some((item) => item.checked !== undefined);

  if (hasChecklist) {
    const done = node.items.filter((item) => item.checked).length;
    const total = node.items.length;
    return (
      <div className="my-4">
        <div className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>
        <ul className="space-y-2">
          {node.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={!!item.checked}
                readOnly
                className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span
                className={
                  item.checked
                    ? "text-slate-400 line-through"
                    : "text-slate-700 dark:text-slate-300"
                }
              >
                <Inline nodes={item.children} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const Tag = node.ordered ? "ol" : "ul";
  return (
    <Tag
      className={
        node.ordered
          ? "my-4 list-decimal space-y-1.5 pl-6 text-slate-700 marker:text-slate-400 dark:text-slate-300"
          : "my-4 list-disc space-y-1.5 pl-6 text-slate-700 marker:text-indigo-400 dark:text-slate-300"
      }
    >
      {node.items.map((item, i) => (
        <li key={i} className="leading-7">
          <Inline nodes={item.children} />
        </li>
      ))}
    </Tag>
  );
}
