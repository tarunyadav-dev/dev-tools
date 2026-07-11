import libraryInformation from "../../../src/data/libraries/library_container.json";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Background from "@/src/components/background1";

export default async function LibraryLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const library = libraryInformation.find((lib) => lib.slug === slug);

  if (!library) notFound();

  return (
    <div className="min-h-screen bg-[#030712] text-white">

        {/* Background */}

        <Background />

        <div>
            {children}
        </div>



      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl justify-between px-8 py-6 text-sm text-slate-500">

          <span>
            Created: {library.dateOfCreation.slice(0, 10)}
          </span>

          <span>
            Updated: {library.dateOfUpdate.slice(0, 10)}
          </span>

        </div>
      </footer>

    </div>
  );
}