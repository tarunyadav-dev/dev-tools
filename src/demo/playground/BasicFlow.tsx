'use client';

export default function BasicFlow() {
  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8">

      <h2 className="text-2xl font-bold">
        Playground Component
      </h2>

      <p className="mt-3 text-slate-300">
        This component is rendered using the
        <span className="mx-1 rounded bg-emerald-500/20 px-2 py-1">
          :::playground
        </span>
        directive.
      </p>

    </div>
  );
}