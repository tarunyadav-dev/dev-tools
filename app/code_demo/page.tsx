'use client';

import { ArrowRight, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Background from '@/src/components/background1';


export default function CodeDemoHome() {

  const router = useRouter();

  return (
    <main className="min-h-screen px-8 py-12">

      <Background />

      <div className="mx-auto max-w-5xl">

        <h1 className="text-5xl font-bold">
          Code Demo
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          A playground for testing individual features before integrating
          them into the main project and manual for tools also.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <button
            onClick={() => router.push("/code_demo/markdown")}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,.25)]"
          >

            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

            <div className="relative">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10">
                <FileText size={32} />
              </div>

              <h2 className="mt-7 text-2xl font-bold">
                Lib - Markdown
              </h2>

              <p className="mt-3 leading-6 text-slate-400">
                Library created so that across all projects follow a standard
                rule of how to write markdown and execute them.
              </p>

              <div className="mt-10 flex items-center gap-2 font-semibold text-blue-400">

                Open Demo

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </div>

            </div>

          </button>

        </div>

      </div>

    </main>
  );
}