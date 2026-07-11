import React from "react";
import type { ComponentDirectiveNode, DemoNode, PlaygroundNode } from "../types";

/**
 * Registry the *host app* fills in with real React components, keyed by the
 * identifier written in `:::demo`, `:::component`, or `:::playground`. The
 * engine only renders whatever the host provides; it never assumes a demo
 * exists.
 */
export type DemoRegistry = Record<string, React.ComponentType>;

function Placeholder({ kind, id }: { kind: string; id: string }) {
  return (
    <div className="my-6 flex flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900">
      <p className="font-mono text-xs uppercase tracking-wide text-slate-400">{kind}</p>
      <p className="font-semibold text-slate-600 dark:text-slate-300">{id || "(missing id)"}</p>
      <p className="max-w-sm text-sm text-slate-400">
        Register this id in your <code>demoRegistry</code> to render a live component here.
      </p>
    </div>
  );
}

export function Demo({ node, registry }: { node: DemoNode; registry?: DemoRegistry }) {
  const Component = registry?.[node.id];
  if (Component) return <Component />;
  return <Placeholder kind="Demo" id={node.id} />;
}

export function Playground({ node, registry }: { node: PlaygroundNode; registry?: DemoRegistry }) {
  const Component = registry?.[node.id];
  if (Component) return <Component />;
  return <Placeholder kind="Playground" id={node.id} />;
}

export function ComponentDirective({
  node,
  registry,
}: {
  node: ComponentDirectiveNode;
  registry?: DemoRegistry;
}) {
  const Component = registry?.[node.id];
  if (Component) return <Component />;
  return <Placeholder kind="Component" id={node.id} />;
}
