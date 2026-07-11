import React from "react";
import type { HeadingNode } from "../types";
import { Inline } from "./Inline";

const DEPTH_CLASSES: Record<HeadingNode["depth"], string> = {
  1: "text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mt-0 mb-6",
  2: "text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 mt-12 mb-4 scroll-mt-24 border-t border-slate-200 dark:border-slate-800 pt-8",
  3: "text-xl font-semibold text-slate-900 dark:text-slate-50 mt-8 mb-3 scroll-mt-24",
  4: "text-base font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-2 scroll-mt-24",
};

export function Heading({ node }: { node: HeadingNode }) {
  const Tag = (`h${node.depth}` as unknown) as "h1" | "h2" | "h3" | "h4";
  return (
    <Tag id={node.slug} className={DEPTH_CLASSES[node.depth]}>
      <Inline nodes={node.children} />
      {node.depth >= 2 && (
        <a
          href={`#${node.slug}`}
          aria-label={`Link to section`}
          className="ml-2 text-slate-300 no-underline opacity-0 transition-opacity hover:text-indigo-500 group-hover:opacity-100 [h2:hover_&]:opacity-100 [h3:hover_&]:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );
}
