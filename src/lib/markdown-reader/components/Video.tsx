import React from "react";
import type { VideoNode } from "../types";

function toEmbedUrl(url: string): string {
  const youtubeMatch = /(?:youtu\.be\/|youtube\.com\/watch\?v=)([\w-]+)/.exec(url);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  return url;
}

export function Video({ node }: { node: VideoNode }) {
  if (!node.url) return null;
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-black dark:border-slate-800">
      <iframe
        src={toEmbedUrl(node.url)}
        title="Embedded video"
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
