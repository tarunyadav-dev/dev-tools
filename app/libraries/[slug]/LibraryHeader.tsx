"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Code2,
  Globe,
  Layers3,
  Menu,
} from "lucide-react";

export default function LibraryHeader({ library }: { library: any }) {
  const [expanded, setExpanded] = useState(true);

  const Action = ({
    href,
    title,
    icon,
  }: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10"
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{title}</span>
      </div>
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );

  return (
    <header className="top-0 z-50 border-b border-white/10 bg-[#030712]/90 backdrop-blur-xl sticky">
      <div className="mx-auto max-w-7xl px-4 py-1 pt-3 lg:px-10 ">
        <div className="flex items-center justify-between">
          {/* link for go back */}
          <Link
            href="/libraries"
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Libraries
          </Link>

          <div className="flex items-center">
          <div
              className={
                "flex items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white transition-all " +
                (expanded ? "h-20 w-20 p-3" : "h-12 w-12 p-2")
              }
            >
              <img
                src={library.icon.split("?")[0]}
                alt={library.name}
                className="h-full w-full object-contain"
              />
            </div>

            {/*   ---------------------------------------- */}
            <h1
                className={
                  expanded ? "text-5xl font-black max-md:hidden" : "max-md:hidden text-2xl font-black"
                }
              >
                {library.name}
              </h1>
              </div>



          {/* This div contain hidden hamburger and hide/open button */}
          <div className="flex items-center gap-3">
            {/*This is hide/open button */}
            <button
              onClick={() => setExpanded((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 hover:bg-white/10"
            >
              {expanded ? (
                <>
                  Hide Details
                  <ChevronUp className="h-4 w-4" />
                </>
              ) : (
                <>
                  Show Details
                  <ChevronDown className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-1 pb-3 flex flex-col gap-8 lg:flex-row lg:justify-between">
          <div className="flex flex-1 gap-5 ">
            
            <div className="flex-1">
              
              {expanded && (
                <div className="mt-6 space-y-8 h-[calc(80vh)]  overflow-y-auto scrollbar-none">
                    <h1
                className={
                  "text-5xl font-black hidden max-md:block"
                }
              >
                {library.name}
              </h1>
                  {/* Description */}

                  <p className="max-w-4xl text-slate-400 leading-8 text-[15px]">
                    {library.description}
                  </p>

                  {/* Information Grid */}

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-sky-500/20 bg-sky-500/10 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Code2 size={18} className="text-sky-400" />

                        <p className="text-xs uppercase tracking-widest text-sky-300">
                          Language
                        </p>
                      </div>

                      <p className="text-xl font-bold">
                        {library.coreLanguage}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5">
                      <div className="mb-3 flex items-center gap-2">
                        <Layers3 size={18} className="text-violet-400" />

                        <p className="text-xs uppercase tracking-widest text-violet-300">
                          Framework
                        </p>
                      </div>

                      <p className="text-xl font-bold">
                        {library.coreFramework ?? "None"}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                      <div className="mb-3">
                        <p className="text-xs uppercase tracking-widest text-emerald-300">
                          Category
                        </p>
                      </div>

                      <p className="text-xl font-bold">{library.category}</p>
                    </div>
                  </div>

                  {/* Use Cases */}

                  <div>
                    <h3 className="mb-4 text-lg font-bold">Common Use Cases</h3>

                    <div className="grid gap-3 md:grid-cols-2">
                      {library.useCaseLines.map((item: string) => (
                        <div
                          key={item}
                          className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 transition hover:border-cyan-400 hover:bg-cyan-500/20"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SEO */}

                  <div>
                    <h3 className="mb-4 text-lg font-bold">Search Keywords</h3>

                    <div className="flex flex-wrap gap-3">
                      {library.seoTags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex ml-auto w-full flex-col gap-4 lg:w-72">
                    {library.documentationUrl && (
                      <Action
                        href={library.documentationUrl}
                        title="Official Documentation"
                        icon={<BookOpen className="h-5 w-5 text-blue-400" />}
                      />
                    )}

                    {library.officialWebsite && (
                      <Action
                        href={library.officialWebsite}
                        title="Official Website"
                        icon={<Globe className="h-5 w-5 text-emerald-400" />}
                      />
                    )}

                    {library.githubRepo && (
                      <Action
                        href={library.githubRepo}
                        title="GitHub Repository"
                        icon={<Globe className="h-5 w-5 text-slate-300" />}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
