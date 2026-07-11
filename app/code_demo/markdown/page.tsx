import fs from "node:fs";
import path from "node:path";

import {
  parseMarkdown,
  DocsRenderer,
  generateToc,
  buildSearchIndex,
  searchIndex,
} from "@/src/lib/markdown-reader";

import { demoRegistry } from "@/src/demo/demoRegistry";
import Background from "@/src/components/background1";

export default function MarkdownDemoPage() {
  // ==============================
  // Read Markdown
  // ==============================

  const source = fs.readFileSync(
    path.join(
      process.cwd(),
      "src/demo/markdown/react-flow-golden-test.md"
    ),
    "utf8"
  );

  // ==============================
  // Parse
  // ==============================

  const { ast, errors } = parseMarkdown(source);

  if (errors.length) {
    console.table(errors);
  }

  // ==============================
  // Build Helper Data
  // ==============================

  const toc = generateToc(ast);

  // build only to verify engine
  const index = buildSearchIndex(ast, "React Flow");
  searchIndex(index, "react");

  // ==============================
  // Render
  // ==============================

  return (
    <div className="relative min-h-screen">

      <Background />

      <div className="relative z-10 mx-auto flex max-w-7xl gap-10 px-8 py-10">

        {/* Sidebar */}

        <aside className="hidden w-64 shrink-0 xl:block">
          <div className="sticky top-8">

            <h2 className="mb-5 text-xl font-bold">
              Table of Contents
            </h2>

            <nav className="space-y-2">

              {toc.map((item) => (
                <a
                  key={item.slug}
                  href={`#${item.slug}`}
                  className={`block transition-colors hover:text-blue-400 ${
                    item.depth > 2
                      ? "pl-4 text-sm text-slate-400"
                      : "font-medium"
                  }`}
                >
                  {item.title}
                </a>
              ))}

            </nav>

          </div>
        </aside>

        {/* Markdown */}

        <main className="min-w-0 flex-1">
          <DocsRenderer
            ast={ast}
            demoRegistry={demoRegistry}
          />
        </main>

      </div>

    </div>
  );
}