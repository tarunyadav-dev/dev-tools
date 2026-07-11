'use client';

import { DynamicIcon } from 'lucide-react/dynamic';
import tools from '../src/data/tool/tool_information.json';
import Background from '@/src/components/background1';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";



export default function Home() {
 
  const router = useRouter();


  return (
    <main className="min-h-screen bg-[#09090b] text-white h-64 overflow-y-auto pr-1
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-neutral-300
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-neutral-400
            active:[&::-webkit-scrollbar-thumb]:bg-neutral-500
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-700
            dark:hover:[&::-webkit-scrollbar-thumb]:bg-neutral-600 overflow-auto">
            {/* Background */}
        <Background />


      <div className="relative z-10 max-w-7xl mx-auto px-10 py-14">

      {/* TOP header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-6xl font-black mt-5 leading-tight">
              Developer
              <br />
              Toolkit
            </h1>
            <p className="text-slate-400 mt-6 max-w-xl leading-7">
              A collection of tools built only for me.
              Every feature removes friction from my workflow.
              Nothing more.
            </p>
          </div>
        </div>

      {/* CARDS */}
      <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16'>
        {
          tools.map((tool) => {
            const Icon = tool.icon;
              const ToolHref = tool.href;
            return (

              <button
  key={tool.id}
  disabled={!tool.active}
  onClick={() => tool.active && router.push(ToolHref)}
  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,.25)]"
>
  <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl group-hover:bg-blue-500/20 transition" />

  <div className="relative">
    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-400/20">
      <DynamicIcon name={Icon as any} />
    </div>

    <h2 className="text-2xl font-bold mt-7">{tool.name}</h2>

    <p className="text-slate-400 mt-3 leading-6">{tool.description}</p>

    <div className="mt-10 flex items-center justify-between">
      {tool.active ? (
        <span className="text-blue-400 font-semibold flex items-center gap-2">
          Launch
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition"
          />
        </span>
      ) : (
        <span className="text-slate-500">Coming Soon</span>
      )}
    </div>
  </div>
</button>

            )
          })
        }

      </div>

      {/* Bottom */}

        <div className="mt-20 flex justify-between items-center border-t border-white/10 pt-8 text-sm">

          <span className="text-slate-500">

            Version 0.0.1

          </span>

          <span className="text-slate-600">

            Build fast • Ship MVP • Improve later

          </span>

        </div>

      </div>

    </main>
  );
}
