import fs from "node:fs";
import path from "node:path";

import libraryInformation from "@/src/data/libraries/library_container.json";

import {
  parseMarkdown,
  DocsRenderer,
  generateToc,
  buildSearchIndex,
} from "@/src/lib/markdown-reader";
import  DocumentationClient  from './DocumentationClient'

import { demoRegistry } from "@/src/demo/demoRegistry";
import { Divide } from "lucide-react";

export default async function DocumentationDemoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  /* =======================================================
     Load Library
  ======================================================= */

  const { slug } = await params;

  const library = libraryInformation.find(
    (item) => item.slug === slug,
  )!;

  /* =======================================================
     Read Markdown
  ======================================================= */

  const markdownPath = path.join(
    process.cwd(),
    library.contentUrl,
  );

  const source = fs.readFileSync(markdownPath, "utf8");

  /* =======================================================
     Parse
  ======================================================= */

  const { ast, errors } = parseMarkdown(source);

  if (errors.length > 0) {
    console.table(errors);
  }

  /* =======================================================
     Generate
  ======================================================= */

  const toc = generateToc(ast);

  const searchIndex = buildSearchIndex(ast, library.name);


  /* =======================================================
     Render
  ======================================================= */

return(

<DocumentationClient

    sidebar={

      <>
              {/* =============================================== */}
        {/* Search */}
        {/* =============================================== */}

        <div className="border-b border-white/10 p-5">
          <input
            type="text"
            placeholder="Search this document..."
            className="
        w-full

        rounded-xl

        border
        border-white/10

        bg-white/5

        px-4
        py-3

        text-sm
        text-white

        placeholder:text-slate-500

        outline-none

        transition

        focus:border-blue-500
        focus:bg-white/10
      "
          />
        </div>

        {/* =============================================== */}
        {/* Scroll Area */}
        {/* =============================================== */}

        <div
          className="
      flex-1

      overflow-y-auto

      px-5
      py-6

      space-y-10

      scrollbar-thin
      scrollbar-thumb-white/10
    "
        >
          {/* =============================================== */}
          {/* Library */}
          {/* =============================================== */}

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Library
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-4">
                <img
                  src={library.icon.split("?")[0]}
                  alt={library.name}
                  className="h-12 w-12 rounded-xl bg-white p-2 object-contain"
                />

                <div>
                  <h3 className="font-semibold">{library.name}</h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {library.category}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================== */}
          {/* Resources */}
          {/* =============================================== */}

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Resources
            </p>

            <div className="space-y-2">
              {library.documentationUrl && (
                <a
                  href={library.documentationUrl}
                  target="_blank"
                  className="
              flex
              items-center
              justify-between

              rounded-xl

              border
              border-white/10

              bg-white/5

              px-4
              py-3

              transition

              hover:border-blue-500
              hover:bg-blue-500/10
            "
                >
                  Documentation ↗
                </a>
              )}

              {library.officialWebsite && (
                <a
                  href={library.officialWebsite}
                  target="_blank"
                  className="
              flex
              items-center
              justify-between

              rounded-xl

              border
              border-white/10

              bg-white/5

              px-4
              py-3

              transition

              hover:border-emerald-500
              hover:bg-emerald-500/10
            "
                >
                  Official Website ↗
                </a>
              )}

              {library.githubRepo && (
                <a
                  href={library.githubRepo}
                  target="_blank"
                  className="
              flex
              items-center
              justify-between

              rounded-xl

              border
              border-white/10

              bg-white/5

              px-4
              py-3

              transition

              hover:border-slate-400
              hover:bg-white/10
            "
                >
                  GitHub Repository ↗
                </a>
              )}
            </div>
          </section>

          {/* =============================================== */}
          {/* Table Of Contents */}
          {/* =============================================== */}

          <section>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Contents
            </p>

            <nav className="space-y-1">
              {toc.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className={`
              block

              rounded-lg

              px-3
              py-2

              text-sm

              transition-all

              hover:bg-white/5
              hover:text-white

              ${
                item.depth === 3
                  ? "ml-4 text-slate-500"
                  : "font-medium text-slate-300"
              }
            `}
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </section>

          {/* =============================================== */}
          {/* Metadata */}
          {/* =============================================== */}

          <section>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Metadata
            </p>

            <div className="grid gap-3">
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/10 p-4">
                <p className="text-xs text-sky-300">Language</p>

                <p className="mt-1 font-semibold">{library.coreLanguage}</p>
              </div>

              <div className="rounded-xl border border-violet-500/20 bg-violet-500/10 p-4">
                <p className="text-xs text-violet-300">Framework</p>

                <p className="mt-1 font-semibold">
                  {library.coreFramework ?? "None"}
                </p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <p className="text-xs text-emerald-300">Completion</p>

                <p className="mt-1 font-semibold">
                  {library.percentageOfCompleteness}%
                </p>
              </div>
            </div>
          </section>
        </div>
      </>

    }

>

{/* ================================================= */}
      {/* Markdown */}
      {/* ================================================= */}

      <main
        className="
        flex-1

    "
      >
        <div
          className="
    mx-auto

    max-w-5xl

    px-8
    py-10
"
        >
          <DocsRenderer ast={ast} demoRegistry={demoRegistry} />
        </div>
      </main>

</DocumentationClient>

)
}
