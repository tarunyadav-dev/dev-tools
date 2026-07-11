import libraryInformation from "../../../src/data/libraries/library_container.json";
import { notFound } from "next/navigation";
import Background from "@/src/components/background1";
import LibraryHeader from "./LibraryHeader";

export default async function LibraryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const library = libraryInformation.find(
    (lib) => lib.slug === slug
  );

  if (!library) notFound();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#030712] text-white">

      <Background />

      <LibraryHeader library={library} />

      <main className="relative z-10">
        {children}
      </main>

      <footer className="relative z-10 mt-0 border-t border-white/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-500 lg:flex-row lg:justify-between">

          <span>
            Created · {library.dateOfCreation.slice(0, 10)}
          </span>

          <span>
            Updated · {library.dateOfUpdate.slice(0, 10)}
          </span>

        </div>

      </footer>

    </div>
  );
}