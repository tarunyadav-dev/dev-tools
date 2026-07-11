import React from "react";
import type { ImageNode } from "../types";

/**
 * Deliberately a plain `<img>` -- swap this out for `next/image` in your
 * app by replacing this single component; nothing else in the engine
 * depends on the rendering strategy for images.
 */
export function ImageBlock({ node }: { node: ImageNode }) {
  return (
    <span className="my-6 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={node.src}
        alt={node.alt}
        className="w-full rounded-lg border border-slate-200 dark:border-slate-800"
      />
      {node.alt && (
        <span className="mt-2 block text-center text-sm text-slate-500 dark:text-slate-400">
          {node.alt}
        </span>
      )}
    </span>
  );
}
