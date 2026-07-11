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
import Background from '@/src/components/background1';


export default async function MarkdownDemoPage() {
  // =====================================================
  // Read Markdown
  // =====================================================

  const markdownPath = path.join(
    process.cwd(),
    "src/demo/markdown/react-flow-golden-test.md"
  );

  const source = fs.readFileSync(markdownPath, "utf8");

  // =====================================================
  // Parse
  // =====================================================

  const { ast, errors } = parseMarkdown(source);

  if (errors.length > 0) {
    console.warn("Markdown Parse Errors");
    console.table(errors);
  }

  // =====================================================
  // Table Of Contents
  // =====================================================

  const toc = generateToc(ast);

  // =====================================================
  // Search Index
  // =====================================================

  const index = buildSearchIndex(ast, "React Flow");

  // Demo search

  const searchResults = searchIndex(index, "react");


  return (
    <div className="mx-auto flex max-w-7xl gap-10 px-8 py-10">

      <Background />

      {/* ================================================= */}
      {/* Sidebar */}
      {/* ================================================= */}

      <aside className="hidden w-64 shrink-0 xl:block">

        <div className="sticky top-8">

          <h2 className="mb-4 text-xl font-bold">
            Table of Contents
          </h2>

          <nav className="space-y-2">

            {toc.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className={`block transition hover:text-blue-400 ${
                  item.depth === 3
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

      {/* ================================================= */}
      {/* Markdown */}
      {/* ================================================= */}

      <main className="min-w-0 flex-1">

        <DocsRenderer
          ast={ast}
          demoRegistry={demoRegistry}
        />

      </main>

    </div>
  );
}