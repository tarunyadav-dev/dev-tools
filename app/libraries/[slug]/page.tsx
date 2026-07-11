// This page is going to be complete change it's just a demo for checking purpose

import fs from "fs";
import path from "path";

import library from "@/src/data/libraries/library_container.json";

import {
  parseMarkdown,
  DocsRenderer,
  generateToc,
  buildSearchIndex,
} from "@/src/lib/markdown-reader";

// Demo Components
// import BasicExample from "@/src/components/demo/BasicExample";

// Playground Components
// import BasicPlayground from "@/src/lib/markdown-reader/directives/"

// Custom Components
// import FlowExample from "@/src/components/docs/FlowExample";

export default async function LibraryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Find current library
  const currentLibrary = library.find((lib) => lib.slug === slug);

  // Markdown fallback
  let markdown = "# Markdown Not Found";

  if (currentLibrary?.contentUrl) {
    const filePath = path.join(process.cwd(), currentLibrary.contentUrl);

    if (fs.existsSync(filePath)) {
      markdown = fs.readFileSync(filePath, "utf8");
    }
  }

  // Parse markdown
  const { ast, errors } = parseMarkdown(markdown);

  if (errors.length > 0) {
    console.warn(errors);
  }

  // Generate TOC
  const toc = generateToc(ast);

  // Build Search Index
  const searchIndex = buildSearchIndex(
    ast,
    currentLibrary?.name ?? slug
  );

  /*
   * Demo Registry
   */
  const demoRegistry = {
    // "basic-example": BasicExample,
    // "drag-connect-demo": DragConnectDemo,
  };

  /*
   * Playground Registry
   */
  const playgroundRegistry = {
    // "basic-flow": BasicPlayground,
  };

  /*
   * Component Registry
   */
  const componentRegistry = {
    // "FlowExample": FlowExample,
  };

  return (
    <div className="flex gap-10">

      {/* Markdown */}
      <main className="flex-1">
        <DocsRenderer
          ast={ast}
        />
      </main>

      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 xl:block">

        <div className="sticky top-24">

          <h3 className="mb-4 text-lg font-semibold">
            On This Page
          </h3>

          <nav className="space-y-2">

            {toc.map((item) => (
              <a
                key={item.slug}
                href={`#${item.slug}`}
                className={`block text-sm transition hover:text-blue-400 ${
                  item.depth === 3
                    ? "pl-4 text-slate-400"
                    : "font-medium"
                }`}
              >
                {item.title}
              </a>
            ))}

          </nav>

        </div>

      </aside>

    </div>
  );
}