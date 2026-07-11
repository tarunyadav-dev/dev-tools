'use client';

export default function BasicExample() {
  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-8">

      <h2 className="text-2xl font-bold">
        Demo Component
      </h2>

      <p className="mt-3 text-slate-300">
        This component is rendered using the
        <span className="mx-1 rounded bg-blue-500/20 px-2 py-1">
          :::demo
        </span>
        directive.
      </p>

    </div>
  );
}