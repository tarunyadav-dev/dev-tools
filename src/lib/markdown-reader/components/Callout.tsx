import React from "react";
import type { CalloutNode } from "../types";
import { NodeRenderer } from "../renderer";

type CalloutKind = Exclude<CalloutNode["type"], "badge" | "version">;

const CALLOUT_STYLES: Record<
  CalloutKind,
  { label: string; icon: string; classes: string }
> = {
  tip: {
    label: "Tip",
    icon: "\u2728",
    classes:
      "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100",
  },
  note: {
    label: "Note",
    icon: "\u2139",
    classes:
      "border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-900 dark:bg-sky-950/40 dark:text-sky-100",
  },
  warning: {
    label: "Warning",
    icon: "\u26A0",
    classes:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100",
  },
  danger: {
    label: "Danger",
    icon: "\u2716",
    classes:
      "border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-100",
  },
  success: {
    label: "Success",
    icon: "\u2713",
    classes:
      "border-green-200 bg-green-50 text-green-900 dark:border-green-900 dark:bg-green-950/40 dark:text-green-100",
  },
};

/** Renders tip/warning/danger/note/success -- all share the same layout. */
export function Callout({ node }: { node: CalloutNode }) {
  if (node.type === "badge" || node.type === "version") return null; // handled elsewhere
  const style = CALLOUT_STYLES[node.type];
  return (
    <div className={`my-6 flex gap-3 rounded-lg border px-4 py-3 ${style.classes}`}>
      <span className="mt-0.5 shrink-0 text-base leading-none" aria-hidden>
        {style.icon}
      </span>
      <div className="min-w-0 flex-1 [&_p]:my-0 [&_p:not(:last-child)]:mb-2">
        <p className="mb-1 text-sm font-semibold">{style.label}</p>
        <NodeRenderer nodes={node.children} />
      </div>
    </div>
  );
}

export function Badge({ node }: { node: CalloutNode }) {
  return (
    <span className="my-4 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
      <NodeRenderer nodes={node.children} inline />
    </span>
  );
}

export function VersionTag({ node }: { node: CalloutNode }) {
  return (
    <span className="my-4 inline-flex items-center gap-1 rounded-md border border-slate-300 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      <NodeRenderer nodes={node.children} inline />
    </span>
  );
}
