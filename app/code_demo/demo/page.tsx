"use client";

import { useRouter } from "next/navigation";

export default function DemoPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center gap-8 p-8">

      <h1 className="text-4xl font-bold">
        Touch Event Test
      </h1>

      <button
        className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold hover:bg-blue-500"
        onClick={() => alert("Button Clicked")}
      >
        Alert Test
      </button>

      <button
        className="rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold hover:bg-green-500"
        onClick={() => router.push("/")}
      >
        Router Test
      </button>

      <button
        className="rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold hover:bg-red-500"
        onTouchStart={() => alert("Touch Start")}
      >
        Touch Test
      </button>

      <a
        href="https://google.com"
        className="rounded-xl bg-purple-600 px-8 py-4 text-lg font-semibold"
      >
        Anchor Test
      </a>

    </main>
  );
}