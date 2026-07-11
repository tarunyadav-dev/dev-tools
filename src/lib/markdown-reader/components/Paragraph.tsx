import React from "react";
import type { ParagraphNode } from "../types";
import { Inline } from "./Inline";

export function Paragraph({ node }: { node: ParagraphNode }) {
  return (
    <p className="my-4 leading-7 text-slate-700 dark:text-slate-300">
      <Inline nodes={node.children} />
    </p>
  );
}
