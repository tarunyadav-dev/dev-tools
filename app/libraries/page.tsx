'use client';

import Background from "@/src/components/background1";
import Library from "../../src/data/libraries/library_container.json"
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export default function Libraries() {
    const router = useRouter()
    return(
        <main className="sm:-12 xl:p-28 md:p-5 ">

            { /* background */}

            <Background />

            {/* Searchbar */}


            {/* Libraries */}

            <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-16'>
                {
                    Library.map((library) => {
                        return (
                            <button
  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-[0_0_60px_rgba(59,130,246,.25)]"
key={library.id}
onClick={() => router.push(`/libraries/${library.slug}`)}>
  {/* Glow */}
  <div className="absolute -top-8 -right-8 h-44 w-44 rounded-full bg-blue-500/10 blur-3xl transition group-hover:bg-blue-500/20" />

  <div className="relative flex h-full flex-col items-center text-center">

    {/* Logo */}
    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-lg transition-transform duration-300 group-hover:scale-105">

      <img
        src={library.icon}
        alt="React Flow"
        className="h-20 w-20 object-contain"
      />

    </div>

    {/* Name */}
    <h2 className="mt-6 text-2xl font-bold tracking-tight">
      {library.name}
    </h2>

    {/* Category */}
    <p className="mt-2 text-sm font-medium text-blue-400">
      {library.category} | <span>
  {library.coreLanguage} 
  {library.coreFramework && ` • ${library.coreFramework}`}
</span>
    </p>

    {/* Description */}
    <p className="mt-5 flex-1 text-slate-400 leading-7">
      {library.description}
    </p>

    {/* Footer */}
    <div className="mt-8 flex w-full items-center justify-center">

      <span className="flex items-center gap-2 font-semibold text-blue-400 transition-all group-hover:gap-3">
        Read More
        <ArrowRight size={18} />
      </span>

    </div>

  </div>
</button>
                        )
                    })
                }
            </div>


        </main>
    )
}