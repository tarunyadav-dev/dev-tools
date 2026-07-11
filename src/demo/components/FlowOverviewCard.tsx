'use client';

export default function FlowOverviewCard() {
  return (
    <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-8">

      <h2 className="text-2xl font-bold">
        Documentation Component
      </h2>

      <p className="mt-3 text-slate-300">
        This component is rendered using the
        <span className="mx-1 rounded bg-purple-500/20 px-2 py-1">
          :::component
        </span>
        directive.
      </p>

    </div>
  );
}